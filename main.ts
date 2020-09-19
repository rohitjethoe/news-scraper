import * as express from 'express';
import * as cors from 'cors';

const app: any = express();
const PORT: any = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/web'));

app.listen(PORT, () => {
    const message: string = `Development Server.\n\nRunning on http://localhost:${PORT}`;
    console.log(message);
});