const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
const path = require('path');

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


router.get('/', (req, res) => {
    res.render('base', {
        title: 'Krea Profil',
        content: './create-profile', // Embed home.ejs
        stylesheets: ['./css/style.css'],
        scripts: ['./js/index.js','./socket.io/socket.io.js','./js/socket.js']
    });
});

router.get('/add-avatar', (req, res) => {
    res.render('base', {
        title: 'Hinka potrèt',
        content: './add-avatar.ejs', // Embed home.ejs
        stylesheets: ['./css/style.css'],
        scripts: ['./js/index.js','./socket.io/socket.io.js','./js/socket.js']
    });
});

router.get('/dashboard', (req, res) => {
    res.render('base', {
        title: 'Dashboard',
        content: './index.ejs', // Embed home.ejs
        stylesheets: ['./css/style.css'],
        scripts: ['./js/index.js', './socket.io/socket.io.js', './js/socket.js']
    });
});

router.post('/upload', upload.single('avatar'), (req, res) => {
    if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ success: true, imageUrl });
    } else {
        res.status(400).json({ success: false, message: 'No file uploaded' });
    }
});

router.use((req, res) => {
    res.status(404).render('base', {
        title: 'Page Not Found',
        content: './404.ejs', // Create a 404.ejs template
        stylesheets: ['/css/style.css'],
        scripts: ['/js/script.js']
    });
});



module.exports = router;