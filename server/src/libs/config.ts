const baseHosts = {
  // development
  development: {
    baseHost: 'http://localhost:3000/',
    uploadPath: 'public/',
    domain: 'lawrence',
  },

  // production
  production: {
    baseHost: 'http://app.api',
    uploadPath: 'public/',
    domain: 'lawrence',
  },
};

export { baseHosts };
