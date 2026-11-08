document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  if (!form) {
    return;
  }

  const fullNameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const successMessage = document.getElementById('form-success');

  const setError = (id, message) => {
    const input = document.getElementById(id);
    const errorNode = document.querySelector(`[data-error-for="${id}"]`);

    if (input) {
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    if (errorNode) {
      errorNode.textContent = message;
    }
  };

  const clearAllErrors = () => {
    setError('full-name', '');
    setError('email', '');
    setError('phone', '');
    if (successMessage) {
      successMessage.textContent = '';
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearAllErrors();

    let isValid = true;

    if (!fullNameInput.value.trim()) {
      setError('full-name', 'Please enter your full name.');
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      setError('email', 'Email address is required.');
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      setError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!phoneInput.value.trim()) {
      setError('phone', 'Phone number is required.');
      isValid = false;
    } else if (!/^\d+$/.test(phoneInput.value.trim())) {
      setError('phone', 'Use digits only, without spaces, brackets or the plus sign.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (successMessage) {
      successMessage.textContent = 'Validation successful. This is a frontend demonstration only; real delivery would require a backend or form-submission service.';
    }

    form.reset();
  });
});
