/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : timedate.js
* Function    : Date and time management
* FirstEdit   : 18/10/2023
* LastEdit    : 27/11/2025
* System      : Mozilla FireFox 80+
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Expand the given object for display.
* 
* ### Requirements
* ### Specifications
*     Ref. https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-numbers-and-dates
*     
* ### Functional Requirements
* ### Non Functional Requirements
*
* $Note: JS' timestamp represents the number of milliseconds (ms) elapsed since Jan 1st 1970 00:00:00.000
* 
* $NOTE:
* HTML encodes January as 0.
* HTML encodes Sunday  as 0.
* 
* szDate will be represented as string in YYYY-MM-DDThh:mm:ss.sss format.
* YMD will be represented in YYYY-MM-DD or DD/MM/YYYY or MM.DD.YYYY format as required.
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/

const C_iDe_Month = 1;     /* $Note: Conversion coefficient introduced because January is encoded as 0 */

const C_ims_Sec  = 1000;
const C_ims_Min  = C_ims_Sec  * 60;
const C_ims_Hour = C_ims_Min  * 60;
const C_ims_Day  = C_ims_Hour * 24;
const C_ims_Week = C_ims_Day  *  7;

/*
* $NOTE:
* the following codes make reference to usual conventions (January = 1, December = 12) JavaScript uses a different convention (January = 0, December = 11).
*/
const C_JMonth_Jan =  1;   // JS  0   
const C_JMonth_Feb =  2;   // JS  1   
const C_JMonth_Mar =  3;   // JS  2   
const C_JMonth_Apr =  4;   // JS  3   
const C_JMonth_May =  5;   // JS  4   
const C_JMonth_Jun =  6;   // JS  5   
const C_JMonth_Jul =  7;   // JS  6   
const C_JMonth_Aug =  8;   // JS  7   
const C_JMonth_Sep =  9;   // JS  8   
const C_JMonth_Oct = 10;   // JS  9   
const C_JMonth_Nov = 11;   // JS 10   
const C_JMonth_Dec = 12;   // JS 11   
/*
* $NOTE:
* the following codes make reference JavaScript conventions (Sunday = 0, Monday = 1).
*/
const C_JWDay_Sunday =    0;
const C_JWDay_Monday =    1;
const C_JWDay_Tuesday =   2;
const C_JWDay_Wednesday = 3;
const C_JWDay_Thursday =  4;
const C_JWDay_Friday =    5;
const C_JWDay_Saturday =  6;

/*----- Global Variables ---------------------------------------------*/

/*----- Module $TimeDate --------------------------------------------------------
*
*/ 
const $TimeDate = (function () {
  var _TimeDate = {};
  _TimeDate.U_Init                = U_Init_TimeDate;       // function U_Init_TimeDate();
  
  _TimeDate.F_ims_Sec70_Now       = F_ims_Sec70_Now;       // function F_ims_Sec70_Now();
  _TimeDate.F_Date_Now            = F_Date_Now;            // function F_Date_Now();
  _TimeDate.F_szDate_Now          = F_szDate_Now;          // function F_szDate_Now(P_fDate, P_fTime);
  
  _TimeDate.F_Date_Mp_ims_Sec70   = F_Date_Mp_ims_Sec70;   // function F_Date_Mp_ims_Sec70(P_ims_Sec70);
  _TimeDate.F_szDate_Mp_ims_Sec70 = F_szDate_Mp_ims_Sec70; // function F_szDate_Mp_ims_Sec70(P_ims_Sec70, P_szDateKind);

  _TimeDate.F_ims_Sec70_Mp_Date   = F_ims_Sec70_Mp_Date;   // function F_ims_Sec70_Mp_Date(P_Date);
  _TimeDate.F_szDate_Mp_Date      = F_szDate_Mp_Date;      // function F_szDate_Mp_Date(P_Date, P_szDateKind);

  _TimeDate.F_Date_Mp_szDate      = F_Date_Mp_szDate;      // function F_Date_Mp_szDate(P_szDate);
  _TimeDate.F_ims_Sec70_Mp_szDate = F_ims_Sec70_Mp_szDate; // function F_ims_Sec70_Mp_szDate(P_szDate);

  _TimeDate.F_szDate_Make         = F_szDate_Make;         // function F_szDate_Make(P_iYear, P_iMonth, P_iDay, P_iHour, P_iMinutes, P_iSeconds, P_imSec, P_iMin_TZ, P_szDateKind="date");
  _TimeDate.F_Date_Make           = F_Date_Make;           // function F_Date_Make(P_iYear=0, P_iMonth=1, P_iDay=1, P_iHour=0, P_iMinutes=0, P_iSeconds=0, P_imSec=0);

  _TimeDate.F_szDate_Mp_szYMD     = F_szDate_Mp_szYMD;     // F_szDate_Mp_szYMD(P_szYMD, P_szjDate = S_szjDate);
  _TimeDate.F_szYMD_Mp_szDate     = F_szYMD_Mp_szDate;     // function F_szYMD_Mp_szDate(P_szDate, P_szjDate = S_szjDate);
  
  _TimeDate.F_jYDay_Mp_szDate     = F_jYDay_Mp_szDate;     // function F_jYDay_Mp_Date(P_szDate="");
  _TimeDate.F_jYDay_Mp_Date       = F_jYDay_Mp_Date;       // function F_jYDay_Mp_Date(P_Date);
  _TimeDate.F_jYWeek_Mp_szDate    = F_jYWeek_Mp_szDate;    // function F_jYWeek_Mp_Date(P_szDate="");
  _TimeDate.F_jYWeek_Mp_Date      = F_jYWeek_Mp_Date;      // function F_jYWeek_Mp_Date(P_Date);
  
  _TimeDate.F_szDate_Mp_jYDay     = F_szDate_Mp_jYDay;     // function F_szDate_Mp_jYDay(P_iYear, P_jYDay);

  _TimeDate.F_ai_Date_Mp_Date     = F_ai_Date_Mp_Date;     // function F_ai_Date_Mp_Date(P_Date);
  _TimeDate.F_ai_Date_Mp_szDate   = F_ai_Date_Mp_szDate;   // function F_ai_Date_Mp_szDate(P_szDate);

  _TimeDate.F_szTime_Make         = F_szTime_Make;         // function F_szTime_Make(P_Date); 
  _TimeDate.F_szDate_Mp_Date_2    = F_szDate_Mp_Date_2;    // function F_szDate_Mp_Date_2(P_Date, P_szDateKind="date", P_szjDate="YYYYMMDD")   /* Return date in national format. */

  _TimeDate.aYear;

/*----- Local Constants ----------------------------------------------*/ 

const C_jCd_Cur = C_jCd_TimeDate;

/*----- Local Variables ----------------------------------------------*/

var S_aYear = [];

var S_szjDate;

/*--------------------------------------------------------------------*/

/*-----F_fDate --------------------------------------------------------
*
* Check if the string passed is a date?
*/ 
function F_fDate(P_sz)
{
  var sz0 = P_sz;
  var ch;
  var fDate = false;


  return(fDate);
} /* F_fDate */

/*-----F_ims_Sec70_Now --------------------------------------------------------
*
* Return current timestamp in ms.
* $TimeDate.F_ims_Sec70_Now();
*/ 
function F_ims_Sec70_Now()
{
  return(new Date().getTime());
} /* F_ims_Sec70_Now */

/*-----F_Date_Now --------------------------------------------------------
*
* Return current Date and Time as a Date Object.
* $TimeDate.F_Date_Now();
*/ 
function F_Date_Now()
{
  var Date0 = new Date();
  return(Date0);
} /* F_Date_Now */

/*-----F_szDate_Now --------------------------------------------------------
*
*/ 
function F_szDate_Now(P_szDateKind)
{
  var Date0 = new Date();
  var szDate = F_szDate_Mp_Date(Date0, P_szDateKind); 
  return(szDate);
} /* F_szDate_Now */

/*-----F_Date_Mp_ims_Sec70 --------------------------------------------------------
*
* Convert JS' timestamp in a Date object.
* $TimeDate.F_Date_Mp_ims_Sec70(); 
*/ 
function F_Date_Mp_ims_Sec70(P_ims_Sec70)
{
  var Date0 = new Date(P_ims_Sec70);
  return(Date0);
} /* F_Date_Mp_ims_Sec70 */

/*-----F_szDate_Mp_ims_Sec70 --------------------------------------------------------
*
* Convert timestamp in a string in YYYY-MM-DDThh:mm:ss.sss format.
* $TimeDate.F_Date_Mp_ims_Sec70(); 
*/ 
function F_szDate_Mp_ims_Sec70(P_ims_Sec70, P_szDateKind)
{
  var Date0 = F_Date_Mp_ims_Sec70(+P_ims_Sec70);
  var szDate = F_szDate_Mp_Date(Date0, P_szDateKind);
   
  return(szDate);
} /* F_szDate_Mp_ims_Sec70 */

/*-----F_ims_Sec70_Mp_Date --------------------------------------------------------
*
* Convert a Date in in a Timestamp.
* $TimeDate.F_ims_Sec70_Mp_szDate();
*/ 
function F_ims_Sec70_Mp_Date(P_Date)
{
  var ims_Time70 = P_Date.getTime();
  return(ims_Time70);
} /* F_ims_Sec70_Mp_Date */
 
/*-----F_szDate_Mp_Date --------------------------------------------------------
*
* Convert a Date in a string in YYYY-MM-DDThh:mm:ss.sss format.
* $TimeDate.F_szDate_Mp_Date(); 
*/ 
function F_szDate_Mp_Date(P_Date, P_szDateKind)
{
  if (!P_Date) {
     P_Date = new Date();
  } /* if */
  let iYear = P_Date.getFullYear();
  let iMonth = P_Date.getMonth() + C_iDe_Month;
  let iDay = P_Date.getDate();
  let jWDay = P_Date.getDay();
  
  let iHour = P_Date.getHours();
  let iMinutes = P_Date.getMinutes();
  let iSeconds = P_Date.getSeconds();
  let imSec = P_Date.getMilliseconds();
  
  let iTZ = P_Date.getTimezoneOffset();

  var szDate = $TimeDate.F_szDate_Make(iYear, iMonth, iDay, iHour, iMinutes, iSeconds, imSec, iTZ, P_szDateKind);
   
  return(szDate);
} /* F_szDate_Mp_Date */

/*-----F_Date_Mp_szDate --------------------------------------------------------
*
* Convert a string in YYYY-MM-DDThh:mm:ss.sss format in a Date.
* $TimeDate.F_Date_Mp_szDate(); 
*/ 
function F_Date_Mp_szDate(P_szDate)
{
  var ims_Time70 = Date.parse(P_szDate);
  var Date0 = F_Date_Mp_ims_Sec70(ims_Time70);
  return(Date0);
} /* F_Date_Mp_szDate */

/*-----F_ims_Sec70_Mp_szDate --------------------------------------------------------
*
* Convert a string in YYYY-MM-DDThh:mm:ss.sss format in a TimeStamp.
* $TimeDate.F_ims_Sec70_Mp_szDate(); 
*/ 
function F_ims_Sec70_Mp_szDate(P_szDate)
{
  var ims_Time70 = Date.parse(P_szDate);
  return(ims_Time70);
} /* F_ims_Sec70_Mp_szDate */

/*-----F_szDate_Make --------------------------------------------------------
*
* Assemble parameters as a string in YYYY-MM-DDThh:mm:ss.sss format.
* $Note: about P_iMonth note that January is encoded as zero (0).
* $TimeDate.F_szDate_Make(); 
*/ 
function F_szDate_Make(P_iYear=2023, P_iMonth=1, P_iDay=1, P_iHour=0, P_iMinutes=0, P_iSeconds=0, P_imSec=0, P_iMin_TZ=0, P_szDateKind="date")
{
  var szDate;

  switch (P_szDateKind) {
    case "date": {
         szDate = `${P_iYear}-${F_szPad2(P_iMonth)}-${F_szPad2(P_iDay)}`;
    } break;
    case "datetime-local": {
         szDate = `${P_iYear}-${F_szPad2(P_iMonth)}-${F_szPad2(P_iDay)}T${F_szPad2(P_iHour)}:${F_szPad2(P_iMinutes)}:${F_szPad2(P_iSeconds)}.${F_szPadLft("" + P_imSec, 0, 3)}`;     /* $Note: the ms term is unuseful because the browser doesn't display it! */
    } break;
    case "time": {
         szDate = `${F_szPad2(P_iHour)}:${F_szPad2(P_iMinutes)}:${F_szPad2(P_iSeconds)}}`;
    } break;
    case "datetime": {
         var szSign = "+";
         if (P_iMin_TZ < 0) {
            szSign = "-";
            P_iMin_TZ = - P_iMin_TZ;
         } /* if */
         var ihh_TZ = P_iMin_TZ / 60;
         var imm_TZ = P_iMin_TZ % 60; 
         szDate = `${P_iYear}-${F_szPad2(P_iMonth)}-${F_szPad2(P_iDay)}T${F_szPad2(P_iHour)}:${F_szPad2(P_iMinutes)}:${F_szPad2(P_iSeconds)}.${F_szPadLft("" + P_imSec, 0, 3)}${szSign}${F_szPad2(ihh_TZ)}:${F_szPad2(imm_TZ)}`;
    } break;
    default : {
    } break;
  } /* switch */ 
  return(szDate);
} /* F_szDate_Make */

/*-----F_Date_Make --------------------------------------------------------
*
*/ 
function F_Date_Make(P_iYear=0, P_iMonth=1, P_iDay=1, P_iHour=0, P_iMinutes=0, P_iSeconds=0, P_imSec=0)
{
  var Date0 = new Date();
  Date0.setFullYear(P_iYear);
  Date0.setMonth(P_iMonth - C_iDe_Month);
  Date0.setDate(P_iDay);
  
  Date0.setHours(P_iHour);
  Date0.setMinutes(P_iMinutes);
  Date0.setSeconds(P_iSeconds);
  Date0.setMilliseconds(P_imSec);
  
  return(Date0);
} /* F_Date_Make */

/*-----F_ai_Date_Mp_Date --------------------------------------------------------
*
* Convert a Date in an array of number in [YYYY, MM, DD, hh, mm, ss, sss] format.
* $TimeDate.F_ai_Date_Mp_Date(); 
*/ 
function F_ai_Date_Mp_Date(P_Date)
{
  if (!P_Date) {
     P_Date = new Date();
  } /* if */
  let iYear = P_Date.getFullYear();
  let iMonth = P_Date.getMonth() + C_iDe_Month;
  let iDay = P_Date.getDate();
  let jWDay = P_Date.getDay();
  
  let iHour = P_Date.getHours();
  let iMinutes = P_Date.getMinutes();
  let iSeconds = P_Date.getSeconds();
  let imSec = P_Date.getMilliseconds();
  
  let iTZ = P_Date.getTimezoneOffset();

  var ai_Date = [iYear, iMonth, iDay, iHour, iMinutes, iSeconds, imSec, iTZ];
   
  return(ai_Date);
} /* F_ai_Date_Mp_Date */

/*-----F_ai_Date_Mp_szDate --------------------------------------------------------
*
* Convert a string representing a Date in an array of number in [YYYY, MM, DD, hh, mm, ss, sss] format.
* $TimeDate.F_ai_Date_Mp_szDate(); 
*/ 
function F_ai_Date_Mp_szDate(P_szDate)
{
  var Date0   = F_Date_Mp_szDate(P_szDate);
  var ai_Date = F_ai_Date_Mp_Date(Date0); 
  return(ai_Date);
} /* F_ai_Date_Mp_szDate */

/*-----F_szDate_Mp_szYMD --------------------------------------------------------
*
* Given a date in YYYY-MM-DD format convert it in the expected format.
*/ 
function F_szDate_Mp_szYMD(P_szYMD, P_szjDate = S_szjDate)
{
  var szItem;
  var aTmp = null;

  if (!P_szYMD.split) {
     $Error.U_Warning(C_jCd_Cur, 1, "Was expected a date.", "");
  } /* if */
  if (P_szYMD[4] == "-") {         /* YYYY-MM-DD */
     aTmp = P_szYMD.split("-");
  } else if (P_szYMD[2] == "/") {  /* DD/MM/YYYY */
     aTmp = P_szYMD.split("/");
     let iTmp = aTmp[0];
     aTmp[0] = aTmp[2];
     aTmp[2] = iTmp;
  } else if (P_szYMD[2] == ".") {  /* MM.DD.YYYY */
     aTmp = P_szYMD.split("/");
     let iTmp = aTmp[0];
     aTmp[0] = aTmp[1];
     aTmp[1] = iTmp;
  }
  else {
     /* Try to manage NON standard format */
      if (P_szYMD[4] == "/") {         /* YYYY/MM/DD */
         aTmp = P_szYMD.split("/");
      } else if (P_szYMD[2] == "-") {  /* DD-MM-YYYY */
         aTmp = P_szYMD.split("-");
         let iTmp = aTmp[0];
         aTmp[0] = aTmp[2];
         aTmp[2] = iTmp;
      }
      else {
         return(P_szYMD);          /* Unknown or illegal format */
      } /* if */
  } /* if */

  if (aTmp == null) {
     $Error.U_Error(C_jCd_Cur, 2, "Was expected a Date", P_szYMD, false);
  } /* if */ 
  switch (P_szjDate) {
    case "DDMMYYYY": {
         szItem = aTmp[2] + "/" + aTmp[1] + "/" + aTmp[0];
    } break;
    case "MMDDYYYY": {
         szItem = aTmp[1] + "." + aTmp[2] + "." + aTmp[0];
    } break;
    case "YYYYMMDD": {         
         szItem = aTmp[0] + "-" + aTmp[1] + "-" + aTmp[2];
    } break;
    default : {
         szItem = aTmp[0] + "-" + aTmp[1] + "-" + aTmp[2];
    } break;
  } /* switch */
  return(szItem);
} /* F_szDate_Mp_szYMD */

/*-----F_szYMD_Mp_szDate --------------------------------------------------------
*
* Standardize date returning it in YYYY-MM-DD format. 
*/ 
function F_szYMD_Mp_szDate(P_szDate, P_szjDate = S_szjDate)
{
  P_szDate = P_szDate.trim();
  var szItem;
  var aTmp;
  var ch = P_szDate[2];
  
  if (!P_szDate) {
     return("");
  } /* if */
  if (P_szDate[4] == "-") {
     /* $ASSUME: P_szDate is in "YYYY-MM-DD" format then return it.  */
     return(P_szDate);
  } /* if */
  
  if (!P_szDate.split) {
     $Error.U_Warning(C_jCd_Cur, 3, "Split", "");
  } /* if */
  switch (P_szjDate) {
    case "DDMMYYYY": {
         aTmp = P_szDate.split(ch);
         szItem = aTmp[2] + "-" + aTmp[1] + "-" + aTmp[0];
    } break;
    case "MMDDYYYY": {
         aTmp = P_szDate.split(ch);
         szItem = aTmp[2] + "-" + aTmp[0] + "-" + aTmp[1];
    } break;
    case "YYYYMMDD": {       /* replace separator with '-' */
         ch = P_szDate[4];
         aTmp = P_szDate.split(ch);
         szItem = aTmp[0] + "-" + aTmp[1] + "-" + aTmp[2];
    } break;
    default : {
         szItem = P_szDate;
    } break;
  } /* switch */
 
  return(szItem); 
} /* F_szYMD_Mp_szDate */

/*-----F_jYDay_Mp_szDate --------------------------------------------------------
*
*/ 
function F_jYDay_Mp_szDate(P_szDate="")
{
  var Date0;

  if (P_szDate != "") {
     Date0 = F_Date_Mp_szDate(P_szDate);  
  }
  else {
     Date0 = new Date();
  } /* if */
  
  var jYDay = F_jYDay_Mp_Date(Date0);
  return(jYDay);
} /* F_jYDay_Mp_szDate */

/*-----F_jYDay_Mp_Date --------------------------------------------------------
*
* Calculate the day of the year (1 - 366)
* https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
*/ 
function F_jYDay_Mp_Date(P_Date)
{
  var Date_Jan1 = new Date(P_Date.getFullYear(), 0, 0);
  var iDiff = (P_Date - Date_Jan1) + ((Date_Jan1.getTimezoneOffset() - P_Date.getTimezoneOffset()) * C_ims_Min);
  var jYDay = Math.floor(iDiff / C_ims_Day);
  return(jYDay);
} /* F_jYDay_Mp_Date */

/*-----F_szDate_Mp_jYDay --------------------------------------------------------
*
*/ 
function F_szDate_Mp_jYDay(P_iYear, P_jYDay)
{
  var Date_Jan1 = new Date(P_iYear, 0, 0);
  var ims_Sec70_Jan1 = F_ims_Sec70_Mp_szDate(Date_Jan1);
  var ims_Sec70_jYDay = ims_Sec70_Jan1 + P_jYDay * C_ims_Day;
  var szDate_jYDay = F_szDate_Mp_ims_Sec70(ims_Sec70_jYDay);
  return(szDate_jYDay); 
} /* F_szDate_Mp_jYDay */

/*-----F_jYWeek_Mp_szDate --------------------------------------------------------
*
*/ 
function F_jYWeek_Mp_szDate(P_szDate="")
{
  var Date0;

  if (P_szDate != "") {
     Date0 = F_Date_Mp_szDate(P_szDate);  
  }
  else {
     Date0 = new Date();
  } /* if */
  
  var jWeek = F_jYWeek_Mp_Date(Date0);
  return(jWeek);
} /* F_jYWeek_Mp_szDate */

/*-----F_jYWeek_Mp_Date --------------------------------------------------------
*
* Calculate the week of the year (1 - 53)
*/ 
function F_jYWeek_Mp_Date(P_Date)
{
  var iYear = P_Date.getFullYear();
  if ((iYear < 1900) || (2199 < iYear)) {     
     $Error.U_Error(C_jCd_Cur, 4, "Was expected a Date in range [1900..2200)", iYear, false);
  } /* if */
  
  var jYDay = $TimeDate.F_jYDay_Mp_Date(P_Date);
  var jWeek = Math.floor((jYDay +1) / 7); 
  
  jWeek += S_aYear[iYear - 1900][1];
  
  if (jWeek <= 0) {
     jWeek = 52;
  } /* if */
  return(jWeek);
} /* F_jYWeek_Mp_Date */

const C_iYearGregRef = 1582;

/* -----F_Date_Easter -----------------------------------------------------------
*
* Easter date calculus (Gregorian Calendar) using Gauss formula.
*/
function F_Date_Easter(P_iYear)
{
  var iTmpA, iTmpB, iTmpC, iTmpD, iTmpE, iCoefM, iCoefN, iDayTmp, R_piDay, R_piMonth, szDate;

  if (P_iYear <= 0) {
     return;
  } /* if */

  if (P_iYear <= C_iYearGregRef) {
      iCoefM = 15; iCoefN = 6;
  }
  if ((C_iYearGregRef < P_iYear) && (P_iYear < 1700)) {
      iCoefM = 22; iCoefN = 2;
  }
  if ((1700 <= P_iYear) && (P_iYear < 1800)) {
      iCoefM = 23; iCoefN = 3;
  }
  else if ((1800 <= P_iYear) && (P_iYear < 1900)) {
      iCoefM = 23; iCoefN = 4;
  }
  else if ((1900 <= P_iYear) && (P_iYear < 2099)) {
      iCoefM = 24; iCoefN = 5;
  }
  else if ((2100 <= P_iYear) && (P_iYear < 2199)) {
      iCoefM = 24; iCoefN = 6;
  } /* if */

  iTmpA = P_iYear % 19;
  iTmpB = P_iYear % 4;
  iTmpC = P_iYear % 7;
  iTmpD = (19 * iTmpA + iCoefM) % 30;
  iTmpE = (2 * iTmpB + 4 * iTmpC + 6 * iTmpD + iCoefN) % 7;
  iDayTmp = (22 + iTmpD + iTmpE);
  if (iDayTmp <= 31) {
    R_piDay = iDayTmp;
    R_piMonth = C_JMonth_Mar;
  }
  else {
    iDayTmp = iTmpD + iTmpE - 9;
    R_piDay = iDayTmp;
    R_piMonth = C_JMonth_Apr;
  } /* if */
  
  szDate = P_iYear + "-" + F_szPad2(R_piMonth) + "-" + F_szPad2(R_piDay);
  
  return(szDate);
} /* F_Date_Easter */

/*-----F_Date_Holiday --------------------------------------------------------
*
*/
function F_Date_Holiday(P_iYear)
{
  var iDelta = 50 * C_ims_Day; 
  var aRcd_Easter = S_aYear[P_iYear - 1900];
  var ims_Sec70_Easter = F_ims_Sec70_Mp_szDate(aRcd_Easter[2]);
  var ims_Sec70_Holiday = ims_Sec70_Easter + iDelta;
  var szDate_Holiday = F_szDate_Mp_ims_Sec70(ims_Sec70_Holiday);
  return(szDate_Holiday);
} /* F_Date_Holiday */

/*-----F_szTime_Make --------------------------------------------------------
*
* $TimeDate.F_szTime_Make(); 
*/ 
function F_szTime_Make(P_Date)
{
  var szDate;

  if (!P_Date) {
     P_Date = new Date();
  } /* if */
  
  let iHour    = P_Date.getHours();
  let iMinutes = P_Date.getMinutes();
  let iSeconds = P_Date.getSeconds();
  let imSec    = P_Date.getMilliseconds();

  szDate = `${F_szPad2(iHour)}:${F_szPad2(iMinutes)}:${F_szPad2(iSeconds)}`;

  return(szDate);
} /* F_szTime_Make */

/*-----F_szDate_Mp_Date_2 --------------------------------------------------------
*
* Assemble parameters as a string in YYYY-MM-DDThh:mm:ss.sss format.
* $Note: about iMonth note that January is encoded as zero (0).
* $TimeDate.F_szDate_Mp_Date_2(); 
*/ 
function F_szDate_Mp_Date_2(P_Date, P_szDateKind="date", P_szjDate="YYYYMMDD")
{
  var szDate;

  if (!P_Date) {
     P_Date = new Date();
  } /* if */
  let iYear  = P_Date.getFullYear();
  let iMonth = P_Date.getMonth() + C_iDe_Month;
  let iDay   = P_Date.getDate();
  let jWDay  = P_Date.getDay();
  
  let iHour    = P_Date.getHours();
  let iMinutes = P_Date.getMinutes();
  let iSeconds = P_Date.getSeconds();
  let imSec    = P_Date.getMilliseconds();
  
  let iTZ      = P_Date.getTimezoneOffset();

  if (P_szDateKind == "time") {
     szDate = `${F_szPad2(iHour)}:${F_szPad2(iMinutes)}:${F_szPad2(iSeconds)}}`;
  }
  else {
      switch (P_szjDate) {
        case "YYYYMMDD": {         
             szDate = `${iYear}-${F_szPad2(iMonth)}-${F_szPad2(iDay)}`;
        } break;
        case "DDMMYYYY": {
             szDate = `${F_szPad2(iDay)}/${F_szPad2(iMonth)}/${iYear}`;
        } break;
        case "MMDDYYYY": {
             szDate = `${F_szPad2(iMonth)}.${F_szPad2(iDay)}.${iYear}`;
        } break;
        default : {
             szDate = `${iYear}-${F_szPad2(iMonth)}-${F_szPad2(iDay)}`;
        } break;
      } /* switch */
  
      switch (P_szDateKind) {
        case "date": {
        } break;
        case "datetime-local": {
             szDate = `${szDate} ${F_szPad2(iHour)}:${F_szPad2(iMinutes)}:${F_szPad2(iSeconds)}`;
        } break;
        case "datetime": {
             var szSign = "+";
             if (P_iMin_TZ < 0) {
                szSign = "-";
                P_iMin_TZ = - P_iMin_TZ;
             } /* if */
             var ihh_TZ = P_iMin_TZ / 60;
             var imm_TZ = P_iMin_TZ % 60; 
             szDate = `${szDate} ${F_szPad2(iHour)}:${F_szPad2(iMinutes)}:${F_szPad2(iSeconds)}.${F_szPadLft("" + imSec, 0, 3)}${szSign}${F_szPad2(ihh_TZ)}:${F_szPad2(imm_TZ)}`;
        } break;
        default : {
        } break;
      } /* switch */
  } /* if */
 
  return(szDate);
} /* F_szDate_Mp_Date_2 */

/*-----U_Init_TimeDate --------------------------------------------------------
* 
*/ 
function U_Init_TimeDate()
{
  U_Root0("$TimeDate", C_jCd_Cur);
  var aRcd0, iInc, i;

  S_szjDate = $VConfig.F_szjDate();
  
  for (var i = 0; i < 200; i++) {
      var iYear = 1900 +i;
      var szDate = `${iYear}-01-01`;
      var Date0 = F_Date_Mp_szDate(szDate); 
      var jWDay = Date0.getDay();
      if (jWDay == C_JWDay_Sunday) {
         jWDay = 7;
      } /* if */
      iInc = (jWDay <= C_JWDay_Thursday)? 1: 0;   // 03/08/2025
      aRcd0 = [];
      S_aYear[i] = aRcd0;
      aRcd0[0] = iYear;
      aRcd0[1] = iInc;
      aRcd0[2] = F_Date_Easter(iYear);
      aRcd0[3] = F_Date_Holiday(iYear);
  } /* for */
  
  _TimeDate.aYear = S_aYear;
} /* U_Init_TimeDate */

  return(_TimeDate);
})();  /* TimeDate */

