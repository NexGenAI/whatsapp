import express from "express";
const app = express();

// database config file
import "./DB/config.database";

// Router
import Router from "./routes/index";

// error handler
import errorHandler from "./middleware/error.Handler.Middleware";

// body parser - parse the upcoming json data.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", Router);

// Error Handler Middleware
app.use(errorHandler);

export const App = app;
