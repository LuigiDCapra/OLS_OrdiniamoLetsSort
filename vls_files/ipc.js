/* ############################################################################
*
*  Copyright 2015.. 2016 - Luigi D. CAPRA - http://tuisys.com
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*  
*      http://www.apache.org/licenses/LICENSE-2.0
*  
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
*/

// ##### Module IPC ###########################

/*
*  ipc.js
*  Author Luigi D. CAPRA
*  01/07/2015
*  28/10/2016 [j103]
*/

var $IPC = (function(){
  var _IPC = {};
  _IPC.Init      = U_Init_IPC;               // function U_Init_IPC(P_Handler);
  _IPC.Clear     = U_Clear_IPC;              // function U_Clear_IPC()
  _IPC.Set_Reg   = U_Set_Reg_IPC;            // function U_Set_Reg_IPC(P_szReg, P_szVal)
  _IPC.szReg_Get = F_szReg_Get_IPC;          // function F_szReg_Get_IPC(P_szReg) 
  _IPC.Set_JSON  = U_Set_JSON_IPC;           // function U_Set_JSON_IPC(P_szReg, P_JSON);  
  _IPC.JSON_Get  = F_JSON_Get_IPC;           // function F_JSON_Get_IPC(P_szReg)  
   

var S_iCnt0 = 0;

function U_Set_Reg_IPC(P_szReg, P_szVal)
{
  localStorage.setItem(P_szReg, P_szVal);
  localStorage.setItem('iCnt', S_iCnt0++);
} /* U_Set_Reg_IPC */

function F_szReg_Get_IPC(P_szReg)
{
  return(localStorage.getItem(P_szReg));
} /* F_szReg_Get_IPC */

function U_Set_JSON_IPC(P_szReg, P_JSON)
{
  var szVal = JSON.stringify(P_JSON);
  G_szDebug = szVal;
  localStorage.setItem(P_szReg, szVal);
  localStorage.setItem('iCnt', S_iCnt0++);
} /* U_Set_JSON_IPC */

function F_JSON_Get_IPC(P_szReg)
{
  var JSON0 = JSON.parse(localStorage.getItem(P_szReg));
  return(JSON0);
} /* F_JSON_Get_IPC */

/* $NOOS$ WARNING: all data stored by web-pages with the "same origin" will be erased! */
function U_Clear_IPC()
{
  localStorage.clear();
} /* U_Clear_IPC */

function U_Init_IPC(P_Handler) {
  if (window.addEventListener) {
    window.addEventListener("storage", P_Handler, false);
  } else {
    /* IE */
    window.attachEvent("onstorage", P_Handler);
  } /* if */
} /* U_Init_IPC */

  return(_IPC);
})(); /* END - $IPC module */
