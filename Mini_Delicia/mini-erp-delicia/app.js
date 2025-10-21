const readline = require('readline-sync');
const { mostrarProductos, buscarProducto, agregarAlCarrito, procesarVenta, generarTicket, mostrarReportes, verCarrito, calcularTotal, vaciarCarrito } = require('./services/ventas');


let carrito = [];


function menu() {
  console.log('\n============= HOLA! BIENVENIDO A DELICIA =============');
  console.log('============== SISTEMA DE VENTAS - PANADERIA DELICIA ==============\n');

  console.log('1. Registrar venta');
  console.log('2. Listar productos');
  console.log('3. Buscar producto');
  console.log('4. Ver carrito');
  console.log('5. Calcular total');
  console.log('6. Generar ticket');
  console.log('7. Reportes');
  console.log('8. Vaciar carrito');
  console.log('9. Salir\n');

  return readline.question('Seleccione una opcion: ').trim();
}

// Función para procesar cada opción
function procesarOpcion(opcion) {
  switch (opcion) {
    case '1':
      procesarVenta(carrito);
      break;
    case '2':
      mostrarProductos();
      break;
    case '3':
      const nombre = readline.question('Ingrese el nombre del producto a buscar: ');
      buscarProducto(nombre);
      break;
    case '4':
      verCarrito(carrito);
      break;
    case '5':
      calcularTotal(carrito);
      break;
    case '6':
      if (carrito.length === 0) {
        console.log('\n El carrito esta vacio. No se puede generar ticket.\n');
      } else {
        generarTicket(carrito);
        carrito = [];
      }
      break;
    case '7':
      mostrarReportes(carrito);
      break;
    case '8':
      vaciarCarrito(carrito);
      break;
    case '9':
      console.log('\n¡Gracias por usar el sistema Delicia!\n');
      process.exit(0);
      break;
    default:
      console.log('\n Opcion no valida, por favor intente nuevamente.\n');
  }
}


function iniciar() {
  console.log('\n============= BIENVENIDO A PANADERIA DELICIAS=============\n');

  let ejecutando = true;

  while (ejecutando) {
    const opcion = menu();
    procesarOpcion(opcion);
  }
}


iniciar();