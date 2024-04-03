// Store login session key



const sessionStorage = {
  sessionKey: '',
  setSessionKey: (newSessionKey) => {
    sessionStorage.sessionKey = newSessionKey;
  }
};

export default sessionStorage;


// let sessionKey = ''; // Define sessionKey outside the exported object

// const sessionStorage = {
//   getSessionKey: () => sessionKey, // Getter function to access the session key
//   setSessionKey: (newSessionKey) => {
//     sessionKey = newSessionKey; // Update the sessionKey value
//   }
// };

// export default sessionStorage;