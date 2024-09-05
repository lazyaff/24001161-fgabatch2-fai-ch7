const dotenv = require("dotenv");
const app = require("./utils/app");

// start server
dotenv.config();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
