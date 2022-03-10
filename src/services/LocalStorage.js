const FIFFEN_MINUTES_INSECOND = 3000;

const LocalStorageService = (() => {
  function _getToken(name, path) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  function _setToken(name, value, expiresInSecond = FIFFEN_MINUTES_INSECOND) {
    document.cookie =
      name + "=" + value + "; " + "max-age=" + expiresInSecond + "; path=/";
  }
  function setRefreshToken(value) {
    _setToken("refresh", value);
  }
  function setAuthToken(value) {
    _setToken("auth", value);
  }
  function getAuthToken(value) {
    return _getToken("auth");
  }
  function getRefreshToken(value) {
    return _getToken("auth");
  }

  function clearToken(name) {
    _setToken(name, "", -1);
  }

  return {
    getAuthToken,
    getRefreshToken,
    setAuthToken,
    setRefreshToken,
    clearToken,
  };
})();

export default LocalStorageService;
