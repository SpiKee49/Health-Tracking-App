import express, { json } from 'express'

import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import mysql2 from 'mysql2'
import path from 'path'

const app = express()
const port = 3000

/* DB connection */
const connection = mysql2.createConnection({
    host: 'mariadb',
    user: 'root',
    password: 'pele',
    port: '3306',
    database: 'maindb',
    connectionLimit: 10,
})

// https://stackoverflow.com/a/50052194
const __dirname = dirname(fileURLToPath(import.meta.url))

/* API setup */
app.use(cors())
app.use(express.json({ extended: false }))
app.use(express.static(path.join(__dirname, '../../dist')))

/* 
    Endpoints
*/

app.get('/users', (_, res) => {
    connection.query('select * from `Users`', (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ msg: 'Unexpected error' }).end()
        }
        res.status(200).json(result).end()
    })
})

app.get('/advertisement', (_, res) => {
    connection.query('select * from `Advertisement` limit 1', (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ msg: 'Unexpected error' }).end()
        }
        res.status(200).json(result).end()
    })
})

app.post('/advertisement', (req, res) => {
    const body = req.body
    connection.query(
        'update `Advertisement` set imageSrc=?, linkTo=?, clickCounter=? where id = 1',
        [body.imageSrc, body.linkTo, body.clickCounter],
        (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json({ msg: 'Unexpected error' }).end()
            }
            res.status(200).json(result).end()
        }
    )
})

app.post('/remove-user', (req, res) => {
    const body = req.body
    connection.query(
        'delete from `Users` where userID = ?',
        [body.userID],
        (err) => {
            if (err) {
                console.log(err)
                res.status(400).json({ msg: 'Unexpected error' }).end()
            }
            res.status(200).json({ msg: 'User removed successfully' }).end()
        }
    )
})

app.post('/remove-method', (req, res) => {
    const body = req.body
    connection.query(
        'delete from `Methods` where methodID = ?',
        [body.methodID],
        (err) => {
            if (err) {
                console.log(err)
                res.status(400).json({ msg: 'Unexpected error' }).end()
            }
            res.status(200).json({ msg: 'Method removed successfully' }).end()
        }
    )
})

/* Get methods endpoint */
app.get('/methods', (_, res) => {
    connection.query('select * from `Methods`', (err, result) => {
        if (err) {
            res.status(400).json({ msg: 'Unexpected error' }).end()
        }

        res.status(200).json(result).end()
    })
})

/* Add activity log */
app.post('/methods', (req, res) => {
    const body = req.body
    const heartValues = [
        body.currentDate,
        body.hearBeat,
        body.userID,
        body.activity,
    ]
    const weightValues = [
        body.currentDate,
        body.weight,
        body.userID,
        body.activity,
    ]
    const stepsValues = [
        body.currentDate,
        body.steps,
        body.userID,
        body.activity,
    ]
    connection.query(
        'insert into `HeartBeat` (added_date,amount,userID,methodID) VALUES (?);',
        [heartValues],
        (err) => {
            if (err) {
                console.log(err)
                res.status(400)
                    .json({
                        msg: 'Hey dude, you messed up, try again... or whatever.js',
                    })
                    .end()
            }
        }
    )
    connection.query(
        'insert into `Weights` (added_date,amount,userID,methodID) VALUES (?);',
        [weightValues],
        (err) => {
            if (err) {
                console.log(err)
                res.status(400)
                    .json({
                        msg: 'Hey dude, you messed up, try again... or whatever.js',
                    })
                    .end()
            }
        }
    )
    connection.query(
        'insert into `Steps` (added_date,amount,userID,methodID) VALUES (?);',
        [stepsValues],
        (err) => {
            if (err) {
                console.log(err)
                res.status(400)
                    .json({
                        msg: 'Hey dude, you messed up, try again... or whatever.js',
                    })
                    .end()
            }
        }
    )
    res.status(200)
        .json({ msg: 'Successfully activity successfully logged' })
        .end()
})

app.post('/register', (req, res) => {
    const body = req.body
    connection.query(
        'insert into `Users` (username, userpassword, email, age, height) values (?);',
        [Object.values(body)],
        (err, result) => {
            if (err || result.length === 0) {
                console.log(err)
                res.status(400).json({ msg: err }).end()
            }

            res.status(200).json({ msg: 'Success' }).end()
        }
    )
})

app.post('/add-method', (req, res) => {
    const body = req.body
    connection.query(
        'insert into `Methods` (methodName,methodDesc) values (?);',
        [Object.values(body)],
        (err, result) => {
            if (err || result.length === 0) {
                console.log(err)
                res.status(400).json({ msg: 'Sum tin wong' }).end()
            }

            res.status(200)
                .json({ msg: 'Successfully added a new activity' })
                .end()
        }
    )
})

/* Get all Steps endpoint */
app.get('/getlogs', (_, res) => {
    connection.query(
        'select S.id,S.added_date,S.amount as steps,W.amount as weight,H.amount as heartBeat,S.userID,S.methodID from `Steps` as `S` inner join `Weights` as `W` on W.id = S.id join `HeartBeat` as `H` on S.id = H.id',
        (err, result) => {
            if (err || result.length === 0) {
                console.log(err)
            }
            res.status(200).json(result).end()
        }
    )
})

app.post('/login', (req, res) => {
    const body = req.body
    connection.query(
        'SELECT * FROM `Users` WHERE `email` = ? AND `userpassword` = ?',
        [body.email, body.password],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.status(200).json(result).end()
        }
    )
})

app.get('/methods', (_, res) => {
    connection.query('select * from `Methods`', (err, result) => {
        if (err) {
            res.status(400).json({ msg: 'Unexpected error' }).end()
        }

        res.status(200).json(result).end()
    })
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))
