import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import router from "./entities/index.js";

const PORT = 35001;

const app = express();

app.use(express.json())
app.use(cors());


app.use("/users", router);

app.get("/", (req, res) => {
    res.send("It's working users api!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export const handler = serverless(app);