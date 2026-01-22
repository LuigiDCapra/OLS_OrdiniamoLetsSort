/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : style.js
* Function    : GUI style management
* FirstEdit   : 22/09/2025
* LastEdit    : 22/09/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2024
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     GUI style management.
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

/*----- Module $Style --------------------------------------------------------
*
*/ 
const $Style = (function () {
  var _Style = {};
  _Style.U_Init         = U_Init_Style;     // function U_Init_Style();
  _Style.U_Set_BG       = U_Set_BG;         // function U_Set_BG(P_szStyle);
  _Style.F_szRO         = F_szRO;           // function F_szRO();
  _Style.F_szRW         = F_szRW;           // function F_szRW();
  _Style.F_szBG         = F_szBG;           // function F_szBG();
  _Style.F_szBackGround = F_szBackGround;   // function F_szBackGround();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Style;

/*----- Local Variables ----------------------------------------------*/

var S_szRO = "red";
var S_szRW = "cyan";
var S_szBG = "yellow";
var S_szBackGround = "cyan";

/*--------------------------------------------------------------------*/


/*-----F_szBackGround --------------------------------------------------------
*
*/ 
function F_szBackGround()
{
  return(S_szBackGround);
} /* F_szBackGround */

/*-----F_szBG --------------------------------------------------------
*
*/ 
function F_szBG()
{
  return(S_szBG);
} /* F_szBG */

/*-----F_szRO --------------------------------------------------------
*
*/ 
function F_szRO()
{
  return(S_szRO);
} /* F_szRO */

/*-----F_szRW --------------------------------------------------------
*
*/ 
function F_szRW()
{
  return(S_szRW);
} /* F_szRW */

/*-----U_Set_BG --------------------------------------------------------
*
*/ 
function U_Set_BG(P_szStyle)
{
  if (P_szStyle == "Dark") {
     S_szBG = "#888";
     S_szBackGround = "#444";
     S_szRO = "#aaa";
     S_szRW = "#ddd";
  }
  else {
     S_szBG = "yellow";
     S_szBackGround = "cyan";
     S_szRO = "red";
     S_szRW = "cyan";
  } /* if */
} /* U_Set_BG */

/*-----U_Init_Style --------------------------------------------------------
*
*/ 
function U_Init_Style()
{
  U_Root0("$Style", C_jCd_Cur);

  var szStyle = $VConfig.F_ValSts_Get("szStyle");
  
  U_Set_BG(szStyle);
  $DDJ.U_Set_iWdt_Icon();
} /* U_Init_Style */

  return(_Style);
})();  /* Style */

