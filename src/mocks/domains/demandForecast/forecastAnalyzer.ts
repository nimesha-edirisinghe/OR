import {
  aggregatedGraphMockData,
  distributionAccuracyMockData,
  exclusionCriteriaMockData,
  fcAnalyzerKpiAccuracyMockData,
  individualGraphMockData,
  kpiMockData,
  plannedActualMockData,
  skuMockData
} from 'mocks/fixtures/demandForecast/forecastAnalyzer';
import { endpointUrl } from 'mocks/properties';
import { http } from 'msw';

export const handlers = [
  http.post(`${endpointUrl}/forecast/analyzer/kpi/accuracy`, () => {
    return new Response(JSON.stringify(fcAnalyzerKpiAccuracyMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/analyzer/individual/graph`, () => {
    return new Response(JSON.stringify(individualGraphMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/analyzer/aggregated/graph`, () => {
    return new Response(JSON.stringify(aggregatedGraphMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/analyzer/exclusion/criteria`, () => {
    return new Response(JSON.stringify(exclusionCriteriaMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/analyzer/planned/actual`, () => {
    return new Response(JSON.stringify(plannedActualMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/analyzer/kpis`, () => {
    return new Response(JSON.stringify(kpiMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/analyzer/sku/details`, () => {
    return new Response(JSON.stringify(skuMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post(`${endpointUrl}/forecast/analyzer/accuracy/distribution`, () => {
    return new Response(JSON.stringify(distributionAccuracyMockData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
