const mongoose = require('mongoose');
const { Schema } = mongoose;

const { roles } = require('../enums');

const UserSchema = new Schema(
    {
        code: { type: String, required: true, index: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'department',
            required: true,
        },
        branch: { type: String, maxlength: 4 },
        leader: { type: Boolean, default: false },
        role: {
            type: String,
            enum: roles.enum,
            default: roles.default,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('user', UserSchema);
