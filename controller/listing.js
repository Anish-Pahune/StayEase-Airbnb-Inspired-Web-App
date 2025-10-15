const Listing = require("../models/listing");
const { cloudinary } = require("../cloudConfig");

// Index Route
module.exports.index = async (req, res) => {
    const category = req.query.category; // ?category=Mountain
    const country = req.query.country;   // ?country=India
    let query = {};

    if (category) {
        query.category = category;
    }
    if (country) {
        query.country = { $regex: new RegExp(`^${country}$`, 'i') };
    }
    const allListing = await Listing.find(query);
    res.render("listings/index.ejs", { allListing, selectedCategory: category || "", searchCountry: country || "" });
}


// New Route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

// Show Route
module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({ path: "review", populate: { path: "author" }}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing you are trying to access, does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing})
}

// Create Route
module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

// Edit Route
module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you are trying to access, does not exist.");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
}

// Update Route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    if (req.file) {
        // Delete old image from Cloudinary if it exists
        if (listing.image && listing.image.filename) {
            await cloudinary.uploader.destroy(listing.image.filename);
        }
        // Set new image
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    // Delete image from Cloudinary
    if(listing.image && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }
    // Delete listing from DB
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}