// const mongoose = require("mongoose");
// const User = require("./User");

// const scamReportSchema = mongoose.Schema({
//     // Basic Information
//     scammerName: {
//         type: String,
//         required: true
//     },
//     telephoneNumbers: [{
//         type: String
//     }],
//     emailAddress: {
//         type: String
//     },
//     physicalAddress: {
//         type: String,
//         require: false
//     },

//     // Scam Details
//     scamType: {
//         type: String,
//         required: true,
//         enum: ['Phishing', 'Investment Scam', 'Romance Scam', 'Fake Marketplace', 'Impersonation', 'Other']
//     },
//     scamLocation: {
//         type: String,
//         required: true
//     },
//     firstContact: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     scamValue: {
//         amount: {
//             type: Number,
//             required: true
//         },
//         currency: {
//             type: String,
//             enum: ['USD', 'NGN'],
//             required: true
//         }
//     },

//     // Financial Information
//     scammerAccountNumber: {
//         type: String
//     },

//     // Evidence
//     evidence: [{
//         type: String  
//     }],
//     scammerPhotos: [{
//         type: String  
//     }],

//     dateReported: {
//         type: Date,
//         default: Date.now,
//     },
//     reportedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: false,
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'verified', 'rejected'],
//         default: 'pending',
//     },
//     caseId: {
//         type: String,
//         unique: true
//     },

//     lastUpdated: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     timestamps: true  
// });

// // // Pre-save hook to generate case ID
// // scamReportSchema.pre('save', function(next) {
// //     if (!this.caseId) {
// //         const prefix = 'SCAM';
// //         const randomNum = Math.floor(10000 + Math.random() * 90000);
// //         this.caseId = `${prefix}-${randomNum}`;
// //     }
// //     next();
// // });

// module.exports = mongoose.models.ScamReport || mongoose.model("ScamReport", scamReportSchema);

const mongoose = require("mongoose");
const User = require("./User");

const scamReportSchema = mongoose.Schema({
    // Basic Information
    scammerName: {
        firstName: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        otherNames: {
            type: String
        }
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    telephoneNumbers: [{
        type: String
    }],
    emailAddresses: [{
        type: String,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }],
    physicalAddress: {
        line1: {
            type: String
        },
        line2: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    },

    // Scam Details
    scamType: {
        type: String,
        required: true,
        enum: ['Phishing', 'Investment Scam', 'Romance Scam', 'Fake Marketplace', 'Impersonation', 'Other']
    },
    scamLocationType: {
        type: String,
        enum: ['physical', 'website'],
        required: true
    },
    scamLocation: {
        physical: {
            address: {
                type: String
            }
        },
        website: {
            url: {
                type: String,
                validate: {
                    validator: function(v) {
                        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
                    },
                    message: props => `${props.value} is not a valid URL!`
                }
            }
        }
    },
    firstContact: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    scamValue: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ['USD', 'NGN'],
            required: true
        }
    },

    // Financial Information
    scammerAccountNumber: {
        type: String
    },

    // Evidence
    evidence: [{
        type: String  
    }],
    scammerPhotos: [{
        type: String  
    }],

    // Metadata
    dateReported: {
        type: Date,
        default: Date.now,
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending',
    },
    caseId: {
        type: String,
        unique: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true  
});

// // Pre-save hook to generate caseId
// scamReportSchema.pre('save', async function(next) {
//     if (!this.caseId) {
//         const count = await this.constructor.countDocuments();
//         this.caseId = `SCAM-${Date.now().toString().slice(-6)}-${(count + 1).toString().padStart(4, '0')}`;
//     }
//     next();
// });

module.exports = mongoose.models.ScamReport || mongoose.model("ScamReport", scamReportSchema);