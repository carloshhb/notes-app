const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    // const duplicateNotes = notes.filter(function (note){
    //      return note.title === title   
    //  })

    // if (duplicateNotes.length === 0){
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else{
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    
    // const notesToKeep = notes.filter(function (note){
    //      return note.title !== title   
    //  })

    if (notesToKeep.length < notes.length){
        
        console.log(chalk.green.inverse('Note removed'))
    }
    else{
        console.log(chalk.red.inverse('Note not found'))
    }

    saveNotes(notesToKeep)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes'))
    notes.forEach((note) => console.log(note))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead){
        console.log(chalk.cyan.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else{
        console.log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)    
    } catch (error) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}