let btnTop = document.getElementById('top');

window.onscroll = function () {
  console.log(document.documentElement.scrollTop)
  if(document.documentElement.scrollTop > 50){
    btnTop.style.display = 'grid';
  }else{
    btnTop.style.display = 'none';
  }
}

btnTop.addEventListener('click', function(){
  window.scrollTo({
    top:0,
    behavior: 'smooth'
  });

});


