import { saveToken } from '../data/token';
import { getToken } from '../data/token';
import { clearToken } from '../data/token';

export const signIn = async (user) => {
  try {
    const userInfo = {
      email: user.id,
      password: user.password,
    };
    const userSignIn = await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (!userSignIn.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await userSignIn.json();
    console.log(userData);
    if (userData.token) {
      saveToken(userData);
    }
    return userData;
  } catch (err) {
    console.error('Error occured during fectching data: ', err);
  }
};

export const signOut = () => {
  clearToken();
};

export const checkMyToken = async () => {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
};
