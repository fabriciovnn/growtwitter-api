import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";
import prisma from "../../src/repositories/prisma.connection";
jest.mock("../../src/repositories/prisma.connection", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));
beforeEach(() => {
  mockReset(prismaMock);
});
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
