class UserModel {
	
	constructor() {
		this.username = '';
		this.password = '';
		this.email = '';
		this.firstname = '';
		this.lastname = '';
		this.movil = '';
	}

	setUsername(username) { this.username = username; }
	getUsername() { return this.username; }

	setPassword(password) { this.password = password; }
	getPassword() { return this.username; }

	setEmail(email) { this.email = email; }
	getEmail() { return this.email; }

	setFirstname(firstname) { this.firstname = firstname; }
	getFirstname(firstname) { return this.firstname; }

	setLastname(lastname) { this.lastname = lastname; }
	getLastname(lastname) { return this.lastname; }

	setMovil(movil) { this.movil = movil; }
	getMovil(movil) { return this.movil; }
}
	
export default new UserModel();