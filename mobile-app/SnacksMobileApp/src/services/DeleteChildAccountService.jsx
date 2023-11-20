import api from "./api";

class DeleteChildAccountService {
    async deleteChildAccount(parentToken, childId) {
        try {
            api.defaults.headers.common["Authorization"] = `Bearer ${parentToken}`;
            const response = await api.delete(`children/${childId}`);
            return response.data;
        } catch (error) {
            console.log("Failed to delete child account: " + error);
            return null;
        }
    }
}

export default new DeleteChildAccountService();