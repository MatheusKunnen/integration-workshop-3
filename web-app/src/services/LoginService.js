import api from './api';

class LoginService {
    // Get NFC tag number from sensor
    // Related task: "Implement communication with NFC reader"

    // Get Child data by tagNumber
    async getChildDataByTagNumber(tagNumber) {
        try {
            const response = await api.get(`/children/${tagNumber}`);
            return response.data;
        } catch (error) {
            console.log('Failed to get child data by tag number.', error);
            return [];
        }
    }

    // Get PasswordGroup by Child passwordGroupId
    async getPasswordGroup(passwordGroupId) {
        try {
            const response = await api.get(`/password-groups/${passwordGroupId}`);
            return response.data;
        } catch (error) {
            console.log('Failed to get password group of the child.', error);
            return [];
        }
    }
}

// Create an instance of LoginService
const newInstance = new LoginService();

// Export the instance as the default module export
export default newInstance;
