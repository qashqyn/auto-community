import mongoose from "mongoose";

const carModelSchema = mongoose.Schema({
    mark: String,
    models: [{
        name: String,
        generations: [String]
    }]
});

const CarModel = mongoose.model('CarModel', carModelSchema);
export default CarModel;