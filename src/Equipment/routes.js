const { Router } = require('express');
const multer = require('multer');

const router = new Router();

const Controller = require('./Controller');

let storage = null;
try {
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (typeof req.file !== 'undefined') {
                switch (file.fieldname) {
                    case 'file':
                        cb(null, 'uploads/notas');
                    case 'term':
                        cb(null, 'uploads/termos');
                }
            }
        },
        filename: function (req, file, cb) {
            if (typeof req.file !== 'undefined') {
                cb(null, file.originalname);
            }
        },
    });
} catch (error) {
    console.log(error);
}

const upload = multer({ storage });

router.get('/', Controller.findAll);
router.delete('/:id', Controller.delete);
router.patch('/:id', Controller.update);
router.post(
    '/',
    upload.fields([{ name: 'file' }, { name: 'term' }]),
    Controller.create
);

module.exports = router;
