import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    access_point_id: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    note: {
        type: String
    },
    slot_number: {
        type: Number,
        required: true
    },
    is_visible: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('notesModel', notesSchema);