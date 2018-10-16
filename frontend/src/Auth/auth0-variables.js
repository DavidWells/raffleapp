
let callbackUrl = 'http://localhost:3000/callback'
if (process.env.NODE_ENV === 'production') {
  // in netlify context. See http://bit.ly/2y86cil
  callbackUrl = 'https://confs.netlify.com/callback'
}

export const AUTH_CONFIG = {
  domain: 'netlify-dev.auth0.com',
  clientId: 'Y4L4NC6eGiaYq651pXHsEvtvyID3m4t2',
  callbackUrl: callbackUrl
}
