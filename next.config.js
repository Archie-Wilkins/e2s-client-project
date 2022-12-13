
module.exports = {
    reactStrictMode: false,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
  env: {
    webpack5: true,
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASSWORD: '',
    DB_DATABASE: 'e2s_db'
  }
  
};