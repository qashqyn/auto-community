import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tel: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    car: {type: String, required: true},
    id: { type: String},
});

export default mongoose.model('User', userSchema);