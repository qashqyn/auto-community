import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
    title: String,
    subtitle: String,
    message: String,
    tag: String,
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewsComment'
    }], 
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const NewsMessage = mongoose.model('NewsMessage', newsSchema);

export default NewsMessage;