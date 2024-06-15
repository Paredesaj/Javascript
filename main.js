const botondeinicio = document.getElementById("botondeinicio");
const temporizadorDisplay = document.getElementById("tiempoRestante");
const botondecambiodecolor = document.getElementById("botondecambiodecolor");
const mensajedeperder = document.getElementById("mensajedeperder");

// Para que no se inicie el boton de color
botondecambiodecolor.style.display = "none";

let temporizador;

// Funcion para hacer cambio de fondo aleatorio al ganar el usuario
function cambiodefondoaleatorio() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}

// Funcion creada para cuando el usuario pierde
function textogameover() {
  mensajedeperder.innerText = "GAME OVER";
  document.body.style.backgroundColor = "black";
  mensajedeperder.style.fontSize = "100px";
  mensajedeperder.style.textAlign = "center";
  mensajedeperder.style.fontFamily = "'Jersey 20', sans-serif";
  mensajedeperder.style.fontWeight = 400;
  mensajedeperder.style.fontStyle = "normal";
  mensajedeperder.style.background = "linear-gradient(90deg, yellow, orange)";
  mensajedeperder.style.webkitBackgroundClip = "text";
  mensajedeperder.style.webkitTextFillColor = "transparent";
  mensajedeperder.style.backgroundClip = "text";
  mensajedeperder.style.color = "transparent";

  // Crear el contenedor de botones
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "20px";
  document.body.appendChild(buttonContainer);

  // Crear el botón "ENTRAR DE NUEVO"
  const botonsi = document.createElement("button1");
  botonsi.textContent = "ENTRAR DE NUEVO";
  botonsi.style.padding = "10px 20px";
  botonsi.style.fontSize = "16px";
  botonsi.style.cursor = "pointer";
  botonsi.style.marginRight = "10px"; // Espacio entre los botones
  buttonContainer.appendChild(botonsi);
  botonsi.addEventListener("click", () => {
    location.reload();
  });

  // Crear el botón "SALIR DEL JUEGO!"
  const botonno = document.createElement("button1");
  botonno.textContent = "SALIR DEL JUEGO!";
  botonno.style.padding = "10px 20px";
  botonno.style.fontSize = "16px";
  botonno.style.cursor = "pointer";
  buttonContainer.appendChild(botonno);
  botonno.addEventListener("click", () => {
    window.close();
  });
}

// Creado para cuando el usuario gana
function textoganador() {
  botondecambiodecolor.style.fontSize = "30px";
  botondecambiodecolor.style.textAlign = "center";
  botondecambiodecolor.style.color = "white";
  botondecambiodecolor.style.fontFamily = "'Rubik Moonrocks', sans-serif";
  botondecambiodecolor.style.fontWeight = 400;
  botondecambiodecolor.style.fontStyle = "normal";
  botondecambiodecolor.style.display = "block";
}

// Esta funcion crea premio aleatorio en premio1 y premio2 mediante mi premios.json
async function obtenerPremiosAleatorios() {
  try {
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

// Inicia el juego en un tiempo de 2 Seg
async function iniciarJuego() {
  await customAlert("BIENVENIDO");
  desaparecerboton();
  setTimeout(iniciarParticipante, 2000);
}

// Al iniciar el juego desaparece el boton de inicio
function desaparecerboton() {
  botondeinicio.style.display = "none";
}

// Cree un temporizador restante de 45 segundos una vez inicie el usuario
function iniciarTemporizador() {
  let tiempoRestante = 45;

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

// Aca es donde el usuario inicia el juego
async function iniciarParticipante() {
  const hoy = new Date("Mayo 29, 2024");

  class Participante {
    constructor(nombre, apellido) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.intentos = 3;
      this.numerosGanadores = [2, 4, 7, 13, 17];
      this.cargarIntentos();
      iniciarTemporizador();
    }

    // Saludar al usuario mediante su nombre y apellido
    async saludar() {
      await customAlert(
        `Buenas ${this.nombre} ${this.apellido}, te deseo suerte en el sorteo del número ganador.`
      );
    }

    // Se carga al localStorage la cantidad de intentos que el usuario tiene
    cargarIntentos() {
      const intentosGuardados = localStorage.getItem(
        "intentosquelequedaron-intentos"
      );
      this.intentos = intentosGuardados ? parseInt(intentosGuardados) : 3;
      this.guardarIntentos();
    }

    // Se guardan la cantidad de intentos que el usuario uso para el primer premio
    guardarIntentos() {
      localStorage.setItem("intentosquelequedaron-intentos", this.intentos);
    }

// Verifica la cantidad de intentos del usuario para saber si gano o perdio
    async verificarIntentos() {
      const mensaje =
        this.intentos > 0
          ? `${this.nombre} ${this.apellido}, tienes ${this.intentos} intentos para adivinar el número ganador.`
          : `${this.nombre} ${this.apellido}, has perdido todas tus oportunidades.`;

      await customAlert(mensaje);

      this.intentos === 0 && (textogameover(), desaparecerboton());

      this.guardarIntentos();
    }

    // Funcion donde el usuario debe de adivinar el numero para el primer premio
    async adivinarNumero() {
      let acierto = false;
      while (this.intentos > 0 && !acierto) {
        const usuario = await customPrompt(
          "Ingrese un número entre el 0 y el 20"
        );

        if (usuario !== null) {
          const numero = parseInt(usuario);
          localStorage.setItem("numeroingresado1p", numero);

          this.numerosGanadores.includes(numero)
            ? ((acierto = true),
              await customAlert(
                `${this.nombre} ${this.apellido}, ¡Felicidades! Has adivinado uno de los números ganadores.`
              ),
              this.entregarPremio(numero))
            : (this.intentos--,
              await customAlert(
                `${this.nombre} ${this.apellido}, un intento menos, intenta nuevamente.`
              ));

          this.guardarIntentos();
        }
      }

      !acierto &&
        (await customAlert(
          `${this.nombre} ${this.apellido}, has perdido todas tus oportunidades.`
        ),
        textogameover(),
        desaparecerboton());
    }


  // Aca se entrega el premio1 si el usuario adivina el numero ganador y pasa al segundo juego 
    async entregarPremio(numeroGanador) {
      clearInterval(temporizador);
      const premios = await obtenerPremiosAleatorios();

      if (premios) {
        [2, 17, 13, 4, 7].includes(numeroGanador)
          ? (await customAlert(
              `${this.nombre} ${this.apellido}, te has ganado un ${premios.premio1.marca} ${premios.premio1.modelo}, con una memoria de ${premios.premio1.memoria} en su versión color ${premios.premio1.color}.`
            ),
            localStorage.setItem("premio1", JSON.stringify(premios.premio1)))
          : await customAlert(
              `${this.nombre} ${this.apellido}, te has ganado una entrada para el sorteo del premio mayor.`
            );

        await this.intentosSegundoPremio(premios.premio2);
      } else {
        console.error("No se pudieron cargar los premios aleatorios.");
        textogameover();
        desaparecerBotonInicio();
      }
    }

    // Inicia el segundo juego para que el usuario adivine el numero del segundo premio 
    async intentosSegundoPremio(premio2) {
      let numeroGanadorSegundoPremio = Math.floor(Math.random() * 4);
      const intento = await customPrompt(
        `${this.nombre} ${this.apellido}, ingrese un número entre el 0 y el 3 para el premio mayor`
      );

      if (intento !== null) {
        const numero = parseInt(intento);
        localStorage.setItem("numeroingresado2p", numero);

        numero === numeroGanadorSegundoPremio || numero === 2
          ? (await customAlert(
              `${this.nombre} ${this.apellido}, ¡Increíble! Has ganado el premio mayor, un ${premio2.marca} ${premio2.modelo} ${premio2.color} 0km.`
            ),
            localStorage.setItem("premio2", JSON.stringify(premio2)),
            textoganador(),
            document.addEventListener("click", cambiodefondoaleatorio),
            await customAlert(
              `No olvides reclamar tus premios ganados en nuestras agencias en la siguiente fecha ${hoy.toDateString()}.`
            ))
          : (await customAlert(
              `${this.nombre} ${this.apellido}, lo siento, no has ganado el premio mayor esta vez. El número ganador era ${numeroGanadorSegundoPremio}.`
            ),
            (document.body.style.backgroundColor = "black"),
            await customAlert(
              `No olvides reclamar tus premios ganados en nuestras agencias en la siguiente fecha ${hoy.toDateString()}.`
            ),
            textogameover());

        desaparecerboton();
      }
    }
  }

// Esto se creo para estar seguro si el usuario quiere entrar al juego  si o no 
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

// Aca creamos una funcion para los alerts 
function customAlert(message) {
  return Swal.fire({
    title: message,
    confirmButtonText: "OK",
  });
}
// Aca creamos una funcion para los prompt 
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

// Aca creamos la funcion para la confirmaciones (si/no) o (aceptar/cancelar) 
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
