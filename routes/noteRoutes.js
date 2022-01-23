const router = require('express').Router()
const note = require('../models/Note')

// get all notes
router.get('/notes', (req, res) => {
    note
        .getNotes()
        .then((notes) => {
            return res.json(notes)
        })
        .catch((err) => res.status(500).json(err))
})

// post a new note
router.post('/notes', (req, res) => {
    note
        .newNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err))
})

// delete a note based on note id
router.delete('/notes/:id', (req, res) => {
    note
        .deleteNote(req.params.id)
        .then(() => res.json( { ok: true }))
        .catch((err) => res.status(500).json(err))
})
