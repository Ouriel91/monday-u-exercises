import express from 'express'
const port = 8080;
const app = express();

app.use(express.json())
app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(port, () => {
    console.log("Server started on port", port);
});