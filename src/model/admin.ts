import { Entity } from 'typeorm';
import { User } from './user';

@Entity()
export class Admin extends User {}
