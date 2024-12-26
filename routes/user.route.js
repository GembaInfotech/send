const router = require("express").Router();
const passport = require("passport");
const useragent = require("express-useragent");
const requestIp = require("request-ip");
const upload= require('../utils/UploadImage/upload')
const {
  addUser,
  signin,
  logout,
  refreshToken,
  getModProfile,
  getUser,
  updateInfo,
  changePassword,
  UploadUserProfile,
  sendProfile,
} = require("../controllers/user.controller");

const {
  getPublicUsers,
  followUser,
  getPublicUser,
  unfollowUser,
  getFollowingUsers,
} = require("../controllers/profile.controller");

const {addUserValidator,addUserValidatorHandler} = require("../middlewares/users/usersValidator");

const { sendVerificationEmail } = require("../middlewares/users/verifyEmail");

const {signUpSignInLimiter,followLimiter} = require("../middlewares/limiter/limiter");

const decodeToken = require("../middlewares/auth/decodeToken");
const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.route('/send-profile/:image').get(sendProfile);

router.get("/public-users/:id", requireAuth, decodeToken, getPublicUser);
router.get("/public-users",  getPublicUsers);
router.get("/moderator", requireAuth, decodeToken, getModProfile);
router.get("/following", requireAuth, decodeToken, getFollowingUsers);
router.get("/:id", getUser);

// router.post("/signup",signUpSignInLimiter,addUserValidator,addUserValidatorHandler,addUser);
router.post("/signup",signUpSignInLimiter,upload.single('profileImage'), addUser);

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

router.put("/UpdateInfo", decodeToken, updateInfo);

router.use(followLimiter);
router.patch("/:id/follow", requireAuth, decodeToken, followUser);
router.patch("/:id/unfollow", requireAuth, decodeToken, unfollowUser);

module.exports = router;
