import type { PersonDTORequest } from "./PersonDTORequest.model";

export interface StudentDTORequest extends PersonDTORequest {
    studentNumber: string;
    photo: string | null;
}