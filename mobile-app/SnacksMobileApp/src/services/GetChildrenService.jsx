import api from "./api";

class GetChildrenService {
  async getChildren(parentToken) {
    try {
        api.defaults.headers.common["Authorization"] = `Bearer ${parentToken}`;
        const response = await api.get("children/all");
        return response.data;
    } catch (error) {
        console.log("Failed to get children: " + error);
        return null;
    }
  }
}

export default new GetChildrenService();