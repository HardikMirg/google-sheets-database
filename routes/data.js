const router = require('express').Router();

const { google } = require("googleapis");
const spreadsheetId = '1DrEr6MikLE4Gu5LCDv_A-Z0SBaqsK1J0SG6RJWGiNlk';

router.get('/', async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "./credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});

    const metaData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1"
    });

    let data = metaData.data.values;
    
    let arr = []

    data.forEach(element => {
        let newData = {
            "title": element[0],
            "description": element[1],
            "content": element[2],
            "url": element[3]
        }

        arr.push(newData)
        // console.table(arr)
    })

    
    if (req.query.key === "1234567890"){
        res.send(arr)
    } else {
        res.json({
            status: 403,
            error: "Wrong API Key"
        })
    }

})

module.exports = router;