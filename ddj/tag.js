/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : tag.js
* Function    : Tags management.
* FirstEdit   : 15/12/2019
* LastEdit    : 16/08/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2024
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
* 
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Tag --------------------------------------------------------
*
*/ 
const $Tag = (function () {
  var _Tag = {};
  _Tag.U_Init          = U_Init_Tag;       // function U_Init_Tag();
  _Tag.U_Eval          = U_Eval;           // function U_Eval(P_UsrView, P_Fld1, P_Key, P_szCode, P_iStart, P_iStop);


/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Tag;

/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----U_Eval --------------------------------------------------------
*
*/ 
function U_Eval(P_UsrView, P_Fld1, P_ValRgt, P_szCmd, P_iStart, P_iStop)
{

  function F_SetValue(P_ValLft)
  {
    return(P_ValRgt);
  } /* F_SetValue */

  function F_SetBits(P_ValLft)
  {
    return(P_ValLft | P_ValRgt);
  } /* F_SetBits */

  function F_ResetBits(P_ValLft)
  {
    return(P_ValLft & P_ValRgt);
  } /* F_ResetBits */

  function F_ToggleBits(P_ValLft)
  {
    return(P_ValLft ^ P_ValRgt);
  } /* F_ToggleBits */


//  var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z;
  var XDB0  = P_UsrView.XDB0;
  var JKndTup0 = XDB0.JKndTup0;
  var aRcd0 = XDB0.Coll0;
  var aNdx  = P_UsrView.F_aNdx();
  var jFld0 = P_Fld1.iPos0;
  var j     = jFld0;
  var Tup0;
  var Tmp0;
  var pF;
  var Key;
  var i;
  var P_Key = (JKndTup0 & 1)?P_Fld1.iPos1: P_Fld1.szNm; 

  switch (P_szCmd) {
    case "Set bits": {
         pF = F_SetBits;
    } break;
    case "Reset bits": {
         pF = F_ResetBits;
         P_ValRgt = ~P_ValRgt;
    } break;
    case "Toggle bits": {
         pF = F_ToggleBits;
    } break;
    default : {
         pF = F_SetValue;
    } break;
  } /* switch */
debugger;
  P_ValRgt = +P_ValRgt;

  for (i = P_iStart; i <= P_iStop; i++) {
      Key  = aNdx[i];
      Tup0 = aRcd0[Key];
      try {
          Tmp0 = pF(+Tup0[P_Key]);
          Tup0[P_Key] = Tmp0;
      } catch (P_Err) {
          Tup0[P_Key] = "<span class='Cl_Error'> pFn - 2<span>";          
          $VDebug.U_Dbg_Halt(C_iDebug_UsrRtn);
      } /* try catch */
  } /* for */
} /* U_Eval */


/*-----U_Init_Tag --------------------------------------------------------
*
*/ 
function U_Init_Tag()
{
  U_Root0("$Tag", C_jCd_Cur);
} /* U_Init_Tag */

  return(_Tag);
})();  /* Tag */
