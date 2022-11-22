const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoConnect = callback => {
	MongoClient.connect(
		'mongodb+srv://node-complete:nodecomplete@cluster0.etxrz.azure.mongodb.net/?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1,
		}
	)
		.then(client => {
			console.log('MongoDB is connected');
			callback(client);
		})
		.catch(err => {
			console.log(err);
		});
};

module.exports = mongoConnect;
