/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : nation.js
* Function    : Nationalization Management.
* FirstEdit   : 13/03/2022
* LastEdit    : 14/01/2025
* System      : Mozilla FireFox 80+
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
*
*  ----- LICENSE -----
*
*  This file is part of TUISys' Open-DDJ.
*  
*  This program is free software: you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation, either version 3 of the License, or
*  (at your option) any later version.
*  
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*  
*  You should have received a copy of the GNU General Public License
*  along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>.
*  
*----------------------------------------------------------------------
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

/*----- Module $Nation --------------------------------------------------------
*
*/ 
const $Nation = (function () {
  var _Nation = {};
  _Nation.U_Init        = U_Init_Nation;     // function U_Init_Nation();
  _Nation.U_ShowMsg     = U_ShowMsg;         // function U_ShowMsg(P_szId, P_szIdMsg);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Nation;

/*----- Local Variables ----------------------------------------------*/

var S_fEna_Translation = true;

var S_szLanguage = "en-US";

/*--------------------------------------------------------------------*/

/*-----U_Ena_Translation --------------------------------------------------------
*
*/ 
function U_Ena_Translation()
{
  if (!S_fEna_Translation) {
     return;
  } /* if */
  var Elem0 = document.createElement("script");
  Elem0.setAttribute("type", "text/javascript");
  Elem0.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
 
  var aElem = document.getElementsByTagName("body");
  aElem[0].appendChild(Elem0);

  var Elem1 = document.createElement("div");
  Elem1.setAttribute("id", "google_translate_element");

  aElem[0].insertBefore(Elem1, aElem[0].firstChild);
} /* U_Ena_Translation */

function googleTranslateElementInit() {
new google.translate.TranslateElement({pageLanguage: 'it'}, 'google_translate_element');
}

/*-----U_ShowMsg --------------------------------------------------------
*
* Show message Nationalized.
*/ 
function U_ShowMsg(P_szId, P_szIdMsg) {
  if (P_szId) {
    var Elem0 = document.getElementById(P_szId);
    if (!Elem0) {
       $Error.U_Error(C_jCd_Cur, 1, "Wrong Id", P_szId, false);
    } /* if */
    var Elem1 = document.getElementById(P_szIdMsg);
    if (!Elem1) {
       $Error.U_Error(C_jCd_Cur, 2, "Wrong Id", P_szIdMsg, false);
    } /* if */    
    if (Elem0 && Elem1) {
       Elem0.innerText = Elem1.innerText;
    } /* if */
  } /* if */
} /* U_ShowMsg */

/*-----U_Init_Nation --------------------------------------------------------
*
*/ 
function U_Init_Nation()
{
//  var szTest = "àèéìòùç€";
  S_szLanguage = navigator.language || navigator.userLanguage;

//  U_Ena_Translation();
  U_Root0("$Nation", C_jCd_Cur, 2);
} /* U_Init_Nation */

  U_Root0("$Nation", C_jCd_Cur, 1);
  return(_Nation);
})();  /* Nation */

