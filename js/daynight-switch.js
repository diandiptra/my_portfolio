const dayNight = document.querySelector('.day-night');

dayNight.addEventListener('click', () => {
  dayNight.querySelector('i').classList.toggle('fa-sun');
  dayNight.querySelector('i').classList.toggle('fa-moon');

  document.body.classList.toggle("dark");
});