'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const app = require('firebase/app');
var fs = require('fs');
const { json } = require('body-parser');

function getRandomInt(max) { //used to return random integer
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
    console.log('word: ' + word + ' char: ' + chr + ' ratio: ' + ratio + ' pastratio: ' + pastratio);
    if(ratio <= pastratio){
        console.log('passed special 2');
        return 2; //exit loop
    } 

    for (let i = 0; i < word.length; i++){
        if(word[i] == chr) numchars++;

    }
    wordratio = numchars/word.length;
    console.log('wordratio: ' + wordratio); 
    
    if(wordratio > pastratio) return 1;// add word to cache
    else if (wordratio >= ratio) return 2;//exit loop
    else return 0;// loop again
    //return ratio
    //return wordratio >= ratio;
}

function findWordRatio(word, chr){// finds ratio of  'c' characters in input string
    let numchars = 0;
    for (let i = 0; i < word.length; i++){
        if(word[i] == chr) numchars++;

    }
    return numchars/word.length;
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
    const numwords = 30; //number of words that the textbox displays

    try{
        //const usrid = 'po4bTvVvZ3VG0hJsjdoZSC7FE9m1';
        const usrid = req.params['id'];
        //console.log('id: ' + req.params['id']);
        //return;
        const text = await firestore.collection('Words'); //word lists are stored in Words collection 
        const data = await text.get();
        let textArray = [];

        const usr = await firestore.collection('userstats').doc(usrid); //getting user's frequent errors
        const usrdata = await usr.get();
        const usrdoc = usrdata.data();
        const errorObj = usrdoc.errors;
        console.log(errorObj);
        
        let errorarr = []
        const numrepeats = 10;
        for( var character in errorObj){
            errorarr.push([character,errorObj[character]]);
        }

        console.log(errorarr);
        errorarr.sort(function(a, b) {
            return a[1] - b[1];
        });
        errorarr.reverse();
        console.log(errorarr);
        console.log(errorarr[0][1]);

        let len = errorarr.length;

        if(data.empty){
            res.status(500).send('firestore Words collection is empty');
        }
        else{
            data.forEach(doc =>{

                const keys = Object.keys(doc.data());

                for (let i = 0; i < numwords; i++) {
                    let str;
                    let j = 0;
                    let wordcache = "";
                    let pastratio = 0.0;
                    let searching = true;
                    //console.log()
                    let charkey = errorarr[i % len % 5][0];
                    let charratio = errorarr[i % len % 5][1]/10;

                    if(charratio > 0.8) charratio = 0.8;
                    
                    do {
                        let arr = doc.data()[keys[getRandomInt(keys.length)]];
                        str = arr[getRandomInt(arr.length)];
                        console.log('wordcache: ' + wordcache);
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
                    //console.log('charratio '+ charratio);
                    textArray.push(wordcache);
                  

                    
                }
                console.log('textarray' + textArray);
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
        let stats = await userDoc.get();
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