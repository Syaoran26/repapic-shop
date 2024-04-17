interface ErrorResponse {
  success: true;
  status: number;
  message: string;
  stack: string;
}

export default ErrorResponse;
