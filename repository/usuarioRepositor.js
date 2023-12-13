const db = require('./db');

async function fazerLogin(login, senha){

    try {
            console.log('login');
            let consulta = `select * from usuarios u where u.login = '${login}' and u.senha = '${senha}'`
        
            const con = db.conectarMysql();
            let resultado = await con.query( consulta );

            let usuario = resultado[0][0]
            console.log( usuario )
            con.destroy();
        
            if(login == usuario.login && senha == usuario.senha){
                return true;
            }else{
                return false;
            }
    } catch (error) {
        return false;
    }
}

module.exports = { fazerLogin }