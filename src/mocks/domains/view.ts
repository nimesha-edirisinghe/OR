// import { rest } from 'msw';
// import { csvData, groupListResponse } from 'mocks/fixtures/viewMockData';

// export const handlers = [
//   rest.get('https://or-ent-dev.algonomy.com/api/v1/replenishment/group/list', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(groupListResponse));
//   }),
//   rest.post(
//     'https://or-ent-dev.algonomy.com/api/v1/dashboard/downloadForecastReport?orgKey=1',
//     (req, res, ctx) => {
//       return res(
//         ctx.set('Content-Disposition', 'attachment; filename="data.csv"'),
//         ctx.status(200),
//         ctx.text(csvData)
//       );
//     }
//   ),
//   rest.post(
//     'https://or-ent-dev.algonomy.com/api/v1/replenishment/downloadInventoryReport?orgKey=1',
//     (req, res, ctx) => {
//       return res(
//         ctx.set('Content-Disposition', 'attachment; filename="data.csv"'),
//         ctx.status(200),
//         ctx.text(csvData)
//       );
//     }
//   )
// ];

export const handlers = [];
