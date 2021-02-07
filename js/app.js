

// main containers
let links = document.querySelector('#links');
let form = document.querySelector('#main');


let title = document.querySelector('#title');
let url = document.querySelector('#url');
let description = document.querySelector('#description');

let btnSaveLinks = document.querySelector('#btn-saveLinks');
btnSaveLinks.addEventListener('click',saveLink);
// console.log(btnSaveLinks)

function saveLink(e) {
  
  let t = title.value;
  let u = url.value;
  let d = description.value;

  if(t == "" && u == "" && d == ""){ 
    alert('you must enter data such as a title, a description and a valid link.');
  }else{
    const datalinks = {
      title:t,
      description:d,
      url:u,
    }
  
    if(localStorage.getItem('links') === null){
      let links = [];
      links.push(datalinks);
      // console.log(links);
      localStorage.setItem('links',JSON.stringify(links));
    }else{
      let links = JSON.parse(localStorage.getItem('links'));
      links.push(datalinks);
      localStorage.setItem('links',JSON.stringify(links));
    }
  
    clearForm();
    getLinks();
  }

  e.preventDefault();

}

getLinks();

function getLinks(){
  let data = JSON.parse(localStorage.getItem('links'));
  let spacingLinks = document.querySelector('#links');
  spacingLinks.innerHTML = '';

  for(let i = 0; i < data.length; i++){
    let _title = data[i].title;
    let _url = data[i].url;
    let _description = data[i].description;
    spacingLinks.innerHTML += `
    <tr>
        <th class="p-1 text-center align-middle">${i + 1}</th>
        <th class="p-1 fw-normal align-middle">${_title}</th>
        <th class="p-1 text-secondary fw-light align-middle">${_description}</th>
        <th class="p-1 text-primary fw-light align-middle">${_url}</th>
        <th class="p-1">
          <a class="btn btn-success" href="${_url}" target="_blank" >Open Link</a>
          <a class="btn btn-primary" onclick="copyLink('${_url}')">Copy Link</a>
          <a class="btn btn-danger" onclick="DeleteLink('${_title}')" >Delete</a>
        </th>
     </tr>`;
  }
}

function DeleteLink(title) { 
  let data = JSON.parse(localStorage.getItem('links'));
  for(let i = 0; i < data.length; i++){
    if(data[i].title == title){
      data.splice(i, 1);
    }
  }
  localStorage.setItem('links', JSON.stringify(data));
  getLinks();
 }


function clearForm() { 
  let title = document.getElementById('title');
  let url = document.getElementById('url');
  let desc = document.getElementById('description');

  title.value = "";
  url.value = "";
  desc.value = "";
 }

function copyLink(url) {
  let inputFalse = document.createElement('input');
  inputFalse.setAttribute("value", url);
  document.body.appendChild(inputFalse);
  inputFalse.select();
  document.execCommand('copy');
  console.log('copiado');
  document.body.removeChild(inputFalse);
}





