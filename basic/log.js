/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : log.js
* Function    : Log debug infos.
* FirstEdit   : 01/02/2021
* LastEdit    : 06/01/2026
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
* The following list is similar, but not exactly equal, to the list in log.js.
*/

const C_jLog_0  = 0;
const C_jLog_1  = 1;
const C_jLog_2  = 2;
const C_jLog_3  = 3;
const C_jLog_4  = 4;
const C_jLog_5  = 5;
const C_jLog_6  = 6;
const C_jLog_7  = 7;
const C_jLog_8  = 8;
const C_jLog_9  = 9;
const C_jLog_10 = 10;

const C_iLvl_InitEnd =  0;   /* Events inserted in Log. */
const C_iLvl_Error   =  1;
const C_iLvl_Command =  2;
const C_iLvl_STT     =  2;
const C_iLvl_Warning =  3;
const C_iLvl_UndId   =  3;

const C_iLvl_Dflt    =  5;   /* Events NOT inserted in Log. */
const C_iLvl_CellSel =  5;
const C_iLvl_Select  =  5;
const C_iLvl_Init    =  5;
const C_iLvl_DBox    =  5;
const C_iLvl_RdWr    =  6;
const C_iLvl_DispTbl =  7;
const C_iLvl_EdtCell =  7;
const C_iLvl_sel     =  8;
const C_iLvl_Beep    =  9;
const C_iLvl_TTS     =  9;
const C_iLvl_Kinae   =  9;
const C_iLvl_Max     = 10;

/*----- Global Variables ---------------------------------------------*/

var G_aRcd_Log = [];

/*----- Module $Log --------------------------------------------------------
*
*/ 
const $Log = (function () {
  var _Log = {};
  _Log.U_Init  = U_Init_Log;     // function U_Init_Log();
  _Log.U_Log   = U_Log;          // function U_Log(P_jCd, P_jReg, P_iSig, P_szKnd, P_szMsg);
  _Log.U_Dump  = U_Dump;         // function U_Dump();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Log;

/*----- Local Variables ----------------------------------------------*/

var S_ims70_Ini = Date.now();          /* Initial TimeStamp */

/*--------------------------------------------------------------------*/

/*-----U_Dump --------------------------------------------------------
*
*/ 
function U_Dump()
{
} /* U_Dump */

/*-----U_Log --------------------------------------------------------
*
*/ 
function U_Log(P_jCd, P_jReg, P_iSig, P_szKnd, P_szMsg)
{
  var ims70_Now = Date.now();
  var is_Ela = (ims70_Now - S_ims70_Ini) / 1000;
  G_aRcd_Log.push([is_Ela, P_jCd, P_jReg, P_iSig, P_szKnd, P_szMsg]);

  if ($Root.F_fExist("$VConfig")) { 
     if ($VConfig.F_ValSts_Get("fSend_DebugInfo")) {
        if ($Root.F_fExist("$IPCF")) {
           if (P_iSig < C_iLvl_Dflt) {
              U_Send_Report(P_jCd, P_jReg, P_iSig, P_szKnd, P_szMsg);
           } /* if */           
        } /* if */
     } /* if */ 
  } /* if */
} /* U_Log */

/*-----U_Send_Report --------------------------------------------------------
*
*/ 
function U_Send_Report(P_jCd, P_jReg, P_iSig, P_szKnd, P_szMsg)
{
  var ims70_Now = Date.now();
  var Rcd0 = [ims70_Now, C_szApp, C_szRel_EdtLst, P_jCd, P_jReg, P_iSig, P_szKnd, P_szMsg];
  var szJSON = JSON.stringify(Rcd0) + ",\n";
  var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "append", `topic/log.arcd&szUser=LCD`);
  $IPCF.U_UpLoad_File(szURL, szJSON); 
} /* U_Send_Report */

/*-----U_Init_Log --------------------------------------------------------
*
*/ 
function U_Init_Log()
{
  U_Log(C_jCd_Cur, 1, C_jLog_0, "START", "");
  
  U_Root0("$Log", C_jCd_Cur, 2);
} /* U_Init_Log */

  U_Root0("$Log", C_jCd_Cur, 1);
  return(_Log);
})();  /* Log */

