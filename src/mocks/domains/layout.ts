import { http } from 'msw';
import { menuResponse } from '../fixtures/layoutMockData';

export const handlers = [
  http.get('https://orderright-dev-new.algonomy.com/admin/api/v1/getMenus', () => {
    return new Response(JSON.stringify(menuResponse), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
