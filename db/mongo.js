const mongoose = require('mongoose');

const clientOptions = {
    dbName  :'apinode'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@essaie.zmsb0.mongodb.net/?retryWrites=true&w=majority&appName=essaie", clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}