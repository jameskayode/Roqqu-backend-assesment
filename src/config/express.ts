import express from 'express';

const createExpressApp = () => {
  const app = express();
  app.use(express.json());

  return app;
};
export default createExpressApp;