export class CommerceError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "VALIDATION"
      | "CONFIG"
      | "NOT_FOUND"
      | "FORBIDDEN"
      | "RATE_LIMIT"
      | "PROVIDER",
  ) {
    super(message);
    this.name = "CommerceError";
  }
}
