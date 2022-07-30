const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "",
      database: "items",
    },
    listPerPage: 15,
  };
  module.exports = config;