const mongoose = require('mongoose');
const { Schema } = mongoose;

const { roles, departments } = require('../enums');

const UserSchema = new Schema(
    {
        code: { type: String, required: true, index: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        department: {
            type: String,
            enum: departments.enum,
            default: departments.default,
            required: true,
        },
        branch: { type: String, maxlength: 4 },
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
