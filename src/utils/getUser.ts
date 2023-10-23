export const getUser = () => {
  const userJSON = localStorage.getItem('user') || null;

  if (userJSON !== null) {
    const user = JSON.parse(userJSON); 
    return user;
  }
};
