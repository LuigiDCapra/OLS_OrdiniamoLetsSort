/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Web Server
* Revision    : 0.021
* File        : formint.js
* Function    : Formulas Interpreter
* FirstEdit   : 15/06/2024
* LastEdit    : 28/07/2025
* System      : Mozilla FireFox 80+
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
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
*     File Manager. Browse directories list.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
//"use strict";

/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

var G_Val0  = 0;
var G_Val1  = "";
var G_iCnt0 = 0;
var G_iCnt1 = 0;

/*--------------------------------------------------------------------*/

const $FormInt = (function () {
  var _FormInt = {};
  _FormInt.U_Init             = U_Init_FormInt;          // function U_Init_FormInt();
  _FormInt.U_Eval             = U_Eval;                  // function U_Eval(P_UsrView, P_Fld1, P_Key, P_szCode, P_iStart, P_iStop);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_FormInt;

/*-----U_Eval --------------------------------------------------------
*
*/ 
function U_Eval(P_UsrView, P_Fld1, P_Key, P_szCode, P_iStart, P_iStop)
{
  var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z;
  var XDB0  = P_UsrView.XDB0;
  var aTup0 = XDB0.Coll0;
  var aNdx  = P_UsrView.F_aNdx();
  var jFld0 = P_Fld1.iPos0;
  var j     = jFld0;   /* Selected field/column */
  var i;               /* Index of the current row (in original order) */
  var Key;             /* Key of the current row (in aNdx order) */
  var Tup0;            /* Current Tuple/record */
  var Tmp0;
  var szCode;
  var $$ = aTup0;
  var pF;

  G_Val0  = 0;
  G_Val1  = 0;
  G_iCnt0 = 0;
  G_iCnt1 = 0;
  
  /* Initialize Aliases variables for the collections present in memory */

  const as_UsrView_K = CL_as_UsrView_K.S_as_UsrView_K;
  for (var szKey in as_UsrView_K) {
      if (szKey != "?") {
         var Val0 = as_UsrView_K[szKey].XDB0.Coll0;
         var szCode_K = `${szKey} = Val0;` ;
         eval(szCode_K);
      } /* if */
  } /* for */
  
  szCode = `pF = ($) => (${P_szCode})`;
  
  try {
      eval(szCode);   /* Build the function for szCode. */
  } catch (P_Err) {
      $Error.U_Error(C_jCd_Cur, 2, "eval ", szCode, false);
  } /* try catch */

  for (i = P_iStart; i <= P_iStop; i++) {
      Key  = aNdx[i];
      Tup0 = aTup0[Key];
      try {
          Tmp0 = pF(Tup0);
          Tup0[P_Key] = Tmp0;
      } catch (P_Err) {
          debugger;
          Tup0[P_Key] = "<span class='Cl_Error'> pFn - 1<span>";
          $VDebug.U_Dbg_Halt(C_iDebug_UsrRtn);
      } /* try catch */
  } /* for */
} /* U_Eval */

/*-----U_Init_FormInt --------------------------------------------------------
*
*/ 
function U_Init_FormInt()
{ 
  U_Root0("$FormInt", C_jCd_Cur);
} /* U_Init_FormInt */

  return(_FormInt);
})();  /* $FormInt */

/*-----F_iCdKnd_Mp_Val --------------------------------------------------------
*
*  Mark Cell with a sequential Category-Code.
*/
function F_iCdKnd_Mp_Val(P_Val)
{
  if (P_Val != G_Val0) {
     G_Val0 = P_Val;
     G_iCnt0++;
  } /* if */
  return(G_iCnt0);
} /* F_iCdKnd_Mp_Val */

/*-----F_Val_Replicate --------------------------------------------------------
*
*  If the value of the given cell is null or empty replicate the value of the previus cell (same column previous row).
*  Example: F_Val_Replicate($[10])
*/
function F_Val_Replicate(P_Val)
{
  var ValNew = P_Val;
  if (!P_Val) {
     ValNew = G_Val0;
  }
  else {
     G_Val0 = P_Val;
  } /* if */
  return(ValNew);
} /* F_Val_Replicate */

/*-----F_szVal_Attrib --------------------------------------------------------
*
* Scan the given string looking for the value of the given Attribute
*/ 
function F_szVal_Attrib(P_szSrc, P_szAttr, P_iLen)
{
  var szVal = "";
  var iStart = P_szSrc.indexOf(P_szAttr);
  if (iStart >= 0) {
     iOff = P_szAttr.length;
     szVal = P_szSrc.substr(iStart + iOff, P_iLen)
  } /* if */
  
  return(szVal);
} /* F_szVal_Attrib */

/*-----F_szYMD_Mp_szDMY --------------------------------------------------------
*
*/ 
function F_szYMD_Mp_szDMY(P_szDate)
{
  var szYMD = $TimeDate.F_szYMD_Mp_szDate(P_szDate, "DDMMYYYY");
  return(szYMD);
} /* F_szYMD_Mp_szDMY */

/*-----F_szYMD_Mp_szMDY --------------------------------------------------------
*
*/ 
function F_szYMD_Mp_szMDY(P_szDate)
{
  var szYMD = $TimeDate.F_szYMD_Mp_szDate(P_szDate, "MMDDYYYY");
  return(szYMD);
} /* F_szYMD_Mp_szMDY */

/*-----F_szYMD_Mp_szYMD --------------------------------------------------------
*
*/ 
function F_szYMD_Mp_szYMD(P_szDate)
{
  var szYMD = $TimeDate.F_szYMD_Mp_szDate(P_szDate, "YYYYMMDD");
  return(szYMD);
} /* F_szYMD_Mp_szYMD */


const REV   = (P_szAZ) => F_szReverse(P_szAZ);                                        /* Reverse a string ABCD ==> DCBA */
const SUB   = (P_sz0, P_iStart, P_iLen) => P_sz0.substr(P_iStart, P_iLen);            /* Get a substring */
const FIRST = (P_sz0, P_iNnCh) => P_sz0.substr(0, P_iNnCh);                           /* Return the firsts P_iNnCh chars */
const LAST  = (P_sz0, P_iNnCh) => P_sz0.slice(-P_iNnCh);                              /* Return the lasts  P_iNnCh chars */
const PAD   = (P_sz0, P_iLen, P_ch) => (""+P_sz0).padStart(P_iLen, P_ch);             /* Pad with char */
const IO    = (P_sz0, P_sz1) => P_sz0.indexOf(P_sz1);                                 /* Return the first occurrence of a substring */
const LIO   = (P_sz0, P_sz1) => P_sz0.lastIndexOf(P_sz1);                             /* Return the last occurrence of a substring */
const START = (P_sz0, P_sz1) => P_sz0.startsWith(P_sz1);                              /* Returns true if a P_sz0 starts with a specified P_sz1. */
const NACC  = (P_sz0, P_fLast) => $NatLang.F_szNormalize(P_sz0, P_fLast);             /* Normalize accents. */
const INT   = (P_i0) => Math.floor(P_i0);                                             /* Entier part of a number */
const ABS   = (P_i0) => (P_i0 < 0)? -P_i0: P_i0;                                      /* Absolute value */
const COLOR = (P_szClr, P_szText) => "<span style=' color:" + P_szClr + ";' >" + P_szText + "</span>";   /* Absolute value */
//const COLOR = (P_szClr, P_szText) => "---" + P_szText + "+++";   /* Absolute value */

// "0x9" + PAD(i.toString(16),7,0)


//F_iCdKnd_Mp_Val(FIRST($[5],30))

// $[8] | ($[9]<<12)|$[10]<<4|$[11]

// F_iCdKnd_Mp_Val($[7])

// (($[4] > 0) ? "AVERE ":"Dare ") + $[8] + " " + $[6].substr(0, 30)    // ++++++

// G_Val0 += $[4] + $[5]
// G_Val0 += $[6]

// SUB($[0], $[0].lastIndexOf("del ")+4)

// SUB($[8], 0, $[8].indexOf("."))

// ($[8].length == 8)?  SUB($[8],-4) + "-" + SUB($[8],-6, 2)+ "-" + SUB($[8],-8, 2): SUB($[8],-4) + "-" + SUB($[8],-6, 2)+ "-0" + SUB($[8],-7, 1)
