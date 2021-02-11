const { Router } = require('express');
const multer = require('multer');

const router = new Router();

const Controller = require('./Controller');

let storage = null;
try {
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}-${file.originalname}`);
        },
    });
} catch (error) {
    console.log(error);
}

const upload = multer({ storage });

router.get('/', Controller.findAll);
router.delete('/:id', Controller.delete);
router.patch('/:id', upload.any(), Controller.update);
router.post('/', upload.any(), Controller.create);

module.exports = router;
