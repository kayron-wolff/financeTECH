import connection from '../database/connection.js';

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

        static async buscarPorId(id){

        const con = await connection();
        try{
            const sql = 'SELECT * FROM billings WHERE bill_id = ?';
            const [rows] = await con.execute(sql, [id]);
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
        const sql = 'INSERT INTO billings (bill_name, bill_desc, bill_due_date, bill_start_date, bill_end_date, bill_value, bill_stats, bill_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [resultado] = await con.execute(sql, [
            newBill.bill_name,
            newBill.bill_desc,
            newBill.bill_due_date,
            newBill.bill_start_date,
            newBill.bill_end_date,
            newBill.bill_value,
            newBill.bill_stats,
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
        const sql = 'UPDATE billings SET bill_name = ?, bill_desc = ?, bill_due_date = ?, bill_start_date = ?, bill_end_date = ?, bill_stats = ?, bill_type = ? WHERE bill_id = ?';
        await con.execute(sql, [
            dadosAtualizados.bill_name,
            dadosAtualizados.bill_desc,
            dadosAtualizados.bill_due_date,
            dadosAtualizados.bill_start_date,
            dadosAtualizados.bill_end_date,
            dadosAtualizados.bill_stats,
            dadosAtualizados.bill_type,
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
}

export default ModelTasks;