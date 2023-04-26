let changeTheme = document.querySelectorAll('.color-theme');


changeTheme.forEach(color => {
  color.addEventListener('click', () => {
    let dataColor = color.getAttribute('data-color');
    document.querySelector(':root').style.setProperty('--skin-color', dataColor);
  });
});