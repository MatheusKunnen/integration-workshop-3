import api from "./api";

const dev_test = {
  id: 1,
  tagNumber: "123",
  isBlocked: false,
  passwordGroup: {
    id: 20,
    image1: {
      id: 19,
      url: "/images/image_1.png",
    },
    image2: {
      id: 20,
      url: "/images/image_2.png",
    },
    image3: {
      id: 21,
      url: "/images/image_3.png",
    },
    image4: {
      id: 22,
      url: "/images/image_4.png",
    },
    image5: {
      id: 23,
      url: "/images/image_5.png",
    },
    image6: {
      id: 24,
      url: "/images/image_6.png",
    },
  },
  allowedSnacks: [1, 6],
  credit: 204,
};

class LoginService {
  // Get NFC tag number from sensor
  // Related task: "Implement communication with NFC reader"

  // Get Child data by tagNumber
  async getChildDataByTagNumber(tagNumber) {
    try {
      //const response = await api.get(`/children/tag/${tagNumber}`, {
      //    headers: {'Content-Type': 'application/json',} ,
      //});
      //return response.data;
      return dev_test;
    } catch (error) {
      console.log("Failed to get child data by tag number.", error);
      return {};
    }
  }

  // Login child and get auth token
  async loginChild(authData) {
    try {
      const response = await api.post("/children/login", authData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.token;
    } catch (error) {
      console.log("Failed to login child.", error);
      return "";
    }
  }
}

// Create an instance of LoginService
const newInstance = new LoginService();

// Export the instance as the default module export
export default newInstance;
