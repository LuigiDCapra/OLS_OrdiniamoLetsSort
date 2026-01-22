/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : periodic.js
* Function    : Periodic Routines
* FirstEdit   : 15/12/2019
* LastEdit    : 13/12/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Data Browsing Environment.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* $IMPORTANT:
* 2025-09-08 RIMOSSO VINCOLO - Note: periodic.js for WE4 and periodic.js for OLS are +++ DIFFERENT +++, they cannot fused in the same file!
*/
"use strict";

var G_fPrdRefr = false;      /* Reload Collection */

const $Periodic = (function () {
  var _Periodic = {};
  _Periodic.U_Init            = U_Init_Periodic;     // function U_Init_Periodic();
  _Periodic.U_Start_Emulation = U_Start_Emulation;   // function U_Start_Emulation();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Periodic;

/*----- Local Variables ----------------------------------------------*/

var S_ims_Periodic = 250; 

var S_iTick_Cur = 0;         /* Ticks counter */
var S_iTick_Response = -1;   /* Tick in which the last Response was received. */
var S_iCnt_ErrResp = 0;      /* Number of request without error-response. */

var S_aCmd = [];             /* List of commands that should be executed in Emulation Mode. */
var S_fEmulate = false;
var S_iCnt_Emulate = 0;      /* Next command to execute. */
var S_iCnt_Exc_Ini = 0;      /* Initial number of exceptions */

/*--------------------------------------------------------------------*/
 
/*-----U_LocalHost --------------------------------------------------------
*
*/ 
function U_LocalHost()
{
  if (!S_fLocalHost) {
     $Error.U_Error(C_jCd_Cur, 1, "LocalHost NOT running!", "", false);
  } /* if */
} /* U_LocalHost */

/*-----F_fLocalHost --------------------------------------------------------
*
*/ 
function F_fLocalHost()
{
  return(S_fLocalHost);
} /* F_fLocalHost */

/*-----U_CB_NL_Cmd --------------------------------------------------------
*
* $ENTRY_POINT for External Commands.
*/
var S_imsSec70_Prv = 0;
function U_CB_NL_Cmd(P_szMsg)
{
  S_iTick_Response = S_iTick_Cur;     /* Record that the localhost is running. */
  
  var szCmd = P_szMsg.substr(4, 3);
  if (szCmd == '404') {
     /* NO command. */
     return;
  } /* if */

  var iPos = "\n#topic/.txt\n\n".length + C_szApp.length -2;  
  var szCmd = P_szMsg.substr(iPos);     /* 17 = command position. */
  
  var aMsg = szCmd.split('\nTMS:');
  if (aMsg[1] == S_imsSec70_Prv) {
     return;
  } /* if */
  szCmd = aMsg[0];
  S_imsSec70_Prv = aMsg[1];
  szCmd = szCmd.replace(/[\r\n]/gm, '');
  
  $Custom.U_CmdInt(szCmd);
} /* U_CB_NL_Cmd */

/*-----U_CB_Err --------------------------------------------------------
*
*/ 
function U_CB_Err()
{
   S_iCnt_ErrResp++;
} /* U_CB_Err */

//["BRKPNT","InpVal",null,null],

/*-----U_Start_Emulation --------------------------------------------------------
*
*/ 
function U_Start_Emulation()
{
 var UsrView0 = CL_UsrView0.F_UsrView_Selected();
 var XDB0 = UsrView0.XDB0;
 var Coll0 = XDB0.Coll0;
 
 if (Coll0[0][0] == "BRKPNT") {
    S_aCmd = Coll0;
 }
 else {
    $Error.U_Error(C_jCd_Cur, 2, "Attempt to run an invalid emulation file", "", false);
    return;
 } /* if */
  
 alert("Starting Emulation");

 S_fEmulate = true;   /* Reset emulation. */
 S_iCnt_Emulate = 0;
 S_iCnt_Exc_Ini = $Error.F_iCnt_Exc();
} /* U_Start_Emulation */

/*-----U_Emulate_DownLoad_File --------------------------------------------------------
* 
*/ 
function U_Emulate_DownLoad_File(P_szURL, P_CB_Rx, P_CB_Err, P_fPeriodic=false, R_Bag)
{
  var szMsg = S_aCmd[S_iCnt_Emulate++][0];
  if (szMsg != "STOP") {
     U_CB_NL_Cmd("\ntopic/tele.txt\n\n " + szMsg + "\nTMS:17281361" + S_iCnt_Emulate);
  }
  else {
     S_fEmulate = false;   /* Reset emulation. */
     S_iCnt_Emulate = 0;
     var iCnt_Exc_End = $Error.F_iCnt_Exc();
     
     alert("Emulation STOPPED\nNumber of Exceptions detected: " + (iCnt_Exc_End - S_iCnt_Exc_Ini));
  } /* if */
} /* U_Emulate_DownLoad_File */

/*-----U_Periodic --------------------------------------------------------
*
*/
function U_Periodic()
{
  if (!$VConfig.F_ValSts_Get("fEnaPeriodic")) {
     return;
  } /* if */
  S_iTick_Cur++;
  var iTmp = S_iCnt_ErrResp;
  if (G_fRefresh) {
     $DDJ.U_Refresh();
     G_fRefresh = false;
  } /* if */

  if ((S_iTick_Cur - S_iTick_Response < 4)  // If localhost is running check for messages
   || (S_iTick_Cur % 60 == 0)               // otherwise try to connect every 60 seconds.
  ) {      
     var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "readdel", C_szApp);      // $IMPORTANT: tele
     if (S_fEmulate) {
        U_Emulate_DownLoad_File(szURL, U_CB_NL_Cmd, U_CB_Err, true);
     }
     else {
        $IPCF.U_DownLoad_File(szURL, U_CB_NL_Cmd, U_CB_Err, true, false);
     } /* if */
  } /* if */
  if (G_fPrdRefr && (S_iTick_Cur % 10 == 9)) {
     /* Reload Collection. */
     $DDJ.U_Reload();
  } /* if */
  if (S_iTick_Cur % 10 == 9) {
     $IPCF.U_Chk_OnLine();
  } /* if */
  if (window.fLcdLcd) {   /* $VERSIONING */
     $LcdLcd.U_Periodic(S_iTick_Cur);
  } /* if */
} /* U_Periodic */

/*-----U_Init_Periodic --------------------------------------------------------
*
*/ 
function U_Init_Periodic()
{
  U_Root0("$Periodic", C_jCd_Cur);
  S_iTick_Response = -1;
/*
* Start periodic function.
*/
  setInterval(U_Periodic, S_ims_Periodic);
} /* U_Init_Periodic */

  return(_Periodic);
})();  /* $Periodic */

