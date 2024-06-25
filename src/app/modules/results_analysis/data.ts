import { TestsReportDto } from '../../../app/core/models/rest/dtos/response/get-test-report.dto';

 export const TEST_DATA: TestsReportDto[] = [
//     {
//       id: 1,
//       childId: 101,
//       testSessionId: 1001,
//       psychologistCedula: 'ABC123',
//       childAge: 7,
//       scholarGrade: 4,
//       sex: 'm',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 8,
//         physiological_anxiety_index: 12,
//         defensiveness_index: 0,
//         worry_index: 15,
//         total_anxiety_index: 40,
//         inconsistent_answers_index: 6
//       }
//     },
//     {
//       id: 2,
//       childId: 102,
//       testSessionId: 1002,
//       psychologistCedula: 'DEF456',
//       childAge: 8,
//       scholarGrade: 5,
//       sex: 'f',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 10,
//         physiological_anxiety_index: 10,
//         defensiveness_index: 1,
//         worry_index: 14,
//         total_anxiety_index: 40,
//         inconsistent_answers_index: 16
//       }
//     },
//     {
//       id: 3,
//       childId: 103,
//       testSessionId: 1003,
//       psychologistCedula: 'GHI789',
//       childAge: 6,
//       scholarGrade: 4,
//       sex: 'm',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 7,
//         physiological_anxiety_index: 11,
//         defensiveness_index: 5,
//         worry_index: 13,
//         total_anxiety_index: 36,
//         inconsistent_answers_index: 1
//       }
//     },
//     {
//       id: 4,
//       childId: 104,
//       testSessionId: 1004,
//       psychologistCedula: 'JKL012',
//       childAge: 7,
//       scholarGrade: 5,
//       sex: 'm',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 9,
//         physiological_anxiety_index: 14,
//         defensiveness_index: 4,
//         worry_index: 12,
//         total_anxiety_index: 39,
//         inconsistent_answers_index: 2
//       }
//     },
//     {
//       id: 5,
//       childId: 105,
//       testSessionId: 1005,
//       psychologistCedula: 'MNO345',
//       childAge: 8,
//       scholarGrade: 6,
//       sex: 'f',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 6,
//         physiological_anxiety_index: 9,
//         defensiveness_index: 2,
//         worry_index: 10,
//         total_anxiety_index: 32,
//         inconsistent_answers_index: 4
//       }
//     },
//     {
//       id: 6,
//       childId: 106,
//       testSessionId: 1006,
//       psychologistCedula: 'PQR678',
//       childAge: 6,
//       scholarGrade: 4,
//       sex: 'm',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 8,
//         physiological_anxiety_index: 13,
//         defensiveness_index: 3,
//         worry_index: 15,
//         total_anxiety_index: 42,
//         inconsistent_answers_index: 6
//       }
//     },
//     {
//       id: 7,
//       childId: 107,
//       testSessionId: 1007,
//       psychologistCedula: 'STU901',
//       childAge: 7,
//       scholarGrade: 5,
//       sex: 'f',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 11,
//         physiological_anxiety_index: 12,
//         defensiveness_index: 1,
//         worry_index: 16,
//         total_anxiety_index: 43,
//         inconsistent_answers_index: 7
//       }
//     },
//     {
//       id: 8,
//       childId: 108,
//       testSessionId: 1008,
//       psychologistCedula: 'VWX234',
//       childAge: 8,
//       scholarGrade: 6,
//       sex: 'm',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 9,
//         physiological_anxiety_index: 10,
//         defensiveness_index: 5,
//         worry_index: 14,
//         total_anxiety_index: 38,
//         inconsistent_answers_index: 3
//       }
//     },
//     {
//       id: 9,
//       childId: 109,
//       testSessionId: 1009,
//       psychologistCedula: 'YZA567',
//       childAge: 6,
//       scholarGrade: 4,
//       sex: 'm',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 10,
//         physiological_anxiety_index: 11,
//         defensiveness_index: 6,
//         worry_index: 15,
//         total_anxiety_index: 42,
//         inconsistent_answers_index: 5
//       }
//     },
//     {
//       id: 10,
//       childId: 110,
//       testSessionId: 1010,
//       psychologistCedula: 'BCD890',
//       childAge: 7,
//       scholarGrade: 5,
//       sex: 'f',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 8,
//         physiological_anxiety_index: 9,
//         defensiveness_index: 1,
//         worry_index: 13,
//         total_anxiety_index: 35,
//         inconsistent_answers_index: 6
//       }
//     },
//     {
//       id: 11,
//       childId: 111,
//       testSessionId: 1011,
//       psychologistCedula: 'EFG123',
//       childAge: 8,
//       scholarGrade: 6,
//       sex: 'm',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 7,
//         physiological_anxiety_index: 10,
//         defensiveness_index: 2,
//         worry_index: 12,
//         total_anxiety_index: 33,
//         inconsistent_answers_index: 1
//       }
//     },
//     {
//       id: 12,
//       childId: 112,
//       testSessionId: 1012,
//       psychologistCedula: 'HIJ456',
//       childAge: 6,
//       scholarGrade: 4,
//       sex: 'f',
//       dateTimeOfAnswer: new Date(),
//       testResults: {
//         social_anxiety_index: 9,
//         physiological_anxiety_index: 13,
//         defensiveness_index: 1,
//         worry_index: 14,
//         total_anxiety_index: 42,
//         inconsistent_answers_index: 1
//       }
//     }
  ];
