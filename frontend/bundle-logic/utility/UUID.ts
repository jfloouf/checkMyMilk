import { v4 as uuid } from "uuid";
import isUUID from "validator/lib/isUUID";
import assert from "../testing/Assert";
import { ValueObject } from "../types/ValueObject";

class UUID implements ValueObject<string> {
  constructor(readonly value: string) {
    assert(UUID.validate(value));
  }

  static generate(): UUID {
    const id = uuid();
    assert(this.validate(id));
    return new UUID(id);
  }

  static validate(id: string): boolean {
    try {
      return isUUID(id, 4);
    } catch (error) {
      return false;
    }
  }

  matches(uuid: UUID): boolean {
    return this.value === uuid.value;
  }
}

export default UUID;
