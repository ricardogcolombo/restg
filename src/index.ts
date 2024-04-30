import app from './server';

import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log('listening at ' + port);
});
