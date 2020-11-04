const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors())

const token = '93c7ba0cf82043be2f0938e8c2e80b83fc648dbc'
const newsToken = '576cdf9ce4ac4e5a8d65924c582b3142'

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.get('/search/description/:ticker', (req, res) => {
    const url = `https://api.tiingo.com/tiingo/daily/${req.params.ticker}?token=${token}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send(data)
            res.end()
        })
})

app.get('/search/latestprice/:ticker', (req, res) => {
    const url = `https://api.tiingo.com/iex?tickers=${req.params.ticker}&token=${token}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send(data)
            res.end()
        })
})

app.get('/search/prices/:ticker', (req, res) => {
    const startDate = req.query.startDate
    const resampleFreq = req.query.resampleFreq
    const ticker = req.params.ticker
    // const url = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&resampleFreq=${resampleFreq}&token=${token}`
    const url = `https://api.tiingo.com/iex/${ticker}/prices?startDate=${startDate}&resampleFreq=${resampleFreq}&columns=open,high,low,close,volume&token=${token}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send(data)
            res.end()
        })
})

app.get('/search/lastdayprices/:ticker', (req, res) => {
    // const startDate = req.query.startDate
    // const resampleFreq = req.query.resampleFreq
    const ticker = req.params.ticker
    // const url = `https://api.tiingo.com/iex/${ticker}/prices?startDate=${startDate}&resampleFreq=${resampleFreq}&token=${token}`
    const url = `https://api.tiingo.com/iex?tickers=${ticker}&token=${token}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send(data)
            res.end()
        })
})

app.get('/search/autocomplete/:ticker', (req, res) => {
    const ticker = req.params.ticker
    const url = `https://api.tiingo.com/tiingo/utilities/search?query=${ticker}&token=${token}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send(data)
            res.end()
        })
})

app.get('/search/news/:ticker', (req, res) => {
    const ticker = req.params.ticker
    const url = `https://newsapi.org/v2/everything?apiKey=${newsToken}&q=${ticker}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.send(data)
            res.end()
        })

})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))