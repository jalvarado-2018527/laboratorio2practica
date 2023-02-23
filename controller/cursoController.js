const { response, request } = require('express');

const Curso = require('../models/cursoModel');
const { Promise } = require('mongoose');

const getCurso = async (req = request, res = response) => {

   
    const query = {estado: true}

    const listaCurso = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query).populate('usuario','nombre')
    ]);

    res.json({
        msg: 'Get Api de curso',
        listaCurso
    })
}

const getCursoId = async (req = request, res = response) => {

    const { id } = req.params;
    const curso = await Curso.findById(id).populate('usuario','nombre')

    res.json({
        msg: 'Get Api de curso',
         curso
    })
}

const postCurso = async (req = request, res = response) => {
    const  nombre  = req.body.nombre.toUpperCase()
    
    const cursoDb = await Curso.findOne({nombre});
    
    if (cursoDb) {
        return res.status(400).json({
            msg: `la curso ${cursoDb.nombre}, ya existe en la db`
        })
    }

    const data ={
        nombre,
        usuario: req.usuario._id
    }

    const cursoAgregada = new Curso(data);

    await cursoAgregada.save()

    res.status(201).json({
        msg: 'Post api',
         cursoAgregada,
        
    })

}

const putCurso = async (req = request, res = response) => {
    const { id } = req.params;

    const { _id, estado , usuario , ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase()
    resto.usuario = req.usuario._id



    const editarCurso = await Curso.findOneAndReplace(id, resto,{new:true});



    res.json({
        msg: "api para editar",
     editarCurso
    })
}

const deleteCurso = async (req = request, res = response) => {
    const { id } = req.params;

    const eliminarcurso = await Curso.findByIdAndRemove(id)


    res.json({
        msg: "api para borrar",
         eliminarcurso
    })
}


module.exports = {
    getCurso,
    postCurso,
    putCurso,
    deleteCurso,
    getCursoId
}