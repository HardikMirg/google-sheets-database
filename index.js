const app = require('express')();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.send("Welcome to blogs API that fetches data from google sheets and uses it as a database")
});

let data = require('./routes/data')

app.use('/data', data)

app.listen(PORT, () => console.log("Hello World, Server running!"));