const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

class Database {
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
  }

  async connect() {
    try {
      const connection = await mongoose.connect(this.uri, this.options);
      console.log(`Connected to database: ${connection.connection.db.databaseName}`);
    } catch (error) {
      console.error("Error connecting to database:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      const dbName = mongoose.connection.db ? mongoose.connection.db.databaseName : "unknown";
      await mongoose.disconnect();
      console.log(`Disconnected from database: ${dbName}`);
    } catch (error) {
      console.error("Error disconnecting from database:", error);
      throw error;
    }
  }
}

module.exports = Database;
