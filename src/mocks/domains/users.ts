import { adminEndpointUrl } from 'mocks/properties';
import { http } from 'msw';

const permissionData = {
  username: 'abcd@algonomy.com',
  name: 'Layan Karandana',
  base_modules: {
    DF: 1,
    DS: 0,
    INV: 0,
    Factory: 1
  },
  'factory-modules': {
    'Group-Config': 'RWD',
    DF: 'RWD',
    DS: '',
    Inv: 'R'
  }
};

export const handlers = [
  http.get(`${adminEndpointUrl}/getPermissions`, () => {
    return new Response(JSON.stringify(permissionData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
