const router = require('express').Router();
const { isAuth } = require('../middleware/authMiddleware')
const createService = require('../services/createService');
const { getErrorMessage } = require('../utils/errorHandles')

const { getAllPosts } = require('../services/createService')

// contains home page, create page, catalog, details page, buy option, delete, edit, search

router.get('/', async (req, res) => {
    const [...allPosts] = await createService.getAllPosts().lean()

    res.render("home", { allPosts })

})

router.get('/stone/add', isAuth, (req, res) => {

    res.render("create")

})


router.post('/stone/add', isAuth, async (req, res) => {
    const productData = req.body
    const userId = req.user

    try {
        const userInfo = await createService.createPost(userId, productData)

        res.redirect("/dashboard")

    }
    catch (err) {
        res.render("create", { message: err.message })
    }

});




router.get('/dashboard', async (req, res) => {
    const [...allPosts] = await createService.getAllPosts().lean()

    res.render("dashboard", { allPosts })


});




router.get("/products/:productId/details", async (req, res) => {

    const productId = req.params.productId
    let isLoggedIn;
    if (req.user?.email) { isLoggedIn = true } else { isLoggedIn = false }

    const product = await createService.getProduct(productId).lean()
    const isCreator = product.owner?.email === req.user?.email
    let isItLiked = await createService.isLiked(req.user?._id, req.params.productId).lean()
    let isLiked = false

    isLiked = isItLiked.likedList[0] === req.user?._id
    if (isItLiked.likedList[1]) {
        isLiked = isItLiked.likedList[1] === req.user?._id

    }

    // const isCreator = await createService.getCreator(req.params)
    res.render("details", { product, isCreator, isLoggedIn, isLiked })
})

router.get('/:productId/like', async (req, res) => {
    const userId = req.user._id

    try {
        await createService.liked(userId, req.params.productId)

        res.redirect(`/products/${req.params.productId}/details`)

    } catch (err) {
        res.redirect(`/products/${req.params.productId}/details`)
    }

})

router.get("/product/:productId/delete", isAuth, (req, res) => {
    createService.deleteProduct(req.params.productId)
    res.redirect("/dashboard")
})

router.get("/product/:productId/edit", isAuth, async (req, res) => {
    const productId = req.params.productId
    const product = await createService.getProduct(productId).lean()
    const isCreator = product.owner?.email === req.user?.email
    if (isCreator) {
        const productData = await createService.getProduct(req.params.productId).lean()

        res.render("edit", { ...productData })
    } else {
        res.redirect("/404")
    }

})


router.post("/product/:productId/edit", isAuth, async (req, res) => {
    const productChanges = req.body
    const productId = req.params.productId
    const product = await createService.getProduct(productId).lean()
    const isCreator = product.owner?.email === req.user?.email
    if (!isCreator) {
        res.redirect("/404")
    }
    try {
        await createService.updateProduct(req.params.productId, productChanges)
        res.redirect(`/products/${req.params.productId}/details`)
    } catch (err) {
        let message = getErrorMessage(err)
        res.render(`edit`, { ...productChanges, message })
    }





})

router.get('/search', async (req, res) => {
    const products = await createService.getAllPosts().lean()
    res.render("search", { products })
});

router.post('/search', async (req, res) => {
    const { name } = req.body
    const products = await createService.search(name).lean()

    res.render("search", { products })
});

module.exports = router