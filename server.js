const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieSession = require("cookie-session");
var flash = require("connect-flash");

require("colors");
require("dotenv").config();
require("./config/db");
require("./config/passport");

//---------------------------------------------|
//           IMPORTED ROUTES
//---------------------------------------------|
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const brandRoutes = require("./routes/brandRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes ");
const stripeRoutes = require("./routes/stripeRoutes");
const orderRoutes = require("./routes/orderRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
var passport = require("passport");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(
  cookieSession({
    name: "userToken",
    maxAge: 60 * 60 * 30 * 24,
    keys: [process.env.CookieKes],
    httpOnly: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//---------------------------------------------|
//             ADD ROUTES IN MIDDELWARES
//---------------------------------------------|
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/brands", brandRoutes);
// app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/stripe", stripeRoutes);
app.use("/orders", orderRoutes);
app.use("/notifications", notificationRoutes);

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });
}

const server = app.listen(port, () => {
  console.log(`App running on ${port}`.blue);
});

// connect to socket
require("./socket").connectToSocket(server);
