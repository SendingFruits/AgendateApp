class UserModel {
	
    constructor() {
		this.username = '';
		this.password = '';
    }
  
    setUsername(username) {
      	this.username = username;
    }
  
    setPassword(password) {
      	this.password = password;
    }
  
    // Aquí puedes incluir otras funciones relacionadas con el usuario, como validar credenciales, registrar usuarios, etc.
}
  
export default new UserModel();