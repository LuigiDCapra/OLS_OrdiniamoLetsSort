/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Aggreg
* Description : Data Explorer
* Revision    : 0.021
* File        : aggreg.js
* Function    : Aggregate Functions management.
* FirstEdit   : 12/07/2025
* LastEdit    : 09/08/2025
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

/*----- Module $Aggreg --------------------------------------------------------
*
*/ 
const $Aggreg = (function () {
  var _Aggreg = {};
  _Aggreg.U_Init          = U_Init_Aggreg;             // function U_Init_Aggreg();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Aggreg;

/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/

/*
*/
var S_szHTML_DBox_Aggreg = `<div>                                
<br> 
Group By: <select id="Id_Sel_Fld_GroupBy" size="1"></select><br>
<br>
</div>`;

/* # ***** Object S_DBox_Aggreg ***********************************************
*
* Multiple Aggreg.
* The wizard helps users to formulate Aggreg query. 
*/ 
var S_DBox_Aggreg = (function(){
  var _Cond = {};
  _Cond.U_Open        = U_Open;        // function U_Open(P_Bag);
  _Cond.U_Cancel      = U_Close;       // function U_Close(P_Bag);
  _Cond.U_Confirm     = U_Confirm;     // function U_Confirm(P_Bag);
    
/*-----U_Open --------------------------------------------------------
*  
* $Initialize_Wizard
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var aFld = UsrView0.aFld1;
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
  Id_Sel_Fld_GroupBy.innerHTML = szHTML_Sel_Fld;
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
  var szNmFld = Id_Sel_Fld_GroupBy.value;
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var UsrView1 = F_Obj_Clone(UsrView0);
  var XDB0   = UsrView0.XDB0;
  var aNdx   = UsrView0.aNdx;
  var Coll0  = XDB0.Coll0;
  var Coll1  = [];
  var Coll2  = [];
  var iLen0  = Coll0.length;
  var jaFld  = UsrView0.jaFld1;
  var aFld1  = UsrView0.aFld1;
  var iCard_aFld1 = aFld1.length;
  var aaStat0 = {};
  var aStat0 = {};
  var i, j, Tup0, Key1, iLen1, Fld1;
  var Key0 = null;
  var szKey;
  var szNm_Fld;
  var k = -1;
  var iCnt = 0;

  var Fld1 = UsrView0.F_Fld1_Mp_szNmFld(szNmFld);
  jaFld = Fld1.iPos0;
  
  aNdx = UsrView0.F_aNdx_Make(UsrView0, jaFld, true);                   /* Sort index according with the Field selected. */
  UsrView0.aNdx = aNdx;
  UsrView0.jaFld1_aNdx = jaFld;

  /* Make an Inverted Index (Coll1). */
  for (i = 0; i < iLen0; i++) {
      j = aNdx[i];
      Tup0 = Coll0[j];
      Key1 = Tup0[jaFld];
      if (Key0 == Key1) {
         Coll1[k].push(Tup0);
      }
      else {
         k++;
         Coll1[k] = [];
         Coll1[k].push(Tup0);
         Key0 = Key1;
      } /* if */
  } /* for */

  /* Compute statistics for aggregate. */
  for (k = 0; k < Coll1.length; k++) {
      UsrView1.XDB0.Coll0 = Coll1[k];
      szKey = Coll1[k][0][jaFld];
      iCnt += Coll1[k].length; 
      aStat0 = {};
      for (let i = 0; i < iCard_aFld1; i++) {
//      for (let i = 5; i < 6; i++) {
          Fld1 = aFld1[i];
          szNm_Fld = Fld1.szNm;
          aStat0[szNm_Fld] = $Stat_DDJ.F_Stat_Field(UsrView1, i, Fld1); 
      } /* for */      
      aaStat0[szKey] = aStat0;
  } /* for */  
 
//  $LcdLcd.U_Dbg_Sav(aaStat0);

  new CL_XDB(["Aggregate", C_JKndTup_asObj, aaStat0, null, "AutoDetect", "", (C_WwFlag_fOverWrite | C_WwFlag_fDisplay), C_jCd_Cur, C_Bag_UsrView_Dflt]); 
} /* U_Confirm */

  return(_Cond);
})(); /* # END - S_DBox_Aggreg Object */

/*-----U_Init_Aggreg --------------------------------------------------------
*
*/ 
function U_Init_Aggreg()
{
  U_Root0("$Aggreg", C_jCd_Cur);
  _Aggreg.DBox_Aggreg = new CL_DBox("Id_Div_DBox0", "$Aggreg.DBox_Aggreg", "Aggregate Wizard", S_szHTML_DBox_Aggreg, S_DBox_Aggreg.U_Open, G_DBox_Null.U_Cancel, S_DBox_Aggreg.U_Confirm, G_asaMnEntry.Aggreg, "Aggreg"); 
} /* U_Init_Aggreg */

  return(_Aggreg);
})();  /* Aggreg */




































