'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const app = require('firebase/app');
var fs = require('fs');
const { json } = require('body-parser');

function getRandomInt(max) { //used to return random integer
  return Math.floor(Math.random() * max);
}

const test_res = async  (req, res, next) => {
    console.log("test called");
    try{
        res.send('backend test successful');
    }

    catch (error) {
        res.status(400).send(error.message);
    }
};

const getrandomtext = async (req,res,next) =>{
    const numwords = 50; //number of words that the textbox displays
    const numletters = 4; //number of letter array fields in document

    try{
        const text = await firestore.collection('Words'); //word lists are stored in Words collection 
        const data = await text.get();
        let textArray = [];

        if(data.empty){
            res.status(500).send('firestore Words collection is empty');
        }
        else{
            data.forEach(doc =>{

                const keys = Object.keys(doc.data());
                

                for (let i = 0; i < numwords; i++) {

                    let arr = doc.data()[keys[getRandomInt(keys.length)]]
                    textArray.push(arr[getRandomInt(arr.length)]);
                }
                  
                res.json({english: textArray});
            })
        }
    }

    catch(error){
            res.status(400).send(error.message);
            //res.send('Doc Failure');

    }
}

// function to populate firestore words collection with data from local file, still being implemented
const populate_words = async (req, res, next) => {
    console.log('populate_words called');
    try {
        let test = "A";
        let word = "accent";
        let words = await firestore.collection('Words').doc('Wordlist');
        

        if(!words){
            res.status(500).send('firestore Words collection is empty');
        }
        else{
            
            var arr = []
            fs.readFile(__dirname + '/common_words.txt', function(err, data) {
                if(err) throw err;
                arr = data.toString().split("\n");
                for(let i = 0; i < arr.length; i++) {

                    let field = arr[i][0];
                        
                    words.update({
                        [field] : app.firestore.FieldValue.arrayUnion(arr[i])
                    })
                        
                    }
            });
            
        }

        res.send('Words Firestore Collection successfully populated'); 
    }

    catch (error) {
        res.status(400).send(error.message);

    }

}

const store_usr_data = async(req, res, next) => {
    try{
        const usridarr = Object.values(req.body.uid);
        const usrid = usridarr.join("");
        
        console.log('store data called');
        await firestore.collection('userstats').doc(usrid).set(req.body);

        res.send('User Data Received');


    }
    catch(error){
        //res.send('data not success');
        console.log(error.message);

		res.status(400).send(error.message)
    }
}

const get_usr_data = async(req, res, next) => {

    try {

        const url = req.url;
        const criteria = JSON.parse(decodeURIComponent(url.slice(21)));
        const usrid = criteria[0].uid;
        console.log('uid:', criteria[0].uid);

        let userDoc  = await firestore.collection('userstats').doc(usrid);
       // const user: userStats = { uid:this.authService.userData.uid, wpm:wpmNum, accuracy:accNum, errors:errorDictionary }
        userDoc.get()
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {
                userDoc.onSnapshot((doc) => {
                    userDoc.set({ uid:usrid, wpm:0, accuracy:0, errors:{} });
                    console.log('created new data');
              });
            } 
        });
        
        let stats = await userDoc.get();
        //console.log('stats length: ' + stats.data().length);
        res.json(stats.data());

    }
    catch(error){

        console.log(error.message);

        res.status(400).send(error.message);
    }
}

module.exports = {

    test_res,
    getrandomtext,
    populate_words,
    store_usr_data,
    get_usr_data
}