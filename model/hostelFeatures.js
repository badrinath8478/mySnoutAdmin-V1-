const mongoose = require('mongoose');


const hostelFeaturesSchema = mongoose.Schema({
    


    charges: {
        type: [String], require: true,
        validate(value) {
            if (!value.length) {
                throw new Error("HostelFeatures field cant be empty");
            }
        }
    },
    hostelPrefferedFor: {
        type: [String], require: true,
        validate(value) {
            if (!value.length) {
                throw new Error("hostelPrefferedFor field cant be empty");
            }
        }
    },
    hostelAvailableFor: {
        type: [String], require: true,
        validate(value) {
            if (!value.length) {
                throw new Error("hostelAvailableFor field cant be empty");
            }
        }
    },
    cleaningServices: {
        type: [String], require: true,
        validate(value) {
            if (!value.length) {
                throw new Error("cleaningServices field cant be empty");
            }
        }
    },
    security: {
        type: [String], require: true,
        validate(value) {
            if (!value.length) {
                throw new Error("security field cant be empty");
            }
        }
    },
    ammentis: {
        type: [String], require: true,
        validate(value) {
            if (!value.length) {
                throw new Error("ammentis field cant be empty");
            }
        }
    },
    homeRules: {
        type: [String], require: true,
        validate(value) {
            if (!value.length) {
                throw new Error("homeRules field cant be empty");
            }
        }
    },
    facilities: {
        type: [String], require: true,
        validate(value) {
            if (!value.length) {

                throw new Error("facilities field cant be empty");

            }
        }
    },
    customFacilities: { type: String }

    



});



module.exports = mongoose.model('HostelFeatures', hostelFeaturesSchema);
