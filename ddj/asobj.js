/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : asobj.js
* Function    : Associative Array of Objects
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

const C_iDelta_asObj = 1;                          /* It is necessary to decrement Fields' position because the value of first field is stored as the Key */

/*----- Global Variables ---------------------------------------------*/

/* ***** CL_XDB0_asObj *******************************************************
*
* new CL_XDB0_asObj
*/ 
class CL_XDB0_asObj extends CL_XDB0 {
  constructor(R_Bag_XDB0) {
    const C_jCd_Cur = C_jCd_aRcd;

    super(R_Bag_XDB0); /* new CL_XDB0() */

    this.F_Tup_New = F_Tup_New;
    this.U_Sort    = U_Sort;

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
*/ 
static F_aFld_Make(P_Coll0)
{
  var aFld = [];
  var asObj;
  var iLen_Fld = C_iLen_Fld_Dflt;
  var szType;
  var Val0;
  var j = 0;

  
  aFld[j++] = {"szType":"string", "iLen":8, "szNm":"szKey"};
  
  for (var szKey0 in P_Coll0) {
      asObj = P_Coll0[szKey0];
      for (var szKey in asObj) {
          Val0 = asObj[szKey];
          szType = $Type.F_szType(Val0);
          aFld[j++] = {"szType":szType, "iLen":iLen_Fld, "szNm":szKey};
      } /* for */
      if (j == 1) {
         debugger;         
         aFld[j++] = {"szType":"object", "iLen":C_iLen_Fld_Dflt, "szNm":"--- Empty ---"};
         $Error.U_Warning(C_jCd_Cur, 1, "Autodetect failed because the first record is empty.\nSet default.", "", false);
         debugger;
      } /* if */
      break;
  } /* for */
  return(aFld);
} /* F_aFld_Make */

} /* end CL_XDB0_asObj */

/* ***** CL_UsrView0_aObj *******************************************************
*
* new CL_UsrView0_asObj
*/ 
class CL_UsrView0_asObj extends CL_UsrView0 {
  constructor(P_XDB, P_aFld, P_Bag_UsrView) {
    const C_jCd_Cur = C_jCd_asObj;

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
  delete P_UsrView.XDB0.Coll0[P_UsrView.KeyTup];
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
  var asObj0 = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var jStep = $VConfig.F_i_ValSts_Get("iSmpl_Step");
  var szRow;

  for (var j = 0; j < iCard_aNdx; j += jStep) {
      var szKey1 = (P_fAsc)? aNdx[j]: aNdx[iCard_aNdx -1 -j];           
          var Obj1 = asObj0[szKey1];
          szRow = '<td>' + $Value.F_szHTML_Caption(j) + '</td>' + '<td  onclick="$Table.U_LM(this)">' + $Value.F_szHTML_Caption(szKey1) + '</td>';
          for (var i = C_iDelta_asObj; i < iCard_aiPos; i++) {
              let i0   = aiPos[i];
              let Fld1 = aFld1[i0];            
              var szNm = Fld1.szNm;
              var szValCur = Obj1[szNm];
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
  var asObj0 = XDB0.Coll0;
  
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
        
  for (var j = 1; j < iCard_aiPos; j++) {
      let j0 = aiPos[j];
      szRow  = '<td onclick="$Table.U_LH_T(this)">' + $Value.F_szHTML_Caption(j) + "</td>";
      szRow += "<td>" + $Value.F_szHTML_Caption(aFld1[j0].szNm) + "</td>";
      for (var i = 0; i < iCard_aNdx; i++) {             
          var szKey1 = (P_fAsc)? aNdx[i]: aNdx[iCard_aNdx - i -1];
          var Rec0   = asObj0[szKey1];
          var szKey2 = aFld1[j0].szNm;
          var szValCur  = Rec0[szKey2];
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
  var asObj = XDB0.Coll0;
  var szKey = P_UsrView.KeyTup;
  var Obj0  = asObj[szKey];
  var aFld1  = P_UsrView.aFld1;
  var Fld1  = aFld1[P_UsrView.jaFld1];
  var szNmFld = Fld1.szNm; 
  var szTypeDst = Fld1.szType;
  var TupVal = $Value.F_Val_Inp_Table(szTypeDst, Fld1, ValInput);
  Obj0[szNmFld] = TupVal;      
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
  var Obj0 = XDB0.Tup_Sel;
  var Obj1 = {};
  var szRow = "";
  var szType_Out = "string";

  if (P_jOpt_Confirm != C_jOpt_Confirm_Edit) { 
      switch (P_jOpt_Confirm) {
        case C_jOpt_Confirm_New: {
             for (var j = 0; j < iCard_aFld; j++) {
                 var szNm = aFld1[j].szNm;
                 Obj1[szNm] = "";
             } /* for */
        } break;
        case C_jOpt_Confirm_Paste: {
             Obj1 = F_Obj_Clone(XDB0.Tup_Copy);
        } break;
        case C_jOpt_Confirm_Copy: {
             XDB0.Tup_Copy = F_Obj_Clone(Rcd0);        
        } break;
        case C_jOpt_Confirm_Flt: {
             if (XDB0.Tup_Filter) {
                Obj1 = F_Obj_Clone(XDB0.Tup_Filter);
             }
             else {
                for (var j = 0; j < iCard_aFld; j++) {
                    var szNm = aFld1[j].szNm;
                    Obj1[szNm] = "";
                } /* for */
                var Val_Sel = P_UsrView.Val_Sel;        /* 12/02/2024 */
                var Key_Fld = P_UsrView.Key_Fld;
                Obj1[Key_Fld] = "" + Val_Sel;
                debugger;                                
             } /* if */
        } break;
        default : {
        } break;
      } /* switch */     
      Obj0 = Obj1; /* 12/02/2024 */
  } /* if */ 
    
  var j = 0;
  var szNm = aFld1[0].szNm;           
  szRow += '<tr><td><label>' + szNm + '</label></td><td><input id="Id_Card_' + j + '" value="' + P_UsrView.KeyTup + '" style="color:red;" '+ '></td></tr>'; 
  
  for (var j = 1; j < iCard_aiPos; j++) {
       var szNm = aFld1[j].szNm;     
       szRow += $Value.F_szHTML_TR_Card(Obj0[szNm], aFld1[j], j, P_fReadOnly);          
  } /* for */
  return(szRow);
} /* F_szHTML_OpenCard */

/*-----U_ConfirmCard --------------------------------------------------------
*
*/ 
function U_ConfirmCard(P_UsrView, P_jOpt_Confirm)
{
  var XDB0 = P_UsrView.XDB0; 
  var aFld1 = P_UsrView.aFld1; 
  var iCard_aFld = aFld1.length;
  var aiPos = P_UsrView.aiPos;
  var iCard_aiPos = aiPos.length;  
  var szKey;
  var Obj0;

  switch (P_jOpt_Confirm) {
    case C_jOpt_Confirm_New: {
         szKey = Id_Card_0.value;
         if (szKey == "") {
            $Error.U_Error(C_jCd_Cur, 1, "Illegal Key", '"' + szKey + '"', false);
            return;
         } /* if */   
         XDB0.Coll0[szKey] = {};
         XDB0.Tup_Sel = XDB0.Coll0[szKey];
         Obj0 = XDB0.Tup_Sel;
    } break;
    case C_jOpt_Confirm_Edit: {
         var ElemPrv = P_UsrView.ElemPrv;  
         var Elem_Parent = ElemPrv.parentElement;
         var aElem_Sibling = Elem_Parent.childNodes;    /* Array of <td> nodes */
         Obj0 = XDB0.Tup_Sel;
    } break;
    case C_jOpt_Confirm_Copy: {
         XDB0.Tup_Copy = {};
         Obj0 = XDB0.Tup_Copy;
    } break;
    case C_jOpt_Confirm_Flt: {
         XDB0.Tup_Filter = {};
         Obj0 = XDB0.Tup_Filter;
    } break;
    default : {
    } break;
  } /* switch */
 
  for (var j = 0; j < iCard_aiPos; j++) {
      var Fld1 = aFld1[j];
      var ValInput = $Value.F_Val_Inp_Card(Fld1, j);
      var szTypeDst = Fld1.szType;
      var szNm = Fld1.szNm;
      
      Obj0[szNm] = ValInput; 
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
* Make Index.  asObj
* $NOTE: P_jFld1 make reference to P_UsrView.aFld1.
*/ 
function F_aNdx_Make(P_UsrView, P_jFld1, P_fCS=true, P_fInit=true)
{
  var XDB0 = P_UsrView.XDB0;
  var asObj = XDB0.Coll0;
  var aFld1 = P_UsrView.aFld1;
  var iCard_aFld1 = aFld1.length;
  var aNdx = P_UsrView.aNdx;
  var szKey1;
  var i = 0;
  
  if (P_fInit) {
     aNdx = [];
     /* Create preliminary Index */
     for (var szKey1 in asObj) {
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
  var asObj0 = XDB0.Coll0;
  var aFld  = P_UsrView.aFld1;
  var iCard_asObj0 = asObj0.length;
  var Arr = [];
  var szKey0;
  var szKey1 = aFld[P_jFld].szNm;
  var i = 0;

  for (szKey0 in asObj0) {
      Arr[i++] = asObj0[szKey0][szKey1];
  } /* for */
  
  return(Arr);
} /* F_Arr_Mp_Field */

/*-----U_Set_Field_asObj --------------------------------------------------------
*
*/ 
function U_Set_Field(P_UsrView, P_Fld1, P_szCode, P_iStart, P_iStop)
{
  var szNm  = P_Fld1.szNm;
  
  $FormInt.U_Eval(P_UsrView, P_Fld1, szNm, P_szCode, P_iStart, P_iStop);
} /* U_Set_Field_asObj */

    } /* constructor */
} /* end CL_UsrView0_asObj */


