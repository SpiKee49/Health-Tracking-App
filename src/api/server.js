import express, { json } from 'express'

import cors from 'cors'
import mysql2 from 'mysql2'

const app = express()
const port = 3000

/* DB connection */
const connection = mysql2.createConnection({
    host: 'mariadb',
    user: 'root',
    password: 'pele',
    port: '3306',
    database: 'maindb',
})

/* API setup */
app.use(cors())
app.use(express.json({ extended: false }))

/* 
    Endpoints
*/

/* Home endpoint */
app.get('/', async (_, res) => {
    const data = await new Promise((resolve) => {
        connection.query(`SELECT * FROM Users`, (err, result) => {
            if (err || !Array.isArray(result) || result.length === 0) {
                return resolve(null)
            }

            resolve(result)
        })
    })

    res.status(200).json(data).end()
})

/* Get methods endpoint */
app.get('/methods', async (_, res) => {
    const data = await new Promise((resolve) => {
        connection.query(`SELECT * FROM Methods`, (err, result) => {
            if (err || !Array.isArray(result) || result.length === 0) {
                return resolve(null)
            }

            resolve(result)
        })
    })

    res.status(200).json(data).end()
})

/* Add activity log */
app.post('/methods', (req, res) => {
    const body = req.body
    const data = []
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
        'INSERT INTO `HeartBeat` (added_date,amount,userID,methodID) VALUES (?);',
        [heartValues],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
            data.push(result)
        }
    )
    connection.query(
        ' INSERT INTO `Weights` (added_date,amount,userID,methodID) VALUES (?);',
        [weightValues],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
            data.push(result)
        }
    )
    connection.query(
        ' INSERT INTO `Steps` (added_date,amount,userID,methodID) VALUES (?);',
        [stepsValues],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
            data.push(result)
        }
    )
    res.status(200).json(data).end()
})

/* Get all Steps endpoint */
app.get('/steps', async (_, res) => {
    const data = await new Promise((resolve) => {
        connection.query(`SELECT * FROM Steps`, (err, result) => {
            if (err || result.length === 0) {
                return resolve(null)
            }

            resolve(result)
        })
    })

    res.status(200).json(data).end()
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

app.listen(port, () => console.log(`Server listening on port ${port}!`))
