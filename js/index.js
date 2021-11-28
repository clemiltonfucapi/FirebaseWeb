  // importar instancias app e database
import {app,database} from './config.js'

import {RTDatabase} from './classes/RTDatabase.js'
import {Storage} from './classes/Storage.js'


RTDatabase.teste();

let addFeitico = document.getElementById('addFeitico');
addFeitico.addEventListener( 'click', cadastrarFeitico);

function cadastrarFeitico(){
  // recuperando input's
  let inNome = document.getElementById('inNome');
  let inRG = document.getElementById('inRG')

  // recuperar valores
  let nome = inNome.value;
  let rg = inRG.value;

  if(nome=="" || rg==""){
    alert('preencha os dois campos!!');
    return;
  } 
  let eleitor = {
    "nome": nome,
    "rg": rg,
    "status": "NAO_VOTOU",
  }
 // RTDatabase.addKeyValueNode('feiticos',feitico, limpar( [inFeitico,inNivel]));
  
  //promise -> é uma promessa para inserir feitico no database
  // destructuring object
  let {promise,key} = RTDatabase.addKeyValueNode('eleitores',eleitor)
  //se apromessa ocorreu com sucesso
  promise.then( () => {
    //limpar os inputs
    limpar( [inNome, inRG])
    //mostrar um alerta
    if(infoImg){
      uploadImagem(key)
    }else{
      alert("Dados inseridos com sucesso!")
    }

    
  })

}

function limpar(array){
  array.forEach( (x ) =>{
    x.value ="";
  })
 
}

var ELEITORES;
function carregarFeiticos(){

  RTDatabase.loadValueEvent('eleitores', (data) => {
    
    ELEITORES = data;

    let tbody = document.getElementById('tbody')
    tbody.innerHTML=""

    for(let indice in data){
      let feitico = data[indice];
      //console.log(feitico); 
      //alert(feitico.nome + "," + feitico.nivel)

      inserirFeiticoTabela(feitico)
    }
    // inserir no
  })
}


function inserirFeiticoTabela(feitico){
  //
  // recuperar tbody -> inserir linhas
  let tbody = document.getElementById('tbody');

  let linha = document.createElement("tr");

  let propsFeiticos = ['rg', 'nome','status']; // somente esses atributos irão aparecer na tabela
  //inserir colunas na tabela
  propsFeiticos.forEach( (prop )=> {
    // criar um td
      let coluna = document.createElement('td')
      // inserir o valor na coluna( <td>)
      coluna.innerHTML = feitico[prop];
      // inserir a coluna( <td> ) na linha
      linha.appendChild(coluna)
  });
  //inserir acoes
  let acoes = document.createElement('td');
  acoes.innerHTML= `<span  class="glyphicon glyphicon-check"  user="${feitico.key}" data-bs-toggle="modal" data-bs-target="#modalVotou"> </span> 
  <span class="glyphicon glyphicon-picture" url= ${feitico.url}> </span>
  <span class="glyphicon glyphicon-remove" id="${feitico.key}"> </span>`
  //selecionando o botao de excluir
  let spanRemove = acoes.querySelector('.glyphicon-remove')
  //adicionando evento de click 
  spanRemove.addEventListener('click', () => {
    // alert('excluir '+feitico.key);
    removerFeitico(feitico.key)
  })

  let spanPicture = acoes.querySelector('.glyphicon-picture');
  spanPicture.addEventListener('click', () =>{
    let url = spanPicture.getAttribute('url');
    showModal(url, feitico.nome);
  })

  let spanUrna = acoes.querySelector('.glyphicon-check');
  
  spanUrna.addEventListener('click', () => {
    //adicionando key do usuario no modal
    let inputUser = document.getElementById('inputUser')
    inputUser.value = feitico.key;
  })
  if(feitico.status=="NAO_VOTOU"){
      spanUrna.setAttribute('data-bs-target','#modalUrna' )
    }else{
      let modalText = document.getElementById('modalVotouText')
      if(feitico.status=="VOTANDO"){
        modalText.innerHTML="Eleitor está votando!";
      }else{
        modalText.innerHTML="Eleitor já votou!";
      }
      spanUrna.setAttribute('data-bs-target','#modalVotou')
    }


  linha.appendChild(acoes);

  //inserir linha na tabela
  tbody.appendChild(linha)
  
}


function showModal(src, alt){
  // Get the modal
  let modal = document.getElementById("myModal");

  let modalImg = document.getElementById("img01");
  let captionText = document.getElementById("caption");
  
  
    modal.style.display = "block";
    modalImg.src = src;
    captionText.innerHTML = alt;
    // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

  


function removerFeitico(key){
  // recuperar a promessa de excluir
  let promise = RTDatabase.removeNode('eleitores/'+key);

  promise.then( () => {
    alert('no removido!')
  })

}

 /* ---------- CONFIGURACAO DA FOTO/CAMERA ------------ */
var infoImg;

// FOTO
let input = document.getElementById('inputPhoto');
input.addEventListener('change', (e) => {
  //capturando info. da imagem
  infoImg =  e.target.files[0];

  let leitorImg = new FileReader();
  leitorImg.readAsDataURL(infoImg)
  // load -> executa callback quando imagem carregada
  leitorImg.addEventListener('load', () => {
    //seleciona <img>
    let photo = document.getElementById('photo');
    photo.style.display = 'block'; // aparece elemento
    photo.src = leitorImg.result; // seta a imagem carregada
  });
})

// CAMERA
var btnCamera = document.getElementById('btnCamera')
var video = document.querySelector('#video');
var localstream;

btnCamera.addEventListener('click',function () {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function (stream) {
    
    localstream = stream;
    video.srcObject = stream;
    
    video.play();
  })

  document.querySelector('#capture').addEventListener('click', function (e) {
  
    var canvas = document.createElement("canvas");
    
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    
    var context = canvas.getContext('2d');
    
    context.drawImage(video, 0, 0)

    let dataUrl = canvas.toDataURL()

    let photo = document.getElementById('photo');
    photo.src = dataUrl;
    infoImg = dataUrl;
    photo.style.display="block";

    vidOff();
  })
}) 

function vidOff() {
    //clearInterval(theDrawLoop);
  //ExtensionData.vidStatus = 'off';
  video.pause();
  video.src = "";
  localstream.getTracks()[0].stop();
  console.log("Vid off");
}



function uploadImagem(key){
  //recuperar a extensao e o nome da imagem
  if(typeof(infoImg)=='string'){
    uploadImagemBase64(key);
    return;
  }

  let ext = getExtName(infoImg);
  let nome = getFileName(infoImg);
  //caminho da imagem no storage
  let path = 'images/' + nome + ext;
  
  let uploadTask = Storage.uploadBytes(path,infoImg);
  let progress = document.getElementById('progress');
  progress.style.display="block";
  uploadTask.on('state-changed',
    (snapshot) => { // 1º callback -> progresso
      let perc = (  snapshot.bytesTransferred / snapshot.totalBytes )*100;
      progress.innerHTML = "Upload: "+ perc + "%";
    },
    (error) => {
      alert('image not uploaded')
    },
    () => { // upload realizado com sucesso
      let promiseUrl = Storage.getDownloadURL(uploadTask)
      promiseUrl.then( (photoUrl) =>{
        //console.log(url)

        let updates = {
          url: photoUrl
        } 

        // inserir a url, no novo nó
        let promise = RTDatabase.updateNode('eleitores/'+key,updates)
        promise.then( () => {
          alert("Upload realizado com sucesso!")
        })
      })
    }
  )
  
} 


function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0){
        byteString = atob(dataURI.split(',')[1]);
    }
    else{
        byteString = unescape(dataURI.split(',')[1]);
    }
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

function uploadImagemBase64(key){
  let time = new Date().getTime()
  let path="/images/base64-"+time+".png"
  let file = dataURItoBlob(infoImg);

  //let uri = infoImg;
 // let base64 = infoImg.replace(/^data:image\/(png|jpg);base64,/, "");
  let uploadTask = Storage.uploadBytes(path,file);
  let progress = document.getElementById('progress');
  progress.style.display="block";
  uploadTask.on('state-changed',
    (snapshot) => { // 1º callback -> progresso
      let perc = (  snapshot.bytesTransferred / snapshot.totalBytes )*100;
      progress.innerHTML = "Upload: "+ perc + "%";
    },
    (error) => {
      alert('image not uploaded')
    },
    () => { // upload realizado com sucesso
      let promiseUrl = Storage.getDownloadURL(uploadTask)
      promiseUrl.then( (photoUrl) =>{
        //console.log(url)

        let updates = {
          url: photoUrl
        } 

        // inserir a url, no novo nó
        let promise = RTDatabase.updateNode('eleitores/'+key,updates)
        promise.then( () => {
          alert("Upload realizado com sucesso!")
        })
      })
    }
  )
  
}
function getExtName(file){
  let temp = file.name.split('.');
  let ext = temp.slice(  temp.length -1 , temp.length );
  return '.' + ext[0];
} 
// "0,1,3,4" => split(',') => [0,1,2,4]
//[0,1,2,3] => join('.') => "0.1.2.3"
function getFileName(file){
  let temp = file.name.split('.');
  let fname = temp.slice(0,-1).join('.');
  return fname;
}

carregarFeiticos();


/* carregar urnas */
var arrayUrnas;
RTDatabase.loadValueEvent('urnas', (arr) =>{
  arrayUrnas = arr;
  let selectUrnas = document.getElementById('selectUrnas')
  
  let strHtml =""
  arr.forEach( (urna) => {
    console.log(urna);

    strHtml += `<option value="${urna.id}">${urna.nome}</option>`
  })

  selectUrnas.innerHTML = strHtml;
});

// ativar uma urna 
let btnAtivarUrna = document.getElementById('btnAtivarUrna');
btnAtivarUrna.addEventListener('click', () => {

  //recuperando primeira modal -> selecionar urma
  let myModalEl = document.getElementById('modalUrna')
  let modal = bootstrap.Modal.getInstance(myModalEl)

  //modal de confirmação
  let modalConfirm = new bootstrap.Modal(document.getElementById('modalConfirm'), {
    keyboard: false
  })


  //recuperar item selecionado da primeira modal
  let option = document.querySelector('#selectUrnas option:checked')
  let urnaSelecionada = arrayUrnas[option.value];


  
  //verificar se a urna está livre
  if(urnaSelecionada.status=='DISPONIVEL'){
    //modifica o nó da urna no firebase

    let inputUser = document.getElementById('inputUser');

    let eleitor = ELEITORES[inputUser.value]
    let updates = {
      'status': 'OCUPADA',
      eleitor: eleitor
    }
    RTDatabase.updateNode('eleitores/'+eleitor.key, {
      'status':'VOTANDO'
    });


    //atualizar no da urna para OCUPADA
    RTDatabase.updateNode('urnas/'+urnaSelecionada.id,updates)
    .then( () => {
      //adicionar mensagem no html
      document.getElementById('modalConfirmTitle').innerHTML=urnaSelecionada.nome
      document.getElementById('modalConfirmText').innerHTML="Urna foi ativada"

      //mostrar modal
      modal.hide();
      modalConfirm.show();

    })


    
  }else{

    //adicionar mensagem html
    document.getElementById('modalConfirmTitle').innerHTML=urnaSelecionada.nome
    document.getElementById('modalConfirmText').innerHTML="Urna está em uso!"

    //mostrar modal
    modal.hide();
    modalConfirm.show();
  }

  //criando segunda modal
  
  
  modal.hide();

  modalConfirm.show();
  /*
  btnAtivarUrna.setAttribute('data-bs-target','#modalConfirm' )
  btnAtivarUrna.setAttribute('data-bs-toggle','modal')
  btnAtivarUrna.setAttribute('data-bs-dismiss','modal')*/
    
}) 




