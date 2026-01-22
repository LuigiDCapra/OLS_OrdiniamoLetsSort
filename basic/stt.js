/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : stt.js
* Function    : Speach to Text
* FirstEdit   : 03/01/2021
* LastEdit    : 28/12/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
*
*  ----- LICENSE -----
*
*  This file is part of TUISys' Open-DDJ.
*  
*  This program is free software: you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation, either version 3 of the License, or
*  (at your option) any later version.
*  
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*  
*  You should have received a copy of the GNU General Public License
*  along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>.
*  
*----------------------------------------------------------------------
* 
* ### Needs
*     Data Browsing Environment.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* 
*/    
"use strict";

var G_fActive_STT = false;    
    
// If you modify this array, also update default language / dialect below.
var langs =
[['Afrikaans',       ['af-ZA']],
 ['አማርኛ',           ['am-ET']],
 ['Azərbaycanca',    ['az-AZ']],
 ['বাংলা',          ['bn-BD', 'বাংলাদেশ'],
                     ['bn-IN', 'ভারত']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Dansk',           ['da-DK']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-KE', 'Kenya'],
                     ['en-TZ', 'Tanzania'],
                     ['en-GH', 'Ghana'],
                     ['en-NZ', 'New Zealand'],
                     ['en-NG', 'Nigeria'],
                     ['en-ZA', 'South Africa'],
                     ['en-PH', 'Philippines'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Filipino',        ['fil-PH']],
 ['Français',        ['fr-FR']],
 ['Basa Jawa',       ['jv-ID']],
 ['Galego',          ['gl-ES']],
 ['ગુજરાતી',       ['gu-IN']],
 ['Hrvatski',        ['hr-HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['ಕನ್ನಡ',        ['kn-IN']],
 ['ភាសាខ្មែរ', ['km-KH']],
 ['Latviešu',        ['lv-LV']],
 ['Lietuvių',        ['lt-LT']],
 ['മലയാളം',     ['ml-IN']],
 ['मराठी',           ['mr-IN']],
 ['Magyar',          ['hu-HU']],
 ['ລາວ',             ['lo-LA']],
 ['Nederlands',      ['nl-NL']],
 ['नेपाली भाषा',     ['ne-NP']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['සිංහල',        ['si-LK']],
 ['Slovenščina',     ['sl-SI']],
 ['Basa Sunda',      ['su-ID']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Kiswahili',       ['sw-TZ', 'Tanzania'],
                     ['sw-KE', 'Kenya']],
 ['ქართული',       ['ka-GE']],
 ['Հայերեն',         ['hy-AM']],
 ['தமிழ்',        ['ta-IN', 'இந்தியா'],
                     ['ta-SG', 'சிங்கப்பூர்'],
                     ['ta-LK', 'இலங்கை'],
                     ['ta-MY', 'மலேசியா']],
 ['తెలుగు',      ['te-IN']],
 ['Tiếng Việt',      ['vi-VN']],
 ['Türkçe',          ['tr-TR']],
 ['اُردُو',          ['ur-PK', 'پاکستان'],
                     ['ur-IN', 'بھارت']],
 ['Ελληνικά',        ['el-GR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['Українська',      ['uk-UA']],
 ['한국어',          ['ko-KR']],
 ['中文',            ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',          ['ja-JP']],
 ['हिन्दी',          ['hi-IN']],
 ['ภาษาไทย',         ['th-TH']]];






/*-----U_UpdateCountry --------------------------------------------------------
*
*/ 
function U_UpdateCountry() {
  for (var i = Id_select_dialect.options.length - 1; i >= 0; i--) {
    Id_select_dialect.remove(i);
  }
  var list = langs[Id_select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    Id_select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  Id_select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
} /* U_UpdateCountry */


const $STT = (function () {
  var _STT = {};
  _STT.U_Init          = U_Init_STT;       // function U_Init_STT();
  _STT.F_szMsg_STT     = F_szMsg_STT;      // function F_szMsg_STT();
  _STT.U_Start_STT     = U_Start_STT;      // function U_Start_STT(P_Event, P_U_CB0);
  _STT.U_Stop_STT      = U_Stop_STT;       // function U_Stop_STT();
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_STT;

/*----- Local Variables ----------------------------------------------*/

/*
*  About.
*/
var S_szHTML_DBox_About = `<div style="padding:10%;">
  <br><br><br><br>
  Program: <b>TUISys' Violetta.</b><br>
  Date: ${C_szDate_EdtLst} <br>
  Rel.: <b>${C_szRel_EdtLst}</b><br>
  Author: Luigi D. CAPRA<br>
  <br>
  Copyright (c): Luigi D. CAPRA, 2020..2022<br><br><hr><br><h3 style="text-align:center;">License</h3><br>
  This program comes with ABSOLUTELY NO WARRANTY; for details see <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL v. 3.0</a>.<br>
  This is free software, and you are welcome to redistribute it under certain conditions;<br>
  type <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL v. 3.0</a> for details.<br>  
  The library files could be redistribute at LGLP conditions. Type <a href="https://www.gnu.org/licenses/lgpl-3.0.txt">GNU LGPL v. 3.0</a> for details.<br>
  <br><br><br><br>
</div>`;

var S_SpeechRecognition;

var S_szText_Final = '';
var S_fIgnoreOnEnd;
var S_iStartTimestamp;
var S_imsTS_Lst = -1;
var S_fOnLine = false;

var S_U_CB0; /* Call-back */
 
/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/


/* -----  Speach To Text (DTT) ---- Voice Comprehension --------------------- */

/*-----F_is_TimeStamp --------------------------------------------------------
*
*/ 
function F_is_TimeStamp()
{
  var ims_cur = Date.now();
  var ims_Ela = ims_cur - S_ims_Init;
  
  return(Math.floor(ims_Ela / 1000));
} /* F_is_TimeStamp */

/*-----U_Upgrade--------------------------------------------------------
*
*/ 
function U_Upgrade() {
  U_ShowMsg('Id_Msg_upgrade');
} /* U_Upgrade */

/*-----U_linebreak --------------------------------------------------------
*
*/ 
var two_line = /\n\n/g;
var one_line = /\n/g;
function U_linebreak(P_szTranscript) {
  return P_szTranscript.replace(two_line, '<p></p>').replace(one_line, '\n');
} /* U_linebreak */

/*-----U_capitalize --------------------------------------------------------
*
*/ 
var first_char = /\S/;
function U_capitalize(P_szTranscript) {
  return P_szTranscript.replace(first_char, function(m) { return m.toUpperCase(); });
} /* U_capitalize */

/*-----U_showButtons --------------------------------------------------------
*
*/ 
var current_style;
function U_showButtons(P_style) {
  if (P_style == current_style) {
    return;
  }
  current_style = P_style;
}  /* U_showButtons */

/*-----U_ShowMsg --------------------------------------------------------
*
* Show message Nationalized.
*/ 
function U_ShowMsg(P_szId) {
  var szVisible = 'hidden';
  if (P_szId) {
    var Elem0 = document.getElementById(P_szId);
    if (Elem0) {
       Id_Msg.innerText = Elem0.innerText;
       szVisible = 'visible';
    } /* if */
  } /* if */
  if (typeof(Id_Msg) !== "undefined") {    
    Id_Msg.style.visibility = szVisible;
  } /* if */
} /* U_ShowMsg */

/*-----U_fOnLine --------------------------------------------------------
*
* Test Internet availability (online condition).
* The result is stored in S_fOnLine.
* Because "Mixed content" (see https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) the test must do reference to a resource served by a HTTPS server.
*/ 
async function U_fOnLine() {
  try {
    const OnLine = await fetch("https://luigidcapra.altervista.org/big/LCD/connesso.php");
    S_fOnLine = ((OnLine.status >= 200) && (OnLine.status < 300));
  } catch (P_Err) {
    S_fOnLine = false; /* offline */
  } /* if */
} /* U_fOnLine */

/*-----F_fOnLine --------------------------------------------------------
*
*/ 
function F_fOnLine()
{
  return(S_fOnLine);
} /* F_fOnLine */

/*-----U_Check --------------------------------------------------------
*
*/ 
function U_Check()
{
  if (!S_fOnLine) {
     Id_szMonitor.value = "Offline\n";
     if ($Root.F_fExist("$VConfig")) { 
        if (!$VConfig.F_ValSts_Get("fIgnore_OffLine")) {
          $Error.U_Error(C_jCd_Cur, 1, "Speach Recognition disabled because the System is OFFLINE", "", false);
        } /* if */   
     } /* if */  
  } /* if */
} /* U_Check */

/*-----F_szMsg_STT --------------------------------------------------------
*
*/ 
function F_szMsg_STT()
{
  var szMsg = S_szText_Final;
  S_szText_Final = "";
  szMsg = szMsg.trim();
  szMsg = szMsg.toLowerCase();
  return(szMsg);
} /* F_szMsg_STT */

/*-----U_Start_STT --------------------------------------------------------
*
*/
function U_Start_STT(P_Event, P_U_CB0)
{
  if (G_fActive_STT) {
    S_SpeechRecognition.stop();
    return;
  } /* if */
  
  S_U_CB0 = P_U_CB0;
  S_szText_Final = '';
  S_SpeechRecognition.lang = (C_szApp == "Viola")? Id_select_dialect.value: "it-IT";
  S_SpeechRecognition.start();
  S_fIgnoreOnEnd = false;
  if (C_szApp == "Viola") {
     Id_final_span.innerHTML = '';
     Id_interim_span.innerHTML = '';
     Id_Img_00.src = 'viola_files/res/viola.jpg';
     Id_Img_00.style.borderColor="cyan";
     U_ShowMsg('Id_Msg_allow');
     U_showButtons('none');
  } /* if */

  if (P_Event) {
     S_iStartTimestamp = P_Event.timeStamp;
  }
  else {
     S_iStartTimestamp = Date.now();
  } /* if */
  $Log.U_Log(C_jCd_Cur, 1, C_iLvl_STT, 0, "START");
} /* U_Start_STT */

/*-----U_Stop_STT --------------------------------------------------------
*
*/ 
function U_Stop_STT()
{
  if (S_SpeechRecognition) {
     $Log.U_Log(C_jCd_Cur, 2, C_iLvl_STT, 0, "STOP");
     S_SpeechRecognition.stop();
  } /* if */
} /* U_Stop_STT */

/*-----U_OnResult_STT --------------------------------------------------------
*
*/ 
function U_OnResult_STT(P_Event)
{
    var szInterim_Transcript = '';  
    S_imsTS_Lst = P_Event.timeStamp;
    
    if (typeof(P_Event.results) == 'undefined') {
      S_SpeechRecognition.onend = null;
      S_SpeechRecognition.stop();
      U_Upgrade();
      return;
    }
    for (var i = P_Event.resultIndex; i < P_Event.results.length; ++i) {
      if (P_Event.results[i].isFinal) {
          var szMsgLst = P_Event.results[i][0].transcript.trim();
          S_szText_Final += szMsgLst + "\n";
          if (S_U_CB0) {
             S_U_CB0(szMsgLst);
          } /* if */
      } else {
        szInterim_Transcript += P_Event.results[i][0].transcript;
      } /* if */
    } /* for */
    if (C_szApp == "Viola") {
        Id_final_span.innerText   = S_szText_Final;
        Id_interim_span.innerHTML = U_linebreak(szInterim_Transcript);    
        Id_szMonitor.value = S_szText_Final + "\n";
        const iLen = Id_szMonitor.value.length;
    
        // Move focus to End of textarea
        Id_szMonitor.setSelectionRange(iLen, iLen);
        Id_szMonitor.focus();
        
        if (S_szText_Final || szInterim_Transcript) {
          U_showButtons('inline-block');
        } /* if */
    } /* if */
    
    $Log.U_Log(C_jCd_Cur, 3, C_iLvl_STT, 0, S_szText_Final);
} /* U_OnResult_STT */

/*-----U_OnStart_STT --------------------------------------------------------
*
*/ 
function U_OnStart_STT(P_Event)
{
    G_fActive_STT = true;    
    $Log.U_Log(C_jCd_Cur, 4, C_iLvl_STT, 0, "onStart");
    if (C_szApp == "Viola") {
      U_ShowMsg('Id_Msg_speak_now');
      Id_Img_00.src = 'viola_files/res/viola1.jpg';
      Id_Img_00.style.borderColor="red";
    } /* if */
} /* U_OnStart_STT */

/*-----U_OnEnd_STT --------------------------------------------------------
*
*/ 
function U_OnEnd_STT(P_Event)
{
    G_fActive_STT = false;
    var iDelta = P_Event.timeStamp - S_imsTS_Lst;    
    $Log.U_Log(C_jCd_Cur, 5, C_iLvl_STT, 0, "onEnd " + iDelta);
    if (S_fIgnoreOnEnd) {
      return;
    } /* if */
    if (C_szApp == "Viola") {
      Id_Img_00.src = 'viola_files/res/distratta1.jpg';    
      Id_Img_00.style.borderColor="green";
      if (!S_szText_Final) {
        U_ShowMsg('Id_Msg_start');
        return;
      } /* if */
      U_ShowMsg('');
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
        var range = document.createRange();
        range.selectNode(document.getElementById('Id_final_span'));
        window.getSelection().addRange(range);
      } /* if */
    } /* if */
} /* U_OnEnd_STT */

/*-----U_OnError_STT --------------------------------------------------------
*
*/ 
function U_OnError_STT(P_Event)
{
  $Log.U_Log(C_jCd_Cur, 6, C_iLvl_Error, 0, "onError");
  if (C_szApp == "Viola") {
    if (P_Event.error == 'no-speech') {
      Id_Img_00.src = 'viola_files/res/no1.jpg';     
      Id_Img_00.style.borderColor="yellow";
      U_ShowMsg('Id_Msg_no_speech');
      S_fIgnoreOnEnd = true;
    } /* if */
    if (P_Event.error == 'audio-capture') {
      Id_Img_00.src = 'viola_files/res/no2.jpg';     
      Id_Img_00.style.borderColor="yellow";
      U_ShowMsg('Id_Msg_no_microphone');
      S_fIgnoreOnEnd = true;
    }  /* if */
    if (P_Event.error == 'not-allowed') {
      if (P_Event.timeStamp - S_iStartTimestamp < 100) {
        U_ShowMsg('Id_Msg_blocked');
      } else {
        U_ShowMsg('Id_Msg_denied');
      }  /* if */
      S_fIgnoreOnEnd = true;
    }  /* if */
  } /* if */
} /* U_OnError_STT */

/*-----U_Init_STT --------------------------------------------------------
*
*/
 
function U_Init_STT()
{
  if (!('webkitSpeechRecognition' in window)) {
    U_Upgrade();
  } else {
    S_SpeechRecognition = new webkitSpeechRecognition();
    S_SpeechRecognition.continuous = true;
    S_SpeechRecognition.interimResults = true;
    S_SpeechRecognition.onstart  = U_OnStart_STT;
    S_SpeechRecognition.onerror  = U_OnError_STT;
    S_SpeechRecognition.onend    = U_OnEnd_STT;
    S_SpeechRecognition.onresult = U_OnResult_STT; 
  }  /* if */

  if (C_szApp == "Viola") {
      for (var i = 0; i < langs.length; i++) {
        Id_select_language.options[i] = new Option(langs[i][0], i);
      } /* for */
      // Set default language / dialect.
      Id_select_language.selectedIndex = 21;
      U_UpdateCountry();
      Id_select_dialect.selectedIndex =  0;
  } /* if */

  
  if (S_SpeechRecognition) {
     U_ShowMsg('Id_Msg_start');
  } /* if */

  U_fOnLine();
  setTimeout(U_Check, 2000);
  
  U_Root0("$STT", C_jCd_Cur, 2); 
} /* U_Init_Name */

  U_Root0("$STT", C_jCd_Cur, 1); 
  return(_STT);
})();  /* STT */

 