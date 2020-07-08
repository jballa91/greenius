module.exports = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/graphql"
      : "https://magello-api.herokuapp.com/graphql",
};
