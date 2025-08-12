import { PostgrestError } from "@supabase/supabase-js";

export class DatabaseError extends PostgrestError {
  public readonly code: string;
  public readonly details: string;
  public readonly hint: string;
  public readonly message: string;

  constructor(error: PostgrestError) {
    super({
      message: error.message,
      details: error.details || "No details provided",
      hint: error.hint || "No hint provided",
      code: error.code || "INTERNAL_ERROR",
    });
    this.name = "DatabaseError";
    this.code = error.code;
    this.details = error.details;
    this.hint = error.hint;
    this.message = error.message;
  }
}
