//Este fichero tiene funciones para crear estructuras JSON

function generaJsonFromFormulario(){
    /* Como en http://www.w3schools.com/jquery/ajax_serializearray.asp
    var x = $("form").serializeArray();
    $.each(x, function(i, field){
        $("#results").append(field.name + ":" + field.value + " "); */

    var stringJsonConPeliculaDatos = "{";
    var stringJsonConPeliculaDatos;
    var x = $("#miFormulario").serializeArray();
    $.each(x, function(i, field){
        $("#resultadoSerializacion").append(field.name + ":" + field.value + " ");

        //Construccion del string json
        stringJsonConPeliculaDatos += field.name +":" +"'" +field.value +"'" +","; 
    });//Fin del $.each
    //para quitar la ultima coma
    xxx = stringJsonConPeliculaDatos.substring(0, stringJsonConPeliculaDatos.length - 1);
    xxx += "}";
    $("#resultadoSerializacion").append("<br/>" +xxx);
    //return stringJsonConPeliculaDatos.substring(0, stringJsonConPeliculaDatos.length - 1);
    //return xxx;
    console.log("Form serializada como json:  " +x);



    var objetojson = {
            //Con el POST, nunca le paso el id, eso lo hace la base de datos.
            //id: 'foo',
            titulo: x[0].value,
            director: x[1].value,
            sinopsis: x[2].value,
            fecha: x[3].value,
            valoracion: x[4].value
        }
    return objetojson;
}//Fin de generaJsonFromFormulario

function generaJsonFromFormularioModificado(){

    var x = $("#miFormulario").serializeArray();

    console.log("Form serializada como json:  " +x);



    var objetojson = {
            //Con el POST, nunca le paso el id, eso lo hace la base de datos.
            //id: 'foo',
            titulo: x[1].value,
            director: x[2].value,
            sinopsis: x[3].value,
            fecha: x[4].value,
            valoracion: x[5].value
        }
    return objetojson;
}//Fin de generaJsonFromFormularioModificado

function devuelveElIdDeLaPelicula(){

    var x = $("#miFormulario").serializeArray();

    var objetojson = {
            //Con el POST, nunca le paso el id, eso lo hace la base de datos.
            //id: 'foo',
            titulo: x[1].value,
            director: x[2].value,
            sinopsis: x[3].value,
            fecha: x[4].value,
            valoracion: x[5].value
        }
    return x[0].value;
}//Fin de generaJsonFromFormularioModificado