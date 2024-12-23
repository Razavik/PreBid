export const getJwtToken = () => {
    return localStorage.getItem('token');
};

export const setJwtToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const removeJwtToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!getJwtToken();
};
