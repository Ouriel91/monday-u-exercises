import express from 'express'
import todoRouter from './server/routes/api.js'
import {logger} from './server/middlewares/logger.js'
const port = 8080;
const app = express();

app.use([logger])
app.use(express.json())
app.use(express.static('dist'))
app.use('/todo', todoRouter)

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(port, () => {
    console.log("Server started on port", port);
});