const Usuario = require('../models/usuarioModel')
const Curso = require('../models/cursoModel')
const Asignacion = require('../models/asignacionModel')
const Role = require('../models/role')

const emailExiste = async(correo = '') =>{
    // verificar si el correo existe
    const existeEmailDeUsuario = await Usuario.findOne({correo})
    if (existeEmailDeUsuario ) {
        throw new Error(`el correo ${correo}, ya existe`)
    }
        
}

const esRoleValido =async(rol = '') =>{

    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`el rol ${rol}, no existe en la db`)
    }
}

const existIdOfUser = async(id)=>{
    const existIdOfUser = await Usuario.findById(id)
    if (!existIdOfUser) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}
const idCursoExiste = async(id)=>{
    const idAsignacion = await Curso.findById(id)
    if (!idAsignacion) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}
const idAsignacionExiste = async(id)=>{
    const idAsignacionExiste = await Asignacion.findById(id)
    if (!idAsignacionExiste) {
        throw new Error(`el id ${id}, no existe en la db`)  
    }
}
const curso1NoEsIgual =async(curso_1 = '', curso_2 = '') =>{
    // const {rol, nombre} =req.usuario
    // if (rol !== 'ROL_ALUMNO') {
    //     return res.status(401).json({
    //         msg : `${nombre} solo los alumnos pueden asignarce a cursos`
    //     })
    // }
    const curso1no = await Asignacion.findOne({curso_1})
    const curso2no = await Asignacion.findOne({curso_2})
    
    if (curso1no ===  curso2no) {
        throw new Error("as")  
    }
}


module.exports ={
    emailExiste,
    esRoleValido,
    existIdOfUser,
    idCursoExiste,
    idAsignacionExiste,
    curso1NoEsIgual
}