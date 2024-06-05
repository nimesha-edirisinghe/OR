import { groupDefinition, groupList } from 'mocks/fixtures/groupMockData';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

// export const handlers = [
//   rest.get('https://or-ent-dev.algonomy.com/api/v1/group/groupDefinition', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(groupDefinition));
//   }),
//   rest.get('https://or-ent-dev.algonomy.com/api/v1/group/list', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(groupList));
//   })
// ];
export const handlers = [
  http.get(`${endpointUrl}/group/groupDefinition`, () => {
    return new Response(JSON.stringify(groupDefinition), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/replenishment/group/list`, () => {
    return new Response(JSON.stringify(groupList), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
