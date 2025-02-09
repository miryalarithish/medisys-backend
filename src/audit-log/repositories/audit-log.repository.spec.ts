import { Test, TestingModule } from "@nestjs/testing";
import { DeepPartial, Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import {
  getMockedClass,
  getProviders,
  MockedClass,
} from "src/utils/test-helpers/mocked-class";
import { AuditLogRepository } from "./audit-log.repository";
import { AuditLog } from "../entities/audit-log.entity";
import { Actions } from "../enum/action.enum";

describe("AuditLogRepository", () => {
  let repository: AuditLogRepository;
  let auditLogRepositoryMocked: MockedClass<Repository<AuditLog>>;
  let mockLogger: MockedClass<Logger>;

  beforeEach(async () => {
    auditLogRepositoryMocked = getMockedClass(Repository, AuditLog);
    mockLogger = getMockedClass(Logger);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogRepository,
        ...getProviders(mockLogger, auditLogRepositoryMocked),
      ],
    }).compile();

    repository = module.get<AuditLogRepository>(AuditLogRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });

  describe("createAuditLog", () => {
    it("should successfully create an audit log", async () => {
      const mockAuditLogData = {
        entityName: "Test Entity",
        action: Actions.CREATE,
        entityId: 1,
        performedById: 123,
        oldValue: {},
        newValue: {},
      } as AuditLog;

      auditLogRepositoryMocked.save.mockResolvedValue(mockAuditLogData);

      await repository.create(mockAuditLogData);

      expect(auditLogRepositoryMocked.save).toHaveBeenCalledWith(
        mockAuditLogData,
      );
    });

    it("should handle partial audit log data", async () => {
      const partialAuditLogData = {
        entityName: "Partial Entity",
      } as AuditLog;

      auditLogRepositoryMocked.save.mockResolvedValue(partialAuditLogData);

      await repository.create(partialAuditLogData);

      expect(auditLogRepositoryMocked.save).toHaveBeenCalledWith(
        partialAuditLogData,
      );
    });

    it("should throw an error if save operation fails", async () => {
      const mockAuditLogData: DeepPartial<AuditLog> = {
        entityName: "Test Entity",
      };

      const mockError = new Error("Database save error");
      auditLogRepositoryMocked.save.mockRejectedValue(mockError);

      await expect(repository.create(mockAuditLogData)).rejects.toThrow(
        "Database save error",
      );
      expect(auditLogRepositoryMocked.save).toHaveBeenCalledWith(
        mockAuditLogData,
      );
    });

    it("should handle creating audit log with complex data", async () => {
      const complexAuditLogData = {
        entityName: "Complex Entity",
        action: Actions.UPDATE,
        entityId: 42,
        performedById: 789,
        oldValue: {
          name: "Old Name",
          status: "Active",
        },
        newValue: {
          name: "New Name",
          status: "Inactive",
        },
        metaData: {
          updatedBy: {
            name: "Admin User",
            email: "admin@example.com",
          },
        },
      } as AuditLog;

      auditLogRepositoryMocked.save.mockResolvedValue(complexAuditLogData);

      await repository.create(complexAuditLogData);

      expect(auditLogRepositoryMocked.save).toHaveBeenCalledWith(
        complexAuditLogData,
      );
    });

    it("should return void after successful save", async () => {
      const mockAuditLogData: DeepPartial<AuditLog> = {
        entityName: "Void Test Entity",
      };

      auditLogRepositoryMocked.save.mockResolvedValue(undefined);

      const result = await repository.create(mockAuditLogData);

      expect(result).toBeUndefined();
      expect(auditLogRepositoryMocked.save).toHaveBeenCalledWith(
        mockAuditLogData,
      );
    });

    it("should log error when save operation fails", async () => {
      const mockAuditLogData: DeepPartial<AuditLog> = {
        entityName: "Error Logging Test",
      };

      const mockError = new Error("Database save error");
      auditLogRepositoryMocked.save.mockRejectedValue(mockError);

      await expect(repository.create(mockAuditLogData)).rejects.toThrow(
        "Database save error",
      );
    });
  });
});
