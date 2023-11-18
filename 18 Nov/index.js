

// function greetings() {
//     console.log('Hello ');
// };
// function runFor1Sec() {
//     //blocks the js thread for 1 sec;
// };

// setTimeout(greetings, 0);
// runFor1Sec();

// console.log('bye');



//blocking code example
// function getUserByIdSync(userID) {
   
//     const users = {
//         1: { name: 'John', age: 20 },
//         2: { name: 'Peter', age: 30 }
//     };

//     return users[userID];
// }

// const user = getUserByIdSync(1);
// console.log(user);



// //non-blocking code example
// function getUserByIdAsync(userID, callback) {
//     const users = {
//         1: { name: 'John', age: 20 },
//         2: { name: 'Peter', age: 30 }
//     };

//     setTimeout(() => {
//         callback(users[userID])
//     }, 1000)

// }

// getUserByIdAsync(1, (user) => {
//     console.log(user);
// });