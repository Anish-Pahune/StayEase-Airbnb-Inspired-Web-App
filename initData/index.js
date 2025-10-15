const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const Mongo_URl = 'mongodb://127.0.0.1:27017/Airbnb_Clone';

main().then(() =>{
    console.log("Connected to DB");
}).catch((err) => {console.log(err)});

async function main() {
    await mongoose.connect(Mongo_URl);
}

async function initDB(){
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "68e4f612454e90b273760cf5" }))
    await Listing.insertMany(initData.data);
    console.log("Data was inserted");
}

initDB();