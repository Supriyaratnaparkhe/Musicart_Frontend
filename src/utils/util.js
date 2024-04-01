import { jwtDecode } from 'jwt-decode';
export const isUserLoggedIn = (userId) => {

    const token = localStorage.getItem('token');
    let validsession = sessionStorage.getItem("isValidSession");
    if (token && validsession && userId) {
        try {
            // Decode the token to check if it's expired
            const decodedToken = jwtDecode(token);

            // Check if the token has expired
            if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                // Token is valid and not expired
                return true;
            } else {
                // Token is expired, remove it from localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('UserName');
                console.log('Token expired. Removed from localStorage.');
            }
        } catch (error) {
            // Handle decoding errors
            console.error('Error decoding token:', error);

            // Remove token from localStorage in case of decoding errors
            localStorage.removeItem('token');
            console.log('Token removed from localStorage due to decoding error.');
        }
    }

    // Token is not present or expired
    return false;
};


