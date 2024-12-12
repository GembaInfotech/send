require("dotenv").config();
const express = require("express");
const multer = require('multer');
const path = require('path');
const admin = require("firebase-admin");

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
const resetPasswordRoute = require("./routes/forgetPasswordRoute.js")
const activateAccountRoute = require("./routes/activateAccountRoute.js")
const couponRoute = require('./routes/couponRoute.js')
const notificationRoute = require('./routes/notificationRoute.js')

const FCMTokens = require('./models/FCMToken.model.js')

const upload = require('./utils/UploadImage/upload.js'); 


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require("./serviceAccountKey.json")),
    });
    console.log("Firebase Admin initialized");
}

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


// app.use('/ProfileImage', express.static(path.join(__dirname, 'ProfileImage')));
// app.use('/userAvatars', express.static(path.join(__dirname, '../../assets/userAvatars')));

// const storage = multer.diskStorage({
// 	destination: './uploads/',
// 	filename: (req, file, cb) => {
// 	  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// 	}
//   });
  
//   // Init upload
//   const upload = multer({
// 	storage: storage,
// 	limits: { fileSize: 1000000 }, // Set file size limit (optional)
// 	fileFilter: (req, file, cb) => {
// 	  checkFileType(file, cb);
// 	}
//   }).any(); // .any() to accept all files, you can use .single('fieldname') for specific field
  
//   // Check file type
//   function checkFileType(file, cb) {
// 	// Allowed ext
// 	const filetypes = /jpeg|jpg|png|gif/;
// 	// Check ext
// 	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// 	// Check mime
// 	const mimetype = filetypes.test(file.mimetype);
  
// 	if (mimetype && extname) {
// 	  return cb(null, true);
// 	} else {
// 	  cb('Error: Images Only!');
// 	}
//   }
  
//   // Use the multer middleware globally
//   app.use(upload);
  
  // Your other middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  

app.use(cors());
app.use(morgan("dev"));
app.use("/assets/userFiles", express.static(__dirname + "/assets/userFiles"));
app.use(
  "/assets/userAvatars",
  express.static(__dirname + "/assets/userAvatars")
);

app.use(express.json());
app.use(express.static("build"))
//comment
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/passport.js");

app.get("/server-status", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

app.get("/search", decodeToken, search);

app.use("/auth", contextAuthRoutes);
app.use("/users", userRoutes);
app.use("/resetpassword", resetPasswordRoute);

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
app.use("/activate", activateAccountRoute)
app.use('/coupon', couponRoute)
app.use('/notification', notificationRoute)

const shortid = require('shortid')
const Razorpay = require('razorpay');
const { log } = require("console");

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_SECRET
})

app.get('/logo.svg', (req, res) => {
	res.sendFile(path.join(__dirname, 'logo.svg'))
})

app.post('/refund',  async (req,res)=>{
 const paymentId = "pay_OOUz4tZyb5bggb"; // change it to dynamically provided payment id 
 async function processRefund(paymentId) {
	try {
	  // Refund details
	  const refundDetails = {
		speed: 'normal',
		notes: {
		  notes_key_1: 'Your Refund is under processed.',
		},
		receipt: 'Receipt No. 765' // here generate a unique code such as combination of minute and date or anything else 
	  };
  
	  // Create a refund
	  const refund = await razorpay.payments.refund(paymentId, refundDetails);
	  console.log('Refund successful:', refund);
	  res.json(refund)
	} catch (error) {
	  console.error('Error processing refund:', error);
	  res.json(error)
	}
  }
  
  // Example payment ID to be refunded
  
  // Call the function to process the refund
  processRefund(paymentId);

})

// app.post("/send-notification", async (req, res) => {
// 	const { userId, title, body } = req.body;
// 	if (!userId || !title || !body) return res.status(400).send("Missing fields");
  
// 	try {
// 	  const tokens = await FCMTokens.find({ userId }).select("token");
// 	  const tokenList = tokens.map((token) => token.token);
  
// 	  if (tokenList.length === 0) {
// 		return res.status(404).send("No tokens found for the user");
// 	  }
// 	  const message = {
// 		notification: {
// 		  title:title,
// 		  body: body,
// 		},
// 		data: {
// 		  title: title,
// 		  body: body,
// 		},
// 		token: tokenList[0],
// 	  };
//       await admin.messaging().send(message);
// 	  res.status(200).send(`Notifications sent: `);
// 	} catch (error) {
// 	  console.error("Error sending notification:", error);
// 	  res.status(500).send("Internal Server Error");
// 	}
//   });
app.get('/getrefund',  async (req,res)=>{

	try {
		// Fetch refunds with the given options
		const refunds = await razorpay.refunds.all();
		console.log('List of refunds:', refunds);
		res.json(refunds)
	  } catch (error) {
		console.error('Error fetching refunds:', error);
		res.json(error)
	  }

   
   })

   app.post('/payout', async (req,res)=>{
	async function createPayout() {
		try {
		  const payout = await razorpay.payouts.create({
			"account_number": "7878780080316316",
			"amount": 1000000,
			"currency": "INR",
			"mode": "NEFT",
			"purpose": "refund",
			"fund_account": {
				"account_type": "bank_account",
				"bank_account": {
					"name": "Gaurav Kumar",
					"ifsc": "HDFC0001234",
					"account_number": "1121431121541121"
				},
				"contact": {
					"name": "Gaurav Kumar",
					"email": "gaurav.kumar@example.com",
					"contact": "9876543210",
					"type": "vendor",
					"reference_id": "Acme Contact ID 12345",
					"notes": {
						"notes_key_1": "Tea, Earl Grey, Hot",
						"notes_key_2": "Tea, Earl Grey… decaf."
					}
				}
			},
			"queue_if_low_balance": true,
			"reference_id": "Acme Transaction ID 12345",
			"narration": "Acme Corp Fund Transfer",
			"notes": {
				"notes_key_1": "Beam me up Scotty",
				"notes_key_2": "Engage"
			}
		  });
		  console.log('Payout created:', payout);
		} catch (error) {
		  console.error('Error creating payout:', error);
		}
	  }

	  try {
		 const response = await createPayout();
		 res.json(response);
	  }
	  catch(err)
	  {
		res.json(err);
	  }
   })

   app.post('/upload', upload.single('profileImage'), (req, res) => {
	console.log("hello");
	
    if (!req.file) {
        return res.status(400).send({ message: 'Please upload a file.' });
    }

	console.log(req.body);
	
    const profileType = 'vendor';
	console.log(profileType)
    let folder = '';

    if (profileType === 'user') {
        folder = 'UserProfileImg';
    } else if (profileType === 'vendor') {
        folder = 'VendorProfileImg';
    } else {
        return res.status(400).send({ message: 'Invalid profile type.' });
    }

    res.send({
        message: 'File uploaded successfully!',
        fileName: req.file.filename,
        filePath: path.join('ProfileImage', folder, req.file.filename)
    });
});

app.use('/ProfileImage/UserProfileImg', express.static(path.join(__dirname, 'ProfileImage', 'UserProfileImg')));
app.use('/ProfileImage/VendorProfileImg', express.static(path.join(__dirname, 'ProfileImage', 'VendorProfileImg')));


app.post('/verification', (req, res) => {
	// do a validation
	const secret = 'Pr8ALVkn1EA6H7iDMqJY8yVL'
	console.log("razorpay payment details", req.body);

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
    const payment_capture = 1;
    const amount = req.body.body;

	console.log("razorpay", req.body);
	
    const currency = 'INR';

    const options = {
        amount: amount * 100, 
        currency,
        receipt: shortid.generate(),
        payment_capture
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    } catch (error) {
        console.error('Razorpay Order Creation Error:', error);

        res.status(500).json({
            statusCode: 500,
            error: 'An error occurred while creating the Razorpay order.',
            details: error.message // Provides more insight into what went wrong
        });
    }
});




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
