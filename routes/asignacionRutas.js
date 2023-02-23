const { Router } = require('express');
const { check } = require('express-validator');
const { GetAsignacion, DeleteAsignacion, PostAsignacion, PutAsignacion, getAsignacionId } = require('../controller/asignacionController');
const { idAsignacionExiste, idCursoExiste , existIdOfUser, curso1NoEsIgual } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, esAlumnoROl } = require('../middlewares/validar-roles');


const router = Router();

router.get('/mostrar', GetAsignacion);

router.get('/mostrar/:id', getAsignacionId);

router.post('/agregar',[
    esAlumnoROl,
    check('usuario', "id de mongo no existe").isMongoId(),
    check('usuario').custom( existIdOfUser),
    check('curso_1').custom(idCursoExiste),
   // check('curso_1').custom(curso1NoEsIgual),
    check('curso_2').custom(idCursoExiste),
    check('curso_3').custom(idCursoExiste),
    validarCampos,
] ,PostAsignacion );

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom( idAsignacionExiste),
    check('usuario', "id de mongo no existe").isMongoId(),
    check('usuario').custom( existIdOfUser),
    check('curso_1').custom(idCursoExiste),
   // check('curso_1').custom(curso1NoEsIgual),
    check('curso_2').custom(idCursoExiste),
    check('curso_3').custom(idCursoExiste),
    validarCampos,
], PutAsignacion);

router.delete('/delete/:id',[
    validarJWT,
    esAdminRole,
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom( idAsignacionExiste),
    validarCampos
] ,DeleteAsignacion)


module.exports = router;