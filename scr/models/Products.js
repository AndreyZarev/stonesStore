const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, "Name needs to be at least 2 characters."]

    },
    category: {
        type: String,
        required: true,
        minLength: [3, "	The Category should be at least 3 characters"]

    },
    color: {
        type: String,
        required: true,
        minLength: [2, "The Color should be at least 2 characters"]


    },

    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "Image link has to start with https:// or http://"]


    },
    location: {
        type: String,
        required: true,
        minLength: [5, "The Location should be between 5 and 15 characters"],
        maxLength: [15, "The Location should be between 5 and 15 characters"]

    },
    formula: {
        type: String,
        required: true,
        minLength: [3, "The Formula should be between 3 and 30 characters"],
        maxLength: [30, "The Formula should be between 3 and 30 characters"]

    },

    description: {
        type: String,
        required: true,
        minLength: [10, "The Description should be a minimum of 10 characters long"]

    },

    likedList: {
        type: [],
        required: true,

    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})







const Products = mongoose.model('Products', productsSchema)


module.exports = Products










// ·  – an array of objects containing the users' ID



// Note: When a user buy electronic, their ID is added to that collection (buyingList)

// Implement the entities with the correct data types.