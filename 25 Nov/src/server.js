import http from 'node:http';
import fs from 'node:fs/promises';
import { getAllNotes } from './notes.js';

function formatNotes(notes) {
    return notes.map(note => {
        return `
            <div class="note">
                <p>${note.content}</p>
            </div>
        `
    }).join('\n')
}

function interpolate(html, data) {

    return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
        return data[placeholder] || ''
    })
}

const server = http.createServer(async (req, res) => {
    const HTML_PATH = new URL('./template.html', import.meta.url);
    const template = await fs.readFile(HTML_PATH, 'utf-8')
    // console.log('template', template)
    const notes = await getAllNotes();

    const formattedNotes = formatNotes(notes);
    const html = interpolate(template, { notes: formattedNotes })

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});


server.listen(8000, () => {
    console.log(`Server is running at port 8000`)
})

