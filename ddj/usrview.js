/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : usrview.js
* Function    : User's View management.
* FirstEdit   : 30/06/2022
<<<<<<< HEAD
* LastEdit    : 10/02/2026
=======
* LastEdit    : 08/02/2026
>>>>>>> 83e4c808f5ddd6ea487e5cfe31465876550abb7a
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     UsrView makes reference to the Collection reorganized vertically and horizontally.
*     The collection is reorganized vertically  showing the rows according to the order imposed by the index aNdx.
*     The collection is rearranged horizontally showing the columns corresponding to the fields in aFld1.
*     
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* Observing that words as Table, element, etc. are used with different meaning if referred to JS program, HTML pages, database
* to avoid misunderstanding we introduce the following nomenclature:
*
* "Collection" a generic collection of homogenous data structures (e.g. an array of arrays).
* "Tuple"      a generic row-element of a Collection (e.g. an array or an object).
* "Item"       a generic element of a data structure.
* 
* "Table"      a generic HTML's <table> element.
* "row"        a generic HTML's <tr> element.
* "element"    a generic HTML's element (e.g <div>..</div>).
* "Card"       dialog-box used to edit a Tuple.
* 
* "Matrix"     a bidimensional JS's data structure.
* "Array"      JS's arrays.
* "cell"       "memory cell" that is an array element.
*
* "aFld"       Data Layout for a given Collection.
* "Val"        a polymorphic value that is the value of a variable of generic type (NOT specified).
* 
*  _aRcd.U_Init   =  
*  _aRcd.Create =  
*  _aRcd.Insert =  
*  _aRcd.Update =  
*  _aRcd.Delete =
*  
* CL_UsrView0.F_UsrView_Select();
* CL_UsrView0.F_UsrView_Selected();
* UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(szNmColl, true);  // Select fast!
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/

const C_Bag_UsrView_Dflt = ["", C_jPg_0, '', null, null];   /* Bag-organization defined in class CL_UsrView0 constructor. */

/*----- Global Variables ---------------------------------------------*/

var G_Cfg_UV = {};

/* ***** CL_aUsrView_N *******************************************************
*
* List of Collections already loaded in memory.
* The array S_aUsrView has been introduced to support UsrView selection via HTML dropdown menu.
* 
* S_aUsrView_N = [[szNm_UsrView, UsrView], ...];
*
* $only one!
* 
* new CL_aUsrView_N
*/ 
class CL_aUsrView_N {
  static S_aUsrView_N = [];   /* CL_aUsrView_N.S_aUsrView_N */
  static S_jPos;
 
  /*-----U_Insert --------------------------------------------------------
  *
  * CL_aUsrView_N.U_Insert();
  * Insert current Collection in the list of loaded Collections (S_aUsrView_N).
  */ 
  static U_Insert(P_szNm_UsrView, P_UsrView)
  {
     var Rcd0 = [P_szNm_UsrView, P_UsrView];

     /* Check for the presence of the UsrView in the list to avoid double entries with the same name. */
     var UsrView0 = CL_aUsrView_N.F_UsrView_Mp_szNm_UsrView(P_szNm_UsrView, false);
     if (UsrView0) {
        /* $ASSUME: the Collection has been updated, then replace the previous record with the new one. */
        CL_aUsrView_N.S_aUsrView_N[CL_aUsrView_N.S_jPos] = Rcd0;    
     }
     else {
        CL_aUsrView_N.S_aUsrView_N.push(Rcd0);
     } /* if */
  } /* U_Insert */
  
  /*-----F_c_aUsrView_N --------------------------------------------------------
  *
  * CL_aUsrView_N.F_c_aUsrView_N();
  * Return the list of UsrViews.
  */ 
  static F_c_aUsrView_N()
  {
    var Tmp = CL_aUsrView_N.S_aUsrView_N;
    return(Tmp);
  } /* F_c_aUsrView_N */
   
  /*-----F_UsrView_Mp_szNm_UsrView --------------------------------------------------------
  *
  * Select UsrView.
  * Return the UsrView selected specifying its name without selecting it.
  * CL_aUsrView_N.F_UsrView_Mp_szNm_UsrView();
  * $Note: we assume that in most cases F_XDB_Mp_szNm_UsrView == F_XDB_Mp_szNm_XDB
  */ 
  static F_UsrView_Mp_szNm_UsrView(P_szNm_UsrView, P_fCaseSens=true)
  {
    const C_jCd_Cur = C_jCd_UsrView;
    var aUsrView = CL_aUsrView_N.S_aUsrView_N;
    var iLen = aUsrView.length;
    var szNm;
    CL_aUsrView_N.S_jPos = -1;
    
    if (P_fCaseSens) {
        for (let i = iLen -1; i >= 0; i--) {
            if (P_szNm_UsrView == aUsrView[i][0]) {
               CL_aUsrView_N.S_jPos = i;
               return(aUsrView[i][1]);
            } /* if */
        } /* for */    
    }
    else {
        let szNm_UsrView = P_szNm_UsrView.toLowerCase();
        for (let i = iLen -1; i >= 0; i--) {
            szNm = aUsrView[i][0].toLowerCase();
            if (szNm_UsrView == szNm) {
               CL_aUsrView_N.S_jPos = i;
               return(aUsrView[i][1]);
            } /* if */
        } /* for */
    } /* if */

    return(null);
  } /* F_UsrView_Mp_szNm_UsrView */

}  /* class CL_aUsrView_N */

/* ***** CL_as_UsrView_K *******************************************************
*
* The associative array S_as_UsrView_K allows UsrView selection providing an Alias consisting of a few chars.
* 
*  S_as_UsrView_K = {'ch':UsrView};
*
* $only one!
* 
* new CL_as_UsrView_K
*/ 
class CL_as_UsrView_K {
  static S_as_UsrView_K = {};   /* CL_as_UsrView_K.S_as_UsrView_K */
 
  /*-----U_Insert --------------------------------------------------------
  *
  * CL_as_UsrView_K.U_Insert();
  * Set the Alias (P_ch) that will be used to make reference to the given collection.
  * Insert current Collection in the list of loaded Collections (S_as_UsrView_K).
  */ 
  static U_Insert(P_ch = "?", P_UsrView)
  {
     CL_as_UsrView_K.S_as_UsrView_K[P_ch] = P_UsrView;
  } /* U_Insert */
   
  /*-----F_UsrView_Mp_ch --------------------------------------------------------
  *
  * CL_as_UsrView_K.F_UsrView_Mp_ch();
  * Return the collection descriptor corresponding to the Alias.
  */ 
  static F_UsrView_Mp_ch(P_ch)
  {
    var UsrView0 = CL_as_UsrView_K.S_as_UsrView_K[P_ch];
    $Error.U_Chk_Null(UsrView0);
    return(UsrView0);
  } /* F_UsrView_Mp_ch */
  
}  /* class CL_as_UsrView_K */

/*-----F_fFilter_Null ---------------------------------------------------------
*
* Null Filter
*/ 
function F_fFilter_Null(P_pF, P_Tup)
{
  return(true);
} /* F_fFilter_Null */

/* ***** CL_UsrView0 *******************************************************
*
* UserView descriptors' most general class.
* Called by class CL_XDB constructor.
* 
* $NOTE:
* UsrView.aFld[] describes the fields as they will be displayed in the current UsrView;
* XDB.aFld[]     describes the fields stored in memory or in an external file.
*/ 
class CL_UsrView0 {    
  constructor(R_XDB, P_aFld, P_Bag_UsrView) {  // new CL_UsrView0
    var szNm_URL, jPg, ch, _Hdr0_, OLS_Ld, szTBM_Table, szTBM_Card, szTBM_PopUp, szHelp_Table, szHelp_Card, szHelp_PopUp, szCSS_Usr; 
    [szNm_URL, jPg, ch, _Hdr0_, OLS_Ld, szTBM_Table, szTBM_Card, szTBM_PopUp, szHelp_Table, szHelp_Card, szHelp_PopUp, szCSS_Usr] = P_Bag_UsrView ?? ["", C_jPg_0, '', null, null, "Standard"];       
    U_Root0("CL_UsrView0", R_XDB.szNmColl);
    var CfgUV;
    var aFldTmp;
    var szURL_Remarks="";
    var szStyle="";
    var szAux="";
    var aFld1 = [];
    var aiPos = [];
    var fSet = false;  /* Set P_aFld values. */
    
//     if (R_XDB.szNmColl == "Log") {
//        debugger;
//     } /* if */
    
    if (!R_XDB) {
       $Error.U_Error(C_jCd_UsrView, 1, "Missing R_XDB", "", false);
    } /* if */
    if (P_aFld != null) {
       aFldTmp = P_aFld;
       fSet = true;
    }
    else {
       /* Layout generated using AutoDetect */
       aFldTmp = R_XDB.aFld0;
    } /* if */

    for (let i = 0; i < aFldTmp.length; i++) {    /* Clone the original aFld */
        let FldTmp = aFldTmp[i]; 
        let Fld1 = {};
        for (var szKey in FldTmp) {
            Fld1[szKey] = FldTmp[szKey];
        } /* for */

        Fld1.iPos0 = i;
        if (fSet) {
            Fld1.iPos1     ??= i;
            Fld1.fVisible  ??= true;
            Fld1.fCaseSens ??= true;
            Fld1.szCaption ??= FldTmp.szNm;
            Fld1.szCode    ??= "";
        }
        else {
            Fld1.iPos1     = i;
            Fld1.fVisible  = true;
            Fld1.fCaseSens = true;
            Fld1.szCaption = FldTmp.szNm;
            Fld1.szCode    = "";
        } /* if */

        Fld1.fRecalc = false;
        aFld1[i] = Fld1;
        aiPos[i] = i;
    } /* for */
    
    this._szNmClass = "UsrView";                  /* Object class */
    this.szNmColl   = R_XDB.szNmColl;             /* Name of the Collection */  
    this.szAS       = "";                         /* Alias. Set default */
    this.XDB0       = R_XDB;                      /* Collection's MetaData */
    this.szNote     = "";
    
    this.jXFst      = 0;                          /* New */
    this.jYFst      = 0;                          /* New */
    this.iWdt       = 0;                          /* New */
    this.iHgt       = 0;                          /* New */

    this.aFld1      = aFld1;                      /* User View layout. Array of Fields displayed as a HTML Table or a Card */
    this.asKey      = {};                         /* Array used to speed up access process by using the key */
    this.aNdx       = [];                         /* Main Index. Array aNdx indexes the whole Collection. */
    this.aNdxFlt_T  = [];                         /* Indexes of the Tuples matching Filter conditions. */
    this.aNdxFlt_F  = [];                         /* Indexes of the Tuples that do not match Filter conditions. */
    this.aNdxFlt_GT = [];                         /* Indexes of the Tuples that match GoTo conditions. */
    this.jNdxFlt_GT = 0;                          /* Current position in GoTo list. */
    this.aiPos      = aiPos;                      /* List of the positions of the visible fields in aFld1. (Ref. iPos0) */
/*
* $Note: R_XDB.fReadOnly = true prevails on UsrView.fReadOnly.
*/    
    this.fReadOnly  = R_XDB.fReadOnly;            /* RO vs RW of this User View. */
    this.fRC        = true;                       /* Rows-Columns vs. Transposed representation */
    this.fFlt       = false;                      /* Show filtered Collection vs. show the whole Collection. */
    this.fAsc       = true;                       /* Ascending vs Descending order */
    this.fInv       = false;                      /* Show Tuples matching filter conditions vs. show Tuples that do not match them. */    
    this.fCaption   = true;                       /* Show szCaption vs szNm */
        
    this.ElemPrv    = null;                       /* HTML-Element selected previously. */
    this.iRow_Item_Sel = -1;                      /* y-position of the selected Cell in the HTML Table */
    this.iCol_Item_Sel = -1;                      /* x-position of the selected Cell in the HTML Table */
/*
* $Note:
* iCol_Sort is used to determinate if the sorting column is changed, that is if the Table should be sorted again.
* jaFld1_aNdx stores the index of the last field selected for sorting ($NOTE this is not necessarily a Candidate-Key).
* We need both iCol_Sort and jaFld1_aNdx because we use iCol_Sort as a flag for forcing Table sorting in the order determined by jaFld1_aNdx.
*/        
    this.jaFld1_aNdx   = R_XDB.jPrimKey;          /* Index corresponding to the position (in aFld1) of field selected for sorting (-1 "unsorted"). */
    this.iCol_Sort     = this.jaFld1_aNdx;        /* Column selected for sorting. */

    this.jaNdx_Sel     = 0;                       /* Index position (in aNdx) corresponding to the selected row */
    this.KeyTup        = "";                      /* Index/Key of the Tuple corresponding to the selected Cell. */
/*
*  $NOTE:
*  jaFld1:      index of the column corresponding to the Cell  selected using U_LM(); or U_LM_T();
*  jaFld1_aNdx: index of the column corresponding to the Field selected for sorting using U_LH(); or U_LH_T();
*
*  jaFld1 and jaFld1_aNdx make reference to aFld1 not Coll0
*  then for C_JKndTup_Obj, C_JKndTup_asRcd, C_JKndTup_asObj is necessary to subtract C_iDelta_asRcd=1. 
*/  
    this.jaFld1        = 0;                       /* Index corresponding to the position (in aFld1) of the field corresponding the edited cell. */
    this.Key_Fld       = "";                      /* Index/Key of the Field corresponding to the selected Cell. */
    this.Fld_Sel       = null;                    /* Field descriptor corresponding to the selected Cell. */
    this.Val_Sel       = null;                    /* Value of the selected Cell. */

    this.pF_fFilter    = F_fFilter_Null;   
    this.szCond        = "1";                     /* Filter's condition. */
    this.iCnt_Filter   = 0;                       /* Number of tuples satisfying Filter's Conditions. */
    this.fJoin         = false                    /* Call U_Join(); */

    this.fSet_Field    = true;                    /* Enable fields initialization on loading. */
    this.fShow_Icon    = false;                   /* Enable Icons Loading. */
    this.fSave_AutoExec = false;                  /* Enable autoexec saving. */
    
    this.fLoadRes      = false;                   /* Automatically load resources (images, audio, etc.) */
    this.fDistinct     = false;                   /* Show distincts values. */
    this.fLoadRem      = false;                   /* Automatically load remarks and show them in "Notes" field. */
    this.szPlane       = "";                      /* Matrix Plane currently selected. */
    this.szURL_Sync    = "";                      /* Automatically synchronize the Collection loading updates. */
    this.iCnf          = 0;                       /* Confidentiality level. */
    this.iWdt_Image    = 30;  // 80%
    this.szCodeRun     = "";
    this.szCodeCheck   = "";
    
    if (OLS_Ld && OLS_Ld["_CfgUV_"]) {
       CfgUV = OLS_Ld["_CfgUV_"];
       this.fReadOnly   = CfgUV.fReadOnly;
       this.fShow_Icon  = CfgUV.fShow_Icon;
       this.fLoadRes    = CfgUV.fLoadRes;
       this.fDistinct   = CfgUV.fDistinct;
       this.fLoadRem    = CfgUV.fLoadRem;
       this.jaFld1_aNdx = CfgUV.jaFld1_aNdx;
       this.fAsc        = CfgUV.fAsc;
       this.iDay_BackUp = CfgUV.iDay_BackUp;
       this.iWdt_Image  = CfgUV.iWdt_Image;
       this.iRow_Item_Sel = CfgUV.iRow_Item_Sel ?? -1;
       this.szPlane     = CfgUV.szPlane ?? -1;      
       szTBM_Table      = CfgUV.szTBM_Table;
       szTBM_Card       = CfgUV.szTBM_Card;
       szTBM_PopUp      = CfgUV.szTBM_PopUp;
       szHelp_Table     = CfgUV.szHelp_Table;
       szHelp_Card      = CfgUV.szHelp_Card;
       szHelp_PopUp     = CfgUV.szHelp_PopUp;
       szCSS_Usr        = CfgUV.szCSS_Usr;
       szURL_Remarks    = CfgUV.szURL_Remarks ?? "";
       szStyle          = CfgUV.szStyle ?? $VConfig.F_ValSts_Get("szStyle");
       szAux            = CfgUV.szAux ?? "";
    } /* if */

    var szPath_Icon  = "";
    szTBM_Table  = szTBM_Table  ?? "Standard";    
    szTBM_Card   = szTBM_Card   ?? "Card";    
    szTBM_PopUp  = szTBM_PopUp  ?? "PopUp";     /* Mouse right-click menu */
    szHelp_Table = szHelp_Table ?? "";
    szHelp_Card  = szHelp_Card  ?? "";
    szHelp_PopUp = szHelp_PopUp ?? "";
    szCSS_Usr    = szCSS_Usr    ?? "";
    szStyle      = szStyle      ?? "Ligth";
    
    if (!G_asaMnEntry[szTBM_Table]) {           /* if TBM not exists set default */
       $Error.U_Warning(C_jCd_UsrView, 2, "TBM not found. Set default.", szTBM_Table, true);
       szTBM_Table = "Standard";
    } /* if */
    if (!G_asaMnEntry[szTBM_Card]) {
       $Error.U_Warning(C_jCd_UsrView, 3, "TBM not found. Set default.", szTBM_Card, true);
       szHelp_Card = "Card";
    } /* if */
    if (!G_asaMnEntry[szTBM_PopUp]) {
       $Error.U_Warning(C_jCd_UsrView, 4, "TBM not found. Set default.", szTBM_PopUp, true);
       szHelp_PopUp = "PopUp";
    } /* if */
       
    if ((R_XDB.JKndTup0 == C_JKndTup_Obj) || (R_XDB.JKndTup0 == C_JKndTup_as_)) {
       szTBM_Table = "Obj";
    }
    else if (R_XDB.szNm_aFld == "aFld_aFld1") {
       szHelp_Table = "afld1";
    } else if (R_XDB.szNm_aFld == "aFld_aFld") {
       szHelp_Table = "afld0";
    } /* if */

    this.szTBM_Table  = szTBM_Table; /* Set Default TBM. */
    this.szTBM_Card   = szTBM_Card;
    this.szTBM_PopUp  = szTBM_PopUp;
    this.szHelp_Table = szHelp_Table;
    this.szHelp_Card  = szHelp_Card;
    this.szHelp_PopUp = szHelp_PopUp;
    this.szCSS_Usr    = szCSS_Usr;
/*
* $NOTE: check also U_Cfg_UV(); code.
*/
    var CfgUV0 = {
      fReadOnly:this.fReadOnly,
      fShow_Icon:this.fShow_Icon,
      fLoadRes:this.fLoadRes,
      fDistinct:this.fDistinct,
      fLoadRem:this.fLoadRem,
      szPlane:this.szPlane,
      jaFld1_aNdx:this.jaFld1_aNdx,
      fAsc:this.fAsc,
      iDay_BackUp:this.iDay_BackUp,
      iRow_Item_Sel:this.iRow_Item_Sel,
      iWdt_Image:this.iWdt_Image,
      iCnf:0,
      szURL_Sync:"",
      szURL_Remarks:szURL_Remarks,
      szStyle:szStyle,
      szTBM_Table:szTBM_Table,
      szTBM_Card:szTBM_Card,
      szTBM_PopUp:szTBM_PopUp,
      szHelp_Table:szHelp_Table,
      szHelp_Card:szHelp_Card,
      szHelp_PopUp:szHelp_PopUp,
      szCSS_Usr:szCSS_Usr,
      szAux:szAux,
      szCodeRun: "",
      szCodeCheck: ""
    };

    this.CfgUV0 = CfgUV0;

    var jPg = C_jPg_0;   
    U_Sel_Pg(this, jPg);   // LCD 2025-10-03 Tolto // 2026/01/30 Ripristinato perché serve alla New quando si creano nuove collezioni
     
    if (ch) {
       CL_as_UsrView_K.U_Insert(ch, this);
       this.szAS = ch;
    } /* if */

    CL_aUsrView_N.U_Insert(R_XDB.szNmColl, this);  /* Insert the UsrView in the list of the user view of the Collections loaded in memory. */
    
    this.F_szVal_CfgUV0    = F_szVal_CfgUV0;
          
    this.U_Prn_Elem        = $OPrn.U_Prn_Elem;  // Add HTML code to the compiled list.
    this.U_Upd_Elem        = $OPrn.U_Upd_Elem;  // Update the HTML code of the Element selected by its Id (P_szId) inserting the compiled HTML code.
    this.U_Pre_Select      = U_Null;            // Routine that set User View parameters in U_XShow

    this.F_aNdx            = F_aNdx;            // Select the index corresponding to the whole collection (UsrView0.aNdx) vs the index corresponding to the Tuples satisfying filter conditions.   
    this.U_Upd_aNdx        = U_Upd_aNdx;        // Update Index aNdx.
    this.F_szKey_Sort      = F_szKey_Sort;      // Return the name of the field used as a Key sorting the collection.
    this.U_Upd_asKey       = U_Upd_asKey;       // Update asKey.
    this.U_Reset_aNdx      = U_Reset_aNdx;      // Invalidate aNdx.

    this.U_Toggle_Filter   = $Filter.U_Toggle_Filter;
    this.U_Invert_Filter   = $Filter.U_Invert_Filter;
    this.U_Clear_Filter    = $Filter.U_Clear_Filter;    
    this.U_Sel_Pg          = U_Sel_Pg;          // Page selection.
     
    this.F_TupNull         = U_Null;   // Create an empty Tuple                                
    this.U_Insert          = U_Null;   // Insert the given Tuple in the Collection           
    this.U_Update          = U_Null;   // Update the given Tuple                             
    this.U_Delete          = U_Null;   // Delete the given Tuple                              
    this.U_Set_Field       = U_Null;   // function U_Set_Field(P_UsrView, P_Fld1, P_szCode);
    
    this.U_XShow_RC        = U_Null;   /* Show the elements of the Collection in Row/Column order */
    this.U_XShow_CR        = U_Null;   /* Show the elements of the Collection in Column/Row (Transpose) order */
/*
* $NOTE:
* the program allows the rows and columns of the table to be rearranged according to the user's wishes, 
* consequently the correspondence between the coordinates of the table and the position of the data in memory could be lost. 
* The following functions allow, given the coordinates of a cell in the table, to determine the location of the corresponding record/field in memory.
*/
    this.F_jaNdx_Sel       = U_Null;   // Table Editing. Given P_iRow get the position of the corresponding Tuple in aNdx.                                                    
    this.F_KeyTup_Sel      = U_Null;   // Table Editing. Given P_iRow get the position of the corresponding Tuple in the Collection (overriding the order imposed using aNdx).
    this.F_jaFld1_Sel      = U_Null;   // Table Editing. Given P_iCol get the position of the corresponding Field in aFld1.                                                   
    this.U_SaveChange      = U_Null;   // Table Editing. Save changes updating the current Tuple.                                                                             
    
    this.F_szHTML_OpenCard = U_Null;   // Open the current row in a Card (dialogue box).   
    this.U_ConfirmCard     = U_Null;   // Confirm data modified in the Card (dialogue box).
    
    this.F_aNdx_Make       = U_Null;   // Make index aNdx                                                                                         
    this.F_asKey_Make      = U_Null;   // Create the associative index asKey to simplify the access to the record corresponding to the Key        
    this.F_Arr_Mp_Field    = U_Null;   // Extract the array corresponding to the given Field.                                                     

/*
*  $IMPORTANT: customize UsrView's attributes.
*  $NOTE:      the following code should be at the end of the constructor.
*  
*  Example:  {"fVisible":false,"szNm":"szTBM_Table", "szType":"none", "iLen":0, "szRem":"SetPar seleziona SemCtx=Collezioni", "szCode":"Collezioni"},
*/
    $DDJ.F_UsrViewPrv(this);
    for (let i = 0; i < aFldTmp.length; i++) {
        let Fld1 = aFld1[i];
        if (Fld1.szType == "none") {                           /* $NOTE: SetPar. */
           let szNm = Fld1.szNm;
           Fld1.fVisible = false;
           if (szNm.substr(0,4) == "XDB.") {                   /* Set XDB field. */
              szNm = szNm.substr(4);
              R_XDB[szNm] = Fld1.szCode;
           } else if (szNm.substr(0,7) == "DDJSts.") {         /* Set DDJSts field. */
              szNm = szNm.substr(7);
              $VConfig.U_Set_ValSts(szNm, Fld1.szCode);
              if (szNm == "fLoadRes") {
                 $Value.U_Set_fLoad1(Fld1.szCode);
              } /* if */    
           } else if (szNm == "++ Init ++") {
              try {
                  eval(Fld1.szCode);
              } catch (P_Err) {
                  debugger;
              } /* try catch */    
           } else {
              this[szNm] = Fld1.szCode;                        /* Set UsrView field. */
           } /* if */
        } /* if */
    } /* for */
    $DDJ.F_UsrViewPrv(null);
   
    /*-----U_Sel_Pg --------------------------------------------------------
    *
    * Select Page.
    */ 
    function U_Sel_Pg(R_UsrView, P_jPg=0)
    {
      R_UsrView.jPg = P_jPg;                             /* Select Page 0 by default */
      if (CL_UsrView0.aRec_Id) {
          R_UsrView.szId_Div      = CL_UsrView0.aRec_Id[P_jPg][0];
          R_UsrView.szId_Tbl      = CL_UsrView0.aRec_Id[P_jPg][1];
          R_UsrView.szId_Tbl_Card = CL_UsrView0.aRec_Id[P_jPg][2];
          R_UsrView.szId_Tbl_H    = CL_UsrView0.aRec_Id[P_jPg][3];
          R_UsrView.szId_Tbl_B    = CL_UsrView0.aRec_Id[P_jPg][4];      
      } /* if */
    } /* U_Sel_Pg */
            
    /*-----U_Upd_asKey --------------------------------------------------------
    *
    * Update asKey.
    */ 
    function U_Upd_asKey()
    {
       var UsrView0 = this;
       UsrView0.asKey = UsrView0.F_asKey_Make(UsrView0, 0);
    } /* U_Upd_asKey */
      
    /*-----U_Upd_aNdx --------------------------------------------------------
    *
    * Update Index aNdx.
    */ 
    function U_Upd_aNdx()
    {
       var UsrView0 = this;
       UsrView0.aNdx = UsrView0.F_aNdx_Make(UsrView0, UsrView0.jaFld1_aNdx);
    } /* U_Upd_aNdx */
    
    /*-----F_szKey_Sort --------------------------------------------------------
    *
    * Return the name of the field used as a Key sorting the collection.
    */ 
    function F_szKey_Sort()
    {
       var UsrView0 = this;
       var jaFld1_aNdx = UsrView0.jaFld1_aNdx;
       var szKey;

       if (jaFld1_aNdx >= 0) {
          szKey = UsrView0.aFld1[jaFld1_aNdx].szNm;
       }
       else {
          szKey = "";
       } /* if */

       return(szKey);
    } /* F_szKey_Sort */
    
    /*-----F_szVal_CfgUV0 --------------------------------------------------------
    *
    */ 
    function F_szVal_CfgUV0(P_szKey)
    {
      return(this.CfgUV0[P_szKey]);
    } /* F_szVal_CfgUV0 */
    
    /*-----F_aNdx --------------------------------------------------------
    *
    * Select the index corresponding to the whole collection (UsrView0.aNdx) vs the index corresponding to the Tuples satisfying filter conditions.
    */ 
    function F_aNdx(P_UsrView)
    {
       var UsrView0 = this;
       var aNdx0;
       
       if (UsrView0.fFlt) {
          aNdx0 = (UsrView0.fInv)? UsrView0.aNdxFlt_F: UsrView0.aNdxFlt_T;
       }
       else {
          aNdx0 = UsrView0.aNdx;
       } /* if */
       return(aNdx0);
    } /* F_aNdx */
    
    /*-----U_Reset_aNdx --------------------------------------------------------
    *
    * Invalidate aNdx.
    */ 
    function U_Reset_aNdx(P_UsrView)
    {  
      P_UsrView.iCol_Sort = -2;        /* Force index recalc. $NOTE: we use -2 because -1 = "unsorted" */; 
    } /* U_Reset_aNdx */
    
  } /* constructor */
  
  static S_szId_Div      = "";            /* Set default for the Application's properties. */
  static S_szId_Tbl      = "";
  static S_szId_Tbl_Card = ""; 
  static S_szId_Tbl_H    = ""; 
  static S_szId_Tbl_B    = "";

  static S_UsrView_Selected = null;
  static S_jPg_Sel = 0;                  // C_jPg_0;
          
  /*-----U_SetDefaults --------------------------------------------------------
  * CL_UsrView0.
  * Register HTML's id-names used by DDJ.
  */ 
  static U_SetDefaults(P_jPg, P_szId_Div, P_szId_Tbl, P_szId_Tbl_Card, P_szId_Tbl_H, P_szId_Tbl_B)
  {
    CL_UsrView0.aRec_Id ??= []; 
    CL_UsrView0.aRec_Id[P_jPg] = [P_szId_Div, P_szId_Tbl, P_szId_Tbl_Card, P_szId_Tbl_H, P_szId_Tbl_B];  
  } /* U_SetDefaults */
 
  /*-----F_jPg_Sel --------------------------------------------------------
  *
  * CL_UsrView0.F_jPg_Sel();
  * Return the Page currently selected.
  */ 
  static F_jPg_Sel()
  {
    return(CL_UsrView0.S_jPg_Sel);
  } /* F_jPg_Sel */
  
  /*-----U_Sel_jPg --------------------------------------------------------
  *
  * CL_UsrView0.U_Sel_jPg();
  * Select Page.
  */ 
  static U_Sel_jPg(P_jPg)
  {
    CL_UsrView0.S_jPg_Sel = P_jPg;
  } /* U_Sel_jPg */
  
  /*-----F_UsrView_Mp_szNm_UsrView ---------------------------------------------
  *
  * CL_UsrView0.F_UsrView_Mp_szNm_UsrView();
  * Return the User View selected specifying its Name.
  */ 
  static F_UsrView_Mp_szNm_UsrView(P_szNm_UsrView, P_fCaseSens)
  {
    return(CL_aUsrView_N.F_UsrView_Mp_szNm_UsrView(P_szNm_UsrView, P_fCaseSens));
  } /* F_UsrView_Mp_szNm_UsrView */
  
  /*-----F_UsrView_Mp_ch --------------------------------------------------------
  *
  * CL_UsrView0.F_UsrView_Mp_ch();
  * Return the User View selected specifying the Alias char.
  */ 
  static F_UsrView_Mp_ch(P_ch)
  {
    return(CL_as_UsrView_K.F_UsrView_Mp_ch(P_ch));
  } /* F_UsrView_Mp_ch */
  
  /*----- F_UsrView_Select --------------------------------------------------------
  * +++ Select +++
  * $IMPORTANT:
  * CL_UsrView0.F_UsrView_Select(P_szNm_UsrView, P_WwFlag);
  * Select a UsrView and Display it (if required).
  */ 
  static F_UsrView_Select(P_szNm_UsrView, P_WwFlag)
  {
    var UsrView0 = CL_UsrView0.F_UsrView_SelIns(P_szNm_UsrView, P_WwFlag);
    if (UsrView0) {
       CL_UsrView0.U_Set_fMng_Undef(UsrView0.XDB0.fMng_Undef);
    } /* if */
    return(UsrView0); 
  } /* F_UsrView_Select */ 
  
  /*----- F_UsrView_SelIns --------------------------------------------------------
  *
  * CL_UsrView0.F_UsrView_SelIns();
  * Select a UsrView and insert a reference in the History.
  */ 
  static F_UsrView_SelIns(P_szNm_UsrView, P_WwFlag)
  {
    var fReadOnly  = (P_WwFlag & C_WwFlag_fReadOnly);
    var fCaseSens  = (P_WwFlag & C_WwFlag_fSearchCS);
    var fInsert    = !(P_WwFlag & C_WwFlag_fService);             /* Inhibit automatic insertion in the history of Service and Sample Collections. */

    var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(P_szNm_UsrView, fCaseSens);
    if (!UsrView0) {
       $Error.U_Warning(C_jCd_UsrView, 5, "UsrView not found:", P_szNm_UsrView, true);
       return(null);
    } /* if */

    CL_UsrView0.S_UsrView_Selected = UsrView0;
    $Log.U_Log(C_jCd_Cur, 1, C_iLvl_Select, "Select", P_szNm_UsrView);
    $Value.U_Sel_szPlane_2(UsrView0);           /* 08/02/2026 */
    
    if ($DDJ.F_fOverride_RO()) {
       fReadOnly = false;
    } /* if */
    if (UsrView0.szCSS_Usr) {
       Id_Style_2.innerHTML = UsrView0.szCSS_Usr;    
    }
    else {
       Id_Style_2.innerHTML = "";
    } /* if */
    
    var fDisplay = (P_WwFlag & C_WwFlag_fDisplay);
    if (fDisplay) {
       CL_UsrView0.U_ReadOnly(fReadOnly, "");
       if (fInsert) {
          CL_History.U_Insert(P_szNm_UsrView, UsrView0);
       } /* if */

       $VConfig.U_Set_ValSts("fLoadRes", UsrView0.fLoadRes);
       $Value.U_Set_fLoad1(UsrView0.fLoadRes);
       $Value.U_Set_iWdt_Image(UsrView0.iWdt_Image);
  
       $Table.U_Display_Table(P_WwFlag);
       var iGoto = UsrView0.iRow_Item_Sel;
       
       $Table.U_ArrowMove(UsrView0, iGoto +G_iDelta_Goto, 1, C_fScroll);        // 31/12/2025
    } /* if */

    if (P_WwFlag & C_WwFlag_fEdtTup) {
       $DDJ.U_EdtTup_DDJ();       /* Show the Collection as a deck of Card. */
    } /* if */
    return(UsrView0); 
  } /* F_UsrView_SelIns */ 
  
  /*----- F_UsrView_Selected --------------------------------------------------------
  * $IMPORTANT
  * CL_UsrView0.F_UsrView_Selected();
  * Return the descriptor corresponding to the UserView currently selected.
  */ 
  static F_UsrView_Selected()
  {  
    return(CL_UsrView0.S_UsrView_Selected); 
  } /* F_UsrView_Selected */
  
  /*-----F_fReadOnly --------------------------------------------------------
  *
  * CL_UsrView0.F_fReadOnly();
  */ 
  static F_fReadOnly()
  {
    var UsrView_Selected0 = CL_UsrView0.F_UsrView_Selected();
    var fReadOnly = UsrView_Selected0.fReadOnly;
    if (!fReadOnly) {
        fReadOnly = UsrView_Selected0.fReadOnly;
    } /* if */
    return(fReadOnly);
  } /* F_fReadOnly */

  /*-----U_ReadOnly --------------------------------------------------------
  *
  * CL_UsrView0.U_ReadOnly();
  * Set/Reset the fReadOnly flag of the Selected Collection.
  * 
  * $Note: P_szNmColl_Alt is an "Alternative Name" for the selected collection.
  * $Note: about Status updating see: table.js U_Display_State();
  */ 
  static U_ReadOnly(P_fReadOnly, P_szNmColl_Alt)
  {
/* 
* C_fMain == undefined inhibits functions that should not disabled when the code runs in background.
*/
    if (typeof(C_fMain) == "undefined") {
       return;
    } /* if */
    var UsrView0 = CL_UsrView0.F_UsrView_Selected();
    var XDB0 = UsrView0.XDB0;
/*
* $Note: P_XDB.fReadOnly = true prevails on UsrView.fReadOnly.
*/     
//    if (XDB0.fReadOnly) {    //  04/05/2024
    if (false) {
       UsrView0.fReadOnly = true;
       $Error.U_Warning(C_jCd_UsrView, 6, "Sorry this Collection could not be set Read/Write (RW)!", "", true);   
    }
    else {
       UsrView0.fReadOnly = (P_fReadOnly);
    } /* if */

    var szNmColl = (P_szNmColl_Alt)? P_szNmColl_Alt: UsrView0.XDB0.szNmColl;    
    $DDJ.U_Disp_szFlNm(szNmColl, UsrView0.fReadOnly, UsrView0);
  } /* U_ReadOnly */
  
  /*-----F_fMng_Undef --------------------------------------------------------
  *
  * CL_UsrView0.F_fMng_Undef();
  */ 
  static F_fMng_Undef()
  {
    var UsrView_Selected0 = CL_UsrView0.F_UsrView_Selected();
    var fMng_Undef = UsrView_Selected0.XDB0.fMng_Undef;
    return(fMng_Undef);
  } /* F_fMng_Undef */
  
  /*-----F_fMng_Undef_Toggle --------------------------------------------------------
  *
  * CL_UsrView0.F_fMng_Undef_Toggle();
  */ 
  static F_fMng_Undef_Toggle()
  { 
    var UsrView_Selected0 = CL_UsrView0.F_UsrView_Selected();
    var fMng_Undef = !UsrView_Selected0.XDB0.fMng_Undef;
    $VConfig.U_Set_ValSts("fMng_Undef", fMng_Undef);
    return(fMng_Undef);
  } /* F_fMng_Undef_Toggle */
   
  /*-----U_Set_fMng_Undef --------------------------------------------------------
  *
  * CL_UsrView0.U_Set_fMng_Undef();
  */ 
  static U_Set_fMng_Undef(P_fMng_Undef)
  {      
    $VConfig.U_Set_ValSts("fMng_Undef", P_fMng_Undef);
    var UsrView_Selected0 = CL_UsrView0.F_UsrView_Selected();
    UsrView_Selected0.XDB0.fMng_Undef = P_fMng_Undef;
  } /* U_Set_fMng_Undef */
  
  /*-----U_Chk_Layout --------------------------------------------------------
  *
  * CL_UsrView0.U_Chk_Layout();
  * Check the Layout selected, if it is "aFld_aFld" then set JKndTup0 appropriately.
  */ 
  static U_Chk_Layout()
  {
    try {
        if (Id_szSource.value == "New") {
           var jOpt = +document.getElementById("Id_szNm_aFld").value -1;
           var szNm = CL_UsrView0.F_sz_aFld_Mp_jOpt(jOpt);
           if (szNm == "aFld_aFld") {
              Id_JKndTup0.value = C_JKndTup_aObj;
           } /* if */
        } /* if */   
    } catch (P_Err) {
        $Error.U_Catch(C_jCd_Cur, 7, P_Err);
    } /* try catch */
  } /* U_Chk_Layout *
    
  /*-----F_szHTML_aOpt_aFld --------------------------------------------------------
  *
  * CL_UsrView0.F_szHTML_aOpt_aFld();
  * Make the HTML list of <option> corresponding to known Layouts.
  * P_szNm_Prv option previously selected.
  * P_fAutoDetect include AutoDetect in the list of options.
  */ 
  static F_szHTML_aOpt_aFld(P_szNm_Prv = "", P_fAutoDetect)
  {
    var aLayout = CL_Layout.F_c_aLayout();
    var iLen = aLayout.length;
    var szHTML_aOpt_aFld = "";
    
    if (P_fAutoDetect) {
       szHTML_aOpt_aFld = '<option value="0">AutoDetect</option>';
    } /* if */
    
    /* $Note: i = 0 is reserved for AutoDetect! */
    for (let i = 0; i < iLen; i++) {
        var szNm = aLayout[i][0];
        if (szNm == P_szNm_Prv) {
           szHTML_aOpt_aFld += '<option value="' + (i +1) + '" selected>' + szNm + '</option>';
        }
        else {
           szHTML_aOpt_aFld += '<option value="' + (i +1) + '">' + szNm + '</option>';
        } /* if */
    } /* for */
  
    return(szHTML_aOpt_aFld);
  } /* F_szHTML_aOpt_aFld */
  
  /*-----F_iPos_aOpt_aFld --------------------------------------------------------
  *
  * CL_UsrView0.F_iPos_aOpt_aFld();
  * Look for the given Collection name in the array. If found return its position.
  */ 
  static F_iPos_aOpt_aFld(P_szNmColl)
  {
    var aLayout = CL_Layout.F_c_aLayout();
    var iLen = aLayout.length;
    var szNmColl = P_szNmColl.toLowerCase();
    
    for (let i = 0; i < iLen; i++) {
        var szNm = aLayout[i][0].toLowerCase();
        if (szNmColl == szNm) {
           return(i);
        } /* if */
    } /* for */
  
    return(-1);
  } /* F_iPos_aOpt_aFld */
  
  /*-----F_sz_aFld_Mp_jOpt --------------------------------------------------------
  *
  * CL_UsrView0.F_sz_aFld_Mp_jOpt();
  * Return the name of the Layout corresponding to the Collection in position P_jOpt.
  */ 
  static F_sz_aFld_Mp_jOpt(P_jOpt)
  {
    var aLayout = CL_Layout.F_c_aLayout();
    var iLen = aLayout.length;
    
    if ((0 <= P_jOpt) && (P_jOpt < iLen)) {
       var Layout0 = aLayout[P_jOpt];
       return(Layout0[0]);
    }
    else {
      $Error.U_Error(C_jCd_UsrView, 8, "Illegal option", P_jOpt, false);
    } /* if */
  } /* F_sz_aFld_Mp_jOpt */
  
  /*-----F_aFld_Mp_jOpt --------------------------------------------------------
  *
  * CL_UsrView0.F_aFld_Mp_jOpt();
  * Return the descriptor of the Layout corresponding to the Collection in position P_jOpt.
  */ 
  static F_aFld_Mp_jOpt(P_jOpt)
  {
    var aLayout = CL_Layout.F_c_aLayout();
    var iLen = aLayout.length;
    
    if ((0 <= P_jOpt) && (P_jOpt < iLen)) {
       var Layout0 = aLayout[P_jOpt];
       return(Layout0[1]);
    }
    else {
      $Error.U_Error(C_jCd_UsrView, 9, "Illegal option", P_jOpt, false);
    } /* if */
  } /* F_aFld_Mp_jOpt */
  
  /*-----F_szHTML_aOpt_szNmColl --------------------------------------------------------
  *
  * CL_UsrView0.F_szHTML_aOpt_szNmColl();
  * Make the HTML list of <option> of the UserView corresponding to Collections loaded.
  */ 
  static F_szHTML_aOpt_szNmColl()
  {
    var aUsrView = CL_aUsrView_N.F_c_aUsrView_N();
    var iLen = aUsrView.length;
    var szHTML_aOpt_szNmColl = "";
    for (let i = 0; i < iLen; i++) {
        var szNmColl = aUsrView[i][0];
        var UsrView0 = aUsrView[i][1];
        szHTML_aOpt_szNmColl += `<option value="${szNmColl}" title="${UsrView0.szNote}"> ${szNmColl} </option>`;
    } /* for */
    return(szHTML_aOpt_szNmColl);
  } /* F_szHTML_aOpt_szNmColl */
  
/*  ------ Operations on the selected Collection ------ */
 
  /*-----F_szCond --------------------------------------------------------
  *
  * Given the selected collection return filter's condition currently set.
  */ 
  F_szCond()
  {
    return(this.szCond);
  } /* F_szCond */
  
  /*-----U_szCond --------------------------------------------------------
  *
  * Given the selected collection set filter's condition.
  */ 
  U_szCond(P_szCond)
  {
    this.szCond = P_szCond;
  } /* U_szCond */
  
  /*-----F_Key_Fld --------------------------------------------------------
  *
  * Given the selected collection return Field's Index/Key for access.
  */ 
  F_Key_Fld()
  {
    var Key_Fld = (this.XDB0.JKndTup0 & C_Ww_KndTup_aRcd_Test)? this.jaFld1: `${this.Fld_Sel.szNm}`;
    return(Key_Fld);
  } /* F_Key_Fld */
  
  /*-----F_Fld1_Mp_szNmFld --------------------------------------------------------
  *
  * Given the selected collection and the name of a Field return the corresponding descriptor.
  */ 
  F_Fld1_Mp_szNmFld(P_szNmFld)
  {
    var UsrView0 = this;
    var aFld1 = UsrView0.aFld1;
    var iLen1 = aFld1.length;
    var i, Fld1;
    for (i = 0; i < iLen1; i++) {
        Fld1 = aFld1[i];
        if (Fld1.szNm == P_szNmFld) {
           return(Fld1);
        } /* if */
    } /* for */
    $Error.U_Error(C_jCd_UsrView, 10, "Field unknown", P_szNmFld, false);
  } /* F_Fld1_Mp_szNmFld */
  
  /*-----F_Key_Mp_szNmFld --------------------------------------------------------
  *
  * Given the selected collection and the name of a Field return the corresponding position in the Layout (iPos0).
  */ 
  F_Key_Mp_szNmFld(P_szNmFld)
  {
    var UsrView0 = this;    
    var Fld1 = UsrView0.F_Fld1_Mp_szNmFld(P_szNmFld);
    return(Fld1.iPos0);
  } /* F_Key_Mp_szNmFld */

  /*-----F_Val_Mp_szNmFld --------------------------------------------------------
  *
  * Given the selected collection and the name of a Field return the Value of the Field in the selected Tuple.
  */ 
  F_Val_Mp_szNmFld(P_szNmFld)
  {
     var UsrView0 = this;
     var Key0 = UsrView0.F_Key_Mp_szNmFld(P_szNmFld);
     var Val0 = UsrView0.XDB0.Tup_Sel[Key0];
     return(Val0);
  } /* F_Val_Mp_szNmFld */

  /*-----F_Val_Mp_szNmFld_Tup --------------------------------------------------------
  *
  * Given the selected collection a Tuple and the name of a Field return the Value of the Field in the Tuple.
  */ 
  F_Val_Mp_szNmFld_Tup(P_szNmFld, P_Tup)
  {
    if (P_Tup) {
       var UsrView0 = this;
       var Key0 = UsrView0.F_Key_Mp_szNmFld(P_szNmFld);
       var Val0 = P_Tup[Key0];
       return(Val0);
    }
    else {
       return(null);
    } /* if */
  } /* F_Val_Mp_szNmFld_Tup */

} /* class CL_UsrView0 */

/* ***** CL_UsrView **************************************************************
*
* new CL_UsrView
*/ 
class CL_UsrView {
  constructor(P_XDB, P_aFld, P_szNote = "", P_WwFlag0, P_Bag_UsrView) {
    U_Root0("CL_UsrView", P_XDB.szNmColl);
    const C_jCd_Cur = C_jCd_UsrView;
    var fReadOnly = (P_WwFlag0 & C_WwFlag_fReadOnly);
    var JKndTup0 = P_XDB.JKndTup0;
    var UsrView0;
        
    switch (JKndTup0) {                                                         /* Manage polymorphism */
      case C_JKndTup_Arr: {
           UsrView0 = new CL_UsrView0_Arr(P_XDB, P_aFld, P_Bag_UsrView);
      } break;
      case C_JKndTup_Obj: {
           UsrView0 = new CL_UsrView0_Obj(P_XDB, P_aFld, P_Bag_UsrView);
      } break;
      case C_JKndTup_aRcd: {
           UsrView0 = new CL_UsrView0_aRcd(P_XDB, P_aFld, P_Bag_UsrView);
      } break;
      case C_JKndTup_aObj: {
           UsrView0 = new CL_UsrView0_aObj(P_XDB, P_aFld, P_Bag_UsrView);
      } break;
      case C_JKndTup_asRcd: {
           UsrView0 = new CL_UsrView0_asRcd(P_XDB, P_aFld, P_Bag_UsrView);
      } break;
      case C_JKndTup_asObj: {
           UsrView0 = new CL_UsrView0_asObj(P_XDB, P_aFld, P_Bag_UsrView);
      } break;
      case C_JKndTup_as_: {
           UsrView0 = new CL_UsrView0_as_(P_XDB, P_aFld, P_Bag_UsrView);
      } break;
      default : {
      } break;
    } /* switch */

    $VConfig.U_Set_ValSts("fDistinct", UsrView0.CfgUV0.fDistinct);
    
    var aFld1 = UsrView0.aFld1;
    var jaFld1_aNdx = UsrView0.jaFld1_aNdx;
    var Fld1 = aFld1[jaFld1_aNdx];
    var fCaseSens = (Fld1 != C_Undefined)? Fld1.fCaseSens: true;    
    UsrView0.aNdx = UsrView0.F_aNdx_Make(UsrView0, jaFld1_aNdx, fCaseSens);

    UsrView0.fReadOnly = fReadOnly;
    UsrView0.szNote    = P_szNote;
    
    for (let szKey in UsrView0) {                                               /* Manage polymorphism */
         this[szKey] = UsrView0[szKey];
    } /* for */  
  } /* constructor */  
}  /* class CL_UsrView */
  
/*----- Module $UsrView --------------------------------------------------------
*
*/ 
const $UsrView = (function () {
  var _UsrView = {};
  _UsrView.U_Init        = U_Init_UsrView;    // function U_Init_$UsrView();
  _UsrView.U_Cfg_UV      = U_Cfg_UV;          // function function U_Cfg_UV();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_UsrView;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----U_Cfg_UV --------------------------------------------------------
*
* Configurate UsrView
* $UsrView.U_Cfg_UV();
*/ 
function U_Cfg_UV()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  var CfgUV0 = UsrView0.CfgUV0;
  var CfgUV1 = {
    "Read Only":CfgUV0.fReadOnly,
    "Show Icons":CfgUV0.fShow_Icon,
    "Load Resources":CfgUV0.fLoadRes,
    "Show Distincts":CfgUV0.fDistinct,
    "Load Remarks":CfgUV0.fLoadRem,
    "Plane Selected":CfgUV0.szPlane,
    "Sync URL":CfgUV0.szURL_Sync,
    "Remarks URL":CfgUV0.szURL_Remarks,
    "Style":CfgUV0.szStyle,
    "Tool Bar Menu - Table":CfgUV0.szTBM_Table,
    "Tool Bar Menu - Card":CfgUV0.szTBM_Card,
    "Tool Bar Menu - PopUp":CfgUV0.szTBM_PopUp,
    "Help - Table":CfgUV0.szHelp_Table,
    "Help - Card":CfgUV0.szHelp_Card,
    "Help - PopUp":CfgUV0.szHelp_PopUp,
    "User defined CSS":CfgUV0.szCSS_Usr,
    "SortField":CfgUV0.jaFld1_aNdx,
    "Ascending Order":CfgUV0.fAsc,
    "iWdt_Image":CfgUV0.iWdt_Image,
    "Confidentiality [0..9]":CfgUV0.iCnf,
    "Code run at loading":CfgUV0.szCodeRun,
    "Consistency check":CfgUV0.szCodeCheck,
    "BackUp (days)": CfgUV0.iDay_BackUp,
    "iRow_Item_Sel": CfgUV0.iRow_Item_Sel,
    "szAux":CfgUV0.szAux
  };  
   
  G_Cfg_UV.DBox0 = new CL_DBox_Obj("Id_Div_DBox0", "G_Cfg_UV.DBox0", "UsrView Configuration (Cfg_UV).", CfgUV1, null, null, U_Confirm_2, G_asaMnEntry.Layout, "Layout2");  
  G_Cfg_UV.DBox0.U_Hub(C_JPnl_Open); 
} /* U_Cfg_UV */

/*-----U_Confirm_2 --------------------------------------------------------
*
*/ 
function U_Confirm_2(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  
/* $NOTE: this.F_Obj_Close_Obj(); makes reference to the method F_Obj_Close_Obj(); of the object that executes the call-back!  */
  var CfgUV1 = this.F_Obj_Close_Obj();

  var CfgUV0 = {
    fReadOnly:     CfgUV1["Read Only"],
    fShow_Icon:    CfgUV1["Show Icons"],
    fLoadRes:      CfgUV1["Load Resources"],
    fDistinct:     CfgUV1["Show Distincts"],
    fLoadRem:      CfgUV1["Load Remarks"],
    szPlane:       CfgUV1["Plane Selected"],
    fAsc:          CfgUV1["Ascending Order"],
    iCnf:          CfgUV1["Confidentiality [0..9]"],
    iWdt_Image:    CfgUV1["iWdt_Image"],
    iDay_BackUp:   CfgUV1["BackUp (days)"],
    iRow_Item_Sel: CfgUV1["iRow_Item_Sel"],
    szCodeRun:     CfgUV1["Code run at loading"],
    szCodeCheck:   CfgUV1["Consistency check"],
    szURL_Sync:    CfgUV1["Sync URL"],
    szURL_Remarks: CfgUV1["Remarks URL"],    
    szStyle:       CfgUV1["Style"],
    szTBM_Table:   CfgUV1["Tool Bar Menu - Table"],
    szTBM_Card:    CfgUV1["Tool Bar Menu - Card"],
    szTBM_PopUp:   CfgUV1["Tool Bar Menu - PopUp"],
    szHelp_Table:  CfgUV1["Help - Table"],
    szHelp_Card:   CfgUV1["Help - Card"],
    szHelp_PopUp:  CfgUV1["Help - PopUp"],
    szCSS_Usr:     CfgUV1["User defined CSS"],
    jaFld1_aNdx:   CfgUV1["SortField"],
    szAux:         CfgUV1["szAux"],
  }; 
  UsrView0.CfgUV0 = CfgUV0;
  U_Set_P_CfgUV(UsrView0, CfgUV0);     // 18/07/2025
  
  $ACP.U_Open_Confirm("Would you like to save Configuration and DATA changes?", $DDJ.U_SaveAllChanges);
} /* U_Confirm_2 */

/*-----U_Set_P_CfgUV --------------------------------------------------------
*
*/ 
function U_Set_P_CfgUV(R_UsrView0, P_CfgUV)
{
  R_UsrView0.fShow_Icon  = P_CfgUV.fShow_Icon;
  R_UsrView0.fLoadRes    = P_CfgUV.fLoadRes;
  R_UsrView0.fDistinct   = P_CfgUV.fDistinct;
  R_UsrView0.fLoadRem    = P_CfgUV.fLoadRem;
  R_UsrView0.szPlane     = P_CfgUV.szPlane;
  R_UsrView0.iWdt_Image  = P_CfgUV.iWdt_Image;
  var szTBM_Table        = P_CfgUV.szTBM_Table;
  var szTBM_Card         = P_CfgUV.szTBM_Card;
  var szTBM_PopUp        = P_CfgUV.szTBM_PopUp;
  var szCSS_Usr          = P_CfgUV.szCSS_Usr;
  var szHelp_Table       = P_CfgUV.szHelp_Table;
  var szHelp_Card        = P_CfgUV.szHelp_Card;
  var szHelp_PopUp       = P_CfgUV.szHelp_PopUp;

  szTBM_Table  = szTBM_Table  ?? "Standard";    
  szTBM_Card   = szTBM_Card   ?? "Card";    
  szTBM_PopUp  = szTBM_PopUp  ?? "PopUp";     /* Mouse right-click menu */    
  szHelp_Table = szHelp_Table ?? "";
  szHelp_Card  = szHelp_Card  ?? "";
  szHelp_PopUp = szHelp_PopUp ?? "";
  szCSS_Usr    = szCSS_Usr    ?? "";

  if (!G_asaMnEntry[szTBM_Table]) {           /* if TBM not exists set default */
     $Error.U_Warning(C_jCd_UsrView, 12, "TBM not found. Set default.", szTBM_Table, true);
     szTBM_Table = "Standard";
  } /* if */
  if (!G_asaMnEntry[szTBM_Card]) {
     $Error.U_Warning(C_jCd_UsrView, 13, "TBM not found. Set default.", szTBM_Card, true);
     szHelp_Card = "Card";
  } /* if */
  if (!G_asaMnEntry[szTBM_PopUp]) {
     $Error.U_Warning(C_jCd_UsrView, 14, "TBM not found. Set default.", szTBM_PopUp, true);
     szHelp_PopUp = "PopUp";
  } /* if */
    
  R_UsrView0.jaFld1_aNdx = P_CfgUV.jaFld1_aNdx;
  R_UsrView0.fAsc        = P_CfgUV.fAsc;
  R_UsrView0.iDay_BackUp = P_CfgUV.iDay_BackUp;
  R_UsrView0.iRow_Item_Sel = P_CfgUV.iRow_Item_Sel;

  R_UsrView0.szTBM_Table  = szTBM_Table; /* Set Default TBM. */
  R_UsrView0.szTBM_Card   = szTBM_Card;
  R_UsrView0.szTBM_PopUp  = szTBM_PopUp;
  R_UsrView0.szHelp_Table = szHelp_Table;
  R_UsrView0.szHelp_Card  = szHelp_Card;
  R_UsrView0.szHelp_PopUp = szHelp_PopUp;
  R_UsrView0.szCSS_Usr    = szCSS_Usr;
} /* U_Set_P_CfgUV */

/*-----U_Init_UsrView --------------------------------------------------------
*
*/ 
function U_Init_UsrView()
{
  U_Root0("$UsrView", C_jCd_Cur, 2);
} /* U_Init_UsrView */

  U_Root0("$UsrView", C_jCd_Cur, 1);
  return(_UsrView);
})();  /* $UsrView */

