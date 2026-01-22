/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : arr.js
* Function    : Array
* FirstEdit   : 03/11/2021
* LastEdit    : 13/10/2025
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
/*----- Global Variables ---------------------------------------------*/

/* ***** CL_XDB0_Arr *******************************************************
* 
* new CL_XDB0_Arr
*/ 
class CL_XDB0_Arr extends CL_XDB0 {
  constructor(R_Bag_XDB0) {
    const C_jCd_Cur = C_jCd_aRcd;

    super(R_Bag_XDB0); /* new CL_XDB0() */
 
    this.F_Tup_New    = F_Tup_New;
    this.U_Sort       = U_Sort;

/* Polymorphic Section */

/*-----F_Tup_New --------------------------------------------------------
*
* Create a new Tuple.
*/ 
function F_Tup_New()
{
  return([]);
} /* F_Tup_New */

/*-----U_Sort -------------------------------------------------------------
*
* Sort an array of Objects or an array of array
*/ 
function U_Sort(P_XDB0, P_jFld, P_fAsc)
{
  function F_iLt_Cmp(P_0, P_1) {
    var iRes = 0;
    
    if (P_0 < P_1) {
       iRes = -1;
    } /* if */
    if (P_1 < P_0) {
       iRes =  1;
    } /* if */
    return(iRes);
  } /* F_iLt_Cmp */
  
  function F_iGt_Cmp(P_0, P_1) {
    var iRes = 0;
    
    if (P_0 < P_1) {
       iRes =  1;
    } /* if */
    if (P_1 < P_0) {
       iRes = -1;
    } /* if */
    return(iRes);
  } /* F_iGt_Cmp */
  
  var Arr0 = P_XDB0.Coll0;

  if (P_fAsc) {
     Arr0.sort(F_iLt_Cmp);  
  }
  else {
     Arr0.sort(F_iGt_Cmp);
  } /* if */
} /* U_Sort */

} /* constructor */

/*-----F_aFld_Make --------------------------------------------------------
*
* Make Fields descriptor.
* CL_XDB0_Arr.F_aFld_Make();
*/ 
static F_aFld_Make(P_Coll0)
{
  var aFld = [];
  var szType_Elem = $Type.F_szType(P_Coll0[0]);
  aFld[0] = {"szType":szType_Elem, "iLen":C_iLen_Fld_Dflt, "szNm":'Val'};  
  return(aFld);
} /* F_aFld_Make */

} /* end CL_XDB0_Arr */


/* ***** CL_UsrView0_Arr *******************************************************
*
* new CL_UsrView0_Arr
*/ 
class CL_UsrView0_Arr extends CL_UsrView0 {
  constructor(P_XDB, P_aFld, P_Bag_UsrView) {
    const C_jCd_Cur = C_jCd_Arr;

    super(P_XDB, P_aFld, P_Bag_UsrView);  /* new CL_UsrView0() */
    
    this.F_TupNull    = F_TupNull;
    this.U_Insert     = U_Insert;
    this.U_Update     = U_Update;
    this.U_Delete     = U_Delete;
    this.U_Set_Field  = U_Set_Field;      // function U_Set_Field(P_UsrView, P_Fld1, P_szCode);

    this.U_XShow_RC   = U_XShow_RC;
    this.U_XShow_CR   = U_XShow_CR;
    this.F_jaNdx_Sel  = F_jaNdx_Sel;
    this.F_KeyTup_Sel  = F_KeyTup_Sel;
    this.F_jaFld1_Sel = F_jaFld1_Sel;
    this.U_SaveChange = U_SaveChange;
    
    this.F_szHTML_OpenCard = F_szHTML_OpenCard;  // function F_szHTML_OpenCard(P_UsrView, P_jOpt_Confirm, P_fReadOnly);
    this.U_ConfirmCard    = U_ConfirmCard;       // function U_ConfirmCard(P_XDB, P_jOpt_Confirm);
    this.F_aNdx_Make      = F_aNdx_Make;
    this.F_Arr_Mp_Field   = F_Arr_Mp_Field;      // function F_Arr_Mp_Field(P_UsrView, P_jFld);
    
    this.aNdx = null; // F_aNdx_Make(this, this.jaFld1_aNdx);  /* Create the initial index. */
    
/* Polymorphic Section */

/*-----F_TupNull --------------------------------------------------------
*
*/ 
function F_TupNull(P_UsrView)
{
   return(C_Undefined)
} /* F_TupNull */

/*-----U_Insert --------------------------------------------------------
*
* Insert a new Tuple in the table
*/ 
function U_Insert(P_UsrView, P_jPos, P_Tup)
{
  if (P_Tup == null) {
     P_Tup = F_TupNull(P_UsrView);
  } /* if */
  var aNdx = P_UsrView.aNdx;
  var k = aNdx[P_jPos];
  P_UsrView.XDB0.Coll0.splice(k, 0, P_Tup);
} /* U_Insert */

/*-----U_Update --------------------------------------------------------
*
* Update the current Tuple.
*/ 
function U_Update(P_UsrView, P_jPos, P_Tup)
{
  var aNdx = P_UsrView.aNdx;
  var k = aNdx[P_jPos];
  P_UsrView.XDB0.Coll0.splice(k, 1, P_Tup);
} /* U_Update */

/*-----U_Delete --------------------------------------------------------
*
* Delete the current Tuple. 
*/ 
function U_Delete(P_UsrView, P_jPos)
{
  var aNdx = P_UsrView.aNdx;
  var k = aNdx[P_jPos];
  delete P_UsrView.XDB0.Coll0.splice(k, 1);  
  aNdx.splice(P_jPos, 1);
} /* U_Delete */

/*-----U_XShow_RC --------------------------------------------------------
*
*
*/ 
function U_XShow_RC(P_UsrView, P_fAsc)
{
  var XDB0  = P_UsrView.XDB0;
  var aNdx  = P_UsrView.F_aNdx();
  var Arr0 = XDB0.Coll0;
  var FldH = P_UsrView.aFld1[0];
  var iCard_aNdx = aNdx.length;
  var jStep = $VConfig.F_i_ValSts_Get("iSmpl_Step");
  var szRow;

  for (var j = 0; j < iCard_aNdx; j += jStep) {
      var szId_TR = "Id_tr_" + j;
      var k = (P_fAsc)? aNdx[j]: aNdx[iCard_aNdx -1 -j]; 
      var szValCur = Arr0[k];
      szRow = "<td>" + $Value.F_szHTML_Caption(j) + "</td>" + '</td><td  onclick="$Table.U_LM(this)">' + $Value.F_szHTML_TD_Table(szValCur, FldH) + "</td>";
      P_UsrView.U_Prn_Elem("<tr id='" + szId_TR +"'>" + szRow + "</tr>", false); 
  } /* for */
} /* U_XShow_RC */

/*-----U_XShow_CR --------------------------------------------------------
*
*
*/ 
function U_XShow_CR(P_UsrView, P_fAsc)
{
  var szId_Tbl_H = P_UsrView.szId_Tbl_H;   /* <thead> */
  var szId_Tbl_B = P_UsrView.szId_Tbl_B;   /* <tbody> */
  var XDB0  = P_UsrView.XDB0;
  var aNdx  = P_UsrView.aNdx;
  var FldH = P_UsrView.aFld1[0];
  var iCard_aNdx = aNdx.length;
  var szRow = "";  
  var Arr0 = XDB0.Coll0;
/*
* $NOTE:
* "<th>#</th>" has been introduced to make Obj representation similar to aRcd etc. representation in transpose mode,
* just to avoid a management exception!
* So Obj is similar to 
*/  
  szRow  = "<th>#</th><th>Fields</th>";
  for (var j = 0; j < iCard_aNdx; j++) {
      szRow += '<th>' + $Value.F_szHTML_Caption(aNdx[j]) + '</th>';
  } /* for */
  P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false);   
  P_UsrView.U_Upd_Elem(szId_Tbl_H, true);
  P_UsrView.U_Prn_Elem("", true);
  
  szRow  = "<td></td><td>Values</td>";     
  for (var i = 0; i < iCard_aNdx; i++) {
      var szValCur = Arr0[aNdx[i]];
      szRow += '<td onclick="$Table.U_LM_T(this)">' + $Value.F_szHTML_TD_Table(szValCur, FldH) + '</td>';
  } /* for */
  P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false);  
} /* U_XShow_CR */
 
/*-----U_SaveChange --------------------------------------------------------
*
* Save changes updating the row (record).
*/ 
function U_SaveChange(P_UsrView, P_ElemPrv, P_fHTML= false)
{
  var ValInput = (P_fHTML)? P_ElemPrv.innerHTML: P_ElemPrv.innerText;
  var XDB0 = P_UsrView.XDB0;
  var Rcd0 = XDB0.Coll0;
  var aFld1 = P_UsrView.aFld1;
  var Fld1  = aFld1[P_UsrView.jaFld1];
  var szNmFld = aFld1[0].szNm;  
  var szTypeDst = Fld1.szType;
  var TupVal = $Value.F_Val_Inp_Table(szTypeDst, Fld1, ValInput);
  Rcd0[P_UsrView.KeyTup] = TupVal;  
} /* U_SaveChange */

/*-----F_jaNdx_Sel --------------------------------------------------------
*
* Table Editing. Given P_iRow get the position of the corresponding Tuple in aNdx.
*/ 
function F_jaNdx_Sel(P_UsrView, P_iRow)
{
  var aNdx = P_UsrView.F_aNdx();
  var k = (P_UsrView.fAsc)? P_iRow -1: aNdx.length - P_iRow;
  return(k);
} /* F_jaNdx_Sel */

/*-----F_KeyTup_Sel --------------------------------------------------------
*
* Table Editing. Given P_iRow get the position of the corresponding Tuple in the Collection (overriding the order imposed using aNdx).
*/ 
function F_KeyTup_Sel(P_UsrView, P_iRow)
{
  var aNdx = P_UsrView.F_aNdx();
  var k = (P_UsrView.fAsc)? P_iRow -1: aNdx.length - P_iRow;
  var iRow = aNdx[k];
  return(iRow);
} /* F_KeyTup_Sel */

/*-----F_szHTML_OpenCard --------------------------------------------------------
*
* Open the current row in a Card (dialogue box).
*/ 
function F_szHTML_OpenCard(P_UsrView, P_jOpt_Confirm, P_fReadOnly)
{
  var XDB0 = P_UsrView.XDB0;
  var aFld = P_UsrView.aFld1;
  var szValCur = XDB0.Tup_Sel;  
  var KeyTup = P_UsrView.KeyTup;
  var szDisabled = (P_fReadOnly)? "disabled": "";
  var szRow = "";
  var szNm = P_UsrView.szNmColl;
  
  switch (P_jOpt_Confirm) {
    case C_jOpt_Confirm_New: {
         szValCur = "";
    } break;
    case C_jOpt_Confirm_Paste: {
         szValCur = F_Obj_Clone(XDB0.Tup_Copy);
    } break;
    case C_jOpt_Confirm_Copy: {
         XDB0.Tup_Copy = F_Obj_Clone(XDB0.Tup_Sel);        
    } break;
    default : {
    } break;
  } /* switch */  
  
  var szType = aFld[0].szType;
  var szType_Out = $Type.F_szType_Out(szType);
  szNm = szNm + "[" + KeyTup + "] = ";
  szRow += '<tr><td width="10%">' + szNm + '</td>' + '<td><input id="Id_Card_' + 0 + `" ${szDisabled} type="` + szType_Out + '" value="' + $Value.F_szHTML_TD_Card(szValCur, aFld[0], P_fReadOnly) + '"></td></tr>';         
  
  return(szRow);
} /* F_szHTML_OpenCard */

/*-----U_ConfirmCard --------------------------------------------------------
*
*/ 
function U_ConfirmCard(P_UsrView, P_jOpt_Confirm)
{
  var XDB0 = P_UsrView.XDB0;
  var aFld1 = P_UsrView.aFld1;
  var Fld1 = aFld1[P_UsrView.jaFld1];
  var Val0 = XDB0.Tup_Sel;
  var ElemPrv = P_UsrView.ElemPrv;
  var ValInput   = Id_Card_0.value;
  var szTypeDst = typeof(Val0);
  var TupVal = $Value.F_Val_Inp_Table(szTypeDst, Fld1, ValInput, P_jOpt_Confirm);

  switch (P_jOpt_Confirm) {
    case C_jOpt_Confirm_New: {
         XDB0.Coll0[XDB0.Coll0.length] = TupVal;
    } break;
    case C_jOpt_Confirm_Edit: {
         XDB0.Coll0[P_UsrView.KeyTup] = TupVal;
         ElemPrv.innerHTML = ValInput;
    } break;
    case C_jOpt_Confirm_Copy: {
         XDB0.Tup_Copy = TupVal;
    } break;
    case C_jOpt_Confirm_Flt: {
         XDB0.Tup_Filter = TupVal;
    } break;
    default : {
    } break;
  } /* switch */
} /* U_ConfirmCard */

/*-----F_jaFld1_Sel --------------------------------------------------------
*
* Table Editing. Given P_iCol get the position of the corresponding Field in aFld1.
* In Arr case is always zero (0).
*/
function F_jaFld1_Sel(P_UsrView, P_iCol)
{
  return(0);
} /* F_jaFld1_Sel */

/*-----F_aNdx_Make --------------------------------------------------------
*
* Make Index. aObj
*/ 
function F_aNdx_Make(P_UsrView, P_jFld, P_fCS)
{
  var XDB0 = P_UsrView.XDB0;
  var aRcd0 = XDB0.Coll0;
  var aFld  = P_UsrView.aFld1;
  var iCard_aRcd0 = aRcd0.length;
  var aNdx  = [];
  var i;
  
  /* Create preliminary Index */
  for (i = 0; i < iCard_aRcd0; i++) {
      aNdx[i] = i;
  } /* for */
  
  if ((P_jFld != 0)) {
     return(aNdx);
  } /* if */

  var F_iLt_Cmp = $Sort.F_F_iLt_Cmp_Mp_Type(P_UsrView, P_jFld, P_fCS);  
  aNdx.sort(F_iLt_Cmp);

  return(aNdx);
} /* F_aNdx_Make */

/*-----F_Arr_Mp_Field --------------------------------------------------------
*
* Extract the elements of the given row returning them as an Array.
*/ 
function F_Arr_Mp_Field(P_UsrView, P_jFld)
{
  var XDB0 = P_UsrView.XDB0;
  var Arr0 = XDB0.Coll0;

  return(Arr0);
} /* F_Arr_Mp_Field */

/*-----U_Set_Field --------------------------------------------------------
*
*/ 
function U_Set_Field(P_UsrView, P_Fld1, P_szCode, P_iStart, P_iStop)
{
  var A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z;
  var XDB0 = P_UsrView.XDB0;
  var Arr0 = XDB0.Coll0;
  var aNdx = P_UsrView.F_aNdx();
  var Tup0;
  var pF;
  var Key;
  var i;

  /* Initialize Aliases variables for the collections present in memory */

  const as_UsrView_K = CL_as_UsrView_K.S_as_UsrView_K;
  for (var szKey in as_UsrView_K) {
      if (szKey != "?") {
         var Val0 = as_UsrView_K[szKey].XDB0.Coll0;
         var szCode_K = `${szKey} = Val0;` ;
         eval(szCode_K);
      } /* if */
  } /* for */

  var szCode = `pF = ($) => (${P_szCode})`;  
  try {
      eval(szCode);   /* Set pF */
  } catch (P_Err) {
      $Error.U_Error(C_jCd_Cur, 1, "eval ", szCode, false);
  } /* try catch */

  for (i = P_iStart; i <= P_iStop; i++) {
      Key = aNdx[i];
      try {
          Arr0[Key] = pF(Arr0[Key]);      
      } catch (P_Err) {
          Arr0[Key] = "<span class='Cl_Error'>ERROR pFn - 3<span>";         
          $VDebug.U_Dbg_Halt(C_iDebug_UsrRtn);
      } /* try catch */
  } /* for */
} /* U_Set_Field */

    } /* constructor */
} /* end CL_UsrView0_Arr */

