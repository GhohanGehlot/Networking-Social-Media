import { PORT } from './constant.js';
import { app } from './index.js';

app.listen( PORT , () => {
    console.log("Server is running on " + PORT);
})