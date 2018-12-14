const proxy = require("http-proxy-middleware");
if (process.env.NODE_ENV === "production") {
  module.exports = function(app) {
    app.use(
      proxy("/auth/*", {
        target: "https://protected-peak-30704.herokuapp.com/"
      })
    );
    app.use(
      proxy("/api/*", { target: "https://protected-peak-30704.herokuapp.com/" })
    );
    app.use(
      proxy("/api/*/*", {
        target: "https://protected-peak-30704.herokuapp.com/"
      })
    );
  };
}
