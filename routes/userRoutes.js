const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.list);
router.get('/create', userController.formCreate);
router.post('/create', userController.create);
router.get('/edit/:numero_documento', userController.formEdit);
router.get('/formEdit', userController.formEditRender);
router.post('/edit/:numero_documento', userController.update);
router.get('/delete/:numero_documento', userController.delete);

module.exports = router;