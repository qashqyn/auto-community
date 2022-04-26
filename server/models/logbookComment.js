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
        default: new Date()
    },
    logbook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LogbookMessage'
    }
});

export default mongoose.model('LogbookComment', commentSchema);