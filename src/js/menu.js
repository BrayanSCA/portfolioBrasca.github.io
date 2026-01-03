const menuToggle = document.querySelector('#mobile-menu');
const navList = document.querySelector('.nav-list');

//Función parar abrir/cerrar el menú
menuToggle.addEventListener('click', ()=> {
  menuToggle.classList.toggle('is-active');
  navList.classList.toggle('is-active');
});

//Cerrar el menú automáticamente cuando se hace click
//en un enlace
document.querySelectorAll('.nav-list a').forEach(n =>n.addEventListener('click', ()=> {
  menuToggle.classList.remove('is-active');
  navList.classList.remove('is-active');
}))