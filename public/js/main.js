
document.addEventListener('DOMContentLoaded', function(){

    const volver = document.getElementById("volver");

    volver.addEventListener('click', function(){
        window.location.href = '/administracion';
    });
    
    const lineasTabla = document.querySelectorAll('.linea-tabla');


    lineasTabla.forEach((linea) => {
    
        linea.addEventListener('click', function() {
    
            // Primero, remueve el fondo de todos los elementos
            lineasTabla.forEach((l) => l.style.backgroundColor = '');
    
            // Luego, añade el fondo al elemento seleccionado
            linea.style.backgroundColor = '#77afc5';
    
        });
    
    });

})

window.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos de la alerta desde el HTML
    const alertData = document.getElementById('alert-data');
    
    if (alertData) {
      const alertMessage = alertData.getAttribute('data-message');
      const alertType = alertData.getAttribute('data-type');
      
      // Obtener el contenedor y los elementos de la alerta
      const alertContainer = document.getElementById('alert-container');
      const alertMessageElement = document.getElementById('alert-message');
      const alertText = document.getElementById('alert-text');
      const alertIcon = document.getElementById('alert-icon');
  
      // Establecer el tipo de alerta (éxito o error)
      if (alertType === 'error') {
        alertMessageElement.classList.add('error');
        alertIcon.classList.add('error-icon');
        alertIcon.classList.remove('check-icon');
      } else {
        alertMessageElement.classList.remove('error');
        alertMessageElement.classList.add('success');
        alertIcon.classList.add('check-icon');
        alertIcon.classList.remove('error-icon');
      }
  
      // Mostrar el mensaje de alerta
      alertText.textContent = alertMessage;
  
      // Hacer visible la alerta
      alertContainer.style.display = 'block';
  
      // Después de 4 segundos, ocultar la alerta
      setTimeout(() => {
        alertContainer.style.display = 'none';
      }, 2000);
    }
  });
  