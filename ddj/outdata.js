/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : outdata.js
* Function    : Data Saving.
* FirstEdit   : 15/12/2019
* LastEdit    : 29/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Save Collection reorganizing rows and columns and changing the Kind of representation.
*
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* F_szOLS_Mp_Coll();
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*
*  Save Collection.
*/
var G_szHTML_DBox_OutData  = `<div style="padding:10%;">
<fieldset> <legend>Select output medium.</legend><br>
        <br>
        <label for="Id_szDest">Destination:</label>
        <select id="Id_szDest" size="1" onchange="G_DBox_OutData.U_Dest(Id_szDest.value);">
          <option value="File">File </option>
          <option value="File DDJ" class="Cl_LcdLcd">File DDJ </option>
          <option value="Local">LocalStorage </option>
          <option value="Session">SessionStorage</option>
          <option value="Clipboard">Clipboard</option>
          <option value="URL">URL </option>
        </select><br><br>
          <div id="Id_DivO_File"> File: <input type="text" id="Id_InpO_File_File"></div>
          <div id="Id_DivO_File_DDJ" hidden> File DDJ: <input type="text" id="Id_InpO_File_DDJ" onchange="G_DBox_OutData.U_Upd_szFlNm(Id_InpO_File_DDJ.value)"></div>
          <div id="Id_DivO_Local" hidden> Local: <input id="Id_InpO_Local" type="text"></div>
          <div id="Id_DivO_Session" hidden> Session: <input id="Id_InpO_Session" type="text"></div>
          <div id="Id_DivO_URL" hidden>
            URL: <input id="Id_InpO_URL" type="text" list="Id_Li_Out_URL" size=40 placeholder="--- List ---"> <button onclick="Id_InpO_URL.value = ''">clear</button>
            File: <input type="text" id="Id_InpO_File_URL">
            <datalist id="Id_Li_Out_URL">
              <option value="http://localhost/Relay/irc/write.php/?szUser=LCD&szTopic=R:/">http://localhost/Relay/irc/write.php/?szUser=LCD&szTopic=R:/</option>
              <option value="http://localhost/Relay/irc/dump2.php/?szUser=LCD&szTopic=OLS">http://localhost/Relay/irc/dump2.php/?szUser=LCD&szTopic=OLS</option>
            </datalist>          
          </div>
          <div id="Id_DivO_Var" hidden> Variable: <input id="Id_InpO_Var" type="text"></div>
          <br>
<label for="Id_JKndTup1">Save as:</label>
<select id="Id_JKndTup1" size="1" onchange="G_DBox_OutData.U_Upd_Kind(Id_JKndTup1.value, 'OutData');">
          <option value="1" title="Array">Arr </option>                         <!-- $NOTE: numeric code correspond to C_JKndTup_XXX constants defined in xdb.js -->
          <option value="2" title="Object">Obj </option>
          <option value="3" title="Array of Records">aRcd </option>
          <option value="4" title="Array of Objects">aObj </option>
          <option value="5" title="Associative Array of Records">asRcd </option>
          <option value="6" title="Associative Array of Objects">asObj </option>
          <option value="10" title="Associative Array of simple type">as_ </option>
          <option value="16" title="OLS' proprietary format.">OLS </option>
          <option value="17" title="Comma Separated Values">CSV </option>
          <option value="18" title="Typed Array" hidden>Blob </option>
          <option value="19" title="Fixed Length Records">FLR </option>
          <option value="20" title="XML">XML </option>
          <option value="22" title="HTML">HTML </option>
          <option value="24" title="HTML">TOON </option>
</select><br><br>
<label for="Id_Out_jPrimKey">Name of the field used as Primary key (or 'unsorted'): </label> <select id="Id_Out_jPrimKey">&nbsp;</select><br>
<label for="Id_CBox_fSvAll">Save all fields vs. save selected fields:</label> <input id="Id_CBox_fSvAll" type="checkbox">
<label for="Id_CBox_fKrypt">Krypt:</label> <input id="Id_CBox_fKrypt" type="checkbox">
<label for="Id_CBox_fShow">Show:</label> <input id="Id_CBox_fShow" type="checkbox">
</fieldset>
</div>`;

/* # ---- Object OutData -------------------------------------------------------
*
* Save data collection in a File.
*/ 
var G_DBox_OutData = (function(){ 
  var _OutData = {};
  _OutData.U_Open     = U_Open;           // function U_Open(P_Bag);
  _OutData.U_Close    = U_Close;          // function U_Close(P_Bag);
  _OutData.U_Confirm  = U_Sav_Confirm;    // function U_Sav_Confirm(P_Bag);
  _OutData.U_Dest     = U_Dest;           // function U_Dest(P_JDest);
  _OutData.U_Upd_Kind = U_Upd_Kind;       // function U_Upd_Kind(P_JKndTup1, P_sz0);
  _OutData.U_Upd_szFlNm  = U_Upd_szFlNm;  // function U_Upd_szFlNm(P_szFlNm); 

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_OutData;

/*-----U_Upd_szFlNm --------------------------------------------------------
*
*/ 
function U_Upd_szFlNm(P_szFlNm)
{
  var iDotPos = P_szFlNm.lastIndexOf(".");          
  var szExt = P_szFlNm.substring(iDotPos + 1);
  szExt = szExt.toLowerCase();
  var JKndTup0 = $FileMan.F_JKndTup_Mp_szExt(szExt);
  Id_JKndTup1.value = JKndTup0;
} /* U_Upd_szFlNm */
  
/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld1 = UsrView0.aFld1
  var iLen = aFld1.length;
  var JKndTup0 = XDB0.JKndTup0;
  var szNmColl = UsrView0.szNmColl;
  var iPos = szNmColl.lastIndexOf(".");
  if (0 < iPos) {
     szNmColl = szNmColl.substr(0, iPos);
  } /* if */
  if (szNmColl[szNmColl.length -1] == "/") {
     /* Its a directory name? */
     szNmColl = szNmColl.substr(0, szNmColl.length -1);
  } /* if */
  Id_InpO_File_File.value = szNmColl + "." + C_asz_JKndTup[JKndTup0];
  Id_InpO_File_URL.value  = szNmColl + "." + C_asz_JKndTup[JKndTup0];
  Id_JKndTup1.value = JKndTup0;
  var sz0 = "";
  sz0 += `<option value="-1">unsorted</option>`;
  sz0 = sz0 + F_szHTML_Option_Mp_aObj(aFld1, "szNm", -1, false, false);
  Id_Out_jPrimKey.innerHTML = sz0; // Set options list
  Id_CBox_fSvAll.checked = false;  // Save only Selected fields
  Id_CBox_fKrypt.checked = false;
  Id_CBox_fShow.checked  = false; 
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{

} /* U_Close */

/*-----U_Dest --------------------------------------------------------
*
*/ 
function U_Dest(P_JDest)
{     
  Id_DivO_File.hidden = true;    
  Id_DivO_File_DDJ.hidden = true;    
  Id_DivO_Local.hidden = true;   
  Id_DivO_Session.hidden = true; 
  Id_DivO_URL.hidden = true;      

  switch (P_JDest) {
    case "File": {
          Id_DivO_File.hidden = false;
    } break;
    case "File DDJ": {
          Id_DivO_File_DDJ.hidden = false;
    } break;
    case "Local": {
          Id_DivO_Local.hidden = false;
    } break;
    case "Session": {
          Id_DivO_Session.hidden = false;
    } break;
    case "URL": {
         Id_DivO_URL.hidden = false;
    } break;
    default : {
    } break;
  } /* switch */
  
  G_DBox_OutData.U_Upd_Kind(Id_JKndTup1.value, 'OutData');  // 2025-09-11
} /* U_Dest */

/*-----U_Upd_Kind --------------------------------------------------------
*
*/ 
function U_Upd_Kind(P_JKndTup1, P_sz0)
{
  var szNmColl = Id_InpO_File_File.value;
  var szExt    = C_asz_JKndTup[P_JKndTup1];
  
  var iPos = szNmColl.lastIndexOf(".");
  if (0 < iPos) {
     szNmColl = szNmColl.substr(0, iPos);
  } /* if */

  Id_InpO_File_File.value = szNmColl + "." + szExt;
  Id_InpO_Local.value     = szNmColl + "." + szExt;
  Id_InpO_Session.value   = szNmColl + "." + szExt;
  Id_InpO_File_URL.value  = szNmColl + "." + szExt;
} /* U_Upd_Kind */

/*-----U_Sav_Confirm --------------------------------------------------------
*
* Saving recovery point.
*/ 
function U_Sav_Confirm(P_Bag)
{  
  try {
      U_Sav_Confirm0();
  } catch (P_Err) {
      $Error.U_Catch(C_jCd_Cur, 1, P_Err);
  } /* try catch */
} /* U_Sav_Confirm */

/*-----U_Sav_Confirm0 --------------------------------------------------------
*
* Save the JSON text representing the current Table in a file.
*/ 
function U_Sav_Confirm0()
{  
  G_DDJ.JKndTup1  = +document.getElementById("Id_JKndTup1").value;
  G_DDJ.jPrimKey  = +Id_Out_jPrimKey.value;
  G_DDJ.fSvAll    = Id_CBox_fSvAll.checked;
  G_DDJ.fKrypt    = Id_CBox_fKrypt.checked;
  var fShow       = Id_CBox_fShow.checked;
  if (fShow) {
     $DDJ.U_Ena_Show();
  } /* if */
  
  var szDest      = Id_szDest.value;
  var szNm_Sav;
  var szNm_URL;
  
  ALERT("Collection Saving begin.", C_iDebug_Dflt);
  
  switch (szDest) {
    case "File": {
         szNm_Sav = Id_InpO_File_File.value;
    } break;
    case "File DDJ": {
         szNm_Sav = Id_InpO_File_DDJ.value;
    } break;
    case "Local": {
         szNm_Sav = Id_InpO_Local.value;
    } break;
    case "Session": {
         szNm_Sav = Id_InpO_Session.value;
    } break;
    case "Clipboard": {
         szNm_Sav = "Clipboard";
    } break;
    case "URL": {
          szNm_URL = Id_InpO_URL.value;
          szNm_Sav = Id_InpO_File_URL.value;
          szNm_Sav = szNm_URL + szNm_Sav; 
    } break;
    default : {
    } break;
  } /* switch */
  G_DDJ.szNm_Sav = szNm_Sav;
 
  $OutData.U_Save(szDest, G_DDJ.szNm_Sav, G_DDJ.JKndTup1, G_DDJ.jPrimKey);

  ALERT("Collection Saving COMPLETED.", C_iDebug_Dflt);  
  $Pers.U_Write_JSON_LocalStorage(true, "G_DDJ", G_DDJ);
} /* U_Sav_Confirm0 */

  return(_OutData);
})(); /* # END - G_DBox_OutData Object */

/* # ---- Object OutData --------------------------------------------------------
*
*/ 
const $OutData = (function(){
  var _OutData = {};
  _OutData.Init             = U_Init;
  _OutData.F_szOLS_Mp_Coll  = F_szOLS_Mp_Coll;        // function F_szOLS_Mp_Coll(P_UsrView0, P_szNm_Sav, P_jPrimKey, P_fAll);
  _OutData.U_Save           = U_Save;                 // function U_Save(P_szDest, P_szNm_Sav, P_JKndTup, P_jPrimKey);
  _OutData.U_SaveChanges    = U_SaveChanges;          // function U_SaveChanges(P_UsrView0, P_szNm_URL, P_szNmColl, P_fAll=true);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_OutData;

/*-----U_SaveChanges --------------------------------------------------------
*
* Update collection's file saving changes.
*/ 
function U_SaveChanges(P_UsrView0, P_szNm_URL, P_szNmColl, P_fAll=true)
{
  var aFld1 = P_UsrView0.aFld1;
/*
* the previous tests are equivalent to the request to save everything.
*/
  G_DDJ.fSvAll = !P_UsrView0.fDistinct;               /* $IMPORTANT: Save All vs. save Distincts. */
  var fBinary = G_DDJ.fKrypt;   
  var szBuff = $OutData.F_szOLS_Mp_Coll(P_UsrView0, P_szNm_URL, P_UsrView0.jaFld1_aNdx, P_fAll);
  
  if (fBinary) {
     $LcdLcd.U_Write("D:/Dbase/BakDbg/" + P_szNmColl, szBuff);  // $LCD $DEBUG
  } /* if */
  if (G_DDJ.fKrypt) {
    szBuff = $DSaft.F_szTxt_Krypt(szBuff);
    $IPCF.U_UpLoad_File(P_szNm_URL, szBuff, fBinary);
  }
  else {     
    $IPCF.U_UpLoad_File(P_szNm_URL, szBuff, fBinary);
  } /* if */
} /* U_SaveChanges */
 
/*-----U_Save --------------------------------------------------------
* Save the selecte Collection in the file specified trying to use the field P_jPrimKey as primary key. 
*/ 
function U_Save(P_szDest, P_szNm_Sav, P_JKndTup, P_jPrimKey)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var fBinary = G_DDJ.fKrypt;
  var szTxt;

  switch (P_JKndTup) {
    case C_JKndTup_OLS: {
       szTxt = F_szOLS_Mp_Coll(UsrView0, P_szNm_Sav, P_jPrimKey, true);
    } break;
    case C_JKndTup_CSV: {
       szTxt = F_szCSV_Mp_Coll(UsrView0);
    } break;
    case C_JKndTup_FLR: {
       szTxt = F_szFLR_Mp_Coll(UsrView0);
    } break;
    case C_JKndTup_XML: {
/*
* $NOTE: XML support should be considered experimental.
* Correct operation is not guaranteed!
*/
       let szJSON = JSON.stringify(UsrView0.XDB0.Coll0);     
       szTxt = json2xml(UsrView0.XDB0.Coll0, "\n");     // goessner.net 
    } break;
    case C_JKndTup_HTML: {
       szTxt = F_szHTML_Mp_Coll(UsrView0, P_szNm_Sav, P_jPrimKey);
    } break;
    case C_JKndTup_TOON: {
       szTxt = encode(UsrView0.XDB0.Coll0);  // $NOTE: foreign/toon.js
    } break;
    default : {
       szTxt = F_szJSON_Mp_Coll(UsrView0, P_JKndTup, P_jPrimKey);
    } break;
  } /* switch */

  if (!szTxt) {
     $Error.U_Warning(C_jCd_Cur, 2, "Collection empty", "");
     return;
  } /* if */
  if (G_DDJ.fKrypt) {
     $LcdLcd.U_Write("D:/Dbase/BakDbg/" + P_szNm_Sav, szTxt);                   // $LCD $DEBUG
     szTxt = $DSaft.F_szTxt_Krypt(szTxt);
  } /* if */  
  switch (P_szDest) {
    case "File": {
         U_Write_File(P_szNm_Sav, szTxt, "text/plain;charset=utf-8;");
    } break;
    case "File DDJ": {
         $LcdLcd.U_Write(P_szNm_Sav, szTxt, fBinary);
    } break;
    case "Local": {
         U_Write_Storage(P_szNm_Sav, szTxt, true, fBinary);
    } break;
    case "Session": {
         U_Write_Storage(P_szNm_Sav, szTxt, false);
    } break;
    case "Clipboard": {
         U_Wr_Clipboard(szTxt, false);
    } break;
    case "URL": {
          $IPCF.U_UpLoad_File(P_szNm_Sav, szTxt, fBinary);
    } break;
    default : {
    } break;
  } /* switch */
} /* U_Save */

/*-----F_szJSON_Mp_Coll --------------------------------------------------------
*
* Return the selected Collection converted in the required schema (P_JKndTup_Dst) trying to use the field P_jPrimKey as primary key.
*/ 
function F_szJSON_Mp_Coll(P_UsrView0, P_JKndTup_Dst, P_jPrimKey)
{
  var XDB0 = P_UsrView0.XDB0;
  var JKndTup_Dst = +P_JKndTup_Dst;
  var JKndTup_Src = XDB0.JKndTup0;
  var fAsc = P_UsrView0.fAsc;
  var Coll0 = XDB0.Coll0; 
  var aFld = P_UsrView0.aFld1; 
  var aNdx = P_UsrView0.F_aNdx();
  var aiPos = P_UsrView0.aiPos;
  var iLen;
  var iLen0 = aNdx.length;
  var iLen_aiPos = aiPos.length;
  var chLft = "";
  var chRgt = "";
     
  P_UsrView0.jPrimKey = P_jPrimKey;
  
  /* Convert the representation. */
  
  if ((C_JKndTup_Obj < JKndTup_Src) && (JKndTup_Src != C_JKndTup_as_)) {
      if (!G_DDJ.fSvAll) {
         Coll0 = F_Coll_Conversion(P_UsrView0, JKndTup_Dst, JKndTup_Src);
      } /* if */
    
      var XDB_Conv = new CL_XDB(["Conv", JKndTup_Dst, Coll0, aFld, XDB0.szNm_aFld, "Converted Collection", C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]);
      var UsrView1 = CL_UsrView0.F_UsrView_Select("Conv", (C_WwFlag_fReadOnly | C_WwFlag_fSearchCS | C_WwFlag_fService));
      
      UsrView1.jaFld1_aNdx = P_jPrimKey;
      UsrView1.U_Upd_aNdx(UsrView1);     /* Recalc Index */
 
      aNdx = UsrView1.F_aNdx();
      iLen = aNdx.length;
      
      if (iLen < iLen0) {
         $Error.U_Message(C_jCd_Cur, 3, "The key selected is not a Primary Key.\nInformation loss risk!\nSuggestion: select a onother key or a safe format (e.g. aRcd).", "");
      } /* if */ 
  } /* if */
  
  /* Create the JSON representation of the Collection inserting the Tuples in the correct order. */

  if (P_UsrView0.fRC) {
      switch (JKndTup_Dst) {
        case C_JKndTup_Arr: {
             /* Save the elements of the Array writing them on different row */
             var szType = P_UsrView0.aFld1[P_UsrView0.aiPos].szType;
             iLen = aNdx.length;
             var szJSON = "[\n";
             for (let i = 0; i < iLen; i++) {
                 var k = (fAsc)? i: iLen -1 -i;
                 var Tup0 = Coll0[aNdx[k]];                 
                 szJSON += `${chLft}${JSON.stringify(Tup0)}${chRgt},\n`;
             } /* for */
             szJSON = szJSON.substr(0, szJSON.length -2); 
             szJSON += "\n]";
        } break;
        case C_JKndTup_Obj: {
             iLen = aNdx.length;
             var szJSON = "{\n";
             for (let i = 0; i < iLen; i++) {
                 var k = (fAsc)? i: iLen -1 -i;
                 var Tup0 = Coll0[aNdx[k]];
                 var szVal = JSON.stringify(Tup0);
                 szJSON += `"${aNdx[k]}":${szVal},\n`;
             } /* for */
             szJSON = szJSON.substr(0, szJSON.length -2); 
             szJSON += "\n}";          
        } break;
        case C_JKndTup_aRcd: {                     
             if (JKndTup_Src > C_JKndTup_Obj) {
                 var szJSON = "[\n";
                 for (var i = 0; i < iLen; i++) {
                     var k = (fAsc)? i: iLen -1 -i;
                     var Tup0 = Coll0[aNdx[k]];
                     szJSON += JSON.stringify(Tup0) + ",\n";
                 } /* for */ 
                 szJSON = szJSON.substr(0, szJSON.length -2); 
                 szJSON += "\n]";             
             }
             else {
                 /* Save the elements of the Array as a column vector. */
                 var szJSON = "[\n";
                 for (var i = 0; i < iLen; i++) {
                     var k = (fAsc)? i: iLen -1 -i;
                     var Tup0 = Coll0[aNdx[k]];
                     szJSON += "[" + JSON.stringify(Tup0) + "],\n";
                 } /* for */ 
                 szJSON = szJSON.substr(0, szJSON.length -2); 
                 szJSON += "\n]";
             } /* if */
        } break;
        case C_JKndTup_aObj: {
             var szJSON = "[\n";
             for (var i = 0; i < iLen; i++) {
                 var k = (fAsc)? i: iLen -1 -i;
                 var Tup0 = Coll0[aNdx[k]];         
                 szJSON += JSON.stringify(Tup0) + ",\n";
             } /* for */ 
             szJSON = szJSON.substr(0, szJSON.length -2); 
             szJSON += "\n]";
        } break;
        case C_JKndTup_asRcd: {
             var szJSON = "{\n";
             for (var i = 0; i < iLen; i++) {
                 var k = (fAsc)? i: iLen -1 -i;         
                 var szKey = aNdx[k]; 
                 var Tup0 = Coll0[szKey];
                 szJSON += '"' + szKey + '":' + JSON.stringify(Tup0) + ",\n";
             } /* for */ 
             szJSON = szJSON.substr(0, szJSON.length -2); 
             szJSON += "\n}";
        } break;
        case C_JKndTup_asObj: {
             var szJSON = "{\n";
             for (i = 0; i < iLen; i++) {
                 var k = (fAsc)? i: iLen -1 -i;
                 var szKey = aNdx[k]; 
                 var Tup0 = Coll0[szKey];
                 szJSON += '"' + szKey + '":' + JSON.stringify(Tup0) + ",\n";
             } /* for */
             szJSON = szJSON.substr(0, szJSON.length -2); 
             szJSON += "\n}";
        } break;
        case C_JKndTup_as_: {
             iLen = aNdx.length;
             var szJSON = "{\n";
             for (let i = 0; i < iLen; i++) {
                 var k = (fAsc)? i: iLen -1 -i;
                 var Tup0 = Coll0[aNdx[k]];
                 var szVal = JSON.stringify(Tup0);
                 szJSON += `"${aNdx[k]}":${szVal},\n`;
             } /* for */
             szJSON = szJSON.substr(0, szJSON.length -2); 
             szJSON += "\n}";          
        } break;
        default : {
        } break;
      } /* switch */  
  }
  else {
      /* Transposed representation. */
      switch (JKndTup_Dst) {
        case C_JKndTup_Arr: {
             /* Save the elements of the Array writing them on different row */
             var szJSON = JSON.stringify(Coll0);
        } break;
        case C_JKndTup_Obj: {          
             var szJSON = JSON.stringify(Coll0);
        } break;
        case C_JKndTup_aRcd: {
             if (JKndTup_Src != C_JKndTup_Arr) {
                 var szJSON = "[\n";
                 for (let j = 0; j < iLen_aiPos; j++) {
                     szJSON += "[";
                     for (var i = 0; i < iLen; i++) {
                         var k = (fAsc)? i: iLen -1 -i;
                         let k1 = aNdx[k];
                         var Val0 = Coll0[k1][j];
                         if (typeof(Val0) == "string") {
                            szJSON += '"' + Val0 + '"';
                         }
                         else {                    
                            szJSON += Val0;
                         } /* if */
                         if (i < iLen -1) {
                            szJSON += ",";
                         } /* if */
                     } /* for */
                     szJSON += "],\n";         
                 } /* for */
                 szJSON = szJSON.substr(0, szJSON.length -2); 
                 szJSON += "\n]";           
             }
             else {
                 /* Save the elements of the Array as a row vector. */
                var szJSON = "[" + JSON.stringify(Coll0) + "]";
             } /* if */
        } break;
        case C_JKndTup_aObj: {
             if (JKndTup_Src == C_JKndTup_Obj) {
                 /* Save the elements of the Object in aObj format. */
                var szJSON = "[" + JSON.stringify(Coll0) + "]";          
             }
             else {
                $Error.U_Error(C_jCd_Cur, 4, "This format doesn't support the Transposed Collection saving.", JKndTup_Dst);
             } /* if */
        } break;
        default : {    
             $Error.U_Error(C_jCd_Cur, 5, "This format doesn't support the Transposed Collection saving.", JKndTup_Dst);
        } break;
      } /* switch */
  } /* if */
  
  CL_UsrView0.F_UsrView_Select(P_UsrView0.szNmColl, (C_WwFlag_fSearchCS | C_WwFlag_fSample));
  return(szJSON);
} /* F_szJSON_Mp_Coll */

/*-----F_Coll_Conversion -------------------------------------------------------
*
* Create a New Collection converting the data of the original one.
*/ 
function F_Coll_Conversion(P_UsrView, P_JKndTup_Dst, P_JKndTup_Src)
{
  var apF = [
    [U_Null,   U_Null,   U_Null,   U_Null],                                     // Null
    [F_aRcd_Mp_aRcd,  F_aRcd_Mp_aObj,  U_Err,            U_Err],                // Arr
    [F_Obj_Mp_aRcd,   U_Err,           F_Obj_Mp_asRcd,   F_Obj_Mp_asObj],       // Obj
    [F_aRcd_Mp_aRcd,  F_aRcd_Mp_aObj,  F_aRcd_Mp_asRcd,  F_aRcd_Mp_asObj],      // aRcd
    [F_aObj_Mp_aRcd,  F_aObj_Mp_aObj,  F_aObj_Mp_asRcd,  F_aObj_Mp_asObj],      // aObj
    [F_asRcd_Mp_aRcd, F_asRcd_Mp_aObj, F_asRcd_Mp_asRcd, F_asRcd_Mp_asObj],     // asRcd
    [F_asObj_Mp_aRcd, F_asObj_Mp_aObj, F_asObj_Mp_asRcd, F_asObj_Mp_asObj]      // asObj
  ];
  var pF = null;
  var Collect_Dst = null;
  
  if (P_UsrView.jPrimKey < 0) {
     P_UsrView.jPrimKey = 0;  /* Set default */
  } /* if */
  switch (P_JKndTup_Dst) {
    case C_JKndTup_Arr: {
         if (P_UsrView.aiPos.length != 1) {
            $Error.U_Error(C_jCd_Cur, 6, "The selected format only supports saving of single columns.", P_UsrView.aiPos.length);
         } /* if */
    } break;
    case C_JKndTup_Obj: {
    } break;
    case C_JKndTup_as_: {
         P_JKndTup_Dst = C_JKndTup_Obj;
    } break;
    default : {
    } break;
  } /* switch */
   
  pF = apF[P_JKndTup_Dst][P_JKndTup_Src - C_JKndTup_aRcd];
  //debugger;
  Collect_Dst = pF(P_UsrView); 
   
  return(Collect_Dst);    
} /* F_Coll_Conversion */

/*-----U_Err --------------------------------------------------------
*
*/ 
function U_Err()
{
  $Error.U_Error(C_jCd_Cur, 7, "Src and Dst formats are not compatible!", 0);
} /* U_Err */

/*-----U_Null --------------------------------------------------------
*
*/ 
function U_Null()
{
} /* U_Null */

/*-----F_Obj_Mp_aRcd --------------------------------------------------------
*
*/ 
function F_Obj_Mp_aRcd(P_UsrView)
{
  debugger;
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var asRcd_Src = XDB0.Coll0;
  var iCard_aiPos = aiPos.length;
  var iCard_aNdx = aNdx.length;
  var aObj_Dst = {};
  var aszKey = [];
  var Tmp0;
    
  var jKey_Dst  = 0;                     /* $ASSUME: Primary Key = 0 */
  var szKey_Dst = aFld1[jKey_Dst].szNm;  /* Field used as primary key */
    
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */
  
  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];   
      var RcdRow = asRcd_Src[szKey_Src];
      szKey_Src = RcdRow[0];
      aObj_Dst[szKey_Src] = RcdRow[1];
   } /* for */
  return(aObj_Dst);
} /* F_Obj_Mp_aRcd */

/*-----F_Obj_Mp_asRcd --------------------------------------------------------
*
* $NOTA codice da ripulire!!!!
*/ 
function F_Obj_Mp_asRcd(P_UsrView)
{ 
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var asRcd_Src = XDB0.Coll0;
  var iCard_aiPos = aiPos.length;
  var iCard_aNdx = aNdx.length;
  var aObj_Dst = {};
  var aszKey = [];
  var Tmp0;
    
  var jKey_Dst  = 0;                     /* $ASSUME: Primary Key = 0 */
  var szKey_Dst = aFld1[jKey_Dst].szNm;  /* Field used as primary key */
    
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */
  
  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];   
      var RcdRow = asRcd_Src[szKey_Src];
      var ObjTup = {};

      ObjTup[szKey_Dst] = szKey_Src;
      for (let i = 1; i < iCard_aiPos; i++) {
          var szFld = aszKey[i];
          var i1 = aiPos[i];
          Tmp0 = RcdRow[i1 -1];
      } /* for */
      aObj_Dst[szKey_Src] = Tmp0;
   } /* for */
  return(aObj_Dst);
} /* F_Obj_Mp_asRcd */

/*-----F_Obj_Mp_asObj --------------------------------------------------------
*
* $NOTA codice da ripulire!!!!
*/ 
function F_Obj_Mp_asObj(P_UsrView)
{ 
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var asObj_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var asObj_Dst = {};
  var ObjTup = {};
  var szFld;
  var ObjRow;
  var jKey_Dst  = P_UsrView.jPrimKey;    /* Primary Key */
  var szKey_Dst = aFld1[jKey_Dst].szNm;  /* Field used as primary key */
  var aszKey = [];
  var Tmp0;
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */

  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];
      ObjRow = asObj_Src[szKey_Src];
      ObjTup = {};
      for (var i = 0; i < iCard_aiPos; i++) {
           var szKey0 = aszKey[i];
           if (szKey0 != szKey_Dst) {
              Tmp0 = ObjRow[szKey0];           
           } /* if */
      } /* for */
      asObj_Dst[szKey_Src] = Tmp0;
   } /* for */
   return(asObj_Dst);
} /* F_Obj_Mp_asObj */

/*-----F_aRcd_Mp_aRcd --------------------------------------------------------
*
*/ 
function F_aRcd_Mp_aRcd(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var aRcd_Src = XDB0.Coll0;
  var iCard_aNdx  = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var aRcd_Dst = [];
  var RcdTup = [];
  var szFld;
  var RcdRow;
  
  for (var j = 0; j < iCard_aNdx; j++) {
      var k = aNdx[j];
      RcdRow = aRcd_Src[k];
      RcdTup = [];
      for (var i = 0; i < iCard_aiPos; i++) {
           var i1 = aiPos[i];
           RcdTup[i] = RcdRow[i1];
      } /* for */
      aRcd_Dst[j] = RcdTup;
   } /* for */
   
   return(aRcd_Dst);
} /* F_aRcd_Mp_aRcd */

/*-----F_aObj_Mp_aObj --------------------------------------------------------
*
*/ 
function F_aObj_Mp_aObj(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var aObj_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var aObj_Dst = [];
  var ObjTup = {};
  var szFld;
  var ObjRow;
  var jKey_Dst  = P_UsrView.jPrimKey;    /* Primary Key */
  var szKey_Dst = aFld1[jKey_Dst].szNm;  /* Field used as primary key */
  var aszKey = [];
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */
  
  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Dst = aNdx[j];
      ObjRow = aObj_Src[szKey_Dst];
      ObjTup = {};
      for (var i = 0; i < iCard_aiPos; i++) {
           var szKey0 = aszKey[i];
           if (szKey0 != szKey_Dst) {
              ObjTup[szKey0] = ObjRow[szKey0];           
           } /* if */
      } /* for */
      aObj_Dst[j] = ObjTup;
   } /* for */
   return(aObj_Dst);
} /* F_aObj_Mp_aObj */

/*-----F_asRcd_Mp_asRcd --------------------------------------------------------
*
*/ 
function F_asRcd_Mp_asRcd(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var asRcd_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var asRcd_Dst = {};
  var RcdRow;
  var RcdTup = [];
  var szFld;
  var jKey_Dst = 0;    /* $ASSUME: Primary Key = 0 */
 
  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];
      let i0 = 0;
      RcdRow = asRcd_Src[szKey_Src];
      RcdTup = [];

      for (var i = 1; i < iCard_aiPos; i++) {
           var i1 = aiPos[i];
           if (i1 != jKey_Dst) {
              i1 = i1 -1;
              RcdTup[i0++] = RcdRow[i1];
           } /* if */
      } /* for */
      asRcd_Dst[szKey_Src] = RcdTup;
   } /* for */
   return(asRcd_Dst); 
} /* F_asRcd_Mp_asRcd */

/*-----F_asObj_Mp_asObj --------------------------------------------------------
*
*/ 
function F_asObj_Mp_asObj(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var asObj_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var asObj_Dst = {};
  var ObjTup = {};
  var szFld;
  var ObjRow;
  var jKey_Dst  = P_UsrView.jPrimKey;    /* Primary Key */
  var szKey_Dst = aFld1[jKey_Dst].szNm;  /* Field used as primary key */
  var aszKey = [];
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */

  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];
      ObjRow = asObj_Src[szKey_Src];
      ObjTup = {};
      for (var i = 0; i < iCard_aiPos; i++) {
           var szKey0 = aszKey[i];
           if (szKey0 != szKey_Dst) {
              ObjTup[szKey0] = ObjRow[szKey0];           
           } /* if */
      } /* for */
      asObj_Dst[szKey_Src] = ObjTup;
   } /* for */
   return(asObj_Dst);
} /* F_asObj_Mp_asObj */

/*-----F_aObj_Mp_aRcd --------------------------------------------------------
*  ++
*/ 
function F_aObj_Mp_aRcd(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var aObj_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var aObj_Dst = [];
  var ObjTup = {};
  var szFld;
  var RcdRow;

  for (var j = 0; j < iCard_aNdx; j++) {
      var k = aNdx[j];
      RcdRow = aObj_Src[k];
      ObjTup = {};
      for (var i = 0; i < iCard_aiPos; i++) {
           var i1 = aiPos[i];
           szFld = aFld1[i1].szNm;
           ObjTup[szFld] = RcdRow[i1];
      } /* for */
      aObj_Dst[j] = ObjTup;
   } /* for */
   return(aObj_Dst);
} /* F_aObj_Mp_aRcd */

/*-----F_asRcd_Mp_aRcd --------------------------------------------------------
* ++
*/ 
function F_asRcd_Mp_aRcd(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var aRcd_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length; 
  var asRcd_Dst = {};
  var RcdTup = [];
  var szFld;
  var RcdRow;
  var jKey_Dst = P_UsrView.jPrimKey;       /* Primary Key */
  var szKey_Dst;

  for (var j = 0; j < iCard_aNdx; j++) { 
      var k = aNdx[j];
      RcdRow = aRcd_Src[k];
      RcdTup = [];
      let i0 = 0;
      szKey_Dst = RcdRow[jKey_Dst];
      for (var i = 0; i < iCard_aiPos; i++) {
          var i1 = aiPos[i];         
          if (i1 != jKey_Dst) {
             RcdTup[i0++] = RcdRow[i1];             
          } /* if */
      } /* for */
      asRcd_Dst[szKey_Dst] = RcdTup;
   } /* for */
   return(asRcd_Dst);
} /* F_asRcd_Mp_aRcd */

/*-----F_asObj_Mp_aRcd --------------------------------------------------------
* ++
*/ 
function F_asObj_Mp_aRcd(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var aRcd_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length; 
  var asObj_Dst = {};
  var aObj0 = {};
  var szFld;
  var RcdRow;
  var jKey_Dst = P_UsrView.jPrimKey;  /* Primary Key */
  var szKey_Dst;
  var ObjTup;

  for (var j = 0; j < iCard_aNdx; j++) { 
      var k = aNdx[j];
      RcdRow = aRcd_Src[k];
      ObjTup = {};
      szKey_Dst = RcdRow[jKey_Dst];
      for (var i = 0; i < iCard_aiPos; i++) {    // 10/07/2025
          var i1 = aiPos[i];         
          if (i1 != jKey_Dst) {
              szFld = aFld1[i1].szNm;
              ObjTup[szFld] = RcdRow[i1];                             
          } /* if */
      } /* for */
      asObj_Dst[szKey_Dst] = ObjTup;
   } /* for */
   return(asObj_Dst);
} /* F_asObj_Mp_aRcd */

/*-----F_aRcd_Mp_aObj --------------------------------------------------------
*  ++
*/ 
function F_aRcd_Mp_aObj(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1; 
  var aiPos = P_UsrView.aiPos;
  var aObj_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var aRcd_Dst = [];
  var RcdTup = [];
  var aszKey = [];
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      aszKey[i] = aFld1[i1].szNm;
  } /* for */
 
  for (var j = 0; j < iCard_aNdx; j++) { 
      var k = aNdx[j];
      var ObjRow = aObj_Src[k];
      RcdTup = [];
      for (var i = 0; i < iCard_aiPos; i++) {
          var szNm = aszKey[i]; 
          RcdTup[i] = ObjRow[szNm];   
      } /* for */
      aRcd_Dst[j] = RcdTup;
   } /* for */
   return(aRcd_Dst);
} /* F_aRcd_Mp_aObj */

/*-----F_aRcd_Mp_asRcd --------------------------------------------------------
*  ++
*/ 
function F_aRcd_Mp_asRcd(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var asRcd_Src  = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var aRcd_Dst = [];
  var RcdTup = [];
  var szKey_Src;

  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];
      var RcdRow = asRcd_Src[szKey_Src];
      RcdTup = [];
      RcdTup[0] = szKey_Src;
      for (var i = 1; i < iCard_aiPos; i++) {
          let i1 = aiPos[i];
          RcdTup[i] = RcdRow[i1 -1];
      } /* for */
      aRcd_Dst[j] = RcdTup;
  } /* for */
  return(aRcd_Dst);
} /* F_aRcd_Mp_asRcd */

/*-----F_aRcd_Mp_asObj --------------------------------------------------------
* ++
*/ 
function F_aRcd_Mp_asObj(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var asObj_Src  = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var aRcd_Dst = [];
  var RcdTup = [];
  var aszKey = [];
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      aszKey[i] = aFld1[i1].szNm;
  } /* for */

  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];     
      var ObjRow = asObj_Src[szKey_Src];
      i = 0;
      RcdTup = [];
      RcdTup[i++] = szKey_Src;
      for (let i = 1; i < iCard_aiPos; i++) {
          var szNm = aszKey[i]; 
          RcdTup[i] = ObjRow[szNm];   
      } /* for */
      aRcd_Dst[j] = RcdTup;
   } /* for */
  return(aRcd_Dst);
} /* F_aRcd_Mp_asObj */

/*-----F_asObj_Mp_aObj --------------------------------------------------------
*  ++
*/ 
function F_asObj_Mp_aObj(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var aObj_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var asObj_Dst = {};
  var jKey_Dst = P_UsrView.jPrimKey;     /* Primary Key */
  var Key_Fld  = aFld1[jKey_Dst].szNm;   /* Field used as primary key */
  var aszKey = [];
  var j = 0;
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      if (szNm != Key_Fld) {
         aszKey[j++] = szNm;
      } /* if */
  } /* for */
     
  for (var j = 0; j < iCard_aNdx; j++) { 
      var k = aNdx[j];
      var ObjRow = aObj_Src[k];
      var ObjTup = {};
      var szKey_Dst = ObjRow[Key_Fld];
      for (let i = 0; i < iCard_aiPos -1; i++) {
           var szKeyTup = aszKey[i];
           ObjTup[szKeyTup] = ObjRow[szKeyTup]; 
      } /* for */
      asObj_Dst[szKey_Dst] = ObjTup;
   } /* for */
  return(asObj_Dst);
} /* F_asObj_Mp_aObj */

/*-----F_asRcd_Mp_aObj --------------------------------------------------------
* ++
*/ 
function F_asRcd_Mp_aObj(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var aObj_Src = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var asRcd_Dst = {};
  var jKey_Dst = P_UsrView.jPrimKey;    /* Primary Key */
  var Key_Fld  = aFld1[jKey_Dst].szNm;  /* Field used as primary key */
  var aszKey = [];
  var j = 0;
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      if (szNm != Key_Fld) {
         aszKey[j++] = szNm;
      } /* if */
  } /* for */
     
  for (var j = 0; j < iCard_aNdx; j++) { 
      var k = aNdx[j];
      var ObjRow = aObj_Src[k];
      var RcdTup = [];
      var i0 = 0;
      var szKey_Dst = ObjRow[Key_Fld];
      for (let i = 0; i < iCard_aiPos -1; i++) {
          var szKeyTup = aszKey[i];
          RcdTup[i0++] = ObjRow[szKeyTup];
      } /* for */
      asRcd_Dst[szKey_Dst] = RcdTup;
   } /* for */
  return(asRcd_Dst);
} /* F_asRcd_Mp_aObj */

/*-----F_aObj_Mp_asRcd --------------------------------------------------------
* ++
*/ 
function F_aObj_Mp_asRcd(P_UsrView)
{ 
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var asRcd_Src = XDB0.Coll0;
  var iCard_aiPos = aiPos.length;
  var iCard_aNdx = aNdx.length;
  var aObj_Dst = [];
  var aszKey = [];
    
  var jKey_Dst  = 0;                     /* $ASSUME: Primary Key = 0 */
  var szKey_Dst = aFld1[jKey_Dst].szNm;  /* Field used as primary key */
    
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */
  
  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];   
      var RcdRow = asRcd_Src[szKey_Src];
      var ObjTup = {};

      ObjTup[szKey_Dst] = szKey_Src;
      for (let i = 1; i < iCard_aiPos; i++) {
          var szFld = aszKey[i];
          var i1 = aiPos[i];
          ObjTup[szFld] = RcdRow[i1];
      } /* for */
      aObj_Dst[j] = ObjTup;
   } /* for */
  return(aObj_Dst);
} /* F_aObj_Mp_asRcd */

/*-----F_asObj_Mp_asRcd --------------------------------------------------------
* ++
*/ 
function F_asObj_Mp_asRcd(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var asRcd_Src = XDB0.Coll0;
  var iCard_aiPos = aiPos.length;
  var iCard_aNdx = aNdx.length;
  var asObj_Dst = {};
  var aszKey = [];
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */
    
  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey0 = aNdx[j];   
      var RcdRow = asRcd_Src[szKey0];
      var ObjTup = {};

      for (var i = 0; i < iCard_aiPos -1; i++) {
          var szFld = aszKey[i +1];
          var i1 = aiPos[i +1];
          ObjTup[szFld] = RcdRow[i1 -1];
      } /* for */
      asObj_Dst[szKey0] = ObjTup;
   } /* for */
  return(asObj_Dst);
} /* F_asObj_Mp_asRcd */

/*-----F_aObj_Mp_asObj --------------------------------------------------------
* ++
*/ 
function F_aObj_Mp_asObj(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var asObj_Src  = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var aObj_Dst = [];
  var ObjTup = [];
  var jKey_Dst  = P_UsrView.jPrimKey;    /* Primary Key */
  var szKey_Dst = aFld1[jKey_Dst].szNm;  /* Field used as primary key */
  var aszKey = [];
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */
    
  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey_Src = aNdx[j];     
      var aObjRow = asObj_Src[szKey_Src];
      ObjTup = {};
      aObjRow[szKey_Dst] = szKey_Src;

      for (var i = 0; i < iCard_aiPos; i++) {
           var szFld = aszKey[i]; 
           ObjTup[szFld] = aObjRow[szFld]; 
      } /* for */
      aObj_Dst[j] = ObjTup;
   } /* for */
  return(aObj_Dst);
} /* F_aObj_Mp_asObj */

/*-----F_asRcd_Mp_asObj --------------------------------------------------------
*
*/ 
function F_asRcd_Mp_asObj(P_UsrView)
{
  var XDB0 = P_UsrView.XDB0;
  var aNdx = P_UsrView.F_aNdx();
  var aFld1 = P_UsrView.aFld1;
  var aiPos = P_UsrView.aiPos;
  var asObj_Src  = XDB0.Coll0;
  var iCard_aNdx = aNdx.length;
  var iCard_aiPos = aiPos.length;
  var asRcd_Dst = [];
  var RcdTup = [];
  var aszKey = [];
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */
    
  for (var j = 0; j < iCard_aNdx; j++) {
      var szKey0 = aNdx[j];     
      var ObjRow = asObj_Src[szKey0];
      RcdTup = [];      
      for (var i = 0; i < iCard_aiPos -1; i++) {
          var szFld = aszKey[i +1];
          RcdTup[i] = ObjRow[szFld];
      } /* for */
      
      asRcd_Dst[szKey0] = RcdTup;
   } /* for */
  return(asRcd_Dst);
} /* F_asRcd_Mp_asObj */

/*-----U_Write_File --------------------------------------------------------
*
*/ 
function U_Write_File(P_szFlNm, P_szTxt, P_szType)
{
    var Data0 = new Blob([P_szTxt], {type: P_szType});       /* https://stackoverflow.com/questions/38508064/url-createobjecturl-and-charset-utf-8 */
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(Data0, P_szFlNm);
    else {
        var Elem0 = document.createElement("a"),
        Url0 = URL.createObjectURL(Data0);
        Elem0.href = Url0;
        Elem0.download = P_szFlNm;
        document.body.appendChild(Elem0);
        Elem0.click();
        setTimeout(function() {
            document.body.removeChild(Elem0);
            window.URL.revokeObjectURL(Url0);  
        }, 0); 
    }  /* if */
} /* U_Write_File */

/*-----U_Write_Storage --------------------------------------------------------
*
*/ 
function U_Write_Storage(P_szFlNm, P_szTxt, P_fLocal)
{
  if (P_fLocal) {
     // localStorage.setItem(P_szFlNm, P_szTxt);
     $IPCF.U_Set_Reg(P_szFlNm, P_szTxt);
  }
  else {;
     sessionStorage.setItem(P_szFlNm, P_szTxt);
  } /* if */
} /* U_Write_Storage */

/*-----F_szCSV_Mp_Coll --------------------------------------------------------
*
*/ 
function F_szCSV_Mp_Coll(P_UsrView0)
{
  var aRcd = P_UsrView0.XDB0.Coll0;
  var aFld = P_UsrView0.aFld1;
  var JKndTup0 = P_UsrView0.XDB0.JKndTup0;
  var Rcd0, Val0, Key, Key2;
  var iLen;
  var szTmp;
  var szTxt = "";
  var i, j; 

  switch (JKndTup0) {
    case C_JKndTup_Arr: {
          for (i = 0; i < aRcd.length; i++) {
              Rcd0 = aRcd[i];  
              for (j = 0; j < aFld.length; j++) {
                  iLen = aFld[0].iLen
                  Val0 = Rcd0;
                  switch (aFld[j].szType) {
                    case "string": {
                          szTmp = '"' + Val0 + '"'; 
                    } break;
                    case "number": {
                          szTmp = "" + Val0;
                    } break;            
                    case "boolean": {
                          szTmp = (Val0)? true: false;
                    } break;            
                    case "date": {
                          szTmp = '"' + Val0 + '"';
                    } break;
                    default : {
                          szTmp = '"' + Val0 + '"';
                    } break;
                  } /* switch */
                  szTxt += "" + szTmp + ", ";
              } /* for */
              szTxt += "\n";
          } /* for */
    } break;
    case C_JKndTup_Obj: {
              Rcd0 = aRcd;
              for (j = 0; j < aFld.length; j++) {
                  Key = aFld[j].szNm;
                  Val0 = Rcd0[Key];
                  switch (aFld[j].szType) {
                    case "string": {
                          szTmp = '"' + Val0 + '"'; 
                    } break;
                    case "number": {
                          szTmp = "" + Val0;
                    } break;            
                    case "boolean": {
                          szTmp = (Val0)? true: false;
                    } break;            
                    case "date": {
                          szTmp = '"' + Val0 + '"';
                    } break;
                    default : {
                          szTmp = '"' + Val0 + '"';
                    } break;
                  } /* switch */
                  szTxt += "" + szTmp + ", ";
              } /* for */
    } break;
    case C_JKndTup_aRcd: {
          for (i = 0; i < aRcd.length; i++) {
              Rcd0 = aRcd[i];  
              for (j = 0; j < aFld.length; j++) {
                  iLen = aFld[j].iLen;
                  Val0 = Rcd0[j];
                  switch (aFld[j].szType) {
                    case "string": {
                          szTmp = '"' + Val0 + '"'; 
                    } break;
                    case "number": {
                          szTmp = "" + Val0;
                    } break;            
                    case "boolean": {
                          szTmp = (Val0)? true: false;
                    } break;            
                    case "date": {
                          szTmp = '"' + Val0 + '"';
                    } break;
                    default : {
                          szTmp = '"' + Val0 + '"';
                    } break;
                  } /* switch */
                  szTxt += "" + szTmp + ", ";
              } /* for */
              szTxt += "\n";
          } /* for */
    } break;
    case C_JKndTup_aObj: {
          for (i = 0; i < aRcd.length; i++) {
              Rcd0 = aRcd[i];  
              for (j = 0; j < aFld.length; j++) {
                  Key = aFld[j].szNm;
                  Val0 = Rcd0[Key];
                  switch (aFld[j].szType) {
                    case "string": {
                          szTmp = '"' + Val0 + '"'; 
                    } break;
                    case "number": {
                          szTmp = "" + Val0;
                    } break;            
                    case "boolean": {
                          szTmp = (Val0)? true: false;
                    } break;            
                    case "date": {
                          szTmp = '"' + Val0 + '"';
                    } break;
                    default : {
                          szTmp = '"' + Val0 + '"';
                    } break;
                  } /* switch */
                  szTxt += "" + szTmp + ", ";
              } /* for */
              szTxt += "\n";
          } /* for */
    } break;
    case C_JKndTup_asRcd: {
          for (Key in aRcd) {
              Rcd0 = aRcd[Key];
              szTxt += '"' + Key + '", ';
  
              for (j = 1; j < aFld.length; j++) {
                  iLen = aFld[j].iLen;
                  Val0 = Rcd0[j];
                  switch (aFld[j].szType) {
                    case "string": {
                          szTmp = '"' + Val0 + '"'; 
                    } break;
                    case "number": {
                          szTmp = "" + Val0;
                    } break;            
                    case "boolean": {
                          szTmp = (Val0)? true: false;
                    } break;            
                    case "date": {
                          szTmp = '"' + Val0 + '"';
                    } break;
                    default : {
                          szTmp = '"' + Val0 + '"';
                    } break;
                  } /* switch */
                  szTxt += "" + szTmp + ", ";
              } /* for */
              szTxt += "\n";
          } /* for */
    } break;
    case C_JKndTup_asObj: {
          for (Key in aRcd) {
              Rcd0 = aRcd[Key];
              szTxt += '"' + Key + '", ';   
 
              for (j = 1; j < aFld.length; j++) {
                  Key2 = aFld[j].szNm;
                  Val0 = Rcd0[Key2];
                  switch (aFld[j].szType) {
                    case "string": {
                          szTmp = '"' + Val0 + '"'; 
                    } break;
                    case "number": {
                          szTmp = "" + Val0;
                    } break;            
                    case "boolean": {
                          szTmp = (Val0)? true: false;
                    } break;            
                    case "date": {
                          szTmp = '"' + Val0 + '"';
                    } break;
                    default : {
                          szTmp = '"' + Val0 + '"';
                    } break;
                  } /* switch */
                  szTxt += "" + szTmp + ", ";
              } /* for */

              szTxt += "\n";
          } /* for */
    } break;
    default : {
    } break;
  } /* switch */

  return(szTxt);
} /* F_szCSV_Mp_Coll */

/*-----F_szFLR_Mp_Coll --------------------------------------------------------
*
*/ 
function F_szFLR_Mp_Coll(P_UsrView0)
{
  var aRcd = P_UsrView0.XDB0.Coll0;
  var aFld = P_UsrView0.aFld1;
  var JKndTup0 = P_UsrView0.XDB0.JKndTup0;
  var Rcd0, Val0, Key, Key2, Fld0;
  var iLen;
  var szTmp;
  var szTxt = "";
  var i, j;

  var aFld1 = P_UsrView0.aFld1;
  var aiPos = P_UsrView0.aiPos;
  var iCard_aiPos = aiPos.length;
  var aszKey = [];
  
  for (var i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm = aFld1[i1].szNm;
      aszKey[i] = szNm;
  } /* for */

  for (j = 0; j < aFld.length; j++) {
      iLen = aFld[j].iLen; 
      szTxt += F_szPadRgt(aFld[j].szNm, " ", iLen);
  } /* for */
  szTxt += "\n";

  switch (JKndTup0) {
    case C_JKndTup_Arr: {
          for (i = 0; i < aRcd.length; i++) {
              Rcd0 = aRcd[i];  
              for (j = 0; j < aFld.length; j++) {
                  Fld0 = aFld[0]; 
                  iLen = Fld0.iLen -1;
                  Val0 = Rcd0;
                    switch (Fld0.szType) {
                      case "string": {
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                      case "number": {
                            szTmp = F_szPadLft(Val0, " ", iLen);
                      } break;            
                      case "boolean": {
                            szTmp = F_szPadRgt(!!(Val0), " ", iLen);
                      } break;            
                      case "date": {
                            szTmp = F_DateConv(Val0);
                            szTmp = F_szPadLft(szTmp, " ", iLen);
                      } break;
                      default : {           
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                    } /* switch */
                  szTxt += "" + szTmp + " ";
              } /* for */
              szTxt += "\n";
          } /* for */
    } break;
    case C_JKndTup_Obj: {
         $Error.U_Error(C_jCd_Cur, 8, "Sorry is not possible to save Objects FLR format.", "");
    } break;
    case C_JKndTup_aRcd: {
           for (i = 0; i < aRcd.length; i++) {
                Rcd0 = aRcd[i];  
                for (j = 0; j < aiPos.length; j++) {                    
                    var i1 = j;
                    Fld0 = aFld[i1]; 
                    iLen = Fld0.iLen -1;  /* "iLen -1;" because will be added a balck as fields separator. */
                    Val0 = Rcd0[i1];
                    switch (Fld0.szType) {
                      case "string": {
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                      case "number": {
                            szTmp = F_szPadLft(Val0, " ", iLen);
                      } break;            
                      case "boolean": {
                            szTmp = F_szPadRgt(!!(Val0), " ", iLen);
                      } break;            
                      case "date": {
                            szTmp = F_DateConv(Val0);
                            szTmp = F_szPadLft(szTmp, " ", iLen);
                      } break;
                      default : {           
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                    } /* switch */
                    szTxt += "" + szTmp + " ";
                } /* for */
                szTxt += "\n";
            } /* for */
    } break;
    case C_JKndTup_aObj: {
           for (i = 0; i < aRcd.length; i++) {
                Rcd0 = aRcd[i];  
                for (j = 0; j < aFld.length; j++) {
                  Fld0 = aFld[j]; 
                  Key = Fld0.szNm;
                  iLen = Fld0.iLen -1;
                  Val0 = Rcd0[Key];
                    switch (Fld0.szType) {
                      case "string": {
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                      case "number": {
                            szTmp = F_szPadLft(Val0, " ", iLen);
                      } break;            
                      case "boolean": {
                            szTmp = F_szPadRgt(!!(Val0), " ", iLen);
                      } break;            
                      case "date": {
                            szTmp = F_DateConv(Val0);
                            szTmp = F_szPadLft(szTmp, " ", iLen);
                      } break;
                      default : {           
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                    } /* switch */
                    szTxt += "" + szTmp + " ";
                } /* for */
                szTxt += "\n";
            } /* for */
    } break;
    case C_JKndTup_asRcd: {
          for (Key in aRcd) {
              Rcd0 = aRcd[Key];
              iLen = aFld[0].iLen -1;
              szTxt += F_szPadRgt(Key, " ", iLen) + " ";
              for (j = 1; j < aFld.length; j++) {
                  Fld0 = aFld[j]; 
                  iLen = Fld0.iLen;
                  Val0 = Rcd0[j -C_iDelta_asRcd];
                    switch (Fld0.szType) {
                      case "string": {
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                      case "number": {
                            szTmp = F_szPadLft(Val0, " ", iLen);
                      } break;            
                      case "boolean": {
                            szTmp = F_szPadRgt(!!(Val0), " ", iLen);
                      } break;            
                      case "date": {
                            szTmp = F_DateConv(Val0);
                            szTmp = F_szPadLft(szTmp, " ", iLen);
                      } break;
                      default : {           
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                    } /* switch */
                  szTxt += "" + szTmp + " ";
              } /* for */
              szTxt += "\n";
          } /* for */
    } break;
    case C_JKndTup_asObj: {
          for (Key in aRcd) {
              Rcd0 = aRcd[Key];  
              iLen = aFld[0].iLen;
              szTxt += F_szPadRgt(Key, " ", iLen) + " ";
              for (j = 1; j < aFld.length; j++) {
                  Fld0 = aFld[j]; 
                  Key2 = Fld0.szNm;
                  iLen = Fld0.iLen -1;
                  Val0 = Rcd0[Key2];
                    switch (Fld0.szType) {
                      case "string": {
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                      case "number": {
                            szTmp = F_szPadLft(Val0, " ", iLen);
                      } break;            
                      case "boolean": {
                            szTmp = F_szPadRgt(!!(Val0), " ", iLen);
                      } break;            
                      case "date": {
                            szTmp = F_DateConv(Val0);
                            szTmp = F_szPadLft(szTmp, " ", iLen);
                      } break;
                      default : {           
                            szTmp = F_szPadRgt(Val0, " ", iLen);
                      } break;
                    } /* switch */
                  szTxt += "" + szTmp + " ";
              } /* for */

              szTxt += "\n";
          } /* for */
    } break;
    default : {
    } break;
  } /* switch */

  return(szTxt);
} /* F_szFLR_Mp_Coll */

/*-----F_szOLS_Mp_Coll --------------------------------------------------------
*
* Return the string corresponding to OLS representation of the given Collection (P_UsrView0).
*/ 
function F_szOLS_Mp_Coll(P_UsrView0, P_szNm_Sav, P_jPrimKey, P_fAll=true)
{
  var UsrView0 = P_UsrView0;
  var szNmColl_Prv = UsrView0.szNmColl;
  var XDB0     = UsrView0.XDB0;
  var JKndTup1 = XDB0.JKndTup0;
  var szJSON1  = F_szJSON_Mp_Coll(UsrView0, JKndTup1, P_jPrimKey);
  var szNmOut  = P_szNm_Sav;
  var szAutoExec = "";
  var aFld1 = UsrView0.aFld1;   /* Layout of the User View. */
  var aFld2 = [];               /* List of fields that will be saved. */
  var szTxt;
  var szRem = "";
  var iLen;
  var j = 0;
  
  aFld1 = F_Obj_Clone(aFld1);   /* Clone aFld1 */
  
  if (P_fAll) {                 /* Update Layout. */
      for (let i = 0; i < aFld1.length; i++) {
          if (aFld1[i].fVisible) {
             aFld2[j] = aFld1[i];
             aFld2[j].iPos0 = aFld2[j].iPos1;
             j++;
          } /* if */
      } /* for */  
  }
  else {
      aFld2 = aFld1;            /* Preserve Layout. */
  } /* if */

  new CL_XDB(["aFld_Tmp", C_JKndTup_aObj, aFld2, null, "aFld_aFld1", "Tmp", (C_WwFlag_fService | C_WwFlag_fOverWrite), C_jCd_Cur, C_Bag_UsrView_Dflt]);   
  var UsrView1 = CL_UsrView0.F_UsrView_Select("aFld_Tmp", (C_WwFlag_fReadOnly | C_WwFlag_fSearchCS | C_WwFlag_fSample));

  var szJSON2 = F_szJSON_Mp_Coll(UsrView1, C_JKndTup_aObj, -1);
  var iPos = szNmOut.lastIndexOf("/");
  if (iPos < 0) {
     var iPos2 = szNmOut.indexOf(".");
     if (0 < iPos2) {
        szNmOut = szNmOut.substr(0, iPos2);
     } /* if */
  }
  else {
     szNmOut = szNmOut.substring((iPos +1), szNmOut.lastIndexOf("."));
  } /* if */
  
  var szNmColl = szNmOut;
  var szNm_aFld = "aFld_" + szNmOut;
  if (XDB0.szNm_aFld == "aFld_Apps") {
     szNm_aFld = "aFld_Apps";           // $LCD - Preserve standard name szNm_aFld = "aFld_Apps"
  } /* if */

  var szNote = P_UsrView0.szNote;
  var szPre = "";
  var szPost = "";
  var szCfg = "_CfgUV_";
  if ((szNote == "DownLoaded") || (szNote == "Function")) {
     szNote = "";
  } /* if */

  var szJSON3 = JSON.stringify(UsrView0.CfgUV0);
  var szJSON4 = szJSON3.replaceAll(',"', ',\n"');
  if (XDB0.OLS_Ld) {
     szAutoExec = `,\n\n"autoexec":"${XDB0.OLS_Ld["autoexec"]}"`;
     szRem = XDB0.OLS_Ld["_Hdr0_"]["szRem"];
  } /* if */
  szTxt = `{
"_Hdr0_":{"iRel":1.0, "szAutoExec":"autoexec", "szRem":"${szRem}"},
"_aaFld_":[["${szNm_aFld}", 4]],
"_aColl_":[["${szNmColl}", ${XDB0.JKndTup0}, "${szNm_aFld}", "${szNote}", "${szPre}", "${szPost}", "${szCfg}"]],\n
"${szNm_aFld}":${szJSON2},\n
"${szNmColl}":${szJSON1},\n
"${szCfg}":${szJSON4}${szAutoExec}
}`;
  
  CL_UsrView0.F_UsrView_Select(szNmColl_Prv, (C_WwFlag_fSearchCS | C_WwFlag_fSample));
  return(szTxt);
} /* F_szOLS_Mp_Coll */

/*-----F_szHTML_Mp_Coll --------------------------------------------------------
*
* Insert the selected content of the Collection in a HTML file.
*/ 
function F_szHTML_Mp_Coll(P_UsrView0, P_szNm_Sav, P_jPrimKey)
{
   var szTxt = $PrnHTML.F_szHTML_Mp_Coll(P_UsrView0, P_szNm_Sav, P_jPrimKey, false, "error")
//  var szTxt = $PrnHTML.F_szHTML_Mp_Coll(P_UsrView0, P_szNm_Sav, P_jPrimKey, true, "Slides")
//  var szTxt = $PrnHTML.F_szHTML_Mp_Coll(P_UsrView0, "Intelligenza Artificiosa", P_jPrimKey, true, "Blu")
  return(szTxt);
} /* F_szHTML_Mp_Coll */

/*-----U_Init --------------------------------------------------------
*
*/ 
function U_Init()
{
  U_Root0("$OutData");
} /* U_Init */

  return(_OutData);
})(); /* # END - Object OutData */

