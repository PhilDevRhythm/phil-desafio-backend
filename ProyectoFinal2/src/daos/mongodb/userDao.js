import { userModel } from "./models/userModel.js";
import { createHash, isValidPassword } from "../../utils.js";

export default class UserDao {
  async registerUser(user) {
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);
      // console.log("existUser::", existUser);
      // console.log(existUser.password);
      if (!existUser) {
        if (email === "admin@tech.cl" && password === "AdM1nDeM0") {
          return await userModel.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
        }
        return await userModel.create({
          ...user,
          password: createHash(password),
        });
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        console.log(userExist.password);
        console.log(user);
        const passValid = isValidPassword(userExist, password);
        console.log(passValid);
        if (!passValid) return false;
        else return userExist;
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const userExist = await userModel.findById(id);
      if (userExist) return userExist;
      else return false;
    } catch (error) {
      console.log(error);
      // throw new Error(error)
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await userModel.findOne({ email });
      // console.log(userExist);
      if (userExist) return userExist;
      else return false;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
