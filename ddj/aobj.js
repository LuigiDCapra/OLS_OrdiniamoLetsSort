/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : aobj.js
* Function    : Array of Objects
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

/* ***** CL_XDB0_aObj *******************************************************
*
* new CL_XDB0_aObj
*/ 
class CL_XDB0_aObj extends CL_XDB0 {
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
* Sort an array of Objects or an array of array
*/ 
function U_Sort(P_XDB0, P_jFld, P_fAsc)
{
  function F_iLt_Cmp(P_0, P_1) {
    var Ope0 = P_0[szKey];
    var Ope1 = P_1[szKey];
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
    var Ope0 = P_0[szKey];
    var Ope1 = P_1[szKey];
    var iRes = 0;
    
    if (Ope0 < Ope1) {
       iRes =  1;
    } /* if */
    if (Ope1 < Ope0) {
       iRes = -1;
    } /* if */
    return(iRes);
  } /* F_iGt_Cmp */

  var aObj0 = P_XDB0.Coll0;

  if (P_fAsc) {
     aObj0.sort(F_iLt_Cmp);  
  }
  else {
     aObj0.sort(F_iGt_Cmp);
  } /* if */
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
  var iLen_Fld = C_iLen_Fld_Dflt;
  var szType;
  var Val0 = 0;
  var j = 0;

  aObj = P_Coll0[0];
  
  for (var szKey0 in aObj) {
      Val0 = aObj[szKey0];
      szType = $Type.F_szType(Val0);
      aFld[j] = {"szType":szType, "iLen":iLen_Fld, "szNm":szKey0};
      j++;
  } /* for */
  return(aFld);
} /* F_aFld_Make */

} /* end CL_XDB0_aObj */

/* ***** CL_UsrView0_aObj *******************************************************
*
* new CL_UsrView0_aObj
*/ 
class CL_UsrView0_aObj extends CL_UsrView0 {
  constructor(P_XDB, P_aFld, P_Bag_UsrView) {
    const C_jCd_Cur = C_jCd_aObj;

    super(P_XDB, P_aFld, P_Bag_UsrView);   /* new CL_UsrView0() */

    this.F_TupNull    = F_TupNull;
    this.U_Insert     = U_Insert;
    this.U_Update     = U_Update;
    this.U_Delete     = U_Delete;
    this.U_Set_Field  = U_Set_Field;      // function U_Set_Field(P_UsrView, P_Fld1, P_szCode);
    
    this.U_XShow_RC   = U_XShow_RC;
    this.U_XShow_CR   = U_XShow_CR;
    this.F_jaNdx_Sel  = F_jaNdx_Sel;
    this.F_KeyTup_Sel = F_KeyTup_Sel;
    this.F_jaFld1_Sel = F_jaFld1_Sel;
    this.U_SaveChange = U_SaveChange;
    
    this.F_szHTML_OpenCard = F_szHTML_OpenCard;  // function F_szHTML_OpenCard(P_XDB, P_jOpt_Confirm, P_fReadOnly)
    this.U_ConfirmCard    = U_ConfirmCard;       // function U_ConfirmCard(P_XDB, P_jOpt_Confirm);
    this.F_aNdx_Make      = F_aNdx_Make;         // function F_aNdx_Make(P_UsrView, P_jFld);
    this.F_asKey_Make     = F_asKey_Make;        // function F_asKey_Make(P_UsrView, P_jFld);
    this.F_Arr_Mp_Field   = F_Arr_Mp_Field;      // function F_Arr_Mp_Field(P_UsrView, P_jFld);
    
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
     Tup0 = {};
      
     for (let i = 0; i < iLen; i++) {
         Tup0[aFld1[i].szNm] = $Type.F_Val_Null_Mp_Type(aFld1[i].szType);
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
  var aNdx = P_UsrView.aNdx;
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
  var aNdx = P_UsrView.aNdx;
  P_UsrView.XDB0.Coll0.splice(P_Key, 1);
  aNdx.splice(P_Key, 1);
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
  var aObj0 = XDB0.Coll0;
  var iCard_aNdx  = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var jStep = $VConfig.F_i_ValSts_Get("iSmpl_Step");
  var szRow;

  for (var j = 0; j < iCard_aNdx; j += jStep) {
      var k = (P_fAsc)? aNdx[j]: aNdx[iCard_aNdx -1 -j];
      var Obj0 = aObj0[k];
         szRow = "<td>" + $Value.F_szHTML_Caption(j) + " (" + k + ")</td>";
         for (var i = 0; i < iCard_aiPos; i++) {
             let i0 = aiPos[i];
             var Fld1 = aFld1[i0];
             var szNm  = Fld1.szNm;
             var szValCur = Obj0[szNm];
             szRow += '<td onclick="$Table.U_LM(this)">' + $Value.F_szHTML_TD_Table(szValCur, Fld1) + '</td>';
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
  var aObj0 = XDB0.Coll0;
  
  szRow  = "<th  onclick='$Table.U_LH_T(this)'>#</th><th>Field</th>";
  for (var i = 0; i < iCard_aNdx; i++) {
      var k = (P_fAsc)? i: iCard_aNdx - i -1; 
      szRow += '<th>' + $Value.F_szHTML_Caption(aNdx[k]) + '</th>';
  } /* for */
  P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false);   
  P_UsrView.U_Upd_Elem(szId_Tbl_H, true);
  P_UsrView.U_Prn_Elem("", true);         
  
  for (var j = 0; j < iCard_aiPos; j++) {
      let j0 = aiPos[j];                                    /* aFld1[j] corresponds to aFld0[j0] */
      szRow  = '<td onclick="$Table.U_LH_T(this)">' + $Value.F_szHTML_Caption(j) + "</td>";
      szRow += "<td>" + $Value.F_szHTML_Caption(aFld1[j0].szNm) + "</td>";
      var szKey = aFld1[j0].szNm;
      for (var i = 0; i < iCard_aNdx; i++) {
          var k = (P_fAsc)? i: iCard_aNdx - i -1; 
          var Rec0 = aObj0[aNdx[k]];
          var szValCur = Rec0[szKey];
          szRow += '<td onclick="$Table.U_LM_T(this)">' + $Value.F_szHTML_TD_Table(szValCur, aFld1[j0]) + '</td>';
      } /* for */
      P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false); 
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
  var aObj0 = XDB0.Coll0;
  var Obj0  =  aObj0[P_UsrView.KeyTup];
  var aFld1 = P_UsrView.aFld1;
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
  var Obj0 = XDB0.Tup_Sel;
  var Obj1 = {};
  var szRow = ""; 

  if (P_jOpt_Confirm != C_jOpt_Confirm_Edit) {  
      switch (P_jOpt_Confirm) {
        case C_jOpt_Confirm_New: {
             for (var j = 0; j < iCard_aFld; j++) {
                 var szNm = aFld1[j].szNm;
                 Obj1[szNm] = "";
             } /* for */
             if (XDB0.szNm_aFld == "aFld_aFld1") {  /* Set Layout defaults. */
                Obj1["iPos0"] = XDB0.Coll0.length;
                Obj1["iPos1"] = XDB0.Coll0.length;
                Obj1["iLen"] = 8;                 
                Obj1["fVisible"] = true;
                Obj1["fCaseSens"] = true;
             } /* if */ 
        } break;
        case C_jOpt_Confirm_Panel: {
             Obj1 = XDB0.Coll0[0];        // 2025-10-14
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
                var Val_Sel = P_UsrView.Val_Sel;
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
  for (var j = 0; j < iCard_aiPos; j++) {
       var j0 = aiPos[j];
       var szNm = aFld1[j0].szNm;  
       var Val0 = Obj0[szNm];
       szRow += $Value.F_szHTML_TR_Card(Val0, aFld1[j0], j, P_fReadOnly);          
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
  var Obj0;

  switch (P_jOpt_Confirm) {
  case C_jOpt_Confirm_Panel:
   case C_jOpt_Confirm_New: {
        var iCard = XDB0.Coll0.length;
        XDB0.Coll0[iCard] = {};
        XDB0.Tup_Sel = XDB0.Coll0[iCard];
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
      var i1 = aiPos[j];
      var Fld1 = aFld1[i1];
      var ValInput = $Value.F_Val_Inp_Card(Fld1, i1);
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
 // var jaFld = (P_iCol >= 1)? P_UsrView.aiPos[P_iCol -1]: 0;
  var jaFld = (P_iCol > 0)? P_UsrView.aiPos[P_iCol -1]: -1;
  return(jaFld);
} /* F_jaFld1_Sel */

/*-----F_aNdx_Make --------------------------------------------------------
*
* Make Index. aObj
* 
* $NOTE: P_jFld1 make reference to P_UsrView.aFld1.
*/ 
function F_aNdx_Make(P_UsrView, P_jFld1, P_fCS=true, P_fInit=true)
{
  var XDB0 = P_UsrView.XDB0;
  var aObj0 = XDB0.Coll0;
  var aFld1  = P_UsrView.aFld1;
  var iCard_aObj0 = aObj0.length;
  var iCard_aFld1 = aFld1.length;
  var aNdx = P_UsrView.aNdx;
  var szKey;
  var i;  
  
  if (P_fInit) {
     aNdx = [];
     /* Create preliminary Index */
     for (i = 0; i < iCard_aObj0; i++) {
         aNdx[i] = i;
     } /* for */
  } /* if */ 
  
  if ((P_jFld1 < 0) || (iCard_aFld1 <= P_jFld1)) {
     return(aNdx);
  } /* if */
  
  var Fld1  = aFld1[P_jFld1];
  var iPos0 = Fld1.iPos0;
  
  szKey = aFld1[P_jFld1].szNm;
  
  var F_iLt_Cmp = $Sort.F_F_iLt_Cmp_Mp_Type(P_UsrView, P_jFld1, P_fCS);  
  aNdx.sort(F_iLt_Cmp);

 var fDistinct = $VConfig.F_ValSts_Get("fDistinct");
 if (fDistinct) {
    var aNdx2 = [];
    var aiPos = P_UsrView.aiPos;
    let i;
    let iCard_aNdx  = aNdx.length;
    let iCard_aiPos = aiPos.length;
    
    for (i = 0; i < iCard_aNdx; i++) {
        let iCard_aNdx2 = aNdx2.length;
        let i0 = aNdx[i];
        let Obj0 = aObj0[i0];
        let k;
        for (k = 0; k < iCard_aNdx2; k++) {
            let i1 = aNdx2[k];
            let Obj1 = aObj0[i1];
            let j;
            for (j = 0; j < iCard_aiPos; j++) {
                var szKey = aFld1[j].szNm;
                if (Obj0[szKey] != Obj1[szKey]) {
                   /* Obj0 != Obj1 skip */
                   break;
                } /* if */
            } /* for */
            if (j == iCard_aiPos) {
               /* Obj0 == Obj1 */
               break;
            } /* if */
        } /* for */
        if (k == iCard_aNdx2) {
           /* Obj0 is different from the previous ones Add it */
           aNdx2[k] = i0;
        } /* if */
    } /* for */   
    aNdx = aNdx2;
 } /* if */
 
  return(aNdx);
} /* F_aNdx_Make */

/*-----F_asKey_Make --------------------------------------------------------
*
*/ 
function F_asKey_Make(P_UsrView, P_jFld1)
{
  var aFld1 = P_UsrView.aFld1;
  var XDB0 = P_UsrView.XDB0;
  var aObj0 = XDB0.Coll0;
  var iCard = aObj0.length;
  var asKey = {};

  if (aFld1.length <= P_jFld1) {
      $Error.U_Error(C_jCd_Cur, 1, "Field doesn't exists.", P_jFld1, false);
  } /* if */

  var szKey = aFld1[P_jFld1].szNm;  /* Foreign Key */  

  /* Create primary key Index */
  for (let i = 0; i < iCard; i++) {
      asKey[aObj0[i][szKey]] = aObj0[i];
  } /* for */
  
  return(asKey);
} /* F_asKey_Make */

/*-----F_Arr_Mp_Field --------------------------------------------------------
*
* Extract the elements of the given row returning them as an Array.
*/ 
function F_Arr_Mp_Field(P_UsrView, P_jFld, P_fNdx=false)
{
  var XDB0 = P_UsrView.XDB0;
  var aObj0 = XDB0.Coll0;
  var aNdx  = P_UsrView.F_aNdx();
  var aFld  = P_UsrView.aFld1;
  var iCard_aObj0 = aObj0.length;
  var iCard = aObj0.length;
  var Arr = [];
  var szKey = aFld[P_jFld].szNm;
  
  if (P_fNdx) {
     for (let i = 0; i < iCard_aObj0; i++) {
          let k = aNdx[i];
          Arr[i] = aObj0[k][szKey];
     } /* for */  
  }
  else {
     for (let i = 0; i < iCard; i++) {
         Arr[i] = aObj0[i][szKey];
     } /* for */ 
  } /* if */
  
  return(Arr);
} /* F_Arr_Mp_Field */

/*-----U_Set_Field --------------------------------------------------------
*
*/ 
function U_Set_Field(P_UsrView, P_Fld1, P_szCode, P_iStart, P_iStop)
{
  var szNm  = P_Fld1.szNm;
  
  $FormInt.U_Eval(P_UsrView, P_Fld1, szNm, P_szCode, P_iStart, P_iStop);
} /* U_Set_Field */

    } /* constructor */
} /* end CL_UsrView0_aObj */
