import { checkPass, showData, addNewEntry } from '/functions.js';
import { firebaseConfig } from '/config.js';
//import { addNewEntry, copyToClipboardMsg } from './functions.js';
const allDivs = document.getElementById('container');
const passInput = document.getElementById('passInput');
const passAsker = document.getElementById('passAsker');
const infoScreen = document.getElementById('infoScreen');
const downLeft = document.getElementById('downLeft');
const downRight = document.getElementById('downRight');
const checkingPass = document.getElementById('passInput').addEventListener("change", checkPass);
const sendNewEntry = document.getElementById('sendNew').addEventListener('click', addNewEntry);
//const haste1Listen = document.getElementById('haste1').addEventListener('click', copyHaste);
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export let allData = [];
//console.log('scripts');
// check database and add the questions
db.collection("helpFiles").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().question} => ${doc.data().response}`);
        // add entry to allData
        const newEntry = {id: doc.id, question: doc.data().question, response: doc.data().response};
        allData.push(newEntry);
        console.log('allData: ', allData);
        // add question to page
        downLeft.innerHTML += `<p id= ${doc.id} class= "clickable">${doc.data().question}</p>`;
        // add event listener to this
        const elements = document.getElementsByClassName('clickable');
        for (var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('click', showData, false);
        }
    });
    infoScreen.innerHTML = 'database valmis!'
});

window.onload = (()=> {
  const allDivs = document.getElementById('container');
  allDivs.classList.add('invis');
  infoScreen.innerHTML = 'odota, että dataBase on valmis...'
//  console.log('configs: ', configs);
  // even listeners for hastes
  /*
  const allHastes = document.getElementsByClassName('hastes')
  console.log('all hastes', allHastes);
  for (let i = 0; i < allHastes.length; i++) {
    allHastes[i].addEventListener('click', copyHaste);
  }
  */
  //allHastes.forEach( (aH, idx) => {
  //  aH.addEventListener('click', copyHaste);
  //});
});
