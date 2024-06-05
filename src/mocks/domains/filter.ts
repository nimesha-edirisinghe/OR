import { filterData, filterLabelResponse } from 'mocks/fixtures/filter';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

// export const handlers = [
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/group/labels', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(filterLabelResponse));
//   }),
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/group/filters/data', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(filterData));
//   })
// ];
export const handlers = [
  http.post(`${endpointUrl}/group/labels`, () => {
    return new Response(JSON.stringify(filterLabelResponse), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/group/filters/data`, () => {
    return new Response(JSON.stringify(filterData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
