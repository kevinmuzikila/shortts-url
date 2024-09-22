const mongoose = require('mongoose');
const uri = 'mongodb+srv://kevinmuzikila:<password>@blogging.dnaovr9.mongodb.net/';

const connectDB = async () => {

    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect('mongodb+srv://kevinmuzikila:01ZQJ7WR3EXtUNx8@blogging.dnaovr9.mongodb.net/url_short');
     
        console.log(`Datebase Connected: ${conn.connection.host}`);
    } catch(error) {
        console.log(error);
    }
}

module.exports = connectDB;