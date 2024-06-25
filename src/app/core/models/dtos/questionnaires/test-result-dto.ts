export interface TestResult {
    test_id: number
    child_id: number
    child_name: string
    psychologist_cedula: string
    child_age: number
    scholar_grade: number
    child_sex: string
    test_sender: string
    test_reason: string
    date_time_of_answer: string
    answers_set: AnswersSet[]
    test_results: TestResults
  }
  
  export interface AnswersSet {
    value: boolean
    time_taken: number
    question_id: string
  }
  
  export interface TestResults {
    worry_index: number
    defensiveness_index: number
    total_anxiety_index: number
    social_anxiety_index: number
    inconsistent_answers_index: number
    physiological_anxiety_index: number
  }
  