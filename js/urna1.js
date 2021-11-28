import {app,database} from './config.js'
import {RTDatabase} from './classes/RTDatabase.js'
import {Storage} from './classes/Storage.js'

const CODIGO_URNA=0;

var divWaiting = document.getElementById("waiting");
var divVotacao = document.getElementById("votacao");
var inputVoto = document.getElementById("campo");
var textNomeVoto = document.getElementById("textNomeVoto");

var confirmaVoto = document.getElementById("confirmaVoto");

var progressbar = document.getElementById("progressbar");
var KEY_VOTO;
inputVoto.onchange  = () => {
  console.log(inputVoto.value)
  let strVoto = inputVoto.value;
  //SEM VOTO
  if(strVoto==""){
    textNomeVoto.innerHTML="Seu voto: "
    KEY_VOTO="";
    return
  }else if(strVoto=="0"){ // VOTO BRANCO
    textNomeVoto.innerHTML="Seu voto: BRANCO"
    KEY_VOTO="0"
    return;
  }

  if(!CANDIDATOS[strVoto]){
    // voto nulo
    textNomeVoto.innerHTML="Seu voto: NULO"
    KEY_VOTO="-1"
    return;
  }else{
    textNomeVoto.innerHTML="Seu voto: "+CANDIDATOS[strVoto].nome;
    KEY_VOTO=CANDIDATOS[strVoto].numero
  }
  
}


var INFO_URNA;
var CANDIDATOS;

RTDatabase.loadValueEvent('candidatos',(data) => {
  CANDIDATOS=data;
})


function carregarUrna(){
  RTDatabase.loadValueEvent('urnas/'+CODIGO_URNA,(data)=>{
  

    let urna = data;
    
    if(urna.status=="DISPONIVEL"){
      divWaiting.style.display="block"
      divVotacao.style.display="none"

    }else if ( urna.status=="OCUPADA"){
      divWaiting.style.display="none"
      divVotacao.style.display="block"
      inputVoto.value=""
      textNomeVoto.innerHTML=""
      INFO_URNA=urna;
    }
  })
}

confirmaVoto.addEventListener("click", () => {
  if(!KEY_VOTO){
    alert("insira um voto!");
    return;
  }

  let candidato = CANDIDATOS[KEY_VOTO];

  let updatesCandidato= {
    qtdVotos: candidato.qtdVotos +1
  }
  //atualizar a quantidade de votos +1 
  RTDatabase.updateNode('candidatos/'+KEY_VOTO,updatesCandidato)
  .then( () => {
    let eleitor = INFO_URNA.eleitor;
    let updatesEleitor = {
      status:"VOTOU"
    }
    //atualizar eleitor
    RTDatabase.updateNode('eleitores/'+eleitor.key ,updatesEleitor)
    .then( () =>{

        let updates ={
          status:"DISPONIVEL",
          eleitor: null
        }
        //atualizar urna
        RTDatabase.updateNode('urnas/'+INFO_URNA.id,updates);
    })
  })
})




carregarUrna();