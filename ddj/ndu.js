/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Web Server
* Revision    : 0.021
* File        : ndu.js
* Function    : Network Disk Units.
* FirstEdit   : 15/06/2024
* LastEdit    : 01/09/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
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
*     File Manager. Browse directories list.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
//"use strict";

/* ***** CL_NDU **************************************************************
*
* new CL_NDU
*/ 
class CL_NDU {
  constructor(P_szNm, P_Server, P_F_szURL_Mp_Cmd_Res=F_Null, P_U_CB_NL_Cmd=U_Null)
  {
    U_Root0("CL_NDU", P_szNm);
    this.szNm = P_szNm;
    this.F_szURL_Mp_Cmd_Res = P_F_szURL_Mp_Cmd_Res;
    this.P_U_CB_NL_Cmd      = P_U_CB_NL_Cmd;
  } /* constructor */

  /*-----F_szURL_Mp_Cmd_Res --------------------------------------------------------
  *
  * P_szNm   - website name (short)
  * P_szCmd  - service name with constant parameters
  * P_szNmFl - filename of the Collection.
  */ 
  F_szURL_Mp_Cmd_Res(P_szNm, P_szCmd, P_szNmFl)
  {
    var Server0 = S_asServer1[P_szNm];
    var szCmd   = `${Server0[C_j_szDir]}${P_szCmd}/?${P_szNmFl}`;
    return(szCmd); 
  } /* F_szURL_Mp_Cmd_Res */

}  /* class CL_NDU */

const $NDU = (function () {
  var _NDU = {};
  _NDU.U_Init             = U_Init_NDU;          // function U_Init_NDU();
  _NDU.F_szURL_Mp_Cmd_Res = F_szURL_Mp_Cmd_Res;  // function F_szURL_Mp_Cmd_Res(P_szNm, P_szCmd, P_szNmFl);
  _NDU.F_szURL_Mp_szFlNm  = F_szURL_Mp_szFlNm;   // function F_szURL_Mp_szFlNm(P_szDNS, P_szNmFl);
  _NDU.F_szDNS_Server     = F_szDNS_Server;      // function F_szDNS_Server(P_szNm); 
  _NDU.F_szDir_Server     = F_szDir_Server;      // function F_szDir_Server(P_szNm); 
  _NDU.F_U_CB_Chk         = F_U_CB_Chk;          // function F_U_CB_Chk(P_szNm);

/*----- Local Constants ----------------------------------------------*/

const C_j_szDNS     = 0;   /* DNS */
const C_j_szDir     = 1;   /* Directory in which reside the Server. */
const C_j_szSrv_Knd = 2;   /* Server kind. */
const C_j_szUsr     = 3;   /* User name. */
const C_j_szPass    = 4;   /* Password. */
const C_j_Obj       = 5;
const C_j_U_CB_Chk  = 6;

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_NDU;

var S_asServer1 = {
  "localhost":    ["http://localhost/",                  "http://localhost/Relay/irc/",                    "PHP-DDJ", "user", "password", U_CB_Chk_Dflt, "NDU"], 
  "sql":          ["http://localhost/",                  "http://localhost/Relay/irc/",                    "PHP-SQL", "user", "password", U_CB_Chk_Dflt],                                      
  "canavesehub.altervista.org":  ["http://canavesehub.altervista.org/", "http://canavesehub.altervista.org/Big/LCD/irc/", "PHP-DDJ", "user", "password", U_CB_Chk_Dflt],                                      
  "helios:27015": ["http://helios:27015/",               "http://helios:27015/",                           "C",       "user", "password", U_CB_Chk_Dflt]  
};

/*--------------------------------------------------------------------*/

/*-----U_CB_Chk_Dflt --------------------------------------------------------
*
*/ 
function U_CB_Chk_Dflt(P_0, P_1, P_2)
{
  debugger;
} /* U_CB_Chk_Dflt */

/*-----F_szURL_Mp_Cmd_Res --------------------------------------------------------
*
* Given the name of the Server build the URL for the requested command.
*
* P_szDNS   - website name (short)
* P_szCmd  - service name with constant parameters
* P_szNmFl - filename of the Collection.
* 
* $NDU.F_szURL_Mp_Cmd_Res();
*/ 
function F_szURL_Mp_Cmd_Res(P_szDNS, P_szCmd, P_szNmFl)
{
  var szUser  = $VConfig.F_ValSts_Get("szUser");
  var Server0 = S_asServer1[P_szDNS];
  var szDir   = F_szDir_Server(P_szDNS);
  var szCmd   = "";
  
  switch (Server0[C_j_szSrv_Knd]) {
    case "PHP-DDJ": {
         szCmd = `${szDir}${P_szCmd}.php/?szUser=${szUser}&szTopic=${P_szNmFl}`;
    } break;
    default : {
         szCmd = `${szDir}${P_szCmd}/?${P_szNmFl}`;
    } break;
  } /* switch */
  return(szCmd); 
} /* F_szURL_Mp_Cmd_Res */

/*-----F_szURL_Mp_szFlNm --------------------------------------------------------
*
* Given the name of the Server build the URL for the requested file.
* $NDU.F_szURL_Mp_szFlNm();
*/ 
function F_szURL_Mp_szFlNm(P_szDNS, P_szNmFl)
{
  var szDir = F_szDir_Server(P_szDNS);
  var szURL = (szDir)? `${szDir}${P_szNmFl}`: P_szNmFl;
  return(szURL); 
} /* F_szURL_Mp_szFlNm */

/*-----F_szDNS_Server --------------------------------------------------------
*
* Directory in which is located the server.
* $NDU.F_szDNS_Server();
* 
* Given   "localhost": ["http://localhost/", "http://localhost/Relay/irc/", "PHP-DDJ", "user", "password", U_CB_Chk_Dflt, "NDU"] returns "http://localhost/". 
*/ 
function F_szDNS_Server(P_szDNS)
{
  var Server0 = S_asServer1[P_szDNS];
  if (Server0) {
     return(Server0[C_j_szDNS]);
  }
  else {
     return(null);
  } /* if */
} /* F_szDNS_Server */

/*-----F_szDir_Server --------------------------------------------------------
*
* Directory in which is located the server.
* $NDU.F_szDir_Server();
* 
* Given   "localhost": ["http://localhost/", "http://localhost/Relay/irc/", "PHP-DDJ", "user", "password", U_CB_Chk_Dflt, "NDU"] returns "http://localhost/Relay/irc/". 
*/ 
function F_szDir_Server(P_szDNS)
{
  var Server0 = S_asServer1[P_szDNS];
  if (Server0) {
     return(Server0[C_j_szDir]);
  }
  else {
     return(null);
  } /* if */
} /* F_szDir_Server */

/*-----F_U_CB_Chk --------------------------------------------------------
*
*/ 
function F_U_CB_Chk(P_szNm)
{
  var Server0 = S_asServer1[P_szNm];
  var U_CB_Chk   = "";
  
  switch (Server0[C_j_szSrv_Knd]) {
    case "PHP-DDJ": {
         U_CB_Chk = null;
    } break;
    default : {
         U_CB_Chk = null;
    } break;
  } /* switch */
  U_CB_Chk = U_CB_Chk_Dflt;
  return(U_CB_Chk); 
} /* F_U_CB_Chk */

/*-----U_Init_NDU --------------------------------------------------------
*
*/ 
function U_Init_NDU()
{ 
  U_Root0("$NDU", C_jCd_Cur);
} /* U_Init_NDU */

  return(_NDU);
})();  /* $NDU */

