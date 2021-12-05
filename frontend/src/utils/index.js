// index.js

export const validatePassword = pwd => {
  return pwd.trim().length >= 8
}

export const getAuthConfig = getState => {
  const user = getState().user

  if (user && user.key) {
    return {
      headers: { Authorization: `Token ${user.key}` }
    }
  } else return false
}
