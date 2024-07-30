import { TestResults } from "./test-result.dto";
export interface TestsReportDto {
  id: number;
  child_id: number;
  child_name: string;
  psychologist_cedula: string;
  test_session_id: number;
  child_age: number;
  scholar_grade: number;
  child_sex: string;
  date_time_of_answer: Date;
  test_results: TestResults;
  time_taken: number;
}
