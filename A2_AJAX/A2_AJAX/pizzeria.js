
//Creamos una función principal window.onload que engloba todas las demás, de manera que nos aseguramos que
//los métodos y funcionen, así como recursos asociados, se ejecuten una vez la página esté completamente cargada
window.onload = function () {

  //Mediante JS seleccionamos un elemento DOM cuyo id es "div_DOM" y le asignamos un valor "container"
  let container = document.getElementById("div_DOM");
 
  // Buttons
  //Nuevo elemento div utilizando document.createElement("div"), se establece su contenido de texto mediante 
  //la propiedad textContent.
  let tamanos = document.createElement("div");
  tamanos.textContent = "Elije el tamaño tu pizza:";

  // Array vacío para implementar con JSON
  var opcionesTamanos = [];

  // Checkbox
  //Nuevo elemento div utilizando document.createElement("div"), se establece su contenido de texto mediante 
  //la propiedad textContent.
  var ingredientes = document.createElement("div");
  ingredientes.textContent = "Elije los ingredientes de tu pizza: ";

  // Array vacío para implementar con JSON
  var opcionesIngredientes = [];

  //Creamos las constantes para la URL de destino y el RECURSO que se usarán junto con funciones de AJAX 
  // para realizar solicitudes HTTP a un servidor y obtener datos desde el archivo "pizzeria.json".
  const URL_DESTINO = "http://localhost:5500/A2_AJAX/";
  const RECURSO = "pizzeria.json";


  function cargarJson() {
    //Se utiliza el objeto XMLHttpRequest para realizar una solicitud HTTP asíncrona y manejar la 
    //respuesta cuando se completa la solicitud.
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(xmlHttp.responseText);
        //Se extraen las opciones en las variables, asumiendo que "data" contiene una propiedad
        //pizza que a su vez tiene otras.
        opcionesTamanos = data.pizza.tamanos[0];
        opcionesIngredientes = data.ingredientes[0];

        // Bucle forEach para crear radio buttons para cada opción

        function visualizarTamanos(objeto) {
          //Se inicia un bucle for que recorre todas las claves del objeto (key)
          for (var key in objeto) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "tamanos";
            radio.value = objeto[key];

            let labelTamanos = document.createElement("label");
            labelTamanos.textContent = key;
          //Se agrega el elemento de entrada del radio button y la etiqueta
            tamanos.appendChild(radio);
            tamanos.appendChild(labelTamanos);
          }
        }

        function visualizaringredientes(objeto) {
          //Se inicia un bucle for que recorre todas las claves del objeto (key)
          for (var key in objeto) {
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "ingredientes";
            checkbox.value = objeto[key];

            var labelIngredientes = document.createElement("label");
            labelIngredientes.textContent = key;
          //Se agrega el elemento de entrada del checkbox y la etiqueta
            ingredientes.appendChild(checkbox);
            ingredientes.appendChild(labelIngredientes);
          }
        }
        // Llamada a las funciones pasando como argumento un objeto para generar los elementos en el DOM
        visualizarTamanos(opcionesTamanos);
        visualizaringredientes(opcionesIngredientes);
      } else {
        //Error que se arroja cuando no se dan las condiciones marcadas
        console.error("ERROR");
      }
    };

    xmlHttp.open("GET", URL_DESTINO + RECURSO, true); //Abre conexión para la solicitud HTTP
    xmlHttp.send(null); //Envía la solicitud al servidor (null indica que no se están enviando datos)
  }
  //Llamamos a la función trabaja anteriormente para que se carguen los datos del JSON 
  cargarJson();
  // Agregamos el contenedor de ingredientes al formulario
  container.appendChild(ingredientes);
  // Agregamos el contenedor de tamaños al formulario
  container.appendChild(tamanos);


//Mediante JS seleccionamos un elemento DOM cuyo id es "refrescarJson" al cual se le está asignando un
//"event Listener" para el evento "click" sobre un button, que ejecutará función de carganJson, que refrescará la 
//página.
document
.getElementById("refrescarJson")
.addEventListener("click", cargarJson);


function calcularPrecio(event) {
  //Le metemos un preventDefault() para que le resultado se mantenga en pantalla
  event.preventDefault();
  //Declaramos ambas variables. Se selecciona un elemento input cuyos atributos name sean 'tamano y 'ingredientes'
  //previamente seleccionados por el usuario y busca entre los que han salido seleccionados
  const precioTamano = document.querySelector('input[name="tamanos"]:checked');
  const ingredientes = document.querySelectorAll(
    'input[name="ingredientes"]:checked'
  );
  let precioIngredientes = 0;

  //Iteramos sobre los elementos "ingredientes"
  ingredientes.forEach(function (ingrediente) {
  //Se extrae el valor del elemento ingrediente. La propiedad value es el valor numérico del elemento JSON en formato de 
  //texto y "parseFloat" se utiliza para convertir este valor de texto a un número.
    var valor = parseFloat(ingrediente.value);
    precioIngredientes = precioIngredientes + valor;
  });

  //Declaramos la variable precioTotal que será la suma de las dos anteriores
  let precioTotal = parseFloat(precioTamano.value) + precioIngredientes;

  //Actualizamos el contenido de elemento con id=precioTotal del form
  document.getElementById(
    "precioTotal"
  ).textContent = `Precio Total: ${precioTotal}€`;
} 

//A través del DOM estamos seleccionando un elemento con id "calcularPrecio" al cual se le está asignando un
//"event Listener" para el evento "click" sobre un button, que ejecutará función de calcularPrecio, arrojándose el 
//mismo.
  document
    .getElementById("calcularPrecio")
    .addEventListener("click", calcularPrecio);
};