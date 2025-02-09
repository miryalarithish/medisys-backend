import { PortalUser } from 'src/portal-user/entities/portal-user.entity';
import { Actions } from '../enum/action.enum';
import { Base } from 'src/common/entities/base.entity';

@Entity({ name: 'audit_logs' })
export class AuditLog extends Base {
  @Column({ name: 'entity_name', type: 'varchar', length: 128 })
  entityName: string;

  @Column({ name: 'entity_id' })
  entityId: number;

  @Column({ name: 'associated_entity_name', type: 'varchar', length: 128 })
  associatedEntityName: string;

  @Column({ name: 'associated_entity_id' })
  associatedEntityId: number;

  @Column({ name: 'action', type: 'enum', enum: Actions, nullable: false })
  action: Actions;

  @Column({ name: 'old_value', type: 'jsonb', nullable: true })
  oldValue: object;

  @Column({ name: 'new_value', type: 'jsonb', nullable: true })
  newValue: object;

  @Column({ name: 'comments', type: 'text', nullable: true })
  comments: string;

  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metaData: object;

  @Column({ name: 'performed_by_id' })
  performedById: number;

  @ManyToOne(() => PortalUser, (portalUser) => portalUser.auditLogs, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'performed_by_id' })
  portalUser: PortalUser;
}
