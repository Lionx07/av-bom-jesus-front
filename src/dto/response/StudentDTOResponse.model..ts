import type { PersonDTOResponse } from "./PersonDTOResponse.model";

export interface StudentDTOResponse extends PersonDTOResponse {
    studentNumber: string;
    photo: string | null;
}