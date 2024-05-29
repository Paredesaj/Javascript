// let color = document.querySelector(".body");
// color.innerHTML = "";
// color.style.backgroundcolor = 'black';

// function dom(){
// let hola = document.getElementById("saludo")

// hola.innerText = 'Espero disfrutes de este proyecto que cree en JS'
// }
// dom();

// document.addEventListener('DOMContentLoaded', (event) => {
//   document.body.style.backgroundColor = 'black';

//   const saludo = document.getElementById('saludo');
//   saludo.textContent = '¡Hola, bienvenido!';
// });

// function color(){
// const bloque = document.querySelector("body");
// bloque.style.backgroundColor = 'green';

// bloque.addEventListener("mouseenter", () => {

// })

// function negro()
// {document.body.style.backgroundColor = "black";}

document.body.style.backgroundColor = "orange";
setTimeout(function cambio() {
  alert("BIENVENIDO");

  // setTimeout(function expulsado() {
  // alert("HAS SIDO EXPULSADO");
  // }, 2000);
  class Participante {
    constructor(nombre, apellido) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.intentos = 3;
      this.numerosGanadores = [2, 4, 7, 13, 17];
    }

    saludar() {
      alert(
        `Buenas ${this.nombre} ${this.apellido} te deseo suerte en el sorteo del número ganador.`
      );
    }

    verificarIntentos() {
      if (this.intentos > 0) {
        alert(
          `${this.nombre} ${this.apellido} Tienes ${this.intentos} intentos para adivinar el número ganador`
        );
        document.body.style.backgroundColor = "black";
      } else {
        alert(
          `${this.nombre} ${this.apellido} Has perdido todas tus oportunidades`
        );

      }
    }

    adivinarNumero() {
      let acierto = false;
      while (this.intentos > 0 && !acierto) {
        let usuario = parseInt(prompt("Ingrese un número entre el 0 y el 20"));
        if (this.numerosGanadores.some((ganador) => ganador === usuario)) {
          acierto = true;
          document.body.style.backgroundColor = "blue";
          alert(
            `${this.nombre} ${this.apellido} ¡Felicidades! Has adivinado uno de los números ganadores.`
          );
          console.log('paso por aca')
          this.entregarPremio(usuario);
        } else if (usuario == "") {
          alert("ERROR");
          return;
        } else if (isNaN(usuario)) {
          alert("No has ingresado un número");
        } else if (usuario > 20 || usuario < 0) {
          alert("Tu numero no corresponde al sorteo");
        } else {
          this.intentos--;
          alert(
            `${this.nombre} ${this.apellido} Un intento menos, intenta nuevamente`
          );
        }
      }

      if (!acierto) {
        alert(
          `${this.nombre} ${this.apellido} Has perdido todas tus oportunidades`
        );
      }
    }

    entregarPremio(numeroGanador) {
      if (numeroGanador === 2 || numeroGanador === 4) {
        document.body.style.backgroundColor = "blue";
        alert(
          `${this.nombre} ${this.apellido} Te has ganado un ${premio1.marca} ${premio1.modelo}, con una memoria de ${premio1.memoria} en su versión color ${premio1.color}.`
        );
        document.body.style.backgroundColor = "purple";
        console.log('hoooola')
        this.intentosSegundoPremio();
      } else {
        alert(
          `${this.nombre} ${this.apellido} Te has ganado una entrada para el sorteo del premio mayor.`
        );
        this.intentosSegundoPremio();
      }
    }

    intentosSegundoPremio() {
      let numeroGanadorSegundoPremio = Math.floor(Math.random() * 3);
      let intento = parseInt(
        prompt(
          `${this.nombre} ${this.apellido} Ingrese un número entre el 0 y el 3 para el premio mayor`
        )
      );
      if (intento === numeroGanadorSegundoPremio) {
        alert(
          `${this.nombre} ${this.apellido} ¡Increíble! Has ganado el premio mayor, un ${premio2.marca} ${premio2.modelo} ${premio2.color} 0km.`
        );
        document.body.style.backgroundColor = "red";
        alert(
          `no olvides reclamar tus premios ganados en nuestras agencia en la siguente fecha ${hoy.toDateString()}`
        );
      } else {
        alert(
          `${this.nombre} ${this.apellido} Lo siento, no has ganado el premio mayor esta vez. El número ganador era ${numeroGanadorSegundoPremio}.`
        );
        document.body.style.backgroundColor = "black";
        alert(
          `no olvides reclamar tus premios ganados en nuestras agencia en la siguente fecha ${hoy.toDateString()}`
        );
      }
    }
  }

  let pregunta = prompt("¿QUIERES ENTRAR A MI JUEGO?");

  if (pregunta.toLocaleLowerCase() === "si") {
    let nombre = prompt("Ingrese su nombre");
    let apellido = prompt("Ingrese su apellido");
    let participante = new Participante(nombre, apellido);
    document.body.style.backgroundColor = "green";
    setTimeout(() => {
      alert("HAS INGRESADO");
      participante.saludar();
      participante.verificarIntentos();
      participante.adivinarNumero();
    }, 1000);
  } else {
    alert("HAS SIDO EXPULSADO");
    document.body.style.backgroundColor = "black";
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
