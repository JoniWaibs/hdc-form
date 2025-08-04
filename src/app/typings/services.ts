import { HandlerResult } from "./handlers";

export interface ApiServiceResult<T> extends HandlerResult<T> {
  success: boolean;
}
