import api from "./api";

class GetBalanceService {
    async getBalance(parentToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${parentToken}`;
        try {
            const response = await api.get("parents");
            return response.data.balance;
        } catch (error) {
            console.log("Failed to get balance: " + error);
            return null;
        }
    }
}
export default new GetBalanceService();