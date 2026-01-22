/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : oprn.js
* Function    : HTML's Elements print.
* FirstEdit   : 21/12/2021
* LastEdit    : 16/08/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2024
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     HTML's Elements print.
*     
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module OPrn --------------------------------------------------------
*
*/

/* # ---- Object Prn --------------------------------------------------------
*
*/ 
const $OPrn = (function(){
  var _OPrn = {};
  _OPrn.U_Init = U_Init; 
  _OPrn.U_Prn_Elem    = U_Prn_Elem;       // function U_Prn_Elem(P_szHTML, P_fClear);
  _OPrn.U_Clear_Elem  = U_Clear_Elem;     // function U_Clear_Elem(P_szId);
  _OPrn.U_Ins_Elem    = U_Ins_Elem;       // function U_Ins_Elem(P_szId);
  _OPrn.U_Upd_Elem    = U_Upd_Elem;       // function U_Upd_Elem(P_szId, P_fClear);
  _OPrn.F_innerHTML   = F_innerHTML;      // function F_innerHTML();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_OPrn;

/*----- Local Variables ----------------------------------------------*/
  
  var S_asElem_Tab={};
  var S_innerHTML="";

/* ----- U_Ins_Elem ------------------------------------------------------------------------
*
* Insert a new Element in the Element's list
*/
function U_Ins_Elem(P_szId) {
  var Elem0 = document.getElementById(P_szId);
  if (Elem0) {
     S_asElem_Tab[P_szId] = Elem0;  
  }
  else {
     $Error.U_Error(C_jCd_Cur, 1, "Ins_Element", P_szId, false);
  } /* if */
} /* U_Ins_Elem */

/* ----- U_Clear_Elem ------------------------------------------------------------------------
*
* Clear the Element.
*/
function U_Clear_Elem(P_szId) {
  if (P_szId) {
     if (S_asElem_Tab[P_szId]) {        
        S_asElem_Tab[P_szId].innerHTML = "";
     }
     else {
        try {
            /* The element P_szId is not managed using $OPrn. try reinitializing it anyway. */
            document.getElementById(P_szId).innerText = "";
        } catch (P_Err) {
            $Error.U_Error(C_jCd_Cur, 2, "Clear", P_szId, false);
        } /* try catch */
     } /* if */
  }
  else {
      $Error.U_Error(C_jCd_Cur, 3, "Clear", P_szId, false);
  } /* if */
} /* U_Clear_Elem */

/* ----- U_Upd_Elem ------------------------------------------------------------------------
*
* Update the HTML code of the Element selected by its Id (P_szId) inserting the compiled HTML code.
*/
function U_Upd_Elem(P_szId, P_fClear, P_fHTML = true) {
  if (!P_szId || !S_asElem_Tab[P_szId]) {
     $Error.U_Error(C_jCd_Cur, 4, "Upd_Elem", P_szId, false);
  } /* if */
  if (P_fClear) {
     S_asElem_Tab[P_szId].innerHTML = "";
  } /* if */
  if (P_fHTML) {
      S_asElem_Tab[P_szId].innerHTML += S_innerHTML;  
  }
  else {
      S_asElem_Tab[P_szId].innerText += S_innerHTML;
  } /* if */
} /* U_Upd_Elem */
  
/* ----- U_Prn_Elem ------------------------------------------------------------------------
*
* Add HTML code to the compiled list.
*/
function U_Prn_Elem(P_szHTML, P_fClear) {
  if (P_fClear) {
     S_innerHTML="";
  } /* if */
  S_innerHTML += P_szHTML;
} /* U_Prn_Elem */

/*-----F_innerHTML --------------------------------------------------------
*
*/ 
function F_innerHTML()
{
  return(S_innerHTML);
} /* F_innerHTML */

/*-----U_Init --------------------------------------------------------
*
*/ 
function U_Init()
{
  U_Root0("$OPrn", C_jCd_Cur);
} /* U_Init */

  return(_OPrn);
})(); /* # END - $OPrn object */
