export interface InconsistentResponsesDTO {
    pairs: Pairs[],
    inconsistency_index: number
}

export interface Pairs {
    id_1: number
    answer_1: boolean
    id_2: number
    answer_2: boolean
    add_score: boolean
}