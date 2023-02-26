import UserModel from "../models/user.model";

export async function findUserAccount(account: string) {
  return UserModel.findOne({ account });
}
