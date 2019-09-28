var express = require("express")
// Express

var boxRoute = require('./cloud-routes/box-route')
var mongoRoute = require("./cloud-routes/mongo-route")
var googleRoute = require("./cloud-routes/google-route")
// Cloud routes


var app = express()

app.use(express.static('public'))
app.get("/", function(req, res){
    res.send("Wait a min...")
})
app.use("/box", boxRoute)
app.use("/mongo", mongoRoute)
app.use("/google", googleRoute)


var port = process.env.PORT || 5000
app.listen(port, function () {
    console.log("listening on port " + port)
})
