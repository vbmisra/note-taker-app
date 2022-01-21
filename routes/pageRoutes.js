// import path and express router
const path = require('path')
const router = express.Router()

//note route directs to notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//return the index
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})