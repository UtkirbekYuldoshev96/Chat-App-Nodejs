const express = require("express");
const bodyParser = require("body-parser");
const {Socket} = require("socket.io");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");



app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const message = [
    {name: "admin", message: "Assalomu allaykum xush kelibsiz!"},
    {name: "fodalanuvchi", message: "Sayt dan ro'yxatdan qanday o'tsam bo'ladi"},
]
app.get('/message', (req, res) => {
    res.send(message);
})

io.on('connection', (socket) =>{
    console.log('user connecktion');
})

app.post("/message", (req, res) => {
    message.push(req.body);
    io.emit('message', req.body)
    res.sendStatus(200);
})

const server = app.listen(3010, () => {
    console.log("bu mening birinchi kodim express", server.address().port);
});
