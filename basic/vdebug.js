/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : vdebug.js
* Function    : Violetta Debugger
* FirstEdit   : 01/02/2021
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

/*
* C_iDebug_Dflt : Debug level set by default.
* C_iDebug_Dflt_Cfg : Debug level set by default in ddj_cfg.js.
*/
const C_iDebug_None     =  0;               // Disable Diagnostic completely.
const C_iDebug_Show     =  2;               // Unexpected exception.
const C_iDebug_UsrRtn   =  3;               // Error in User' Routine.
const C_iDebug_NoBeep   =  4;               // No Error, No Warning, No Beep
const C_iDebug_MakeBeep =  5;               // Signal Errors and Warning with Beeps
const C_iDebug_Dflt     =  5;
const C_iDebug_Error    =  5;               // Stop on Errors. Show Errors, Beep Enabled.
const C_iDebug_Warning  =  6;               // Stop on Warnings. Show Warnings.
const C_iDebug_Beep     =  8;               // Stop on Beeps
const C_iDebug_Button   =  9;               // Stop on buttons clicked
const C_iDebug_Link     = 10;               // Stop on link clicked
const C_iDebug_Max      = 10;               // Maximum diagnostic.
const C_iDebug_Dflt_Cfg = C_iDebug_Dflt;

/*----- Global Variables ---------------------------------------------*/

var G_fAsync_Debug = false;
var G_fDbg0_VDebug = false;                 /* Spare variable available for debug. */

var G_i_Debug = 0;
var G_j_Debug = 0;

/*----- Module $VDebug --------------------------------------------------------
*
*/ 
const $VDebug = (function () {
  var _VDebug = {};
  _VDebug.U_Init         = U_Init_VDebug;   // function U_Init_VDebug();
  _VDebug.U_Set_iDebug   = U_Set_iDebug;    // function U_Set_iDebug(P_iDebug);
  _VDebug.F_iDebug       = F_iDebug;        // function F_iDebug();

  _VDebug.U_Dbg_Halt     = U_Dbg_Halt;      // function U_Dbg_Halt(P_iDebug = C_iDebug_Dflt);
  _VDebug.U_Cond_ALERT   = U_Cond_ALERT;    // function U_Cond_ALERT(P_szMsg, P_fReArm=false);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_VDebug;

/*----- Local Variables ----------------------------------------------*/

var S_iDebug = C_iDebug_Dflt;

/*--------------------------------------------------------------------*/

/*-----U_Set_iDebug --------------------------------------------------------
*
*/ 
function U_Set_iDebug(P_iDebug)
{
  S_iDebug = P_iDebug;
} /* U_Set_iDebug */

/*-----F_iDebug --------------------------------------------------------
*
*/ 
function F_iDebug()
{ 
  return(S_iDebug);
} /* F_iDebug */

/*-----U_Dbg_Halt --------------------------------------------------------
*
*/
function U_Dbg_Halt(P_iDebug = C_iDebug_Dflt)
{ 
  if (P_iDebug <= S_iDebug) {
  
  var i = G_i_Debug;
  var j = G_j_Debug;
     debugger;
  } /* if */
} /* U_Dbg_Halt */

/*-----U_Cond_ALERT --------------------------------------------------------
*
* Conditional ALERT could be enabled
* - inserting in the code the call $VConfig.U_Set_ValSts("fHalt_Debug", true);
* - or by the User openening the Configuration Panel and checking fHalt_Debug flag. 
*/ 
function U_Cond_ALERT(P_szMsg, P_fReArm=false)
{
  if ($Root.F_fExist("VConfig")) {
     var fHalt_Debug = $VConfig.F_i_ValSts_Get("fHalt_Debug");
     if (!P_fReArm) {
        /* Inhibit ALERT. */
        $VConfig.U_Set_ValSts("fHalt_Debug", false);
     } /* if */
     if (fHalt_Debug) {
        ALERT(P_szMsg, 1);
     } /* if */
  } /* if */
} /* U_Cond_ALERT */

/*-----U_Init_VDebug --------------------------------------------------------
*
*/ 
function U_Init_VDebug()
{
  U_Root0("$VDebug", C_jCd_Cur, 2);
} /* U_Init_Name */

  U_Root0("$VDebug", C_jCd_Cur, 1);
  return(_VDebug);
})();  /* VDebug */

/*-----ALERT --------------------------------------------------------
*
*/
function ALERT(P_szMsg, P_iDebug = C_iDebug_Dflt)
{
  var jLog = P_iDebug;
  
  if (P_iDebug < $VDebug.F_iDebug()) {           /* Inhibit warning such that (P_iDebug > S_iDebug)  */
      if (!P_szMsg) {
         P_szMsg = "";
      } /* if */
      if ($Root.F_fExist("Log")) {
         $Log.U_Log(C_jCd_VDebug, 2, jLog, "ALERT", P_szMsg);
      } /* if */
      alert("ALERT" + " " + P_szMsg);
      debugger;
  }
  else {
      if ($Root.F_fExist("Log")) {
         $Log.U_Log(C_jCd_VDebug, 3, jLog, "ALERT", P_szMsg);
      } /* if */
  } /* if */
} /* ALERT */

