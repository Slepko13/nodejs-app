const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const getDb = require('../util/databaseMongo').getDb;

class User {
    constructor(username, email,id) {
        this.username = username;
        this.email = email;
        this._id = id;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (!this._id) {
            dbOp = db.collection('users').insertOne(this);
        } else {
            dbOp = db
                .collection('users')
                .updateOne({ _id: new ObjectId(this._id) }, { $set: this });
        }
        return dbOp
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(userId) {
        const db = getDb();
        return db
            .collection('users')
            .findOne({ _id: new mongodb.ObjectId(userId) })
            .then(user => {
                console.log('my single user', user);
                return user;
            })
            .catch(err => {
                console.log("my error", err);
            });
    }
}

module.exports = User;
