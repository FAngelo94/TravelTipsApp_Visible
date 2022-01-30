export const checkIfOwner = (idOwner) => {
  if (localStorage.user) {
    const idUser = JSON.parse(localStorage.user).id;
    if (idUser === idOwner) return true;
  }
  return false;
};

export const checkIfLogged = () => {
  if (localStorage.user) return true;
  return false;
};
