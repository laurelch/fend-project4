var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const app = express()

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKey = process.env.API_KEY;

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// gets text data from client side and returns the analysis result
app.post('/entry', function (req, res) {
    console.log('POST-entry received');
    const link = req.body.url;
    getAnalysis(link)
    .then(data => res.send(data))
})

// sends text data to meaningcloud api for sentiment analysis
const getAnalysis = async(link) => {
    const res = await fetch(baseURL + apiKey + '&url=' + link + 'lang=en');
    try {
        const data = await res.json();
        console.log('getAnalysis() ', data);
        return data;
    }catch(error){
        console.log('error - getAnalysis()', error);
    }
}