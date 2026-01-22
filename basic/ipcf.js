/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021: 
* File        : ipcf.js
* Function    : Viola's InterProcess Communication functions.
* FirstEdit   : 01/07/2015
* LastEdit    : 18/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*     Characters '+' and '&' cannot be used in filenames because x-www-form-urlencoded requirements.
*
* P_CB_Rx  - response callback.
* P_CB_Err - Error Manager callback.
*/

"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $IPCF --------------------------------------------------------
*
*/ 
const $IPCF = (function () {
  var _IPCF = {};
  _IPCF.U_Init       = U_Init_IPCF;            // function U_Init_IPCF(P_Handler);

  _IPCF.U_Clear      = U_Clear;                // function U_Clear(P_fLocalStorage=true)
  _IPCF.U_Set_Reg    = U_Set_Reg;              // function U_Set_Reg(P_szReg, P_szVal, P_fLocalStorage=true)
  _IPCF.F_szReg_Get  = F_szReg_Get;            // function F_szReg_Get(P_szReg, P_fLocalStorage=true) 
  _IPCF.U_Set_JSON   = U_Set_JSON;             // function U_Set_JSON(P_szReg, P_JSON, P_fLocalStorage=true)  
  _IPCF.F_JSON_Get   = F_JSON_Get;             // function F_JSON_Get(P_szReg, P_fLocalStorage=true)
  _IPCF.U_Active     = U_Active;               // function U_Active(P_szPage);
  _IPCF.F_fActive    = F_fActive;              // function F_fActive(P_szPage);
  
  _IPCF.F_fOnLine    = F_fOnLine;              // function F_fOnLine();
  _IPCF.U_Chk_OnLine = U_Chk_OnLine;           // function U_Chk_OnLine();

  _IPCF.U_Chk_Conn   = U_Chk_Conn;             // function U_Chk_Conn();
  _IPCF.U_GetFile    = U_GetFile;              // function U_GetFile(P_szURL, P_CB_Rx, P_CB_Err, P_fBinary, R_Bag);
  _IPCF.U_UpLoad_File   = U_UpLoad_File;       // function U_UpLoad_File(P_szURL, P_szTxt);
  _IPCF.U_DownLoad_File = U_DownLoad_File;     // U_DownLoad_File(P_szURL, P_CB_Rx, P_CB_Err, P_fPeriodic=false, P_fBinary=false, R_Bag);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_IPCF;

/*----- Local Variables ----------------------------------------------*/

var S_fOnLine = false;
var S_szBuffer_RX = "";
var S_iCnt0 = 0;
var S_CB_Rx;

var S_fJSFS = true;    /* JavaScript File System */
var S_JSFS_LS  = {};
var S_JSFS_SS  = {};

/*--------------------------------------------------------------------*/

/* Communication via localstorage ------------------------------------------- */

/*-----U_Clear --------------------------------------------------------
*
* $NOOS$ WARNING: all data stored by web-pages with the "same origin" will be erased!
*/ 
function U_Clear(P_fLocalStorage=true)
{
  if (P_fLocalStorage) {
     localStorage.clear();  
  }
  else {
     sessionStorage.clear();
  } /* if */
  if (S_fJSFS) {
     U_Create_JSFS(P_fLocalStorage);
  } /* if */
} /* U_Clear */

/*-----U_Create_JSFS --------------------------------------------------------
*
*/ 
function U_Create_JSFS(P_fLocalStorage=true)
{
  var szDate = ($Root.F_fExist("$TimeDate"))? $TimeDate.F_szDate_Now("datetime-local"): "2025-01-01T12:00";
  var szTmp  = ["",0x41ff,szDate,0,"dir",""];
  
  if (P_fLocalStorage) {
     S_JSFS_LS  = {};
     S_JSFS_LS["."] = szTmp;
     U_Set_JSON(".", S_JSFS_LS, P_fLocalStorage);  
  }
  else {
     S_JSFS_SS  = {};
     S_JSFS_SS["."] = szTmp;
     U_Set_JSON(".", S_JSFS_SS, P_fLocalStorage); 
  } /* if */  
} /* U_Create_JSFS */

/*-----U_Set_Reg --------------------------------------------------------
*
*
*/ 
function U_Set_Reg(P_szReg, P_szVal, P_fLocalStorage=true)
{
  if (P_fLocalStorage) {
     localStorage.setItem(P_szReg, P_szVal);
     localStorage.setItem('iCnt', S_iCnt0++);
  }
  else {
     sessionStorage.setItem(P_szReg, P_szVal);
  } /* if */
  if (S_fJSFS && (P_szReg != ".")) {
      if (P_fLocalStorage) {
         S_JSFS_LS[P_szReg] = ["",0x41ff,$TimeDate.F_szDate_Now("datetime-local"),0,"file",""];
         U_Set_JSON(".", S_JSFS_LS, P_fLocalStorage);      
      }
      else {
         S_JSFS_SS[P_szReg] = ["",0x41ff,$TimeDate.F_szDate_Now("datetime-local"),0,"file",""];
         U_Set_JSON(".", S_JSFS_SS, P_fLocalStorage);
      } /* if */
  } /* if */
} /* U_Set_Reg */

/*-----F_szReg_Get --------------------------------------------------------
*
*
*/ 
function F_szReg_Get(P_szReg, P_fLocalStorage=true)
{
  if (P_fLocalStorage) {
     return(localStorage.getItem(P_szReg));
  }
  else {
     return(sessionStorage.getItem(P_szReg));
  } /* if */
} /* F_szReg_Get */

/*-----U_Set_JSON --------------------------------------------------------
*
*
*/ 
function U_Set_JSON(P_szReg, P_JSON, P_fLocalStorage=true)
{
  var szVal = JSON.stringify(P_JSON);
  U_Set_Reg(P_szReg, szVal, P_fLocalStorage);
} /* U_Set_JSON */

/*-----F_JSON_Get --------------------------------------------------------
*
*
*/ 
function F_JSON_Get(P_szReg, P_fLocalStorage=true)
{
  var szJSON = F_szReg_Get(P_szReg, P_fLocalStorage);
  var JSON0  = JSON.parse(szJSON);
  return(JSON0);
} /* F_JSON_Get */

/*-----U_Active --------------------------------------------------------
*
* Set I'm alive
*/ 
function U_Active(P_szReg)
{
  var ims_Time70_1 = +new Date();
  localStorage.setItem("IPC_" + P_szReg, ims_Time70_1);
} /* U_Active */

/*-----F_fActive --------------------------------------------------------
*
* Check I'm alive
*/ 
function F_fActive(P_szReg)
{
  var ims_Time70_1 = +new Date();
  var ims_Time70_0 = localStorage.getItem("IPC_" + P_szReg);
  var iRes = ims_Time70_1 - ims_Time70_0;
  return(iRes < 2000);
} /* F_fActive */

/* -------------------------------------------------------------------------- */  

/*-----U_Chk_OnLine --------------------------------------------------------
*
* Test Internet availability (online condition).
* The result is stored in S_fOnLine.
* Because "Mixed content" (see https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) the test must do reference to a resource served by a HTTPS server.
*/ 
async function U_Chk_OnLine(P_fErr) {
  var fOnLine0 = false;
  function U_CB_OnLine(P_Sts)
  {
    S_fOnLine = true;
    fOnLine0  = true;
  } /* U_CB_OnLine */

  function U_NotOnLine()
  {
    S_fOnLine = fOnLine0;
    if (!fOnLine0 && P_fErr) {
       $Error.U_Error(C_jCd_Cur, 1, "Internet connection missing!", "", false);
    } /* if */
  } /* U_NotOnLine */

  fOnLine0 = false; /* $DEBUG Bug Management  */
  setTimeout(U_NotOnLine, 2000);
  $IPCF.U_DownLoad_File('https://luigidcapra.altervista.org/connesso.php', U_CB_OnLine, U_Null, true, false);
} /* U_Chk_OnLine */

/*-----F_fOnLine --------------------------------------------------------
*
*/ 
function F_fOnLine(P_x=0)
{
  return(S_fOnLine);
} /* F_fOnLine */

/*-----U_Chk_Conn --------------------------------------------------------
*
* Check connection properties.
* FireFox doesn't support navigator.connection
*/ 
function U_Chk_Conn() {
  var szTmp = "";
  if (navigator.connection) {        
      // Network type that browser uses
      szTmp += '\n         type: ' + navigator.connection.type + "\n";
    
      // Effective bandwidth estimate
      szTmp += '     downlink: ' + navigator.connection.downlink + ' Mb/s' + "\n";
    
      // Effective round-trip time estimate
      szTmp += '          rtt: ' + navigator.connection.rtt + ' ms' + "\n";
    
      // Upper bound on the downlink speed of the first network hop
      szTmp += '  downlinkMax: ' + navigator.connection.downlinkMax + ' Mb/s' + "\n";
    
      // Effective connection type determined using a combination of recently
      // observed rtt and downlink values: ' +
      szTmp += 'effectiveType: ' + navigator.connection.effectiveType + "\n";
      
      // True if the user has requested a reduced data usage mode from the user
      // agent.
      szTmp += '     saveData: ' + navigator.connection.saveData + "\n";
      
      // Add whitespace for readability
      szTmp += '\n' + "\n";
      U_Monitor(szTmp); 
  } /* if */
} //* U_Chk_Conn */

/*-----U_Monitor --------------------------------------------------------
*
*/ 
function U_Monitor(P_szMsg)
{
  if (typeof(Id_szMonitor) != "undefined") {  
     Id_szMonitor.innerText = P_szMsg;
  } /* if */
} /* U_Monitor */

/*-----F_fChk_URL --------------------------------------------------------
*
* Check the correctness of the given URL.
*/ 
function F_fChk_URL(P_szURL, P_fErr)
{
  var aszPfx = {"http":"http", "file":"file"};
  P_szURL = P_szURL.trim();         // remove spaces.
  var szPfx = P_szURL.substr(0, 4);
  if (szPfx in aszPfx) {
     return(true);
  }
  else {
     if (P_fErr) {
        $Error.U_Error(C_jCd_Cur, 2, "Unexpected prefix", szPfx, false);
        return(false);
     } /* if */
  } /* if */
} /* F_fChk_URL */

/*-----F_szEnc --------------------------------------------------------
*
*/ 
function F_szEnc(P_szTxt)
{
  var szTxt = P_szTxt.replaceAll("&", "%26");   /* $NOTE: x-www-form-urlencoded forbids "&" and '+' chars!!! */
      szTxt =   szTxt.replaceAll("+", "%2b");
  return(szTxt);
} /* F_szEnc */

/*-----U_GetFile--------------------------------------------------------
*
*/  
function U_GetFile(P_szURL, P_CB_Rx, P_CB_Err, P_fBinary, R_Bag)
{
  U_DownLoad_File(P_szURL, P_CB_Rx, P_CB_Err, false, P_fBinary, R_Bag);
} /* U_GetFile*/

/*-----U_UpLoad_File --------------------------------------------------------
*
* UpLoad the given text P_szTxt on the server specified (P_szURL).
* Ex. $IPCF.U_UpLoad_File('http://localhost/Relay/irc/write.php/?szTopic=topic/pippo.txt&szUser=LCD', "red green blue");
*  MiniWeb.exe 165 is required!
*  
* https://stackoverflow.com/questions/23714383/what-are-all-the-possible-values-for-http-content-type-header
* https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
*/ 
function U_UpLoad_File(P_szURL, P_szTxt, P_fBinary=false)
{
  var szParams;
    
  F_fChk_URL(P_szURL, true);
  U_Monitor(P_szURL);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", P_szURL, true);
  
  // Track the state changes of the request.
  xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      
      if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
              S_szBuffer_RX = xhr.responseText;
              U_Log_IPCF(C_jCd_Cur, 7, "U_UpLoad_File Rx", P_szURL);                                  
              U_Monitor("\n" + xhr.responseText);
          } else {
              S_szBuffer_RX = F_szError(C_jCd_Cur, xhr.status);
          } /* if */
      } /* if */
  } /* function */

  if (P_fBinary) {  
      // Convert the TypedArray to a Blob
      szParams = new Blob([P_szTxt]);
  }
  else {
      // Send the proper header information along with the request
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      szParams = "szText=" + F_szEnc(P_szTxt);
  } /* if */

  xhr.send(szParams);    
  U_Log_IPCF(C_jCd_Cur, 8, "U_UpLoad_File Tx", P_szURL);
} /* U_UpLoad_File */

/*-----U_DownLoad_File --------------------------------------------------------
*
* Download file from the given website and process it using the callback (P_CB_Rx).
* Ex. $IPCF.U_DownLoad_File('http://localhost/Relay/irc/ajax_rd_6.php/?szTopic=tele&szUser=LCD', U_CB_NL_Cmd, U_CB_Err, true);
*/
var S_iCnt_U_DownLoad_File = 0; 
function U_DownLoad_File(P_szURL, P_CB_Rx, P_CB_Err, P_fPeriodic=false, P_fBinary=false, R_Bag)
{
  S_CB_Rx = P_CB_Rx;
  var xhr = new XMLHttpRequest();
  var fDbg;
  var iDebug0 = 0;
  if (P_szURL == "") {
     ALERT("Collection cannot be reloaded because URL missing.\n Probably the file was NOT loaded using FileManager.",1);
  } /* if */

  if ($Root.F_fExist("$VDebug")) { 
     iDebug0 = $VDebug.F_iDebug();
  } /* if */
  if (R_Bag && R_Bag.fKrypt) {
     xhr.responseType = "arraybuffer";
  } /* if */

  F_fChk_URL(P_szURL, true);
  xhr.open('GET', P_szURL);
  
  // Track state changes of the request.
  xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      
      if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
              S_iCnt_U_DownLoad_File++;
              if (P_fPeriodic) {
                 fDbg = true;
              }
              else {
                 fDbg = false;
              } /* if */
              if (P_fBinary) {
                 S_szBuffer_RX = new Uint8Array(xhr.response); 
              }
              else {
                 S_szBuffer_RX = xhr.responseText;
              } /* if */              
              if (!P_fPeriodic || (iDebug0 == C_iDebug_Max)) {
                 U_Log_IPCF(C_jCd_Cur, 5, "U_DownLoad_File Rx", P_szURL);
              } /* if */
              P_CB_Rx(S_szBuffer_RX, R_Bag);
          } else {
              S_szBuffer_RX = F_szError(C_jCd_Cur, xhr.status);
              if (P_CB_Err) {
                 P_CB_Err(xhr, P_szURL);
                 return;
              }
              else {
                 $Error.U_Error(C_jCd_Cur, 3, S_szBuffer_RX, P_szURL, false);
              } /* if */ 
          } /* if */
      } /* if */
  } /* function */

  xhr.send(null);
             
  if (!P_fPeriodic || (iDebug0 == C_iDebug_Max)) {
     U_Log_IPCF(C_jCd_Cur, 6, "U_DownLoad_File Tx", P_szURL);
  } /* if */
} /* U_DownLoad_File */

/*-----F_szError --------------------------------------------------------
*
*/ 
function F_szError(P_jCd, P_jStatus)
{
  var szMsg = "Data not available.";
   switch (P_jStatus) {
     case 0: {
          szMsg = "Timeout";
     } break;
     default : {
     } break;
   } /* switch */
   szMsg = "#" + P_jCd + " (" + P_jStatus + ") " + szMsg;
   return(szMsg);
} /* F_szError */

/*-----U_Log_IPCF --------------------------------------------------------
*
* Check if module Log is available.
*/ 
function U_Log_IPCF(P_jCd, P_1, P_2, P_3)
{
  if ($Root.F_fExist("$Log")) { 
     $Log.U_Log(C_jCd_Error, P_1, C_iLvl_RdWr, P_2, P_3);
  } /* if */
} /* U_Log_IPCF */

/*-----U_Init_IPCF --------------------------------------------------------
*
*/ 
function U_Init_IPCF(P_Handler)
{ 
  U_Chk_OnLine(false);
  if (S_fJSFS) {
     S_JSFS_LS = F_JSON_Get(".", true);
     if (!S_JSFS_LS) {
         U_Create_JSFS(true);
     } /* if */
     
     S_JSFS_SS = F_JSON_Get(".", false);
     if (!S_JSFS_SS) {
         U_Create_JSFS(false);
     } /* if */

  } /* if */

  if (P_Handler) {
  /*
   * The storage event of the Window interface fires when a storage area (localStorage)
   * has been modified in the context of another document.
   */
     if (window.addEventListener) {
       window.addEventListener("storage", P_Handler, false);
     } else {
       /* IE */
       window.attachEvent("onstorage", P_Handler);
     } /* if */  
  } /* if */
  U_Root0("$IPCF", C_jCd_Cur, 2); 
} /* U_Init_IPCF */

  U_Root0("$IPCF", C_jCd_Cur, 1);
  return(_IPCF);
})();  /* IPCF */

