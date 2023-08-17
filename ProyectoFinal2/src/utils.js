import { dirname } from "path";
import { fileURLToPath } from "url";
import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const __dirname = dirname(fileURLToPath(import.meta.url));

// BCRYPT

export const createHash = password => {
  const hashPass = hashSync(password, genSaltSync(10));
  return hashPass
};
export const isValidPassword = (user, password) => {
  // console.log(password, user.password);
  const eqHashPass = compareSync(password, user.password);
  return eqHashPass
};

export const isAuth = (req, res, next) => {
  console.log(req.session.passport.user);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) return next();
  res.status(401).send({ msg: "Unauthorized" });
};

// client secret 341dfe25a4b3a2a5276c283da5599954e42ea8fd
