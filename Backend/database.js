let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

  const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
  const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME
  const connectionString='mongodb+srv://admin:6692259364@cluster0.maw7h.mongodb.net/YelpLab2?retryWrites=true&w=majority'
  class Database {
    constructor() {
      this._connect()
    }
    
  _connect() {
       mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} )
         .then(() => {
           console.log('Database connection successful')
         })
         .catch(err => {
           console.error('Database connection error')
         })
    }
  }
  
  module.exports = new Database()