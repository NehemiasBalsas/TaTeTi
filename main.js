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
    celdas[i].classList.remove("X", "O"); 
    celdas[i].removeEventListener("click", hacerMovimiento);
    celdas[i].addEventListener("click", hacerMovimiento);
  }
}

    function hacerMovimiento() {
      if (!this.querySelector("img") && !JuegoTerminado) {
        const image = document.createElement("img");
        image.classList.add("imagen-jugador");
        image.src = JugadorActual === "X" ? "imagenes/x.png" : "imagenes/o.png";

        this.appendChild(image);
        this.classList.add(JugadorActual);
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
      celdas[a].classList.contains(JugadorActual) &&
      celdas[b].classList.contains(JugadorActual) &&
      celdas[c].classList.contains(JugadorActual)
    ) {
      FinDelJuego(`¡El jugador ${JugadorActual} ha ganado!`);
      return;
    }
  }

  if (movimientos === 9) {
    FinDelJuego("¡Empate!");
  }
    }
    
function RandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function RandomPosicionVertical() {
  return Math.random() * -90  + "vh";
}

function crearConfeti() {
  const confeti = document.createElement("div");
  confeti.classList.add("confeti");
  confeti.style.left = Math.random() * window.innerWidth + "px";
  confeti.style.top = RandomPosicionVertical();
  confeti.style.animationDuration = Math.random() * 3 + 2 + "s";
  confeti.style.backgroundColor = RandomColor();
  document.body.appendChild(confeti);

  setTimeout(() => {
    document.body.removeChild(confeti);
  }, 3000);
}

  function FinDelJuego(msg) {
    JuegoTerminado = true;
    mensaje.textContent = msg;
    
    for (let i = 0; i < 500; i++) {
        crearConfeti();
    }
    
    for (let i = 0; i < celdas.length; i++) {
    celdas[i].removeEventListener("click", hacerMovimiento);
    }
}

iniciarJuego();
});
