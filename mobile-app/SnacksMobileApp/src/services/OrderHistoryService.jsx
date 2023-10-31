import api from "./api";

class OrderHistoryService {
    async execute(id, parentToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${parentToken}`;
        try {
            const response = await api.get(`/children/history/${id}`);
            return response.data;
        } catch (error) {
            console.log("Failed to get order history: " + error);
            return null;
        }
    }
}

export default new OrderHistoryService();