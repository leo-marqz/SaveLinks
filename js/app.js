document.addEventListener("DOMContentLoaded", ()=>{
  Swal.fire({
    text:'Bienvenido a SaveLinks, aqui podras guardar tus enlaces mas importantes solo debes tener cuidado cuando borres datos del navegador ya que tus enlaces se guardaran en la memoria de este.',
    icon: 'info',
    confirmButtonText: 'Entendido'
  });
})

// main containers
let links = document.querySelector('#links');
let form = document.querySelector('#main');


let title = document.querySelector('#title');
let url = document.querySelector('#url');

let btnSaveLinks = document.querySelector('#btn-saveLinks');
btnSaveLinks.addEventListener('click',saveLink);

function saveLink(e) {
  
  let t = title.value;
  let u = url.value;

  if(t == "" && u == ""){ 
    Swal.fire({
      title: 'Debes datos en ambos campos',
      icon: 'warning',
      confirmButtonText: 'vale'
    });
  }else{
    const datalinks = {
      title:t,
      url:u,
    }
  
    if(localStorage.getItem('myLinks') === null){
      let links = [];
      links.push(datalinks);
      // console.log(links);
      localStorage.setItem('myLinks',JSON.stringify(links));
    }else{
      let links = JSON.parse(localStorage.getItem('myLinks'));
      links.push(datalinks);
      localStorage.setItem('myLinks',JSON.stringify(links));
    }
  
    clearForm();
    getLinks();
    Swal.fire({
      title: 'Enlace Guardado',
      icon: 'success',
      confirmButtonText: 'ok'
    })
  }

  e.preventDefault();

}

getLinks();

function getLinks(){
  let data = JSON.parse(localStorage.getItem('myLinks'));
  let spacingLinks = document.querySelector('#links');
  spacingLinks.innerHTML = '';

  for(let i = 0; i < data.length; i++){
    let _title = data[i].title;
    let _url = data[i].url;
    spacingLinks.innerHTML += `
    <tr>
        <td class="p-1 text-center align-middle">${i + 1}</td>
        <td class="p-1 fw-normal align-middle">${_title}</td>
        <td class="p-1">
          <a class="btn btn-success" href="${_url}" target="_blank" >Open Link</a>
          <a class="btn btn-primary" onclick="copyLink('${_url}')">Copy Link</a>
          <a class="btn btn-danger" onclick="DeleteLink('${_title}')" >Delete</a>
        </td>
     </tr>`;
  }
}

function DeleteLink(title) { 
  let data = JSON.parse(localStorage.getItem('myLinks'));
  for(let i = 0; i < data.length; i++){
    if(data[i].title == title){
      data.splice(i, 1);
    }
  }
  localStorage.setItem('myLinks', JSON.stringify(data));
  getLinks();
  Swal.fire({
    title: 'Enlace Eliminado',
    icon: 'success',
    confirmButtonText: 'ok'
  })
 }


function clearForm() { 
  let title = document.getElementById('title');
  let url = document.getElementById('url');

  title.value = "";
  url.value = "";
 }

function copyLink(url) {
  let inputFalse = document.createElement('input');
  inputFalse.setAttribute("value", url);
  document.body.appendChild(inputFalse);
  inputFalse.select();
  document.execCommand('copy');
  console.log('copiado');
  document.body.removeChild(inputFalse);
  Swal.fire({
    title: 'Enlace Copiado',
    icon: 'success',
    confirmButtonText: 'ok'
  });
}





