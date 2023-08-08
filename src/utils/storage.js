const CENSO_API_USER = 'censoUser';


/////////////CAMBIAR A API CENSO ???



const setUserToLocalStorage = userData => {
    localStorage.setItem(CENSO_API_USER, JSON.stringify(userData));
};

const removeUserFromLocalStorage = () => {
    localStorage.removeItem(CENSO_API_USER);
};

const getItemFromLocalStorage = key => {
    return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
}





export {
    getItemFromLocalStorage,
    removeUserFromLocalStorage,
    setUserToLocalStorage,
};