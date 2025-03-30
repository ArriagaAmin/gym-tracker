import { Response } from "@objects";

export function default_error(message: string): Response<null> {
  return {
    code: 500,
    error: true,
    messages: [message],
    data: null,
  };
}
