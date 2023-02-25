import MemModel, { MemDocument } from "../models/mem.model";

export async function addMem(mem: MemDocument) {
  return MemModel.create(mem);
}
