/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : filter.js
* Function    : User interface for filters setting
* FirstEdit   : 15/12/2019
* LastEdit    : 06/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
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

/*----- Module $Filter --------------------------------------------------------
*
*/ 
const $Filter = (function () {
  var _Filter = {};
  _Filter.U_Init          = U_Init_Filter;    // function U_Init_Filter();

  _Filter.F_iCnt_Filter   = F_iCnt_Filter;    // function F_iCnt_Filter();
  _Filter.F_fFilter       = F_fFilter;        // function F_fFilter();
  _Filter.F_fFilter_Null  = F_fFilter_Null;   // function F_fFilter_Null(P_pF, P_Tup);
  _Filter.F_fFilter_Std   = F_fFilter_Std;    // function F_fFilter_Std(P_pF, P_Tup);
  
  _Filter.F_szFilterStr   = F_szFilterStr;    // function F_szFilterStr();
  _Filter.U_SetFilterEQ   = U_SetFilterEQ;    // function U_SetFilterEQ();

  _Filter.U_Toggle_Filter = U_Toggle_Filter;  // function U_Toggle_Filter();
  _Filter.U_Invert_Filter = U_Invert_Filter;  // function U_Invert_Filter();                                                                                                                           
  _Filter.U_Clear_Filter  = U_Clear_Filter;   // function U_Clear_Filter();
  
  _Filter.U_SetFilter     = U_SetFilter;      // function (P_pF_fFilter, P_szCond0);

  _Filter.U_Filter_JS     = U_Filter_JS;      // function U_Filter_JS()

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Filter;

/*----- Local Variables ----------------------------------------------*/

var S_fFilter  = false;  /* Hide undefined values in QBE filter DBox. */
var S_fGotoFlt = false;
var S_szFilterStr = "";

/*
*  Filter Card.
*  See: $Initialize_FilterJS
*/
var S_szHTML_DBox_FilterJS = `<div>
  <fieldset class="CL_StdMenu">
    <label for="Id_CB_Goto_JS">GoTo/Filter</label> <input id="Id_CB_Goto_JS" type="checkbox">
  </fieldset><br>

<label for="Id_Inp_Cond0">Condition</label> <input id="Id_Inp_Cond0" size="50" type="text" list="Id_Li_TA_Cond0" placeholder="--- List ---"><button onclick="Id_Inp_Cond0.value = ''">clear</button><br><br><br><br><br><br>
  <datalist id="Id_Li_TA_Cond0">
    <option value='$[1] < 200'>$[1] < 200</option>
    <option value='$["Region"] == "South" <br>$["iNum1"] > 50'>$["Region"] == "South" <br>$["iNum1"] > 50</option>
    <option value='$[4] > "2020-01-01"'</option>
    <option value='Key > "g"'</option>
    <option value='(100<i) && (i<200)'</option>
    <option value='typeof($) == "number" /* Obj */'</option>
  </datalist>
</div>`;

/*
*  Filter Card 2.
*  See: $Initialize_Wizard
*/
var S_szHTML_DBox_Filter2 = `<div>                                
<br><br> 
<div id="Id_Div_Filter2_1" style="visibility:visible;">
  <fieldset class="CL_StdMenu">
    <label for="Id_CB_Goto_Filter2">GoTo/Filter</label> <input id="Id_CB_Goto_Filter2" type="checkbox">
  </fieldset><br><br><br>
<select id="Id_Sel_Lft_Filter2_1" size="1"></select>
<select id="Id_Sel_Fld_Filter2_1" size="1"></select>
<select id="Id_Sel_Rel_Filter2_1" size="1"></select>
<input id="Id_szVal_Filter2_1" type="text">
<select id="Id_Sel_Rgt_Filter2_1" size="1" onchange="$Filter.U_Filter2_Rgt(2, Id_Sel_Rgt_Filter2_1.value);"></select>
</div>

<div id="Id_Div_Filter2_2" style="visibility:hidden;">  
<select id="Id_Sel_Lft_Filter2_2" size="1"></select> 
<select id="Id_Sel_Fld_Filter2_2" size="1"></select>
<select id="Id_Sel_Rel_Filter2_2" size="1"></select>
<input id="Id_szVal_Filter2_2" type="text">
<select id="Id_Sel_Rgt_Filter2_2" size="1" onchange="$Filter.U_Filter2_Rgt(3, Id_Sel_Rgt_Filter2_2.value);"></select>
</div>

<div id="Id_Div_Filter2_3" style="visibility:hidden;"> 
<select id="Id_Sel_Lft_Filter2_3" size="1"></select> 
<select id="Id_Sel_Fld_Filter2_3" size="1"></select>
<select id="Id_Sel_Rel_Filter2_3" size="1"></select>
<input id="Id_szVal_Filter2_3" type="text">
<select id="Id_Sel_Rgt_Filter2_3" size="1" onchange="$Filter.U_Filter2_Rgt(4, Id_Sel_Rgt_Filter2_3.value);"></select>
</div>

<div id="Id_Div_Filter2_4" style="visibility:hidden;">
<select id="Id_Sel_Lft_Filter2_4" size="1"></select> 
<select id="Id_Sel_Fld_Filter2_4" size="1"></select>
<select id="Id_Sel_Rel_Filter2_4" size="1"></select>
<input id="Id_szVal_Filter2_4" type="text"> )
</div>

</div>`;

/*
*  Filter QBE.
*  See: $Initialize_FilterQBE
*/
var S_szHTML_DBox_QBE = `<div>
  <fieldset class="CL_StdMenu">
    <label for="Id_CB_Goto_QBE">GoTo/Filter</label> <input id="Id_CB_Goto_QBE" type="checkbox">    
    <label for="Id_CB_CaseSens_QBE">Case Sensitive</label> <input id="Id_CB_CaseSens_QBE" type="checkbox">
  </fieldset><br>
  <fieldset><legend id="Id_szNm_Tbl_Card"></legend> 
   <table class="Cl_Dbg" border="0" width="100%">
     <tbody id="Id_Tbl3">
        <tr><td>.</td></tr>
     </tbody>
   </table>
  </fieldset>
  <br>
</div>`;

/*
*  Filter Card Str.
*  See: $Initialize_String
*/
var S_szHTML_DBox_FilterStr = `<div>
  <fieldset class="CL_StdMenu">
    <label for="Id_CB_Goto_Str">GoTo/Filter</label> <input id="Id_CB_Goto_Str" type="checkbox">
    <label for="Id_CB_CaseSens_Str">Case Sensitive</label> <input id="Id_CB_CaseSens_Str" type="checkbox">
  </fieldset><br>
Look in field: <b id="Id_Span_Field">&nbsp;</b> 
<label for="Id_szVal_FilterStr">for the string:</label> 
<input id="Id_szVal_FilterStr" type="text" size=40> &nbsp;&nbsp;
<button onclick="Id_szVal_FilterStr.value = ''">C</button>
<br><br>
</div>`;

/*
*  Semantic Tree (SemTree).
*  See: $Initialize_String
*/
var S_szHTML_DBox_FilterSem = `<div>
  <fieldset class="CL_StdMenu">
    <label for="Id_CB_Goto_Sem">GoTo/Filter</label> <input id="Id_CB_Goto_Sem" type="checkbox">
    <label for="Id_CB_CaseSens_Sem">Case Sensitive</label> <input id="Id_CB_CaseSens_Sem" type="checkbox">
  </fieldset><br>
Look in field: <b id="Id_Span_Field">&nbsp;</b> 
<label for="Id_szVal_FilterSem">for the Key:</label> 
<input id="Id_szVal_FilterSem" type="text" size=40> &nbsp;&nbsp;
<button onclick="Id_szVal_FilterSem.value = ''">C</button>
<br><br>
</div>`;

/*-----U_Toggle_Filter --------------------------------------------------------
*
* Show the whole collection / show records satisfying filter conditions.
*/ 
function U_Toggle_Filter()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  UsrView0.fFlt = !UsrView0.fFlt;
} /* U_Toggle_Filter */   

/*-----U_Invert_Filter --------------------------------------------------------
*
* Show records satisfying filter conditions / show records that do not satisfying filter conditions.
*/ 
function U_Invert_Filter()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  if (UsrView0.fFlt) {
     UsrView0.fInv = !UsrView0.fInv;      
  } /* if */
} /* U_Invert_Filter */

/*-----U_Clear_Filter --------------------------------------------------------
*
*/ 
function U_Clear_Filter(P_fClearAll=false)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  UsrView0.aNdxFlt_T = UsrView0.aNdx;
  UsrView0.aNdxFlt_F = UsrView0.aNdx;
  UsrView0.aNdxFlt_GT = [];
  UsrView0.jNdxFlt_GT = 0;
  UsrView0.fFlt = false;
  UsrView0.fInv = false;
  
  if (P_fClearAll) {
     S_szFilterStr = "";
  } /* if */
} /* U_Clear_Filter */

/*-----U_Filter_JS --------------------------------------------------------
*
*/ 
function U_Filter_JS()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var Val_Sel = UsrView0.Val_Sel; 
  var szCond0;
  var Key_Fld;

  if (typeof(Val_Sel) == "string") {
     Val_Sel = '"' + Val_Sel + '"';
  } /* if */
  switch (XDB0.JKndTup0) {
    case C_JKndTup_aRcd : {
         Key_Fld = UsrView0.Key_Fld;
         szCond0 = `$[${Key_Fld}] == ${Val_Sel}`;
    } break;
    case C_JKndTup_aObj : {
         Key_Fld = UsrView0.Key_Fld;
         szCond0 = `$["${Key_Fld}"] == ${Val_Sel}`; 
    } break;
    case C_JKndTup_asRcd : {
         Key_Fld = UsrView0.Key_Fld -C_iDelta_asRcd;
         szCond0 = `$[${Key_Fld}] == ${Val_Sel}`; 
    } break;
    case C_JKndTup_asObj : {
         Key_Fld = UsrView0.Key_Fld;
         szCond0 = `$["${Key_Fld}"] == ${Val_Sel}`; 
    } break;
    case C_JKndTup_Obj:
    case C_JKndTup_as_:
    case C_JKndTup_Arr: {
         szCond0 = `$ == ${Val_Sel}`; 
    } break;
    default : {         
         $Error.U_Error(C_jCd_Cur, 1, "Unexpected JKndTup0", XDB0.JKndTup0, false);
    } break;
  } /* switch */
  
//   Id_CB_Goto_JS.checked = S_fGotoFlt;
//  
//   document.getElementById("Id_Inp_Cond0").value = szCond0;

//  debugger;
  $Panel.U_Display("Filter_JS");
} /* U_Filter_JS */ 

/* ***** Object S_DBox_FilterJS ************************************************
*
* Filter conditions.
*/ 
var S_DBox_FilterJS = (function(){
  var _Cond = {};
  _Cond.U_Open     = U_Open;      // function U_Open(P_Bag);
  _Cond.U_Cancel   = U_Close;     // function U_Close(P_Bag);
  _Cond.U_Confirm  = U_Confirm;   // function U_Confirm(P_Bag);
  
/*-----U_Open --------------------------------------------------------
*
* $Initialize_FilterJS
* Users make their queries writing JS conditional expressions.
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var Val_Sel = UsrView0.Val_Sel; 
  var szCond0;
  var Key_Fld;

  if (typeof(Val_Sel) == "string") {
     Val_Sel = '"' + Val_Sel + '"';
  } /* if */
  switch (XDB0.JKndTup0) {
    case C_JKndTup_aRcd : {
         Key_Fld = UsrView0.Key_Fld;
         szCond0 = `$[${Key_Fld}] == ${Val_Sel}`;
    } break;
    case C_JKndTup_aObj : {
         Key_Fld = UsrView0.Key_Fld;
         szCond0 = `$["${Key_Fld}"] == ${Val_Sel}`; 
    } break;
    case C_JKndTup_asRcd : {
         Key_Fld = UsrView0.Key_Fld -C_iDelta_asRcd;
         szCond0 = `$[${Key_Fld}] == ${Val_Sel}`; 
    } break;
    case C_JKndTup_asObj : {
         Key_Fld = UsrView0.Key_Fld;
         szCond0 = `$["${Key_Fld}"] == ${Val_Sel}`; 
    } break;
    case C_JKndTup_Obj:
    case C_JKndTup_as_:
    case C_JKndTup_Arr: {
         szCond0 = `$ == ${Val_Sel}`; 
    } break;
    default : {         
         $Error.U_Error(C_jCd_Cur, 1, "Unexpected JKndTup0", XDB0.JKndTup0, false);
    } break;
  } /* switch */
  
  Id_CB_Goto_JS.checked = S_fGotoFlt;
 
  document.getElementById("Id_Inp_Cond0").value = szCond0;
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{
} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();

  S_fGotoFlt = Id_CB_Goto_JS.checked;  
  var szCond0 = document.getElementById("Id_Inp_Cond0").value;

  U_Make_Filter(UsrView0, szCond0);
} /* U_Confirm */

  return(_Cond);
})(); /* # END - S_DBox_FilterJS Object */

/* # ***** Object S_DBox_Filter2 ***********************************************
*
* Filter conditions.
* The wizard helps users to formulate correct query. 
*/ 
var S_DBox_Filter2 = (function(){
  var _Cond = {};
  _Cond.U_Open        = U_Open;        // function U_Open(P_Bag);
  _Cond.U_Cancel      = U_Close;       // function U_Close(P_Bag);
  _Cond.U_Confirm     = U_Confirm;     // function U_Confirm(P_Bag);
  _Cond.U_Filter2_Rgt = U_Filter2_Rgt; // function U_Filter2_Rgt(P_j, P_szVal);
    
/*-----U_Open --------------------------------------------------------
*  
* $Initialize_Wizard
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  
  if ((XDB0.JKndTup0 == C_JKndTup_Obj) || (XDB0.JKndTup0 == C_JKndTup_as_) ){
     $Error.U_Error(C_jCd_Cur, 2, "Sorry Obj are not supported!", "", false);
  } /* if */
  
  var szHTML_Sel_Lft = `
    <option value="(" >  ( </option>
    <option value="!(" > !( </option>`;
    
  var szHTML_Sel_Rgt = `
    <option value=")"     > )     </option>
    <option value=") || " > ) OR  </option>
    <option value=") && " > ) AND </option>`;
      
  var szHTML_Sel_Rel = `
    <option selected="selected" value="=="> == </option>
    <option value="<" > < </option>
    <option value=">" > > </option>  
    <option value="!="> != </option>
    <option value="<="> <= </option>
    <option value=">="> >= </option>
    <option value="==="> === </option>
    <option value="!=="> !== </option>
    <option value="startsWith"> startsWidth </option>
    <option value="endsWith"> endsWidth </option>
    <option value="includes"> includes </option>`;
    
   var szHTML_Sel_Fld = "";
   var szKey_Sel = "";
   if ((typeof(UsrView0.Fld_Sel) != "undefined") && (UsrView0.Fld_Sel != null)) {
      szKey_Sel = UsrView0.Fld_Sel.szNm;
   }
   else {
     $Error.U_Error(C_jCd_Cur, 3, "No field selected.\nPlease select a column and then try again.", "");
     return;
   } /* if */
   
   szHTML_Sel_Fld = F_szHTML_Option_Mp_aObj(aFld, "szNm", szKey_Sel, false, true);

   Id_CB_Goto_Filter2.checked = S_fGotoFlt;

   Id_Sel_Lft_Filter2_1.innerHTML = szHTML_Sel_Lft;  
   Id_Sel_Lft_Filter2_2.innerHTML = szHTML_Sel_Lft; 
   Id_Sel_Lft_Filter2_3.innerHTML = szHTML_Sel_Lft;  
   Id_Sel_Lft_Filter2_4.innerHTML = szHTML_Sel_Lft;
   
   Id_Sel_Fld_Filter2_1.innerHTML = szHTML_Sel_Fld;  
   Id_Sel_Fld_Filter2_2.innerHTML = szHTML_Sel_Fld; 
   Id_Sel_Fld_Filter2_3.innerHTML = szHTML_Sel_Fld;  
   Id_Sel_Fld_Filter2_4.innerHTML = szHTML_Sel_Fld;
   
   Id_Sel_Rel_Filter2_1.innerHTML = szHTML_Sel_Rel;  
   Id_Sel_Rel_Filter2_2.innerHTML = szHTML_Sel_Rel; 
   Id_Sel_Rel_Filter2_3.innerHTML = szHTML_Sel_Rel;  
   Id_Sel_Rel_Filter2_4.innerHTML = szHTML_Sel_Rel;
   
   Id_Sel_Rgt_Filter2_1.innerHTML = szHTML_Sel_Rgt;  
   Id_Sel_Rgt_Filter2_2.innerHTML = szHTML_Sel_Rgt; 
   Id_Sel_Rgt_Filter2_3.innerHTML = szHTML_Sel_Rgt;  
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{
} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  var szCond0 = "";
  var szTmp;
  var iDelta = (XDB0.JKndTup0 == C_JKndTup_asRcd)? 1: 0;
  var szSel_Rgt;
  var szNmFld;
  var j = 1;
  
  S_fGotoFlt = Id_CB_Goto_Filter2.checked;
  
  do {
      var Elem_szSel_Lft = document.getElementById("Id_Sel_Lft_Filter2_" + j);
      var Elem_szSel_Fld = document.getElementById("Id_Sel_Fld_Filter2_" + j);
      var Elem_szSel_Rel = document.getElementById("Id_Sel_Rel_Filter2_" + j);
      var Elem_szVal     = document.getElementById("Id_szVal_Filter2_"   + j);
      var Elem_szSel_Rgt = document.getElementById("Id_Sel_Rgt_Filter2_" + j);
   
      switch (XDB0.JKndTup0) {  
        case C_JKndTup_asRcd:
        case C_JKndTup_aRcd: {
        // $$$$ sostituire con F_Obj_Mp_Select(P_Id, P_aRcd, P_szKey) ++++++
             let szNm_Fld = Elem_szSel_Fld.value;
             let i;
             for (i = 0; i < aFld.length; i++) {
                 if (aFld[i].szNm == szNm_Fld) {
                    break;
                 } /* if */
             } /* for */
             i -= iDelta;
             szNmFld =  `$[${i}]`;
        } break;
        case C_JKndTup_asObj:
        case C_JKndTup_aObj: {
            let szKey = Elem_szSel_Fld.value;
            szNmFld = `$["${szKey}"]`;
        } break;
        default : {
           $Error.U_Error(C_jCd_Cur, 4, "Unexpected value", XDB0.JKndTup0, false);
        } break;
      } /* switch */
     
      szSel_Rgt = Elem_szSel_Rgt.value;
      
      if ((Elem_szSel_Rel.value != "startsWith") && (Elem_szSel_Rel.value != "endsWith") && (Elem_szSel_Rel.value != "includes")) {
         szCond0 += `${Elem_szSel_Lft.value} ${szNmFld} ${Elem_szSel_Rel.value} "${Elem_szVal.value}" ${szSel_Rgt}`;
      }
      else {
         szCond0 += `${Elem_szSel_Lft.value} ${szNmFld}.${Elem_szSel_Rel.value}("${Elem_szVal.value}") ${szSel_Rgt}`;
      } /* if */     
 
      j++; 
  } while (szSel_Rgt != ")");

  U_Make_Filter(UsrView0, szCond0);
} /* U_Confirm */

/*-----U_Filter2_Rgt --------------------------------------------------------
*
*/ 
function U_Filter2_Rgt(P_j, P_szVal)
{
  if (P_szVal != ")") {
     var szId = "Id_Div_Filter2_" + P_j;
     var Elem0 = document.getElementById(szId);
     Elem0.style.visibility = "visible";
  }
  else {
    /* delete conditions at right */
    for (let i = P_j; i <= 4; i++) {
         var szId = "Id_Div_Filter2_" + i;
         var Elem0 = document.getElementById(szId);
         Elem0.style.visibility = "hidden";
    } /* for */
  } /* if */
} /* U_Filter2_Rgt */

  return(_Cond);
})(); /* # END - S_DBox_Filter2 Object */

/* # ---- Object Filter_QBE ----------------------------------------------------
*
* $Initialize_QBE
*
* Control functions for Generic DBox objects showing fixed contents.
*/ 
var S_DBox_Filter_QBE = (function(){
  var _Filter_QBE = {};
  _Filter_QBE.U_Open     = U_Open;      // function U_Open(P_Id);
  _Filter_QBE.U_Cancel   = U_Close;     // function U_Close(P_Id);
  _Filter_QBE.U_Confirm  = U_Confirm;   // function U_Confirm(P_Id);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_DBox;

/*----- Local Variables ----------------------------------------------*/

var S_DBox1;

/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
    
  if ((XDB0.JKndTup0 == C_JKndTup_Obj) || (XDB0.JKndTup0 == C_JKndTup_as_)) {
     $Error.U_Error(C_jCd_Cur, 5, "Sorry Obj are not supported!", "", false);
  } /* if */

  S_fFilter = true; /* enable "undefined" management */

  Id_CB_Goto_QBE.checked = S_fGotoFlt;
  Id_CB_CaseSens_QBE.checked = $VConfig.F_ValSts_Get("fCaseSens");
  
  $Card.U_OpenCard(XDB0, C_jOpt_Confirm_Flt);
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{
  S_fFilter = false; /* disable "undefined" management */
} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
* Build the expression corresponding to the QBE filter condition.
*/ 
function U_Confirm(P_Bag)
{
  /*-----F_szClause --------------------------------------------------------
  *
  * Build condition's clause.
  */ 
  function F_szClause(P_ValKey, P_szCond0, P_Val0)
  {
    if (!P_Val0 || (P_Val0 == " ")) {
       return(P_szCond0);
    } /* if */
    if (P_Val0 == "undefined") {
       return(P_szCond0);
    } /* if */   

    if (P_szCond0) {
       P_szCond0 += " && ";
    } /* if */

    P_Val0 = "" + P_Val0;
    P_Val0 = P_Val0.trim();
 
    if (fCaseSens) {
       P_szCond0 += `(($[${P_ValKey}])? (("" + $[${P_ValKey}]).startsWith("${P_Val0}")): false)`;
    }
    else {
       P_Val0 = P_Val0.toLowerCase();
       P_szCond0 += `(($[${P_ValKey}])? (("" + $[${P_ValKey}]).toLowerCase().startsWith("${P_Val0}")): false)`;
    } /* if */
    return(P_szCond0);           
  } /* F_szClause */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var szCond0 = "";
  var Val0;
  var ValKey;
 
  S_fGotoFlt = Id_CB_Goto_QBE.checked;
  var fCaseSens =  Id_CB_CaseSens_QBE.checked;
  $VConfig.U_Set_ValSts("fCaseSens", fCaseSens);

  UsrView0.ElemPrv = $Table.F_ElemPrv();
  $Card.U_ConfirmCard_Flt();
  
  switch (XDB0.JKndTup0) {
    case C_JKndTup_aRcd: {
         var Rcd0 = XDB0.Tup_Filter;
         for (var i = 0; i < Rcd0.length; i++) {         
             Val0 = Rcd0[i];
             szCond0 = F_szClause(i, szCond0, Val0);
         } /* for */
    } break;
    case C_JKndTup_aObj: {
         var Obj0 = XDB0.Tup_Filter;
         for (var szKey in Obj0) {
             Val0 = Obj0[szKey];
             ValKey = `"${szKey}"`;
             szCond0 = F_szClause(ValKey, szCond0, Val0);
         } /* for */
    } break;
    case C_JKndTup_asRcd: {
         var Rcd0 = XDB0.Tup_Filter;
         for (var i = 0; i < Rcd0.length -1; i++) {         
             Val0 = Rcd0[i];
             szCond0 = F_szClause(i, szCond0, Val0);  
         } /* for */
         Val0 = Rcd0[i];
         if (Val0) {
            szCond0 += `Key.startsWith("${Val0}")`;   // ?????
         } /* if */ 
    } break;
    case C_JKndTup_asObj: {
         var Obj0 = XDB0.Tup_Filter;
         for (var szKey in Obj0) {         
             Val0 = Obj0[szKey];
             ValKey = `"${szKey}"`;
             szCond0 = F_szClause(ValKey, szCond0, Val0);
         } /* for */
    } break;
    case C_JKndTup_Arr: {
         let Arr0  = XDB0.Tup_Filter;
         let szTxt = "" + Arr0;
         szCond0 = `(""+$).startsWith(${szTxt})`;
    } break;
    default : {
    } break;
  } /* switch */
  
  S_fFilter = false; /* disable "undefined" management */
  
  U_Make_Filter(UsrView0, szCond0);
} /* U_Confirm */

  return(_Filter_QBE);
})(); /* # END - S_DBox_Filter_QBE Object */

/* # ***** Object S_DBox_FilterStr ***********************************************
*
*/ 
var S_DBox_FilterStr = (function(){
  var _Cond = {};
  _Cond.U_Open        = U_Open;        // function U_Open(P_Bag);
  _Cond.U_Cancel      = U_Close;       // function U_Close(P_Bag);
  _Cond.U_Confirm     = U_Confirm;     // function U_Confirm(P_Bag);
    
/*-----U_Open --------------------------------------------------------
*  
* $Initialize_String
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  Id_Span_Field.innerText = UsrView0.Key_Fld + ` (${UsrView0.Fld_Sel.szNm})`;
  Id_CB_CaseSens_Str.checked  = $VConfig.F_ValSts_Get("fCaseSens");
  Id_CB_Goto_Str.checked = S_fGotoFlt;
  Id_szVal_FilterStr.value = S_szFilterStr;
  S_szFilterStr = "";
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{
} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var Key_Fld = UsrView0.Key_Fld;
    
  S_szFilterStr = Id_szVal_FilterStr.value;
  var fCaseSens = Id_CB_CaseSens_Str.checked;
  S_fGotoFlt    = Id_CB_Goto_Str.checked; 
  var szCond0;
   
  $VConfig.U_Set_ValSts("fCaseSens", fCaseSens); 

  if (fCaseSens) {
     szCond0 = `$[${Key_Fld}].indexOf("${S_szFilterStr}") >= 0`;  
  }
  else {     
     var szFilter = S_szFilterStr.toLowerCase();
     szCond0 = `$[${Key_Fld}].toLowerCase().indexOf("${szFilter}") >= 0`;
  } /* if */
  
  U_Make_Filter(UsrView0, szCond0);
} /* U_Confirm */

  return(_Cond);
})(); /* # END - S_DBox_FilterStr Object */


/* # ***** Object S_DBox_FilterSem ***********************************************
*
* Semantic Tree.
*/  
var S_DBox_FilterSem = (function(){
  var _Cond = {};
  _Cond.U_Open        = U_Open;        // function U_Open(P_Bag);
  _Cond.U_Cancel      = U_Close;       // function U_Close(P_Bag);
  _Cond.U_Confirm     = U_Confirm;     // function U_Confirm(P_Bag);
    
/*-----U_Open --------------------------------------------------------
*  
* $Initialize_String
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  
  if (UsrView0.Key_Fld) {
     Id_Span_Field.innerText = UsrView0.Key_Fld + ` (${UsrView0.Fld_Sel.szNm})`;
  }
  else {
     $Error.U_Error(C_jCd_Cur, 6, "No field selected.\nPlease select a column and then try again.", "");
     return;
  } /* if */
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{
} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
* Build the expression corresponding to the Semantic Tree filter condition.
*/ 
function U_Confirm(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var szCond0 = "";
  var szCode  = Id_szVal_FilterSem.value;
  var Val0;
  var ValKey;
  debugger;
  
  S_fGotoFlt = Id_CB_Goto_Sem.checked;
  var fCaseSens =  false;
  $VConfig.U_Set_ValSts("fCaseSens", fCaseSens);

  UsrView0.ElemPrv = $Table.F_ElemPrv();

 /// szCond0 = `$[3] == "${szCode}"`;   // E.g. '$[3] == "63"'
 
  var P_ValKey = 3;
  
  szCond0 =  `(($[${P_ValKey}])? (("" + $[${P_ValKey}]).startsWith("${szCode}")): false)`

  U_Make_Filter(UsrView0, szCond0);
} /* U_Confirm */

  return(_Cond);
})(); /* # END - S_DBox_FilterSem Object */


/*-----U_SetFilterEQ --------------------------------------------------------
*
* Select all the records having in the column corresponding to the field selected values equal to that of the cell selected.
*/ 
function U_SetFilterEQ()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var Key_Fld = UsrView0.Key_Fld;
  var Val_Sel = UsrView0.Val_Sel;
  var szCond0 = (typeof(Val_Sel) == "string")? `$[${Key_Fld}] == "${Val_Sel}"`: `$[${Key_Fld}] == ${Val_Sel}`;

  U_Make_Filter(UsrView0, szCond0);  
} /* U_SetFilterEQ */

/*--------------------------------------------------------------------*/

/*-----F_fFilter_Null ---------------------------------------------------------
*
* Null Filter
*/ 
function F_fFilter_Null(P_pF, P_Tup)
{
  return(true);
} /* F_fFilter_Null */

/*-----F_szFilterStr --------------------------------------------------------
*
* Return the string that was searched for.
*/ 
function F_szFilterStr()
{
  return(S_szFilterStr);
} /* F_szFilterStr */

/*-----F_iCnt_Filter --------------------------------------------------------
*
*/ 
function F_iCnt_Filter()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var aNdx0;
   
  if (UsrView0.fFlt) {
     aNdx0 = (UsrView0.fInv)? UsrView0.aNdxFlt_F: UsrView0.aNdxFlt_T;
  }
  else {
     aNdx0 = UsrView0.aNdx;
  } /* if */
  return(aNdx0.length);
} /* F_iCnt_Filter */

/*-----U_Make_Filter --------------------------------------------------------
*
* Make Filter condition .
*/ 
function U_Make_Filter(R_UsrView0, P_szCond0)
{  
  R_UsrView0.U_szCond(P_szCond0);
  R_UsrView0.aNdxFlt_GT = [];
  R_UsrView0.jNdxFlt_GT = 0;
  var aNdx0 = (R_UsrView0.aNdxFlt_T && (R_UsrView0.aNdxFlt_T.length > 0))? R_UsrView0.aNdxFlt_T: R_UsrView0.aNdx;
  U_SetFilter(F_fFilter_Std, P_szCond0);
  var aNdx1 = R_UsrView0.aNdxFlt_T;  
   
  if (CL_DBox.F_iCnt_DBox() > 0) {
     $Card.DBox_EdtTup.U_Hub(C_JPnl_Open);   // 22/08/2025
     $ExeCmd.U_First_Tup1();
  }
  else {
     if (S_fGotoFlt) {
        R_UsrView0.aNdxFlt_T  = aNdx0;    /* Restore previous list */
        R_UsrView0.aNdxFlt_GT = aNdx1;    /* Set list of record matching filter condition. */
        R_UsrView0.jNdxFlt_GT = 0;        /* Select the first */
        var iRow = aNdx1[0];
        $ExeCmd.U_GoTo_OLS(iRow);
        R_UsrView0 = CL_UsrView0.F_UsrView_Selected();
        $Table.U_ArrowMove(R_UsrView0, iRow +G_iDelta_Goto, 1, true);     /* Scroll required */
     }
     else {
        $Table.U_Display_Table();        
     } /* if */
  } /* if */
} /* U_Make_Filter */

/*-----U_SetFilter --------------------------------------------------------
*
* Apply Filter conditions.
*/ 
function U_SetFilter(P_pF_fFilter, P_szCond0)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aNdx = UsrView0.aNdx;
  var iLen = aNdx.length;
  var aNdxFlt_T = [];
  var aNdxFlt_F = [];
  var pF_fFilter = UsrView0.pF_fFilter;
  var iLen  = aNdx.length;  
  var aTup0 = XDB0.Coll0;
  var pF;
  var Tup0;
  var i, Key, f0, szKey, szTmp;
  var jT = 0;
  var jF = 0;
  var f0;
     
  if (!P_pF_fFilter) {
     $Error.U_Error(C_jCd_Cur, 7, "Missing Filter function.", "", false);
  } /* if */
  if (XDB0.JKndTup0 == C_JKndTup_asObj) {
     szKey = XDB0.aFld0[0].szNm;      /* get Key name */
     szTmp = `$["${szKey}"]`;
     P_szCond0 = P_szCond0.replaceAll(szTmp,"Key");
  } /* if */
  
  P_szCond0 = P_szCond0.replaceAll('"true"',"true");
  P_szCond0 = P_szCond0.replaceAll('"false"',"false");
  P_szCond0 = P_szCond0.replaceAll('"null"',"null");
  P_szCond0 = P_szCond0.replaceAll('"undefined"',"undefined");
  P_szCond0 = P_szCond0.replaceAll('$[-1]',"Key");

  UsrView0.pF_fFilter = P_pF_fFilter;
  UsrView0.szCond0 = P_szCond0;
  UsrView0.U_Clear_Filter(false);
  UsrView0.fFlt = true;
  
  var szCode = `pF = ($) => (($ != null) && (${P_szCond0}))`;      // 17/07/2025
  try {
      eval(szCode);   /* Set pF */
  } catch (P_Err) {
      $Error.U_Error(C_jCd_Cur, 8, "eval ", szCode, false);
      return;
  } /* try catch */
  
  for (i = 0; i < iLen; i++) {
      Key  = aNdx[i];
      Tup0 = aTup0[Key];
      try {
          f0 = pF(Tup0);
          if (f0) {
             aNdxFlt_T[jT++] = Key;
          }
          else {
             aNdxFlt_F[jF++] = Key;
          } /* if */
      } catch (P_Err) {
          $Error.U_Warning(C_jCd_Cur, 9, "Illegal field value. ", Key, false);   // 24/01/2026
          aNdxFlt_F[jF++] = Key;
      } /* try catch */
  } /* for */

  UsrView0.aNdxFlt_T = aNdxFlt_T;
  UsrView0.aNdxFlt_F = aNdxFlt_F;
} /* U_SetFilter */

/*-----F_fFilter_Std --------------------------------------------------------
*
* Function used as a filter (by default).
*/ 
function F_fFilter_Std(P_pF, P_Tup)
{
  var fRes_Filter = P_pF(P_Tup);
  return(fRes_Filter);
} /* F_fFilter_Std */

/*-----F_fFilter --------------------------------------------------------
*
* Enable "undefined" management when a Filter-Card is open.
*/ 
function F_fFilter()
{
  return(S_fFilter);
} /* F_fFilter */

/*-----U_Init_Filter --------------------------------------------------------
*
*/ 
function U_Init_Filter()
{
  U_Root0("$Filter", C_jCd_Cur);
  _Filter.U_Filter2_Rgt = S_DBox_Filter2.U_Filter2_Rgt;
  
  _Filter.DBox_Flt_QBE   = new CL_DBox("Id_Div_DBox0", "$Filter.DBox_Flt_QBE",   "Filter QBE",      S_szHTML_DBox_QBE,       S_DBox_Filter_QBE.U_Open, G_DBox_Null.U_Cancel, S_DBox_Filter_QBE.U_Confirm, G_asaMnEntry.Filter_QBE, "Filter_QBE");  
  _Filter.DBox_FilterJS  = new CL_DBox("Id_Div_DBox0", "$Filter.DBox_FilterJS",  "Filter JS",       S_szHTML_DBox_FilterJS,  S_DBox_FilterJS.U_Open,   G_DBox_Null.U_Cancel, S_DBox_FilterJS.U_Confirm,   G_asaMnEntry.Filter_JS,  "Filter_JS"); 
  _Filter.DBox_Filter2   = new CL_DBox("Id_Div_DBox0", "$Filter.DBox_Filter2",   "Filter Wizard",   S_szHTML_DBox_Filter2,   S_DBox_Filter2.U_Open,    G_DBox_Null.U_Cancel, S_DBox_Filter2.U_Confirm,    G_asaMnEntry.Filter_2,   "Filter_2");  
  _Filter.DBox_FilterStr = new CL_DBox("Id_Div_DBox0", "$Filter.DBox_FilterStr", "Look for string", S_szHTML_DBox_FilterStr, S_DBox_FilterStr.U_Open,  G_DBox_Null.U_Cancel, S_DBox_FilterStr.U_Confirm,  G_asaMnEntry.Filter_Str, "Filter_Str");  
  _Filter.DBox_FilterSem = new CL_DBox("Id_Div_DBox0", "$Filter.DBox_FilterSem", "Semantic Tree",   S_szHTML_DBox_FilterSem, S_DBox_FilterSem.U_Open,  G_DBox_Null.U_Cancel, S_DBox_FilterSem.U_Confirm,  G_asaMnEntry.Filter_Sem, "Filter_Sem");  

} /* U_Init_Filter */

  return(_Filter);
})();  /* Filter */




