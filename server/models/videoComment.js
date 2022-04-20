import mongoose from "mongoose";

const videoCommentSchema = mongoose.Schema({
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
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
});

const videoComment = mongoose.model('VideoComment', videoCommentSchema);

export default videoComment;