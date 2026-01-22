/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : error.js
* Function    : Error Management.
* FirstEdit   : 03/01/2021
* LastEdit    : 09/01/2026
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
*
*/

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/* # ---- Object Error --------------------------------------------------------
*
* "Error"
*/ 
const $DBox_Error = (function(){
  var _DBox_Error = {};
  _DBox_Error.U_Open     = U_Open;      // function U_Open(P_Id, P_szMsg);
  _DBox_Error.U_Cancel   = U_Close;     // function U_Close(P_Id);
  _DBox_Error.U_Confirm  = U_Confirm;   // function U_Confirm(P_Id);
  _DBox_Error.U_Set_CB   = U_Set_CB;    // function U_Set_CB(P_Id);
  
var S_U_CB_Close;     /* Recovery routine run for "close". */
var S_U_CB_Confirm;   /* Recovery routine run for "confirm". */

/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Bag)
{
  Id_szMsgErr.innerText = P_Bag;  // 22/08/2025  P_Bag = szMsg.
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{
  if ($Root.F_fExist("$TTS")) {     
     $TTS.U_Stop_TTS();              /* STOP Voice */
  } /* if */
  if (S_U_CB_Close) {                /* Run recovery call back */
     var U_CB_Close = S_U_CB_Close;
     S_U_CB_Close   = C_Undefined;   /* Clear callbacks. */
     S_U_CB_Confirm = C_Undefined;
     U_CB_Close();
  } /* if */
} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm(P_Bag)
{
  /* Let's TTS' Voice complete the reading of the message. */
  if (S_U_CB_Confirm) {              /* Run recovery call back */
     var U_CB_Confirm = S_U_CB_Confirm;
     S_U_CB_Close   = C_Undefined;   /* Clear callbacks. */
     S_U_CB_Confirm = C_Undefined;
     U_CB_Confirm();
  } /* if */
} /* U_Confirm */

/*-----U_Set_CB --------------------------------------------------------
*
* Set CallBacks.
* $NOTE: callbacks must be rearmed at every exception.
* $DBox_Error.U_Set_CB();
*/ 
function U_Set_CB(P_U_CB_Close, P_U_CB_Confirm)
{
  S_U_CB_Close   = P_U_CB_Close;
  S_U_CB_Confirm = P_U_CB_Confirm;
} /* U_Set_CB */

  return(_DBox_Error);
})(); /* # END - $DBox_Error Object */

/*----- Module $Error --------------------------------------------------------
*
*/ 
const $Error = (function () {
  var _Error = {};
  _Error.U_Init        = U_Init_Error;     // function U_Init_Error();
  _Error.U_Error       = U_Error;          // function U_Error(P_jCd, P_1, P_2, P_3);
  _Error.U_Warning     = U_Warning;        // function U_Warning(P_jCd, P_1, P_2, P_3, P_fSilent=true, P_fThrow);
  _Error.U_Message     = U_Message;        // function U_Message(P_jCd, P_1, P_2, P_3);
  _Error.U_Beep        = U_Beep;           // function U_Beep();
  _Error.U_Chk_Nul     = U_Chk_Null;       // function U_Chk_Null(P_Val);
  _Error.U_Try         = U_Try;            // function U_Try(P_szCode_Try);
  _Error.U_Try2        = U_Try2;           // function U_Try2(P_szCode_Try);
  _Error.U_Catch       = U_Catch;          // function U_Catch(P_jCd, P_1, P_Err);
  _Error.F_iCnt_Exc    = F_iCnt_Exc;       // function F_iCnt_Exc();
  _Error.F_szErr_Catch = F_szErr_Catch;    // function F_szErr_Catch(P_Err);
  _Error.U_Set_fThrow  = U_Set_fThrow;     // function U_Set_fThrow(P_fThrow);

  _Error.U_More_Infos  = U_More_Infos;     // function U_More_Infos();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Error;

/*----- Local Variables ----------------------------------------------*/

var S_fNestedErr = false;                  /* Flag used to detect errors occurring inside "error reporting" routines. */
var S_iCnt_Exc = 0;
var S_fThrow = true;

/*
*  Error.
*/
var S_szHTML_Error = `<div style="padding:10%;">
  <br><br><br><br>
  <div id="Id_szMsgErr">.</div>
  <br><br><br><button onclick="$Error.U_More_Infos();">More Infos</button><br>
</div>`;

/*--------------------------------------------------------------------*/

/*-----U_Set_fThrow --------------------------------------------------------
*
*/ 
function U_Set_fThrow(P_fThrow)
{
  S_fThrow = P_fThrow;
} /* U_Set_fThrow */

/*-----U_Chk_Null --------------------------------------------------------
*
*/ 
function U_Chk_Null(P_Val)
{
  if (typeof(P_Val) == "undefined") {
     $Error.U_Error(C_jCd_Error, 1, "Value Null or Undefined", "");  
  } /* if */
} /* U_Chk_Null */

/*-----U_Try --------------------------------------------------------
*
* Try the given string of code (P_szCode_Try).
* 
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_direct_eval!
*/ 
function U_Try(P_szCode_Try)
{
  try {
      eval(P_szCode_Try);
      // eval(`(${P_szCode_Try})`);
  } catch (P_Err) {
      var szMsg = "";

      if (P_Err) {
         if (!P_Err.Knd) {
            szMsg = P_Err.message + "\n" + P_Err.fileName + "\n" + P_Err.lineNumber;
         } /* if */   
      }
      else {
         szMsg = "P_Err undefined";
      } /* if */
      if (szMsg) {
         /* UnExpected Error */
         console.log("U_Try(); UnExpected Error\n" + szMsg);
         if ($Root.F_fExist("$VDebug")) {               
            ALERT("U_Try(); UnExpected Error\n" + szMsg, C_iDebug_Show);
         }
         else { 
            alert("U_Try(); UnExpected Error\n" + szMsg);
         } /* if */      
      } /* if */
  } /* try catch */  
} /* U_Try */

/*-----U_Try2 --------------------------------------------------------
*
* Try the given function P_pFn_Try(); 
* if fails call the error management routine P_pFn_Err().
*/ 
function U_Try2(P_pFn_Try, P_pFn_Err)
{
  try {
      P_pFn_Try();
  } catch (P_Err) {
      var szMsg = "";

      if (P_pFn_Err) {
         P_pFn_Err(P_Err);   /* Call user defined error management routine. */     
      }
      else {
         if (P_Err) {
            if (!P_Err.Knd) {
               szMsg = P_Err.message + "\n" + P_Err.fileName + "\n" + P_Err.lineNumber;
            } /* if */
         }
         else {
            szMsg = "P_Err undefined";
         } /* if */
         if (szMsg) {
            /* UnExpected Error */
            console.log("U_Try(); UnExpected Error\n" + szMsg); 
            ALERT("U_Try(); UnExpected Error\n" + szMsg, C_iDebug_Show);      
         } /* if */
      } /* if */
  } /* try catch */  
} /* U_Try2 */

/*-----U_Catch --------------------------------------------------------
*
*/ 
function U_Catch(P_jCd, P_1, P_Err)
{
  if (!P_Err) {
      $Error.U_Error(C_jCd_Error, 2, "Unexpected Error Catched X\n" + P_jCd + "." + P_1 + "\n", 0);
  }
  else if (!P_Err.Knd) {
      $Error.U_Error(C_jCd_Error, 3, "Unexpected Error Catched Y\n" + P_jCd + "." + P_1 + "\n" + P_Err.filename + "\nline: " + P_Err.lineNumber +  "\n" + P_Err.message, "");
  }
  else {
     /* Regenerate error report */
//     ALERT("Catch", 1);
//     U_Throw("Error", P_Err.szMsg);
  } /* if */
} /* U_Catch */

/*-----U_Throw --------------------------------------------------------
*
* Prevent "uncaught errors" using throw.
*/ 
function U_Throw(P_szExc, P_szMsg)
{
/*
* $NOTE: Using FireFox in debugger.
* If you are annoyed by the fact that the debugger hangs trying to execute the following line of code reporting "Paused on exception", you can prevent it clicking on the "Paused on exception" checkbox of debugger panel.
*/
  if (S_fThrow) {
     throw ({"Knd":P_szExc, "szMsg":P_szMsg}); 
  } /* if */
} /* U_Throw */

/*-----U_Error -----------------------------------------------------------------
*
*/ 
function U_Error(P_jCd, P_1, P_2, P_3)
{
  $VDebug.U_Dbg_Halt(C_iDebug_Error); 
  var szMsg = "Error: " + P_jCd;
  
  S_iCnt_Exc++;
  
  if (S_fNestedErr) {    /* Manage nested errors. */
     alert(`NESTED ERRORS\n${P_jCd}\n${P_1}\n${P_2}\n${P_3}\n${P_4}`);
     S_fNestedErr = false;
     return; 
  } /* if */
  S_fNestedErr = true;
  
  U_LastErr(P_jCd, P_1, P_2, P_3);
  
  if (P_1) {
     szMsg += "." + P_1;
       if (P_2) {
           szMsg += " - " + P_2;
           if (P_3) {
               szMsg += "\n" + P_3;        
           } /* if */
       } /* if */
  } /* if */
  
  U_Log_Error(C_jCd_Cur, 1, C_iLvl_Error, "+++ ERROR +++", szMsg);
  console.log(szMsg);
  
  if ($Root.F_fExist("$VDebug")) { 
      var iDebug0 = $VDebug.F_iDebug();
      if (iDebug0 >= C_iDebug_Error) {
         /* Signal the problem opening the Error DBox . */
         U_Speech("ERRORE: " + szMsg);
         U_DBox_Error(szMsg);
      }
      else if (iDebug0 == (C_iDebug_Error -1)) {
         /* Emit only a Beep. */
         U_Beep();
      } /* if */  
  } /* if */
  
  S_fNestedErr = false;
  U_Throw("Error", szMsg);
} /* U_Error */

/*-----U_Warning -----------------------------------------------------------------
*
* $DEBUG: P_fSilent = true allow the caller to declass the warning in a beep preserving the Warning call.
*/ 
function U_Warning(P_jCd, P_1, P_2, P_3, P_fSilent=true, P_fThrow=false)
{
  $VDebug.U_Dbg_Halt(C_iDebug_Warning);
  var szMsg = "Warning: " + P_jCd;

  S_iCnt_Exc++;

  U_LastErr(P_jCd, P_1, P_2, P_3);

  if (P_1) {
     szMsg += "." + P_1;
       if (P_2) {
           szMsg += " - " + P_2;
           if (P_3) {
               szMsg += "\n" + P_3;         
           } /* if */
       } /* if */
  } /* if */
  
  U_Log_Error(C_jCd_Cur, 2, C_iLvl_Warning, "+++ WARNING +++", szMsg);
  console.log(szMsg);
  
  if ($Root.F_fExist("$VDebug")) { 
      iDebug0 = $VDebug.F_iDebug();
      if (iDebug0 >= C_iDebug_Warning) {
         /* Signal the problem opening the Error DBox . */
         P_fSilent = false;
      }
      else {
         /* Inhibit Warnings. */
         P_fSilent = true;
      } /* if */  
  } /* if */
      
  if (!P_fSilent) {
     U_Speech("ATTENZIONE: " + szMsg);
     U_DBox_Warn(szMsg); 
  }
  else if (iDebug0 == (C_iDebug_Warning -1)) {
     /* Emit only a Beep. */
     U_Beep();
  } /* if */
  
  if (P_fThrow) {
     U_Throw("Warning", szMsg);
  } /* if */ 
} /* U_Warning */

/*-----U_Message -----------------------------------------------------------------
*
* Show a WARNING message. Not maskerable!
*/ 
function U_Message(P_jCd, P_1, P_2, P_3)
{
  $VDebug.U_Dbg_Halt(C_iDebug_Warning);
  var szMsg = "Warning: " + P_jCd;

  S_iCnt_Exc++;

  U_LastErr(P_jCd, P_1, P_2, P_3);

  if (P_1) {
     szMsg += "." + P_1;
       if (P_2) {
           szMsg += " - " + P_2;
           if (P_3) {
               szMsg += "\n" + P_3;         
           } /* if */
       } /* if */
  } /* if */
  
  U_Log_Error(C_jCd_Cur, 2, C_iLvl_Warning, "+++ WARNING +++", szMsg);
  console.log(szMsg);

  U_Speech("ATTENZIONE: " + szMsg);
  U_DBox_Warn(szMsg); 
} /* U_Message */ 

/* ----- U_Beep ------------------------------------------------------------------------
*
* Beep could not be used anymore because it should be triggered by a user's event!!!
*/
function U_Beep(P_jCd, P_1, P_2, P_3) {

  function U_Beep0()
  {
    function U_Stop() {
      Oscillator.stop();
    } /* U_Stop */
    
    var iHz_ = 200;
    var szWave = "sine";
    var ims_Dur = 200;
    
    if ((16 < iHz_) && (iHz_ < 20000)) {
       // create web audio api context
       var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
       // create Oscillator node
       var Oscillator = audioCtx.createOscillator();
   
       Oscillator.type = szWave;
       Oscillator.frequency.value = iHz_; // value in hertz
       Oscillator.connect(audioCtx.destination);
       Oscillator.start();  

       setTimeout(U_Stop, ims_Dur);
    } /* if */
  } /* U_Beep0*/

  $VDebug.U_Dbg_Halt(C_iDebug_Beep);
  var szMsg = "Beep";
  
  if (P_1) {
     szMsg += "." + P_1;
       if (P_2) {
           szMsg += " - " + P_2;
           if (P_3) {
               szMsg += " " + P_3;         
           } /* if */
       } /* if */
  } /* if */

  U_Log_Error(C_jCd_Cur, 3, C_iLvl_Beep, "Beep", szMsg);

  var iDebug0 = $VDebug.F_iDebug();
  if (iDebug0 >= C_iDebug_MakeBeep) {
     setTimeout(U_Beep0, 10);
  } /* if */
} /* U_Beep */

/*-----U_Speech --------------------------------------------------------
*
* Check if modules VConfig and TTS are availables.
*/ 
function U_Speech(P_szTxt)
{
  if ($Root.F_fExist("$VConfig") && $Root.F_fExist("$TTS")) {
     if ($VConfig.F_ValSts_Get("fVoice_Error")) {
        $TTS.U_Long_speech(P_szTxt);
     } /* if */ 
  } /* if */
} /* U_Speech */

/*-----U_Log_Error --------------------------------------------------------
*
* Check if module Log is available.
*/ 
function U_Log_Error(P_jCd, P_1, P_iLvl, P_2, P_3)
{
  if ($Root.F_fExist("$Log")) { 
     $Log.U_Log(C_jCd_Error, P_1, P_iLvl, P_2, P_3);
  } /* if */
} /* U_Log_Error */

/*-----U_DBox_Error --------------------------------------------------------
*
* Check if module DBox is available.
*/ 
function U_DBox_Error(P_szMsg)
{
  if (typeof(CL_DBox) != "undefined") {
     var Bag0 = P_szMsg;
     $Error.DBox_Error.U_Hub(C_JPnl_Open, Bag0);
  } /* if */
} /* U_DBox_Error */

/*-----U_DBox_Warn --------------------------------------------------------
*
* Check if module DBox is available.
*/ 
function U_DBox_Warn(P_szMsg)
{
  if (typeof(CL_DBox) != "undefined") {
     var Bag0 = P_szMsg;
     $Error.DBox_Error.U_Hub(C_JPnl_Open, Bag0);
  } /* if */
} /* U_DBox_Warn */

/*-----U_LastErr --------------------------------------------------------
*
*/
var S_LastErr = []; 
function U_LastErr(P_jCd, P_1, P_2, P_3)
{
  S_LastErr = [P_jCd, P_1, P_2, P_3];
} /* U_LastErr */

/*-----F_iCnt_Exc --------------------------------------------------------
*
*/ 
function F_iCnt_Exc()
{
  return(S_iCnt_Exc);
} /* F_iCnt_Exc */

/*-----F_szErr_Catch --------------------------------------------------------
*
* Prepare error message for JS standard errors.
*/ 
function F_szErr_Catch(P_Err)
{
  var szErr = "";
  if (typeof(P_Err.message) != "undefined") {
      szErr += P_Err.message + "\n"; 
  } /* if */
  if (typeof(P_Err.fileName) != "undefined") {
      szErr += P_Err.fileName + "\n";
  } /* if */
  if (typeof(P_Err.lineNumber) != "undefined") {
      szErr += P_Err.lineNumber; 
  } /* if */
  return(szErr);
} /* F_szErr_Catch */

/*-----U_More_Infos --------------------------------------------------------
*
*/ 
function U_More_Infos()
{
  [P_jCd, P_1, P_2, P_3] = S_LastErr;
  var szId = `${P_jCd}_${P_1}`;
  var szURL = `ols_files/help/error.html#Id_Sec_${szId}`;
  $DDJ.F_Window_open(szURL);
} /* U_More_Infos */

/*-----U_Init_Error --------------------------------------------------------
*
*/
function U_Init_Error()
{
  if (typeof(CL_DBox) != "undefined") {
      _Error.DBox_Error = new CL_DBox("Id_Div_DBox0", "$Error.DBox_Error", "Error",   S_szHTML_Error, $DBox_Error.U_Open, $DBox_Error.U_Cancel, $DBox_Error.U_Confirm, null, "Error");
      _Error.DBox_Warn  = new CL_DBox("Id_Div_DBox0", "$Error.DBox_Warn",  "Warning", S_szHTML_Error, $DBox_Error.U_Open, $DBox_Error.U_Cancel, $DBox_Error.U_Confirm, null, "Warning");
  } /* if */

  U_Root0("$Error", C_jCd_Cur, 2);
} /* U_Init_Error */

  U_Root0("$Error", C_jCd_Cur, 1);
  return(_Error);
})();  /* Error */
