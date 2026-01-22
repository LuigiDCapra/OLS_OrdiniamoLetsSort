/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : history.js
* Function    : History
* FirstEdit   : 03/11/2021
* LastEdit    : 05/12/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2024
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
"use strict";

const C_jszNmColl = 1;
const C_jUsrView0 = 2;
  
/* ***** CL_History *******************************************************
*
* The array S_aHistory has been introduced to support history.
* 
* S_aHistory = [[szNm_UsrView, UsrView], ...];
*
* $only one!
* 
* new CL_History
*/ 
class CL_History {
  static S_aHistory = [];     /* CL_History.S_aHistory */
  static S_jRdCur = -1;       /* Cursor position in the History */
  static S_jWrLst = 0;        /* Number of valid entries in the History */

/*----- Local Constants ----------------------------------------------*/

  static C_jCd_Cur = C_jCd_History;   /* $NOTE: we should define it as "static" not "const" */
 
  /*-----U_Insert --------------------------------------------------------
  *
  * CL_History.U_Insert();
  * Insert current Collection in the History.
  */ 
  static U_Insert(P_szNm_UsrView, P_UsrView)
  {
     var Rcd0;
     if (CL_History.S_jRdCur < 0) {
        CL_History.S_jRdCur = -1;
        Rcd0 = [0, "", 0]; 
     }
     else {
        Rcd0 = CL_History.S_aHistory[CL_History.S_jRdCur];
     } /* if */
     if (Rcd0[C_jszNmColl] == P_szNm_UsrView) {
         /* avoid double insertion */
         return;         
     } /* if */

     Rcd0 = [CL_History.S_jRdCur, P_szNm_UsrView, P_UsrView];
     CL_History.S_jRdCur++;
     CL_History.S_jWrLst = CL_History.S_jRdCur;
     CL_History.S_aHistory[CL_History.S_jWrLst] = Rcd0;
  } /* U_Insert */
  
  /*-----F_aHistory --------------------------------------------------------
  *
  * CL_History.F_jRd_History();
  * Return the History.
  */ 
  static F_aHistory()
  {
    debugger;
    var aHistory = CL_History.S_aHistory;
    return(aHistory);
  } /* F_aHistory */
  
  /*-----F_jRd_History --------------------------------------------------------
  *
  * CL_History.F_jRd_History();
  * Return the position in the History.
  */ 
  static F_jRd_History()
  {
    var jRdCur = CL_History.S_jRdCur;
    return(jRdCur);
  } /* F_jRd_History */
   
  /*-----U_Select_Prev --------------------------------------------------------
  *
  * CL_History.U_Select_Prev();
  */ 
  static U_Select_Prev()
  {
    CL_History.S_jRdCur--;
    if (CL_History.S_jRdCur < 0) {
       CL_History.S_jRdCur = 0;
    } /* if */
    var Rcd0 = CL_History.S_aHistory[CL_History.S_jRdCur];
    CL_UsrView0.F_UsrView_Select(Rcd0[C_jszNmColl], (C_WwFlag_fDisplay | C_WwFlag_fSearchCS)); 
    $Error.U_Try("$Table.U_Display_Table();");
  } /* U_Select_Prev */
  
  /*-----U_Select_Next --------------------------------------------------------
  *
  * CL_History.U_Select_Next();
  */ 
  static U_Select_Next()
  {
    CL_History.S_jRdCur++;
    if (CL_History.S_jWrLst < CL_History.S_jRdCur) {
       CL_History.S_jRdCur = CL_History.S_jWrLst;
       return;
    } /* if */
    if (CL_History.S_jRdCur < 0) {
       CL_History.S_jRdCur = 0;
    } /* if */
    
    var Rcd0 = CL_History.S_aHistory[CL_History.S_jRdCur];
    CL_UsrView0.F_UsrView_Select(Rcd0[C_jszNmColl], (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
    $Error.U_Try("$Table.U_Display_Table();");
  } /* U_Select_Next */
  
}  /* class CL_History */
