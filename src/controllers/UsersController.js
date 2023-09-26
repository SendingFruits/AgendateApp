import databaseData from '../services/database/database.json';
import UserServices from '../services/UserServices';

class UsersController {

	constructor(navigation) {
		this.navigation = navigation;
	}

	handleLogin(username, password) {
		return new Promise((resolve, reject) => {
			// api
			UserServices.doLogin(username, password)
			.then(userReturn => {
				userReturn.api = true;
				// console.log(userReturn);
				resolve(userReturn);
			})
			.catch(error => {
				reject(null);
			});

			// json
			// var userReturn = null;
			// const usersList = databaseData.Users;
			// const customersList = databaseData.Customers;
			// const companiesList = databaseData.Companies;
	
			// if (username == '') {
			// 	reject('Por favor ingrese el Usuario.');
			// 	return;
			// }
			// if (password == '') {
			// 	reject('Por favor ingrese la Contraseña.');
			// 	return;
			// }
			// userReturn = usersList.find(user => user.Username === username);
			// if (userReturn && userReturn.Password === password) {
			// 	var data = {};
			// 	if (userReturn.type === 'customer') {
			// 		const customerData = customersList.find(customer => customer.UserId === userReturn.Id);
			// 		data = {
			// 			'customer': customerData,
			// 		};
			// 	}
			// 	if (userReturn.type === 'company') {
			// 		const companyData = companiesList.find(company => company.UserId === userReturn.Id);
			// 		data = {
			// 			'company': companyData,
			// 		};
			// 	}
			// 	userReturn.data = data;
			// 	userReturn.api = false;
			// 	resolve(userReturn);
			// } else {
			// 	reject('Credenciales Incorrectas');
			// }
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
				// id: 0,
				nombreUsuario: data.username,
				nombre: data.firstName,
				apellido: data.lastName,
				contrasenia: data.password,
				celular: data.movil,
				correo: data.email,
				TipoUsuario: data.userType, //(data.userType == 'customer') ? 'Cliente' : 'Empresa',
				documento: data.document,
			}

			UserServices.postUserRegister(dataConvert)
			.then(userReturn => {
				userReturn.api = true;
				resolve(userReturn);
			})
			.catch(error => {
				reject(error);
			});
		});
	}

	handleUpdate(data) {

		const user = databaseData.Users;

		if (data.username == '') {
			throw new Error('Por favor ingrese el username.');
		}
		if (data.password == '') {
			throw new Error('Por favor ingrese la contraseña.');
		}
		if (data.email == '') {
			throw new Error('Por favor ingrese el correo electrónico.');
		}

		UserServices.putUserData(data);
	}
}

export default new UsersController();