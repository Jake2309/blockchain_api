import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import quorumRoute from "./src/routes/quorum.routes";
import bodyParser from "body-parser";
import QuorumProvider from "./src/providers/quorum.provider";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

QuorumProvider.getInstance().init()

const PORT = parseInt(process.env.PORT, 10)

const app = express();
app.use(helmet())
app.use(cors())
// app.use(compression({ filter: shouldCompress }))
app.use([
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: true,
    })
])

app.use('/api/quorum/', quorumRoute);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

export default { server: app }