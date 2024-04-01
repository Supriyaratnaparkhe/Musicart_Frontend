import { jwtDecode } from 'jwt-decode';
export const isUserLoggedIn = (userId) => {

    const token = localStorage.getItem('token');
    let validsession = sessionStorage.getItem("isValidSession");
    if (token && validsession && userId) {
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                return true;
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('UserName');
                console.log('Token expired. Removed from localStorage.');
            }
        } catch (error) {
            console.error('Error decoding token:', error);

            localStorage.removeItem('token');
            console.log('Token removed from localStorage due to decoding error.');
        }
    }

    // Token is not present or expired
    return false;
};


