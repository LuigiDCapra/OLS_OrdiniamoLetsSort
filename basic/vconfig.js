/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : ddj_cfg.js
* Function    : DDJ's configuration
* FirstEdit   : 02/02/2021
* LastEdit    : 09/01/2026
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

/*----- Module $VConfig --------------------------------------------------------
*
* $Note: we use $VConfig and not $DDJ_Cfg for standardization ("error.js" and other lib files make reference to $VConfig).
*/
const $VConfig = (function () {
  var _VConfig = {};
  _VConfig.U_Init                 = U_Init_VConfig;          // function U_Init_VConfig();
  _VConfig.U_Init_DDJSts          = U_Init_DDJSts;           // function U_Init_DDJSts(P_szNm_LocStg="DDJ", P_DDJSts, P_CB_Update);
  _VConfig.U_Load_DDJSts          = U_Load_DDJSts;           // function U_Load_DDJSts();
  _VConfig.U_Store_DDJSts         = U_Store_DDJSts;          // function U_Store_DDJSts();
  _VConfig.U_Clear_LocalStorage   = U_Clear_LocalStorage;    // function U_Clear_LocalStorage();
  _VConfig.F_fChk_Date            = F_fChk_Date;             // function F_fChk_Date();
  _VConfig.F_szjDate              = F_szjDate;               // function F_szjDate();
  _VConfig.U_Set_szjDate          = U_Set_szjDate;           // function U_Set_szjDate(P_szjDate);
  _VConfig.U_Reset                = U_Reset;                 // function U_Reset();
  _VConfig.F_ValPrivate_Sts       = F_ValPrivate_Sts;        // function F_ValPrivate_Sts(P_szAuth);
  _VConfig.F_fValSts_Toggle       = F_fValSts_Toggle;        // function F_fValSts_Toggle(P_szNm);
  _VConfig.U_Set_ValSts           = U_Set_ValSts;            // function U_Set_ValSts(P_szNm, P_szVal);
  _VConfig.F_ValSts_Get           = F_ValSts_Get;            // function F_ValSts_Get(P_szNm);
  _VConfig.F_i_ValSts_Get         = F_i_ValSts_Get;          // function F_i_ValSts_Get(P_szNm);

  _VConfig.U_CB_Update_Default    = U_CB_Update_Default;     // function U_CB_Update_Default();

  _VConfig.DBox_Config            = S_DBox_Config;           //
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_VConfig;
const C_iNnRow_Page_Dflt = 20;

/*----- Local Variables ----------------------------------------------*/

var S_szNm_LocStg = "DDJ";                     /* Name of the variable in the local storage used to save App's state. */

var S_DDJSts = {"iRel_KNS":0, "iDebug":5};     /* Current State */
var S_DDJSts_Dflt = S_DDJSts;                  /* Default State */
var S_DBox_Config = {};

var S_CB_Update = null;                        /* Updating CallBack */

/*--------------------------------------------------------------------*/

/*-----U_Clear_LocalStorage ----------------------------------------------------
*
* Clear the localstorage completely!
*/ 
function U_Clear_LocalStorage()
{
  S_DDJSts = {};
  $Pers.U_Clear_LocalStorage(true);
} /* U_Clear_LocalStorage */

/*-----U_Load_DDJSts ---------------------------------------------------------
*
*/ 
function U_Load_DDJSts(P_WellCome)
{
  var szDDJSts = localStorage.getItem(S_szNm_LocStg);
  var DDJSts0;
        
  try {
      DDJSts0 = JSON.parse(szDDJSts);
  } catch (P_Err) {
      $Error.U_Catch(C_jCd_Cur, 1, P_Err);
  } /* try catch */
  
  if (!DDJSts0 || (S_DDJSts.iRel_KNS != DDJSts0.iRel_KNS)) {
     /* Save new configuration. */
     U_Reset(false);
     if (P_WellCome) {
        setTimeout(P_WellCome, 2000);
     } /* if */  
  }
  else {
     /* Set previous configuration. */
     S_DDJSts = DDJSts0;
  } /* if */
      
  U_Upd_State();
  return(S_DDJSts);
} /* U_Load_DDJSts */

/*-----U_Store_DDJSts --------------------------------------------------------
*
*/ 
function U_Store_DDJSts()
{
  var Date0 = new Date();
  var imSec70 = Date0.getTime();        // $Note: Date0.getTime(); == Date.now();  we use the old function for homogeneity!
  var iYear   = Date0.getFullYear();
  var iMonth  = Date0.getMonth() +1;
  var iMDay   = Date0.getDate();

  S_DDJSts.iYear_KNS   = iYear;
  S_DDJSts.iMonth_KNS  = iMonth;
  S_DDJSts.iMDay_KNS   = iMDay;
  S_DDJSts.iSec70_KNS  = imSec70;
  var szJSON = JSON.stringify(S_DDJSts);
  localStorage.setItem(S_szNm_LocStg, szJSON);
} /* U_Store_DDJSts */

/*-----U_Reset --------------------------------------------------------
*
*/ 
function U_Reset(P_fReOpen=true)
{
  var Key;
  ALERT("Reset Configuration",1);

  for (Key in S_DDJSts) {
      if (Key in S_DDJSts_Dflt) {
         S_DDJSts[Key] = S_DDJSts_Dflt[Key];
      } /* if */
  } /* for */
  U_Upd_State();   
  U_Store_DDJSts(S_DDJSts);
/*
* U_ReOpen() should be called if the User required a "configuration reset",
* but not if U_Reset() was forced because iRel_KNS changed.
*/
  if (P_fReOpen) {
     S_DBox_Config.U_ReOpen();
  } /* if */
} /* U_Reset */

/*-----F_ValPrivate_Sts --------------------------------------------------------
*
* Return S_DDJSts as a private variable.
*/ 
function F_ValPrivate_Sts(P_szAuth)
{
  return(S_DDJSts);
} /* F_ValPrivate_Sts */

/*-----F_fChk_Date -------------------------------------------------------------
*
*/ 
function F_fChk_Date()
{
  var Date0 = new Date();
  var iYear   = Date0.getFullYear();
  var iMonth  = Date0.getMonth() +1;
  var iMDay   = Date0.getDate();
  if ((S_DDJSts.iMDay_KNS != iMDay) || (S_DDJSts.iMonth_KNS != iMonth) || (S_DDJSts.iYear_KNS != iYear)) {
     /* Date changed - Manage it. */
     return(true);
  } /* if */
  return(false);
} /* F_fChk_Date */

/*-----U_Set_ValSts --------------------------------------------------------
*
* Set the value of configuration variable selected.
*/ 
function U_Set_ValSts(P_szNm, P_szVal)
{
  S_DDJSts[P_szNm] = P_szVal;
} /* U_Set_ValSts */

/*-----F_ValSts_Get --------------------------------------------------------
*
* Return the value of the configuration variable selected.
*/ 
function F_ValSts_Get(P_szNm)
{
  return(S_DDJSts[P_szNm]);
} /* F_ValSts_Get */

/*-----F_i_ValSts_Get --------------------------------------------------------
*
* Return the value of the configuration variable selected as a number.
*/ 
function F_i_ValSts_Get(P_szNm)
{
  return(+S_DDJSts[P_szNm]);
} /* F_i_ValSts_Get */

/*-----F_fValSts_Toggle --------------------------------------------------------
*
*/ 
function F_fValSts_Toggle(P_szNm)
{
  var fVal = !S_DDJSts[P_szNm];
  S_DDJSts[P_szNm] = fVal;
  return(fVal);
} /* F_fValSts_Toggle */

/*-----F_szjDate --------------------------------------------------------
*
*/ 
function F_szjDate()
{
  S_DDJSts.szjDate = $Value.F_szjDate();
  return(S_DDJSts.szjDate);
} /* F_szjDate */

/*-----U_Set_szjDate --------------------------------------------------------
*
*/ 
function U_Set_szjDate(P_szjDate)
{
  S_DDJSts.szjDate = P_szjDate;
  $Value.U_Set_szjDate(P_DDJSts.szjDate);
} /* U_Set_szjDate */

/*-----U_Confirm_2 --------------------------------------------------------
*
*/ 
function U_Confirm_2(P_Bag)
{
/* $NOTE: this.U_Close_Obj(); makes reference to the method U_Close_Obj(); of the object that executes the call-back!  */

  this.U_Close_Obj();
  U_Store_DDJSts();
  U_Upd_State();
} /* U_Confirm_2 */

/*-----U_CB_Update_Default--------------------------------------------------------
*
* $ASSUME: we assume vdebug.js has been already loaded.
*/ 
function U_CB_Update_Default()
{
  var iDebug0 = F_i_ValSts_Get("iDebug");
  $VDebug.U_Set_iDebug(iDebug0);
} /* U_CB_Update_Default */

/*-----U_Upd_State --------------------------------------------------------
*
* Synchronize the internal state setting S_DDJSts values.
*/ 
function U_Upd_State()
{
  if (typeof(S_CB_Update) == "function") {     
     S_CB_Update(S_DDJSts);
  } /* if */
//   if (typeof(U_Upd_State_App) == "function") {     
//      U_Upd_State_App(S_DDJSts);   /* Call Application own update routine. */
//   } /* if */
} /* U_Upd_State */

/*-----U_Init_DDJSts --------------------------------------------------------
*
* P_DDJSts    - Application dependent State defaults.
* P_CB_Update - Application dependent updatig callback.
*/ 
function U_Init_DDJSts(P_szNm_LocStg="DDJ", P_DDJSts, P_CB_Update, P_WellCome)
{
  S_DDJSts      = P_DDJSts;
  S_DDJSts_Dflt = P_DDJSts;       /* Set DDJSts initial values. */
  
  S_CB_Update   = P_CB_Update;    /* Save Updating CallBack */
  
  S_szNm_LocStg = P_szNm_LocStg;
  S_DDJSts = $VConfig.U_Load_DDJSts(P_WellCome);
/*
* Load configuration data and check connection.
* C_fMain == undefined inhibits functions that should not disabled when the code runs in background.
*/
  if (typeof(C_fMain) == "undefined") {
     return;
  } /* if */  

  S_DBox_Config = new CL_DBox_Obj("Id_Div_DBox0", "$VConfig.DBox_Config", (C_szApp + "'s Configuration."), S_DDJSts, null, null, U_Confirm_2, S_DBox_Config.aMnEntry, "DDJ_Cfg", false);  

  _VConfig.DBox_Config = S_DBox_Config;
} /* U_Init_DDJSts */

/*-----U_Init_VConfig --------------------------------------------------------
*
*/   
function U_Init_VConfig()
{
  U_Root0("$VConfig", C_jCd_Cur, 2);
} /* U_Init_Name */

  U_Root0("$VConfig", C_jCd_Cur, 1);
  return(_VConfig);
})();  /* DDJ_Cfg */
