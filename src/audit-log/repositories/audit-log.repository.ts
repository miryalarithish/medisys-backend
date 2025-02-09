import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditLog } from "../entities/audit-log.entity";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AuditLogRepository {
  constructor(
    @InjectRepository(AuditLog)
    private repository: Repository<AuditLog>,
  ) {}

  async create(auditLog: DeepPartial<AuditLog>): Promise<void> {
    await this.repository.save(auditLog);
  }
}
