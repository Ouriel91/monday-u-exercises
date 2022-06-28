const express =  require('express')
const todoRouter = require('./server/routes/api.js')
const logger = require('./server/middlewares/logger.js')
const cors = require('cors')

const port = 8080;
const app = express();

app.use([logger])
app.use(express.json())
app.use(cors())
app.use('/todo', todoRouter)

app.listen(port, () => {
    console.log("Server started on port", port);
});