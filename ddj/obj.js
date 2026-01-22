/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : arr.js
* Function    : Object
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

/* ***** CL_XDB0_Obj *******************************************************
*
* new CL_XDB0_Obj
*/ 
class CL_XDB0_Obj extends CL_XDB0 {
  constructor(R_Bag_XDB0) {
    const C_jCd_Cur = C_jCd_aRcd;
    super(R_Bag_XDB0); /* new CL_XDB0() */
 
    this.F_Tup_New  = F_Tup_New;
    this.U_Sort     = U_Sort;

/* Polymorphic Section */

/*-----F_Tup_New --------------------------------------------------------
*
* Create a new Tuple.
*/ 
function F_Tup_New()
{
  return({});
} /* F_Tup_New */

/*-----U_Sort -------------------------------------------------------------
*
* Sort an array of Objects or an array of array
*/ 
function U_Sort(P_XDB0, P_jFld, P_fAsc)
{
} /* U_Sort */

} /* constructor */

/*-----F_aFld_Make --------------------------------------------------------
*
* Make Fields descriptor.
*/ 
static F_aFld_Make(P_Coll0)
{
  var aFld = [];
  var aObj; 
  var szType;
  var j = 0;
  
  aObj = P_Coll0;
  
  for (var szKey0 in aObj) {
      szType = $Type.F_szType(aObj[szKey0]);
      aFld[j] = {"szType":szType, "iLen":C_iLen_Fld_Dflt, "szNm":szKey0};
      j++;
  } /* for */
  return(aFld);
} /* F_aFld_Make */

} /* end CL_XDB0_Obj */

/* ***** CL_UsrView0_Obj *******************************************************
*
* new CL_UsrView0_Obj
*/ 
class CL_UsrView0_Obj extends CL_UsrView0 {
  constructor(P_XDB, P_aFld, P_Bag_UsrView) {
    const C_jCd_Cur = C_jCd_Obj;
    super(P_XDB, P_aFld, P_Bag_UsrView);  /* new CL_UsrView0() */
    
    this.U_Insert     = U_Insert;
    this.U_Update     = U_Update;
    this.U_Delete     = U_Delete;
    this.U_Set_Field  = U_Set_Field;      // function U_Set_Field(P_UsrView, P_Fld1, P_szCode);
    
    this.U_XShow_RC   = U_XShow_RC;
    this.U_XShow_CR   = U_XShow_CR;
    this.F_jaNdx_Sel  = F_jaNdx_Sel;
    this.F_KeyTup_Sel  = F_KeyTup_Sel;
    this.F_jaFld1_Sel = F_jaFld1_Sel;           // function F_jaFld1_Sel(P_UsrView, P_iRow, P_iCol);
    this.U_SaveChange = U_SaveChange;
    
    this.F_szHTML_OpenCard = F_szHTML_OpenCard; // function F_szHTML_OpenCard(P_UsrView, P_jOpt_Confirm, P_fReadOnly);
    this.U_ConfirmCard    = U_ConfirmCard;      // function U_ConfirmCard(P_XDB, P_jOpt_Confirm);
    this.F_aNdx_Make      = F_aNdx_Make;

    this.aNdx = null; // F_aNdx_Make(this, this.jaFld1_aNdx);  /* Create the initial index. */
    
/* Polymorphic Section */

/*-----U_Insert --------------------------------------------------------
*
* Insert a new Tuple in the table
*/ 
function U_Insert(P_UsrView, P_jPos, P_Tup)
{
  if (P_Tup == null) {
     P_Tup = C_Undefined;
  } /* if */
  
  var aNdx = P_UsrView.aNdx;
  var szKey = aNdx[P_jPos];
  P_UsrView.XDB0.Coll0[szKey] = P_Tup;
} /* U_Insert */

/*-----U_Update --------------------------------------------------------
*
* Update the current Tuple.
*/ 
function U_Update(P_UsrView, P_jPos, P_Tup)
{
  var aNdx = P_UsrView.aNdx;
  var szKey = aNdx[P_jPos];
  PP_UsrView.XDB0.Coll0[szKey] = P_Tup;
} /* U_Update */

/*-----U_Delete --------------------------------------------------------
*
* Delete the current Tuple. 
*/ 
function U_Delete(P_UsrView, P_jPos)
{
  var aNdx = P_UsrView.aNdx;
  var szKey = aNdx[P_jPos];
  delete P_UsrView.XDB0.Coll0[szKey];  
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
  var aObj0 = XDB0.Coll0;
  var aFld = P_UsrView.aFld1;
  var iCard_aNdx = aNdx.length;
  var iCard_aFld = aFld.length;
/*
* $NOTE: display Collections of Objects LIVE, $WARNING the number of elements (that is of Object's attributes) may change at runtime!
*/
//  var iLen = (iCard_aNdx <= iCard_aFld)? iCard_aNdx: iCard_aFld;
  var iLen = (iCard_aNdx >= iCard_aFld)? iCard_aNdx: iCard_aFld;
  var szRow;

  for (var j = 0; j < iLen; j++) {
      var szKey1 = (P_fAsc)? aNdx[j]: aNdx[iCard_aNdx -1 -j];
      var szValCur = aObj0[szKey1];
      var Fld0 = F_Fld_Mp_szNm(aFld, szKey1);
      if (Fld0 == null) {
          var szType = typeof(szValCur);
          Fld0 = {"szNm":szKey1, "szType":szType,"iLen":8,"szRem":""};
      } /* if */
      try {
          var szTmp1 = $Value.F_szHTML_TD_Table(szValCur, Fld0);
          var szRem = Fld0.szRem;    
          var szRow = '<td>' + $Value.F_szHTML_Caption(j) + `</td><td onclick="$Table.U_LM(this)"  title="${szRem}">` + $Value.F_szHTML_Caption(szKey1) + '</td><td  onclick="$Table.U_LM(this)">' + szTmp1 + '</td>';
      } catch (P_Err) {
          var szRow = '<td>' + $Value.F_szHTML_Caption(j) + '</td><td onclick="$Table.U_LM(this)">' + $Value.F_szHTML_Caption(szKey1) + '</td><td  onclick="$Table.U_LM(this)">' + "<b class='Cl_Error'>PROBLEM: this value cannot be represented!</b>" + '</td>';
      } /* try catch */
      P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false);
  } /* for */
} /* U_XShow_RC */

/*-----F_Fld_Mp_szNm --------------------------------------------------------
*
*/ 
function F_Fld_Mp_szNm(P_aFld, P_szNm)
{
  for (let i = 0; i < P_aFld.length; i++) {
      if (P_szNm == P_aFld[i].szNm) {
         return(P_aFld[i]);
      } /* if */
  } /* for */
  /* Field not found! */
  /* $ASSUME: the programmer/user forgot the insertion of field description in the Layout; return an empty deacriptor. */
  
  P_aFld = null;  
  return(P_aFld);
} /* F_Fld_Mp_szNm */

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
  var aFldV = G_aFld_Obj0;
  var aFldH = P_UsrView.aFld1;
  var iCard_aNdx = aNdx.length;
  var szRow = "";
  var aObj0 = XDB0.Coll0;
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
  
  var FldH =   {"szType":"string",  "iLen":8, "szNm":"sz0"};
 
  szRow  = "<td></td><td>Values</td>";      
  for (var i = 0; i < iCard_aNdx; i++) {
      var szKey = aNdx[i];
      var szValCur = aObj0[szKey];
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
  var Obj0 = XDB0.Tup_Sel;
  var aFld1 = P_UsrView.aFld1;
  var Fld1  = aFld1[P_UsrView.jaFld1]; 
  var szTypeDst = Fld1.szType;
  var TupVal = $Value.F_Val_Inp_Table(szTypeDst, Fld1, ValInput);
  XDB0.Tup_Sel = TupVal;
  XDB0.Coll0[P_UsrView.KeyTup] = TupVal;      
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
  var aNdx = P_UsrView.aNdx;
  var k = (P_UsrView.fAsc)? P_iRow -1: aNdx.length - P_iRow;
  var szKey = aNdx[k];
  return(szKey);
} /* F_KeyTup_Sel */

/*-----F_jaFld1_Sel --------------------------------------------------------
*
* Table Editing. Given P_iCol get the position of the corresponding Field in aFld1.
*/ 
function F_jaFld1_Sel(P_UsrView, P_iRow)
{
  var aNdx = P_UsrView.aNdx;
  var aFld1 = P_UsrView.aFld1;
  var k = (P_UsrView.fAsc)? P_iRow -1: aNdx.length - P_iRow;
  var szKey = aNdx[k];
  
  for (let i = 0; i < aFld1.length; i++) {
      if (szKey == aFld1[i].szNm) {
         return(i);
      } /* if */
  } /* for */
  return(0);
} /* F_jaFld1_Sel */

/*-----F_szHTML_OpenCard --------------------------------------------------------
*
* Open the current row (field) in a Card (dialogue box).
*/ 
function F_szHTML_OpenCard(P_UsrView, P_jOpt_Confirm, P_fReadOnly)
{
  var XDB0 = P_UsrView.XDB0;
  var aFld = P_UsrView.aFld1;
  var szKey  = P_UsrView.KeyTup;                       /* Index of the element in the unsorted array. */
  var Fld0   = aFld[P_UsrView.jaFld1];
  var szDisabled = (P_fReadOnly)? "disabled": "";
  var szItem = XDB0.Tup_Sel;
  var szRow  = "";
  
  switch (P_jOpt_Confirm) {
    case C_jOpt_Confirm_New: {
         szItem = "";
    } break;
    case C_jOpt_Confirm_Paste: {
         szItem = XDB0.Tup_Copy;
    } break;
    default : {
    } break;
  } /* switch */
    
  var szType = typeof(szItem);
  var szType_Out = $Type.F_szType_Out(szType);
  var szValCur = $Value.F_szHTML_TD_Card(szItem, aFld[0], P_fReadOnly);
  szRow += '<tr><td width="10%">' + szKey + '</td>' + '<td><input id="Id_Card_' + 0 + `" ${szDisabled} type="` + szType_Out + '" value="' + szValCur + '"></td></tr>';  
   
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

/*-----F_aNdx_Make --------------------------------------------------------
*
* Make Index.
*/ 
function F_aNdx_Make(P_UsrView, P_jFld, P_fCS)
{
  var XDB0 = P_UsrView.XDB0;
  var Obj0 = XDB0.Coll0;
  var aFld = P_UsrView.aFld1;
  var iCard_aFld  = aFld.length;
  var fCaseSens = $VConfig.F_ValSts_Get("fCaseSens");
  var aNdx  = [];
  var i = 0;
  
  var iCol_Sort = P_UsrView.iCol_Sort;

  function F_iLt_Cmp_Key_CS(P_0, P_1) {
    var Ope0 = P_0;
    var Ope1 = P_1;
    var iRes = 0;
    
    if (Ope0 < Ope1) {
       iRes =  -1;
    } /* if */
    if (Ope1 < Ope0) {
       iRes = 1;
    } /* if */
    return(iRes);
  } /* F_iLt_Cmp_Key_CS */

  function F_iLt_Cmp_Key_NCS(P_0, P_1) {
    var Ope0 = P_0;
    var Ope1 = P_1;
    var iRes = 0;
    Ope0 = Ope0.toLowerCase();
    Ope1 = Ope1.toLowerCase();
    
    if (Ope0 < Ope1) {
       iRes =  -1;
    } /* if */
    if (Ope1 < Ope0) {
       iRes = 1;
    } /* if */
    return(iRes);
  } /* F_iLt_Cmp_Key_NCS */
    
  /*-----F_szVal_Std --------------------------------------------------------
  *
  * Standardize Attribute's values for sorting.
  */ 
  function F_szVal_Std(P_Val)
  {
    var P_Val;
  
    switch (typeof(P_Val)) {
      case "string" : {
      } break;
      case "number" : {
           P_Val = "" + P_Val;
      } break;
      case "boolean" : {
           P_Val = (!P_Val)? "false": "true";
      } break;
      case "object": {
           P_Val = "~ [Object]";
      } break;
      case "function" : {
           szTmp = "" + P_Val;
           P_Val = szTmp.substr(0, szTmp.indexOf('('));
      } break;
      case "undefined" : {           
           P_Val = "~ undefined";
      } break;
      case "bigint" : {
           P_Val = "~ " + P_Val;
      } break;
      case "symbol" : {
           P_Val = "~ symbol";
      } break;
      default : {
           P_Val = "~ unknown";
      } break;
    } /* switch */
  return(P_Val);
  } /* F_szVal_Std */

  function F_iLt_Cmp(P_0, P_1) {
    var Ope0 = F_szVal_Std(Obj0[P_0]);
    var Ope1 = F_szVal_Std(Obj0[P_1]);
    var szTml;

    var iRes = 0;
    
    if (Ope0 < Ope1) {
       iRes =  -1;
    } /* if */
    if (Ope1 < Ope0) {
       iRes = 1;
    } /* if */
    return(iRes);
  } /* F_iLt_Cmp */
  
  /* Create preliminary Index */
  for (var szKey1 in Obj0) {
      aNdx[i++] = szKey1;
  } /* for */

  if (iCol_Sort < 0) {
     return(aNdx);
  } /* if */
  if (iCol_Sort == 0) {
     F_iLt_Cmp = (fCaseSens)? F_iLt_Cmp_Key_CS: F_iLt_Cmp_Key_NCS;
  } /* if */
  
  aNdx.sort(F_iLt_Cmp);
  return(aNdx);
} /* F_aNdx_Make */

/*-----U_Set_Field --------------------------------------------------------
*
*/ 
function U_Set_Field(P_UsrView, P_Fld1, P_szCode, P_iStart, P_iStop)
{
  $Error.U_Error(C_jCd_Cur, 1, "Data Set/Reset cannot be used with Objects.", "", false);
} /* U_Set_Field */

    } /* constructor */
} /* end CL_UsrView0_Obj */
