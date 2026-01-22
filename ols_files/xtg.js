/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : xtg.js
* Function    : XTG like functions
* FirstEdit   : 11/01/2025
* LastEdit    : 11/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* Constants C_jFlDsc_X are defined in FileMan.
*/
"use strict";

const $XTG = (function () {
  var _XTG = {};
  _XTG.U_Init          = U_Init_XTG;        // function U_Init_XTG();
  _XTG.U_XTG           = U_XTG;             // function U_XTG();
  _XTG.U_OSCmd         = U_OSCmd;           // function U_OSCmd(P_szCmd);
  _XTG.U_Shell         = U_Shell;           // function U_Shell();
  _XTG.U_Edit_Res      = U_Edit_Res;        // function U_Edit_Res();
  _XTG.U_Edit_File     = U_Edit_File;       // function U_Edit_File();
  _XTG.U_Edit_Coll     = U_Edit_Coll;       // function U_Edit_Coll();
  _XTG.U_New_File      = U_New_File;        // function U_New_File();
  _XTG.U_Del_File      = U_Del_File;        // function U_Del_File();
  _XTG.U_Copy_File     = U_Copy_File;       // function U_Copy_File();
  _XTG.U_Move_File     = U_Move_File;       // function U_Move_File();
  _XTG.U_Paste_File    = U_Paste_File;      // function U_Paste_File();
  _XTG.U_Paste_File    = U_Paste_File;      // function U_Paste_File();
  _XTG.U_Show_DirImg   = U_Show_DirImg;     // function U_Show_DirImg();
  _XTG.U_Show_Img0     = U_Show_Img0;       // function U_Show_Img0(P_UsrView0);
  _XTG.U_Show_Img      = U_Show_Img;        // function U_Show_Img();
  _XTG.U_Slide         = U_Slide;           // function U_Slide(P_UsrView0);
  _XTG.U_Rem_Scan      = U_Rem_Scan;        // function U_Rem_Scan();
    
  _XTG.U_Set_szNote    = U_Set_szNote;      // function U_Set_szNote();
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_XTG;

/*----- Local Variables ----------------------------------------------*/

var S_szCpMv = "COPY";
var S_szFlNm_CpMv = "";
var S_fAltRem = false;

/*--------------------------------------------------------------------*/

/*-----U_XTG --------------------------------------------------------
*
* Open XTG re-selecting the last directory.
*/ 
function U_XTG()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("History", true);
  var Coll0 = UsrView0.XDB0.Coll0;
  var szHome = "DSK";
  var Tup0, i, szNm_aFld;  

  for (i = Coll0.length -1; i >= 0; i--) {
      Tup0 = Coll0[i];
      szNm_aFld = Tup0[2].XDB0.szNm_aFld; // ;
      if (szNm_aFld == "aFld_FlDsc") {
         szHome = Tup0[1];
         break;
      } /* if */
  } /* for */
   
  $Value.U_Sel_szPlane(-1);
  var UsrView0 = CL_UsrView0.F_UsrView_Select(szHome, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
  var Coll0 = UsrView0.XDB0.Coll0;
  var Tup3  = Coll0[3];

  $FileMan.U_URL("");
  if (UsrView0 == null) {
     $Error.U_Error(C_jCd_Cur, 3, "Sorry,\nXTG not found!", "", false);
  } /* if */
} /* U_XTG */

/*-----U_CB_LH --------------------------------------------------------
*
*/
function U_CB_LH(P_szJSON)
{
} /* U_CB_LH */

/*-----U_CB_Err_LH --------------------------------------------------------
*
*/ 
function U_CB_Err_LH()
{
} /* U_CB_Err_LH */

/*-----U_OSCmd --------------------------------------------------------
*
*/ 
function U_OSCmd(P_szCmd, P_CB_LH=U_CB_LH)
{
  var szCmd = 'http://localhost/Relay/irc/batt321.php/?szCmd=' + P_szCmd;  
  $IPCF.U_DownLoad_File(szCmd, P_CB_LH, U_CB_Err_LH, true, false);
} /* U_OSCmd */

/*-----U_Edit_Res_2 --------------------------------------------------------
*
*/ 
function U_Edit_Res_2()
{
  $XTG.U_Edit_Res(true);
} /* U_Edit_Res_2 */

/*-----U_Edit_File_2 --------------------------------------------------------
*
*/ 
function U_Edit_File_2()
{
  $XTG.U_Edit_File(true);
} /* U_Edit_File_2 */

/*-----U_Edit_Res --------------------------------------------------------
* http://localhost/Relay/irc/batt321.php/?szCmd=E:/Programmi/PSPad/PSPad.exe r:/prova.arcd
*/
var S_szApp = {
"mpeg":"E:/Programmi/VLC/vlc.exe",
"mpg":"E:/Programmi/VLC/vlc.exe",
"html":"E:/Programmi/BlueGriffon/bluegriffon.exe",
"htm":"E:/Programmi/BlueGriffon/bluegriffon.exe",
"jpeg":"D:/res/lnk/gimp.exe_link.lnk",
"jpg":"D:/res/lnk/gimp.exe_link.lnk",
"png":"D:/res/lnk/gimp.exe_link.lnk",
"bmp":"D:/res/lnk/gimp.exe_link.lnk",
"webp":"D:/res/lnk/gimp.exe_link.lnk",
"tif":"D:/res/lnk/gimp.exe_link.lnk",
"tiff":"D:/res/lnk/gimp.exe_link.lnk",
"bat":"bat",
"svg":"E:/Programmi/Inkscape/bin/inkscape.exe",
"doc":"browser",
"docx":"browser",
"ppt":"browser",
"xls":"browser",
"odt":"browser",
"ods":"browser",
"odp":"browser",
"pdf":"browser",
"default":"E:/Programmi/PSPad/PSPad.exe"
};
 
function U_Edit_Res(P_fDashboard=false)
{
  var UsrView0  = CL_UsrView0.F_UsrView_Selected();
  var XDB0      = UsrView0.XDB0;
  var szNm_aFld = XDB0.szNm_aFld;
  var Val_Sel = (P_fDashboard)? UsrView0.Val_Sel[0]: UsrView0.Val_Sel;
  var szFlNm1;
  var szFlNm0;
  
  if ((szNm_aFld == "aFld_Apps") || P_fDashboard) {
     var szFlNm1 = Val_Sel;
  }
  else {
    var szFlNm0 = UsrView0.szNmColl + Val_Sel;    
    szFlNm1 = szFlNm0.replaceAll("/", "\\"); 
  } /* if */
      
  var iPos    = szFlNm1.lastIndexOf(".");
  var szExt0  = szFlNm1.substr(iPos +1);
  var szExt1  = szExt0.toLowerCase();
  var szExt2  = S_szApp[szExt1];
  
  if (!szExt2) {
     szExt2  = S_szApp["default"];
  } /* if */
  if (szExt2 == "browser") {
     $FileMan.U_Open_XTG();
     return; 
  } /* if */
  if (szExt2 == "bat") {
     U_OSCmd(szFlNm1);
     return;
  } /* if */

  U_OSCmd(szExt2 + " " + szFlNm1);
} /* U_Edit_Res */

/*-----U_Edit_File --------------------------------------------------------
* http://localhost/Relay/irc/batt321.php/?szCmd=E:/Programmi/PSPad/PSPad.exe r:/prova.arcd
*/ 
function U_Edit_File(P_fDashboard=false)
{
  var UsrView0  = CL_UsrView0.F_UsrView_Selected();
  var XDB0      = UsrView0.XDB0;
  var szNm_aFld = XDB0.szNm_aFld;
  var Val_Sel = (P_fDashboard)? UsrView0.Val_Sel[0]: UsrView0.Val_Sel;
  
  if ((szNm_aFld == "aFld_Apps") || P_fDashboard) {
     var szFlNm  = Val_Sel;
  }
  else {
    var szFlNm = UsrView0.szNmColl + Val_Sel;    
    szFlNm = szFlNm.replaceAll("/", "\\"); 
  } /* if */

  U_OSCmd("E:/Programmi/PSPad/PSPad.exe " + szFlNm);
} /* U_Edit_File */

/*-----U_Edit_Coll --------------------------------------------------------
*
* Correct the selected/showed Collection editing the corresponding file.
*/ 
function U_Edit_Coll()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var szTmp    = XDB0.szNm_URL;
  if (szTmp == "") {
     $Error.U_Error(C_jCd_Cur, 1, "The collection cannot be edited because its URL it's unknown.", "", false);
  } /* if */
  var iLen     = "szTopic=".length;
  var szFlNm   = szTmp.substr(szTmp.indexOf("szTopic=") + iLen);
  U_OSCmd("E:/Programmi/PSPad/PSPad.exe " + szFlNm);
} /* U_Edit_Coll */
 
/*-----U_New_File --------------------------------------------------------
*
*/ 
function U_New_File()
{
  var aszExt = ["c", "css", "h", "html", "java", "js", "ods", "odt", "php", "svg", "txt"];
  var szFlNm = prompt('Nome del file:');
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szPath = UsrView0.szNmColl;

  if (szFlNm.indexOf("//") >= 0) {
     $Error.U_Error(C_jCd_Cur, 2, "Illegal character '/' in the filename.", szFlNm);
  } /* if */
  var iPos = szFlNm.indexOf(".");
  if (iPos > 0) {
     var szExt = szFlNm.substr(iPos +1);
     var j = aszExt.indexOf(szExt);
     if (j >= 0) {
        debugger;
        var szPath = UsrView0.szNmColl;
        U_OSCmd("COPY " + "D:/viola_template/Default." + szExt + " " + szPath + szFlNm);
        setTimeout($DDJ.U_Reload, 1000);
     }
     else {
     } /* if */
  }
  else {
  } /* if */
} /* U_New_File */

/*-----U_Del_File --------------------------------------------------------
*
* rmdir /S /Q <path>
*/ 
function U_Del_File()
{
//  debugger;
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0    = UsrView0.XDB0;  
  var Tup0    = XDB0.Coll0[UsrView0.KeyTup];
  var szNmColl = UsrView0.szNmColl;
  var szCmd;
  var chBackSpace = String.fromCharCode(92);
  
  if (G_szOS == "Windows") {
     szNmColl = szNmColl.replaceAll("/", chBackSpace);
  } /* if */ 
  
  if (Tup0[1] == " /DIR") {
     szCmd = "RMDIR " + szNmColl + UsrView0.Val_Sel.substr(3) + " /S /Q";
  }
  else {
     szCmd = "DEL " + szNmColl + UsrView0.Val_Sel;
  } /* if */
  
//  $LcdLcd.U_Dbg_Sav(szCmd);
    
  U_OSCmd(szCmd);
  setTimeout($DDJ.U_Reload, 1000);
} /* U_Del_File */

/*-----U_Shell --------------------------------------------------------
*
* Open command shell
*/ 
function U_Shell()
{
function U_OpenShell()
{
  U_OSCmd("START CMD.EXE");
} /* U_OpenShell */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;  
  var szDir = XDB0.szNmColl;

  var szDsk = szDir.substr(0, 2);
  szDsk = (szDsk[1] == ":")? szDsk: "";

  U_OSCmd(szDsk);
  setTimeout(U_OpenShell, 100);
} /* U_Shell */

/*-----U_Copy_File --------------------------------------------------------
*
*/ 
function U_Copy_File()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0    = UsrView0.XDB0;  
  var Tup0    = XDB0.Coll0[UsrView0.KeyTup];
    var szFlNm = UsrView0.F_Val_Mp_szNmFld("Preview");
  var iLen    = "file:///".length;

  S_szFlNm_CpMv = szFlNm.substr(iLen);
  S_szCpMv = "COPY";
} /* U_Copy_File */

/*-----U_Move_File --------------------------------------------------------
*
*/ 
function U_Move_File()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0    = UsrView0.XDB0;  
  var Tup0    = XDB0.Coll0[UsrView0.KeyTup];
    var szFlNm = UsrView0.F_Val_Mp_szNmFld("Preview");
  var iLen    = "file:///".length;

  S_szFlNm_CpMv = szFlNm.substr(iLen);
  S_szCpMv = "MOVE";
} /* U_Move_File */

/*-----U_Paste_File --------------------------------------------------------
*
*/ 
function U_Paste_File()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szPath_Dst = UsrView0.szNmColl;

  U_OSCmd("COPY " + S_szFlNm_CpMv + " " + szPath_Dst);
  setTimeout($DDJ.U_Reload, 1000);
} /* U_Paste_File */

/*-----U_Show_DirImg --------------------------------------------------------
*
*/ 
function U_Show_DirImg()
{  
  $FileMan.U_Open_XTG(true);
} /* U_Show_DirImg */

/*-----U_Show_Img --------------------------------------------------------
*
* Create an HTML file and insert the images from directory selected in XTG.
*/ 
function U_Show_Img()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  
  U_Show_Img0(UsrView0);
} /* U_Show_Img */

/*-----U_Show_Img0 --------------------------------------------------------
*
* Create an HTML file and insert the images from the directory P_UsrView0 in the current order.
*/ 
function U_Show_Img0(P_UsrView0)
{
  var UsrView0 = P_UsrView0;
  var XDB0  = UsrView0.XDB0;
  var aNdx0 = UsrView0.F_aNdx();
  var Coll0 = XDB0.Coll0;  
  var szDir = XDB0.szNmColl;
  var iCard = aNdx0.length;
  var iNnCol = $VConfig.F_i_ValSts_Get("iNn_Col");
  var iNnRow = (iCard + iNnCol -1) / iNnCol;
  var fAsc = UsrView0.fAsc;
  var i, j, k, k0, k1;
  var szHTML = "";
  var szTable = "";
  var szRow, szTmp, szPath, szImg, szURL;
  
  var szIni = `
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=windows-1252" http-equiv="content-type">
    <title>Show Images</title>
<style> 
img {width:100%;}
</style>
  </head>
  <body>
    <table style="width: 100%" border="1">
      <tbody>\n`;

  var szEnd = `
      </tbody>
    </table>
  </body>

<script>
/*
*  GoTO_Key
*/
function U_GTK(P_This)
{
  debugger;
  var sz0 = P_This.currentSrc;
  var iPos = sz0.lastIndexOf("/");
  var sz1 = sz0.substr(iPos +1);
  var szKey = "GoTo_Key('" + sz1 + "');";
  var szRes  = window.opener.U_RPC_Exec(szKey);
} /* U_GTK */
</script>
</html>`;

  window.pippo = F_Obj_Clone(aNdx0);

  var szPfx = $NDU.F_szDir_Server("localhost") + "read.php/?szTopic=";

  k = 0;
  for (i = 0; i < iNnRow; i++) {
      szRow = "";
      szTmp = "";
      for (j = 0; j < iNnCol; j++) {
          if (fAsc) {
             k1 = aNdx0[k];
          }
          else {
             k0 = iCard - k -1;
             k1 = aNdx0[k0];
          } /* if */
          var Tup0 = Coll0[k1]; 
          if (k1 < iCard) {
             szPath = szDir + Coll0[k1][0]; 
             szURL = szPfx + szPath;
             szImg = `<image src="${szURL}" onclick="U_GTK(this)"> <br><figcaption><a href="${szURL}">${szPath}</a></figcaption>`;
          }
          else {
             szImg = "";
          } /* if */
          k++;
          szTmp += "<td>" + szImg + "</td>";
      } /* for */
      szRow += "<tr>" + szTmp + "</tr>\n";
      szTable += szRow;
  } /* for */
  szHTML = szIni + szTable + szEnd;

   var newWin = open("win.html",'windowName');
   newWin.document.write(szHTML);
} /* U_Show_Img0 */

/*-----U_Slide --------------------------------------------------------
*
*/ 
function U_Slide()
{
  function U_ShowSlide()
  {
    var k1 = aNdx0[k];
    var szPath = szDir + Coll0[k1][0]; 
    var szURL  = szPfx + szPath;

    if ((iCard <= k) || ((0 < k) && (Win0.closed))) {
       $DDJ.U_GoTo(k -1);        // ??? -1
       return;
    } /* if */
    Win0 = window.open(szURL, "Slide0");
    k++;
    var intervalID = setTimeout(U_ShowSlide, 2000);
  } /* U_ShowSlide */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  var aNdx0 = UsrView0.F_aNdx();
  var Coll0 = XDB0.Coll0;  
  var szDir = XDB0.szNmColl;
  var iCard = aNdx0.length;
  var szPfx = $NDU.F_szDir_Server("localhost") + "read.php/?szTopic=";
  var k = 0;
  var k1;
  var Win0 = 1;

  var intervalID = setTimeout(U_ShowSlide, 0);
} /* U_Slide */

 /*-----U_Set_szNote --------------------------------------------------------
*
*/ 
function U_Set_szNote()
{
const C_jFlDsc_Name    = 0;   /* aFld_FlDsc */
const C_jFlDsc_Preview = 7;
const C_jFlDsc_szNote  = 8;

const C_jszNmColl  = 0;   /* Remarks */
const C_jszKey     = 1;
const C_jszRem     = 2;

  var UsrView0 = $DDJ.F_UsrViewPrv();      /* Collection FlDsc */
  var Coll0 = UsrView0.XDB0.Coll0;
  var szNmColl0 = UsrView0.szNmColl;
  S_fAltRem = (szNmColl0.indexOf("H:/") >= 0);
  var szRem = (S_fAltRem)? "alt-remarks": "remarks";
 
  var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(szRem, true);
  if (!UsrView1) {
     return;
  } /* if */
  
  var Coll1 = UsrView1.XDB0.Coll0;
  var Coll2 = {};
  var iLen  = Coll1.length;
  var szKey;
  /* Get list of remarks for Collection szNmColl0. */
  for (let i = 0; i < iLen; i++) {
      var Tup0 = Coll1[i];
      if (Tup0[C_jszNmColl] == szNmColl0) {
         szKey = Tup0[C_jszKey];
         Coll2[szKey] = Coll1[i];
      } /* if */
  } /* for */
  /* Update notes. */
  var iLen = Coll0.length;
  for (let i = 0; i < iLen; i++) {
      szKey = Coll0[i][C_jFlDsc_Name];
      let Rem0 = Coll2[szKey];
      if (Rem0) {
         Coll0[i][C_jFlDsc_szNote] = Rem0[C_jszRem];
      } /* if */       
  } /* for */  
} /* U_Set_szNote */

/*-----U_Rem_Scan --------------------------------------------------------
*
* Scan directory list looking for .OLS files and extract "szRem" info from Hdr0.   Function    : Eidos' Image Sequence File (ISQ)
*/ 
function U_Rem_Scan()
{
  const C_iOff_Html = '"szRem":"'.length;
  const C_iOff_JS   = 'Function    : '.length;
  var iCnt_Req  = 0;
  var iCnt_Resp = 0;
  
  function U_CB_Scan_OLS(P_szTxt, P_szKey, P_fError)
  {
     var iPos0 = P_szTxt.indexOf('"szRem":"');
     var iPos1 = P_szTxt.indexOf('"}');
     var szRem = P_szTxt.substring(iPos0 + C_iOff_Html, iPos1);
     var Rem0 = [szNmColl, P_szKey, szRem, "???", szDate];          
     Coll1[Coll1.length] = Rem0;

     iCnt_Resp++;
  } /* U_CB_Scan_OLS */
  
  function U_CB_Scan_C(P_szTxt, P_szKey, P_fError)
  {
     var iPos0 = P_szTxt.indexOf('Function    : ');
     var iPos1 = P_szTxt.indexOf('FirstEdit');
     var szRem = P_szTxt.substring(iPos0 + C_iOff_JS, iPos1);
     var Rem0 = [szNmColl, P_szKey, szRem, "???", szDate];          
     Coll1[Coll1.length] = Rem0;

     iCnt_Resp++;
  } /* U_CB_Scan_C */
  
  function U_CB_Scan_JS(P_szTxt, P_szKey, P_fError)
  {
     var iPos0 = P_szTxt.indexOf('Function    : ');
     var iPos1 = P_szTxt.indexOf('* FirstEdit') -2;
     var szRem = P_szTxt.substring(iPos0 + C_iOff_JS, iPos1);
     var Rem0 = [szNmColl, P_szKey, szRem, "???", szDate];          
     Coll1[Coll1.length] = Rem0;

     iCnt_Resp++;
  } /* U_CB_Scan_JS */

  function U_CB_Err(P_1, P_2, P_3)
  {
    ALERT("Err", 1);
  } /* U_CB_Err */

  function U_CB_End()
  {
     if (iCnt_Resp == iCnt_Req) {
         debugger;
         UsrView1.U_Upd_aNdx();       // Remake index.
         var szTxt = $OutData.F_szOLS_Mp_Coll(UsrView1, "remarks", -1, false);
    
         var szFlNm_Remarks = UsrView0.F_szVal_CfgUV0("szURL_Remarks");
         if (!szFlNm_Remarks) {
            szFlNm_Remarks = $VConfig.F_ValSts_Get("szFlNm_Remarks");
         } /* if */ 
         $LcdLcd.U_Write(szFlNm_Remarks, szTxt);     
     }
     else {
         setTimeout(U_CB_End, 1000); 
     } /* if */
  } /* U_CB_End */

  debugger;
  var szDate   = $TimeDate.F_szDate_Now("date");  
  var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("remarks", true);
  var Coll1    = UsrView1.XDB0.Coll0;

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var szNmColl =  UsrView0.szNmColl; 
  var Coll0    = XDB0.Coll0;
  var iLen     = Coll0.length;
  var FlDsc0;
  var szExt;
  var i;
  
  for (i = 0; i < iLen; i++) {
      FlDsc0 = Coll0[i];
      szExt = FlDsc0[C_jFlDsc_Ext].toLowerCase();
      switch (szExt) {
        case "ols": {
             var szNmFl = FlDsc0[C_jFlDsc_Name];
             var szNm_URL = szNmColl + szNmFl;
             var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "read", `${szNm_URL}&szUser=LCD`);
             $IPCF.U_DownLoad_File(szURL, U_CB_Scan_OLS, U_CB_Err, false, false, szNmFl);
             iCnt_Req++;
        } break;
        case "c": 
        case "h": {
             var szNmFl = FlDsc0[C_jFlDsc_Name];
             var szNm_URL = szNmColl + szNmFl;
             var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "read", `${szNm_URL}&szUser=LCD`);
             $IPCF.U_DownLoad_File(szURL, U_CB_Scan_C, U_CB_Err, false, false, szNmFl);
             iCnt_Req++;
        } break;
        case "js": {
             var szNmFl = FlDsc0[C_jFlDsc_Name];
             var szNm_URL = szNmColl + szNmFl;
             var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "read", `${szNm_URL}&szUser=LCD`);
             $IPCF.U_DownLoad_File(szURL, U_CB_Scan_JS, U_CB_Err, false, false, szNmFl);
             iCnt_Req++;
        } break;

        default : {
        } break;
      } /* switch */
  } /* for */

  setTimeout(U_CB_End, 1000);  
} /* U_Rem_Scan */

/*-----U_Init_XTG --------------------------------------------------------
*
*/ 
function U_Init_XTG()
{
  U_Root0("$XTG", C_jCd_Cur, 2);
} /* U_Init_XTG */

  U_Root0("$XTG", C_jCd_Cur, 1);
  return(_XTG);
})();  /* $XTG */
