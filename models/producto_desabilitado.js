const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { MAXCATEGORIASPORPRODUCTO } = require('../utils/constantes');

const ProductoDesabilitadoSchema = new Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es requerido'],
	},
	nombre_url: {
		type: String,
		required: [true, 'El nombre_url es requerido'],
		unique: true,
	},
	pid: {
		type: String,
		required: [true, 'El pid es requerido'],
	},
	estado: {
		type: Boolean,
		default: true,
		required: [true, 'El estado es requerido'],
	},
	precio: {
		type: Number,
		default: 99999999,
		required: [true, 'El precio es requerido'],
	},
	categorias: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Categoria',
			},
		],
		default: [],
		validate: function (value) {
			return value.length <= MAXCATEGORIASPORPRODUCTO;
		},
		required: [true, 'La categoría es requerida'],
	},
	categorias_names: {
		type: [String],
	},
	imagen: {
		type: String,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	relevancia: {
		type: Number,
		default: 3,
	},
	detalle_producto: {
		type: Schema.Types.ObjectId,
		ref: 'DetalleProducto',
		required: [true, 'El detalle del producto es requerido'],
	},
	marca: {
		type: Schema.Types.ObjectId,
		ref: 'Marca',
	},
	marca_name: {
		type: String,
	},
	descuento: {
		type: Number,
		default: 0,
	},
	cantidad: {
		type: Number,
		default: 0,
	},
});

ProductoDesabilitadoSchema.method('toJSON', function () {
	let { __v, _id, estado, ...object } = this.toObject();
	object.id = _id;
	return object;
});

ProductoDesabilitadoSchema.plugin(mongoosePaginate);

module.exports = model('ProductoDesabilitado', ProductoDesabilitadoSchema);