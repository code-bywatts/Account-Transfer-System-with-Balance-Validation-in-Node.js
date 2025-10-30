import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import transferRoutes from "./routes/transferRoutes.js";

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/accountDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api", transferRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
