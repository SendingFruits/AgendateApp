import UserModel from '../models/UserModel';

class UsersController {

	constructor(navigation) {
		this.navigation = navigation;
	}

	handleLogin(username, password) {
		if (!data.username) {
			alert('Por favor ingrese el username.');
			return;
		}
		if (!data.password) {
			alert('Por favor ingrese la contraseña.');
			return;
		}
		UserModel.setUsername(username);
		UserModel.setPassword(password);
		// loguar contra la api <-----------
	}

	handleRegister(data) {
		const errors = {};
	
		if (!data.username) {
		  	errors.username = 'Por favor ingrese el username.';
		}
		if (!data.password) {
		  	errors.password = 'Por favor ingrese la contraseña.';
		}
		if (!data.nombre) {
		  	errors.nombre = 'Por favor ingrese el nombre.';
		}
		if (!data.apellido) {
		  	errors.apellido = 'Por favor ingrese el apellido.';
		}
		if (!data.email) {
		  	errors.email = 'Por favor ingrese el correo electrónico.';
		}
		if (data.userType === 'Cliente' && !data.documento) {
		  	errors.documento = 'Por favor ingrese el número de documento.';
		} else {
		  	if (!data.rut) {
				errors.rut = 'Por favor ingrese el RUT.';
		  	}
		  	if (!data.razon) {
				errors.razon = 'Por favor ingrese la Razón Social.';
		  	}
		  	if (!data.rubro) {
				errors.rubro = 'Por favor ingrese el rubro.';
		  	}
		  	if (!data.address) {
				errors.address = 'Por favor ingrese la dirección.';
		  	}
		  	if (!data.selectedLogo) {
				errors.selectedLogo = 'Por favor seleccione el logo.';
		  	}
		  	if (!data.description) {
				errors.description = 'Por favor ingrese la descripción.';
		  	}
		}
	
		if (Object.keys(errors).length > 0) {
		  	return { success: false, errors };
		}
	
		// Si todo está correcto, puedes realizar el registro en el backend.
		// UserModel.setUsername(data.username);
		// UserModel.setPassword(data.password);
		// ... Otras acciones necesarias para realizar el registro ...
	
		return { success: true };
	}
}

export default new UsersController();