'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();

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
    //const numindexes = 5; // number of indexes for each letter 
    try{
        const text = await firestore.collection('Words'); //word lists are stored in Words collection 
        const data = await text.get();
        let textArray = [];

        if(data.empty){
            res.status(500).send('firestore Words collection is empty');
        }
        else{
            data.forEach(doc =>{
                let totestr = '';
                for(let i = 0; i < numwords; i++){
                    let act = getRandomInt(numletters);
                    let ind;
                    let str;
                    switch (act){//gets data document 
                        case 0: //A
                            ind = getRandomInt(doc.data().A.length);
                            str = doc.data().A[ind];
                        break;

                        case 1: //B
                            ind = getRandomInt(doc.data().B.length);
                            str = doc.data().B[ind];
                        break;

                        case 2: //C
                            ind = getRandomInt(doc.data().C.length);
                            str = doc.data().C[ind];
                        break;

                        case 3: //D
                            ind = getRandomInt(doc.data().D.length);
                            str = doc.data().D[ind];
                        break;
                        
                    }
                    //  totestr += str;
                    //  totestr += ' ';
                    // console.log(str);
                    textArray.push(str);

                }

                // console.log('total string');
                // console.log(totestr);
                // res.send(totestr); //sends text string back to port
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
        let word = "accent";
        let words = await firestore.collection('Words').doc('Wordlist');

        if(data.empty){
            res.status(500).send('firestore Words collection is empty');
        }
        else{
            documents.forEach(doc => {

            })
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