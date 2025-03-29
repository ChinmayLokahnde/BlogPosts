const mongoose = require ("mongoose")
const user = require("./user")

const blogSchema = new mongoose.Schema({
    title: {type: String, require: true},
    content:{ type: String, require: true},
    author: {type: String, ref: user},
    createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model("blogpost", blogSchema);