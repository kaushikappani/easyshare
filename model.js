const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
    }, url: {
        type:String,
    }, fileType: {
        type:String,
    }
})

const file = mongoose.model("File", fileSchema);
module.exports = file;