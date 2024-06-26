import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnxietyScoreService {
  private scoreTable: { [key: number]: { [key: number]: number } } = {
    // Llena esta tabla con los valores de acuerdo a la imagen proporcionada
    // 1 -> DEF     2-> FIS   3->INQ    4->SOC  5-> TOT
    1: { 0: 29, 1: 34, 2: 38, 3: 42, 4: 45, 5: 49, 6: 52, 7: 57, 8: 62, 9: 71 },
    2: {
      0: 29,
      1: 35,
      2: 38,
      3: 41,
      4: 44,
      5: 48,
      6: 51,
      7: 54,
      8: 58,
      9: 61,
      10: 65,
      11: 68,
      12: 73,
      13: 73,
      14: 73,
      15: 73,
      16: 73,
      17: 73,
      18: 73,
      19: 73,
    },
    3: {
      0: 29,
      1: 34,
      2: 37,
      3: 39,
      4: 41,
      5: 44,
      6: 47,
      7: 49,
      8: 52,
      9: 54,
      10: 57,
      11: 59,
      12: 61,
      13: 63,
      14: 65,
      15: 68,
      16: 73,
    },
    4: {
      0: 33,
      1: 38,
      2: 41,
      3: 45,
      4: 48,
      5: 52,
      6: 54,
      7: 57,
      8: 60,
      9: 63,
      10: 66,
      11: 68,
      12: 73,
      13: 73,
      14: 73,
      15: 73,
    },
    5: {
      0: 29,
      1: 34,
      2: 32,
      3: 33,
      4: 34,
      5: 35,
      6: 36,
      7: 37,
      8: 38,
      9: 39,
      10: 40,
      11: 42,
      12: 43,
      13: 44,
      14: 45,
      15: 47,
      16: 48,
      17: 49,
      18: 51,
      19: 52,
      20: 53,
      21: 55,
      22: 56,
      23: 57,
      24: 58,
      25: 59,
      26: 60,
      27: 61,
      28: 61,
      29: 62,
      30: 63,
      31: 64,
      32: 65,
      33: 66,
      34: 67,
      35: 68,
      36: 69,
      37: 70,
      38: 71,
      39: 73,
      40: 75,
      41: 75,
      42: 75,
      43: 75,
      44: 75,
      45: 75,
      46: 75,
      47: 75,
      48: 75,
      49: 75,
      50: 75,
    },
    // Agrega más edades y sus respectivos valores
  };

  constructor() {}

  getTScore(
    anxietyIndex: number,
    score: number,
  ): number | null {
      return this.scoreTable[anxietyIndex][score];
  }
}
