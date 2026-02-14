/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : help.js
* Function    : Help management.
* FirstEdit   : 15/12/2019
* LastEdit    : 13/02/2026
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

/*----- Module $Help --------------------------------------------------------
*
*/ 
const $Help = (function () {
  var _Help = {};
  _Help.U_Init          = U_Init_Help;       // function U_Init_Help();
  _Help.U_Help          = U_Help;            // function U_Help();
  _Help.U_Tutorial      = U_Tutorial;        // function U_Tutorial();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Tag;

/*----- Local Variables ----------------------------------------------*/

/*--------------------------------------------------------------------*/

/*-----U_HelpFile --------------------------------------------------------
*
*/ 
function U_HelpFile(P_szHelp)
{
  var szDir = C_szApp.trim().toLowerCase() + "_files";
  var szNat = "it-IT";
  $DDJ.F_Window_open(`${szDir}/help/${szNat}/${P_szHelp}.html`);  
} /* U_HelpFile */

/*-----U_Help --------------------------------------------------------
*
*/ 
function U_Help(P_szHelp)
{ 
  if (P_szHelp) {
      var iPos = P_szHelp.indexOf("_Pnl");
      if (0 <= iPos) {
         P_szHelp = P_szHelp.substr(0, iPos);
      } /* if */ 
      U_HelpFile(P_szHelp);
  }
  else {
      var szSCtx = $SemCtx.F_szSCtx_Cur();
      U_HelpFile(szSCtx);
  } /* if */  
} /* U_Help */

/*-----U_Tutorial --------------------------------------------------------
*
*/ 
function U_Tutorial(P_szHelp)
{
  if (window.G_fSaved != undefined) {
     $DDJ.F_Window_open("../bin/anim.html");
  } /* if */ 
} /* U_Tutorial */

/*-----U_Init_Help --------------------------------------------------------
*
*/ 
function U_Init_Help()
{
  U_Root0("$Help", C_jCd_Cur, 2);
} /* U_Init_Help */

  U_Root0("$Help", C_jCd_Cur, 1);
  return(_Help);
})();  /* Help */

