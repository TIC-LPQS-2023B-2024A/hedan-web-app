import { Sex } from '../../enums/sex-enum';

export interface CreatePatientDto {
    name: string;
    sex: Sex;
    birthdate: Date;
    scholar_grade: number;
    reason: string;
    sender: string;
}