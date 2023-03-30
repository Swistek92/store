import { UserDocument } from "./../models/user.model";
import UserModel from "../models/user.model";
import { FilterQuery } from "mongoose";
import { LoginUser } from "../../config/interface";

const UserService = {
  addUser: async (user: UserDocument) => {
    return UserModel.create(user);
  },
  findUser: async (query: FilterQuery<UserDocument>, select?: string) => {
    return UserModel.findOne(query).select(select);
  },
  getAllUsers: async () => {
    return UserModel.find();
  },
};

export default UserService;
