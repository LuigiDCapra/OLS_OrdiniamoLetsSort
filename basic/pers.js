/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : pers.js
* Function    : Persistence Management.
* FirstEdit   : 01/02/2022
* LastEdit    : 09/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Save automatically persistent variables (variable with prefix "GP_".
*     Ripristinate automatically persistent variables at the startup.
*     Variables that you want to be persistent but that are not important enough to be included in VConfig configuration list (DDJSts) can be handled using the following functions.
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Pers --------------------------------------------------------
*
*/ 
const $Pers = (function () {
  var _Pers = {};
  _Pers.U_Init                     = U_Init_Pers;               // function U_Init_Pers();
  _Pers.U_Clear_LocalStorage       = U_Clear_LocalStorage;      // function U_Clear_LocalStorage(P_fLS);
  _Pers.F_JSON_Read_LocalStorage   = F_JSON_Read_LocalStorage;  // function F_JSON_Read_LocalStorage(P_fLS, P_szNm_LocalStorage, P_JSON);
  _Pers.U_Write_JSON_LocalStorage  = U_Write_JSON_LocalStorage; // function U_Write_JSON_LocalStorage(P_fLS, P_szNm_LocalStorage, P_JSON);
  _Pers.U_Save                     = U_Save;                    // function U_Save();
  _Pers.U_Load                     = U_Load;                    // function U_Load();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Pers;

/*----- Local Variables ----------------------------------------------*/

/*--------------------------------------------------------------------*/

/*-----U_Clear_LocalStorage ----------------------------------------------------
*
* Clear the localstorage completely!
*/ 
function U_Clear_LocalStorage(P_fLS)
{
  if (P_fLS) {
     localStorage.clear();  
  }
  else {
     sessionStorage.clear();
  } /* if */
} /* U_Clear_LocalStorage */

/*-----F_JSON_Read_LocalStorage -------------------------------------------------
*
* Read a JSON Object from the localStorage
*/
function F_JSON_Read_LocalStorage(P_fLS, P_szNm_LocalStorage, P_JSON) 
{
  var szJSON = localStorage.getItem(P_szNm_LocalStorage);
  if (szJSON !== null) {
     try {
         return(JSON.parse(szJSON));
     } catch (P_Err) {
         $Error.U_Catch(C_jCd_Cur, 1, P_Err);
     } /* try catch */
  } /* if */
  return(null);
} /* F_JSON_Read_LocalStorage */

/*-----U_Write_JSON_LocalStorage ------------------------------------------------
*
* Write a JSON Object from the localStorage
*/
function U_Write_JSON_LocalStorage(P_fLS, P_szNm_LocalStorage, P_JSON) 
{
  var szJSON = JSON.stringify(P_JSON);
  localStorage.setItem(P_szNm_LocalStorage, szJSON);
} /* U_Write_JSON_LocalStorage */

/*-----U_Save --------------------------------------------------------
*
* Save the values of the Persistent global variables.
*/ 
function U_Save()
{
  var asPersist = {};
  var Var0;
   
  for (let szKey in window) {
      if (szKey.substr(0,3) == "GP_") {
         Var0 = window[szKey];
         asPersist[szKey] = Var0;
      } /* if */       
  } /* for */

  U_Write_JSON_LocalStorage(true, "Persist", asPersist); 
} /* U_Save */

/*-----U_Load --------------------------------------------------------
*
* Load the values of the Persistent global variables.
*/ 
function U_Load()
{
  var asPersist = F_JSON_Read_LocalStorage(true, "Persist"); 
  var Var0;
  
  if (!asPersist) {
     return;
  } /* if */
   
  for (let szKey in asPersist) {
      Var0 = asPersist[szKey];
      window[szKey] = Var0;       
  } /* for */
} /* U_Load */

/*-----U_Init_Pers --------------------------------------------------------
*
*/ 
function U_Init_Pers()
{  
  U_Load();
  U_Root0("$Pers", C_jCd_Cur, 2);
} /* U_Init_Pers */

  U_Root0("$Pers", C_jCd_Cur, 1);
  return(_Pers);
})();  /* Pers */

