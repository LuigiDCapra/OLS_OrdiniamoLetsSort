/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : autodetect.js
* Function    : Layout autodetect.
* FirstEdit   : 15/12/2019
* LastEdit    : 13/10/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2024
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Given a Collection of data analyze it generating automatically the corresponding Layout
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


const $AutoDetect = (function () {
  var _AutoDetect = {};
  _AutoDetect.U_Init                = U_Init_AutoDetect;     // function U_Init_AutoDetect();
  _AutoDetect.F_JKndTup             = F_JKndTup_AutoDetect;  // function F_JKndTup_AutoDetect(P_Coll0);
  _AutoDetect.F_aFld_Make           = F_aFld_Make;           // function F_aFld_Make(P_Coll0, P_JKndTup, P_fszFldNm_1);
  _AutoDetect.F_aFld_Autodetect_FLR = F_aFld_Autodetect_FLR; // function F_aFld_Autodetect_FLR(P_szRow);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_AutoDetect;

/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----F_aFld_Make --------------------------------------------------------
*
* AutoDetect
*/ 
function F_aFld_Make(P_Coll0, P_JKndTup, P_fszFldNm_1)
{
  var aFld;
  if (!P_Coll0 || (P_Coll0.length == 0)) {  
     //  26/08/2023 $Error.U_Error(C_jCd_Cur, 1, "AutoDetect requires a NON empty collections!", "");   NON funziona con Obj!!!!
  } /* if */
  
  switch (P_JKndTup) {                                                          /* Manage polymorphism*/
    case C_JKndTup_Arr: {
         aFld = CL_XDB0_Arr.F_aFld_Make(P_Coll0, P_fszFldNm_1);         
    } break;
    case C_JKndTup_Obj: {
         aFld = CL_XDB0_Obj.F_aFld_Make(P_Coll0, P_fszFldNm_1);
    } break;
    case C_JKndTup_aRcd: {
         aFld = CL_XDB0_aRcd.F_aFld_Make(P_Coll0, P_fszFldNm_1);
    } break;
    case C_JKndTup_aObj: {
         aFld = CL_XDB0_aObj.F_aFld_Make(P_Coll0, P_fszFldNm_1);         
    } break;
    case C_JKndTup_asRcd: {
         aFld = CL_XDB0_asRcd.F_aFld_Make(P_Coll0, P_fszFldNm_1);         
    } break;
    case C_JKndTup_asObj: {
         aFld = CL_XDB0_asObj.F_aFld_Make(P_Coll0, P_fszFldNm_1);
    } break;
    case C_JKndTup_as_: {
         aFld = CL_XDB0_as_.F_aFld_Make(P_Coll0, P_fszFldNm_1);
    } break;
    default : {
    } break;
  } /* switch */
  if (aFld.length == 0) {
     $Error.U_Error(C_jCd_Cur, 2, "AutoDetect failed!", "");
  } /* if */
  return(aFld);
} /* F_aFld_Make */

/*-----F_JKndTup_AutoDetect --------------------------------------------------------
*
*/ 
function F_JKndTup_AutoDetect(P_Coll0)
{
  const F_fArray = (value) => {
    return Array.isArray(value) && typeof value === 'object';
  };

  const F_fObject = (value) => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  };
  
  if (F_fArray(P_Coll0)) {
     /* Array */
    if (F_fArray(P_Coll0[0])) {
       /* Array */
       return(C_JKndTup_aRcd);
    } /* if */
    if (F_fObject(P_Coll0[0])) {
       /* Object */
       return(C_JKndTup_aObj);
    } /* if */
    return(C_JKndTup_Arr);
  } /* if */
  if (F_fObject(P_Coll0)) {
     /* Object */
    if (F_fArray(Object.values(P_Coll0)[0])) {
       /* Array */
       return(C_JKndTup_asRcd);
    } /* if */
    if (F_fObject(Object.values(P_Coll0)[0])) {
       /* Object */
       return(C_JKndTup_asObj);
    } /* if */
    return(C_JKndTup_Obj);
  } /* if */
  return(C_JKndTup_Null);
} /* F_JKndTup_AutoDetect */

/*-----F_aFld_Autodetect_FLR --------------------------------------------------------
*
* $ASSUME: the first row contains Fields names properly positioned.
*/ 
function F_aFld_Autodetect_FLR(P_szRow)
{
  var aFld = [];
  var iLen = P_szRow.length;
  var fBlank = true;
  var iFst = 0;
  var k = 0;
  
  aFld[k] = {};
  for (let i = 0; i < iLen; i++) {
      if (fBlank) {
         if (P_szRow[i] == ' ') {
            aFld[k].szNm = P_szRow.substring(iFst, i);
            aFld[k].szType = "string";
            fBlank = false;
         } /* if */
      }
      else {
         if (P_szRow[i] != ' ') {
            aFld[k].iLen = (i - iFst);
            iFst = i;
            aFld[++k] = {};
            fBlank = true;
         } /* if */
      } /* if */
  } /* for */
  aFld.pop();
  return(aFld);
} /* F_aFld_Autodetect_FLR */

/*-----U_Init_AutoDetect --------------------------------------------------------
*
*/ 
function U_Init_AutoDetect()
{
  U_Root0("$Autodetect", C_jCd_Cur);
} /* U_Init_AutoDetect */

  return(_AutoDetect);
})();  /* AutoDetect */

