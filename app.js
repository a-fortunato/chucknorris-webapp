'use strict'

const bodyParser = require('body-parser')
const Chuck = require('chucknorris-io')
const express = require('express')

const app = express()
const client = new Chuck()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {  
  let categories = []

  // Retrive all Categories
  client.getJokeCategories().then(result => {
    categories = result
    res.render('index.ejs', {categories})
  }).catch(err => {
    console.error ('Couldn\'t retrieve Joke Categories!', err)
    res.render('index.ejs')
  })
})

app.post('/clicked', (req, res) => {
  const category = req.body.category
  let joke = ''
   
  // Retrieve a random Chuck joke from the given category
  client.getRandomJoke(category).then(response => {
    joke = response.value
    res.send({joke})
  }).catch(err => {
    console.log('Could\'nt retrieve joke from ' + category + '. Sorry! :<', err)
  })
})

app.listen(port, () => {
  console.log('Example web app listening at port ' + port)
})
