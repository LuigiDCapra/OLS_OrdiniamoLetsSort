/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : mef.js
* Function    : Collections Merge & Fusion
* FirstEdit   : 20/02/2023
* LastEdit    : 09/11/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2024
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     HTML's Elements print.
*     
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
  
const C_JKndJoin_Inner = 0; /* Inner-join */
const C_JKndJoin_Left  = 1; /* Left-join */
const C_JKndJoin_Right = 2; /* Right-join */
const C_JKndJoin_Outer = 3; /* Outer-join */
const C_JKndJoin_XOR   = 4; /* XOR-join */
  
/*----- Global Variables ---------------------------------------------*/

/*----- Module $MeF --------------------------------------------------------
*
*/ 
const $MeF = (function () {
  var _MeF = {};
  _MeF.U_Init        = U_Init_MeF;     // function U_Init_MeF();
  _MeF.U_Concat      = U_Concat;       // function U_Concat(P_szNmColl0, P_szNmColl1, P_szExtKey);
  _MeF.U_AddCol      = U_AddCol;       // function U_AddCol(P_szNmColl0, P_szNmColl1, P_JKndJoin);
  _MeF.U_Join        = U_Join;         // function U_Join(P_szNmColl0, P_szNmColl1);
  _MeF.U_Set_UsrView_Lft = U_Set_UsrView_Lft;  // function U_Set_UsrView_Lft(P_UsrView_Lft);
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_MeF;

/*----- Local Variables ----------------------------------------------*/

var S_UsrView_Lft;                     /* Left UsrView (in a Join) */
var S_UsrView_Rgt;  
var S_jaFld0_MeF = 0;                  /* Position of the External Key used in U_Join(); */

var S_fNewColl = true;                 /* Create a New Collection vs. modify the existing collections. */

/*
*  Concatenate
*/
var S_szHTML_DBox_Concat = `<div>
<br><br><br><br>Concatenate <span id="Id_Inp_szNmColl_0" style="font-weight: bold;">&nbsp;</span> collection with 
  collection:
  <select id="Id_Inp_szNmColl_1" size="1">
  </select>
  <div id="Id_Div_ExtKey" style="display:none;">
    <br> AS <input type="text" id="Id_Inp_szAS"><br> 
    <br><br> Generate code using the External Key
    <select id="Id_Sel_szExtKey" size="1"></select>
  </div>
  <br><br><br><br>
</div>`;

/*
*  SQL
*/
var S_szHTML_DBox_SQL = `<div>
      <br>
      <br>
      <br>
      <br>
      SELECT &nbsp; &nbsp;&nbsp; <input id="Id_Inp_Select" type="text"><br>
      FROM &nbsp; &nbsp; &nbsp; &nbsp; <input id="Id_Inp_From" type="text"><br>
      WHERE &nbsp; &nbsp; &nbsp; <input id="Id_Inp_Where" type="text"><br>
      GROUP BY <input id="Id_Inp_Group_By" type="text"><br>
      HAVING &nbsp; &nbsp;&nbsp; <input id="Id_Inp_Having" type="text"><br>
      <br>
      <br>
      <br>
      <br>
    </div>`;
/*
*  Add Columns
*/
var S_szHTML_DBox_AddCol = `<div>
<br><br>
<label for="Id_Inp_Opt0">Condition</label> <select id="Id_Inp_Opt0">

    <option value='0'>Inner (L n R)</option>
    <option value='1'>Left  (L U (L n R))</option>
    <option value='2'>Right (L U (L n R))</option>
    <option value='3'>Outer (L U R)</option>
    <option value='4'>XOR   (L ⊕ R)</option>
</select>
<br>
<br><br>Flank <span id="Id_Inp_szNmColl_0" style="font-weight: bold;">&nbsp;</span> collection with 
        <select id="Id_Inp_szNmColl_1" size="1">
        </select> collection.
        <br><br><br><br>
</div>`;

/*--------------------------------------------------------------------*/

/* # ***** Object S_DBox_Concatenate ****************************************************
*
* Filter conditions.
*/ 
var S_DBox_Concatenate = (function(){
  var _Cond = {};
  _Cond.U_Open          = U_Open;        // function U_Open(P_Bag);
  _Cond.U_Cancel        = U_Close;       // function U_Close(P_Bag);
  _Cond.U_Confirm       = U_Confirm;     // function U_Confirm(P_Bag);
    
/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  var Coll0 = UsrView0.XDB0.Coll0;
   
  var szHTML_aOpt_szNmColl = CL_UsrView0.F_szHTML_aOpt_szNmColl();
  document.getElementById("Id_Inp_szNmColl_0").innerText = UsrView0.szNmColl; 
  document.getElementById("Id_Inp_szNmColl_1").innerHTML = szHTML_aOpt_szNmColl;

  if (XDB0.faFld) { 
     Id_Div_ExtKey.style.display = "block";
     szHTML_Option = F_szHTML_Option_Mp_aObj(Coll0, "szNm", -1, false, true);
     Id_Sel_szExtKey.innerHTML = szHTML_Option;   
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
*/ 
function U_Confirm(P_Bag)
{ 
  var szNm0    = Id_Inp_szNmColl_1.value;               /* Name of Data Collection */
  var szExtKey = Id_Sel_szExtKey.value;
  var szAS     = Id_Inp_szAS.value;

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  $MeF.U_Set_UsrView_Lft(UsrView0);
  $MeF.U_Concat(UsrView0.szNmColl, szNm0, szExtKey, szAS);
  $Error.U_Try("$Table.U_Display_Table();"); 
} /* U_Confirm */

  return(_Cond);
})(); /* # END - S_DBox_Concatenate Object */

/* # ***** Object S_DBox_AddCol ****************************************************
*
* Filter conditions.
*/ 
var S_DBox_AddCol = (function(){
  var _Cond = {};
  _Cond.U_Open          = U_Open;        // function U_Open(P_Bag);
  _Cond.U_Cancel        = U_Close;       // function U_Close(P_Bag);
  _Cond.U_Confirm       = U_Confirm;     // function U_Confirm(P_Bag);
    
/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szHTML_aOpt_szNmColl = CL_UsrView0.F_szHTML_aOpt_szNmColl();
  document.getElementById("Id_Inp_szNmColl_0").innerText = UsrView0.szNmColl; 
  document.getElementById("Id_Inp_szNmColl_1").innerHTML = szHTML_aOpt_szNmColl; 
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
  var JKndJoin0 = +document.getElementById("Id_Inp_Opt0").value;
  var szNm0     = document.getElementById("Id_Inp_szNmColl_1").value;               /* Name of Data Collection */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  $MeF.U_AddCol(UsrView0.szNmColl, szNm0, JKndJoin0);

  $Error.U_Try("$Table.U_Display_Table();"); 
} /* U_Confirm */

  return(_Cond);
})(); /* # END - S_DBox_AddCol Object */

/* # ***** Object S_DBox_SQLLike ****************************************************
*
*/ 
var S_DBox_SQLLike = (function(){
  var _Cond = {};
  _Cond.U_Open          = U_Open;        // function U_Open(P_Bag);
  _Cond.U_Cancel        = U_Close;       // function U_Close(P_Bag);
  _Cond.U_Confirm       = U_Confirm;     // function U_Confirm(P_Bag);
    
/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Bag)
{ 
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
} /* U_Confirm */

  return(_Cond);
})(); /* # END - S_DBox_SQLLike Object */

/*-----U_Set_UsrView_Lft --------------------------------------------------------
*
*/ 
function U_Set_UsrView_Lft(P_UsrView_Lft)
{
  S_UsrView_Lft = P_UsrView_Lft;
} /* U_Set_UsrView_Lft */

/*-----U_Concat --------------------------------------------------------
*
* Concatenate Collections.
* 
* Ex.
* Given Coll0 = [[1,'a'],[2,'b'],[3,'c']]; Coll1 = [[3,'d'],[4,'e']]; ==> CollRes = [[1,'a'],[2,'b'],[3,'c'],[3,'d'],[4,'e']];
*/ 
function U_Concat(P_szNmColl0, P_szNmColl1, P_szExtKey = "", P_szAS = "")
{
  var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNmColl0);            /* Left Collection */
  if (!UsrView0) {
     return;
  } /* if */
    
  S_UsrView_Lft = UsrView0;
  var Coll0 = UsrView0.XDB0.Coll0;
  var aFld0 = UsrView0.aFld1;
  var faFld = UsrView0.XDB0.faFld;
  var aFld_Concat = S_UsrView_Lft.XDB0.aFld0;
  var JKndTup0 = S_UsrView_Lft.XDB0.JKndTup0;
  var faRcd = (JKndTup0 == C_JKndTup_aRcd) || (JKndTup0 == C_JKndTup_asRcd);
  var UsrView1; 
  var Coll1;
  var aFld1;
  var CollTmp;
  var jaFld0 = 0; // -1;
  var i, j;

  if (!faFld) {
     UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNmColl1);             /* Right Collection */
     Coll1 = UsrView1.XDB0.Coll0;
     aFld1 = UsrView1.aFld1;  
  }
  else {
    /* Coll0 it is a Fields Descriptor (aFld) */
    UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNmColl1);              /* Right Collection */

    S_UsrView_Lft.fJoin = true;                                                 /* Require the execution of U_Join(); */

    S_UsrView_Rgt = UsrView1;
    CL_as_UsrView_K.U_Insert(P_szAS, UsrView1);    
    UsrView1.szAS = P_szAS;
    
    var XDB1 = UsrView1.XDB0;
    new CL_XDB(["Temp1", C_JKndTup_aObj,  XDB1.aFld0, null, "aFld_aFld", "", C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]);
    UsrView2 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("Temp1");                  /* UsrView2.XDB0.Coll0 - XDB-Layout of the Right Collection */
    Coll1 = UsrView2.XDB0.Coll0;
      
    new CL_XDB(["Temp2", C_JKndTup_aObj,  UsrView2.aFld1, null, "aFld_aFld1", "", C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]);
    UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("Temp2");
    aFld1 = UsrView1.aFld1;     
  } /* if */
   
  var f_JKndTup = (UsrView0.XDB0.JKndTup0 == UsrView1.XDB0.JKndTup0);
  if (!f_JKndTup) {
      $Error.U_Error(C_jCd_Cur, 1, "Collections of different kind cannot be concatenated.", 0, false);
  } /* if */
  
  var iLen0 = aFld0.length;
  var iLen1 = aFld1.length;
  var iNnMatch = iLen0;
  
  for (let i = 0; i < iLen0; i++) {
      if (aFld0[i].szNm != aFld1[i].szNm) {
         /* Layout is different */
         iNnMatch = i;
         break;
      } /* if */
  } /* for */
 
  var f_Layout = (iNnMatch == iLen0);
  if (!f_Layout) {
      $Error.U_Error(C_jCd_Cur, 2, "Layout doesn't match.", 0, false);
  } /* if */
  
  if (P_szExtKey != "") {
     /* Get the position of the External Key */
     for (let i = 0; i < aFld_Concat.length; i++) {
         if (aFld_Concat[i].szNm == P_szExtKey) {
            jaFld0 = i;
         } /* if */
     } /* for */
     S_jaFld0_MeF = jaFld0;  
  } /* if */
  
  switch (UsrView0.XDB0.JKndTup0) {   // ++++ sostituire con $XDB.F_fjCol_Mp_JKndTup()
    case C_JKndTup_Arr:
    case C_JKndTup_aRcd:
    case C_JKndTup_aObj: {
         j = Coll0.length;
         for (i = 0; i < Coll1.length; i++) {
             Coll0[j] = Coll1[i];
             if (faFld) {
                /* If the collection is a fields descriptor initialize defaults.  */
                CollTmp = Coll0[j]; 
                CollTmp.iPos0 = j;
                CollTmp.iPos1 = j;
                CollTmp.fVisible = true;
                CollTmp.fCaseSens = true;
                CollTmp.fRecalc = false;
                CollTmp.szCaption = CollTmp.szNm;
                CollTmp.szCode = "";
             } /* if */
             j++;
         } /* for */
    } break;
    case C_JKndTup_Obj:
    case C_JKndTup_asRcd:
    case C_JKndTup_asObj:
    case C_JKndTup_as_: {
         for (szKey in Coll1) {
             Coll0[szKey] = Coll1[szKey];
         } /* for */
    } break;
    default : {
    } break;
  } /* switch */

  UsrView0 = CL_UsrView0.F_UsrView_Select(P_szNmColl0, (C_WwFlag_fSearchCS));
  $VConfig.U_Set_ValSts("fDistinct", UsrView0.CfgUV0.fDistinct);
  UsrView0.aNdx = UsrView0.F_aNdx_Make(UsrView0, jaFld0);
  
  return(Coll0);
} /* U_Concat */

/*-----U_AddCol --------------------------------------------------------
*
* Fuse Collections adding columns to the right.
* 
* $NOTE;
* Collections must have the same Key.
* The Key in both the collections must be in column zero (0).
* The collections must be sorted in ascending order.
* Tuples with the same Key will be fused adding columns to the right.
* 
* Ex.
* Given Coll0 = [[1,'a'],[2,'b'],[3,'c']]; Coll1 = [[1,'red'],[2,'green'],[4,'blue']]; ==> CollRes = [[1,'a', 'red'],[2,'b', 'green']];  // EquJoin
*/ 
function U_AddCol(P_szNmColl0, P_szNmColl1, P_JKndJoin)
{
  const C_iIni = 0;
  var JKndJoin0 = P_JKndJoin;
  var Coll2, Tuple2, aFld2;
  var jKey0 = (JKndTup0 & 1)? 0: "Key";
  var jKey1 = (JKndTup1 & 1)? 0: "Key";
  var i, k;

  var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNmColl0);
  if (!UsrView0) {
      $Error.U_Error(C_jCd_Cur, 3, "Collection doesn't exists.", P_szNmColl0, false);
  } /* if */

  var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNmColl1);
  if (!UsrView1) {
      $Error.U_Error(C_jCd_Cur, 4, "Collection doesn't exists.", P_szNmColl1, false);
  } /* if */

  var JKndTup0 = UsrView0.XDB0.JKndTup0;
  var JKndTup1 = UsrView1.XDB0.JKndTup0;  
  if (JKndTup0 != JKndTup1) {
      $Error.U_Error(C_jCd_Cur, 5, "Collections of different kind cannot be fused.", 0, false);
  } /* if */
  
  var Coll0  = UsrView0.XDB0.Coll0;
  var Coll1  = UsrView1.XDB0.Coll0;
  var aNdx0  = UsrView0.aNdx;
  var aNdx1  = UsrView1.aNdx;
  var iCard0 = aNdx0.length;
  var iCard1 = aNdx1.length;

  if (iCard0 <= 0) {
     $Error.U_Error(C_jCd_Cur, 6, "Left Collection is Empty.", 0, false);
  } /* if */
  if (iCard1 <= 0) {
     $Error.U_Error(C_jCd_Cur, 7, "Right Collection is Empty.", 0, false);
  } /* if */
    
  var aFld0  = UsrView0.aFld1;
  var j0     = 0;
  var Tuple0 = Coll0[aNdx0[j0++]];
  var Key0   = Tuple0[jKey0];
  var iLen0  = aFld0.length;  

  var aFld1  = UsrView1.aFld1;
  var j1     = 0;
  var Tuple1 = Coll1[aNdx1[j1++]];
  var Key1   = Tuple1[jKey1];
  var iLen1  = aFld1.length;
  var i = 0;
  var j2 = 0;
  var fLoop = true;
  
  /* Fuse layouts */
  aFld2 = F_Obj_Clone(aFld0); 
  aFld1 = F_Obj_Clone(aFld1);
  k = aFld2.length; 
  for (let k1 = 0; k1 < iLen1; k1++) {
      var Fld1 = aFld1[k1];
      Fld1.iPos0 = k;
      Fld1.iPos1 = k;
      aFld2[k] = Fld1;
      k++;
  } /* for */ 
  
  if (JKndTup0 == C_JKndTup_aRcd) {       /* --- aRcd --- */
      Coll2 = [];
      do {
          if (Key0 == Key1) {
             if (P_JKndJoin != C_JKndJoin_XOR) {
                 Tuple2 = F_Obj_Clone(Tuple0);
                 Tuple1 = F_Obj_Clone(Tuple1);
                 for (i = 0; i < iLen1; i++) {
                     Tuple2[iLen0 + i] = Tuple1[i];
                 } /* for */
                 Coll2[j2++] = Tuple2;
             } /* if */
             if (j0 < iCard0) {
                Tuple0 = Coll0[aNdx0[j0++]];
                Key0   = Tuple0[jKey0];
             }
             else {
                fLoop = false;
             } /* if */
             if (j1 < iCard1) {
                Tuple1 = Coll1[aNdx1[j1++]];
                Key1   = Tuple1[jKey1];
             }
             else {
                fLoop = false;
             } /* if */
          }
          else if (Key0 < Key1) {
             if ((P_JKndJoin == C_JKndJoin_Left) || (P_JKndJoin == C_JKndJoin_Outer) || (P_JKndJoin == C_JKndJoin_XOR)) {
                 Tuple2 = F_Obj_Clone(Tuple0);
                 for (i = 0; i < iLen1; i++) {
                     Tuple2[iLen0 + i] = C_Undefined;
                 } /* for */
                 Coll2[j2++] = Tuple2;
             } /* if */
             if (j0 < iCard0) {
                Tuple0 = Coll0[aNdx0[j0++]];
                Key0   = Tuple0[jKey0];
             }
             else {
                fLoop = false;
             } /* if */       
          }
          else if (Key0 > Key1) {
             if ((P_JKndJoin == C_JKndJoin_Right) || (P_JKndJoin == C_JKndJoin_Outer) || (P_JKndJoin == C_JKndJoin_XOR)) {
                 Tuple2 = [];
                 for (i = 0; i < iLen0; i++) {
                     Tuple2[i] = C_Undefined;
                 } /* for */
                 Tuple1 = F_Obj_Clone(Tuple1);
                 for (i = 0; i < iLen1; i++) {
                     Tuple2[iLen0 + i] = Tuple1[i];
                 } /* for */                
                 Coll2[j2++] = Tuple2;
             } /* if */
             if (j1 < iCard1) {
                Tuple1 = Coll1[aNdx1[j1++]];
                Key1   = Tuple1[jKey1];
             }
             else {
                fLoop = false;
             } /* if */
          } /* if */
      } while (fLoop);
  }     
  else if (JKndTup0 == C_JKndTup_aObj) {       /* --- aObj --- */
      Coll2 = [];
      do {
          if (Key0 == Key1) {
             if (P_JKndJoin != C_JKndJoin_XOR) {
                 Tuple2 = F_Obj_Clone(Tuple0);
                 Tuple1 = F_Obj_Clone(Tuple1);
                 for (Key1 in Tuple1) {
                     Tuple2[Key1] = Tuple1[Key1];
                 } /* for */
                 Coll2[j2++] = Tuple2;
             } /* if */
             if (j0 < iCard0) {
                Tuple0 = Coll0[aNdx0[j0++]];
                Key0   = Tuple0[jKey0];
             }
             else {
                fLoop = false;
             } /* if */
             if (j1 < iCard1) {
                Tuple1 = Coll1[aNdx1[j1++]];
                Key1   = Tuple1[jKey1];
             }
             else {
                fLoop = false;
             } /* if */
          }
          else if (Key0 < Key1) {
             if ((P_JKndJoin == C_JKndJoin_Left) || (P_JKndJoin == C_JKndJoin_Outer) || (P_JKndJoin == C_JKndJoin_XOR)) {
                 Tuple2 = F_Obj_Clone(Tuple0);
                 Coll2[j2++] = Tuple2;
             } /* if */
             if (j0 < iCard0) {
                Tuple0 = Coll0[aNdx0[j0++]];
                Key0   = Tuple0[jKey0];
             }
             else {
                fLoop = false;
             } /* if */       
          }
          else if (Key0 > Key1) {
             if ((P_JKndJoin == C_JKndJoin_Right) || (P_JKndJoin == C_JKndJoin_Outer) || (P_JKndJoin == C_JKndJoin_XOR)) {
                 Tuple1 = F_Obj_Clone(Tuple1);             
                 Coll2[j2++] = Tuple1;
             } /* if */
             if (j1 < iCard1) {
                Tuple1 = Coll1[aNdx1[j1++]];
                Key1   = Tuple1[jKey1];
             }
             else {
                fLoop = false;
             } /* if */
          } /* if */
      } while (fLoop);
  } 
  else if (JKndTup0 == C_JKndTup_asRcd) {       /* --- asRcd--- */
      Coll2 = {};
      switch (P_JKndJoin) {
        case C_JKndJoin_Inner: {
             Coll2 = {};
             for (Key0 in Coll0) {
                 Tuple1 = Coll1[Key0];
                 if (Tuple1) {
                    Tuple0 = Coll0[Key0];
                    Tuple2 = F_Obj_Clone(Tuple0);
                    Tuple1 = F_Obj_Clone(Tuple1);
                    for (i = 0; i < iLen1; i++) {
                        Tuple2[iLen0 + i] = Tuple1[i];
                    } /* for */
                    Coll2[Key0] = Tuple2;
                 } /* if */
             } /* for */
        } break;
        case C_JKndJoin_Left: {
             Coll2 = F_Obj_Clone(Coll0);
             for (Key0 in Coll0) {
                 Tuple2 = Coll2[Key0];
                 Tuple1 = Coll1[Key0];
                 if (Tuple1) {
                    Tuple1 = F_Obj_Clone(Tuple1);
                    for (i = 0; i < iLen1; i++) {
                        Tuple2[iLen0 + i] = Tuple1[i];
                    } /* for */
                    Coll2[Key0] = Tuple2;
                 } /* if */
             } /* for */
        } break;
        case C_JKndJoin_Right: {
             Coll2 = {};
             for (Key0 in Coll1) {
                 Tuple0 = Coll0[Key0];
                 Tuple1 = F_Obj_Clone(Coll1[Key0]);
                 if (Tuple0) {
                    Tuple2 = F_Obj_Clone(Coll0[Key0]);
                    for (i = 0; i < iLen1; i++) {
                        Tuple2[iLen0 + i] = Tuple1[i];
                    } /* for */
                    Coll2[Key0] = Tuple2;                 
                 }
                 else {
                    Tuple2 = [];
                    for (i = 0; i < iLen0; i++) {
                        Tuple2[i] = C_Undefined;
                    } /* for */
                    for (i = 0; i < iLen1; i++) {
                        Tuple2[iLen0 + i] = Tuple1[i];
                    } /* for */
                    Coll2[Key0] = Tuple2;
                 } /* if */
             } /* for */
        } break;
        case C_JKndJoin_Outer: {
             Coll2 = F_Obj_Clone(Coll0);
             for (Key0 in Coll0) {
                 Tuple2 = Coll2[Key0];
                 Tuple1 = Coll1[Key0];
                 if (Tuple1) {
                    Tuple1 = F_Obj_Clone(Tuple1);
                    for (i = 0; i < iLen1; i++) {
                        Tuple2[iLen0 + i] = Tuple1[i];
                    } /* for */
                    Coll2[Key0] = Tuple2;
                 } /* if */
             } /* for */
             
             for (Key1 in Coll1) {
                 Tuple2 = Coll2[Key1];
                 if (!Tuple2) {
                    Tuple2 = [];
                    Tuple1 = Coll1[Key1];
                    for (i = 0; i < iLen0; i++) {
                        Tuple2[i] = C_Undefined;
                    } /* for */
                    Tuple1 = F_Obj_Clone(Tuple1);
                    for (i = 0; i < iLen1; i++) {
                        Tuple2[iLen0 + i] = Tuple1[i];
                    } /* for */
                    Coll2[Key0] = Tuple2;
                 } /* if */
             } /* for */
        } break;
        case C_JKndJoin_XOR: {
             for (Key0 in Coll0) {
                 if (!Coll1[Key0]) {
                    Tuple2 = F_Obj_Clone(Coll0[Key0]);
                    for (i = 0; i < iLen1; i++) {
                        Tuple2[iLen0 + i] = C_Undefined;
                    } /* for */
                    Coll2[Key0] = Tuple2;
                 } /* if */
             } /* for */
             for (Key1 in Coll1) {
                 if (!Coll0[Key1]) {
                    Tuple2 = [];
                    Tuple1 = F_Obj_Clone(Coll1[Key1]);
                    for (i = 0; i < iLen0; i++) {
                        Tuple2[i] = C_Undefined;
                    } /* for */
                    for (i = 0; i < iLen1; i++) {
                        Tuple2[iLen0 + i] = Tuple1[i];
                    } /* for */
                    Coll2[Key1] = Tuple2;
                 } /* if */
             } /* for */
        } break;
        default : {
        } break;
      } /* switch */  
  } 
  else if (JKndTup0 == C_JKndTup_asObj) {       /* --- asObj --- */
      Coll2 = {};
      switch (P_JKndJoin) {
        case C_JKndJoin_Inner: {
             Coll2 = {};
             for (Key0 in Coll0) {
                 Tuple0 = Coll0[Key0];
                 Tuple1 = Coll1[Key0];
                 if (Tuple1) {
                    Tuple2 = F_Obj_Clone(Tuple0);
                    Tuple1 = F_Obj_Clone(Tuple1);
                    for (Key1 in Tuple1) {
                        Tuple2[Key1] = Tuple1[Key1];
                    } /* for */
                    Coll2[Key0] = Tuple2;
                 } /* if */
             } /* for */
        } break;
        case C_JKndJoin_Left: {
             Coll2 = F_Obj_Clone(Coll0);
             for (Key0 in Coll2) {
                 Tuple2 = Coll2[Key0];
                 Tuple1 = Coll1[Key0];
                 if (Tuple1) {
                    Tuple1 = F_Obj_Clone(Tuple1);
                    for (Key1 in Tuple1) {
                        Tuple2[Key1] = Tuple1[Key1];
                    } /* for */
                 } /* if */
             } /* for */
        } break;
        case C_JKndJoin_Right: {
             Coll2 = F_Obj_Clone(Coll1);
             for (Key0 in Coll2) {
                 Tuple2 = Coll2[Key0];
                 Tuple0 = Coll0[Key0];
                 if (Tuple0) {
                    Tuple0 = F_Obj_Clone(Tuple0);
                    for (Key0 in Tuple0) {
                        Tuple2[Key0] = Tuple0[Key0];
                    } /* for */
                 } /* if */
             } /* for */
        } break;
        case C_JKndJoin_Outer: {
             Coll2 = F_Obj_Clone(Coll0);
             for (Key0 in Coll2) {
                 Tuple2 = Coll2[Key0];
                 Tuple1 = Coll1[Key0];
                 if (Tuple1) {
                    Tuple1 = F_Obj_Clone(Tuple1);
                    for (Key1 in Tuple1) {
                        Tuple2[Key1] = Tuple1[Key1];
                    } /* for */
                 } /* if */
             } /* for */
             for (Key1 in Coll1) {
                 Tuple2 = Coll2[Key1];
                 if (!Tuple2) {
                    Tuple2 = F_Obj_Clone(Coll1[Key1]);
                    Coll2[Key1] = Tuple2;
                 } /* if */
             } /* for */
        } break;
        case C_JKndJoin_XOR: {
             for (Key0 in Coll0) {
                 if (!Coll1[Key0]) {
                    Tuple2 = F_Obj_Clone(Coll0[Key0]);
                    Coll2[Key0] = Tuple2;
                 } /* if */
             } /* for */
             for (Key1 in Coll1) {
                 if (!Coll0[Key1]) {
                    Tuple2 = F_Obj_Clone(Coll1[Key1]);
                    Coll2[Key1] = Tuple2;
                 } /* if */
             } /* for */
        } break;
        default : {
        } break;
      } /* switch */
  } else {
      $Error.U_Error(C_jCd_Cur, 8, "Not implemented yet.", 0, false);
  } /* if */

  P_szNmColl0 = P_szNmColl0 + "+" + P_szNmColl1;
  var sz_aFld = "aFld_" + P_szNmColl0;
  new CL_XDB0([sz_aFld, C_JKndTup_aObj, aFld2, null, "aFld_aFld", "aFld New.", C_WwFlag_Null, C_jCd_Cur]);
  var UsrView2 = new CL_XDB([P_szNmColl0, JKndTup0,  Coll2, aFld2, sz_aFld, "Collection New.", C_WwFlag_fDisplay, C_jCd_Cur, C_Bag_UsrView_Dflt]);
} /* U_AddCol */


/*-----U_Join --------------------------------------------------------
*
* Join the left Collection with the Right Collection inserting the values of the fields of the right collection in the left Collection.
*/ 
function U_Join()
{
} /* U_Join */

/*-----U_Init_MeF --------------------------------------------------------
*
*/ 
function U_Init_MeF()
{
  U_Root0("$MeF", C_jCd_Cur);
  
  _MeF.DBox_Concat = new CL_DBox("Id_Div_DBox0", "$MeF.DBox_Concat",  "Concatenate",     S_szHTML_DBox_Concat, S_DBox_Concatenate.U_Open, G_DBox_Null.U_Cancel, S_DBox_Concatenate.U_Confirm, G_asaMnEntry.Concat, "Concat");
  _MeF.DBox_AddCol = new CL_DBox("Id_Div_DBox0", "$MeF.DBox_AddCol",  "Add Columns",     S_szHTML_DBox_AddCol, S_DBox_AddCol.U_Open,      G_DBox_Null.U_Cancel, S_DBox_AddCol.U_Confirm,      G_asaMnEntry.AddCol, "AddCol");  
  _MeF.DBox_SQL    = new CL_DBox("Id_Div_DBox0", "$MeF.DBox_SQL",     "Query SQL like",  S_szHTML_DBox_SQL,    S_DBox_SQLLike.U_Open,     G_DBox_Null.U_Cancel, S_DBox_SQLLike.U_Confirm,     G_asaMnEntry.SQL,    "SQL");    
} /* U_Init_MeF */

  return(_MeF);
})();  /* MeF */
  
/*-----U_JOIN --------------------------------------------------------
*
*/ 
function U_JOIN(P_0, P_1, P_2, P_3)
{
  var aUsrView = [];
  var aColl = [];

  aUsrView[0] = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_0);
  aUsrView[1] = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_1);
  aUsrView[2] = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_2);
  aUsrView[3] = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_3);
  
  aColl[0] = aUsrView[0].XDB0.Coll0;
  aColl[1] = aUsrView[1].XDB0.Coll0;
  aColl[2] = aUsrView[2].XDB0.Coll0;
  aColl[3] = aUsrView[3].XDB0.Coll0;
  aColl[4] = [0,0,0,0];
  
  var UsrView0 = aUsrView[0];
  var UsrView1 = aUsrView[1];
  
  var Coll0  = [];
  var Coll1  = aUsrView[1].XDB0.Coll0;
  var Coll2  = aUsrView[2].XDB0.Coll0;
  var Coll3  = aUsrView[3].XDB0.Coll0;
  
  var aFld0  = UsrView0.aFld1;
  var iLen0  = aFld0.length;
  var iLen1  = Coll1.length;
  var i, j, j0, j1, j2, j3, Tuple0, Tuple1, aaa, bbb, szNm_aFld, j_aUsrView, szNm_Key, szKey;
  var aj0 = [];
  var aj1 = [];
  var aj2 = [];
  var aj3 = [];
  
  var ajk2 = {};
  var ajk3 = {};
  
  for (i = 0; i < Coll2.length; i++) {
      szKey = Coll2[i][0];
      ajk2[szKey] = i;
  } /* for */
  
  for (i = 0; i < Coll3.length; i++) {
      szKey = Coll3[i][0];
      ajk3[szKey] = i;
  } /* for */

  for (j = 0; j < iLen0; j++) {
     j_aUsrView = aFld0[j].aaa;
     aj0[j] = +j_aUsrView;
     aj1[j] = 0;
     szNm_aFld = aFld0[j].bbb;
     aj2[j] = F_j_Mp_szNm(aUsrView[j_aUsrView], szNm_aFld);
     szNm_Key = aFld0[j].kkk;
     aj3[j] = F_j_Mp_szNm(aUsrView[1], szNm_Key); 
  } /* for */
  
  for (i = 0; i < iLen1; i++) {
      Tuple0 = [];
      Tuple1 = Coll1[i];
      for (j = 0; j < iLen0; j++) {
          j0 = aj0[j];
          j2 = aj2[j];
          if (j0 > 1) {
             j3 = aj3[j];
             szKey = Tuple1[j3];
             j1 = (j0 == 2)? ajk2[szKey]: ajk3[szKey];
             Tuple0[j] = aColl[j0][j1][j2];          
          }
          else {
             Tuple0[j] = Tuple1[j2];
          } /* if */
      } /* for */
      
      Coll0[i] = Tuple0;
  } /* for */
  
 // debugger;
  
  UsrView0.XDB0.Coll0 = Coll0;
  
  UsrView0.aNdx = UsrView0.F_aNdx_Make(UsrView0, -1);
  CL_UsrView0.F_UsrView_Select(P_0, C_WwFlag_fDisplay);
} /* U_JOIN */

/*-----F_j_Mp_szNm --------------------------------------------------------
*
*/ 
function F_j_Mp_szNm(P_aUsrView, P_szNm)
{
  if (P_aUsrView == C_Undefined) {
      return(0);
  } /* if */
  var aFld1 = P_aUsrView.aFld1;
  var iLen0 = aFld1.length;
  var i;

  for (i = 0; i < iLen0; i++) {
      if (P_szNm == aFld1[i].szNm) {
         return(i);
      } /* if */
  } /* for */
  return(-1);
} /* F_j_Mp_szNm */


























  