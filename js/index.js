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
  RTDatabase.addKeyValueNode('feiticos',feitico, limpar( [inFeitico,inNivel]));
  //limpar os inputs

}
function limpar(array){
  array.forEach( (x ) =>{
    x.value ="";
  })
  alert('dados inseridos com sucesso!')
}

console.log(app)
console.log(database)