export const isAdminLoggedIn = () => localStorage.getItem('admin-auth') === 'true';
export const logoutAdmin = () => localStorage.removeItem('admin-auth'); 