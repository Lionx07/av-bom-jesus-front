import { type PersonDTOResponse } from './PersonDTOResponse.model';

export interface ProfessorDTOResponse extends PersonDTOResponse {
    salary: number;
}