// import swaggerJsdoc = require('swagger-jsdoc');
import express = require('express');
// import { serve, setup } from 'swagger-ui-express';
// import swaggerDefinition from '../../docs/api-specification';

import funRouter from './fun.routes'

// const specs = swaggerJsdoc(swaggerDefinition);
const router = express.Router();
const prefix = '/api/v1';

const prefix1 = '';
// const apiDocs = '/api/docs';
// const specsConfig = setup(specs, {
//   explorer: false,
//   customSiteTitle: 'Clevel'
// })

// router.use(apiDocs, serve);
// router.use(apiDocs, specsConfig);
router.use(funRouter);

export default router;