import api from "./api";

class PasswordGroupService {
    async getRandomPasswordGroup() {
        try {
            const response = await api.get("password-groups/random");
            return response.data;
        } catch (error) {
            console.log("Failed to get random password group: " + error);
            return null;
        }
    }
}

export default new PasswordGroupService();