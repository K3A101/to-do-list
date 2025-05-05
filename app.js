require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 4242

let tasks = [];


app.use(express.static(path.resolve('static')));

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Routing file
let appRoutes = require('./routes/routes');
app.use('/', appRoutes);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('initialTasks', tasks);

    socket.on('addTask', (taskText) => {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        io.emit('tasks', tasks);
    });

    socket.on('toggleTask', (index) => {
        if (tasks[index]) {
            tasks[index].completed = !tasks[index].completed;
            io.emit('tasks', tasks);
        }
    });

    socket.on('resetTasks', () => {
        tasks = [];
        io.emit('tasks', tasks);
    });

    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})


server.listen(port, () => {
    console.log(`Todo list app listening on  http://localhost:${port}`)
});
