/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : position.js
* Function    : Position Management.
* FirstEdit   : 14/07/2021
* LastEdit    : 05/02/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
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

/*----- Module $Position --------------------------------------------------------
*
*/ 
const $Position = (function () {
  var _Position = {};
  _Position.U_Init      = U_Init_Position;   // function U_Init_Position();
  _Position.U_Posiz     = U_Posiz;           // function U_Posiz();
  _Position.szHTML_GPS  = "";

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Position;

/*----- Local Variables ----------------------------------------------*/
  
/*--------------------------------------------------------------------*/

/*-----U_Posiz --------------------------------------------------------
*
*/ 
function U_Posiz()
{
  function U_DisplayMap(P_GPS)
  {
    _Position.szHTML_GPS = `Latitude: ${P_GPS.coords.latitude}<br>Longitude: ${P_GPS.coords.longitude}<br>Altitude: ${P_GPS.coords.altitude}`;	
  }  /* U_DisplayMap */
   
  function U_Error_GPS(P_szErr)
  {
    var szErr = "";
    switch (P_szErr.code) {
      case P_szErr.PERMISSION_DENIED: {
           szErr = "User denied the request for Geolocation.";
      } break;
      case P_szErr.POSITION_UNAVAILABLE: {
           szErr = "Location information is unavailable.<br><br><b>You should enable Network connection.</b>";
      } break;
      case P_szErr.TIMEOUT: {
           szErr = "The request to get user location timed out.";
      } break;
      case P_szErr.UNKNOWN_ERROR: {
           szErr = "An unknown error occurred.";
      } break;
      default : {
      } break;
    } /* switch */
    
    _Position.szHTML_GPS = szErr;

    $Error.U_Warning(C_jCd_Cur, 1, szErr, "", false);
  }  /* U_Error_GPS */
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(U_DisplayMap, U_Error_GPS);
  }
  else {
    var szErr = "Geolocation is not supported by this browser.";
    $Error.U_Error(C_jCd_Cur, 2, szErr, "", false);
  } /* if */
} /* U_Posiz */

/*-----U_Init_Position --------------------------------------------------------
*
*/ 
function U_Init_Position()
{
} /* U_Init_Name */

  return(_Position);
})();  /* Position */

