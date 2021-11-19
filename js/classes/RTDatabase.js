import {getDatabase,ref,set, push, onValue} from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js'
class RTDatabase {
  static teste(){
    console.log("classe RT")
  }

  static addKeyValueNode(nodePath, value ,callback){
    //criar/recuperar nó
    let refNode = ref( getDatabase(), nodePath ); 
    //criando um novo id em nodePath
    let id = push(refNode)

    //setar os valores no id
    set(id, value)
    .then(  () => {
      callback();
    } );
  }
  
}

export {RTDatabase}
