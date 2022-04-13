import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
    title: String,
    message: {
        type: String,
        trim: true,
        required: true
    },
    tags: [String],
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
// newsSchema.virtuial('url').get(function(){
//     return '/news/'+this._id;
// });

const NewsMessage = mongoose.model('NewsMessage', newsSchema);

export default NewsMessage;