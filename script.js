const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

// Each section has its own address (#publications etc.), so it can be linked and the back button works
function showPage() {
  const id = location.hash.slice(1);
  const target = [...pages].some(p => p.id === id) ? id : 'home';
  pages.forEach(p => p.classList.toggle('active', p.id === target));
  navBtns.forEach(b => {
    const on = b.getAttribute('href') === '#' + target;
    b.classList.toggle('active', on);
    if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', () => {
  showPage();
  window.scrollTo({top: 0, behavior: 'smooth'});
});
showPage();

// Theme choice is remembered across visits
const themeToggle = document.getElementById('themeToggle');
function setTheme(light) {
  document.documentElement.classList.toggle('light', light);
  themeToggle.innerHTML = light ? '&#9790;' : '&#9728;';
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
}
setTheme(document.documentElement.classList.contains('light'));
themeToggle.addEventListener('click', () => {
  const light = !document.documentElement.classList.contains('light');
  setTheme(light);
  try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
});

// Contact form: sent through FormSubmit without leaving the page
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const sendBtn = contactForm.querySelector('.send-btn');
  sendBtn.disabled = true;
  formStatus.className = 'form-status';
  formStatus.textContent = 'Sending...';
  try {
    const res = await fetch(contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm)
    });
    const data = await res.json();
    if (res.ok && String(data.success) === 'true') {
      formStatus.classList.add('ok');
      formStatus.textContent = 'Thank you! Your message has been sent.';
      contactForm.reset();
    } else {
      throw new Error(data.message || 'Send failed');
    }
  } catch (err) {
    formStatus.classList.add('err');
    formStatus.innerHTML = 'Sorry, the message could not be sent. Please email me at <a href="mailto:bmj727@gmail.com">bmj727@gmail.com</a>.';
    console.error(err);
  } finally {
    sendBtn.disabled = false;
  }
});
