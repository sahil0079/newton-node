#!/usr/bin/env node

// console.log('hello world');
// console.log(process.argv);
const note = process.argv[2];

const newNote = {
    id: Date.now(),
    note,
};
console.log('New note is: ', newNote)