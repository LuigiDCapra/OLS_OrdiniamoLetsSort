/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : code2.js
* Function    : Objects Root.
* FirstEdit   : 01/02/2022
* LastEdit    : 03/09/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
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

/*----- Module $Root --------------------------------------------------------
*
*/ 
const $Root = (function () {
  var _Root = {};
  _Root.U_Init   = U_Init_Root;     // function U_Init_Root();
  _Root.U_Root   = U_Root;          // function U_Root(P_szNmMod, P_y);
  _Root.U_Reg    = U_Reg;           // function U_Reg();
  _Root.F_fExist = F_fExist;        // function F_fExist(P_szNmMod);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Root;

/*----- Local Variables ----------------------------------------------*/

var S_asRoot = {};
var S_asRoll = {};

/*--------------------------------------------------------------------*/

/*-----F_fExist --------------------------------------------------------
*
* Check if the Module specified exists.
* 
* $NOTE:
* by declaring modules using
*   const G_DBox_Null = (function(){
* instead of 
*   var G_DBox_Null = (function(){
* you should replace
*   if (window.<module>) {} 
* with
*   if (F_fExist("<module>")) {}    
*/ 
function F_fExist(P_szNmMod)
{
  return(S_asRoot[P_szNmMod] != undefined);
} /* F_fExist */

/*-----U_Root --------------------------------------------------------
*
* Insert Module Name in Module's list.
*/ 
function U_Root(P_szNmMod, P_jCd, P_iPos, P_Val)
{
  S_asRoot[P_szNmMod] = [P_szNmMod, P_jCd, P_iPos, P_Val];
} /* U_Root */

/*-----U_Inc_Error --------------------------------------------------------
*
*/ 
function U_Inc_Error(P_szNmMod)
{
//   var szMod, szAux, iErrTot, iErrCur;
// 
//   if (S_asRoot[P_szNmMod]) {  
//      [szMod, szAux, iErrTot, iErrCur] = S_asRoot[P_szNmMod];
//      S_asRoot[P_szNmMod] = [szMod, szAux, iErrTot +1, iErrCur +1]; 
//   }
//   else {  
//      S_asRoot[P_szNmMod] = [P_szNmMod, 0, 0, 0];
//   } /* if */
} /* U_Inc_Error */

/*-----U_Reg --------------------------------------------------------
*
*/ 
function U_Reg()
{
  if ($VConfig.F_i_ValSts_Get("fDtStru")) {
     new CL_XDB(["asRoot", C_JKndTup_asRcd, S_asRoot, null, "AutoDetect", "Objects & Classes.", C_WwFlag_fService, C_jCd_Cur, C_Bag_UsrView_Dflt]);
  } /* if */
} /* U_Reg */

/*-----U_Init_Root --------------------------------------------------------
*
*/ 
function U_Init_Root()
{
  U_Root("$Root", C_jCd_Cur, 2);
} /* U_Init_Root */

  U_Root("$Root", C_jCd_Cur, 1);
  return(_Root);
})();  /* Root */

