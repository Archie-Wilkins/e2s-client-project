
  module.exports = {
    webpack5: true,
    reactStrictMode: false,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
};