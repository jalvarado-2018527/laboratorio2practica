const { response, request } = require('express');

const Asignacion = require('../models/asignacionModel');
const { Promise } = require('mongoose');


const GetAsignacion = async(req = request , res = response) =>{

    const listaAsignaciones = await Promise.all([
        Asignacion.countDocuments(),
        Asignacion.find().
        populate('usuario', "nombre").
        populate('curso_1', "nombre").
        populate('curso_2', "nombre").
        populate('curso_3', "nombre")
    ])

    res.json({
        msg: 'Get Api de asignacion',
        listaAsignaciones
    })


}
const getAsignacionId = async (req = request, res = response) => {

    const { id } = req.params;
    const asignacion = await Asignacion.findById(id)
    .populate('usuario', "nombre").
    populate('curso_1', "nombre").
    populate('curso_2', "nombre").
    populate('curso_3', "nombre")

    res.json({
        msg: 'Get Api de curso',
        asignacion
    })
}

const PostAsignacion = async(req = request , res = response) =>{

    const { estado, ...body } = req.body;
    const asignacionDB = await Asignacion.findOne({ usuario: body.usuario });

    if (asignacionDB) {
        return res.status(400).json({
            msg: `el usuario ${asignacionDB.usuario}. ya esta asignado a sus crusos`
        })
    }
    const data = {
        ...body,
        usuario: body.usuario
    }

    const asignacion = new Asignacion(data)

    await asignacion.save()

    res.status(201).json({
        msg: 'Post api',
        asignacion
    })

}
const PutAsignacion = async(req = request , res = response) =>{

    const { id } = req.params;

    const { _id, estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id



    const editarAsignacion = await Asignacion.findByIdAndUpdate(id, data, { new: true });


    res.json({
        msg: 'Put api',
        editarAsignacion
        
    })

}
const DeleteAsignacion = async(req = request , res = response) =>{

    const {id} = req.params;

    const asignacionborrar = await Asignacion.findByIdAndDelete(id);

    res.json({
        msg: 'Delete api',
        asignacionborrar
    })

}

module.exports = {
    
    GetAsignacion,
    DeleteAsignacion,
    PostAsignacion,
    PutAsignacion,
    getAsignacionId

}