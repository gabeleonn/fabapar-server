const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,

    auth: {
        user: 'gableonn@gmail.com',
        pass: 'nvrikicwrqruecen',
    },
});

module.exports = transport;
