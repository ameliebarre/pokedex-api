import * as mongoose from 'mongoose';
import ITrainer from "../interfaces/ITrainer";

export const TrainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type:String,
        required: true
    }
});

export default mongoose.model<ITrainer>('Trainer', TrainerSchema);
