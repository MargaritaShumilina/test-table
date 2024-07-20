export const fetchUsers = async () => {
    const url = 'https://dummyjson.com/users';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const text = await response.text();
            console.error(`HTTP error! Status: ${response.status}. Response: ${text}`);
            throw new Error('HTTP error!');
        }
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const fetchFilteredUsers = async (key, value) => {
    const url = `https://dummyjson.com/users/filter?key=${key}&value=${value}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const text = await response.text();
            console.error(`HTTP error! Status: ${response.status}. Response: ${text}`);
            throw new Error(`HTTP error!`);
        }
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error('Error fetching filtered users:', error);
        throw error;
    }
};