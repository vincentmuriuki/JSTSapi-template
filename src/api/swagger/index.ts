// Swagger set up
import * as path from 'path';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Boilerplate',
    },
    basePath: '/api/v1',
    servers: [
      {
        url: `${process.env.BASE_URL}/api/v1`,
      }
    ]
  },
  apis: [
    // all swagger api files will included here like below example
    //   this is an example of how to include file : path.resolve(__dirname,'./Users.js'),
    path.resolve(__dirname, '../routes/api/user.route.js')
  ]
};
export default options;