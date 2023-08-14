import databaseData from '../services/database/database.json';

class UsersController {

	constructor(navigation) {
		this.navigation = navigation;
	}

	handleLogin(username, password) {

		const userReturn = null;
		const usersList = databaseData.Users;

		try {
			if (username == '') {
				alert('Por favor ingrese el Usuario.');
				return;
			}
			if (password == '') {
				alert('Por favor ingrese la Contraseña.');
				return;
			}
		
			const userReturn = usersList.find(user => user.Username === username);

			if (userReturn && userReturn.Password === password) {
				alert('Bienvenido '+ userReturn.firstname);
				return userReturn;
			} else {
				alert('Credenciales Incorrectas');
				return null;
			}

		} catch (error) {
			console.log(error);
			alert('ERROR - Login: ' + error);
			return null;
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

}

export default new UsersController();