/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : ols.js
* Function    : OLS' js file.
* FirstEdit   : 03/11/2021
* LastEdit    : 05/02/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
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
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

const $OLS = (function () {
  var _OLS = {};
  _OLS.U_Init           = U_Init_OLS;        // function U_Init_OLS();
  _OLS.U_Initialize     = U_Initialize;      // function U_Initialize();

  _OLS.U_Ld_Coll        = U_Ld_Coll;         // function U_Ld_Coll(P_fUpdate=false);
  _OLS.U_Collections    = U_Collections;     // function U_Collections();
  _OLS.U_History        = U_History;         // function U_History();
  _OLS.U_Dashboard      = U_Dashboard;       // function U_Dashboard();

  _OLS.U_Disk           = U_Disk;            // function U_Disk();
  _OLS.U_Apps           = U_Apps;            // function U_Apps();
  _OLS.U_Log            = U_Log;             // function U_Log();
  _OLS.U_CdF            = U_CdF;             // function U_CdF();
  _OLS.U_Tree           = U_Tree;            // function U_Tree();
  
  _OLS.U_Span_OLS2      = U_Span_OLS2;       // function U_Span_OLS2();
  _OLS.U_Calculator     = U_Calculator;      // function U_Calculator();
  _OLS.U_FlMan          = U_FlMan;           // function U_FlMan();
  _OLS.U_JSInt          = U_JSInt;           // function U_JSInt();
  _OLS.U_VLS            = U_VLS;             // function U_VLS();
  _OLS.U_WE4            = U_WE4;             // function U_WE4();
   
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_OLS;

/*----- Local Variables ----------------------------------------------*/

var S_aFld_aEmpty = [
{"iPos0":0,"iPos1":0,"fVisible":true,"szNm":"Empty0","szCaption":"Empty0","szType":"string","iLen":8,"fRecalc":false,"szCode":"","szRem":""},
{"iPos0":1,"iPos1":1,"fVisible":true,"szNm":"Empty1","szCaption":"Empty1","szType":"string","iLen":8,"fRecalc":false,"szCode":"","szRem":""}
];

var S_aEmpty = [
[]
];

var S_Win_FlMan;
var S_Win_JSInt;
var S_Win_WE4;
var S_Win_VLS;
var S_Win_Tele;

/*--------------------------------------------------------------------*/

/*-----U_Span_OLS2 --------------------------------------------------------
*
* Span anothe copy of OLS.
*/ 
function U_Span_OLS2()
{
  window.open('ols.html', '_blank', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=0,left=0,  width=960');
  window.open('ols.html', '_blank', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=0,left=960,width=960');
} /* U_Span_OLS2 */

/*-----U_Calculator --------------------------------------------------------
*
*/ 
function U_Calculator()
{
  window.open('calcolatrice.htm', '_blank', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=0,left=1000,width=900,height=500');
} /* U_Calculator */

/*-----U_FlMan --------------------------------------------------------
*
* Open FileManager in a separate Window.
*/ 
function U_FlMan()
{
  if (!G_fLocal) {
      $DDJ.DBox_InpData.U_Hub(C_JPnl_Cancel);
      S_Win_FlMan = window.open('flman.html', '_FlMan', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=0,left=600,width=1200,height=800');
      var Doc0 = S_Win_FlMan.document;  
  }
  else {
      // $ACP.U_Open_Alert("Please WAIT for reloading.");
      $DDJ.U_Reopen();
  } /* if */
} /* U_FlMan */

/*-----U_JSInt --------------------------------------------------------
*
* Open a daughter process in a tab and run js_int.
*/
function U_JSInt()
{
  if (!G_fLocal) {     
      S_Win_JSInt = $DDJ.F_Window_open('js_int.htm', '_Js_Int');
      var Doc0 = S_Win_JSInt.document;  
  }
  else {
      $ACP.U_Open_Confirm("JsInt should be opened through the Web Server,<br>would you like to reload OLS?", $DDJ.U_Reopen);
      return; /* $IMPORTANT! - We must avoid double call of U_Open_Confirm(); if flag fEnaPeriodic is disabled! */
  } /* if */
  var fEnaPeriodic = $VConfig.F_ValSts_Get("fEnaPeriodic");
  if (!fEnaPeriodic) {
     $ACP.U_Open_Confirm("Inter process communication NOT enabled. Would you like to enable periodic polling?", $DDJ.U_EnaPeriodic);
  } /* if */
} /* U_JSInt */

/*-----U_WE4 --------------------------------------------------------
*
* Open a daughter process in a tab and run WE4.
*/ 
function U_WE4()
{
  if (!G_fLocal) {     
      var UsrView0 = CL_UsrView0.F_UsrView_Selected();
      G_UsrView_IPC = UsrView0;  
      S_Win_WE4 = $DDJ.F_Window_open('we4.htm', '_WE4');
  }
  else {
      $ACP.U_Open_Confirm("Editor should be opened through the Web Server,<br>would you like to reload OLS?", $DDJ.U_Reopen);
      return; /* $IMPORTANT! - We must avoid double call of U_Open_Confirm(); if flag fEnaPeriodic is disabled! */
  } /* if */
  var fEnaPeriodic = $VConfig.F_ValSts_Get("fEnaPeriodic");
  if (!fEnaPeriodic) {
     $ACP.U_Open_Confirm("Inter process communication NOT enabled. Would you like to enable periodic polling?", $DDJ.U_EnaPeriodic);
  } /* if */
} /* U_WE4 */

/*-----U_VLS --------------------------------------------------------
*
* Open a daughter process in a tab and run WE4.
*/
function U_VLS()
{
  S_Win_VLS = $DDJ.F_Window_open('vls.htm', '_VLS');
  
//   if (!G_fLocal) {     
//       var UsrView0 = CL_UsrView0.F_UsrView_Selected();
//       G_UsrView_IPC = UsrView0;  
//       S_Win_VLS = $DDJ.F_Window_open('vls.htm', '_VLS');
//   }
//   else {
//       $ACP.U_Open_Confirm("Editor should be opened through the Web Server,<br>would you like to reload OLS?", $DDJ.U_Reopen);
//       return; /* $IMPORTANT! - We must avoid double call of U_Open_Confirm(); if flag fEnaPeriodic is disabled! */
//   } /* if */
  var fEnaPeriodic = $VConfig.F_ValSts_Get("fEnaPeriodic");
  if (!fEnaPeriodic) {
     $ACP.U_Open_Confirm("Inter process communication NOT enabled. Would you like to enable periodic polling?", $DDJ.U_EnaPeriodic);
     return;
  } /* if */
} /* U_VLS */

/*-----U_Tele --------------------------------------------------------
*
* Open a daughter process in a tab and run tele.
*/
function U_Tele()
{
  if (!G_fLocal) {     
      S_Win_Tele = $DDJ.F_Window_open('tele.htm', '_Tele');
      var Doc0 = S_Win_Tele.document;  
  }
  else {
      $ACP.U_Open_Confirm("Remote Control should be opened through the Web Server,<br>would you like to reload OLS?", $DDJ.U_Reopen);
  } /* if */
  var fEnaPeriodic = $VConfig.F_ValSts_Get("fEnaPeriodic");
  if (!fEnaPeriodic) {
     $ACP.U_Open_Confirm("Inter process communication NOT enabled. Would you like to enable periodic polling?", $DDJ.U_EnaPeriodic);
     return;
  } /* if */
} /* U_Tele */

/*-----U_Disk --------------------------------------------------------
*
*/ 
function U_Disk()
{
  var szHome = "DSK";
  var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(szHome, true);
  if (!UsrView0) {
     szHome = "Disk";
  } /* if */
    
  CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  $FileMan.U_URL("");
} /* U_Disk */

/*-----U_Apps --------------------------------------------------------
*
*/ 
function U_Apps()
{
  var szHome = "Apps";
  var UsrView0 = CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  $FileMan.U_URL("");
  if (UsrView0 == null) {
     $Error.U_Error(C_jCd_Cur, 1, "Sorry,\nHome collection was not provided!", "", false);
  } /* if */
} /* U_Apps */

/*-----U_Dashboard --------------------------------------------------------
*
*/ 
function U_Dashboard()
{
  var szHome = "sinottico";
  $Value.U_Sel_szPlane(0);

  var UsrView0 = CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  $FileMan.U_URL("");
  if (UsrView0 == null) {
     $Error.U_Error(C_jCd_Cur, 1, "Sorry,\nDashboard was not provided!", "", false);
  } /* if */
} /* U_Dashboard */

/*-----U_Log --------------------------------------------------------
*
*/ 
function U_Log()
{
  var szHome = "Log";
  var UsrView0 = CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  $FileMan.U_URL("");
  if (UsrView0 == null) {
     $Error.U_Error(C_jCd_Cur, 1, "Sorry,\nLog was not provided!", "", false);
  } /* if */
} /* U_Log */

/*-----U_CdF --------------------------------------------------------
*
*/ 
function U_CdF()
{
  var szHome = "Cose_da_Fare";
  var UsrView0 = CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  $FileMan.U_URL("");
  if (UsrView0 == null) {
     $Error.U_Error(C_jCd_Cur, 1, "Sorry,\nCdF was not provided!", "", false);
  } /* if */
} /* U_CdF */

/*-----U_Tree --------------------------------------------------------
*
*/ 
function U_Tree()
{
  var szHome = "tree";
  var UsrView0 = CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  $FileMan.U_URL("");
  if (UsrView0 == null) {
     $Error.U_Error(C_jCd_Cur, 1, "Sorry,\nTree was not provided!", "", false);
  } /* if */
} /* U_Tree */

/*-----U_Collections --------------------------------------------------------
*
*/ 
function U_Collections()
{
  var szHome = "Collections";
  $Value.U_Sel_szPlane(-1);
  var UsrView0 = CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  $FileMan.U_URL("");
  if (UsrView0 == null) {
     $Error.U_Error(C_jCd_Cur, 2, "Sorry,\nList of collections not found!", "", false);
  } /* if */
} /* U_Collections */

/*-----U_History --------------------------------------------------------
*
*/ 
function U_History()
{
  var szHome = "History";
  $Value.U_Sel_szPlane(-1);
  var UsrView0 = CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  var Coll0 = UsrView0.XDB0.Coll0;
  var Tup3  = Coll0[3];

  $FileMan.U_URL("");
  if (UsrView0 == null) {
     $Error.U_Error(C_jCd_Cur, 3, "Sorry,\nHistory not found!", "", false);
  } /* if */
} /* U_History */

/*-----U_Ld_Coll --------------------------------------------------------
*
* Automatic Collections Loading.
*/ 
function U_Ld_Coll(P_fUpdate=false)
{
  const C_jLd_Bak_szNm    = 0;
  const C_jLd_Bak_szPath  = 1;
  const C_jLd_Bak_fLoad   = 2;   // automatically load   collection
  const C_jLd_Bak_fBackUp = 3;   // automatically backup collection
  
  var szDNS = $VConfig.F_ValSts_Get("szURL_Srv");
  var iLen = Files_Ld_Bak.length;
  var szPath;
  var i, Tup0, szNmColl, UsrView0;

  for (i = 0; i < iLen; i++) {
      Tup0 = Files_Ld_Bak[i];
      if (Tup0[C_jLd_Bak_fLoad]) {
         szNmColl = Tup0[C_jLd_Bak_szNm];
         UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(szNmColl, true);
         if (!P_fUpdate && UsrView0) {
            continue;
         } /* if */
         szPath = Tup0[C_jLd_Bak_szPath];
         if (szPath[szPath.length -1] != "/") {
            $LdFile.U_DownLoad_NDU(szDNS, szPath, (C_WwFlag_Null));  /* Load file. */
         }
         else {
            var szDNS = "localhost";
            $FileMan.U_Get_Dir(szDNS, szPath, C_Undefined, true);  /* Load Directory. true +++ */
         } /* if */
      } /* if */
  } /* for */
} /* U_Ld_Coll */

/*-----U_BackUp_Coll --------------------------------------------------------
*
* Automatic Collections Loading.
*/ 
function U_BackUp_Coll()
{
  const C_jLd_Bak_szNm    = 0;
  const C_jLd_Bak_szPath  = 1;
  const C_jLd_Bak_fLoad   = 2;   // automatically load   collection
  const C_jLd_Bak_fBackUp = 3;   // automatically backup collection
  const C_jLd_Bak_szNmBak = 4;

  var szDNS = $VConfig.F_ValSts_Get("szURL_Srv");
  var iLen = Files_Ld_Bak.length;
  var szPath;
  var i, Tup0, szNmColl, UsrView0;

  G_DDJ = $DDJ.F_DDJ_Default();    // 26/12/2025   C_jLd_Bak_szNm
  for (i = 0; i < iLen; i++) {
      Tup0 = Files_Ld_Bak[i];
      if (Tup0[C_jLd_Bak_fBackUp]) {
         szNmColl = Tup0[C_jLd_Bak_szNm];
         UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(szNmColl, true);
         if (!UsrView0) {
            continue;
         } /* if */
         szPath = Tup0[C_jLd_Bak_szPath];
         if (szPath[szPath.length -1] != "/") {
         // debugger;     // $DDJ.U_SaveChanges4
            
            var szNmBak = Tup0[C_jLd_Bak_szNmBak];
            var Coll0 = UsrView0.XDB0.Coll0;
            var szJSON = JSON.stringify(Coll0);
            $LcdLcd.U_Write(szNmBak, szJSON);
         }
         else {
            //debugger;
            //var szDNS = "localhost";
            //$FileMan.U_Get_Dir(szDNS, szPath, C_Undefined, false);  /* Load Directory. */
         } /* if */
      } /* if */
  } /* for */
} /* U_BackUp_Coll */

/*-----U_Initialize --------------------------------------------------------
*
*/ 
function U_Initialize(P_Files_Ld_Bak)
{
//   var U_Ld_Coll_Bnd = U_Ld_Coll.bind({szNmColl:P_Files_Ld_Bak});
//   var U_BackUp_Coll_Bnd = U_BackUp_Coll.bind({szNmColl:P_Files_Ld_Bak});
//   setTimeout(U_Ld_Coll_Bnd, 1000); /* Load external Collections. */
//   setTimeout(U_BackUp_Coll_Bnd, 10000);
} /* U_Initialize */

/*-----U_Init_OLS --------------------------------------------------------
*
*/ 
function U_Init_OLS()
{
/*
* Register internal Collections.
*/ 
  new CL_XDB0(["aFld_aEmpty", C_JKndTup_aObj, S_aFld_aEmpty, G_aFld_aFld,   "aFld_aFld",   "S_aEmpty Layout.",  (C_WwFlag_fReadOnly | C_WwFlag_fSample), C_jCd_Cur]);
  new CL_XDB (["Empty",       C_JKndTup_aRcd, S_aEmpty,      S_aFld_aEmpty, "aFld_aEmpty", "Empty Collection.", (C_WwFlag_fReadOnly), C_jCd_Cur, C_Bag_UsrView_Dflt]);
  
  var UsrView_Cur = CL_UsrView0.F_UsrView_Select("Empty", (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));         /* $IMPORTANT: display the Empty collection and insert it as the root of the History. */

  new CL_XDB0(["aUsrView_N",  C_JKndTup_asObj, CL_aUsrView_N.S_aUsrView_N,      null, "AutoDetect",  "List of UsrViews",       (C_WwFlag_fMng_Undef | C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService),  C_jCd_Cur]);
  new CL_XDB(["as_UsrView_K", C_JKndTup_asObj, CL_as_UsrView_K.S_as_UsrView_K,  null, "AutoDetect",  "List of UsrViews Alias", (C_WwFlag_fMng_Undef | C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService),  C_jCd_Cur, C_Bag_UsrView_Dflt]);
 
  new CL_XDB0(['aFld_S_aXDBAux', C_JKndTup_aObj, CL_aXDBAux.S_aFld_S_aXDBAux, null, 'aFld_aFld',   'CL_aXDBAux.S_aXDBAux Layout.', (C_WwFlag_fReadOnly | C_WwFlag_fService), C_jCd_Cur]); 
  new CL_XDB(['Log',             C_JKndTup_aRcd, G_aRcd_Log, null, 'aFld_Log', 'Log file.', (C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService), C_jCd_Cur, C_Bag_UsrView_Dflt]);
  new CL_XDB(['Collections',     C_JKndTup_aRcd, CL_aXDBAux.S_aXDBAux, CL_aXDBAux.S_aFld_S_aXDBAux, 'aFld_S_aXDBAux', 'List of Collections', (C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService), C_jCd_Cur, C_Bag_UsrView_Dflt]);
  new CL_XDB(['History',         C_JKndTup_aRcd, CL_History.S_aHistory, null, 'AutoDetect', 'Navigation History',     (C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService), C_jCd_Cur, C_Bag_UsrView_Dflt]);   

  if ($VConfig.F_i_ValSts_Get("fDtStru")) {
     new CL_XDB(['Layouts',        C_JKndTup_aRcd, CL_Layout.S_aLayout,   null, 'AutoDetect', 'List of Layouts',        (C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService), C_jCd_Cur, C_Bag_UsrView_Dflt]);    
     new CL_XDB(['asaMnEntry',     C_JKndTup_Obj,  G_asaMnEntry,          null, 'AutoDetect', 'List of Tool Bar Menus', (C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService), C_jCd_Cur, C_Bag_UsrView_Dflt]);
     new CL_XDB(['Config (State)', C_JKndTup_Obj,  $VConfig.F_ValPrivate_Sts(), null, 'AutoDetect', 'Configuration', (C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService), C_jCd_Cur, C_Bag_UsrView_Dflt]);    
     new CL_XDB(['G_DDJ',          C_JKndTup_Obj,  G_DDJ, null, 'AutoDetect', 'Configuration', (C_WwFlag_fReadOnly | C_WwFlag_fLive | C_WwFlag_fService), C_jCd_Cur, C_Bag_UsrView_Dflt]);
  } /* if */ 

  setTimeout(U_Ld_Coll, 1000); /* Load external Collections. */
  setTimeout(U_Ld_Coll, 2000);
  setTimeout(U_BackUp_Coll, 10000);
  
  U_Root0("$OLS", C_jCd_Cur, 2);  
} /* U_Init_OLS */

  U_Root0("$OLS", C_jCd_Cur, 1);
  return(_OLS);
})();  /* $OLS */


var Files_Ld_Bak = [
  ["D:/dbase/lcd/KBS/","D:/dbase/lcd/KBS/",1,0],  
  ["D:/dbase/lcd/Progetti/","D:/dbase/lcd/Progetti/",1,0],
  ["D:/viola/ddj/","D:/viola/ddj/",1,0],
  ["D:/viola/ols_files/","D:/viola/ols_files/",1,0],
  ["D:/viola/lcd/","D:/viola/lcd/",1,0],
  ["D:/viola/basic/","D:/viola/basic/",1,0],
  ["D:/dbase/lcd/Sinottici/","D:/dbase/lcd/Sinottici/",1,0],  

  ["uk.asrcd","D:/dbase/viola/Nation/en.asrcd",1,0],
  ["agenda","D:/dbase/lcd/agenda.ols",1,0],
  ["dirs.as_","D:/dbase/lcd/dirs.as_",1,0],
  ["files.as_","D:/dbase/lcd/files.as_",1,0],
  ["fin-rem","D:/dbase/lcd/fin-rem.OLS",1,0],
  ["periodic","D:/dbase/lcd/periodic.ols",1,0],
  ["sentence.as_","D:/dbase/lcd/sentence.as_",1,0],
  ["santi","D:/dbase/lcd/KBS/santi.OLS",1,0],
  ["pasqua","D:/dbase/lcd/KBS/pasqua.OLS",1,0],
  ["dove","D:/dbase/lcd/KBS/dove.OLS",0,0],
  ["remarks","D:/dbase/lcd/remarks.OLS",1,0, "R:/TMP/remarks.OLS"],  
  ["remarks","D:/dbase/lcd/alt-remarks.OLS",1,0, "R:/TMP/alt-remarks.OLS"],  
  ["panel.asobj","D:/dbase/viola/panel.asobj",1,0],
  ["impegni","D:/dbase/sync/impegni.OLS",0,0],

  ["Cose_da_Fare","D:/dbase/lcd/Progetti/Cose_da_Fare.OLS",1,0],
  ["Note","D:/dbase/lcd/Note/Note.OLS",1,0],
  ["Prova_all","D:/dbase/examp/Prova_all.OLS",0,0],
  ["appunti","C:/Users/Luigi/Desktop/appunti.txt",0,0],
  ["carburante.OLS","D:/dbase/sync/carburante.OLS",0,0],
  ["diario","D:/dbase/_KPT/Diario.OLS",0,0],
  ["fare.OLS","D:/dbase/sync/fare.OLS",0,0],
  ["gent.OLS","D:/dbase/sync/gent.OLS",0,0],
  ["luoghi.OLS","D:/dbase/sync/luoghi.OLS",0,0],
  ["pardo","D:/dbase/_KPT/Pardo.OLS",0,0],
  ["pav.OLS","D:/dbase/sync/pav.OLS",0,0],
  ["piante.OLS","D:/dbase/sync/piante.OLS",0,0],
  ["asRcd_Type_JS","D:/dbase/ols_own/asRcd_Type_JS.OLS",0,0],
  ["asRcd_Type","D:/dbase/ols_own/asRcd_Type.OLS",0,0],
  ["tree","D:/dbase/lcd/tree.ols",1,0]
];