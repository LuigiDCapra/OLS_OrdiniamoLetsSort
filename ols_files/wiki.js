/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : wiki.js
* Function    : Wikipedia access.
* FirstEdit   : 03/01/2021
* LastEdit    : 26/12/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2024
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

/*----- Module $Wiki --------------------------------------------------------
*
*/ 
const $Wiki = (function () {
  var _Wiki = {};
  _Wiki.U_Init        = U_Init_Wiki;     // function U_Init_Wiki();
  _Wiki.F_aszRes_Wiki = F_aszRes_Wiki;   // function F_aszRes_Wiki(P_szQuery);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Wiki;

/*----- Local Variables ----------------------------------------------*/

var S_aszResponse = [];

/*--------------------------------------------------------------------*/

/*-----U_Response --------------------------------------------------------
*
*/ 
function U_Response()
{
  $TTS.U_Long_speech(S_aszResponse[0]);
} /* U_Response */
  
/*-----F_aszRes_Wiki --------------------------------------------------------
*
*/
var Elem_Result = {};
 
function F_aszRes_Wiki(P_szQuery)
{
  var szQuery = P_szQuery;
  var szCdLang = "it";
  S_aszResponse = [];

  var XHR = new XMLHttpRequest();
  XHR.open("GET", "https://" + szCdLang + ".wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&generator=search&formatversion=2&piprop=thumbnail&pithumbsize=50&pilimit=10&exchars=150&exlimit=10&exintro=1&explaintext=1&gsrsearch="+szQuery+"&gsrlimit=10&gsrprop=snippet" , true);

  XHR.onprogress = function() {
      Elem_Result.innerHTML = "<p>Searching...</p>";
  } /* XHR.onprogress */
  
  XHR.onload = function () {
      var szTxt = "";
      var szData = JSON.parse(XHR.responseText);
      if (szData.query==undefined) {
          szMsg = "Non ho trovato alcuna informazione.";
          setTimeout(szMsg, 0);
      } /* if */
      
      var aObj_Response = szData.query.pages;
      for (var Obj_Response of aObj_Response) {
          var x0 = Obj_Response.pageid;
          var x1 = Obj_Response.title;
          var x2 = Obj_Response.extract;

          szTxt = Obj_Response.extract;
          S_aszResponse.push(szTxt);
      }  /* for */
      setTimeout(U_Response, 0); 
  } /* XHR.onload */
  
  XHR.onerror = function() {
      $Error.U_Error(C_jCd_Cur, 1, "An error occured consulting Wikipedia.", "", false);
  } /* XHR.onerror */
  
  XHR.send();
} /* F_aszRes_Wiki */

/*-----U_Init_Wiki --------------------------------------------------------
*
*/ 
function U_Init_Wiki()
{
  U_Root0("$Wiki", C_jCd_Cur, 2);
} /* U_Init_Name */

  U_Root0("$Wiki", C_jCd_Cur, 1);
  return(_Wiki);
})();  /* Wiki */
