const readline = require('readline-sync');
const productos = require('../data/productos');

function calcularDescuento(total) {
  if (total >= 100) {
    return 0.15; 
  } else if (total >= 50) {
    return 0.10; 
  } else if (total >= 20) {
    return 0.05; 
  } else {
    return 0; 
  }
}


function calcularTotales(carrito) {
  let subtotal = 0;

 
  for (let i = 0; i < carrito.length; i++) {
    subtotal += carrito[i].precio * carrito[i].cantidad;
  }


  const porcentajeDescuento = calcularDescuento(subtotal);
  const montoDescuento = subtotal * porcentajeDescuento;
  const base = subtotal - montoDescuento;


  const igv = calcularIGV(base);
  const total = base + igv;

function calcularIGV(base) {
  return base * 0.18;
}

  return {
    subtotal: subtotal.toFixed(2),
    descuento: montoDescuento.toFixed(2),
    porcentajeDescuento: (porcentajeDescuento * 100).toFixed(0),
    base: base.toFixed(2),
    igv: igv.toFixed(2),
    total: total.toFixed(2)
  };
}



function buscarProducto(nombreProducto) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre.toLowerCase() === nombreProducto.toLowerCase()) {
      console.log('\nProducto encontrado:');
      console.log(`Nombre: ${productos[i].nombre}`);
      console.log(`Precio: S/${productos[i].precio.toFixed(2)}`);
      console.log(`Categoria: ${productos[i].categoria}\n`);
      return productos[i];
    }
  }
  console.log('\nProducto no encontrado\n');
  return null;
}


function mostrarProductos() {
  console.log('============= CATÁLOGO DE PRODUCTOS =============');
  console.log('Nombre                        Categoria     Precio');
  console.log('--------------------------------------------------');

  for (let i = 0; i < productos.length; i++) {
    const nombre = productos[i].nombre.padEnd(27);
    const precio = `S/${productos[i].precio.toFixed(2)}`.padStart(8);
    const categoria = productos[i].categoria;
    console.log(`${nombre}     ${categoria}    ${precio}  `);
  }
  console.log('');
}



function agregarAlCarrito(carrito, nombreProducto, cantidad) {

    
  let productoEncontrado = null;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre.toLowerCase() === nombreProducto.toLowerCase()) {
      productoEncontrado = productos[i];
      break;
    }
  }

  if (!productoEncontrado) {
    console.log('Producto no disponible. Intente con otro.\n');
    return false;
  }

  if (cantidad <= 0 || isNaN(cantidad)) {
    console.log('La cantidad debe ser un numero mayor a 0\n');
    return false;
  }

  let productoEnCarrito = null;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre.toLowerCase() === nombreProducto.toLowerCase()) {
      productoEnCarrito = carrito[i];
      break;
    }
  }

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
    console.log(`${productoEncontrado.nombre} actualizado (nueva cantidad: ${productoEnCarrito.cantidad})\n`);
  } else {
    carrito.push({
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      categoria: productoEncontrado.categoria,
      cantidad: cantidad
    });
    console.log(`"${productoEncontrado.nombre}" agregado al carrito (${cantidad} x S/${productoEncontrado.precio.toFixed(2)} = S/${(productoEncontrado.precio * cantidad).toFixed(2)})\n`);
  }

  return true;
}

function verCarrito(carrito) {
  if (carrito.length === 0) {
    console.log('\nEl carrito está vaco\n');
    return;
  }
  console.log(' ================ CARRITO DE COMPRA ==================');
  console.log('Producto                      Precio   Cant    Subtotal');
  console.log('------------------------------------------------------');

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const subtotal = (item.precio * item.cantidad).toFixed(2);
    const nombre = item.nombre.padEnd(25);
    const cantidad = String(item.cantidad).padEnd(3);
    const precio = `S/${item.precio.toFixed(2)}`.padStart(8);
    const subtotalFormatted = `S/${subtotal}`.padStart(8);

    console.log(`${nombre}    ${precio}   ${cantidad}   ${subtotalFormatted}`);
  }
  console.log('');
}


function generarTicket(carrito) {
  const totales = calcularTotales(carrito);
  console.log('================== RESUMEN DE COMPRA =================');
  console.log('Producto                    Cant.  Subtotal   Precio  ');
  console.log('------------------------------------------------------');

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const subtotal = (item.precio * item.cantidad).toFixed(2);
    const nombre = item.nombre.padEnd(25);
    const cantidad = String(item.cantidad).padEnd(3);
    const precio = `S/${item.precio.toFixed(2)}`.padStart(8);
    const subtotalFormatted = `S/${subtotal}`.padStart(8);

    console.log(`${nombre}    ${cantidad}  ${subtotalFormatted}  ${precio} `);
  }

  console.log(`Subtotal:                                    S/${totales.subtotal.padStart(8)}`);
  console.log(`Descuento (${totales.porcentajeDescuento}%):-S/${totales.descuento.padStart(7)}`);
  console.log(`IGV (18%):                                  +S/${totales.igv.padStart(7)}`);
  console.log('----------------------------------------------------------------------------------------');
  console.log(`TOTAL FINAL:                                 S/${totales.total.padStart(8)}\n`);

  const cliente = readline.question('Ingrese su nombre para el ticket: ');
  console.log(`\nGracias por su compra, ${cliente}!\n`);
}


function calcularTotal(carrito) {
  if (carrito.length === 0) {
    console.log('\n⚠El carrito está vacio\n');
    return;
  }

  const totales = calcularTotales(carrito);
  console.log('============== CALCULO DE TOTALES ==============');
  console.log(`Subtotal:                                     S/${totales.subtotal.padStart(8)}`);
  console.log(`Descuento (${totales.porcentajeDescuento}%):                                    -S/${totales.descuento.padStart(7)}`);
  console.log(`IGV (18%):                                   +S/${totales.igv.padStart(7)}`);
  console.log('---------------------------------------------------------------------');
  console.log(`TOTAL FINAL:  S/${totales.total.padStart(8)}\n`);
}


function procesarVenta(carrito) {
  console.log('\n--- REGISTRAR VENTA ---\n');
  mostrarProductos();

  let seguirComprando = true;

  while (seguirComprando) {
    const entrada = readline.question(" Ingrese el nombre del producto a comprar (escribe 'listo' para terminar): ").toLowerCase();

    if (entrada === 'listo') {
      seguirComprando = false;
    } else {
      const cantidad = readline.question(' Ingrese la cantidad que desea: ');
      agregarAlCarrito(carrito, entrada, parseInt(cantidad));
    }
  }
}

function vaciarCarrito(carrito) {
  carrito.length = 0;
  console.log('\nCarrito vaciado correctamente\n');
}


function mostrarReportes(carrito) {
  console.log(' ======================== REPORTES ===================== ');

  console.log('--- TOP 3 PRODUCTOS MAS CAROS ---');
  const productosOrdenados = [];
  for (let i = 0; i < productos.length; i++) {
    productosOrdenados.push(productos[i]);
  }

  
  for (let i = 0; i < productosOrdenados.length; i++) {
    for (let j = i + 1; j < productosOrdenados.length; j++) {
      if (productosOrdenados[j].precio > productosOrdenados[i].precio) {
        let temp = productosOrdenados[i];
        productosOrdenados[i] = productosOrdenados[j];
        productosOrdenados[j] = temp;
      }
    }
  }

  for (let i = 0; i < 3 && i < productosOrdenados.length; i++) {
    console.log(`${i + 1}. ${productosOrdenados[i].nombre} - S/${productosOrdenados[i].precio.toFixed(2)} (${productosOrdenados[i].categoria})`);
  }

 
  console.log('\n---------------- PRODUCTOS MÁS VENDIDOS EN LA SESION ---------------');
  if (carrito.length === 0) {
    console.log('Sin ventas en esta sesion');
  } else {
    const carritoOrdenado = [];
    for (let i = 0; i < carrito.length; i++) {
      carritoOrdenado.push(carrito[i]);
    }

    for (let i = 0; i < carritoOrdenado.length; i++) {
      for (let j = i + 1; j < carritoOrdenado.length; j++) {
        if (carritoOrdenado[j].cantidad > carritoOrdenado[i].cantidad) {
          let temp = carritoOrdenado[i];
          carritoOrdenado[i] = carritoOrdenado[j];
          carritoOrdenado[j] = temp;
        }
      }
    }

    for (let i = 0; i < carritoOrdenado.length; i++) {
      const total = (carritoOrdenado[i].precio * carritoOrdenado[i].cantidad).toFixed(2);
      console.log(`${i + 1}. ${carritoOrdenado[i].nombre} - ${carritoOrdenado[i].cantidad} unidades (S/${total})`);
    }
  }

 
  console.log('\n--- RESUMEN DEL CARRITO ACTUAL ---');
  if (carrito.length === 0) {
    console.log('Carrito vacio');
  } else {
    let cantidadTotal = 0;
    for (let i = 0; i < carrito.length; i++) {
      cantidadTotal += carrito[i].cantidad;
    }
    const totales = calcularTotales(carrito);
    console.log(`Cantidad total de items: ${cantidadTotal}`);
    console.log(`Monto acumulado: S/${totales.total}`);
  }
  console.log('');
}




module.exports = {
  mostrarProductos,
  buscarProducto,
  agregarAlCarrito,
  verCarrito,
  calcularTotal,
  generarTicket,
  procesarVenta,
  mostrarReportes,
  vaciarCarrito,
  calcularTotales
};