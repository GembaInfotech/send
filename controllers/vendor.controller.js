const {createVendor} = require('../handlers/vendorHandler/createVendor');
const {updateVendor} = require("../handlers/vendorHandler/updateVendor");
const {deleteVendor} = require("../handlers/vendorHandler/deleteVendor");
const {viewVendorList} = require('../handlers/vendorHandler/viewVendorList');



exports.viewVendor = async (req, res, next) => {
  try {
    await viewVendor(req, res, next);
  }
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


exports.login_Vendor = async (req, res) => {
  try {
    await loginVendor(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.logout_vendor = async (req, res, next) => {
  try {
    await logoutVendor(req, res, next);
  }
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.create_new_vendor = async (req, res) => {
  try {
    await createVendor(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.view_vendor_list = async (req, res) => {
    try {
      await viewVendorList(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


exports.update_vendor = async (req, res) => {
    try {
      await updateVendor(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  exports.delete_vendor = async (req, res) => {
    try {
      await deleteVendor(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }




// exports.delete_vendor_account = async (req, res) => {
//   const { password, uniqueId } = req.body;
//   if (!password) {
//     res.status(400).json({
//       success: false,
//       message: 'Please provide your password',
//       data: null,
//     });
//   } else {
//     try {
//       const vendor = await vendorModel.findOne({ uniqueId: sanitize(uniqueId) });
//       if (!vendor) {
//         res.status(400).json({
//           success: false,
//           message: 'Oh, something went wrong. Please try again!',
//           data: null,
//         });
//       } else {
//         const pwCheckSuccess = await bcrypt.compare(password, vendor.password);

//         if (!pwCheckSuccess) {
//           res.status(400).json({
//             success: false,
//             message: 'The provided password is not correct.',
//             data: null,
//           });
//         } else {
//           const deleted = await vendor.deleteOne({
//             email: vendor.email,
//           });

//           if (!deleted) {
//             res.status(400).json({
//               success: false,
//               message: 'Oh, something went wrong. Please try again!',
//               data: null,
//             });
//           } else {
//             res.status(200).json({
//               success: true,
//               message: 'Account deleted successfully',
//               data: null,
//             });
//           }
//         }
//       }
//     } catch (err) {
//       console.log('Error on /api/auth/delete-account: ', err);
//       res.status(400).json({
//         success: false,
//         message: 'Oh, something went wrong. Please try again!',
//         data: null,
//       });
//     }
//   }
// };
