const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
    {},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('equipment', schema);
