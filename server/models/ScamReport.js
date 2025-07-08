// const mongoose =  require("mongoose")
// const User = require("./User")


// const scamReportSchema = mongoose.Schema({
//     scammerName: {
//         type: String,
//         required: true
//     },
//     scamType: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     scammerEmail: {
//         type: String,
//         required: true
//     },
//     scammerAccountNumber: {
//         type: String,
//         required: true
//     },
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
//         enum: ['pending', 'verified'],
//         default: 'pending',
//     },
//       evidence: {
//         type: String,
//         required: false,
//     },
//     caseId: {
//         type: String,
//         unique: true
//     }
// })

// module.exports = mongoose.models.ScamReport || mongoose.model("ScamReport", scamReportSchema)

const mongoose = require("mongoose");
const User = require("./User");

const scamReportSchema = mongoose.Schema({
    // Basic Information
    scammerName: {
        type: String,
        required: true
    },
    telephoneNumbers: [{
        type: String
    }],
    emailAddress: {
        type: String
    },
    physicalAddress: {
        type: String,
        require: false
    },

    // Scam Details
    scamType: {
        type: String,
        required: true,
        enum: ['Phishing', 'Investment Scam', 'Romance Scam', 'Fake Marketplace', 'Impersonation', 'Other']
    },
    scamLocation: {
        type: String,
        required: true
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

// // Pre-save hook to generate case ID
// scamReportSchema.pre('save', function(next) {
//     if (!this.caseId) {
//         const prefix = 'SCAM';
//         const randomNum = Math.floor(10000 + Math.random() * 90000);
//         this.caseId = `${prefix}-${randomNum}`;
//     }
//     next();
// });

module.exports = mongoose.models.ScamReport || mongoose.model("ScamReport", scamReportSchema);