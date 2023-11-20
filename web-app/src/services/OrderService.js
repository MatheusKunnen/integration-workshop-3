import api from "./api";

class OrderService {
  // Get snacks
  async getSnacks(tagNumber) {
    try {
      const response = await api.get("/snacks");
      return response.data;
    } catch (error) {
      console.log("Failed to get snacks.", error);
      return [];
    }
  }

  async purchaseSnack(snackId, token) {
    try {
      const response = await api.post(`/snacks/purchase/${snackId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("Failed to purchase snack.", error);
      return {};
    }
  }
}

// Create an instance of OrderService
const newInstance = new OrderService();

// Export the instance as the default module export
export default newInstance;
