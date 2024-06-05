import {
  whExpandedSkuListData,
  whReplenishmentPlanData,
  whReplenishmentSkuData,
  whRplTotalCount
} from 'mocks/fixtures/viewReplenishment';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

export const handlers = [
  http.post(`${endpointUrl}/replenishment/view/list`, () => {
    return new Response(JSON.stringify(whReplenishmentSkuData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get(`${endpointUrl}/replenishment/plan/details`, () => {
    return new Response(JSON.stringify(whReplenishmentPlanData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/replenishment/view/list/expanded`, () => {
    return new Response(JSON.stringify(whExpandedSkuListData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/replenishment/view/list/count`, () => {
    return new Response(JSON.stringify(whRplTotalCount), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
