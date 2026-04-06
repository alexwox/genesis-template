export class PaymentsError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "CONFIG"
      | "NOT_FOUND"
      | "FORBIDDEN"
      | "UNAUTHORIZED"
      | "PROVIDER"
      | "VALIDATION",
  ) {
    super(message);
    this.name = "PaymentsError";
  }
}
