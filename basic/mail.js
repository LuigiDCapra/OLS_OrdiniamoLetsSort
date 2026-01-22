/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021: 
* File        : mail.js
* Function    : Viola's e-mail management.
* FirstEdit   : 28/07/2021
* LastEdit    : 29/08/2023
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2023
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
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Mail --------------------------------------------------------
*
*/ 
const $Mail = (function () {
  var _Mail = {};
  _Mail.U_Init          = U_Init_Mail;     // function U_Init_Mail();
  _Mail.U_Send        = U_SendMail;      // function U_SendMail(P_szDst, P_szSubject, P_szHeader, P_szMessage);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Mail;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

 /*-----U_SendMail --------------------------------------------------------
*
*/
var S_szBuffer_RX = ""; 
function U_SendMail(P_szDst, P_szSubject, P_szHeader, P_szMessage)
{
  var xhr      = new XMLHttpRequest();
  var szParams = "szDst=" + P_szDst + "&szSubject=" + P_szSubject + "&szHeader=" + P_szHeader + "&szMessage=" + P_szMessage;
  
  xhr.open('POST', "https://www.luigidcapra.altervista.org/big/5s3d9h6e56dljhg/viola/sendmail.php", true);
  
  //Send the proper header information along with the request
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  // Track the state changes of the request.
  xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      
      if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
              S_szBuffer_RX = xhr.responseText;
          } else {
              S_szBuffer_RX = "Dati non disponibili";
          } /* if */
      } /* if */
  } /* function */

  xhr.send(szParams);
} /* U_SendMail */

/*-----U_Init_Mail --------------------------------------------------------
*
*/ 
function U_Init_Mail()
{
//var szDst = "luigidcapra@katamail.com";
var szDst = "lcd1964yt@gmail.com";
//var szDst = "test-kanm34lc6@srv1.mail-tester.com";     /* https://www.mail-tester.com/ */
var szSubject = "Nuova Prova di trasmissione.";
var headers = "MIME-Version: 1.0" + "\r\n";
headers += "Content-type:text/html;charset=UTF-8" + "\r\n";
headers += 'From: <violetta@luigidcapra.com>' + "\r\n";
headers += "Reply-To: violetta@luigidcapra.com" + "\r\n";
//headers += 'Cc: arset@katamail.com' + "\r\n";

var szMessage = `
<!DOCTYPE html>
<html lang="it">
<head>
<title>HTML email</title>
</head>
<body>
<p>This email contains HTML Tags!</p>
<table>
<tr>
<th>Firstname</th>
<th>Lastname</th>
</tr>
<tr>
<td>John</td>
<td>Doe</td>
</tr>
</table>
</html>
`;


//  $Mail.Send(szDst, szSubject, headers, szMessage);

  U_Root0("$Mail", C_jCd_Cur, 2);
} /* U_Init_Mail */


  U_Root0("$Mail", C_jCd_Cur, 1);
  return(_Mail);
})();  /* Mail */


