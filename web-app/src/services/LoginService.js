import api from "./api";

class LoginService {
  // Get NFC tag number from sensor
  // Related task: "Implement communication with NFC reader"

  // Get Child data by tagNumber
  async getChildDataByTagNumber(tagNumber) {
    try {
      const response = await api.get(`/children/tag/${tagNumber}`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.log("Failed to get child data by tag number.", error);
      return {};
    }
  }

  // Login child and get auth token
  async loginChild(authData) {
    try {
      const response = await api.post("/children/login", authData);
      return response.data;
    } catch (error) {
      console.log("Failed to login child.", error);
      throw new Error("Failed to login child.");
    }
  }
}

// Create an instance of LoginService
const newInstance = new LoginService();

// Export the instance as the default module export
export default newInstance;
