/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : panel.js
* Function    : Panel display
* FirstEdit   : 03/02/2025
* LastEdit    : 06/12/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Expand the given Panel for display.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* See: panel's templates are stored in "panel.asObj". 
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Panel --------------------------------------------------------
*
*/ 
const $Panel = (function () {
  var _Panel = {};
  _Panel.U_Init        = U_Init_Panel;     // function U_Init_Panel();
  _Panel.U_Display     = U_Display;        // function U_Display();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Panel;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----U_Display --------------------------------------------------------
*
* Display Panel P_szNm_Pnl
*/
function U_Display(P_szNm_Pnl, P_U_CB, P_aRcd_Dflt)
{
  var szNmColl_Prv = CL_UsrView0.F_UsrView_Selected().szNmColl;
  var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("panel.asObj", false);
  var XDB0   = UsrView0.XDB0;
  var Coll0  = UsrView0.XDB0.Coll0;
  var aFld0  = Coll0[P_szNm_Pnl];
  var Panel1 = [{}];
  var sz_aFld = "aFld_Panel";
  var JKndTup0 = C_JKndTup_aObj;

  var Panel2 = Panel1[0];
  var szNm, Val0;
  var i;
  
  if (P_aRcd_Dflt) {
     var iLen = P_aRcd_Dflt.length;
     if (iLen > 0) {
        /* aRcd */
        for (i = 0; i < iLen; i++) {
            szNm = aFld0[i].szNm;
            Val0 = P_aRcd_Dflt[i];
            Panel2[szNm] = (Val0 != C_Undefined)? Val0: "";    /* set default */
        } /* for */       
     }
     else {
        /* Object */
        var Obj0 = P_aRcd_Dflt;
        for (szNm in Obj0) {
            Val0 = Obj0[szNm];
            Panel2[szNm] = (Val0 != C_Undefined)? Val0: "";    /* set default */
        } /* for */
        sz_aFld = "AutoDetect";
        aFld0 = null;
        Panel2 = P_aRcd_Dflt;
//        Panel2 = [Panel2]; 
     } /* if */
      $TabPrm.U_Set_Coll(P_szNm_Pnl, Panel2);  /* Insert parameters in $TabPrm.S_TabPrm */
      var XDB0 = new CL_XDB([P_szNm_Pnl, JKndTup0, Panel1, aFld0, sz_aFld, "", (C_WwFlag_fOverWrite), C_jCd_Cur, C_Bag_UsrView_Dflt]);
  }
  else {
      for (i = 0; i < aFld0.length; i++) {
          szNm = aFld0[i].szNm;
          Val0 = aFld0[i].Val0;
          Panel2[szNm] = (Val0)? Val0: "";    /* set default */
      } /* for */
      $TabPrm.U_Set_Coll(P_szNm_Pnl, Panel2);  /* Insert parameters in $TabPrm.S_TabPrm */
      var XDB0 = new CL_XDB([P_szNm_Pnl, JKndTup0, Panel1, aFld0, sz_aFld, "", (C_WwFlag_fOverWrite), C_jCd_Cur, C_Bag_UsrView_Dflt]);
  } /* if */
  
  var UsrView1 = CL_UsrView0.F_UsrView_SelIns(P_szNm_Pnl);

  UsrView1.U_Sel_Pg(UsrView1, 0);
  $Card.DBox_Panel.szTit = P_szNm_Pnl; 
  $Card.DBox_Panel.U_Upd(P_szNm_Pnl, P_szNm_Pnl + "_Pnl");

const C_jBag0_szTBM        = 0;
const C_jBag0_fUnused      = 1;
const C_jBag0_szNmColl_Prv = 2;
const C_jBag0_CB           = 3;
const C_jBag0_szNm_Pnl     = 4;
const C_jBag0_aFld         = 5;

  $Card.DBox_Panel.U_Hub(C_JPnl_Open, ["", false, szNmColl_Prv, P_U_CB, P_szNm_Pnl, aFld0]);
} /* U_Display */

/*-----U_Init_Panel --------------------------------------------------------
*
*/ 
function U_Init_Panel()
{
  U_Root0("$Panel", C_jCd_Cur, 2);
} /* U_Init_Panel */


  U_Root0("$Panel", C_jCd_Cur, 1);
  return(_Panel);
})();  /* Panel */

