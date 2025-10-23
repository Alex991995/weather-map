export interface ErrorResponse {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: string;
}

export interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate: any;
}

export interface NormalizedNames {}
