import { configs } from '/config.js';
import { allData, db} from '/script.js';
const allDivs = document.getElementById('container');
const passInput = document.getElementById('passInput');
const passAsker = document.getElementById('passAsker');
const infoScreen = document.getElementById('infoScreen');
const newQuestion = document.getElementById('newQuestion');
const newResponse = document.getElementById('newResponse');

export function checkPass(val) {
  // password ok.
  if (val.target.value === configs.psw) {
    // correct pw
    infoScreen.innerHTML = '';
    passAsker.classList.add('invis');
    allDivs.classList.remove('invis');
  };
  // haste buttons... maybe temporary "dumb" solution, but gotta do more dynamic someday...
  const haste1Listen = document.getElementById('haste1').addEventListener('click', copyHaste);
  const haste2Listen = document.getElementById('haste2').addEventListener('click', copyHaste);
  const haste3Listen = document.getElementById('haste3').addEventListener('click', copyHaste);
  const haste4Listen = document.getElementById('haste4').addEventListener('click', copyHaste);
}
function copyHaste(elem) {
  const targetDiv = document.getElementById(elem.target.id);
  // copy to clipboard
  copyToClipboardMsg(targetDiv, "msg");
  window.scrollTo(0, 0);
}
// this shows data of the clicked information
export function showData(clickedElement) {
  // find the data:
  console.log('trying to find from allData, with ids', allData);
  allData.forEach( (dataEntry, idx) => {
    //console.log('datas: ', dataEntry.id);
    if (dataEntry.id === clickedElement.target.id) {
      // add data
      downRight.innerHTML = allData[idx].response;
      // copy to clipboard
      //copyToClipboardMsg(downRight, "msg");
      window.scrollTo(0, 0);
    }
  });
}

export function addNewEntry() {
  firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log('logging: ', errorCode, errorMessage);
  // ...
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (newQuestion.value !== '' && newResponse.value !== '') {
      const newEntry = {question: newQuestion.value, response: newResponse.value}
      db.collection("helpFiles").doc().set({
        question: newQuestion.value,
        response: newResponse.value
      });
      newQuestion.value = '';
      newResponse.value = '';
      infoScreen.innerHTML = 'uusi tieto tallennettu. virkistä selain niin se näkyy listassa.';
      window.scrollTo(0, 0);
      setTimeout(() => {
      	infoScreen.innerHTML = "";
      }, 9000);

      /*
      function sMbuttonClicked() {
        if (messageLine.value !== '') {
          const freshMsg = sendMessage(myChat.myName, messageLine.value);
          messageLine.value = '';
          myChat.messages.push(freshMsg);
          console.log('sending, docrefid...', myChat);
          db.collection('chats').doc(myChat.docRefId).update({
            messages: myChat.messages
          });
        }
      }
      */
      /*
      const pack = JSON.stringify(newEntry);
      const http = new XMLHttpRequest();
      const url = '/addNew';
      let params = 'MSG=' + pack;

      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.onreadystatechange = () => {
        //console.log('sending champ: ', params);
      }
      http.send(params);
      newQuestion.value = '';
      newResponse.value = '';
    }
    */
    }
  });
}

// this will be copy to clipboard mechanism:
// from my very early work, that i copied from somewhere from the internet...

	export function copyToClipboardMsg(elem, msgElem) {  // copy message
    //console.log('got: ', elem, msgElem);
		var succeed = copyToClipboard(elem);
	  var msg = null;
	    if (!succeed) {
	      msg = "Copy not supported or blocked.  Press Ctrl+c to copy."
	    } else {
	      msg = "Kopioitu leikepöydälle. CONTROL+V voit liimata chattiin. Huom! kaikki vastaukset eivät käy suoraan vastauksiksi asiakkaille, joten lue ja muokkaa niitä aina!"
	    }
	    if (typeof msgElem === "string") {
	      msgElem = document.getElementById('infoScreen');
	    }
	  msgElem.innerHTML = msg;
	  setTimeout(() => {
	    msgElem.innerHTML = "";
	  }, 9000);
	}  // end of copy message

	function copyToClipboard(elem) {  // copy mechanism
		// create hidden text element, if it doesn't already exist
    //console.log('got 2: ', elem);
	  var targetId = "_hiddenCopyText_";
	  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
	  var origSelectionStart, origSelectionEnd;
	  if (isInput) {
	    // can just use the original source element for the selection and copy
	    target = elem;
	    origSelectionStart = elem.selectionStart;
	    origSelectionEnd = elem.selectionEnd;
	  } else {
	    // must use a temporary form element for the selection and copy
	    target = document.getElementById(targetId);
	    if (!target) {
	      var target = document.createElement("textarea");
	      target.style.position = "absolute";
	      target.style.left = "-9999px";
	      target.style.top = "0";
	      target.id = targetId;
	      document.body.appendChild(target);
	    }
	      target.textContent = elem.textContent;
	    }
	    // select the content
	    var currentFocus = document.activeElement;
	    target.focus();
	    target.setSelectionRange(0, target.value.length);
	    // copy the selection
	    var succeed;
	    try {
	    	succeed = document.execCommand("copy");
	    }
	    catch(e) {
	      succeed = false;
	    }
	    // restore original focus
	    if (currentFocus && typeof currentFocus.focus === "function") {
	      currentFocus.focus();
	    }
	    if (isInput) {
	      // restore prior selectio
	      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
	    }
	    else {
	      // clear temporary content
	      target.textContent = "";
	    }
	    return succeed;
	} // end of copy mechanism
