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
            let html = `
             <html>
                <head>
                    <title>Usuarios Registrados</title>
                    <link rel="stylesheet" href="/css/users.css">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
                </head>
                <body>
                    <h1> Usuarios Registrados </h1>
                    <a href="/users/create" class ="btn btn-primary">Crear Nuevo</a><ul>`;

            // Por cada usuario de la base de datos, se agrega un elemento a la lista

            // ******CAMBIAR ESTO**********
            results.forEach(user => {
                html += `<li>${user.numero_documento} - ${user.nombre_usuario} - ${user.apellido_usuario} - ${user.tipo_documento_usuario} - ${user.correo_electronico_usuario} - ${user.telefono} - ${user.nombre_rol} |
                    <a href="/users/edit/${user.numero_documento}">Editar</a>|
                    <a href="/users/delete/${user.numero_documento}">Eliminar</a></li>`;
            });
            html +=`</ul>`;
            res.send(html); // Se envia el HTML como respuesta al navegador
        });
    },
    // Muetsra el formulario para crear un nuevo usuario
    formCreate: (req,res) => {
        // Envía el archivo HTML con el formulario 
        res.sendFile(path.join(__dirname, '../views/formCreate.html'));
    },

    // Controlador que guarda el nuevo usuario en la base de datos
    create: (req, res) => {
        // Extrae los datos enviados desde el formulario
        // ******CAMBIAR ESTO**********
        const { numero_documento, nombre_usuario, apellido_usuario, tipo_documento_usuario, correo_electronico_usuario, telefono, id_rol, contrasena } = req.body;
        
        // Llama al modelo para guardar lños datos 
        // ******CAMBIAR ESTO**********
        userModel.create({numero_documento, nombre_usuario, apellido_usuario, tipo_documento_usuario, correo_electronico_usuario, telefono, id_rol, contrasena}, (err) => {
            if (err) throw err;
            res.redirect('/users'); // Redirige a la lista de usuarios
        });
    },
    // Contorlado de que busca un usuario por su ID y redirige al formulario de edicion
    formEdit: (req, res) => {
        const numero_documento = req.params.numero_documento; // Se obtione el ID desde la URL
        
        userModel.getById(numero_documento, (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                const user = results[0];

                // Redirige al formulario de edición con los datos del uusuario como parametros en la URL
                // ******CAMBIAR ESTO**********
                res.redirect(`/users/edit_form?numero_documento=${user.numero_documento}&nombre=${user.nombre_usuario}&apellido=${user.apellido_usuario}&email=${user.correo_electronico_usuario}&telefono=${user.telefono}`)
            }else{
                res.send('Usuario no encontrado')
            }
        });
    },
    // Muestra el formulario de edicion como archivo HTML
    formEditRender: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/formEdit.html'));
    },
    // Controlador que actualiza los datos del usuario en la base de datos
    update: (req, res) => {
        const numero_documento = req.params.numero_documento; // Id del usuario a editar

        // ******CAMBIAR ESTO**********
        const {nombre, apellido, email, telefono} = req.body;// Nuevos datos del formulario

        // ******CAMBIAR ESTO**********
        userModel.update(numero_documento, { nombre, apellido, email, telefono },  (err) => {
            if (err) throw err;
            res.redirect('/users'); //Redirige a la la lista de usuarios
        });
    },
    // Contorlador que elimina un usuario por su id
    delete: (req, res) => {
        const numero_documento = req.params.numero_documento; // ID del usuario a eliminar

        userModel.delete(numero_documento, (err) => {
            if (err) throw err;
            res.redirect('/users');// Redirige a la lista despues de eliminar
        });
    }
};