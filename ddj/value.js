/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : value.js
* Function    : Data's value Editing
* FirstEdit   : 05/09/2022
* LastEdit    : 28/12/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Card Editing.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* SR - "Data Set/Reset" dialog-box. 
*/
// Do not use "use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

var GP_iStart = 0;
var GP_iStop  = 1;
var GP_szFormula = "";
var GP_szAction = "";

/*----- Module $Value --------------------------------------------------------
*
*/ 
const $Value = (function () {
  var _Value = {};
  _Value.U_Init           = U_Init_Value;      // function U_Init_Value();

/*
* Tables
*/
  _Value.F_szHTML_TD_Table= F_szHTML_TD_Table; // function F_szHTML_TD_Table(P_fKey, P_Item, P_Fld1);
  _Value.F_szHTML_Caption = F_szHTML_Caption;  // function F_szHTML_Caption(P_fNm_Fld, P_Item, P_Fld1);
  _Value.F_Val_Inp_Table  = F_Val_Inp_Table;   // function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp, P_jOpt_Confirm=C_jOpt_Confirm_Edit);
/*
* Cards
* 
* F_szHTML_TD_Card(); F_Val_Inp_Card();
*/
  _Value.F_szHTML_TR_Card = F_szHTML_TR_Card;  // function F_szHTML_TR_Card(P_Item, P_Fld1, P_j);
  _Value.F_szHTML_TD_Card = F_szHTML_TD_Card;  // function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly);
  _Value.F_Val_Inp_Card   = F_Val_Inp_Card;    // function F_Val_Inp_Card(P_Fld1, P_j);
  _Value.F_fType_Show_Toggle = F_fType_Show_Toggle; // function F_fType_Show_Toggle();
 /*
 *  Single Value.
 * 
 * function U_Open_V1(); U_Confirm_V1(); U_Confirm_SetReset(); U_Confirm_Tag(); ok!
 */
  _Value.DBox_InpVal;
  _Value.DBox_SetReset;
  _Value.U_Reset_SR;  

  _Value.U_Set_fLoad0     = U_Set_fLoad0;      // function U_Set_fLoad0(P_fLoad);
  _Value.U_Set_fLoad1     = U_Set_fLoad1;      // function U_Set_fLoad1(P_fLoad);
  _Value.F_fLoad1         = F_fLoad1;          // function F_fLoad1();
  _Value.U_Cameo_SetPrm   = U_Cameo_SetPrm;    // function U_Cameo_SetPrm(P_UsrView);

  _Value.F_szjDate        = F_szjDate;         // function F_szjDate();
  _Value.U_Set_szjDate    = U_Set_szjDate;     // function U_Set_szjDate(P_szjDate);
  _Value.U_SetNow         = U_SetNow;          // function U_SetNow();
  _Value.U_Upd_jDate1     = U_Upd_jDate1;      // function U_Upd_jDate1(P_szjDate);
  _Value.U_Upd_jDate2     = U_Upd_jDate2;      // function U_Upd_jDate2();
  _Value.U_Upd_jDate3     = U_Upd_jDate3;      // function U_Upd_jDate3();
  _Value.U_Show_ims_Sec70 = U_Show_ims_Sec70;  // function U_Show_ims_Sec70(P_ims_Sec70);
  _Value.U_Make_Date      = U_Make_Date;       // function U_Make_Date();

  _Value.U_Chg_EMail      = U_Chg_EMail;       // function U_Chg_EMail(P_szURL);
  _Value.U_Chg_Tel        = U_Chg_Tel;         // function U_Chg_Tel(P_szURL);
  _Value.U_Chg_Num        = U_Chg_Num;         // function U_Chg_Num(P_iNum);
  _Value.U_szGPS          = U_szGPS;           // function U_szGPS();
  _Value.U_OpenStreetMap  = U_OpenStreetMap;   // function U_OpenStreetMap(P_szGPS);
  _Value.U_Grab           = U_Grab;            // function U_Grab();
  _Value.F_f_Mp_Val       = F_f_Mp_Val;        // function F_f_Mp_Val(P_Val);
  _Value.F_Fld_Cell_Selected  = F_Fld_Cell_Selected;   // function F_Fld_Cell_Selected(P_jaFld);
  _Value.U_Sync           = U_Sync;            // function U_Sync(P_Elem0, P_fNum);
  _Value.U_Btn            = U_Btn;             // function U_Btn(P_Elem0, P_fNum);
  _Value.U_Set_iWdt_Image = U_Set_iWdt_Image;  // function U_Set_iWdt_Image(P_iWdt_Image);
  
  _Value.U_Sel_szPlane    = U_Sel_szPlane;     // function U_Sel_szPlane(P_szPlane);
        
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Value;

const C_aszType_JS   = ["string", "number", "boolean", "object", "function", "bigint", "symbol", "undefined"]; /* JS' Types */
const C_aszType_HTML = ["button", "checkbox", "color", "date", "datetime", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week", "textarea"];  /* HTML <input> types. */

/*----- Local Variables ----------------------------------------------*/

var S_szURL_Local = "http://localhost/Relay/irc/read.php/?szTopic=";   /* local server */

var S_aIOType = {};

var S_iNnHex = 4;  /* Number of hexadecimal digits. */
var S_iNnDec = 5;  /* Number of decimal digits. */

var S_fCaption = false;
var S_iWdt_Image = "10";

var S_szPlane ="";

/*
*  Edit single value.
*/
var S_szHTML_DBox_InpVal = `<div style="padding:10%;">
  <div id="Id_InpVal"></div>
</div>`;

/*
*  Data Set/Reset.
*/
var S_szHTML_DBox_SetReset = `<div style="padding:10%;">
  <label for="Id_InpAll">Apply to the whole table/selected field: </label><input type="checkbox" id="Id_InpAll"><br><br>
  <label for="Id_InpStart">Start = </label><input type="number" id="Id_InpStart" min=0>
  <label for="Id_InpStop">Stop = </label><input type="number" id="Id_InpStop" min=0> <button onclick="$Value.U_Reset_SR();">Reset</button><br><br>
  <label for="Id_InpFormula">Formula = </label><input type="text" id="Id_InpFormula" list="Id_Li_Inp_Formula" size=40  placeholder="--- List ---"><button onclick="Id_InpFormula.value = ''">Clear</button><br><br>
          <datalist id="Id_Li_Inp_Formula">
            <option value="\"abc\"">"abc"</option>
            <option value="PAD(i,5,'0')">PAD(i,5,'0')</option>
            <option value="$[0] = +$[0]">$[0] = +$[0]</option>
            <option value="$['szNm']">$['szNm']</option>
            <option value="(!$[1])? 0: $[1]">(!$[1])? 0: $[1]</option>
            <option value="H[12][2]">H[12][2]</option>
            <option value="$[0].toLowerCase()">$[0].toLowerCase()</option>
          </datalist>
  <div id="Id_InpVal"></div>
</div>`;
/*
*  Tags.
*/
var S_szHTML_DBox_Tags = `<div style="padding:10%;">
  <label for="Id_InpStart">Start = </label><input type="number" id="Id_InpStart" min=0>
  <label for="Id_InpStop">Stop = </label><input type="number" id="Id_InpStop" min=0> <button onclick="$Value.U_Reset_SR();">Reset</button><br><br>
  <label for="Id_InpAction">Action = </label><select id="Id_InpAction" size="1">
            <option value="Set bits">Set bits</option>
            <option value="Reset bits">Reset bits</option>
            <option value="Toggle bits">Toggle bits</option>
            <option value="Set value">Set Value</option>
  </select>
  <div id="Id_InpVal"></div>
  <input type="text" id="Id_InpFormula" hidden>
</div>`;

//var S_szjDate = "YYYYMMDD";
var S_szjDate = "DDMMYYYY";
var S_fType_Show = false;         /* Toggle type display */
var S_fLoad0 = false;             /* Inhibit resourse loading when Filter-Card is open */
var S_fLoad1 = false;             /* Flag: Image loading required by the User. */
var S_fLoad2 = false;             /* Flag: Image loading required in the Layout. */
var S_DateKind = "date";          /* DateKind values: date, datetime, datetime-local */
var S_szDate0 = "";

var S_iHgt = "300px";             /* picture height MAX */

/*-----U_Sel_szPlane --------------------------------------------------------
*
* Select Plane that should be displayed.
*/ 
function U_Sel_szPlane(P_szPlane=-1)
{
  S_szPlane = P_szPlane;
} /* U_Sel_szPlane */

/*-----U_Set_iWdt_Image --------------------------------------------------------
*
*/ 
function U_Set_iWdt_Image(P_iWdt_Image)
{
  S_iWdt_Image = P_iWdt_Image ?? "10";   // 0%
} /* U_Set_iWdt_Image */

/*-----F_fType_Show_Toggle --------------------------------------------------------
*
*/ 
function F_fType_Show_Toggle()
{
  var fVal = !S_fType_Show;
  S_fType_Show = fVal;
  return(fVal);       
} /* F_fType_Show_Toggle */

/*-----U_Prepare_Speech --------------------------------------------------------
*
*/ 
function U_Prepare_Speech(P_szTxt)
{
  $TTS.U_Prepare_Speech(P_szTxt, false, false);
} /* U_Prepare_Speech */

/*-----U_Set_fLoad0 --------------------------------------------------------
*
*/ 
function U_Set_fLoad0(P_fLoad)
{
  S_fLoad0 = P_fLoad;
} /* U_Set_fLoad0 */

/*-----U_Set_fLoad1 --------------------------------------------------------
*
* Set Resource Loading flag.
*/ 
function U_Set_fLoad1(P_fLoad)
{
  S_fLoad1 = P_fLoad;
} /* U_Set_fLoad1 */

/*-----F_fLoad1 --------------------------------------------------------
*
*/ 
function F_fLoad1()
{
  return(S_fLoad1);
} /* F_fLoad1 */

/*-----U_Cameo_SetPrm --------------------------------------------------------
*
* Set Parameters controlling Values displayed.
*/
function U_Cameo_SetPrm(P_UsrView)
{
  S_fLoad2 = P_UsrView.fShow_Icon ??= false;
} /* U_Cameo_SetPrm */

/*-----F_Fld_Cell_Selected --------------------------------------------------------
*
* Return the Field descriptor corresponding to the cell selected.
*/ 
function F_Fld_Cell_Selected(P_UsrView)
{
  var JKndTup0 = P_UsrView.XDB0.JKndTup0;
  var aFld1  = P_UsrView.aFld1;
  var jaFld1 = P_UsrView.jaFld1;
  var aiPos  = P_UsrView.aiPos;
  var Fld_Sel = P_UsrView.Fld_Sel;
  return(Fld_Sel);
} /* F_Fld_Cell_Selected */

/*-----F_szjDate --------------------------------------------------------
*
*/ 
function F_szjDate()
{
  return(S_szjDate);
} /* F_szjDate */

/*-----U_Set_szjDate --------------------------------------------------------
*
*/ 
function U_Set_szjDate(P_szjDate)
{
  switch (P_szjDate.toUpperCase()) {
    case "YYYYMMDD":
    case "DDMMYYYY":
    case "MMDDYYYY": {    
         S_szjDate = P_szjDate;
    } break;
    default : {
        $Error.U_Error(C_jCd_Cur, 1, "Wrong Date format.", P_szjDate, false);
    } break;
  } /* switch */
} /* U_Set_szjDate */

/*-----U_Show_ims_Sec70 --------------------------------------------------------
*
* Convert timestamp in a Date and show it.
*/ 
function U_Show_ims_Sec70(P_ims_Sec70)
{
  var Date0 = $TimeDate.F_Date_Mp_ims_Sec70(+P_ims_Sec70);
  let iYear = Date0.getFullYear();
  let iMonth = Date0.getMonth() +C_iDe_Month;
  let iDay = Date0.getDate();
  let jWDay = Date0.getDay();
  
  let iHour = Date0.getHours();
  let iMinutes = Date0.getMinutes();
  let iSeconds = Date0.getSeconds();
  let imSec = Date0.getMilliseconds();

  var szDate = $TimeDate.F_szDate_Make(iYear, iMonth, iDay, iHour, iMinutes, iSeconds, imSec, 0, "date");
   
  Id_xKrW98717_Date.value = szDate;
  Id_xKrW98717_YYYY.value = iYear;
  Id_xKrW98717_MM.value = iMonth +C_iDe_Month;
  Id_xKrW98717_DD.value = iDay;
  Id_xKrW98717_hh.value = iHour;
  Id_xKrW98717_mm.value = iMinutes;
  Id_xKrW98717_ss.value = iSeconds;
  Id_xKrW98717_ms.value = imSec;
  Id_xKrW98717_WD.value = F_szWDay_Mp_jWDay(jWDay);

  Id_xKrW98717_TS.value = P_ims_Sec70;
} /* U_Show_ims_Sec70 */

/*-----F_szWDay_Mp_jWDay --------------------------------------------------------
*
*/ 
function F_szWDay_Mp_jWDay(P_jWDay)
{
/* $Note: The standard ISO_8601 establish that weekday number will be encoded in the range from 1 through 7, beginning with Monday and ending with Sunday. JS does not comply! */
  const aszWDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  return(aszWDay[P_jWDay]);
} /* F_szWDay_Mp_jWDay */

/*-----U_Make_Date --------------------------------------------------------
*
* Make a Date assembling the Date parts entered by the user.
*/ 
function U_Make_Date()
{
  let iYear    = Id_xKrW98717_YYYY.value; 
  let iMonth   = Id_xKrW98717_MM.value;
  let iDay     = Id_xKrW98717_DD.value; 
  let iHour    = Id_xKrW98717_hh.value; 
  let iMinutes = Id_xKrW98717_mm.value; 
  let iSeconds = Id_xKrW98717_ss.value; 
  let imSec    = Id_xKrW98717_ms.value;
  
  var Date0 = new Date(iYear, iMonth, iDay, iHour, iMinutes, iSeconds, imSec);  
  var szDate = $TimeDate.F_szDate_Make(iYear, iMonth, iDay, iHour, iMinutes, iSeconds, imSec, 0, "date");
  
  Id_xKrW98717_Date.value = szDate;
  Id_xKrW98717_TS.value   = $TimeDate.F_ims_Sec70_Now();
  let jWDay = Date0.getDay(); 
  Id_xKrW98717_WD.value = F_szWDay_Mp_jWDay(jWDay);
} /* U_Make_Date */

/*-----U_SetNow --------------------------------------------------------
*
* The HTML5 date input specification refers to the RFC 3339, which specifies a full-date format equal to: yyyy-mm-dd. See section 5.6 of the RFC 3339 specification for more details.
*/ 
function U_SetNow()
{
  var Date0 = $TimeDate.F_Date_Now();
  var szDiv0 = F_szHTML_Date(S_szjDate, Date0, S_DateKind);  
  Id_xKrW98717_Date.innerHTML = szDiv0;
} /* U_SetNow */

/*-----U_Upd_jDate1 --------------------------------------------------------
*
* Update date's format when jDate changes.
*/ 
function U_Upd_jDate1(P_szjDate)
{
  S_szjDate = P_szjDate;

  var Date0 = new Date(S_szDate0);
  var szDiv0 = F_szHTML_Date(S_szjDate, Date0, S_DateKind);  
  Id_xKrW98717_Date.innerHTML = szDiv0;
} /* U_Upd_jDate1 */

/*-----U_Upd_jDate2 --------------------------------------------------------
*
* Update date when date's components change.
*/ 
function U_Upd_jDate2()
{
  var iYear  = +Id_xKrW98717_YYYY.value;
  var iMonth = +Id_xKrW98717_MM.value;
  var iDay   = +Id_xKrW98717_DD.value;
  
  S_szDate0 = F_szPad2(iYear) + "-" + F_szPad2(iMonth) + "-" + F_szPad2(iDay);
    
  if (S_DateKind != "date") {
      var iHour  = +Id_xKrW98717_hh.value;
      var iMin   = +Id_xKrW98717_mm.value;
      var iSec   = +Id_xKrW98717_ss.value;
    
      S_szDate0 += "T" + F_szPad2(iHour) + ":" + F_szPad2(iMin) + ":" + F_szPad2(iSec);
  } /* if */
  if (S_DateKind == "datetime") {
      var iTZ_H  = +Id_xKrW98717_TZ_H.value;
      var iTZ_M  = +Id_xKrW98717_TZ_M.value;
      var ch = '+';
      if (iTZ_H < 0) {
         iTZ_H = - iTZ_H;
         ch = '-';
      } /* if */
    
      S_szDate0 += ch + F_szPad2(iTZ_H) + ":" + F_szPad2(iTZ_M);
  } /* if */
    
  Id_xKrW98717_a.value = S_szDate0;
  Id_xKrW98717_TS.value = $TimeDate.F_ims_Sec70_Mp_szDate(S_szDate0);
} /* U_Upd_jDate2 */

/*-----U_Upd_jDate3 --------------------------------------------------------
*
* Update Date when a Date's component (year, month, day) change.
*/ 
function U_Upd_jDate3(P_date)
{
  if (P_date) {     
    var Date0 = new Date(P_date);
  
    var iYear  = Date0.getFullYear();
    var iMonth = Date0.getMonth() +1;
    var iDay   = Date0.getDate();
    
    Id_xKrW98717_YYYY.value = iYear; 
    Id_xKrW98717_MM.value   = iMonth;
    Id_xKrW98717_DD.value   = iDay;
    
    S_szDate0 = `${iYear}-${iMonth}-${iDay}`;
  } /* if */
} /* U_Upd_jDate3 */

/*-----F_szHTML_Date --------------------------------------------------------
*
* Generate HTML code to display date in a Card. 
* 
* date           in YYYY-MM-DD format;
* datetime-local in YYYY-MM-DDThh:mm:ss.mmm   format;
* datetime       in YYYY-MM-DDThh:mm:ss.mmm+hh:mm format;
*/ 
function F_szHTML_Date(P_szjDate, P_ValDate0, P_DateKind)
{
  var aszWDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var szDate0;
  var Date0;
     
  if (typeof(P_ValDate0) == "object") {
     /* $ASSUME: P_ValDate0 is a Date object */
     szDate0 = $TimeDate.F_szDate_Mp_Date(P_ValDate0, P_DateKind);
     Date0   = $TimeDate.F_Date_Mp_szDate(szDate0, P_DateKind);
  }
  else {
     /* $ASSUME: P_ValDate0 is a string representing a Date */
     szDate0 = (P_ValDate0)? P_ValDate0: "1000-01-01";
     Date0   = $TimeDate.F_Date_Mp_szDate(szDate0, P_DateKind);
  } /* if */

  var ims_Sec70 = Date0.getTime();
  
  S_DateKind = P_DateKind;
  var szHTML = `<label for="Id_xKrW98717_a">HTML's &lt;input&gt; Date = </label> <input id="Id_xKrW98717_a" type="${P_DateKind}" value="${szDate0}" size="30"  onchange="$Value.U_Upd_jDate3(Id_xKrW98717_a.value);">&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="Id_xKrW98717_TS">TimeStamp = </label> <input id="Id_xKrW98717_TS" type="number" value="${ims_Sec70}" size="30" readonly><br><br>`;

  var szDate = szDate0.substr(0, 10);
  var szTime, szPos;

  var aYYYYMMDD = (szDate)? szDate.split("-"): [1, 1, 1];    /* szDate0 is undefined set default */
  
  switch (P_szjDate) {
    case "DDMMYYYY" : {
          szHTML += `<label for="Id_xKrW98717_DD">Day = </label><input id="Id_xKrW98717_DD" type="number" min=1 max=31 value=${aYYYYMMDD[2]} onchange="$Value.U_Upd_jDate2();">
                    <label for="Id_xKrW98717_MM">Month = </label><input id="Id_xKrW98717_MM" type="number" min=1 max=12 value=${aYYYYMMDD[1]} onchange="$Value.U_Upd_jDate2();">                   
                    <label for="Id_xKrW98717_YYYY">Year = </label> <input id="Id_xKrW98717_YYYY" type="number" min=0 max=3000 value=${aYYYYMMDD[0]} onchange="$Value.U_Upd_jDate2();">`;
    } break;
    case "YYYYMMDD" : {
          szHTML += `<label for="Id_xKrW98717_YYYY">Year = </label> <input id="Id_xKrW98717_YYYY" type="number"  min=0 max=3000 value=${aYYYYMMDD[0]} onchange="$Value.U_Upd_jDate2();"> 
                    <label for="Id_xKrW98717_MM">Month = </label><input id="Id_xKrW98717_MM" type="number" min=1 max=12 value=${aYYYYMMDD[1]} onchange="$Value.U_Upd_jDate2();"> 
                    <label for="Id_xKrW98717_DD">Day = </label><input id="Id_xKrW98717_DD" type="number"  min=1 max=31 value=${aYYYYMMDD[2]} onchange="$Value.U_Upd_jDate2();">`;
    } break;
    case "MMDDYYYY" : {
          szHTML += `<label for="Id_xKrW98717_MM">Month = </label><input id="Id_xKrW98717_MM" type="number" min=1 max=12 value=${aYYYYMMDD[1]} onchange="$Value.U_Upd_jDate2();">  
                    <label for="Id_xKrW98717_DD">Day = </label><input id="Id_xKrW98717_DD" type="number"  min=1 max=31 value=${aYYYYMMDD[2]} onchange="$Value.U_Upd_jDate2();">
                    <label for="Id_xKrW98717_YYYY">Year = </label> <input id="Id_xKrW98717_YYYY" type="number"  min=0 max=3000 value=${aYYYYMMDD[0]} onchange="$Value.U_Upd_jDate2();">`;
    } break;
    default : {
    } break;
  } /* switch */
  if (P_DateKind != "datetime") {
     var iWDay = Date0.getDay();
     szHTML += `&nbsp; Day of the Week: <input type="text" value="${aszWDay[iWDay]}" readonly><br><br>`;
  } /* if */

  if (P_DateKind != "date") {     
     szHTML += "<br><br>";
     if (P_DateKind == "datetime") {
         var iPosT = szDate0.indexOf(".");
         iPosT = (iPosT > 0)? iPosT: szDate0.length -6;        // "+01:00".length == 6
         szTime = szDate0.substring(11, iPosT -1);
     }
     else {
         var iPosT = szDate0.indexOf(".");
         iPosT = (iPosT > 0)? iPosT: szDate0.length -1;
         szTime = szDate0.substring(11);
     } /* if */

     var ahhmmss = (szTime)? szTime.split(":"): [1, 1, 1];    /* szDate0 is undefined set default */
     if (ahhmmss.length == 2) {
        ahhmmss[2] = 0;
        if (ahhmmss[1][2] == "Z") {
           ahhmmss[1] = ahhmmss[1].substr(0, 2);
        } /* if */
     }
     else if (ahhmmss[2][2] == '.') {        
        ahhmmss[3] = ahhmmss[2].substr(3);        
        ahhmmss[2] = ahhmmss[2].substr(0, 2);
     } /* if */
     
     ahhmmss[0] = F_szPad2(ahhmmss[0]);
     ahhmmss[1] = F_szPad2(ahhmmss[1]);
     ahhmmss[2] = F_szPad2(ahhmmss[2]);
 
     szHTML += `<label for="Id_xKrW98717_hh">hour = </label><input id="Id_xKrW98717_hh" type="number" min=0 max=23 value=${ahhmmss[0]} onchange="$Value.U_Upd_jDate2();">  
                <label for="Id_xKrW98717_mm">min  = </label><input id="Id_xKrW98717_mm" type="number" min=0 max=59 value=${ahhmmss[1]} onchange="$Value.U_Upd_jDate2();">
                <label for="Id_xKrW98717_ss">sec  = </label><input id="Id_xKrW98717_ss" type="number" min=0 max=59 value=${ahhmmss[2]} onchange="$Value.U_Upd_jDate2();">`;
  } /* if */
  if (P_DateKind == "datetime") {
     var szPos = szDate0.substr(szDate0.length -6);
     var iTZ_H = "00";     
     var iTZ_M = "00";
     
     if ((szPos[0] == '+') || (szPos[0] == '-')) {
        [iTZ_H, iTZ_M] = szPos.split(":");
     }
     else {
     } /* if */   
/*
* UTC values fall in the range -12:00..+14:00 for Kiribati Islands.
*/    
     szHTML += `<label for="Id_xKrW98717_TZ_H"> &nbsp;&nbsp;TZ </label><input id="Id_xKrW98717_TZ_H"  type="number" value=${iTZ_H} min=-12 max=14 onchange="$Value.U_Upd_jDate2();">:
                <label for="Id_xKrW98717_TZ_M"></label><input id="Id_xKrW98717_TZ_M"  type="number" value=${iTZ_M}  min=0 max=59 onchange="$Value.U_Upd_jDate2();">`; 
     
     var iWDayUTC = Date0.getUTCDay();
     var iYearUTC = Date0.getUTCFullYear();
     var iMonthUTC = Date0.getUTCMonth() +C_iDe_Month;
     var iDayUTC  = Date0.getUTCDate();
     var iHourUTC = Date0.getUTCHours();
     var iMinUTC = Date0.getUTCMinutes();
     var iSecondsUTC = Date0.getUTCSeconds();

     var iWDay = Date0.getDay();
     var iYear = Date0.getFullYear();
     var iMonth = Date0.getMonth() +C_iDe_Month;
     var iDay  = Date0.getDate();
     var iHour = Date0.getHours();
     var iMin = Date0.getMinutes();
     var iSeconds = Date0.getSeconds();     
     szHTML += "<br><br>";
     
  switch (P_szjDate) {
    case "DDMMYYYY" : {
          szHTML += `UTC-Date and Time: ${aszWDay[iWDayUTC]} ${F_szPad2(iDayUTC)}/${F_szPad2(iMonthUTC)}/${F_szPad2(iYearUTC)} ${F_szPad2(iHourUTC)}:${F_szPad2(iMinUTC)}:${F_szPad2(iSecondsUTC)} UTC<br>`;     
          szHTML += `Local Date and Time: ${aszWDay[iWDay]} ${F_szPad2(iDay)}/${F_szPad2(iMonth)}/${F_szPad2(iYear)} ${F_szPad2(iHour)}:${F_szPad2(iMin)}:${F_szPad2(iSeconds)} `;
    } break;
    case "YYYYMMDD" : {
          szHTML += `UTC-Date and Time: ${aszWDay[iWDayUTC]} ${F_szPad2(iYearUTC)}-${F_szPad2(iMonthUTC)}-${F_szPad2(iDayUTC)} ${F_szPad2(iHourUTC)}:${F_szPad2(iMinUTC)}:${F_szPad2(iSecondsUTC)} UTC<br>`;
          szHTML += `Local Date and Time: ${aszWDay[iWDay]} ${F_szPad2(iYear)}-${F_szPad2(iMonth)}-${F_szPad2(iDay)} ${F_szPad2(iHour)}:${F_szPad2(iMin)}:${F_szPad2(iSeconds)} `;
    } break;
    case "MMDDYYYY" : {
          szHTML += `UTC-Date and Time: ${aszWDay[iWDayUTC]} ${F_szPad2(iMonthUTC)}.${F_szPad2(iDayUTC)}.${F_szPad2(iYearUTC)} ${F_szPad2(iHourUTC)}:${F_szPad2(iMinUTC)}:${F_szPad2(iSecondsUTC)} UTC<br>`;
          szHTML += `-Date and Time: ${aszWDay[iWDay]} ${F_szPad2(iMonth)}.${F_szPad2(iDay)}.${F_szPad2(iYear)} ${F_szPad2(iHour)}:${F_szPad2(iMin)}:${F_szPad2(iSeconds)} `;
    } break;
    default : {
    } break;
  } /* switch */

  } /* if */
  szHTML += `<br><br><button onclick="$Value.U_SetNow();">NOW</button>`;
  return(szHTML);
} /* F_szHTML_Date */
  
/*--------------------------------------------------------------------*/

/*-----U_Sync --------------------------------------------------------
*
* Used in class CL_Range. U_Sync() syncrhonize Id_Card_iRange.value with Id_Card_iRange_b.value
*/ 
function U_Sync(P_Elem0, P_fNum)
{
  var parentNode = P_Elem0.parentNode;
  var children = parentNode.children;
  var Elem0 = children.Id_Card_iRange;
  var Elem1 = children.Id_Card_iRange_b;
  if (P_fNum) {
     Elem0.value = Elem1.value;
  }
  else {
     Elem1.value = Elem0.value;
  } /* if */
} /* U_Sync */

/*-----U_Btn --------------------------------------------------------
*
* Used in class CL_Button
*/ 
function U_Btn(P_Elem0, P_fNum)
{
  debugger;
  var parentNode = P_Elem0.parentNode;
  var children = parentNode.children;
//   var Elem0 = children.Id_Card_iRange;
//   var Elem1 = children.Id_Card_iRange_b;
//   if (P_fNum) {
//      Elem0.value = Elem1.value;
//   }
//   else {
//      Elem1.value = Elem0.value;
//   } /* if */
} /* U_Btn */

/*-----U_Grab --------------------------------------------------------
*
*/ 
function U_Grab()
{
  $Camera.DBox_Grab.U_Hub(C_JPnl_Open);
} /* U_Grab */

/*-----U_OpenStreetMap --------------------------------------------------------
*
*/ 
function U_OpenStreetMap(P_szGPS)
{
  var aCoord = P_szGPS.split(',');
  var iLat = aCoord[0];
  var iLon = aCoord[1];
  var szURL = `https://www.openstreetmap.org/#map=18/${iLat}/${iLon}`;
  $DDJ.F_Window_open(szURL);
} /* U_OpenStreetMap */

/*-----U_szGPS --------------------------------------------------------
*
*/ 
function U_szGPS()
{
  function U_DisplayMap(P_GPS)
  {
    var szGPS = `${P_GPS.coords.latitude}, ${P_GPS.coords.longitude}`;
    Id_xKrW98717_a.value = szGPS;
    
    var szHTML = `<label for="Id_xKrW98717_a">GPS0 = </label> <input id="Id_xKrW98717_a" type="text" value="${szGPS}"> <button  onclick="$Value.U_szGPS();">HERE</button> <button  onclick="$Value.U_OpenStreetMap(Id_xKrW98717_a.value);">OpenStreetMap</button>`; 
    
    szHTML += `<br><br>Latitude: ${P_GPS.coords.latitude}, Longitude: ${P_GPS.coords.longitude}, Altitude: ${P_GPS.coords.altitude}<br>
               Heading: ${P_GPS.coords.heading}, Speed: Altitude: ${P_GPS.coords.speed}<br>
               Accuracy: Altitude: ${P_GPS.coords.accuracy}, Accuracy: Altitude Accuracy: ${P_GPS.coords.altitudeAccuracy}, timestamp: ${P_GPS.timestamp}<br> 
               <hr>User Type = GPS<br>HTML Type = GPS<br>JS Type = string`;
    Id_InpVal.innerHTML = szHTML;	
  }  /* U_DisplayMap */
  
  function U_Error_GPS(P_szErr)
  {
    var szErr = "";
    switch (P_szErr.code) {
      case P_szErr.PERMISSION_DENIED: {
           szErr = "User denied the request for Geolocation.";
      } break;
      case P_szErr.POSITION_UNAVAILABLE: {
           szErr = "Location information is unavailable.";
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

    $Error.U_Error(C_jCd_Cur, 2, szErr, "", false);
  }  /* U_Error_GPS */
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(U_DisplayMap, U_Error_GPS);
  }
  else {
    $Error.U_Error(C_jCd_Cur, 3, "Geolocation is not supported by this browser.", "", false);
  } /* if */
} /* U_szGPS */

/*-----F_f_Mp_Val --------------------------------------------------------
*
* Convert a generic type in a boolean;
*/ 
function F_f_Mp_Val(P_Val)
{
  var szType_In = typeof(P_Val);

  switch (szType_In) {
   case "boolean": {
   } break;
   case "bigint": {
         P_Val = (P_Val != 0n);   /* 0 = false. Any value V such that V != 0 is true.  */
   } break;
   case "number": {
         P_Val = (P_Val != 0);    /* 0 = false. Any value V such that V != 0 is true.  */
   } break;
   case "string": {
         if (P_Val != "") {
            if ((P_Val == "false") || (P_Val == "f") || (P_Val == "FALSE") || (P_Val == "F") || (P_Val == "0")) {
               P_Val = false;
            }
            else if ((P_Val == "true") || (P_Val == "t") || (P_Val == "TRUE") || (P_Val == "T") || (P_Val == "1")) {
               P_Val = true;
            }
            else {
               $Error.U_Warning(C_jCd_Cur, 4, "Unknown boolean", P_Val);
            } /* if */
         }
         else {
            /* "" could be used in <input> as default to denote unknow boolean value */
         } /* if */
   } break;
  } /* switch */
  return(P_Val);
} /* F_f_Mp_Val */

/*-----U_Chg_EMail --------------------------------------------------------
*
*/ 
function U_Chg_EMail(P_szURL)
{
   Id_xKrW98717_b.href = P_szURL;  
   Id_xKrW98717_b.innerText = P_szURL;   
} /* U_Chg_EMail */

/*-----U_Chg_Tel --------------------------------------------------------
*
*/ 
function U_Chg_Tel(P_szURL)
{
   Id_xKrW98717_b.href = P_szURL;  
   Id_xKrW98717_b.innerText = P_szURL; 
   Id_xKrW98717_c.href = P_szURL;  
   Id_xKrW98717_c.innerText = P_szURL;   
} /* U_Chg_Tel */

/*-----U_Chg_Num --------------------------------------------------------
*
*/ 
function U_Chg_Num(P_szNum)
{
  iNum0 = +P_szNum;
  if (isNaN(iNum0)) {
     $Error.U_Error(C_jCd_Cur, 5, "Not a Valid Number", P_szNum, false);
  } /* if */
  var fInt = (iNum0 - Math.trunc(iNum0) == 0);     /* iNum0 is an Integer or a Float? */
  var szDiv0 = (fInt)? `dec = ${iNum0}<br>hex = 0x${iNum0.toString(16)}<br>oct = 0o${iNum0.toString(8)}<br>bin = 0b${iNum0.toString(2)}<br>Exp = ${iNum0.toExponential()}`: `dec = ${iNum0}<br>Exp = ${iNum0.toExponential()}`;
  Id_xKrW98717_b.innerHTML = szDiv0;
} /* U_Chg_Num */

/*-----F_szPrettyObj --------------------------------------------------------
*
* Pretty print the given Object.
*/ 
function F_szPrettyObj(P_Obj)
{
   var szTmp = "";
   var szVal;
   
   for (let szNm in P_Obj) {
       szVal = JSON.stringify(P_Obj[szNm]);
       szTmp += `"${szNm}":${szVal},\n`;
   } /* for */
   return(szTmp);
} /* F_szPrettyObj */

/*-----U_Confirm_SetReset --------------------------------------------------------
*
*/ 
function U_Confirm_SetReset()
{
  var Val0;
  var Val1   = Id_xKrW98717_a.value;
  var fAll   = Id_InpAll.checked;
  var iStart = +Id_InpStart.value;
  var iStop  = +Id_InpStop.value;
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  GP_szFormula = Id_InpFormula.value;

  if (iStart > iStop) {
        $Error.U_Error(C_jCd_Cur, 6, "iStart > iStop.", "", false);
  } /* if */
  if (iStop >= UsrView0.aNdx.length) {
        $Error.U_Error(C_jCd_Cur, 7, "iStop exceeds data set cardinality: ", UsrView0.aNdx.length, false);
  } /* if */  
  if (UsrView0.fAsc) {
     GP_iStart = iStart;
     GP_iStop  = iStop; 
  }
  else {
     let iCard = UsrView0.XDB0.Coll0.length;
     GP_iStart = (iCard -1) - iStop;
     GP_iStop  = (iCard -1) - iStart; 
  } /* if */ 
  
  if (GP_szFormula) {
     /* Calc value on Cell basis. */
     Val0 = GP_szFormula;
  }
  else {
     var szType = Id_xKrW98717_a.type;
     var szType_JS = $Type.F_szType_JS(szType);
     switch (szType_JS) {
       case "string": {
            Val0 = `"${Id_xKrW98717_a.value}"`;
       } break;
       case "number": {
            Val0 = Id_xKrW98717_a.value;
       } break;
       case "boolean":
       case "checkbox": {
            Val0 = Id_xKrW98717_a.checked;
       } break;
       default : {
            Val0 = `"${Id_xKrW98717_a.value}"`;
       } break;
     } /* switch */
  } /* if */

  if (fAll) {
     var aFld1 = UsrView0.aFld1;
     for (let i = 0; i < aFld1.length; i++) {  
         UsrView0.U_Set_Field(UsrView0, aFld1[i], Val0, GP_iStart, GP_iStop);     
     } /* for */ 
  }
  else {  
     UsrView0.U_Set_Field(UsrView0, UsrView0.Fld_Sel, Val0, GP_iStart, GP_iStop);
  } /* if */
  
  $Table.U_Display_Table();   
} /* U_Confirm_SetReset */

/*-----U_Confirm_Tags --------------------------------------------------------
*
*/ 
function U_Confirm_Tags()
{
ALERT("xxx",1);
  var Val0   = Id_xKrW98717_a.value;
  var iStart = +Id_InpStart.value;
  var iStop  = +Id_InpStop.value;
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  GP_szAction = Id_InpAction.value;

  if (iStart > iStop) {
        $Error.U_Error(C_jCd_Cur, 8, "iStart > iStop.", "", false);
  } /* if */
  if (iStop >= UsrView0.aNdx.length) {
        $Error.U_Error(C_jCd_Cur, 9, "iStop exceeds data set cardinality: ", UsrView0.aNdx.length, false);
  } /* if */  
  if (UsrView0.fAsc) {
     GP_iStart = iStart;
     GP_iStop  = iStop; 
  }
  else {
     let iCard = UsrView0.XDB0.Coll0.length;
     GP_iStart = (iCard -1) - iStop;
     GP_iStop  = (iCard -1) - iStart; 
  } /* if */ 

  $Tag.U_Eval(UsrView0, UsrView0.Fld_Sel, Val0, GP_szAction, GP_iStart, GP_iStop);
  
  $Table.U_Display_Table();   
} /* U_Confirm_Tags */

/* # ---- Object S_DBox_InpVal ------------------------------------------------------
*
* This form opens a dialog-box, allowing the user to enter the value of a field and validates it.
*/ 
var S_DBox_InpVal = (function(){
  var _Cond = {};
  _Cond.U_Open        = U_Open;         // function U_Open(P_Id);
  _Cond.U_Open_SR     = U_Open_SR;      // function U_Open_SR(P_Id);
  _Cond.U_Open_Tags   = U_Open_Tags;    // function U_Open_Tags(P_Id);
  _Cond.U_Cancel      = U_Close;        // function U_Close(P_Id);
  _Cond.U_Confirm_V1  = U_Confirm_V1;   // function U_Confirm_V1(P_Id);
  _Cond.U_Reset_SR    = U_Reset_SR;     // function U_Reset_SR();
  
/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Id)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  U_Open_V1(XDB0, UsrView0.jaFld1, false);
} /* U_Open */
  
/*-----U_Open_SR --------------------------------------------------------
*
* Open "Data Set/Reset" dialog-box.
*/ 
function U_Open_SR(P_Id)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var aFld     = UsrView0.F_aNdx();
  var iLen     = aFld.length;
  if ((GP_iStop < 0) || (iLen <= GP_iStop)) {
     GP_iStart = 0;
     GP_iStop = iLen -1;
  } /* if */
  U_Open_V1(XDB0, UsrView0.jaFld1, true);
} /* U_Open_SR */

/*-----U_Reset_SR --------------------------------------------------------
*
* Reset "Data Set/Reset" Start and Stop Values to defaults.
*/ 
function U_Reset_SR()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  Id_InpStart.value = 0;
  Id_InpStop.value  = UsrView0.aNdx.length -1;
} /* U_Reset_SR */

/*-----U_Open_Tags --------------------------------------------------------
*
*/ 
function U_Open_Tags(P_Id)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var iLen     = UsrView0.aNdx.length;
  if (iLen <= GP_iStop) {
     GP_iStart = 0;
     GP_iStop = UsrView0.aNdx.length -1;
  } /* if */
  U_Open_V1(XDB0, UsrView0.jaFld1, true);
} /* U_Open_Tags */

/*-----U_Open_V1 --------------------------------------------------------
*
* Edit Single Value - $HUB
* 
* Generates the HTML code of the Card corresponding to the document and then displays it. 
* $Note: the values enteres by the user will be processed by function U_Confirm_V1().
*/ 
function U_Open_V1(P_XDB0, P_jaFld, P_SR = false)
{ 
  $Log.U_Log(C_jCd_Cur, 1, C_iLvl_EdtCell, "U_Open_V1", "");
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var Tup0 = P_XDB0.Tup_Sel;  
  var JKndTup0 = P_XDB0.JKndTup0;
  var Fld1 = F_Fld_Cell_Selected(UsrView0);
  if (!Fld1) {
        $Error.U_Error(C_jCd_Cur, 10, "No column selected.", "", false);
  } /* if */
  var szType_Sem = Fld1.szType;                   /* User/Semantic Type. */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);     /* Get Type's descriptor */
  var szType_Out = Type0[C_jaType_szType_Out];    /* Type used for Input/Output */
  var szType_In  = Type0[C_jaType_szType_In];     /* Corresponding JS type */
  var szHTML = "";                                /* String displayed. */
  var szNm   = Fld1.szNm;
  var szDisabled = (UsrView0.fReadOnly)? "disabled": "";
  var Val0;
  
  if (P_SR) {
     Id_InpStart.value = GP_iStart;
     Id_InpStop.value  = GP_iStop;
     Id_InpFormula.value = GP_szFormula;
  } /* if */
  
  if ((JKndTup0 <= C_JKndTup_Obj) || (JKndTup0 == C_JKndTup_as_)) {             /* (JKndTup0 == C_JKndTup_Arr) || (JKndTup0 == C_JKndTup_Obj) */
     Val0 = Tup0;
     if (JKndTup0 == C_JKndTup_Arr) {
        szType_Sem = typeof(Val0);
        szType_Out = szType_Sem;
        szType_In  = szType_Sem;     
     } /* if */
  }
  else {
      var iDelta = (JKndTup0 == C_JKndTup_asRcd)? 1: 0;
      Val0 = (JKndTup0 & C_JKndTup_ArrLike)? Tup0[P_jaFld -iDelta]: Tup0[szNm];
  } /* if */
  
  if (S_aIOType[szType_Out]) {
  
      szHTML += S_aIOType[szType_Out].U_Open_V1(Val0, Fld1, szDisabled);

      if ((JKndTup0 == C_JKndTup_Obj) || (JKndTup0 == C_JKndTup_as_)) {
         var UsrView0 = CL_UsrView0.F_UsrView_Selected();
         szHTML = "Field name: <b>" + UsrView0.KeyTup + "</b><br><br>" + szHTML;   
      } /* if */
      var fjCol = $XDB.F_fjCol_Mp_JKndTup(JKndTup0);
      var szNm_Fld = UsrView0.aFld1[0].szNm;
      var szTmp0 = (fjCol)? "index": "key"; 
      var szTmp1 = (fjCol)? "$[0]": `$["${szNm_Fld}"]`;
      
      szHTML += `<br><br><table style="width: 100%" border="1"><tbody> 
                 <tr><td>Example of Formula: </td><td>The elements should be referred by <code><b>${szTmp0}</b></code>.<br>To copy the values of the first column in the selected one write: <code><b>${szTmp1}</b></code></td></tr>   
                 <tr><td>Field name: </td><td>${Fld1.szNm}</td></tr>
                 <tr><td>Caption: </td><td>${Fld1.szCaption}</td></tr>
                 <tr><td>Remarks: </td><td>${Fld1.szRem}</td></tr>
                 <tr><td>Semantic Type: </td><td>${szType_Sem}</td></tr>
                 <tr><td>HTML Type: </td><td>${szType_Out}</td></tr>
                 <tr><td>JS Type: </td><td>${szType_In}</td></tr>
                 <tr><td>typeof: </td><td>${typeof(Val0)}</td></tr>
                 </tbody></table>`;      
      Id_InpVal.innerHTML = szHTML;

      return;
  } /* if */
} /* U_Open_V1 */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Id)
{
} /* U_Close */

/*-----U_Confirm_V1 --------------------------------------------------------
*
* Edit Single Value - $HUB
* Validate input.
*/ 
function U_Confirm_V1(P_Bag)
{
  $Log.U_Log(C_jCd_Cur, 2, C_iLvl_EdtCell, "U_Confirm_V1", ""); 
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0     = UsrView0.XDB0;
  var aiPos    = UsrView0.aiPos;
  var JKndTup0 = XDB0.JKndTup0;
  var jaFld0   = UsrView0.jaFld1;
        
  var Tup0  = XDB0.Tup_Sel;
  var Fld1  = UsrView0.Fld_Sel;

  var szType_Sem = Fld1.szType;                    /* User/Semantic Type */
  var Type0      = $Type.F_asRcd_Type(szType_Sem); /* Get Type-Descriptor */ 
  
  var szType_Out = Type0[C_jaType_szType_Out];     /* Type used for Input/Output */
  var szType_In  = Type0[C_jaType_szType_In];      /* Corresponding JS type */ 
  var Val0;
  var oAux = Type0[C_jaType_oAux];
  var szNm;
  
  if (S_aIOType[szType_In]) {
      Val0 = S_aIOType[szType_In].U_Confirm_V1(Fld1.szNm, szType_Sem);
      
      if ($Type.F_fChk_Type(Val0, szType_In, Fld1)) {               /* Check the value entered by the User. */
         $Error.U_Error(C_jCd_Cur, 11, "Illegal or out of range value:", Val0, false);
      } /* if */
      
      switch (JKndTup0) {
        case C_JKndTup_Arr: {    
             XDB0.Coll0[UsrView0.KeyTup] = Val0;
        } break;
        case C_JKndTup_Obj: {    
             XDB0.Coll0[UsrView0.KeyTup] = Val0;
        } break;
        case C_JKndTup_aRcd: {
             Tup0[jaFld0] = Val0;
        } break;
        case C_JKndTup_aObj: {
             szNm = Fld1.szNm;
             Tup0[szNm] = Val0;
        } break;
        case C_JKndTup_asRcd: {
             Tup0[jaFld0 -1] = Val0;
        } break;
        case C_JKndTup_asObj: {
             szNm = Fld1.szNm;
             Tup0[szNm] = Val0;
        } break;
        case C_JKndTup_as_: {    
             XDB0.Coll0[UsrView0.KeyTup] = Val0;
        } break;
        default : {
        } break;
      } /* switch */
    
      $Table.U_Display_Table();
      return;
  }
  else {
      ALERT("Unknown type", 3);
  } /* if */

  $Table.U_Display_Table();       
} /* U_Confirm_V1 */

  return(_Cond);
})(); /* # END - S_DBox_InpVal Object */
  
/*-----F_szHTML_TR_Card --------------------------------------------------------
*
* Edit Card
* Creates an HTML <tr> element for the given Item (field of the record).
*/ 
function F_szHTML_TR_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  // debugger;
  var szVal  = F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly);
  var szNm   = P_Fld1.szNm;
  var szType = P_Fld1.szType;
  var Type0  = $Type.F_asRcd_Type(szType);
  var szType_Out = $Type.F_szType_Out(szType); 
  var szDisabled = (P_fReadOnly)? "disabled": "";
  var szInfo = "";       /* string used to show "type infos" */
  var szRow  = "";
  var szTitle0  = (P_Fld1.szCaption)? P_Fld1.szCaption: "";
      szTitle0 += (P_Fld1.szRem)? P_Fld1.szRem: "";
  var szTitle1 = (Type0[C_jaType_szNote])? Type0[C_jaType_szNote]: "";
  var szId0 = `Id_Card_${P_j}`; 
  
  if (S_fType_Show) {
     szInfo = `<td>${szType}</td>`; 
  } /* if */

  /* Show the input box. */
  switch (szType_Out) {
    case "string": {
          var iSize = 40; // $DEBUG
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${P_j})&nbsp; ${szNm}</label></td><td><input type="text" id="${szId0}" ${szDisabled} value="${szVal}" title="${szTitle1}" size=${iSize}></td>${szInfo}</tr>`;
    } break;
    case "textarea": {
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm} (1)</label></td><td><fieldset><legend>${szNm}</legend><textarea id="Id_Card_${P_j}" rows="5" cols="80">${P_Item}</textarea></fieldset></td>${szInfo}</tr>`; 
    } break;
    case "date" :   
    case "datetime-local" :
    case "datetime" : {
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${P_j})&nbsp; ${szNm}</label></td><td><input type="${szType_Out}" id="${szId0}" ${szDisabled} value="${szVal}" title="${szTitle1}"> <button onclick="${szId0}.value = $TimeDate.F_szDate_Now()">Now!</button> <button onclick="${szId0}.value = ''">Clear</button></td>${szInfo}</tr>`;
    } break;  
    case "color" :
    case "time" :
    case "month" :
    case "week" :
    case "email" :
    case "tel" :
    case "url" : {
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${P_j})&nbsp; ${szNm}</label></td><td><input type="${szType_Out}" id="${szId0}" ${szDisabled} value="${szVal}" title="${szTitle1}"></td>${szInfo}</tr>`; 
    } break;
    case "enum": {
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm}</label></td><td>${szVal}</td> ${szInfo}</tr>`;
    } break;                                                                                                           
    case "set": {                                                                                                      
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm}</label></td><td>${szVal}</td> ${szInfo}</tr>`;
    } break;                                                                                                                                                                                                                       
    case "radio": {                                                                                                    
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm}</label></td><td>${szVal}</td> ${szInfo}</tr>`;
    } break;                                                                                                           
    case "checkbox": {                                                                                                 
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm}</label></td><td>${szVal}</td> ${szInfo}</tr>`;
    } break;                                                                                                           
    case "List": {                                                                                                     
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm}</label></td><td>${szVal}</td> ${szInfo}</tr>`;
    } break;                                                                                                           
    case "range": {                                                                                                   
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm}</label></td><td>${szVal}</td> ${szInfo}</tr>`;
    } break;                                                                                                          
    case "Flag": {                                                                                                   
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm}</label></td><td>${szVal}</td> ${szInfo}</tr>`;
    } break;
    case "HTML" : {
          szRow = `<tr><td width="10%;"><label title="${szTitle0}">${P_j})&nbsp; ${szNm}</label> </td><td><fieldset id="${szId0}" contenteditable="true">${szVal}</fieldset></td>${szInfo}</tr>`;     
    } break;
    case "button" : {
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${szNm}</label></td><td>${szVal}</td> ${szInfo}</tr>`;
    } break;
    case "Image":
    case "Audio":
    case "Video": {
//          if (S_fLoad0 && S_fLoad1) {
          if (S_fLoad0) {
             szRow = `<tr><td><label>${szNm}</label></td><td><input type="text" id="Id_Card_${P_j}" value="${P_Item}" style="width:${S_iWdt_Image}%;" ${szDisabled}> ${szVal}</td>${szInfo}</tr>`;
          }
          else {
             szRow = `<tr><td><label>${szNm}</label></td><td><input type="text" id="Id_Card_${P_j}" value="${P_Item}" style="width:${S_iWdt_Image}%;" ${szDisabled}></td>${szInfo}</tr>`;
          } /* if */
    } break;
    default : {
          szRow = `<tr><td width="10%;"><label for="${szId0}" title="${szTitle0}">${P_j})&nbsp; ${szNm}</label></td><td><input type="text" id="${szId0}" ${szDisabled} value="${szVal}" title="${szTitle1}"></td>${szInfo}</tr>`;
    } break;
  } /* switch */

  U_Prepare_Speech(szNm + " " + szVal + "\n");  

  return(szRow + "\n");
} /* F_szHTML_TR_Card */

/* ----- F_szHTML_TD_Card ---------------------------------------------------------------
*
* Edit Card - $HUB
* 
* The present routine tries to manage problems due to JavaScript weak type-system. For instance:
* - "undefined" values, 
* - numbers represented as numbers or strings of num-chars.
*/
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Sem  = P_Fld1.szType;                                              /* (Semantic) Type Required */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);                                   /* Type-Descriptor corresponding to the (Semantic)Type Required */
  var szType_Out = Type0[C_jaType_szType_Out];                                  /* Type_IO required */
  var szType_Item = typeof(P_Item);                                             /* Type_JS of the argument (P_Item). */
  var szRes;

  if (szType_Item == "undefined") {
     szRes = F_szVal_Undefined("1");                                            /* Manage undefined values. */
     return(szRes);
  } /* if */
      
  if (S_aIOType[szType_Out]) {
      szRes = S_aIOType[szType_Out].F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly);
      return(szRes);
  } /* if */  

  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
* Edit Card - $HUB
* Return values entered setting Card's input elements.
* Called by $aRcd. etc. U_Confirm_Card();
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szType_Usr = P_Fld1.szType;
  var Type0 = $Type.F_asRcd_Type(szType_Usr);    /* Type_JS used to map the Type Required */
  var szType_In = Type0[C_jaType_szType_In];
  var szInput = "%%1234%%";
  
  if (S_aIOType[szType_In]) {
      szInput = S_aIOType[szType_In].F_Val_Inp_Card(P_Fld1, P_j);
      
      if ($Type.F_fChk_Type(szInput, szType_In, P_Fld1)) {                      /* Check the value entered by the User. */
         $Error.U_Error(C_jCd_Cur, 12, "Illegal or out of range value:", szInput, false);
      } /* if */
  } /* if */         

  return(szInput);
} /* F_Val_Inp_Card */

/*-----F_szHTML_Caption ---------------------------------------------------------------
*
* Edit Table
*/
function F_szHTML_Caption(P_Item, P_Fld1)
{  
  var szHTML = "<b style='color:red;'>" + P_Item + "</b>";
  return(szHTML);
} /* F_szHTML_Caption */

/*-----F_szHTML_TD_Table ---------------------------------------------------------------
*
* Edit Table - $HUB
*
* Generate the HTML to display the given Item (field of the record) as a value of the Table.
* $Note data changed will be saved by $Table.U_LM() calling UsrView0.U_SaveChange();
*/
function F_szHTML_TD_Table(P_Item, P_Fld1, P_Tup)
{  
  if (!P_Fld1) {
     $Error.U_Error(C_jCd_Cur, 13, "P_Fld1 NOT Defined", "");
  } /* if */
  
  var fRawData = $VConfig.F_ValSts_Get("fRawData");
  var szHTML;
  
  var szType_Sem = P_Fld1.szType;                 /* User/Semantic Type. */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);     /* Get Type's descriptor */
  var szType_Out = Type0[C_jaType_szType_Out];    /* Type used for Input/Output */

  if (!P_Item && (typeof(P_Item) == "undefined") && (szType_Out != "Flag")) {
      szType_Out = G_szUndefined;
      P_Item = (fRawData)? F_szVal_Undefined("2"): "";
      return(P_Item);
  } /* if */
  if (fRawData) {
     return(P_Item);
  } /* if */
  
  if (S_aIOType[szType_Out]) {
      szHTML = S_aIOType[szType_Out].F_szHTML_TD_Table(P_Item, P_Fld1);
  }
  else {
      /* Unknown type */
      /* We assume that the given value consists of a string and we try to display it anyway! */
      szHTML = P_Item;
  } /* if */
  
  if ($VConfig.F_ValSts_Get("fDiagnostic")) {  
     szHTML = $Type.F_szHTML_Diagnostic(P_Item, P_Fld1);
  } /* if */
  if ($VConfig.F_ValSts_Get("fTypeColor")) {
     szHTML = F_szHTML_TypeColor(szHTML, P_Item, P_Fld1, P_Tup);
  } /* if */
      
 return(szHTML);
} /* F_szHTML_TD_Table */

/*-----F_szHTML_TypeColor --------------------------------------------------------
*
* Highlight data types using different colors.
*/ 
function F_szHTML_TypeColor(P_szHTML, P_Item, P_Fld1, P_Tup)
{
  var szHTML = P_szHTML;
  var szType = typeof(P_Item);
  switch (szType) {
    case "string": {
         szHTML = "<div class='Cl_HL_1'>" + P_szHTML + "</div>";
    } break;
    case "number": {
         szHTML = "<div class='Cl_HL_2'>" + P_szHTML + "</div>";
    } break;
    case "boolean": {
         szHTML = "<div class='Cl_HL_3'>" + P_szHTML + "</div>";
    } break;
    case "object": {
         szHTML = "<div class='Cl_HL_4'>" + P_szHTML + "</div>";
    } break;
    case "function": {
         szHTML = "<div class='Cl_HL_5'>" + P_szHTML + "</div>";
    } break;
    case "bigint": {
         szHTML = "<div class='Cl_HL_6'>" + P_szHTML + "</div>";
    } break;
    case "symbol": {
         szHTML = "<div class='Cl_HL_7'>" + P_szHTML + "</div>";
    } break;
    case "undefined": {
         szHTML = "<div class='Cl_HL_8'>" + P_szHTML + "</div>";
    } break;
    default : {
    } break;
  } /* switch */

  return(szHTML);
} /* F_szHTML_TypeColor */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
* Edit Table - $HUB
* Type conversion.
* Convert the string value entered by the user in the Required Type.
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp, P_jOpt_Confirm=C_jOpt_Confirm_Edit)
{
  var Val0  = P_szInp.replace(/[\r\n]/gm, '');                                  /* Strip away \r \n */
  
  var szType_Sem = P_Fld1.szType;                 /* User/Semantic Type. */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);     /* Get Type's descriptor */
  var szType_In = Type0[C_jaType_szType_In];      /* Type used for Input/Output */
  
  if (S_aIOType[szType_In]) {
     Val0 = S_aIOType[szType_In].F_Val_Inp_Table(szType_In, P_Fld1, Val0);
      
     if ($Type.F_fChk_Type(Val0, szType_In, P_Fld1)) {                          /* Check the value entered by the User. */     
        $Error.U_Warning(C_jCd_Cur, 14, "Illegal value:", Val0, false);
        /* If the value introduced by the user is not valid restore previous value. */
        Val0 = $Table.F_ValPrv_Restore();
     } /* if */
     return(Val0);      
  } /* if */

  return(Val0);
} /* F_Val_Inp_Table */

/*-----F_Val_Mp_Val --------------------------------------------------------
*
*/ 
function F_Val_Mp_Val()
{

} /* F_Val_Mp_Val */


/* ***** CL_IOType *******************************************************
* Root class.
* new CL_IOType
*/ 
class CL_IOType {
  constructor(P_szNm) {
    U_Root0("IOType", P_szNm);
        
    this.U_Open_V1          = U_Null;               /* Single Value */
    this.U_Confirm_V1       = U_Confirm_X;
    this.F_szHTML_TD_Card   = F_szHTML_TD_Card_X;   /* Card */
    this.F_Val_Inp_Card     = F_Val_Inp_Card_X;   
    this.F_szHTML_TD_Table  = F_szHTML_TD_Table_X;  /* Table */
    this.F_Val_Inp_Table    = F_Val_Inp_Table_X;
//    this.F_fChk_Type        = F_fChk_Type_X;        /* Check type. */
    this.F_Val_Mp_Val       = F_Val_Mp_Val_X;       /* Convert in the type required */
    
/*-----U_Confirm_X --------------------------------------------------------
*
*/ 
function U_Confirm_X()
{
  return(Id_xKrW98717_a.value);
} /* U_Confirm_X */

/*-----F_szHTML_TD_Card_X --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card_X(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  return(P_Item);
} /* F_szHTML_TD_Card_X */

/*-----F_Val_Inp_Card_X --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card_X(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  return(szInput);
} /* F_Val_Inp_Card_X */

/*-----F_szHTML_TD_Table_X --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table_X(P_Item, P_Fld1)
{
  if (!P_Item) {
     switch (typeof(P_Item)) {
       case "undefined": {
             var szItem = F_szVal_Undefined("3");
             return(szItem);
       } break;
       case "object": {
            if (P_Item === null) {
               return("null");
            } /* if */
       } break;
       case "string" : {      
       } break;
       default : {
       } break;
     } /* switch */
  } /* if */

  return(P_Item); 
} /* F_szHTML_TD_Table_X */

/*-----F_Val_Inp_Table_X --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table_X(P_szTypeDst, P_Fld1, P_szInp)
{
  return(P_szInp);
} /* F_Val_Inp_Table_X */

// /*-----F_fChk_Type_X --------------------------------------------------------
// *
// */ 
// function F_fChk_Type_X(P_Item, P_Fld1)
// {
//   let Type0 = $Type.F_asRcd_Type_JS(P_Fld1.szType);
//   
//   ALERT("Check",1);
// //   let szTypeJS_Req = Type0[C_jaType_szType_JS]; 
// //   if (typeof(P_Val) != szTypeJS_Req) {
// //   
// } /* F_fChk_Type_X */

/*-----F_Val_Mp_Val_X --------------------------------------------------------
*
*/ 
function F_Val_Mp_Val_X()
{

} /* F_Val_Mp_Val_X */


  } /* constructor */
}  /* class CL_IOType */

/* ***** CL_Number *******************************************************
*
*/ 
class CL_Number extends CL_IOType {
  constructor() {    

    super("CL_Number"); /* new CL_IOType() */  
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;   
    this.F_Val_Inp_Table = F_Val_Inp_Table;
       
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0  = +P_Val0;
   var fInt  = (Val0 - Math.trunc(Val0) == 0);     /* Val0 is an Integer or a Float? */
   
   if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           szTmp += ("Min"  in Aux0)? `min=${Aux0.Min} `: ""; 
           szTmp += ("Max"  in Aux0)? `max=${Aux0.Max} `: ""; 
           szTmp += ("Step" in Aux0)? `step=${Aux0.Step} `: "";
       } /* if */ 
   } /* if */

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${szTmp} ${P_szDisabled} type="text" value="${Val0}" onchange="$Value.U_Chg_Num(Id_xKrW98717_a.value);">`;
   var szDiv0 = (fInt)? `dec = ${Val0}<br>hex = 0x${Val0.toString(16)}<br>oct = 0o${Val0.toString(8)}<br>bin = 0b${Val0.toString(2)}<br>Exp = ${Val0.toExponential()}`: `dec = ${Val0}<br>Exp = ${Val0.toExponential()}`;
   szHTML += `<br><br><div id="Id_xKrW98717_b">${szDiv0}</div>`;
   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(+Id_xKrW98717_a.value);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Item = typeof(P_Item);                                             /* Type_JS of the argument (P_Item). */
  var szRes = P_Item;

  switch (szType_Item) {
    case "number":
    case "bigint": {
    } break;
    case "string": {
         if ((P_Item == " ") || (P_Item == "")) {
             /* Value not available */
             szRes = "";            
         }
         else {
             szRes = +P_Item;
         } /* if */
    } break;
    case "boolean": {
          szRes = (P_Item)? 1: 0;
    } break;
  } /* switch */

  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  return(+szInput);
} /* F_Val_Inp_Card */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szType = typeof(P_szInp);   /* Type of the Source */
  var Val1   = P_szInp;
                   
  if (szType != "number") {
     /* Was expected a number. */
     if (szType == "string") {
        if (P_szInp != "") {
           Val1 = +P_szInp;
        }
        else {
           Val1 = C_Undefined;
        } /* if */  
     } else if (szType == "boolean") {
        Val1 = (P_szInp == false) ? 0 : 1;
     } /* if */
  } /* if */

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_Number */

/* ***** CL_String *******************************************************
*
*/ 
class CL_String extends CL_IOType {
  constructor() {    

    super("CL_String"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card
//    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;
  
   if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           szTmp += ("Min" in Aux0)? `min=${Aux0.Min} `: ""; 
           szTmp += ("Max" in Aux0)? `max=${Aux0.Max} `: ""; 
       } /* if */ 
   } /* if */

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="text" value="${Val0}" ${szTmp}> <button onclick="Id_xKrW98717_a.value = '';">Clear String</button>`;  
   return(szHTML);  
} /* U_Open_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Item = typeof(P_Item);       /* Type_JS of the argument (P_Item). */
  var szRes = P_Item;
  switch (szType_Item) {
    case "string": {
          szRes = P_Item.substr(0, 80);  /* Return the firsts 80 chars of the string. */
    } break;
    case "number":
    case "bigint": {
          szRes = "" + P_Item;
    } break;
    case "boolean": {
          szRes = (P_Item)? "true": "false";
    } break;
    case "function": {
          /* Get the name of the function. */
          var szTmp = "" + P_Item;
          szRes = szTmp.substr(0, szTmp.indexOf(')') +1);
    } break;
  } /* switch */
  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szType = typeof(P_szInp);   /* Type of the Source */
  var Val1 = P_szInp;
                   
  if (szType != "string") {
     /* Was expected a string. */
     if (szType == "number") {
        Val1 = "" + P_szInp;
     } else if (szType == "boolean") {
        Val1 = (P_szInp == false) ? "false" : "true";
     } /* if */   
  } /* if */

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_String */

/* ***** CL_Boolean *******************************************************
*
*/ 
class CL_Boolean extends CL_IOType {
  constructor() {    

    super("CL_Boolean"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;   
    this.F_Val_Inp_Table = F_Val_Inp_Table;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0  = F_f_Mp_Val(P_Val0);
   var szChk = (Val0)? "checked=true": "";
   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="checkbox" ${szChk}>`;    
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  var Val0 = Id_xKrW98717_a.checked;
  Val0 = F_f_Mp_Val(Val0);
  return(Val0);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szRes = F_f_Mp_Val(P_Item);
  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  var Val1 = szInput;

  var szType = typeof(szInput);   /* Type of the Source */
                   
  if (szType != "boolean") {
     /* Was expected a boolean. */
     if (szType == "number") {
        Val1 = (szInput != 0);
     } else if (szType == "string") {
        if (Val1 != "") {                
           Val1 = (szInput == "false") ? false : true;
        }
        else {
           Val1 = C_Undefined;
        } /* if */
     } /* if */ 
  } /* if */

  return(Val1);
} /* F_Val_Inp_Card */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szType = typeof(P_szInp);   /* Type of the Source */
  var Val1 = P_szInp;
                   
  if (szType != "boolean") {
     /* Was expected a boolean. */
     if (szType == "number") {
        Val1 = (P_szInp != 0);
     } else if (szType == "string") {
        if (Val1 != "") {                
           Val1 = (P_szInp == "false") ? false : true;
        }
        else {
           Val1 = C_Undefined;
        } /* if */
     } /* if */ 
  } /* if */

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_Boolean */

/* ***** CL_Function *******************************************************
*
*/ 
class CL_Function extends CL_IOType {
  constructor() {    

    super("CL_Function"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aObj0 = XDB0.Coll0;
  
  var szFn = window[P_Fld1.szNm];
   
  /* 'disabled' because functions modifications is not allowed! */
  var szHTML = `<fieldset disabled><legend>${P_Fld1.szNm} = </legend> ${P_Val0}</fieldset>`;    
  return(szHTML);  
} /* U_Open_V1 */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/     
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szTmp = "" + P_Item;
  var iLen = szTmp.indexOf(')');

  szTmp = (iLen >= 0)? szTmp.substr(0, iLen +1): "<span class='Cl_Error'>ERROR was expected a Function</span>";
  return(szTmp);
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Function */

/* ***** CL_Object *******************************************************
*
*/ 
class CL_Object extends CL_IOType {
  constructor() {    

    super("CL_Object"); /* new CL_IOType() */  
    this.U_Open_V1 = U_Open_V1;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;

/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = "";
   var szHTML;

   try {
       /* Object modifications is not allowed! */
       var szObj = F_szPrettyObj(Val0);
       szHTML = `<fieldset disabled> <legend>${szNm}(2)</legend><textarea id="Id_xKrW98717_a" rows="20" cols="100">${szObj}</textarea></fieldset>`;              
   } catch (P_Err) {
       szHTML = "<b style='color:red;'>Sorry this Object cannot be represented!</b>";
   } /* try catch */     
   return(szHTML);  
} /* U_Open_V1 */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  if ((S_szPlane != -1) && (S_szPlane !== "")) {
     try {
         var szRes = "";
         if (typeof(P_Item[S_szPlane]) != "undefined") {
            szRes = P_Item[S_szPlane];
         }
         else {
            szRes = "Field undefined";
         } /* if */   
         return(szRes);
     } catch (P_Err) {
         return("[object]");
     } /* try catch */
  }
  else {
     return("[object]");
  } /* if */
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Object */

/* ***** CL_Symbol *******************************************************
*
*/ 
class CL_Symbol extends CL_IOType {
  constructor() {    

    super("CL_Symbol"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_szHTML_TD_Table  = F_szHTML_TD_Table;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var szTmp = P_Val0.toString();
   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" P_szDisabled type="text" value=${szTmp}>`;   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{ /* Symbols cannot be modified! */
  return(null);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szRes = P_Item.toString();
  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szItem = P_Item.toString();
  return(szItem);
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Symbol */


/* ***** CL_BigInt *******************************************************
*
*/ 
class CL_BigInt extends CL_IOType {
  constructor() {    

    super("CL_BigInt"); /* new CL_IOType() */  
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;   
    this.F_Val_Inp_Table = F_Val_Inp_Table;
       
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0  = F_BigInt_Mp_Val(P_Val0);
   
   if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           szTmp += ("Min"  in Aux0)? `min=${Aux0.Min} `: ""; 
           szTmp += ("Max"  in Aux0)? `max=${Aux0.Max} `: ""; 
           szTmp += ("Step" in Aux0)? `step=${Aux0.Step} `: "";
       } /* if */ 
   } /* if */

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${szTmp} ${P_szDisabled} type="text" value="${Val0}" onchange="$Value.U_Chg_Num(Id_xKrW98717_a.value);">`;
   var szDiv0 = `dec = ${Val0}<br>hex = 0x${Val0.toString(16)}<br>oct = 0o${Val0.toString(8)}<br>bin = 0b${Val0.toString(2)}}`;
   szHTML += `<br><br><div id="Id_xKrW98717_b">${szDiv0}</div>`;
   
   return(szHTML);  
} /* U_Open_V1 */

/*-----F_BigInt_Mp_Val --------------------------------------------------------
*
*/ 
function F_BigInt_Mp_Val(P_Val)
{
  if (typeof(P_Val) == "string") {
     if (P_Val[P_Val.length -1] == 'n') {
        P_Val = P_Val.substr(0, P_Val.length -1);
     } /* if */
  } /* if */
  
  P_Val = BigInt(P_Val);
  return(P_Val);
} /* F_BigInt_Mp_Val */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  var Val0  = F_BigInt_Mp_Val(Id_xKrW98717_a.value);
  return(Val0);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Item = typeof(P_Item);                                             /* Type_JS of the argument (P_Item). */
  var szRes = P_Item;

  switch (szType_Item) {
    case "number":
    case "bigint": {
    } break;
    case "string": {
         if ((P_Item == " ") || (P_Item == "")) {
             /* Value not available. */
             szRes = "";            
         }
         else {
             szRes = F_BigInt_Mp_Val(P_Item);
         } /* if */
    } break;
    case "boolean": {
          szRes = (P_Item)? 1: 0;
    } break;
  } /* switch */

  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  return(+szInput);
} /* F_Val_Inp_Card */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szType = typeof(P_szInp);   /* Type of the Source */
  var Val1   = P_szInp;
                   
  if (szType != "number") {
     /* Was expected a number. */
     if (szType == "string") {
        if (P_szInp != "") {
           Val1 = F_BigInt_Mp_Val(P_szInp);
        }
        else {
           Val1 = C_Undefined;
        } /* if */  
     } else if (szType == "boolean") {
        Val1 = (P_szInp == false) ? 0 : 1;
     } /* if */
  } /* if */

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_BigInt */

/* ***** CL_Undefined *******************************************************
*
*/ 
class CL_Undefined extends CL_IOType {
  constructor() {    

    super("CL_Undefined"); /* new CL_IOType() */   
    this.U_Open_V1         = U_Open_V1;
    this.U_Confirm_V1      = U_Confirm_V1;
    this.F_szHTML_TD_Card  = F_szHTML_TD_Card;
    this.F_Val_Inp_Card    = F_Val_Inp_Card;   
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table   = F_Val_Inp_Table;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var szHTML = `<fieldset><legend>${szNm} = </legend>undefined</fieldset>`;   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(C_Undefined);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szRes = F_szVal_Undefined("4")
  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card_X --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card_X(P_j, P_Fld1)
{
  return(C_Undefined);
} /* F_Val_Inp_Card_X */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  return(C_Undefined); 
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table_X --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table_X(P_szTypeDst, P_Fld1, P_szInp)
{
  return(C_Undefined);
} /* F_Val_Inp_Table_X */

  } /* constructor */
}  /* class CL_Undefined */

/* ***** CL_Range *******************************************************
*
*/ 
class CL_Range extends CL_IOType {
  constructor() {      

    super("CL_Range"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
   var szHTML = +P_Item;
   return(szHTML); 
} /* F_szHTML_TD_Table */

/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = +P_Val0;
   var szId_a = "Id_xKrW98717_a" + szNm;
   var szId_b = "Id_xKrW98717_b" + szNm;

    if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           var szMin  = ("Min"  in Aux0)? `min=${Aux0.Min} `: "";
           var szMax  = ("Max"  in Aux0)? `min=${Aux0.Max} `: "";
           var szStep = ("Step" in Aux0)? `min=${Aux0.Step} `: "";
           szTmp +=  szMin + szMax + szStep + " " + P_szDisabled + " ";
       } /* if */ 
   } /* if */

   var szHTML = `<label for="${szId_a}" = </label> <input id="${szId_a}" ${szTmp} type="number" value="${Val0}" onchange="${szId_b}.value = ${szId_a}.value;"> 
                                                   <input id="${szId_b}" ${szTmp} type="range"  value="${Val0}" onchange="${szId_a}.value = ${szId_b}.value;">`;   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1(P_szNm)
{
  var Val0  = + document.getElementById("Id_xKrW98717_a" + P_szNm).value;
  return(Val0);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szTmp = "";
  if (P_Fld1.Aux0) {
     var Aux0 = P_Fld1.Aux0;
     if (typeof(Aux0.iMin) != "undefined") {
        szTmp += " min=" + Aux0.iMin;
     } /* if */
     if (typeof(Aux0.iMax) != "undefined") {
        szTmp += " max=" + Aux0.iMax;
     } /* if */
     if (Aux0.iStep) {
        szTmp += " step=" + Aux0.iStep;
     } /* if */
  } /* if */
  var szId = `Id_Card_${P_j}`;
  var szType_Sem  = P_Fld1.szType;                                              /* (Semantic) Type Required */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);                                   /* Type-Descriptor corresponding to the (Semantic)Type Required */
  var szTitle0 = (P_Fld1.szRem)? P_Fld1.szRem: "";
  var szTitle1 = (Type0[C_jaType_szNote])? Type0[C_jaType_szNote]: "";
  var szDisabled = (P_fReadOnly)? "disabled": "";           
  var szHTML = ` 
            <input id="${szId}" ${szTmp} type="number"  ${szDisabled} value="${P_Item}" onchange="${szId}_b.value = ${szId}.value;" title="${szTitle1}"> 
            <input id="${szId}_b" ${szTmp} type="range"  ${szDisabled}  value="${P_Item}" onchange="${szId}.value = ${szId}_b.value;" title="${szTitle1}">`;
  return(szHTML);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szTmp = "";
  if (P_Fld1.Aux0) {
     var Aux0 = P_Fld1.Aux0;
     if (typeof(Aux0.iMin) != "undefined") {
        szTmp += " min=" + Aux0.iMin;
     } /* if */
     if (typeof(Aux0.iMax) != "undefined") {
        szTmp += " max=" + Aux0.iMax;
     } /* if */
     if (Aux0.iStep) {
        szTmp += " step=" + Aux0.iStep;
     } /* if */
  } /* if */
  var szId = `Id_Card_${P_Fld1.szNm}`;
  var szType_Sem  = P_Fld1.szType;                                              /* (Semantic) Type Required */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);                                   /* Type-Descriptor corresponding to the (Semantic)Type Required */
  var szTitle0 = (P_Fld1.szRem)? P_Fld1.szRem: "";
  var szTitle1 = (Type0[C_jaType_szNote])? Type0[C_jaType_szNote]: "";          
  var szHTML = ` 
            <input id="${szId}" ${szTmp}   type="number" value="${P_Item}" onchange="$Value.U_Sync(this, false);" title="${szTitle1}">
            <input id="${szId}_b" ${szTmp} type="range"  value="${P_Item}" onchange="$Value.U_Sync(this, true);"  title="${szTitle1}">`;
  return(szHTML);
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ElemPrv = UsrView0.ElemPrv;
  var childNode = ElemPrv.childNodes[1];  /* 1 = one */
  var Val0 = childNode.value;
  return(Val0);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_Range */

/* ***** CL_Color *******************************************************
*
*/ 
class CL_Color extends CL_IOType {
  constructor() {    

    super("CL_Color"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="color" value="${Val0}" onchange="Id_xKrW98717_b.value = Id_xKrW98717_a.value;">
                 <label for="Id_xKrW98717_b">${szNm} = </label> <input id="Id_xKrW98717_b" ${P_szDisabled} type="text"  value="${Val0}" onchange="Id_xKrW98717_a.value = Id_xKrW98717_b.value;">
                 <button onclick="Id_xKrW98717_a.value = Id_xKrW98717_b.value;">SET</button>`;     
   return(szHTML);  
} /* U_Open_V1 */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
   var szHTML = ($Value.F_fLoad1())? `<ClrSmpl style="background-color:${P_Item};">&nbsp;</ClrSmpl> ` + P_Item: P_Item;

   return(szHTML); 
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Color */

/* ***** CL_EMail *******************************************************
*
*/ 
class CL_EMail extends CL_IOType {
  constructor() {     

    super("CL_EMail"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="email" value="${Val0}" onchange="$Value.U_Chg_EMail(Id_xKrW98717_a.value);"><br><br>Send mail to: <a id="Id_xKrW98717_b" href="mailto:${Val0}">${Val0}</a>`;
   szHTML +=  "<br><brNote: Click on link to open the email client.";
   return(szHTML);  
} /* U_Open_V1 */

  } /* constructor */
}  /* class CL_EMail */

/* ***** CL_Tel *******************************************************
*
*/ 
class CL_Tel extends CL_IOType {
  constructor() {     

    super("CL_Tel"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;
 
   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="tel" value="${Val0}" onchange="$Value.U_Chg_Tel(Id_xKrW98717_a.value);"><br><br>Call Tel: <a id="Id_xKrW98717_b" href="tel:${Val0}">${Val0}</a><br><br>Send SMS: <a id="Id_xKrW98717_c" href="sms:${Val0}">${Val0}</a>`; 
   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      szHTML += `<br><br>Note: click the link to call the given telephone number or send a SMS`;            
   }
   else {
      szHTML += `<br><br>Note: sorry you cannot call automatically the phone number because this device is not a mobile.`;
   } /* if */
   return(szHTML);  
} /* U_Open_V1 */

  } /* constructor */
}  /* class CL_Tel */

/* ***** CL_TextArea *******************************************************
*  +++ Prova3 Diario
*/ 
class CL_TextArea extends CL_IOType {
  constructor() {    

    super("CL_TextArea"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;

  /* $NOTE: textarea is not an HTML <input> type, but we manage it as it was! */
  /* $NOTE: spellcheck requires HTTPS */
   var szHTML = `<fieldset> <legend>${szNm}(3)</legend><textarea id="Id_xKrW98717_a" rows="20" cols="100" spellcheck="true">${P_Val0}</textarea></fieldset>`;
   return(szHTML);  
} /* U_Open_V1 */

  } /* constructor */
}  /* class CL_TextArea */

/* ***** CL_Date *******************************************************
*
*/ 
class CL_Date extends CL_IOType {
  constructor() {    

    super("CL_Date"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;
  
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;
      
   let a_sz_jDate = ["YYYYMMDD", "MMDDYYYY", "DDMMYYYY"];
   S_szDate0 = Val0;
   
   var szDiv0 = F_szHTML_Date(S_szjDate, S_szDate0, "date");

   var szHTML = `<div id ="Id_xKrW98717_Date">${szDiv0}</div><br><br>
                 <label for="Id_xKrW98717_b">Date Format = </label>
                 <select name="Nm_xKrW98717_b" id="Id_xKrW98717_b" onchange="$Value.U_Upd_jDate1(Id_xKrW98717_b.value);">`;
   for (let i = 0; i < 3; i++) {
       let sz_jDate = a_sz_jDate[i];
       if (sz_jDate == S_szjDate) {
          szHTML += `<option value="${sz_jDate}" selected>${sz_jDate}</option>`;
       }
       else {
          szHTML += `<option value="${sz_jDate}">${sz_jDate}</option>`;
       } /* if */                  
   } /* for */           
   szHTML += `</select>`; 
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(Id_xKrW98717_a.value);
} /* U_Confirm_V1*/
 
/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szHTML;
  var szType_Item = typeof(P_Item);

  if (!P_Item) {     /* Filter QBE */
     return("");
  } /* if */

  switch (szType_Item) {
    case "date": {
    } break;
    case "string": {
          P_Item = $TimeDate.F_szDate_Mp_szYMD(P_Item);
    } break;
    case "bigint": {
          P_Item = Number(P_Item);
    }
    case "number": {
          /* $ASSUME: it's a timestamp */
          P_Item = F_szDate_Mp_ims_Sec70(P_Item);
    } break;
  } /* switch */

  szHTML = P_Item;
  return(szHTML);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  var szItem = $TimeDate.F_szYMD_Mp_szDate(szInput, S_szjDate);
  return(szItem);
} /* F_Val_Inp_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szItem;
  if (P_Item) {
     szItem = $TimeDate.F_szDate_Mp_szYMD(P_Item, S_szjDate);
  }
  else {
     szItem = F_szVal_Undefined("5");   
  } /* if */ 
  return(szItem);
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szItem = $TimeDate.F_szYMD_Mp_szDate(P_szInp, S_szjDate);
  return(szItem);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_Date */

/* ***** CL_DateTime *******************************************************
*
* https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats
* "1969-07-20T20:17:40.00-08:00"
* 2005-06-07T00:00Z
* 1789-08-22T12:30:00.1-04:00
* 3755-01-01 00:00+10:00
*/ 
class CL_DateTime extends CL_IOType {
  constructor() {    

    super("CL_DateTime"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;
  
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;
      
   let a_sz_jDate = ["YYYYMMDD", "MMDDYYYY", "DDMMYYYY"];
   S_szDate0 = Val0;
 
   var szDiv0 = F_szHTML_Date(S_szjDate, S_szDate0, "datetime");

   var szHTML = `<div id ="Id_xKrW98717_Date">${szDiv0}</div><br><br>
                 <label for="Id_xKrW98717_b">Date Format = </label>
                 <select name="Nm_xKrW98717_b" id="Id_xKrW98717_b" onchange="$Value.U_Upd_jDate1(Id_xKrW98717_b.value);">`;
   for (let i = 0; i < 3; i++) {
       let sz_jDate = a_sz_jDate[i];
       if (sz_jDate == S_szjDate) {
          szHTML += `<option value="${sz_jDate}" selected>${sz_jDate}</option>`;
       }
       else {
          szHTML += `<option value="${sz_jDate}">${sz_jDate}</option>`;
       } /* if */                  
   } /* for */           
   szHTML += `</select>`; 
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(Id_xKrW98717_a.value);
} /* U_Confirm_V1*/
 
/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szItem;
  var szType_Item = typeof(P_Item);
  var iPos;
  var szTmp;
  var szDate;
  var szTime;
  var szTZ = "";

  if (!P_Item) {     /* Filter QBE */
     return("");
  } /* if */
  
  // ++++ $DEBUG szTime - estraiamo 5 caratteri temporaneamente!!!!

  switch (szType_Item) {
    case "date": {
    } break;
    case "string": {
    } break;
    case "bigint": {
          P_Item = Number(P_Item);
    }
    case "number": {
          /* $ASSUME: it's a timestamp */
          P_Item = F_szDate_Mp_ims_Sec70(P_Item);
    } break;
  } /* switch */
  
  szDate = P_Item.substr(0, 10);
  szTmp  = P_Item.substr(11);
  
  if ((iPos = szTmp.indexOf("Z")) > 0) {
     /* UTC */
     szTime = szTmp.substr(0, 5);
     szTZ = "UTC"
  }
  else {
      if ((iPos = szTmp.indexOf("+")) > 0) {
         szTime = szTmp.substr(0, 5);
         szTZ   = szTmp.substr(iPos);
      } 
      else if ((iPos = szTmp.indexOf("-")) > 0) {
         szTime = szTmp.substr(0, 5);
         szTZ   = szTmp.substr(iPos);
      }
      else {     
         $Error.U_Warning(C_jCd_Cur, 15, "Was experted a Time Zone", "");
      } /* if */
  } /* if */ 
  
  var szItem = $TimeDate.F_szDate_Mp_szYMD(szDate, S_szjDate);
  return(szItem + " " + szTime + " " + szTZ);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  var szItem = $TimeDate.F_szYMD_Mp_szDate(szInput, S_szjDate);
  return(szItem);
} /* F_Val_Inp_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
* 
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szItem;
  var szType_Item = typeof(P_Item);
  var iPos;
  var szTmp;
  var szDate;
  var szTime;
  var szTZ = "";

  if (!P_Item) {
     var szRes = F_szVal_Undefined("6")
     return(szRes);
  } /* if */
    
  // ++++ szTime - estraiamo 5 caratteri temporaneamente!!!!

  switch (szType_Item) {
    case "date": {
    } break;
    case "string": {
    } break;
    case "bigint": {
          P_Item = Number(P_Item);
    }
    case "number": {
          /* $ASSUME: it's a timestamp */
          P_Item = F_szDate_Mp_ims_Sec70(P_Item);
    } break;
  } /* switch */
  
  szDate = P_Item.substr(0, 10);
  szTmp  = P_Item.substr(11);
  
  if ((iPos = szTmp.indexOf("Z")) > 0) {
     /* UTC */
     szTime = szTmp.substr(0, 5);
     szTZ = "UTC"
  }
  else {
      if ((iPos = szTmp.indexOf("+")) > 0) {
         szTime = szTmp.substr(0, 5);
         szTZ   = szTmp.substr(iPos);
      } 
      else if ((iPos = szTmp.indexOf("-")) > 0) {
         szTime = szTmp.substr(0, 5);
         szTZ   = szTmp.substr(iPos);
      }
      else {     
         $Error.U_Warning(C_jCd_Cur, 16, "Was experted a Time Zone", "");
      } /* if */
  } /* if */ 
  
  var szItem = $TimeDate.F_szDate_Mp_szYMD(szDate, S_szjDate);
  return(szItem + " " + szTime + " " + szTZ);
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var aTX = {
    "Z":"0",
    "BEST":"-11:00",
    "HST":"-10:00",
    "AKST":"-09:00",
    "PSR":"-08:00",
    "MST":"-07:00",
    "CST":"-06:00",
    "EST":"-05:00",
    "AST":"-04:00",
    "NST":"-03:30",
    "UTC":"+00:00",
    "WET":"+00:00",
    "CET":"+01:00",
    "EET":"+02:00",
    "MSK":"+03:00",
    "IST":"+05:30",
    "AWST":"+08:00",
    "ACST":"+09:30",
    "AEST":"+10:00"    
  };
  
  var asz0 = P_szInp.split(" ");
  var szItem = $TimeDate.F_szYMD_Mp_szDate(asz0[0], S_szjDate);  
  szItem += "T" + asz0[1];
  if ((asz0[2][0] == '+') || (asz0[2][0] == '-')) {
     szItem += asz0[2];  
  }
  else {
     szItem += "+" + asz0[2];    
  } /* if */
  return(szItem);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_DateTime */

/* ***** CL_DateTimeLocal *******************************************************
*
* "1970-01-01T00:00"
* "1970-01-01T00:00:00"
* "1970-01-01T00:00:00.000"                                                                                                                 n
*/ 
class CL_DateTimeLocal extends CL_IOType {
  constructor() {    

    super("CL_DateTimeLocal"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;
  
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;
      
   let a_sz_jDate = ["YYYYMMDD", "MMDDYYYY", "DDMMYYYY"];
   S_szDate0 = Val0;

   var szDiv0 = F_szHTML_Date(S_szjDate, S_szDate0, "datetime-local");

   var szHTML = `<div id ="Id_xKrW98717_Date">${szDiv0}</div><br><br>
                 <label for="Id_xKrW98717_b">Date Format = </label>
                 <select name="Nm_xKrW98717_b" id="Id_xKrW98717_b" onchange="$Value.U_Upd_jDate1(Id_xKrW98717_b.value);">`;
   for (let i = 0; i < 3; i++) {
       let sz_jDate = a_sz_jDate[i];
       if (sz_jDate == S_szjDate) {
          szHTML += `<option value="${sz_jDate}" selected>${sz_jDate}</option>`;
       }
       else {
          szHTML += `<option value="${sz_jDate}">${sz_jDate}</option>`;
       } /* if */                  
   } /* for */           
   szHTML += `</select>`; 
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(Id_xKrW98717_a.value);
} /* U_Confirm_V1*/

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szItem;
  var szType_Item = typeof(P_Item);
  var szDate;
  var szTime;

  if (!P_Item) {     /* Filter QBE */
     return("");
  } /* if */

  switch (szType_Item) {
    case "date": {
    } break;
    case "string": {
    } break;
    case "bigint": {
          P_Item = Number(P_Item);
    }
    case "number": {
          /* $ASSUME: it's a timestamp */
          P_Item = F_Date_Mp_ims_Sec70(P_Item);
    } break;
  } /* switch */
  
  szDate = P_Item.substr(0, 10);
  szTime = P_Item.substr(11);
  
  var szItem = $TimeDate.F_szDate_Mp_szYMD(szDate, S_szjDate);
  return(szItem + " " + szTime);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  var szItem = $TimeDate.F_szYMD_Mp_szDate(szInput, S_szjDate);    // ++++
  return(szItem);
} /* F_Val_Inp_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
* 2018-06-12T19:30
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  if (!P_Item) {
     var szRes = F_szVal_Undefined("7")
     return(szRes);
  } /* if */
 
  var Date0 = P_Item.substr(0, 10);
  var Time0 = P_Item.substr(11, 8);
  
  var szItem = $TimeDate.F_szDate_Mp_szYMD(Date0, S_szjDate);
  
  return(szItem + " " + Time0);
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{  
  var asz0 = P_szInp.split(" ");
  var szItem = $TimeDate.F_szYMD_Mp_szDate(asz0[0], S_szjDate);  
  szItem += "T" + asz0[1];
  return(szItem);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_DateTimeLocal */

/* ***** CL_Time *******************************************************
*
*/ 
class CL_Time extends CL_IOType {
  constructor() {
    super("CL_Time"); /* new CL_IOType() */  
    this.U_Open_V1 = U_Open_V1;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="time" value="${Val0}">`;    
   return(szHTML);  
} /* U_Open_V1 */

  } /* constructor */
}  /* class CL_Time */

/* ***** CL_Month *******************************************************
*
*/ 
class CL_Month extends CL_IOType {
  constructor() {
    super("CL_Month"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="month" value="${Val0}">`;    
   return(szHTML);  
} /* U_Open_V1 */

  } /* constructor */
}  /* class CL_Month */

/* ***** CL_Week *******************************************************
*
*/ 
class CL_Week extends CL_IOType {
  constructor() {
    super("CL_Week"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0 = P_Val0;

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="week" value="${Val0}">`;    
   return(szHTML);  
} /* U_Open_V1 */

  } /* constructor */
}  /* class CL_Week */             
             
/* ***** CL_TimeStamp *******************************************************
*
*/ 
class CL_TimeStamp extends CL_IOType {
  constructor() {
    super("CL_TimeStamp"); /* new CL_IOType() */
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szHTML = "";
   var szNm = P_Fld1.szNm;
   var Val0 = P_Val0;

   let ims_Sec70 = +Val0;
   var Date0 = $TimeDate.F_Date_Mp_ims_Sec70(ims_Sec70);
  
   let iYear = Date0.getFullYear();
   let iMonth = Date0.getMonth() +C_iDe_Month;
   let iDay = Date0.getDate();
   let jWDay = Date0.getDay();
  
   let iHour = Date0.getHours();
   let iMinutes = Date0.getMinutes();
   let iSeconds = Date0.getSeconds();
   let imSec = Date0.getMilliseconds();
   
   let szDate = $TimeDate.F_szDate_Make(iYear, iMonth, iDay, iHour, iMinutes, iSeconds, imSec, 0, "datetime-local");

  var szTime = `
  <label for="Id_xKrW98717_TS">TimeStamp = </label> <input id="Id_xKrW98717_TS" type="number" value=${ims_Sec70} onchange="$Value.U_Show_ims_Sec70(Id_xKrW98717_TS.value);">
  <label for="Id_xKrW98717_Date">Date  = </label> <input id="Id_xKrW98717_Date" type="datetime-local" value=${szDate} size=20>
  <button onclick="var ims_Sec70 = $TimeDate.F_ims_Sec70_Now(); $Value.U_Show_ims_Sec70(ims_Sec70);">NOW</button> <br>
  <label for="Id_xKrW98717_YYYY">Year = </label> <input id="Id_xKrW98717_YYYY" type="number" value=${iYear} onchange="$Value.U_Make_Date();"><br>
  <label for="Id_xKrW98717_MM">Month = </label> <input id="Id_xKrW98717_MM" type="number" min=1 max=12 value=${iMonth} onchange="$Value.U_Make_Date();"><br>
  <label for="Id_xKrW98717_DD">Day = </label> <input id="Id_xKrW98717_DD" type="number" min=1 max=31 value=${iDay} onchange="$Value.U_Make_Date();"><br>
  <label for="Id_xKrW98717_hh">Hour = </label> <input id="Id_xKrW98717_hh" type="number" min=0 max=23 value=${iHour} onchange="$Value.U_Make_Date();"><br>
  <label for="Id_xKrW98717_mm">Min  = </label> <input id="Id_xKrW98717_mm" type="number" min=0 max=59 value=${iMinutes} onchange="$Value.U_Make_Date();"><br>
  <label for="Id_xKrW98717_ss">Sec  = </label> <input id="Id_xKrW98717_ss" type="number" min=0 max=60 value=${iSeconds} onchange="$Value.U_Make_Date();"><br>
  <label for="Id_xKrW98717_ms">mSec  = </label> <input id="Id_xKrW98717_ms" type="number" min=0 max=60 value=${imSec} readonly><br>
  <label for="Id_xKrW98717_WD">WDay  = </label> <input id="Id_xKrW98717_WD" type="text" min=0 max=7 value=${F_szWDay_Mp_jWDay(jWDay)}  readonly>`;     /* 60s becouse second added in leap years */

   szHTML = szTime;  
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(Id_xKrW98717_TS.value);
} /* U_Confirm_V1 */

  } /* constructor */
}  /* class CL_TimeStamp */
      
/* ***** CL_Image *******************************************************
*
*/ 
class CL_Image extends CL_IOType {
  constructor() {
    super("CL_Image"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;

/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm = P_Fld1.szNm;
   var Val0 = (!S_fLoad1)? P_Val0: P_Val0.replace("file:///", S_szURL_Local);

   var szHTML = `<img id="Id_xKrW98717_a" src=${Val0} width="100%" alt="" style="width:80%;"><br><br>
                 ${szNm} = <input id="Id_xKrW98717_b" ${P_szDisabled} type="text" value=${Val0} size="80" onchange="Id_xKrW98717_a.src = Id_xKrW98717_b.value;"> <button onclick="$Value.U_Grab();">Grab photo.</button>`;
    
   return(szHTML);  
} /* U_Open_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szItem = P_Item.replace("file:///", S_szURL_Local);
  var szRes = `<img alt="" src="${szItem}" title="${P_Item}" style="width:100px;">`; 
  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/
function F_szHTML_TD_Table(P_Item, P_Fld1)
{         
  var szHTML = P_Item;
  if (!P_Item) {
     return("");
  } /* if */
  if (S_fLoad1 || S_fLoad2) {
      if (P_Item.indexOf("DeskTop.OLS") >= 0) {
         debugger;
      } /* if */
      var szItem = P_Item.replace("file:///", S_szURL_Local);
      if (S_fCaption) {
          szHTML = `${P_Fld1.szNm} = "${P_Item}" <img alt="" src="${szItem}" title="${P_Item}" style="width:${S_iWdt_Image}%;">`;
      }
      else {
          szHTML = `<img alt="" src="${szItem}" title="${P_Item}" style="width:${S_iWdt_Image}%;">`;
      } /* if */
  } /* if */ 
  return(szHTML);
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Image */

/* ***** CL_Icon *******************************************************
*
*/ 
class CL_Icon extends CL_IOType {
  constructor() {
    super("CL_Icon"); /* new CL_IOType() */
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
 
/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/
function F_szHTML_TD_Table(P_Item, P_Fld1, P_Tup)
{        
  var szHTML = P_Item;
  var iWdt = 20;
  if (S_fLoad1 || S_fLoad2) {
     var szItem = "ols_files/icone/" + P_Item + ".svg";
     szHTML = `<img alt="" src="${szItem}" title="${P_Item}" style="width:${iWdt}px;">`;
  } /* if */ 
  return(szHTML);
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Icon */

/* ***** CL_Audio *******************************************************
*
*/ 
class CL_Audio extends CL_IOType {
  constructor() {
    super("CL_Audio"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;

/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm = P_Fld1.szNm;
   var Val0 = (!S_fLoad1)? P_Val0: P_Val0.replace("file:///", S_szURL_Local);

   var szHTML = `<audio id="Id_xKrW98717_a" src="${Val0}" controls="controls"><source src="${Val0}" ${P_szDisabled} type="audio/ogg"> Your browser does not support the audio element. </audio><br><br>
                 ${szNm} = <input id="Id_xKrW98717_b" ${P_szDisabled} type="text" value=${Val0} size="80" onchange="Id_xKrW98717_a.src = Id_xKrW98717_b.value;">`;
    
   return(szHTML);  
} /* U_Open_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szRes = `<audio src="${P_Item}" controls="controls"><source src="${P_Item}" type="audio/ogg"> Your browser does not support the audio element. </audio>`;     // $$$$$ type="audio/ogg" 
  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szHTML = P_Item;
  if (S_fLoad1) {
      var szItem = P_Item.replace("file:///", S_szURL_Local);
      if (S_fCaption) {
          szHTML = `${P_Fld1.szNm} = "${P_Item}" <audio src="${szItem}" controls="controls"><source src="${P_Item}" type="audio/ogg"> Your browser does not support the audio element. </audio>`;
      }
      else {
          szHTML = `<audio src="${szItem}" controls="controls"><source src="${P_Item}" type="audio/ogg"> Your browser does not support the audio element. </audio>`;
      } /* if */ 
  } /* if */ 
  return(szHTML); 
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Audio */ 

/* ***** CL_Video *******************************************************
*
*/ 
class CL_Video extends CL_IOType {
  constructor() {
    super("CL_Video"); /* new CL_IOType() */  
    this.U_Open_V1 = U_Open_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
       
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm = P_Fld1.szNm;
   var Val0 = (!S_fLoad1)? P_Val0: P_Val0.replace("file:///", S_szURL_Local);

   var szHTML = `<video id="Id_xKrW98717_a" poster="" controls="controls" style="width:90%;"> <source src="${Val0}" ${P_szDisabled} type="video/mp4"> Your browser does not support HTML5 video. </video><br><br>
                 ${szNm} = <input id="Id_xKrW98717_b" ${P_szDisabled} type="text" value=${Val0} size="80" onchange="Id_xKrW98717_a.src = Id_xKrW98717_b.value;">`;
    
   return(szHTML);  
} /* U_Open_V1 */
 
/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{

  var szRes = `<video poster="" controls="controls" width="200px;"> <source src="${P_Item}" type="video/mp4"> Your browser does not support HTML5 video. </video>`;     // $$$$$ type="audio/ogg"
  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szHTML = P_Item;
  if (S_fLoad1) {
      var szItem = P_Item.replace("file:///", S_szURL_Local);
      if (S_fCaption) {
          szHTML = `${P_Fld1.szNm} = "${P_Item}" <video poster="" controls="controls" width="200px;"> <source src="${szItem}" type="video/mp4"> Your browser does not support HTML5 video. </video>`;
      }
      else {
          szHTML = `<video poster="" controls="controls" width="200px;"> <source src="${szItem}" type="video/mp4"> Your browser does not support HTML5 video. </video>`;
      } /* if */      
  } /* if */ 
  return(szHTML);  
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Video */

/* ***** CL_GPS *******************************************************
*
*/ 
class CL_GPS extends CL_IOType {
  constructor() {
    super("CL_GPS"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm = P_Fld1.szNm;
   var Val0 = P_Val0;

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${P_szDisabled} type="text" value="${Val0}"> 
                 <button  onclick="$Value.U_szGPS();">HERE</button> <button onclick="$Value.U_OpenStreetMap(Id_xKrW98717_a.value);">OpenStreetMap</button>`; 
    
   return(szHTML);  
} /* U_Open_V1 */

  } /* constructor */
}  /* class CL_GPS */

// /* ***** CL_Doc *******************************************************
// *
// * The corresponding types are managed by U_EdtVal_DDJ(); in OLS.html.
// */ 
// class CL_Doc extends CL_IOType {
//   constructor() {
//     super("CL_Doc"); /* new CL_IOType() */   
// 
//   } /* constructor */
// }  /* class CL_Doc */


/* ***** CL_None *******************************************************
*
* $NOTE
* NOT Used! 
*/ 
class CL_None extends CL_IOType {
  constructor() {
    super("CL_None"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    
/*-----U_Open_V1 --------------------------------------------------------
*
* $NOTE
* NOT Used!
* Do nothing. The corresponding type is managed by U_EdtVal_DDJ(); in OLS.html. 
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
 //  $DDJ.F_Window_open(P_Val0);
    
   return("");  
} /* U_Open_V1 */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/   
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  return("");
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_None */

/* ***** CL_HOBNum *******************************************************
*
* Hex, Octal, Binary numbers
*/ 
class CL_HOBNum extends CL_IOType {
  constructor() {
    super("CL_HOBNum"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
       
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm = P_Fld1.szNm;
   var Val0 = +P_Val0;
   var szType_Out = P_Fld1.szType;
   var iBase = F_iBase_Mp_szType(szType_Out);
   var szVal0 = F_szHOB_Mp_iNum(Val0, iBase, P_Fld1);
   var fInt = (Val0 - Math.trunc(Val0) == 0);     /* Val0 is an Integer or a Float? */
   
   if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           szTmp += ("Min"  in Aux0)? `min=${Aux0.Min} `: ""; 
           szTmp += ("Max"  in Aux0)? `max=${Aux0.Max} `: ""; 
           szTmp += ("Step" in Aux0)? `step=${Aux0.Step} `: "";
       } /* if */ 
   } /* if */

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${szTmp} ${P_szDisabled} type="text" value="${szVal0}" onchange="$Value.U_Chg_Num(Id_xKrW98717_a.value);">`;
   var szDiv0 = (fInt)? `dec = ${Val0}<br>hex = 0x${Val0.toString(16)}<br>oct = 0o${Val0.toString(8)}<br>bin = 0b${Val0.toString(2)}<br>Exp = ${Val0.toExponential()}`: `dec = ${Val0}<br>Exp = ${Val0.toExponential()}`;
   szHTML += `<br><br><div id="Id_xKrW98717_b">${szDiv0}</div>`;
   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(+Id_xKrW98717_a.value);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Out = P_Fld1.szType;
  var iBase = F_iBase_Mp_szType(szType_Out);
  var szHTML = F_szHOB_Mp_iNum(+P_Item, iBase, P_Fld1);
  return(szHTML);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szType_Out = P_Fld1.szType;
  var iBase = F_iBase_Mp_szType(szType_Out);
  var szHTML = F_szHOB_Mp_iNum(+P_Item, iBase, P_Fld1);
  return(szHTML);
} /* F_szHTML_TD_Table */
  
/*-----F_iBase_Mp_szType --------------------------------------------------------
*
*/ 
function F_iBase_Mp_szType(P_szType)
{
  var iBase = 10;

  switch (P_szType) {
    case "hex": {
        iBase = 16;
    } break;
    case "oct": {
        iBase = 8;
    } break;
    case "bin": {
        iBase = 2;
    } break;
  } /* switch */
  return(iBase);
} /* F_iBase_Mp_szType */
 
/*-----F_szHOB_Mp_iNum --------------------------------------------------------
*
* Build the string representing a number in the given base.
* $NOTE: F_szHOB_Mp_iNum has been developed because toString(P_iBase) doesn't support negative numbers!
*/ 
function F_szHOB_Mp_iNum(P_iNum, P_iBase, P_Fld1)
{
  var achHex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  var iLen = (P_Fld1 && P_Fld1.Aux0 && P_Fld1.Aux0.iNnDgt)? P_Fld1.Aux0.iNnDgt: 4;
  var szPfx;
  var iMax = 1;  
  
//  szItem = (+P_iNum).toString(P_iBase);   /* $NOTE: doesn't support negative numbers */
  
  if (!iLen) {
     iLen = 4;
  } /* if */
  
  switch (P_iBase) {
    case 16: {
        szPfx = "0x";
    } break;
    case 8: {
        szPfx = "0o";
    } break;
    case 2: {
        szPfx = "0b";
    } break;
  } /* switch */

  if (P_iNum < 0) {  
     for (let i = 0; i < iLen; i++) {
         iMax *= P_iBase;
     } /* for */
     P_iNum = iMax + P_iNum;
  } /* if */
  
  var szTmp0 = "";
  var szTmp1 = "";
  while (P_iNum > 0) {
        let iMod = P_iNum % P_iBase;
        P_iNum = Math.floor(P_iNum / P_iBase); 
        szTmp0 = achHex[iMod] + szTmp0;
  } /* while */
  for (var i = szTmp0.length; i < iLen; i++) {
      szTmp1 += '0';
  } /* for */
  var szItem = szPfx + szTmp1 + szTmp0;
  
  return(szItem);
} /* F_szHOB_Mp_iNum */ 

  } /* constructor */
}  /* class CL_HOBNum */

/* ***** CL_CheckBox *******************************************************
*
*/ 
class CL_CheckBox extends CL_IOType {
  constructor() {
    super("CL_CheckBox"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
        
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var fNm = true;
   var szBR = "<br>";
   var szNm = P_Fld1.szNm;
   var szHTML1 = "";
   let Ww0 = P_Val0;
   var szId0 = `Id_Card_xKrW98717_`;
    var szType = P_Fld1.szType;
    var Type0 = $Type.F_asRcd_Type(szType); /* Type's descriptor */ 
    var oAux  = Type0[C_jaType_oAux];
    var Enum0 = oAux.oEnum;

   for (let szKey in Enum0) {
       let szVal = Enum0[szKey];
       let szChk = (Ww0 & 1)? " checked=true": "";
       let szKey1 = (fNm)? szKey + szBR: szBR;
       var szId1 = szId0 + "_" + szKey;
       Ww0 >>= 1; 
       let szTxt2 = `<input ${P_szDisabled} type="checkbox" id="${szId1}" name="${szNm}" value="${szKey}" ${szChk}> ${szKey1}`; 
       szHTML1 += szTxt2;
   } /* for */
   var szHTML =  `<fieldset> <legend>${szNm}</legend>${szHTML1}</fieldset>`;
  
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1(P_Id, P_szType_Sem)
{
    var szId0 = `Id_Card_xKrW98717_`;
    var Type0 = $Type.F_asRcd_Type(P_szType_Sem); /* Type's descriptor */ 
    var oAux  = Type0[C_jaType_oAux];
    var Enum0 = oAux.oEnum;
    var Ww0 = 0;
    var Ww1 = 1;
    for (let szKey in Enum0) {
       var szVal = Enum0[szKey];
       var szId1 = szId0 + "_" + szKey;
       var Elem0 = document.getElementById(szId1);
       if (Elem0.checked) {
          Ww0 |= Ww1;
       } /* if */
       Ww1 <<= 1;
    } /* for */
    var Val0 = "" + Ww0;   /* Convert it in a string */
    return(Val0);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Sem  = P_Fld1.szType;                                              /* (Semantic) Type Required */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);                                   /* Type-Descriptor corresponding to the (Semantic)Type Required */
  var szTitle0 = (P_Fld1.szRem)? P_Fld1.szRem: "";
  var szTitle1 = (Type0[C_jaType_szNote])? Type0[C_jaType_szNote]: "";
  var szDisabled = (P_fReadOnly)? "disabled": "";   
  
  var szType = P_Fld1.szType;
  var Type0 = $Type.F_asRcd_Type(szType); /* Type's descriptor */ 
  var oAux  = Type0[C_jaType_oAux];
  var Enum0 = oAux.oEnum;
  let szBR = "<br>";
  let fNm   = true;
  let szHTML1 = "";
  let szNm = `Nm_Card_${P_j}`;
  let szId = `Id_Card_${P_j}`;
  let Ww0 = P_Item;
  
  for (let szKey in Enum0) {
      let szVal = Enum0[szKey];
      let szChk = (Ww0 & 1)? " checked=true": "";
      let szKey1 = (fNm)? szKey + szBR: szBR;
      Ww0 >>= 1; 
      let szTxt2 = `<input type="checkbox" id="${szId}_${szKey}" ${szDisabled} name="${szNm}" value="${szKey}" ${szChk}  title="${szTitle1}"> ${szKey1}`; 
      szHTML1 += szTxt2;
  } /* for */
  var szHTML =  `<br><fieldset> <legend title="${szTitle0}">${P_Fld1.szNm}</legend>${szHTML1}</fieldset>`;  

  return(szHTML);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = `Id_Card_${P_j}`;
  var szType_Usr = P_Fld1.szType;
  var Type0 = $Type.F_asRcd_Type(szType_Usr);    /* Type_JS used to map the Type Required */
  var oAux  = Type0[C_jaType_oAux];
  var Enum0 = oAux.oEnum;
  var Ww0 = 0;
  var Ww1 = 1;
  for (let szKey in Enum0) {
     var szVal = Enum0[szKey];
     var szId = "Id_Card_"+ P_j + "_" + szKey;
     var Elem0 = document.getElementById(szId);
     if (Elem0.checked) {
        Ww0 |= Ww1;
     } /* if */
     Ww1 <<= 1;
  } /* for */
  return("" + Ww0);   /* Convert in a string */ 
} /* F_Val_Inp_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szChk = (P_Item)? "checked=true": "";
  var szItem = `<input id="Id_xKrW98717_a" type="checkbox" ${szChk}>`;
  return(szItem);
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_CheckBox */

/* ***** CL_Radio *******************************************************
*
*/ 
class CL_Radio extends CL_IOType {
  constructor() {
    super("CL_Radio"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
  var fNm = true;
  var szBR = "<br>";
  var szNm = P_Fld1.szNm;
  let szHTML1 = "";
  var szId = `Id_Card_xKrW98717_`;
  var szType = P_Fld1.szType;
  var Type0 = $Type.F_asRcd_Type(szType); /* Type's descriptor */ 
  var oAux  = Type0[C_jaType_oAux];
  var Enum0 = oAux.oEnum;

  for (let szKey in Enum0) {
      let szVal = Enum0[szKey];
      let szChk = (szKey == P_Val0)? " checked=true": "";
      let szKey1 = (fNm)? szKey + szBR: szBR; 
      let szTxt2 = `<input type="radio" id="${szId}_${szKey}" ${P_szDisabled} name="${szNm}" value="${szKey}" ${szChk}> ${szKey1}`;
      szHTML1 += szTxt2;
  } /* for */
  var szHTML =  `<fieldset> <legend>${szNm}</legend>${szHTML1}</fieldset>`;

 return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1(P_Id, P_szType_Sem)
{
  var szId0 = `Id_Card_xKrW98717_`;
  var Type0 = $Type.F_asRcd_Type(P_szType_Sem); /* Type's descriptor */ 
  var oAux  = Type0[C_jaType_oAux];
  var Val0 = 0;
  var Enum0 = oAux.oEnum;
  for (let szKey in Enum0) {
     var szVal = Enum0[szKey];
     var szId = szId0 + "_" + szKey;
     var Elem0 = document.getElementById(szId);
     if (Elem0.checked) {
        Val0 = szKey;
        break;
     } /* if */
  } /* for */ 
  return(Val0);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Sem  = P_Fld1.szType;                                              /* (Semantic) Type Required */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);                                   /* Type-Descriptor corresponding to the (Semantic)Type Required */
  var szTitle0 = (P_Fld1.szRem)? P_Fld1.szRem: "";
  var szTitle1 = (Type0[C_jaType_szNote])? Type0[C_jaType_szNote]: "";
  var szDisabled = (P_fReadOnly)? "disabled": "";   
  
  var szType = P_Fld1.szType;
  var Type0 = $Type.F_asRcd_Type(szType); /* Type's descriptor */ 
  var oAux  = Type0[C_jaType_oAux];
  var Enum0 = oAux.oEnum;
  let szBR = "<br>";
  let fNm   = true;
  let szHTML1 = "";
  let szNm = `Nm_Card_${P_j}`;
  let szId = `Id_Card_${P_j}`;

  for (let szKey in Enum0) {
      let szVal = Enum0[szKey];
      let szChk = (szKey == P_Item)? " checked=true": "";
      let szKey1 = (fNm)? szKey + szBR: szBR; 
      let szTxt2 = `<input type="radio" id="${szId}_${szKey}" ${szDisabled} name="${szNm}" value="${szKey}" ${szChk}  title="${szTitle1}"> ${szKey1}`;
      szHTML1 += szTxt2;
  } /* for */
  var szHTML =  `<fieldset> <legend title="${szTitle0}">${P_Fld1.szNm}</legend>${szHTML1}</fieldset>`;

  return(szHTML);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = `Id_Card_${P_j}`;
  var szType_Usr = P_Fld1.szType;
  var Type0 = $Type.F_asRcd_Type(szType_Usr);    /* Type_JS used to map the Type Required */
  var oAux  = Type0[C_jaType_oAux];
  var Enum0 = oAux.oEnum;
  for (let szKey in Enum0) {
     var szVal = Enum0[szKey];
     var szId = "Id_Card_"+ P_j + "_" + szKey;
     var Elem0 = document.getElementById(szId);
     if (Elem0.checked) {
        return(szKey);
     } /* if */
  } /* for */
  return(null);
} /* F_Val_Inp_Card */

  } /* constructor */
}  /* class CL_Radio */

/* ***** CL_List *******************************************************
*
*/ 
class CL_List extends CL_IOType {
  constructor() {
    super("CL_List"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;

/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
  var szNm   = P_Fld1.szNm;
  var szType = P_Fld1.szType;
  var Type0 = $Type.F_asRcd_Type(szType); /* Type's descriptor */ 
  var oAux  = Type0[C_jaType_oAux];
  var Enum0 = oAux.oEnum;
  
  var szHTML = `<label for="Id_xKrW98717_a">${szNm}</label> <select id="Id_xKrW98717_a" size="1">`;

  for (let szKey in Enum0) {                   
      let szSelected = (szKey == P_Val0)? " selected=true": "";
      let szTxt2 = `<option value="${szKey}" ${szSelected}>${szKey}</option>`;
      szHTML += szTxt2;
  } /* for */
  szHTML += "</select>";  
 return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1(P_Id, P_szType_Sem)
{
  var Val0 = Id_xKrW98717_a.value;
  return(Val0);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Sem  = P_Fld1.szType;                                              /* (Semantic) Type Required */
  var Type0 = $Type.F_asRcd_Type(szType_Sem);                                   /* Type-Descriptor corresponding to the (Semantic)Type Required */
  var szTitle0 = (P_Fld1.szRem)? P_Fld1.szRem: "";
  var szTitle1 = (Type0[C_jaType_szNote])? Type0[C_jaType_szNote]: "";
  var szDisabled = (P_fReadOnly)? "disabled": "";   
  
    var szType = P_Fld1.szType;
    var Type0 = $Type.F_asRcd_Type(szType); /* Type's descriptor */ 
    var oAux  = Type0[C_jaType_oAux];
    var Enum0 = oAux.oEnum;
    
   var szId = `Id_Card_${P_j}`;
   var szHTML = `<select id="${szId}" size="1" ${szDisabled}  title="${szTitle1}">`;

   for (let szKey in Enum0) {                   
       let szSelected = (szKey == P_Item)? " selected=true": ""; 
       let szTxt2 = `<option value="${szKey}" ${szSelected}>${szKey}</option>`;
       szHTML += szTxt2;
   } /* for */
   szHTML += "</select>";

  return(szHTML);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  return(szInput);
} /* F_Val_Inp_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szNm   = P_Fld1.szNm;
  var szType = P_Fld1.szType;
  var Type0 = $Type.F_asRcd_Type(szType); /* Type's descriptor */ 
  var oAux  = Type0[C_jaType_oAux];
  var Enum0 = oAux.oEnum;
  var Val0 = P_Item;
  
  var szHTML = `<select id="Id_xKrW98717_a" size="1">`;

  for (let szKey in Enum0) {                   
      let szSelected = (szKey == Val0)? " selected=true": "";
      let szTxt2 = `<option value="${szKey}" ${szSelected}>${szKey}</option>`;
      szHTML += szTxt2;
  } /* for */
  szHTML += "</select>";  
  return(szHTML);
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ElemPrv = UsrView0.ElemPrv;
  var childNode = ElemPrv.childNodes[0];   /* 0 == zero */
  var Val0 = childNode.value;
  return(Val0);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_List */

/* ***** CL_HTML *******************************************************
* Prova3 Formula
*/ 
class CL_HTML extends CL_IOType {
  constructor() {
    super("CL_HTML"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card  = F_Val_Inp_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
* HighLigth the string searched, that is matching GoTo conditions set using FilterStr.
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szFilterStr = $Filter.F_szFilterStr();
  if (szFilterStr != "") {
     P_Item = P_Item.replaceAll(`${szFilterStr}`, `<hili>${szFilterStr}</hili>`); 
  } /* if */
  return(P_Item); 
} /* F_szHTML_TD_Table */

/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm = P_Fld1.szNm;
   var Val0 = P_Val0;
  
   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = HTML</label><fieldset><div id="Id_xKrW98717_a" contenteditable="true">${Val0}</div></fieldset>`;   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(Id_xKrW98717_a.innerHTML);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Item = typeof(P_Item);                                          /* Type_JS of the argument (P_Item). */
  var szRes = P_Item;
  switch (szType_Item) {
    case "string": {    
         szRes = P_Item;
    } break;
    case "number":
    case "bigint": {
          szRes = "" + P_Item;
    } break;
    case "boolean": {
          szRes = (P_Item)? "true": "false";
    } break;
    case "function": {
          /* Get the name of the function. */
          var szTmp = "" + P_Item;
          szRes = szTmp.substr(0, szTmp.indexOf(')') +1);
    } break;
  } /* switch */
  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.innerHTML;
  return(szInput);
} /* F_Val_Inp_Card */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ElemPrv = UsrView0.ElemPrv;
  var Val1 = ElemPrv.innerHTML;

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_HTML */

/* ***** CL_Flag *******************************************************
*
*/ 
class CL_Flag extends CL_IOType {
  constructor() {
    super("CL_Flag"); /* new CL_IOType() */  
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card; 
    this.F_Val_Inp_Card = F_Val_Inp_Card;   
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;
            
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szNm  = P_Fld1.szNm;
   var szId0 = `Id_xKrW98717_a`;
   var szChk = (P_Val0)? " checked=true": "";

   var szHTML1 = `<input ${P_szDisabled} type="checkbox" id="${szId0}" name="${szNm}" ${szChk}> ${szNm}`; 
   var szHTML  = `<fieldset> <legend>${szNm}</legend>${szHTML1}</fieldset>`;
  
   return(szHTML);;  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1(P_Id, P_szType_Sem)
{
    var szId0 = `Id_xKrW98717_a`;
    var Elem0 = document.getElementById(szId0);
    var Val0  = Elem0.checked;

    return(Val0);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szChk = (P_Item)? "checked=true": "";
  var szId  = "Id_xKrW98717_a" + P_Fld1.szNm;
  var szHTML1 = `<input id="${szId}" type="checkbox" ${szChk}>`;

  return(szHTML1);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_xKrW98717_a" + P_Fld1.szNm;
  var Elem0 = document.getElementById(szId);
  var fChecked = Elem0.checked;
  return(fChecked);
} /* F_Val_Inp_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szChk = (P_Item)? "checked=true": "";
  var szId  = "Id_xKrW98717_a" + P_Fld1.szNm;
  var szItem = `<input id="${szId}" type="checkbox" ${szChk}>`;
  return(szItem);
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var ElemPrv = $Table.F_ElemPrv();
  var firstChild = ElemPrv.firstChild;
  var fChecked = firstChild.checked;
  return(fChecked);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_Flag */

/* ***** CL_Password *******************************************************
*
*/ 
class CL_Password extends CL_IOType {
  constructor() {
    super("CL_Password"); /* new CL_IOType() */   
    
    this.U_Open_V1          = U_Open_V1;         /* Single Value */
    this.F_Val_Inp_Card     = U_Null;   
    this.F_szHTML_TD_Table  = F_szHTML_TD_Table; /* Table */
    this.F_Val_Inp_Table    = U_Null;
    
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0  = P_Val0;

   var szHTML = `<label for="Id_xKrW98717_b">${szNm} = </label> <input id="Id_xKrW98717_b" ${P_szDisabled} type="password" value="12345678"><br>
                 <label for="Id_xKrW98717_c">${szNm} = </label> <input id="Id_xKrW98717_c" ${P_szDisabled} type="password" value="87654321"><br>
                 <input id="Id_xKrW98717_a" ${P_szDisabled} type="hidden" value="${Val0}">
                 <button onclick="Id_xKrW98717_a.value = (Id_xKrW98717_b.value == Id_xKrW98717_c.value)? Id_xKrW98717_b.value: Id_xKrW98717_a.value">Confirm</button>`;
   return(szHTML);  
} /* U_Open_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  return(szItem);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
//  P_Fld1.fReadOnly = true;
  var szItem = (P_Item != "")? "********": "no password";
  return(szItem);
} /* F_szHTML_TD_Table */

  } /* constructor */
}  /* class CL_Password */

/* ***** CL_rExp *******************************************************
*
*/ 
class CL_rExp extends CL_IOType {
  constructor() {    

    super("CL_rExp"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;
      
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0  = +P_Val0.toExponential(S_iNnDec);
   var fInt  = (Val0 - Math.trunc(Val0) == 0);     /* Val0 is an Integer or a Float? */
   
   if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           szTmp += ("Min"  in Aux0)? `min=${Aux0.Min} `: ""; 
           szTmp += ("Max"  in Aux0)? `max=${Aux0.Max} `: ""; 
           szTmp += ("Step" in Aux0)? `step=${Aux0.Step} `: "";
       } /* if */ 
   } /* if */

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${szTmp} ${P_szDisabled} type="text" value="${Val0}" onchange="$Value.U_Chg_Num(Id_xKrW98717_a.value);">`;
   var szDiv0 = (fInt)? `dec = ${Val0}<br>hex = 0x${Val0.toString(16)}<br>oct = 0o${Val0.toString(8)}<br>bin = 0b${Val0.toString(2)}<br>Exp = ${Val0.toExponential()}`: `dec = ${Val0}<br>Exp = ${Val0.toExponential()}`;
   szHTML += `<br><br><div id="Id_xKrW98717_b">${szDiv0}</div>`;
   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(+Id_xKrW98717_a.value);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Item = typeof(P_Item);                                             /* Type_JS of the argument (P_Item). */
  var szRes;

  switch (szType_Item) {
    case "bigint": {
          P_Item = Number(P_Item);
    }
    case "number": {
         szRes = (+P_Item).toExponential(S_iNnDec);
    } break;
    case "string": {
         if ((P_Item == " ") || (P_Item == "")) {
             /* Value not available */
             szRes = "";          
         }
         else {
              szRes = "" + (+P_Item).toExponential(S_iNnDec);
         } /* if */
    } break;
    case "boolean": {
          szRes = (P_Item)? "1": "0";
    } break;
  } /* switch */

  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szRes;
  var szType = typeof(P_Item); 
  
  if (szType != "number") {
     switch (szType) {
       case "string": {
            if ((P_Item == " ") || (P_Item == "")) {
               /* Value not available */
               szRes = "";            
            }
            else {
                P_Item = +P_Item;
            } /* if */
       } break;
       case "boolean": {
             P_Item = (P_Item)? "1": "0";
       } break;
       case "undefined": {
             /* Value not available */
             szRes = "";      
       } break;
       default : {
             $Error.U_Error(C_jCd_Cur, 17, "Unexpected type", "", false);
       } break;
     } /* switch */
  } /* if */
  var szNNeg = (P_Item >= 0)? "&nbsp;": "";
  
  szRes = szNNeg + P_Item.toExponential(S_iNnDec);

  return(szRes); 
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szType = typeof(P_szInp);   /* Type of the Source */
  var Val1   = P_szInp;
                   
  if (P_szTypeDst != szType) {
     /* Was expected a number. */
     if (szType == "string") {
        if (P_szInp != "") {
           Val1 = +P_szInp;
        }
        else {
        } /* if */  
     } else if (szType == "boolean") {
        Val1 = (P_szInp == false) ? 0 : 1;
     } /* if */
  } /* if */

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_rExp */

/* ***** CL_Real *******************************************************
*
*/ 
class CL_Real extends CL_IOType {
  constructor() {    

    super("CL_Real"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;   
    this.F_szHTML_TD_Table  = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;
       
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0  = +P_Val0;
   var fInt  = (Val0 - Math.trunc(Val0) == 0);     /* Val0 is an Integer or a Float? */
   
   if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           szTmp += ("Min"  in Aux0)? `min=${Aux0.Min} `: ""; 
           szTmp += ("Max"  in Aux0)? `max=${Aux0.Max} `: ""; 
           szTmp += ("Step" in Aux0)? `step=${Aux0.Step} `: "";
       } /* if */ 
   } /* if */

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${szTmp} ${P_szDisabled} type="text" value="${Val0}" onchange="$Value.U_Chg_Num(Id_xKrW98717_a.value);">`;
   var szDiv0 = (fInt)? `dec = ${Val0}<br>hex = 0x${Val0.toString(16)}<br>oct = 0o${Val0.toString(8)}<br>bin = 0b${Val0.toString(2)}<br>Exp = ${Val0.toExponential()}`: `dec = ${Val0}<br>Exp = ${Val0.toExponential()}`;
   szHTML += `<br><br><div id="Id_xKrW98717_b">${szDiv0}</div>`;
   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(+Id_xKrW98717_a.value);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Item = typeof(P_Item);                                             /* Type_JS of the argument (P_Item). */
  var szRes = P_Item;

  switch (szType_Item) {
    case "number":
    case "bigint": {
    } break;
    case "string": {
         if ((P_Item == " ") || (P_Item == "")) {
             /* Value not available */
             szRes = "";            
         }
         else {
             szRes = +P_Item;
         } /* if */
    } break;
    case "boolean": {
          szRes = (P_Item)? 1: 0;
    } break;
  } /* switch */

  return(szRes);
} /* F_szHTML_TD_Card */
 
/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  if (!P_Item) {
     switch (typeof(P_Item)) {
       case "undefined": {
             var szItem = F_szVal_Undefined("8");
             return(szItem);
       } break;
       case "object": {
            if (P_Item === null) {
               return("null");
            } /* if */
       } break;
       case "string" : {
            P_Item = +P_Item; 
       } break;
       default : {
       } break;
     } /* switch */
  } /* if */

  return(P_Item.toFixed(4)); 
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szType = typeof(P_szInp);   /* Type of the Source */
  var Val1   = P_szInp;
                   
  if (P_szTypeDst != szType) {
     /* Was expected a number. */
     if (szType == "string") {
        if (P_szInp != "") {
           Val1 = +P_szInp;
        }
        else {
           Val1 = C_Undefined;
        } /* if */  
     } else if (szType == "boolean") {
        Val1 = (P_szInp == false) ? 0 : 1;
     } /* if */
  } /* if */

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_Real */

/* ***** CL_Button *******************************************************
*
*/ 
class CL_Button extends CL_IOType {
  constructor() {      

    super("CL_Button"); /* new CL_IOType() */   
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1  = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_szHTML_TD_Table = F_szHTML_TD_Table;
    this.F_Val_Inp_Table = F_Val_Inp_Table;

/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
  var szId = `Id_Card_${P_Fld1.szNm}`;
  var szHTML;
  if (P_Val0) {
     szHTML = `<label for="${szId}" = </label><button style="background-color:#ff0000;" id="${szId}" onclick="$Value.U_Btn(this, false);">OFF</button>`;   
  }
  else {
     szHTML = `<label for="${szId}" = </label><button style="background-color:#33ff33;" id="${szId}" onclick="$Value.U_Btn(this, true);">ON </button>`;  
  } /* if */  
  return(szHTML);
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1(P_szNm)
{
  var Val0  = 0;
  return(Val0);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szId = `Id_Card_${P_Fld1.szNm}`;
  var szHTML;
  if (P_Item) {
     szHTML = `<label for="${szId}" = </label><button style="background-color:#ff0000;" id="${szId}" onclick="$Value.U_Btn(this, false);">OFF</button>`;   
  }
  else {
     szHTML = `<label for="${szId}" = </label><button style="background-color:#33ff33;" id="${szId}" onclick="$Value.U_Btn(this, true);">ON </button>`;  
  } /* if */  
  return(szHTML);
} /* F_szHTML_TD_Card */

/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  var szId = `Id_Card_${P_Fld1.szNm}`;
  var szHTML;
  if (P_Item) {
     szHTML = `<label for="${szId}" = </label><button style="background-color:#ff0000;" id="${szId}" onclick="$Value.U_Btn(this, false);">OFF</button>`;   
  }
  else {
     szHTML = `<label for="${szId}" = </label><button style="background-color:#33ff33;" id="${szId}" onclick="$Value.U_Btn(this, true);">ON </button>`;  
  } /* if */  
  return(szHTML);
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var Val0 = 0;
  return(Val0);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_Button */

/* ***** CL_Custom *******************************************************
*
*/ 
class CL_Custom extends CL_IOType {
  constructor() {    

    super("CL_Custom"); /* new CL_IOType() */  
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;
    this.F_szHTML_TD_Table  = F_szHTML_TD_Table;  /* Table */   
    this.F_Val_Inp_Table = F_Val_Inp_Table;
       
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0  = +P_Val0;
   var fInt  = (Val0 - Math.trunc(Val0) == 0);     /* Val0 is an Integer or a Float? */
   
   if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           szTmp += ("Min"  in Aux0)? `min=${Aux0.Min} `: ""; 
           szTmp += ("Max"  in Aux0)? `max=${Aux0.Max} `: ""; 
           szTmp += ("Step" in Aux0)? `step=${Aux0.Step} `: "";
       } /* if */ 
   } /* if */

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${szTmp} ${P_szDisabled} type="text" value="${Val0}" onchange="$Value.U_Chg_Num(Id_xKrW98717_a.value);">`;
   var szDiv0 = (fInt)? `dec = ${Val0}<br>hex = 0x${Val0.toString(16)}<br>oct = 0o${Val0.toString(8)}<br>bin = 0b${Val0.toString(2)}<br>Exp = ${Val0.toExponential()}`: `dec = ${Val0}<br>Exp = ${Val0.toExponential()}`;
   szHTML += `<br><br><div id="Id_xKrW98717_b">${szDiv0}</div>`;
   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(+Id_xKrW98717_a.value);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Item = typeof(P_Item);                                             /* Type_JS of the argument (P_Item). */
  var szRes = P_Item;

  switch (szType_Item) {
    case "Custom":
    case "bigint": {
    } break;
    case "string": {
         if ((P_Item == " ") || (P_Item == "")) {
             /* Value not available */
             szRes = "";            
         }
         else {
             szRes = +P_Item;
         } /* if */
    } break;
    case "boolean": {
          szRes = (P_Item)? 1: 0;
    } break;
  } /* switch */

  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  return(+szInput);
} /* F_Val_Inp_Card */
    
/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  if (!P_Item) {
     P_Item = "";
  } /* if */

  return(P_Item); 
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szType = typeof(P_szInp);   /* Type of the Source */
  var Val1   = P_szInp;
                   
  if (szType != "Custom") {
     /* Was expected a Custom. */
     if (szType == "string") {
        if (P_szInp != "") {
           Val1 = +P_szInp;
        }
        else {
           Val1 = C_Undefined;
        } /* if */  
     } else if (szType == "boolean") {
        Val1 = (P_szInp == false) ? 0 : 1;
     } /* if */
  } /* if */

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_Custom */

/* ***** CL_output *******************************************************
*
*/ 
class CL_output extends CL_IOType {
  constructor() {    

    super("CL_output"); /* new CL_IOType() */  
    this.U_Open_V1 = U_Open_V1;
    this.U_Confirm_V1 = U_Confirm_V1;
    this.F_szHTML_TD_Card = F_szHTML_TD_Card;
    this.F_Val_Inp_Card = F_Val_Inp_Card;
    this.F_szHTML_TD_Table  = F_szHTML_TD_Table;  /* Table */   
    this.F_Val_Inp_Table = F_Val_Inp_Table;
       
/*-----U_Open_V1 --------------------------------------------------------
*
*/ 
function U_Open_V1(P_Val0, P_Fld1, P_szDisabled)
{
   var szTmp = "";
   var szNm  = P_Fld1.szNm;
   var Val0  = +P_Val0;
   var fInt  = (Val0 - Math.trunc(Val0) == 0);     /* Val0 is an Integer or a Float? */
   
   if ("Aux0" in P_Fld1) {
       var Aux0 = P_Fld1.Aux0;
       if (typeof(Aux0) == "object") {
           szTmp += ("Min"  in Aux0)? `min=${Aux0.Min} `: ""; 
           szTmp += ("Max"  in Aux0)? `max=${Aux0.Max} `: ""; 
           szTmp += ("Step" in Aux0)? `step=${Aux0.Step} `: "";
       } /* if */ 
   } /* if */

   var szHTML = `<label for="Id_xKrW98717_a">${szNm} = </label> <input id="Id_xKrW98717_a" ${szTmp} ${P_szDisabled} type="text" value="${Val0}" onchange="$Value.U_Chg_Num(Id_xKrW98717_a.value);">`;
   var szDiv0 = (fInt)? `dec = ${Val0}<br>hex = 0x${Val0.toString(16)}<br>oct = 0o${Val0.toString(8)}<br>bin = 0b${Val0.toString(2)}<br>Exp = ${Val0.toExponential()}`: `dec = ${Val0}<br>Exp = ${Val0.toExponential()}`;
   szHTML += `<br><br><div id="Id_xKrW98717_b">${szDiv0}</div>`;
   
   return(szHTML);  
} /* U_Open_V1 */

/*-----U_Confirm_V1 --------------------------------------------------------
*
*/ 
function U_Confirm_V1()
{
  return(+Id_xKrW98717_a.value);
} /* U_Confirm_V1 */

/*-----F_szHTML_TD_Card --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Card(P_Item, P_Fld1, P_j, P_fReadOnly)
{
  var szType_Item = typeof(P_Item);                                             /* Type_JS of the argument (P_Item). */
  var szRes = P_Item;

  switch (szType_Item) {
    case "output":
    case "bigint": {
    } break;
    case "string": {
         if ((P_Item == " ") || (P_Item == "")) {
             /* Value not available */
             szRes = "";            
         }
         else {
             szRes = +P_Item;
         } /* if */
    } break;
    case "boolean": {
          szRes = (P_Item)? 1: 0;
    } break;
  } /* switch */

  return(szRes);
} /* F_szHTML_TD_Card */

/*-----F_Val_Inp_Card --------------------------------------------------------
*
*/ 
function F_Val_Inp_Card(P_Fld1, P_j)
{
  var szId = "Id_Card_" + P_j;
  var Elem0 = document.getElementById(szId);
  var szInput = Elem0.value;
  return(+szInput);
} /* F_Val_Inp_Card */
    
/*-----F_szHTML_TD_Table --------------------------------------------------------
*
*/ 
function F_szHTML_TD_Table(P_Item, P_Fld1)
{
  if (!P_Item) {
     P_Item = "";
  } /* if */

  return(P_Item); 
} /* F_szHTML_TD_Table */

/*-----F_Val_Inp_Table --------------------------------------------------------
*
*/ 
function F_Val_Inp_Table(P_szTypeDst, P_Fld1, P_szInp)
{
  var szType = typeof(P_szInp);   /* Type of the Source */
  var Val1   = P_szInp;
                   
  if (szType != "output") {
     /* Was expected a output. */
     if (szType == "string") {
        if (P_szInp != "") {
           Val1 = +P_szInp;
        }
        else {
           Val1 = C_Undefined;
        } /* if */  
     } else if (szType == "boolean") {
        Val1 = (P_szInp == false) ? 0 : 1;
     } /* if */
  } /* if */

  return(Val1);
} /* F_Val_Inp_Table */

  } /* constructor */
}  /* class CL_output */

/*-----F_szVal_Undefined --------------------------------------------------------
*
*/ 
function F_szVal_Undefined(P_sz0)
{
  var szRes = "";
  if ($Filter.F_fFilter()) {    /* Hide undefined values in QBE filter DBox. */
     return("");
  } /* if */
  
  /* Manage "undefined" values present in "scattered" matrix. */
  if (CL_UsrView0.F_fMng_Undef()) {
     szRes = "";    
  }
  else {
     if ($VDebug.F_iDebug() > C_iDebug_Dflt) {      
        szRes = "undefined";
        if ($VDebug.F_iDebug() > C_iDebug_Dflt +1) {      
           szRes += " " + P_sz0;
        } /* if */
     } /* if */
  } /* if */
  if ($VConfig.F_ValSts_Get("fDiagnostic")) {
     szRes = `<span style='color:red;'>${szRes}</span>`;
  } /* if */       

  return(szRes);
} /* F_szVal_Undefined */

/*-----U_Init_Value --------------------------------------------------------
*
*/ 
function U_Init_Value()
{
  U_Root0("$Value", C_jCd_Cur);
  
  _Value.U_Reset_SR    = S_DBox_InpVal.U_Reset_SR;
  
  _Value.DBox_InpVal   = new CL_DBox("Id_Div_DBox0", "$Value.DBox_InpVal",   "Edit Value",     S_szHTML_DBox_InpVal,   S_DBox_InpVal.U_Open,      G_DBox_Null.U_Cancel, S_DBox_InpVal.U_Confirm_V1, G_asaMnEntry.InpVal,   "InpVal");
  _Value.DBox_SetReset = new CL_DBox("Id_Div_DBox0", "$Value.DBox_SetReset", "Set/Reset Data", S_szHTML_DBox_SetReset, S_DBox_InpVal.U_Open_SR,   G_DBox_Null.U_Cancel, U_Confirm_SetReset,         G_asaMnEntry.SetReset, "SetReset");
  _Value.DBox_Tags     = new CL_DBox("Id_Div_DBox0", "$Value.DBox_Tags",     "Set/Reset Tags", S_szHTML_DBox_Tags,     S_DBox_InpVal.U_Open_Tags, G_DBox_Null.U_Cancel, U_Confirm_Tags,             G_asaMnEntry.Tags,     "Tags");
  
  S_aIOType.string     = new CL_String();
  S_aIOType.number     = new CL_Number();
  S_aIOType.boolean    = new CL_Boolean();
  S_aIOType.object     = new CL_Object();
  S_aIOType.function   = new CL_Function();
  S_aIOType.bigint     = new CL_BigInt();  
  S_aIOType.symbol     = new CL_Symbol();
  S_aIOType.undefined  = new CL_Undefined();

  S_aIOType.checkbox   = new CL_CheckBox();
  S_aIOType.Flag       = new CL_Flag();

  S_aIOType.button     = new CL_Button();
  S_aIOType.radio      = new CL_Radio();
  S_aIOType.List       = new CL_List();
  S_aIOType.color      = new CL_Color();

  S_aIOType.date       = new CL_Date();
  S_aIOType.datetime   = new CL_DateTime();
  S_aIOType["datetime-local"] = new CL_DateTimeLocal();

  S_aIOType.email      = new CL_EMail();
  S_aIOType.range      = new CL_Range();
  S_aIOType.tel        = new CL_Tel();
  S_aIOType.text       = new CL_String();
  S_aIOType.password   = new CL_Password();

  S_aIOType.time       = new CL_Time();
  S_aIOType.month      = new CL_Month();
  S_aIOType.week       = new CL_Week();
  S_aIOType.textarea   = new CL_TextArea();
  S_aIOType.HTML       = new CL_HTML();

  S_aIOType.SByte      = new CL_Number();
  S_aIOType.short      = new CL_Number();
  S_aIOType.int        = new CL_Number();
  S_aIOType.int64      = new CL_Number();
  S_aIOType.Byte       = new CL_Number();
  S_aIOType.Word       = new CL_Number();
  S_aIOType.DWord      = new CL_Number();
  S_aIOType.QWord      = new CL_Number();
  S_aIOType.AbsFreq    = new CL_Number();
  S_aIOType.float      = new CL_Real();
  S_aIOType.real       = new CL_Real();
  S_aIOType.rExp       = new CL_rExp();

  S_aIOType.hex        = new CL_HOBNum();
  S_aIOType.oct        = new CL_HOBNum();
  S_aIOType.bin        = new CL_HOBNum();

  S_aIOType.timestamp  = new CL_TimeStamp();

  S_aIOType.Image      = new CL_Image();
  S_aIOType.Icon       = new CL_Icon();
  S_aIOType.Audio      = new CL_Audio();
  S_aIOType.Video      = new CL_Video();
  S_aIOType.GPS        = new CL_GPS();
  
  S_aIOType.None       = new CL_None();

  S_aIOType.Txt        = new CL_String();
  S_aIOType.Doc        = new CL_String();
  S_aIOType.html       = new CL_String();
  
  S_aIOType.PATH       = new CL_String();
  S_aIOType.file       = new CL_String();
  S_aIOType.url        = new CL_String();
  S_aIOType.link       = new CL_String();

  S_aIOType.Array      = new CL_Object();
  S_aIOType.output     = new CL_output();
  S_aIOType.Custom     = new CL_Custom();

} /* U_Init_Value */

  return(_Value);
})();  /* Value */


























