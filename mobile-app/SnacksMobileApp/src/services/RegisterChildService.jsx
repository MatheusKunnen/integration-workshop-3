import api from "./api";

class RegisterChildService {
    async registerChild(child, parentToken) {
        try {
            api.defaults.headers.common["Authorization"] = `Bearer ${parentToken}`;
            const response = await api.post("children", child);
            return response.data;
        } catch (error) {
            console.log("Failed to register child: " + error);
            return null;
        }
    }
}

export default new RegisterChildService();