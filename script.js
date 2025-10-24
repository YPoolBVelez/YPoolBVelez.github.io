  (function(){
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', function(e){
      e.preventDefault();

      if(!form.checkValidity()){
        status.textContent = 'Por favor completa los campos requeridos correctamente.';
        status.style.color = '#fca5a5';
        return;
      }

      const btn = document.getElementById('submitButton');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      setTimeout(()=>{
        btn.disabled = false;
        btn.textContent = 'Enviar mensaje';
        form.reset();
        status.textContent = '¡Mensaje enviado! Revisaré tu correo y te responderé pronto.';
        status.style.color = '#86efac';
      }, 900);
    });
  })();