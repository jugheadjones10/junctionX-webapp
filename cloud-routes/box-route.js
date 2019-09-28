var express = require('express')
var router = express.Router()
// Express

var BoxSDK = require('box-node-sdk')
var fs = require('fs')
// Box SDK

var sdk = new BoxSDK({
    clientID: 'u4vxh442ztjdatk0rsjl814io704bpne',
    clientSecret: 'l6MflOkFqXlPbtgJ2rBoAIRls3IOmRgE'
})
var client = sdk.getBasicClient("WkZIDDI5nPe9Msi3WUwyRRNuXxMitzFU")
var stream = fs.createReadStream('keys/send-box-keys.json');
// var folderID = '0'

// define the home page route
router.get('/upload', function (req, res) {

    client.folders.get('0').then(function (folder) {
        return folder.item_collection.entries[0].id
    }).then(function (folderID) {
        client.folders.get(folderID).then(function (folder) {
            if (folder.item_collection.entries.length !== 0) {
                client.files.delete(folder.item_collection.entries[0].id)
                    .then(() => {
                        // deletion succeeded — no value returned
                    })
            }
            return folderID
        }).then(function (folderID) {
            client.files.uploadFile(folderID, 'send-box-keys.json', stream)
                .then(file => {
                    console.log(file)
                })
        })
    })
    res.send('Key sent to Box')
})

router.get('/retrieve', function (req, res) {
    client.folders.get('0').then(function (folder) {
        return folder.item_collection.entries[0].id
    }).then(function (folderID) {
        client.folders.get(folderID).then(function (folder) {
            console.log(folder)
            return folder.item_collection.entries[0].id
        }).then(function (fileID) {
            console.log(fileID)
            client.files.getReadStream(fileID, null, function (error, stream) {

                if (error) {
                    console.log(error)
                }

                // write the file to disk
                var output = fs.createWriteStream('keys/receive-box-keys.json')
                stream.pipe(output)
            })
        })
    })

    res.send('Retrieved keys from box')
})

module.exports = router