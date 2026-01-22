/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : rpc_exec.js
* Function    : Remote Procedure Call executer
* FirstEdit   : 01/09/2023
* LastEdit    : 22/12/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
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
*     Remote Procedure Call executer.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* 
*/
//"use strict";      /* $IMPORTANT: DISABLE strict mode. */

/*----- Local Constants ----------------------------------------------*/
/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

var G_iTmp0 = "rana";

/*--------------------------------------------------------------------*/

/*-----U_RPC_Exec --------------------------------------------------------
*
* $IPC-GATE
* Command interpreter for remote commands.
*
* $NOTE: U_RPC_Exec(); will be called directly by js_int.html using "window.opener.U_RPC_Exec(szCode);" 
*/ 
function U_RPC_Exec(P_szCmd)
{
  var Val0 = "";
  const e  = Math.E;
  const PI = Math.PI;
  const abs     = (x) => Math.abs(x);
  const acos    = (x) => Math.acos(x);
  const acosh   = (x) => Math.acosh(x);
  const asin    = (x) => Math.asin(x);
  const asinh   = (x) => Math.asinh(x);
  const atan    = (x) => Math.atan(x);
  const atan2   = (x) => Math.atan2(x);
  const atanh   = (x) => Math.atanh(x);
  const cbrt    = (x) => Math.cbrt(x);
  const ceil    = (x) => Math.ceil(x);
  const clz32   = (x) => Math.clz32(x);
  const cos     = (x) => Math.cos(x);
  const cosh    = (x) => Math.cosh(x);
  const exp     = (x) => Math.exp(x);
  const expm1   = (x) => Math.expm1(x);
  const floor   = (x) => Math.floor(x);
  const fround  = (x) => Math.fround(x);
  const hypot   = (x) => Math.hypot(x);
  const imul    = (x) => Math.imul(x);
  const log     = (x) => Math.log(x);
  const log10   = (x) => Math.log10(x);
  const log1p   = (x) => Math.log1p(x);
  const log2    = (x) => Math.log2(x);
  const pow     = (x, y) => Math.pow(x, y);
  const random  = (x) => Math.random(x);
  const irnd    = (xMin, xMax) => $Math_DDJ.F_iRND(xMin, xMax);
  const rnd     = (xMin, xMax) => $Math_DDJ.F_rRND(xMin, xMax);
  const round   = (x) => Math.round(x);
  const sign    = (x) => Math.sign(x);
  const sin     = (x) => Math.sin(x);
  const sinh    = (x) => Math.sinh(x);
  const sqrt    = (x) => Math.sqrt(x);
  const tan     = (x) => Math.tan(x);
  const tanh    = (x) => Math.tanh(x);
  const trunc   = (x) => Math.trunc(x);
  const fact    = (x) => $Math_DDJ.F_rFact(x);
  
  const GetUsrView = (P_szNm) => CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNm, true);
  const GetColl    = (P_szNm) => CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNm, true).XDB0.Coll0;

  const SelColl    = (P_szNm) => CL_UsrView0.F_UsrView_Select(P_szNm, (C_WwFlag_fDisplay)).XDB0.Coll0;
  const CollName   = () => CL_UsrView0.F_UsrView_Selected().szNmColl;  
  const UsrView    = () => CL_UsrView0.F_UsrView_Selected();   
  const XDB        = () => CL_UsrView0.F_UsrView_Selected().XDB0;  
  const Layout_UV  = () => CL_UsrView0.F_UsrView_Selected().aFld1;  
  const Layout     = () => CL_UsrView0.F_UsrView_Selected().XDB0.aFld0;  
  const Layout_XDB = () => CL_UsrView0.F_UsrView_Selected().XDB0.aFld0;   
  const Ndx        = () => CL_UsrView0.F_UsrView_Selected().aNdx;

   
  const CollCur    = () => CL_UsrView0.F_UsrView_Selected().XDB0.Coll0;       
  const Tuple      = () => CL_UsrView0.F_UsrView_Selected().XDB0.Tup_Sel;     
  const Cell       = () => CL_UsrView0.F_UsrView_Selected().Val_Sel;  
  
  const GetTuple   = (P_szNmColl, P_KeyTup) => F_Tup_Get(P_szNmColl, P_KeyTup);
  const Sort       = (P_jFld, P_fAsc) => U_Sort(P_jFld, P_fAsc);
  
  const Regress    = (P_x, P_y, P_fAlg) => F_arRegress(P_x, P_y, P_fAlg);
  
  const GoTo_Key   = (P_1) => U_GoTo_Key(P_1); 

  var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z;

  /* Initialize Aliases variables for the collections present in memory */

  const as_UsrView_K = CL_as_UsrView_K.S_as_UsrView_K;
  for (var szKey in as_UsrView_K) {
      if (szKey != "?") {
         var Val1 = as_UsrView_K[szKey].XDB0.Coll0;
         var szCode_K = `${szKey} = Val1;` ;
         eval(szCode_K);
      } /* if */
  } /* for */
  
  var Val0 = "";       /* $IMPORTANT: Initialize default */
  try {
      eval(P_szCmd);
  } catch (P_Err) {
      return("\nError: " + P_Err + "\n");
  } /* try catch */
   
  return(Val0);
} /* U_RPC_Exec */

/*-----U_GoTo_Key --------------------------------------------------------
*
*/ 
function U_GoTo_Key(P_szKey)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected(); 
  var XDB0 = UsrView0.XDB0;
  var Coll0 = XDB0.Coll0;
  var aNdx  = UsrView0.aNdx;
  var iCard_aNdx = aNdx.length;
  var Rcd0;
  var szKey = decodeURLComponent(P_szKey);
  var fAsc  = UsrView0.fAsc;
  var i, j;
  
  var kkk = window.pippo;

  for (i = 0; i < iCard_aNdx; i++) {
      j = aNdx[i];
      Rcd0 = Coll0[j];
      if (Rcd0[0] == szKey) {
//         debugger;
         j = (fAsc)? j: iCard_aNdx - j;         
         $Table.U_GoTo(j);
         return;
      } /* if */
  } /* for */
  debugger; /* NOT Found */
  
  for (i = 0; i < iCard_aNdx; i++) {
      j = aNdx[i];
      Rcd0 = Coll0[j];
      if (Rcd0[0] == szKey) {
         debugger;
         j = j+1;
      } /* if */
  } /* for */
  debugger;
} /* U_GoTo_Key */

/*-----F_arRegress --------------------------------------------------------
*
*/ 
function F_arRegress(P_x, P_y, P_fAlg)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected(); 
  var XDB0 = UsrView0.XDB0;
  var Coll0 = XDB0.Coll0;
  var aNdx  = UsrView0.aNdx;
  var iCard_aNdx = aNdx.length;
  var aX = [];
  var aY = [];
  var i, j;
 
  for (i = 0; i < iCard_aNdx; i++) {
      j = aNdx[i];
      aX[i] = Coll0[j][P_x];
      aY[i] = Coll0[j][P_y];
  } /* for */

  var arRes = $Stat_DDJ.F_arRegression(aX, aY, P_fAlg);
  return(arRes);
} /* F_arRegress */

/*-----U_Sort --------------------------------------------------------
*
*/ 
function U_Sort(P_jFld, P_fAsc)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  var XDB0 = UsrView0.XDB0;
  var Coll0 = XDB0.Coll0;
  
  XDB0.U_Sort(XDB0, P_jFld, P_fAsc);
  
  return(Coll0);
} /* U_Sort */

/*-----F_Arr_Range --------------------------------------------------------
*
* Create and empty array for the given range. 
*/ 
function F_Arr_Range(P_szType, P_Min, P_Max, P_Step, P_iCard_Rcd0)
{
  var ValMin  = P_Min;
  var ValMax  = P_Max;
  var ValStep = P_Step;
  var szDate;
  var Arr = [];
  var j, k;
  switch (P_szType) {
    case "number": {       // Val0 = F_Arr_Range("number", 0, 12, 0.5);
         j = 0;
         for (k = ValMin; k <= ValMax; k += ValStep) {
             Arr[j++] = k;
         } /* for */
    } break;
    case "date": {         // Val0 = F_Arr_Range("date", "2020-01-15", "2020-03-15", 1 * C_ims_Day);
         ValMin = $TimeDate.F_ims_Sec70_Mp_szDate(P_Min);
         ValMax = $TimeDate.F_ims_Sec70_Mp_szDate(P_Max);
         j = 0;
         for (k = ValMin; k <= ValMax; k += ValStep) {
             szDate = $TimeDate.F_szDate_Mp_ims_Sec70(k);
             Arr[j++] = szDate.substr(0,10);
         } /* for */
    } break;
    case "datetime": {         // Val0 = F_Arr_Range("datetime", "2020-01-15T18:00", "2020-01-17T18:00", 1 * C_ims_Hour);
         ValMin = $TimeDate.F_ims_Sec70_Mp_szDate(P_Min);
         ValMax = $TimeDate.F_ims_Sec70_Mp_szDate(P_Max);
         j = 0;
         for (k = ValMin; k <= ValMax; k += ValStep) {
             szDate = $TimeDate.F_szDate_Mp_ims_Sec70(k);
             Arr[j++] = szDate;
         } /* for */
    } break;
    default : {
    } break;
  } /* switch */
  return(Arr);
} /* F_Arr_Range */

/*-----F_aRcd_ProdCart --------------------------------------------------------
*
* Create a table corresponding to the Cartesian product of the given arrays.
*/ 
function F_aRcd_ProdCart(P_Arr1, P_Arr2, P_ValOper)
{
  var aRcd = [];
  var i, j;
  for (i = 0; i < P_Arr1.length; i++) {
      var Rcd0 = [];
      for (j = 0; j < P_Arr2.length; j++) {
          Rcd0[j] = P_Arr1[i] + P_ValOper + P_Arr2[j];
      } /* for */
      aRcd[i] = Rcd0;
  } /* for */
  return(aRcd);
} /* F_aRcd_ProdCart */

/*----- GenColl --------------------------------------------------------
*
* Given the collection P_Coll create the corresponding descriptors and show the result.
*/ 
function GenColl(P_szNmColl="JS_Int", P_Coll, P_fShow=false)
{  
  new CL_XDB([P_szNmColl, C_JKndTup_Null, P_Coll, null, "AutoDetect",  "", C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]);
  if (P_fShow) {
     $Table.U_Display_Table();
  } /* if */
} /* GenColl */

/*-----U_Replicate --------------------------------------------------------
*
*  Replicate Tag set in fDistinct mode.
*/ 
function U_Replicate()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  var XDB0 = UsrView0.XDB0;
  var Coll0 = XDB0.Coll0;
  var aNdx  = UsrView0.aNdx;
  var iCard_aNdx = aNdx.length;
  var i, j, k;
  var szPrv = "";
  
  for (i = 0; i < iCard_aNdx; i++) {
      k = aNdx[i];
      if (Coll0[k][7] != "") {
         szPrv = Coll0[k][7];
      } /* if */      
      Coll0[k][8] = szPrv;
  } /* for */
  $Table.U_Display_Table();
} /* U_Replicate */

/*-----F_Tup_Get --------------------------------------------------------
*
* Get the Tuple specified.
*/ 
function F_Tup_Get(P_szNmColl="", P_KeyTup="")
{
  var UsrView0, Coll0, Tup0, aNdx, Key;
  
  if (P_szNmColl == "") {
     UsrView0 = CL_UsrView0.F_UsrView_Selected();
  }
  else {
     UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNmColl, true);
  } /* if */
  
  if (P_KeyTup=="") {      
     Tup0  = UsrView0.XDB0.Tup_Sel;
  }
  else {
     Coll0 = UsrView0.XDB0.Coll0;
     if (typeof(P_KeyTup) == "number") {
        aNdx  = UsrView0.aNdx;
        Key   = aNdx[P_KeyTup];
        Tup0  = Coll0[Key];
     }
     else {
        Tup0  = Coll0[P_KeyTup];
     } /* if */
  } /* if */
      
  return(Tup0);
} /* F_Tup_Get */

/*-----EdtTup --------------------------------------------------------
*
* Open the selected Tuple in a Card.
*/ 
function EdtTup()
{
  $DDJ.U_EdtTup_DDJ();
} /* EdtTup */

/*-----EdtVal --------------------------------------------------------
*
* Open the selected Value in a Card.
*/ 
function EdtVal()
{
  $DDJ.U_EdtVal_DDJ();
} /* EdtVal */