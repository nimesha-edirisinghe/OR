import {
  getAlertSummaryResponse,
  getAlertResponse
} from 'mocks/fixtures/alertConfigurationMockData';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

export const handlers = [
  http.get(`${endpointUrl}/alert/getAlertSummary`, () => {
    return new Response(JSON.stringify(getAlertSummaryResponse), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/alert/getAlerts`, () => {
    return new Response(JSON.stringify(getAlertResponse), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
