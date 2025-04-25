const mongoose =  require("mongoose")
const User = require("./User")


const scamReportSchema = mongoose.Schema({
    scammerName: {
        type: String,
        required: true
    },
    scamType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
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
        enum: ['pending', 'verified'],
        default: 'pending',
      },
      evidence: {
        type: String,
        required: false,
      },
})

module.exports = mongoose.models.ScamReport || mongoose.model("ScamReport", scamReportSchema)