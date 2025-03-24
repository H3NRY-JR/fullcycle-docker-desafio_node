import { faker } from "@faker-js/faker";

export class NameGenerator {
  static generate() {
    return faker.person.fullName();
  }
}
