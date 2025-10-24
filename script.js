(function(){
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn = document.getElementById('submitButton');

  if (!form) return; // seguridad si el script carga en otra página

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Validar campos requeridos
    if(!form.checkValidity()){
      status.textContent = 'Por favor completa los campos requeridos correctamente.';
      status.style.color = '#fca5a5';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Enviando...';
    status.textContent = '';

    // Enviar datos usando FormSubmit
    const formData = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        status.textContent = '✅ ¡Mensaje enviado correctamente! Te responderé pronto.';
        status.style.color = '#86efac';
        form.reset();
      } else {
        throw new Error('Error al enviar el formulario.');
      }
    })
    .catch(() => {
      status.textContent = '❌ Ocurrió un error. Intenta nuevamente más tarde.';
      status.style.color = '#fca5a5';
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje';
    });
  });
})();
