const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { user, pass, dbname } = process.env;

const connect = () => {
    try {
        mongoose.connect(
            `mongodb+srv://${user}:${pass}@cluster0.yetgm.mongodb.net/${dbname}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        );
    } catch (e) {
        console.log(e);
    }
};

module.exports = { connect };
