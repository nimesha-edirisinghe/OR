import { lastUpdatedDataResponse } from 'mocks/fixtures/common/common';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

export const handlers = [
  http.post(`${endpointUrl}/common/last/update`, () => {
    return new Response(JSON.stringify(lastUpdatedDataResponse), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
