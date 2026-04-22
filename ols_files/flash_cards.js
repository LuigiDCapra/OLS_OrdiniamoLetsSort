/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : flash_cards.js
* Function    : Flash Cards
* FirstEdit   : 01/02/2026
* LastEdit    : 27/03/2026
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


const $Flash_Cards = (function () {
  var _Flash_Cards = {};
  _Flash_Cards.U_Init          = U_Init_Flash_Cards; // function U_Init_Flash_Cards();

  _Flash_Cards.U_Reset_iCnt    = U_Reset_iCnt;       // function U_Reset_iCnt(); 
  _Flash_Cards.U_Esatta        = U_Esatta;           // function U_Esatta(); 
  _Flash_Cards.U_Errata        = U_Errata;           // function U_Errata();
    
  _Flash_Cards.U_First_Quest   = U_First_Quest;      // function U_First_Quest();
  _Flash_Cards.U_Last_Quest    = U_Last_Quest;       // function U_Last_Quest();   
  _Flash_Cards.U_Prev_Quest    = U_Prev_Quest;       // function U_Prev_Quest();    
  _Flash_Cards.U_Next_Quest    = U_Next_Quest;       // function U_Next_Quest();
      
  _Flash_Cards.U_Uno           = U_Uno;              // function U_Uno();
  _Flash_Cards.U_Due           = U_Due;              // function U_Due();
  _Flash_Cards.U_Tre           = U_Tre;              // function U_Tre();
  _Flash_Cards.U_Quattro       = U_Quattro;          // function U_Quattro();
    
  _Flash_Cards.U_Make_Quest    = U_Make_Quest;       // function U_Make_Quest(P_Item, P_Fld1, P_UsrView0);
  _Flash_Cards.F_szMsg_PreProc   = F_szMsg_PreProc;      // function F_szMsg_PreProc(P_szMsg);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Custom;

/*----- Local Variables ----------------------------------------------*/

var S_iCnt_Try   = 0;  /* Total number of tryes. */
var S_iCnt_Exact = 0;  /* Correct answers. */
var S_iCnt_Quest = 0;  /* Nomber of answe to th current question. */

/*--------------------------------------------------------------------*/

/*-----U_Reset_iCnt --------------------------------------------------------
*
*/ 
function U_Reset_iCnt()
{
  S_iCnt_Try   = 0;
  S_iCnt_Exact = 0;
  Id_Upd.innerText=   S_iCnt_Exact + "/" + S_iCnt_Try; 
} /* U_Reset_iCnt */

/*-----U_First_Quest --------------------------------------------------------
*
* Go to the first Question
*/ 
function U_First_Quest()
{
  setTimeout($ExeCmd.U_First_Tup1, 1);
} /* U_First_Quest */

/*-----U_Last_Quest --------------------------------------------------------
*
* Go to the Last Question
*/ 
function U_Last_Quest()
{
  setTimeout($ExeCmd.U_Last_Tup1, 1);
} /* U_Last_Quest */

/*-----U_Prev_Quest --------------------------------------------------------
*
* Go to the Prev Question
*/ 
function U_Prev_Quest()
{
  setTimeout($ExeCmd.U_Prev_Tup, 1);
} /* U_Prev_Quest */

/*-----U_Next_Quest --------------------------------------------------------
*
* Go to the Next Question
*/ 
function U_Next_Quest()
{
  setTimeout($ExeCmd.U_Next_Tup, 1);
} /* U_Next_Quest */

/*-----U_Uno --------------------------------------------------------
*
*/ 
function U_Uno()
{
  U_Check(1);
} /* U_Uno */

/*-----U_Due --------------------------------------------------------
*
*/ 
function U_Due()
{
  U_Check(2);
} /* U_Due */

/*-----U_Tre --------------------------------------------------------
*
*/ 
function U_Tre()
{
  U_Check(3);
} /* U_Tre */

/*-----U_Quattro --------------------------------------------------------
*
*/ 
function U_Quattro()
{
  U_Check(4);
} /* U_Quattro */

/*-----U_Check --------------------------------------------------------
*
*/ 
function U_Check(P_iAnswer)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  if (UsrView0.jCorrect == P_iAnswer) {
     U_Esatta();
  
  }
  else {
     U_Errata();
  } /* if */
} /* U_Check */


/*-----U_Esatta --------------------------------------------------------
*
*/ 
function U_Esatta()
{
  var aszMsg = ["Corretto, la risposta è esatta.", "Giusto, andiamo avanti.", "Bene. Continuiamo.", "Perfetto!"];
  var iRnd = $Math_DDJ.F_iRND(0, (aszMsg.length -1));
  var szMsg = aszMsg[iRnd]; 
  if ($VConfig.F_ValSts_Get("fEcho_Commands")) {
     $TTS.U_Long_speech(szMsg);
  } /* if */

  $ACP.U_Open_Alert(szMsg);
  if (Id_Nav_DBox_domande_casuali.checked) {
     setTimeout($ExeCmd.U_Random_Tup, 3000);
  }
  else {
     setTimeout($ExeCmd.U_Next_Tup, 3000);
  } /* if */  

  S_iCnt_Try++;
  S_iCnt_Exact++;
  Id_Upd.innerText = S_iCnt_Exact + "/" + S_iCnt_Try; 
} /* U_Esatta */

/*-----U_Errata --------------------------------------------------------
*
*/ 
function U_Errata()
{
  var aszMsg = ["Mi dispiace la risposta è sbagliata.", "Purtroppo no. Riprova.", "Non è questa. Prova ancora.", "No!"];
  var iRnd = $Math_DDJ.F_iRND(0, (aszMsg.length -1));
  var szMsg = aszMsg[iRnd]; 
  if ($VConfig.F_ValSts_Get("fEcho_Commands")) {
     $TTS.U_Long_speech(szMsg);
  } /* if */
  $ACP.U_Open_Alert(szMsg);
  S_iCnt_Try++;
  S_iCnt_Quest++;
  Id_Upd.innerText= S_iCnt_Exact + "/" + S_iCnt_Try;  
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
//  debugger;
  var XDB0 = P_UsrView0.XDB0;
  var Tup_Sel = XDB0.Tup_Sel;
  var iRnd = $Math_DDJ.F_iRND(0, (aaScrambler.length -1));
  var aScrambler = aaScrambler[iRnd];
  var i, j;
  var szTmp = '<ol id="Id_Flash"><b>' + Tup_Sel[2] + "</b><br><br>";
  
  P_UsrView0.jCorrect = aScrambler.indexOf(3) +1;     /* Set the correct answer. +1 because the answer start from 1 */

  for (i = 0; i < 4; i++) {
      j = aScrambler[i];
      if (j == 3) {
         szTmp += "<li onclick='$Flash_Cards.U_Esatta()'>" + Tup_Sel[j] + "<br>&nbsp;</li>";
      }
      else {
         szTmp += "<li onclick='$Flash_Cards.U_Errata()'>" + Tup_Sel[j] + "<br>&nbsp;</li>";
      } /* if */
  } /* for */
  szTmp += "</ol>";
  
  if (Tup_Sel[9]) {
     var szPathImg = Tup_Sel[9];     
     szTmp += `<picture><a target="_top" href="${szPathImg}"><img alt="" src="${szPathImg}" width="20%;"></a><br></picture>`; 
  } /* if */

  szTmp += "<fieldset><b>Cliccate sulla riga corrispondente alla risposta che ritenete corretta.</b></fieldset>";
  var szRef = Tup_Sel[7]; 
  if (szRef) {
     szRef = szRef.replace("IW34", "<i>Internet Working</i> 2° biennio");
     szRef = szRef.replace("IW5", "<i>Internet Working</i> classe quinta");
     szRef = szRef.replace("p. ", "pagina ");
     if (szRef.indexOf("https://") == 0) {
        szRef = `<a target="_top" href="${szRef}">${szRef}</a>`;
     } /* if */
     szTmp += "<p>Questo argomento è spiegato in " + szRef + "</p><br>";
  } /* if */
  szTmp += "Punteggio (esatte/tentativi): (<span id='Id_Upd'>" + S_iCnt_Exact + "/" + S_iCnt_Try + "</span>)";  
  S_iCnt_Quest = 0;

  $ACP.U_Close_Alert();
  Tup_Sel[0] = szTmp;  
  if ($VConfig.F_ValSts_Get("fEcho_Commands")) {
     if (S_iCnt_Try > 0) {
        $DDJ.U_ShutUp();
     } /* if */
     $TTS.U_Long_speech(Tup_Sel[2]);
  } /* if */  
  return(szTmp);
} /* U_Make_Quest */

/*-----F_szMsg_PreProc --------------------------------------------------------
*
*/ 
function F_szMsg_PreProc(P_szMsg)
{
  var aKey = [
    ["uno","uno"],["1","uno"],["prima","uno"],
    ["due","due"],["2","due"],["seconda","due"],
    ["tre","tre"],["3","tre"],["terza","tre"],
    ["quattro","quattro"],["4","quattro"],["quarta","quattro"]
  ];

  P_szMsg = P_szMsg.toLowerCase();
  for (var i = 0; i < aKey.length; i++) {
      if (P_szMsg.indexOf(aKey[i][0]) >= 0) {
         P_szMsg = aKey[i][1];
         break;
      } /* if */
  } /* for */

  return(P_szMsg);
} /* F_szMsg_PreProc */

/*-----U_Init_Flash_Cards --------------------------------------------------------
*
*/ 
function U_Init_Flash_Cards()
{
  U_Root0("$Flash_Cards", C_jCd_Cur, 2);
} /* U_Init_Flash_Cards */

  U_Root0("$Flash_Cards", C_jCd_Cur, 1);
  return(_Flash_Cards);
})();  /* $Flash_Cards */
