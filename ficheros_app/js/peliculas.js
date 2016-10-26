$(document).ready(initializeEvents);

function initializeEvents(){
    //$("#peticion_ajax").click(peticionAjaxGenerica);
    peticionAjaxGenerica();

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
        url: "https://jsonplaceholder.typicode.com/users"
    }).done(peticionCompletada).fail(peticionFallida);
}//Fin de peticionAjaxGenerica


//data es lo nos devuelve el servidor
function peticionCompletada(data, status, jqXHR){
    //$("#contenido_de_ajax").html(data[0].username);
    $("#contenido_de_ajax").html("<p>hola soy juan</p>");
    for(i in data){
        $("#contenido_de_ajax").append(data[i].username +"<br/>");
        $("tbody").append("<tr>" 
            +"<td>" +data[i].id +"</td>" 
            +"<td>" +data[i].name +"</td>" 
            +"<td>" +data[i].username +"</td>" 
            +"<td>" +data[i].email +"</td>" 
            //+"<td>" +data[i].address +"</td>"

            //address es un objeto json, hago stringify para poder inprimirlo en la columna address 
            +"<td>" +JSON.stringify(data[i].address) +"</td>" 
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