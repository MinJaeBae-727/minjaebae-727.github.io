const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.target;
    pages.forEach(p => p.classList.toggle('active', p.id === target));
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
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
