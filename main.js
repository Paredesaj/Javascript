const botondeinicio = document.getElementById("botondeinicio");

function cambiodefondoaleatorio() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}

function textogameover() {
  const mensajedeperder = document.getElementById("mensajedeperder");
  mensajedeperder.innerText = "GAME OVER";
  mensajedeperder.style.fontSize = "100px";
  mensajedeperder.style.textAlign = "center";
  mensajedeperder.style.color = "white";
  mensajedeperder.style.fontFamily = " 'Jersey 20', sans-serif";
  mensajedeperder.style.fontWeight = 400;
  mensajedeperder.style.fontStyle = "normal";
}

function textoganador() {
  const mensajedeganar = document.getElementById("mensajedeganar");
  mensajedeganar.innerText = "GANASTE, HAZ CLICK EN LA PANTALLA";
  mensajedeganar.style.fontSize = "30px";
  mensajedeganar.style.textAlign = "center";
  mensajedeganar.style.color = "white";
  mensajedeganar.style.fontFamily = "'Rubik Moonrocks', sans-serif";
  mensajedeganar.style.fontWeight = 400;
  mensajedeganar.style.fontStyle = "normal";
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
        this.cargarIntentos();
      }

      saludar() {
        alert(`Buenas ${this.nombre} ${this.apellido}, te deseo suerte en el sorteo del número ganador.`);
      }

      cargarIntentos() {
        const intentosGuardados = localStorage.getItem(`intentosquelequedaron-intentos`);
        if (intentosGuardados !== null) {
          this.intentos = parseInt(intentosGuardados);
        } else {
          this.guardarIntentos();
        }
      }

      guardarIntentos() {
        localStorage.setItem(`intentosquelequedaron-intentos`, this.intentos);
      }

      verificarIntentos() {
        if (this.intentos > 0) {
          alert(`${this.nombre} ${this.apellido}, tienes ${this.intentos} intentos para adivinar el número ganador.`);
        } else {
          alert(`${this.nombre} ${this.apellido}, has perdido todas tus oportunidades.`);
          desaparecerboton();
        }
        this.guardarIntentos();
      }

      adivinarNumero() {
        let acierto = false;
        while (this.intentos > 0 && !acierto) {
          let usuario = parseInt(prompt("Ingrese un número entre el 0 y el 20"));
          localStorage.setItem("numeroingresado1p", usuario);
          if (this.numerosGanadores.includes(usuario)) {
            acierto = true;
            alert(`${this.nombre} ${this.apellido}, ¡Felicidades! Has adivinado uno de los números ganadores.`);
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
            alert(`${this.nombre} ${this.apellido}, un intento menos, intenta nuevamente.`);
            document.body.style.backgroundColor = "black";
            textogameover();
            console.log("Al perder todas las oportunidades el fondo quedará negro.");
          }
          this.guardarIntentos();
        }

        if (!acierto) {
          alert(`${this.nombre} ${this.apellido}, has perdido todas tus oportunidades.`);
          textogameover();
          desaparecerboton();
        }
      }

      entregarPremio(numeroGanador) {
        if ([2, 17, 13, 4, 7].includes(numeroGanador)) {
          alert(`${this.nombre} ${this.apellido}, te has ganado un ${premio1.marca} ${premio1.modelo}, con una memoria de ${premio1.memoria} en su versión color ${premio1.color}.`);
          const premio1JSON = JSON.stringify(premio1);
          localStorage.setItem("premio1", premio1JSON);
          this.intentosSegundoPremio();
        } else {
          alert(`${this.nombre} ${this.apellido}, te has ganado una entrada para el sorteo del premio mayor.`);
          this.intentosSegundoPremio();
        }
      }

      intentosSegundoPremio() {
        let numeroGanadorSegundoPremio = Math.floor(Math.random() * 4);
        let intento = parseInt(prompt(`${this.nombre} ${this.apellido}, ingrese un número entre el 0 y el 3 para el premio mayor`));
        localStorage.setItem("numeroingresado2p", intento);
        if (intento === numeroGanadorSegundoPremio || intento === 2) {
          alert(`${this.nombre} ${this.apellido}, ¡Increíble! Has ganado el premio mayor, un ${premio2.marca} ${premio2.modelo} ${premio2.color} 0km.`);
          const premio2JSON = JSON.stringify(premio2);
          localStorage.setItem("premio2", premio2JSON);
          textoganador();
          document.addEventListener("click", cambiodefondoaleatorio);
          console.log("Celebra dandole click a la pantalla.");
          alert(`No olvides reclamar tus premios ganados en nuestras agencias en la siguiente fecha ${hoy.toDateString()}.`);
        } else {
          alert(`${this.nombre} ${this.apellido}, lo siento, no has ganado el premio mayor esta vez. El número ganador era ${numeroGanadorSegundoPremio}.`);
          document.body.style.backgroundColor = "black";
          console.log("PERDISTE EL FONDO ESTÁ NEGRO");
          alert(`No olvides reclamar tus premios ganados en nuestras agencias en la siguiente fecha ${hoy.toDateString()}.`);
          textogameover();
        }
        desaparecerboton();
      }
    }

    let pregunta = prompt("¿QUIERES ENTRAR A MI JUEGO? (SI/NO)");

    if (pregunta.toLowerCase() === "si" || pregunta.toLowerCase() === "aceptar") {
      localStorage.setItem("ingresojuego", pregunta);

      let nombre = prompt("Ingrese su nombre");
      localStorage.setItem("usuarionombre", nombre);

      let apellido = prompt("Ingrese su apellido");
      localStorage.setItem("usuarioapellido", apellido);

      let participante = new Participante(nombre, apellido);

      document.body.style.backgroundColor = "MediumTurquoise";
      console.log("Cambio el fondo a MediumTurquoise");
      setTimeout(() => {
        alert("HAS INGRESADO");
        participante.saludar();
        participante.verificarIntentos();
        participante.adivinarNumero();
      }, 1000);
    } else {
      alert("HAS SIDO EXPULSADO");
      document.body.style.backgroundColor = "black";
      console.log("Fuiste expulsado, el fondo está negro");
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
  botondeinicio.style.display = "none";
}

botondeinicio.addEventListener("click", iniciarJuego);
localStorage.clear();