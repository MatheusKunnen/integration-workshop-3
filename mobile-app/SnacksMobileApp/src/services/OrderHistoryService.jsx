import api from "./api";

class OrderHistoryService {
    async getHistory(id, parentToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${parentToken}`;
        try {
            const response = await api.get(`/children/history/${id}`);
            return response.data;
        } catch (error) {
            console.log("Failed to get order history: " + error);
            return null;
        }
    }

    async getTotalSpent(id, parentToken) {
        const history = await this.getHistory(id, parentToken);
        let total = 0;
        history.forEach((item) => {
            total += item.price;
        });
        return total;
    }
}

export default new OrderHistoryService();