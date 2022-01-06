require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const file = require("./model");
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.log(err);
})

app.post("/upload", upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
          fileName: result.original_filename,
          url: result.url,
          fileType: result.resource_type,
        };
        const newData = new file(data);
        newData.save().then(() => {
            console.log("saved in data base")
        }).catch((err) => {
            console.log("err saving in data base");
            res.status(500).json(err);
            console.log(err);
        })
        res.json(newData);
    } catch (err) {
        console.log(err)
        res.json(err);
    }
})

app.listen(4000, () => {
    console.log("server started");
})
