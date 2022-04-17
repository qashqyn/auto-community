import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    antitheft: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AntitheftMessage'
    }
});

export default mongoose.model('AntitheftComment', commentSchema);