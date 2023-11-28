import express from 'express';
import records from './routes/record.mjs';



const PORT = 5050;
const app = express();

// console.log(records)

// function doOnIncoming(req, res) {
//     res.send('Hello world')
// }

// app.get('/', doOnIncoming);

// app.get('/', (req, res) => {
//     res.send('Hello world')
// })

app.use("/record", records)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})