const users = [
  { username: "admin", password: 1234, admin: true },
  { username: "user0", password: "qwerty", admin: false },
  { username: "user1", password: 1234, admin: false },
  { username: "user2", password: 1234, admin: false },
];

export const login = (req, res) => {
  const { username, password } = req.body;
  const index = users.findIndex(
    (user) => user.username === username && user.password === password
  );
  if (index < 0) res.json({ error: "User not found" });
  else {
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      count: 1,
      admin: user.admin,
      username: user.username,
    };
    res.json({ msg: `Bienvenido ${user.username}` });
  }
};

export const visit = (req, res) => {
  req.session.info.count++;
  res.json({
    msg: `${req.session.info.username} visited this may times ${req.session.info.count}`,
  });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.json({ msg: "Logout OK" });
    else res.json({ msg: err });
  });
};

export const infoSession = (req, res) => {
  res.json({
    session: req.session,
    sessionId: req.sessionId,
    cookies: req.cookies,
  });
};
