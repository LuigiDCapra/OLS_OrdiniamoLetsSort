/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : calendar.js
* Function    : Calendar functions management.
* FirstEdit   : 15/12/2019
* LastEdit    : 09/12/2025
* System      : Mozilla FireFox 80+
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
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
*     Spare module.
*     You can put here your private code.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* $NOTE:
* HTML encodes January as 0.
* HTML encodes Sunday  as 0.
* 
* szDate will be represented as string in YYYY-MM-DDThh:mm:ss.sss format.
* YMD will be represented in YYYY-MM-DD or DD/MM/YYYY or MM.DD.YYYY format as required.
*/
"use strict";

// const C_iDe_Month = 1;            /* $Note: January is encoded as 0 */

/*----- Global Constants ---------------------------------------------*/

const C_JCalendar_Julian    = 0;
const C_JCalendar_Gregorian = 1;
    
const C_iNN_Sec_Min_       = 60;
const C_iNN_Sec_Hour_      = (60 * C_iNN_Sec_Min_);
const C_iNN_Sec_Day_       = (24 * C_iNN_Sec_Hour_);
const C_iNN_Day_Week_      = 7;
const C_iNN_Day_Year_      = 365;
const C_iNN_mSec_Sec_      = 1000;

/*----- Global Variables ---------------------------------------------*/


const $Calendar = (function () {
  var _Calendar = {};
  _Calendar.U_Init          = U_Init_Calendar;   // function U_Init_Calendar();
  _Calendar.U_Show          = U_Show;            // function U_Show();
  _Calendar.U_Show2         = U_Show2;           // function U_Show2();
  _Calendar.U_Show0         = U_Show0;           // function U_Show0();
  _Calendar.U_UpdYear       = U_UpdYear;         // function U_UpdYear(P_szYear);
  _Calendar.U_UpdMonth      = U_UpdMonth;        // function U_UpdMonth(P_szMonth);
  _Calendar.U_UpdDay        = U_UpdDay;          // function U_UpdDay(P_iDay);
  _Calendar.U_PrevMonth     = U_PrevMonth;       // function U_PrevMonth();
  _Calendar.U_NextMonth     = U_NextMonth;       // function U_NextMonth();
  _Calendar.U_PrevYear      = U_PrevYear;        // function U_PrevYear();
  _Calendar.U_NextYear      = U_NextYear;        // function U_NextYear();
  _Calendar.U_ToDay         = U_ToDay;           // function U_ToDay();
  _Calendar.U_ToDay0        = U_ToDay0;          // function U_ToDay0();
  _Calendar.F_szWDay        = F_szWDay;          // function F_szWDay(P_iWDay);
  _Calendar.F_szMonth       = F_szMonth;         // function F_szMonth(P_iMonth);

  _Calendar.U_Field1        = U_Field1;          // function U_Field1(P_jFld);
  _Calendar.U_Field2        = U_Field2;          // function U_Field2(P_jFld);
  
  _Calendar.F_aRcdDay       = F_aRcdDay;         // function F_aRcdDay(P_Date_Init, P_Date_End);
  _Calendar.F_Calendar_Year = F_Calendar_Year;   // function F_Calendar_Year(P_iYear);
  _Calendar.F_Calendar_Year_Month = F_Calendar_Year_Month;   // function F_Calendar_Year_Month(P_iYear, P_iMonth=1);

  _Calendar.F_fLeap_Calendar = F_fLeap_Calendar; // function F_fLeap_Calendar(P_iYear, P_JCalendar=C_JCalendar_Gregorian);
  _Calendar.F_iDay01_Mp_Year_Calendar = F_iDay01_Mp_Year_Calendar; // function F_iDay01_Mp_Year_Calendar(P_iDay, P_iMonth, P_iYear);
  _Calendar.F_szDate_Easter = F_szDate_Easter; // function F_szDate_Easter(P_iYear, R_a_iDay01_Easter);
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Calendar;

/*----- Local Variables ----------------------------------------------*/
 
var S_aszMesi = ["", "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
var S_aszGiorni = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

var S_Key_Date  = "_Date";
var S_Key_Title = "szTitle";
var S_Key_Note  = "szNote";

var S_jDate  = 0; // "_Date";
var S_Field1 = 4; // "szTitle";
var S_Field2 = 5; // "szNote";
 
var S_szHTML_Calendar = `<div id="Id_Calendar">
  <br>
</div>`;

/*----- Local Variables ----------------------------------------------*/

var S_szDate_ToDay = "";

var S_iYear  = 2024;
var S_iMonth = 10;
var S_iDay   = 1;

var S_aToDo = [];

/*--------------------------------------------------------------------*/

/*-----U_PrevMonth --------------------------------------------------------
*
*/ 
function U_PrevMonth()
{
  if (C_JMonth_Jan < S_iMonth) {     // C_JMonth_Jan = 1
     S_iMonth--;
  }
  else {
     S_iMonth = C_JMonth_Dec;        // C_JMonth_Dec = 12
     S_iYear--;
  } /* if */
  
  var szMesi = S_aszMesi[S_iMonth];
  U_UpdMonth(szMesi);
  U_Open_Update();
} /* U_PrevMonth */

/*-----U_NextMonth --------------------------------------------------------
*
*/ 
function U_NextMonth()
{
  if (S_iMonth < C_JMonth_Dec) {
     S_iMonth++;
  }
  else {
     S_iMonth = C_JMonth_Jan;
     S_iYear++;
  } /* if */
  
  var szMesi = S_aszMesi[S_iMonth];
  U_UpdMonth(szMesi);
  U_Open_Update();
} /* U_NextMonth */

/*-----U_PrevYear --------------------------------------------------------
*
*/ 
function U_PrevYear()
{
  S_iYear--;
  U_UpdYear(S_iYear);
  U_Open_Update();
} /* U_PrevYear */

/*-----U_NextYear --------------------------------------------------------
*
*/ 
function U_NextYear()
{
  S_iYear++;
  U_UpdYear(S_iYear);
  U_Open_Update();
} /* U_NextYear */

/*-----U_ToDay0 --------------------------------------------------------
*
*/ 
function U_ToDay0()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  var Coll0 = XDB0.Coll0;
  var iLen  = Coll0.length;
  var szDate0 = $TimeDate.F_szDate_Now();
  var i, Tup0, _Date;

  /* $ASSUME: the collection is ordered by date. */
  /* $ASSUME: field _Date is a string in YYYY-MM-DD format. */
  for (i = 196; i < iLen; i++) {
      Tup0 = Coll0[i];
      _Date = Tup0._Date;
      if (szDate0 <= _Date) {
         break;
      } /* if */
  } /* for */
  $Table.U_Scroll(i +G_iDelta_Goto, 1);
} /* U_ToDay0 */

/*-----U_ToDay --------------------------------------------------------
*
*/ 
function U_ToDay()
{
  var szDate = S_szDate_ToDay;
  var Date0 = $TimeDate.F_Date_Mp_szDate(szDate);
  U_Open_Update();
  var UsrView1 = CL_UsrView0.F_UsrView_Selected();  
  U_Show_Calendar2(UsrView1, Date0);
} /* U_ToDay */

/*-----U_UpdYear --------------------------------------------------------
*
*/ 
function U_UpdYear(P_szYear)
{
  S_iYear = +P_szYear;
  var szDate = $TimeDate.F_szDate_Make(S_iYear, S_iMonth, S_iDay);
  var Date0 = $TimeDate.F_Date_Mp_szDate(szDate);
  var UsrView1 = CL_UsrView0.F_UsrView_Selected();  
  U_Show_Calendar2(UsrView1, Date0);
} /* U_UpdYear */

/*-----U_UpdMonth --------------------------------------------------------
*
*/ 
function U_UpdMonth(P_szMonth)
{
  S_iMonth = S_aszMesi.indexOf(P_szMonth);
  var szDate = $TimeDate.F_szDate_Make(S_iYear, S_iMonth, S_iDay);
  var Date0 = $TimeDate.F_Date_Mp_szDate(szDate);
  var UsrView1 = CL_UsrView0.F_UsrView_Selected();  
  U_Show_Calendar2(UsrView1, Date0);
} /* U_UpdMonth */

/*-----U_UpdDay --------------------------------------------------------
*
*/ 
function U_UpdDay(P_iDay)
{
  var szDate = $TimeDate.F_szDate_Make(S_iYear, S_iMonth, S_iDay);
  var Date0 = $TimeDate.F_Date_Mp_szDate(szDate);
  var UsrView1 = CL_UsrView0.F_UsrView_Selected();  
  U_Show_Calendar2(UsrView1, Date0);
} /* U_UpdDay */

/*-----U_Field1 --------------------------------------------------------
*
*/ 
function U_Field1(P_jFld)
{
  var szDate = $TimeDate.F_szDate_Make(S_iYear, S_iMonth, S_iDay);
  var Date0 = $TimeDate.F_Date_Mp_szDate(szDate);
  var UsrView1 = CL_UsrView0.F_UsrView_Selected();
  S_Field1 = +P_jFld;
  U_Show_Calendar2(UsrView1, Date0);
} /* U_Field1 */

/*-----U_Field2 --------------------------------------------------------
*
*/ 
function U_Field2(P_jFld)
{
  var szDate = $TimeDate.F_szDate_Make(S_iYear, S_iMonth, S_iDay);
  var Date0 = $TimeDate.F_Date_Mp_szDate(szDate);
  var UsrView1 = CL_UsrView0.F_UsrView_Selected();
  S_Field2 = +P_jFld;
  U_Show_Calendar2(UsrView1, Date0);
} /* U_Field2 */

/*-----U_Show_Calendar --------------------------------------------------------
*
* $ASSUME: we assume P_aRcd sorted by date in ascending order.
*/ 
function U_Show_Calendar(P_aRcd, P_Date)
{
  var Date0 = (P_Date)?P_Date: new Date();

  Date0.setDate(1); /* Make reference to the first day of the month */
  var jWDay = Date0.getDay();
  var aObj = [];
  var Obj0;
  var szTit = S_aszMesi[Date0.getMonth() + C_iDe_Month] + " " + Date0.getFullYear();
  var i;
  var szTxt;
  var szDate_Ini;
  var szTmp;
  var jIni;

  /*-----F_szDigest --------------------------------------------------------
  *
  * Insert todo list.
  */ 
  function F_szDigest(P_szDate)
  {
    var szDigest = ""; 
    var iCnt_Row = 0;
    jIni = 0;
    for (let j= jIni; j < P_aRcd.length; j++) {
         var Rcd0 = P_aRcd[j];
         var Date0 = Rcd0[S_Key_Date].substr(0, 10); /* 2024-12-15 */
         if (Date0 < P_szDate) {
            continue;
         } /* if */
         jIni = j;
         if (Date0 == P_szDate) {
            szDigest += "<span class='Cl_Note'>" + Rcd0[S_Key_Title] + "</span><br>";
            szDigest += "- " + Rcd0[S_Key_Note] + "<br>";         
            iCnt_Row += 2;
         } else {
            for (let j = iCnt_Row; j < 6; j++) {                
                szDigest += "<br>";
            } /* for */
            break;
         } /* if */
    } /* for */
    return(szDigest);
  } /* F_szDigest */
  
  if (jWDay != 1) {
     /* Sunday encoded as 0 */
     var iDelta = (jWDay - 1);
     Date0.setDate(Date0.getDate() -iDelta);
  } /* if */
    
  for (i = 0; i < 40; i++) {
      aObj[i] = {};
      Obj0 = aObj[i];
      Obj0.ims_Time70 = Date0.getTime();
      Obj0.szYear     = Date0.getFullYear();
      Obj0.szMonth    = Date0.getMonth() + C_iDe_Month;
      Obj0.szDay      = Date0.getDate();
      
      Obj0.szDate     = Obj0.szYear + "-" + F_szPad2(Obj0.szMonth) + "-" + F_szPad2(Obj0.szDay);      
      Date0.setDate(Date0.getDate() +1);
  } /* for */

  /* Get the first event that falls in the selected period. */  
  szDate_Ini = aObj[0].szDate;
  for (jIni = 0; jIni < P_aRcd.length; jIni++) {
      if (szDate_Ini <= P_aRcd[jIni][S_Key_Date]) {
         break;
      } /* if */
  } /* for */

  var i, j, k;
  var Mat0 = [];
  k = 0;
  for (i = 0; i < 5; i++) {
      Mat0[i] = [];
      for (j = 0; j < 7; j++) {
          Obj0 = aObj[k++];
          szTxt = "<b>" + Obj0.szDay + " " + S_aszMesi[Obj0.szMonth] + "</b>";
          szTxt += "<br>" + F_szDigest(Obj0.szDate);
          Mat0[i][j] = szTxt;
      } /* for */
  } /* for */
  
  var szTab = F_szTab_Mp_Obj(Mat0, S_aszGiorni, true);
  
  Id_Calendar.innerHTML = szTab;
} /* U_Show_Calendar */

/*-----U_Show --------------------------------------------------------
*
*/ 
function U_Show()
{
  $Calendar.DBox_0.U_Hub(C_JPnl_Open);
  U_Show_Calendar2(S_aToDo);
} /* U_Show */

/*-----U_Open_Update --------------------------------------------------------
*
* Update date showed on buttons.
*/ 
function U_Open_Update()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0   = UsrView0.XDB0;
  
  if ((XDB0.OLS_Ld) && (XDB0.OLS_Ld._CfgUV_)) {
     var CfgUV  = XDB0.OLS_Ld._CfgUV_;
     var szAux  = CfgUV.szAux;
     if (szAux) {
         var Aux0 = JSON.parse(szAux);
         S_Field1 = Aux0.jTitle;
         S_Field2 = Aux0.jNote;  
     } /* if */
  } /* if */

  Id_TBM_0.value = S_iDay;
  Id_TBM_1.value = S_aszMesi[S_iMonth];
  Id_TBM_2.value = S_iYear;
  Id_TBM_8.value = S_Field1;
  Id_TBM_9.value = S_Field2;
} /* U_Open_Update */

/*-----U_CB_Calendar --------------------------------------------------------
*
*/ 
function U_CB_Calendar()
{
  var UsrView_Sav = CL_UsrView0.F_UsrView_Selected();                           /* Save Collection currently selected. */
  var UsrView0 = CL_UsrView0.F_UsrView_Select("Agenda", C_WwFlag_Null); 
  if (!UsrView0) {
     return;
  } /* if */
  S_aToDo = UsrView0.XDB0.Coll0;
  CL_UsrView0.F_UsrView_Select(UsrView_Sav.szNmColl, C_WwFlag_Null);            /* Restore the Collection previously selected. */
} /* U_CB_Calendar */

// const C_JWDay_Sunday =    0;
// const C_JWDay_Monday =    1;
// const C_JWDay_Tuesday =   2;
// const C_JWDay_Wednesday = 3;
// const C_JWDay_Thursday =  4;
// const C_JWDay_Friday =    5;
// const C_JWDay_Saturday =  6;

var S_asz_WDay = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];

/*-----F_aRcdDay --------------------------------------------------------
*
* Generate the list of the days for the year P_iYear.
* For every day will be generate a five elements record [iYear, iMonth, iDay, iWDay, szDate].
*/ 
function F_aRcdDay(P_Date_Init, P_Date_End)
{
  var Date0   = P_Date_Init;
  var ims_0   = $TimeDate.F_ims_Sec70_Mp_Date(P_Date_Init);
  var ims_End = $TimeDate.F_ims_Sec70_Mp_Date(P_Date_End);
  var aRcdDay = [];
  var iWDay = Date0.getDay();
  var iYear, iMonth, iDay, szDate, iYDay, iYWeek;

  while (ims_0 <= ims_End) {
      Date0 = $TimeDate.F_Date_Mp_ims_Sec70(ims_0);
      [iYear, iMonth, iDay] = $TimeDate.F_ai_Date_Mp_Date(Date0);
      szDate = `${iYear}-${F_szPad2(iMonth)}-${F_szPad2(iDay)}`;
      iYDay  = $TimeDate.F_jYDay_Mp_Date(Date0);
      iYWeek = $TimeDate.F_jYWeek_Mp_Date(Date0);
      aRcdDay.push([szDate, iYear, iMonth, iDay, S_asz_WDay[iWDay], iYDay, iYWeek]);
      ims_0 += C_ims_Day;
      iWDay++;
      iWDay = iWDay % 7;  
  } /* while */  

  return(aRcdDay);
} /* F_aRcdDay */

/*-----F_Calendar_Year --------------------------------------------------------
*
* Generate the list of the days for the year P_iYear.
*/ 
function F_Calendar_Year(P_iYear)
{
  var ims_0 = $TimeDate.F_ims_Sec70_Mp_szDate("" + P_iYear + "-01-01");
  var Calendar = [];
  var Date0 = $TimeDate.F_Date_Mp_ims_Sec70(ims_0);
  var iWDay = Date0.getDay();
  var iYear, iMonth, iDay;
  
  for (var i = 1; i < 366; i++) {
      Date0 = $TimeDate.F_Date_Mp_ims_Sec70(ims_0);
      [iYear, iMonth, iDay] = $TimeDate.F_ai_Date_Mp_Date(Date0);
      Calendar.push([iYear, iMonth, iDay, S_asz_WDay[iWDay]]);
      ims_0 += C_ims_Day;
      iWDay++;
      iWDay = iWDay % 7;
  } /* for */
  Date0 = $TimeDate.F_Date_Mp_ims_Sec70(ims_0);
  [iYear, iMonth, iDay] = $TimeDate.F_ai_Date_Mp_Date(Date0);
  if (S_iYear == P_iYear) {
     Calendar.push([iYear, iMonth, iDay]);
  } /* if */  
  return(Calendar);
} /* F_Calendar_Year */

/*-----F_Calendar_Year_Month --------------------------------------------------------
*
* Generate the list of the days for the year P_iYear and P_iMonth.
*/ 
function F_Calendar_Year_Month(P_iYear, P_iMonth=1)
{
  P_iMonth = +P_iMonth;
  var aiNnDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var szMonth = (P_iMonth < 10)? "0"+ P_iMonth: "" + P_iMonth;
  var iNnDay = aiNnDay[P_iMonth];
/*
* We refer to 12:00 to avoid the problems associated with the transition from daylight saving time to solar time.
*/
  var Date0 = $TimeDate.F_Date_Make(P_iYear, P_iMonth, 1, 12);
  var ims_0 = $TimeDate.F_ims_Sec70_Mp_Date(Date0);
  var Calendar = [];
  var iWDay = Date0.getDay();
  var iYear, iMonth, iDay;
  var fLeap;
  var szNote="";
  var i, iPrv;

  if (P_iMonth == C_JMonth_Feb) {   /* 2 */
     /* February */
     fLeap = $Calendar.F_fLeap_Calendar(P_iYear, C_JCalendar_Gregorian);
     if (fLeap) {
        iNnDay = 29;
     } /* if */
  } /* if */
  
  for (i = 1; i <= iNnDay; i++) {
      Date0 = $TimeDate.F_Date_Mp_ims_Sec70(ims_0);
      [iYear, iMonth, iDay] = $TimeDate.F_ai_Date_Mp_Date(Date0);
      Calendar.push([iYear, iMonth, iDay, S_asz_WDay[iWDay], szNote]);
      iPrv = ims_0;
      ims_0 += C_ims_Day;
      iWDay++;
      iWDay = iWDay % 7;
  } /* for */

  return(Calendar);
} /* F_Calendar_Year_Month */

/*-----F_szWDay --------------------------------------------------------
*
*/ 
function F_szWDay(P_iWDay)
{
  return(S_aszGiorni[P_iWDay]);
} /* F_szWDay */

/*-----F_szMonth --------------------------------------------------------
*
*/ 
function F_szMonth(P_iMonth)
{
  return(S_aszMesi[P_iMonth]);
} /* F_szMonth */

const C_iDeltaSunday       = (C_iNN_Day_Week_ - 2 -1);  /* 02/01/01 was Sunday */

const C_iYearGregRef       =   1582;
const C_iDay01_04_10_1582  = 577737;             /* 04/10/1582 Thursday */
const C_iDay01_15_10_1582  = 577738;             /* 15/10/1582 Friday */
const C_iNNDayDeleted      =     10;             /* 15/10/1582 - 05/10/1582 */
/*
* Lunar Month == 29d 12h 44' 2",976 == 29.53059d == 2551443s
* Methonic cycle length == circa 29 years == circa 6939 days == circa 235 lunar months
*/
const C_iNNYear_Methonic = 19;
const C_iDay_Methonic    = ((C_iNNYear_Methonic * C_iNN_Day_Year_) + 4);
const C_iLMonth_Methonic = 235;
const C_iSecMonthLunar   = ((29 * C_iNN_Sec_Day_) + (12 * C_iNN_Sec_Hour_) + (44 * C_iNN_Sec_Min_) + 3);
const C_iDiffSunLun      = 11;                  /* C_iDiffSunLun = (C_iNN_Day_Year_ - C_iLMonth_Methonic +1) */

const C_iBiasEaster1     =  8;

const C_iNN_Day_4Year_   = ((4 * C_iNN_Day_Year_) +1);

/* SY standard Year, LY leap Year */

const S_aiNNDay_Month_SY  = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const S_aiNNDay_Month_LY  = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const S_aiCntDay_Month_SY = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
const S_aiCntDay_Month_LY = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
const S_aiCntDay_Month_1582 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 294, 324, 355];
//const S_aiNNDay_Month_1582  = [31, 28, 31, 30, 31, 30, 31, 31, 30, 21, 30, 31];
const S_aiCntDay_Season_SY = [80, 172, 266, 355];
const S_aiCntDay_Season_LY = [81, 173, 267, 356];
/*
* Number of day elapsed since 01/01/0000
* $NOTE: Year zero never existed but assuming it did exist simplifies the calculations.
*/
var S_aiDay01 = [
      0,   36525,   73050,  109575,  146100,  182625,  219150,  255675,  292200,  328725,
 365250,  401775,  438300,  474825,  511350,  547875,  584390,  620914,  657438,  693962,
 730487,  767011,  803535,  840059,  876584,  913108,  949632,  986156, 1022681, 1059205,
1095729, 1132253, 1168778, 1205302, 1241826, 1278350, 1314875, 1351399, 1387923, 1424447,
];

/* -----F_fLeap_Calendar -----------------------------------------------------------
*
*/
function F_fLeap_Calendar(P_iYear, P_JCalendar=C_JCalendar_Gregorian)
{
  var iYearMod4 = (P_iYear & 0x3);
  var fLeap = (iYearMod4 == 0);

  if ((C_iYearGregRef < P_iYear) && (P_JCalendar == C_JCalendar_Gregorian)) {
     if ((P_iYear % 100 == 0) && !(P_iYear % 400 == 0)) {
        fLeap = false;
     } /* if */
  } /* if */
  return(fLeap);
} /* F_fLeap_Calendar */

/* -----F_szDate_Easter -----------------------------------------------------------
*
* Easter date calculus (Gregorian Calendar) using Gauss formula.
*/
function F_szDate_Easter(P_iYear, R_a_iDay01_Easter)
{
  var iTmpA, iTmpB, iTmpC, iTmpD, iTmpE, iCoefM, iCoefN, iDayTmp;
  var R_piDay, R_piMonth;

  if (P_iYear < 33) {
     return([-1, -1]);    /* Easter was first celebrated in 33AD */
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
    
    R_a_iDay01_Easter[0] = F_iDay01_Mp_Year_Calendar(R_piDay, R_piMonth, P_iYear);
    
    return(`${P_iYear}-${R_piMonth}-${R_piDay}`);
} /* F_szDate_Easter */

/* -----F_iDay01_Mp_Year_Calendar -----------------------------------------------------------
*
* Return iDay01 corresponding to the specified date using the Gregorian Calendar.
*/
function F_iDay01_Mp_Year_Calendar(P_iDay, P_iMonth, P_iYear)
{
  var iDay01 = 0;
  var iYearPrv = P_iYear -1;
  var iTmp0 = 0;
  var iTmp1 = 0;

  if (P_iYear <= 0) {
     /* Use Julian-Calendar Analeptic */
     iTmp0   = -P_iYear +1;
     iTmp1   = Math.floor(iTmp0 / 4);
     iDay01  = iTmp1 * C_iNN_Day_4Year_;
     iTmp1   = iTmp0 % 4;
     iDay01 += iTmp1 * C_iNN_Day_Year_;
     if ((-P_iYear % 4) == 0) {
        iDay01 += 1;
     } /* if */
     iDay01  = -iDay01;
  } /* if */

  if (iYearPrv < 1) {
  }
  else if (iYearPrv < 4000) {
     iDay01 = S_aiDay01[Math.floor(iYearPrv / 100)];
     iTmp0  = iYearPrv % 100;
     if (iTmp0 != 0) {
        iTmp1   = Math.floor(iTmp0 / 4);
        iDay01 += iTmp1 * C_iNN_Day_4Year_;
        iTmp1   = iTmp0 % 4;
        iDay01 += iTmp1 * C_iNN_Day_Year_;
     } /* if */
     if ((C_iYearGregRef < P_iYear) && (P_iYear <= 1600)) {
        iDay01 -= C_iNNDayDeleted;
     } /* if */
  }
  else {
     iDay01 = F_iDay01_Mp_Year(iYearPrv, iTmp0);   // &iTmp0
  } /* if */

  if (P_iYear == C_iYearGregRef) {
     iTmp0 = S_aiCntDay_Month_1582[P_iMonth -C_iDe_Month];
  }
  else {
     if (F_fLeap_Calendar(P_iYear, C_JCalendar_Gregorian)) {
        iTmp0 = S_aiCntDay_Month_LY[P_iMonth -C_iDe_Month];
     }
     else {
        iTmp0 = S_aiCntDay_Month_SY[P_iMonth -C_iDe_Month];
     } /* if */
  } /* if */

  iDay01 = iDay01 + iTmp0 + P_iDay;
  return(iDay01);
} /* F_iDay01_Mp_Year_Calendar */

/*-----F_Key_Mp_iCol --------------------------------------------------------
*
* Given a column number return the Key corresponding to the selected field.
*/ 
function F_Key_Mp_iCol(P_UsrView, P_iCol)
{
  var fjCol  = $XDB.F_fjCol_Mp_JKndTup(P_UsrView.XDB0.JKndTup0);
  var jaFld1 = P_UsrView.F_jaFld1_Sel(P_UsrView, P_iCol +1);
  if ((jaFld1 != C_Undefined) && (0 <= jaFld1)) {
     var aFld1 = P_UsrView.aFld1[jaFld1];
     var Key = (fjCol)? aFld1.iPos0: aFld1.szNm;
     return(Key);
  }
  else {
     return(null);
  } /* if */
} /* F_Key_Mp_iCol */

/*-----U_Show_Calendar2 --------------------------------------------------------
*
* $ASSUME: we assume P_aRcd sorted by date in ascending order.
*/ 
function U_Show_Calendar2(P_UsrView, P_Date, P_Key_Date)
{
  var XDB0   = P_UsrView.XDB0;
  var P_aRcd = XDB0.Coll0;
//   var CfgUV  = XDB0.OLS_Ld._CfgUV_;
//   var szAux  = CfgUV.szAux;
  var Date0 = (P_Date)?P_Date: new Date();

  Date0.setDate(1); /* Make reference to the first day of the month */
  var jWDay = Date0.getDay();
  var aObj = [];
  var Obj0;
  var szTit = S_aszMesi[Date0.getMonth() + C_iDe_Month] + " " + Date0.getFullYear();
  var i;
  var szTxt;
  var szDate_Ini;
  var szTmp;
  var jIni;
  
      var Key_Date  = F_Key_Mp_iCol(P_UsrView, S_jDate);
      var Key_Title = F_Key_Mp_iCol(P_UsrView, S_Field1);
      var Key_Note  = F_Key_Mp_iCol(P_UsrView, S_Field2);

  /*-----F_szDigest --------------------------------------------------------
  *
  * Insert todo list.
  */ 
  function F_szDigest(P_szDate)
  {
    var szDigest = ""; 
    var iCnt_Row = 0;
    var j;
    jIni = 0;
    for (j= jIni; j < P_aRcd.length; j++) {
         G_j_Debug = j;
         var Rcd0 = P_aRcd[j];
         if (!Rcd0[Key_Date]) {
            return(szDigest);  // 2025-10-29
         } /* if */
         var Date0 = Rcd0[Key_Date].substr(0, 10);
         if (Date0 < P_szDate) {
            continue;
         } /* if */
         jIni = j;
         if (Date0 == P_szDate) {
            if (Key_Title != null) {
               G_i_Debug = Rcd0[Key_Title];
               var szTitle = Rcd0[Key_Title]; //.substr(30, 160);
               szDigest += "<span class='Cl_Note'>" + szTitle + "</span>";
            } /* if */
            if (Key_Note != null) {
               var szNote = Rcd0[Key_Note]; // .substr(30, 160);
               szDigest += "- " + szNote;
            } /* if */  
            iCnt_Row += 2;
         } else {
            for (let j = iCnt_Row; j < 6; j++) {                
                //szDigest += "<br>";
            } /* for */
            break;
         } /* if */
    } /* for */
    return(szDigest);
  } /* F_szDigest */
  
  if (jWDay != 1) {
     /* Sunday encoded as 0 */
     var iDelta = (jWDay - 1);
     Date0.setDate(Date0.getDate() -iDelta);
  } /* if */
    
  for (i = 0; i < 40; i++) {
      aObj[i] = {};
      Obj0 = aObj[i];
      Obj0.ims_Time70 = Date0.getTime();
      Obj0.szYear     = Date0.getFullYear();
      Obj0.szMonth    = Date0.getMonth() + C_iDe_Month;
      Obj0.szDay      = Date0.getDate();
      
      Obj0.szDate     = Obj0.szYear + "-" + F_szPad2(Obj0.szMonth) + "-" + F_szPad2(Obj0.szDay);      
      Date0.setDate(Date0.getDate() +1);
  } /* for */

  /* Get the first event that falls in the selected period. */  
  szDate_Ini = aObj[0].szDate;
  for (jIni = 0; jIni < P_aRcd.length; jIni++) {
      if (szDate_Ini <= P_aRcd[jIni][Key_Date]) {
         break;
      } /* if */
  } /* for */

  var i, j, k;
  var Mat0 = [];
  k = 0;
 // debugger;
  for (i = 0; i < 5; i++) {
      Mat0[i] = [];
      for (j = 0; j < 7; j++) {
          Obj0 = aObj[k++];
          if (Obj0.szDate == S_szDate_ToDay) {
             szTxt = "<mark><b>" + Obj0.szDay + " " + S_aszMesi[Obj0.szMonth] + "</b></mark>";
          }
          else {
             szTxt = "<b>" + Obj0.szDay + " " + S_aszMesi[Obj0.szMonth] + "</b>";
          } /* if */
          
          szTxt += "<br>" + F_szDigest(Obj0.szDate);
          Mat0[i][j] = szTxt;
      } /* for */
  } /* for */
  
  var szTab = F_szTab_Mp_Obj(Mat0, S_aszGiorni, true);
  
  Id_Calendar.innerHTML = szTab;
} /* U_Show_Calendar2 */

/*-----U_Show2 --------------------------------------------------------
*
*/ 
function U_Show2(P_f0=false)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var UsrView1 = F_Obj_Clone(UsrView0);
  var XDB0     = UsrView1.XDB0;
  var Tup_Sel  = XDB0.Tup_Sel;
  var Val_Sel;
  var szDate;
  
  if (!Tup_Sel) {
     $Error.U_Error(C_jCd_Cur, 1, "No row selected.", "", false);
  } /* if */
  
  var szDate = UsrView1.Val_Sel;   
  var szType = UsrView1.Fld_Sel.szType;
  switch (szType) {
    case "date":
    case "datetime":
    case "datetime-local": {
         Val_Sel = UsrView1.Val_Sel;
         szDate = Val_Sel;
    } break;
    default : {
         if (P_f0) {
//            ValSel = Tup_Sel[0];
            Val_Sel = Tup_Sel["_Date"];
            var DateTmp = new Date(Val_Sel);
            szDate = $TimeDate.F_szDate_Mp_Date(DateTmp);
         }
         else {
            $Error.U_Error(C_jCd_Cur, 2, "Field selected has not a 'date' like type.", "", false);
         } /* if */
    } break;
  } /* switch */ 
  var x = 0;
  [S_iYear, S_iMonth, S_iDay] = $TimeDate.F_ai_Date_Mp_szDate(szDate);
  $Calendar.DBox_0.U_Hub(C_JPnl_Open);
  
  var jDate = UsrView1.jaFld1;

  UsrView1.aNdx = UsrView1.F_aNdx_Make(UsrView1, jDate); 
  var Date0 = $TimeDate.F_Date_Mp_szDate(szDate);
  U_Show_Calendar2(UsrView1, Date0, S_jDate);
} /* U_Show2 */

/*-----U_Show0 --------------------------------------------------------
*
*/ 
function U_Show0()
{
  debugger;
  U_Show2(true);
} /* U_Show0 */

/*-----U_Init_Calendar --------------------------------------------------------
*
*/ 
function U_Init_Calendar()
{ 
  _Calendar.DBox_0  = new CL_DBox("Id_Div_DBox0", "$Calendar.DBox_0", "Calendar", S_szHTML_Calendar, U_Open_Update, G_DBox_Null.U_Cancel, G_DBox_Null.U_Confirm, "", "Calendar");
  S_szDate_ToDay = $TimeDate.F_szDate_Now(); 
  
  S_Key_Date  = "_Date";
  S_Key_Title = "szTitle";
  S_Key_Note  = "szNote";
  if (C_szApp == "Viola") {     
     setTimeout(U_CB_Calendar, 2000);
  } /* if */
  U_Root0("$Calendar", C_jCd_Cur, 2);  
} /* U_Init_Calendar */

  U_Root0("$Calendar", C_jCd_Cur, 1);
  return(_Calendar);
})();  /* $Calendar */
