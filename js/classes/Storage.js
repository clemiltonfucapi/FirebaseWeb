import{
  getStorage, ref as sRef, uploadBytesResumable,uploadString,
  getDownloadURL,StringFormat
}
from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js'

class Storage{
  /* 
    Iniciar um upload de um arquivo por Bytes
      - path: Deve conter o caminho completo do arquivo no storage
      - bytes: arquivo a ser feito upload
  */
  static uploadBytes(path,bytes){
      let storage = getStorage();
      // cria referencia do upload no storage
      let storageRef =  sRef(storage,path);
      //retornar o upload
      return uploadBytesResumable(storageRef,bytes);

  }

  static uploadBase64(path, base64){
    let storage = getStorage();
    
    let storageRef = sRef(storage,path);

    
    return uploadString(storageRef,base64,StringFormat.BASE64)

  }
  static getDownloadURL(uploadTask){
      return getDownloadURL(uploadTask.snapshot.ref);
  }

}

export {Storage}