const express =  require('express')
const todoRouter = require('./server/routes/api.js')
const logger = require('./server/middlewares/logger.js')
const cors = require('cors')
const path = require('path')

const port = 8080;
const app = express();

app.use([logger])
app.use(express.json())
app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use('/todo', todoRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK'
    })
})

app.listen(process.env.PORT || port, () => {
    console.log("Server started on port", process.env.PORT || port);
});