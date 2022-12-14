const { MongoClient, ServerApiVersion } = require('mongodb');

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://node-complete:nodecomplete@cluster0.etxrz.azure.mongodb.net/shop?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    }
  )
    .then(client => {
      console.log('MongoDB is connected');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
