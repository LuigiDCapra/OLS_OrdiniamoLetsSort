/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : object.js
* Function    : Objects display
* FirstEdit   : 15/06/2023
* LastEdit    : 03/10/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Expand the given object for display.
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

/*----- Module $Object --------------------------------------------------------
*
*/ 
const $Object = (function () {
  var _Object = {};
  _Object.U_Init        = U_Init_Object;     // function U_Init_Object();
  _Object.U_Display     = U_Display;         // function U_Display(P_UsrView, P_Val0, P_Fld, P_szNm_aFld);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Object;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----U_Display --------------------------------------------------------
*
* Display Object P_Val0
*/ 
function U_Display(P_UsrView, P_Val0, P_Fld, P_szNm_aFld)
{
    var szNm = P_UsrView.szNmColl + `[${P_UsrView.KeyTup}]` + `[${P_UsrView.jaFld1}]`;
    var XDB0 = P_UsrView.XDB0;
    var JKndTup0 = XDB0.JKndTup0;

    if (P_Fld) {       
       new CL_XDB([szNm, JKndTup0, P_Val0, P_Fld, P_szNm_aFld, "", (C_WwFlag_fMng_Undef | C_WwFlag_fOverWrite | C_WwFlag_fDisplay), C_jCd_Cur, C_Bag_UsrView_Dflt]);   
    }
    else {
       new CL_XDB([szNm, C_JKndTup_Null, P_Val0, null, "AutoDetect", "", (C_WwFlag_fMng_Undef | C_WwFlag_fOverWrite | C_WwFlag_fDisplay), C_jCd_Cur, C_Bag_UsrView_Dflt]);   
    } /* if */
} /* U_Display */

/*-----U_Init_Object --------------------------------------------------------
*
*/ 
function U_Init_Object()
{
  U_Root0("$Object", C_jCd_Cur, 2);
} /* U_Init_Object */

  U_Root0("$Object", C_jCd_Cur, 1);
  return(_Object);
})();  /* Object */
