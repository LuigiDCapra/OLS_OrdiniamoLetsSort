/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : MRMenu.js
* Function    : Mouse Right Menu - Context Menu
* FirstEdit   : 05/10/2021
* LastEdit    : 09/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
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

/*----- Module $MRMenu --------------------------------------------------------
*
*/ 
const $MRMenu = (function () {
  var _MRMenu = {};
  _MRMenu.U_Init      = U_Init_MRMenu;   // function U_Init_MRMenu();
  _MRMenu.U_Sel_PopUp = U_Sel_PopUp;     // function U_Sel_PopUp(P_szId, P_Fn, P_aMnEntry)
  _MRMenu.U_Close     = U_Close;         // function U_Close();
  _MRMenu.F_xWin      = F_xWin;          // function F_xWin();
  _MRMenu.F_yWin      = F_yWin;          // function F_yWin();
  _MRMenu.U_Open      = U_Open;          // function U_Open_MRMenu;

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_MRMenu;

const C_iHgt_Line = 28;      // ???

/*----- Local Variables ----------------------------------------------*/

var S_asaMnEntry = {};
var S_szId_Cur = "";

var S_iWdtMenu = 250;
var S_iHgtMenu = 650;

var S_xWin = -1;
var S_yWin = -1;

/*--------------------------------------------------------------------*/

/*-----F_xWin --------------------------------------------------------
*
*/ 
function F_xWin()
{
  return(S_xWin);
} /* F_xWin */

/*-----F_yWin --------------------------------------------------------
*
*/ 
function F_yWin()
{
  return(S_yWin);
} /* F_yWin */

/*-----U_Open --------------------------------------------------------
*
* Open PopUp menu.
* 
* From code2.js import
* const C_jaMnEntry_Title  = 0;
* const C_jaMnEntry_pFn    = 1;
* const C_jaMnEntry_Cap    = 2;
*/  
function U_Open(P_Event)
{                
  var Elem0 = document.getElementById("Id_RMenu");
  P_Event.preventDefault();

  var szId = P_Event.currentTarget.id;
  S_xWin = P_Event.clientX;       /* client X/Y coordinates are relative to the top left corner of the visible part of the page shown in the browser window. */
  S_yWin = P_Event.clientY;
  S_szId_Cur = szId;
  var aMnEntry = S_asaMnEntry[szId];

  var sz0 = "<ul>\n";
  for (let i = 0; i < aMnEntry.length; i++) {
      let MnEntry0 = aMnEntry[i];
      if (MnEntry0[C_jaMnEntry_Cap] == "----") {
         sz0 += `<li class="Cl_Line"></li>\n`;      
      }
      else {
         sz0 += `<li><a href="JavaScript:void(0)" title="${MnEntry0[C_jaMnEntry_Title]}" onclick="$DDJ.U_Button('${MnEntry0[C_jaMnEntry_pFn]}', 'Pos-1');">${MnEntry0[C_jaMnEntry_Cap]}</a></li>\n`;
      } /* if */
  } /* for */ 
  sz0 += "</ul><br>\n";

  Elem0.innerHTML = sz0;
  var iWdt = window.innerWidth;
  var iHgt = window.innerHeight;

  S_iHgtMenu = aMnEntry.length * C_iHgt_Line; 
    
  if (iHgt < S_yWin + S_iHgtMenu) {
     S_yWin =  iHgt - S_iHgtMenu;
  } /* if */
  if (S_yWin < 0) {
     S_yWin = 0;
  } /* if */
  if (iWdt < S_xWin + S_iWdtMenu) {
     S_xWin =  iWdt - S_iWdtMenu;
  } /* if */
  if (S_xWin < 0) {
     S_xWin = 0;
  } /* if */
  Elem0.style.left = "" + S_xWin + "px";
  Elem0.style.top  = "" + S_yWin + "px";
  Elem0.style.display = "block";
    
  document.onclick = U_Close;
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(){
  document.getElementById("Id_RMenu").style.display = "none";
} /* U_Close */

/*-----U_Sel_PopUp --------------------------------------------------------
*
*/ 
function U_Sel_PopUp(P_szId, P_Fn, P_szTBM_PopUp)
{
  if (!P_szId) {
     return;
  } /* if */
  var szSCtx = P_szTBM_PopUp;
  var Elem1 = document.getElementById(P_szId);
  Elem1.oncontextmenu = P_Fn;
  var aMnEntry = G_asaMnEntry[szSCtx];
  S_asaMnEntry[P_szId] = aMnEntry;
} /* U_Sel_PopUp */

/*-----U_Init_MRMenu --------------------------------------------------
*
* Install event handler for P_szId.
*/ 
function U_Init_MRMenu()
{
  U_Root0("$MRMenu", C_jCd_Cur, 2);
} /* U_Init_MRMenu */

  U_Root0("$MRMenu", C_jCd_Cur, 1);
  return(_MRMenu);
})();  /* MRMenu */
