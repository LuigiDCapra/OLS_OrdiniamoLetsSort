/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : asrcd.js
* Function    : Array of Records
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

const C_iDelta_asRcd = 1;                          /* It is necessary to decrement Fields' position because the value of first field is stored as the Key */

/*----- Global Variables ---------------------------------------------*/

/* ***** CL_XDB0_asRcd *******************************************************
* 
* new CL_XDB0_asRcd
*/ 
class CL_XDB0_asRcd extends CL_XDB0 {
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
  return({});
} /* F_Tup_New */

/*-----U_Sort -------------------------------------------------------------
*
* Sort an array of Objects or an array of array
*/ 
function U_Sort(P_XDB0, P_jFld, P_fAsc)
{
// $NotImplementedYet
} /* U_Sort */

} /* constructor */

/*-----F_aFld_Make --------------------------------------------------------
*
* Make Fields descriptor.
* Parameter P_fszFldNm_1 is used to manage special case in which the first line of the Collection contains fields names
*/ 
static F_aFld_Make(P_Coll0, P_fszFldNm_1)
{
  var aFld = [];
  var asRcd; 
  var iLen_asRcd;
  var iLen_Fld = C_iLen_Fld_Dflt;
  var szType;
  var szKey;
  var Val0;
  var j;
   
  aFld[0] = {"szType":"string", "iLen":8, "szNm":"szKey"};

  if (P_fszFldNm_1) {
     /* The first line contains fields names. */
     /* The second line will be scanned to detect data types. */

     let aRcdTmp = [];
     let i = 0;
     for (var szKey0 in P_Coll0) {        /* Convert the collection in an array of records. */
         aRcdTmp[i++] = P_Coll0[szKey0];
         if (i > 1) {
            break;
         } /* if */
     } /* for */
      
     iLen_asRcd = aRcdTmp[0].length;
     for (var j = 0; j < iLen_asRcd; j++) {
         var szKey = aRcdTmp[0][j];;
         Val0 = aRcdTmp[1][j];
         szType = $Type.F_szType(Val0);
         aFld[j +1] = {"szType":szType, "iLen":iLen_Fld, "szNm":szKey};
     } /* for */
  }
  else {
     /* The first line will be scanned to detect data types. */
     for (var szKey0 in P_Coll0) {
         asRcd = P_Coll0[szKey0]; 
         iLen_asRcd = asRcd.length;
         for (var j = 0; j < iLen_asRcd; j++) {
             var szKey = "Col_" + j;
             Val0 = asRcd[j];
             szType = $Type.F_szType(Val0);
             aFld[j +1] = {"szType":szType, "iLen":iLen_Fld, "szNm":szKey};
         } /* for */
         break;
     } /* for */
  } /* if */  

  return(aFld);
} /* F_aFld_Make */

} /* end CL_XDB0_asRcd */

/* ***** CL_UsrView0_asRcd *******************************************************
*
* new CL_UsrView0_asRcd
*/ 
class CL_UsrView0_asRcd extends CL_UsrView0 {
  constructor(P_XDB, P_aFld, P_Bag_UsrView) {
    const C_jCd_Cur = C_jCd_asRcd;

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
    this.F_aNdx_Make      = F_aNdx_Make;         // function F_aNdx_Make(P_UsrView, P_jFld1, P_fCS=true, P_fInit=true);
    this.F_asKey_Make     = F_asKey_Make;        // function F_asKey_Make(P_UsrView, P_jFld);
    this.F_Arr_Mp_Field   = F_Arr_Mp_Field;      // function F_Arr_Mp_Field(P_UsrView, P_jFld);
    
    this.aNdx = null;                            /* null = Create the initial index. */
    
/* Polymorphic Section */

/*-----F_TupNull --------------------------------------------------------
*
*/ 
function F_TupNull(P_UsrView)
{
  /* Operation NOT allowed! */ 
  return(null)
} /* F_TupNull */

/*-----U_Insert --------------------------------------------------------
*
* Insert a new Tuple in the table
*/ 
function U_Insert(P_UsrView, P_szKey, P_TupVal)
{
  P_UsrView.XDB0.Coll0[P_szKey] = P_TupVal;
  // update aNdx
} /* U_Insert */

/*-----U_Update --------------------------------------------------------
*
* Update the current Tuple.
*/ 
function U_Update(P_UsrView, P_szKey, P_TupVal)
{
  P_UsrView.XDB0.Coll0[P_szKey] = P_TupVal;
  // update aNdx
} /* U_Update */

/*-----U_Delete --------------------------------------------------------
*
* Delete the current Tuple. 
*/ 
function U_Delete(P_UsrView, P_jPos)
{
  var aNdx = P_UsrView.aNdx;
  delete  P_UsrView.XDB0.Coll0[P_UsrView.KeyTup];
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
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var asRcd0 = XDB0.Coll0;
  var iCard_aNdx  = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var jStep = $VConfig.F_i_ValSts_Get("iSmpl_Step");
  var szRow;

  for (var j = 0; j < iCard_aNdx; j += jStep) {
      var szKey1 = (P_fAsc)? aNdx[j]: aNdx[iCard_aNdx -1 -j];
          var Rcd0 = asRcd0[szKey1];
          szRow = '<td>' + $Value.F_szHTML_Caption(j) + '</td>' + '<td  onclick="$Table.U_LM(this)">' + $Value.F_szHTML_Caption(szKey1) + '</td>';
          for (var i = C_iDelta_asRcd; i < iCard_aiPos; i++) {
              let i0 = aiPos[i];
              let Fld1 = aFld1[i0]; 
              var szValCur = Rcd0[i0 -C_iDelta_asRcd];
              szRow += '<td  onclick="$Table.U_LM(this)">' + $Value.F_szHTML_TD_Table(szValCur, Fld1) + '</td>';
          } /* for */
          P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false); 
   } /* for */
  P_UsrView.iCnt_Filter = $Filter.F_iCnt_Filter();
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
  var aNdx  = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;   
  var aiPos = P_UsrView.aiPos;
  var iCard_aNdx = aNdx.length; 
  var iCard_aFld = aFld1.length; 
  var iCard_aiPos = aiPos.length;
  var szRow = "";
  var asRcd0 = XDB0.Coll0;

  szRow  = "<th  onclick='$Table.U_LH_T(this)'>#</th><th>Field</th>";
  for (var i = 0; i < iCard_aNdx; i++) {
      var k = (P_fAsc)? i: iCard_aNdx - i -1; 
      szRow += '<th>' + $Value.F_szHTML_Caption(k) + '</th>';
  } /* for */
  P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false);

  szRow  = "<th  onclick='$Table.U_LH_T(this)'></th><th>szKey</th>";
  for (var i = 0; i < iCard_aNdx; i++) {
      var k = (P_fAsc)? i: iCard_aNdx - i -1;
      szRow += '<th>' + $Value.F_szHTML_Caption(aNdx[k]) + '</th>';
  } /* for */
  P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false);   
  P_UsrView.U_Upd_Elem(szId_Tbl_H, true);
  P_UsrView.U_Prn_Elem("", true);

  szRow = "";
  for (var j = 1; j < iCard_aiPos; j++) {
      let j0 = aiPos[j];
      szRow  = '<td onclick="$Table.U_LH_T(this)">' + $Value.F_szHTML_Caption(j) + "</td>";
      szRow += "<td>" + $Value.F_szHTML_Caption(aFld1[j0].szNm) + "</td>";
      for (var i = 0; i < iCard_aNdx; i++) {
          var k = (P_fAsc)? i: iCard_aNdx - i -1;
          var Rec0  = asRcd0[aNdx[k]];
          var szValCur = Rec0[j0 -C_iDelta_asRcd];
          szRow += '<td onclick="$Table.U_LM_T(this)">' + $Value.F_szHTML_TD_Table(szValCur, aFld1[j0]) + '</td>';
      } /* for */
      P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false); 
  } /* for */
} /* U_XShow_CR */

/*-----U_SaveChange --------------------------------------------------------
*
* Save changes updating the row (record).
*/ 
function U_SaveChange(P_UsrView, P_ElemPrv, P_fHTML= false)
{
  var ValInput = (P_fHTML)? P_ElemPrv.innerHTML: P_ElemPrv.innerText;
  var XDB0  = P_UsrView.XDB0;
  var szKey = P_UsrView.KeyTup;
  var asRcd = XDB0.Coll0[szKey];
  var aFld1 = P_UsrView.aFld1;
  var Fld1  = aFld1[P_UsrView.jaFld1];
  var iPos0 = Fld1.iPos0;
  var szTypeDst = Fld1.szType;
  var TupVal = $Value.F_Val_Inp_Table(szTypeDst, Fld1, ValInput);
  asRcd[iPos0 -C_iDelta_asRcd] = TupVal;      
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
  var szKey = aNdx[k];
  return(szKey);
} /* F_KeyTup_Sel */

/*-----F_szHTML_OpenCard --------------------------------------------------------
*
* Open the current row in a Card (dialogue box).
*/ 
function F_szHTML_OpenCard(P_UsrView, P_jOpt_Confirm, P_fReadOnly)
{
  var XDB0 = P_UsrView.XDB0; 
  var aFld1 = P_UsrView.aFld1; 
  var iCard_aFld = aFld1.length;
  var aiPos = P_UsrView.aiPos;
  var iCard_aiPos = aiPos.length;
  var Rcd0 = XDB0.Tup_Sel;
  var Rcd1 = [];
  var szRow = "";

  if (P_jOpt_Confirm != C_jOpt_Confirm_Edit) {
      switch (P_jOpt_Confirm) {
        case C_jOpt_Confirm_New: {
             for (var j = 0; j < iCard_aFld; j++) {
                 Rcd1[j] = "";
             } /* for */
        } break;
        case C_jOpt_Confirm_Paste: {
             Rcd1 = F_Obj_Clone(XDB0.Tup_Copy);
        } break;
        case C_jOpt_Confirm_Copy: {
             XDB0.Tup_Copy = F_Obj_Clone(Rcd0);        
        } break;
        case C_jOpt_Confirm_Flt: {
             if (XDB0.Tup_Filter) {
                Rcd1 = F_Obj_Clone(XDB0.Tup_Filter);
             }
             else {
                for (var j = 0; j < iCard_aFld; j++) {
                    Rcd1[j] = "";
                } /* for */
                var Val_Sel = P_UsrView.Val_Sel;        /* 12/02/2024 */
                var Key_Fld = P_UsrView.Key_Fld;
                Rcd1[Key_Fld -C_iDelta_asRcd] = "" + Val_Sel;
                debugger;                
             } /* if */
        } break;
        default : {
        } break;
      } /* switch */
      Rcd0 = Rcd1;
  } /* if */
    
  var j = 0;
  var szNm = aFld1[0].szNm;           
  szRow += '<tr><td><label>' + szNm + '</label></td><td><input id="Id_Card_' + j + '" value="' + P_UsrView.KeyTup + '" style="color:red;"' + '></td></tr>';

  for (var j = 1; j < iCard_aiPos; j++) {
      var j0 = aiPos[j];
      var FldX = aFld1[j]; 
      var Val0 = Rcd0[j0 -C_iDelta_asRcd];  
      szRow += $Value.F_szHTML_TR_Card(Val0, FldX, j, P_fReadOnly);        
  } /* for */
  
  return(szRow);
} /* F_szHTML_OpenCard */

/*-----U_ConfirmCard --------------------------------------------------------
*
* Confirm data modified in the Card (dialogue box).
*/ 
function U_ConfirmCard(P_UsrView, P_jOpt_Confirm)
{
  var XDB0 = P_UsrView.XDB0;
  var aFld1 = P_UsrView.aFld1; 
  var iCard_aFld = aFld1.length;
  var aiPos = P_UsrView.aiPos;
  var iCard_aiPos = aiPos.length;  
  var szKey;
  var Rcd0;

  switch (P_jOpt_Confirm) {
    case C_jOpt_Confirm_New: {
         szKey = Id_Card_0.value;
         if (szKey == "") {
            $Error.U_Error(C_jCd_Cur, 1, "Illegal Key", '"' + szKey + '"', false);
            return;
         } /* if */
    
         XDB0.Coll0[szKey] = [];
         XDB0.Tup_Sel = XDB0.Coll0[szKey];
         Rcd0 = XDB0.Tup_Sel;
    } break;
    case C_jOpt_Confirm_Edit: {
         var ElemPrv = P_UsrView.ElemPrv;  
         var Elem_Parent = ElemPrv.parentElement;
         var aElem_Sibling = Elem_Parent.childNodes;    /* Array of <td> nodes */
         Rcd0 = XDB0.Tup_Sel;
    } break;
    case C_jOpt_Confirm_Copy: {
         XDB0.Tup_Copy = [];
         Rcd0 = XDB0.Tup_Copy;
    } break;
    case C_jOpt_Confirm_Flt: {
         XDB0.Tup_Filter = [];
         Rcd0 = XDB0.Tup_Filter;
    } break;
    default : {
    } break;
  } /* switch */ 
      
  for (var j = 1; j < iCard_aiPos; j++) {
      var j0 = aiPos[j];
      var Fld1 = aFld1[j];
      var ValInput = $Value.F_Val_Inp_Card(Fld1, j);
      Rcd0[j0 -C_iDelta_asRcd] = ValInput;  
  } /* for */

  if (P_jOpt_Confirm == C_jOpt_Confirm_Flt) {
     /* Get the Key */
     var Fld1 = aFld1[0];
     var ValInput = $Value.F_Val_Inp_Card(Fld1, 0);
     var iCard0 = aFld1.length;
     Rcd0[iCard0] = ValInput;  /* Store the Key at the end of the record. */
  } /* if */
} /* U_ConfirmCard */

/*-----F_jaFld1_Sel --------------------------------------------------------
*
* Table Editing. Given P_iCol get the position of the corresponding Field in aFld1.
*/ 
function F_jaFld1_Sel(P_UsrView, P_iCol)
{
  var jaFld = (P_iCol > 0)? P_UsrView.aiPos[P_iCol -1]: -1;
  return(jaFld);
} /* F_jaFld1_Sel */

/*-----F_aNdx_Make --------------------------------------------------------
*
* Make Index.  asRcd
* 
* $NOTE: P_jFld1 make reference to P_UsrView.aFld1.
*/ 
function F_aNdx_Make(P_UsrView, P_jFld1, P_fCS=true, P_fInit=true)
{
  var XDB0 = P_UsrView.XDB0;
  var asRcd = XDB0.Coll0;
  var aFld1 = P_UsrView.aFld1;
  var iCard_aFld1 = aFld1.length;
  var aNdx = P_UsrView.aNdx;
  var szKey1;
  var jFld1 = P_jFld1 -C_iDelta_asRcd;
  var i = 0;
  
  if (P_fInit) {
     aNdx = [];
     /* Create preliminary Index */
     for (var szKey1 in asRcd) {
         aNdx[i++] = szKey1;
     } /* for */
  } /* if */ 
  
  if ((P_jFld1 < 0) || (iCard_aFld1 <= P_jFld1)) {
     return(aNdx);
  } /* if */
  
  var F_iLt_Cmp = $Sort.F_F_iLt_Cmp_Mp_Type(P_UsrView, P_jFld1, P_fCS);  
  aNdx.sort(F_iLt_Cmp);

  return(aNdx);
} /* F_aNdx_Make */

/*-----F_asKey_Make --------------------------------------------------------
*
*/ 
function F_asKey_Make(P_UsrView, P_jFld1)
{  
  return({});
} /* F_asKey_Make */

/*-----F_Arr_Mp_Field --------------------------------------------------------
*
* Extract the elements of the given row returning them as an Array.
*/ 
function F_Arr_Mp_Field(P_UsrView, P_jFld)
{
  var XDB0 = P_UsrView.XDB0;
  var asRcd0 = XDB0.Coll0;
  var aFld  = P_UsrView.aFld1;
  var iCard_asRcd0 = asRcd0.length;
  var Arr = [];
  var szKey0;
  var i = 0;
  
  P_jFld = P_jFld -C_iDelta_asRcd;

  for (szKey0 in asRcd0) {
      Arr[i++] = asRcd0[szKey0][P_jFld];
  } /* for */
  
  return(Arr);
} /* F_Arr_Mp_Field */

/*-----U_Set_Field --------------------------------------------------------
* 
*/ 
function U_Set_Field(P_UsrView, P_Fld1, P_szCode, P_iStart, P_iStop)
{
  var jFld0 = P_Fld1.iPos0 -C_iDelta_asRcd;
  
  $FormInt.U_Eval(P_UsrView, P_Fld1, jFld0, P_szCode, P_iStart, P_iStop);
} /* U_Set_Field */

    } /* constructor */
} /* end CL_UsrView0_asRcd */
