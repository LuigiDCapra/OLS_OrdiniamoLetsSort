/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : sort.js
* Function    : Sort management.
* FirstEdit   : 28/08/2024
* LastEdit    : 13/07/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
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

/*----- Module $Sort --------------------------------------------------------
*
*/ 
const $Sort = (function () {
  var _Sort = {};
  _Sort.U_Init          = U_Init_Sort;             // function U_Init_Sort();
  _Sort.F_F_iLt_Cmp_Mp_Type = F_F_iLt_Cmp_Mp_Type; // function F_F_iLt_Cmp_Mp_Type(P_Type);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Sort;

/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/

var S_Coll_Sort  = null;
var S_Key_Sort = 0;
var S_fConv = false;
var S_fCaseSens = false;

/*-----F_iLt_String_CS --------------------------------------------------------
*
*/ 
function F_iLt_String_CS(P_0, P_1) {
  var Ope0 = "" + S_Coll_Sort[P_0][S_Key_Sort];
  var Ope1 = "" + S_Coll_Sort[P_1][S_Key_Sort];
  var iRes = 0;
  
  if (Ope0 < Ope1) {
     return(-1);
  } /* if */
  if (Ope1 < Ope0) {
     return(1);
  } /* if */
  if (Ope0 == Ope1) {
     return(0);
  } /* if */ 
  /* Manage "undefined" */
  iRes = (typeof(Ope0) == "undefined")? 1: -1;
  return(iRes);
} /* F_iLt_String_CS */

/*-----F_iLt_String_NCS --------------------------------------------------------
*
*/
function F_iLt_String_NCS(P_0, P_1) {
  var Ope0 = "" + S_Coll_Sort[P_0][S_Key_Sort];
  var Ope1 = "" + S_Coll_Sort[P_1][S_Key_Sort];
  var iRes = 0;
  Ope0 = Ope0.toLowerCase();
  Ope1 = Ope1.toLowerCase();

  if (Ope0 < Ope1) {
     return(-1);
  } /* if */
  if (Ope1 < Ope0) {
     return(1);
  } /* if */
  if (Ope0 == Ope1) {
     return(0);
  } /* if */ 
  /* Manage "undefined" */
  iRes = (typeof(Ope0) == "undefined")? 1: -1;
  return(iRes);
} /* F_iLt_String_NCS */

/*-----F_iLt_Number --------------------------------------------------------
*
*/
function F_iLt_Number(P_0, P_1) {
  var Ope0 = +S_Coll_Sort[P_0][S_Key_Sort];
  var Ope1 = +S_Coll_Sort[P_1][S_Key_Sort];
  var iRes = 0;
  
  if (Ope0 < Ope1) {
     return(-1);
  } /* if */
  if (Ope1 < Ope0) {
     return(1);
  } /* if */
  if (Ope0 == Ope1) {
     return(0);
  } /* if */ 
  /* Manage "undefined" */
  iRes = (typeof(Ope0) == "undefined")? 1: -1;
  return(iRes);
} /* F_iLt_Number */

/*-----F_iLt_BigInt --------------------------------------------------------
*
*/
function F_iLt_BigInt(P_0, P_1) {
  var Ope0 = S_Coll_Sort[P_0][S_Key_Sort];
  var Ope1 = S_Coll_Sort[P_1][S_Key_Sort];
  var iRes = 0;
  
  if (Ope0 < Ope1) {
     return(-1);
  } /* if */
  if (Ope1 < Ope0) {
     return(1);
  } /* if */
  if (Ope0 == Ope1) {
     return(0);
  } /* if */ 
  /* Manage "undefined" */
  iRes = (typeof(Ope0) == "undefined")? 1: -1;
  return(iRes);
} /* F_iLt_BigInt */

/*-----F_iLt_Boolean --------------------------------------------------------
*
*/
function F_iLt_Boolean(P_0, P_1) {
  var Ope0 = S_Coll_Sort[P_0][S_Key_Sort];
  var Ope1 = S_Coll_Sort[P_1][S_Key_Sort];
  var iRes = 0;
  
  switch (Ope0) {
    case false: {
         Ope0 = 0;
    } break;
    case true: {
         Ope0 = 1
    } break;
    case 0: {
         Ope0 = 0;
    } break;
    case 1: {
         Ope0 = 1
    } break;
    case "false":
    case "FALSE":
    case "False":
    case "F":
    case "f": {
         Ope0 = 0;
    } break;
    case "true":
    case "TRUE":
    case "True":
    case "T":
    case "t": {
         Ope0 = 1;
    } break;
    default : {
         Ope0 = 2;
    } break;
  } /* switch */

  switch (Ope1) {
    case false: {
         Ope1 = 0;
    } break;
    case true: {
         Ope1 = 1
    } break;
    case 0: {
         Ope1 = 0;
    } break;
    case 1: {
         Ope1 = 1
    } break;
    case "false":
    case "FALSE":
    case "False":
    case "F":
    case "f": {
         Ope1 = 0;
    } break;
    case "true":
    case "TRUE":
    case "True":
    case "T":
    case "t": {
         Ope1 = 1;
    } break;
    default : {
         Ope1 = 2;
    } break;
  } /* switch */
  
  if (Ope0 < Ope1) {
     return(-1);
  } /* if */
  if (Ope1 < Ope0) {
     return(1);
  } /* if */
  if (Ope0 == Ope1) {
     return(0);
  } /* if */ 
  /* Manage "undefined" */
  iRes = (typeof(Ope0) == "undefined")? 1: -1;
  return(iRes);
} /* F_iLt_Boolean */

/*-----F_iLt_Cmp_Key_CS --------------------------------------------------------
*
*/
function F_iLt_Cmp_Key_CS(P_0, P_1) {
  var Ope0 = P_0;
  var Ope1 = P_1;
  var iRes = 0;
  
  if (Ope0 < Ope1) {
     return(-1);
  } /* if */
  if (Ope1 < Ope0) {
     return(1);
  } /* if */
  if (Ope0 == Ope1) {
     return(0);
  } /* if */ 
  /* Manage "undefined" */
  iRes = (typeof(Ope0) == "undefined")? 1: -1;
  return(iRes);
} /* F_iLt_Cmp_Key_CS */

/*-----F_iLt_Cmp_Key_NCS --------------------------------------------------------
*
*/
function F_iLt_Cmp_Key_NCS(P_0, P_1) {
  var Ope0 = P_0;
  var Ope1 = P_1;
  var iRes = 0;
  Ope0 = Ope0.toLowerCase();
  Ope1 = Ope1.toLowerCase();

  if (Ope0 < Ope1) {
     return(-1);
  } /* if */
  if (Ope1 < Ope0) {
     return(1);
  } /* if */
  if (Ope0 == Ope1) {
     return(0);
  } /* if */ 
  /* Manage "undefined" */
  iRes = (typeof(Ope0) == "undefined")? 1: -1;
  return(iRes);
} /* F_iLt_Cmp_Key_NCS */

/*-----F_iLt_Cmp_Arr --------------------------------------------------------
*
*/
function F_iLt_Cmp_Arr(P_0, P_1) {
  var Ope0 = S_Coll_Sort[P_0];
  var Ope1 = S_Coll_Sort[P_1];
  var iRes = 0;
  
  if (Ope0 < Ope1) {
     return(-1);
  } /* if */
  if (Ope1 < Ope0) {
     return(1);
  } /* if */
  if (Ope0 == Ope1) {
     return(0);
  } /* if */ 
  /* Manage "undefined" */
  iRes = (typeof(Ope0) == "undefined")? 1: -1;
  return(iRes);
} /* F_iLt_Cmp_Arr */
    
/*-----F_F_iLt_Cmp_Mp_Type --------------------------------------------------------
*
* Test used to sort Column's elements
* 
* $Type.F_F_iLt_Cmp_Mp_Type
*/ 
function F_F_iLt_Cmp_Mp_Type(P_UsrView, P_jFld1, P_fCS)
{
  var XDB0  = P_UsrView.XDB0;
  var aFld1 = P_UsrView.aFld1;  
  var Fld1  = aFld1[P_jFld1];
  var szNm  = Fld1.szNm;
  var jFld0 = Fld1.iPos0;
  var Fld0  = XDB0.aFld0[jFld0];        /* Get the original Field descriptor */
  var F_iLt_Cmp0;

  S_Coll_Sort = XDB0.Coll0;  
  P_fCS ??= $VConfig.F_ValSts_Get("fCaseSens") && Fld1.fCaseSens;
           
  switch (P_UsrView.XDB0.JKndTup0) {
    case C_JKndTup_Arr:{
         S_Key_Sort = jFld0;
         F_iLt_Cmp0 = F_iLt_Cmp_Arr;
         return(F_iLt_Cmp0);
    } break;
    case C_JKndTup_aRcd:{
         S_Key_Sort = jFld0;
    } break;
    case C_JKndTup_asRcd: {
         S_Key_Sort = jFld0;
         if (P_jFld1 == 0) {
           /* Key */           
            F_iLt_Cmp0 = (P_fCS)? F_iLt_Cmp_Key_CS: F_iLt_Cmp_Key_NCS;
            return(F_iLt_Cmp0);
         }
         else {
            /* Field */
            S_Key_Sort = jFld0 - C_iDelta_asRcd; 
         } /* if */
    } break;
    case C_JKndTup_Obj:
    case C_JKndTup_as_: {
         S_Key_Sort = szNm;
    } break;
    case C_JKndTup_aObj: {
         S_Key_Sort = szNm;
    } break;
    case C_JKndTup_asObj: {
         S_Key_Sort = szNm;
         if (P_jFld1 == 0) {
           /* Key */           
            F_iLt_Cmp0 = (P_fCS)? F_iLt_Cmp_Key_CS: F_iLt_Cmp_Key_NCS;
            return(F_iLt_Cmp0);
         }
         else {
            /* Field */ 
         } /* if */
    } break;
    default : {    
         $Error.U_Error(C_jCd_Cur, 1, "Unknown JKndTup", P_JKndTup0);
    } break;
  } /* switch */
  
  var szType_JS = $Type.F_szType_JS(Fld1.szType);
  
  switch (szType_JS) {
    case "string": {
         F_iLt_Cmp0 = (P_fCS)? F_iLt_String_CS: F_iLt_String_NCS;
    } break;
    case "number": {
         F_iLt_Cmp0 = F_iLt_Number;
    } break;
    case "bigint": {
         F_iLt_Cmp0 = F_iLt_BigInt;
    } break;
    case "boolean": {
         F_iLt_Cmp0 = (P_fCS)? F_iLt_String_CS: F_iLt_Boolean;
    } break;
    case "symbol": {             
         $Error.U_Error(C_jCd_Cur, 2, "Symbol", "");
    } break;
    default : {
         F_iLt_Cmp0 = F_iLt_String_CS;
    } break;
  } /* switch */

  return(F_iLt_Cmp0);
} /* F_F_iLt_Cmp_Mp_Type */

/*
*/
var S_szHTML_DBox_Sort = `<div>                                
<br> 
<div id="Id_Div_Sort_1" style="visibility:visible;"> 1 - 
<select id="Id_Sel_Lft1_Sort_1" size="1"></select> 
<select id="Id_Sel_Lft2_Sort_1" size="1"></select>
<select id="Id_Sel_Fld_Sort_1" size="1"></select>
<select id="Id_Sel_Rgt_Sort_1" size="1" onchange="$Sort.U_Sort_Rgt(2, Id_Sel_Rgt_Sort_1.value);"></select>
</div>

<div id="Id_Div_Sort_2" style="visibility:hidden;"> 2 -  
<select id="Id_Sel_Lft1_Sort_2" size="1"></select>   
<select id="Id_Sel_Lft2_Sort_2" size="1"></select> 
<select id="Id_Sel_Fld_Sort_2" size="1"></select>
<select id="Id_Sel_Rgt_Sort_2" size="1" onchange="$Sort.U_Sort_Rgt(3, Id_Sel_Rgt_Sort_2.value);"></select>
</div>

<div id="Id_Div_Sort_3" style="visibility:hidden;"> 3 - 
<select id="Id_Sel_Lft1_Sort_3" size="1"></select>  
<select id="Id_Sel_Lft2_Sort_3" size="1"></select> 
<select id="Id_Sel_Fld_Sort_3" size="1"></select>
<select id="Id_Sel_Rgt_Sort_3" size="1" onchange="$Sort.U_Sort_Rgt(4, Id_Sel_Rgt_Sort_3.value);"></select>
</div>

<div id="Id_Div_Sort_4" style="visibility:hidden;"> 4 - 
<select id="Id_Sel_Lft1_Sort_4" size="1"></select>  
<select id="Id_Sel_Lft2_Sort_4" size="1"></select> 
<select id="Id_Sel_Fld_Sort_4" size="1"></select>
</div>
<br>
</div>`;

/* # ***** Object S_DBox_Sort ***********************************************
*
* Multiple sort.
* The wizard helps users to formulate sort query. 
*/ 
var S_DBox_Sort = (function(){
  var _Cond = {};
  _Cond.U_Open        = U_Open;        // function U_Open(P_Bag);
  _Cond.U_Cancel      = U_Close;       // function U_Close(P_Bag);
  _Cond.U_Confirm     = U_Confirm;     // function U_Confirm(P_Bag);
  _Cond.U_Sort_Rgt    = U_Sort_Rgt;    // function U_Sort_Rgt(P_j, P_szVal);
    
/*-----U_Open --------------------------------------------------------
*  
* $Initialize_Wizard
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  
  if ((XDB0.JKndTup0 == C_JKndTup_Obj) || (XDB0.JKndTup0 == C_JKndTup_as_)) {
     $Error.U_Error(C_jCd_Cur, 3, "Sorry Obj are not supported!", "", false);
  } /* if */
  
  var szHTML_Sel_Lft1 = `
    <option value="CS"  > CS  </option>
    <option value="NCS" > NCS </option>`;
    
  var szHTML_Sel_Lft2 = `
    <option value="ASC("  > ASC ( </option>
    <option value="DESC(" > DESC ( </option>`;
    
  var szHTML_Sel_Rgt = `
    <option value=")"  > )    </option>
    <option value=")+" > ) +  </option>`;
    
   var szHTML_Sel_Fld = "";
   var szKey_Sel = "";
   if ((typeof(UsrView0.Fld_Sel) != "undefined") && (UsrView0.Fld_Sel != null)) {
      szKey_Sel = UsrView0.Fld_Sel.szNm;
   }
   else {
     szKey_Sel = aFld[0].szNm;     /* Select the first field. */
   } /* if */
   
   szHTML_Sel_Fld = F_szHTML_Option_Mp_aObj(aFld, "szNm", szKey_Sel, false, true);

   Id_Sel_Lft1_Sort_1.innerHTML = szHTML_Sel_Lft1;  
   Id_Sel_Lft1_Sort_2.innerHTML = szHTML_Sel_Lft1; 
   Id_Sel_Lft1_Sort_3.innerHTML = szHTML_Sel_Lft1;  
   Id_Sel_Lft1_Sort_4.innerHTML = szHTML_Sel_Lft1;
   
   Id_Sel_Lft2_Sort_1.innerHTML = szHTML_Sel_Lft2;  
   Id_Sel_Lft2_Sort_2.innerHTML = szHTML_Sel_Lft2; 
   Id_Sel_Lft2_Sort_3.innerHTML = szHTML_Sel_Lft2;  
   Id_Sel_Lft2_Sort_4.innerHTML = szHTML_Sel_Lft2;
   
   Id_Sel_Fld_Sort_1.innerHTML = szHTML_Sel_Fld;  
   Id_Sel_Fld_Sort_2.innerHTML = szHTML_Sel_Fld; 
   Id_Sel_Fld_Sort_3.innerHTML = szHTML_Sel_Fld;  
   Id_Sel_Fld_Sort_4.innerHTML = szHTML_Sel_Fld;
   
   Id_Sel_Rgt_Sort_1.innerHTML = szHTML_Sel_Rgt;  
   Id_Sel_Rgt_Sort_2.innerHTML = szHTML_Sel_Rgt; 
   Id_Sel_Rgt_Sort_3.innerHTML = szHTML_Sel_Rgt;    
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{
} /* U_Close */

/*-----F_iCol_Mp_szNmFld --------------------------------------------------------
*
*/ 
function F_iCol_Mp_szNmFld(P_aFld, P_szNmFld)
{
  var iLen1 = P_aFld.length;
  var iPos0 = 0;
  var i;
  for (i = 0; i < iLen1; i++) {
      if (P_szNmFld == P_aFld[i].szNm) {
         // iPos0 = P_aFld[i].iPos0;
         return(i);
      } /* if */
  } /* for */
  return(-1);  // error!
} /* F_iCol_Mp_szNmFld */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var aFld1 = UsrView0.aFld1;
  var aNdx = UsrView0.aNdx;
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  var szSel_Rgt;
  var szCnd = "";
  var iPos1, fCS, fAsc;
  var j = 1;
  var aCnd = [[], [], [], []];    /* Array of conditions. */
  var Cnd0;
  var szNmFld;
  var fInit = true;

  do {
      var Elem_szSel_Lft1 = document.getElementById("Id_Sel_Lft1_Sort_" + j);
      var Elem_szSel_Lft2 = document.getElementById("Id_Sel_Lft2_Sort_" + j);
      var Elem_szSel_Fld  = document.getElementById("Id_Sel_Fld_Sort_"  + j);
      var Elem_szSel_Rgt  = document.getElementById("Id_Sel_Rgt_Sort_"  + j);
      szSel_Rgt = Elem_szSel_Rgt.value;
      Cnd0 = [];      
      Cnd0[0] = Elem_szSel_Lft1.value;
      Cnd0[1] = Elem_szSel_Lft2.value;
      Cnd0[2] = Elem_szSel_Fld.value;      
      aCnd[j-1] = Cnd0;
      szCnd += Cnd0[0] + Cnd0[1] + Cnd0[2] + Elem_szSel_Rgt.value;              /* $DEBUG: make condition as a formula. */
      j++; 
  } while (szSel_Rgt != ")");

  while (--j > 0) {
        Cnd0 = aCnd[j-1]; 
        fCS = (Cnd0[0] == "CS");
        fAsc = (Cnd0[1] == "ASC(");
        szNmFld = Cnd0[2];
        iPos1 = F_iCol_Mp_szNmFld(aFld1, szNmFld);
        U_Sort(iPos1, fAsc, fCS, fInit);
        fInit = false;
  } /* while */

  $Table.U_Display_Table();
} /* U_Confirm */

/*-----U_Sort --------------------------------------------------------
*
*/ 
function U_Sort(P_iPos1, P_fAsc, P_fCS, P_fInit)
{
  var P_UsrView = CL_UsrView0.F_UsrView_Selected();
  
  var jaFld1 = P_iPos1;                                                         /* Position of the Field selected (in UsrView.aFld1). */
  S_fCaseSens = P_fCS;
  P_UsrView.jaFld1 = jaFld1;
  P_UsrView.fAsc = P_fAsc;
  P_UsrView.jaFld1_aNdx = jaFld1;
  P_UsrView.aNdx = P_UsrView.F_aNdx_Make(P_UsrView, jaFld1, P_fCS, P_fInit);    /* Sort index according with the Field selected. */
  P_UsrView.iCol_Sort = -2;                                                     /* -2 = invalid */
} /* U_Sort */

/*-----U_Sort_Rgt --------------------------------------------------------
*
*/ 
function U_Sort_Rgt(P_j, P_szVal)
{
  if (P_szVal != ")") {
     var szId = "Id_Div_Sort_" + P_j;
     var Elem0 = document.getElementById(szId);
     Elem0.style.visibility = "visible";
  }
  else {
    /* hide conditions at right */
    for (let i = P_j; i <= 4; i++) {
         var szId = "Id_Div_Sort_" + i;
         var Elem0 = document.getElementById(szId);
         Elem0.style.visibility = "hidden";
    } /* for */
  } /* if */
} /* U_Sort_Rgt */

  return(_Cond);
})(); /* # END - S_DBox_Sort Object */

/*-----U_Init_Sort --------------------------------------------------------
*
*/ 
function U_Init_Sort()
{
  U_Root0("$Sort", C_jCd_Cur);

  _Sort.U_Sort_Rgt = S_DBox_Sort.U_Sort_Rgt;
  _Sort.DBox_Sort = new CL_DBox("Id_Div_DBox0", "$Sort.DBox_Sort", "Sort Wizard", S_szHTML_DBox_Sort, S_DBox_Sort.U_Open, G_DBox_Null.U_Cancel, S_DBox_Sort.U_Confirm, G_asaMnEntry.Sort, "Sort");  
} /* U_Init_Sort */

  return(_Sort);
})();  /* Sort */
