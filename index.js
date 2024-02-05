const express = require("express");
const fs = require("fs");
const app = express();
const multer = require("multer");
const customStorage = multer.diskStorage({
    destination: function (req, file, callbackFunc) {
        callbackFunc(null, 'uploads');
    },
    filename: function (req, file, callbackFunc) {
        console.log("file = ", file);
        callbackFunc(null, file.originalname);
    }
});

const uploadFile = multer({ storage: customStorage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let port = 5500;

app.get("/", function (req, res) {
    res.send("This is Home Page");
});

app.get("/about", function (req, res) {
    res.send("This is About Page");
});

app.get("/contact", function (req, res) {
    res.send("This is Contact Page");
});

app.get("/file-write", function (req, res) {
    let fileName = "demo.txt";
    let fileContent = "hello world";
    fs.writeFile(fileName, fileContent, function (error) {
        if (error) {
            console.log("error while writting in the file");
        } else {
            res.sendStatus(201);
        }
    })
});

app.post('/upload', uploadFile.single('filename'), function (req, res) {
    res.sendStatus(200);
})

app.listen(port, function () {
    console.log("app started at port " + port);
});