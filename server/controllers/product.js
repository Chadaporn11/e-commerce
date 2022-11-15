const Product = require("../models/Product");

exports.create = async (req, res) => {
    try {
        const product = await new Product(req.body).save();
        res.send(product);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.list = async (req, res) => {
    try {
        // Code
        const count = parseInt(req.params.count);
        const product = await Product.find().limit(count).populate('category').sort([["createdAt", "desc"]]);
        res.send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};


exports.remove = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const product = await Product.findOneAndDelete({ _id: id }).exec();
        res.send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.read = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const product = await Product.findOne({ _id: id }).populate('category').exec();
        res.send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true }).exec();
        res.send(product);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.listBy = async (req, res) => {
    try {
        // Code
        const { sort, order, limit } = req.body;
        const product = await Product.find().limit(limit).populate('category').sort([[sort, order]]);
        res.send(product);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

//search
// Query
const handleQuery = async (req, res, query) => {
    let products = await Product.find({$text:{$search:query}}).populate('category',"_id name")

    res.send(products);

};
//Price
const handlePrice = async (req, res, price) => {
    let products = await Product.find({
        price: {
            $gte: price[0],
            $lte: price[1]
        }
    }).populate('category',"_id name")

    res.send(products);

};
// Category
const handleCategory = async (req, res, category) => {
    let products = await Product.find({category}).populate('category',"_id name")

    res.send(products);

};

exports.searchFilters = async (req, res) => {

    const { query, price, category } = req.body;
    console.log(query);
    if (query) {
        console.log(query);
        await handleQuery(req, res, query);
    }
    if ( price != undefined ) {
        console.log(price);
        await handlePrice(req, res, price);
    }
    if (category){
        console.log(category);
        await handleCategory(req, res, category);
    }
    

};
