import { Router,Request,Response } from 'express';

//LLAMAR A LOS MODELOS CREADOS
import ProductoModel from '../models/producto'
import CategoriaModel from '../models/categoria';
class Producto {
	
    router: Router;
	
    constructor() {
        this.router = Router();
        this.exponerRutas();
    }

    async getProducto(req: Request,res:Response){
        try 
        {
            let productoBD = await ProductoModel.find({}).sort('nombre').exec();
            CategoriaModel.populate(productoBD,{path:"categoria",select:'nombre'});
            let conteo = await ProductoModel.countDocuments();
            res.json(
                {
                    productos: productoBD,
                    conteo: conteo
                });
        } catch (error) 
        {
            return res.status(400).json(
                {
                    dato: error
                });
        }
    }



    async getProductoId(req: Request,res:Response){
        try 
        {
            let idurl = req.params.id;

            let productoBD= await ProductoModel.findById(idurl);
            res.json(
                {
                    ok: true,
                    producto: productoBD
                });
            
        } catch (error) 
        {
            return res.status(400).json(
                {
                    ok: false,
                    dato: "Producto no encontrado",
                    message: error
                }); 
        }
    }

    async postProducto(req: Request,res:Response){
        try {
            let bodycabecera = req.body;
            console.log(req.body);
            let producto = new ProductoModel(
                {
                    nombre: bodycabecera.nombre,
                    precioUni:bodycabecera.precioUni,
                    descripcion:bodycabecera.descripcion,
                    categoria:bodycabecera.categoria,
        
                });
                let productoBD = await producto.save();
                res.json(
                    {
                        producto: productoBD
                    });
            
        } catch (error) 
        {
            return res.status(400).json(
                {
                    dato: error
                });  
        }
    }

    async putProducto(req: Request,res:Response){
        try 
        {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            let productoBD = await ProductoModel.findByIdAndUpdate(idurl, bodycabecera,{ new: true, runValidators: true, context: 'query' });
            res.json(
                {
                    producto: productoBD
                });
            
        } catch (error) 
        {
            return res.status(400).json(
                {
                    ok: "ERROR",
                    dato: error
                });
        }
    }

    async deleteProducto(req: Request,res:Response){
        try 
        {
            let idurl = req.params.id;
            let productoBD = await ProductoModel.findByIdAndRemove(idurl);
            res.json(
                {
                    mensaje: "PRODUCTO ELIMINADO",
                    producto: productoBD
                });
            
        } catch (error) 
        {
            return res.status(400).json(
                {
                    message: "PRODUCTO NO ENCONTRADO",
                    dato: error
                });
            
        }
    }

    exponerRutas() 
    {
        this.router.get('/', this.getProducto);
        this.router.get('/:id', this.getProductoId);
        this.router.post('/', this.postProducto);
        this.router.put('/:id', this.putProducto);
        this.router.delete('/:id', this.deleteProducto);
    }
    }

    const producto = new Producto();
    
    export default producto.router;




    