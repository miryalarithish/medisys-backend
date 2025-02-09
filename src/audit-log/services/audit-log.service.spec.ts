import { Test, TestingModule } from "@nestjs/testing";
import { AuditLogService } from "./audit-log.service";
import { AuditLogRepository } from "../repositories/audit-log.repository";
import { NotificationService } from "src/notification/services/notification.service";
import { PortalUserService } from "src/portal-user/services/portal-user.service";
import { WorkspaceService } from "src/workspace/services/workspace.service";
import {
  getMockedClass,
  getProviders,
  MockedClass,
} from "src/utils/test-helpers/mocked-class";

describe("AuditLogService", () => {
  let service: AuditLogService;
  let auditLogRepository: MockedClass<AuditLogRepository>;
  let notificationService: MockedClass<NotificationService>;
  let portalUserService: MockedClass<PortalUserService>;
  let workspaceService: MockedClass<WorkspaceService>;

  beforeEach(async () => {
    auditLogRepository = getMockedClass(AuditLogRepository);
    notificationService = getMockedClass(NotificationService);
    portalUserService = getMockedClass(PortalUserService);
    workspaceService = getMockedClass(WorkspaceService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogService,
        ...getProviders(
          auditLogRepository,
          notificationService,
          portalUserService,
          workspaceService,
        ),
      ],
    }).compile();

    service = module.get<AuditLogService>(AuditLogService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("create", () => {
    it("should create an audit log", async () => {
      const mockAuditLog = { entityName: "Test" };
      auditLogRepository.create.mockResolvedValue(mockAuditLog as any);

      const result = await service.create(mockAuditLog);

      expect(auditLogRepository.create).toHaveBeenCalledWith(mockAuditLog);
      expect(result).toEqual(mockAuditLog);
    });
  });
});
