const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    res.json({ message: "You are already logged in" });
    return;
  };
  next();
};

const isAllowed = (req, res, next) => {
  if (!req.session.userId) {
    res.json({ error: "You don't have enough access to do this" });
    return;
  };
  next();
};

export { isAuthenticated, isAllowed };