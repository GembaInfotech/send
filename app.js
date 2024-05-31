

require("dotenv").config();
const express = require("express");

const adminRoutes = require("./routes/admin.route");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const communityRoutes = require("./routes/community.route");
const contextAuthRoutes = require("./routes/context-auth.route");
const search = require("./controllers/search.controller");
const Database = require("./config/database");
const decodeToken = require("./middlewares/auth/decodeToken");
const vehcileRoutes = require('./routes/vehicle.route.js')
const parkingRoutes = require('./routes/parking.route.js')
const bookingRoutes = require("./routes/booking.route.js")
const vendorRoute = require('./routes/vendor.route.js')
const paymentRoute = require('./routes/paymentRoute.js')
const guardRoutes = require('./routes/guard.route.js')
const addressDetailRoute = require('./routes/AddressDetailRoute.js')


const app = express();

const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const PORT = process.env.PORT || 4005;

const db = new Database(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.connect().catch((err) =>
  console.error("Error connecting to database:", err)
);

app.use(cors());
app.use(morgan("dev"));
app.use("/assets/userFiles", express.static(__dirname + "/assets/userFiles"));
app.use(
  "/assets/userAvatars",
  express.static(__dirname + "/assets/userAvatars")
);

app.use(express.json());
app.use(express.static("build"))
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/passport.js");

app.get("/server-status", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

app.get("/search", decodeToken, search);

app.use("/auth", contextAuthRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/communities", communityRoutes);
app.use("/admin", adminRoutes);
app.use("/vehicle", vehcileRoutes);
app.use("/parking", parkingRoutes)
app.use("/booking", bookingRoutes)
app.use("/vendor", vendorRoute)
app.use("/booking", paymentRoute)
app.use("/guard", guardRoutes)
app.use("/add", addressDetailRoute)




const shortid = require('shortid')
const Razorpay = require('razorpay')



const razorpay = new Razorpay({

	key_id: 'rzp_test_muLBb6gKqfrZA5',
	key_secret: 'Pr8ALVkn1EA6H7iDMqJY8yVL'
})

app.get('/logo.svg', (req, res) => {
	res.sendFile(path.join(__dirname, 'logo.svg'))
})

app.post('/verification', (req, res) => {
	// do a validation
	const secret = 'Pr8ALVkn1EA6H7iDMqJY8yVL'


	const crypto = require('crypto')
  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(body.toString())
	const digest = shasum.digest('hex')


	if (digest === req.body.response.razorpay_signature) {
		// process it
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = req.body.body
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})




process.on("SIGINT", async () => {
  try {
    await db.disconnect();
    console.log("Disconnected from database.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));
