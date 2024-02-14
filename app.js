const mulankRouter = require("./routes/mulankRoutes");
const numeroscopeRoute = require("./routes/numeroscopeRoute");
const viewRoutes = require("./routes/viewRoutes");
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const compression = require("compression");
const rateLimit = require("express-rate-limit");
const path = require("path");
// const compression = require("compression");

const app = express();
app.use(cors());

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'", "data:", "blob:", "https:", "ws:"],
//         baseUri: ["'self'"],
//         fontSrc: ["'self'", "https:", "data:"],
//         scriptSrc: [
//           "'self'",
//           "https:",
//           "http:",
//           "blob:",

//           "https://*.mapbox.com",
//           "https://js.stripe.com",
//           "https://m.stripe.network",
//           "https://*.cloudflare.com",
//         ],
//         frameSrc: ["'self'", "https://js.stripe.com"],
//         objectSrc: ["'none'"],
//         styleSrc: ["'self'", "https:", "'unsafe-inline'"],
//         workerSrc: [
//           "'self'",
//           "data:",
//           "blob:",
//           "https://*.tiles.mapbox.com",
//           "https://api.mapbox.com",
//           "https://events.mapbox.com",
//           "https://m.stripe.network",
//         ],
//         childSrc: ["'self'", "blob:"],
//         imgSrc: ["'self'", "data:", "blob:"],
//         formAction: ["'self'"],
//         connectSrc: [
//           "'self'",
//           "'unsafe-inline'",
//           "data:",
//           "blob:",
//           "https://*.stripe.com",
//           "https://*.mapbox.com",
//           "https://*.cloudflare.com/",
//           "https://bundle.js:*",
//           "ws://127.0.0.1:*/",
//         ],
//         upgradeInsecureRequests: [],
//       },
//     },
//   })
// );

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use("/api/v1/mulank", mulankRouter);
app.use("/api/v1/numeroscope", numeroscopeRoute);

app.use("/api/v1/numeroPedia", viewRoutes);

module.exports = app;
