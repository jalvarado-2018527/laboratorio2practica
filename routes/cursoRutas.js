const { Router } = require('express');
const { check } = require('express-validator');
const { getCurso, postCurso, putCurso, deleteCurso, getCursoId } = require('../controller/cursoController');
const { idCursoExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getCurso);

router.get('/mostrar/:id', [
    check('id', "no es un id valido").isMongoId(),
    check('id').custom(idCursoExiste),
    validarCampos
], getCursoId)

router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    validarCampos
], postCurso);



router.put('/editar/:id', [
    validarJWT,
    esAdminRole,
    check('id', "no es un id valido").isMongoId(),
    check('id').custom(idCursoExiste),
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    validarCampos
], putCurso);

router.delete('/delete/:id', [
    validarJWT,
    esAdminRole,
    check('id', "no es un id valido").isMongoId(),
    check('id').custom(idCursoExiste),
    validarCampos
], deleteCurso)

module.exports = router;
