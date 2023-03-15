const mongoose = require("mongoose");

const Campground = require("../models/campground");

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "640e5b3dd55f00c30f5f0318", // tim (or your user id)
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laborum, dolores ad similique fugit veritatis temporibus quas recusandae facere praesentium alias iure eius officiis ipsa? Aperiam quibusdam consequatur animi perspiciatis.`,
            price,
            images: [
                {
                    url: "https://res.cloudinary.com/duvgo5cif/image/upload/v1678891677/YelpCamp/ztqkr3usfw0udvgi4jfl.jpg",
                    filename: "YelpCamp/ztqkr3usfw0udvgi4jfl",
                },
                {
                    url: "https://res.cloudinary.com/duvgo5cif/image/upload/v1678891679/YelpCamp/ylxnrmp0pyjztk1bd7uf.jpg",
                    filename: "YelpCamp/ylxnrmp0pyjztk1bd7uf",
                },
                {
                    url: "https://res.cloudinary.com/duvgo5cif/image/upload/v1678891678/YelpCamp/cxcioyogwid1tao2jmgm.jpg",
                    filename: "YelpCamp/cxcioyogwid1tao2jmgm",
                },
            ],
            geometry: { type: "Point", coordinates: [-122.330062, 47.603832] },
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
