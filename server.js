// import express and routes for pages and notes
const express = require('express');
const noteRoutes = require('./routes/noteRoutes')
const pageRoutes = require('./routes/pageRoutes')


const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', noteRoutes)
app.use('/', pageRoutes)

//start server
app.listen(PORT, () => 
    console.log(`App listening at ${PORT}`)
)
