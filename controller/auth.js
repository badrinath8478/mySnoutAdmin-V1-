const mongoose = require("mongoose");
const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const randomize = require("randomatic");
const jwt = require("jsonwebtoken");

var transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.MY_MAIL,
    pass: process.env.MY_PASSWORD,
  },
});


exports.userRegister = (req, res, next) => {
  const { fullName, email, password, mobileNumber } = req.body;
  const otp = randomize("0", 6);
  Admin.findOne({ email: email })
    .exec()
    .then((admin) => {
      if (admin) {
        return res.status(500).json({ error: process.env.MAIL_EXISTS });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const admin = new Admin({
              _id: new mongoose.Types.ObjectId(),
              fullName: fullName,
              email: email,
              mobileNumber: mobileNumber,
              password: hash,
              OTP: otp,
              otpExpire: Date.now() + 3600,
            });
            return admin
              .save()
              .then((result) => {
                let mailOptions = {
                  from: process.env.MY_MAIL,
                  to: email,
                  subject: process.env.LOGIN,
                  text: `Hello, to login into your 'MY-SNOUT' account here is the OTP  "${otp}". \n This otp expires in 10 minutes `,
                };
                transporter.sendMail(mailOptions, (err) => {
                  if (err) {
                    return res.status(500).json({ error: err });
                  }
                });
                return res.status(201).json({
                  success: process.env.REGISTERED_SUCCESSFULLY,
                  adminId: result._id,
                });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
};


exports.login = (req, res, next) => {
  const { email, password } = req.body;
  Admin.findOne({ email: email })
    .exec()
    .then((admin) => {
      if (!admin) {
        return res
          .status(500)
          .json({ error: process.env.EMAIL_NOT_REGISTERED });
      }
      if (admin.isVerified === true) {
        bcrypt.compare(password, admin.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: admin.email,
                adminId: admin._id,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "15d",
              }
            );
            return res
              .status(201)
              .json({ success: process.env.SUCCESS, token: token });
          } else {
            return res
              .status(500)
              .json({ error: process.env.INCORRECT_PASSWORD });
          }
        });
      } else {
        return res.status(500).json({ error: process.env.GET_VERIFIED });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};



exports.verifyOtp = (req, res, next) => {
  compareOtp = req.body.otp;
  Admin.findByIdAndUpdate({
    _id: req.params.adminId,
    otpExpire: { $gt: Date.now() },
  })
    .then((admin) => {
      if (admin.OTP === compareOtp) {
        admin.OTP = null;
        admin.otpExpire = null;
        admin.isVerified = true;
        admin.save();
        return res.status(201).json({ success: process.env.OTP_VERIFIED });
      } else {
        return res
          .status(500)
          .json({ error: process.env.OTP_INCORRECT_EXPIRED });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};


exports.forgotPassword = (req, res, next) => {
  const { email } = req.body;
  Admin.findOne({ email: email })
    .exec()
    .then((admin) => {
      const otp = randomize("0", 6);
      if (otp) {
        let mailOptions = {
          from: process.env.MY_MAIL,
          to: email,
          subject: process.env.FORGOT_OTP,
          text:`${process.env.RESET_PASSWORD } "${otp}"`,
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        });
        admin.OTP = otp;
        admin.otpExpire = Date.now() + 3600;
        admin.isVerified = false;
        admin.save();
        return res
          .status(201)
          .json({ success: process.env.MAIL_SENT, adminId: admin._id });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};


exports.resetPassword = (req, res, next) => {
  const { password, confirm } = req.body;
  Admin.findOne({ _id: req.params.adminId })
    .then((admin) => {
      if (!admin) {
        return res
          .status(500)
          .json({ error: process.env.EMAIL_NOT_REGISTERED });
      }
      if (admin.isVerified === true) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          if (password === confirm) {
            admin.password = hash;
            admin.OTP = null;
            admin.otpExpires = null;
            admin.save();
          }
          let mailOptions = {
            from: process.env.MY_MAIL,
            to: admin.email,
            subject: process.env.RESET,
            text: process.env.PASSWORD_RESET_SUCCESS,
          };
          transporter.sendMail(mailOptions, (err) => {
            if (err) {
              return res.status(500).json({ error: err });
            } else {
              return res.status(201).json({ success: process.env.PASSWORD_RESET });
            }
          });
        });
      } else {
        return res.status(500).json({ error: process.env.GET_VERIFIED_TO_RESETPASSWORD });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};


exports.logOut = (req, res, next) => {

};


exports.updateProfile = (req, res, next) => {
  Admin.findOne({ _id: req.adminId })
    .then((post) => {
      post.fullName = req.body.fullName;
      post.mobileNumber = req.body.mobileNumber;
      post.profilePic = req.file.path;
      return post.save();
    })
    .then((result) => {
      res.status(201).json({ success: process.env.POST_UPDATED });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};


exports.deleteProfilePic = (req, res, next) => {
  Admin.findOne({ _id: req.adminId })
    .then((post) => {
      post.profilePic = null;
      return post.save();
    })
    .then((result) => {
      res.status(201).json({ success: process.env.POST_DELETED });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
