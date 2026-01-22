/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : TabPrm.js
* Function    : Parameters Table
* FirstEdit   : 06/10/2025
* LastEdit    : 11/10/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Expand the given TabPrm for display.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* 
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $TabPrm --------------------------------------------------------
*
*/ 
const $TabPrm = (function () {
  var _TabPrm = {};
  _TabPrm.U_Init                 = U_Init_TabPrm;           // function U_Init_TabPrm();
  _TabPrm.U_Set_Coll             = U_Set_Coll;              // function U_Set_Coll(P_szNmColl, P_Coll);
  _TabPrm.F_Coll_Get             = F_Coll_Get;              // function F_Coll_Get(P_szNmColl);

  _TabPrm.U_Set_Prm              = U_Set_Prm;               // function U_Set_Prm(P_szNmColl, P_szNmPrm, P_Prm);
  _TabPrm.U_Set_ValSts           = U_Set_ValSts;            // function U_Set_ValSts(P_szNmColl, P_szNmPrm, P_szNm, P_szVal);
  _TabPrm.F_ValSts_Get           = F_ValSts_Get;            // function F_ValSts_Get(P_szNmColl, P_szNmPrm, P_szNm);
  _TabPrm.F_i_ValSts_Get         = F_i_ValSts_Get;          // function F_i_ValSts_Get(P_szNmColl, P_szNmPrm, P_szNm);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_TabPrm;

/*----- Local Variables ----------------------------------------------*/

var S_TabPrm = {};

/*--------------------------------------------------------------------*/

/*-----U_Set_Coll --------------------------------------------------------
*
* Set the value of configuration variable selected.
*/ 
function U_Set_Coll(P_szNmColl, P_Coll)
{
  S_TabPrm[P_szNmColl] = P_Coll;
} /* U_Set_Coll */

/*-----F_Coll_Get --------------------------------------------------------
*
* Set the value of configuration variable selected.
*/ 
function F_Coll_Get(P_szNmColl)
{
  return(S_TabPrm[P_szNmColl]);
} /* F_Coll_Get */

/*-----U_Set_Prm --------------------------------------------------------
*
* Set the value of configuration variable selected.
*/ 
function U_Set_Prm(P_szNmColl, P_szNmPrm, P_Prm)
{
  S_TabPrm[P_szNmColl][P_szNmPrm] = P_Prm;
} /* U_Set_Prm */

/*-----U_Set_ValSts --------------------------------------------------------
*
* Set the value of configuration variable selected.
*/ 
function U_Set_ValSts(P_szNmColl, P_szNmPrm, P_szVal)
{
  S_TabPrm[P_szNmColl][P_szNmPrm] = P_szVal;
} /* U_Set_ValSts */

/*-----F_ValSts_Get --------------------------------------------------------
*
* Return the value of the configuration variable selected.
*/ 
function F_ValSts_Get(P_szNmColl, P_szNmPrm)
{
  return(S_TabPrm[P_szNmColl][P_szNmPrm]);
} /* F_ValSts_Get */

/*-----F_i_ValSts_Get --------------------------------------------------------
*
* Return the value of the configuration variable selected as a number.
*/ 
function F_i_ValSts_Get(P_szNmColl, P_szNmPrm)
{
  return(+S_TabPrm[P_szNmColl][P_szNmPrm]);
} /* F_i_ValSts_Get */

/*-----U_Init_TabPrm --------------------------------------------------------
*
*/ 
function U_Init_TabPrm()
{
  U_Root0("$TabPrm", C_jCd_Cur, 2);
} /* U_Init_TabPrm */

  U_Root0("$TabPrm", C_jCd_Cur, 1);
  return(_TabPrm);
})();  /* TabPrm */
