import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes/crmRoutes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

//nongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

//serving static files
app.use(express.static("images"));

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, (req, res) =>
  console.log(`Your server is running on port ${PORT}`)
);
