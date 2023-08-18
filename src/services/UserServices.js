const API_BASE_URL = 'https://7a0d-2800-a4-142e-d100-75af-4267-c7be-edf5.ngrok-free.app/';

class UserServices {

    getUsers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };

    postUserRegister = async (json) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };


    getCompanies = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}api/Empresas`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching companies:', error);
            throw error;
        }
    };
    
    
}

export default new UserServices();