const express = require('express')
const DataSiswa = require('./DataSIswa')
const app = express()
const port = 8080;

app.get('/', (req, res) => res.send(`Selamat Datang di data center siswa Indonesia`))

app.use('/datasiswa', DataSiswa)

app.listen(port, function(){
    console.log(`Running on port ${port}`)
})