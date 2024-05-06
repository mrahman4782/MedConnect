// Store login session key

const sessionStorage = {
  sessionKey: '',
  setSessionKey: (newSessionKey) => {
    sessionStorage.sessionKey = newSessionKey;
  }
};

export default sessionStorage;
