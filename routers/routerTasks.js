import express from 'express';
import controllerTasks from '../controllers/controllerTasks.js';

const router = express.Router();

router.get('/saida/list', controllerTasks.allBills);
router.post('/saida/add', controllerTasks.addBill);
router.put('/saida/updt/:id', controllerTasks.updtBill);
router.delete('/saida/delete/:id', controllerTasks.delBill);
router.post('/saida/search/', controllerTasks.getBillByName);
router.post('/usr', controllerTasks.cadastarUsuario);
router.post('/login', controllerTasks.loginUsuario);
router.post('/entrada/add', controllerTasks.inserirEntrada);
router.get('/entrada/list', controllerTasks.listarEntradas);
router.post('/entrada/search/', controllerTasks.getEntradaByName);
router.delete('/entrada/delete/:id', controllerTasks.deletarEntrada);
router.put('/entrada/updt/:id', controllerTasks.atualizarEntrada);
router.post('/usr/search', controllerTasks.getUserbyMail);

export default router;