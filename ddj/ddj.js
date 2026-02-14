/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : ddj.js
* Function    : Data Disk Jockey ex CL-DAP
* FirstEdit   : 15/12/2019
* LastEdit    : 14/02/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
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
*     Data Browsing Environment.
*     GUI functions shared by different applications.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* 
*/
'use strict';
 
/*----- Global Constants ---------------------------------------------*/

const C_jTBM_Browser = 0;
const C_jTBM_Select  = 1;

const C_jPg_0 = 0;
const C_jPg_1 = 1;

/*----- Local Types ---------------------------------------------*/

/*----- Global Variables ---------------------------------------------*/

var G_szOS = "Windows";

var GP_iLvl_Log   = C_iLvl_Dflt;
var GP_iLvl_Gloss = C_iLvl_Dflt;
var G_iDelta_Goto = 1;

var G_szUndefined = "undefined-V" /* Centralized management of word "undefined" */

var G_szSecure  = "";
var G_szBrowser = '';
var G_fMobile;
var G_fLocal;     /* Web-Page loaded from user's harddisk. */
var G_fAdBlock;   /* AdBlock detected */

var G_Layout = {};

var G_fRefresh = false;

var G_Poly_Req_IPC;  /* Opener's request */
var G_Poly_Res_IPC;  /* Response */
var G_UsrView_IPC;

//  var G_szEncoding = 'windows-1252';
//  var G_szEncoding = 'greek';
//  var G_szEncoding = 'cyrillic';
//  var G_szEncoding = 'utf-8';

const G_szEncoding = 'UTF-8';

/*----- Module $DDJ --------------------------------------------------------
*
*/ 
const $DDJ = (function () {
  var _DDJ = {};
  _DDJ.U_Init           = U_Init_DDJ;        // function U_Init_DDJ();
  _DDJ.U_WellCome       = U_WellCome;        // function U_WellCome();
  
  _DDJ.U_Button         = U_Button;          // function U_Button(P_szCmd);
  _DDJ.F_DDJ_Default    = F_DDJ_Default;     // function F_DDJ_Default();

  _DDJ.U_Log_Command    = U_Log_Command;     // function U_Log_Command(P_ch, P_szCmd);
  _DDJ.U_Custom_Card    = U_Custom_Card;     // function U_Custom_Card();
  _DDJ.U_DispColl       = U_DispColl;        // function U_DispColl(R_Bag_DispColl);
  _DDJ.U_Ena_Show       = U_Ena_Show;        // function U_Ena_Show();

  _DDJ.U_Config         = U_Config;          // function U_Config();
  _DDJ.U_About          = U_About;           // function U_About();
  _DDJ.U_License        = U_License;         // function U_License();

  _DDJ.U_Reopen         = U_Reopen;          // function U_Reopen();
  _DDJ.U_CB_Update      = U_CB_Update;       // function U_CB_Update();
  _DDJ.U_EnaPeriodic    = U_EnaPeriodic;     // function U_EnaPeriodic();
  
  _DDJ.U_Disp_szFlNm    = U_Disp_szFlNm;     // function U_Disp_szFlNm(P_szNmColl, P_fReadOnly, P_UsrView);
  _DDJ.U_Disp_szSCtx    = U_Disp_szSCtx;     // function U_Disp_szSCtx(P_szSCtx);
  _DDJ.U_Disp_State     = U_Disp_State;      // function U_Disp_State(P_iRowCol);
  _DDJ.U_Show_szURL     = U_Show_szURL;      // function U_Show_szURL();
  
  _DDJ.U_InputData      = U_InputData;       // function U_InputData();
  _DDJ.U_Reload         = U_Reload;          // function U_Reload();
  _DDJ.U_Planes         = U_Planes;          // function U_Planes();
  _DDJ.U_SaveAllChanges = U_SaveAllChanges;  // function U_SaveAllChanges();
  _DDJ.U_SaveChanges4   = U_SaveChanges4;    // function U_SaveChanges4();
  _DDJ.U_SaveAs         = U_SaveAs;          // function U_SaveAs();
  _DDJ.U_Read_Record    = U_Read_Record;     // function U_Read_Record();
  _DDJ.U_ShutUp         = U_ShutUp;          // function U_ShutUp();
  _DDJ.U_Prev_DDJ       = U_Prev_DDJ;        // function U_Prev_DDJ();
  _DDJ.U_Next_DDJ       = U_Next_DDJ;        // function U_Next_DDJ();
  _DDJ.U_Snap           = U_Snap;            // function U_Snap();
  _DDJ.U_PlotData       = U_PlotData;        // function U_PlotData();
  _DDJ.U_Clear_Plot     = U_Clear_Plot;      // function U_Clear_Plot();
  _DDJ.U_GoTo           = U_GoTo;            // function U_GoTo();
  _DDJ.U_GoTo_Prv       = U_GoTo_Prv;        // function U_GoTo_Prv();
  _DDJ.U_GoTo_Nxt       = U_GoTo_Nxt;        // function U_GoTo_Nxt();
  
  _DDJ.U_New_n_Tup      = U_New_n_Tup;       // function U_New_n_Tup();
  _DDJ.U_NewTup_DDJ     = U_NewTup_DDJ;      // function U_NewTup_DDJ();
  _DDJ.U_EdtTup_DDJ     = U_EdtTup_DDJ;      // function U_EdtTup_DDJ(P_fCustom=false);
  _DDJ.U_DelTup_DDJ     = U_DelTup_DDJ;      // function U_DelTup_DDJ();
  _DDJ.U_EdtVal_DDJ     = U_EdtVal_DDJ;      // function U_EdtVal_DDJ();
  _DDJ.U_Refresh        = U_Refresh;         // function U_Refresh();
  _DDJ.U_Done           = U_Done;            // function U_Done();
  _DDJ.U_Transpose      = U_Transpose;       // function U_Transpose();
  _DDJ.U_SetFilterJS    = U_SetFilterJS;     // function U_SetFilterJS();
  _DDJ.U_SetFilter2     = U_SetFilter2;      // function U_SetFilter2();
  _DDJ.U_SetFilterStr   = U_SetFilterStr;    // function U_SetFilterStr();
  _DDJ.U_SetFilterSem   = U_SetFilterSem;    // function U_SetFilterSem();  
  
  _DDJ.U_FilterQBE      = U_FilterQBE;       // function U_FilterQBE();
  _DDJ.U_SetSort        = U_SetSort;         // function U_SetSort();
  _DDJ.U_SetAggreg      = U_SetAggreg;       // function U_SetAggreg();
  _DDJ.U_ToggleFilter   = U_ToggleFilter;    // function U_ToggleFilter();
  _DDJ.U_InvertFilter   = U_InvertFilter;    // function U_InvertFilter();
  _DDJ.U_ClearFilter    = U_ClearFilter;     // function U_ClearFilter();

  _DDJ.U_Data_SetReset  = U_Data_SetReset;   // function U_Data_SetReset();
  _DDJ.U_SetAnchor      = U_SetAnchor;       // function U_SetAnchor();
  _DDJ.U_Tag_SetReset   = U_Tag_SetReset;    // function U_Tag_SetReset();
  
  _DDJ.U_Stat_Arr_Freq  = U_Stat_Arr_Freq;   // function U_Stat_Arr_Freq();
  _DDJ.U_mFunDep        = U_mFunDep;         // function U_mFunDep();
  _DDJ.U_mSoCnds        = U_mSoCnds;         // function U_mSoCnds();
  _DDJ.U_LayoutColl     = U_LayoutColl;      // function U_LayoutColl();
  _DDJ.U_LayoutFld      = U_LayoutFld;       // function U_LayoutFld();
  
  _DDJ.U_Set_jLvl_Log   = U_Set_jLvl_Log;    // function U_Set_jLvl_Log();
  _DDJ.U_Set_jLvl_Gloss = U_Set_jLvl_Gloss;  // function U_Set_jLvl_Gloss();
  _DDJ.U_Set_iStep      = U_Set_iStep;       // function U_Set_iStep(P_iStep);
  _DDJ.U_Set_iWdt_Icon  = U_Set_iWdt_Icon;   // function U_Set_iWdt_Icon();
  _DDJ.U_Set_iWdt       = U_Set_iWdt;        // function U_Set_iWdt(P_iWdt);
  _DDJ.U_Set_iNnCol     = U_Set_iNnCol;      // function U_Set_iNnCol(P_iNnCol);

  _DDJ.U_Get_Info       = U_Get_Info;        // function U_Get_Info();
  _DDJ.U_Help           = U_Help;            // function U_Help();
  _DDJ.U_Help_PopUp     = U_Help_PopUp;      // function U_Help_PopUp();
  _DDJ.U_Slide          = U_Slide;           // function U_Slide();
  
  _DDJ.F_szBrowser      = F_szBrowser;       // function F_szBrowser();
  _DDJ.F_fMobile        = F_fMobile;         // function F_fMobile();
  _DDJ.F_fPopUp         = F_fPopUp;          // function F_fPopUp();
  _DDJ.U_Detect_AdBlock = U_Detect_AdBlock;  // function U_Detect_AdBlock();

  _DDJ.F_WwFlag_Mp_DDJ  = F_WwFlag_Mp_DDJ;   // function F_WwFlag_Mp_DDJ(P_DDJ);
  _DDJ.F_DDJ_Set_WwFlag = F_DDJ_Set_WwFlag;  // function F_DDJ_Set_WwFlag(R_DDJ, P_WwFlag0);
  _DDJ.F_fOverride_RO   = F_fOverride_RO;    // function F_fOverride_RO();
  _DDJ.U_Thumbnails     = U_Thumbnails;      // function U_Thumbnails();
  _DDJ.U_Close_Window   = U_Close_Window;    // function U_Close_Window();
  _DDJ.U_Close_Coll     = U_Close_Coll;      // function U_Close_Coll();
  
  _DDJ.F_UsrViewPrv     = F_UsrViewPrv;      // function F_UsrViewPrv();
  _DDJ.U_Move_Up        = U_Move_Up;         // function U_Move_Up();
  _DDJ.U_Move_Dn        = U_Move_Dn;         // function U_Move_Dn();

  _DDJ.F_Window_open    = F_Window_open;     // function F_Window_open(P_szURL, P_szOpt, P_Req);
  
  _DDJ.U_Alt_Sv         = U_Alt_Sv;          // function U_Alt_Sv();
  _DDJ.U_Alt_Sel        = U_Alt_Sel;         // function U_Alt_Sel();
  
  _DDJ.U_BrkPnt         = U_BrkPnt;          // function U_BrkPnt();
  _DDJ.U_Set_MinMax     = U_Set_MinMax;      // function U_Set_MinMax();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur   = C_jCd_DDJ;
const C_szNmAgent = 'DDJ';

var S_UsrViewPrv = null;
var S_fShow = false;          // Show saved file contents in browser.

/* DDJ GUI's state declaration. */
const C_DDJ = {
  szDDJ:       "G_DDJ",       /* Name of current data structure. */
  szSource:    "File",        /* "Source" selected in inpdata.js menu */
  jPg:         0,
  szSourcePrv: "",            /* "Source" previously selected in inpdata.js menu */
  szAS:        "",
  szNmColl:    "",            /* Name of the Collection. */
  szNm_aFld:   "",            /* Name of the Layout. */
  szNm_URL:    "",            /* Name of the URL of the file in which the Collection was stored. */
  szNm_Local:  "",
  szNm_Session:"",
  szNm_Var:    "",
  szEnc:       G_szEncoding,
  aFld:        [],
  JKndTup0:    0, // C_JKndTup_Null,
  iSkip:       0,
  chSep1:      ',',
  chSep2:      "",
  fReadOnly:   false,
  fszFldNm_1:  false,
  fMng_Undef:  false,
  fAlgCSV1:    false,
  fAutoExec:   false,
  fLnNum:      true,
  fTag:        false,
  fTransp:     false,
  fKrypt:      false,
  fSv_All:     false,
  fUnSort:     false,
  fEmbed:      false,
  fNew_aFld:   false,
  oFl_Ld:      null
};

/*----- Local Variables ----------------------------------------------*/

/*
*  About.
*/
var S_szHTML_DBox_About = `<div style='padding:10%;'>
  <br><br><br><br>
  Program: <b>TUISys' Ordiniamo/Lets Sort.</b><br>
  Date: ${C_szDate_EdtLst} <br>
  Rel.: <b>${C_szRel_EdtLst}</b><br>
  Author: Luigi D. CAPRA<br>
  <br>
  ${C_szCopyright}<br><br><hr><br><h3 style='text-align:center;'>License</h3><br>
  This program comes with ABSOLUTELY NO WARRANTY; for details see <a href='https://www.gnu.org/licenses/gpl-3.0.en.html'>GNU GPL v. 3.0</a>.<br>
  This is free software, and you are welcome to redistribute it under certain conditions;<br>
  type <a href='https://www.gnu.org/licenses/gpl-3.0.en.html'>GNU GPL v. 3.0</a> for details.<br>  
  The library files could be redistribute at LGLP conditions. Type <a href='https://www.gnu.org/licenses/lgpl-3.0.txt'>GNU LGPL v. 3.0</a> for details.<br>
  <br><br><br><br>
</div>`;

/*
*  WellCome.
*/
var S_szHTML_DBox_WellCome = `<div style='padding:10%;'>
  <br><br><h1>WellCome</h1><br><br>
  Program: <b>TUISys' Ordiniamo/Lets Sort.</b><br>
  <br>
  Good morning.<br> It seems like this is your first time using this software.<br>
  - If you would like to proceed with the presentation and tutorial press "CONFIRM" button please.<br>
  - Otherwise click on the 'X' on the right upper corner of this window to go on using OLS.
  <br><br><br><br>
</div>`;

var S_aFld_Disk = [
{"iPos0":0,"iPos1":0,"fVisible":true,"szNm":"Path","szCaption":"value","szType":"PATH","iLen":8,"fRecalc":false,"szCode":""},
{"iPos0":1,"iPos1":1,"fVisible":true,"szNm":"Ext","szCaption":"Ext","szType":"string","iLen":8,"fRecalc":false,"szCode":""},
{"iPos0":2,"iPos1":2,"fVisible":true,"szNm":"iSize","szCaption":"Free RAM (GB)","szType":"number","iLen":8,"fRecalc":false,"szCode":""},
{"iPos0":3,"iPos1":3,"fVisible":true,"szNm":"szMTime","szCaption":"szMTime","szType":"datetime-local","iLen":8,"fRecalc":false,"szCode":""},
{"iPos0":4,"iPos1":4,"fVisible":true,"szNm":"szPerms","szCaption":"Perms+","szType":"hex","iLen":8,"fRecalc":false,"szCode":""},
{"iPos0":5,"iPos1":5,"fVisible":true,"szNm":"szType","szCaption":"szType","szType":"string","iLen":8,"fRecalc":false,"szCode":""},
{"iPos0":6,"iPos1":6,"fVisible":true,"szNm":"Note","szCaption":"Note","szType":"string","iLen":8,"fRecalc":false,"szCode":""},
{"fVisible":false,"szNm":"szTBM_Table", "szType":"none", "iLen":0, "szRem":"SetPar", "szCode":"XTG"},
{"fVisible":false,"szNm":"jaFld1_aNdx", "szType":"none", "iLen":0, "szRem":"SetPar", "szCode":-1}
];

var S_Disk = [
["C:/","",0,"2023-12-23T15:52:07",0,"dir",""]
];

/*-----U_BrkPnt --------------------------------------------------------
*
* $DEBUG. MnEntry BreakPoint.
*/ 
function U_BrkPnt()
{
  ALERT("U_BrkPnt",1);
} /* U_BrkPnt */

/*-----U_Button --------------------------------------------------------
*
* Events manager.
* Translate user events executing the corresponding routines.
* $NOTE: the menus and their respective icons have been initialized in $SemCtx.F_szHTML_TBM();
*
* P_szCmd JS  command or function called.
* P_szCaller  ID of the routine that called U_Button.
* P_szPar     allows to pass parameters to the routine specified in P_szCmd.
*/ 
function U_Button(P_szCmd, P_szCaller, P_szPar="")
{
  $Log.U_Log(C_jCd_Cur, 1, C_iLvl_Command, "U_Button", P_szCmd);

  var szSCtx = $SemCtx.F_szSCtx_Cur();     // $DEBUG
  $Pers.U_Save(); 
  $DDJ.U_Log_Command("B", P_szCmd);
  
  try {
      var szCmd = P_szCmd + `("${P_szPar}")`;
      eval(szCmd);      
  } catch (P_Err) {
      var szErr = $Error.F_szErr_Catch(P_Err);
      if (szErr != "") {
         $Error.U_Error(C_jCd_Cur, 1, "U_Button command: " + szCmd + "\n", szErr);
      } /* if */
  } /* try catch */
} /* U_Button */

/*-----F_DDJ_Default --------------------------------------------------------
*
* Return a spare copy of C_DDJ.
*/ 
function F_DDJ_Default()
{
  var DDJ0 = F_Obj_Clone(C_DDJ);
  return(DDJ0);
} /* F_DDJ_Default */

/*-----U_Log_Command --------------------------------------------------------
*
*/ 
function U_Log_Command(P_ch, P_szCmd)
{
  var szSCtx = $SemCtx.F_szSCtx_Cur();
  var szMsg = "";
  var Rcd0, i;

  if (P_ch == "B") {
     var aMnEntry = G_asaMnEntry[szSCtx];
     if (!aMnEntry) {
        return;
     } /* if */
     for (i = 0; i < aMnEntry.length; i++) {
         if (aMnEntry[i][C_jaMnEntry_pFn] == P_szCmd) {
            szMsg = aMnEntry[i][C_jaMnEntry_Key];
            break;
         } /* if */
     } /* for */
     Rcd0 = [szMsg, szSCtx, P_szCmd, "", P_ch];
  }
  else {
     Rcd0 = [G_VCtx_Cur.szMsg, szSCtx, G_VCtx_Cur.szFn, G_VCtx_Cur.szRes, P_ch];
     szMsg = G_VCtx_Cur.szMsg;
  } /* if */
  if ($VConfig.F_ValSts_Get("fEcho_Commands")) {
     $TTS.U_Speak(szMsg);
  } /* if */
  if (window.fLcdLcd) {     /* $VERSIONING */
     var szJSON = JSON.stringify(Rcd0);
     var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "append", `topic/messaggi.arcd`);
     $IPCF.U_UpLoad_File(szURL, szJSON + ',\n'); 
  } /* if */
} /* U_Log_Command */

/*-----U_Custom_Card --------------------------------------------------------
*
* Open a daughter process in a tab and edit Card.
*/
function U_Custom_Card()
{
   $DDJ.U_EdtTup_DDJ(null, 0, true);
} /* U_Custom_Card */

/*-----U_EnaPeriodic --------------------------------------------------------
*
*/ 
function U_EnaPeriodic()
{
   $VConfig.U_Set_ValSts("fEnaPeriodic", true);
} /* U_EnaPeriodic */

/*-----U_DispColl --------------------------------------------------------
*
* Create Collection's descriptors (XDB and UsrView) for the given collection and Display it.
* 
* !!! Supporta New Collection !!!! +++++++++++++
*/ 
function U_DispColl(P_Bag_XDB)
{
  const C_jWwFlag0 = 6;
  var P_szNmColl, P_JKndTup, P_Coll, P_aFld, P_szNm_aFld, P_szNote, P_WwFlag0, jCd, Bag_UsrView, P_szNm_URL,  P_ch, P_jaszHelp;
  [P_szNmColl, P_JKndTup, P_Coll, P_aFld, P_szNm_aFld, P_szNote, P_WwFlag0, jCd, Bag_UsrView] = P_Bag_XDB;

  P_Bag_XDB[C_jWwFlag0] &= ~C_WwFlag_fDisplay;        /* Disable C_WwFlag_fDisplay to prevent double display. */
  var XDB_Cur = new CL_XDB(P_Bag_XDB);                /* If the Collection has changed update XDB */
  var UsrView_Cur = CL_UsrView0.F_UsrView_Select(P_szNmColl, (P_WwFlag0 | C_WwFlag_fSearchCS));
} /* U_DispColl */

/*-----U_Config --------------------------------------------------------
*
*/ 
function U_Config()
{
  $VConfig.DBox_Config.U_Hub(C_JPnl_Open);
} /* U_Config */

/*-----U_About --------------------------------------------------------
*
*/ 
function U_About()
{
  $DDJ.DBox_About.U_Hub(C_JPnl_Open);
} /* U_About */

/*-----U_License --------------------------------------------------------
*
* $NOTE: show the license in About.
*/ 
function U_License()
{
  $DDJ.DBox_About.U_Hub(C_JPnl_Open);
} /* U_License */

/*-----U_Reopen --------------------------------------------------------
*
* Reopen the current application through the WebServer.
*/ 
function U_Reopen(P_fEnaErr=true)
{
  var szURL_Relay = $VConfig.F_ValSts_Get("szURL_Relay");
  var szURL_Reload;
  if (szURL_Relay) {
     var szTmp = $NDU.F_szDir_Server(szURL_Relay);
     var szURL_Reload = szTmp + "D:/viola/" + C_szFlNm;
     F_Window_open(szURL_Reload, '_self');  
  }
  else {
     if (P_fEnaErr) {
        $Error.U_Error(C_jCd_Cur, 2, "Sorry the Application cannot be reopened because szURL_Relay parameter is undefined.");
     } /* if */
  } /* if */
} /* U_Reopen */

/*-----U_InputData --------------------------------------------------------
*
*/ 
function U_InputData()
{
  $DDJ.DBox_InpData.U_Hub(C_JPnl_Open);
} /* U_InputData */

/*-----U_Reload --------------------------------------------------------
*
* Reload Collection.
*/ 
function U_Reload()
{ 
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var szNm_aFld0 = XDB0.szNm_aFld;

  if ((szNm_aFld0 == "aFld_FlDsc") || (szNm_aFld0 == "aFld_Disk")) {
     if (szNm_aFld0 == "aFld_FlDsc") {
        $FileMan.U_Get_Dir(null, XDB0.szNmColl);                 // Reload Directory     
     }
     else {
        $FileMan.U_Get_Dir("", "");                              // Reload Disks list 
     } /* if */
  } else if (XDB0.szNm_aFld == "aFld_aFld1") {
        debugger;                                                // Restore Layout's BackUp.
        XDB0.Coll0 = XDB0.Coll_Bak;
        $Table.U_Display_Table();                                // Reshow file
  } else if (XDB0.szNm_URL) {
     $LdFile.U_DownLoad_URL(XDB0.szNm_URL, C_WwFlag_fDisplay);   // Reload file
  } else {
      $DBox_Error.U_Set_CB($DDJ.U_InputData, $DDJ.U_InputData);
      $Error.U_Error(C_jCd_Cur, 3, "Sorry the collection cannot be reloaded because the URL is missing.\nYou should use 'Select Collection' again.", "");
  } /* if */
} /* U_Reload */

/*-----U_SaveAllChanges --------------------------------------------------------
*
* Save changes.
*/ 
function U_SaveAllChanges()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var szNmColl = XDB0.szNmColl;
  var szNm_URL = XDB0.szNm_URL;
  if (!szNm_URL) {
     $DBox_Error.U_Set_CB($DDJ.U_SaveAs, $DDJ.U_SaveAs);
     $Error.U_Error(C_jCd_Cur, 4, "Sorry, the 'Save' function cannot be used because the URL is missing.\nYou should use 'Save AS' instead.", "");
     return;
  } /* if */

  var szNm_URL1 = szNm_URL.toLowerCase();
  G_DDJ.fKrypt = (szNm_URL1.indexOf("_kpt") >= 0); 
  if (G_DDJ.fKrypt) {
     var szNm_URL2 = szNm_URL.replace("read", "writebin");
  }
  else {
     var szNm_URL2 = szNm_URL.replace("read", "write");
  } /* if */  
/*
* $SAFETY.
* Prevent accidental data loss, pressing "Save Changes" when a Filter is active.
* If the user wants to save a reduced table should presse "Save Data" and confirm!
*/
  if (UsrView0.fFlt) {
     $Error.U_Error(C_jCd_Cur, 5, "There is a Filter active.\n Overwriting file you can lose significant Data.")
     return;
  } /* if */

   var aFld1 = UsrView0.aFld1;
   for (let i = 0; i < aFld1.length; i++) {
       if (!aFld1[i].fVisible) {
          $DBox_Error.U_Set_CB($DDJ.U_SaveAs, $DDJ.U_SaveAs);
          $Error.U_Error(C_jCd_Cur, 6, "The Layout contains hidden fields.\n Overwriting file you can lose significant Data.\nYou should save the Collection with a different name.");
          return;
       } /* if */
   } /* for */

  if (szNm_URL == "LocalStorage") {
     $OutData.U_Save("Local", szNmColl, XDB0.JKndTup0, 0);
     return;
  } /* if */
  if (szNm_URL == "SessionStorage") {
     $OutData.U_Save("Session", szNmColl, XDB0.JKndTup0, 0);
     return;
  } /* if */

  if (szNm_URL1.indexOf(".ols") >= 0) {
      $OutData.U_SaveChanges(UsrView0, szNm_URL2, szNmColl + ".ols", true);     // 2025-11-12
  }
  else {
      $OutData.U_Save("URL", szNm_URL2, XDB0.JKndTup0, 0);
  } /* if */
} /* U_SaveAllChanges */

/*-----U_SaveChanges4 --------------------------------------------------------
*
* Save data changes, but not layout modifications.
*/ 
function U_SaveChanges4()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var szNmColl = XDB0.szNmColl;
  var szNm_URL = XDB0.szNm_URL;
  if (!szNm_URL) {
     $DBox_Error.U_Set_CB($DDJ.U_SaveAs, $DDJ.U_SaveAs);
     $Error.U_Error(C_jCd_Cur, 7, "Sorry, the 'Save' function cannot be used because the URL is missing.\nYou should use 'Save AS' instead.", "");
     return;
  } /* if */

  var szNm_URL1 = szNm_URL.toLowerCase();
  G_DDJ.fKrypt = (szNm_URL1.indexOf("_kpt") >= 0); 
  if (G_DDJ.fKrypt) {
     var szNm_URL2 = szNm_URL.replace("read", "writebin");
  }
  else {
     var szNm_URL2 = szNm_URL.replace("read", "write");
  } /* if */  
/*
* $SAFETY.
* Prevent accidental data loss, pressing "Save Changes" when a Filter is active.
* If the user wants to save a reduced table should presse "Save Data" and confirm!
*/
  if (UsrView0.fFlt) {
     $Error.U_Error(C_jCd_Cur, 8, "There is a Filter active.\n Overwriting file you can lose significant Data.")
     return;
  } /* if */

  if (szNm_URL == "LocalStorage") {
     $OutData.U_Save("Local", szNmColl, XDB0.JKndTup0, 0);
     return;
  } /* if */
  if (szNm_URL == "SessionStorage") {
     $OutData.U_Save("Session", szNmColl, XDB0.JKndTup0, 0);
     return;
  } /* if */

  if (szNm_URL1.indexOf(".ols") >= 0) {
      $OutData.U_SaveChanges(UsrView0, szNm_URL2, szNmColl + ".ols", false);
  }
  else {
      $OutData.U_Save("URL", szNm_URL2, XDB0.JKndTup0, 0);
  } /* if */
} /* U_SaveChanges4 */

/*-----U_SaveAs --------------------------------------------------------
*
*/ 
function U_SaveAs()
{
   $DDJ.DBox_OutData.U_Hub(C_JPnl_Open);
} /* U_SaveAs */

/*-----U_Snap --------------------------------------------------------
*
*/
var G_iCntWin = 0; 
function U_Snap()            // 29/06/2025
{
   var szTxt2 = "<link rel='stylesheet' href='ddj/ddj.css'><div style='background-color:#4f4;font-size:200%;text-align:center;'>" + Id_Hdr_szFlNm.innerHTML + "</div>";
   szTxt2 += Id_Div00.innerHTML;
   szTxt2 += Id_Div01.innerHTML;
   szTxt2 += Id_Div_DBox0.innerHTML;
   var szNmWin = "win_" + G_iCntWin++ + ".html";
   var newWin = open("win.html",'windowName','height=300,width=300');
   newWin.document.write(szTxt2);
} /* U_Snap */

/*-----U_Prev_DDJ --------------------------------------------------------
*
*/ 
function U_Prev_DDJ()
{
  CL_History.U_Select_Prev();
} /* U_Prev_DDJ */

 /*-----U_Next_DDJ --------------------------------------------------------
*
*/ 
function U_Next_DDJ()
{
  CL_History.U_Select_Next();
} /* U_Next_DDJ */

/*-----U_PlotData --------------------------------------------------------
*
*/ 
function U_PlotData()
{
  $Plot.DBox_Draw.U_Hub(C_JPnl_Open);
} /* U_PlotData */

/*-----U_Clear_Plot --------------------------------------------------------
*
*/ 
function U_Clear_Plot()
{
  $OPrn.U_Clear_Elem("Id_Div00");
  
  Id_Div00.innerHTML = "";
} /* U_Clear_Plot */

/*-----U_Planes --------------------------------------------------------
*
*/ 
function U_Planes()
{
  function U_CB_Ins_Planes()
  {
    var szPlane = +$TabPrm.F_ValSts_Get("Planes", "Seleziona il piano");        // $$$ number or string?
    
    $Value.U_Sel_szPlane(szPlane, true);
    CL_UsrView0.F_UsrView_Select(szNmColl, C_WwFlag_fDisplay);   /* Restore the Collection previously selected. */
    U_Refresh();
  } /* U_CB_Ins_NLP */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szNmColl  = UsrView0.szNmColl;

  $Panel.U_Display("Planes", U_CB_Ins_Planes);
} /* U_Planes */

/*-----U_GoTo --------------------------------------------------------
*
* Select record and scroll table's rows till the selected one.
*/
function U_GoTo(P_iRow)
{
  function U_CB_Ins_GoTo()
  {
    var iRow = +$TabPrm.F_ValSts_Get("GoTo", "Vai alla riga (Rel)");
    CL_UsrView0.F_UsrView_Select(szNmColl, C_WwFlag_fDisplay);   /* Restore the Collection previously selected. */  
    $Table.U_ArrowMove(UsrView0, iRow +G_iDelta_Goto, 1, C_fScroll);
  } /* U_CB_Ins_NLP */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szNmColl  = UsrView0.szNmColl;

  $Panel.U_Display("GoTo", U_CB_Ins_GoTo);
} /* U_GoTo */

/*-----U_GoTo_Prv --------------------------------------------------------
*
* Goto Previous record matching filter
*/ 
function U_GoTo_Prv()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  if (0 < UsrView0.aNdxFlt_GT.length) {
     var j = --UsrView0.jNdxFlt_GT;
     if (j <= 0) {
         j = 0;
         UsrView0.jNdxFlt_GT = 0;
         $Error.U_Beep();
     } /* if */
     var iRow = UsrView0.aNdxFlt_GT[j];      
     $Table.U_ArrowMove(UsrView0, iRow +G_iDelta_Goto, 1, C_fScroll);
  }
  else {            
     $Error.U_Beep();
  } /* if */
} /* U_GoTo_Prv */

/*-----U_GoTo_Nxt --------------------------------------------------------
*
* Goto Next record matching filter
*/ 
function U_GoTo_Nxt()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  if (0 < UsrView0.aNdxFlt_GT.length) {
     var j = ++UsrView0.jNdxFlt_GT;
     if (UsrView0.aNdxFlt_GT.length <= j) {
         j = UsrView0.aNdxFlt_GT.length -1;
         UsrView0.jNdxFlt_GT = j;
         $Error.U_Beep();
     } /* if */
     var iRow = UsrView0.aNdxFlt_GT[j];      
     $Table.U_ArrowMove(UsrView0, iRow +G_iDelta_Goto, 1, C_fScroll);
  }
  else {
     $Error.U_Beep();
  } /* if */
} /* U_GoTo_Nxt */

/*-----U_Help --------------------------------------------------------
*
* Open a window to display help page.
*/ 
function U_Help()
{
  if (G_fSaved) {
     $Error.U_Error(C_jCd_Cur, 9, "Sorry HELP not available.");
     return;
  } /* if */
  
  var szSCtx_Cur = $SemCtx.F_szSCtx_Cur();
  var UsrView0;
  var szHelp;

  if (C_szApp == "OLS  ") {
     UsrView0 = CL_UsrView0.F_UsrView_Selected();
  } /* if */
  
  switch (szSCtx_Cur) {
    case "Standard":
    case "StdImg": {
         szHelp = UsrView0.szHelp_Table;
         szHelp = szHelp ?? szSCtx_Cur;
    } break;
    case "Card": {
         szHelp = UsrView0.szHelp_Card;
         szHelp = szHelp ?? szSCtx_Cur;
    } break;
    case "PopUp": {
         szHelp = UsrView0.szHelp_PopUp;
         szHelp = szHelp ?? szSCtx_Cur;
    } break;
    case "Obj": {
         switch (UsrView0.szNmColl) {
           case "XDB0": {
                szHelp = "std/afld0";
           } break;
           case "UsrView0": {
                szHelp = "std/afld1";
           } break;
           default : {
                szHelp = szSCtx_Cur;
           } break;
         } /* switch */
    } break;
    case "JsInt": {
         szHelp = "std/jsint";
    } break;
    default : {
         szHelp = szSCtx_Cur;
    } break;
  } /* switch */
  
  $Help.U_Help(szHelp);
} /* U_Help */

/*-----U_Help_PopUp --------------------------------------------------------
*
* Open a window to display help page.
*/ 
function U_Help_PopUp()
{
  F_Window_open("ols_files/help/std/popup.html", "Tg_Home");
} /* U_Help_PopUp */

/*-----U_Read_Record --------------------------------------------------------
*
* Read row.
*/ 
function U_Read_Record()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var Tup_Sel = XDB0.Tup_Sel;
  if (!Tup_Sel) {
     $Error.U_Error(C_jCd_Cur, 10, "I cannot read because no row has been selected.", "");
  } /* if */
  UsrView0.F_szHTML_OpenCard(UsrView0, C_jOpt_Confirm_Edit);
  $TTS.U_Prepare_Speech("", false, true);
} /* U_Read_Record */

/*-----U_ShutUp --------------------------------------------------------
*
* Stop speaking.
*/ 
function U_ShutUp()
{
  $TTS.U_Stop_TTS();
  $TTS.U_Prepare_Speech("", true, false);
} /* U_ShutUp */

/*-----U_New_n_Tup --------------------------------------------------------
*
* Create n empty records (tuples).
*/ 
function U_New_n_Tup()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var Coll0    = XDB0.Coll0;
  var aFld0    = XDB0.aFld0;
  var Tup0, i, szDate, Date0;
  
  if (XDB0.JKndTup0 > C_JKndTup_aObj) {
     $Error.U_Error(C_jCd_Cur, 11, "Sorry, multiple records creation is not supported for this JKndTup0.", XDB0.JKndTup0, false);
     return;
  } /* if */
  if (CL_UsrView0.F_fReadOnly()) {
     $Error.U_Error(C_jCd_Cur, 12, "The creation of New Tuples is not allowed because the Collection is Read Only.", "", false);
     return;
  } /* if */

  if (aFld0[0].szType == "date") {
     if ((XDB0.JKndTup0 == C_JKndTup_aRcd) && (0 < Coll0.length)) {
        Tup0   = Coll0[Coll0.length -1];
        szDate = Tup0[0];   /* The fist field is a date */
        var ims_Sec70_0 = $TimeDate.F_ims_Sec70_Mp_szDate(szDate);
        $Type.U_Set_ims_Sec70_0(ims_Sec70_0);
     } /* if */
  } /* if */


   var iNn = prompt("How many tuples do you want to create? (0..n)");
   if (iNn <= 0) {
      return;
   }
   else {
      for (i = 0; i < iNn; i++) {
          Tup0 = UsrView0.F_TupNull(UsrView0);
          Coll0.push(Tup0);
      } /* for */

      UsrView0.U_Upd_aNdx();   /* Recalc index */
      $Table.U_Display_Table();
   } /* if */

  $Type.U_Set_ims_Sec70_0(0);
} /* U_New_n_Tup */

/*-----U_NewTup_DDJ --------------------------------------------------------
*
*/ 
function U_NewTup_DDJ()
{
  if (CL_UsrView0.F_fReadOnly()) {
     $Error.U_Error(C_jCd_Cur, 13, "The creation of New Tuples is not allowed because the Collection is Read Only.", "", false);
  }
  else {
     var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
     $Card.DBox_NewTup.U_Hub(C_JPnl_Open, [UsrView0.szTBM_Card]);
  } /* if */
} /* U_NewTup_DDJ */

/*-----U_EdtTup_DDJ --------------------------------------------------------
*
*/ 
function U_EdtTup_DDJ(P_Obj, P_j, P_fCustom=false)
{
  // P_fCustom=false;  // 22/12/2025 +++++++
  if (P_fCustom) {
      debugger;
  } /* if */
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  $Card.DBox_EdtTup.U_Hub(C_JPnl_Open, [UsrView0.szTBM_Card, P_Obj, P_j, P_fCustom]);  
} /* U_EdtTup_DDJ */

/*-----U_DelTup_DDJ --------------------------------------------------------
*
*/ 
function U_DelTup_DDJ()
{
  $Table.U_Delete();
} /* U_DelTup_DDJ */

/*-----U_EdtVal_DDJ --------------------------------------------------------
*
* Open linked document/resource.
*/ 
function U_EdtVal_DDJ()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var JKndTup0 = XDB0.JKndTup0;
  var Tup0 = XDB0.Tup_Sel;
  var Fld1 = $Value.F_Fld_Cell_Selected(UsrView0);

  var jaFld1 = UsrView0.jaFld1;

  
  var szType = Fld1.szType;
  var Val0;

  switch (JKndTup0) {
    case C_JKndTup_Arr: 
    case C_JKndTup_aRcd: {
         Val0 = Tup0[jaFld1];
    } break; 
    case C_JKndTup_asRcd: {
         Val0 = Tup0[jaFld1 -C_iDelta_asRcd];
    } break;
    case C_JKndTup_as_:
    case C_JKndTup_Obj: {
         Val0 = Tup0;
    } break;     
    case C_JKndTup_aObj: 
    case C_JKndTup_asObj: {
         Val0 = Tup0[Fld1.szNm];
    } break;
    default : {
         $Error.U_Error(C_jCd_Cur, 14, "Wrong JKndTup0.", JKndTup0, false);
    } break;
  } /* switch */

  switch (szType) {
    case "Txt": {
         F_Window_open(Val0);
    } break;
    case "Doc": {
         F_Window_open(Val0);
    } break;
    case "html": {
         F_Window_open(Val0);
    } break;
    case "Array":
    case "object": {
         /* Edit arrays and Objects. */
         var Fld_Obj = Fld1;
         if (Fld_Obj.Aux0) {
             /* We have the layout of the selected field. */
             var Aux0 = Fld_Obj.Aux0;
             if (Aux0.U_CalcVal) {
                Aux0.szNm_aFltObj = Tup0[C_jaFld_S_aXDBAux_szNmLayout];
                Aux0.aFltObj = Tup0[C_jaFld_S_aXDBAux_Layout];
             } /* if */
             var szNm_aFltObj = Aux0.szNm_aFltObj;
             var aFltObj = Aux0.aFltObj;     
             $Object.U_Display(UsrView0, Val0, aFltObj, szNm_aFltObj);
         }
         else {
             /* The layout of the selected field is unknown. */
             if (Val0) {
                /* Use autodetect. */
                $Object.U_Display(UsrView0, Val0, null);
             }
             else {             
                $Error.U_Error(C_jCd_Cur, 15, "Sorry null objects {} cannot be expanded!", "", false);
             } /* if */
         } /* if */
    } break;    
    default : {
         /* Edit simple types (number, string, date, etc.). */
         $Value.DBox_InpVal.U_Hub(C_JPnl_Open);
    } break;
  } /* switch */
} /* U_EdtVal_DDJ */

/*-----U_CB_EdtVal_2 --------------------------------------------------------
*
* Callback called at the end of file downloading.
*/ 
function U_CB_EdtVal_2(P_szTxt)
{
  var Coll0 = JSON.parse(P_szTxt); 
  new CL_XDB([Coll0.DirCur, C_JKndTup_aObj, Coll0.arr, aFld_FlDsc,  "aFld_FlDsc", "Prova.", C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]);
  
  CL_UsrView0.F_UsrView_Select(Coll0.DirCur, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
} /* U_CB_EdtVal_2 */

/*-----U_Refresh --------------------------------------------------------
*
* Repaint table displayed.
*/ 
function U_Refresh()
{
  if (window.fLcdLcd) {   /* $VERSIONING */
      var UsrView0 = CL_UsrView0.F_UsrView_Selected();
      if (UsrView0.XDB0.szNm_aFld == "aFld_sinottico") {
        // debugger;
         $Sinottico.U_Dashboard();    // $LCD non serve a niente!
      }
      else {
         $Table.U_Display_Table();
      } /* if */
//     $LcdLcd.U_Done();
  }
  else {
     $Table.U_Display_Table();
  } /* if */
} /* U_Refresh */

/*-----U_Done() --------------------------------------------------------
*
* Give a feedback.
*/ 
function U_Done()  
{
  $ACP.U_Open_Alert("Refresh Done");
  setTimeout($ACP.U_Close_Alert, 1000);
} /* U_Done() */

/*-----U_Transpose --------------------------------------------------------
*
*/ 
function U_Transpose()
{
  $Table.U_Toggle_Transpose(); 
} /* U_Transpose */

/*-----U_SetFilterJS --------------------------------------------------------
*
*/ 
function U_SetFilterJS()
{
  $Filter.DBox_FilterJS.U_Hub(C_JPnl_Open);

//  $Filter.U_Filter_JS();
} /* U_SetFilterJS */

/*-----U_SetFilter2 --------------------------------------------------------
*
*/ 
function U_SetFilter2()
{
  $Filter.DBox_Filter2.U_Hub(C_JPnl_Open);
} /* U_SetFilter2 */

/*-----U_SetFilterStr --------------------------------------------------------
*
*/ 
function U_SetFilterStr()
{
  $Filter.DBox_FilterStr.U_Hub(C_JPnl_Open);
} /* U_SetFilterStr */

/*-----U_SetFilterSem --------------------------------------------------------
*
*/ 
function U_SetFilterSem()
{
  $Filter.DBox_FilterSem.U_Hub(C_JPnl_Open);
} /* U_SetFilterSem */

/*-----U_FilterQBE --------------------------------------------------------
*
*/ 
function U_FilterQBE()
{
  $Filter.DBox_Flt_QBE.U_Hub(C_JPnl_Open);
} /* U_FilterQBE */

/*-----U_SetSort --------------------------------------------------------
*
*/ 
function U_SetSort()
{
  $Sort.DBox_Sort.U_Hub(C_JPnl_Open);
} /* U_SetSort */

/*-----U_SetAggreg --------------------------------------------------------
*
*/ 
function U_SetAggreg()
{
  $Aggreg.DBox_Aggreg.U_Hub(C_JPnl_Open);
} /* U_SetAggreg */

/*-----U_ToggleFilter --------------------------------------------------------
*
*/ 
function U_ToggleFilter()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  UsrView0.U_Toggle_Filter();
  $Table.U_Display_Table();
} /* U_ToggleFilter */

/*-----U_InvertFilter --------------------------------------------------------
*
*/ 
function U_InvertFilter()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  UsrView0.U_Invert_Filter();
  $Table.U_Display_Table();
} /* U_InvertFilter */

/*-----U_ClearFilter --------------------------------------------------------
*
*/ 
function U_ClearFilter()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  UsrView0.U_Clear_Filter(true);
  $Table.U_Display_Table();
  switch (UsrView0.XDB0.JKndTup0) {
    case C_JKndTup_Arr:
    case C_JKndTup_aRcd:
    case C_JKndTup_aObj: {
         var iRow = UsrView0.KeyTup +1;     
         // $ExeCmd.U_GoTo_OLS(iRow);
    } break;                        
    default : {
         var szKey = UsrView0.KeyTup;
      //   $ExeCmd.U_GoTo_OLS(szKey);     24/08/2024   Baco Obj, asRCD, asObj
    } break;
  } /* switch */
    
  $Table.U_ArrowMove(UsrView0, 0 +G_iDelta_Goto, 1, C_fScroll);
} /* U_ClearFilter */

/*-----U_SetAnchor --------------------------------------------------------
*
*/ 
function U_SetAnchor()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  debugger;
  GP_iStart = GP_iStop;
  GP_iStop  = UsrView0.jaNdx_Sel;
} /* U_SetAnchor */

/*-----U_Data_SetReset() --------------------------------------------------------
*
*/ 
function U_Data_SetReset()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var jaFld1 = UsrView0.jaFld1;
  if ((UsrView0.XDB0.JKndTup0 == C_JKndTup_Obj) || (UsrView0.XDB0.JKndTup0 == C_JKndTup_as_)) {
     $Error.U_Error(C_jCd_Cur, 16, "Data Set/Reset cannot be used with Objects.", "", false);
  } /* if */
  if (jaFld1 < 0) {
     $Error.U_Error(C_jCd_Cur, 17, "No column selected", "");
  } /* if */
  $Value.DBox_SetReset.U_Hub(C_JPnl_Open);
} /* U_Data_SetReset() */

/*-----U_Tag_SetReset --------------------------------------------------------
*
*/ 
function U_Tag_SetReset()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var jaFld1 = UsrView0.jaFld1;
  if ((UsrView0.XDB0.JKndTup0 == C_JKndTup_Obj) || (UsrView0.XDB0.JKndTup0 == C_JKndTup_as_)) {
     $Error.U_Error(C_jCd_Cur, 18, "Tags Set/Reset cannot be used with Objects.", "", false);
  } /* if */
  if (jaFld1 < 0) {
     $Error.U_Error(C_jCd_Cur, 19, "No column selected", "");
  } /* if */
  
  $Value.DBox_Tags.U_Hub(C_JPnl_Open);
} /* U_Tag_SetReset */

/*
* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

/*-----U_CB_Update--------------------------------------------------------
*
* U_CB_Update is the updating callback the will be used by default for state update. 
* $ASSUME: we assume that vconfig.js and vdebug.js have been already loaded.
*/ 
function U_CB_Update()
{
  var iDebug0 = $VConfig.F_i_ValSts_Get("iDebug");
  $VDebug.U_Set_iDebug(iDebug0);
  var DDJSts0 = $VConfig.F_ValPrivate_Sts();
  
  try {    
      $Value.U_Set_szjDate(DDJSts0.szjDate);
      U_Set_TabFix_iWdt(DDJSts0.iWdt_Tab);
  } catch (P_Err) {
      $Error.U_Error(C_jCd_Cur, 20, "U_CB_Update", P_Err.message);
  } /* try catch */
} /* U_CB_Update */

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*-----U_Show_szURL --------------------------------------------------------
*
* Show Collection's URL
*/ 
function xxxU_Show_szURL()
{
  function U_CB_Show_szURL()
  {
    F_Window_open(szNm_URL);
  } /* U_CB_Show_szURL */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  $DDJ.U_CB_Show_szURL = U_CB_Show_szURL;
  var szNm_URL = UsrView0.XDB0.szNm_URL;
  $ACP.U_Open_Alert(szNm_URL + `<br<br><br><br><button onclick="$DDJ.U_CB_Show_szURL()">Look the original file.</button>`, 3);
} /* U_Show_szURL */

/*-----U_Show_szURL --------------------------------------------------------
*
* Show Collection's URL
*/ 
function U_Show_szURL()
{
  function U_CB_URL()
  {
    var szURL = $TabPrm.F_ValSts_Get("URL", "URL");
    CL_UsrView0.F_UsrView_Select(szNmColl, C_WwFlag_fDisplay);   /* Restore the Collection previously selected. */
  } /* U_CB_URL */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szNmColl = UsrView0.szNmColl; 
  var szNm_URL = UsrView0.XDB0.szNm_URL;
  var szPath;
  var iPos = szNm_URL.lastIndexOf("=");
  if (0 < iPos) {
     szPath = szNm_URL.substr(iPos +1);
  }
  else { /* XTG */
     var szFlNm = UsrView0.Val_Sel;
     szNm_URL = "file:///" + szNmColl + szFlNm;  // ++++
     szPath   = szNmColl + szFlNm;
  } /* if */
  if (G_szOS == "Windows") {
     szPath = szPath.replaceAll("/", "\\");
  } /* if */

  $Panel.U_Display("URL", U_CB_URL, {"Path":szPath, "URL":szNm_URL});
} /* U_Show_szURL */

/*-----U_Disp_szFlNm --------------------------------------------------------
* Show Collection Name ad RO/RW in the Header
* Id_szFlNm
*/ 
function U_Disp_szFlNm(P_szNmColl, P_fReadOnly, P_UsrView)
{
  Id_Hdr.style.backgroundColor = (P_fReadOnly)? $Style.F_szRO(): $Style.F_szRW();
  Id_Hdr_szFlNm.innerText = P_szNmColl;
  Id_Hdr_szFlNm.title = P_UsrView.XDB0.szNote;
  var szReadOnly = (P_fReadOnly)? " [RO] ": "[RW]";
  Id_Hdr_szRO.innerText = szReadOnly;     
  document.title = C_szApp + " - " + P_szNmColl  + szReadOnly;
} /* U_Disp_szFlNm */

/*-----U_Disp_szSCtx --------------------------------------------------------
*
* Update the Semantic Context.
* Id_szSCtx
*/ 
function U_Disp_szSCtx(P_szSCtx)
{
  Id_szSCtx.innerHTML = P_szSCtx;
  var aMnEntry = G_asaMnEntry[P_szSCtx];
//  $Sentence.U_Upd_Cache(P_szSCtx, aMnEntry); 
} /* U_Disp_szSCtx */

/*-----U_Disp_State --------------------------------------------------------
*
* Status updating.
* Id_State
*/ 
function U_Disp_State(P_iRowCol)
{
  Id_State.innerHTML = P_iRowCol;
} /* U_Disp_State */
  
/*-----U_Stat_Arr_Freq --------------------------------------------------------
*
* Given the selected Frequencies Table (selected Collection) compute the corresponding statistics.
*/ 
function U_Stat_Arr_Freq()
{
  $Stat_DDJ.U_Stat_Arr_Freq();
} /* U_Stat_Arr_Freq */

/*-----U_mFunDep --------------------------------------------------------
*
* Build Functional Dependencies matrix.
*/ 
function U_mFunDep()
{
   var UsrView0 = CL_UsrView0.F_UsrView_Selected();
   $Stat_DDJ.U_mFunDep_Mp_Cnds(UsrView0);
} /* U_mFunDep */

/*-----U_mSoCnds --------------------------------------------------------
*
* Build Sorted Correlation matrix.
*/ 
function U_mSoCnds()
{
   var UsrView0 = CL_UsrView0.F_UsrView_Selected();
   $Stat_DDJ.U_mSoCnds_Mp_Cnds(UsrView0);
} /* U_mSoCnds */

/*
*  ++++++ Tests ++++++
*/
   
/*-----F_szBrowser --------------------------------------------------------
*
* Browser identification.
* 
* Firefox - navigator.userAgent Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0 navigator.platform Win32
* Chrome  - navigator.userAgent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36 navigator.platform Win32
* Opera   - navigator.userAgent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 OPR/74.0.3911.160 navigator.platform Win32
* EDGE    - navigator.userAgent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.81 navigator.platform Win32
* Vivaldi - navigator.userAgent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.134 Safari/537.36 Vivaldi/2.5.1525.40 navigator.platform Win32
* Bravo   - navigator.userAgent Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36 navigator.platform Win32
* TOR     - navigator.userAgent Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0 navigator.platform Win32
*/ 
function F_szBrowser()
{
  var szBrowser = '';
  var szNav = navigator.userAgent;
  if (szNav.indexOf('Firefox/') != -1) {
     /* Mozilla Firefox */
     szBrowser = 'Firefox';
  }
  else if (szNav.indexOf('Edg/') != -1) {
     /* Google Chrome */
     szBrowser = 'Edge';
  }
  else if (szNav.indexOf('Vivaldi/') != -1) {
     /* Google Chrome */
     szBrowser = 'Vivaldi';
  }   
  else if (szNav.indexOf('Chrome/') != -1) {
     /* Google Chrome */
     szBrowser = 'Chrome';
  }  else {
     szBrowser = 'Altro';
  } /* if */
  return(szBrowser);
} /* F_szBrowser */

/*-----F_fMobile --------------------------------------------------------
*
* See: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
*/ 
function F_fMobile()
{
  var fMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  return(fMobile);
} /* F_fMobile */

/*-----F_fPopUp --------------------------------------------------------
*
* Check if the web page has been run has a popup.
* https://stackoverflow.com/questions/10240398/check-whether-a-window-is-popup-or-not
*/ 
function F_fPopUp()
{
  var fPopUp = (window.opener && (window.opener !== window));
  return(fPopUp); 
} /* F_fPopUp */

/*-----U_Detect_AdBlock --------------------------------------------------------
*
* Check for AdBlock installed.
*/ 
function U_Detect_AdBlock()
{
  /* AdBlock Detector */
  window.addEventListener('load', () => {
    let test = new Request(
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      { method: 'HEAD', mode: 'no-cors' }
    );
   
    fetch(test)
    .then(res => G_fAdBlock = false)
    .catch(err => G_fAdBlock = true);
  });
} /* U_Detect_AdBlock */

/*-----U_Set_jLvl_Log --------------------------------------------------------
*
* Log UsrView
* Set debug level and update log table displayed.
*/ 
function U_Set_jLvl_Log(P_iLvl)
{
  const C_jPos_jLvl = 3;

  GP_iLvl_Log = +P_iLvl;
  var szCond = `($[${C_jPos_jLvl}] <= "${P_iLvl}")`;
  $Filter.U_SetFilter($Filter.F_fFilter_Std, szCond);
  $Table.U_Display_Table();
} /* U_Set_jLvl_Log */

/*-----U_Set_jLvl_Gloss --------------------------------------------------------
*
* GLOSS
* Select semantic-tree level and update table displayed.
*/ 
function U_Set_jLvl_Gloss(P_iLvl)
{
  const C_jPos_jLvl = 2;

  GP_iLvl_Gloss = +P_iLvl;
  var szCond = `($[${C_jPos_jLvl}] <= "${P_iLvl}")`;
  $Filter.U_SetFilter($Filter.F_fFilter_Std, szCond);
  $Table.U_Display_Table();
} /* U_Set_jLvl_Gloss */

/*-----U_Set_iStep --------------------------------------------------------
*
* Select sample step.
*/ 
function U_Set_iStep(P_iStep)
{
  $VConfig.U_Set_ValSts("iSmpl_Step", P_iStep);
  $Table.U_Display_Table();
} /* U_Set_iStep */

/*-----U_Set_iWdt --------------------------------------------------------
*
* Select image width.
*/ 
function U_Set_iWdt(P_iWdt)
{
  $Value.U_Set_iWdt_Image(P_iWdt);
  $Table.U_Display_Table();
} /* U_Set_iWdt */

/*-----U_Set_iWdt_Icon --------------------------------------------------------
*
*/ 
function U_Set_iWdt_Icon()
{
const szLigth = `:root {
  --background: #fff;
  --foreground: #000;
  --bg_tbl:     ivory;
  --Hdr:        cyan;
  --THead:      #ee0;
}`;
const szDark = `
:root {
  --background: #000;
  --foreground: #fff;
  --bg_tbl:     #555;
  --Hdr:        #ddd;
  --THead:      #fff;  
}`;

  var iWdt_Icon = $VConfig.F_ValSts_Get("iWdt_Icon");
  var szStyle   = $VConfig.F_ValSts_Get("szStyle");

  if (iWdt_Icon < 15) {
     iWdt_Icon = 15;
  } /* if */
  
  $Style.U_Set_BG(szStyle);  
  var szTmp = (szStyle == "Dark")? szDark: szLigth;
  szTmp +=  `
  .Cl_input_Image_Button {
     width:${iWdt_Icon}px;
  }`;
  
  Id_Style_0.innerHTML = szTmp;
} /* U_Set_iWdt_Icon */

/*-----U_Set_iNnCol --------------------------------------------------------
*
* Select number of columns.
*/ 
function U_Set_iNnCol(P_iNnCol)
{
  $VConfig.U_Set_ValSts("iNn_Col", P_iNnCol);
} /* U_Set_iNnCol */

/*-----U_Get_Info --------------------------------------------------------
*
* Get the text in the clipboard then search for it using Google.
* 
* $NOTE:
* To use this option, you must first select a word with the mouse cursor and then click on the tool icon.
*/ 
function U_Get_Info()
{
  if (!navigator.clipboard) {
     $Error.U_Error(C_jCd_Cur, 21, "Cannot access clipboard.", "");
  } /* if */
  navigator.clipboard.readText().then((P_szTxt) => {
    var szSearch = `https://www.google.com/search?q=${P_szTxt}&ie=utf-8&oe=utf-8`;
    F_Window_open(szSearch, "_blank"); 
  });
} /* U_Get_Info */

/*-----F_WwFlag_Mp_DDJ --------------------------------------------------------
*
*/ 
function F_WwFlag_Mp_DDJ(P_DDJ)
{
  var WwFlag0 = P_DDJ.WwFlag0;
  
  WwFlag0 |= (P_DDJ.fReadOnly)?  C_WwFlag_fReadOnly:  0;
  WwFlag0 |= (P_DDJ.fszFldNm_1)? C_WwFlag_fszFldNm_1: 0;
  WwFlag0 |= (P_DDJ.fMng_Undef)? C_WwFlag_fMng_Undef: 0;
  WwFlag0 |= (P_DDJ.fTransp)?    C_WwFlag_fTransp:    0;
  WwFlag0 |= (P_DDJ.fEmbed)?     C_WwFlag_fEmbed:     0;
  WwFlag0 |= (P_DDJ.fUnSort)?    C_WwFlag_fUnSort:    0;
  return(WwFlag0);
} /* F_WwFlag_Mp_DDJ */

/*-----F_DDJ_Set_WwFlag --------------------------------------------------------
*
*/ 
function F_DDJ_Set_WwFlag(R_DDJ, P_WwFlag0)
{
  R_DDJ.fReadOnly  = (P_WwFlag0 & C_WwFlag_fReadOnly); 
  R_DDJ.fszFldNm_1 = (P_WwFlag0 & C_WwFlag_fszFldNm_1);
  R_DDJ.fMng_Undef = (P_WwFlag0 & C_WwFlag_fMng_Undef);
  R_DDJ.fTransp    = (P_WwFlag0 & C_WwFlag_fTransp);   
  R_DDJ.fEmbed     = (P_WwFlag0 & C_WwFlag_fEmbed);    
  R_DDJ.fUnSort    = (P_WwFlag0 & C_WwFlag_fUnSort);  
  R_DDJ.WwFlag0    = P_WwFlag0;

  return(R_DDJ);
} /* F_DDJ_Set_WwFlag */

/*-----U_LayoutFld --------------------------------------------------------
*
* Edit the Layout of the current field.
*/
var S_iPos0_KRO = 0;

function U_LayoutFld()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var jaFld = UsrView0.jaFld1;
  var Fld1  = UsrView0.aFld1[jaFld];
  S_iPos0_KRO = Fld1["iPos0"];

  if (!Fld1.szRem) {
     Fld1.szRem = "";
  } /* if */
  if (Fld1.Aux0) {
     var Aux0 = Fld1.Aux0;
     Fld1.Max = (typeof(Aux0.Max) != "undefined")? Aux0.Max: "";
     Fld1.Min = (typeof(Aux0.Min) != "undefined")? Aux0.Min: "";
     Fld1.Step = (typeof(Aux0.Step) != "undefined")? Aux0.Step: "";
  }
  else {
     Fld1.Max = "";
     Fld1.Min = "";
     Fld1.Step = "";
  } /* if */
  G_Layout.DBox0 = new CL_DBox_Obj("Id_Div_DBox0", "G_Layout.DBox0", "Layout.", Fld1, null, null, U_Confirm_Fld, G_asaMnEntry.Layout, "Layout2");  
  G_Layout.DBox0.U_Hub(C_JPnl_Open); 
} /* U_LayoutFld */

/*-----U_Confirm_Fld --------------------------------------------------------
*
*/ 
function U_Confirm_Fld(P_Bag)
{
/* $NOTE: this.F_Obj_Close_Obj(); makes reference to the method F_Obj_Close_Obj(); of the object that executes the call-back!  */

  var Obj0 = this.F_Obj_Close_Obj();
  var Aux0 = {};
  
  Obj0.iPos0 = S_iPos0_KRO; /* iPos0 is read only */
  
  if ((typeof(Obj0.Max) != "undefined") && (Obj0.Max != "")) {
     Aux0.Max = +Obj0.Max;
  } /* if */  
  if ((typeof(Obj0.Min) != "undefined") && (Obj0.Min != "")) {
     Aux0.Min = +Obj0.Min;
  } /* if */  
  if ((typeof(Obj0.Step) != "undefined") && (Obj0.Step != "")) {
     Aux0.Step = +Obj0.Step;
  } /* if */  

  if (!F_fEmpty_Obj(Aux0)) {
     Obj0.Aux0 = Aux0;
  } /* if */  
  U_Refresh();
} /* U_Confirm_Fld */

/*-----U_LayoutColl --------------------------------------------------------
*
* Edit current collection layout.
* UsrView0.szNmColl
*/
function U_LayoutColl()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var szNm_aFld = XDB0.szNm_aFld;
  for (let i = 0; i < UsrView0.aFld1.length; i++) {
      UsrView0.aFld1[i].fRecalc = false;
  } /* for */

  $MeF.U_Set_UsrView_Lft(UsrView0);
  /* $NOTE: make explicit reference to aFld_aFld1. */        
  $DDJ.U_DispColl([szNm_aFld, C_JKndTup_aObj, UsrView0.aFld1, null, "aFld_aFld1", "Layout", (C_WwFlag_fOverWrite | C_WwFlag_fLayout | C_WwFlag_fDisplay), C_jCd_Cur, [UsrView0.szNmColl, C_jPg_0,'', null, null, C_Undefined, C_Undefined, "PopUp_Layout", C_jaszHelp_aFld1]]);                
} /* U_LayoutColl */

/*-----U_Thumbnails --------------------------------------------------------
*
*/ 
function U_Thumbnails(P_x)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var szNmColl = UsrView0.szNmColl;
  var Coll0 = XDB0.Coll0;
  var iLen = Coll0.length;
  var iNnCol = 4;
  var iHgt = Math.floor(iLen / iNnCol);
  var szTmp, szFlNm;
  var i, j, k;
  var szIni = `
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=windows-1252" http-equiv="content-type">
    <title></title>
    <meta content="Luigi CAPRA" name="author">
  </head>
  <body>
    <table style="width: 100%" border="1">
      <tbody>
`;
  var szEnd = `
      </tbody>
    </table>
    <p><br>
    </p>
  </body>
</html>
`;
 var szTxt = szIni + "\n<tr>";
  
  debugger;
  k = 0;
  for (i = 0; i < iHgt; i++) {
      for (j = 0; j < iNnCol; j++) {
          szFlNm = Coll0[k++][0];
          szTmp =  `<img alt="" src="file:///${szNmColl}${szFlNm}" width="100%">`;
          szTxt += "<td>" + szTmp + "</td>";
      } /* for */
      szTxt += "</tr>\n<tr>";
  } /* for */
  szTxt += "</tr>";
  szTxt += szEnd;

  var win = F_Window_open("", "Title"); //, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(screen.height-400)+",left="+(screen.width-840));
  win.document.body.innerHTML = szTxt;
} /* U_Thumbnails */

/*-----F_fOverride_RO --------------------------------------------------------
*
*/ 
function F_fOverride_RO()
{
  return(false);
} /* F_fOverride_RO */

/*-----U_Slide --------------------------------------------------------
*
*/ 
function U_Slide()
{
  F_Window_open("https://capralezioni.altervista.org/2024_25/Intelligenza_Artificiosa-2024/index.html");
} /* U_Slide */

/*-----U_WellCome --------------------------------------------------------
*
*/ 
function U_WellCome()
{
  if (!window.G_fSaved) {
     $DDJ.DBox_WellCome.U_Hub(C_JPnl_Open);
  } /* if */
} /* U_WellCome */

/*-----F_UsrViewPrv --------------------------------------------------------
*
* Pass previous UsrView0 to XTG0.U_Set_szNote();
*/ 
function F_UsrViewPrv(P_UsrViewPrv)
{
  if (P_UsrViewPrv != C_Undefined) {
     S_UsrViewPrv = P_UsrViewPrv;
  } /* if */
  return(S_UsrViewPrv);
} /* F_UsrViewPrv */

/*-----U_Move_Up --------------------------------------------------------
*
*/ 
function U_Move_Up()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();

  var KeyTup = UsrView0.KeyTup;
  var Coll0     = UsrView0.XDB0.Coll0;
  var aNdx      = UsrView0.aNdx;
  var iLen = Coll0.length;
  var iTgt = Coll0[KeyTup].iPos1 -1;
  var j0 = -1;
  var j1 = UsrView0.jaNdx_Sel;
  var Tmp;
  if (iTgt < 0) {
     $Error.U_Beep();
     return;
  } /* if */
  
  for (let i = 0; i < iLen; i++) {
      let j = aNdx[i];
      if (Coll0[j].iPos1 == iTgt) {
         j0 = j;
         break;
      } /* if */
  } /* for */

//   Tmp = aNdx[j0];
//   aNdx[j0] = aNdx[j1];
//   aNdx[j1] = Tmp;
  
  Tmp = Coll0[aNdx[j0]].iPos1; 
  Coll0[aNdx[j0]].iPos1 = Coll0[aNdx[j1]].iPos1
  Coll0[aNdx[j1]].iPos1 = Tmp;
  
  U_Refresh(); 
} /* U_Move_Up */

/*-----U_Move_Dn --------------------------------------------------------
*
*/ 
function U_Move_Dn()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();

  var KeyTup = UsrView0.KeyTup;
  var Coll0     = UsrView0.XDB0.Coll0;
  var aNdx      = UsrView0.aNdx;
  var iLen = Coll0.length;
  var iTgt = Coll0[KeyTup].iPos1 +1;
  var j0 = -1;
  var j1 = UsrView0.jaNdx_Sel;
  var Tmp;
  if (iLen <= iTgt) {
     $Error.U_Beep();
     return;
  } /* if */
  
  for (let i = 0; i < iLen; i++) {
      let j = aNdx[i];
      if (Coll0[j].iPos1 == iTgt) {
         j0 = j;
         break;
      } /* if */
  } /* for */

//   Tmp = aNdx[j0];
//   aNdx[j0] = aNdx[j1];
//   aNdx[j1] = Tmp;
  
  Tmp = Coll0[aNdx[j0]].iPos1; 
  Coll0[aNdx[j0]].iPos1 = Coll0[aNdx[j1]].iPos1
  Coll0[aNdx[j1]].iPos1 = Tmp;
  
  U_Refresh(); 
} /* U_Move_Dn */

/*-----F_Window_open --------------------------------------------------------
*
*  Open a "Tool" in a daughter window.
*/ 
function F_Window_open(P_szURL, P_szOpt, P_szReq)
{
  G_Poly_Res_IPC = null;
  G_Poly_Req_IPC = P_szReq;
  var Win0 = window.open(P_szURL, P_szOpt);
  return(Win0);
} /* F_Window_open */

/*-----U_Close_Window --------------------------------------------------------
*
* This function close the application's main window.
* If there are not other windows open U_Close_Window() close also the browser.
*/ 
function U_Close_Window()
{
  window.close();
} /* U_Close_Window */

/*-----U_Close_Coll --------------------------------------------------------
*
* Deallocate Collection to save memory space.
*/ 
function U_Close_Coll()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  XDB0.Coll0 = null;
  U_Refresh();
} /* U_Close_Coll */

/*-----U_Ena_Show --------------------------------------------------------
*
* Enable file contents dispaly at saving time.
*/ 
function U_Ena_Show()
{
  S_fShow = true;
} /* U_Ena_Show */

/*-----U_Alt_Sv --------------------------------------------------------
*
* Create an alternative User View.
*/ 
function U_Alt_Sv()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var szNmColl = XDB0.szNmColl;
  var szNm_aFld = "Alt321";
  ALERT("321", 1);
  
  new CL_XDB0([szNm_aFld, C_JKndTup_aObj, G_aFld_Stat, G_aFld_aFld, "aFld_aFld", `${szNmColl} alternative.`, C_WwFlag_fReadOnly, C_jCd_Cur]);
  debugger;
} /* U_Alt_Sv */

/*-----U_Alt_Sel --------------------------------------------------------
*
* Select an alternative Layout.
*/ 
function U_Alt_Sel()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  new CL_XDB(["Alt_" + XDB0.szNmColl, XDB0.JKndTup0, XDB0.Coll0, null, "aFld_AltApps", "Vista Alternativa.", (C_WwFlag_fDisplay | C_WwFlag_fOverWrite), C_jCd_Cur, C_Bag_UsrView_Dflt]);
} /* U_Alt_Sel */

/*-----U_Set_MinMax --------------------------------------------------------
*
*/ 
function U_Set_MinMax()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szNmColl = UsrView0.szNmColl.substr(11);
  var Coll0 = UsrView0.XDB0.Coll0;
  var iLen = Coll0.length; 
  var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(szNmColl, true);
  var aFld1 = UsrView1.aFld1;
  var i; 

  for (i = 0; i < iLen; i++) {
      var Stat0 = Coll0[i];
      var Fld1 = aFld1[i];
      if (Fld1.szType == "number") {
         var Aux0 = {"Min":Stat0.Min, "Max":Stat0.Max};
         Fld1.Aux0 = Aux0;
      } /* if */
  } /* for */
} /* U_Set_MinMax */

/*----- U_LinkClicked --------------------------------------------------------
*
* Manage OLS' internal links.
* Example:
* <a href="ddj:Log">Jump Log Collection</a>
*/
function U_LinkClicked(P_Event) {
    var target = P_Event.target || P_Event.srcElement;
    var iPos, k, szKnd;

    if (target.tagName === 'A') {
        var szHREF = target.getAttribute('href');
        var szPfx = szHREF.substr(0,4);
        var szNm_UsrView;

        if (szPfx == 'ddj:') {
           // $ACP.U_Open_Alert('CLICKED');
           //tell the browser not to respond to the link click
           P_Event.preventDefault();
           iPos = szHREF.indexOf("#");
           if (0 < iPos) {
              szNm_UsrView = szHREF.substring(4, iPos);
              k = +szHREF.substring(iPos +1);               /* $NOTE: k should be a number. */
              var UsrView0 = CL_UsrView0.F_UsrView_Select(szNm_UsrView, C_WwFlag_fDisplay);
              $Table.U_ArrowMove(UsrView0, k +G_iDelta_Goto, 1, C_fScroll);
           }
           else {
              szNm_UsrView = szHREF.substr(4);
              CL_UsrView0.F_UsrView_Select(szNm_UsrView, C_WwFlag_fDisplay);
           } /* if */
        } else if (szPfx == 'flk:') {
           P_Event.preventDefault();                        /* file link */
           szNm_UsrView = szHREF.substr(4);
           if (szNm_UsrView.indexOf("/ / ") >= 0) {
              szKnd = "dir";
              szNm_UsrView = szNm_UsrView.replaceAll("/ / ", "/");
           }
           else {
              szKnd = "file";
           } /* if */
           $FileMan.U_Open_PATH_2(szNm_UsrView, szKnd);
        }
        else if (szPfx == 'blob') {
        }
        else if (S_fShow && (szHREF != "JavaScript:void(0)")) {
           F_Window_open(szHREF);
           S_fShow = false;
        }
        else {
          F_Window_open(szHREF); // 02/02/2026
        } /* if */
    } /* if */
} /* U_LinkClicked */

/*-----U_UnLoad --------------------------------------------------------
*
* Menage window closing event. This routine will be executed when the user close the window.
*/ 
function U_UnLoad()
{
//  ALERT("Window Closing", 1);
} /* U_UnLoad */

/*-----U_Init_DDJ --------------------------------------------------------
*
*/
function U_Init_DDJ()
{
  U_Root0("$DDJ", C_jCd_Cur);

  G_szSecure  = (window.isSecureContext)? "secure": "not secure";  
  G_szBrowser = F_szBrowser();
  G_fMobile   = F_fMobile();
  G_fLocal    = (window.location.protocol == "file:");     /* Web-Page loaded from user's harddisk. */
  U_Detect_AdBlock();
                                  
  _DDJ.DBox_About    = new CL_DBox('Id_Div_DBox0', '$DDJ.DBox_About', 'About', S_szHTML_DBox_About, G_DBox_Null.U_Open, G_DBox_Null.U_Cancel, G_DBox_Null.U_Cancel, null, 'About');
  _DDJ.DBox_WellCome = new CL_DBox('Id_Div_DBox0', '$DDJ.DBox_WellCome', 'WellCome', S_szHTML_DBox_WellCome, G_DBox_Null.U_Open, G_DBox_Null.U_Cancel, $Help.U_Tutorial, null, 'WellCome');

  S_Disk = $IPCF.F_JSON_Get(".");

  if (typeof(CL_XDB0) != "undefined") {
     new CL_XDB0(["aFld_Disk", C_JKndTup_aObj, S_aFld_Disk, null,   "aFld_aFld", "S_Disk Layout.", (C_WwFlag_fReadOnly), C_jCd_Cur]);         
     new CL_XDB(["DSK",        C_JKndTup_aRcd, S_Disk, S_aFld_Disk, "aFld_Disk", "Disks mounted.", (C_WwFlag_fReadOnly), C_jCd_Cur, C_Bag_UsrView_Dflt]);
  } /* if */

/* listen for link-click events at the document level */
  document.addEventListener('click', U_LinkClicked); 
  window.addEventListener("beforeunload", U_UnLoad);

  if (typeof($FileMan) != "undefined") {
     $FileMan.U_Get_Dir("", "");    /* Get list of Disk installed. Initialize the Collection Disk. */
  } /* if */
  U_Root0("$DDJ", C_jCd_Cur, 2);
} /* U_Init_DDJ */

  U_Root0("$DDJ", C_jCd_Cur, 1);
  return(_DDJ);
})();  /* DDJ */
