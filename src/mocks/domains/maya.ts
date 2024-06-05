import { chatResponse, getContextResponse } from 'mocks/fixtures/mayaMockData';
import { genAiEndpointUrl } from 'mocks/properties';
import { http } from 'msw';

export const handlers = [
  http.get(`${genAiEndpointUrl}/context/get`, () => {
    return new Response(JSON.stringify(getContextResponse), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${genAiEndpointUrl}/conversation/chat`, () => {
    return new Response(JSON.stringify(chatResponse), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
