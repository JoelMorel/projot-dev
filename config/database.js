if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://dbadmin:LNhzzrT0ESHifOMk@projot-prod-gwff0.mongodb.net/test?retryWrites=true"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/projot-dev" };
}
