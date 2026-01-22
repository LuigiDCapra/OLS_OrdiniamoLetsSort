/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : monitor.js
* Function    : text monitor
* FirstEdit   : 03/01/2021
* LastEdit    : 29/02/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2024
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
/*----- Global Variables ---------------------------------------------*/

var G_szMonitor = "";

const $Monitor = (function () {
  var _Monitor = {};
  _Monitor.U_Init               = U_Init_Monitor;        // function U_Init_Monitor();
  _Monitor.U_Monitor            = U_Monitor;             // function U_Monitor(P_fUser, P_szMsg);
  _Monitor.U_Clear_Monitor      = U_Clear_Monitor;       // function U_Clear_Monitor();
  _Monitor.F_szMsgUser_Lst      = F_szMsgUser_Lst;       // function F_szMsgUser_Lst();
  _Monitor.F_szMsgViola_Lst     = F_szMsgViola_Lst;      // function F_szMsgViola_Lst();
  _Monitor.F_szMsgUser_Mp_iPos  = F_szMsgUser_Mp_iPos;   // function F_szMsgUser_Mp_iPos(P_j);
  _Monitor.F_szMsgViola_Mp_iPos = F_szMsgViola_Mp_iPos;  // function F_szMsgViola_Mp_iPos(P_j);
  


/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Monitor;

/*----- Local Variables ----------------------------------------------*/

var S_Msg_Viola = [];
var S_jWr_Viola = 0;
var S_Msg_User  = [];
var S_jWr_User  = 0;
var S_iCnt = 0;

/*-----U_Monitor--------------------------------------------------------
*
*/ 
function U_Monitor(P_fUser, P_szMsg)
{
  var sz0 = "";
  if (P_fUser) {
     sz0 = "U " + S_jWr_User + " - ";
     S_Msg_User[S_jWr_User++] = P_szMsg;
  }
  else {
     sz0 = "V " + S_jWr_Viola + " - ";
     S_Msg_Viola[S_jWr_Viola++] = P_szMsg;
  } /* if */

  G_szMonitor += "\n" + sz0 + P_szMsg;
  Id_szMonitor.innerText = G_szMonitor;

//  Id_szMonitor.selectionStart = Id_szMonitor.selectionEnd = Id_szMonitor.value.length;   /*@ Firefox */
} /* U_Monitor*/

/*-----U_Clear_Monitor --------------------------------------------------------
*
*/ 
function U_Clear_Monitor()
{
  var Elem0 = document.getElementById("Id_szMonitor");
  G_szMonitor = "";
  Elem0.value = G_szMonitor;
} /* U_Clear_Monitor */

/*-----F_szMsgUser_Lst --------------------------------------------------------
*
*  Repeat last message.
*/ 
function F_szMsgUser_Lst()
{
  return((S_jWr_User -2 >= 0)? S_Msg_User[S_jWr_User -2]: "Non hai detto nulla!");
} /* F_szMsgUser_Lst */

/*-----F_szMsgUser_Mp_iPos --------------------------------------------------------
*
*/ 
function F_szMsgUser_Mp_iPos(P_j)
{
  return(S_Msg_User[P_j]);
} /* F_szMsgUser_Mp_iPos */


/*-----F_szMsgViola_Lst --------------------------------------------------------
*
*  Repeat last message.
*/ 
function F_szMsgViola_Lst()
{
  return((S_jWr_Viola -1 >= 0)? S_Msg_Viola[S_jWr_Viola -1]: "Non ho detto nulla!");
} /* F_szMsgViola_Lst */

/*-----F_szMsgViola_Mp_iPos --------------------------------------------------------
*
*/ 
function F_szMsgViola_Mp_iPos(P_j)
{
  return(S_Msg_Viola[P_j]);
} /* F_szMsgViola_Mp_iPos */

/*-----U_Init_Monitor --------------------------------------------------------
*
*/ 
function U_Init_Monitor()
{
  S_Msg_Viola = [];
  S_jWr_Viola = 0;
  S_Msg_User  = [];
  S_jWr_User  = 0;
  
  U_Clear_Monitor();
} /* U_Init_Name */

  return(_Monitor);
})();  /* Monitor */

