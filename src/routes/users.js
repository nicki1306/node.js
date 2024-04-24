import { Router } from 'express';
import { uploader } from '../uploader.js';

const products = [];


const firstMidd = (req, res, next) => {
    console.log('Se procesa el endpoint'); 
    next();
}

const router = Router();

router.get('/', firstMidd, (req, res) => {
    res.json(products);
});

router.post('/', uploader.single('thumbnail'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.status(200).send({ origin: 'server1', payload: req.body });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; 
    if (nid <= 0 || isNaN(nid)) { 
        res.status(400).send({ origin: 'server1', payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {
        const { email = '', password = '' } = req.body;
        
        res.status(200).send({ origin: 'server1', payload: `Quiere modificar el id ${id} con el contenido del body`, body: { email, password } });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; 

    if (nid <= 0 || isNaN(nid)) { 
        res.status(400).send({ origin: 'server1', payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {        
        res.status(200).send({ origin: 'server1', payload: `Quiere borrar el id ${id}` });
    }
});

export default router;