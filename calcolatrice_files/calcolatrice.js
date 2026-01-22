/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : calcolatrice.js
* Function    : Web Calculator.
* FirstEdit   : 30/04/2015
* LastEdit    : 30/03/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2021
* System      : Mozilla FireFox 80+
* -------------------------------------------------------------------------
*
* ### Needs
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/


/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Calcolatrice --------------------------------------------------------
*
*/ 
const $Calcolatrice = (function () {
  var _Calcolatrice = {};
  _Calcolatrice.U_Init          = U_Init_Calcolatrice; // function U_Init_Calcolatrice();
  _Calcolatrice.U_AddCh       = U_AddCh;             // function U_AddCh(P_szNum);
  _Calcolatrice.U_AddChHex    = U_AddChHex;          // function U_AddChHex(P_szNum);
  _Calcolatrice.U_Operand     = U_Operand;           // function U_Operand(P_szOpe);
  _Calcolatrice.U_Point       = U_Point;             // function U_Point();
  _Calcolatrice.U_Evaluate    = U_Evaluate;          // function U_Evaluate();
  _Calcolatrice.U_Delete      = U_Delete;            // function U_Delete();
  _Calcolatrice.U_Char        = U_Char;              // function U_Char();
  _Calcolatrice.U_Base        = U_Base;              // function U_Base(P_iBase);


/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur   = C_jCd_Calc;
const C_szNmAgent = "Calc";

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/


var S_szExpress = '';
var S_fSign     = false;
var S_fPoint    = false;
var S_fClr      = false;
var S_fFlg      = true;
var S_iBase     = 10;
var S_szRes     = "";

function U_AddCh(P_szNum) {
  if (P_szNum >= S_iBase) {
     /* ignore number greather then the base */
     return;
  } /* if */
  if (S_fClr) {
     Id_Txt_1.value  = P_szNum;
     S_fClr = false;
  } else {
     Id_Txt_1.value += P_szNum;
  } /* if */
  Id_Txt_2.value += P_szNum;
  S_fFlg = false;
} /* U_AddCh */

function U_AddChHex(P_szNum) {
  if (S_iBase < 16) {
     /* ignore number greather then the base */
     return;
  } /* if */
  if (S_fClr) {
     Id_Txt_1.value  = P_szNum;
     S_fClr = false;
  } else {
     Id_Txt_1.value += P_szNum;
  } /* if */
  Id_Txt_2.value += P_szNum;
  S_fFlg = false;
} /* U_AddChHex */

function U_Point() {
  if (!S_fPoint) {
     if (Id_Txt_1.value == "") {
        Id_Txt_1.value = 0;
        Id_Txt_2.value = 0;
     }/* if */
     Id_Txt_1.value += ".";
     Id_Txt_2.value += ".";
  } else {
     alert("Only one point is allowed!");
  }/* if */
  S_fPoint = true;
} /* U_Point */

function U_Operand(P_szOpe) {
  if (S_fFlg) {
     if (typeof S_szRes == "") {
         switch (P_szOpe) {
           case '+': {
           } break;
           case '-': {
                S_fSign = !S_fSign;
           } break;
           default : {
                alert("Unknown Operand");
           } break;
         } /* switch */
         return;
     } /* if */
     Id_Txt_2.value = S_szRes;
     S_fFlg = false;
  } /* if */
  Id_Txt_2.value += P_szOpe;
  S_fPoint = false;
  S_fClr = true;
} /* U_Operand */

function U_Evaluate() {
  var szTmp = Id_Txt_2.value;
  S_szRes = eval(szTmp);
  if (typeof S_szRes !== "undefined") {
     Id_Txt_1.value = S_szRes;
     Id_Txt_2.value += " = " + S_szRes;
     S_szExpress = '';
     S_fSign     = false;
     S_fPoint    = false;
     S_fClr      = false;
     S_fFlg      = true;
     return;     
  }  /* if */ 
} /* U_Evaluate */


function U_Delete() {
  S_szExpress = '';
  S_fSign     = false;
  S_fPoint    = false;
  S_fClr      = false;
  S_fFlg      = true;
  S_szRes     = "";
  Id_Txt_1.value = '';
  Id_Txt_2.value = '';
} /* U_Delete */

/*-----U_Char --------------------------------------------------------
*
*/ 
function U_Char()
{
  if (S_iBase <= 0) {
      var szTmp = Id_Txt_2.value;
      var iNum = szTmp.charCodeAt(0);
      Id_Txt_2.value = iNum;
      U_Base(10);
      Id_Base_2.style.color  = "black";
      Id_Base_8.style.color  = "black";
      Id_Base_10.style.color = "black";
      Id_Base_16.style.color = "black";
      Id_Char.style.color = "red"; 
      Id_Base_2.style.color  = "black";
      Id_Base_8.style.color  = "black";
      Id_Base_10.style.color = "red";
      Id_Base_16.style.color = "black";
      Id_Char.style.color = "black";
      S_iBase = 10;             
  }
  else {
    var szTmp = Id_Txt_2.value;
    S_szRes = eval(szTmp);
    if (typeof S_szRes !== "undefined") {
       var iNum_10 = parseInt(S_szRes, S_iBase);
       var sz0 = String.fromCharCode(iNum_10);
       Id_Txt_2.value = sz0;
       Id_Base_2.style.color  = "black";
       Id_Base_8.style.color  = "black";
       Id_Base_10.style.color = "black";
       Id_Base_16.style.color = "black";
       Id_Char.style.color = "red";
       S_iBase = 0;       
    } /* if */
  } /* if */
} /* U_Char */

function U_Base(P_iBase) {
  if (S_iBase <= 0) {
     /* char */
      var szTmp = Id_Txt_2.value;
      var iNum = szTmp.charCodeAt(0);
      Id_Txt_2.value = iNum;
      S_szRes = iNum;
      S_iBase = 10; // +++++
  } else {
      var szTmp = Id_Txt_2.value;
      S_szRes = eval(szTmp);
  } /* if */
  if (typeof S_szRes !== "undefined") {
     var iNum_10 = parseInt(S_szRes, S_iBase);
     var iNum_Base = iNum_10.toString(P_iBase);
     Id_Txt_1.value = iNum_Base;
     Id_Txt_2.value = iNum_Base;
  }  /* if */
  Id_Base_2.style.color  = "black";
  Id_Base_8.style.color  = "black";
  Id_Base_10.style.color = "black";
  Id_Base_16.style.color = "black";
  Id_Char.style.color = "black";

  S_szExpress = '';
  S_fSign     = false;
  S_fPoint    = false;
  S_fClr      = false;
  S_fFlg      = true;    
  S_iBase = P_iBase;        
  switch (P_iBase) {
    case 2: {
         Id_Base_2.style.color = "red";
    } break;
    case 8: {
         Id_Base_8.style.color = "red";
    } break;
    case 10: {
         Id_Base_10.style.color = "red";
    } break;
    case 16: {
         Id_Base_16.style.color = "red";
    } break;
    default : {
         Id_Base_10.style.color = "red";    
    } break;
  } /* switch */

} /* U_Base */

/*-----U_KeyPressed --------------------------------------------------------
*
*/ 
function U_KeyPressed(P_Event)
{
  if (P_Event.target.id == "Id_Txt_2") {
     return;
  } /* if */
  if (!P_Event.metaKey) {
    P_Event.preventDefault();
  } /* if */
  if (('0' <= P_Event.key) && (P_Event.key <= '9')) {
    var iTmp = P_Event.key;
  } /* if */
} /* U_KeyPressed */

/*-----U_ReceiveMessage --------------------------------------------------------
*
*/ 
function U_ReceiveMessage(P_Event) {
  alert("Calcolatrice " + P_Event.data);
  var szData = P_Event.data;
  
  var iNum = parseInt(szData, 10);
  
  if (iNum == NaN) {
      switch (szData) {
        case "più": {
        } break;
        case "meno": {
        } break;
        case "per": {
        } break;
        case "diviso": {
        } break;
        case "calcola":
        case "uguale": {
        } break;
        default : {
        } break;
      } /* switch */  
  } /* if */
  
} /* U_ReceiveMessage */

/*-----U_Periodic --------------------------------------------------------
*
*/
function U_Periodic()
{
  $IPCF.U_Active(C_szNmAgent);
} /* U_Periodic */

/*-----U_Init_Calcolatrice --------------------------------------------------------
*
*/ 
function U_Init_Calcolatrice()
{
  U_Delete();
  U_Base(10);
  
//  document.getElementById("Id_Tab_0").addEventListener("keydown", U_KeyPressed, false);
//  window.addEventListener('message', U_ReceiveMessage, false);
} /* U_Init_Calcolatrice */

  return(_Calcolatrice);
})();  /* Calcolatrice */
