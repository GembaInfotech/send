const router = require("express").Router();
const passport = require("passport");
const useragent = require("express-useragent");
const requestIp = require("request-ip");

const {
  
  addUser,
  signin,
  logout,
  refreshToken,
  getModProfile,
  getUser,
  updateInfo,
  uploadProfileImage

} = require("../controllers/user.controller");

const {
  getPublicUsers,
  followUser,
  getPublicUser,
  unfollowUser,
  getFollowingUsers,
} = require("../controllers/profile.controller");

const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");

const { sendVerificationEmail } = require("../middlewares/users/verifyEmail");
const {
  sendLoginVerificationEmail,
} = require("../middlewares/users/verifyLogin");

const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  signUpSignInLimiter,
  followLimiter,
} = require("../middlewares/limiter/limiter");

const decodeToken = require("../middlewares/auth/decodeToken");
const { uploadPhoto } = require("../middlewares/ImageUpload/upload");
const requireAuth = passport.authenticate("jwt", { session: false }, null);


// router.post("/create-new-user", createUser)
router.get("/public-users/:id", requireAuth, decodeToken, getPublicUser);
router.get("/public-users",  getPublicUsers);
router.get("/moderator", requireAuth, decodeToken, getModProfile);
router.get("/following", requireAuth, decodeToken, getFollowingUsers);
router.get("/:id", requireAuth, getUser);

router.post(
  "/signup",
  signUpSignInLimiter,
  addUserValidator,
  addUserValidatorHandler,
  addUser,
  sendVerificationEmail
);


router.post("/uploadProfileImg", decodeToken, uploadProfileImage )
router.post("/refresh-token", refreshToken);
router.post(
  "/signin",
  signUpSignInLimiter,
  requestIp.mw(),
  useragent.express(),
  signin,
  
);
router.post("/logout", logout);

router.put("/:id", requireAuth, decodeToken, updateInfo);

router.use(followLimiter);
router.patch("/:id/follow", requireAuth, decodeToken, followUser);
router.patch("/:id/unfollow", requireAuth, decodeToken, unfollowUser);

module.exports = router;
