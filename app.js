// import file system
// const fs = require('fs');


// fs.copyFileSync("text.text","text2.text")
// console.log('File text.text berhasil dicopy')

// const hero = require('superheroes')
// for(let i = 0; i < 10; i++) {
//     console.log(hero.random());
// }

const op = require('./module')

const moduleTitle = op.title;
const moduleTambah = op.tambah(10,5);
const moduleKali = op.kali(10,10);

console.log(moduleTitle)
console.log(moduleTambah)
console.log(moduleKali)
