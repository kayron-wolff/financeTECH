import modelTasks from '../models/modelTasks.js';

export async function allBills(req, res) {
    //SELECT * FROM [..]
    try {
        const tasks = await modelTasks.listar();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter as Despesas' });

    }
}

export async function addBill(req, res) {
    //INSERT INTO [..]
    const task = req.body;
    console.log(task);
    try {
        const novaTask = await modelTasks.criar(task);
        res.status(201).json(novaTask);
        console.log
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar a despesa' });
    }
}

export async function updtBill(req, res) {
    //UPDATE [..]
    const id = req.params.id;
    const dadosAtualizados = req.body;
    try {
        const tarefaAtualizada = await modelTasks.atualizar(id, dadosAtualizados);
        res.status(200).json(tarefaAtualizada);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar a despesa' });
    }
}

export async function delBill(req, res) {
    //DELETE FROM [..]
    const id = req.params.id;
    try {
        await modelTasks.deletar(id);
        res.status(200).json({ message: 'Despesa deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar a despesa' });
    }
    
}

export async function getBillById(req, res) {
    //SELECT * FROM [..]
    const id = req.params.id;
    try{
        
        const task = await modelTasks.buscarPorId(id);
        if(task.length === 0){
            res.status(404).json({message: 'Despesa não encontrada'});
        }else{
            res.status(200).json(task[0]);
        }
    }catch(err){
        res.status(500).json({error: 'Erro ao obter a despesa'});
    
    }
}

export default {
    allBills,
    addBill,
    updtBill,
    delBill,
    getBillById
}

