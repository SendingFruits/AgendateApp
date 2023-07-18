import UserModel from '../models/UserModel';

class LoginController {
  handleLogin(username, password) {
    UserModel.setUsername(username);
    UserModel.setPassword(password);

    // Aquí puedes realizar la lógica de inicio de sesión, como enviar las credenciales al servidor, validarlas, etc.
  }
}

export default new LoginController();