const params = new URLSearchParams(window.location.search);
    document.getElementById("nombre").value = params.get("nombre");
    document.getElementById("apellido").value = params.get("apellido");
    document.getElementById("email").value = params.get("email");
    document.getElementById("telefono").value = params.get("telefono");
    document.getElementById("rol").value = params.get("rol");

    document.getElementById('form').action = `/users/edit/${numero_documento}`;