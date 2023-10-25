import databaseData from '../services/database/database.json';
import UserServices from '../services/UserServices';

class UsersController {

	constructor(navigation) {
		this.navigation = navigation;
	}

	handleLogin(username, password) {
		return new Promise((resolve, reject) => {

			if (username == '') {
				throw new Error('Por favor ingrese el username.');
			}
			if (password == '') {
				throw new Error('Por favor ingrese la contraseña.');
			}

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

			if (data.pass == '') {
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

			console.log('data: ', data);

			const dataConvert = {
				nombre: data.name,
				apellido: data.last,
				correo: data.mail,
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

			if (data.old === '') {
				throw new Error('Debe ingresar la Contraseña Actual.');
			}
			if (data.new === '') {
				throw new Error('Debe ingresar la Contraseña Nueva.');
			}

			var json = {
                'Id':data.idu,
                'passVieja':data.old,
                'passNueva':data.new,
            }

			if (data.new !== data.old) {
				UserServices.putPassword(json)
				.then(msgReturn => {
					resolve(msgReturn);
				})
				.catch(error => {
					reject(error);
				});
			} else {
				throw new Error('La contraseña sigue siendo igual, debe ser diferente');
			}

		});
	}
}

export default new UsersController();