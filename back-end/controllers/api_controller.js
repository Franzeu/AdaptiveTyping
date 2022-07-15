'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const app = require('firebase/app');
var fs = require('fs');
const { json } = require('body-parser');

function getRandomInt(max) { //used to return random integer
  return Math.floor(Math.random() * max);
}

function validWord( word, char, ratio)
{
    let numchars = 0;
    let wordratio;
    console.log('word: ' + word + ' char: ' + char + ' ratio: ' + ratio);
    //console.log('word char: ' + word[0]);
    for (let i = 0; i < word.length; i++){
        if(word[i] == char) numchars++;

    }
    wordratio = numchars/word.length;
    console.log('wordratio: ' + wordratio); 
    return wordratio >= ratio;
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
        const usrid = 'po4bTvVvZ3VG0hJsjdoZSC7FE9m1';

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
                    //console.log()
                    let charkey = errorarr[i % len % 5][0];
                    let charratio = errorarr[i % len % 5][1]/10;                    
                    if(charratio > 0.8) charratio = 0.8;
                    
                    do {
                        let arr = doc.data()[keys[getRandomInt(keys.length)]];
                        str = arr[getRandomInt(arr.length)];
                        //console.log('valid word value' + !validWord(str,charkey,charratio));
                        j++;
                        if(j == numrepeats) charratio -= 0.1;
                        j = j % numrepeats;
                        
                    }while(!validWord(str,charkey,charratio))
                    //console.log('charratio '+ charratio);
                    textArray.push(str);
                  

                    
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

        res.send('Words collection successfully populated'); 
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
        

        res.send('data received');


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
        console.log(url.slice(10));
        
        // const usridarr = Object.values(req.body.uid);
        // const usrid = usridarr.join("");
        // res.send(firestore.collection('userstats').doc(usrid).data().wpm);
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