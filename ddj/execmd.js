/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : execmd.js
* Function    : Objects ExeCmd
* FirstEdit   : 30/11/2023
* LastEdit    : 11/12/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2024
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Expand the given object for display.
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

/*----- Module $ExeCmd --------------------------------------------------------
*
*/ 
const $ExeCmd = (function () {
  var _ExeCmd = {};
  _ExeCmd.U_Init          = U_Init_ExeCmd;     // function U_Init_ExeCmd();

  _ExeCmd.U_KeyPressed    = U_KeyPressed;      // function U_KeyPressed(P_Event);
  
/*
* Key pressed in the Table..
*/
  _ExeCmd.U_GoTo_OLS      = U_GoTo_OLS;        // function U_GoTo_OLS(P_iRow);
  _ExeCmd.U_Left          = U_Left;            // function U_Left();
  _ExeCmd.U_Right         = U_Right;           // function U_Right();
  _ExeCmd.U_Row_Up        = U_Row_Up;          // function U_Row_Up();
  _ExeCmd.U_Row_Dn        = U_Row_Dn;          // function U_Row_Dn();
  _ExeCmd.U_Pg_Up         = U_Pg_Up;           // function U_Pg_Up();
  _ExeCmd.U_Pg_Dn         = U_Pg_Dn;           // function U_Pg_Dn();    
  _ExeCmd.U_Home          = U_Home;            // function U_Home();    
  _ExeCmd.U_End           = U_End;             // function U_End();    
/*
* Key pressed in Card.
*/
  _ExeCmd.U_First_Tup1    = U_First_Tup1;      // function U_First_Tup();
  _ExeCmd.U_Prev_Tup      = U_Prev_Tup;        // function U_Prev_Tup ();
  _ExeCmd.U_Next_Tup      = U_Next_Tup;        // function U_Next_Tup ();
  _ExeCmd.U_Last_Tup1     = U_Last_Tup1;       // function U_Last_Tup ();
 
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_ExeCmd;

/*----- Local Variables ----------------------------------------------*/

/*--------------------------------------------------------------------*/

/*
* +++++++ Keys pressed in a Card +++++++
*/
/*-----U_First_Tup --------------------------------------------------------
*
*/ 
function U_First_Tup()
{
  U_GoTo_OLS(0);
} /* U_First_Tup */

/*-----U_Last_Tup --------------------------------------------------------
*
*/ 
function U_Last_Tup()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iLen = UsrView0.aNdx.length;
  U_GoTo_OLS(iLen -1);
} /* U_Last_Tup */

/*-----U_First_Tup1 --------------------------------------------------------
*
*/ 
function U_First_Tup1()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  
  $Card.F_Tup_Selection(C_jTup_Fst);
  $Card.U_OpenCard(XDB0, C_jOpt_Confirm_Edit);
} /* U_First_Tup1 */

/*-----U_Last_Tup1 --------------------------------------------------------
*
*/ 
function U_Last_Tup1()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  
  $Card.F_Tup_Selection(C_jTup_Lst);
  $Card.U_OpenCard(XDB0, C_jOpt_Confirm_Edit);
} /* U_Last_Tup1 */

/*-----U_Prev_Tup --------------------------------------------------------
*
*/ 
function U_Prev_Tup()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  
  $Card.F_Tup_Selection(C_jTup_Prv);
  $Card.U_OpenCard(XDB0, C_jOpt_Confirm_Edit);
} /* U_Prev_Tup */

/*-----U_Next_Tup --------------------------------------------------------
*
*/ 
function U_Next_Tup()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  
  $Card.F_Tup_Selection(C_jTup_Nxt);
  $Card.U_OpenCard(XDB0, C_jOpt_Confirm_Edit);
} /* U_Next_Tup */

/*
* +++++++ Keys pressed in the Table +++++++
*/

/*-----U_GoTo_OLS --------------------------------------------------------
*
*/ 
function U_GoTo_OLS(P_iRow)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iCol = UsrView0.iCol_Item_Sel;
  if (iCol < 0) {
     iCol = 0;
  } /* if */
//  $Table.U_ArrowMove(UsrView0, P_iRow +1, iCol);   // *321
} /* U_GoTo_OLS */

/*-----U_Left --------------------------------------------------------
*
*/ 
function U_Left()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;
  var iCol = UsrView0.iCol_Item_Sel;
  $Table.U_ArrowMove(UsrView0, iRow, iCol -1); 
} /* U_Left */

/*-----U_Right --------------------------------------------------------
*
*/ 
function U_Right()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;
  var iCol = UsrView0.iCol_Item_Sel;
  $Table.U_ArrowMove(UsrView0, iRow, iCol +1); 
} /* U_Right */

/*-----U_Row_Up --------------------------------------------------------
*
*/ 
function U_Row_Up()
{  
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;
  var iCol = UsrView0.iCol_Item_Sel;
  $Table.U_ArrowMove(UsrView0, iRow -1, iCol); 
} /* U_Row_Up */

/*-----U_Row_Dn --------------------------------------------------------
*
*/ 
function U_Row_Dn()
{  
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;
  var iCol = UsrView0.iCol_Item_Sel;
  $Table.U_ArrowMove(UsrView0, iRow +1, iCol);  
} /* U_Row_Dn */

/*-----U_Pg_Up --------------------------------------------------------
*
*/ 
function U_Pg_Up()
{
  var iInc = $VConfig.F_i_ValSts_Get("iNnRow_Page");
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;
  var iCol = UsrView0.iCol_Item_Sel;
  $Table.U_ArrowMove(UsrView0, iRow -iInc, iCol, C_fScroll);
} /* U_Pg_Up */

/*-----U_Pg_Dn --------------------------------------------------------
*
*/ 
function U_Pg_Dn()
{
  var iInc = $VConfig.F_i_ValSts_Get("iNnRow_Page");
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;
  var iCol = UsrView0.iCol_Item_Sel;
  $Table.U_ArrowMove(UsrView0, iRow +iInc, iCol, C_fScroll);
} /* U_Pg_Dn */

/*-----U_Home --------------------------------------------------------
*
*/ 
function U_Home()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  $Table.U_ArrowMove(UsrView0, 0, 0, C_fScroll);
} /* U_Home */

/*-----U_End --------------------------------------------------------
*
*/ 
function U_End()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected(); 
  $Table.U_ArrowMove(UsrView0, 1000000, 0, C_fScroll);
} /* U_End */

/*-----U_KeyPressed0 --------------------------------------------------------
*
* Key pressed in Table.
*/ 
function U_KeyPressed0(P_szKey)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;
  var iCol = UsrView0.iCol_Item_Sel;
 switch (P_szKey) {
   case "ArrowLeft": {
      $Table.U_ArrowMove(UsrView0, iRow, iCol -1); 
   } break;
   case "ArrowRight": {
      $Table.U_ArrowMove(UsrView0, iRow, iCol +1); 
   } break;
   case "Home": {
      $Table.U_ArrowMove(UsrView0, 1, 1); 
   } break;
   case "End": {
      $Table.U_ArrowMove(UsrView0, 1000000, 0); 
   } break;
   case "ArrowUp": {
      $Table.U_ArrowMove(UsrView0, iRow -1, iCol); 
   } break;
   case "ArrowDown": {
      $Table.U_ArrowMove(UsrView0, iRow +1, iCol);
   } break;
   case "PageUp": {
      var iInc = $VConfig.F_i_ValSts_Get("iNnRow_Page");
      $Table.U_ArrowMove(UsrView0, iRow -iInc, iCol); 
   } break;
   case "PageDown": {
      $Table.U_ArrowMove(UsrView0, iRow +iInc, iCol); 
   } break;
   default : {
   } break;
 } /* switch */
} /* U_KeyPressed0 */

/*-----U_KeyPressed1 --------------------------------------------------------
*
* Key pressed in Card.
*/ 
function U_KeyPressed1(P_szKey)
{
 switch (P_szKey) {
   case "Home": {
        U_First_Tup1();
   } break;
   case "End": {
        U_Last_Tup1();
   } break;
   case "PageUp": {
        U_Prev_Tup();
   } break;
   case "PageDown": {
        U_Next_Tup();
   } break;
   default : {
   } break;
 } /* switch */
} /* U_KeyPressed1 */

/*-----U_KeyPressed --------------------------------------------------------
*
*/ 
function U_KeyPressed(P_Event)
{
//  P_Event.preventDefault();
  var szKey = P_Event.key;
  if (CL_DBox.F_iCnt_DBox() > 0) {    
     U_KeyPressed1(szKey);
  }
  else {
     U_KeyPressed0(szKey);
  } /* if */
} /* U_KeyPressed */

/*-----U_Init_ExeCmd --------------------------------------------------------
*
*/ 
function U_Init_ExeCmd()
{
  U_Root0("$ExeCmd", C_jCd_Cur);
} /* U_Init_ExeCmd */

  return(_ExeCmd);
})();  /* ExeCmd */

