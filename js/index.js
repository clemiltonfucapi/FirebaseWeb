// importar instancias app e database
import {app,database} from './config.js'

import {RTDatabase} from './classes/RTDatabase.js'
RTDatabase.teste();

let addFeitico = document.getElementById('addFeitico');
addFeitico.addEventListener( 'click', cadastrarFeitico);

function cadastrarFeitico(){
  // recuperando input's
  let inFeitico = document.getElementById('inFeitico');
  let inNivel = document.getElementById('inNivel')

  // recuperar valores
  let nomeFeitico = inFeitico.value;
  let nivel = inNivel.value;

  if(nomeFeitico=="" || nivel==""){
    alert('preencha os dois campos!!');
    return;
  } 
  let feitico = {
    "nome": nomeFeitico,
    "nivel": nivel
  }
 // RTDatabase.addKeyValueNode('feiticos',feitico, limpar( [inFeitico,inNivel]));
  
  //promise -> é uma promessa para inserir feitico no database
  let promise = RTDatabase.addKeyValueNode('feiticos',feitico)
  //se apromessa ocorreu com sucesso
  promise.then( () => {
    //limpar os inputs
    limpar( [inFeitico, inNivel])
    //mostrar um alerta
    alert("Dados inseridos com sucesso!")
  })
 
  console.log('teste');

}

function limpar(array){
  array.forEach( (x ) =>{
    x.value ="";
  })
 
}

function carregarFeiticos(){
  RTDatabase.loadValueEvent('feiticos', (data) => {
    console.log(data);

    for(let indice in data){
      let feitico = data[indice];
      //console.log(feitico);
      alert(feitico.nome + "," + feitico.nivel)
    }
    // inserir no
  })
}
carregarFeiticos();

console.log(app)
console.log(database)