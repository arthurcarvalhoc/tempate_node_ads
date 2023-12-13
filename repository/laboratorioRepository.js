const db = require('./db');

async function criarLab(nome, capacidade, computodores) {

    try {
        const con = await db.conectarMysql();
        let sql = `INSERT INTO pmc.laboratorios ( nome, capacidade, computadores) VALUES ('${nome}', ${capacidade}, ${computodores})`
        await con.execute(sql);
        con.destroy();
        console.log("inseriu");
        return true;        
    } catch (error) {
        con.destroy();
        console.log("error");
        return false;
    }
}


async function updateLab(id, nome, capacidade, computodores) {

    try {
        const con = await db.conectarMysql();
        let sql = `UPDATE laboratorios set nome='${nome}', capacidade=${capacidade}, computadores=${computodores} where id=${id}`
        await con.execute(sql);
        con.destroy();
        console.log("atualizou");
        return true;        
    } catch (error) {
        console.log(error)
        con.destroy();
        console.log("error");
        return false;
    }
}

async function consultarLab(){

    try {
        const con = await db.conectarMysql();
        const consulta = 'SELECT * FROM laboratorios l';
        const resultado = await con.query(consulta);
        const listaLabs = resultado[0];
        console.log(listaLabs)
        return listaLabs;
        
    } catch (error) {
        console.log(error);
        return false;
    }

}



async function getLab(id){

    try {
        const con = await db.conectarMysql();
        const consulta = `SELECT * FROM laboratorios l where id = ${id}`;
        const resultado = await con.query(consulta);
        const lab = resultado[0][0];
        console.log(lab)
        return lab;
        
    } catch (error) {
        console.log(error);
        return false;
    }

}

async function apagarLab(id){

    try {
        const con = await db.conectarMysql();
        const consulta = `delete from laboratorios where id = ${id}`
        await con.execute(consulta);
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }

}


module.exports = { criarLab, consultarLab, apagarLab, getLab, updateLab };