import app from './server';

import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening at ' + port);
});
