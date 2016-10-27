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
}