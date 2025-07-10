// Importa el moduloa 'path' para trabajar con rutas de archivos en el sistema
const path = require('path');

// Importa el modelo que maneja las operaciones con la base de datos para los usuarios
const userModel = require('../models/userModel');

// Exporta un objeto con funciones que sirven como controladores para cada ruta
module.exports = {

    // Controlador que lista todos los usuarios registrados
    list: (req, res) => {
        userModel.getAll((err, results) => {
            if (err) throw err; // Si hay error en la consulta, se lanza una excepcion

            // Comienza a construir el HTML de respuesta
            let html = `<h1> Usuarios Registrados </h1><a href="/users/create">Crear Nuevo</a><ul>`;

            // Por cada usuario de la base de datos, se agrega un elemento a la lista
            results.forEach(user => {
                html += `<li>${user.nombre} - ${user.email} - ${user.telefono} - ${user.rol} |
                    <a href="/users/edit">Editar</a>|
                    <a href="/users/delete">Eliminar</a></li>`;
            });
            html +=`</ul>`;
            res.send(html); // Se envia el HTML como respuesta al navegador
        });
    },
    // Muetsra el formulario para crear un nuevo usuario
    formCreate: (req,res) => {
        // Envía el archivo HTML con el formulario 
        res.sendfile(path.join(__dirname, '../views/formCreate.html'));
    },

    // Controlador que guarda el nuevo usuario en la base de datos
}