const mongoose = require('mongoose');
const mongUrl = `mongodb://127.0.0.1:27017/mynotes`;

const connectToMongo = async () => {
    mongoose.connect(mongUrl, () => { console.log("Connection established to MongoDB successfully") });
};

module.exports = connectToMongo;

// even if you delete the db from local system, running thunderclient will create same db again and enter the new data into it