function openMenu() {
    const menu = document.querySelector('.menu');
    const menuButton = document.querySelector('.menu__btn');
    console.log(menu);
    menuButton.addEventListener('click', () => {
        menu.classList.toggle('menu--open')
    });
}

export { openMenu };