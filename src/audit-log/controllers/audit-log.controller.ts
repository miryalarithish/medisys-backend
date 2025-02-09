import {
  Body,
  Controller,
  Header,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuditLogService } from '../services/audit-log.service';
import { AuditLogsCreateDto } from '../dtos/audit-log.dto';
import { validateAuditLog } from '../validators/audit-log.validator';
import {
  HttpHeaders,
  ContentTypes,
  ClientStatus,
} from 'src/common/enums/api-config.enum';
import { BaseResponseDto } from 'src/common/dtos/base-response.dto';
import { ValidationPipe } from 'src/utils/pipes/common.pipe';
import { SUCCESS_STRINGS } from 'src/common/constants/constants';

@Controller('api/audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post('/')
  @Header(HttpHeaders.CONTENT_TYPE, ContentTypes.JSON)
  async createAuditLog(
    @Body(new ValidationPipe(validateAuditLog))
    auditLogData: AuditLogsCreateDto,
    @Res() res: Response<BaseResponseDto>,
  ) {
    await this.auditLogService.create(auditLogData);
    return res.status(HttpStatus.OK).send({
      code: ClientStatus.SUCCESS,
      message: SUCCESS_STRINGS.AUDIT_LOG_CREATED_SUCCESS,
    });
  }
}
