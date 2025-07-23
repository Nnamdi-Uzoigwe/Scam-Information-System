
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
    required: true,
    trim: true
    },
    wasThoughAd: {
        type: String,
        enum: ['yes', 'no'],
        required: false
    },
    adUrl: {
        type: String,
        required: false,
        trim: true,
        validate: {
            validator: function(v) {
                if (this.wasThoughAd === 'yes' && v) {
                    return /^https?:\/\/.+/.test(v);
                }
                return true;
            },
            message: 'Please provide a valid URL starting with http:// or https://'
        }
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

   scammerBankName: {
        type: String,
        trim: true
    },
    scammerAccountNumber: {
        type: String,
        trim: true
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
        type: String,
        default: 'Anonymous'
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