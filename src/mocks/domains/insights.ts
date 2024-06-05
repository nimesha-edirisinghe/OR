// import { rest } from 'msw';
// import {
//   summaryDetails,
//   inventoryReportData,
//   projectionData,
//   demandForecastReportData,
//   filterCountData,
//   filterData,
//   inventoryOOSReportData
// } from '../fixtures/insightMockData';

// export const handlers = [
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/dashboard/summary', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(summaryDetails));
//   }),
//   rest.post(
//     'https://or-ent-dev.algonomy.com/api/v1/dashboard/inventory/report',
//     (req, res, ctx) => {
//       return res(ctx.status(200), ctx.json(inventoryReportData));
//     }
//   ),
//   rest.post(
//     'https://or-ent-dev.algonomy.com/api/v1/dashboard/inventory/oos/report',
//     (req, res, ctx) => {
//       return res(ctx.status(200), ctx.json(inventoryOOSReportData));
//     }
//   ),
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/dashboard/inventory/cards', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(projectionData));
//   }),
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/dashboard/df/report', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(demandForecastReportData));
//   }),
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/dashboard/filters/count', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(filterCountData));
//   }),
//   rest.post('https://or-ent-dev.algonomy.com/api/v1/dashboard/filters/data', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(filterData));
//   })
// ];

export const handlers = [];
