function saludar() {
    alert("Buenas bienvenido, te invito a ingresar tus datos para participar en el sorteo del numero ganador")
}
saludar();

let nombre= prompt("Ingrese su nombre"); 
let apellido= prompt("Ingrese su apellido"); 
alert(nombre +" " + apellido + " " + "Ingresaste correctamente al sorteo del numero ganador");

let datos = (nombre +" " + apellido) 
alert (datos + " " + "Tienes 3 intentos para adivinar el numero ganador")

function primerpremio(){
    let premio = false
    let ganador = 2
    let contador = 0
    while((contador < 3 && premio===false)){
    let usuario = parseInt(prompt("Ingrese un numero entre el 0 y el 5"))
    if(ganador === usuario)
    {premio = true
    alert(datos + " " + "Has ganado un iphone15 y otra oportunidad para el premio mayor.")
    segundopremio();
    }else if(usuario === null){
    alert("ERROR")
    }else if(isNaN(Number(usuario))){
    alert("No has ingresado un numero")
    }else if(usuario !== ganador){
        contador++;
    alert(datos + " " + "Un intento menos, intenta nuevamente")
    }
    }
    if(contador === 3){
    alert(datos + " " + "Has perdido todas tus oportunidades")
    }
    }
    
    primerpremio();

function segundopremio(){
let ganador2 = 4;
do{ 
alert(datos + " " + "Ganaste una oportunidad para el premio mayor");
ganador2 = 4;
usuario = parseInt(prompt(datos + " " + "Ingrese el otro numero ganador por favor"))}
while(ganador2 !=4);

if(ganador2 === usuario){
alert (datos + " " + "felicitaciones has ganado un auto 0km")
}
else if(usuario < 4 || usuario >4){
    alert(datos + " " + "has perdido")
}else if(usuario === null){
    alert("ERROR")
}else if(isNaN(Number(usuario))){
    alert("No has ingresado un numero")
}
}

