import mongoose from 'mongoose';

const marketSchema = mongoose.Schema({
    title: String,
    location: String,
    category: String,
    manufactor: String,
    condition: String,
    location: String,
    cost: Number,
    tel: String,
    whatsapp: String,
    description: String,
    imgs: [String],
    suits: [{
        mark: String,
        model: String,
        generation: String
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const Market = mongoose.model('Market', marketSchema);

export default Market;