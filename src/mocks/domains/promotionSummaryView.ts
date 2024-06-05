import { promotionSummaryViewMockData } from 'mocks/fixtures/promotionSummaryViewMockData';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

export const handlers = [
  http.post(`${endpointUrl}/promotions/list`, () => {
    return new Response(JSON.stringify(promotionSummaryViewMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
