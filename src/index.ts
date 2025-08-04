import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
dotenv
import { authRouter } from "./routes/auth"
import { swaggerSpec } from './docs/swaggerConfig';
import swaggerUi from 'swagger-ui-express';
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/", (req, res) => {
    res.json({ message: "Akorify backend çalışıyor!" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor!`);
});
