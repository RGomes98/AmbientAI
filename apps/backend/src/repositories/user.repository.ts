import type { PrismaClient } from '@prisma/client';

import type { UserCreate } from '../domain/user/user.type';

export class UserRepository {
  constructor(private db: PrismaClient) {}

  public async create(data: UserCreate) {
    return await this.db.user.create({ data: { ...data }, omit: { password: true } });
  }

  public async findById(id: string) {
    return await this.db.user.findUnique({ where: { id }, omit: { password: true } });
  }

  public async findByEmail(email: string) {
    return await this.db.user.findUnique({ where: { email } });
  }

  public async findAll() {
    return await this.db.user.findMany({ omit: { password: true } });
  }

  public async update(id: string, data: UserCreate) {
    return await this.db.user.update({ where: { id }, data: data, omit: { password: true } });
  }

  public async delete(id: string) {
    return await this.db.user.delete({ where: { id }, omit: { password: true } });
  }
}
