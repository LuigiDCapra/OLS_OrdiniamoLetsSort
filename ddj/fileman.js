/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : fileman.js
* Function    : code FileMan
* FirstEdit   : 21/04/2024
* FirstEdit   : 11/01/2025
* LastEdit    : 28/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
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
*     File Manager. Browse directories list.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
* 
*  We avoid the definition of a new data structure (to manage bags of parameters) reusing G_DDJ that is already available because defined in inpdata.js
*
*/
//"use strict";

/*----- Global Constants ---------------------------------------------*/

const C_jFlDsc_Name    = 0;
const C_jFlDsc_Ext     = 1;
const C_jFlDsc_Size    = 2;
const C_jFlDsc_MTime   = 3;
const C_jFlDsc_Permis  = 4;
const C_jFlDsc_Dir     = 5;
const C_jFlDsc_Icon    = 6;
const C_jFlDsc_Preview = 7;   /* Complete FileName */
const C_jFlDsc_szNote  = 8;
const C_jFlDsc_szGroup = 9;

/*----- Global Variables ---------------------------------------------*/

/*----- Module $FileMan --------------------------------------------------------
*
*/ 
const $FileMan = (function () {
  var _FileMan = {};
  _FileMan.U_Init              = U_Init_FileMan;      // function U_Init_FileMan();
  _FileMan.U_URL               = U_URL;               // function U_URL(P_szURL);
  _FileMan.F_szURL             = F_szURL;             // function F_szURL();

  _FileMan.U_Show_Res          = U_Show_Res;          // function U_Show_Res();
  _FileMan.U_Root              = U_Root;              // function U_Root();
  _FileMan.U_Back              = U_Back;              // function U_Back();
  _FileMan.U_Get_Dir           = U_Get_Dir;           // function U_Get_Dir(P_szDNS, P_szURL, P_CB_GetDir=U_CB_GetDir, P_fInit= true);
  _FileMan.U_GetOS             = U_GetOS;             // function U_GetOS();
  
//  _FileMan.U_Preview           = U_Preview;           // function U_Preview();
  
  _FileMan.F_JKndTup_Mp_szExt  = F_JKndTup_Mp_szExt;  // function F_JKndTup_Mp_szExt(P_szExt);
  _FileMan.F_JKndTup_Mp_szFlNm = F_JKndTup_Mp_szFlNm; // function F_JKndTup_Mp_szFlNm(P_szFlNm);

  _FileMan.U_Aspect_GetDir     = U_Aspect_GetDir;     // function U_Aspect_GetDir();
  
  _FileMan.U_Open_PATH_2       = U_Open_PATH_2;       // function U_Open_PATH_2(P_szPath, P_Tup0);
  _FileMan.U_Open_XTG          = U_Open_XTG;          // function U_Open_XTG(P_fImg=false);

  _FileMan.U_CB_GetDir         = U_CB_GetDir;         // function U_CB_GetDir(P_szTxt, R_DDJ);

  _FileMan.U_Write             = U_Write;             // function U_Write(P_szFlNm, P_szBuff, P_fBinary);
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_FileMan;

/*----- Local Variables ----------------------------------------------*/

/*--------------------------------------------------------------------*/

var S_f_Id_URL = false;        /* Synchronize with Id_URL if exists. */
var S_fPopUp = false;          /* FileManager has been loaded as a PopUp. */

var S_szDNS = "";
var S_ch_Pfx = " / ";          /* Blank added as a prefix to directory names. */

var S_szOS = "";               /* Operating System release. */

/*-----U_Write --------------------------------------------------------
*
* $LcdLcd.U_Write();
*/ 
function U_Write(P_szFlNm, P_szBuff, P_fBinary)
{
  var szWrite = (P_fBinary)? "writebin": "write";
  var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", szWrite, P_szFlNm);
  $IPCF.U_UpLoad_File(szURL, P_szBuff, P_fBinary);
} /* U_Write */

/*-----U_URL --------------------------------------------------------
*
*/
var S_szURL0 = "";
  
function U_URL(P_szURL)
{
  if (S_f_Id_URL) {
     Id_URL.value = P_szURL;
  } /* if */
  S_szURL0 = P_szURL;
} /* U_URL */

/*-----F_szURL --------------------------------------------------------
*
*/ 
function F_szURL()
{
  if (S_f_Id_URL) {  
     S_szURL0 = Id_URL.value;
  } /* if */
  return(S_szURL0);
} /* F_szURL */

/*-----U_Show_Res --------------------------------------------------------
*
* Show Resource.
*/ 
function U_Show_Res(P_fDashboard=false)
{
  var UsrView0   = CL_UsrView0.F_UsrView_Selected();
  var XDB0       = UsrView0.XDB0;  
  var szNm_aFld0 = XDB0.szNm_aFld;
  var Val_Sel    = (szNm_aFld0 == "aFld_sinottico")? UsrView0.Val_Sel[0]: UsrView0.Val_Sel;
  if (!Val_Sel) {
     return;    // $IMPORTANT! Prevent bug.
  } /* if */
  
  if (Val_Sel[0] == "#") {
     /* The addres makes reference to a collection already loaded in memory. */
     var szFlNm = Val_Sel.substr(1); 
     CL_UsrView0.F_UsrView_Select(szFlNm, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
     return;
  } /* if */

  if (szNm_aFld0 == "aFld_S_aXDBAux") {
     CL_UsrView0.F_UsrView_Select(Val_Sel, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
     return;
  } /* if */
  
  if ((szNm_aFld0 == "aFld_FlDsc") || (szNm_aFld0 == "aFld_Disk") || (szNm_aFld0 == "aFld_Apps")) {    /* Case-1 */
     /* XTGold like filesystem explorer. */
     U_Open_XTG();
     return;
  } /* if */

  if (szNm_aFld0 == "auto_innodb_table_stats") {    /* Case-0 */
     /* MariaDB's frontend. */
     var Tup_Sel = XDB0.Tup_Sel;
     var szNmDB  = Tup_Sel.database_name;
     var szNmTab = Tup_Sel.table_name;     
     $LdFile.U_DownLoad_URL(szURL, C_WwFlag_Null);
     return;
  } /* if */

  var szType  = UsrView0.Fld_Sel.szType; 
  switch (szType) {                      /* Case-2 */
    case "PATH" :
    case "file" :
    case "url" : {
          U_Open_PATH();
    } break;
    case "Image":
    case "Audio":
    case "Video":
    case "link":      /* Open link in the browser */
    case "Txt":  
    case "Doc":   
    case "html": {
          $DDJ.F_Window_open(Val_Sel);
          return;
    } break;
//     case "text":    
//     case "textarea":   
//     case "HTML":  
//     case "string": {
//           $DDJ.F_Window_open(Val_Sel);
//           return;
//     } break;
    case "GPS" : {
         $Value.U_OpenStreetMap(Val_Sel);
         return;
    } break;
    case "object" : {
         if (P_fDashboard) {
            U_Open_XTG(false, P_fDashboard);
         } /* if */
    } break;
    default : {  
          $Error.U_Error(C_jCd_Cur, 1, "Was expected a URL or filename.", "", false);
    } break;
  } /* switch */
} /* U_Show_Res */

/*-----U_Open_XTG --------------------------------------------------------
*
* U_Open_XTG(); will be called by XTGold-Like files explorer
* Navigate into the local FileSystem using FlDsc data structures.
* 
* $NOTE:
* U_Open_XTG will be called only if (XDB0.szNm_aFld == "aFld_FlDsc").
*/ 
function U_Open_XTG(P_fImg=false, P_fDashboard=false)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0    = UsrView0.XDB0;  
  var Tup0    = XDB0.Coll0[UsrView0.KeyTup];
  var Val_Sel = (P_fDashboard)? UsrView0.Val_Sel[0]: UsrView0.Val_Sel;
  var szType  = UsrView0.Fld_Sel.szType;
  var szDNS;
  var szServer;
  var szPath;
  var szExt;

  G_DDJ = $DDJ.F_DDJ_Default();    // 09/08/2025
  szPath = (P_fDashboard)? "": XDB0.szNmColl;
  
  if (szPath == "DSK") {

     szPath = Val_Sel.substr(S_ch_Pfx.length);
  }
  else if (XDB0.szNm_aFld == "aFld_Apps") {
     szPath = Val_Sel;  
  }
  else { /* Get current directory Path */
     szPath += (Val_Sel.indexOf(S_ch_Pfx) != 0)? Val_Sel: Val_Sel.substr(S_ch_Pfx.length);  /* Add filename or directory-name, as a leave, deleting prefix. */;
  } /* if */

  if (szPath[1] == ":") {
     /*
     *  LOCAL XTG
     */
     szDNS = "localhost";
     
     szServer = $NDU.F_szDir_Server(szDNS);  
  
     /* The address makes reference to a directory or a file on the local host. */
     if ((Tup0[C_jFlDsc_Dir] == "dir") || (P_fDashboard && (szPath[szPath.length -1] == "/"))) {
        /* Directory */
        /* $ASSUME: szPath is an absolute address. */

        if (szPath[szPath.length -1] != "/") {
           szPath += "/";
        } /* if */
        var CB_GetDir = (P_fImg)? U_CB_GetDir_2: U_CB_GetDir;
        
        G_DDJ.WwFlag0 = (C_WwFlag_fDisplay);          // 28/01/2026
        U_Get_Dir(szDNS, szPath, CB_GetDir, false);   // 31/05/2025   <<<<<<
        return;
     }
     else {
        /* file */
        szExt = szPath.substr(szPath.lastIndexOf(".") +1)
        szExt = szExt.toLowerCase();
     
        switch (szExt) {
          case "arr": 
          case "obj": 
          case "arcd": 
          case "aobj": 
          case "asrcd": 
          case "asobj": 
          case "as_":
          case "csv":
          case "flr":
          case "ols": {
               G_DDJ.szNmColl = szPath;
               G_DDJ.szNm_URL = $NDU.F_szURL_Mp_Cmd_Res(szDNS, "read", szPath); 
               if (S_fPopUp && !G_fLocal) {
                  U_IPC_SendBack();
               }
               else {
                   G_DDJ.fszFldNm_1 = false;
                   G_DDJ.JKndTup0  = $FileMan.F_JKndTup_Mp_szFlNm(szPath);
                   G_DDJ.szNm_aFld = "AutoDetect";
                   G_DDJ.aFld      = null;
                   G_DDJ.fEmbed    = false;
                   G_DDJ.WwFlag0   = (C_WwFlag_fDisplay);
                   $LdFile.U_DownLoad_DDJ(G_DDJ);
               } /* if */
          } break;
          default : {
               /* If the extension is unknown try to open the file in the browser. */
               if (G_fLocal) {
                  $DDJ.F_Window_open("file:///" + szPath);
               }
               else {
                  szURL = $NDU.F_szURL_Mp_Cmd_Res(szDNS, "read", szPath);
                  $DDJ.F_Window_open(szURL);
               } /* if */
          } break;
        } /* switch */
        return;
     } /* if */  
  }
  else if (szPath.substr(0, 12) == "LocalStorage") {      // "LocalStorage".length == 12
     if (Tup0[C_jFlDsc_Dir] == "dir") {
        /* Directory */
        /* $ASSUME: szPath is an absolute address. */

        if (szPath[szPath.length -1] != "/") {
           szPath += "/";
        } /* if */
        var Dir0 = $IPCF.F_JSON_Get(".");
        var Dir1 = [];
        for (let Key in Dir0) {
            let Tmp0 = Dir0[Key];
            Dir1.push([Key, ...Tmp0]);
        } /* for */
        var szTxt = JSON.stringify(Dir1);
        G_DDJ.szNmColl = szPath;
        G_DDJ.JKndTup0 = C_JKndTup_aRcd;
        U_CB_GetDir(szTxt, G_DDJ);
        return;
     }
     else {
        /* file */
        szPath = szPath.substr(12 +1);
        var Coll0 = $IPCF.F_JSON_Get(szPath);
        var Bag_UsrView0 = ["LocalStorage", C_jPg_0, "", null, null];
        new CL_XDB([szPath, C_JKndTup_Null, Coll0, null, "AutoDetect", "", (C_WwFlag_fMng_Undef | C_WwFlag_fOverWrite | C_WwFlag_fDisplay), C_jCd_Cur, Bag_UsrView0]); 
     } /* if */
  }

  else if (szPath.substr(0, 14) == "SessionStorage") {      // "SessionStorage".length == 14
     if (Tup0[C_jFlDsc_Dir] == "dir") {
        /* Directory */
        /* $ASSUME: szPath is an absolute address. */

        if (szPath[szPath.length -1] != "/") {
           szPath += "/";
        } /* if */
        var Dir0 = $IPCF.F_JSON_Get(".", false);
        var Dir1 = [];
        for (let Key in Dir0) {
            let Tmp0 = Dir0[Key];
            Dir1.push([Key, ...Tmp0]);
        } /* for */
        var szTxt = JSON.stringify(Dir1);
        G_DDJ.szNmColl = szPath;
        G_DDJ.JKndTup0 = C_JKndTup_aRcd;
        U_CB_GetDir(szTxt, G_DDJ);
        return;
     }
     else {
        /* file */
        szPath = szPath.substr(14 +1);
        var Coll0 = $IPCF.F_JSON_Get(szPath);
        new CL_XDB([szPath, C_JKndTup_Null, Coll0, null, "AutoDetect", "", (C_WwFlag_fMng_Undef | C_WwFlag_fOverWrite | C_WwFlag_fDisplay), C_jCd_Cur, C_Bag_UsrView_Dflt]); 
     } /* if */
  }

  else {
     /*
     *  REMOTE XTG
     */
     // szDNS = "canavesehub.altervista.org";
     szDNS = S_szDNS;
     debugger;
     var szServer = $NDU.F_szDir_Server(szDNS);

     /* The address makes reference to a directory or a file on the local host. */
     if (Tup0[C_jFlDsc_Dir] == "dir") {
        /* Directory */

        if (szPath[szPath.length -1] != "/") {
           szPath += "/";
        } /* if */

        U_Get_Dir(szDNS, szPath, U_CB_GetDir, false);   // 2025-09-20
        return;     
     }
     else {
        /* file */
        szExt = szPath.substr(szPath.lastIndexOf(".") +1)
        szExt = szExt.toLowerCase();
     
        switch (szExt) {
          case "arr": 
          case "obj": 
          case "arcd": 
          case "aobj": 
          case "asrcd": 
          case "asobj": 
          case "as_":
          case "csv":
          case "flr":
          case "ols": {
               G_DDJ.szNmColl = szPath;
               G_DDJ.szNm_URL = $NDU.F_szURL_Mp_Cmd_Res(szDNS, "read", szPath);
               if (S_fPopUp && !G_fLocal) {
                  U_IPC_SendBack();
               }
               else {
                   $LdFile.U_DownLoad_URL(G_DDJ.szNm_URL, C_WwFlag_fDisplay);
               } /* if */
          } break;
          default : {
               /* If the extension is unknown try to open the file in the browser. */
               G_DDJ.szNmColl = szPath;
               G_DDJ.szNm_URL = $NDU.F_szURL_Mp_szFlNm(szDNS, szPath); 
               $DDJ.F_Window_open(G_DDJ.szNm_URL);
          } break;
        } /* switch */
        return;
     } /* if */ 
  } /* if */ 
} /* U_Open_XTG */

/*-----U_Open_PATH --------------------------------------------------------
*
* U_Open_PATH() will be called by SemCtx, Collezioni, etc.  (Ex. Init.OLS Lcd).
*/ 
function U_Open_PATH()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0    = UsrView0.XDB0;  
  var Tup0    = XDB0.Coll0[UsrView0.KeyTup];
  var Val_Sel = UsrView0.Val_Sel;
  var szType  = UsrView0.Fld_Sel.szType;
  
  switch (szType) {
    case "PATH":
    case "url":
    case "file":
    case "link": {
         if (Val_Sel[Val_Sel.length -1] == '/') {
            /* Val_Sel is a Directory name */
            Tup0 = null;
         } /* if */
    } break;
    default : {
        $Error.U_Error(C_jCd_Cur, 2, "Was expected a PATH, an URL, a file or a link.", "", false);
    } break;
  } /* switch */

  U_Open_PATH_2(Val_Sel, Tup0);
} /* U_Open_PATH */

/*-----U_Open_PATH_2 --------------------------------------------------------
*
* $NOTE:
* This function was introduced to allow the user to manually set the Path.
* Used in OLS.html U_Path();
*/ 
function U_Open_PATH_2(P_szPath, P_Tup0)
{
  var Tup0 = P_Tup0;
  var szDNS;
  var szServer;
  var szPath = P_szPath;
  var szExt;
  var szURL;

  G_DDJ = $DDJ.F_DDJ_Default();    // 09/08/2025
  
  if (szPath[1] == ":") {
     /*
     *  LOCAL PATH
     */
     szDNS = "localhost";
     
     szServer = $NDU.F_szDir_Server(szDNS); 
  
     /* The address makes reference to a directory or a file on the local host. */
           
     if ((Tup0 == "dir") || (Tup0 == null) || (Tup0[C_jFlDsc_Dir] == "dir")) {
        /* Directory */
        /* $ASSUME: szPath is an absolute address. */

        if (szPath[szPath.length -1] != "/") {
           szPath += "/";
        } /* if */
        U_Get_Dir(szDNS, szPath, U_CB_GetDir, false);   // 2025-09-20
        return;     
     }
     else {
        /* file */
        szExt = szPath.substr(szPath.lastIndexOf(".") +1)
        szExt = szExt.toLowerCase();
     
        switch (szExt) {
          case "arr": 
          case "obj": 
          case "arcd": 
          case "aobj": 
          case "asrcd": 
          case "asobj": 
          case "as_":
          case "csv":
          case "flr":
          case "ols": {
               G_DDJ.szNmColl = szPath; 
               G_DDJ.szNm_URL = $NDU.F_szURL_Mp_Cmd_Res(szDNS, "read", szPath);
               if (S_fPopUp && !G_fLocal) {
                  U_IPC_SendBack();
               }
               else {
                   G_DDJ.fszFldNm_1 = false;
                   G_DDJ.JKndTup0  = $FileMan.F_JKndTup_Mp_szFlNm(szPath);
                   G_DDJ.szNm_aFld = "AutoDetect";
                   G_DDJ.aFld      = null;
                   G_DDJ.fEmbed    = false;
                   G_DDJ.WwFlag0   = (C_WwFlag_fDisplay);
                   $LdFile.U_DownLoad_DDJ(G_DDJ);
               } /* if */
          } break;
          default : {
               /* If the extension is unknown try to open the file in the browser. */
               if (G_fLocal) {
                  $DDJ.F_Window_open("file:///" + szPath);
               }
               else {
                  szURL = $NDU.F_szURL_Mp_Cmd_Res(szDNS, "read", szPath);
                  $DDJ.F_Window_open(szURL);
               } /* if */
          } break;
        } /* switch */
        return;
     } /* if */  
  }
  else {
     /*
     *  REMOTE PATH
     */
     debugger;
     var iPos0 = szPath.indexOf("//") +2;
     var szTmp = szPath.substring(iPos0);
     var iPos1 = szTmp.indexOf("/");
     var szDNS = szTmp.substring(0, iPos1);     
     S_szDNS   = szDNS;

//     szServer = $NDU.F_szDir_Server(szDNS);
     szServer = $NDU.F_szDNS_Server(szDNS);
     if (szServer) {
         szFlNm = P_szPath.substr(szServer.length);
     } /* if */
   
     /* The address makes reference to a directory or a file on the local host. */
     if (Tup0[C_jFlDsc_Dir] == "dir") {
        /* Directory */
        /* $ASSUME: szPath is an absolute address. */

        if (szPath[szPath.length -1] != "/") {
           szPath += "/";
        } /* if */
        szPath = szPath.substr(szServer.length);
        U_Get_Dir(szDNS, szPath, U_CB_GetDir, false);   // 2025-09-20
        return;     
     }
     else {
        /* file */
        szExt = szPath.substr(szPath.lastIndexOf(".") +1)
        szExt = szExt.toLowerCase();
     
        switch (szExt) {
          case "arr": 
          case "obj": 
          case "arcd": 
          case "aobj": 
          case "asrcd": 
          case "asobj": 
          case "as_":
          case "csv":
          case "flr":
          case "ols": {
               G_DDJ.szNmColl = szPath;
               G_DDJ.szNm_URL = $NDU.F_szURL_Mp_Cmd_Res(szDNS, "read", szPath.substr(szServer.length)); 
               if (S_fPopUp && !G_fLocal) {
                  U_IPC_SendBack();
               }
               else {
                   $LdFile.U_DownLoad_URL(G_DDJ.szNm_URL, C_WwFlag_fDisplay);
               } /* if */
          } break;
          default : {
               /* If the extension is unknown try to open the file in the browser. */
               $DDJ.F_Window_open(szPath);
          } break;
        } /* switch */
        return;
     } /* if */ 
  } /* if */ 

} /* U_Open_PATH_2 */

/*-----U_IPC_SendBack --------------------------------------------------------
*
* Send back message message concerning the file selected to the caller.
*/ 
function U_IPC_SendBack()
{
  /* $MESSAGE: message to the Caller. */
  /* If FlMan is running as a popup send filename to the caller. */
  /* The selected Collection will be opened by the caller Web-Page.*/
  /* Usually G_U_FlMan_Exec = $InpData.U_FlMan_Exec(); */
  var szRes = window.opener.G_U_FlMan_Exec(G_DDJ.szNm_URL);
} /* U_IPC_SendBack */

/*-----U_GetOS --------------------------------------------------------
*
* Get Operating System release.
*/ 
function U_GetOS()
{
  function U_CB_GetOS(P_szMsg)
  {
    if (P_szMsg.indexOf("Windows") >= 0) {
       S_szOS = "Windows";
    }
    else if (P_szMsg.indexOf("Linux") >= 0) {
       S_szOS = "Linux";    
    }
    else {
       S_szOS = "Other";
    } /* if */
  } /* U_CB_GetOS */

  var szURL = "http://localhost/Relay/irc/getos.php";

  if (window.fLcdLcd) {   /* $VERSIONING */
     $IPCF.U_GetFile(szURL, U_CB_GetOS, U_Null, false, G_DDJ);
  } /* if */
} /* U_GetOS */

/*-----U_Get_Dir --------------------------------------------------------
*
* Load directory list as a Table (aRcd).
*/
function U_Get_Dir(P_szDNS, P_szURL, P_CB_GetDir=U_CB_GetDir, P_fInit= true)
{
  if (P_fInit) {
     G_DDJ = $DDJ.F_DDJ_Default();    // 09/08/2025
  } /* if */

  if (!P_szDNS) {
     P_szDNS = "localhost";         /* $ASSUME: localhost always present in NDU !!! */
  } /* if */
  var szDir_Server = $NDU.F_szDir_Server(P_szDNS);
  var szURL = "";

  if (P_szURL) {
     szURL = szDir_Server + "dir2.php/?szdir=" + P_szURL +"&iLvl=0";
  }
  else {
     szURL = szDir_Server + "disk2.php";
     P_szURL = "DSK";
  } /* if */ 

  U_URL(P_szURL);  
  G_DDJ.JKndTup0 = C_JKndTup_aRcd;
  G_DDJ.szNmColl = P_szURL;
//  G_DDJ.WwFlag0  = (C_WwFlag_fDisplay);
//  G_DDJ.WwFlag0  = (C_WwFlag_Null);    // 28/01/2026

  if (window.fLcdLcd) {   /* $VERSIONING */
     $IPCF.U_GetFile(szURL, P_CB_GetDir, U_Null, false, G_DDJ);
  } /* if */
} /* U_Get_Dir */

/*-----U_CB_GetDir --------------------------------------------------------
*
* U_CB_GetDir(); receive as a Response a text (P_szTxt) representing a list of file-descriptors and convert it in an array of record in aFld_FlDsc format.
*/ 
function U_CB_GetDir(P_szTxt, R_DDJ)
{
  var Coll0;
  var fAutoDetect = false;
  var szExt;

  if (P_szTxt.indexOf("File not Found") >= 0) {
     $Error.U_Error(C_jCd_Cur, 3, "File not Found: ", R_DDJ.szNmColl, false);
     return;
  } /* if */
  try {
      Coll0 = $LdFile.F_Coll_Mp_JSON(P_szTxt, R_DDJ.JKndTup0, false, R_DDJ);  
  } catch (P_Err) {
      $Error.U_Error(C_jCd_Cur, 4, "U_CB_GetDir.", P_Err.message, false);
      return;
  } /* try catch */
  if (R_DDJ.szNmColl == "DSK") {
     var Tmp0 = $IPCF.F_JSON_Get(".", true);
     var szTmp0 = ["LocalStorage", ...Tmp0["."]];
     Coll0.push(szTmp0);
     
     var Tmp1 = $IPCF.F_JSON_Get(".", false);
     var szTmp1 = ["SessionStorage", ...Tmp1["."]];
     Coll0.push(szTmp1);
  } /* if */

  /* $NOTE: Coll0 was initialized by PHP server. */
  for (var i = 0; i < Coll0.length; i++) {
      var FlDsc0 = Coll0[i];
      if (FlDsc0[C_jFlDsc_Dir] != "dir") {
         var szFlNm = FlDsc0[C_jFlDsc_Name];
         var iPos = szFlNm.lastIndexOf(".");
         szExt = szFlNm.substr(iPos +1);
         if (iPos > 0) {
            FlDsc0[C_jFlDsc_Ext] = szExt;
         } /* if */
         FlDsc0[C_jFlDsc_Icon] = szExt.toLowerCase();
         if (!F_fImage(szExt)) {
             FlDsc0[C_jFlDsc_Preview] = "";   /* $NOTE: prevent attempt to load file as an image. */
         } /* if */
      }
      else {
/*
* $Trik:
* Wanting directories and files to be treated as distinct sets we add a blank char at the left of directories names so directory and files names will appear separate after sorting.
*/
         FlDsc0[C_jFlDsc_Name] = S_ch_Pfx + FlDsc0[C_jFlDsc_Name];
         FlDsc0[C_jFlDsc_Ext]  = " /DIR";
         FlDsc0[C_jFlDsc_Icon] = "dir";
         FlDsc0[C_jFlDsc_Preview] = "";       /* $NOTE: prevent attempt to load file as an image. */
      } /* if */
  } /* for */
 
  var WwFlag0 = R_DDJ.WwFlag0 | (C_WwFlag_fOverWrite | C_WwFlag_fszFldNm_1 | C_WwFlag_fGetDir | C_WwFlag_fReadOnly);     // 31/05/2025
  WwFlag0 |= (R_DDJ.fMng_Undef)? C_WwFlag_fMng_Undef: 0;
  
  if (fAutoDetect) {
     /* $NOTE: this option could be useful if the format of data returned by WebServer would change inadvertently! */
     $DDJ.U_DispColl([R_DDJ.szNmColl, R_DDJ.JKndTup0, Coll0, null, "AutoDetect", "Directory GetDir", WwFlag0, C_jCd_Cur, C_Bag_UsrView_Dflt]);
  }
  else {
     var szNm_aFld = (R_DDJ.szNmColl != "DSK")? "aFld_FlDsc": "aFld_Disk";
     $DDJ.U_DispColl([R_DDJ.szNmColl, R_DDJ.JKndTup0, Coll0, null, szNm_aFld, "Directory GetDir", WwFlag0, C_jCd_Cur, C_Bag_UsrView_Dflt]);
  } /* if */
} /* U_CB_GetDir */

/*-----F_fImage --------------------------------------------------------
*
*/ 
function F_fImage(P_szExt)
{
  switch (P_szExt) {

    case "jpg":
    case "jpeg":    
    case "svg":
    case "webp":
    case "png":
    case "gif":
    case "ico":
    case "bmp":
    case "tif":
    case "tiff": {
         return(true);
    } break;
    default : {
         return(false);
    } break;
  } /* switch */
} /* F_fImage */

/*-----U_CB_GetDir_2 --------------------------------------------------------
*
* Called by $XTG.U_Show_DirImg();
* U_CB_GetDir_2(); displays the images contained in the selected directory by inserting them into an HTML file.
*/ 
function U_CB_GetDir_2(P_szTxt, R_DDJ)
{
  var Coll0;
  var fAutoDetect = false;
  var szExt;

  if (P_szTxt.indexOf("File not Found") >= 0) {
     $Error.U_Error(C_jCd_Cur, 5, "File not Found: ", R_DDJ.szNmColl, false);
  } /* if */
  try {
      Coll0 = $LdFile.F_Coll_Mp_JSON(P_szTxt, R_DDJ.JKndTup0, false, R_DDJ);  
  } catch (P_Err) {     
      $Error.U_Error(C_jCd_Cur, 6, "U_CB_GetDir.", P_Err.message, false);
      return;
  } /* try catch */
  
  for (var i = 0; i < Coll0.length; i++) {
      var FlDsc0 = Coll0[i];
      if (FlDsc0[C_jFlDsc_Dir] != "dir") {
         var szFlNm = FlDsc0[C_jFlDsc_Name];
         var iPos = szFlNm.lastIndexOf(".");
         szExt = szFlNm.substr(iPos +1);
         if (iPos > 0) {
            FlDsc0[C_jFlDsc_Ext] = szExt;
         } /* if */
         FlDsc0[C_jFlDsc_Icon] = szExt.toLowerCase();
      }
      else {
/*
* $Trik:
* Wanting directories and files to be treated as distinct sets we add a blank char at the left of directories names so directory and files names will appear separate after sorting.
*/
         FlDsc0[C_jFlDsc_Name] = S_ch_Pfx + FlDsc0[C_jFlDsc_Name];
         FlDsc0[C_jFlDsc_Ext]  = " /DIR";
         FlDsc0[C_jFlDsc_Icon] = "dir";
      } /* if */
  } /* for */

  var XDB_Cur = new CL_XDB([R_DDJ.szNmColl, R_DDJ.JKndTup0, Coll0, null, "aFld_Disk", "Directory GetDir", C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]); // ++++++   Problema   C_WwFlag_fOverWrite C_WwFlag_Null
  
  R_DDJ.WwFlag0 |= C_WwFlag_fOverWrite;
  var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(R_DDJ.szNmColl, true);
  $XTG.U_Show_Img0(UsrView0);
} /* U_CB_GetDir_2 */

/*-----U_Aspect_GetDir --------------------------------------------------------
*
* Update the record layout by replacing the type of the first field ("string") with the more specific type "file".
*/ 
function U_Aspect_GetDir(P_WwFlag, UsrView0)
{
    if (P_WwFlag & C_WwFlag_fGetDir) {
       UsrView0.XDB0.aFld0[0].szType = "file";
       UsrView0.aFld1[0].szType      = "file";
    } /* if */
} /* U_Aspect_GetDir */

/*-----U_Root --------------------------------------------------------
*
*/ 
function U_Root()
{
  var szURL = F_szURL().substr(0, 3);
  U_Get_Dir("", szURL);
} /* U_Root */

/*-----U_Back --------------------------------------------------------
*
*/ 
function U_Back()
{
  var szURL = F_szURL();
  var asz0 = szURL.split("/");
  if (asz0.length > 2) {
     szURL = "";
     for (var i = 0; i < asz0.length -2; i++) {
         szURL += asz0[i] + "/";
     } /* for */
  } /* if */

  U_Get_Dir("", szURL);
} /* U_Back */

/*-----F_JKndTup_Mp_szFlNm --------------------------------------------------------
*
*/ 
function F_JKndTup_Mp_szFlNm(P_szFlNm)
{
  var szExt    = F_szExt_Mp_szFlNm(P_szFlNm);
  var JKndTup0 = F_JKndTup_Mp_szExt(szExt);
  return(JKndTup0);
} /* F_JKndTup_Mp_szFlNm */

/*-----F_JKndTup_Mp_szExt --------------------------------------------------------
*
*/ 
function F_JKndTup_Mp_szExt(P_szExt)
{
 var JKndTup0 = C_JKndTup_Null;
 P_szExt = P_szExt.toLowerCase();
 switch (P_szExt) {
   case "arr": {
        JKndTup0 = C_JKndTup_Arr;
   } break;
   case "jso":
   case "json":
   case "obj": {
        JKndTup0 = C_JKndTup_Obj;
   } break;
   case "arcd": {
        JKndTup0 = C_JKndTup_aRcd;
   } break;
   case "aobj": {
        JKndTup0 = C_JKndTup_aObj;
   } break;
   case "asrcd": {
        JKndTup0 = C_JKndTup_asRcd;
   } break;
   case "asobj": {
        JKndTup0 = C_JKndTup_asObj;
   } break;
   case "as_": {
        JKndTup0 = C_JKndTup_as_;
   } break;
   case "csv":
   case "tsv": {
        JKndTup0 = C_JKndTup_CSV;
   } break;
   case "flr": {
        JKndTup0 = C_JKndTup_FLR;
   } break;
   case "xml": {
        JKndTup0 = C_JKndTup_XML;
   } break;
   case "dbf": {
        JKndTup0 = C_JKndTup_DBF;
   } break;
   case "txt": 
   case "text": {
        JKndTup0 = C_JKndTup_Text;
   } break;
   case "bin":
   case "blob": {
        JKndTup0 = C_JKndTup_Blob;
   } break;
   case "ols": {
        JKndTup0 = C_JKndTup_OLS;
   } break;
   case "toon": {
        JKndTup0 = C_JKndTup_TOON;
   } break;
   default : {
   } break;
 } /* switch */
 return(JKndTup0);
} /* F_JKndTup_Mp_szExt */

/*-----U_Init_FileMan --------------------------------------------------------
*
*/ 
function U_Init_FileMan()
{
  U_Root0("$FileMan", C_jCd_Cur);
  
  S_fPopUp = $DDJ.F_fPopUp();
  S_f_Id_URL = (typeof(Id_URL) != "undefined");
  
  if (typeof($XTG) == "undefined") {
     /* Remove methods from Object (and Icons from TBM). */
     _FileMan.U_Disk = C_Undefined;
     _FileMan.U_Apps = C_Undefined;
  } /* if */
  
  U_GetOS();
} /* U_Init_FileMan */

  return(_FileMan);
})();  /* FileMan */

