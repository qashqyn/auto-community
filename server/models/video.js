import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    title: String,
    tag: String,
    videoID: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VideoComment'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;