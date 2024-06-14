const botondeinicio = document.getElementById("botondeinicio");
const temporizadorDisplay = document.getElementById("tiempoRestante");
const botondecambiodecolor = document.getElementById("botondecambiodecolor");
const mensajedeperder = document.getElementById("mensajedeperder");

botondecambiodecolor.style.display = "none";

let temporizador;

function cambiodefondoaleatorio() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}

function textogameover() {
  mensajedeperder.innerText = "GAME OVER";
  document.body.style.backgroundColor = "black";
  mensajedeperder.style.fontSize = "100px";
  mensajedeperder.style.textAlign = "center";
  mensajedeperder.style.color = "white";
  mensajedeperder.style.fontFamily = "'Jersey 20', sans-serif";
  mensajedeperder.style.fontWeight = 400;
  mensajedeperder.style.fontStyle = "normal";
}

function textoganador() {
  botondecambiodecolor.style.fontSize = "30px";
  botondecambiodecolor.style.textAlign = "center";
  botondecambiodecolor.style.color = "white";
  botondecambiodecolor.style.fontFamily = "'Rubik Moonrocks', sans-serif";
  botondecambiodecolor.style.fontWeight = 400;
  botondecambiodecolor.style.fontStyle = "normal";
  botondecambiodecolor.style.display = "block";
}

async function obtenerPremiosAleatorios() {
  try{
    const response = await fetch("premios.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo de premios.");
    }
    const data = await response.json();
    const primerPremio = data.premios1;
    const segundoPremio = data.premios2;

    const premio1 =
      primerPremio[Math.floor(Math.random() * primerPremio.length)];
    const premio2 =
      segundoPremio[Math.floor(Math.random() * segundoPremio.length)];

    return { premio1, premio2 };
  } catch (error) {
    console.error("Error al cargar los premios:", error);
    return null;
  }
}

async function iniciarJuego() {
  await customAlert("BIENVENIDO");
  desaparecerboton();
  iniciarTemporizador();
  setTimeout(iniciarParticipante, 2000);
}

function desaparecerboton() {
  botondeinicio.style.display = "none";
}

function iniciarTemporizador() {
  let tiempoRestante = 30;

  temporizador = setInterval(() => {
    tiempoRestante--;

    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      textogameover();
      setTimeout(() => {
        window.close();
      }, 2000);
      return;
    }

    temporizadorDisplay.innerText = tiempoRestante;
  }, 1000);
}

async function iniciarParticipante() {
  const hoy = new Date("Mayo 29, 2024");

  class Participante {
    constructor(nombre, apellido) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.intentos = 3;
      this.numerosGanadores = [2, 4, 7, 13, 17];
      this.cargarIntentos();
    }

    async saludar() {
      await customAlert(
        `Buenas ${this.nombre} ${this.apellido}, te deseo suerte en el sorteo del número ganador.`
      );
    }

    cargarIntentos() {
      const intentosGuardados = localStorage.getItem(
        "intentosquelequedaron-intentos"
      );
      this.intentos = intentosGuardados ? parseInt(intentosGuardados) : 3;
      this.guardarIntentos();
    }

    guardarIntentos() {
      localStorage.setItem("intentosquelequedaron-intentos", this.intentos);
    }

    async verificarIntentos() {
      if (this.intentos > 0) {
        await customAlert(
          `${this.nombre} ${this.apellido}, tienes ${this.intentos} intentos para adivinar el número ganador.`
        );
      } else {
        await customAlert(
          `${this.nombre} ${this.apellido}, has perdido todas tus oportunidades.`
        );
        textogameover();
        desaparecerboton();
      }
      this.guardarIntentos();
    }

    async adivinarNumero() {
      let acierto = false;
      while (this.intentos > 0 && !acierto) {
        const usuario = await customPrompt(
          "Ingrese un número entre el 0 y el 20"
        );
        if (usuario !== null) {
          let numero = parseInt(usuario);
          localStorage.setItem("numeroingresado1p", numero);
          if (this.numerosGanadores.includes(numero)) {
            acierto = true;
            await customAlert(
              `${this.nombre} ${this.apellido}, ¡Felicidades! Has adivinado uno de los números ganadores.`
            );
            this.entregarPremio(numero);
          } else {
            this.intentos--;
            await customAlert(
              `${this.nombre} ${this.apellido}, un intento menos, intenta nuevamente.`
            );
          }
          this.guardarIntentos();
        }
      }

      if (!acierto) {
        await customAlert(
          `${this.nombre} ${this.apellido}, has perdido todas tus oportunidades.`
        );
        textogameover();
        desaparecerboton();
      }
    }

    async entregarPremio(numeroGanador) {
      clearInterval(temporizador);
      const premios = await obtenerPremiosAleatorios();

      if (premios) {
        if ([2, 17, 13, 4, 7].includes(numeroGanador)) {
          await customAlert(
            `${this.nombre} ${this.apellido}, te has ganado un ${premios.premio1.marca} ${premios.premio1.modelo}, con una memoria de ${premios.premio1.memoria} en su versión color ${premios.premio1.color}.`
          );
          localStorage.setItem("premio1", JSON.stringify(premios.premio1));
        } else {
          await customAlert(
            `${this.nombre} ${this.apellido}, te has ganado una entrada para el sorteo del premio mayor.`
          );
        }
        await this.intentosSegundoPremio(premios.premio2);
      } else {
        console.error("No se pudieron cargar los premios aleatorios.");
        textogameover();
        desaparecerBotonInicio();
      }
    }

    async intentosSegundoPremio(premio2) {
      let numeroGanadorSegundoPremio = Math.floor(Math.random() * 4);
      const intento = await customPrompt(`${this.nombre} ${this.apellido}, ingrese un número entre el 0 y el 3 para el premio mayor`);
      if (intento !== null) {
        let numero = parseInt(intento);
        localStorage.setItem("numeroingresado2p", numero);
        if (numero === numeroGanadorSegundoPremio || numero === 2) {
          await customAlert(`${this.nombre} ${this.apellido}, ¡Increíble! Has ganado el premio mayor, un ${premio2.marca} ${premio2.modelo} ${premio2.color} 0km.`);
          localStorage.setItem("premio2", JSON.stringify(premio2));
          textoganador();
          document.addEventListener("click", cambiodefondoaleatorio);
          await customAlert(`No olvides reclamar tus premios ganados en nuestras agencias en la siguiente fecha ${hoy.toDateString()}.`);
        } else {
          await customAlert(`${this.nombre} ${this.apellido}, lo siento, no has ganado el premio mayor esta vez. El número ganador era ${numeroGanadorSegundoPremio}.`);
          document.body.style.backgroundColor = "black";
          await customAlert(`No olvides reclamar tus premios ganados en nuestras agencias en la siguiente fecha ${hoy.toDateString()}.`);
          textogameover();
        }
        desaparecerboton();
      }
    }
  }

  const confirmed = await customConfirm("¿QUIERES ENTRAR A MI JUEGO?");
  if (confirmed) {
    localStorage.setItem("ingresojuego", "SI");
    const nombre = await customPrompt("Ingrese su nombre");
    if (nombre !== null) {
      localStorage.setItem("usuarionombre", nombre);
      const apellido = await customPrompt("Ingrese su apellido");
      if (apellido !== null) {
        localStorage.setItem("usuarioapellido", apellido);
        let participante = new Participante(nombre, apellido);
        document.body.style.backgroundColor = "MediumTurquoise";
        setTimeout(async () => {
          await customAlert("HAS INGRESADO");
          await participante.saludar();
          await participante.verificarIntentos();
          await participante.adivinarNumero();
        }, 1000);
      }
    }
  } else {
    await customAlert("HAS SIDO EXPULSADO");
    document.body.style.backgroundColor = "black";
    textogameover();
    desaparecerboton();
  }
}

botondeinicio.addEventListener("click", iniciarJuego);
localStorage.clear();

function customAlert(message) {
  return Swal.fire({
    title: message,
    confirmButtonText: "OK",
  });
}

async function customPrompt(message) {
  const result = await Swal.fire({
    title: message,
    input: "text",
    inputPlaceholder: "Escribe algo",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "¡Debes escribir algo!";
      }
    },
  });
  if (result.isConfirmed) {
    return result.value;
  } else {
    return null;
  }
}

async function customConfirm(message) {
  const result = await Swal.fire({
    title: message,
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });
  return result.isConfirmed;
}

botondecambiodecolor.style.display = "none";
