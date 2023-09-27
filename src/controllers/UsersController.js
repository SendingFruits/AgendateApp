import databaseData from '../services/database/database.json';
import UserServices from '../services/UserServices';

class UsersController {

	constructor(navigation) {
		this.navigation = navigation;
	}

	handleLogin(username, password) {
		return new Promise((resolve, reject) => {
			UserServices.doLogin(username, password)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleRegister(data) {
		return new Promise((resolve, reject) => {
			
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

			if (data.userType === 'customer' && data.documento == '') {
				throw new Error('Por favor ingrese su documento de identidad.');
			} 
			
			if (data.userType === 'company' && data.documento == '') {
				throw new Error('Por favor ingrese el RUT de su Empresa.');
			} 
		
			const dataConvert = {
				nombreUsuario: data.username,
				nombre: data.firstName,
				apellido: data.lastName,
				contrasenia: data.password,
				celular: data.movil,
				correo: data.email,
				TipoUsuario: data.userType,
				documento: data.document,
			}

			UserServices.postUserRegister(dataConvert)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleUpdate(data) {
		return new Promise((resolve, reject) => {

			if (data.username == '') {
				throw new Error('Falta el usuario.');
			}
			if (data.password == '') {
				throw new Error('Falta la contraseña.');
			}
			if (data.name == '') {
				throw new Error('Falta el nombre.');
			}
			if (data.last == '') {
				throw new Error('Falta el apellido.');
			}
			if (data.email == '') {
				throw new Error('Falta el correo electrónico.');
			}

			// {
			// 	"id": 0,
			// 	"nombreUsuario": "string",
			// 	"nombre": "string",
			// 	"apellido": "string",
			// 	"contrasenia": "string",
			// 	"celular": "string",
			// 	"correo": "string",
			// 	"tipoUsuario": "string",
			// 	"documento": "string"
			//   }

			console.log('data: ', data);

			const dataConvert = {
				nombre: data.name,
				apellido: data.last,
				correo: data.mail,
				// tipoUsuario: data.type,
			}

			UserServices.putUserData(dataConvert)
			.then(userReturn => {
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleUpdatePass(data) {
		return new Promise((resolve, reject) => {
			const user = databaseData.Users;

			if (data.password == '') {
				throw new Error('Por favor ingrese la contraseña.');
			}

			UserServices.putUserData(data);
		});
	}
}

export default new UsersController();