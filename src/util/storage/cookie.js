function getToken(name, path) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function setToken(name, value, expiresInSecond) {
  document.cookie =
    name + "=" + value + "; " + "expires=" + expiresInSecond + "; path=/";
}
function deleteToken(name) {
  setToken(name, "", -1);
}

export { getToken, setToken, deleteToken };
