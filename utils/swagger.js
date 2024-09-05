const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");

const setupSwagger = (app) => {
    fs.readFile("./api-docs.yml", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading swagger file:", err);
            return;
        }

        try {
            const swaggerDocument = yaml.load(data);
            app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        } catch (e) {
            console.error("Error parsing YAML file:", e);
        }
    });
};

module.exports = setupSwagger;
