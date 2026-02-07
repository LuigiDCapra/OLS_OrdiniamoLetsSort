/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : test.js
* Function    : Test procedures.
* FirstEdit   : 15/12/2019
* LastEdit    : 25/01/2026
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
*     Data Browsing Environment.
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
* $$$$$ IMPORTANTE NON CANCELLARE !!!!!
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

/*-----F_szTOON --------------------------------------------------------
*
*/ 
function F_szTOON_Lcd(P_Val, P_iIndent=0)
{
  var aszIndent = ["", "  ", "    ", "      ", "        ", "          ", "            ", "              ", "                "];

  function F_szTOON_Object(P_Val, P_iIndent, P_fFirst=false)
  {
    var iIndent  = P_iIndent +1;
    var szIndent = (P_fFirst)? "": aszIndent[P_iIndent];
    P_fFirst = false;
    var szObj = "";
    var Key;
    var sz0, Val0;
    for (Key in P_Val) {
        Val0 = P_Val[Key];
        sz0 = F_szTOON_Term(Val0, iIndent);
        if (Val0 instanceof Object) {
           szObj += szIndent + Key + ':\n' + sz0;
        }
        else {
           szObj += szIndent + Key + ': ' + sz0 + "\n";
        } /* if */
        szIndent = (P_fFirst)? "": aszIndent[P_iIndent];
    } /* for */
    return(szObj);  
  } /* F_szTOON_Object */

  function F_szTOON_Term(P_Val, P_iIndent)
  {
    var szIndent = aszIndent[P_iIndent];
    var chSep = ',';
    var szType = typeof(P_Val);
    var szTOON;
    if (szIndent == undefined) {
       alert("Error");
       return;
    } /* if */
  
    switch (szType) {
      case "string": {
            szTOON = P_Val.replaceAll('"', '\\"');
      } break;
      case "number": {
            if (Number.isFinite(P_Val)) {
               if (P_Val == -0) {
                  szTOON = "0";
               }
               else {
                  szTOON = "" + P_Val;
               } /* if */
            }
            else { 
               szTOON = "null";
            } /* if */
      } break;
      case "boolean": {
            szTOON = (P_Val)? "true": "false";
      } break;
      case "bigint": {
           if ((Number.MIN_SAFE_INTEGER <= P_Val) && (P_Val <= Number.MAX_SAFE_INTEGER)) {
              szTOON = "" + P_Val;
           }
           else {
              szTOON = '"' + P_Val + '"';
           } /* if */
      } break;

      case "object" : {
           var i, sz0;
           if (P_Val instanceof Array) {          // ARRAY
              var iLen = P_Val.length;
              if (iLen == 0) {
                 szTOON = "[0]:";
                 break;
              } /* if */                               
              var szArr = '['+ P_Val.length + ']:';
              var fInLine = true;
              for (i = 0; i < iLen; i++) {
                  if ((typeof(P_Val[i]) == "object") && (P_Val[i] !== null)) {
                     fInLine = false;
                     break;
                  } /* if */
              } /* for */
              if (fInLine) {
                  szArr += " ";   /* Mandatory blank */
                  iLen--;
                  if (iLen > 0) {
                     for (i = 0; i < iLen; i++) {
                         sz0 = F_szTOON_Term(P_Val[i], P_iIndent);
                         szArr += sz0 + chSep;
                     } /* for */
                      
                     sz0 = F_szTOON_Term(P_Val[i], P_iIndent);
                     szArr += sz0;
                 } /* if */              
              }
              else {
                 // NOT inline
                  P_iIndent++;
                  var faRcd = true;
                  for (i = 0; i < iLen; i++) {
                      var ValTmp = P_Val[0];
                      if (!(ValTmp instanceof Array)) {
                         faRcd = false;
                      } /* if */
                  } /* for */
                  if (faRcd) {
                     for (i = 0; i < iLen; i++) {
                         szIndent = aszIndent[P_iIndent];

                            szArr += "\n" + szIndent + "- ";                       

                         sz0 = F_szTOON_Term(P_Val[i], P_iIndent +1);
                         szArr += sz0;
                        // $LcdLcd.U_Write("R:/toon_a.txt", szArr, false);
                          var x = i;
                     } /* for */                  
                  }
                  else {
                     szArr += "\n";
                     for (i = 0; i < iLen; i++) {
                         szIndent = aszIndent[P_iIndent];

                            szArr += szIndent + "- ";                        

                         sz0 = F_szTOON_Term(P_Val[i], P_iIndent +1);
                         szArr += sz0;
                         // $LcdLcd.U_Write("R:/toon_b.txt", szArr, false);
                          var x = i;
                     } /* for */  
                  } /* if */

              } /* if */
             szTOON = szArr;
           }
           else if (P_Val instanceof Date) {      // DATE
              szTOON = `"${P_Val.toISOString()}"`;
           }
           else if (P_Val === null) {             // NULL
                szTOON = "null";
           }
           else if (P_Val instanceof Object) {    // OBJECT
                szTOON = F_szTOON_Object(P_Val, P_iIndent, true);
           }
           else {
                alert("Unexpected Object");
                debugger;
                szTOON = "null";
           } /* if */     
      } break;  /* Object */
      
      case "symbol": {
           szTOON = "null";
      } break;
      case "undefined": {
           szTOON = "null";
      } break;
      case "function": {
           szTOON = "null";
      } break;
      default : {
           alert("Unexpected Type");
           debugger;
           szTOON = "null";
      } break;
    } /* switch */

    return(szTOON);
  } /* F_szTOON_Term */

  try {
      var szToon = F_szTOON_Term(P_Val, P_iIndent);
  } catch (P_Err) {
      alert("Error: " + P_Err);
  } /* try catch */
  return(szToon);
} /* F_szTOON */

/*-----F_szTOON_Foreign --------------------------------------------------------
*
*/ 
function F_szTOON_Foreign(P_Val)
{
  try {
      var szToon = encode(P_Val);
  } catch (P_Err) {
      alert("Error: " + P_Err);
  } /* try catch */
  return(szToon);
} /* F_szTOON_Foreign */

/*-----U_Compare --------------------------------------------------------
*
*/ 
function U_Compare(P_Val)
{
  var szForeign = F_szTOON_Foreign(P_Val);
  var szLCD     = F_szTOON_Lcd(P_Val);
  if (szForeign != szLCD) {

      $LcdLcd.U_Write("R:/orig.txt", JSON.stringify(P_Val), false);

      $LcdLcd.U_Write("R:/foreign.txt", szForeign, false);
      $LcdLcd.U_Write("R:/lcd.txt", szLCD, false);
     ALERT("diversi", 1);
  } /* if */
} /* U_Compare */

/*-----U_Test1 --------------------------------------------------------
*
* https://toonformat.dev/reference/syntax-cheatsheet
* https://toonformat.dev/playground.html
* https://jsontotable.org/json-to-toon
* https://jsontotable.org/toon-to-json
*/ 
function U_Test1()
{
 var Date0 = new Date;
 var Symbol0 = Symbol("black-cat");
 
const C_Arr   = [0,1,2,3,4,5,6,7,8,9];            
const C_Obj   = {"sz0":"aaa", "iNum":100, "fBool":true};            
const C_aRcd  = [["aRcd", 100, true], ["bbb", 101, true], ["ccc", 102, true], ["ddd", 103, true]];            
const C_aObj  = [{"sz0":"aObj", "iNum":100, "fBool":true}, {"sz0":"bbb", "iNum":101, "fBool":true}, {"sz0":"ccc", "iNum":102, "fBool":true}];            
const C_asRcd = {"Key0":["asRcd", 100, true], "Key1":["bbb", 101, true], "key2":["ccc", 102, true], "Key3":["ddd", 103, true]};            
const C_asObj = {"Key0":{"sz0":"asObj", "iNum":100, "fBool":true}, "Key1":{"sz0":"bbb", "iNum":101, "fBool":true}, "key2":{"sz0":"ccc", "iNum":102, "fBool":true}};            
const C_as_   = {"dog":"cane", "cat":"gatto"};

var aTest = [
123,                            
"cane",
true,                            
null,                           
undefined,                      
Symbol0,                        
NaN,                            
Infinity,                       
-Infinity,                      
-0,                             
Number.MIN_SAFE_INTEGER,        
Number.MAX_SAFE_INTEGER,        
BigInt(9876543210987654),       
123e4,                          
-0001,                          
Date0,                          
[],                             
C_Arr,                          
C_aRcd,                         
C_aObj                         
];

var i;

for (i = 0; i < aTest.length; i++) {
     U_Compare(aTest[i]);
} /* for */

ALERT("OK1",1);
 
 $LcdLcd.U_Write("R:/toon5.txt", s0, false);
// debugger;
 var x = 5;
} /* U_Test1 */

/*-----U_Test2 --------------------------------------------------------
*
*/ 
function U_Test2()
{
var initialString = '[["Something or other àèéìò§èé°°ΑΒΓΔΕΖ°°°"]]';
//var initialString = '[["Something"]]';
 
 //ALERT("DONE-2",1);
 
 var szEnc = $Security.F_szTxt_Krypt(initialString);

 //debugger;
 $IPCF.U_UpLoad_File('http://localhost/Relay/irc/writebin.php/?szUser=Luigi&szTopic=r:/gatto5.arcd', szEnc, true);
 
 
// var szDec = $Security.F_szTxt_DeKrypt(szEnc);
 
 //debugger
} /* U_Test2 */

/*-----U_Test3 --------------------------------------------------------
*
*/ 
function U_Test3()
{ 
 ALERT("DONE-3",1);
// debugger;  
// var initialString = "Something or other àèéìò§èé°°°°°";
// 
// var a_i8_Enc = new TextEncoder("utf-8").encode(initialString);       // utf8EncodedString is a Uint8Array, so you can inspect the individual bytes directly:
// 
// 
// var szDecoded = new TextDecoder("utf-8").decode(a_i8_Enc);
// 
// if (initialString !== szDecoded) {
//     console.error("You're lying!");
// }
// debugger;
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


