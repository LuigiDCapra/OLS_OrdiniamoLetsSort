/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : card.js
* Function    : Card Editing
* FirstEdit   : 15/12/2019
* LastEdit    : 22/12/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Represents the given data collection as a set of Cards supporting data browsing.
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

const C_jOpt_Confirm_Edit   = 1;
const C_jOpt_Confirm_New    = 2;
const C_jOpt_Confirm_Flt    = 3;
const C_jOpt_Confirm_Copy   = 4;
const C_jOpt_Confirm_Paste  = 5;
const C_jOpt_Confirm_Panel  = 6;

/*----- Global Variables ---------------------------------------------*/

/*----- Module $Card --------------------------------------------------------
*
*/ 
const $Card = (function () {
  var _Card = {};
  _Card.U_Init            = U_Init_Card;       // function U_Init_Card();

  _Card.U_OpenCard        = U_OpenCard;        // function U_OpenCard(P_XDB, P_jOpt_Confirm);

  _Card.U_ConfirmCard_New = U_ConfirmCard_New; // function U_ConfirmCard_New();
  _Card.U_ConfirmCard_Edt = U_ConfirmCard_Edt; // function U_ConfirmCard_Edt();
  _Card.U_ConfirmCard_Flt = U_ConfirmCard_Flt; // function U_ConfirmCard_Flt(); 
  _Card.U_ConfirmPanel    = U_ConfirmPanel;    // function U_ConfirmPanel();  
  _Card.U_Cancel_New      = U_Cancel_New;      // function U_Cancel_New();
  _Card.U_Cancel_Edt      = U_Cancel_Edt;      // function U_Cancel_Edt();
  _Card.U_Cancel_Panel    = U_Cancel_Panel;    // function U_Cancel_Panel();

  _Card.U_Cancel          = U_Cancel;          // function U_Cancel();
  _Card.U_Confirm         = U_Confirm;         // function U_Confirm();
  
  _Card.U_First_Cell      = U_First_Cell;      // function U_First_Cell();
  _Card.U_Prev_Cell       = U_Prev_Cell;       // function U_Prev_Cell();
  _Card.U_Next_Cell       = U_Next_Cell;       // function U_Next_Cell();
  _Card.U_Last_Cell       = U_Last_Cell;       // function U_Last_Cell();
  _Card.U_Goto_Cell       = U_Goto_Cell;       // function U_Goto_Cell(P_jaFld1);
  _Card.U_Input           = U_Input;           // function U_Input();

  _Card.U_New_Tup         = U_New_Tup;         // function U_New_Tup();  
  _Card.U_Clear_Tup       = U_Clear_Tup;       // function U_Clear_Tup();
  _Card.U_ReLoad_Tup      = U_ReLoad_Tup;      // function U_ReLoad_Tup();
  _Card.U_Copy_Tup        = U_Copy_Tup;        // function U_Copy_Tup();
  _Card.U_Paste_Tup       = U_Paste_Tup;       // function U_Paste_Tup();
  _Card.U_Save_Tup        = U_Save_Tup;        // function U_Save_Tup();
  _Card.U_Read_Tup        = U_Read_Tup;        // function U_Read_Tup();
  _Card.U_ShutUp          = U_ShutUp;          // function U_ShutUp();
  _Card.U_ToggleType      = U_ToggleType;      // function U_ToggleType();
  _Card.U_ToggleRO        = U_ToggleRO;        // function U_ToggleRO();  
  _Card.DBox_NewTup       = S_NewTup;
  _Card.DBox_EdtTup       = S_EdtTup;
  _Card.DBox_Panel        = S_Panel;
  
  _Card.F_Tup_Selection   = F_Tup_Selection;   // function F_Tup_Selection(P_jTup, P_fUpd) 
  _Card.U_ClearFilter     = U_ClearFilter;     // function U_ClearFilter();
    
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Card;
const C_iDelta = 1;
  
/*----- Local Variables ----------------------------------------------*/

var S_NewTup   = {};
var S_EdtTup   = {};
var S_Panel    = {};

/*
*  Edit Card.  See: U_OpenCard_Edt, U_OpenCard_Flt, U_OpenCard_New.
*/
var S_szHTML_DBox_Card = `<div>
  <fieldset><legend id="Id_szNmColl_Card"></legend> 
   <table class="Cl_Dbg" border="0" width="100%">
     <tbody id="Id_Tbl3">
        <tr><td>.</td></tr>
     </tbody>
   </table>
  </fieldset>
  <br>
</div>`; 
  
/*--------------------------------------------------------------------*/

/*-----U_ClearFilter --------------------------------------------------------
*
*/ 
function U_ClearFilter()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  UsrView0.U_Clear_Filter(true);
  F_Tup_Selection(C_jTup_Fst);
} /* U_ClearFilter */

/*-----F_Tup_Selection --------------------------------------------------------
*
*
*/ 
function F_Tup_Selection(P_jTup, P_fUpd)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var jaNdx_Item_0 = UsrView0.jaNdx_Sel;
  var jaNdx_Sel  = UsrView0.jaNdx_Sel;
  var aNdx     = UsrView0.F_aNdx();
  var iCard    = aNdx.length;
  
  if (0 <= P_jTup) {
     jaNdx_Sel = P_jTup;
  }
  else {
     if (UsrView0.fAsc) {       
        switch (P_jTup) {
          case C_jTup_Prv: {
               jaNdx_Sel--;
          } break;
          case C_jTup_Nxt: {
               jaNdx_Sel++;
          } break;
          case C_jTup_Fst: {
               jaNdx_Sel = 0;
          } break;
          case C_jTup_Lst: {
               jaNdx_Sel = iCard -1;
          } break;
          default : {
               $Error.U_Error(C_jCd_UsrView, 1, "Tup Selection", "", false);
          } break;
        } /* switch */  
     }
     else {     
        switch (P_jTup) {
          case C_jTup_Prv: {
               jaNdx_Sel++;
          } break;
          case C_jTup_Nxt: {
               jaNdx_Sel--;
          } break;
          case C_jTup_Fst: {
               jaNdx_Sel = iCard;
          } break;
          case C_jTup_Lst: {
               jaNdx_Sel = 0;
          } break;
          default : {
               $Error.U_Error(C_jCd_UsrView, 2, "Tup Selection", "", false);
          } break;
        } /* switch */
     } /* if */                     
  } /* if */
  
  if (jaNdx_Sel < 0) {
     jaNdx_Sel = 0;
     $Error.U_Beep();
  } /* if */
  if (iCard <= jaNdx_Sel) {
     jaNdx_Sel = iCard -1;
     $Error.U_Beep();
  } /* if */
  UsrView0.jaNdx_Sel = jaNdx_Sel;  
  UsrView0.KeyTup = aNdx[jaNdx_Sel]; 
  XDB0.Tup_Sel = XDB0.Coll0[UsrView0.KeyTup];

  if (P_fUpd) {
     /* Update DBox showing the Tuple selected. */
     U_OpenCard(XDB0, C_jOpt_Confirm_Edit);
  } /* if */  
} /* F_Tup_Selection */

/*-----U_New_Tup --------------------------------------------------------
*
*/ 
function U_New_Tup()
{
  if (!CL_UsrView0.F_fReadOnly()) {
     $Card.DBox_NewTup.U_Hub(C_JPnl_Open);
  }
  else {
     $Error.U_Error(C_jCd_Cur, 3, "NEW is not allowed because the Collection is Read Only.", "", false);
  } /* if */
} /* U_New_Tup */

/*-----U_Clear_Tup --------------------------------------------------------
*
*/ 
function U_Clear_Tup()
{
  if (!CL_UsrView0.F_fReadOnly()) {
      var UsrView0 = CL_UsrView0.F_UsrView_Selected();
      var XDB0 = UsrView0.XDB0;
      
      U_OpenCard(XDB0, C_jOpt_Confirm_New);  
  }
  else {
     $Error.U_Error(C_jCd_Cur, 4, "Clear is not allowed because the Collection is Read Only.", "", false);
  } /* if */
} /* U_Clear_Tup */

/*-----U_ReLoad_Tup --------------------------------------------------------
*
*/ 
function U_ReLoad_Tup()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  
  U_OpenCard(XDB0, C_jOpt_Confirm_Edit);
} /* U_ReLoad_Tup */

/*-----U_Copy_Tup --------------------------------------------------------
*
*/ 
function U_Copy_Tup()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  XDB0.Tup_Copy = F_Obj_Clone(XDB0.Tup_Sel);
  alert("saved");
} /* U_Copy_Tup */

/*-----U_Paste_Tup --------------------------------------------------------
*
*/ 
function U_Paste_Tup()
{
  if (!CL_UsrView0.F_fReadOnly()) {
      var UsrView0 = CL_UsrView0.F_UsrView_Selected();
      var XDB0 = UsrView0.XDB0;
      
      var TupCopy = XDB0.Tup_Copy; 
     
      U_OpenCard(XDB0, C_jOpt_Confirm_Paste);  
  }
  else {
     $Error.U_Error(C_jCd_Cur, 5, "Paste is not allowed because the Collection is Read Only.", "", false);
  } /* if */
} /* U_Paste_Tup */

/*-----U_Save_Tup --------------------------------------------------------
*
*/ 
function U_Save_Tup()
{
  ALERT("SAVE");
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  UsrView0.ElemPrv = $Table.F_ElemPrv();
  UsrView0.U_ConfirmCard(UsrView0, C_jOpt_Confirm_Edit);
} /* U_Save_Tup */

/*-----U_Read_Tup --------------------------------------------------------
*
* Trigger Speach prepared in value.js using U_Prepare_Speech();
*/ 
function U_Read_Tup()
{
  $TTS.U_Prepare_Speech("", false, true); 
} /* U_Read_Tup */

/*-----U_ShutUp --------------------------------------------------------
*
*/ 
function U_ShutUp()
{
  $TTS.U_Stop_TTS();
} /* U_ShutUp */

/*-----U_ToggleType --------------------------------------------------------
*
* Toggle Type display.
*/ 
function U_ToggleType()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var fVal = $Value.F_fType_Show_Toggle();

  var szTxt = (fVal)? "Type showing enabled.": "Type showing disabled.";
  $TTS.U_Speak(szTxt);  
  U_OpenCard(XDB0, C_jOpt_Confirm_Edit);
} /* U_ToggleType */

/*-----U_ToggleRO--------------------------------------------------------
*
* Try to toggle UsrView.fReadOnly flag
*/ 
function U_ToggleRO()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var fReadOnly = !CL_UsrView0.F_fReadOnly();
  CL_UsrView0.U_ReadOnly(fReadOnly);

  var szTxt = (fReadOnly)? "Collection set Read Only.": "Collection set Read/Write.";
  $TTS.U_Speak(szTxt);
   
  U_OpenCard(XDB0, C_jOpt_Confirm_Edit);
} /* U_ToggleRO */

/*-----U_OpenCard_New --------------------------------------------------------
*
*/ 
function U_OpenCard_New()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  U_OpenCard(XDB0, C_jOpt_Confirm_New);
} /* U_OpenCard_New */

/*-----U_OpenCard_Edit --------------------------------------------------------
*
*/ 
function U_OpenCard_Edit(P_Box)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  var fCustom = (P_Box)? P_Box[1]: false;
  U_OpenCard(XDB0, C_jOpt_Confirm_Edit, fCustom);
} /* U_OpenCard_Edit */

/*-----U_OpenCard_Panel --------------------------------------------------------
*
*/ 
function U_OpenCard_Panel(P_Box)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var fCustom = (P_Box)? P_Box[1]: false;
  U_OpenCard(XDB0, C_jOpt_Confirm_Panel, fCustom);
} /* U_OpenCard_Panel */

/* ----- U_OpenCard ------------------------------------------------------------
*
* Open a card (DBox) to edit the selected Tuple.
*
*/
function U_OpenCard(P_XDB, P_jOpt_Confirm, P_fCustom) {
  U_Reset_Cell();  /* Reset S_iCnt */
  U_EditCard(P_XDB, P_jOpt_Confirm, P_fCustom);
} /* U_OpenCard */

/*-----U_EditCard --------------------------------------------------------
*
*/ 
function U_EditCard(P_XDB, P_jOpt_Confirm, P_fCustom=false)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  var szKey = UsrView0.KeyTup;
  var iCard = UsrView0.F_aNdx().length;
  var jTupCur = UsrView0.jaNdx_Sel;
  var szRowEdt;
  var fReadOnly = false;

  switch (P_jOpt_Confirm) {
    case C_jOpt_Confirm_Edit: {
         let szTmp   = (UsrView0.fRC)? "Row ": "Column";
         let szInput =  `<input id="Id_PosA" type="number" value=${jTupCur} onchange="Id_PosB.value = Id_PosA.value;" min=0 max=${iCard}>/${iCard}&nbsp; <input id="Id_PosB" type="range" value=${jTupCur} onchange="Id_PosA.value = Id_PosB.value;" min=0 max=${iCard -1}> `;
         szRowEdt = `<tr><td><label for="Id_PosA" title="Position of the current Tuple in the index.">${szTmp}</label</td><td>${szInput} <button onclick="$Card.F_Tup_Selection(Id_PosA.value, true);" title="Show the selected Tuple.">GOTO</button></td></td>`;
         fReadOnly = UsrView0.fReadOnly;
    } break;
    case C_jOpt_Confirm_New: {
         szRowEdt = "NEW";
    } break;
    case C_jOpt_Confirm_Flt: {
         szRowEdt = "Filter";
    } break;
    case C_jOpt_Confirm_Panel: {
         let szTmp   = (UsrView0.fRC)? "Row ": "Column";
         let szInput =  `<input id="Id_PosA" type="number" value=${jTupCur} onchange="Id_PosB.value = Id_PosA.value;" min=0 max=${iCard}>/${iCard}&nbsp; <input id="Id_PosB" type="range" value=${jTupCur} onchange="Id_PosA.value = Id_PosB.value;" min=0 max=${iCard -1}> `;
         szRowEdt = ``;
         fReadOnly = UsrView0.fReadOnly;
    } break;
    default : {
         szRowEdt = "Error";
    } break;
  } /* switch */
  CL_UsrView0.U_ReadOnly(UsrView0.fReadOnly);
  
  var Collect1 = XDB0.Coll0;
  var szId_Tbl_Card = UsrView0.szId_Tbl_Card;
  $OPrn.U_Ins_Elem(szId_Tbl_Card);  
  $OPrn.U_Prn_Elem("", true);
  
  var aFld = UsrView0.aFld1; 
  var iCard_aRec = Collect1.length;
  var iCard_aFld = aFld.length;
  var szHTML_Card = "";
  
  if (!XDB0.Tup_Sel && (P_jOpt_Confirm != C_jOpt_Confirm_New) && (P_jOpt_Confirm != C_jOpt_Confirm_Flt) && (P_jOpt_Confirm != C_jOpt_Confirm_Panel)) {
     if (XDB0.JKndTup0 > C_JKndTup_Obj) {
         $Error.U_Error(C_jCd_Cur, 6, "No Tuple selected.", "", false);
     }
     else {
/*
* $NOTE:
*   if JKndTup0 == JKndTup_Arr or JKndTup0 == JKndTup_Obj the previous test could failed. 
*   if the element of the array or object has a boolean value "false" or an integer value zero!!! 
*/
     debugger;
        var Val0 = XDB0.Tup_Sel;
        var szType0 = typeof(Val0);
        var f0 = (szType0 == "number") && (Val0 == 0);
        var f1 = (szType0 == "boolean") && (Val0 == false); 

        if (!(f0 || f1)) {
           $Error.U_Error(C_jCd_Cur, 7, "No Tuple selected.", XDB0.Tup_Sel, false);
        } /* if */
     } /* if */
  } /* if */
  
  $Value.U_Set_fLoad0(P_jOpt_Confirm == C_jOpt_Confirm_Edit);
  if (P_fCustom) {
     szHTML_Card = XDB0.OLS_Ld.szCodeCard;
  }
  else {
     szHTML_Card = szRowEdt + "\n" + UsrView0.F_szHTML_OpenCard(UsrView0, P_jOpt_Confirm, fReadOnly);   /* Insert <input> for fields. */
  } /* if */
//  $LcdLcd.U_Write("r:/szHTML_Card.txt", szHTML_Card, false);   // +++

  $OPrn.U_Prn_Elem(szHTML_Card, false);
  $OPrn.U_Upd_Elem(szId_Tbl_Card, true);

  /* -2 because -1 = "unsorted" */  
  UsrView0.iCol_Sort = -2;        /* Force index recalc. */; 
} /* U_EditCard */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm()
{
  var szSCtx = $SemCtx.F_szSCtx_Cur();

  switch (szSCtx) {
    case "Card" : {
          $Card.DBox_EdtTup.U_Hub(C_JPnl_Confirm);
    } break;
    case "InpVal": {
          $Value.DBox_InpVal.U_Hub(C_JPnl_Confirm);
    } break;
    case "SetReset": {
          $Value.DBox_SetReset.U_Hub(C_JPnl_Confirm);
    } break;
    case "Filter_JS": {
          $Filter.DBox_FilterJS.U_Hub(C_JPnl_Confirm);
    } break;
    case "Filter_Str": {
          $Filter.DBox_FilterStr.U_Hub(C_JPnl_Confirm);
    } break;
    case "Filter_QBE": {
          $Filter.DBox_Flt_QBE.U_Hub(C_JPnl_Confirm);
    } break;
    case "Filter_2": {
          $Filter.DBox_Filter2.U_Hub(C_JPnl_Confirm);
    } break;
    case "Plot": {
          $Plot.DBox_Draw.U_Hub(C_JPnl_Confirm);
    } break;
    case "Chart": {
          G_DBox0.U_Hub(C_JPnl_Confirm);          
    } break;
    case "About": {
            $DDJ.DBox_About.U_Hub(C_JPnl_Cancel);
    } break;
    default : {
          $Card.DBox_EdtTup.U_Hub(C_JPnl_Confirm);
    } break;
  } /* switch */
} /* U_Confirm */

/*-----U_ConfirmCard_Edt -----------------------------------------------------------
*
* Save changes.
*/ 
function U_ConfirmCard_Edt()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;

  if (!UsrView0.fReadOnly) {
     UsrView0.ElemPrv = $Table.F_ElemPrv();
     UsrView0.U_ConfirmCard(UsrView0, C_jOpt_Confirm_Edit);

     $Table.U_Display_Table();    /* Refresh Table painting changes. */

     var jaNdx_Sel = UsrView0.jaNdx_Sel;
     $Table.U_Scroll(jaNdx_Sel +1);
  }
  else {
     $Error.U_Warning(C_jCd_Cur, 12, "Read Only!", "");
  } /* if */
} /* U_ConfirmCard_Edt */

/*-----U_ConfirmCard_New -----------------------------------------------------------
*
* Save changes.
*/ 
function U_ConfirmCard_New()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;

  if (!UsrView0.fReadOnly) {
     UsrView0.ElemPrv = $Table.F_ElemPrv();
     UsrView0.U_ConfirmCard(UsrView0, C_jOpt_Confirm_New);
     let fAgain = true;     
     this.fAgain = fAgain;
     if (fAgain) {
//        $DBox.U_SetAgain(); /* Re-open the DBox allowing the introduction of another record. */
     }
     else {
        $Table.U_Display_Table(); 
     } /* if */
  }
  else {
     $Error.U_Warning(C_jCd_Cur, 13, "Read Only!", "");
  } /* if */
} /* U_ConfirmCard_New */

/*-----U_ConfirmCard_Flt -----------------------------------------------------------
*
* Save changes.
*/ 
function U_ConfirmCard_Flt()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  
  UsrView0.U_ConfirmCard(UsrView0, C_jOpt_Confirm_Flt);
} /* U_ConfirmCard_Flt */

/*-----U_ConfirmPanel -----------------------------------------------------------
*
* Save changes.
*/
const C_jBag0_szTBM        = 0;
const C_jBag0_fUnused      = 1;
const C_jBag0_szNmColl_Prv = 2;
const C_jBag0_CB           = 3;
const C_jBag0_szNm_Pnl     = 4;
const C_jBag0_aFld         = 5;
 
function U_ConfirmPanel(P_0)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;  
  var Coll0;
  var Bag0 = this.Bag0;
  var szNm_Pnl = Bag0[4];
  var Coll1 = $TabPrm.F_Coll_Get(szNm_Pnl); 
  var szKey;
  var aaa = 0;

  if (!UsrView0.fReadOnly) {
     UsrView0.ElemPrv = $Table.F_ElemPrv();
     UsrView0.U_ConfirmCard(UsrView0, C_jOpt_Confirm_Panel);
     Coll0 = XDB0.Coll0[1];   /* $MAGIC_NUMBER 1 - because U_ConfirmCard() with C_jOpt_Confirm_New create a new record with index 1. */

     if (Coll1.length == 1) {
        Coll1 = Coll1[0];
     } /* if */
     for (szKey in Coll1) {
         Coll1[szKey] = Coll0[szKey];
     } /* for */
        
     var szNmColl_Prv = Bag0[2];
     var U_CB = Bag0[3];

     if (U_CB) {
        U_CB();
     } /* if */
  }
  else {
     $Error.U_Warning(C_jCd_Cur, 12, "Read Only!", "");
  } /* if */
} /* U_ConfirmPanel */

/*-----U_Cancel --------------------------------------------------------
*
*/ 
function U_Cancel()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;
  var iCol = UsrView0.iCol_Item_Sel
  $Card.DBox_EdtTup.U_Hub(C_JPnl_Cancel);
  $Table.U_ArrowMove(UsrView0, iRow, iCol);
} /* U_Cancel */

/*-----U_Cancel_New --------------------------------------------------------
*
* Terminate records insertion saving the records already inserted.
*/ 
function U_Cancel_New()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();

  if (!G_DDJ.fNew_aFld) {
      /* * Terminate records insertion saving the records already inserted. */
      UsrView0.U_Upd_aNdx();         /* Recalc index */      
      $Table.U_Display_Table();      /* Refresh Table painting changes. */
  }
  else {
      /* Layout insertion finished. */                           
      G_DDJ.fNew_aFld = false;
      $ACP.U_Open_Confirm("<h2>Would you like to insert data in the Collection(Y/N)?</h2>", U_Ins_Data, $Table.U_Display_Table);
  } /* if */ 
} /* U_Cancel_New */

/*-----U_Ins_Data --------------------------------------------------------
*
*/ 
function U_Ins_Data()
{
  var aColl_Empty = [null, [], {}, [], [], {}, {}];
  var Coll_Empty0 = aColl_Empty[G_DDJ.JKndTup0];         
  $DDJ.U_DispColl([G_DDJ.szNmColl, G_DDJ.JKndTup0, Coll_Empty0, null, G_DDJ.szNmColl + "_aFld", "New", C_WwFlag_Null, C_jCd_Cur, [G_DDJ.szNm_URL, C_jPg_0, G_DDJ.szAS, null, null]]);
  setTimeout($DDJ.U_NewTup_DDJ, 100);    /* Open automatically a Card in "New" mode. */
} /* U_Ins_Data */
  
/*-----U_Cancel_Edt --------------------------------------------------------
*
*/ 
function U_Cancel_Edt()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
 
  $Table.U_Display_Table();      /* Refresh Table painting changes. */

  var jaNdx_Sel = (UsrView0.fAsc)? UsrView0.jaNdx_Sel: UsrView0.aNdx.Length -UsrView0.jaNdx_Sel;

  $Table.U_Scroll(jaNdx_Sel +1);
} /* U_Cancel_Edt */
  
/*-----U_Cancel_Panel --------------------------------------------------------
*
*/ 
function U_Cancel_Panel()
{
  var szNmColl_Prv = this.Bag0[2];
  var UsrView0 = CL_UsrView0.F_UsrView_Select(szNmColl_Prv, C_WwFlag_fDisplay);     /* Restore previous selection. */

  var jaNdx_Sel = (UsrView0.fAsc)? UsrView0.jaNdx_Sel: UsrView0.aNdx.Length -UsrView0.jaNdx_Sel;

  $Table.U_Scroll(jaNdx_Sel +1);
} /* U_Cancel_Panel */

/*-----U_Input --------------------------------------------------------
*
* Insert the value passed as parameter in the HTML <input> element selected.
*/ 
function U_Input(P_szVal="Default-123")
{
  var Elem0 = document.activeElement; 
  Elem0.value = P_szVal;
} /* U_Input */

/*-----U_Reset_Cell --------------------------------------------------------
*
*/
function U_Reset_Cell()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  UsrView0.jaFld1    = 0;
  UsrView0.jaFld_Prv = 0;
} /* U_Reset_Cell */

/*-----U_Focus --------------------------------------------------------
*
*/
function U_Focus(P_UsrView)
{  
//  var ElemPrv = document.activeElement; 
  var szIdPrv = "Id_Card_" + P_UsrView.jaFld_Prv; 
  var ElemPrv = document.getElementById(szIdPrv);

  ElemPrv.style.backgroundColor = "white";
   
  var jCur = P_UsrView.jaFld1;
  var szId = "Id_Card_" + jCur;
  var Elem0 = document.getElementById(szId);
  Elem0.style.backgroundColor = "yellow";
  P_UsrView.jaFld_Prv = jCur;
  
  Elem0.focus();   /* $NOTE: Do Not WORK!!! */
} /* U_Focus */

/*-----U_Goto_Cell --------------------------------------------------------
*
* Goto the selected  Cell.
*/ 
function U_Goto_Cell(P_jaFld1)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  UsrView0.jaFld1 = P_jaFld1;
  
  U_Focus(UsrView0);
} /* U_Goto_Cell */

/*-----U_First_Cell --------------------------------------------------------
*
*/
function U_First_Cell()
{  
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  UsrView0.jaFld1 = 0;
  
  U_Focus(UsrView0);
} /* U_First_Cell */

/*-----U_Last_Cell --------------------------------------------------------
*
*/
function U_Last_Cell()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  UsrView0.jaFld1 = UsrView0.aFld1.length -1;

  U_Focus(UsrView0);
} /* U_Last_Cell */

/*-----U_Prev_Cell --------------------------------------------------------
*
*/
function U_Prev_Cell()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iCnt = UsrView0.jaFld1;
  iCnt = (iCnt > 0)? iCnt -1: 0;
  UsrView0.jaFld1 = iCnt;

  U_Focus(UsrView0);
} /* U_Prev_Cell */

/*-----U_Next_Cell --------------------------------------------------------
*
*/ 
function U_Next_Cell()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iCard_aFld1 = UsrView0.aFld1.length;
  var iCnt = UsrView0.jaFld1;  
  iCnt = (iCnt +1 < iCard_aFld1)? iCnt +1: iCard_aFld1 -1;  
  UsrView0.jaFld1 = iCnt;

  U_Focus(UsrView0);
} /* U_Next_Cell */ 

/*-----U_Init_Card --------------------------------------------------------
*
*/ 
function U_Init_Card()
{
  U_Root0("$Card", C_jCd_Cur);

  _Card.DBox_NewTup = new CL_DBox("Id_Div_DBox0", "$Card.DBox_NewTup", "New Tuple", S_szHTML_DBox_Card, U_OpenCard_New,   $Card.U_Cancel_New,   $Card.U_ConfirmCard_New, G_asaMnEntry.Card, "Card");
  _Card.DBox_EdtTup = new CL_DBox("Id_Div_DBox0", "$Card.DBox_EdtTup", "Edit Tuple",S_szHTML_DBox_Card, U_OpenCard_Edit,  $Card.U_Cancel_Edt,   $Card.U_ConfirmCard_Edt, G_asaMnEntry.Card, "Card");
  _Card.DBox_Panel  = new CL_DBox("Id_Div_DBox0", "$Card.DBox_Panel",  "Panel",     S_szHTML_DBox_Card, U_OpenCard_Panel, $Card.U_Cancel_Panel, $Card.U_ConfirmPanel,    G_asaMnEntry.Card, "Card");  
} /* U_Init_Card */

  return(_Card);
})();  /* Card */


