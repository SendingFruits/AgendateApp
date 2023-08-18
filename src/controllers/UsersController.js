import databaseData from '../services/database/database.json';
import UserServices from '../services/UserServices';

class UsersController {

	API_BASE_URL = 'https://example.com/api';

	constructor(navigation) {
		this.navigation = navigation;
	}

	handleLogin(username, password) {

		var userReturn = null;
		const usersList = databaseData.Users;
		const customersList = databaseData.Customers;
		const companiesList = databaseData.Companies;

		try {
			if (username == '') {
				alert('Por favor ingrese el Usuario.');
				return;
			}
			if (password == '') {
				alert('Por favor ingrese la Contraseña.');
				return;
			}
		
			userReturn = usersList.find(user => user.Username === username);
			
			if (userReturn && userReturn.Password === password) {

				var data = {};

				if (userReturn.type === 'customer') {
					const customerData = customersList.find(customer => customer.UserId === userReturn.Id);
					data = {
						'customer': customerData,
					};
				}

				if (userReturn.type === 'company') {
					const companyData = companiesList.find(company => company.UserId === userReturn.Id);
					data = {
						'company': companyData,
					};
				}

				userReturn.data = data;
				
				alert('Bienvenido '+ userReturn.firstname);
				return userReturn;
			} else {
				alert('Credenciales Incorrectas');
				return null;
			}

		} catch (error) {
			alert('ERROR - Login ' + error);
			return null;
		}
	}

	handleRegister(data) {
	
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
	
		UserServices.postUserRegister(data);
	}
}

export default new UsersController();