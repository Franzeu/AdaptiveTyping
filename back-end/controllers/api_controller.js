'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const app = require('firebase/app');
var fs = require('fs');

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

        res.send('Words collection successfully populated'); 
    }

    catch (error) {
        res.status(400).send(error.message);

    }

}

module.exports = {

    test_res,
    getrandomtext,
    populate_words
}