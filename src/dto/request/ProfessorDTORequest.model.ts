import type { PersonDTORequest } from "./PersonDTORequest.model";

export interface ProfessorDTORequest extends PersonDTORequest {
    salary: number;
}