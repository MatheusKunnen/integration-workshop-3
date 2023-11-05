import api from "./api";

class UpdateBudgetService {
    async execute(parentToken, id, data) {
        api.defaults.headers.common['Authorization'] = `Bearer ${parentToken}`;
        try {
            const response = await api.patch(`children/${id}/budget`, data);
            return response.data;
        } catch (error) {
            console.log('Failed to update budget: ' + error);
            return null;
        }
    }
}
export default new UpdateBudgetService();