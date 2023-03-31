import {
  IncomingMessagesController,
} from "../controller";
import express from "express";
const Router = express.Router();

// messages
Router.post("/message", IncomingMessagesController);

export default Router;
