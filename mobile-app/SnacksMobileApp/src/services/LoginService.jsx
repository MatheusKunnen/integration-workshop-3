import api from "./api";

class LoginService {
  async login(login) {
    try {
      const response = await api.post("parents/login", login);
      return response.data;
    } catch (error) {
      console.log("Failed to login: " + error);
      return null;
    }
  }
}

export default new LoginService();