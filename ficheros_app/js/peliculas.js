$(document).ready(initializeEvents);

function initializeEvents(){
    //$("#peticion_ajax").click(peticionAjaxGenerica);
    peticionAjaxGenerica();
    $("#guardar").click(ajaxPost);
    $("#modificar").click(ajaxPut);
    //$("#borrar").click(ajaxDelete);
    $("#serializarFormulario").click(generaJsonFromFormulario);

    


}



//Combina los efectos del 13 y el 14
function peticionAjaxGenerica(){
    //$("#contenido_de_ajax").load("ejempklo-17-fichero_alojado_en_servidor.txt");
    $.ajax({
        //Puede ser una cadena, un array o un objeto de JS
        //Asi aparece en el url los datos
        //?nombre=Ruben&nivel_de_cafe=medio
        data: {nombre:"Ruben", nivel_de_cafe: "medio"},
        //Tipo de peticion http
        type:"GET",
        //tipo de dato esperado
        dataType: "json",
        //URL de comunicacion con el servicio
        //url: "https://jsonplaceholder.typicode.com/albums"
        //url: "https://jsonplaceholder.typicode.com/users"
        url: "http://localhost:3000/peliculas"    
    }).done(peticionCompletada).fail(peticionFallida);
}//Fin de peticionAjaxGenerica (GET)


//data es lo nos devuelve el servidor
function peticionCompletada(data, status, jqXHR){
    //$("#contenido_de_ajax").html(data[0].username);
    $("#contenido_de_ajax").html("<p>hola soy juan</p>");
    for(i in data){
        $("#contenido_de_ajax").append(data[i].titulo +"<br/>");
        $("tbody").append("<tr>" 
            +"<td>" +data[i].id +"</td>" 
            +"<td>" +data[i].titulo +"</td>" 
            +"<td>" +data[i].director +"</td>" 
            +"<td>" +data[i].sinopsis +"</td>" 
            +"<td>" +data[i].fecha +"</td>" 
            +"<td>" +data[i].valoracion +"</td>" 
            +"<td class='borrar'>" +"<button>Borrar</button>" +"</td>" 
            +"<td class='modificar'>" +"<button>Seleccionar</button>" +"</td>" 

            //Esto era el codigo para //url: "https://jsonplaceholder.typicode.com/users"
            //+"<td>" +data[i].address +"</td>"
            //address es un objeto json, hago stringify para poder inprimirlo en la columna address 
            //+"<td>" +JSON.stringify(data[i].address) +"</td>" 
            
            
            //Utilidades de JSON para estudiar
            //JSON.stringify(object)
            //Para pasar un string a un objeto json
            //  JSON.parse(string)
        +"</tr>)");//Fin del append
    }
    //alert("Peticion completada con status: " +status +" : " +data);
    console.log("Peticion completada con status: " +status +" : " +data);

    //Ver texto de todas las celdas de una fila sin formato
    //verTextoDeUnaFila();
    //Resaltar fila cuando hago hover
    resaltarFilaEnTablaCuandoHover();
    //Activar click en celda borrar
    activarBorrado();
    //Activar click celda modificar
    activarModificar();
}//Fin de peticion completada



function peticionFallida(jqXHR,status,error){
    console.log("Error al procesar la peticion Ajax");
    console.log("Status del error: " +status);
    console.log("Error!!!!!:  "  +error);
}


//Esta es una forma acelerada y reducida  del $.ajax para get y post
function pruebasConGetYPost(){
    $.get("http://localhost:8080/ejempklo-17-fichero_alojado_en_servidor.txt",
            resultadoGet);

    $.post("http://localhost:8080/ejempklo-17-fichero_alojado_en_servidor.txt",
            resultadoPost);
}

function resultadoGet(data, status){
    alert("Resultado= " +data);
}

function resultadoPost(){
    alert("Post correcto!!")
}
//FIN de Esta es una forma acelerada y reducida  del $.ajax para get y post

//Creating a resource

// POST adds a random id to the object sent
//Hecho como en los ejemplos de https://github.com/typicode/jsonplaceholder#how-to
function ajaxPostPrueba(){
//SOLO USADO PARA PRUEBAS
    $.ajax("http://localhost:3000/peliculas", {
        method: 'POST',
        data: {
            //Con el POST, nunca le paso el id, eso lo hace la base de datos.
            //id: 'foo',
            titulo: 'bar',
            director: '1',
            sinopsis: '1',
            fecha: '12/06/1998',
            valoracion: 'Excelente'
        }
        }).then(function(data) {
        console.log("Resultado del POST de prueba" +data);

    });

    /* will return
    {
    id: 101,
    title: 'foo',
    body: 'bar',
    userId: 1
    }
    */
}//Fin de ajaxPostPrueba

//Agregar una nueva pelicula a la db
function ajaxPost(){
    let datos = generaJsonFromFormulario();
    //JsonParse me da error, estudiarlo mejor
    //var objetoJson = JSON.parse(datos);
    $.ajax("http://localhost:3000/peliculas", {
        method: 'POST',
        data: datos
        //data: objetoJson
        }).then(function(data) {
        console.log("Resultado del POST" +data);
        //Recargo los datos desde el servidor
        peticionAjaxGenerica();
    });
}//Fin de ajaxPost

//Actualizar-modificar datos de una pelicula concreta
function ajaxPutPrueba(){
    $.ajax('http://localhost:3000/peliculas/2', {
        method: 'PUT',
        data: {
            id: 1,
            titulo: 'modificado',
            director: '199999',
            sinopsis: '373474747',
            fecha: '27/10/2016',
            valoracion: 'modificado'
        }
        }).then(function(data) {
        console.log("Resultado del PUT" +data);
    });

    /* will return
    {
    id: 1
    title: 'foo',
    body: 'bar',
    userId: 1
    }
    */
}//Fin de ajaxPutPrueba


//Al clickear boton de modificar arriba, esta funcion 
function ajaxPut(){
    console.log("En el metodo ajaxPut");
    let datos = generaJsonFromFormularioModificado();
    //url de la llamada ajax
    let miUrl = 'http://localhost:3000/peliculas/' +miFilaGlobal.find("td:eq(0)").text();
    console.log("url para borrar la peli en la db:  " +miUrl);
    
    $.ajax(miUrl, {
        method: 'PUT',
        data: datos
        }).then(function(data) {
        console.log("Resultado del PUT" +data);
    });
    
    //Recargo los datos desde el servidor
    //peticionAjaxGenerica();

    //Actualiza los datos de la fila
    actualizarLaFilaDeLaTabla(dameFilaModificada(), datos);
    

}//Fin de ajaxPut

//Borrar pelicula
function ajaxDeleteTest(){
    //Borra la peli con id= 2
    $.ajax('http://localhost:3000/peliculas/2', {
    method: 'DELETE'
    });
}//Fin ajaxDeleteTest

//Borrar pelicula al clickar en la columna borrar
function ajaxDelete(){
    console.log("En el metodo ajaxDelete");
    //Obtener la fila que contiene la celda borrar clickada
    let filaDatosDeLaPelicula = $(this).parent();
    //Obtener el valor de la primera celda TD en esta fila que es el id en la DB
    let idDeLaPelicula = filaDatosDeLaPelicula.find("td:eq(0)").text();
    let nombreDeLaPelicula = filaDatosDeLaPelicula.find("td:eq(1)").text();

    // get the current row
         //var currentRow=$(this).closest("tr"); 
         
        // var col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
    //console.log("En metodo AjaxDelete:  " +$(filaDatosDeLaPelicula).children()[1].text());
    console.log("En metodo AjaxDelete:  " +idDeLaPelicula +" , Nombre de la peli: " +nombreDeLaPelicula);
    //url de la llamada ajax
    let miUrl = 'http://localhost:3000/peliculas/' +idDeLaPelicula;
    console.log("url para borrar la peli en la db:  " +miUrl)
    //Llamada ajax para borrar la pelicula en la DB
    $.ajax(miUrl, {
    method: 'DELETE'
    });

    //Ultimo paso:
    //Eliminar la fila de la tabla html (Sin verificar el resultado Ajax)
    $(this).closest('tr').remove();
    
    //Obtener el indice de esta pelicula de la DB, que esta en la columna 1

}//Fin ajaxDelete


//Buscar datos especificos
//Filtering resources
//Basic filtering is supported through query parameters.
// Will return all the posts that belong to the first user
function busquedaConFiltro(){
    //$.ajax('http://localhost:3000/peliculas/?id=1').then(function(data) {
    $.ajax('http://jsonplaceholder.typicode.com/posts?userId=1').then(function(data) {
        console.log("busqueda con filtro: " +data);
    });
}




