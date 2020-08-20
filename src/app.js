const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Define paths for Expess config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shrikant'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shrikant'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shrikant',
        message: 'I\'m here to help you'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Shrikant',
        errorMessage: 'Artical not found'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!!'
        })
    }

    geocode(req.query.address, (error,{latitude , longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forcast(latitude, longitude , (error, forecastData) =>{
            if (error) {
                return res.send({error})
            }

            res.send({
                forcast: forecastData,
                location,
                address: req.query.address
            })

        })

    })

    // res.send({
    //     forecast :'It is hot',
    //     location:'Mumbai',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            message: 'You must provide search term'
        })
    }
    console.log(req.query);
    res.send({
        procuts: []
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Shrikant',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
})