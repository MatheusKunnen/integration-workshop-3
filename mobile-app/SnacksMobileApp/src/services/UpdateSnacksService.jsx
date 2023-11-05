import api from "./api";

class UpdateSnacksService {
    async execute(parentToken, id, data) {
        api.defaults.headers.common['Authorization'] = `Bearer ${parentToken}`;
        try {
            const response = await api.patch(`children/${id}/allowed-snacks`, data);
            return response.data;
        } catch (error) {
            console.log('Failed to update allowed snacks: ' + error);
            return null;
        }
    }
}
export default new UpdateSnacksService();