const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js")

const listingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        filename: String
        },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum: ["Mountain", "Beach", "Arctic", "Rooms", "Villa", "Castles", "Swimming Pool", "Camping", "Farm", "Restaurant"],
        required: true,
    }
})

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.review}})
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;