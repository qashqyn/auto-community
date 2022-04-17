import mongoose from "mongoose";
//  location: '', amount:'', ownerNumber: '', specialMarks:''};

const antitheftSchema = mongoose.Schema({
    mark: String,
    stateNumber: String,
    model: String,
    vin: String,
    color: String,
    thiftDate: Date,
    releaseYear: Date,
    location: String,
    amount: Number,
    ownerNumber: String,
    specialMarks: String,
    selectedFiles: [String], 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const AntitheftMessage = mongoose.model('AntitheftMessage', antitheftSchema);

export default AntitheftMessage;