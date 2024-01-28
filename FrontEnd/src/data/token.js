const TOKEN = 'user';

export const saveToken = (tokenData) => {
  localStorage.setItem(TOKEN, JSON.stringify(tokenData));
};

export const getToken = () => {
  try {
    const userData = localStorage.getItem(TOKEN);
    if (userData) {
      const parsedData = JSON.parse(userData);
      const userToken = parsedData ? parsedData.token : null;
      return userToken;
    }
  } catch (err) {
    console.error('Error occured while getting token');
  }
};

export const getUserRole = () => {
  try {
    const userData = localStorage.getItem(TOKEN);
    const parsedData = JSON.parse(userData);
    const userRole = parsedData ? parsedData.roles : null;
    return userRole;
  } catch (err) {
    console.error('Error occured while getting user role');
  }
};

export const getUserName = () => {
  try {
    const userData = localStorage.getItem(TOKEN);
    const parsedData = JSON.parse(userData);
    const userName = parsedData ? parsedData.name : null;
    return userName;
  } catch (err) {
    console.error('Error occured while getting user role');
  }
};

export const clearToken = () => {
  localStorage.clear(TOKEN);
};
