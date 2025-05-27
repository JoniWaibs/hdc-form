// jest.setup.ts
import "@testing-library/jest-dom";

global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.MockedFunction<typeof fetch>).mockClear();
});
