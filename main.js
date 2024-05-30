const botondeinicio = document.getElementById('botondeinicio');

function cambiodefondoaleatorio() {
  const coloresfondocambio = document.getElementById('coloresfondocambio');
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}

function textogameover() {
  const mensajedeperder = document.getElementById("mensajedeperder");
  mensajedeperder.innerText = "GAME OVER";
  mensajedeperder.style.fontSize = "100px";
  mensajedeperder.style.textAlign = "center";
  mensajedeperder.style.color = "white"
  mensajedeperder.style.fontFamily = " 'Jersey 20', sans-serif";
  mensajedeperder.style.fontWeight = 400;
  mensajedeperder.style.fontStyle = "normal";
}

function textoganador() {
  const mensajedeperder = document.getElementById("mensajedeganar");
  mensajedeperder.innerText = "GANASTE, HAZ CLICK EN LA PANTALLA";
  mensajedeperder.style.fontSize = "100px";
  mensajedeperder.style.textAlign = "center";
  mensajedeperder.style.color = "white"
  mensajedeperder.style.fontFamily = "'Rubik Moonrocks', sans-serif";
  mensajedeperder.style.fontWeight = 400;
  mensajedeperder.style.fontStyle = "normal";
}

    function iniciarJuego() {
      alert("BIENVENIDO");
      desaparecerboton();

      setTimeout(function cambio() {
        class Participante {
          constructor(nombre, apellido) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.intentos = 3;
            this.numerosGanadores = [2, 4, 7, 13, 17];
          }

          saludar() {
            alert(`Buenas ${this.nombre} ${this.apellido} te deseo suerte en el sorteo del número ganador.`);
          }

          verificarIntentos() {
            if (this.intentos > 0) {
              alert(`${this.nombre} ${this.apellido} Tienes ${this.intentos} intentos para adivinar el número ganador`);
            } else {
              alert(`${this.nombre} ${this.apellido} Has perdido todas tus oportunidades`);
              desaparecerboton();
            }
          }

          adivinarNumero() {
            let acierto = false;
            while (this.intentos > 0 && !acierto) {
              let usuario = parseInt(prompt("Ingrese un número entre el 0 y el 20"));
              if (this.numerosGanadores.some((ganador) => ganador === usuario)) {
                acierto = true;
                alert(`${this.nombre} ${this.apellido} ¡Felicidades! Has adivinado uno de los números ganadores.`);
                this.entregarPremio(usuario);
              } else if (usuario === "") {
                alert("ERROR");
                return;
              } else if (isNaN(usuario)) {
                alert("No has ingresado un número");
              } else if (usuario > 20 || usuario < 0) {
                alert("Tu número no corresponde al sorteo");
              } else {
                this.intentos--;
                alert(`${this.nombre} ${this.apellido} Un intento menos, intenta nuevamente`);
                document.body.style.backgroundColor = "black";
                textogameover();
                console.log('Al perder todas las oportunidades el fondo quedara negro');
              }
            }

            if (!acierto) {
              alert(`${this.nombre} ${this.apellido} Has perdido todas tus oportunidades`);
              textogameover();
              desaparecerboton();
            }
          }

          entregarPremio(numeroGanador) {
            if ([2, 17, 13, 4, 7].includes(numeroGanador)) {
              alert(`${this.nombre} ${this.apellido} Te has ganado un ${premio1.marca} ${premio1.modelo}, con una memoria de ${premio1.memoria} en su versión color ${premio1.color}.`);
              this.intentosSegundoPremio();
            } else {
              alert(`${this.nombre} ${this.apellido} Te has ganado una entrada para el sorteo del premio mayor.`);
              this.intentosSegundoPremio();
            }
          }

          intentosSegundoPremio() {
            let numeroGanadorSegundoPremio = Math.floor(Math.random() * 4);
            let intento = parseInt(prompt(`${this.nombre} ${this.apellido} Ingrese un número entre el 0 y el 3 para el premio mayor`));
            if ((intento === numeroGanadorSegundoPremio || intento === 2)) {
              alert(`${this.nombre} ${this.apellido} ¡Increíble! Has ganado el premio mayor, un ${premio2.marca} ${premio2.modelo} ${premio2.color} 0km.`);
              textoganador();
              document.addEventListener('click', cambiodefondoaleatorio);
              console.log('Celebra dandole click a la pantalla.');
              alert(`No olvides reclamar tus premios ganados en nuestras agencias en la siguiente fecha ${hoy.toDateString()}`);
            } else {
              alert(`${this.nombre} ${this.apellido} Lo siento, no has ganado el premio mayor esta vez. El número ganador era ${numeroGanadorSegundoPremio}.`);
              document.body.style.backgroundColor = "black";
              console.log('PERDISTE EL FONDO ESTA NEGRO');
              alert(`No olvides reclamar tus premios ganados en nuestras agencias en la siguiente fecha ${hoy.toDateString()}`);
              textogameover();
            }
            desaparecerboton();
          }
        }

        let pregunta = prompt("¿QUIERES ENTRAR A MI JUEGO?");

        if (pregunta.toLowerCase() === "si") {
          let nombre = prompt("Ingrese su nombre");
          let apellido = prompt("Ingrese su apellido");
          let participante = new Participante(nombre, apellido);
          document.body.style.backgroundColor = "MediumTurquoise";
          console.log('Cambio el fondo a MediumTurquoise');
          setTimeout(() => {
            alert("HAS INGRESADO");
            participante.saludar();
            participante.verificarIntentos();
            participante.adivinarNumero();
          }, 1000);
        } else {
          alert("HAS SIDO EXPULSADO");
          document.body.style.backgroundColor = "black";
          console.log('Fuiste expulsado el fondo esta negro');
          textogameover();
          desaparecerboton();
        }

        const premio1 = {
          marca: "iPhone",
          modelo: 15,
          memoria: "512GB",
          color: "Blanco",
        };

        const premio2 = {
          marca: "Tesla",
          modelo: "Cybertruck",
          color: "Gris",
        };

        const hoy = new Date("Mayo 29, 2024");
      }, 2000);
    }

    function desaparecerboton() {
      botondeinicio.style.display = 'none';
    }


    function cambiodefondoaleatorio() {
        const colorChangeMessage = document.getElementById('coloresfondocambio');
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
      }

      botondeinicio.addEventListener('click', iniciarJuego);