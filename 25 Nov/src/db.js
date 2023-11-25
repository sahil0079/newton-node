import fs from 'node:fs/promises';

const DB_PATH = new URL('../db.json', import.meta.url);

// reads the db.json file and parses it into javascript object
export async function getDB() {
    const db = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(db);
};

//writes a given javascript object into db.json file

export async function saveDB(db) {
    await fs.writeFile(DB_PATH, JSON.stringify(db))
    return db;
};

//takes object representation of the note and it adds to the notes array in db.json file
export async function insert(data) {
    const db = await getDB();
    db.notes.push(data);
    await saveDB(db);
    return data;
};




