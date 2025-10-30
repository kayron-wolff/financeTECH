import modelTasks from '../models/modelTasks.js';

export async function allTasks(req, res) {
    //SELECT * FROM [..]
    try {
        const tasks = await modelTasks.listar();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter as tarefas' });

    }
}

export async function createTask(req, res) {
    //INSERT INTO [..]
    const task = req.body;
    console.log(task);
    try {
        const novaTask = await modelTasks.criar(task);
        res.status(201).json(novaTask);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }
}

export async function updtTask(req, res) {
    //UPDATE [..]
    const id = req.params.id;
    const dadosAtualizados = req.body;
    try {
        const tarefaAtualizada = await modelTasks.atualizar(id, dadosAtualizados);
        res.status(200).json(tarefaAtualizada);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
}

export async function delTask(req, res) {
    //DELETE FROM [..]
    const id = req.params.id;
    try {
        await modelTasks.deletar(id);
        res.status(200).json({ message: 'Tarefa deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar a tarefa' });
    }
    
}

export async function getTaskById(req, res) {
    //SELECT * FROM [..]
    const id = req.params.id;
    try{
        
        const task = await modelTasks.buscarPorId(id);
        if(task.length === 0){
            res.status(404).json({message: 'Tarefa não encontrada'});
        }else{
            res.status(200).json(task[0]);
        }
    }catch(err){
        res.status(500).json({error: 'Erro ao obter a tarefas'});
    
    }
}

export default {
    allTasks,
    updtTask,
    createTask,
    delTask,
    getTaskById
}

