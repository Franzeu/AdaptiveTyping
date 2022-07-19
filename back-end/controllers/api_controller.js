'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const app = require('firebase/app');
var fs = require('fs');
const { json } = require('body-parser');
/*returns a random integer between 0 and max*/
function getRandomInt(max) { 
  return Math.floor(Math.random() * max);
}


/*checks if word meets or exceeds character ratio
If current word doesn't meet ratio but has a ratio 
higher than word in cache return 1.
If word ratio meets or exceeds ratio requirement 
return 2.
if word ratio doesn't meet other two conditions return 0.
*/
function validWord( word, chr, ratio, pastratio)
{
    let numchars = 0;
    let wordratio;
    //console.log('word: ' + word + ' char: ' + chr + ' ratio: ' + ratio + ' pastratio: ' + pastratio);
    if(ratio <= pastratio){
        //console.log('passed special 2');
        return 2; //exit loop
    } 

    for (let i = 0; i < word.length; i++){
        if(word[i] == chr) numchars++;

    }
    wordratio = numchars/word.length;
    //console.log('wordratio: ' + wordratio); 
    
    if(wordratio > pastratio) return 1;// add word to cache
    else if (wordratio >= ratio) return 2;//exit loop
    else return 0;// loop again
    //return ratio
    //return wordratio >= ratio;
}

/*calculares and returns ratio of characters in input string
returns ratio*/
function findWordRatio(word, chr){
    let numchars = 0;
    for (let i = 0; i < word.length; i++){
        if(word[i] == chr) numchars++;

    }
    return numchars/word.length;
}



/*sends the top five character mistakes for 
specified uid back to client*/
const getTopMistakes = async (req,res,next) =>{
    console.log('called getTopMistakes');
    try{
        const usrid = req.params['id'];
        const usr = await firestore.collection('userstats').doc(usrid); //getting user's frequent errors

        usr.get()
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {
                usr.onSnapshot((doc) => {
                    usr.set({ uid:usrid, wpm:0, accuracy:0, errors:{} });
            });
            } 
        });

        const usrdata = await usr.get();
        const usrdoc = usrdata.data();
        const errorObj = usrdoc.errors;

        let errorarr = [];
        const numrepeats = 10;
        for( var character in errorObj){
            errorarr.push([character,errorObj[character]]);
        }
        let len = errorarr.length;
        //console.log('errorar length: '+ len);

        //console.log('errorarr ' + errorarr);
        if(len > 0){
            errorarr.sort(function(a, b) {
                return a[1] - b[1];
            });
            errorarr.reverse();
        }
        errorarr.splice(5);

        res.json({errors: errorarr});
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

/*Creates and sends pseudorandom array of 50 strings based on
specified UID's top 5 mistakes*/
const getrandomadapttext = async (req,res,next) =>{
    const numwords = 50; //number of words that the textbox displays
    console.log("called get getrandomadapttext");
    try{
        //const usrid = 'po4bTvVvZ3VG0hJsjdoZSC7FE9m1';
        const usrid = req.params['id'];
        //console.log('id: ' + req.params['id']);
        //return;
        const text = await firestore.collection('Words'); //word lists are stored in Words collection 
        const data = await text.get();
        let textArray = [];

        const usr = await firestore.collection('userstats').doc(usrid); //getting user's frequent errors

        usr.get()
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {
                usr.onSnapshot((doc) => {
                    usr.set({ uid:usrid, wpm:0, accuracy:0, errors:{} });
              });
            } 
        });

        const usrdata = await usr.get();
        const usrdoc = usrdata.data();
        const errorObj = usrdoc.errors;
        
        let errorarr = [];
        const numrepeats = 10;
        for( var character in errorObj){
            errorarr.push([character,errorObj[character]]);
        }
        let len = errorarr.length;

        if(len > 0){
            errorarr.sort(function(a, b) {
                return a[1] - b[1];
            });
            errorarr.reverse();
        }
        
        
        if(data.empty){
            res.status(500).send('firestore Words collection is empty');
        }
        else{
            if(len > 0){
                data.forEach(doc =>{

                    const keys = Object.keys(doc.data());

                    for (let i = 0; i < numwords; i++) {
                        let str;
                        let j = 0;
                        let wordcache = "";
                        let pastratio = 0.0;
                        let searching = true;
                        let charkey = errorarr[i % len % 5][0];
                        let charratio = errorarr[i % len % 5][1]/10;

                        if(charratio > 0.8) charratio = 0.8;
                        
                        do {
                            let arr = doc.data()[keys[getRandomInt(keys.length)]];
                            str = arr[getRandomInt(arr.length)];
                            j++;
                            if(j == numrepeats){
                                charratio -= 0.1;
                                charratio = charratio.toFixed(4);
                            }
                            
                            j = j % numrepeats;

                            switch (validWord(str,charkey,charratio,pastratio)){
                                case 0:
                                    break;
                                case 1:
                                    wordcache = str;
                                    pastratio = findWordRatio(wordcache, charkey);
                                    break;
                                case 2:
                                    searching = false;
                                    if(wordcache.length == 0) wordcache = str;
                                    break;

                                    
                            }
                            
                            
                        }while(searching)
                        textArray.push(wordcache);
                    

                        
                    }
                    res.json({english: textArray});
                })
            }
            else{ // if user has no characters errors
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
    }

    catch(error){
            res.status(400).send(error.message);
            //res.send('Doc Failure');

    }
}


/*creates and sends 50 random words to client*/
const getrandomtext = async (req,res,next) =>{
    const numwords = 50; //number of words that the textbox displays
    const numletters = 4; //number of letter array fields in document
    console.log("called get randomtext");
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

/*populates firestore words collection with data
from local file*/
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

/*store results from uid's typing test
in firestore userstats collection*/
const store_usr_data = async(req, res, next) => {
    try{
        const usridarr = Object.values(req.body.uid);
        const usrid = usridarr.join("");
        
        const userDoc = await firestore.collection('userstats').doc(usrid); //if usid doesn't exist in userstats
        userDoc.get()                                                       //collection, create it
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {
                userDoc.onSnapshot((doc) => {
                    doc.set(req.body);
                    console.log('Initial data for user');
              });
            } else {
                const path = 'errors.';
                
                for (var key in req.body.errors) {
                    
                    let field = path + key;
                    console.log(field);
                    userDoc.update({
                        [field] : app.firestore.FieldValue.increment(1)
                    }
                    )
                }

                userDoc.update({
                    wpm: req.body.wpm,
                    accuracy: req.body.accuracy,
                    pastWpm: app.firestore.FieldValue.arrayUnion(req.body.wpm),
                    pastAcc: app.firestore.FieldValue.arrayUnion(req.body.accuracy)
                })
            } 
        });

        res.send('User Data Received');


    }
    catch(error){
        console.log(error.message);

		res.status(400).send(error.message)
    }
}

/*pulls data from userstats collection for specified UID
and sends it to client*/
const get_usr_data = async(req, res, next) => {
    console.log('called get_usr_data');
    try {

        const url = req.url;
        const criteria = JSON.parse(decodeURIComponent(url.slice(21)));
        const usrid = criteria[0].uid;

        let userDoc  = await firestore.collection('userstats').doc(usrid);
        userDoc.get()
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {                  //if userstats doc doesn't exist for UID create it
                userDoc.onSnapshot((doc) => {           //and populate it with empty fields
                    userDoc.set({ uid:usrid, wpm:0, accuracy:0, errors:{}, pastAcc:[],pastWpm:[]});
                
              });
            } 
        });
        
        let stats = await userDoc.get();
        res.json(stats.data());

    }
    catch(error){

        console.log(error.message);

        res.status(400).send(error.message);
    }
}

module.exports = {
    getTopMistakes,
    getrandomadapttext,
    getrandomtext,
    populate_words,
    store_usr_data,
    get_usr_data
}