import { userModel } from "./model/userModel.js";

export default class UserDao {
  async registerUser(user) {
    try {
      const { email , password} = user;
      const existUser = await userModel.findOne({ email });
      console.log('existUser::', existUser);
      if (!existUser) {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          const newUser = await userModel.create({ ...user, role: "admin" });
          return newUser;
        }
        const newUser = await userModel.create(user);
        return newUser;
      } else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await userModel.findOne({ email, password });
      if (userExist) return userExist;
      else return false;
    } catch (error) {
      console.log(error);
    }
  }
}
