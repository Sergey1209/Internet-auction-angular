const PROXY_CONFIG = [
  {
    context: [
     // "/weatherforecast",
      "/lotcategories",
    ],
    target: "https://localhost:44306",
    secure: true
  }
]

module.exports = PROXY_CONFIG;
