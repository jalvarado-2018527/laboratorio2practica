const { Schema, model } = require("mongoose")

const AsignacionSchema = Schema({


    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    curso_1: {
        type: Schema.Types.ObjectId,
        ref: 'Curso'

    },
    curso_2: {
        type: Schema.Types.ObjectId,
        ref: 'Curso'

    },
    curso_3: {
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },

})

module.exports = model('Asignacion', AsignacionSchema)
