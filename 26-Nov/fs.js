//file system module
//read, create, update, delete, rename the files

// var fs = require('fs');
// var http = require('http');


// fs.readFile('template.html', 'utf8', function (error, data) {
//     console.log(data)
// })

// const server = http.createServer(function (req, res) {

//     fs.readFile('template.html', 'utf8', function (error, data) {
//         // console.log(data)

//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(data);
//         return res.end();
//     })

// });
// server.listen(8080, function () {
//     console.log(`Server started at port 8080`)
// });




var fs = require('fs');

//create files

//appends specific content to a file. if file is not there it will be created;

// fs.appendFile('file1.txt', "Hello world", function (err) {
//     if (err) throw err;
//     console.log('saved');
// })

//takes a falg as a second argument in this case flag is w that means file
//is open for writing, if file is not there it will create file

// fs.open('file2.txt', 'w', function (err) {
//     if (err) throw err;
//     console.log('saved');
// })

//replaces the spcified file and content if exists, if not then it will create a new file with the specified content

// fs.writeFile('file1.txt', "Hello content", function (err) {
//     if (err) throw err;
//     console.log('saved');
// })

// fs.unlink('file2.txt', function (err) {
//     if (err) throw err;
//     console.log('file deleted');
// });

fs.rename('file1.txt', 'file1renamed.txt', function (err) {
    if (err) throw err;
    console.log('file renamed')
})