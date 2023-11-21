const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../../config.db");

const getAlumnos = (request,response) => {
    response.header('Access-Control-Allow-Origin','*')
    connection.query("SELECT * FROM alumno", (error,results)=>{
        if (error) throw error;
        response.status(200).json(results);
    });
};

const getAlumno = (request, response) =>{
    response.header('Access-Control-Allow-Origin','*')
    const matricula = request.params.matricula
    connection.query ("SELECT * FROM alumno WHERE matricula = ?",[matricula], (error,results)=>{
        if (error) throw error;
        response.status(200).json(results);
    } )
}

const postAlumno = (request, response) =>{
    response.header('Access-Control-Allow-Origin','*')

    const {matricula,nombre,apellido,telefono,delegado,asignaturaId,cursoId}= request.body;
    connection.query(
        "INSERT INTO alumno (matricula,nombre,apellido,telefono,delegado,asignaturaId,cursoId) VALUES (?,?,?,?,?,?,?)", [matricula,nombre,apellido,telefono,delegado,asignaturaId,cursoId], (error, results) => {
            if (error) throw error;
            response
            .status(201)
            .json( "Alumno" +" "+ nombre+" "+ apellido+", "+"agregado con exito.");
        }
    )
}

const deleteAlumno = (request, response) => {
    response.header('Access-Control-Allow-Origin','*')

    const matricula = request.params.matricula;
    connection.query ("DELETE FROM alumno WHERE matricula = ?",matricula, (error,results)=>{
        if (error) throw error;
    response.status(201).json("Alumno"+ " "+"eliminado.");
    })
}

const updateAlumno = (request, response) => {
    response.header('Access-Control-Allow-Origin','*')

    const {nombre,apellido,telefono,delegado,asignaturaId,cursoId} = request.body;
    connection.query("UPDATE alumno SET nombre = ?, apellido = ?, telefono = ?, delegado = ?, asignaturaId = ?, cursoId = ? WHERE matricula = ?", [nombre,apellido,telefono,delegado,asignaturaId,cursoId, request.params.matricula], 
    (err, result) => {
        if (err) {
        console.error("Error al actualizar alumno: " + err.message);
        res.status(500).send("Error en el servidor");
        } else {
        response
            .status(201)
            .json( "Alumno" +" "+nombre + " "+ apellido+" "+ "actualizado." );
        }
})};



app.route("/alumnos").get(getAlumnos);
app.route("/alumnos/:matricula").get(getAlumno);
app.route("/alumnos").post(postAlumno);
app.route("/alumnos/:matricula").put(updateAlumno);
app.route("/alumnos/:matricula").delete(deleteAlumno);

module.exports=app;

