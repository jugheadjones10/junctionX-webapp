
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


var filerButton = document.getElementById("filer-button")

filerButton.addEventListener("click", function(){
    fetch("/to-files")
        .then(function (res) {
            console.log(res)
        })
})

// var submitButton = document.getElementById("submit-button")
// var passwordInput = document.getElementById("password")
// var originalEncrypted

// submitButton.addEventListener("click", function(){
//     var preciousString = passwordInput.value
//     fetch(`/first-encrypt/${preciousString}`)
//         .then(response => response.json())
//         .then(function(json){
//             originalEncrypted = json
//             submitButton.insertAdjacentHTML("afterend", `<div>Encrypted string : ${json}</div>
//             <br/>
//             <br/>
//             <legend>Splice the encrypted string into arrays of random lengths</legend> 
//             <button id="submit-button-two">Submit</button>`
//             )
//         }).then(function(){
//             var submitButtonTwo = document.getElementById("submit-button-two")
//             return submitButtonTwo
//         }).then(function(but){
//             but.addEventListener("click", function () {

//                 fetch(`/first-encrypt-split/${JSON.parse(JSON.stringify(originalEncrypted))}`).then(function (res) {
//                     return res.json()
//                 }).then(function (json) {
//                     but.insertAdjacentHTML("afterend", `<div>Mixed Array : ${json}</div>
//                         <br/>
//                         <br/>
//                         <legend>Splice the encrypted string into arrays of random lengths</legend> 
//                         <button id="submit-button-two">Submit</button>`
//                     )
//                 })
//             })
//         })
// })




// var preciousString = "myhef324234"
// var firstEncrypt
// var randomArray


// fetch(`/first-encrypt/${preciousString}`).then(response => response.json()).then(function(res){
//     firstEncrypt = res
//     console.log(typeof firstEncrypt)
//     return firstEncrypt  //String
// }).then(function(firstEncrypt){
//     fetch(`/first-encrypt-split/${firstEncrypt}`).then(res => res.json()).then(function(res){
//         console.log(typeof res)
//         // randomArray = res.toArray()
//     })
//     // .then(function(){

//     //     fetch(`/hash-individual/${randomArray.toString()}`).then(res => res.json()).then(function(res){
//     //         console.log(res)
//     //     })


//     // })
// })

