/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : uti.js
* Function    : Program Utililies.
* FirstEdit   : 09/09/2023
* LastEdit    : 23/11/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/

const C_Undefined = undefined;                 /* Constant of type "undefined" */

/*----- Global Variables ---------------------------------------------*/

/*-----U_Null --------------------------------------------------------
*
*/ 
function U_Null()
{

} /* U_Null */

/*-----F_Null --------------------------------------------------------
*
*/ 
function F_Null()
{
   return(0);
} /* F_Null */

/*-----F_Ww_Scrambler --------------------------------------------------------
*
* Scrambler 16 bit
*/ 
function F_Ww_Scrambler(P_Ww)
{
  var Ww0 = P_Ww & 0x000f;
  var Ww1 = P_Ww & 0x00f0;
  var WwRes = (Ww0 << 8) | (Ww1 >> 8);
  return(WwRes ^ 0xa5a5);  
} /* F_Ww_Scrambler */

/*-----F_DateConv --------------------------------------------------------
*
*  F_DateConv(P_Tup[0])
*/ 
function F_DateConv(P_Date)
{
   var a0 = P_Date.split(" ");
   var b1 = a0[0].split("-");
   var c2 = b1[2] + "/" + b1[1] + "/" + b1[0];
  
   return(c2);
} /* F_DateConv */
 
/*-----F_szPad2 --------------------------------------------------------
*
* Pad two digits. Used for times and dates.
*/ 
function F_szPad2(P_iNum)
{
  var szNum;
  P_iNum = +P_iNum;
  if (P_iNum < 10) {
     szNum = '0' + P_iNum;
  }
  else {  
     szNum = P_iNum;
  } /* if */
  return(szNum);
} /* F_szPad2 */

/*-----F_szPadLft --------------------------------------------------------
*
*/ 
function F_szPadLft(P_sz0, P_ch, P_iNn)
{
   var iLen = ("" + P_sz0).length;
   var szPad = "";
   for (var i = iLen; i < P_iNn; i++) {
       szPad += P_ch;
   } /* for */
   return(szPad + P_sz0);
} /* F_szPadLft */

 /*-----F_szPadRgt --------------------------------------------------------
*
*/ 
function F_szPadRgt(P_sz0, P_ch, P_iNn)
{
   var iLen = ("" + P_sz0).length;
   var szPad = "";
   for (var i = iLen; i < P_iNn; i++) {
       szPad += P_ch;
   } /* for */
   return(P_sz0 + szPad);
} /* F_szPadRgt */
 
/*-----F_fDate --------------------------------------------------------
*
* Check in the value of the argument P_Date is a date. 
*/ 
function F_fDate(P_Date)
{
  var fDate = (P_Date instanceof Date && !isNaN(date.valueOf()));
  
  return(fDate);
} /* F_fDate */

/*-----F_szHTML_Option_Mp_aObj --------------------------------------------------------
*
*  Given an array of objects return the HTML code of the corresponding options for selection.
*
*  P_szKey_Sel element selected
*  P_fOption_Null == true insert the "null" option.
*  P_fszKey_i == true  insert szKey
*  P_fszKey_i == false insert i 
*/ 
function F_szHTML_Option_Mp_aObj(P_aRcd, P_Key, P_szKey_Sel, P_fOption_Null=false, P_fszKey_i=true)
{
  var szHTML_Option = "";
  var szSelected;
  var szKey;
  var szIns;
  
  if (P_fOption_Null) {     
      szHTML_Option += `<option value="">----</option>`;
  } /* if */

  for (var i = 0; i < P_aRcd.length; i++) {
      szKey = P_aRcd[i][P_Key];
      szSelected = (szKey == P_szKey_Sel)? "selected":"";
      szIns = (P_fszKey_i)? szKey: i;
      szHTML_Option += `<option value="${szIns}" ${szSelected}>${szKey}</option>`;
  } /* for */ 
  return(szHTML_Option);
} /* F_szHTML_Option_Mp_aObj */

/*-----F_Obj_Mp_Select --------------------------------------------------------
*
* Given an array of objects return the object corresponding to the key (Key0) selected by the user.
* Return null if the Null Option was selected.
*/ 
function F_Obj_Mp_Select(P_Id, P_aRcd, P_szKey)
{
  var Elem0 = document.getElementById(P_Id);
  var Key0 = Elem0.value;
  var Rcd0 = null;
  if (Key0 == "") {
     /* The null option was selected. */
     return(null);
  } /* if */
  for (let i = 0; i < P_aRcd.length; i++) {
      if (P_aRcd[i][P_szKey] == Key0) {
         Rcd0 = P_aRcd[i]; 
         break;
      } /* if */
  } /* for */
  return(Rcd0);
} /* F_Obj_Mp_Select */

/*-----U_Wr_Clipboard--------------------------------------------------------
*
* Copy text in the clipboard
*/ 

async function U_Wr_Clipboard(P_szTmp, P_fJSON=false) {
  if (P_fJSON) {  
    var szJSON = JSON.stringify(P_szTmp);
    P_szTmp = szJSON.replaceAll("],[","],\r[");   
  } /* if */
  try {
    await navigator.clipboard.writeText(P_szTmp);
    ALERT('Page URL copied to clipboard', 4);
  } catch (P_Err) {
    if (typeof($Error) != "undefined") {
       $Error.U_Warning(C_jCd_Uti, 1, 'Failed to copy: ', P_Err.message, false);
    } /* if */
  } /* try */
} /* U_Wr_Clipboard*/

/*-----F_szIns_sz1_at_Pos --------------------------------------------------------
*
* Insert string at position.
*/ 
function F_szIns_sz1_at_Pos(P_sz0, P_sz1, P_iPos)
{
  var szDst = P_sz0.substr(0, P_iPos) + P_sz1 + P_sz0.substr(P_iPos);
  return(szDst); 
} /* F_szIns_sz1_at_Pos */

/*-----F_szReverse --------------------------------------------------------
*
* Reverse string.
* "abcd" ==> "dcba"
*/ 
function F_szReverse(P_szAZ) {
    var szZA = "";
    for (let i = P_szAZ.length - 1; i >= 0; i--) {
        szZA += P_szAZ[i];
    } /* for */
    return(szZA);
} /* F_szReverse */

/*-----F_Obj_Clone --------------------------------------------------------
*
* Clone user-defined object.
*/ 
function F_Obj_Clone(P_Obj)
{
  var szObj = JSON.stringify(P_Obj);
  var Obj1  = JSON.parse(szObj);
  var Val0, szNm;

  for (szNm in P_Obj) {
      Val0 = P_Obj[szNm];
      if (typeof(Val0) == "function") {
         Obj1[szNm] = Val0;
      } /* if */
  } /* for */
  return(Obj1);
} /* F_Obj_Clone */

/*-----U_Root0 --------------------------------------------------------
*
*/ 
function U_Root0(P_x, P_y)
{
  $Root.U_Root(P_x, P_y);
} /* U_Root0 */

/*-----F_szWrd_Mp_szStr --------------------------------------------------------
*
* Given a string return the word in position P_j. 
*/ 
function F_szWrd_Mp_szStr(P_szStr, P_j)
{
  var asz = P_szStr.split(" ");
  
  if (P_j >= 0) {
     return(asz[P_j]);
  }
  else {
     return(asz[asz.length - (P_j +1)]);
  } /* if */
} /* F_szWrd_Mp_szStr */

/*-----U_Set_Fld --------------------------------------------------------
*
* Sets the selected boolean attribute of the given object
*/ 
function U_Set_Fld(R_Obj, P_szFld)
{
  R_Obj[P_szFld] = true;
} /* U_Set_Fld */

/*-----U_Reset_Fld --------------------------------------------------------
*
* Resets the selected boolean attribute of the given object
*/ 
function U_Reset_Fld(R_Obj, P_szFld)
{
  R_Obj[P_szFld] = false;
} /* U_Reset_Fld */

/*-----U_Toggle_Fld --------------------------------------------------------
*
* Toggle the selected boolean attribute of the given object
*/ 
function U_Toggle_Fld(R_Obj, P_szFld)
{
  R_Obj[P_szFld] = !R_Obj[P_szFld];
} /* U_Toggle_Fld */

/*-----M_Abs --------------------------------------------------------
*
*/ 
function M_Abs(P_Val)
{
  return((P_Val < 0)? -P_Val: P_Val);
} /* M_Abs */

/*-----F_fEmpty_Obj --------------------------------------------------------
*
* Test for empty Obj that is {}.
* Ref. https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
*/ 
function F_fEmpty_Obj(P_Obj)
{
  return(Object.keys(P_Obj).length === 0);
} /* F_fEmpty_Obj */

/*-----F_ValFld_Obj --------------------------------------------------------
*
* Return the value of P_Obj[P_szNm_Fld]; if exists.
*/ 
function F_ValFld_Obj(P_Obj, P_szNm_Fld)
{
  var Val0 = C_Undefined;
  if (typeof(P_Obj) == "object") {
     Val0 = P_Obj[P_szNm_Fld];
  } /* if */
  return(Val0);
} /* F_ValFld_Obj */

/*-----F_szUndefined --------------------------------------------------------
*
* HUB. Return string "undefined"
*/ 
function F_szUndefined()
{
  return("undefined");
} /* F_szUndefined */

/*-----F_szExt_Mp_szFlNm --------------------------------------------------------
*
* Given a filename return the corresponding extension.
*/ 
function F_szExt_Mp_szFlNm(P_szFlNm)
{
  var iDotPos = P_szFlNm.lastIndexOf(".");
  var szExt = P_szFlNm.substring(iDotPos + 1);
  szExt = szExt.toLowerCase();
  return(szExt);
} /* F_szExt_Mp_szFlNm */

/*-----Min --------------------------------------------------------
*
*/ 
function Min(P_0, P_1)
{
  return((P_0 < P_1)? P_0: P_1);
} /* Min */

/*-----Max --------------------------------------------------------
*
*/ 
function Max(P_0, P_1)
{
  return((P_0 > P_1)? P_0: P_1);
} /* Max */

