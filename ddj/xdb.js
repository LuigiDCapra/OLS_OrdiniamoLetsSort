/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : xdb.js ex xarr2.js
* Function    : Data_Structure MetaData (Layout) management.
* FirstEdit   : 03/11/2021
* LastEdit    : 05/12/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Data_Structure MetaData management.
*     XDB makes reference to the Collection as it is stored.
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
* "Val"       a Polymorphic value that is the value of a variable of generic type (NOT specified).
*
* "JKndTup"    kind of Tuple's representation.
*
*  _aRcd.U_Init =  
*  _aRcd.Create =  
*  _aRcd.Insert =  
*  _aRcd.Update =  
*  _aRcd.Delete =  
*  
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/

const C_jaNdx_Physical = -1;  /* collection unsorted = use physical sort */
/*
* Constant that identify uniquely the different kind of Tuple's representations (JKndTup) supported by DDJ.
*/
const C_JKndTup_Null  =  0;   /*  */                                                                                                                                                    
const C_JKndTup_Arr   =  1;   /* i.e. ai    = [0,1,2,3,4,5,6,7,8,9]; */                                                                                                                 
const C_JKndTup_Obj   =  2;   /* i.e. Obj   = {sz0:"aaa", iNum:100, fBool:true}; */                                                                                                     
const C_JKndTup_aRcd  =  3;   /* i.e. aRcd  = [["aaa", 100, true], ["bbb", 101, true], ["ccc", 102, true], ["ddd", 103, true]]; */                                                      
const C_JKndTup_aObj  =  4;   /* i.e. aObj  = [{sz0:"aaa", iNum:100, fBool:true}, {sz0:"bbb", iNum:101, fBool:true}, {sz0:"ccc", iNum:102, fBool:true}]; */                             
const C_JKndTup_asRcd =  5;   /* i.e. asRcd = {key0:["aaa", 100, true], key1:["bbb", 101, true], key2:["ccc", 102, true], key3:["ddd", 103, true]}; - IndexedDB format */               
const C_JKndTup_asObj =  6;   /* i.e. asObj = {key0:{sz0:"aaa", iNum:100, fBool:true}, key1:{sz0:"bbb", iNum:101, fBool:true}, key2:{sz0:"ccc", iNum:102, fBool:true}}; */              

const C_JKndTup_as_   = 10;   /* i.e. as_1  = {"nero":0, "marrone": 1}, as_sz = {"dog":"cane", "cat":"gatto"} */

const C_JKndTup_OLS   = 16;
const C_JKndTup_CSV   = 17;   /* Comma Separated Values */
const C_JKndTup_Blob  = 18;
const C_JKndTup_FLR   = 19;   /* Fixed Length Records */
const C_JKndTup_XML   = 20;
const C_JKndTup_DBF   = 21;   /* File DBIII */
const C_JKndTup_HTML  = 22;   /* File HTML */
const C_JKndTup_Text  = 23;
const C_JKndTup_ToA   = 23;

const C_JKndTup_ArrLike = 1;  /* odd index access, even key access */
const C_Ww_KndTup_aRcd_Test  = 1;  /* Test (JKndTup0 & C_Ww_KndTup_Test) is equivalent to ((JKndTup0 == C_JKndTup_Arr) || (JKndTup0 == C_JKndTup_aRcd) || (JKndTup0 == C_JKndTup_asRcd)) */

const C_asz_JKndTup = ["Null", "Arr", "Obj", "aRcd", "aObj", "asRcd", "asObj", "+9", "+8", "Arr", "as_", "+11", "as_", "+13", "+14", "+15", "OLS", "CSV", "Blob", "FLR", "XML", "DBF", "HTML", "Text"];

const C_jTup_Fst  =  0;                                                                                                                                                        
const C_jTup_Prv  = -1;                                                                                                                                                          
const C_jTup_Nxt  = -2;                                                                                                                                                          
const C_jTup_Lst  = -3;

const C_WwFlag_Null       = 0x0000;
const C_WwFlag_fReadOnly  = 0x0001;      /* Set Collection Read Only. */
const C_WwFlag_fszFldNm_1 = 0x0002;      /* Fields names in the first row/record */
const C_WwFlag_fOverWrite = 0x0004;      /* Let redeclare Collections with the same name (most recent overwrites the previous one) */
const C_WwFlag_fMng_Undef = 0x0008;      /* Manage undefined fields */
const C_WwFlag_fTransp    = 0x0010;      /* Transpose */
const C_WwFlag_fEmbed     = 0x0020;      /* Embed string adding missing brackets */
const C_WwFlag_fLive      = 0x0040;      /* In "live" mode Collection cardinality could change at run-time. */
const C_WwFlag_fLayout    = 0x0080;      /* The given collection is a Layout */
const C_WwFlag_fSample    = 0x0100;      /* Sample Collection. Inhibit automatic insertion of the Collection in the History. */
const C_WwFlag_fService   = 0x0200;      /* Collection of data used internally by DDJ. */
const C_WwFlag_fGetDir    = 0x0400;      /* Collection loaded via GetDir. ($ASPECT FileMan) */
const C_WwFlag_fDisplay   = 0x0800;      /* Display Collection after Selection. */
const C_WwFlag_fSearchCS  = 0x1000;      /* Look for Collection Name doing a Case Sensitive search. */
const C_WwFlag_fAutoExec  = 0x2000;      /* Execute autoexec code at downloading. */
const C_WwFlag_fUnSort    = 0x4000;      /* */

const C_jCnf_Public   = 0; /* Public */
const C_jCnf_Reserved = 1; /* Reserved */
const C_jCnf_Private  = 2; /* Private */
const C_jCnf_Secret   = 3; /* Secret */

/*----- Global Variables ---------------------------------------------*/

/* ***** CL_Layout **************************************************************
*
* Manage the array of tables Layout (S_as_Layout).
* 
* S_as_Layout = [[szNm_aFld, aFld]...]
*
* $only one!
* 
* new CL_Layout
*/ 
class CL_Layout {
  static S_aLayout = [];           /* List of the names of data structure Layouts (aFld). */
  
  /*-----U_Insert --------------------------------------------------------
  *
  * Insert current Collection in the list of data structure Layouts (S_as_Layout).
  */ 
  static U_Insert(P_szNm_aFld, P_aFld)
  {
    var Layout0 = [P_szNm_aFld, P_aFld];
    CL_Layout.S_aLayout.push(Layout0);
  } /* U_Insert */
  
  /*-----F_c_aLayout --------------------------------------------------------
  *
  * Return the list of Layouts.
  */ 
  static F_c_aLayout()
  {
    return(CL_Layout.S_aLayout);
  } /* F_c_aLayout */
  
  /*-----F_UsrView_Mp_szNm_aFld --------------------------------------------------------
  *
  * Return the Layout descriptor specified.
  * CL_Layout.F_UsrView_Mp_szNm_aFld();
  */ 
  static F_UsrView_Mp_szNm_aFld(P_szNm_aFld)
  {
    var aLayout = CL_Layout.S_aLayout;
    var iLen = aLayout.length;
    for (var i = 0; i < iLen; i++) {
        var Layout0 = aLayout[i];
        if (P_szNm_aFld == Layout0[0]) {
           return(Layout0[1]);
        } /* if */
    } /* for */
    return(null);
  } /* F_UsrView_Mp_szNm_aFld */

}  /* class CL_Layout */

/* ***** CL_aXDBAux **************************************************************
*
* Manage the array of Auxiliary information for Collections already loaded in memory (S_aXDBAux).
* 
* $only one!
* 
* new CL_aXDBAux
*/ 
class CL_aXDBAux {
  static S_aXDBAux = [];
/* 
* Data Layout of S_aXDBAux.
*/
  static S_aFld_S_aXDBAux = [
  {"szNm":"szName",     "szType":"string",   "iLen":8, "szRem":"Collection name"},  
  {"szNm":"JKndTup",    "szType":"number",   "iLen":4, "szRem":"JKndTup"},
  {"szNm":"XDB",        "szType":"object",   "iLen":4, "szRem":"Collection metadata","Aux0":{"szNm_aFltObj":"G_aFld_XDB0", "aFltObj":G_aFld_XDB0}},
  {"szNm":"Coll0",      "szType":"object",   "iLen":4, "szRem":"The collection", "Aux0":{"U_CalcVal":"S_aFld_Obj1"}},
  {"szNm":"szNote",     "szType":"string",   "iLen":20, "szRem":"Remarks"},
  {"szNm":"szNmLayout", "szType":"string",   "iLen":8, "szRem":"Layout"},
  {"szNm":"Layout",     "szType":"object",   "iLen":4, "szRem":"Collection layout"},
  {"szNm":"faFld",      "szType":"boolean",  "iLen":4, "szRem":"flag. field desc."},
  {"szNm":"fLive",      "szType":"boolean",  "iLen":4, "szRem":"flag. live."},
  {"szNm":"fService",   "szType":"boolean",  "iLen":4, "szRem":"flag. service."},
  {"szNm":"iSec70_Slct","szType":"timestamp","iLen":4, "szRem":"timestamp"},
  
  {"fVisible":false,"szNm":"szTBM_Table", "szType":"none", "iLen":0, "szRem":"SetPar", "szCode":"Collezioni"}
];
  
  /*-----U_Insert --------------------------------------------------------
  *
  * Insert current Collection in the list of loaded Collections (S_aXDBAux).
  * $NOTE:
  * 1) we explicitly pass the name of the collection (P_szNm_aFld) since we reserve the right to register it with a different identifier than the name of the file from which it was loaded (this.szNmColl).
  * 2) because we are not sure we want S_aXDBAux to be made available for browsing we let the responsibility for object creation (new CL_XDB("Collections",  ...);) to the application main (e.g. ddj.js)
  * 
  * CL_aXDBAux.U_Insert();
  */ 
  static U_Insert(P_szNm_XDB, P_XDB)
  {
//     if (P_szNm_XDB == "Collections") {
//        debugger;
//     } /* if */
    var Rcd0 = [P_szNm_XDB, P_XDB.JKndTup0, P_XDB, P_XDB.Coll0, P_XDB.szNote, P_XDB.szNm_aFld, P_XDB.aFld0, P_XDB.faFld, P_XDB.fLive, P_XDB.fService];
    CL_aXDBAux.S_aXDBAux.push(Rcd0);
  } /* U_Insert */

  /*-----F_XDBAux_Mp_szNm_aFld --------------------------------------------------------
  *
  * Look for the given Collection name.
  * If it is found return the corresponding metadata (XDB descriptor) otherwise return null.
  * CL_aXDBAux.F_XDBAux_Mp_szNm_aFld();
  */
  static F_XDBAux_Mp_szNm_aFld(P_szNm_XDB)
  {
    const C_jaFld_S_aXDBAux_szName = 0;   /* Position of szName in S_aFld_S_aXDBAux */
    const C_jaFld_S_aXDBAux_XDB    = 2;   /* Position of XDB    in S_aFld_S_aXDBAux */
 
    var aXDBAux = CL_aXDBAux.S_aXDBAux;
    var iLen = aXDBAux.length;
    for (var i = 0; i < iLen; i++) {
        var XDBAux0 = aXDBAux[i];
        if (P_szNm_XDB == XDBAux0[C_jaFld_S_aXDBAux_szName]) {
           return(XDBAux0[C_jaFld_S_aXDBAux_XDB]);
        } /* if */
    } /* for */
    return(null);
  } /* F_XDBAux_Mp_szNm_aFld */

}  /* class CL_aXDBAux */

/* ***** CL_XDB0 **************************************************************
*
* Layouts most general class.
* 
* new CL_XDB0
*/ 
class CL_XDB0 {
  constructor(R_Bag_XDB0) {
    var szNmColl, JKndTup0, Coll0, aFld0, szNm_aFld, szNote, WwFlag0, jCd_, Bag_UsrView;   
    [szNmColl, JKndTup0, Coll0, aFld0, szNm_aFld, szNote, WwFlag0, jCd_, Bag_UsrView] = R_Bag_XDB0;
    var szNm_URL, jPg, ch, _Hdr0_, OLS_Ld, szTBM_Table, szTBM_Card, szTBM_PopUp, szHelp_Table, szHelp_Card, szHelp_PopUp; 
    [szNm_URL, jPg, ch, _Hdr0_, OLS_Ld, szTBM_Table, szTBM_Card, szTBM_PopUp, szHelp_Table, szHelp_Card, szHelp_PopUp] = Bag_UsrView ?? ["", C_jPg_0, '', null, null, "Standard"];

    const C_jCd_Cur = C_jCd_XDB;
    var fAutoDetect = (szNm_aFld == "AutoDetect");
    var fReadOnly   = (WwFlag0 & C_WwFlag_fReadOnly);
    var fszFldNm_1  = (WwFlag0 & C_WwFlag_fszFldNm_1);
    var fOverWrite  = (WwFlag0 & C_WwFlag_fOverWrite);
    var fMng_Undef  = (WwFlag0 & C_WwFlag_fMng_Undef);
    var fLive       = ((WwFlag0 & C_WwFlag_fLive) != 0);
    var fService    = ((WwFlag0 & C_WwFlag_fService) != 0);
    var fUnSorted   = (WwFlag0 & C_WwFlag_fUnSort);
    
    if (!szNmColl) {
      $Error.U_Error(C_jCd_Cur, 1, "Missing szNmColl", "");
    } /* if */
     if (!JKndTup0) {
      $Error.U_Error(C_jCd_Cur, 2, "Missing JKndTup0", "");
    } /* if */   

    if (!aFld0) {
       if (fAutoDetect) {
           /* AutoDetect Field Layout. */
           szNm_aFld = "auto_aFld_" + szNmColl;                                 /* Prefix "auto_aFld_" remember that the layout was built using AutoDetect */
           if (JKndTup0 == C_JKndTup_Null) {
              JKndTup0 = $AutoDetect.F_JKndTup(Coll0);
           } /* if */
           
           aFld0 = $AutoDetect.F_aFld_Make(Coll0, JKndTup0, fszFldNm_1);        /* Analize the given Collection to build the Collection Layout */
           
           var XDB_AutoDetect = new CL_XDB0([szNm_aFld, C_JKndTup_aObj, aFld0, null, "aFld_aFld", "--- Auto ---", (WwFlag0 | C_WwFlag_fOverWrite), jCd_]);    
       }
       else {
           var aFld0 = CL_Layout.F_UsrView_Mp_szNm_aFld(szNm_aFld);
           if (!aFld0) {
              $Error.U_Error(C_jCd_Cur, 3, "Cannot display an empty Collection with unknown layout.", szNmColl);
           } /* if */ 
       } /* if */
    } /* if */    

    if (fszFldNm_1) {
       if (JKndTup0 == C_JKndTup_aRcd) {
           if ((Coll0) && (Coll0.length > 0)) {                 
             /* Delete the first element of the array (aRcd) that was used for "field names". */
             Coll0.splice(0, 1);
          } /* if */
       } /* if */
       if (JKndTup0 == C_JKndTup_asRcd) {
          delete Coll0["_szKey_"];
       } /* if */
    } /* if */ 
    
    if (!szNmColl) {
       $Error.U_Error(C_jCd_Cur, 4, "Missing szNmColl", "");
    } /* if */
    
    if (CL_aXDBAux.F_XDBAux_Mp_szNm_aFld(szNmColl) && !fOverWrite) {
       $Error.U_Error(C_jCd_Cur, 5, "The Collection already exists!", szNmColl);
    } /* if */

    this._szNmClass = "XDB";
    this.JKndTup0   = JKndTup0;      /* Kind of the Collection */
    this.szJKndTup0 = "";            /* String representing the Kind of the Collection */
    this.szNmColl   = szNmColl;      /* Name of the Collection */
    this.szNm_URL   = szNm_URL;      /* URL or Path file from which the Collection was loade. */
    this.aFld0      = aFld0;         /* Collection Layout provided by the Owner. NOTE: aFld0 is itself a collection of data. */
    this.szNm_aFld  = szNm_aFld;     /* Name of the Collection Layout */
    this.XDB_aFld   = CL_aXDBAux.F_XDBAux_Mp_szNm_aFld(szNm_aFld);              /* aFld0 metadata */
    this.szNote     = szNote;        /* Description of the Collection */
    this.Coll0      = Coll0;         /* The Collection */
    this.Coll_Bak   = null;          /* Collection BackUp */
    this.jPrimKey   = (fUnSorted)? -1: 0;  /* -1 unsorted, 0 use column zero as primary key, etc.*/
    this.Tup_Sel    = null;          /* Tuple selected */
    this.Tup_Copy   = null;          /* Tuple's buffer for Copy */              /* $NOTE: Tup_Copy should be declared in XDB to be independent from UsrView. This simplify data transfer among different UsrView. */
    this.Tup_Filter = null;          /* Tuple's buffer for Filter */   
    this.jCd_Def    = jCd_;          /* Module in which the collection was defined. This info is significant only if the collection was generated internally. */
    this.jCnf       = C_jCnf_Public; /* Degree of confidentiality. */
    this.fReadOnly  = fReadOnly;     /* RO vs RW permisson given by the Owner */
    this.fMng_Undef = fMng_Undef;    /* Manage undefined fields in aObj */    
    this.fLive      = fLive;         /* Force aNdx recalc because Collection size could change at runtime. */
    this.fService   = fService;      /* Collection of data created and used internally by DDJ for administrative purposes. */
    this.faFld      = (szNm_aFld == "aFld_aFld") || (szNm_aFld == "aFld_aFld1"); /* Coll0 is a Fields descriptor */    
    this._Hdr0_     = _Hdr0_;        /* OLS file's _Hdr_ */
    this.OLS_Ld     = OLS_Ld;        /* Link the original OLS object. */
    
       if (!fReadOnly) {
          try {
              this.Coll_Bak = F_Obj_Clone(this.Coll0);    /* BackUp Coll0 */          
          } catch (P_Err) {
              var szErr = $Error.F_szErr_Catch(P_Err);
              if (szErr != "") {
                 $Error.U_Error(C_jCd_Cur, 6, "Backup failed." + szNmColl + "\n", szErr);
              } /* if */
          } /* try catch */
       } /* if */

    CL_aXDBAux.U_Insert(szNmColl, this);

    if (szNm_aFld == "aFld_aFld") {
       /* If the current data structure is a Fields Descriptor (aFld0) insert it in the list of data structure Layouts (aFld0). */
       CL_Layout.U_Insert(szNmColl, Coll0);
       if (JKndTup0 != C_JKndTup_aObj) {
          $Error.U_Error(C_jCd_Cur, 7, "Collection's Layout should have aObj format.\nWas expected: JKndTup0 == C_JKndTup_aObj.", "");
       } /* if */
    } /* if */

//     if (!CL_Layout.F_UsrView_Mp_szNm_aFld(szNm_aFld)) {
//        if ((szNm_aFld == "AutoDetect") && (typeof(aFld0) != "undefined")) {
//           szNm_aFld = "auto" + szNmColl;
//           new CL_XDB0([szNm_aFld, C_JKndTup_aObj, aFld0, null, "aFld_aFld", "Autodetect", C_WwFlag_Null, jCd_]);
//           this.szNm_aFld  = szNm_aFld;       
//        }
//        else {
//           $Error.U_Error(C_jCd_Cur, 8, "Layout undefined!", szNm_aFld);
//        } /* if */
//     } /* if */
     
/* Polymorphic methods */
       
    this.F_Tup_New    = U_Null;
    this.U_Sort       = U_Null;

  } /* constructor */
  
/*-----F_szJKndTup --------------------------------------------------------
*
*/ 
static F_szJKndTup(P_JKndTup0)
{
  var sz_JKndTup = "Illegal";
  if ((C_JKndTup_Null <= P_JKndTup0) && (P_JKndTup0 < C_JKndTup_ToA)) {
     var sz_JKndTup =  C_asz_JKndTup[P_JKndTup0];
  }
  else {
     $Error.U_Error(C_jCd_Cur, 9, "Unknown JKndTup", P_JKndTup0);
  } /* if */
  return(sz_JKndTup);
} /* F_szJKndTup */

}  /* class CL_XDB0 */

/* ***** CL_XDB **************************************************************
*
* Create XDB descriptor for the given Collection and then create also the default UsrView.
* Polymorphic Class introduced to manage the different kind of Tuple representations (JKndTup).
* 
* new CL_XDB
*/ 
class CL_XDB {  
  constructor(R_Bag_XDB0) {      /* new C_XDB(); */
    const C_jBag_XDB_JKndTup0 = 1;
    var szNmColl, JKndTup0, Coll0, aFld0, szNm_aFld, szNote, WwFlag0, jCd_, Bag_UsrView;   
    [szNmColl, JKndTup0, Coll0, aFld0, szNm_aFld, szNote, WwFlag0, jCd_, Bag_UsrView] = R_Bag_XDB0;
    var szNm_URL, jPg, ch, _Hdr0_, OLS_Ld, szTBM_Table, szTBM_Card, szTBM_PopUp, szHelp_Table, szHelp_Card, szHelp_PopUp; 
    [szNm_URL, jPg, ch, _Hdr0_, OLS_Ld, szTBM_Table, szTBM_Card, szTBM_PopUp, szHelp_Table, szHelp_Card, szHelp_PopUp] = Bag_UsrView ?? ["", C_jPg_0, '', null, null, "Standard"];

    U_Root0("CL_XDB", szNmColl);
    var XDB0;
    var fReadOnly = (WwFlag0 & C_WwFlag_fReadOnly);
    
    if (JKndTup0 == C_JKndTup_Null) {
       JKndTup0 = $AutoDetect.F_JKndTup(Coll0);
       R_Bag_XDB0[C_jBag_XDB_JKndTup0] = JKndTup0; 
    } /* if */

    switch (JKndTup0) {                                                         /* Manage polymorphism */
      case C_JKndTup_Arr: {
           XDB0 = new CL_XDB0_Arr(R_Bag_XDB0);
           XDB0.szJKndTup0 = "Arr - Array";
      } break;
      case C_JKndTup_Obj: {
           XDB0 = new CL_XDB0_Obj(R_Bag_XDB0);
           XDB0.szJKndTup0 = "Obj - Object";
      } break;
      case C_JKndTup_aRcd: {
           XDB0 = new CL_XDB0_aRcd(R_Bag_XDB0);
           XDB0.szJKndTup0 = "aRcd - Array of Records";
      } break;
      case C_JKndTup_aObj: {
           XDB0 = new CL_XDB0_aObj(R_Bag_XDB0);
           XDB0.szJKndTup0 = "aObj - Array of Objects";
      } break;
      case C_JKndTup_asRcd: {
           XDB0 = new CL_XDB0_asRcd(R_Bag_XDB0);
           XDB0.szJKndTup0 = "asRcd - Associative Array of Records";
      } break;
      case C_JKndTup_asObj: {
           XDB0 = new CL_XDB0_asObj(R_Bag_XDB0);
           XDB0.szJKndTup0 = "asObj - Associative Array of Objects";
      } break;
      case C_JKndTup_as_: {
           XDB0 = new CL_XDB0_asObj(R_Bag_XDB0);
           XDB0.szJKndTup0 = "as_ - Associative Array of simple type";
      } break;
      default : {
           /* if C_JKndTup_OLS etc. do nothing. */
           return;
      } break;
    } /* switch */
    if (!aFld0) {
       aFld0 = XDB0.aFld0;      /* Sync aFld0 with AutoDetect results. */
    } /* if */

    for (let szKey in XDB0) {                                                   /* Manage polymorphism */
          this[szKey] = XDB0[szKey];
    } /* for */

    var UsrView0 = new CL_UsrView(XDB0, aFld0, szNote, WwFlag0, Bag_UsrView);   /* Create default UserView. */    
    $FileMan.U_Aspect_GetDir(WwFlag0, UsrView0);
    
    if (WwFlag0 & C_WwFlag_fDisplay) {
       /* Usually CL_XDB is NOT used to display Collections, but if the caller require it, we do it! */
       CL_UsrView0.F_UsrView_Select(XDB0.szNmColl, C_WwFlag_fDisplay);
    } /* if */  
  } /* constructor */  
}  /* class CL_XDB */

/*----- Module $XDB --------------------------------------------------------
*
*/ 
const $XDB = (function () {
  var _XDB = {};
  _XDB.U_Init             = U_Init_XDB;         // function U_Init_XDB();
  _XDB.F_fjRow_Mp_JKndTup = F_fjRow_Mp_JKndTup; // function F_fjRow_Mp_JKndTup(P_JKndTup0);
  _XDB.F_fjCol_Mp_JKndTup = F_fjCol_Mp_JKndTup; // function F_fjCol_Mp_JKndTup(P_JKndTup0);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_XDB;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----F_fjRow_Mp_JKndTup --------------------------------------------------------
*
* Access records (tuples) using indexes vs keys.
* $XDB.F_fjRow_Mp_JKndTup()
*/ 
function F_fjRow_Mp_JKndTup(P_JKndTup0)
{
  switch (P_JKndTup0) {
    case C_JKndTup_Arr:         /* indexes */
    case C_JKndTup_aRcd:
    case C_JKndTup_aObj: {
         return(true);
    } break;
    case C_JKndTup_Obj:         /* keys */
    case C_JKndTup_as_:
    case C_JKndTup_asRcd:
    case C_JKndTup_asObj: {
         return(false);
    } break;
    default : {    
         $Error.U_Error(C_jCd_Cur, 10, "Unknown JKndTup", P_JKndTup0);
    } break;
  } /* switch */
} /* F_fjRow_Mp_JKndTup */

/*-----F_fjCol_Mp_JKndTup --------------------------------------------------------
*
* Access fields using indexes vs keys.
* $XDB.F_fjCol_Mp_JKndTup()
*/ 
function F_fjCol_Mp_JKndTup(P_JKndTup0)
{
  switch (P_JKndTup0) {
    case C_JKndTup_Arr:         /* indexes */
    case C_JKndTup_aRcd:
    case C_JKndTup_asRcd: {
         return(true);
    } break;
    case C_JKndTup_Obj:         /* keys */
    case C_JKndTup_aObj:
    case C_JKndTup_asObj:
    case C_JKndTup_as_: {
         return(false);
    } break;
    default : {    
         $Error.U_Error(C_jCd_Cur, 11, "Unknown JKndTup", P_JKndTup0);
    } break;
  } /* switch */
} /* F_fjCol_Mp_JKndTup */

/*-----F_fChk_Arr_Types --------------------------------------------------------
*
* Check P_Arr elements type compatibility with Layout P_aFld.
* $XDB.F_fChk_Arr_Types();
*/ 
function F_fChk_Arr_Types(P_Arr, P_aFld)
{
  var szType = P_aFld[0].szType;
  var iLen = P_Arr.length;
  var i;
  for (i = 0; i < iLen; i++) {
      if (typeof(P_Arr[i]) != szType) {
         return(false);
      } /* if */
  } /* for */
  return(true);
} /* F_fChk_Arr_Types */

/*-----F_fChk_RcdFld --------------------------------------------------------
*
* Check P_Rcd elements type compatibility with Layout P_aFld.
* $XDB.F_fChk_RcdFld();
*/ 
function F_fChk_RcdFld(P_Rcd, P_aFld)
{
  var iLen = P_aFld.length;
  var aFld0;
  var iPos0;
  var Val0;
  var i;
  for (i = 0; i < iLen; i++) {
      aFld0 = P_aFld[i];
      iPos0 = aFld0.iPos0;
      Val0  = P_Rcd[iPos0];
      if (typeof(Val0) != aFld0.szType) {
         return(false);
      } /* if */
  } /* for */
  return(true);
} /* F_fChk_RcdFld */

/*-----F_fChk_ObjFld --------------------------------------------------------
*
* Check P_Obj elements type compatibility with Layout P_aFld.
* $XDB.F_fChk_ObjFld();
*/ 
function F_fChk_ObjFld(P_Obj, P_aFld)
{
  var iLen = P_aFld.length;
  var aFld0;
  var szNm;
  var i;
  for (i = 0; i < iLen; i++) {
      aFld0 = P_aFld[i];
      szNm = aFld0.szNm;
      if (typeof(P_Obj[szNm]) != aFld0.szType) {
         return(false);
      } /* if */
  } /* for */
  return(true);
} /* F_fChk_ObjFld */

/*-----U_Init_XDB --------------------------------------------------------
*
*/ 
function U_Init_XDB()
{
  U_Root0("$XDB", C_jCd_Cur, 2);
} /* U_Init_XDB */

  U_Root0("$XDB", C_jCd_Cur, 1);
  return(_XDB);
})();  /* XDB */
