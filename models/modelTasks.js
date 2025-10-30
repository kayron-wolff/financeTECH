import connection from '../database/connection.js';

class ModelTasks{

    static async listar(){

        const con = await connection();

        try{
            const sql = 'SELECT * FROM tasks';
            const [rows] = await con.execute(sql);
            console.log(rows);
            return rows;
        }catch(err){
            console.log('Erro ao listar as tarefas: ', err);
        }finally{
            await con.end();
        }
    }

        static async buscarPorId(id){

        const con = await connection();
        try{
            const sql = 'SELECT * FROM tasks WHERE task_id = ?';
            const [rows] = await con.execute(sql, [id]);
            return rows;
        }catch(err){
            console.log('Erro ao buscar a tarefa: ', err);
        }finally{
            await con.end();
        }
}

static async criar(novaTask){
    const con = await connection();
    try{
        const sql = 'INSERT INTO tasks (task_name, task_desc, due_date) VALUES (?, ?, ?)';
        const [resultado] = await con.execute(sql, [
            novaTask.task_name,
            novaTask.task_desc,
            novaTask.due_date
        ]);
        return {id: resultado.insertId, ...novaTask};
    }catch(err){
        console.log('Erro ao criar a tarefa: ', err);
    }finally{
        await con.end();
    }
}

static async atualizar(id, dadosAtualizados){
    const con = await connection();
    try{
        const sql = 'UPDATE tasks SET task_name = ?, task_desc = ?, due_date = ? WHERE task_id = ?';
        await con.execute(sql, [
            dadosAtualizados.task_name,
            dadosAtualizados.task_desc,
            dadosAtualizados.due_date,
            id
        ]);
        return {id, ...dadosAtualizados};
    }catch(err){
        console.log('Erro ao atualizar a tarefa: ', err);
    }finally{
        await con.end();
    }

}

static async deletar(id){
    const con = await connection();
    try{
        const sql = 'DELETE FROM tasks WHERE task_id = ?';
        await con.execute(sql, [id]);
    }catch(err){
        console.log('Erro ao deletar a tarefa: ', err);
    }finally{
        await con.end();
    }
}
}

export default ModelTasks;