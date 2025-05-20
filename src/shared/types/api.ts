export type ApiResponse<T> = {
   status: number;
   msg: string;
   data: T;
};
