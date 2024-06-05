import { adminEndpointUrl } from 'mocks/properties';
import { http } from 'msw';

// export const handlers = [
//   rest.get(`https://or-ent-dev.algonomy.com/admin/api/v1/orgMapping/getOrgs`, (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         status: 1,
//         message: 'success',
//         data: {
//           orgDetails: [
//             {
//               name: 'Alothaim 1',
//               orgKey: 1
//             },
//             {
//               name: 'Alothaim 2',
//               orgKey: 2
//             }
//           ],
//           username: 'nimesha.e@algonomy.com'
//         }
//       })
//     );
//   }),

//   rest.post('https://or-ent-dev.algonomy.com/api/v1/getForecastConfigData', (req, res, ctx) => {
//     const payload = {
//       orgKeys: [1, 2, 3, 4]
//     };
//     return res(
//       ctx.status(200),
//       ctx.json({
//         status: 1,
//         message: '',
//         page: {
//           no: 1,
//           total: 20,
//           current: 1
//         },
//         data: [
//           {
//             groupDetails: {
//               groupName: 'Beverages',
//               groupKey: 1,
//               anchorCount: 500,
//               skuCount: 15000
//             },
//             trainingConfiguration: 'default',
//             influencingFactor: 'from database',
//             scheduled: '1 scheduled added',
//             trainedUpto: 1684318940,
//             forecastedFrom: 1684318940,
//             uuid: '6a3072c4-fb6f-4cf3-9136-f509b572ac49'
//           },
//           {
//             groupDetails: {
//               groupName: 'Beverages',
//               groupKey: 1,
//               anchorCount: 500,
//               skuCount: 15000
//             },
//             trainingConfiguration: 'default',
//             influencingFactor: 'from database',
//             scheduled: '1 scheduled added',
//             trainedUpto: 1684318940,
//             forecastedFrom: 1684318940,
//             uuid: 'd10385c0-a9a4-49b8-95c2-3062b68288fa'
//           }
//         ]
//       })
//     );
//   }),

//   rest.get('https://or-ent-dev.algonomy.com/api/v1/getTrainingConfiguration', (req, res, ctx) => {
//     const payload = {
//       orgKeys: [1, 2, 3, 4]
//     };
//     return res(
//       ctx.status(200),
//       ctx.json({
//         status: 1,
//         message: 'success',
//         data: {
//           predictors: [
//             {
//               predictorCode: 9,
//               predictorName: 'fitr_eid_ramdan',
//               predictorRank: 0,
//               direction: 'N',
//               booleanFlag: 0,
//               isActive: 1
//             },
//             {
//               predictorCode: 2,
//               predictorName: 'eid_fitr_days',
//               predictorRank: 0,
//               direction: 'N',
//               booleanFlag: 0,
//               isActive: 1
//             },
//             {
//               predictorCode: 3,
//               predictorName: 'eid_adha_days',
//               predictorRank: 0,
//               direction: 'N',
//               booleanFlag: 0,
//               isActive: 1
//             }
//           ],
//           algorithmSettings: {
//             algorithm_selection: {
//               default: false,
//               configuration: {
//                 ml_dl_algorithms: ['ML'],
//                 smoothing_algorithms: [],
//                 parametric_algorithms: [],
//                 ensemble_algorithms: []
//               }
//             },
//             advanced_configurations: {
//               cross_validation: true,
//               outlier_detection: false,
//               model_selection_criteria: 'RMSE',
//               exemption_periods: []
//             },
//             holidays_country: null,
//             penalized_error: {
//               application: true,
//               weight_matrix: []
//             },
//             start_date: '2023-01-06'
//           }
//         }
//       })
//     );
//   })
// ];

export const handlers = [
  http.get(`${adminEndpointUrl}/orgMapping/getOrgs`, () => {
    return new Response(
      JSON.stringify({
        status: 1,
        message: 'success',
        data: {
          orgDetails: [
            {
              name: 'Sample Organization Test 1',
              orgKey: 1
            },
            {
              name: 'Alothaim 2',
              orgKey: 2
            }
          ],
          username: 'nimesha.e@algonomy.com'
        }
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  })
];
