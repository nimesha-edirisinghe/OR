import {
  demandBulkEditMockData,
  viewForecastGraph,
  viewForecastMockData
} from 'mocks/fixtures/viewForecast';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

export const handlers = [
  http.post(`${endpointUrl}/forecast/view/sku/list`, () => {
    return new Response(JSON.stringify(viewForecastMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/view/data`, () => {
    return new Response(JSON.stringify(viewForecastMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/view/graph`, () => {
    return new Response(JSON.stringify(viewForecastGraph), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/edit/get/history`, () => {
    return new Response(JSON.stringify(demandBulkEditMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
