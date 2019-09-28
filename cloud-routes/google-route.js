const express = require("express")
var router = express.Router()
// Express

const readline = require('readline')
const { google } = require('googleapis')
const fs = require("fs")


const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = 'token.json'


fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), listFiles);
})

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback)
        oAuth2Client.setCredentials(JSON.parse(token))
        callback(oAuth2Client)
    })
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function listFiles(auth) {
    const drive = google.drive({ version: 'v3', auth });

    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    });
}

router.get("/upload", function(req, res){
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), uploadFile)
    })

    function uploadFile(auth){

        const drive = google.drive({ version: 'v3', auth })

        drive.files.list({
            pageSize: 10,
            q: "mimeType = 'application/vnd.google-apps.folder'",
            // fields: 'nextPageToken, files(id, name)',
            spaces: 'drive',
        }, function (err, res) {
            if (err) {
                console.error(err)
            } else {
                for (var i = 0; i < res.data.files.length; i++) {
                    if (res.data.files[i].name === "JunctionXKeys") {

                        var fileMetadata = {
                            'name': 'send-google-keys',
                            parents: [res.data.files[i].id]
                        }
                        var media = {
                            mimeType: 'text/csv',
                            body: fs.createReadStream('./keys/send-google-keys.json')
                        }

                        drive.files.create({
                            resource: fileMetadata,
                            media: media,
                            fields: 'id'
                        }, function (err, file) {
                            if (err) {
                                // Handle error
                                console.error(err);
                            } else {
                                console.log('File Id: ', file.id);
                            }
                        })
                    }
                }
            }
        })
    }

    res.send("Uploaded to Google")
})

router.get("/retrieve", function (req, res) {
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), getFile)
    })

    function getFile(auth) {
        const drive = google.drive({ version: 'v3', auth })
        drive.files.list({
            pageSize: 10,
            q: "mimeType = 'application/vnd.google-apps.folder'",

            // fields: 'nextPageToken, files(id, name)',
            spaces: 'drive',
        }, function (err, res) {
            if (err) {
                console.error(err)
            } else {
                for (var i = 0; i < res.data.files.length; i++) {
                    if (res.data.files[i].name === "JunctionXKeys") {

                        drive.files.list({
                            q: `"${res.data.files[i].id}" in parents`
                        }, (err, res) => {
                            var fileID = res.data.files[0].id
                            var dest = fs.createWriteStream('keys/receive-goolge-keys.json')

                            console.log(fileID)
                            if (res.data.files) {
                                drive.files.get({ fileId: fileID, alt: "media" }, { responseType: "stream" },
                                    function (err, res) {
                                        res.data
                                            .on("end", () => {
                                                console.log("Done");
                                            })
                                            .on("error", err => {
                                                console.log("Error", err);
                                            })
                                            .pipe(dest);
                                    }
                                )
                            }
                        })
                    }
                }
            }
        })
    }
    res.send("Retrieved from Google")
})




module.exports = router
