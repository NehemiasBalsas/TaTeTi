document.addEventListener("DOMContentLoaded", function () {

    const tabla = document.getElementById("tabla1");
    const celdas = tabla.getElementsByTagName("td");
    const mensaje = document.getElementById("mensaje");
    const resetBtn = document.getElementById("reset");
    
    let JugadorActual = "X";
    let JuegoTerminado = false;
    let movimientos = 0;

    resetBtn.addEventListener("click", iniciarJuego);

    function iniciarJuego() {
    JugadorActual = "X";
    JuegoTerminado = false;
    movimientos = 0;
    mensaje.textContent = "";
    for (let i = 0; i < celdas.length; i++) {
    celdas[i].textContent = "";
    celdas[i].addEventListener("click", hacerMovimiento);
    }
}

    function hacerMovimiento() {
    if (this.textContent === "" && !JuegoTerminado) {
    this.textContent = JugadorActual;
    movimientos++;
    VerificarGanador();
    JugadorActual = JugadorActual === "X" ? "O" : "X";
    }
}

    function VerificarGanador() {
    const combosGanadores = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columnas
    [0, 4, 8],
    [2, 4, 6], // Diagonales
    ];

    for (let combo of combosGanadores) {
    const [a, b, c] = combo;
    if (
        celdas[a].textContent === JugadorActual &&
        celdas[b].textContent === JugadorActual &&
        celdas[c].textContent === JugadorActual
    ) {
        FinDelJuego(`¡El jugador ${JugadorActual} ha ganado!`);
        return;
    }
    }

    if (movimientos === 9) {
    FinDelJuego("¡Empate!");
    }
}

    function FinDelJuego(msg) {
    JuegoTerminado = true;
    mensaje.textContent = msg;
    for (let i = 0; i < celdas.length; i++) {
    celdas[i].removeEventListener("click", hacerMovimiento);
    }
}

    iniciarJuego();
});
