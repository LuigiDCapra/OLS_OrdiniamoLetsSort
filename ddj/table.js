/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : table.js
* Function    : DDJ's table display
* FirstEdit   : 15/12/2019
* LastEdit    : 31/12/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Display the given collection as a Table supporting data browsing.
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

const C_fScroll   = true;

/*----- Global Variables ---------------------------------------------*/

/*----- Module $Table --------------------------------------------------------
*
*/ 
const $Table = (function () {
  var _Table = {};
  _Table.U_Init             = U_Init_Table;           // function U_Init_Table();
  _Table.U_Display_Table    = U_Display_Table;        // function U_Display_Table(P_WwFlag0 = C_WwFlag_Null);
  _Table.U_Toggle_Transpose = U_Toggle_Transpose;     // function U_Toggle_Transpose();
  _Table.U_LH               = U_LH;                   // function U_LH(P_Elem);
  _Table.U_LM               = U_LM;                   // function U_LM(P_Elem);
  _Table.U_LH_T             = U_LH_T;                 // function U_LH_T(P_Elem);
  _Table.U_LM_T             = U_LM_T;                 // function U_LM_T(P_Elem);
  _Table.F_ElemPrv          = F_ElemPrv;              // function F_ElemPrv();
  _Table.U_Delete           = U_Delete;               // function U_Delete();   
  _Table.U_SaveChange       = U_SaveChange;           // function U_SaveChange();
  _Table.U_Input            = U_Input;                // function U_Input(P_szVal="Default-123");
  _Table.F_ValPrv_Restore   = F_ValPrv_Restore;       // function F_ValPrv_Restore();
  _Table.U_Display_State    = U_Display_State;        // function U_Display_State(P_UsrView, P_iRow, P_iCol);
  _Table.U_Sort             = U_Sort;                 // function U_Sort(P_UsrView, P_iCol);

  _Table.U_ArrowMove        = U_ArrowMove;            // function U_ArrowMove(P_UsrView, P_iRow, P_iCol, P_fScroll=false);
  _Table.U_Scroll           = U_Scroll;               // function U_Scroll(P_iRow);
   
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Table;
const C_iWdt_Dflt = 160;

/*----- Local Variables ----------------------------------------------*/

var S_Sts = {};

var S_szNonStdEdit = "";         /* Name of the procedure in NON STANDARD editing Mode. */
var S_ValPrv = "";

/*--------------------------------------------------------------------*/

/*-----U_Delete --------------------------------------------------------
*
* Delete Tuple.
*/ 
function U_Delete()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  if (CL_UsrView0.F_fReadOnly()) {
     $Error.U_Error(C_jCd_Cur, 1, "Delete is not allowed because the Collection is Read Only.", "", false);
  } /* if */
  var KeyTup = UsrView0.KeyTup;  
  UsrView0.U_Delete(UsrView0, KeyTup);
  UsrView0.U_Upd_aNdx();
  UsrView0.jaFld1 = -1;                       /* Inhibit SaveChange */  
  U_Display_Table();
} /* U_Delete */

/*-----F_ElemPrv --------------------------------------------------------
*
* Element previously selected of the Table.
*/ 
function F_ElemPrv()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  return(UsrView0.ElemPrv);
} /* F_ElemPrv */

/*-----F_ValPrv_Restore --------------------------------------------------------
*
* Restore previous value.
*/ 
function F_ValPrv_Restore()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ElemPrv = UsrView0.ElemPrv; 
  ElemPrv.innerText = S_ValPrv;
  return(S_ValPrv);
} /* F_ValPrv_Restore */

/*-----U_Display_State --------------------------------------------------------
*
* Update State displayed but not szCtx.
* $NOTE: the Semantic Context will be displayed by $DDJ.U_Disp_szSCtx();
*/ 
function U_Display_State(P_UsrView, P_iRow, P_iCol, P_fLine=false)
{  
  if (!P_fLine) {
      var XDB0  = P_UsrView.XDB0;
      var JKndTup0 = XDB0.JKndTup0;

      S_Sts.iRow = P_iRow -1;
      S_Sts.iCol = P_iCol -1;
      S_Sts.szNm_aFld0  = XDB0.szNm_aFld;
      S_Sts.szNmColl    = XDB0.szNmColl;
      S_Sts.sz_JKndTup  = CL_XDB0.F_szJKndTup(JKndTup0);
      S_Sts.szTitle     = "Collection name, Format kind (JKndTup), Position of the cursor in the HTML table [row, col], Position of the tuple in the Collection [key, jFld], Number of Tuples matching the filter conditions";
      S_Sts.szKey0      = P_UsrView.KeyTup;
      S_Sts.szKey1      = (JKndTup0 & 1)? P_UsrView.jaFld1: P_UsrView.aFld1[P_UsrView.jaFld1].szNm;
      S_Sts.jRd_History = CL_History.F_jRd_History();
      S_Sts.iCnt_Filter = P_UsrView.iCnt_Filter;
      S_Sts.aNdx_length = P_UsrView.aNdx.length;
      if (P_UsrView.Val_Sel) {
         S_Sts.szJsType = typeof(P_UsrView.Val_Sel);
      } /* if */
  } /* if */
  
  var fDistinct  = $VConfig.F_i_ValSts_Get("fDistinct");
  var szDistinct = (fDistinct)? "Dist": "All";
    
  var sz_iRowCol = `History: ${S_Sts.jRd_History}, Collection: <b>${S_Sts.szNmColl}[${S_Sts.szKey0}][${S_Sts.szKey1}]</b>, Layout: <b>${S_Sts.szNm_aFld0}</b>, <span title='${S_Sts.szTitle}'>JKndTup: <b>${S_Sts.sz_JKndTup}</b>, 
                    Tbl-RC: <b>[${S_Sts.iRow}</b>, <b>${S_Sts.iCol}]</b>, Matching Filter: <b>${S_Sts.iCnt_Filter}/ ${S_Sts.aNdx_length} ${szDistinct}</b></span> JS-Type: ${S_Sts.szJsType}`;
 
  $DDJ.U_Disp_State(sz_iRowCol);
} /* U_Display_State */

/*----- --------------------------------------------------------
*
* Table Editing used in $Sentence. Save changes updating the current Tuple.
*/ 
function U_Input(P_szVal="Default-123")
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ElemPrv = UsrView0.ElemPrv;
  var XDB0 = UsrView0.XDB0;
  var aRcd0 = XDB0.Coll0;
  var Rcd0  = aRcd0[UsrView0.KeyTup];
  var aFld1 = UsrView0.aFld1;
  var Fld1  = aFld1[UsrView0.jaFld1];
  var iPos0 = Fld1.iPos0;  
  var szTypeDst = Fld1.szType;
  var TupVal = $Value.F_Val_Inp_Table(szTypeDst, Fld1, P_szVal);
  Rcd0[iPos0] = TupVal;
  ElemPrv.innerText = TupVal;
} /* U_Input */

/* ----- U_LM ------------------------------------------------------------------
*
* Item Selected. The user clicked on a cell.
*/
function U_LM(P_Elem) {
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iCol  = P_Elem.cellIndex;
  var iRow  = P_Elem.parentNode.rowIndex;

  $Log.U_Log(C_jCd_Cur, 1, C_iLvl_CellSel, "U_LM", "");

  if ((iRow != UsrView0.iRow_Item_Sel) || (iCol != UsrView0.iCol_Item_Sel)) {
     U_Upd_Cursor(UsrView0, P_Elem);        /* Update the Cell selected highlighting the corresponding <TD> element */
     U_Upd_UsrView(UsrView0, iRow, iCol);   /* Update the Tuple selected in UsrView0 and XDB0. */
  } /* if */

  U_Display_State(UsrView0, iRow, iCol);
} /* U_LM */

/*-----U_Upd_Cursor --------------------------------------------------------
*
* Update the Cell selected highlighting the corresponding <TD> element.
*/ 
function U_Upd_Cursor(UsrView0, P_Elem)
{
  var ElemPrv = UsrView0.ElemPrv;
  
  if (ElemPrv !== null) {
     ElemPrv.parentElement.bgColor = "";                    /* LowLight previously selected Row and Cell. */
     ElemPrv.style.backgroundColor = "";
     ElemPrv.contentEditable = false;        
   
     if (ElemPrv.tagName == "TD") {
         U_SaveChange(UsrView0);                            /* Save changes. */
     } /* if */
  } /* if */
  if (!UsrView0.fReadOnly) {
     P_Elem.contentEditable = true;
     S_ValPrv = P_Elem.innerText;
  } /* if */

  P_Elem.parentElement.bgColor = $Style.F_szBG();           /* HiLight the selected Row and Cell. */
  P_Elem.style.backgroundColor = $Style.F_szBackGround();

  UsrView0.ElemPrv = P_Elem;
} /* U_Upd_Cursor */

/*----- U_SaveChange --------------------------------------------------------
*
* Update Field's changes updating the Tuple.
*/ 
function U_SaveChange(P_UsrView)
{
  var UsrView0 = (P_UsrView)? P_UsrView: CL_UsrView0.F_UsrView_Selected();
  var ElemPrv = UsrView0.ElemPrv;
  if (0 < UsrView0.iRow_Item_Sel) {           
     if (!UsrView0.fReadOnly && ElemPrv) {
        if (typeof(UsrView0.jaFld1) == "undefined") {
            ALERT("undefined", 4);
            return;
        } /* if */
        if (UsrView0.jaFld1 < 0) {
           return;
        } /* if */
        if (typeof(UsrView0.Val_Sel) == "object") {
          //  ALERT("Object", 4);
           return;
        } /* if */
        UsrView0.U_SaveChange(UsrView0, ElemPrv, false);    /* Save changes. */
     }
     else {
// 04/09/2022              $Error.U_Warning(C_jCd_Cur, 1, "Read Only!", "");
     } /* if */
  }  
  else {
     /* Do nothing! ElemPrv was the Header. */
  } /* if */ 
} /* U_SaveChange */

/*-----U_ArrowMove --------------------------------------------------------
*
* Update Cursor position in the HTML-Table because the user clicked on an Arrow-Key selecting Cell [P_iRow, P_iCol].
* $NOTE: P_iRow, P_iCol make reference to the HTML Table showed, that are relative-coordinates.
*/ 
function U_ArrowMove(P_UsrView, P_iRow, P_iCol, P_fScroll=false)
{
  var iCard_aFld = P_UsrView.aFld1.length;
  var iCard_aNdx = P_UsrView.aNdx.length;
  var fRC    = P_UsrView.fRC;
  
  var aElem_TR = document.querySelectorAll('#Id_TabFix0 tr'); /* aElem_TR represents the HTML Table expressed as an array of <TR> elements. */
  
  var iMaxRow = (fRC)? iCard_aNdx: iCard_aFld;
  var iMaxCol = (fRC)? iCard_aFld: iCard_aNdx +1;
  var iMinCol = (fRC)? 1: 2;
  
  if (P_iRow < 1) {          /* Check HTML-Table's boundaries. */
     P_iRow = 1;
  } /* if */
  if (iMaxRow <= P_iRow) {
     P_iRow = iMaxRow;
  } /* if */
  if (P_iCol < iMinCol) {
     P_iCol = iMinCol;
  } /* if */
  if (iMaxCol < P_iCol) {
     P_iCol = iMaxCol -1;
  } /* if */
  
  var aElem_TD = aElem_TR[P_iRow].childNodes[P_iCol];      /* Get the <TR> row selected and then the <TD> element. */  
  U_Upd_Cursor(P_UsrView, aElem_TD);                       /* Update the value of the selected Field and the corresponding <TD> element. */
  U_Upd_UsrView(P_UsrView, P_iRow, P_iCol);

  if (P_fScroll) {      /* Required by GOTO */
     U_Scroll(P_iRow);
  } /* if */
} /* U_ArrowMove */

/*-----U_Scroll --------------------------------------------------------
*
* Select record and scroll table's rows till the selected one.
* $Table.U_Scroll();
*/
function U_Scroll(P_iRow)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ElemPrv = UsrView0.ElemPrv;
  var iRow = P_iRow;

  var aElem_TR = document.querySelectorAll('#Id_TabFix0 tr');
  var Elem_TR  = aElem_TR[iRow];

  if (!Elem_TR) {
     $Error.U_Beep();
     return;
  } /* if */
 
  if (ElemPrv !== null) {
     ElemPrv.parentElement.bgColor = "";
     ElemPrv.style.backgroundColor = "";
  } /* if */
  
  Elem_TR.style.backgroundColor = $Style.F_szBG();

/* $NOTE: The following code doesn't work on PC Archimede because it requires a more recent browser. */        

  Elem_TR.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
  });

  UsrView0.ElemPrv = Elem_TR;
} /* U_Scroll */

/*-----U_Upd_UsrView --------------------------------------------------------
*
* Update the Tuple selected in UsrView0 and XDB0.
* $NOTE: Selected Cell coordinates (P_iRow, P_iCol) make reference to HTML Table not data Collection.
* $NOTE: this function do not highligth the selected row.
*/ 
function U_Upd_UsrView(P_UsrView, P_iRow, P_iCol=1)
{
  var XDB0  = P_UsrView.XDB0;
  var JKndTup0 = XDB0.JKndTup0;
  var iCard = XDB0.Coll0.length;  
  var jaNdx_Sel = P_UsrView.F_jaNdx_Sel(P_UsrView, P_iRow);                     /* Given P_iRow get the position of the corresponding Tuple in aNdx. (used in Card) */
  
  if ((jaNdx_Sel < 0) || (iCard <= jaNdx_Sel)) {
     /* Prevent selection of Tuples which do not exists because outside Collection boundaries. */
     if ((JKndTup0 != C_JKndTup_Obj) && (JKndTup0 != C_JKndTup_as_)) {
        $Error.U_Warning(C_jCd_Cur, 2, "", "", true, true);                     /* Warning and throw error */
     } /* if */
  } /* if */

  P_UsrView.iRow_Item_Sel = P_iRow;                                             /* HTML table coordinates */
  P_UsrView.iCol_Item_Sel = P_iCol;
  
  P_UsrView.jaNdx_Sel = jaNdx_Sel;
  var Tup0 = P_UsrView.XDB0.Coll0[P_UsrView.aNdx[P_UsrView.jaNdx_Sel]];         /* $DEBUG */
  P_UsrView.KeyTup = P_UsrView.F_KeyTup_Sel(P_UsrView, P_iRow);                 /* Index/Key of the Tuple in the Collection corresponding to the selected Cell. */
  
  if ((JKndTup0 != C_JKndTup_Obj) && (JKndTup0 != C_JKndTup_as_)) {             /* Index of the Field corresponding to the selected Cell (in UsrView.aFld1). */
     P_UsrView.jaFld1 = P_UsrView.F_jaFld1_Sel(P_UsrView, P_iCol);
  }
  else {
     P_UsrView.jaFld1 = P_UsrView.F_jaFld1_Sel(P_UsrView, P_iRow);
  } /* if */
  P_UsrView.Fld_Sel = P_UsrView.aFld1[P_UsrView.jaFld1];
  P_UsrView.Key_Fld = P_UsrView.F_Key_Fld(); 

  XDB0.Tup_Sel      = XDB0.Coll0[P_UsrView.KeyTup];                             /* Tuple corresponding to the selected Cell */    
  P_UsrView.Val_Sel = F_Val_Mp_Tup_jaFld1(JKndTup0, P_UsrView);                 /* Value of the Cell selected */
} /* U_Upd_UsrView */

/* ----- U_LM_T ------------------------------------------------------------------
*
* Item Selected. The user clicked on a cell.
*/
function U_LM_T(P_Elem) {
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ElemPrv = UsrView0.ElemPrv;
  var XDB0  = UsrView0.XDB0;
  var JKndTup0 = XDB0.JKndTup0;  
  var iCol  = P_Elem.cellIndex -1;
  var ElemP = P_Elem.parentNode;
  var iRow  = P_Elem.parentNode.rowIndex;
  var szId_Table = P_Elem.parentNode.parentNode.parentNode.id;
  var iCard_Tab = XDB0.Coll0.length;
  var aNdx = UsrView0.F_aNdx(); 

  $Log.U_Log(C_jCd_Cur, 2, C_iLvl_CellSel, "U_LM_T", "");

  if ((iRow != UsrView0.iRow_Item_Sel) || (iCol != UsrView0.iCol_Item_Sel)) {
     if (ElemPrv !== null) {
        ElemPrv.parentElement.bgColor = "";
        ElemPrv.style.backgroundColor = "";
        ElemPrv.contentEditable = false;

        if (ElemPrv.tagName == "TD") {
            U_SaveChange(UsrView0);
        } /* if */
     } /* if */
     
     if (!UsrView0.fReadOnly) {
        P_Elem.contentEditable = true;       
        S_ValPrv = P_Elem.innerText;
     } /* if */
     
     /* $NOTE: the following lines corresponds to the code in U_Upd_UsrView(); */
     
     P_Elem.parentElement.bgColor = $Style.F_szBG();
     P_Elem.style.backgroundColor = $Style.F_szBackGround();

     UsrView0.iRow_Item_Sel = iRow;                                             /* HTML table coordinates */
     UsrView0.iCol_Item_Sel = iCol;

     UsrView0.jaNdx_Sel = UsrView0.F_jaNdx_Sel(UsrView0, iCol);                 /* Given P_iRow get the position of the index corresponding to the selected Tuple in aNdx. */
     var Tup0 = UsrView0.XDB0.Coll0[UsrView0.aNdx[UsrView0.jaNdx_Sel]];         /* $DEBUG */
     UsrView0.KeyTup = UsrView0.F_KeyTup_Sel(UsrView0, iCol);                   /* Index/Key of the Tuple corresponding to the selected Cell. */
     UsrView0.jaFld1    = UsrView0.F_jaFld1_Sel(UsrView0, iRow);                /* Index of the Field corresponding to the selected Cell in UsrView.aFld1. */             
     UsrView0.Fld_Sel   = UsrView0.aFld1[UsrView0.jaFld1];                      /* Field descriptor corresponding to the selected Cell. */
          
     UsrView0.Key_Fld   = UsrView0.F_Key_Fld();  
     XDB0.Tup_Sel       = XDB0.Coll0[UsrView0.KeyTup];                          /* Tuple corresponding to the selected Cell. */
     UsrView0.Val_Sel   = F_Val_Mp_Tup_jaFld1(JKndTup0, UsrView0);              /* Value of the Cell selected */   

     UsrView0.ElemPrv = P_Elem;
  } /* if */

  U_Display_State(UsrView0, iRow, iCol);
} /* U_LM_T */

/* ----- U_LH ------------------------------------------------------------------
*
* Header selection. The user clicked on a column header.
*/
function U_LH(P_Elem) {
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;  
  var aiPos = UsrView0.aiPos;
  var iCol0 = P_Elem.cellIndex;
  var iRow  = P_Elem.parentNode.rowIndex;
  var iCol = iCol0 -1;

  $Log.U_Log(C_jCd_Cur, 3, C_iLvl_CellSel, "U_LH", iCol);
  
  if (-1 <= iCol) {
     /* iCol = -1 : rearranges the Tuples in physical order*/

     if (iCol != UsrView0.iCol_Sort) {        
        UsrView0.iCol_Sort = iCol;
        U_Sort(UsrView0, iCol0, true);
     }
     else {
        UsrView0.fAsc = !UsrView0.fAsc;
     } /* if */
     
     UsrView0.iCol_Sort = iCol;
     U_Display_Table_RC(UsrView0);
  } /* if */
} /* U_LH */

/* ----- U_LH_T ------------------------------------------------------------------
*
* Header selection. The user clicked on a column header.
*/
function U_LH_T(P_Elem) {
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;  
  var aiPos = UsrView0.aiPos;
  var iCol = P_Elem.cellIndex;
  var iRow = P_Elem.parentNode.rowIndex;

  $Log.U_Log(C_jCd_Cur, 4, C_iLvl_CellSel, "U_LH_T", iRow);
  
  if (0 <= iRow) {
     if (iRow != UsrView0.iCol_Sort) {
        U_Sort(UsrView0, iRow, true);
     }
     else {
        UsrView0.fAsc = !UsrView0.fAsc;
     } /* if */
     UsrView0.iRow_Item_Sel = iRow;
     UsrView0.iCol_Sort = iRow;  
     U_Display_Table_CR(UsrView0);
  } /* if */
} /* U_LH_T */

/*-----U_Sort --------------------------------------------------------
*
*/ 
function U_Sort(P_UsrView, P_iCol, P_fAsc)
{
  var fCS = $VConfig.F_ValSts_Get("fCaseSens");
  var jaFld1_aNdx = P_UsrView.F_jaFld1_Sel(P_UsrView, P_iCol);                  /* index corresponding to the field chosen for sorting (in UsrView.aFld1). */
  P_UsrView.jaFld1 = jaFld1_aNdx;
  P_UsrView.fAsc = P_fAsc;
  P_UsrView.jaFld1_aNdx = jaFld1_aNdx;
  P_UsrView.aNdx = P_UsrView.F_aNdx_Make(P_UsrView, jaFld1_aNdx, fCS);          /* Sort index according with the Field selected. */
  P_UsrView.iCol_Sort = P_iCol;
} /* U_Sort */

/*-----F_Val_Mp_Tup_jaFld1 --------------------------------------------------------
*
*/ 
function F_Val_Mp_Tup_jaFld1(P_JKndTup0, P_UsrView)
{
  var Tup_Sel = P_UsrView.XDB0.Tup_Sel;
  var Val0;
  if (Tup_Sel === undefined) {
     debugger;
     return("");
  } /* if */
  switch (P_JKndTup0) {
    case C_JKndTup_Arr: {
         Val0 = Tup_Sel;
    } break;
    case C_JKndTup_Obj: {
         Val0 = Tup_Sel;
    } break;
    case C_JKndTup_aRcd: {
         Val0 = Tup_Sel[P_UsrView.jaFld1];
    } break;
    case C_JKndTup_aObj: {
         Val0 = Tup_Sel[P_UsrView.Fld_Sel.szNm];
    } break;
    case C_JKndTup_asRcd: {
         Val0 = Tup_Sel[P_UsrView.jaFld1 -1];
    } break;
    case C_JKndTup_asObj: {
         Val0 = Tup_Sel[P_UsrView.Fld_Sel.szNm];
    } break;
    case C_JKndTup_as_: {
         Val0 = Tup_Sel;
    } break;

    default : {
    } break;
  } /* switch */
  
  return(Val0);
} /* F_Val_Mp_Tup_jaFld1 */

/*-----U_Display_Table --------------------------------------------------------
*
* Display the Collection Selected as a Table.
*/ 
function U_Display_Table(P_WwFlag0 = C_WwFlag_Null)
{
  $Log.U_Log(C_jCd_Cur, 5, C_iLvl_DispTbl, "U_Display_Table", "");

  var UsrView0    = CL_UsrView0.F_UsrView_Selected();
  var ElemPrv     = UsrView0.ElemPrv;
  var szNmColl    = UsrView0.szNmColl;
  var szTBM_Table = UsrView0.szTBM_Table;
  var szTBM_PopUp = UsrView0.szTBM_PopUp;
  
  if (!UsrView0) {
     $Error.U_Error(C_jCd_Cur, 3, "No UsrView selected", "", false);
  } /* if */
  if (UsrView0.XDB0.fLive) {
     UsrView0.U_Upd_aNdx();
  } /* if */

  $SemCtx.U_Sel_TBM("Id_Nav", szTBM_Table);
  $MRMenu.U_Sel_PopUp("Id_Main", $MRMenu.U_Open, szTBM_PopUp);
  $Style.U_Set_BG(UsrView0.CfgUV0.szStyle);

  UsrView0.U_Pre_Select();
 
  $Type.U_Init_Diagnostic(UsrView0);             /* $ASPECT */

  UsrView0.ElemPrv = null;                       /* reset ElemPrv */

  $Value.U_Cameo_SetPrm(UsrView0);

  var jPg = CL_UsrView0.F_jPg_Sel(); 
  UsrView0.U_Sel_Pg(UsrView0, jPg);      
  if (UsrView0.fRC) {
     /* Row-Columns representation */
     U_Display_Table_RC(UsrView0);
  }
  else {
     /* Transpose */
     U_Display_Table_CR(UsrView0);
  } /* if */
  
  U_Display_State(UsrView0, 0, 0);
} /* U_Display_Table */

/*-----U_Display_Table_RC --------------------------------------------------------
*
*/ 
function U_Display_Table_RC(P_UsrView)
{
  CL_UsrView0.U_ReadOnly(P_UsrView.fReadOnly, P_UsrView.szNmColl);
  try {
      U_Display_Table_RC_0(P_UsrView);
  } catch (P_Err) {
      $Error.U_Catch(C_jCd_Cur, 4, P_Err);
  } /* try catch */      
} /* U_Display_Table_RC */

/*-----U_Fit_Width --------------------------------------------------------
*
* Adapt table width to layout.
*/ 
function U_Fit_Width(P_UsrView)
{
  var aiPos = P_UsrView.aiPos;
  var iWdt0 = window.innerWidth;
  var iWdt_Req = aiPos.length * C_iWdt_Dflt;
    
  if (iWdt_Req < iWdt0) {
     iWdt_Req = iWdt0;
  } /* if */

  U_Set_TabFix_iWdt(iWdt_Req);
} /* U_Fit_Width */

/*-----U_Fit_Width_T --------------------------------------------------------
*
* Adapt table width to layout.
*/ 
function U_Fit_Width_T(P_UsrView)
{
  var iLen = P_UsrView.aNdx.length;
  var iWdt0 = window.innerWidth;
  var iWdt_Req = iLen * C_iWdt_Dflt;
    
  if (iWdt_Req < iWdt0) {
     iWdt_Req = iWdt0;
  } /* if */

  U_Set_TabFix_iWdt(iWdt_Req);
} /* U_Fit_Width_T */

/*-----U_Display_Table_RC_0 --------------------------------------------------------
*
* Show the collection as a Rows-Columns Table.
*/ 
function U_Display_Table_RC_0(P_UsrView)
{
  function F_iLt_Cmp(P_0, P_1) {
    var Ope0 = P_0['iPos1'];
    var Ope1 = P_1['iPos1'];
    var iRes = 0;
    
    if (Ope0 < Ope1) {
       iRes = -1;
    } /* if */
    if (Ope1 < Ope0) {
       iRes =  1;
    } /* if */
    return(iRes);
  } /* F_iLt_Cmp */

  $Log.U_Log(C_jCd_Cur, 6, C_iLvl_DispTbl, "U_Display_Table_RC_0", "");
  
  var szId_Tbl_H = P_UsrView.szId_Tbl_H;   /* <thead> */
  var szId_Tbl_B = P_UsrView.szId_Tbl_B;   /* <tbody> */
  var XDB0  = P_UsrView.XDB0;
  var aFld1 = ((XDB0.JKndTup0 != C_JKndTup_Obj) && (XDB0.JKndTup0 != C_JKndTup_as_))? P_UsrView.aFld1: G_aFld_Obj0;
  
  $OPrn.U_Ins_Elem(szId_Tbl_H);
  $OPrn.U_Ins_Elem(szId_Tbl_B);
     
  document.getElementById(P_UsrView.szId_Div).style.width = "100%";
/*
* Important Check.
* The primary key, stored in the field corresponding to aFld1[0], cannot be hidden.
*/
  if ((XDB0.JKndTup0 == C_JKndTup_asObj) || (XDB0.JKndTup0 == C_JKndTup_asRcd)) {
     if (aFld1[0].fVisible == false) {
        aFld1[0].fVisible = true;
        $Error.U_Error(C_jCd_Cur, 5, "The Primary Key should be visible!\naFld1[0].fVisible set true again!", "");
     } /* if */
     if (aFld1[0].iPos1 != 0) {
        aFld1[0].iPos1 = 0;
        $Error.U_Error(C_jCd_Cur, 6, "The Primary Key must be in first position", "");
     } /* if */
  } /* if */
/*
*Sort the visible fields.
*/
  var aFld2 = [];
  var aiPos = [];
  var j = 0;
  for (let i = 0; i < aFld1.length; i++) {      
      if (aFld1[i].fVisible) {
         aFld2[j++] = aFld1[i];
      } /* if */
  } /* for */
  aFld2.sort(F_iLt_Cmp);
/*
* Generate the list of visible fields aiPos[].
*/
  var aiPos = [];
  j = 0;
  for (let i = 0; i < aFld2.length; i++) {
       aiPos[j++] = aFld2[i].iPos0;
  } /* for */

  P_UsrView.aiPos = aiPos;
  var iCard_aiPos = aiPos.length;
  
  if (iCard_aiPos <= 0) {     
     $Error.U_Error(C_jCd_Cur, 7, "(iCard_aiPos <= 0)", "", false);
  } /* if */
    
  U_Fit_Width(P_UsrView);
/*
* If it is required join Collections.
*/
  if (P_UsrView.fJoin) {
      P_UsrView.fJoin = false;
      $MeF.U_Join();
  } /* if */
   
  /* Print header */
  $OPrn.U_Prn_Elem("", true);
  var szRow = "";
  var szKey = "#";
  szRow += "<th onclick='$Table.U_LH(this)' title='Original Sequence Number.'>" + $Value.F_szHTML_Caption(szKey) + "</th>";
/*
* $NOTE:
* UsrView.aiPos reports the sequence of fields showed.
* UsrView.aiPos is used also to discriminate among visible fields and hidden fields. 
*/
  for (let i = 0; i < aiPos.length; i++) {     
      var Fld2 = aFld2[i];     
      var szCaption0 = (P_UsrView.fCaption)? Fld2.szCaption: Fld2.szNm;
      var szType = Fld2.szType;
      var Type0 = $Type.F_asRcd_Type(szType);
      var szTitle0  = "Field: " + i + " - " + Fld2.szNm + "\r\n" + ((Fld2.szRem)? Fld2.szRem: "");
          szTitle0 += (Type0[C_jaType_szNote])? "\r\n" + Type0[C_jaType_szNote]: "";
      szRow += `<th onclick="$Table.U_LH(this)" title="${szTitle0}">` + i + " - " + $Value.F_szHTML_Caption(szCaption0) + "</th>";

      /* Recalc field values */
      if (Fld2.fRecalc && (Fld2.szCode)) {
         P_UsrView.U_Set_Field(P_UsrView, Fld2, Fld2.szCode, 0, XDB0.Coll0.length -1);    /* $NOTE: length -1 because test on "<=" condition. */
         Fld2.fRecalc = false;
      } /* if */            
  } /* for */
                     
  P_UsrView.U_Prn_Elem("<tr>" + szRow + "</tr>", false);
  P_UsrView.U_Upd_Elem(szId_Tbl_H, true);
  P_UsrView.U_Prn_Elem("", true);
  
  /* Print data. */
  if (XDB0.Coll0) {
     P_UsrView.U_XShow_RC(P_UsrView, P_UsrView.fAsc);
  } /* if */
  
  U_Set_TextAlign(aFld2);

  P_UsrView.U_Upd_Elem(szId_Tbl_B, true);
  
} /* U_Display_Table_RC_0 */

/*-----U_Display_Table_CR --------------------------------------------------------
*
*/ 
function U_Display_Table_CR(P_UsrView)
{
  CL_UsrView0.U_ReadOnly(P_UsrView.fReadOnly, P_UsrView.szNmColl);
  try {
      U_Display_Table_CR_0(P_UsrView);
  } catch (P_Err) {
      $Error.U_Catch(C_jCd_Cur, 8, P_Err);
  } /* try catch */      
} /* U_Display_Table_CR */
  
/*-----U_Display_Table_CR_0 --------------------------------------------------------
*
* Show the Transposed Table, that is show the Collection as a Columns-Rows Table.
* 
* $ASSUME: we assume that P_UsrView.aiPos has already been initialized.
*/ 
function U_Display_Table_CR_0(P_UsrView)
{
  $Log.U_Log(C_jCd_Cur, 7, C_iLvl_DispTbl, "U_Display_Table_CR_0", "");
  
  var szId_Tbl_H = P_UsrView.szId_Tbl_H;   /* <thead> */
  var szId_Tbl_B = P_UsrView.szId_Tbl_B;   /* <tbody> */
  var XDB0  = P_UsrView.XDB0;  
  $OPrn.U_Ins_Elem(szId_Tbl_H);
  $OPrn.U_Ins_Elem(szId_Tbl_B);
  
  U_Fit_Width_T(P_UsrView);
  
  document.getElementById(P_UsrView.szId_Div).style.width = "100%";
  
  /* Print header */
  $OPrn.U_Prn_Elem("", true);
  
  Id_Style_1.innerHTML = "";
  
  P_UsrView.U_XShow_CR(P_UsrView, P_UsrView.fAsc);
  P_UsrView.U_Upd_Elem(szId_Tbl_B, true);   
} /* U_Display_Table_CR_0 */
  
/*-----U_Toggle_Transpose --------------------------------------------------------
*
* Toggle from RowsColumns to ColumnsRows display mode.
*/ 
function U_Toggle_Transpose()
{
   var UsrView0 = CL_UsrView0.F_UsrView_Selected();
   UsrView0.fRC = !UsrView0.fRC;
   U_Display_Table();
} /* U_Toggle_Transpose */

/*-----U_Set_TextAlign --------------------------------------------------------
*
* Select a Toolbar Menu
* 
* $NOTE: columns numbering begin with ONE (1) so the first Field is placed in column TWO (2) because column 1 is used for rows numbers.
*/ 
function U_Set_TextAlign(P_aFld1)
{
  var iLen_LnNum = 2;
  var szTmp = "";
  var iLen = P_aFld1.length;
  var i;
  var iSum_Len = iLen_LnNum;
  var iCoef;
  
  for (i = 0; i < iLen; i++) {
      iSum_Len += P_aFld1[i].iLen; 
  } /* for */
  
  iCoef = 100 / iSum_Len;
  szTmp +=  `
    #Id_TabFix0 th:nth-child(${1}) {
        width: ${iCoef * iLen_LnNum}%;
    }`;  
  szTmp +=  `
    #Id_TabFix0 td:nth-child(${1}) {
        width: ${iCoef * iLen_LnNum}%;
    }`;  
  for (i = 0; i < iLen; i++) {
    let Fld0 = P_aFld1[i];
    let szType0 = Fld0.szType;
    szTmp +=  `
      #Id_TabFix0 th:nth-child(${i +2}) {
          width: ${iCoef * Fld0.iLen}%;
      }`;
    if ((szType0 == "number") || (szType0 == "int")) {
         szTmp +=  `
         #Id_TabFix0 td:nth-child(${i +2}) {
            text-align: right;
            width: ${iCoef * Fld0.iLen}%;
         }`;
    }
    else {
       szTmp +=  `
         #Id_TabFix0 td:nth-child(${i +2}) {
            text-align: left;
            width: ${iCoef * Fld0.iLen}%;
         }`;
    } /* if */
  
    if (Fld0.fReadOnly) {
       szTmp +=  `
         #Id_TabFix0 td:nth-child(${i +2}) {
            color:#44f;
            font-style: italic;
            pointer-events: none;
         }`;
    } /* if */
  } /* for */
  
  Id_Style_1.innerHTML = szTmp;
} /* U_Set_TextAlign */

/*-----U_Init_Table --------------------------------------------------------
*
*/ 
function U_Init_Table()
{
  U_Root0("$Table", C_jCd_Cur);
} /* U_Init_Table */

  return(_Table);
})();  /* Table */
