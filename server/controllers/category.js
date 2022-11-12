const Category = require("../models/Category");

exports.list = async (req, res) => {
    try {
        // Code
        const category = await Category.find({}).exec();
        res.send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name }).save();
        res.send(category);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.read = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const category = await Category.findOne({ _id: id }).exec();
        res.send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.update = async (req, res) => {
    try {
        // Code
        var id = req.params.id;
        var { name } = req.body;
        const category = await Category.findOneAndUpdate(
            { _id: id },
            { name: name }
        );
        res.send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.remove = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const category = await Category.findOneAndDelete({ _id: id });
        res.send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};
