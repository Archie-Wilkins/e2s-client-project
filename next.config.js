
  module.exports = {
    webpack: true,
    reactStrictMode: false,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
  
};