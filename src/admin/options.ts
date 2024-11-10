import { AdminJSOptions } from 'adminjs';

import componentLoader from './component-loader.js';
import { PrismaClient } from '@prisma/client';
import { getModelByName } from '@adminjs/prisma';

const prisma = new PrismaClient();

const usersNavigation = {
  name: 'Users',
  icon: 'User',
};

const options: AdminJSOptions = {
  componentLoader,
  resources: [
    {
      resource: { model: getModelByName('User'), client: prisma },

      options: {
        navigation: usersNavigation,
        properties: {
          password: { isVisible: { list: false, filter: false, show: false, edit: true } },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload?.password) {
                // Encode the password before saving it to the database
                request.payload.password = Buffer.from(request.payload.password).toString('base64');
              }
              return request;
            },
          },
        },
      },
    },
  ],
  databases: [],
};

export default options;
