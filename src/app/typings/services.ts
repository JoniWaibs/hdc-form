import { HandlerResult } from "./handlers";

/**
 * @deprecated This interface is used to return the result of the service.
 */
export interface ApiServiceResult<T> extends HandlerResult<T> {
  success: boolean;
}
