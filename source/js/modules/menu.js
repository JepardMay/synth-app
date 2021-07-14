function openMenu(params) {
  const menu = document.querySelector('.menu');
  const menuBtn = document.querySelector('.menu__btn');

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('menu--open');
  });
}
