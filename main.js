// function saludar() {
//     alert("Buenas bienvenido, te invito a ingresar tus datos para participar en el sorteo del numero ganador")
// }
// saludar();

// let nombre= prompt("Ingrese su nombre"); 
// let apellido= prompt("Ingrese su apellido"); 
// alert(nombre +" " + apellido + " " + "Ingresaste correctamente al sorteo del numero ganador");

// let datos = (nombre +" " + apellido) 
// alert (datos + " " + "Tienes 3 intentos para adivinar el numero ganador")

// const premio1 =
// {
// marca:"iphone",
// modelo: 15,
// memoria: "512gb",
// color:"blanco",
// };
// function primerpremio(){
//     let premio = false
//     let ganador = 2
//     let contador = 0
//     while((contador < 3 && premio===false)){
//     let usuario = parseInt(prompt("Ingrese un numero entre el 0 y el 5"))
//     if(ganador === usuario)
//     {premio = true
//     alert(`${datos} Te has ganado un ${premio1.marca} ${premio1.modelo}, con una memoria de ${premio1.memoria} en su version color ${premio1.color} y otra oportunidad para el premio mayor.`)
//     segundopremio();
//     }else if(usuario === null){
//     alert("ERROR")
//     }else if(isNaN(Number(usuario))){
//     alert("No has ingresado un numero")
//     }else if(usuario !== ganador){
//         contador++;
//     alert(datos + " " + "Un intento menos, intenta nuevamente")
//     }
//     }
//     if(contador === 3){
//     alert(datos + " " + "Has perdido todas tus oportunidades")
//     }
//     }
    
//     primerpremio();

// function segundopremio(){
// let ganador2 = 4;
// do{ 
// alert(datos + " " + "Ganaste una oportunidad para el premio mayor");
// ganador2 = 4;
// usuario = parseInt(prompt(datos + " " + "Ingrese el otro numero ganador por favor"))}
// while(ganador2 !=4);

// if(ganador2 === usuario){
// alert (datos + " " + "felicitaciones has ganado un auto 0km")
// }
// else if(usuario < 4 || usuario >4){
//     alert(datos + " " + "has perdido")
// }else if(usuario === null){
//     alert("ERROR")
// }else if(isNaN(Number(usuario))){
//     alert("No has ingresado un numero")
// }
// }

// this.primerpremio()
// function primerpremio(){
//     let ganador = 2
//     let contador = 0
//     while(contador < 3){
//     let usuario = parseInt(prompt("Ingrese un numero entre el 0 y el 5"))
//     if(ganador === usuario){
//     alert(`${datos} Te has ganado un ${premio1.marca} ${premio1.modelo}, con una memoria de ${premio1.memoria} en su version color ${premio1.color} y otra oportunidad para el premio mayor.`)
//     this.segundopremio()
//     }else if(usuario === null){
//     alert("ERROR")
//     }else if(isNaN(Number(usuario))){
//     alert("No has ingresado un numero")
//     }else if(usuario !== ganador){
//         contador++;
//     alert(datos + " " + "Un intento menos, intenta nuevamente")
//     }
//     }
//     if(contador === 3){
//     alert(datos + " " + "Has perdido todas tus oportunidades")
//     }
//     }

// function segundopremio(){
// let contador1 = 0
// if(contador1 < 1){ 
// let usuario1 = parseInt(prompt(datos + " " + "Ingrese el otro numero ganador por favor"))
// if(usuario1 === 4){
// alert (datos + " " + "felicitaciones has ganado un auto 0km")
// }else if(usuario1 === null){
//     alert("ERROR")
//     this.segundopremio()
// }else if(isNaN(Number(usuario1))){
//     alert("No has ingresado un numero")
//     this.segundopremio()
// } else if ( usuario1 !== 5) {
//     alert("Has perdido todo, refresca la pagina para volver a jugar")
//     contador1++
// }
// }else{
//     alert("Has perdido y no tienes mas oportunidades, reinicia el juego")
// } 
// }

class Participante {
    constructor(nombre, apellido) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.intentos = 3;
      this.numerosGanadores = [2, 4, 7, 13, 17]; 
    }
  
    saludar() {
      alert(`Buenas bienvenido, ${this.nombre} ${this.apellido}. Te invito a ingresar tus datos para participar en el sorteo del número ganador.`);
    }
  
    verificarIntentos() {
      if (this.intentos > 0) {
        alert(`${this.nombre} ${this.apellido} Tienes ${this.intentos} intentos para adivinar el número ganador`);
      } else {
        alert(`${this.nombre} ${this.apellido} Has perdido todas tus oportunidades`);
      }
    }
  
    adivinarNumero() {
      let acierto = false;
      while (this.intentos > 0 && !acierto) {
        let usuario = parseInt(prompt("Ingrese un número entre el 0 y el 20"));
        if (this.numerosGanadores.some(ganador => ganador === usuario)) {
          acierto = true;
          alert(`${this.nombre} ${this.apellido} ¡Felicidades! Has adivinado uno de los números ganadores.`);
          this.entregarPremio(usuario);
        } else if (usuario === null) {
          alert("ERROR");
          return;
        } else if (isNaN(usuario)) {
          alert("No has ingresado un número");
        } else {
          this.intentos--;
          alert(`${this.nombre} ${this.apellido} Un intento menos, intenta nuevamente`);
        }
      }
  
      if (!acierto) {
        alert(`${this.nombre} ${this.apellido} Has perdido todas tus oportunidades`);
      }
    }
  
    entregarPremio(numeroGanador) {
      if (numeroGanador === 2 || numeroGanador === 4) {
        alert(`${this.nombre} ${this.apellido} Te has ganado un ${premio1.marca} ${premio1.modelo}, con una memoria de ${premio1.memoria} en su versión color ${premio1.color}.`);
        this.intentosSegundoPremio();
      } else {
        alert(`${this.nombre} ${this.apellido} Te has ganado una entrada para el sorteo del premio mayor.`);
        this.intentosSegundoPremio();
      }
    }
  
    intentosSegundoPremio() {
     
      let numeroGanadorSegundoPremio = Math.floor(Math.random() * 3);
      let intento = parseInt(prompt(`${this.nombre} ${this.apellido} Ingrese un número entre el 0 y el 3 para el premio mayor`));
      if (intento === numeroGanadorSegundoPremio) {
        alert(`${this.nombre} ${this.apellido} ¡Increíble! Has ganado el premio mayor, un ${premio2.marca} ${premio2.modelo} ${premio2.color} 0km.`);
      } else {
        alert(`${this.nombre} ${this.apellido} Lo siento, no has ganado el premio mayor esta vez. El número ganador era ${numeroGanadorSegundoPremio}.`);
        // alert(`no olvides reclamar tus premios ganados en nuestras agencia en la siguente fecha ${hoy.toDateString}`)
      }
    }
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
    color: "Gris"
  }

  const hoy = new Date (Mayo ,29, 2024)
  let nombre = prompt("Ingrese su nombre");
  let apellido = prompt("Ingrese su apellido");
  let participante = new Participante(nombre, apellido);
  participante.saludar();
  participante.verificarIntentos();
  
  participante.adivinarNumero();