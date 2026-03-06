import type { AddressDTORequest } from "./AddressDTORequest.model";

export interface PersonDTORequest {
    type: string;
    id: number;
    name: string;
    phoneNumber: string;
    emailAddress: string;
    status: string;
    addresses: AddressDTORequest[];
}