import * as SecureStore from "expo-secure-store"

async function getAuthHeader() {
        const token = SecureStore.getItemAsync("token");

        const authHeader = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    
    return authHeader;
}

export {getAuthHeader};