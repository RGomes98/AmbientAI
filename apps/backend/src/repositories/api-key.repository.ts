import type { PrismaClient } from '../generated/prisma';

export class ApiKeyRepository {
  constructor(private db: PrismaClient) {}

  public async findByHashedKey(hashedKey: string) {
    return await this.db.apiKey.findUnique({
      where: { hashedKey },
      select: { user: { select: { id: true, role: true } } },
    });
  }
}
