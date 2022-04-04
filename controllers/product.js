const Product = require('../model/product')
exports.add_product = async (req, res) => {
    const product = new Product({
        ...req.body,
        owner: req.user._id
    })
    try {
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
}
exports.get_product = async (req, res) => {
    const product = Product.find({}, function (err, data) {
        if (err) res.status(400).send({ error: error.message })
        res.status(200).send(data)
    })
}
exports.update_product = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'description', 'type']
    const isValidOpration = updates.every((update) => allowUpdates.includes(update))
    if (!isValidOpration) return res.status(401).send({ error: "InValid opration" })
    try {
        const product = await Product.findOne({ _id: req.params.id, owner: req.user._id })
        if (!product) return res.status(400).send({ error: "Product not found" })
        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
exports.delete_product = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!product) res.status(404).send({ error: error.message })
        res.status(200).send({ success: "Deleted...." })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
exports.add_comments = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, owner: req.user._id })
        if (!product) return res.status(400).send({ error: "Product not found" })
        const commentObj = {
            comment: req.body.comment,
            owner: req.user._id
        }
        product.comments.push(commentObj)
        await product.save()
        res.send(product)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
exports.like_on_post_number = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, owner: req.user._id })
        if (!product) return res.status(404).send()
        product['like'] += 1
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send(e.message)
    }
}
exports.like_on_product=async (req, res) => {
    try {
        const product = await Product.findById({_id: req.params.id });
        if (!product) throw new Error("Product not found ..")
        const data = product.like.findIndex(item => item.owner == (req.user._id).toString())

        if (data === -1) product.like = product.like.concat({owner: req.user._id, isLiked: true })
        else product.like[data].isLiked = !product.like[data].isLiked

        const like = await product.save();
        res.status(200).send({ message: `successful ${like.like[data].isLiked ? " like " : "dislike "}` })
    } catch (e) {
        res.status(400).send({ error: e.message.toString() })
    }
}
exports.show_product_by_type=async (req, res) => {
    const product = Product.find({ type: req.body.type }, function (err, data) {
        if (err) console.log(err);
        res.send(data)
        console.log(data)
    })
}
exports.show_mostlike_post= async (req, res) => {
    const product = Product.findOne().sort({ like: -1 }).exec(function (err, data) {
        if (err) console.log(err);
        res.send(data)
        console.log(data)
    })
}
exports.show_mostlike_product=async (req, res) => {
    try {
        const products = await Product.find();
        if (!products)  throw new Error("Product not found ..")
        const filteredProducts = products.map((product) =>  ({
                product,
                totalLikes: product.like
                .filter(item => item.isLiked === true).length
            }))
        filteredProducts
            .sort((a, b) => a.totalLikes < b.totalLikes ? 1 : -1)
        const mostlike = filteredProducts
            .filter((product) => { 
                return filteredProducts[0].totalLikes == product.totalLikes })
        
                res.status(200).send(mostlike)
    } catch (e) {
        res.status(400).send({ error: e.message.toString() })
    }
}
exports.show_receant= async (req, res) => {
    const product = Product.findOne().sort({ createdAt: -1 }).exec(function (err, data) {
        if (err) console.log(err);
        res.send(data)
        console.log(data)
    })
}