import type { AddressDTOResponse } from "./AddressDTOResponse.model.";

export interface PersonDTOResponse {
    id: number;
    name: string;
    phoneNumeber: string;
    emailAddress: string;
    status: string;
    addresses: AddressDTOResponse[];
}