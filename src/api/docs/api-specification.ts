import { resolve } from 'path';
import config from '../../config/index';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ride n Roll',
      version: '1.0.0',
      description:
            'TS Biolerplate',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/'
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [
      {
        url: `http://localhost:${config.PORT}/api/v1`,
        description: 'Local Host'
      }
    ]
  },
  apis: [
    resolve(__dirname, '../docs/resources/*.yaml'),
    resolve(__dirname, '../routes/api/*.ts')
  ]
};

export default options;