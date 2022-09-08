//---------------------------------------------|
//           IS ADMIN
//---------------------------------------------|
const isAdmin = (req) => {
  if (req.user.role === "admin") {
    return true;
  }
};

//---------------------------------------------|
//           IS SUPER ADMIN
//---------------------------------------------|
const isSuperAdmin = (role, res) => {
  if (role === "superAdmin") {
    return true;
  } else {
    res.status(401).json({ err: "This action available for super admin only" });
    return false;
  }
};

//---------------------------------------------|
//           IS ADMIN AND SUPER ADMIN
//---------------------------------------------|
const isAdminAndSuperAdmin = (req) => {
  if (req.user.role === "admin" || req.user.role === "superAdmin") {
    return true;
  }
};

//---------------------------------------------|
//           IS USER
//---------------------------------------------|
const isUser = (req) => {
  if (req.user.role === "user") {
    return true;
  }
};

//---------------------------------------------|
//           IS NOT USER
//---------------------------------------------|
const notUser = (req) => {
  if (req.user.role !== "user") {
    return true;
  }
};

//---------------------------------------------|
//           IS NOT OWENER
//---------------------------------------------|
const notOwner = (req, res, modelOwener, modelName) => {
  if (modelOwener.toString() !== req.user.id) {
    res
      .status(401)
      .json({ notOwner: `You are not owner of this ${modelName}` });
    return true;
  }
};

//---------------------------------------------|
//           EXPORT MODULES
//---------------------------------------------|
module.exports = {
  isAdmin,
  isAdminAndSuperAdmin,
  notOwner,
  isSuperAdmin,
  isUser,
  notUser,
};
