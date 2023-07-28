import UserModel from '../models/UserModel';

class UsersController {

	constructor(navigation) {
		this.navigation = navigation;
	}

	handleLogin(username, password) {
		try {
			if (data.username == '') {
				alert('Por favor ingrese el username.');
				return;
			}
			if (data.password == '') {
				alert('Por favor ingrese la contraseña.');
				return;
			}
			UserModel.setUsername(username);
			UserModel.setPassword(password);
			// loguar contra la api <-----------

		} catch (error) {
			alert('Credenciales Incorrectas');
		}
	}

	handleRegister(data) {
		console.log(data);
	
		if (data.username == '') {
			throw new Error('Por favor ingrese el username.');
		}
		if (data.password == '') {
			throw new Error('Por favor ingrese la contraseña.');
		}
		if (data.nombre == '') {
			throw new Error('Por favor ingrese el nombre.');
		}
		if (data.apellido == '') {
			throw new Error('Por favor ingrese el apellido.');
		}
		if (data.email == '') {
			throw new Error('Por favor ingrese el correo electrónico.');
		}
		if (data.userType === 'Cliente' && data.documento == '') {
			throw new Error('Por favor ingrese el número de documento.');
		} else {
		  	if (data.rut == '') {
				throw new Error('Por favor ingrese el RUT.');
		  	}
		  	if (data.razon == '') {
				throw new Error('Por favor ingrese la Razón Social.');
		  	}
		  	if (data.rubro == '') {
				throw new Error('Por favor ingrese el rubro.');
		  	}
		  	if (data.address == '') {
				throw new Error('Por favor ingrese la dirección.');
		  	}
		  	if (data.selectedLogo == '') {
				throw new Error('Por favor seleccione el logo.');
		  	}
		  	if (data.description == '') {
				throw new Error('Por favor ingrese la descripción.');
		  	}
		}
	
		// crear el objeto json y enviarlo
	}

	getUser(username){
		var user;
		return user;
	}
}

export default new UsersController();


export var userList = [
	{
		1:{
			'user':'admin',
			'pass':'admin',
		},
		2:{
			'user':'usuario2',
			'pass':'usuario2',
		},
	}
];