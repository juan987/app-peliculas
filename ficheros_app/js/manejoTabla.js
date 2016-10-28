function verTextoDeUnaFila(){
    $('table tbody tr').click(function(){
        alert($(this).text());
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