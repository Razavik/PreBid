export const setJwtToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const removeJwtToken = () => {
    localStorage.removeItem('token');
};

export const getJwtToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    return !!getJwtToken();
};

export const setRefreshToken = (token: string) => {
    localStorage.setItem('refresh_token', token);
};

export const removeRefreshToken = () => {
    localStorage.removeItem('refresh_token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};
