import { insert } from "./db.js";


export async function createNote(note, tags) {

    const data = {
        tags,
        content: note,
        id: Date.now(),
    };
    insert(data);
    return data;
}