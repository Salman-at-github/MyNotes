const host = process.env.REACT_APP_BACKEND_HOST;

export const sendOTP = async (email) => {
    if(!email) return;
    try {
      const response = await fetch(`${host}/api/v1/auth/sendotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while sending OTP' };
    }
  };

export const verifyOTP = async (email, OTP) => {
    if(!email || !OTP) return;
    try {
      const response = await fetch(`${host}/api/v1/auth/verifyotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, OTP }),
      });

      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while verifying OTP' };
    }
  };

export const signUp = async (name, email, password) => {
    if(!name || !email || !password) return;
    try {
      const response = await fetch(`${host}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while signing up' };
    }
  };

export const signIn = async (email, password) => {
    if(!email || !password) return;
    try {
      const response = await fetch(`${host}/api/v1/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while signing in' };
    }
  };

 export const getUserData = async () => {
    try {
      const response = await fetch(`${host}/api/v1/auth/user/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while fetching user data' };
    }
};

export const resendOTP = async (email) => {
    if(!email) return;
  try {
    const response = await fetch(`${host}/api/v1/auth/sendotpagain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { success: false, error: 'An error occurred while sending OTP again' };
  }
};

export  const resetPassword = async (email, password) => {
    if(!email || !password) return;
    try {
      const response = await fetch(`${host}/api/v1/auth/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred while resetting password' };
    }
  };