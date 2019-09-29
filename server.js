var express = require("express")
var bodyParser = require('body-parser')
// Express

var boxRoute = require('./cloud-routes/box-route')
var mongoRoute = require("./cloud-routes/mongo-route")
var googleRoute = require("./cloud-routes/google-route")
// Cloud routes

const shuffle = require("shuffle-array")
const fs = require('fs')
const hasha = require("hasha")
const stringHash = require("string-hash")
const jsencrypt = require("js-encrypt")
// Encryption libraries


var crypt = new jsencrypt.JSEncrypt()
crypt.setPublicKey("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKNQ+Fz5mdAOHMprtJEOMeKD1Gleuix5UzFo / wX4I++E / UaSdFVjR3DEhictmKbNRhgf8yw54n2YCLrC2J1OnbUCAwEAAQ ==")
crypt.setPrivateKey("MIIBOgIBAAJBAKNQ+Fz5mdAOHMprtJEOMeKD1Gleuix5UzFo/wX4I++E/UaSdFVjR3DEhictmKbNRhgf8yw54n2YCLrC2J1OnbUCAwEAAQJAVmWJXjY1JpmwpW0hEvO9dCVlg3C3cLumRSdUcmX5LMYDc1MXJ3PVJb3ZM0lNfXnaAa17T1lpi8KTw7rGxE6ZKQIhAPiXeiSuymwG6TvyBUopFPBBydoLNqVT6IsionY0se / zAiEAqC7rz + uC3Qa +Enr2D49IqjlX79T / VWcl8lxuVwtQTbcCIBV1NdTexZhHjHBhNrWtECKg + yR4HVJuCL + h0LY1XDqjAiAk4R0em9M3anoVjVcVtGLHyQlKcxeGf7bnfXNIrRdv4wIhAK8TZo795URSue75zFjRLIteJWQBQ3OKjjSNBc2 + TdvI")

var cryptHash = new jsencrypt.JSEncrypt()
cryptHash.setPublicKey("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIvBN14KtcLwlNwLnfMKHSFVNFTjjiPkiwona5KGfSgtSOjs29jb3lgbvwGrFcYxXLwhSOzhwxhpYJWG9EMn2E0CAwEAAQ ==")
cryptHash.setPrivateKey("MIIBOwIBAAJBAIvBN14KtcLwlNwLnfMKHSFVNFTjjiPkiwona5KGfSgtSOjs29jb3lgbvwGrFcYxXLwhSOzhwxhpYJWG9EMn2E0CAwEAAQJAL9kZQcNc87822BfKHjnqO01Wu3GlariGuhVBCUuuciB7a5BoOoE4apR5aNn5jcSv9eAYJLqRgvCRZ6HLH9xLgQIhAOIsPxhT5MOKdGm1hMNCcuMPRPqj0F / F + p / lp4kLlRGxAiEAni9vRDR31fZf19lyzhopEDO3hbO2kWAN6EZS5O8 + 210CIQC5Z8QhUUSK94kOzvqShnpfoDjPrlI28LjPMxfvxErjQQIgbmKBjaHjgh60USb / 0000HIdKaPW40AesjMsOK428Wk0CIQDR8 / XDUp3h38NYmd5KO24nh0CSNOrpp0PRTe0uOpbUcg ==")
// Generation of two pairs of public and private keys

var app = express()

app.use(bodyParser.json())    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.static('public'))
app.get("/", function(req, res){
    res.send("Wait a min...")
})
app.use("/box", boxRoute)
app.use("/mongo", mongoRoute)
app.use("/google", googleRoute)


app.get("/first-encrypt/:password", function(req, res){
    var firstEncrpyt = crypt.encrypt(req.params.password)
    res.json(firstEncrpyt)
})

app.get("/first-encrypt-split/:firstEncrypt", function(req, res){
    var first = req.params.firstEncrypt
    var firstEncryptSplitted = randomArrSplitter(first.split(""))
    res.send(firstEncryptSplitted)
})

app.get("/hash-individual/:mixedArray", function(req, res){
    var mixedArray = req.params.mixedArray.toArray()
    var hashedArray = mixedArray.map(x => hasha(x))
    res.send(hashedArray)
})

function randomArrSplitter(arr) {
    var i = 0;
    var slicedArr = [];

    while (arr.length != 0) {
        var randomUpper = Math.floor(Math.random() * 7 + 4)
        var sliced = arr.slice(0, randomUpper)
        if (sliced.length == 1) {
            i--
            sliced = slicedArr[i].concat(sliced)
        }

        slicedArr[i] = sliced
        arr = arr.slice(randomUpper)
        i++
    }
    return slicedArr;
}



var port = process.env.PORT || 5000
app.listen(port, function () {
    console.log("listening on port " + port)
})
