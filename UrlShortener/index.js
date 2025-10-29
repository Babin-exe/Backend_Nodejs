const express = require("express");
require("dotenv").config();
const PORT = 4000;
const { connectDb } = require("./config/connect.js");
const { handleShowStuff } = require("./controllers/userController.js");
const app = express();
const path = require("path");

const staticRoute = require("./router/staticRouter.js");
const router = require("./router/router.js");
const userRoute = require("./router/user.js");
const cookieParser = require("cookie-parser");
const { restrictToLoggedUserOnly } = require("./middlewares/auth.js");

connectDb(process.env.MONGO_URL);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/api/url", restrictToLoggedUserOnly, router);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});
