const router = require("express").Router();
const passport = require("passport");
const useragent = require("express-useragent");
const requestIp = require("request-ip");
const upload = require('../utils/UploadImage/upload')
const {
  addUser,
  signin,
  logout,
  refreshToken,
  getModProfile,
  getUser,
  updateInfo,
  changePassword,
  UploadUserProfile

} = require("../controllers/user.controller");

const { addUserValidator, addUserValidatorHandler } = require("../middlewares/users/usersValidator");

const { sendVerificationEmail } = require("../middlewares/users/verifyEmail");

const { signUpSignInLimiter, followLimiter } = require("../middlewares/limiter/limiter");

const decodeToken = require("../middlewares/auth/decodeToken");
const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.get("/:id", requireAuth, getUser);

router.post("/signup", signUpSignInLimiter, addUserValidator, addUserValidatorHandler, addUser, sendVerificationEmail);
router.post("/refresh-token", refreshToken);
router.post("/changePassword", decodeToken, changePassword);
router.post("/UploadUserProfile", decodeToken, upload.single('profileImage'), UploadUserProfile);

router.post(
  "/signin",
  signUpSignInLimiter,
  requestIp.mw(),
  useragent.express(),
  signin,

);
router.post("/logout", logout);

router.put("/UpdateInfo", requireAuth, decodeToken, updateInfo);



module.exports = router;
