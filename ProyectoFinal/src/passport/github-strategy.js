import UserDao from "../daos/mongodb/userDao.js";
import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";

const userDao = new UserDao();

const strategyOptions = {
  clientID: "Iv1.cac6b468dd768572",
  clientSecret: "341dfe25a4b3a2a5276c283da5599954e42ea8fd",
  callbackURL: "http://localhost:8080/users/profile-github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  //   console.log("profile-->", profile);
  const email =
    profile._json.email !== null ? profile._json.email : profile._json.blog;
  const user = await userDao.getByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.registerUser({
    first_name: profile._json.name.split(" ")[0],
    last_name: profile._json.name.split(" ")[1],
    email,
    password: "",
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
