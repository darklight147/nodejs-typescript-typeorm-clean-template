import { Role } from './role.enum';

export interface IPayload {
	userId: string;
	role: Role;
}
