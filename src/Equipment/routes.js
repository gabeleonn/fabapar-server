const { Router } = require('express');
const multer = require('multer');

const router = new Router();

const Controller = require('./Controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

router.get('/:at', Controller.findAll);
router.delete('/:id', Controller.delete);
router.patch('/:id', Controller.update);
router.post('/', upload.single('file'), Controller.create);

module.exports = router;
