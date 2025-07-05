const originalEnv = process.env;

const mockCreateClient = jest.fn();
jest.mock("@supabase/supabase-js", () => ({
  createClient: (...args: unknown[]) => {
    mockCreateClient(...args);
    return {};
  },
}));

describe("Supabase", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://test-url.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test("should initialize with createClient using correct arguments", async () => {
    const { DataSource } = await import("@/services/datasource");
    new DataSource();
    expect(mockCreateClient).toHaveBeenCalledWith(
      "https://test-url.supabase.co",
      "test-anon-key",
    );
  });
});
