/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : ldfile.js
* Function    : Load File.
* FirstEdit   : 10/04/2024
* LastEdit    : 30/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Data Browsing Environment.
* 
* ### Requirements
* ### Specifications
*     LdFile provides two alternative mechanism for files downloading:
*     1) direct access using FileReader API.
*     2) downloading via proxy server.
*     
*     LdFile allows files uploading via proxy server.
*     
* ### Functional Requirements
* ### Non Functional Requirements
* 
* F_Coll_Mp_OLS
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $LdFile --------------------------------------------------------
*
*/ 
const $LdFile = (function () {
  var _LdFile = {};
  _LdFile.U_Init          = U_Init_LdFile;       // function U_Init_LdFile();
  _LdFile.U_RdText        = U_RdText;            // function U_RdText(P_DDJ, P_WwFlag0);
  _LdFile.U_RdKrypt       = U_RdKrypt;           // function U_RdKrypt(P_DDJ, P_WwFlag0);
  _LdFile.U_RdBlob        = U_RdBlob;            // function U_RdBlob(P_DDJ, P_WwFlag0);
  _LdFile.U_RdDBF         = U_RdDBF;             // function U_RdDBF(P_DDJ, P_WwFlag0);
  _LdFile.U_DownLoad_NDU  = U_DownLoad_NDU;      // function U_DownLoad_NDU(P_szNDU, P_szNmFl, P_WwFlag0, P_U_CB_OnLoad);  
  _LdFile.U_DownLoad_URL  = U_DownLoad_URL;      // function U_DownLoad_URL(P_szFlNm, P_WwFlag0=C_WwFlag_Null, P_U_CB_OnLoad=null);  
  _LdFile.U_DownLoad_DDJ  = U_DownLoad_DDJ       // function U_DownLoad_DDJ(P_DDJ);
    
  _LdFile.U_UpLoad_NDU    = U_UpLoad_NDU         // function U_UpLoad_NDU(P_szNDU, P_szNmFl, P_Coll);  
  _LdFile.U_UpLoad_URL    = U_UpLoad_URL         // function U_UpLoad_URL(P_szURL, P_Coll);  
  _LdFile.U_DwLd_Update   = U_DwLd_Update;       // function U_DwLd_Update(P_szNmColl_Orig, P_szNmServer, P_szNm_URL, P_fEmbed=false);  
  _LdFile.F_Coll_Mp_JSON  = F_Coll_Mp_JSON;      // function F_Coll_Mp_JSON(P_szTxt, P_JKndTup0, P_fEmbed, R_DDJ);
  _LdFile.F_Coll_Mp_Text  = F_Coll_Mp_Text;      // function F_Coll_Mp_Text(R_DDJ, P_szTxt);
  _LdFile.U_Make_Coll     = U_Make_Coll;         // function U_Make_Coll(R_DDJ, P_szTxt)

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_LdFile;

/*----- Local Variables ----------------------------------------------*/

/*--------------------------------------------------------------------*/

/*-----U_RdText --------------------------------------------------------
*
* Read a file using FileReader.
* Files in JSON format or another supported format using JS-STANDARD procedure.
*/ 
function U_RdText(R_DDJ, P_WwFlag0)
{  
  var FileReader0 = new FileReader();
  var Coll0;
  var aFld0;

  FileReader0.onload = function(P_FileLoaded) {
    try {        
        var szTxt = P_FileLoaded.target.result;
        U_Make_Coll(R_DDJ, szTxt);    
    } catch (P_Err) {
        $Error.U_Catch(C_jCd_Cur, 1, P_Err);
    } /* try catch */
  } /* function */

  FileReader0.readAsText(R_DDJ.oFl_Ld, R_DDJ.szEnc);   
} /* U_RdText */

/*-----U_RdKrypt --------------------------------------------------------
*
* Read a file using FileReader.
* Files enkrypted, in JSON format, dekrypt and display it.
*/ 
function U_RdKrypt(R_DDJ, P_WwFlag0)
{  
  var FileReader0 = new FileReader();

  FileReader0.onload = function(P_Event) {
    var ArrBuff = FileReader0.result;
    var szTxt = $DSaft.F_szTxt_DeKrypt(ArrBuff);
    U_Make_Coll(R_DDJ, szTxt);
  } /* function */

  FileReader0.readAsArrayBuffer(R_DDJ.oFl_Ld, G_szEncoding);   
} /* U_RdKrypt */

/*-----U_RdBlob --------------------------------------------------------
* 
* Read a file using FileReader.
* Binary files. (Typed Arrays)
*/ 
function U_RdBlob(R_DDJ, P_WwFlag0)
{
  var aDic = [];
  
  function U_CB_RdBlob(P_Event) {
    var Buff0 = FileReader0.result;
    var ArrBuff = new ArrayBuffer(Buff0);
    var DataView0 = new DataView(Buff0);
    var aRcd0 = [];
    
    var aFld0 = CL_Layout.F_UsrView_Mp_szNm_aFld(R_DDJ.szNm_aFld);
    var iLen0 = aFld0.length;
    var iNnBy_Buff0 = Buff0.byteLength;
    var iSize0 = 0;
    var iCard0 = 1;
    var szCode = "";
    var szCode0;
    var iBase0 = 162;
    var iCard_Coll0;
    var pU;
    
    for (let i = 0; i < iLen0; i++) {
        if (aFld0[i].szType == "string") {
           iCard0 = aFld0[i].iLen;       
        }
        else {
           iCard = 1;
        } /* if */
        szCode0 = `Rcd0[${i}] = DataView0.${S_aFn_Mp_szNm[aFld0[i].szType]}(iOff + ${iSize0}, ${iCard0});\n`;
        iSize0 += aFld0[i].iLen;
        szCode += szCode0;
    } /* for */

    var szCode = "pU = () => {" + szCode + "}";

    U_Wr_Clipboard(szCode);  /* $Debug */

    eval(szCode);
    
    iCard_Coll0 = (iNnBy_Buff0 - iBase0) / iSize0;
        
    for (let i = 0; i < iCard_Coll0; i++) {
        var iOff = iBase0 + i * iSize0;
        var Rcd0 = [];
        pU();
        aRcd0[i] = Rcd0;             
    } /* for */

    $DDJ.U_DispColl([R_DDJ.szNmColl, C_JKndTup_aRcd, aRcd0, aFld0, R_DDJ.szNm_aFld, "Blob", (P_WwFlag0 | C_WwFlag_fOverWrite | C_WwFlag_fReadOnly), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null]]); 
  } /* function U_CB_RdBlob*/

  var FileReader0 = new FileReader();
  FileReader0.onload = U_CB_RdBlob;
  
  FileReader0.readAsArrayBuffer(R_DDJ.oFl_Ld, G_szEncoding);  
//    FileReader0.readAsBinaryString(R_DDJ.oFl_Ld, G_szEncoding);  
//    FileReader0.readAsText(R_DDJ.oFl_Ld, G_szEncoding);  
} /* U_RdBlob */

/*-----U_DownLoad_NDU --------------------------------------------------------
*
* Download the file P_szFlNm from NDU via proxy Server.
* Note: P_U_CB_OnLoad will be called in U_Make_Coll();
*/ 
function U_DownLoad_NDU(P_szNDU, P_szFlNm, P_WwFlag0, P_U_CB_OnLoad)
{
  var szURL = $NDU.F_szURL_Mp_Cmd_Res(P_szNDU, "read", P_szFlNm);
  U_DownLoad_URL(szURL, P_WwFlag0, P_U_CB_OnLoad);  
} /* U_DownLoad_NDU */

/*-----U_DownLoad_URL --------------------------------------------------------
*
* Download the file with the URL specified via proxy Server.
* Make DDJ0 and download the file corresponding to the URL specified.
*/ 
function U_DownLoad_URL(P_szURL, P_WwFlag0=C_WwFlag_Null, P_U_CB_OnLoad=null)
{
  var DDJ0 = {};
  
  DDJ0.szDDJ      = "DDJ0";
  DDJ0.U_CB_OnLoad = P_U_CB_OnLoad;  // remarks
  DDJ0.szNm_URL   = P_szURL;           
  DDJ0.szNmColl   = P_szURL.substr(P_szURL.lastIndexOf("/") +1);
    
  DDJ0.JKndTup0   = $FileMan.F_JKndTup_Mp_szFlNm(P_szURL);
  DDJ0.szNm_aFld  = "AutoDetect";
  DDJ0.aFld       = null;

  DDJ0 = $DDJ.F_DDJ_Set_WwFlag(DDJ0, P_WwFlag0); 
  U_DownLoad_DDJ(DDJ0); 
} /* U_DownLoad_URL */

/*-----U_DownLoad_DDJ --------------------------------------------------------
*
* Download a file from the URL specified in R_DDJ.szNm_URL via proxy Server.
* Called by $FileMan.U_Show_Res(); $InpData.U_Load(); U_DownLoad_URL();
*/ 
function U_DownLoad_DDJ(R_DDJ)
{
  var szNm_URL = R_DDJ.szNm_URL;
  if (szNm_URL.toLowerCase().indexOf("_kpt") >= 0) {
     R_DDJ.fKrypt  = true;
     R_DDJ.fBinary = true;
     $IPCF.U_GetFile(szNm_URL, U_CB_DownLoad_Bin, U_CB_Err, R_DDJ.fBinary, R_DDJ);
  }
  else {
     R_DDJ.fBinary = false;
     $IPCF.U_GetFile(szNm_URL, U_CB_DownLoad, U_CB_Err, R_DDJ.fBinary, R_DDJ);
  } /* if */ 
} /* U_DownLoad_DDJ */

/*-----U_CB_Err --------------------------------------------------------
*
*/ 
function U_CB_Err(P_XHR, P_szURL)
{
  var szMsg = "HTTP code: " + P_XHR.status;
  var fSilent = false; 
  if (P_XHR.status == 0) {
     if ($IPCF.F_fOnLine()) {       
        szMsg = "Probably Header CORS 'Access-Control-Allow-Origin' is missing.\n" + P_szURL;
     }
     else {
        szMsg = "We cannot access external resources because the System is OFFLINE";
     } /* if */
  } /* if */
  if ($VDebug.F_iDebug() <= C_iDebug_Dflt) {
     P_szURL = "";
  } /* if */ 
  $Error.U_Warning(C_jCd_Cur, 2, szMsg, P_szURL, fSilent);  
} /* U_CB_Err */

/*-----U_CB_DownLoad --------------------------------------------------------
*
* Swap parameters.
*/ 
function U_CB_DownLoad(P_szTxt, R_DDJ)
{
  if ((P_szTxt == "") || (P_szTxt == " ") || (P_szTxt == "\n")) {
     /* The file is empty! */
     var fjRow = $XDB.F_fjRow_Mp_JKndTup(R_DDJ.JKndTup0);
     P_szTxt = (fjRow)? "[]": "{}";
     $Error.U_Warning(C_jCd_Cur, 3, "The file is empty!", R_DDJ.szNmColl, true, false);
     return;
  } /* if */
  var iPos404 = P_szTxt.indexOf("404 File not Found");
  if ((0 <= iPos404) && (iPos404 < 10)) {
     $Error.U_Warning(C_jCd_Cur, 4, "404 File not Found", R_DDJ.szNmColl, true, false);
     return;
  } /* if */
  U_Make_Coll(R_DDJ, P_szTxt);
} /* U_CB_DownLoad */

/*-----U_CB_DownLoad_Bin --------------------------------------------------------
*
* Swap parameters.
*/ 
function U_CB_DownLoad_Bin(P_szTxt, R_DDJ)
{
  P_szTxt = $DSaft.F_szTxt_DeKrypt(P_szTxt);
  U_Make_Coll(R_DDJ, P_szTxt);
} /* U_CB_DownLoad_Bin */

/*-----U_Make_Coll --------------------------------------------------------
*
* Convert the text P_szTxt in a JS object and display it as a collection.
*/ 
function U_Make_Coll(R_DDJ, P_szTxt)
{
  var Coll0 = F_Coll_Mp_Text(R_DDJ, P_szTxt);
  if (!Coll0) {
     /* $NOTE: The text received was not in a legal format! */
     return;
  } /* if */
 
  var WwFlag0 = $DDJ.F_WwFlag_Mp_DDJ(R_DDJ) | C_WwFlag_fOverWrite;
  var Bag_XDB = [R_DDJ.szNmColl, R_DDJ.JKndTup0, Coll0, R_DDJ.aFld, R_DDJ.szNm_aFld, "DownLoaded", WwFlag0, C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null]];
 
  if (WwFlag0 & C_WwFlag_fDisplay) {
     $DDJ.U_DispColl(Bag_XDB);   /* $NOTE: We call U_DispColl() instead of new CL_XDB() because C_JKndTup_OLS management. */
  }
  else {
     var XDB_Cur = new CL_XDB(Bag_XDB);
  } /* if */
  
  if (R_DDJ.U_CB_OnLoad) {
     R_DDJ.U_CB_OnLoad(Coll0);   /* Complete initialization routine. 1081 per Remarks */
  } /* if */   
} /* U_Make_Coll */

/*-----U_DwLd_Update --------------------------------------------------------
*
* U_DwLd_Update(); download the file specified (P_szNm_URL) from the given server and update the original collection P_szNmColl_Orig.
*
*/ 
function U_DwLd_Update(P_szNmColl_Orig, P_szNmServer, P_szNm_URL, P_fEmbed=false)
{
  var DDJ0 = {};
  
  DDJ0.szNm_URL   = P_szNm_URL;           
  DDJ0.szNmColl   = P_szNmColl_Orig;
  DDJ0.fszFldNm_1 = false;
    
  DDJ0.JKndTup0  = $FileMan.F_JKndTup_Mp_szFlNm(P_szNm_URL);
  DDJ0.szNm_aFld = "AutoDetect";
  DDJ0.aFld      = null;
  DDJ0.fEmbed    = P_fEmbed;
  $IPCF.U_GetFile(DDJ0.szNm_URL, U_CB_DownLoad2, U_CB_Err, false, DDJ0); 
} /* U_DwLd_Update */

/*-----U_CB_DownLoad2 --------------------------------------------------------
*
* Swap parameters.
*/ 
function U_CB_DownLoad2(P_szTxt, R_DDJ)
{
  U_Make_Coll2(R_DDJ, P_szTxt);
} /* U_CB_DownLoad2 */

/*-----U_Make_Coll2 --------------------------------------------------------
*
* Convert the text P_szTxt in a JS object and display it as a collection.
*/ 
function U_Make_Coll2(R_DDJ, P_szTxt)
{
  var szNmCollOrig = R_DDJ.szNmColl;
  var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(szNmCollOrig);           /* Original Collection. */
  var XDB0 = UsrView0.XDB0;
  var Coll0 = UsrView0.XDB0.Coll0;  
  var WwFlag0 = $DDJ.F_WwFlag_Mp_DDJ(R_DDJ) | C_WwFlag_fOverWrite;

  /* Prepare new data for concatenation creating a temporary collection. */                                                
  var Coll1 = F_Coll_Mp_Text(R_DDJ, P_szTxt);   
  new CL_XDB(["_Tmp", UsrView0.XDB0.JKndTup0, Coll1, UsrView0.XDB0.aFld0, UsrView0.XDB0.szNm_aFld, "Concat.", WwFlag0, C_jCd_Cur, C_Bag_UsrView_Dflt]);

  $MeF.U_Concat(szNmCollOrig, "_Tmp", "", "");
  var Tmp = CL_UsrView0.F_UsrView_Select(szNmCollOrig, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
} /* U_Make_Coll2 */

/*-----F_Coll_Mp_Text --------------------------------------------------------
*
* Convert the text P_szTxt in a JS object and returns the corresponding collection.
*/ 
function F_Coll_Mp_Text(R_DDJ, P_szTxt)
{
  var Coll0;
  if (R_DDJ.JKndTup0 <= C_JKndTup_as_) {               /* JSON */
     Coll0 = $LdFile.F_Coll_Mp_JSON(P_szTxt, R_DDJ.JKndTup0, R_DDJ.fEmbed, R_DDJ);
  }
  else {
     switch (R_DDJ.JKndTup0) {
       case C_JKndTup_CSV: {
             Coll0 = F_aRcd_Mp_szCSV(P_szTxt, R_DDJ);  /* CSV */                     
             R_DDJ.JKndTup0 = C_JKndTup_aRcd;
        } break;
        case C_JKndTup_FLR: {
             if (R_DDJ.szNm_aFld != "AutoDetect") {    
                aFld0 = CL_Layout.F_UsrView_Mp_szNm_aFld(szNm_aFld);
             }
             else {
                var aRow = P_szTxt.split('\n');        /* Split in rows */
                var aFld0 = $AutoDetect.F_aFld_Autodetect_FLR(aRow[0]);
                R_DDJ.aFld = aFld0;
             } /* if */
             Coll0 = F_aRcd_Mp_szFLR(P_szTxt, aFld0);  /* FLR */
             R_DDJ.JKndTup0 = C_JKndTup_aRcd;
        } break;
        case C_JKndTup_XML: {
             Coll0 = F_aRcd_Mp_szXML(P_szTxt);         /* XML */
             R_DDJ.JKndTup0 = C_JKndTup_Obj;
        } break;
        case C_JKndTup_Text: {
             Coll0 = F_aRcd_Mp_szText(P_szTxt);
    //         Coll0 = $LcdLcd.F_aRcd_Mp_Diario(P_szTxt);
    //         Coll0 = $NatLang.F_aRcd_WrdFreq(P_szTxt);
             R_DDJ.JKndTup0 = C_JKndTup_aRcd;
        } break;
        case C_JKndTup_DBF:
        case C_JKndTup_Blob: {                         /* Blob & DBF */
             /* $NOTE: BLOB and DBF require specific conversion routines */
             $Error.U_Error(C_jCd_Cur, 1, "Wrong BLOB converter", P_JKndTup0, false);
        } break;
        case C_JKndTup_OLS: {                          /* OLS */
             Coll0 = F_Coll_Mp_OLS(R_DDJ, P_szTxt);
        } break;
        case C_JKndTup_TOON: {                         /* TOON */
             Coll0 = F_Coll_Mp_TOON(R_DDJ, P_szTxt);
             var JKndTup0 = $AutoDetect.F_JKndTup(Coll0);
             R_DDJ.JKndTup0 = JKndTup0;
        } break;
        default : {
             $Error.U_Error(C_jCd_Cur, 2, "Unknow data format", P_JKndTup0, false);
        } break;
     } /* switch */
  } /* if */

  return(Coll0);
} /* F_Coll_Mp_Text */

/*-----F_Coll_Mp_JSON --------------------------------------------------------
*
* Try to convert the given string (corresponding to the external representation of the data structure) in a regular JavaScript Object (Collection).
* 
* NOTE: this routine offers the possibility to convert lists of records not enclosed in parentheses in JSON strings.
* 
* e.g. ["aaa", 100, true], ["bbb", 101, true], ["ccc", 102, true], ["ddd", 103, true]  ==> [ ["aaa", 100, true], ["bbb", 101, true], ["ccc", 102, true], ["ddd", 103, true] ]
*/ 
function F_Coll_Mp_JSON(P_szTxt, P_JKndTup0, P_fEmbed, P_DDJ)
{
  var szTxt;
  var Coll0;
  var Tmp0, aTmp;
  var szMsg = "";
  var ch;
  var j;
  var szNm_URL = P_DDJ.szNm_URL + "\n";
  P_szTxt = P_szTxt.trim();
  var iLen = P_szTxt.length -1;
  
  for (j = iLen; j >= 0; j--) {
      ch = P_szTxt[j];
      if ((P_szTxt[j] == "]") || (P_szTxt[j] == "}")) {
         break;
      } else if (P_szTxt[j] == ",") {
         /* remove comma */
         P_szTxt = P_szTxt.substr(0, j);
         P_fEmbed = true;
         break;
      } else if ((P_szTxt[j] == " ") || (P_szTxt[j] == "\n") || (P_szTxt[j] == "\r")) {
         /* ignore */
         continue; 
      }
      else {
         $Error.U_Error(C_jCd_Cur, 3, szNm_URL + `Unexepected char '${ch}' in position `, j, false);
         return;
      } /* if */
  } /* for */

  if (P_JKndTup0 == C_JKndTup_aObj) {
     ch = P_szTxt[j-1];
     if (ch == "}") {
        /* $ASSUME: special case in witch [] has been omitted because data will be recorded in the collection in incremental way. */
        P_fEmbed = true;         
        // $Error.U_Warning(C_jCd_Cur, 8, "[] has been omitted", "", true);  
     } /* if */
  } /* if */
  
  switch (P_JKndTup0) {
    case C_JKndTup_Arr:
    case C_JKndTup_aRcd:
    case C_JKndTup_aObj: {
              szTxt  = (P_fEmbed)? "[" + P_szTxt + "]": P_szTxt;
              try {
                  Coll0 = JSON.parse(szTxt);
              } catch (P_Err1) {
                  szTxt  = "[" + P_szTxt + "]";
                  try {
                      Coll0 = JSON.parse(szTxt);
                  } catch (P_Err1) {
                      szMsg = P_Err1.message;  
                      $Error.U_Error(C_jCd_Cur, 4, szNm_URL + "JSON conversion failed.", szMsg, false);
                  } /* try catch */  
              } /* try catch */          
    } break;
    case C_JKndTup_Obj:
    case C_JKndTup_as_:
    case C_JKndTup_asRcd:
    case C_JKndTup_asObj: {
              szTxt  = (P_fEmbed)? "{" + P_szTxt + "}": P_szTxt;
              try {
                  Coll0 = JSON.parse(szTxt);
              } catch (P_Err1) {
                  szTxt  = "{" + P_szTxt + "}";
                  try {
                      Coll0 = JSON.parse(szTxt);
                  } catch (P_Err1) {
                      szMsg = P_Err1.message; 
                      $Error.U_Error(C_jCd_Cur, 5, szNm_URL + "JSON conversion failed.", szMsg, false);
                  } /* try catch */  
              } /* try catch */  
    } break;
    default : {
         if (P_DDJ.szNmColl.substr(P_DDJ.szNmColl.length -3) == ".js") {
            try {
                 P_szTxt = P_szTxt.substr(P_szTxt.indexOf("=") +1);
                    szTxt  = (P_fEmbed)? "{" + P_szTxt + "}": P_szTxt;
                    try {
                        Coll0 = JSON.parse(szTxt);
                        P_DDJ.JKndTup0 = C_JKndTup_Obj;
                    } catch (P_Err1) {
                        szMsg = P_Err1.message; 
                        $Error.U_Error(C_jCd_Cur, 6, szNm_URL + "JSON conversion failed.", szMsg, false);
                    } /* try catch */  
                return(Coll0);
            } catch (P_Err) {
            } /* try catch */
         } /* if */
         $Error.U_Error(C_jCd_Cur, 7, szNm_URL + "Unknow data format", P_JKndTup0, false);
    } break;
  } /* switch */
  
  return(Coll0);
} /* F_Coll_Mp_JSON */

/*-----F_Coll_Mp_OLS --------------------------------------------------------
*
* Given a file in OLS format create the collections in it.
*/ 
function F_Coll_Mp_OLS(R_DDJ, P_szTxt)
{
const C_jHdrOls_szNm   = 0;
const C_jHdrOls_szType = 1;
const C_jHdrOls_szCap_0  = 2;

//const C_jHdrOls_szNm   = 0;
//const C_jHdrOls_szType = 1;
const C_jHdrOls_szNm_aFld = 2;
const C_jHdrOls_szCap_1   = 3;
const C_jHdrOls_szPre     = 4;
const C_jHdrOls_szPost    = 5;

 var fAutoExec = false;
 var szCode = "";
 var Coll0;
 var JSON0;
 var szMsg = "";
 
 try {
     JSON0 = JSON.parse(P_szTxt);
 } catch (P_Err1) {
     $Error.U_Error(C_jCd_Cur, 8, "The text loaded is not compliant with JSON's specs.\n" + R_DDJ.szNm_URL + "\n", P_Err1.message, false);
     return;
 } /* try catch */
 
 var Hdr0 = F_ValFld_Obj(JSON0, "_Hdr0_");
 if (Hdr0 == C_Undefined) {
    /* Rel. 0.0 */
    var aHdr = JSON0.aHdr;
   
    for (let j = 1; j < aHdr.length; j++) {
        let szNmColl = aHdr[j][C_jHdrOls_szNm];
        Coll0 = JSON0[szNmColl];
        if (j & 1) {
           new CL_XDB0([szNmColl, C_JKndTup_aObj, Coll0, null, "aFld_aFld", "Layout.", C_WwFlag_fOverWrite, C_jCd_Cur]);
        }
        else {
           let szNm_aFld = aHdr[j-1][C_jHdrOls_szNm];
           new CL_XDB([szNmColl, aHdr[j][C_jHdrOls_szType], Coll0, JSON0[szNm_aFld], szNm_aFld,  aHdr[j][C_jHdrOls_szCap_0], (C_WwFlag_fOverWrite | C_WwFlag_fSample), C_jCd_Cur, C_Bag_UsrView_Dflt]);
        } /* if */
    } /* for */

    /* Change R_DDJ.szNmColl selecting the first Collection stored in the .OLS file. */
    var szNmColl = aHdr[2][0];
    R_DDJ.szNmColl = szNmColl;
    var UsrView0 = CL_UsrView0.F_UsrView_Select(szNmColl, (R_DDJ.fReadOnly | C_WwFlag_fSearchCS));
    
    fAutoExec = (aHdr[0][1] == "autoexec");
    szCode = JSON0["autoexec"];
 }
 else {
    if (Hdr0.iRel == 1.0) {
        var _Hdr0_ = JSON0._Hdr0_;
        var aaFld = F_ValFld_Obj(JSON0, "_aaFld_");
        var aColl = F_ValFld_Obj(JSON0, "_aColl_");
        fAutoExec = Hdr0["szAutoExec"];
        if (fAutoExec) {
           szCode = JSON0["autoexec"];
        } /* if */
         
        for (let j = 0; j < aaFld.length; j++) {    
            let szNmColl = aaFld[j][C_jHdrOls_szNm]; 
            Coll0 = JSON0[szNmColl];
            new CL_XDB0([szNmColl, C_JKndTup_aObj, Coll0, null, "aFld_aFld", "Layout.", C_WwFlag_fOverWrite, C_jCd_Cur]);
        } /* for */    
        for (let j = 0; j < aColl.length; j++) {
            let BagColl0  = aColl[j];
            let szNmColl, szType, szNm_aFld, szCap_1, szPre, szPost, szCfgUV;      /* $DEBUG: see Init.OLS */
            [szNmColl, szType, szNm_aFld, szCap_1, szPre, szPost, szCfgUV] = BagColl0;    
            
            if (typeof(szPre) == "string") {
               $Error.U_Try(szPre);              /* Try to execute Collection preprocessing code*/
            } /* if */
            Coll0 = JSON0[szNmColl];
            let Bag_UsrView0 = [R_DDJ.szNm_URL, C_jPg_0, '', _Hdr0_, JSON0];
            new CL_XDB([szNmColl, szType, Coll0, null, szNm_aFld, szCap_1, (C_WwFlag_fOverWrite | C_WwFlag_fSample), C_jCd_Cur, Bag_UsrView0]);
            if (typeof(szPost) == "string") {
               $Error.U_Try(szPost);             /* Try to execute Collection postprocessing code*/
            } /* if */    
        } /* for */
    
        /* If fDisplay then change R_DDJ.szNmColl selecting the first Collection stored in the .OLS file and show it. */
        if (R_DDJ.WwFlag0 & C_WwFlag_fDisplay) {
            var szNmColl   = aColl[0][C_jHdrOls_szNm];
            R_DDJ.szNmColl = szNmColl;
            var UsrView0 = CL_UsrView0.F_UsrView_Select(szNmColl, (R_DDJ.fReadOnly | C_WwFlag_fSearchCS));    
        } /* if */    
    }
    else {
        $Error.U_Error(C_jCd_Cur, 9, "OLS Version unknown: ", Hdr0.iRes, false);
    } /* if */
 } /* if */
 if (fAutoExec) {
    /* Active Data Collection support. */
    /* Update collection executing initialization code. */
    try {
        eval(szCode);
    } catch (P_Err) {
        var szErr = $Error.F_szErr_Catch(P_Err); 
        $Error.U_Error(C_jCd_Cur, 10, "F_Coll_Mp_OLS - ", szErr, false);
    } /* try catch */
 } /* if */

 return(Coll0);
} /* F_Coll_Mp_OLS */


/*-----F_Coll_Mp_TOON --------------------------------------------------------
*
* Given a file in TOON format create the collections in it.
*/ 
function F_Coll_Mp_TOON(R_DDJ, P_szTxt)
{
 var Coll0 = decode(P_szTxt);
 return(Coll0);
} /* F_Coll_Mp_TOON */

/*-----F_aRcd_Mp_szText --------------------------------------------------------
*
* Convert a string in CSV format in a matrix.
*/ 
function F_aRcd_Mp_szText(P_szCSV)
{
  var aRow = P_szCSV.split('\n');    /* Split in rows */
  var iNnRow = aRow.length;
  var aMat=[];
  var iPos_Blank;
  var sz0;
  var j;
  
  for (var i = 0; i < iNnRow; i++) {
      iPos_Blank = aRow[i].indexOf(" ");
      aMat[i] = [];
      sz0 = aRow[i].substring(0, iPos_Blank);        
      aMat[i][0] = i;
      aMat[i][1] = aRow[i].substring(iPos_Blank);        
      aMat[i][2] = sz0;
  } /* for */
  return(aMat);
} /* F_aRcd_Mp_szText */

/*-----F_aRcd_Mp_szCSV --------------------------------------------------------
*
* Convert a string in CSV format in a matrix.
*/ 
function F_aRcd_Mp_szCSV(P_szCSV, R_DDJ)
{  
  function F_aRcd1(P_aszRcd)
  {
/* Load all fields as strings. */
    var aRcd = P_aszRcd.split(chSep1); /* Split in columns */ 
    return(aRcd);
  } /* F_aRcd1 */
  
  function F_aRcd0(P_aszRcd)
  {
/*
Fails for:
2024-12-21,12.933252531202468,
*/
    var aRcd;
    try {
        eval("aRcd = [" + P_aszRcd + "]");
    } catch (P_Err) {                                                                                                                                                                                                                   
        aRcd = P_aszRcd.split(chSep1); /* Split in columns */ 
    } /* try catch */
    return(aRcd);
  } /* F_aRcd0 */
  
  if (typeof(R_DDJ.chSep1) == "undefined") {  /* Set defaults */
     R_DDJ.chSep1 = ",";
     R_DDJ.chSep2 = "";
  } /* if */

  var chSep1 = R_DDJ.chSep1;           /* Character used as separator. Usually comma ',' */
  
  if (chSep1 == " ") {
     P_szCSV = P_szCSV.replaceAll("  ", " ");
     P_szCSV = P_szCSV.replaceAll("  ", " ");
     P_szCSV = P_szCSV.replaceAll("  ", " ");
  } /* if */

  if (R_DDJ.chSep2 != "") {
     var chSep2 = R_DDJ.chSep2;
     if ((chSep2 == "\t") || (chSep2 == "\\t")) {
        chSep2 = "\t";
     } /* if */
     P_szCSV = P_szCSV.replaceAll(chSep2, chSep1);
  } /* if */
  var aRow = P_szCSV.split('\n');    /* Split in rows */
  if (R_DDJ.iSkip > 0) {
     /* Remove the firsts iSkip lines from the array. */
     aRow = aRow.slice(R_DDJ.iSkip);
  } /* if */
  var iNnRow = aRow.length;
  var pF_aRcd = (R_DDJ.fAlgCSV1)? F_aRcd1: F_aRcd0;
  var aMat=[];
  var aszRcd;
  var Rcd0, Rcd1, Rcd2;
  var iIni = (R_DDJ.fszFldNm_1)? 1: 0;
  var j = 0;
  
  var fAdd_LnNum = R_DDJ.fLnNum;

  for (var i = 0; i < iNnRow; i++) {
       aszRcd = aRow[i].replaceAll("\r", "");
       if (aszRcd == "") {
          continue;        /* Skip empty lines. */
       } /* if */
       if (fAdd_LnNum) {
//          Rcd0 = (j == 0)? [""]: [j];  // 30/01/2026
          Rcd0 = [j];
          Rcd1 = pF_aRcd(aszRcd);
          Rcd2 = Rcd0.concat(Rcd1);  
       }
       else {
          Rcd2 = pF_aRcd(aszRcd);
       } /* if */       
      
       aMat[j++] = Rcd2;
  } /* for */

  return(aMat);
} /* F_aRcd_Mp_szCSV */

/*-----F_aRcd_Mp_szFLR --------------------------------------------------------
*
* Convert a string of Fixed Length Records in a matrix.
*/ 
function F_aRcd_Mp_szFLR(P_szFLR, P_aFld0)
{
  var aRow = P_szFLR.split('\n');    /* Split in rows */
  var iCard_aFld0 = P_aFld0.length;

  var iNnRow = aRow.length;
  var aMat=[];
  var i, j, k, iLen;
  
  for (var i = 0; i < iNnRow; i++) {
      k = 0;
      aMat[i] = [];
      for (j = 0; j < iCard_aFld0; j++) {
          var Row0 = aRow[i];
          iLen = P_aFld0[j].iLen;
          var iTmp = Row0.substr(k, iLen);
          aMat[i][j] = iTmp;
          k += iLen;
      } /* for */
  } /* for */
  return(aMat);
} /* F_aRcd_Mp_szFLR */

var S_aFn_Mp_szNm =
{
  "Byte":  "getUint8",  
  "UByte": "getInt8",   
  "Word":  "getUint16",  
  "short": "getInt16", 
  "DWord": "getUint32", 
  "int":   "getInt32",  
  "QWord": "getUint64", 
  "int64": "getInt64",  
  "float": "getFloat32",
  "real":  "getFloat64",
  "string":"getString",
  "number":"getString",
  "boolean":"getString",
  "date":  "getDate",
  "memo":  "getMemo"
};

/*-----U_RdDBF --------------------------------------------------------
* 
* Read a DBIII file.
*/ 
function U_RdDBF(R_DDJ, P_WwFlag0)
{
  var DBF_Hdr = {
  "ByVer" : 0,                    /*  00   byte    dBASE vers.num. 03h=dBASE III w/o .DBT 83h=dBASE III w .DBT */
  "ByYearUpdLst" : 0,             /*  01   byte    year of last update */
  "ByMonthUpdLst" : 0,            /*  02   byte    month of last update */
  "ByDayUpdLst" : 0,              /*  03   byte    day of last update */
  "DwNNRcd" : 0,                  /*  04   dword   long int number of data records in file */
  "WwSize_Hd" : 0,                /*  08   word    header structure length */
  "WwSize_Rcd" : 0,               /*  10   word    data record length */
  "aByRes1": 0                    /*  12   20bytes version 1.0 reserved data space */ 
  };
                     
  var aDic = [];
   
  function U_CB_RdDBF(P_Event) {
    const C_iCard_szFldNm = 11;
    var Buff0 = FileReader0.result;
    var ArrBuff = new ArrayBuffer(Buff0);
    var DataView0 = new DataView(Buff0);
    var Fld1;
    var aRcd0 = [];
    var iLen0;
    var iLen00;
    var iNnBy_Buff0 = Buff0.byteLength;
    var iSize0 = 0;
    var iCard0 = 1;
    var szCode = "";
    var szCode0;
    var iBase0;
    var ch;
    var iCard_Coll0;
    var pU;

    DBF_Hdr.ByVer         = DataView0.getUint8(  0, true);             /*  00   byte    dBASE vers.num. 03h=dBASE III w/o .DBT 83h=dBASE III w .DBT */        
    DBF_Hdr.ByYearUpdLst  = DataView0.getUint8(  1, true);             /*  01   byte    year of last update */                                                
    DBF_Hdr.ByMonthUpdLst = DataView0.getUint8(  2, true);             /*  02   byte    month of last update */                                               
    DBF_Hdr.ByDayUpdLst   = DataView0.getUint8(  3, true);             /*  03   byte    day of last update */                                                 
    DBF_Hdr.DwNNRcd       = DataView0.getUint32( 4, true);             /*  04   dword   long int number of data records in file */                            
    DBF_Hdr.WwSize_Hd     = DataView0.getUint16( 8, true);             /*  08   word    header structure length */                                            
    DBF_Hdr.WwSize_Rcd    = DataView0.getUint16(10, true);             /*  10   word    data record length */                                                 
    DBF_Hdr.aByRes1       = DataView0.getString(12, 20);               /*  12   20bytes version 1.0 reserved data space */                                    

    iBase0 = DBF_Hdr.WwSize_Hd;
    iLen00 = ((iBase0 -2) / 32) -1;
    
    var aFld1 = [];
    for (let i = 0; i < iLen00; i++) {
        let Fld1 = {};
        let iOff0 = (i + 1) * 32;
        let szFldNm     = DataView0.getString(iOff0 +  0, 11);         /*  00 11bytes   null terminated field name string */
        let chType      = DataView0.getUint8(iOff0  + 11, true);       /*  11   byte    data type, Char/Num/Logical (iOff0 + C,D,L,M,N) */
        let DwOffFld    = DataView0.getUint32(iOff0 + 12, true);       /*  12   dword   long int field data address, (iOff0 + set in memory) */
        let BySizeFld   = DataView0.getUint8(iOff0  + 16, true);       /*  16   byte    field length */
        let ByNNDec     = DataView0.getUint8(iOff0  + 17, true);       /*  17   byte    number of decimal places */
        let WwLAN0      = DataView0.getUint16(iOff0 + 18, true);       /*  18   word    reserved for Local Area Network use */
        let ByWrkArea   = DataView0.getUint8(iOff0  + 20, true);       /*  20   byte    work area */
        let aBy_WwLAN1  = DataView0.getUint16(iOff0 + 21, true);       /*  21   word    reserved for Local Area Network use */
        let BySetFields = DataView0.getUint8(iOff0  + 23, true);       /*  23   byte    SETFIELDS tag */
        let aByRes      = DataView0.getString(iOff0 + 24, 8);          /*  24  8bytes   version 1.00 reserved data area */
        
        Fld1.szNm   = szFldNm;
        Fld1.szType = F_szType_Mp_ch(chType);
        Fld1.iLen   = BySizeFld;
        Fld1.iDec   = ByNNDec;
        
        aFld1[i] = Fld1;             
    } /* for */
    
    var iSize0 = 1; 
    for (let i = 0; i < iLen00; i++) {
        Fld1 = aFld1[i];
        ch = (Fld1.szType == "number")? '+': '';
        szCode0 = `Rcd0[${i}] = ${ch}DataView0.${S_aFn_Mp_szNm[aFld1[i].szType]}(iOff + ${iSize0}, ${aFld1[i].iLen});\n`;
        iSize0 += Fld1.iLen;
        szCode += szCode0;
    } /* for */

    var szCode = "pU = () => {" + szCode + "}";
    eval(szCode);
      
    iCard_Coll0 = DBF_Hdr.DwNNRcd;
    iBase0 = DBF_Hdr.WwSize_Hd;
    iSize0 = DBF_Hdr.WwSize_Rcd;
              
    for (let i = 0; i < iCard_Coll0; i++) {
        var iOff = iBase0 + (i * iSize0);
        var Rcd0 = [];
        pU();
        aRcd0[i] = Rcd0;             
    } /* for */
    
    var szNm_aFld = "aFld_" + R_DDJ.szNmColl;
    new CL_XDB0([szNm_aFld, C_JKndTup_aObj, aFld1, null, "aFld_aFld", "Prova Layout.", C_WwFlag_Null, C_jCd_Cur]);

    $DDJ.U_DispColl([R_DDJ.szNmColl, C_JKndTup_aRcd, aRcd0, aFld1, szNm_aFld, "DBF", P_WwFlag0, C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null]]);
  } /* function U_CB_RdDBF*/
  
  var FileReader0 = new FileReader();
  FileReader0.onload = U_CB_RdDBF;
  
  FileReader0.readAsArrayBuffer(R_DDJ.oFl_Ld, G_szEncoding);  
} /* U_RdDBF */

/*-----getString --------------------------------------------------------
* https://github.com/doomjs/dataview-getstring/blob/master/index.js
*/ 
DataView.prototype.getString = function(P_iOff, P_iLen){
    var end = (typeof(P_iLen) == 'number')? P_iOff + P_iLen: this.byteLength;
    var szTxt = '';
    var val;

    while ((P_iOff < this.byteLength) && (P_iOff < end)){
          val = this.getUint8(P_iOff++);
          if (val == 0) {
              break;
          } /* if */
          szTxt += String.fromCharCode(val);
    } /* while */

    return(szTxt);
} /* getString */

/*-----getDate --------------------------------------------------------
*
*/ 
DataView.prototype.getDate = function(P_iOff, P_iLen){
    var DataView0 = this;
    var szTxt = DataView0.getString(P_iOff, P_iLen);      
    var szDate = szTxt.substr(0,4) + "-" + szTxt.substr(4,2) + "-" + szTxt.substr(6,2);
    return(szDate);
} /* getDate */

/*-----getMemo --------------------------------------------------------
*
*/ 
DataView.prototype.getMemo = function(P_iOff, P_iLen){
  var DataView0 = this;
  var szTxt = DataView0.getString(P_iOff, P_iLen); 
  return(+szTxt);
} /* getMemo */

/*-----F_szType_Mp_ch --------------------------------------------------------
*
*/ 
function F_szType_Mp_ch(P_ch)
{
  var szType0;

  switch (String.fromCharCode(P_ch)) {
    case 'D': {
         szType0 = "date";
    } break;
    case 'C': {
         szType0 = "string";
    } break;
    case 'L': {
         szType0 = "boolean";
    } break;
    case 'M': {
         szType0 = "memo";
    } break;
    case 'N':
    case 'F': {
         szType0 = "number";
    } break;
    case 'Y':                    /* Currency (Fox Pro) */
    case 'T':                    /* Time stamp (Fox Pro) */
    case 'I':                    /* Integer (Fox Pro) */
    {
         szType0 = "number";
    } break;
    default : {
    } break;
  } /* switch */
  return(szType0);  
} /* F_szType_Mp_ch */   

/*-----F_aRcd_Mp_szXML --------------------------------------------------------
*
* Convert a string XML in a JS' Object.
* https://www.xml.com/pub/a/2006/05/31/converting-between-xml-and-json.html
* https://goessner.net/download/prj/jsonxml/
* https://coursesweb.net/javascript/convert-xml-json-javascript_s2
* 
* XML support should be considered "experimental".
* Correct operation is not guaranteed!
*/ 
function F_aRcd_Mp_szXML(P_szXML)
{
  var szJSON = c_xml2json.fromStr(P_szXML, 'string');      // coursesweb.net
  var Obj0 = JSON.parse(szJSON);

//   var szJSON = xml2json(parseXml(P_szXML), "  ");       // goessner.net
//   var Obj0 = JSON.parse(szJSON);

  return(Obj0);
} /* F_aRcd_Mp_szXML */

/*-----U_UpLoad_NDU --------------------------------------------------------
*
*/ 
function U_UpLoad_NDU(P_szNDU, P_szNmFl, P_Coll)
{
  var szURL = $NDU.F_szURL_Mp_Cmd_Res(P_szNDU, "write", P_szNmFl);
  U_UpLoad_URL(szURL, P_Coll);  
} /* U_UpLoad_NDU */

/*-----U_UpLoad_URL --------------------------------------------------------
*
* 
*/ 
function U_UpLoad_URL(P_szURL, P_Coll)
{
  if (!P_Coll) {
     var UsrView0 = CL_UsrView0.F_UsrView_Selected(); 
     var XDB0 = UsrView0.XDB0;
     var Coll0 = XDB0.Coll0;
     P_Coll = Coll0;
  } /* if */
  var szBuff = JSON.stringify(P_Coll);
  $IPCF.U_UpLoad_File(P_szURL, szBuff);
} /* U_UpLoad_URL */

/*-----U_Init_LdFile --------------------------------------------------------
*
*/ 
function U_Init_LdFile()
{
  U_Root0("$LdFile", C_jCd_Cur);
} /* U_Init_LdFile */

  return(_LdFile);
})();  /* LdFile */

/*-----U_Pre --------------------------------------------------------
*
*/ 
function U_Pre(P_Val)
{
//  ALERT("Pre", 1);
//  debugger;
} /* U_Pre */

/*-----U_Post --------------------------------------------------------
*
*/ 
function U_Post(P_Val)
{
//  ALERT("Post", 1);
//  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
//  debugger;
} /* U_Post */

















