/*
 * Formato rut da formato al rut de la forma que se trabajara en este proyecto
 * ej: 125556667 or 12.555.666-7 to 12555666-7
 */

const formatoRut = (rut) => {
	//removemos caracteres raros
	rut = rut.replace(/[^0-9kK]/g, '');
	rut = rut.toLowerCase();
	rut = rut.replace('.', '');

	if (rut.indexOf('-') == -1 && rut.length > 7) {
		rut = rut.slice(0, -1) + '-' + rut.slice(-1);
	}
	return rut;
};

module.exports = formatoRut;
