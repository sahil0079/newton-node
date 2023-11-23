import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { insert } from './db.js';
import { createNote } from './notes.js';

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
        console.log(argv)
        const tags = argv.tags ? argv.tags.split(',') : [];
        const note = await createNote(argv.note, tags);
        console.log('Note added!', note.id);
    })
    .demandCommand(1)
    .parse()