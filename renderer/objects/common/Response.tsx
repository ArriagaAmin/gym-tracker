export interface Response<T> {
  code: number;
  error: boolean;
  messages: string[];
  data: T | null;
}
