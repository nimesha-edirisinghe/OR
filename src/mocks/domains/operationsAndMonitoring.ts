// import { rest } from 'msw';
// import {
//   activityLogDataResponse,
//   activityLogFilterCountResponse,
//   activityLogFilterDataResponse,
//   activityLogStatusSummary
// } from 'mocks/fixtures/operationsAndMonitoringMockData';

// export const handlers = [
//   rest.post(
//     'https://or-ent-dev.algonomy.com/api/v1/activityLog/list?pageNumber=1&pageSize=50&orgKey=1&sort=ASC',
//     (req, res, ctx) => {
//       return res(ctx.status(200), ctx.json(activityLogDataResponse));
//     }
//   ),
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/activityLog/filter/count', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(activityLogFilterCountResponse));
//   }),
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/activityLog/filter/data', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(activityLogFilterDataResponse));
//   }),
//   rest.get(
//     'https://or-ent-dev.algonomy.com/api/v1/activityLog/summary/details',
//     (req, res, ctx) => {
//       return res(ctx.status(200), ctx.json(activityLogStatusSummary));
//     }
//   )
// ];
export const handlers = [];