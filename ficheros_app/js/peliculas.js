$(document).ready(initializeEvents);

function initializeEvents(){
    //$("#peticion_ajax").click(peticionAjaxGenerica);
    peticionAjaxGenerica();
    $("#guardar").click(ajaxPost);
    $("#modificar").click(ajaxPut);
    $("#borrar").click(ajaxDelete);
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
    alert("Peticion completada con status: " +status +" : " +data);
}

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
function ajaxPut(){
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
}//Fin de ajaxPut

//Borrar pelicula
//Borra la peli con id= 1
function ajaxDelete(){
    $.ajax('http://localhost:3000/peliculas/2', {
    method: 'DELETE'
    });


    //Aprovecho para ver si busqueda funciona
    busquedaConFiltro();
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




