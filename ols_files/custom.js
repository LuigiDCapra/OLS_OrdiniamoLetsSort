/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : custom.js
* Function    : User defined code
* FirstEdit   : 15/12/2019
* LastEdit    : 05/11/2025
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
*     Spare module.
*     You can put here your private code.
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


const $Custom = (function () {
  var _Custom = {};
  _Custom.U_Init          = U_Init_Custom;     // function U_Init_Custom();
  _Custom.U_Test          = U_Test;            // function U_Test();
  _Custom.U_CmdInt        = U_CmdInt;          // function U_CmdInt();

  _Custom.U_UsrDef_Ext    = U_UsrDef_Ext;      // function U_UsrDef_Ext();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Custom;

/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----U_UsrDef_Ext --------------------------------------------------------
*
* $OPTIONAL: Support for NON Standard Files Extension
*/ 
function U_UsrDef_Ext()
{
  var szFlNm = Id_Inp_szNmColl_2.value;
  var szExt = F_szExt_Mp_szFlNm(szFlNm);
     
  if (szExt == "lbk") {     // $LCD
      Id_Span_fEmbed.hidden = false;
      Id_Span_fLine1.hidden = false;
      Id_JKndTup0.value = C_JKndTup_aRcd;
      Id_CBox_fEmbed.checked = true;
      Id_CBox_fLine1.checked = true;
  } else if (szExt  == "log") {
      Id_Span_fEmbed.hidden = false;
      Id_Span_fLine1.hidden = false;      
      Id_JKndTup0.value = C_JKndTup_aRcd;
      Id_CBox_fEmbed.checked = true;
  } else if (szExt  == "trb") {
      Id_Span_fEmbed.hidden = false;
      Id_Span_fLine1.hidden = false;      
      Id_JKndTup0.value = C_JKndTup_aRcd;
      Id_CBox_fEmbed.checked = true;
  } /* if */
} /* U_UsrDef_Ext */

/*-----U_Test --------------------------------------------------------
*
*/ 
function U_Test()
{
} /* U_Test */

/*-----U_CmdInt --------------------------------------------------------
*
* Command Interpreter
*/ 
function U_CmdInt(P_szMsg)
{
  var BagRef = {fRestore:true};
  $Sentence.U_Interpreter(P_szMsg);
} /* U_CmdInt */

/*-----U_Init_Custom --------------------------------------------------------
*
*/ 
function U_Init_Custom()
{
  U_Root0("$Custom", C_jCd_Cur, 2);
} /* U_Init_Custom */

  U_Root0("$Custom", C_jCd_Cur, 1);
  return(_Custom);
})();  /* $Custom */
