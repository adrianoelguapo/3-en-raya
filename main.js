setTimeout(() => {
    let nombreJugador1 = prompt("Ingresa el nombre del jugador 1")
    let nombreJugador2 = prompt("Ingresa el nombre del jugador 2")

    let jugador1 = {
        nombre: nombreJugador1,
        ficha: "./images/letra-o.png"
    }
    
    let jugador2 = {
        nombre: nombreJugador2,
        ficha: "./images/letra-x.png"
    }

     $(".jugador1 .nombrejugador").append('<p>' + jugador1.nombre + '</p>')
     $(".jugador2 .nombrejugador").append('<p>' + jugador2.nombre + '</p>') 

     let turno = 1

$(function() {
    $(".casilla").on("click", function() {
        if ($(this).children("img").length === 0 && turno === 1) {
            $(this).append('<img src="' + jugador1.ficha + '">');
            turno = 2;
        } else if ($(this).children('img').length === 0 && turno === 2) {
            $(this).append('<img src="' + jugador2.ficha + '">');
            turno = 1;
        }

        comprobarGanador();
        comprobarEmpate()
    });

    function comprobarGanador() {
        const condiciones = [
            [".item1 img", ".item2 img", ".item3 img"], // Fila 1
            [".item4 img", ".item5 img", ".item6 img"], // Fila 2
            [".item7 img", ".item8 img", ".item9 img"], // Fila 3
            [".item1 img", ".item4 img", ".item7 img"], // Columna 1
            [".item2 img", ".item5 img", ".item8 img"], // Columna 2
            [".item3 img", ".item6 img", ".item9 img"], // Columna 3
            [".item1 img", ".item5 img", ".item9 img"], // Diagonal 1
            [".item3 img", ".item5 img", ".item7 img"]  // Diagonal 2
        ];

        for (let condicion of condiciones) {
            let hayGanador = true;
            let fichaGanador = null;

            for (let selector of condicion) {
                let img = $(selector);
                if (img.length === 0 || (fichaGanador !== null && img.attr('src') !== fichaGanador)) {
                    hayGanador = false;
                    break;
                }
                if (fichaGanador === null) {
                    fichaGanador = img.attr("src");
                }
            }

            if (hayGanador) {
                if (fichaGanador === jugador1.ficha) {
                    alert("Ha ganado " + jugador1.nombre);
                } else if (fichaGanador === jugador2.ficha) {
                    alert("Ha ganado " + jugador2.nombre);
                }
                return;
            }
        }
    }

    function comprobarEmpate() {
        const tablero = [
            ".item1 img", ".item2 img", ".item3 img",
            ".item4 img", ".item5 img", ".item6 img",
            ".item7 img", ".item8 img", ".item9 img"
        ];
    
        let todasOcupadas = true;
    
        for (let casilla of tablero) {
            if ($(casilla).length === 0) {
                todasOcupadas = false;
                break;
            }
        }
    
        if (todasOcupadas) {
            alert("Empate, no hay ganador");
        }
    }
});
},500);