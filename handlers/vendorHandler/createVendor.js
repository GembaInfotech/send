const VendorModel = require('../../models/vendor.model')

exports.createVendor=async(req, res)=> {
  try {
    const {
      firstName,
      lastName,
      contact,
      email,
      password,
      pincode,
      address,
      city,
      state,
      country
    } = req.body;

    const vendor = new VendorModel({
      firstName: firstName.toUpperCase(),
      lastName: lastName.toUpperCase(),
      contact: contact,
      email: email.toLowerCase(),
      password: password,
      pincode: pincode,
      address: address,
      city: city,
      state: state,
      country: country,
      createdOnDate: new Date().toISOString(), // Setting current date and time
      acceptedTerms: false, // Assuming default is false
      vendorStatus: 'Pending', // Assuming default is 'Pending'
      vendorActive: false, // Assuming default is false
    });

    await vendor.save();
    console.log('Vendor created successfully');
    return res.status(201).json({ message: 'Vendor created successfully', vendor });
  } catch (err) {
    console.error('Error creating vendor:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}