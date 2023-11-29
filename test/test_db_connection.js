const sequelize = require("../config/sequelize-config");

sequelize.authenticate()
    .then(() => {
        console.log("Connection stablished");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Can't stablish connection", err);
        process.exit(1);
    });