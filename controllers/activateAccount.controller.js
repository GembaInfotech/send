const {activateAccount} = require('../handlers/activateAccountHandler/activateAccount')

exports.activate_account = async (req, res) => {
  try {
    console.log("testing...2");
    await activateAccount(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

  
  