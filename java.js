const darkMode = document.getElementById('dark-mode');
const body = document.body;
const sunIcon = darkMode.querySelector('.sun');
const moonIcon = darkMode.querySelector('.moon');

darkMode.addEventListener('click', () => {
  body.classList.toggle('darkmode');
  if (body.classList.contains('darkmode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  } else {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  }
});


// mobile darkmode

const darkModeMobile = document.getElementById('dark-mode-mobile');
const bodymobile = document.body;
const sun = darkModeMobile.querySelector('.sun');
const moon = darkModeMobile.querySelector('.moon');

darkModeMobile.addEventListener('click', () => {
  bodymobile.classList.toggle('darkmode');
  if (bodymobile.classList.contains('darkmode')) {
    sun.style.display = 'none';
    moon.style.display = 'inline';
  } else {
    sun.style.display = 'inline';
    moon.style.display = 'none';
  }
});



document.addEventListener('DOMContentLoaded', function() {
    const footerHeaders = document.querySelectorAll('.footer-header');
    
    footerHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');
            
            document.querySelectorAll('.footer-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            if (!isActive) {
                header.classList.add('active');
                content.classList.add('active');
            }
        });
    });
});


// search mobile garch ireh

document.addEventListener('DOMContentLoaded', () => {
  const searchLink = document.querySelector('.searchmobi');
  const searchMobile = document.querySelector('.search-mobile');
  const closeButton = document.querySelector('.close-button');

  searchLink.addEventListener('click', (event) => {
      searchMobile.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
      searchMobile.style.display = 'none';
  });
});
