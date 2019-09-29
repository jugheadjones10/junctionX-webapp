
var submitButton = document.getElementById("submit-button")
var password = document.getElementById("password")
var passwordDisplay = document.getElementById("password-display")

submitButton.addEventListener("click", function () {
    var preciousString = password.value
    fetch(`/first-encrypt/${preciousString}`)
        .then(response => response.json())
        .then(function(res){
            passwordDisplay.innerHTML = res
        })
})

var arrayButton = document.getElementById("array-button")
var arrayDisplay = document.getElementById("array-display")

arrayButton.addEventListener("click", function(){
    fetch('/first-encrypt-split')
        .then(res => res.json())
        .then(function (res) {
            console.log(res)
    
            for(var i = 0; i < res.length; i++){
                arrayDisplay.insertAdjacentHTML("beforeend", `
                    ${res[i]} </br>
                `)
            }
        })
})

var hashButton = document.getElementById("hash-button")
var hashDisplay = document.getElementById("hash-display")

hashButton.addEventListener("click", function(){
    fetch("/hash-individual")
        .then(res => res.json())
        .then(function(res){

            for (var i = 0; i < res.length; i++) {
                hashDisplay.insertAdjacentHTML("beforeend", `
                    ${res[i]} </br>
                `)
            }
        })
})

var mixButton = document.getElementById("mix-button")
var mixDisplay = document.getElementById("mix-display")

mixButton.addEventListener("click", function(){
    fetch("/mix-encrypted-chunks")
        .then(res => res.json())
        .then(function(res){
            console.log(res)

            for (var i = 0; i < res.length; i++) {
                mixDisplay.insertAdjacentHTML("beforeend", `
                    ${res[i]} </br>
                `)
            }
        })

})


var boxButton = document.getElementById("box-button")
boxButton.addEventListener("click", function(){

    fetch("/box/upload").then(function(){
        fetch("/box/upload").then(function () {
            fetch("/box/upload").then(function () {
                fetch("/box/upload").then(function () {
                    console.log("Done with Box uploads")
                })
            })
        })
    })

})


var driveButton = document.getElementById("drive-button")
driveButton.addEventListener("click", function () {

    fetch("/google/upload").then(function () {
        fetch("/google/upload").then(function () {
            fetch("/google/upload").then(function () {
                fetch("/google/upload").then(function () {
                    console.log("Done with Google uploads")
                })
            })
        })
    })

})




var mongoButton = document.getElementById("mongo-button")
mongoButton.addEventListener("click", function () {

    fetch("/mongo/upload").then(function () {
        fetch("/mongo/upload").then(function () {
            fetch("/mongo/upload").then(function () {
                fetch("/mongo/upload").then(function () {
                    console.log("Done with Mongo uploads")
                })
            })
        })
    })

})