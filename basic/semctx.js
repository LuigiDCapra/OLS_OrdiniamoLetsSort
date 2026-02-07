/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : semctx.js
* Function    : Semantic Context
* FirstEdit   : 22/01/2024
* LastEdit    : 06/02/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Manage the Semantic Contextes corresponding to GUI environments.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* TBM: Tool Bar Menu
* SCtx: Semantic Context.
* 
*/

"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/
/*----- Module $SemCtx --------------------------------------------------------
*
*/ 
const $SemCtx = (function () {
  var _SemCtx = {};
  _SemCtx.U_Init          = U_Init_SemCtx;        // function U_Init_SemCtx();
  _SemCtx.U_Set_SCtx      = U_Set_SCtx;           // function U_Set_SCtx(P_szSCtx);
  _SemCtx.F_szSCtx_Cur    = F_szSCtx_Cur;         // function F_szSCtx_Cur();
  _SemCtx.U_Restore       = U_Restore;            // function U_Restore(P_szSCtx);
  _SemCtx.U_Sel_TBM       = U_Sel_TBM;            // function U_Sel_TBM(P_szId, P_szSCtx, P_fieldset=false);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_SemCtx;

/*----- Local Variables ----------------------------------------------*/

var S_szSCtx = "";

/*--------------------------------------------------------------------*/

/*-----U_Set_SCtx --------------------------------------------------------
*
* Select Context.
*/ 
function U_Set_SCtx(P_szSCtx)
{
  S_szSCtx = P_szSCtx;

  if ($Root.F_fExist("$DDJ")) { 
     if (typeof($DDJ.U_Disp_szSCtx) != "undefined") {
        $DDJ.U_Disp_szSCtx(S_szSCtx);
     } /* if */
  } /* if */
} /* U_Set_SCtx */

/*-----F_szSCtx_Cur --------------------------------------------------------
*
* Return the name of current Context
*/ 
function F_szSCtx_Cur()
{
  return(S_szSCtx);
} /* F_szSCtx_Cur */

/*-----U_Restore --------------------------------------------------------
*
*/ 
function U_Restore(P_szSCtx)
{
  U_Set_SCtx(P_szSCtx);
} /* U_Restore */

/*-----U_Sel_TBM --------------------------------------------------------
*
* Return the HTML code that shows the ToolBar corresponding to the selected context P_szSCtx.
* From code2.js import
* const C_jaMnEntry_Title = 0;    * HTML's elements 'title'
* const C_jaMnEntry_pFn   = 1;    * Function that will be run when the button is clicked
* const C_jaMnEntry_Cap   = 2;    * Name engraved on button's cap.
* const C_jaMnEntry_Icon  = 3;    * Icon path
* const C_jaMnEntry_Key   = 4;    * Key
* const C_jaMnEntry_Opt   = 5;    * Options
* const C_jaMnEntry_Lst   = 6;    * Options List
*/ 
function U_Sel_TBM(P_szId, P_szSCtx, P_fieldset=false)
{
  S_szSCtx = P_szSCtx;
  var asz0, szId;

  if (typeof(G_asaMnEntry) == "undefined") {
     /* Skip TBM update. */
     return;
  } /* if */

  var aMnEntry = G_asaMnEntry[S_szSCtx];
  if (!aMnEntry) {
     return;
  } /* if */
  var sz0 = "";
  var szLiOpt = "";
  var szTit;
//  var fKey   = true;    /* Show szKey vs. show title. */
  var fIcons = false;    /* Show Icons vs. show buttons. */
  var jaMnEntry0 = C_jaMnEntry_Title;

  if ($Root.F_fExist("$VConfig")) {     
     fIcons = $VConfig.F_ValSts_Get("fIcons");
  } /* if */
  if ($Root.F_fExist("$VDebug")) {  
     if (C_iDebug_Dflt < $VDebug.F_iDebug()) {
         jaMnEntry0 = C_jaMnEntry_pFn;
     } /* if */
  } /* if */
  
  for (let i = 0; i < aMnEntry.length; i++) {
      let MnEntry0 = aMnEntry[i];
        if (typeof(MnEntry0) == "undefined") {
           ALERT0("++++ MnEntry0) == 'undefined'",1);
        } /* if */
      if (MnEntry0[C_jaMnEntry_Title] == "") {
         /* Skip auxilary definitions. */
         continue;
      } /* if */
      
      // VDebug.F_iDebug

//      szTit = (fKey)? MnEntry0[C_jaMnEntry_Key]: MnEntry0[C_jaMnEntry_Title];
      szTit = MnEntry0[jaMnEntry0];
      
      if (fIcons && MnEntry0[C_jaMnEntry_Icon]) {
         var szButton = `$DDJ.U_Button('${MnEntry0[C_jaMnEntry_pFn]}', 'Pos-2');`;
         sz0  += `<input class="Cl_input_Image_Button" type="image" title="${szTit}" onclick="${szButton}" src="${MnEntry0[C_jaMnEntry_Icon]}">\n`;
      }
      else {
         var szOpt = MnEntry0[C_jaMnEntry_Opt];
         switch (szOpt) {
           case "select": {
                /* Insert <select> element. */
                asz0 = MnEntry0[C_jaMnEntry_Lst];
                szLiOpt = "";
                for (let j = 0; j < asz0.length; j++) {
                    let sz0 = asz0[j];
                    szLiOpt += `<option value="${sz0}" title="${sz0}">${sz0}</option>`;
                } /* for */
                sz0 += `<select id="Id_TBM_${i}" title="${szTit}" onchange="$DDJ.U_Button('${MnEntry0[C_jaMnEntry_pFn]}', 'Pos-4', Id_TBM_${i}.value);">
                ${szLiOpt}
                </select>\n`;
           } break;
           case "input": {
                asz0 = MnEntry0[C_jaMnEntry_Lst];
                var szType = (typeof (asz0[0]) != "undefined")? asz0[0]: "text";
                szId = "Id_" + MnEntry0[C_jaMnEntry_Key];
                S_szId_Prv = szId;
                sz0 += `<input type=${szType} id="${szId}" title="${szTit}" placeholder="${MnEntry0[C_jaMnEntry_Cap]}">\n`;
           } break;
           case "button" : {
                asz0 = MnEntry0[C_jaMnEntry_Lst];
                var pFn  = MnEntry0[C_jaMnEntry_pFn];
                var szTxt  = MnEntry0[6][0]; /* caption */
               // var szNmCB = MnEntry0[6][1]; /* callback name */
                sz0 += `<button id="Id_${MnEntry0[C_jaMnEntry_Key]}" title="${szTit}" onclick="${pFn}('${szId}');" > ${szTxt} </button>\n`;
                S_szId_Prv = "";
           } break;
           default : {
                sz0 += `<input type="button" title="${szTit}" onclick="$DDJ.U_Button('${MnEntry0[C_jaMnEntry_pFn]}', 'Pos-3');" value="${MnEntry0[C_jaMnEntry_Cap]}">\n`;
           } break;
         } /* switch */     
      } /* if */
  } /* for */

  var Elem1 = document.getElementById(P_szId);
  if (!Elem1) {
     alert("The id '" + P_szId + "'is not undefined!");
  } /* if */  
  if (P_fieldset) {
     sz0 = `<fieldset class="CL_StdMenu">\n` + sz0 + "</fieldset>";
  }
  else {
     sz0 = `<div class="CL_TBM">\n` + sz0 + "</div>";
  } /* if */
  Elem1.innerHTML = sz0;

  U_Set_SCtx(S_szSCtx);
} /* U_Sel_TBM */

var S_szId_Prv = "";

/*-----U_Init_SemCtx --------------------------------------------------------
*
* $NOTE: code derived from U_Init_Sentence();
*/ 
function U_Init_SemCtx()
{
/*
* The following cycle expands UI contexts (SCtx) consisting of TBM entries definitions (in G_asaMnEntry array) generating the expanded representation (S_asObj_Entry) required by NLP command interpreter.
*
* G_asaMnEntry:  list of TBM definitions stored in external files.
* aMnEntry[]:    array of TMB descriptors for one context.
* MnEntry0:      descriptor corresponding to a TBM menu entry (or an Icon).
*
* See also U_Init_Sentence();
*/
  var aFunct = [];
  var fRegen = false; /* Regenerate help_funct.OLS */
  var szType;
  try {
    /* Make S_asObj_Entry */
    /* Iterate through the SCtx Contexts. */
    for (var Key in G_asaMnEntry) {
        var aMnEntry = G_asaMnEntry[Key];
        var iLen = aMnEntry.length;
       // var asSem = {};
        for (var i = 0; i < iLen; i++) {
            var MnEntry0 = aMnEntry[i];
            if (!MnEntry0) {
               $Error.U_Error(C_jCd_Cur, 1, "typeof(MnEntry0) == 'undefined'", i, false);
            } /* if */
            var szTitle = MnEntry0[C_jaMnEntry_Title];
            var pFn     = MnEntry0[C_jaMnEntry_pFn];
            var szIcon  = MnEntry0[C_jaMnEntry_Icon];
            var szKey   = MnEntry0[C_jaMnEntry_Key];
            if (szTitle == "") {
               if (pFn == "Expand") {  /* Expand block of definitions (should be declared in advance). */
                   var aMnEntry_Blk = G_asaMnEntry[szKey];
                   aMnEntry.splice(i,1, ...aMnEntry_Blk);   /* spread operator */
                   iLen = aMnEntry.length;
                   continue; 
               } /* if */
               if (pFn == "Insert") {  /* 2025-09-14 */
                  continue;
               } /* if */
            } /* if */
            try {
                eval(`szType = typeof(${pFn})`);  /* Check function existence. */
            } catch (P_Err) {
                szType = "undefined";
            } /* try catch */
            if (szType == "undefined") {
                /* Remove Icon from TBM. */
                MnEntry0[C_jaMnEntry_Key]   = "";
                MnEntry0[C_jaMnEntry_Title] = "";
                continue;
            } /* if */
            if (szKey == "") {
               /* Skip keyless entries. */            
               continue;
            } /* if */
            if (fRegen) {
                var Funct0 = [pFn, szTitle, szIcon, szKey, ""];
                aFunct.push(Funct0); 
            } /* if */           
        } /* for */ 
    } /* for */  
  } catch (P_Err) {
      $Error.U_Warning(C_jCd_Cur, 2, "TBM", P_Err.message, false);
  } /* try catch */

  if (fRegen) {
     $LcdLcd.U_Dbg_Sav(aFunct);  /* save data in dbg_sav.obj */
     ALERT("Saved",1);
  } /* if */
  U_Root0("$SemCtx", C_jCd_Cur, 2); 
} /* U_Init_SemCtx */

  U_Root0("$SemCtx", C_jCd_Cur, 1);
  return(_SemCtx);
})();  /* SemCtx */
