const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const { JsonWebTokenError } = require('jsonwebtoken');
const app = express();
const { MONGOURL } = require('./keys')
require('./models/user')
require('./models/post')

// app.use(cors())

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => {
    console.log("connected");
})
mongoose.connection.on("error", (err) => {
    console.log("err:", err);
})




const PORT = 5000
app.listen(PORT, () => console.log("app listenig on port:", PORT))