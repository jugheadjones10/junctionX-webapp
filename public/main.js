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


var preciousString = "myhef324234"
// var firstEncrypt
var randomArray
fetch(`/first-encrypt/${preciousString}`).then(response => response.json()).then(function(res){
    firstEncrypt = res
    return firstEncrypt  //String
}).then(function(firstEncrypt){
    fetch(`/first-encrypt-split/${firstEncrypt}`).then(res => res.json()).then(function(res){
        console.log(typeof res)
        randomArray = res.toArray()
        console.log(typeof randomArray)
    }).then(function(){

        fetch(`/hash-individual/${randomArray.toString()}`).then(res => res.json()).then(function(res){
            console.log(res)
        })


    })
})

