import {app,database} from './config.js'
import {RTDatabase} from './classes/RTDatabase.js'
import {Storage} from './classes/Storage.js'

var CANDIDATOS;

var tbody = document.getElementById('tbody-candidatos');


RTDatabase.loadValueEvent('candidatos', (data) =>{

  tbody.innerHTML="";

  let num=1;
  for(let index in data){
    if(index!=-1 && index!=0){ // excluir votos brancos e nulo
    
      let candidato = data[index]; 

      let tr = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.innerHTML= num;
      tr.appendChild(td1);
      let props = ["nome","numero","qtdVotos"];
      props.forEach( (prop) => {
        let td = document.createElement("td");
        td.innerHTML = candidato[prop];
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
      num = num+1;
    }
  }

})