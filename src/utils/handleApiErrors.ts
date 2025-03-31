import axios from "axios";

const ApiError = {
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  InternalServerError: 500,
  ServiceUnavailable: 503,
};

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;

    switch (status) {
      case ApiError.BadRequest:
        return "BAD_REQUEST";
      case ApiError.Unauthorized:
        return "UNAUTHORIZED";
      case ApiError.NotFound:
        return "NOT_FOUND";
      case ApiError.InternalServerError:
        return "INTERNAL_SERVER_ERROR";
      case ApiError.ServiceUnavailable:
        return "SERVICE_UNAVAILABLE";
      default:
        return `API error with status ${status}`;
    }
  } else {
    return "Unexpected error while calling API";
  }
}
