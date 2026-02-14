/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : test.js
* Function    : Test procedures.
* FirstEdit   : 15/12/2019
* LastEdit    : 12/02/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
* System      : Mozilla FireFox 80+
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
*     test.js provides a place where users can insert code under development and a mechanism to link new functions with GUI.
*     Users can just insert their code under development in procedure U_Test1, U_Test2 or U_Test3.
*     Please note that is possible to make reference to the previous procedure in any place of the code just specifying the nale of the object followed by the name of the procedure: e.g. $Test.U_Test1();
*     Please note: the icon corresponding to procedure U_Test1() has been already present in the ToolBar Menu "Standard", so the users can try the corresponding code just pressing it. 
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* 
*/
//"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Test --------------------------------------------------------
*
*/ 
const $Test = (function () {
  var _Test = {};
  _Test.U_Init        = U_Init_Test;      // function U_Init_Test();
  _Test.U_Test1       = U_Test1;          // function U_Test1();
  _Test.U_Test2       = U_Test2;          // function U_Test2();
  _Test.U_Test3       = U_Test3;          // function U_Test3();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Test;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----U_AddFld --------------------------------------------------------
*
* Add n empty fields to UsrView0.aFld1[].
* 
* $IMPORTANT: do not delete.
*/ 
function U_AddFld(P_UsrView, P_iNn_Fld)
{
  var aFld1  = P_UsrView.aFld1;
  var aiPos1 = P_UsrView.aiPos;
  var iLen = aFld1.length;

  for (let i = 0; i < P_iNn_Fld; i++) {
      let j = iLen +i;
      let szNm0 = "Col_" + j;
//      aFld0[j] = {"szNm":szNm0,"szType":"string"};
      aFld1[j] = {"iPos0":j,"iPos1":j,"fVisible":true,"szNm":szNm0,"szCaption":szNm0,"szType":"string"};
      aiPos1[j] = j;
  } /* for */
  
} /* U_AddFld */

/*-----U_Test1 --------------------------------------------------------
*
*/ 
function U_Test1()
{
 ALERT("Spare function.\nUsers can insert their code under development here.",1);
} /* U_Test1 */

/*-----U_Test2 --------------------------------------------------------
*
*/ 
function U_Test2()
{
 ALERT("TEST-2",1);
} /* U_Test2 */

/*-----U_Test3 --------------------------------------------------------
*
*/ 
function U_Test3()
{ 
 ALERT("TEST-3",1);
} /* U_Test3 */

/*-----U_Init_Test --------------------------------------------------------
*
*/ 
function U_Init_Test()
{
  U_Root0("$Test", C_jCd_Cur, 2);
} /* U_Init_Test */

  U_Root0("$Test", C_jCd_Cur, 1);
  return(_Test);
})();  /* Test */


