import api from './api';

class RegisterParentService {
    async registerParent(parent) {
        try {
            const response = await api.post('parents', parent);
            return response.data;
        } catch (error) {
            console.log('Failed to register parent: ' + error);
            return null;
        }
    }
}

export default new RegisterParentService();