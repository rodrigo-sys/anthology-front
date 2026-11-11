export default {
  "/api": {
    target: process.env.API_URL || "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  },
  "/auth": {
    target: process.env.API_URL || "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
};
