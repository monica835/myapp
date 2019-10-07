const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
var mysql = require('mysql')
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        title: 'Hello World',
        date: 'Today'
    });
})
app.get('/user', (req, res) => {
    res.json({
        username: 'monica',
        email: 'monica@gmail.com',
        password: null
    });
})

app.get('/db/create/:username/:password', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'',
        database: 'mikasa25'
    })

    connection.connect()

    connection.query(`INSERT INTO acc(username,email,password) VALUES ('${req.params.username}','${req.params.password}')`, function (err, rows, fields) {
        if (err) throw err

        res.json({
            data: rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})

app.get('/db/update/:username/:password', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mikasa25'
    })

    connection.connect()

    connection.query(`UPDATE acc set username='${req.params.username}',password='${req.params.password}' WHERE id = '${req.params.id}'`, function (err, rows, fields) {
        if (err) throw err

        res.json({
            data: rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})
app.get('/db/delete', (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mikasa25'
    })

    connection.connect()

    connection.query(`DELETE from acc WHERE id = 1`, function (err, rows, fields) {
        if (err) throw err

        res.json({
            data: rows,
            params: req.params,
            username: req.params.username
        })
    })

    connection.end()
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))