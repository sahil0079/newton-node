import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { insert } from './db.js';
import { createNote, findNotes, getAllNotes, removeAllNotes, removeNote } from './notes.js';
import { listAllNotes } from './utils.js';

// yargs(hideBin(process.argv))
//     .command('curl <url>', 'fetch the contents of the URL', () => { }, (argv) => {
//         console.info(argv)
//     })
//     .demandCommand(1)
//     .parse()


yargs(hideBin(process.argv))
    .command('new <note>', 'create a new note', yargs => {
        return yargs.positional('note', {
            describe: 'The content of the note you want to create',
            type: 'string'
        })
    }, async (argv) => {
        // console.log(argv)
        const tags = argv.tags ? argv.tags.split(',') : [];
        const note = await createNote(argv.note, tags);
        console.log('Note added!', note.id);
    })
    .option('tags', {
        alias: 't',
        type: 'string',
        description: 'tags to add to the note'
    })
    .command('all', 'get all notes', () => { }, async (argv) => {
        const notes = await getAllNotes();
        // console.log(notes);
        listAllNotes(notes);

    })
    .command('find <filter>', 'get the matching notes from db', yargs => {
        return yargs.positional('filter', {
            describe: 'The search input to filter the notes and will be applied to content',
            type: 'string'
        })
    }, async (argv) => {
        // console.log(argv)

        const filteredNotes = await findNotes(argv.filter);

        // console.log('filteredNotes', filteredNotes)
        listAllNotes(filteredNotes);

    })
    .command('remove <id>', 'remove a note by its id', yargs => {
        return yargs.positional('id', {
            description: 'The id of the note that u want to remove',
            type: 'number'
        })
    }, async (argv) => {
        console.log(argv)
        const id = await removeNote(argv.id);
        if (id) {
            console.log('Note removed: ', id);
        } else {
            console.log('Note not found');
        }

    })
    .command('clean', 'remove all notes', () => { }, async (argv) => {
        await removeAllNotes();
        console.log('All notes removed');
    })
    .demandCommand(1)
    .parse()