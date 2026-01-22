/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : dsaft.js
* Function    : Data-Safety
* FirstEdit   : 15/12/2019
* LastEdit    : 06/09/2025
* System      : Mozilla FireFox 80+
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2024
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


const $DSaft = (function () {
  var _DSaft = {};
  _DSaft.U_Init          = U_Init_Dsaft;          // function U_Init_Dsaft();

  _DSaft.F_szTxt_Krypt   = F_szTxt_Krypt;         // function F_szTxt_Krypt(P_szText);
  _DSaft.F_szTxt_DeKrypt = F_szTxt_DeKrypt;       // function F_szTxt_DeKrypt(P_szText);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_DSaft;

/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----F_szTxt_Krypt --------------------------------------------------------
* Stub
*/ 
function F_szTxt_Krypt(P_szTxt)
{
  return(P_szTxt);
} /* F_szTxt_Krypt */

/*-----F_szTxt_DeKrypt --------------------------------------------------------
* Stub
*/ 
function F_szTxt_DeKrypt(P_szTxt)
{
  return(P_szTxt);
} /* F_szTxt_DeKrypt */

/*-----U_Init_Dsaft --------------------------------------------------------
*
*/ 
function U_Init_Dsaft()
{
  U_Root0("$DSaft", C_jCd_Cur, 2);
} /* U_Init_Dsaft */

  U_Root0("$DSaft", C_jCd_Cur, 1);
  return(_DSaft);
})();  /* $DSaft */
