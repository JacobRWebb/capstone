module.exports = {
  apps: [
    {
      name: "Commerce Reservation - Frontend",
      cwd: "./",
      script: "yarn",
      args: "prod",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
