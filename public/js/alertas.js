document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("error")) {
        const errorType = urlParams.get("error");

        if (errorType === "invalidPassword") {
            Swal.fire({
                icon: "error",
                title: "Error en la contraseña",
                text: "Debe tener al menos 8 caracteres, incluyendo una letra mayúscula y un número.",
            });
        } else if (errorType === "invalidKey") {
            Swal.fire({
                icon: "error",
                title: "Clave de seguridad incorrecta",
                text: "La clave de seguridad ingresada no es válida.",
            });
        } else if (errorType === "hashError") {
            Swal.fire({
                icon: "error",
                title: "Error interno",
                text: "Hubo un problema al encriptar la contraseña. Inténtelo de nuevo.",
            });
        }else if (errorType === "incorrectPassword") {
            Swal.fire({
                icon: "error",
                title: "Contraseña incorrecta",
                text: "La contraseña que ingresaste es incorrecta.",
            });
        } else if (errorType === "userNotFound") {
            Swal.fire({
                icon: "error",
                title: "Usuario no encontrado",
                text: "No se encontró un usuario con ese nombre de usuario.",
            });
        } else if (errorType === "databaseError") {
            Swal.fire({
                icon: "error",
                title: "Error en la base de datos",
                text: "Hubo un problema al consultar la base de datos. Inténtalo nuevamente.",
            });
        } else if (errorType === "passwordCompareError") {
            Swal.fire({
                icon: "error",
                title: "Error interno",
                text: "Hubo un problema al comparar la contraseña. Inténtalo nuevamente.",
            });
        } else if (errorType === "internalError") {
            Swal.fire({
                icon: "error",
                title: "Error interno",
                text: "Ocurrió un error inesperado. Inténtalo de nuevo.",
            });
        }else if (errorType === "userpassNotFound") {
            Swal.fire({
                icon: "error",
                title: "Usuario y/o contraseña no coinciden",
                text: "No se encontró un usuario y/o contraseña en los datos brindados",
            });
        }
    } 
    
    if (urlParams.has("success")) {
        const successType = urlParams.get("success");

        if (successType === "userCreated") {
            Swal.fire({
                icon: "success",
                title: "Usuario creado",
                showConfirmButton: false,
                timer: 1500
            });
        }else if (successType === "loginSuccess") {
            Swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso",
                showConfirmButton: false,
                timer: 1500
            });
        }else if(successType === "passUpdate"){
            Swal.fire({
                icon: "success",
                title: "Actualización de datos exitoso",
                text: "Has actualizado tu contraseña correctamente",
            });
        }else if(successType === "consultaUpdate"){
            Swal.fire({
                icon: "success",
                title: "¡Consulta registrada exitosamente!",
                showConfirmButton: false,
                timer: 1500
            });
        }else if(successType === "newRegister"){
            Swal.fire({
                icon: "success",
                title: "¡Registro exitoso!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});