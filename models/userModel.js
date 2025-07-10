// Importa la conexión a la base de datos desde el archivo db,js
const db = require('../db');
// Exporta un objeto que contiene funciones para interactuar con la tabla 'users'
module.exports = {
    // Obtener todos los registros de la tabla 'users'
    // Callback es una función que recibe el resultado de la consulta
    getAll: (callback) =>{
        db.query('SELECT * FROM usuarios_por_rol', callback);
    },
    // Crear un nuevo usuario en la base de datos
    // 'data' es un objeto con los campos del nuevo usuario
    create: (data, callback) => {
        // El signo de interrogación (?) será reemplazado por los valores de 'data'
        db.query('INSERT INTO usuarios SET ?', data, callback); 
    },

    // Buscar un susuario por su ID
    // Se utiliza para editar o ver detalles especificos
    getById: (numero_documento, callback) => {
        db.query('SELECT * FROM usuarios WHERE numero_documento =?', [numero_documento], callback);
    },
    // Actualizar un usuario según su ID
    // 'data' contiene los campos nuevos que se van a guardar
    update: (id, data, callback) => {
        decodeURI.query('UPDATE usuarios SET ? WHERE numero_documento = ?', [data, numero_documento], callback);
    },

    // Eliminar un usuario por su ID
    delete: (numero_documento, callback) =>{
        db.query('DELETE FROM usuarios WHERE numero_documento = ?', [numero_documento], callback)
    }
};