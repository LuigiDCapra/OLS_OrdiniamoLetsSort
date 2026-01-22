/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : jsonpath.js
* Function    : JSON Path Interpreter.
* FirstEdit   : 03/01/2021
* LastEdit    : 01/02/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     HTML's Elements print.
*     
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

const $JSonPath = (function () {
  var _JSonPath = {};
  _JSonPath.U_Init           = U_Init_JSonPath;     // function U_Init_JSonPath();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_JSonPath;

/*----- Local Variables ----------------------------------------------*/

/*
*  JsonPath.
*/
var S_szHTML_DBox_JsonPath = `<div style='padding:10%;'>
  <br><br><br><br>
  Query: <input id='Id_Inp_JsonPath' type='text'>
  <br><br><br><br>
</div>`;

/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/

/* # ---- Object JsonPath --------------------------------------------------------
*
* Control functions for JsonPath DBox objects.
*/ 
var S_DBox_JsonPath = (function(){
  var _JsonPath = {};
  _JsonPath.U_Open     = U_Open;      // function U_Open(P_Id);
  _JsonPath.U_Cancel   = U_Close;     // function U_Close(P_Id);
  _JsonPath.U_Confirm  = U_Confirm;   // function U_Confirm(P_Id);

/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Id)
{
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Id)
{
} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
*  https://jsonpath-plus.github.io/JSONPath/docs/ts/
*/ 
function U_Confirm(P_Id)
{
  var szCode = Id_Inp_JsonPath.value;
    
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var szTxt0 = jsonPath(XDB0.Coll0, szCode);

  new CL_XDB(['Query', C_JKndTup_Null, szTxt0,  null, 'AutoDetect',  '', C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]); 
  CL_UsrView0.F_UsrView_Select('Query', (C_WwFlag_fDisplay));
  $Error.U_Try('$Table.U_Display_Table();');
} /* U_Confirm */

  return(_JsonPath);
})(); /* # END - S_DBox_JsonPath Object */

/*-----U_Init_JSonPath --------------------------------------------------------
*
*/ 
function U_Init_JSonPath()
{ 
  _JSonPath.DBox_JsonPath = new CL_DBox('Id_Div_DBox0', '$JSonPath.DBox_JsonPath','JsonPath', S_szHTML_DBox_JsonPath, S_DBox_JsonPath.U_Open, G_DBox_Null.U_Cancel, S_DBox_JsonPath.U_Confirm, G_asaMnEntry.JsonPath, 'JsonPath');
  U_Root0("$JSonPath", C_jCd_Cur, 2);
} /* U_Init_JSonPath */

  U_Root0("$JSonPath", C_jCd_Cur, 1);
  return(_JSonPath);
})();  /* JSonPath */
