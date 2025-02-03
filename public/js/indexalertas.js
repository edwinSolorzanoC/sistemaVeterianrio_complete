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
        }
    } 
    
    if (urlParams.has("success")) {
        const successType = urlParams.get("success");

        if (successType === "userCreated") {
            Swal.fire({
                icon: "success",
                title: "Usuario creado",
                text: "El usuario se ha registrado exitosamente.",
            });
        }
    }

    // Limpiar la URL para evitar que la alerta se repita al recargar la página
    window.history.replaceState({}, document.title, window.location.pathname);
});