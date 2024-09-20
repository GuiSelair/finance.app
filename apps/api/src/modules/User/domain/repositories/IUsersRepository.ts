import { UserMapper } from '../../infra/typeorm/entities/UserMapper';
import { User } from '@modules/User/domain/models/User';

export interface IUsersRepository {
  create(data: User): Promise<UserMapper>;
  findByEmail(email: string): Promise<UserMapper | null>;
  findById(id: string): Promise<UserMapper | null>;
}
