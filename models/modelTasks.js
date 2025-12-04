import connection from '../database/connection.js';
import bcrypt from 'bcrypt';

class ModelTasks{

    static async listar(){

        const con = await connection();

        try{
            const sql = 'SELECT * FROM billings';
            const [rows] = await con.execute(sql);
            console.log(rows);
            return rows;
        }catch(err){
            console.log('Erro ao listar as despesas: ', err);
        }finally{
            await con.end();
        }
    }

        static async buscarPorNome(name){

        const con = await connection();
        try{
            const sql = 'SELECT * FROM billings WHERE bill_name = ?';
            const [rows] = await con.execute(sql, [name]);
            return rows;
        }catch(err){
            console.log('Erro ao buscar a despesa: ', err);
        }finally{
            await con.end();
        }
}

static async criar(newBill){
    const con = await connection();
    try{
        const sql = 'INSERT INTO billings (bill_name, bill_desc, bill_due_date, bill_date, bill_value, bill_type) VALUES (?, ?, ?, ?, ?, ?)';
        const [resultado] = await con.execute(sql, [
            newBill.bill_name,
            newBill.bill_desc,
            newBill.bill_due_date,
            newBill.bill_date,
            newBill.bill_value,
            newBill.bill_type
        ]);
        return {id: resultado.insertId, ...newBill};
    }catch(err){
        console.log('Erro ao criar a despesa: ', err);
    }finally{
        await con.end();
    }
}

static async atualizar(id, dadosAtualizados){
    const con = await connection();
    try{
        const sql = 'UPDATE billings SET bill_name = ?, bill_desc = ?, bill_due_date = ?, bill_date = ?, bill_type = ?, bill_value = ? WHERE bill_id = ?';
        await con.execute(sql, [
            dadosAtualizados.bill_name,
            dadosAtualizados.bill_desc,
            dadosAtualizados.bill_due_date,
            dadosAtualizados.bill_date,
            dadosAtualizados.bill_type,
            dadosAtualizados.bill_value,
            id
        ]);
        return {id, ...dadosAtualizados};
    }catch(err){
        console.log('Erro ao atualizar a despesa: ', err);
    }finally{
        await con.end();
    }

}

static async deletar(id){
    const con = await connection();
    try{
        const sql = 'DELETE FROM billings WHERE bill_id = ?';
        await con.execute(sql, [id]);
    }catch(err){
        console.log('Erro ao deletar a despesa: ', err);
    }finally{
        await con.end();
    }
}

static async cadastarUsuario(newUser){
    const con = await connection();
    try{
        const sql = 'INSERT INTO users (usr_name, email, passwd) VALUES (?, ?, ?)';
        const [resultado] = await con.execute(sql, [
            newUser.usr_name,
            newUser.email,
            newUser.passwd
        ]);
        return {id: resultado.insertId, ...newUser};
    }catch(err){
        console.log('Erro ao cadastrar o usuário: ', err);
    }finally{
        await con.end();
    }
}

static async buscarUsuarioPorEmail(email){
    const con = await connection();
    try{
        const sql = 'SELECT usr_name, passwd FROM users WHERE email = ?';
        const [rows] = await con.execute(sql, [email]);
        return rows[0];
    }catch(err){
        console.log('Erro ao buscar o usuário: ', err);
        throw err;
    }finally{
        await con.end();
    }
}

static async inserirEntrada(newEntry){
    const con = await connection();
    try{
        const sql = 'INSERT INTO income (inc_name, inc_desc, inc_date, inc_value, inc_type) VALUES (?, ?, ?, ?, ?)';
        const [resultado] = await con.execute(sql, [
            newEntry.inc_name,
            newEntry.inc_desc,
            newEntry.inc_date,
            newEntry.inc_value,
            newEntry.inc_type
        ]);
        return {id: resultado.insertId, ...newEntry};
    }catch(err){
        console.log('Erro ao inserir a entrada: ', err);
    }finally{
        await con.end();
    }
}

static async listarEntradas(){
    const con = await connection();
    try{
        const sql = 'SELECT * FROM income';
        const [rows] = await con.execute(sql);
        return rows;
    }catch(err){
        console.log('Erro ao listar as entradas: ', err);
    }finally{
        await con.end();
    }
}

static async deletarEntrada(id){
    const con = await connection();
    try{
        const sql = 'DELETE FROM income WHERE inc_id = ?';
        await con.execute(sql, [id]);
    }catch(err){
        console.log('Erro ao deletar a entrada: ', err);
    }finally{
        await con.end();
    }
}

static async atualizarEntrada(id, dadosAtualizados){
    const con = await connection();
    try{
        const sql = 'UPDATE income SET inc_name = ?, inc_date = ?, inc_value = ?, inc_type = ?, inc_desc = ? WHERE inc_id = ?';
        await con.execute(sql, [
            dadosAtualizados.inc_name,
            dadosAtualizados.inc_date,
            dadosAtualizados.inc_value,
            dadosAtualizados.inc_type,
            dadosAtualizados.inc_desc,
            id
        ]);
        return {id, ...dadosAtualizados};
    }catch(err){
        console.log('Erro ao atualizar a entrada: ', err);
    }finally{
        await con.end();
    }
}

static async buscarEntradaPorNome(nome){
    const con = await connection();
    try{
        const sql = 'SELECT * FROM income WHERE inc_name = ?';
        const [rows] = await con.execute(sql, [nome]);
        return rows;
    }catch(err){
        console.log('Erro ao buscar a entrada: ', err);
    }finally{
        await con.end();
    }
}


}


export default ModelTasks;