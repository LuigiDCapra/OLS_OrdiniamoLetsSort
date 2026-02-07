/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : custom.js
* Function    : User defined code
* FirstEdit   : 15/12/2019
* LastEdit    : 02/02/2026
* System      : Mozilla FireFox 80+
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
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

/* ********************* Flash-Cards ******************** */

function U_Esatta()
{
  var szMsg = "Corretto, la risposta è esatta."; 
   $TTS.U_Long_speech(szMsg);
   alert(szMsg);
   $ExeCmd.U_Next_Tup();
} /* U_Esatta */

function U_Errata()
{
   var szMsg = "Mi dispiace la risposta è sbagliata."; 
   $TTS.U_Long_speech(szMsg);
   alert(szMsg);
} /* U_Errata */

/*-----U_Make_Quest --------------------------------------------------------
*
* [TextArea, answer, question, 1-Option, 2-Option, 3-Option, 4-Option]. 
*/ 
function U_Make_Quest(P_Item, P_Fld1, P_UsrView0)
{
  var aaScrambler = [
[6,3,4,5], [6,3,5,4], [6,4,3,5], [6,4,5,3], [6,5,3,4], [6,5,4,3],
[3,4,5,6], [3,4,6,5], [3,5,4,6], [3,5,6,4], [3,6,4,5], [3,6,5,4],
[4,6,3,5], [4,6,5,3], [4,3,5,6], [4,3,6,5], [4,5,3,6], [4,5,6,3],
[5,6,3,4], [5,6,4,3], [5,3,4,6], [5,3,6,4], [5,4,6,3], [5,4,3,6]
  ];
  
  var XDB0 = P_UsrView0.XDB0;
  var Tup_Sel = XDB0.Tup_Sel;
  var iRnd = $Math_DDJ.F_iRND(0, (aaScrambler.length -1));
  var aScrambler = aaScrambler[iRnd];
  var i, j;
  var szTmp = "<ol><b>" + Tup_Sel[2] + "</b><br><br>";
  
  P_UsrView0.jCorrect = aScrambler.indexOf(3);     /* Set the correct answer. */
 
  for (i = 0; i < 4; i++) {
      j = aScrambler[i];
      if (j == 3) {
         szTmp += "<li onclick='U_Esatta()'>" + Tup_Sel[j] + "<br>&nbsp;</li>";
      }
      else {
         szTmp += "<li onclick='U_Errata()'>" + Tup_Sel[j] + "<br>&nbsp;</li>";
      } /* if */
  } /* for */
  szTmp += "</ol>";
  
  Tup_Sel[0] = szTmp;  
  $TTS.U_Long_speech(Tup_Sel[2]);
  
  return(szTmp);
} /* U_Make_Quest */


/*-----U_Check_Answer --------------------------------------------------------
*
*/ 
function U_Check_Answer(P_1, P_2, P_3, P_4)
{
  switch (P_1) {
    case "1": 
    case "2": 
    case "3": 
    case "4": {
         P_2.Val_New = P_1;
    } break;
    default : {
         P_2.Val_New = "";
    } break;
  } /* switch */
} /* U_Check_Answer */

