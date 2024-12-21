

document.addEventListener('DOMContentLoaded', function() {

    var formulario_general = document.getElementById("formulario-general");
    
    formulario_general.addEventListener('submit',function(evento){

        evento.preventDefault()
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Consulta guardada correctamente",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          }).then(function(results){
            formulario_general.submit();
          })

    });

    const formulario_vacunas = document.getElementById("formulario-vacunas");

    formulario_vacunas.addEventListener('submit',function(evento){

      evento.preventDefault()
      Swal.fire({
          position: "center",
          icon: "success",
          title: "Consulta guardada correctamente",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        }).then(function(results){
          formulario_vacunas.submit();
        })

  });

});



