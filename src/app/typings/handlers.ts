/**
 * @deprecated This interface is used to return the result of the handler.
 */
export interface HandlerResult<T> {
  message: string;
  data?: T;
}
