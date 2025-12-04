import modelTasks from '../models/modelTasks.js';
import bcrypt from 'bcrypt';

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
        console.log(req.body);
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

export async function getBillByName(req, res) {
    //SELECT * FROM [..]
    const id = req.body.bill_name;
    try{
        
        const task = await modelTasks.buscarPorNome(id.bill_name);
        if(task.length === 0){
            res.status(404).json({message: 'Despesa não encontrada'});
        }else{
            res.status(200).json(task[0]);
        }
    }catch(err){
        res.status(500).json({error: 'Erro ao obter a despesa'});
    
    }
}

export async function cadastarUsuario(req, res) {
    const novoUsuario = req.body;
    try {
        const senhaHasheada = await bcrypt.hash(novoUsuario.passwd, 10);
        novoUsuario.passwd = senhaHasheada
        const usuarioCriado = await modelTasks.cadastarUsuario(novoUsuario);
        res.status(201).json(usuarioCriado);
    }catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar o usuário' });
    }
}

export async function loginUsuario(req, res) {
    const { email, passwd } = req.body;
    if (!email || !passwd) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    try {
        const usuario = await modelTasks.buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const senhaValida = await bcrypt.compare(passwd, usuario.passwd);
        if (senhaValida) {
            return res.status(200).json({ message: 'Login realizado com sucesso' });
            
        }else{
            return res.status(401).json({ error: 'Senha incorreta' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Erro ao realizar o login' });
    }
}

export async function inserirEntrada(req, res) {
    const novaEntrada = req.body;
    try {
        const entradaCriada = await modelTasks.inserirEntrada(novaEntrada);
        res.status(201).json(entradaCriada);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao inserir a entrada' });
    }
}

export async function listarEntradas(req, res) {
    try {
        const entradas = await modelTasks.listarEntradas();
        res.status(200).json(entradas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao obter as entradas' });
    }
}

export async function getEntradaByName(req, res) {
    const name = req.body.inc_name;
    try{
        const entrada = await modelTasks.buscarEntradaPorNome(name);
        if(entrada.length === 0){
            res.status(404).json({message: 'Entrada não encontrada'});
        }else{
            res.status(200).json(entrada[0]);
        }
    }catch(err){
        res.status(500).json({error: 'Erro ao obter a entrada'});
    }
}

export async function deletarEntrada(req, res) {
    const id = req.params.id;
    try{
        await modelTasks.deletarEntrada(id);
        res.status(200).json({ message: 'Entrada deletada com sucesso' });
    } catch(err){
        res.status(500).json({ error: 'Erro ao deletar a entrada' });
    }
}

export async function atualizarEntrada(req, res) {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    try{
        const entradaAtualizada = await modelTasks.atualizarEntrada(id, dadosAtualizados);
        res.status(200).json(entradaAtualizada);
    } catch(err){
        res.status(500).json({ error: 'Erro ao atualizar a entrada' });
    }
}

    export async function getUserbyMail(req, res) {
    const email = req.body.email;
    try {
        const usuario = await modelTasks.buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
}

export default {
    allBills,
    addBill,
    updtBill,
    delBill,
    getBillByName,
    cadastarUsuario,
    loginUsuario,
    inserirEntrada,
    listarEntradas,
    getEntradaByName,
    deletarEntrada,
    atualizarEntrada,
    getUserbyMail
}

