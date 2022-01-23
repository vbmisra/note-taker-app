const util = require('util')
const fs = require('fs')
const uuid = require('../helpers/uuid')
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')

class Note {
    read() {
        return readFromFile('db/db.json', 'utf-8')
    }

    write(note) {
        return writeToFile('db/db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read().then((notes) => {
            let allNotes
            try {
                allNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                allNotes = []
            }

            return allNotes
        })
    }

    newNote(note) {
        const { title, text } = note

        if (title || text ) {
            const addedNote = { title, text, id: uuid() } 

            return this.getNotes()
                .then((notes) => [...notes, addedNote])
                .then((updatedNotes) => this.write(updatedNotes))
                .then(() => addedNote)
        } else {
            throw new Error("Note cannot be missing title and text")
        }
    }

    deleteNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes))
    }
}

module.exports = new Note()