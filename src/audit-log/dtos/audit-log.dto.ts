import { Actions } from '../enum/action.enum';

export class AuditLogsCreateDto {
  entityName: string;
  entityId: number;
  action: Actions;
  oldValue: object;
  newValue: object;
  metaData: object;
  performedById: number;
  comments?: string;
}
