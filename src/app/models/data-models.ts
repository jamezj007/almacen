// ---- Basicos ----------------- jgfjgkgkgkg
    export class Usuario{ // en la Base de datos guardar por rol como key principal
        public key: string // UID generado desde el Auth
            public rol: 'admin' | 'empleado' | 'proveedor' | 'cliente'
            public nombre: string
            public cedula: number
            public telefono: []
            public direccion: string
            public barrio: string
            public email: string
            public token: string // token de autorización para enviar y recibir Push Notifications
        constructor(){}
    }
    export class Bodega {
        public key: string // PushID de la bodega
            public creacion: Date
            public nombre: string
            public codigo: string // ID unico para identificar la bodega
            public cantidad: number // numero total de productos, se calcula con base al inventario
            public descripcion: string
            public imagen: string
            public largo: number // largo en metros[m] de la bodega
            public ancho: number // ancho en metros[m] de la bodega
            public alto: number // alto en metros[m] de la bodega
        constructor() {
            if(!this.creacion){
                this.creacion = new Date()
            }
            if (!this.imagen) {
                this.imagen = "/assets/shapes.svg";
            }
            if (!this.nombre) {
                this.nombre = "";
            }
            if (!this.codigo) {
                this.codigo = "";
            }
            if (!this.cantidad) {
                this.cantidad = 0;
            }
            if (!this.descripcion) {
                this.descripcion = "";
            }
            if (!this.key) {
                this.key = "";
            }
            if(!this.largo){
                this.largo = 0
            }
            if(!this.ancho){
                this.ancho = 0
            }
            if(!this.alto){
                this.alto = 0
            }
        }
        get Capacidad(){
            return (this.alto * this.largo * this.ancho)
        }
    }
    export class Documento{
        public key: string // PushID del documento
            public tipo: 'ingreso' | 'salida' | 'traslado' | 'notaDebito' | 'notaCredito'
            public creacion: Date
            public estado: 'pagado' | 'pendiente' | 'anulado'
            public numProductos: number // Numero total de productos relacionados en el documento
            public proveedor: string // PushID del proveedor
            public comprador: string // PushID del comprador al que va dirigida
            public usuario: string // PushID del empleado que realiza el documento
            public ListaDetallada: string // PushID de la lista detallada de productos relacionados en el documento
        constructor() {}
    }
    export class ListaDetallada {
        // se incluiran los productos uno a uno con un PushID para cada ingreso
        public key: string // PushID del producto en la lista
            public tipo: 'ingreso' | 'salida' | 'traslado' | 'notaDebito' | 'notaCredito'
            public creacion: Date
            public bodega: string // PushID de la bodega
            public documento: string // PushID del documento
            public vendedor: string // PushID del vendedor // campo heredado del documento
            public comprador: string // PushID del comprador al que va dirigida // campo heredado del documento
            public usuario: string // PushID del empleado que realiza el documento // campo heredado del documento
            public producto: string // PushID del Producto relacionado en el documento
            public precio: number // precio de venta unitario del producto en ese momento // campo heredado del Producto
            public costo: number // precio de compra del producto
            public descuento: number // porcentaje de descuento unitario otorgado por el vendedor // campo heredado del Producto
            public cantidad: number // cantidad total de productos de la misma denominación
        constructor() {
            if (this.tipo =='ingreso') {
                    this.costo = 0
                }else if (this.tipo =='salida') {
                    this.precio = 0
            }
        }
        get Total(){
            return (this.precio * (1 - this.descuento) * this.cantidad)
        }
    }
    export class Producto {
        // [ seria necesario crear un producto base nuevo para cada presentación del producto ej: cerveza corona 355ml y cerveza corona 207ml]
        public key: string // PushID del Producto
            public creacion: Date
            public nombre: string // nombre del producto
            public tipo: 'consumible' | 'mueble' | 'producto'
            public imagen: string
            public descripcion: string
            public disponibilidad: boolean
            public largo: number // largo en metros[m] del empaque del producto
            public ancho: number // ancho en metros[m] del empaque del producto
            public alto: number // alto en metros[m] del empaque del producto
            public cantidad: number // numero total de unidades de producto dentro del empaque
            public precio: number // precio de venta del producto [ solo el admin puede definirlo ]
            public descuento: number // porcentaje de descuento unitario [ solo el admin puede definirlo ]
        constructor() { 
            if(!this.key){
                this.key = ''
            }
            if (!this.imagen) {
                this.imagen = "/assets/shapes.svg";
            }
            if(!this.creacion){
                this.creacion = new Date()
            }
            if(!this.nombre){
                this.nombre = ''
            }
            if(!this.tipo){
                this.tipo = 'producto'
            }
            if(!this.imagen){
                this.imagen = ''
            }
            if(!this.descripcion){
                this.descripcion = ''
            }
            if(!this.disponibilidad){
                this.disponibilidad = true
            }
            if(!this.largo){
                this.largo = 0
            }
            if(!this.ancho){
                this.ancho = 0
            }
            if(!this.alto){
                this.alto = 0
            }
            if(!this.cantidad){
                this.cantidad = 0
            }
            if(!this.precio){
                this.precio = 0
            }
            if(!this.descuento){
                this.descuento = 0
            }
        }
    }
    export class Inventario {
        // entradas efectivas al inventario
        public key: string // PushID del inventario
            public bodega: string // PushID de la bodega
            public ingreso: Date
            public salida: Date | null
            public traslado: Date | null
            public producto: string // PushID del Producto
            public vencimiento: Date // nuemero de dias[d] que el tiene el producto para ser consumible [cron job]
            public tipo: 'consumible' | 'mueble' | 'producto' // campo heredado del Producto
            public cantidad: number // campo heredado de la ListaDetallada
            public precio: number // campo heredado del Producto
            public costo: number // precio de compra del producto en el documento
            public serie: string // codigo de barras del embalaje
            public vendedor: string // PushID del vendedor // campo heredado del documento
            public usuario: string // PushID del empleado que realiza el documento // campo heredado del documento
            public documento: string // PushID del documento
        constructor() {
            if(!this.bodega){
                this.bodega = ''
            }
            if(!this.ingreso){
                this.ingreso = new Date();
            }
            if(!this.salida){
                this.salida = null
            }
            if(!this.traslado){
                this.traslado = null
            }
            if(!this.producto){
                this.producto = ''
            }
            if(!this.vencimiento){
                this.vencimiento = new Date();
            }
            if(!this.tipo){
                this.tipo = 'producto'
            }
            if(!this.cantidad){
                this.cantidad = 0
            }
            if(!this.precio){
                this.precio = 0
            }
            if(!this.costo){
                this.costo = 0
            }
            if(!this.serie){
                this.serie = ''
            }
            if(!this.vendedor){
                this.vendedor = ''
            }
            if(!this.usuario){
                this.usuario = ''
            }
            if(!this.documento){
                this.documento = ''
            }
        }
    }
// ---- Data Base ---------------
    export class LocalDatabase {
        public Bodegas: { [key: string]: Bodega };
        public Documentos: { [key: string]: Documento };
        public ListaDetalladas: { [key: string]: ListaDetallada };
        public Productos: { [key: string]: Producto };
        public Inventario: { [key: string]: Inventario };
    }
// ------------------------------