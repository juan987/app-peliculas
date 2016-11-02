function verTextoDeUnaFila(){
    $('table tbody tr').click(function(){
        //alert($(this).text());
        console.log($(this).text());
    });
}

function resaltarFilaEnTablaCuandoHover(){
    $('table tbody tr').hover(inMouseEvent, outMouseEvent);
}

function inMouseEvent(){
    $(this).css("background-color", "#ff0")
}

function outMouseEvent(){
    $(this).css("background-color", "#fff")
}

function activarBorrado(){
    //Para borrar una fila
    $("table tbody td.borrar").click(ajaxDelete);
}

function activarModificar(){
    //Para borrar una fila
    $("table tbody td.modificar").click(miModificar);
}

function miModificar(){
    console.log("En el metodo miModificar");
    //Obtener la fila que contiene la celda borrar clickada
    let filaDatosDeLaPelicula = $(this).parent();

    $("[name='id']").val(filaDatosDeLaPelicula.find("td:eq(0)").text());
    $("[name='titulo']").val(filaDatosDeLaPelicula.find("td:eq(1)").text());
    $("[name='director']").val(filaDatosDeLaPelicula.find("td:eq(2)").text());
    $("[name='sinopsis']").val(filaDatosDeLaPelicula.find("td:eq(3)").text());
    $("[name='fecha']").val(filaDatosDeLaPelicula.find("td:eq(4)").text());
    $("[name='valoracion']").val(filaDatosDeLaPelicula.find("td:eq(5)").text());

    console.log("metodo miModificar, Nombre de la peli: " +$("[name='titulo']").val())
}