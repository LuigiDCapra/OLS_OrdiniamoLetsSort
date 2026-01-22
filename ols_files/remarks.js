/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : remarks.js
* Function    : User remarks management.
* FirstEdit   : 08/02/2025
* LastEdit    : 11/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
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
*     Spare module.
*     You can put here your private code.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* $NOTE: see also $XTG.U_Set_szNote();
* 
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/


const $Remarks = (function () {
  var _Remarks = {};
  _Remarks.U_Init          = U_Init_Remarks;    // function U_Init_Remarks();
  _Remarks.U_Ins_Rem       = U_Ins_Rem;         // function U_Ins_Rem();
  _Remarks.U_GetTup        = U_GetTup;          // function U_GetTup();
  _Remarks.U_Show_Img      = U_Show_Img;        // function U_Show_Img();
  _Remarks.U_Open          = U_Open;            // function U_Open();

  _Remarks.U_Set_szRem     = U_Set_szRem;       // function U_Set_szRem(P_szRem="remarks");
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Remarks;

/*----- Local Variables ----------------------------------------------*/

var S_szRem = "remarks";

/*--------------------------------------------------------------------*/

/*-----U_Set_szRem --------------------------------------------------------
*
*/ 
function U_Set_szRem(P_szRem="remarks")
{
  S_szRem = P_szRem;
} /* U_Set_szRem */

/*-----U_Ins_Rem --------------------------------------------------------
*
* Insert a new remark in the "remarks" collection.
*/ 
function U_Ins_Rem()
{

  function U_CB_Ins_Rem()
  {
    var szDate  = $TimeDate.F_szDate_Now("date");  
    var szRem   = $TabPrm.F_ValSts_Get("Rem", "szRem");
    var szClass = $TabPrm.F_ValSts_Get("Rem", "szClass");
    var szFlNm  = $TabPrm.F_ValSts_Get("Rem", "szFlNm");
    if ((szFlNm == "") || (szFlNm == " ")) {
       szFlNm = "Remarks";
    } /* if */

    switch (szFlNm) {
      case "Remarks": {
            if ($VConfig.F_ValSts_Get("fLoadRemarks")) {
               var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("remarks", true);
               var Coll1 = UsrView1.XDB0.Coll0;
               var Rem0 = [szNmColl, szKey, szRem, szClass, szDate];          
               Coll1[Coll1.length] = Rem0;  // Insert in the Remark's collection      
               UsrView1.U_Upd_aNdx();       // Remake index.
               var szTxt = $OutData.F_szOLS_Mp_Coll(UsrView1, "remarks", -1, false);
        
               szFlNm_Remarks = UsrView0.F_szVal_CfgUV0("szURL_Remarks");
               if (!szFlNm_Remarks) {
                  szFlNm_Remarks = $VConfig.F_ValSts_Get("szFlNm_Remarks");
               } /* if */ 
               $LcdLcd.U_Write(szFlNm_Remarks, szTxt);
            } /* if */
      } break;
      case "Alt-Remarks": {
               var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("alt-remarks", true);
               if (!UsrView1) {                 
                  $Error.U_Error(C_jCd_Cur, 1, `The Collection ${szFlNm} was not found.\nLoad it and retry.`, "", false);
                  return;
               } /* if */
               var Coll1 = UsrView1.XDB0.Coll0;
               var Rem0 = [szNmColl, szKey, szRem, szClass, szDate];          
               Coll1[Coll1.length] = Rem0;  // Insert in the Alt-Remark's collection      
               UsrView1.U_Upd_aNdx();       // Remake index.
               var szTxt = $OutData.F_szOLS_Mp_Coll(UsrView1, "alt-remarks", -1, false);
        
               szFlNm_Remarks = UsrView0.F_szVal_CfgUV0("szURL_Remarks");
               if (!szFlNm_Remarks) {
                  szFlNm_Remarks = $VConfig.F_ValSts_Get("szFlNm_Remarks");
               } /* if */
               szFlNm_Remarks = szFlNm_Remarks.replace("remarks", "alt-remarks"); 
               $LcdLcd.U_Write(szFlNm_Remarks, szTxt);
      } break;
      case "Directories" : {
               var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("dirs.as_", true);
               var Coll1 = UsrView1.XDB0.Coll0;
               var szTmp = szNmColl + szKey;         
               Coll1[szRem] = szTmp.replace(" / ", "");        
               szFlNm_Remarks = "d:/dbase/LCD/dirs.as_";      // $Versioning
               szTxt = JSON.stringify(Coll1);
               $LcdLcd.U_Write(szFlNm_Remarks, szTxt);      
      } break;
      case "Files" : {
               var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("files.as_", true);
               var Coll1 = UsrView1.XDB0.Coll0;
               var szTmp = szNmColl + szKey;         
               Coll1[szRem] = szTmp.replace(" / ", "");        
               szFlNm_Remarks = "d:/dbase/LCD/files.as_";      // $Versioning
               szTxt = JSON.stringify(Coll1);
               $LcdLcd.U_Write(szFlNm_Remarks, szTxt);        
      } break;
      case "Finance" : {
               var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("fin-rem", true);
               var Coll1 = UsrView1.XDB0.Coll0;
               var Rem0 = [szNmColl, szKey, szRem, szClass, szDate];          
               Coll1[Coll1.length] = Rem0;  // Insert in the Remark's collection      
               UsrView1.U_Upd_aNdx();       // Remake index.
               var szTxt = $OutData.F_szOLS_Mp_Coll(UsrView1, "fin-rem", -1, false);
        
               szFlNm_Remarks = "d:/dbase/LCD/fin-rem.OLS";      // $Versioning
               $LcdLcd.U_Write(szFlNm_Remarks, szTxt);    
      } break;
      default : {
      } break;
    } /* switch */
    
    CL_UsrView0.F_UsrView_Select(szNmColl, C_WwFlag_fDisplay);   /* Restore the Collection previously selected. */
  } /* U_CB_Ins_Rem */

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var Coll0 = XDB0.Coll0;
  var szNmColl  = UsrView0.szNmColl;
  var Tup_Sel = XDB0.Tup_Sel;
  var szFlNm_Remarks;

  if (!Tup_Sel) {
     return;
  } /* if */
  
  var szKey = Tup_Sel[XDB0.jPrimKey];
  $Panel.U_Display("Rem", U_CB_Ins_Rem);
} /* U_Ins_Rem */

/*-----U_GetTup --------------------------------------------------------
*
* Open the Collection entry corresponding to the remark selected.
*/ 
function U_GetTup()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var Tup_Sel = XDB0.Tup_Sel;
  var szPATH, Tup0;
  if (Tup_Sel[1].indexOf(" / ") < 0) {
     /* file */
     szPATH  = Tup_Sel[0] + Tup_Sel[1];
     Tup0    = XDB0.Coll0[UsrView0.KeyTup];
     $FileMan.U_Open_PATH_2(szPATH, Tup0);
  }
  else {
     /* dir */
     szPATH  = Tup_Sel[0] + Tup_Sel[1].substr(3);
     Tup0    = XDB0.Coll0[UsrView0.KeyTup];
     $FileMan.U_Open_PATH_2(szPATH, "dir");
  } /* if */
} /* U_GetTup */

/*-----U_Show_Img --------------------------------------------------------
*
*/ 
function U_Show_Img()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  var aNdx0 = UsrView0.F_aNdx();
  var Coll0 = XDB0.Coll0;  
  var szDir = XDB0.szNmColl;
  var iCard = aNdx0.length;
  var iNnCol = $VConfig.F_i_ValSts_Get("iNn_Col");
  var iNnRow = (iCard + iNnCol -1) / iNnCol;
  var i, j, k, k1;
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
function U_Pippo(P_sz)
{
  debugger;
  open(P_sz, 'single');
} /* U_Pippo */
</script>
</html>`;
  var szPfx = $NDU.F_szDir_Server("localhost") + "read.php/?szTopic=";

  k = 0;
  for (i = 0; i < iNnRow; i++) {
      szRow = "";
      szTmp = "";
      for (j = 0; j < iNnCol; j++) {
          k1 = aNdx0[k];
          var Tup0 = Coll0[k1]; 
          if (k < iCard) {
             szPath = Tup0[0] + Tup0[1];
             szURL = szPfx + szPath;
             szImg = `<image src="${szURL}"> <br> ${Tup0[2]}<br><figcaption><a href="${szURL}">${szPath}</a></figcaption>`;
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
} /* U_Show_Img */

/*-----U_CB_Test --------------------------------------------------------
*
*/ 
function U_CB_Test()
{
//   ALERT("Test",1);
//   debugger;
} /* U_CB_Test */

/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open()
{
  CL_UsrView0.F_UsrView_Select("remarks", C_WwFlag_fDisplay);
} /* U_Open */

/*-----U_Init_Remarks --------------------------------------------------------
*
*/ 
function U_Init_Remarks()
{
  U_Root0("$Remarks", C_jCd_Cur, 2);
} /* U_Init_Remarks */

  U_Root0("$Remarks", C_jCd_Cur, 1);
  return(_Remarks);
})();  /* $Remarks */
