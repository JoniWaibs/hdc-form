// jest.config.ts
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // path a tu proyecto
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
  },
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/__tests__/**/*.(spec|test).(ts|tsx)"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
};

export default createJestConfig(customJestConfig);
