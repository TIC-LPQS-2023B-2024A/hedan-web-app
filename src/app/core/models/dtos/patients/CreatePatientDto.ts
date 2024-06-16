import { Sex } from '../../enums/sex-enum';

export interface CreatePatientDto {
    name: string;
    sex: Sex;
    birthdate: Date;
    scholar_grade: number;
    test_reason: string;
    test_sender: string;
}