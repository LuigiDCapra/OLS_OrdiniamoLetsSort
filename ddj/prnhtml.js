/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : prnhtml.js
* Function    : HTML files creation
* FirstEdit   : 12/11/2024
* LastEdit    : 20/02/2025
* System      : Mozilla FireFox 80+
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*    Print a data Collection as a HTML file or a sequence of HTML files.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* 
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Object --------------------------------------------------------
*
*/ 
const $PrnHTML = (function () {
  var _PrnHTML = {};
  _PrnHTML.U_Init            = U_Init_PrnHTML;      // function U_Init_PrnHTML();
  _PrnHTML.F_szHTML_Mp_Coll  = F_szHTML_Mp_Coll;    // function F_szHTML_Mp_Coll(P_UsrView0, P_szNm_Sav, P_jPrimKey);
  _PrnHTML.F_szHTML_Calendar = F_szHTML_Calendar;   // function F_szHTML_Calendar(P_UsrView0, P_szNm_Sav, P_jPrimKey);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_PrnHTML;

/*----- Local Variables ----------------------------------------------*/

/*----- Local Variables ----------------------------------------------*/

var S_szTemplate_Simple = `
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="content-type">
    <title>$title$</title>
    <meta content="$author$" name="author">
    <meta content="TUISys' Ordiniamo/Let's Sort (OLS)" name="generator">
  </head>
  <body>
  $InsertHere$
  </body>
</html>
`; /* S_szTemplate_Simple */

var S_szTemplate_Help = `
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="content-type">
    <title>$title$</title>
    <meta content="$author$" name="author">
    <meta content="TUISys' Ordiniamo/Let's Sort (OLS)" name="generator">
    <link rel="stylesheet" href="help.css">
  </head>
  <body>
    <div class="Cl_Flex_Row">
      <div class="Cl_MargLft"><br>
        <iframe id="Id_Item_ASide0" src="aside.html" type="text/html"></iframe><br>
      </div>
      <main id="Id_Main">
         <h1>$title$</h1>
         $InsertHere$
      </main>
    </div>
  </body>
</html>
`; /* S_szTemplate_Help */

var S_szTemplate_Slides = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   version="1.1"
   width="1130"
   height="690"
>
<foreignObject>
<style>
text {
  font-style:normal;
  font-weight:normal;
  font-size:30px;
  line-height:125%;font-family:'Times New Roman';
  -inkscape-font-specification:'Times New Roman';
  text-align:start;
  letter-spacing:0px;
  word-spacing:0px;
  text-anchor:start;
  fill:#0000ff;
  fill-opacity:1;
  stroke:none;
  stroke-width:1px;
  stroke-linecap:butt;
  stroke-linejoin:miter;
  stroke-opacity:1
}
article {
  font-size: 200%;
}
p { 
  margin-bottom: 0%; 
  margin-top: 0%;
}
</style>
</foreignObject>
    
  <title
     id="title1">Taccuino</title>
  <defs
     id="defs1">
    <pattern
       id="grid1"
       x="0"
       y="0"
       width="20"
       height="20"
       fill="white"
       patternUnits="userSpaceOnUse">
      <line
         x1="0"
         y1="0"
         x2="20"
         y2="0"
         stroke="#00FFFF"
         id="line1" />
      <line
         x1="0"
         y1="0"
         x2="0"
         y2="20"
         stroke="#00FFFF"
         id="line2" />
    </pattern>
    <symbol
       id="spire">
      <circle
         cx="75"
         cy="17"
         r="10"
         style="fill:#808080;stroke:#000000"
         id="circle1"
      />
      <path
         style="fill:#f3f0e7;stroke:#000000"
         d="M 40,56 A 32,28 0 1 1 80,26 l -7,1 A 24.5,22.5 0 1 0 40,50 l 0,6"
         id="path1"
          />
    </symbol>
  </defs>
  <g id="layer1">
    <rect
       x="25"
       y="0"
       width="1100"
       height="680"
       style="fill:#ffffff;fill-opacity:1;stroke:#0000ff"
       id="rect20" />
    <rect
       x="25"
       y="0"
       width="1098"
       height="680"
       style="fill:url(#grid1)"
       id="rect18" />
    <use xlink:href="#spire" x="-16" y="10" />
    <use xlink:href="#spire" x="-16" y="50" />
    <use xlink:href="#spire" x="-16" y="90" />
    <use xlink:href="#spire" x="-16" y="130" />
    <use xlink:href="#spire" x="-16" y="170" />
    <use xlink:href="#spire" x="-16" y="210" />
    <use xlink:href="#spire" x="-16" y="250" />
    <use xlink:href="#spire" x="-16" y="290" />
    <use xlink:href="#spire" x="-16" y="330" />
    <use xlink:href="#spire" x="-16" y="370" />
    <use xlink:href="#spire" x="-16" y="410" />
    <use xlink:href="#spire" x="-16" y="450" />
    <use xlink:href="#spire" x="-16" y="490" />
    <use xlink:href="#spire" x="-16" y="530" />
    <use xlink:href="#spire" x="-16" y="570" />
    <use xlink:href="#spire" x="-16" y="610" />   
  </g>
  <g>
  
<foreignObject x="150" y="50" width="900" height="500">
  <article xmlns="http://www.w3.org/1999/xhtml">
    <style>
    article {
      font-size: 200%;
    }   
    p { 
      margin-bottom: 0%; 
      margin-top: 0%;
    }
    </style>
    $InsertHere$
  </article>
</foreignObject>
    <text>
       <tspan id="tspan4970" x="250" y="660">$autore$, "$titolo$", $località$, $anno$</tspan>
    </text>
  </g>
  <g
     id="layer2"
     transform="translate(0,0)" />
</svg>`; /* S_szTemplate_Slides */

var S_szTemplate_Blu = `
<!DOCTYPE html>
<html it>
  <head>
    <meta content="text/html; charset=windows-1252" http-equiv="content-type">
    <title>Intelligenza Artificiosa.</title>
    <meta content="Luigi D. CAPRA" name="author">
    <link rel="stylesheet" href="res/slide.css">
    <style>
      #Id_0{
      vertical-align: top;
      }
      #Id_1{
        text-align: center;
        vertical-align: middle;
      }
    </style>
  </head>
  <body>
    <main>
$InsertHere$
    </main>
  </body>
</html>
`; /* S_szTemplate_Blu */

/*--------------------------------------------------------------------*/

/*-----F_sz_EncodeEntity --------------------------------------------------------
*
* Replace unicode-codes with its equivalent html-entities.
*  Ref. https://stackoverflow.com/questions/18749591/encode-html-entities-in-javascript
*/ 
function F_sz_EncodeEntity(P_sz)
{
  var sz1 = P_sz;
  if (typeof(P_sz) == "string") {
     sz1 = P_sz.replace(/[\u00A0-\u9999<>\&]/g, function(P_ch) {return('&#'+P_ch.charCodeAt(0)+';');});
  } /* if */
  return(sz1); 
} /* F_sz_EncodeEntity */

/*-----F_szHTML_Mp_Coll --------------------------------------------------------
*
* Insert the selected content of the Collection in a HTML file.
*
*/ 
function F_szHTML_Mp_Coll(P_UsrView0, P_szNm_Sav, P_jPrimKey, P_fSlides=false, P_szNm_Temp="Simple")
{
  var szTxt = "";

  switch (P_szNm_Temp) {
    case "calendar": {
    } break;
    case "error": {
       szTxt = F_szHTML_Mp_Coll_Error(P_UsrView0, "error", P_jPrimKey, false, "Help");
    } break;
    default : {
       /* Use standard Template */
       szTxt = F_szHTML_Mp_Coll_Std(P_UsrView0, P_szNm_Sav, P_jPrimKey, P_fSlides, P_szNm_Temp);
    } break;
  } /* switch */

  return(szTxt);
} /* F_szHTML_Mp_Coll */

/*-----F_szHTML_Mp_Coll_Error --------------------------------------------------------
*
* Generate the help file.
* 
* $ASSUME:
* Tup[0].Tup[1] error message code;
* Tup[2] error message;
* Tup[5] description;
*/ 
function F_szHTML_Mp_Coll_Error(P_UsrView0, P_szNm_Sav, P_jPrimKey, P_fSlides, P_szNm_Temp)
{
  var asTemp = {"Simple":S_szTemplate_Simple, "Help":S_szTemplate_Help, "Slides":S_szTemplate_Slides, "Blu":S_szTemplate_Blu};
  var UsrView0 = P_UsrView0;
  var XDB0     = UsrView0.XDB0;
  var JKndTup0 = XDB0.JKndTup0;
  var aFld1   = P_UsrView0.aFld1;
  var aiPos   = P_UsrView0.aiPos;
  var iCard_aiPos = aiPos.length;
  var Coll0   = XDB0.Coll0;
  var szTitle = P_szNm_Sav;
  var szUser  = $VConfig.F_ValSts_Get("szUser");
  var aKey    = [];
  var szTxt = "";
  var szExt = "html";
  var szTit, szSect, Tup0, Key, szNm, szTmp, i1, iLen;
  var i = 0;
  var j = 0;
  
  var szTemp = asTemp[P_szNm_Temp];
  if (!szTemp) {
     szTemp = S_szTemplate_Simple;
     P_fSlides = false;
  } /* if */ 

  szTemp = szTemp.replaceAll("$title$",    szTitle);  
  szTemp = szTemp.replaceAll("$author$",   "Luigi Capra");  
  szTemp = szTemp.replaceAll("$location$", "Villareggia");  
  szTemp = szTemp.replaceAll("$year$",     "2025");  
  
  var szPlaceHolder = "$InsertHere$";
  var iPos  = szTemp.indexOf(szPlaceHolder);
  var iLen  = szPlaceHolder.length;
  var szIni = szTemp.substr(0, iPos);
  var szEnd = szTemp.substr(iPos + iLen);
  var szBody = "";
  var szCd;
  var szNum; 
  
  var fjCol = $XDB.F_fjCol_Mp_JKndTup(JKndTup0);
  for (i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm  = aFld1[i1].szNm;
      var iPos0 = aFld1[i1].iPos0;
      if (i1 != P_jPrimKey) {
         aKey[j++] = (fjCol)? iPos0: szNm;
      } /* if */
  } /* for */
  iLen = aKey.length;

  j = 0;
  for (Key in Coll0) {
      Tup0 = Coll0[Key];
      szTit   = "" + Tup0[0] + "." + Tup0[1].trim() + " - " + Tup0[2];
      szCd    = "" + Tup0[0] + "_" + Tup0[1].trim();
      
      szSect  = `<section id="Id_Sec_${szCd}">\n`;
      szSect += `<h2>${szTit}</h2>`;
      szTmp = "";
      for (i = 0; i < iLen; i++) {
          let szTmp2 = F_sz_EncodeEntity(Tup0[aKey[i]]);
          szTmp += "<p>" + szTmp2 + "</p>\n";
      } /* for */
      szSect += szTmp;
      szSect += "</section>\n";
      szBody += szSect + "<br>\n";
      if (P_fSlides) {
         szTxt = szIni + szSect + szEnd;
         szNum = F_szPadLft(j +2, "0", 3);
         var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "write", `R:/slide${szNum}.${szExt}&szUser=LCD`);
         $IPCF.U_UpLoad_File(szURL, szTxt);
      } /* if */
      j++
  } /* for */
  szTxt = szIni + szBody + szEnd;
  return(szTxt);
} /* F_szHTML_Mp_Coll_Error */

/*-----F_szHTML_Mp_Coll_Std --------------------------------------------------------
*
* Insert the selected content of the Collection in a HTML file.
* 
* $[0] + "." + $[1] + " - " + $[2]
*/ 
function F_szHTML_Mp_Coll_Std(P_UsrView0, P_szNm_Sav, P_jPrimKey, P_fSlides=false, P_szNm_Temp="Simple")
{
  var asTemp = {"Simple":S_szTemplate_Simple, "Slides":S_szTemplate_Slides, "Blu":S_szTemplate_Blu};
  var UsrView0 = P_UsrView0;
  var XDB0     = UsrView0.XDB0;
  var JKndTup0 = XDB0.JKndTup0;
  var aFld1   = P_UsrView0.aFld1;
  var aiPos   = P_UsrView0.aiPos;
  var iCard_aiPos = aiPos.length;
  var Coll0   = XDB0.Coll0;
  var szTitle = P_szNm_Sav;
  var szUser  = $VConfig.F_ValSts_Get("szUser");
  var aKey    = [];
  var szTxt = "";
  var szExt = "html";
  var szTit, szSect, Tup0, Key, szNm, szTmp, i1, iLen;
  var i = 0;
  var j = 0;
  
  var szTemp = asTemp[P_szNm_Temp];
  if (!szTemp) {
     szTemp = S_szTemplate_Simple;
     P_fSlides = false;
  } /* if */ 

  szTemp = szTemp.replaceAll("$title$",    szTitle);  
  szTemp = szTemp.replaceAll("$author$",   "Luigi Capra");  
  szTemp = szTemp.replaceAll("$location$", "Villareggia");  
  szTemp = szTemp.replaceAll("$year$",     "2025");  
  
  var szPlaceHolder = "$InsertHere$";
  var iPos  = szTemp.indexOf(szPlaceHolder);
  var iLen  = szPlaceHolder.length;
  var szIni = szTemp.substr(0, iPos);
  var szEnd = szTemp.substr(iPos + iLen);
  var szBody = "";
  var szNum; 
  
  var fjCol = $XDB.F_fjCol_Mp_JKndTup(JKndTup0);
  for (i = 0; i < iCard_aiPos; i++) {
      var i1 = aiPos[i];
      var szNm  = aFld1[i1].szNm;
      var iPos0 = aFld1[i1].iPos0;
      if (i1 != P_jPrimKey) {
         aKey[j++] = (fjCol)? iPos0: szNm;
      } /* if */
  } /* for */
  iLen = aKey.length;

  j = 0;
  for (Key in Coll0) {
      Tup0 = Coll0[Key];
      szTit   = F_sz_EncodeEntity(Tup0[P_jPrimKey]);
      szSect  = `<section id="Id_Sec_${j}">\n`;
      szSect += `<h2>${szTit}</h2>`;
      szTmp = "";
      for (i = 0; i < iLen; i++) {
          let szTmp2 = F_sz_EncodeEntity(Tup0[aKey[i]]);
          szTmp += "<p>" + szTmp2 + "</p>\n";
      } /* for */
      szSect += szTmp;
      szSect += "</section>\n";
      szBody += szSect + "<br>\n";
      if (P_fSlides) {
         szTxt = szIni + szSect + szEnd;
         szNum = F_szPadLft(j +2, "0", 3);
         var szURL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "write", `R:/slide${szNum}.${szExt}&szUser=LCD`);
         $IPCF.U_UpLoad_File(szURL, szTxt);
      } /* if */
      j++
  } /* for */
  szTxt = szIni + szBody + szEnd;
  return(szTxt);
} /* F_szHTML_Mp_Coll_Std */

/*-----F_szHTML_Calendar --------------------------------------------------------
*
* Generate Calendar.
*/ 
function F_szHTML_Calendar(P_iYear, P_UsrView0, P_szNm_Sav, P_jPrimKey, P_fSlides=false, P_szNm_Temp="Simple")
{
  var szIni = `<table style="width: 100%" border="1">
  <colgroup>
    <col style="width:5%;">
    <col style="width:5%;">
    <col style="width:5%;">
    <col style="width:5%;">
    <col style="width:80%";>
  </colgroup>
      <tbody>
      `;
  var szEnd = `</tbody>
    </table>`;
  var szHTML = "";
  var Month0;
  var szTxt;
  var szTemp = S_szTemplate_Simple;
  var i, j, k;
  szHTML += szIni;
  var fCatholic = true;
  
  var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("santi", true);
  var XDB0    = UsrView0.XDB0;
  var Coll0   = XDB0.Coll0;
  var fLeap   = $Calendar.F_fLeap_Calendar(P_iYear, C_JCalendar_Gregorian);

  var a_iDay01_Easter = [0];
  var szDate_Easter = $Calendar.F_szDate_Easter(P_iYear, a_iDay01_Easter);

  if (fCatholic) {
     /* Ref. http://calendario.eugeniosongia.com/feste.htm */

     var iDay01_YearEve = $Calendar.F_iDay01_Mp_Year_Calendar(1, 1, P_iYear);
     var iDay01_Easter  = a_iDay01_Easter[0];
     var iYDay_Easter   = (iDay01_Easter - iDay01_YearEve) +1;
     var iDay01_Christmas = $Calendar.F_iDay01_Mp_Year_Calendar(25, 12, P_iYear);
     var Date_Christmas = $TimeDate.F_Date_Mp_szDate("" + P_iYear + "-12-25");
     var iWDay_Christmas = Date_Christmas.getDay();
     var iYDay_Christmas  = (iDay01_Christmas - iDay01_YearEve) +1;
     
     var iYDay_Avvento1 = iYDay_Christmas - iWDay_Christmas - 21;
     
//     ALERT("xxx",1);
      
     var iYDay_Carnevale    = iYDay_Easter - 49;
     var iYDay_Ceneri       = iYDay_Easter - 46;
     var iYDay_Quaresima1   = iYDay_Easter - 42;
     var iYDay_Quaresima2   = iYDay_Easter - 35;
     var iYDay_Quaresima3   = iYDay_Easter - 28;
     var iYDay_Quaresima4   = iYDay_Easter - 21;
     var iYDay_Quaresima5   = iYDay_Easter - 14;
     var iYDay_Palme        = iYDay_Easter -  7;
     var iYDay_Ascensione   = iYDay_Easter + 39;
     var iYDay_LunediAngelo = iYDay_Easter +  1;
     var iYDay_Pentecoste   = iYDay_Easter + 49;
     var iYDay_Trinità      = iYDay_Easter + 56;
     var iYDay_CorpusDomini = iYDay_Easter + 60;
     var iYDay_SacroCuore   = iYDay_Easter + 68;
     
     Coll0[iYDay_Easter      ].szNote = "<b>Pasqua      </b>";
     Coll0[iYDay_LunediAngelo].szNote = "<b>Lunedì dell'Angelo</b>";
     Coll0[iYDay_Carnevale   ].szNote = "<b>Carnevale   </b>";
     Coll0[iYDay_Ceneri      ].szNote = "<b>Ceneri      </b>";
     Coll0[iYDay_Quaresima1  ].szNote = "<b>Quaresima 1  </b>";
     Coll0[iYDay_Quaresima2  ].szNote = "<b>Quaresima 2  </b>";
     Coll0[iYDay_Quaresima3  ].szNote = "<b>Quaresima 3  </b>";
     Coll0[iYDay_Quaresima4  ].szNote = "<b>Quaresima 4  </b>";
     Coll0[iYDay_Quaresima5  ].szNote = "<b>Quaresima 5  </b>";
     Coll0[iYDay_Palme       ].szNote = "<b>Domenica delle Palme</b>";
     Coll0[iYDay_Ascensione  ].szNote = "<b>Ascensione  </b>";
     Coll0[iYDay_Pentecoste  ].szNote = "<b>Pentecoste  </b>";
     Coll0[iYDay_Trinità     ].szNote = "<b>Trinità     </b>";
     Coll0[iYDay_CorpusDomini].szNote = "<b>CorpusDomini</b>";
     

     Coll0[iYDay_Avvento1    ].szNote  = "<b>Avvento 1</b>";
     Coll0[iYDay_Avvento1 +  7].szNote = "<b>Avvento 2</b>";
     Coll0[iYDay_Avvento1 + 14].szNote = "<b>Avvento 3</b>";
     Coll0[iYDay_Avvento1 + 21].szNote = "<b>Avvento 4</b>";

     Coll0[iYDay_Christmas   ].szNote = "<b>Natale</b>";
     Coll0[iYDay_Christmas +1].szNote = "<b>Santo Stefano</b>";
  } /* if */
 

  k = 1;
  for (i = 1; i <= 12; i++) {
      Month0 = $Calendar.F_Calendar_Year_Month(P_iYear, i);
      
      for (j = 0; j < Month0.length; j++) {
          szHTML += "<tr>";
          szTxt = `<td>${k}</td><td>${Month0[j][3]}</td><td>${Month0[j][2]}</td><td>${$Calendar.F_szMonth(Month0[j][1])}</td><td>${Coll0[k -1].szNote}</td>`;
          szHTML += szTxt + "<tr>";
          k++;
      } /* for */    
      if (i == 2) {
         /* Skip February 29th */
         if (!fLeap) {
            k++;
         } /* if */
      } /* if */
  } /* for */

  szHTML += szEnd;
  
  szTemp = szTemp.replace("$titolo$", "Calendario");  
  szTemp = szTemp.replace("$autore$", "Luigi Capra");  
  szTemp = szTemp.replace("$InsertHere$", szHTML);    
 
  return(szTemp);
} /* F_szHTML_Calendar */

/*-----U_Init_PrnHTML --------------------------------------------------------
*
*/ 
function U_Init_PrnHTML()
{
  U_Root0("$PrnHTML", C_jCd_Cur);
} /* U_Init_PrnHTML */

  return(_PrnHTML);
})();  /* PrnHTML */

