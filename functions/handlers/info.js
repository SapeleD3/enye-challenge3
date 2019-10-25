const { db } = require('../util/admin')
const config = require('../util/config')
const firebase = require('firebase')
const uuidv5 = require('uuid/v5');
firebase.initializeApp(config)

exports.helloWorld = (req, res) => {
    res.send("Hello from Firebase!");
};

exports.addInfo = (req, res) => {
    const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    const newInfo = {
        id: uuidv5(`${req.body.firstName}${req.body.lastName}`, MY_NAMESPACE),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        age: req.body.age,
        hobby: req.body.hobby
    }

    db.collection("info").add(newInfo)
    .then(() => {
        const resInfo = newInfo
        res.json({message: 'Details added successfully', resInfo})
    })
    .catch(err => {
        console.log(err.code)
        res.status(500).json({error: err.code})
    })
}

exports.getInfo = (req, res) => {
    db.collection("info").get()
    .then(data => {
        let info = []
        console.log('1',data)
        data.forEach(doc => {
            console.log(doc.data())
            info.push({
                id: doc.data().id,
                firstName: doc.data().fireName,
                lastName: doc.data().lastName,
                birthday: doc.data().birthday,
                age : doc.data().age,
                hobby: doc.data().hobby
            })
        })
        return res.status(200).json(info)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err.code})
    })
}