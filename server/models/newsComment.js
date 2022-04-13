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
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewsMessage'
    }
});

export default mongoose.model('NewsComment', commentSchema);