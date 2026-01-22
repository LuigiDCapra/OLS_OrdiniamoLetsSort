/*-- ---------------------------------------------------------------------
* Project     : LCD's HTML Editor 
* Description : LCD's HTML Editor
* Revision    : 0.021
* File        : RLCD.js
* Function    : 
* FirstEdit   : 07/12/2019
* LastEdit    : 26/08/2021
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2021
* System      : Mozilla FireFox 70+
-------------------------------------------------------------------------
*
* ### Needs
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/

var S_fEna_Text2Speach = false;           // used by U_Read_szTxt();

const $RLCD = (function () {
  var _RLCD = {};
  _RLCD.U_Init          = U_Init_RLCD;      // function U_Init_RLCD();
  _RLCD.speak         = U_Speak;          // function function U_Speak(P_szText, P_rVolume, P_rPitch, P_rRate, P_szLang, P_szName);
  _RLCD.shutup        = U_ShutUp;         // function U_ShutUp()
  _RLCD.fEnaSpeach    = U_fEnaSpeach;     // function U_fEnaSpeach(P_fEnaSpeach)
  _RLCD.fInit         = F_fInitialized;   // function F_fInitialized();

/*----- Imported Variables -------------------------------------------*/
/*----- Local Constants ----------------------------------------------*/
/*----- Local Types --------------------------------------------------*/
/*----- Prototypes ---------------------------------------------------*/
/*----- Local Variables ----------------------------------------------*/

var S_RLCD = {"fInit":false};    /* Private/Static */
var S_fEna_Translation = true;   /* Enable Google Translation */
var S_fEna_ReadOffLine = false;  /* In spite of SOP Read text also if the WebPage has been loaded from HD */
  
/*--------------------------------------------------------------------*/


/*-----F_fInitialized --------------------------------------------------------
*
*/ 
function F_fInitialized()
{
  return(S_RLCD.fInit);
} /* F_fInitialized */

/* ----- Synthetic Voice ----------------------------------------------------- */

/*-----U_Init_Speak --------------------------------------------------------
*
*/
var S_speechSynthesis;           
var S_aVoices;
var S_Utterance;
var S_fInit_speechSynthesis = false;
var S_Elem_Div_Speech;
var S_szLang = "it";

function U_Init_Speak()
{
  var i;
  S_Elem_Div_Speech = document.createElement("div");
  S_Elem_Div_Speech.setAttribute("hidden", true);
  S_Elem_Div_Speech.setAttribute("id", "Id_Div_Speech_hidden");
  var aElem = document.getElementsByTagName("body");
  aElem[0].appendChild(S_Elem_Div_Speech);  
  
  S_speechSynthesis = window.speechSynthesis;
  S_aVoices = S_speechSynthesis.getVoices();
  debugger;

  S_Utterance = new SpeechSynthesisUtterance();
  for (i = 0; i < S_aVoices.length ; i++) {
    var Tmp = S_aVoices[i];  
//    if(Tmp.lang == "it-IT") {
    if(Tmp.lang == S_szLang) {
//     alert("xxx");
//       debugger;
      Tmp.default = true;
      S_Utterance.voice = Tmp
      S_Utterance.lang  = Tmp.lang;
      break; 
    } /* if */
  } /* for */
  S_fInit_speechSynthesis = true;
} /* U_Init_Speak */

/*-----U_Read_szTxt --------------------------------------------------------
*
* Read the selected text.
*/ 
function U_Read_szTxt(P_This)
{
  if (S_fEna_Text2Speach || S_fEna_ReadOffLine) { 
    var szTxt = P_This.innerText;  
    U_Speak(szTxt);
  } /* if */
} /* U_Read_szTxt */

/*-----U_Speak --------------------------------------------------------
*
*/ 
function U_Speak(P_szText, P_rVolume, P_rPitch, P_rRate, P_szLang, P_szName)
{
  if (!S_fInit_speechSynthesis) {
     U_Init_Speak();
  } /* if */
  S_Elem_Div_Speech.innerHTML = P_szText;
  var szText = S_Elem_Div_Speech.innerText;
  S_Utterance.text = szText;
//  debugger;
  if (P_szLang) {
     S_Utterance.lang = P_szLang;
       for (let i = 0; i < S_aVoices.length ; i++) {
        var Tmp = S_aVoices[i];  
        if(Tmp.lang == P_szLang) {            /* BCP 47 language code (it-IT en-US fr-FR es-ES de-DE ja-JP ru-RU zh-CN) */
          Tmp.default = true;
          S_Utterance.voice = Tmp
          S_Utterance.lang  = Tmp.lang;
          if (P_szName) {
              if (Tmp.name.indexOf(P_szName) >= 0) {
                 break;
              } /* if */          
          }
          else {
             break;
          } /* if */
        } /* if */
      } /* for */
  } /* if */
  if (P_rRate) {
     S_Utterance.rate = P_rRate;
  } /* if */
  if (P_rVolume) {
     S_Utterance.volume = P_rVolume;
  } /* if */
  if (P_rPitch) {
     S_Utterance.pitch = P_rPitch;
  } /* if */
  
  window.speechSynthesis.speak(S_Utterance);
} /* U_Speak */                                      

/*-----U_ShutUp --------------------------------------------------------
*
*/ 
function U_ShutUp()
{
  if (!S_fInit_speechSynthesis) {                                                                           
     window.speechSynthesis.cancel();
  } /* if */
} /* U_ShutUp */

/*-----U_SetListener --------------------------------------------------------
*
* Read the selected <section>
*/ 
function U_SetListener()
{
  var aElem = document.getElementsByTagName("section");
  for (let i = 0; i < aElem.length; i++) {
      aElem[i].addEventListener("click", function(){ U_Read_szTxt(this) });
  } /* for */
} /* U_SetListener */

/*-----F_szCookie_Get --------------------------------------------------------
*
*/ 
function F_szCookie_Get(name) {
    var Elem0 = document.cookie.split('; '),
    cookies = {}, i, C;

    for (i = Elem0.length - 1; i >= 0; i--) {
        C = Elem0[i].split('=');
        cookies[C[0]] = C[1];
     }  /* for */

     return(cookies[name]);
} /* F_szCookie_Get */

/*-----U_Ena_Translation --------------------------------------------------------
*
*/ 
function U_Ena_Translation()
{
  if (!S_fEna_Translation) {
     return;
  } /* if */
  var Elem0 = document.createElement("script");
  Elem0.setAttribute("type", "text/javascript");
  Elem0.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
 
  var aElem = document.getElementsByTagName("body");
  aElem[0].appendChild(Elem0);

  var Elem1 = document.createElement("div");
  Elem1.setAttribute("id", "google_translate_element");

  aElem[0].insertBefore(Elem1, aElem[0].firstChild);
} /* U_Ena_Translation */

/*-----U_BG_Bug --------------------------------------------------------
*
* BlueGriffon Bug - Enable <aside> if not BG.
*/ 
function U_BG_Bug()
{
  try {
      document.getElementById("Id_Item_ASide0").style.visibility = "visible";
  } catch (P_Err) {
      //alert("Error: " + P_Err.message);
  } /* try catch */
} /* U_BG_Bug */

/*-----U_Hide_Mobile --------------------------------------------------------
*
* Mobile
*/ 
function U_Hide_Mobile()
{
  try {
      
    var cols = document.getElementsByClassName('Cl_Hide_Mobile');
    for(i = 0; i < cols.length; i++) {
      cols[i].style.display = 'none';
    }
    
  } catch (P_Err) {
      //alert("Error: " + P_Err.message);
  } /* try catch */
} /* U_Hide_Mobile */

/*-----U_Load_JS --------------------------------------------------------
*
* Load JavaScript file.
*/ 
function U_Load_JS(P_szFlNm){
  var Elem0="";
  Elem0=document.createElement('script');
  Elem0.setAttribute("type","text/javascript");
  Elem0.setAttribute("src", P_szFlNm);
  if (Elem0!="") {
      document.getElementsByTagName("head")[0].appendChild(Elem0);
  } /* if */
} /* U_Load_JS */

/*-----U_DarkMode --------------------------------------------------------
*
* $Bug Firefox non gestisce correttamente  prefers-color-scheme
*/ 
function U_DarkMode()
{
  if (navigator.appCodeName != "Mozilla") {
     return;
  } /* if */
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    fDark = true;
  } /* if */

  var Elem0 = document.getElementsByTagName("body")[0];
  var szTmp = window.getComputedStyle(Elem0, null).getPropertyValue("background-color");
  
  var szTmp1 = "rgb(0, 0, 0)";  /* value expected if Dark Mode has been set by the OS. */
  
  var fDark = (szTmp == szTmp1);

  //debugger;

  if (fDark) {
    var Elem0 = document.getElementsByTagName("body")[0];
    Elem0.style["background-color"]  = "#000";
    Elem0.style["color"]  = "#ccc";
    Elem0.style["background-image"]  = "none";
    
    var Elem0 = document.getElementById("Id_Main");
    Elem0.style["background-color"]  = "#000";
    Elem0.style["color"]  = "#ccc";
    Elem0.style["background-image"]  = "none";
    
    var aElem0 = document.querySelectorAll("strong");
    for (i = 0; i < aElem0.length; i++) {
        aElem0[i].style["background-color"]  = "#000";
        aElem0[i].style["color"]  = "#fff";
    }
    
    var aElem0 = document.querySelectorAll("em");
    for (i = 0; i < aElem0.length; i++) {
        aElem0[i].style["background-color"]  = "#000";
        aElem0[i].style["color"]  = "#fff";
    }
         
    var aElem0 = document.querySelectorAll("figure");
    for (i = 0; i < aElem0.length; i++) {
        // aElem0[i].style.backgroundImage  = "yellow3.jpg";
        aElem0[i].style.backgroundColor  = "#fff";
    }
    
    
    var aElem0 = document.querySelectorAll("figcaption");
    for (i = 0; i < aElem0.length; i++) {
        aElem0[i].style["background-color"]  = "#000";
        aElem0[i].style["color"]  = "#fff";
    }
        
  } /* if */

} /* U_DarkMode */

/*-----U_Sel_Voice --------------------------------------------------------
*
*/ 
function U_Sel_Voice()
{
  S_speechSynthesis = window.speechSynthesis;
  S_aVoices = S_speechSynthesis.getVoices();
   
  S_Utterance = new SpeechSynthesisUtterance();
   for (i = 0; i < S_aVoices.length ; i++) {
    var Tmp = S_aVoices[i];  
    if(Tmp.lang == "it-IT") {            /* BCP 47 language code (it-IT en-US fr-FR es-ES de-DE ja-JP ru-RU zh-CN) */
      Tmp.default = true;
      S_Utterance.voice = Tmp
      S_Utterance.lang  = Tmp.lang;
      //break; 
    } /* if */
  } /* for */
  debugger;
} /* U_Sel_Voice */

/*-----U_fEnaSpeach --------------------------------------------------------
*
* Note: because SOP this routine doesn't work if the Web page has been loaded from local HD.
*/ 
function U_fEnaSpeach(P_fEnaSpeach)
{
  var aLang = {"it":"it-IT", "en":"en-US", "fr":"fr-FR", "es":"es-ES", "de":"de-DE", "ja":"ja-JP", "ru":"ru-RU", "zh":"zh-CN"};
  /*
   * NOTE: because U_Read_szTxt(); will be executed in the parent window environment; so the enabling flag S_fEna_Text2Speach must be set using window.parent.S_fEna_Text2Speach. 
  */
  
  window.parent.S_fEna_Text2Speach = P_fEnaSpeach;
  
  var szTrans = F_szCookie_Get('googtrans');
  if (szTrans) {
     var szPfx = szTrans.substring(szTrans.length -2);
     S_szLang = aLang[szPfx];  
  }
  else {
     S_szLang = "it-IT";
  } /* if */
  debugger; 
   
  if (P_fEnaSpeach) {  
     // alert("Text to speach ENABLED - paint sections background in alternate colors. ");
     var Elem_CSS = window.parent.document.createElement('style')
     Elem_CSS.innerHTML = "section:nth-child(odd) { background-color:pink; }  section:nth-child(even) { background-color:yellow;}";
     Elem_CSS.setAttribute("id", "Id_CSS_1");
     window.parent.document.body.appendChild(Elem_CSS);     
     U_Init_Speak();
  }
  else {
     // alert("Text to speach DISABLED");
     var Elem_CSS = window.parent.document.getElementById('Id_CSS_1');
     var Elem_Parent = Elem_CSS.parentNode;
     Elem_Parent.removeChild(Elem_CSS);
     U_ShutUp();
  } /* if */
} /* U_fEnaSpeach */


/*-----U_Init_RLCD --------------------------------------------------------
*             
*/ 
function U_Init_RLCD()
{
/* NOTE:
* document.URL and location.href reports the same information, but document.URL is Read Only, whereas you can also set location.href.
*/
  var szHRef = window.location.href;
  if (screen.width < 600) {
     U_Hide_Mobile();
  } /* if */

  if (szHRef.indexOf("/res/") < 0) {
      /* It is the main page (not an iframes) */
      
      S_speechSynthesis = window.speechSynthesis;
      S_aVoices = S_speechSynthesis.getVoices();
      if (window.speechSynthesis) {
        if (speechSynthesis.onvoiceschanged !== undefined) {
          //Chrome gets the voices asynchronously so this is needed
          speechSynthesis.onvoiceschanged = U_Sel_Voice;
        } /* if */
        U_Init_Speak();
      } /* if */
        
      U_Ena_Translation();
      U_SetListener(); 
      U_BG_Bug();      

      var iPos = szHRef.indexOf("D:/IIS"); 
      if (iPos > 0) {
//         var szFlNm = szHRef.substr(0,iPos) + "I:/BIN/lcd20.js";
//         U_Load_JS(szFlNm);
      } /* if */
 
//    setTimeout(googleTranslateElementInit, 1000);
//    setInterval(U_WatchDog, 60000);
  } /* if */
  U_DarkMode();  
} /* U_Init_RLCD */

  return(_RLCD);
})();  /* $RLCD */

/*-----U_Hnlr_Copy --------------------------------------------------------
*
*/ 
function U_Hnlr_Copy()
{
  alert("xxx Copy");
} /* U_Hnlr_Copy */

function googleTranslateElementInit() {
new google.translate.TranslateElement({pageLanguage: 'it'}, 'google_translate_element');
}

var S_aElemBody = document.getElementsByTagName("body");
//S_aElemBody[0].addEventListener("copy", U_Hnlr_Copy);

$RLCD.U_Init();

