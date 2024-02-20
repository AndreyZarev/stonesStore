const Products = require('../models/Products')
// const User = require('../models/User')
exports.createPost = async function (userId, productData) {


    productData.owner = userId._id;
    await Products.create(productData)

    // await Electronics.findByIdAndUpdate(productId, { $push: { owner: userId } })
}


exports.getAllPosts = () => {
    const allPosts = Products.find()
    return allPosts
}

exports.getCreator = (productId) => {
    const post = Products.findById(productId)

    return post;

}


exports.getProduct = (productId) => {
    const product = Products.findById(productId).populate('owner');

    return product;
};

exports.liked = async (userId, productId) => {
    await Products.findByIdAndUpdate(productId, { $push: { likedList: userId } }, { runValidators: true })


}

exports.isLiked = (userId, productId) => {
    const porductCreatorId = Products.findById(productId).populate("owner")

    return porductCreatorId
}

exports.deleteProduct = async (productId) => {
    await Products.findByIdAndDelete(productId)
}

exports.updateProduct = async (productId, body) => {

    await Products.findByIdAndUpdate(productId, body, { runValidators: true })
}

exports.search = (name) => {
    let query = {}

    if (name) {
        query.name = new RegExp(name, 'i');
    }


    return Products.find(query)

}