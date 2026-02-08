/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.022
* File        : dbox.js
* Function    : Dialogue-Box.
* FirstEdit   : 06/12/2019
* LastEdit    : 08/02/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Dialog Box display and management.
*
* ### Requirements
* ### Specifications
* ### Functional Requirements
*     Three main functions: Open DBox, close DBox Cancelling changes, close DBox Confirming changes.
*     Hub. The activity concerning the previous functions is centralized to make debug easy.
*     Support for re-iterated DBox opening.
*
* ### Non Functional Requirements
*
* szRef: a global variable used to store the DBOX object.
* 
* TBM: Tool Bar Menu
* _KNS: Key Not Showed.
* _KRO: Key Read Only.
* 
* $NOTE: $xxx.S_DBox_xxx.U_Hub(C_JPnl_Cancel); force the closure of the DBox $xxx.S_DBox_xxx
* 
* ACP: Alert, Confirm, Prompt
*/

"use strict";

/*----- Global Constants ----------------------------------------------*/

const C_JPnl_Open    = 101;
const C_JPnl_Cancel  = 102;
const C_JPnl_Confirm = 103;

/*----- Global Variables ---------------------------------------------*/


var G_Spare_DBox; /* We need a spare global variable */
var G_szTit;

/* # ---- Object Null --------------------------------------------------------
*
* Control functions for Generic DBox objects showing fixed contents.
*/ 
var G_DBox_Null = (function(){
  var _Null = {};
  _Null.U_Open     = U_Open;      // function U_Open(P_Id);
  _Null.U_Cancel   = U_Close;     // function U_Close(P_Id);
  _Null.U_Confirm  = U_Confirm;   // function U_Confirm(P_Id);

/*----- Local Constants ----------------------------------------------*/


const C_jCd_Cur = C_jCd_DBox;

/*----- Local Variables ----------------------------------------------*/

// var S_DBox1;

/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Id)
{
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{
} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm(P_Bag)
{
} /* U_Confirm */

  return(_Null);
})(); /* # END - G_DBox_Null Object */


/* ***** CL_DBox *******************************************************
*
* P_szId      = string corresponding to the HTML's id identifying uniquely the HTML element used to display the DBox.
* P_szRef     = reference to the object corresponding to the DBox (used internally by DBox object).
* P_szTit     = title of the dialog box.
* P_szForm    = HTML code displayed inside the DBox.
* P_U_Open    = method used to open the DBox.
* P_U_Cancel  = method used to close the DBox cancelling data entered.
* P_U_Confirm = method used to close the DBox submitting inputs.
* P_szSCtx    = Context [optional].
* P_fForm     = create HTML's form.
* 
* Example:
* _MyModule.DBox_MyDBox_Example = new CL_DBox ("Id_Div_DBox0", "$MyModule.DBox_MyDBo_Example", "My_DBox Title", S_szHTML_DBox_MyDBox, S_DBox_MyDBox.U_Open, S_DBox_MyDBox.U_Cancel, S_DBox_MyDBox.U_Confirm, S_aMnEntry_MyDBOX);
*  
*/ 
class CL_DBox  {  
  static S_iCntDBox = 0;

  constructor(P_szId, P_szRef, P_szTit, P_szForm, P_U_Open, P_U_Cancel, P_U_Confirm, P_aMnEntry, P_szSCtx = "none", P_fForm=false) {    /* new CL_DBox */
  
    this.U_Hub       = U_Hub;                     // function U_Hub(P_JPnl);
    this.U_SetAgain  = U_SetAgain;                // function U_SetAgain();
    this.U_ReOpen    = U_ReOpen;                  // function U_ReOpen();
    
    this.U_Open      = U_Open_DBox;               // function U_Open_DBox(P_szId);
    this.U_Close     = U_Close_DBox;              // function U_Close_DBox(P_szId);
    this.U_Upd       = U_Upd_DBox;                // function U_Upd_DBox(P_szId);
  
    this.szId        = P_szId;
    this.szRef       = P_szRef;
    this.szTit       = P_szTit;
    this.szForm      = P_szForm;
    this.aMnEntry    = P_aMnEntry;
    this.szSCtx      = P_szSCtx;
    
    this.U_Open2     = P_U_Open;                  /* Callbacks provided by the user. */
    this.U_Cancel2   = P_U_Cancel;
    this.U_Confirm2  = P_U_Confirm;

    this.DBox1       = null;
    this.DBoxPrv     = null;
    this.fAgain      = false;
    this.fForm       = P_fForm;

/*----- Local Variables ----------------------------------------------*/ 
/*
* The variable S_szForm contains the HTML code of the dialog-box.
*/

var S_szForm0 = `
<div class="Cl_DBox" id="Id_DBox">
  <div class="Cl_DBox_Header"  id="Id_Header_DBox">&nbsp;</div>
  <div class="Cl_DBox_Nav"     id="Id_Nav_DBox">&nbsp;</div>
  <div class="Cl_DBox_Body"    id="Id_Form_DBox">&nbsp;</div>
  <div class="Cl_DBox_Footer"  id="Id_Footer_DBox">&nbsp;</div>
</div>`;
  
/*-----U_Open_DBox -----------------------------------------------------
*
* Show the DBox.
* Open the HTML element corresponding to the Panel of the Dialogue Box
*/ 
function U_Open_DBox(P_szId)
{
  CL_DBox.S_iCntDBox++;
  document.getElementById(P_szId).style.display = "block";
} /* U_Open_DBox */

/*-----U_Close_DBox ----------------------------------------------------
*
* Hide the DBox.
* Close the HTML element corresponging to the Panel of the Dialogue Box
*/ 
function U_Close_DBox(P_szId)
{
  CL_DBox.S_iCntDBox--;
  document.getElementById(P_szId).style.display = "none";
} /* U_Close_DBox */

/*-----U_Upd_DBox ----------------------------------------------------
*
* Update DBox's state.
*/ 
function U_Upd_DBox(P_szTit, P_szSCtx)
{
  this.szTit = P_szTit;
  this.szSCtx = P_szSCtx;
} /* U_Upd_DBox */

/*-----U_Hub --------------------------------------------------------
*
* U_Hub(); centralizes DBox activities making debug easier.
* this.fAgain = true makes possible to reopen the DBox with different parameters allowing, for instance, Cards browsing.
*/

function U_Hub(P_JPnl, P_Bag=null)
{
  var fIcons = false;

  if ($Root.F_fExist("$VConfig")) {     
     fIcons = $VConfig.F_ValSts_Get("fIcons");
  } /* if */

  try {
      do {
        if (this.fAgain) {
           P_JPnl  = C_JPnl_Open;
        } /* if */ 
        switch (P_JPnl) {
        case C_JPnl_Open: {
             this.DBox1 = (!this.fAgain)? this: this.DBoxPrv;
             this.fAgain = false;
             this.Bag0 = P_Bag; 
             this.DBoxPrv = this.DBox1;
             var Elem0 = document.getElementById(this.szId);
             if (!Elem0) {
                U_Log_DBox(C_jCd_DBox, 1, C_iLvl_DBox, "Undefined Id", this.szId);
                return;
             } /* if */
             
             if (this.fForm) {
                var szAction ="http://localhost/Relay/dump.php";
                var szMethod = "POST";
                var szForm1 = `
                <div class="Cl_DBox" id="Id_DBox">
                  <div class="Cl_DBox_Header"  id="Id_Header_DBox">.</div>
                  <div class="Cl_DBox_Nav"     id="Id_Nav_DBox">.</div>
                  <form class="Cl_DBox_Body"   id="Id_Form_DBox" action="${szAction}" method="${szMethod}"><br></form>
                  <div class="Cl_DBox_Footer"  id="Id_Footer_DBox">.</div>
                </div>`;
                Elem0.innerHTML = szForm1;         
             }
             else {             
                Elem0.innerHTML = S_szForm0;  
             } /* if */
             
             var Elem1 = document.getElementById("Id_Header_DBox");

             Elem1.innerHTML = `<span class="Cl_Btn_Canc" onclick="${this.szRef}.U_Hub(C_JPnl_Cancel);">x</span><div class="Cl_DBox_HdrDiv" id="Id_szTit_DBox">.</div>`;
             var ElemFooter = document.getElementById("Id_Footer_DBox");
             if (!this.fForm) {                  
                ElemFooter.innerHTML = `<input onclick="${this.szRef}.U_Hub(C_JPnl_Confirm)" value="Confirm" type="button">`;
             } /* if */

             Elem1 = document.getElementById("Id_szTit_DBox");
             Elem1.innerHTML = this.DBox1.szTit;

             if (this.szSCtx && (this.szSCtx != "none") && $Root.F_fExist("$SemCtx")) {
                /* If Context is available use it */
                this.szSCtx_Prv = $SemCtx.F_szSCtx_Cur();            /* Save previous Context */
                if (P_Bag) {
                    var szSCtx = P_Bag[0];
                    $SemCtx.U_Sel_TBM("Id_Nav_DBox", szSCtx, true);  /* Load ToolBar Menu battons/icons. */
                } /* if */
             } /* if */

             var Elem3 = document.getElementById("Id_Form_DBox");
             Elem3.innerHTML = "<br>" + this.DBox1.szForm;
                    
             this.DBox1.U_Open2(P_Bag);             /* Call User defined function. */
             this.DBox1.U_Open(this.DBox1.szId);    /* Display DBox */
        } break;
        case C_JPnl_Cancel: {
             this.DBox1.U_Close(this.DBox1.szId);
             if (this.szSCtx && this.szSCtx_Prv) {
                $SemCtx.U_Restore(this.szSCtx_Prv); /* Restore previous Context. */
             } /* if */            
             this.DBox1.U_Cancel2(P_Bag);           /* Call User defined function. */
             this.DBoxPrv = null;
        } break;
        case C_JPnl_Confirm: {
             this.DBox1.U_Close(this.DBox1.szId);
             this.DBox1.U_Confirm2(P_Bag);          /* Call User defined function. */
        } break;
        default : {
             $Error.U_Error(C_jCd_Cur, 1, "Unexpected C_JPnl_Open", C_JPnl_Open, false);
        } break;
        } /* switch */  
      } while (this.fAgain);
  } catch (P_Err) {
      $Error.U_Catch(C_jCd_Cur, 1, P_Err);
  } /* try catch */ 
} /* U_Hub */

/*-----U_Log_DBox --------------------------------------------------------
*
*/ 
function U_Log_DBox(P_jCd, P_1, P_jLog, P_2, P_3)
{
  if ($Root.F_fExist("$Log")) { 
     $Log.U_Log(P_jCd, P_jLog, P_1, P_2, P_3);
  } /* if */
} /* U_Log_DBox */

/*-----U_SetAgain --------------------------------------------------------
*
* U_SetAgain could be used in this.DBox1.U_Confirm2(); to request the opening of the same card again allowing sequential editing.
*/ 
function U_SetAgain()
{
  this.fAgain = true;
} /* U_SetAgain */

/*-----U_ReOpen --------------------------------------------------------
*
* Reopen the current card showing updated values.
*/ 
function U_ReOpen()
{
  this.U_SetAgain();
  this.U_Hub(C_JPnl_Cancel);
} /* U_ReOpen */
  
  } /* constructor */

  /*-----F_iCnt_DBox --------------------------------------------------------
  *
  * CL_DBox.F_iCnt_DBox();
  */ 
  static F_iCnt_DBox()
  {
    return(CL_DBox.S_iCntDBox);
  } /* F_iCnt_DBox */

} /* end CL_DBox */

/* ***** CL_DBox_Obj *******************************************************
*
* Open a dialog box to show an Object.
*/ 
class CL_DBox_Obj extends CL_DBox {

  constructor(P_szId, P_szRef, P_szTit, P_Obj, P_U_Open, P_U_Cancel, P_U_Confirm, P_aMnEntry, P_szSCtx, P_fForm=false) {  /* new CL_DBox_Obj */
     var szForm = `
    <div>\n
      <table style="width: 100%" border="1">
        <tbody>  
     `;
     var fIns_Cnt = true;
     var szName = "";    
     var szId;
     var szType;
     var szCnt = "";
     var szBr = "\n";
     var iCnt = 0;
     var szReadOnly = "";
    
     for (let szNmFld in P_Obj) {
         if (szNmFld.indexOf("_KNS") < 0) {            
             szId = "Id_DBox_Obj_" + szNmFld;
             szName = (P_fForm)? `name="${szNmFld}"`: ""; /* P_fForm==true force the insertion of names */

             switch (typeof(P_Obj[szNmFld])) {
               case "string": {
                    szType = "text";
               } break;
               case "number": {
                    szType = "number";
               } break;
               case "boolean": {
                    szType = "checkbox";
               } break;
               default : {
               } break;
             } /* switch */
             if (fIns_Cnt) {
                szCnt = "" + iCnt + ") ";
                iCnt++;
             } /* if */

             if (szNmFld.indexOf("_KRO") >= 0) {
                szReadOnly = "readonly";
                szNmFld = szNmFld.replace("_KRO", "");
             }
             else {
                szReadOnly = ""; 
             } /* if */         
             szForm += `<tr><td class="Cl_DBox_Lbl"><label for="${szId}">${szCnt} ${szNmFld} </label></td> <td><input class="Cl_DBox_Inp" id="${szId}" ${szName} type="${szType}" ${szReadOnly}></td></tr>` + szBr;
              //   continue;
         } /* if */
     } /* for */
     szForm += `
         </tbody>
       </table>     
     </div>
     `;
     
     if (P_fForm) {                     
        szForm += `<input value="Confirm" type="submit"> <input value="Reset" type="reset">\n`;
     } /* if */
     
     if (!P_U_Open) {
        P_U_Open = U_Open_Obj;
     } /* if */
     
     if (!P_U_Cancel) {
        P_U_Cancel = G_DBox_Null.U_Cancel;
     } /* if */
     
     if (!P_U_Confirm) {
        P_U_Confirm = U_Close_Obj;     
     } /* if */
     super(P_szId, P_szRef, P_szTit, szForm, P_U_Open, P_U_Cancel, P_U_Confirm, P_aMnEntry, P_szSCtx, P_fForm);   /* new CL_DBox() */ 
     
     this.Obj0        = P_Obj;
     this.U_Open_Obj  = U_Open_Obj;
     this.U_Close_Obj = U_Close_Obj;
       this.F_Obj_Close_Obj = F_Obj_Close_Obj;
     
     /*-----U_Open_Obj --------------------------------------------------------
     *
     */ 
     function U_Open_Obj()
     {
        var Obj0 = this.Obj0;
        var Elem0;

        for (let szNmFld in Obj0) {            
            if (szNmFld.indexOf("_KNS") < 0) {
                szId = "Id_DBox_Obj_" + szNmFld;
                Elem0 = document.getElementById(szId);
                if (!Elem0) {
                   continue; /* Ignore fields added in a second time */
                } /* if */
                var Val0 = Obj0[szNmFld];
                if (typeof(Val0) != "boolean") {
                   Elem0.value = Val0;
                }
                else {
                   Elem0.checked = (Val0 == true);
                } /* if */
            } /* if */
        } /* for */        
     } /* U_Open_Obj */
     
     /*-----U_Close_Obj --------------------------------------------------------
     *
     */ 
     function U_Close_Obj()
     {
        var Obj0 = this.Obj0;
        var Elem0;

        for (let szNmFld in P_Obj) {           
            if (szNmFld.indexOf("_KNS") < 0) {
                szId = "Id_DBox_Obj_" + szNmFld;
                Elem0 = document.getElementById(szId);
                if (!Elem0) {
                   continue; /* Ignore fields added in a second time */
                } /* if */
                switch (typeof(Obj0[szNmFld])) {
                  case "number": {
                        Obj0[szNmFld] = +Elem0.value;
                  } break;
                  case "boolean": {
                        Obj0[szNmFld] = Elem0.checked;
                  } break;
                  default : {
                        Obj0[szNmFld] = Elem0.value;
                  } break;
                } /* switch */
            } /* if */
            
        } /* for */     
     } /* U_Close_Obj */
     
     /*-----F_Obj_Close_Obj --------------------------------------------------------
     *
     */ 
     function F_Obj_Close_Obj()
     {
        var Obj0 = this.Obj0;
        var Elem0;

        for (let szNmFld in P_Obj) {           
            if (szNmFld.indexOf("_KNS") < 0) {
                szId = "Id_DBox_Obj_" + szNmFld;
                Elem0 = document.getElementById(szId);
                if (!Elem0) {
                   continue; /* Ignore fields added in a second time */
                } /* if */
                switch (typeof(Obj0[szNmFld])) {
                  case "number": {
                        Obj0[szNmFld] = +Elem0.value;
                  } break;
                  case "boolean": {
                        Obj0[szNmFld] = Elem0.checked;
                  } break;
                  case "object": {
                  } break;
                  default : {
                        Obj0[szNmFld] = Elem0.value;
                  } break;
                } /* switch */
            } /* if */
        } /* for */
        return(Obj0);        
     } /* F_Obj_Close_Obj */

   } /* constructor */
} /* end CL_DBox_Obj */

/*-----F_JKndTup_AutoDetect --------------------------------------------------------
*
*/ 
function F_JKndTup_AutoDetect(P_Coll0)
{
     
const C_JKndTup_Null  =  0;   /*  */                                                                                                                                                    
const C_JKndTup_Arr   =  1;   /* i.e. ai    = [0,1,2,3,4,5,6,7,8,9]; */                                                                                                                 
const C_JKndTup_Obj   =  2;   /* i.e. Obj   = {sz0:"aaa", iNum:100, fBool:true}; */                                                                                                     
const C_JKndTup_aRcd  =  3;   /* i.e. aRcd  = [["aaa", 100, true], ["bbb", 101, true], ["ccc", 102, true], ["ddd", 103, true]]; */                                                      
const C_JKndTup_aObj  =  4;   /* i.e. aObj  = [{sz0:"aaa", iNum:100, fBool:true}, {sz0:"bbb", iNum:101, fBool:true}, {sz0:"ccc", iNum:102, fBool:true}]; */                             
const C_JKndTup_asRcd =  5;   /* i.e. asRcd = {key0:["aaa", 100, true], key1:["bbb", 101, true], key2:["ccc", 102, true], key3:["ddd", 103, true]}; - IndexedDB format */               

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

/* ***** CL_DBox_Value *******************************************************
*
* Open a dialog box to show the given Object.
*/ 
class CL_DBox_Value extends CL_DBox {

  constructor(P_szId, P_szRef, P_szTit, P_Mat, P_aszTHead, P_fLnNum, P_U_Open, P_U_Cancel, P_U_Confirm, P_aMnEntry, P_szSCtx) { /* new CL_DBox_Value */
     
     var szTab = F_szTab_Mp_Obj(P_Mat, P_aszTHead, P_fLnNum);
     
     if (!P_U_Open) {
        P_U_Open = U_Open_Obj;
     } /* if */
     
     if (!P_U_Cancel) {
        P_U_Cancel = G_DBox_Null.U_Cancel;
     } /* if */
     
     if (!P_U_Confirm) {
        P_U_Confirm = U_Close_Obj;     
     } /* if */

     if (!P_szTit) {
        P_szTit = G_szTit;
     } /* if */
     super(P_szId, P_szRef, P_szTit, szTab, P_U_Open, P_U_Cancel, P_U_Confirm, P_aMnEntry, P_szSCtx);   /* new CL_DBox() */      
     
     this.Mat0 = P_Mat;
     
     /*-----U_Open_Obj --------------------------------------------------------
     *
     */ 
     function U_Open_Obj()
     {       
     } /* U_Open_Obj */
     
     /*-----U_Close_Obj --------------------------------------------------------
     *
     */ 
     function U_Close_Obj()
     {    
     } /* U_Close_Obj */

   } /* constructor */
} /* end CL_DBox_Value */
                                                                                                                  
/*-----F_szTab_Mp_Obj --------------------------------------------------------
*
* Return the string representing the HTML's table showing the value of the object P_Mat.
*/ 
function F_szTab_Mp_Obj(P_Mat, P_aszTHead, P_fLnNum)
{
const C_JKndTup_Null  =  0;   /*  */                                                                                                                                                    
const C_JKndTup_Arr   =  1;   /* i.e. ai    = [0,1,2,3,4,5,6,7,8,9]; */                                                                                                                 
const C_JKndTup_Obj   =  2;   /* i.e. Obj   = {sz0:"aaa", iNum:100, fBool:true}; */                                                                                                     
const C_JKndTup_aRcd  =  3;   /* i.e. aRcd  = [["aaa", 100, true], ["bbb", 101, true], ["ccc", 102, true], ["ddd", 103, true]]; */                                                      
const C_JKndTup_aObj  =  4;   /* i.e. aObj  = [{sz0:"aaa", iNum:100, fBool:true}, {sz0:"bbb", iNum:101, fBool:true}, {sz0:"ccc", iNum:102, fBool:true}]; */                             
const C_JKndTup_asRcd =  5;   /* i.e. asRcd = {key0:["aaa", 100, true], key1:["bbb", 101, true], key2:["ccc", 102, true], key3:["ddd", 103, true]}; - IndexedDB format */               
const C_JKndTup_asObj =  6;   /* i.e. asObj = {key0:{sz0:"aaa", iNum:100, fBool:true}, key1:{sz0:"bbb", iNum:101, fBool:true}, key2:{sz0:"ccc", iNum:102, fBool:true}}; */              
const C_JKndTup_as_   =  7;   /* i.e. as_   = {"brown":0, "red":1, "orange":2}; */              

     var Mat0;
     var szRow = "";      
     var JKndTup0 = F_JKndTup_AutoDetect(P_Mat);
     var iDelta_LnNum = (P_fLnNum)? 1: 0;
     var szColGroup = "";

     var szTab = `<div>
     <table style="width: 100%" border="1">`;
     
     if (P_aszTHead) {
            let iNNCol = P_aszTHead.length;
            if (P_fLnNum) {
               iDelta_LnNum = 1;
            } /* if */
            szColGroup = `
              <colgroup>
                <col span=${iNNCol + iDelta_LnNum} width="${100/(iNNCol + iDelta_LnNum)}%;">
              </colgroup>
            `;
            szRow = "<thead><tr>";
            if (P_fLnNum) {
               szRow += "<th></th>";
            } /* if */
            for (let j = 0; j < iNNCol; j++) {
                szRow += "<th>" + P_aszTHead[j] + "</th>";
            } /* for */
            szRow += "</tr></thead>";
            szTab += szColGroup + szRow;     
     } /* if */         
     szTab += "<tbody>";
     switch (JKndTup0) {
       case C_JKndTup_Arr: {
            Mat0 = P_Mat;
            let iNNRow = P_Mat.length;
            for (let i = 0; i < iNNRow; i++) {            
                 szRow += (P_fLnNum)? "<tr><td>" + i + "</td>": "<tr>";               
                 szRow += "<td>" + i + "</td><td>" + Mat0[i] + "</td></tr>";
            } /* for */
            szTab += szRow;
            G_szTit = "Arr : Array";
       } break;
       case C_JKndTup_Obj:
       case C_JKndTup_as_: {
            Mat0 = P_Mat;
            for (let szKey in Mat0) {             
                szRow += "<tr><td>" + szKey + "</td><td>" + Mat0[szKey] + "</td></tr>";
            } /* for */
            szTab += szRow;
            G_szTit = "Obj : Object";
       } break;
       case C_JKndTup_aRcd: {
            let iNNRow = P_Mat.length;
            let iNNCol = P_Mat[0].length; 
            for (let i = 0; i < iNNRow; i++) {
                Mat0 = P_Mat[i];
                szRow = (P_fLnNum)? "<tr><td>" + i + "</td>": "<tr>";
                for (let j = 0; j < iNNCol; j++) {
                    szRow += "<td>" + Mat0[j] + "</td>";
                } /* for */
                szRow += "</tr>";
                szTab += szRow;
            } /* for */
            G_szTit = "aRcd : array of records";  
       } break;
       case C_JKndTup_aObj: {
            let iNNRow = P_Mat.length; 
            for (let i = 0; i < iNNRow; i++) {
                Mat0 = P_Mat[i];                
                szRow = (P_fLnNum)? "<tr><td>" + i + "</td>": "<tr>";
                for (let szKey in Mat0) {
                    szRow += "<td>" + Mat0[szKey] + "</td>";
                } /* for */
                szRow += "</tr>";
                szTab += szRow;
            } /* for */
            G_szTit = "aObj : array of objects";       
       } break;
       case C_JKndTup_asRcd: {
            for (let szKey in P_Mat) {
                Mat0 = P_Mat[szKey];
                let iNNCol = Mat0.length;
                szRow = "<tr><td>" + szKey + "</td>";
                for (let j = 0; j < iNNCol; j++) {
                    szRow += "<td>" + Mat0[j] + "</td>";
                } /* for */
                szRow += "</tr>";
                szTab += szRow;
            } /* for */
            G_szTit = "asRcd : associative array of records";
       } break;
       case C_JKndTup_asObj: {
            for (let szKey in P_Mat) {
                Mat0 = P_Mat[szKey];
                szRow = "<tr><td>" + szKey + "</td>";
                for (let szKey in Mat0) {
                    szRow += "<td>" + Mat0[szKey] + "</td>";
                } /* for */
                szRow += "</tr>";
                szTab += szRow;
            } /* for */
            G_szTit = "asRcd : associative array of objects";
       } break;
       default : {
            szTab += "<tr><td>" + P_Mat + "</td></tr>";           
            G_szTit = "Other.";
       } break;
     } /* switch */

     szTab += `
         </tbody>
       </table>     
     </div>
     `;
  return(szTab);
} /* F_szTab_Mp_Obj */

/*-----U_ShowVal --------------------------------------------------------
*
* Open a DBox to show P_Val values.
* Create the HTML code corresponding to P_Val and insert as P_szId.innerHTML.
*/ 
function U_ShowVal(P_szId, P_Val, P_szTit, P_aszTHead, P_fLnNum)
{
  G_Spare_DBox = new CL_DBox_Value(P_szId, "G_Spare_DBox", P_szTit, P_Val, P_aszTHead, P_fLnNum, null, null, null, null); 
  G_Spare_DBox.U_Hub(C_JPnl_Open);
} /* U_ShowVal */

/* # ---- Object ACP --------------------------------------------------------
*
* Emulate functions alert(), confirm(), prompt().
*/ 
const $ACP = (function(){
  var _ACP = {};
  _ACP.U_Open_Alert    = U_Open_Alert;    // function U_Open_Alert(P_szMsg, P_iNnBR=5, P_CB_OnClose=U_Null);
  _ACP.U_Close_Alert   = U_Close_Alert;   // function U_Close_Alert();
  _ACP.U_Open_Confirm  = U_Open_Confirm;  // function U_Open_Confirm(P_szMsg, P_CB_True,  P_CB_False);
  _ACP.U_Close_Confirm = U_Close_Confirm; // function U_Close_Confirm();
  
/*-----U_Open_Alert --------------------------------------------------------
*
*/ 
function U_Open_Alert(P_szMsg, P_iNnBR=5, P_CB_OnClose=U_Null) {
  var aBR = ["", "<br>", "<br><br>", "<br><br><br>", "<br><br><br><br>", "<br><br><br><br><br>", "<br><br><br><br><br><br>"];
  var Elem0 = document.createElement('div');
  Elem0.setAttribute("id", "Id_Alert");
  Elem0.style.position = 'fixed';
  Elem0.style.top = '50%';
  Elem0.style.left = '50%';
  Elem0.style.width = '30%';
  Elem0.style.height = '20%';
  Elem0.style.transform = 'translate(-50%, -50%)';
  Elem0.style.padding = '20px';
  Elem0.style.backgroundColor = 'white';
  Elem0.style.border = '1px solid black';
  Elem0.style.zIndex = '1000';
  Elem0.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
  
  var Elem_Div = document.createElement('div');
  var szBR = ((1 < P_iNnBR) && (P_iNnBR <= 6))? aBR[P_iNnBR]: aBR[5];
  Elem_Div.innerHTML = `<fieldset><legend>Alert</legend><br>${P_szMsg}${szBR}<button id='Id_Button_U_Alert'>CLOSE</button></fieldset>`;
  Elem0.appendChild(Elem_Div);
  document.body.appendChild(Elem0);
  
  var Elem1 = document.getElementById("Id_Button_U_Alert");
  
  Elem1.addEventListener('click', () => {
      document.body.removeChild(Elem0); // Remove HTML code from DOM
      P_CB_OnClose();
  });
} /* U_Open_Alert */

/*-----U_Close_Alert --------------------------------------------------------
*
*/ 
function U_Close_Alert()
{
  var Elem0 = document.getElementById("Id_Alert");
  if (Elem0) {
     document.body.removeChild(Elem0);
  } /* if */
} /* U_Close_Alert */

/*-----U_Open_Confirm --------------------------------------------------------
*
*/ 
function U_Open_Confirm(P_szMsg, P_CB_True=U_Null,  P_CB_False=U_Null) {
  var Elem0 = document.createElement('div');
  Elem0.setAttribute("id", "Id_Confirm");
  Elem0.style.position = 'fixed';
  Elem0.style.top = '50%';
  Elem0.style.left = '50%';
  Elem0.style.width = '30%';
  Elem0.style.height = '20%';
  Elem0.style.transform = 'translate(-50%, -50%)';
  Elem0.style.padding = '20px';
  Elem0.style.backgroundColor = 'white';
  Elem0.style.border = '1px solid black';
  Elem0.style.zIndex = '1000';
  Elem0.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
  
  var Elem_Div = document.createElement('div');
  // Elem_Div.innerHTML = P_szMsg + "<br><button id='Id_Button_Yes'>Yes</button> - <button id='Id_Button_No'>No</button>";
  Elem_Div.innerHTML = `<fieldset><legend>Confirm</legend><br>${P_szMsg}<br><br><button id='Id_Button_Yes'>Yes</button> - <button id='Id_Button_No'>No</button></fieldset>`;
  Elem0.appendChild(Elem_Div);
  document.body.appendChild(Elem0);
  
  var Elem1 = document.getElementById("Id_Button_Yes");
  var Elem2 = document.getElementById("Id_Button_No");
  
  Elem1.addEventListener('click', () => {
      document.body.removeChild(Elem0); // Remove HTML code from DOM
         P_CB_True();
  }); 
  Elem2.addEventListener('click', () => {
      document.body.removeChild(Elem0); // Remove HTML code from DOM
         P_CB_False();
  });
} /* U_Open_Confirm */

/*-----U_Close_Confirm --------------------------------------------------------
*
*/ 
function U_Close_Confirm()
{
  var Elem0 = document.getElementById("Id_Confirm");
  if (Elem0) {
     document.body.removeChild(Elem0);
  } /* if */
} /* U_Close_Confirm */
 

  return(_ACP);
})(); /* # END - $ACP Object */

