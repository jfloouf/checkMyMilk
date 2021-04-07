import { notNull } from "./NullCheck";

function assert(obj: any, message?: string) {
  if (!notNull(obj)) {
    throw new AssertionError(message);
  }
}

class AssertionError extends Error {
  constructor(message?: string) {
    const msg = message || "Assertion failed.";
    super(msg);
  }
}

export default assert;
