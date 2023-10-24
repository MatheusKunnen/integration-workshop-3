import api from "./api";

class GetSnacks {
  async execute() {
    try {
      const response = await api.get("/snacks");
      return response.data;
    } catch (error) {
        console.log("Failed to get snacks: " + error);
        return null;
    }
  }
}

export default new GetSnacks();