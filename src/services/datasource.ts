import { Student } from "@/models/Studdent";

export class DataSource {
  constructor() {}

  async createStudent(student: Student) {
    console.log({ student })
    return { ok: true }
  }
}
