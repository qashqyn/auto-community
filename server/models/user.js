import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tel: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    cars: [{
        mark: String,
        model: String,
        color: String,
        generation: String,
        carStatus: String,
        image: String
    }],
    is_admin: {type: Boolean, default: false},
    likedNews: [{type: mongoose.Schema.Types.ObjectId, ref: 'NewsMessage'}],
    likedLogbooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'LogbookMessage'}],

    avatar: String
});

export default mongoose.model('User', userSchema);