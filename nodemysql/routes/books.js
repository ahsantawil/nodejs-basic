const express = require('express');
const router = express.Router();
const dbconn = require('../config/db');

// display data
router.get('/', (req, res, next) => {
    dbconn.query('SELECT * FROM books ORDER BY id desc', (err, rows) => {
        if (err) {
            req.flash('error', err);
            res.render('books', { data: '' });
        } else {
            res.render('books', { data: rows });
        }
    });
});

router.get('/add', (req, res, next) => {
    res.render('books/add', {
        name: '',
        author: ''
    })
})

// post 
router.post('/add', (req, res, next) => {
    const name = req.body.name;
    const author = req.body.author;
    const errors = false;

    if (name.length === 0 || author.length === 0) {
        errors = true;

        req.flash('error', 'Please enter name and author');
        res.render('books/add', {
            name: name,
            author: author
        });
    }
    
    if (!errors) {
        let form_data = {
            name: name,
            author : author
        }

        dbconn.query('INSERT INTO books SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('books/add', {
                    name: form_data.name,
                    author: form_data.author
                })
            } else {
                req.flash('success ', 'Book Success Added');
                res.redirect('/books');
            }
        })
    }
});

// edit
router.get('/edit/(:id)', (req, res, next) => {
    const id = req.params.id;

    dbconn.query('SELECT * FROM books WHERE id=' + id, (err, rows, fields) => {
        if (err) throw err
        
        if (rows.length <= 0) {
            req.flash('error', `Book not found with id= ${id}`);
            res.redirect('/books')
        } else {
            res.render('books/edit', {
                title: 'Edit Book', 
                id: rows[0].id,
                name: rows[0].name,
                author: rows[0].author
            })
        }
    })
})

// update book
router.post('/update/:id', (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const author = req.body.author;
    const errors = false;

    if (name.length === 0 || author.length === 0) {
        errors = true;

        req.flash('error', 'Please enter name and author');
        res.render('books/edit', {
            id: req.params.id,
            name: name,
            author: author
        })
    }

    if (!errors) {
        const form = {
            name: name,
            author: author
        }
        dbconn.query('UPDATE books SET ? WHERE id = ' + id, form, (err, result) => {
            
            if (err) {
                req.flash('error', err)
                res.render('books/edit', {
                    id: req.params.id,
                    name: form.name,
                    author: form.author
                })
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/books');
            }
        })
    }
});

// delete
router.get('/delete/(:id)', (req, res, next) => {
    const id = req.params.id;

    dbconn.query('DELETE FROM books WHERE id =' + id, (err, result) => {
        if (err) {
            req.flash('error', err)
            res.redirect('/books')
        } else {
            req.flash('success', `Book successfully deleted! ID = ${id}`)
        }
    })
})

module.exports = router;