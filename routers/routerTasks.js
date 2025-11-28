import express from 'express';
import controllerTasks from '../controllers/controllerTasks.js';

const router = express.Router();

router.get('/main', controllerTasks.allBills);
router.post('/add', controllerTasks.addBill);
router.put('/updt/:id', controllerTasks.updtBill);
router.delete('/delete/:id', controllerTasks.delBill);
router.get('/search/:id', controllerTasks.getBillById);
router.post('/usr', controllerTasks.cadastarUsuario);
router.post('/login', controllerTasks.loginUsuario);

export default router;