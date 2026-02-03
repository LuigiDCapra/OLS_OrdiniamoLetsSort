/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : arcd.js
* Function    : Array of Records
* FirstEdit   : 03/11/2021
* LastEdit    : 02/02/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
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

/* ***** CL_XDB0_aRcd *******************************************************
*
* new CL_XDB0_aRcd
*/ 
class CL_XDB0_aRcd extends CL_XDB0 {
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
  return([]);
} /* F_Tup_New */

/*-----U_Sort -------------------------------------------------------------
*
* Sort the array of records aRcd.
*/ 
function U_Sort(P_XDB0, P_jFld, P_fAsc)
{
  function F_iLt_Cmp(P_0, P_1) {
    var Ope0 = P_0[P_jFld];
    var Ope1 = P_1[P_jFld];
    var iRes = 0;
    
    if (Ope0 < Ope1) {
       iRes = -1;
    } /* if */
    if (Ope1 < Ope0) {
       iRes =  1;
    } /* if */
    return(iRes);
  } /* F_iLt_Cmp */
  
  function F_iGt_Cmp(P_0, P_1) {
    var Ope0 = P_0[P_jFld];
    var Ope1 = P_1[P_jFld];
    var iRes = 0;
    
    if (Ope0 < Ope1) {
       iRes =  1;
    } /* if */
    if (Ope1 < Ope0) {
       iRes = -1;
    } /* if */
    return(iRes);
  } /* F_iGt_Cmp */
 
  var aRcd0 = P_XDB0.Coll0;

  if (P_fAsc) {
     aRcd0.sort(F_iLt_Cmp);  
  }
  else {
     aRcd0.sort(F_iGt_Cmp);
  } /* if */
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
  var aRcd0 = P_Coll0[0]; 
  var aRcd1 = P_Coll0[1]; 
  var iLen_aRcd0;
  var iLen_Fld = C_iLen_Fld_Dflt;
  var szType;
  var szKey;
  var Val0;
  var j;
 
  iLen_aRcd0 = aRcd0.length;

  if (P_fszFldNm_1) {
     /* The first line contains fields names. */
     /* The second line will be scanned to detect data types. */
     for (var j = 0; j < iLen_aRcd0; j++) {
         szKey = aRcd0[j].trim();
         Val0 = aRcd1[j];
         szType = $Type.F_szType(Val0);
         aFld[j] = {"szType":szType, "iLen":iLen_Fld, "szNm":szKey};
     } /* for */  
  }
  else {
     /* The first line will be scanned to detect data types. */
     for (var j = 0; j < iLen_aRcd0; j++) {
         szKey = "Col_" + j;
         Val0 = aRcd0[j];
         szType = $Type.F_szType(Val0);
         aFld[j] = {"szType":szType, "iLen":iLen_Fld, "szNm":szKey};
     } /* for */
  } /* if */

  return(aFld);
} /* F_aFld_Make */

} /* end CL_XDB0_aRcd */

/* ***** CL_UsrView0_aRcd *******************************************************
*
* new CL_UsrView0_aRcd
*/ 
class CL_UsrView0_aRcd extends CL_UsrView0 {
  constructor(P_XDB, P_aFld, P_Bag_UsrView) {
    const C_jCd_Cur = C_jCd_aRcd;

    super(P_XDB, P_aFld, P_Bag_UsrView);  /* new CL_UsrView0() */

    this.F_TupNull    = F_TupNull;               // Create an empty Tuple
    this.U_Insert     = U_Insert;                // Insert the given Tuple in the Collection
    this.U_Update     = U_Update;                // Update the given Tuple
    this.U_Delete     = U_Delete;                // Delete the given Tuple
    this.U_Set_Field  = U_Set_Field;             // function U_Set_Field(P_UsrView, P_Fld1, P_szCode, P_iStart, P_iStop);

    this.U_XShow_RC   = U_XShow_RC;              // Show the Collection in Rows-Columns order.
    this.U_XShow_CR   = U_XShow_CR;              // Show the Collection in Columns-Rows order.
    this.F_jaNdx_Sel  = F_jaNdx_Sel;             // Table Editing. Given P_iRow get the position of the corresponding Tuple in aNdx.
    this.F_KeyTup_Sel = F_KeyTup_Sel;            // Table Editing. Given P_iRow get the position of the corresponding Tuple in the Collection (overriding the order imposed using aNdx).
    this.F_jaFld1_Sel = F_jaFld1_Sel;            // Table Editing. Given P_iCol get the position of the corresponding Field in aFld1.
    this.U_SaveChange = U_SaveChange;            // Table Editing. Save changes updating the current Tuple.
    
    this.F_szHTML_OpenCard = F_szHTML_OpenCard;  // function F_szHTML_OpenCard(P_XDB, P_jOpt_Confirm, P_fReadOnly)    // Open the current row in a Card (dialogue box).
    this.U_ConfirmCard    = U_ConfirmCard;       // function U_ConfirmCard(P_XDB, P_jOpt_Confirm);                    // Confirm data modified in the Card (dialogue box).
    this.F_aNdx_Make      = F_aNdx_Make;         // function F_aNdx_Make(P_UsrView, P_jFld);                          // Make index aNdx
    this.F_asKey_Make     = F_asKey_Make;        // function F_asKey_Make(P_UsrView, P_jFld);                         // Create the associative index asKey to simplify the access to the record corresponding to the Key
    this.F_Arr_Mp_Field   = F_Arr_Mp_Field;      // function F_Arr_Mp_Field(P_UsrView, P_jaFld1, P_fNdx);             // Extract the array corresponding to the given Field.
    
    this.aNdx = null;                            /* null = Create the initial index. */
    
/* Polymorphic Section */

/*-----F_TupNull --------------------------------------------------------
*
*/ 
function F_TupNull(P_UsrView)
{
  var Tup0;
  
  var XDB0 = P_UsrView.XDB0;
  if (XDB0.TupNull) {
     Tup0 = F_Obj_Clone(XDB0.TupNull);
  }
  else {
     var aFld1 = P_UsrView.aFld1;
     var iLen  = aFld1.length;
     Tup0 = [];
      
     for (let i = 0; i < iLen; i++) {
         Tup0[i] = $Type.F_Val_Null_Mp_Type(aFld1[i].szType);
     } /* for */
  } /* if */ 
  
  return(Tup0)
} /* F_TupNull */

/*-----U_Insert --------------------------------------------------------
*
* Insert a new Tuple in the table
*/ 
function U_Insert(P_UsrView, P_Key, P_Tup)
{
  if (!P_Tup) {
     P_Tup = F_TupNull(P_UsrView);
  } /* if */
  if (P_Key < 0) {
     P_Key = P_UsrView.XDB0.Coll0.length;
  } /* if */

  var aNdx = P_UsrView.aNdx;
  var k = aNdx[P_Key];
  P_UsrView.XDB0.Coll0.splice(k, 0, P_Tup);
  // update aNdx
} /* U_Insert */

/*-----U_Update --------------------------------------------------------
*
* Update the current Tuple.
*/ 
function U_Update(P_UsrView, P_Key, P_Tup)
{
  $Error.U_Chk_Null(P_Tup);
  var aNdx = P_UsrView.F_aNdx();
  var k = aNdx[P_Key];
  P_UsrView.XDB0.Coll0.splice(k, 1, P_Tup);
  // update aNdx
} /* U_Update */

/*-----U_Delete --------------------------------------------------------
*
* Delete the current Tuple. 
*/ 
function U_Delete(P_UsrView, P_Key)
{
  var aNdx = P_UsrView.F_aNdx();
  var k = aNdx[P_Key];
  P_UsrView.XDB0.Coll0.splice(k, 1);
  aNdx.splice(k, 1);
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
  var aRcd0 = XDB0.Coll0;
  var iCard_aNdx  = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var jStep = $VConfig.F_i_ValSts_Get("iSmpl_Step");
  var szRow;

  for (var j = 0; j < iCard_aNdx; j += jStep) {
      var k = (P_fAsc)? aNdx[j]: aNdx[iCard_aNdx -1 -j];
         var Rcd0 = aRcd0[k];
         szRow = "<td>" + $Value.F_szHTML_Caption(j) + " (" + k + ")</td>";
         for (var i = 0; i < iCard_aiPos; i++) {
             let i0 = aiPos[i];
             var szValCur = Rcd0[i0];
             szRow += '<td onclick="$Table.U_LM(this)">' + $Value.F_szHTML_TD_Table(szValCur, aFld1[i0], Rcd0) + '</td>';
         } /* for */
         P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>\n", false);
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
  var aRcd0 = XDB0.Coll0;
  
  szRow  = "<th  onclick='$Table.U_LH_T(this)'>#</th><th>Field</th>";
  for (var i = 0; i < iCard_aNdx; i++) {
      var k = (P_fAsc)? i: iCard_aNdx - i -1; 
      szRow += '<th>' + $Value.F_szHTML_Caption(aNdx[k], aFld1[i]) + '</th>';
  } /* for */

  P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false);   
  P_UsrView.U_Upd_Elem(szId_Tbl_H, true);
  P_UsrView.U_Prn_Elem("", true);
     
  szRow  = "";
  for (var j = 0; j < iCard_aiPos; j++) {
      let j0 = aiPos[j];                                    /* aFld1[j] corresponds to aFld0[j0] */
      var szTitle0 = (aFld1[j].szRem)? aFld1[j].szRem: "";
      szRow  = `<td onclick="$Table.U_LH_T(this)">` + $Value.F_szHTML_Caption(j) + "</td>";
      szRow += `<td title="${szTitle0}">` + $Value.F_szHTML_Caption(aFld1[j0].szNm) + "</td>";
      for (var i = 0; i < iCard_aNdx; i++) {
          var k = (P_fAsc)? i: iCard_aNdx - i -1; 
          var szValCur = aRcd0[aNdx[k]][j0];
          szRow += '<td onclick="$Table.U_LM_T(this)">' + $Value.F_szHTML_TD_Table(szValCur, aFld1[j0]) + '</td>';
      } /* for */
      P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>\n", false); 
  } /* for */
} /* U_XShow_CR */

/*-----U_SaveChange --------------------------------------------------------
*
* Table Editing. Save changes updating the current Tuple.
*/ 
function U_SaveChange(P_UsrView, P_ElemPrv, P_fHTML= false)
{
  var ValInput = (P_fHTML)? P_ElemPrv.innerHTML: P_ElemPrv.innerText;
  var XDB0 = P_UsrView.XDB0;
  var aRcd0 = XDB0.Coll0;
  var Rcd0  = aRcd0[P_UsrView.KeyTup];   
  var aFld1 = P_UsrView.aFld1;
  var Fld1  = aFld1[P_UsrView.jaFld1];
  var iPos0 = Fld1.iPos0;  
  var szTypeDst = Fld1.szType;
  var TupVal = $Value.F_Val_Inp_Table(szTypeDst, Fld1, ValInput);
  Rcd0[iPos0] = TupVal;
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
                Rcd1[Key_Fld] = "" + Val_Sel;               
             } /* if */
        } break;
        default : {
        } break;
      } /* switch */
      Rcd0 = Rcd1;
  } /* if */
  
  for (var j = 0; j < iCard_aiPos; j++) {
      var j0 = aiPos[j];
      szRow += $Value.F_szHTML_TR_Card(Rcd0[j0], aFld1[j0], j, P_fReadOnly);               
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
  var Rcd0;
  
  switch (P_jOpt_Confirm) {
    case C_jOpt_Confirm_New: {
         var iCard = XDB0.Coll0.length;
         XDB0.Coll0[iCard] = [];
         XDB0.Tup_Sel = XDB0.Coll0[iCard];
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
      
  for (var j = 0; j < iCard_aiPos; j++) {
      var j0 = aiPos[j];
      var Fld1 = aFld1[j];
      var ValInput = $Value.F_Val_Inp_Card(Fld1, j);      
      Rcd0[j0] = ValInput;        
  } /* for */
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
* Make Index. aRcd
* 
* $NOTE: P_jFld1 make reference to P_UsrView.aFld1.
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator 
*/ 
function F_aNdx_Make(P_UsrView, P_jFld1, P_fCS=true, P_fInit=true)
{
  var XDB0 = P_UsrView.XDB0;
  var aRcd0 = XDB0.Coll0;
  var aFld1  = P_UsrView.aFld1;
  var iCard_aRcd0 = aRcd0.length;
  var iCard_aFld1 = aFld1.length;
  var aNdx = P_UsrView.aNdx;
  var i;
  
  if (P_fInit) {
     aNdx = [];
     /* Create preliminary Index */
     for (i = 0; i < iCard_aRcd0; i++) {
         aNdx[i] = i;
     } /* for */
  } /* if */ 
  
  if ((P_jFld1 < 0) || (iCard_aFld1 <= P_jFld1)) {
     return(aNdx);
  } /* if */
  var Fld1  = aFld1[P_jFld1];
  var iPos0 = Fld1.iPos0;
   
  var F_iLt_Cmp = $Sort.F_F_iLt_Cmp_Mp_Type(P_UsrView, P_jFld1, P_fCS);  
  aNdx.sort(F_iLt_Cmp);

  var fDistinct = $VConfig.F_ValSts_Get("fDistinct");
  if (fDistinct) {
     var aNdx2 = [];
     var aiPos = P_UsrView.aiPos;
     let iCard_aNdx  = aNdx.length;
     let iCard_aiPos = aiPos.length;
     let i, j0;
     let j = 0;
  
     aNdx2[j++] = aNdx[0];
     let KeyPrv = aRcd0[aNdx[0]][iPos0];
     let KeyCur; 
     
     for (i = 1; i < iCard_aNdx; i++) {
         KeyCur = aRcd0[aNdx[i]][iPos0];
         if (KeyCur != KeyPrv) {
            KeyPrv = KeyCur;
            aNdx2[j++] = aNdx[i];
         } /* if */
     } /* for */  
   
     aNdx = aNdx2;
  } /* if */
 
  return(aNdx);
} /* F_aNdx_Make */

/*-----F_asKey_Make --------------------------------------------------------
*
* Create the associative index asKey to simplify the access to the record corresponding to the Key
*/ 
function F_asKey_Make(P_UsrView, P_jFld1)
{
  var XDB0 = P_UsrView.XDB0;
  var aFld1 = P_UsrView.aFld1;
  var aRcd0 = XDB0.Coll0;
  var iCard = aRcd0.length;
  var asKey  = {};

  if (aFld1.length <= P_jFld1) {
      $Error.U_Error(C_jCd_Cur, 1, "Field doesn't exists.", P_jFld1, false);
  } /* if */

  /* Create primary key Index */
  for (let i = 0; i < iCard; i++) {
      asKey[aRcd0[i][P_jFld1]] = aRcd0[i];
  } /* for */
  
  return(asKey);
} /* F_asKey_Make */

/*-----F_Arr_Mp_Field --------------------------------------------------------
*
* Extract the elements of the selected column/field returning them as an Array.
*/ 
function F_Arr_Mp_Field(P_UsrView, P_jaFld1, P_fNdx=false)
{
  var XDB0  = P_UsrView.XDB0;
  var aRcd0 = XDB0.Coll0;
  var aNdx  = P_UsrView.F_aNdx();
  if (aRcd0 == C_Undefined) {
     debugger;
  } /* if */
  var iCard_aNdx = aNdx.length;
  var iCard = aRcd0.length;
  var Fld1  = P_UsrView.aFld1[P_jaFld1];
  var jFld0 = Fld1.iPos0;
  var Arr = [];
  
  if (P_fNdx) {
      for (let i = 0; i < iCard_aNdx; i++) {
          let k = aNdx[i];
          let Tup0 = aRcd0[k];
          Arr[i] = Tup0[jFld0];
      } /* for */  
  }
  else {
      for (let i = 0; i < iCard; i++) {
          let Tup0 = aRcd0[i];
          Arr[i] = Tup0[jFld0];
      } /* for */
  } /* if */
  
  return(Arr);
} /* F_Arr_Mp_Field */

/*-----U_Set_Field --------------------------------------------------------
*
*/ 
function U_Set_Field(P_UsrView, P_Fld1, P_szCode, P_iStart, P_iStop)
{
  var jFld0 = P_Fld1.iPos0;
  
  $FormInt.U_Eval(P_UsrView, P_Fld1, jFld0, P_szCode, P_iStart, P_iStop);
} /* U_Set_Field */

    } /* constructor */
} /* end CL_UsrView0_aRcd */
