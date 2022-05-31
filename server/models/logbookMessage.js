import mongoose from "mongoose";

const logbookSchema = mongoose.Schema({
    title: String,
    message: String,
    category: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LogbookComment'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const LogbookMessage = mongoose.model('LogbookMessage', logbookSchema);

export default LogbookMessage;