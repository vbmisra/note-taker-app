const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}`)
);

app.post('/notes', (req, res) => {

    console.info(`${req.method} received to add a note.`);

    const { title, text, id } = req.body;

    console.log(req.body);

    if (req.body) {
        const newNote = {
            title,
            text,
            id
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added!`);
    } else {
        res.error(`Error in adding note.`);
    }

});

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else {
            const newData = JSON.parse(data);
            newData.push(content);
            writeToFile(file, newData);
        }
    })
}

const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const newData = JSON.parse(data)
            newData.forEach(element => {
                if(element.id == id) {
                    newData.splice(element,1)
                }
            });

            writeToFile(file, newData)
        }
    })
}

app.delete('/notes/:id', (req, res) => {
    if (req) {
        readAndDelete(req.params.id, './public/db/db.json')
        res.json(`Successfully deleted note.`)
    } else {
        res.error(`Error in deleting note.`)
    }
})

const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
        err ? console.error(err) : console.info(`\n Data successfully written!`))
}

