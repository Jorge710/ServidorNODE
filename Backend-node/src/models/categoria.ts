import { Schema, model } from 'mongoose';

let categoriaSchema = new Schema(
    {
        nombre :{
            type: String,
            required: [true,'Nombre es Obligatorio']
        }
    });

export default model('Categoria',categoriaSchema);
