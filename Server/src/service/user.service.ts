import { UserDocument } from "./../models/user.model";
import UserModel from "../models/user.model";
import { FilterQuery } from "mongoose";

export async function addUser(user: UserDocument) {
  return UserModel.create(user);
}

export async function findUserAccount(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query);
}

export async function getAllUsers() {
  return UserModel.find();
}
