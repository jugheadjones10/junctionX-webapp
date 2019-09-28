const express = require("express")
var router = express.Router()
// Express

const MongoClient = require('mongodb').MongoClient;
const fs = require("fs")
// MongoDB

const uri = "mongodb+srv://kimyoungjin:Jugheadjones10!@cluster0-hzlqa.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})

var db
client.connect(err => {
    db = client.db("junctionX")
    // perform actions on the collection object
})

router.get("/upload", function (req, res) {
    fs.readFile('./keys/send-mongo-keys.json', (err, data) => {
        if (err) throw err

        // console.log(data.toString())
        db.collection("myKeys").insertOne({ key: data.toString(), type: "key"})
    })
    res.send("Uploaded to mongo")
})

router.get("/retrieve", function (req, res) {
    db.collection("myKeys").find({
        type: "key"
    }).toArray(function(err, res){
        fs.writeFile("./keys/receive-mongo-keys.json", JSON.stringify(res), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    })

    res.send("Retrieved from mongo")
})

module.exports = router



