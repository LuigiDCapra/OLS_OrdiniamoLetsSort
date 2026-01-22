/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : tts.js
* Function    : Text to speech
* FirstEdit   : 03/01/2021
* LastEdit    : 09/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/

"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

const $TTS = (function () {
  var _TTS = {};
  _TTS.U_Init           = U_Init_TTS;          // function U_Init_TTS();
  _TTS.U_Speak          = U_Speak;             // function U_Speak(P_szMsg, P_szLang, P_rRate, P_szName);
  _TTS.U_Long_speech    = U_Long_speech;       // function U_Long_speech(P_szMsg, P_szLang, P_rRate, P_szName);
  _TTS.U_Stop_TTS       = U_Stop_TTS;          // function U_Stop_TTS();
  _TTS.U_Pause_TTS      = U_Pause_TTS;         // function U_Pause_TTS();
  _TTS.U_Resume_TTS     = U_Resume_TTS;        // function U_Resume_TTS();
  _TTS.F_fSpeaking      = F_fSpeaking;         // function F_fSpeaking();
  _TTS.F_fActive_TTS    = F_fActive_TTS;       // function F_fActive_TTS();
  _TTS.U_Prepare_Speech = U_Prepare_Speech;    // function U_Prepare_Speech(P_szTxt, P_fClear, P_fSpeak);
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_TTS;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/* ----- Text To Speach (TTS) ---- Syntetic Voice --------------------------- */

var S_speechSynthesis;           
var S_aVoices;
var S_Utterance;
var S_fActive_TTS = false;
var S_fActive_Log;
var S_Elem_Div_Speech;

/*-----F_fActive_TTS --------------------------------------------------------
*
*/ 
function F_fActive_TTS()
{
  return(S_fActive_TTS);
} /* F_fActive_TTS */

/*-----U_Speak0 --------------------------------------------------------
*
*/ 
function U_Speak0(P_szText, P_rVolume, P_rPitch, P_rRate, P_szLang, P_szName)
{
  if (!S_fActive_TTS) {
     U_Init_TTS();
  } /* if */
//  S_Elem_Div_Speech.innerHTML = P_szText;
//  var szText = S_Elem_Div_Speech.innerText;
//  S_Utterance.text = szText;
  S_Utterance.text = P_szText;
//  debugger;
  if (P_szLang) {
     S_Utterance.lang = P_szLang;
       for (let i = 0; i < S_aVoices.length ; i++) {
        var Tmp = S_aVoices[i];  
        if(Tmp.lang == P_szLang) {            /* BCP 47 language code (it-IT en-US fr-FR es-ES de-DE ja-JP ru-RU zh-CN) */
//          Tmp.default = true;
          S_Utterance.voice = Tmp;
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

  S_Utterance.rate   = (P_rRate)?   P_rRate:   $VConfig.F_rRate();
  S_Utterance.volume = (P_rVolume)? P_rVolume: $VConfig.F_rPitch();
  S_Utterance.pitch  = (P_rPitch)?  P_rPitch:  $VConfig.F_rPitch();
  
  window.speechSynthesis.speak(S_Utterance);
} /* U_Speak0 */ 

/*-----U_Stop_TTS --------------------------------------------------------
*
*/ 
function U_Stop_TTS()
{
  window.speechSynthesis.cancel();
} /* U_Stop_TTS */

/*-----U_Pause_TTS --------------------------------------------------------
*
*/ 
function U_Pause_TTS()
{
  window.speechSynthesis.pause();
} /* U_Pause_TTS */

/*-----U_Resume_TTS --------------------------------------------------------
*
*/ 
function U_Resume_TTS()
{
  window.speechSynthesis.resume();
} /* U_Resume_TTS */

/*-----U_Speak --------------------------------------------------------
*
* TTS Hub
*/ 
function U_Speak(P_szMsg, P_szLang, P_rRate, P_szName)
{
  if (!P_szMsg) {
      /* There is nothing to say. */
      return;
  } /* if */
  if (!P_szLang) {
      P_szLang = "it-IT";
      P_szName = "Elsa";
  } /* if */

  U_Speak0(P_szMsg, 1, 1, 0.8, P_szLang, P_szName);
  if (S_fActive_Log) {
     $Log.U_Log(C_jCd_Cur, 1, C_iLvl_TTS, "U_Speak", P_szMsg);  
  } /* if */
} /* U_Speak */

/*-----F_fSpeaking --------------------------------------------------------
*
*/ 
function F_fSpeaking()
{
  return(window.speechSynthesis.speaking);
} /* F_fSpeaking */

/*-----U_Long_speech --------------------------------------------------------
*
* Make a long speech
*/ 
function U_Long_speech(P_szMsg, P_szLang, P_rRate, P_szName)
{
  U_Speak(P_szMsg, P_szLang, P_rRate, P_szName);
//  $Viola.Set_jCB_jStsCmd(C_jCB_Listen, C_jStsCmd_Speaking);
} /* U_Long_speech */

/*-----U_Sel_Voice --------------------------------------------------------
*
*/ 
function U_Sel_Voice()
{
  S_speechSynthesis = window.speechSynthesis;
  S_aVoices = S_speechSynthesis.getVoices();
  
  S_Utterance = new SpeechSynthesisUtterance();
   for (let i = 0; i < S_aVoices.length ; i++) {
    var Tmp = S_aVoices[i];  
    if(Tmp.lang == "it-IT") {            /* BCP 47 language code (it-IT en-US fr-FR es-ES de-DE ja-JP ru-RU zh-CN) */
//      Tmp.default = true;
      S_Utterance.voice = Tmp;
      S_Utterance.lang  = Tmp.lang;
      //break; 
    } /* if */
  } /* for */
  S_fActive_TTS = true;
//  console.log(S_aVoices);
} /* U_Sel_Voice */

/*-----U_Prepare_Speech --------------------------------------------------------
*
* Make a Speach concatenating sentences.
*/
var S_szSpeech = ""; 
function U_Prepare_Speech(P_szTxt, P_fClear, P_fSpeak)
{
  if (P_fClear) {
     S_szSpeech = "";
  } /* if */
  S_szSpeech += P_szTxt;
  if (P_fSpeak) {
     U_Long_speech(S_szSpeech);
  } /* if */  
} /* U_Prepare_Speech */

/*-----U_Init_TTS --------------------------------------------------------
*
*/
function U_Init_TTS()
{
  var i;
  
  S_fActive_Log = $Root.F_fExist("$Log");
 
  S_Elem_Div_Speech = document.createElement("div");
  S_Elem_Div_Speech.setAttribute("id", "Id_Div_Speech_hidden");
  S_Elem_Div_Speech.style.display = "none";                    /* NOTE: "display" is a property not an attribute. S_Elem_Div_Speech.setAttribute("display", "none"); doesn't work! */
  
  var aElem = document.getElementsByTagName("body");
  aElem[0].appendChild(S_Elem_Div_Speech);  
  
  S_Utterance = new SpeechSynthesisUtterance();
  
  S_speechSynthesis = window.speechSynthesis;
  S_aVoices = S_speechSynthesis.getVoices();
   for (i = 0; i < S_aVoices.length ; i++) {
    var Tmp = S_aVoices[i];  
    if(Tmp.lang == "it-IT") {            /* BCP 47 language code (it-IT en-US fr-FR es-ES de-DE ja-JP ru-RU zh-CN) */
      S_Utterance.voice = Tmp;
      S_Utterance.lang  = Tmp.lang;
      break; 
    } /* if */
  } /* for */
  S_fActive_TTS = true;
  
  if (window.speechSynthesis) {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      //Chrome gets the voices asynchronously so this is needed
      speechSynthesis.onvoiceschanged = U_Sel_Voice;
    }
    // setUpVoices(); //for all the other browsers
  } /* if */
  
  U_Root0("$TTS", C_jCd_Cur, 2);
} /* U_Init_TTS */

  U_Root0("$TTS", C_jCd_Cur, 1);
  return(_TTS);
})();  /* TTS */

