import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const NewsMessage = mongoose.model('NewsMessage', newsSchema);

export default NewsMessage;