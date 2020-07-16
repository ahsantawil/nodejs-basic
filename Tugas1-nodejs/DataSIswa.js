const dataSiswa = require('express').Router()

dataSiswa.get('/', function(req, res) {
    res.json({
        Nama            :`Ahsan Tawil`,
        TanggalLahir    :`07 Desember 1993`,
        jenisKelamin    :`Laki-laki`,
        Hobi            :`Membaca Buku` 
    })
})

module.exports = dataSiswa;