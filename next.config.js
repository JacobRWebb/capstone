const withProgressBar = require("next-progressbar");

module.exports = withProgressBar({
  webpack5: true,
  typescript: {
    ignoreBuildErrors: true,
  },
});
