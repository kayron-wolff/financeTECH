import express from 'express';
import controllerTasks from '../controllers/controllerTasks.js';

const router = express.Router();

router.get('/', controllerTasks.allTasks);
router.post('/', controllerTasks.createTask);
router.put('/:id', controllerTasks.updtTask);
router.delete('/:id', controllerTasks.delTask);
router.get('/:id', controllerTasks.getTaskById);

export default router;