const axios = require('axios');
// const api = require('./api')
const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: 'http://127.0.0.1:5500'
}

app.use(cors(corsOptions))

// const API_KEY = api
const API_KEY = process.env.MY_KEY


// var FROM = 'USD'
// var TO = 'PKR'
var inputData = 2.3;

app.get('/',(req,res)=>{
    res.json({msg: "success"})
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

app.get('/convert/:from/:to/:input',(req,res)=>{
    var FROM = req.params.from 
    var TO = req.params.to 
    var inputData = req.params.input 
    axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${FROM}&to_currency=${TO}&apikey=${API_KEY}`)
    .then(function (response) {
        var data = response.data['Realtime Currency Exchange Rate'];
        var rate = data['5. Exchange Rate'];
        var result = inputData * rate
        var ResultCurrency = Math.round((result + Number.EPSILON) * 100) / 100
        res.status(200).json({
            result: ResultCurrency,
            currency: data['4. To_Currency Name'],
            time: data['6. Last Refreshed']
        })
        })
    .catch(function (error) {
        res.status(400).json({
            msg: 'something went wrong'
        })
    })
})


