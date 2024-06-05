import { dataIngestionSummaryViewMockData } from 'mocks/fixtures/dataIngestionSummaryViewMockData';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

export const handlers = [
  http.post(`${endpointUrl}/activityLog/etl/status`, () => {
    return new Response(JSON.stringify(dataIngestionSummaryViewMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
