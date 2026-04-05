export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return fallback;
}
