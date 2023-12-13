var express = require('express');
const { fazerLogin } = require('../repository/usuarioRepositor');
var router = express.Router();
const labRepository = require('../repository/laboratorioRepository')


router.get('/', function(req, res, next) {
  res.render('ecommerce', { });
});


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('sign-in', { });
});

router.get('/laboratorios', async function(req, res, next) {

 // CONSULTAR OS LABORATÓRIOS
  let listaLabs = await labRepository.consultarLab();
  console.log(listaLabs);

  res.render('laboratoriosList', { laboratorios: listaLabs });
});

router.get('/addlaboratorio', (req, res, next)=>{
  res.render('laboratoriosPage',{});
});

router.get('/deletelab', async (req, res, next)=>{

  const id = req.query.id;
  console.log(id);

  await labRepository.apagarLab(id);
  let listaLabs = await labRepository.consultarLab();
 
  res.render('laboratoriosList', { laboratorios: listaLabs });
});



router.post('/createLab', async function(req, res, next) {

  let {nome, capacidade, computadores} = req.body;

  if(await labRepository.criarLab(nome, capacidade, computadores)){
    let listaLabs = await labRepository.consultarLab(); 
    res.render('laboratoriosList', { laboratorios: listaLabs });    
    
  }else{
    res.render('laboratoriosPage', { msg: false });
  }

});



router.get('/viewLab', async function(req, res, next) {

  let {id} = req.query;

  const lab = await labRepository.getLab(id)
  console.log(lab)
    res.render('laboratoriosDetail', { laboratorio: lab });
  

});

router.get('/updateLab', async function(req, res, next) {

  let {id} = req.query;

  const lab = await labRepository.getLab(id)
  console.log(lab)
    res.render('laboratoriosUpdate', { laboratorio: lab });
  

});


router.post('/updateLab', async function(req, res, next) {

  let {id, nome, capacidade, computadores} = req.body;

  await labRepository.updateLab(id, nome, capacidade, computadores)
  
  let listaLabs = await labRepository.consultarLab();
  res.render('laboratoriosList', { laboratorios: listaLabs });
  

});


router.post('/autenticar', async function(req, res, next) {
  let { login, senha } = req.body; 

  console.log( req.body );

  if( await fazerLogin(login, senha)){
    res.render('home', {  });
  }else{
    res.render('sign-in', { erroLogin: true });
  }

  router.post('/laboratorios', async function(req, res, next) {
    
    let { nome, capacidade, computadores } = req.body;

    const repository = require('../repository/laboratorioRepository')

    const success = await repository.criarLab(nome, capacidade, computadores);

    res.render('dashboard', { });
  });
  

});



module.exports = router;
