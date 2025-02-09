import { Logger, Module } from "@nestjs/common";
import { AuditLog } from "./entities/audit-log.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditLogService } from "./services/audit-log.service";
import { AuditLogRepository } from "./repositories/audit-log.repository";
import { AuditLogController } from "./controllers/audit-log.controller";

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [AuditLogController],
  providers: [AuditLogService, AuditLogRepository, Logger],
  exports: [AuditLogService],
})
export class AuditLogsModule {}
