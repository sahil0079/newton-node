import { getDB, insert, saveDB } from "./db.js";


export async function createNote(note, tags) {

    const data = {
        tags,
        content: note,
        id: Date.now(),
    };
    insert(data);
    return data;
};

export async function getAllNotes() {
    const db = await getDB();
    // console.log('db', db)
    return db.notes;
};

export async function findNotes(filter) {
    const notes = await getAllNotes();
    // console.log('notes', notes)

    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
};

export async function removeNote(id) {
    const notes = await getAllNotes();

    const matchingNote = notes.find(note => note.id === id);
    if (matchingNote) {
        const newNotes = notes.filter(note => note.id !== id);
        await saveDB({ notes: newNotes });
        return id;
    }
};

export async function removeAllNotes() {
    await saveDB({ notes: [] });
}