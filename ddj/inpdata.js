/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : inpdata.js
* Function    : Input Data / Data Loading
* FirstEdit   : 15/12/2019
* LastEdit    : 05/02/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Manage data loading.
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
/*----- Local Types ---------------------------------------------*/

/*----- Global Variables ---------------------------------------------*/

//  var G_szEncoding = 'windows-1252';
//  var G_szEncoding = 'greek';
//  var G_szEncoding = 'cyrillic';
//  var G_szEncoding = 'utf-8';

// var G_szEncoding = 'UTF-8';

/* DDJ GUI's state declaration. */
var G_DDJ = {};

/*
*  Select Collection.
*/
var G_szHTML_DBox_InpData  = `
  <div style="padding:10%;">
    <fieldset> <legend>Select/Load collection from:</legend>
      <br>
      Source:
      <select id="Id_szSource" size="1" onchange="G_DBox_InpData.U_ChgSource(Id_szSource.value);">
        <option value="Loaded"   title="Select a Collection already loaded in memory.">Collections Loaded </option>
        <option value="New"      title="Create a New Collection">New </option>
        <option value="File"     title="Load a Collection reading an external file.">File </option>
        <option value="File DDJ" title="Load a Collection reading an external file (IPCF)." class="Cl_LcdLcd">File DDJ</option>
        <option value="Local"    title="Load a Collection stored in the localstorage.">LocalStorage </option>
        <option value="Session"  title="Load a Collection stored in the sessionstorage.">SessionStorage</option>
        <option value="URL"      title="Load a Collection accessing the given URL.">URL </option>
        <option value="Var"      title="Load data stored in a generic Global Variable.">Global Variable </option>
        <option value="Function" title="Collection initialized with function values.">Function </option>
        <option value="TextArea" title="Text Area.">TextArea.</option>
        <option value="Calendar" title="Calendar.">Calendar.</option>
        <option value="Dupli"    title="Duplicate View.">Duplicate.</option>
      </select>
      <span id="Id_Span_Panel">
        Panel: <input id="Id_szPanel" type="number" value=0 min=0 max=1 step=1>
      </span>
      <br>
      <br>        
      <div id="Id_Div_Loaded">
        Select collection:
        <select id="Id_Inp_szNmColl_1" size="1">
        </select>  AS(2): <input id="Id_Inp_szAS_2" type="text" size="3"><br><br> 
        Show collection 
        <select id="Id_Inp_jKndData" size="1">
          <option value="0" title="Show the Collection Rows.">tuples </option>
          <option value="1" title="Show the Collection Layout (Data Collection).">Layout XDB.aFld</option>
          <option value="2" title="Show the Collection Layout (User View).">Layout UsrView.aFld</option>
          <option value="3" title="Show the Collection Properties.">XDB </option>
          <option value="4" title="Show the Collection Metadata.">UsrView </option>
        </select>
        <br><br>
      </div> <!-- Id_Div_Loaded -->
      
      <div id="Id_Div_Param">
        <div id="Id_Div_File"     > File:      <input class="Cl_File"  id="Id_Inp_File"     onchange="G_DBox_InpData.U_Upd_szNmColl(Id_Inp_File.value,     'File');"     type="file"></div>
        <div id="Id_Div_File_DDJ" > File DDJ:  <input class="Cl_File"  id="Id_Inp_File_DDJ" onchange="G_DBox_InpData.U_Upd_szNmColl(Id_Inp_File_DDJ.value, 'File DDJ');" type="text"></div>
        <div id="Id_Div_Local"    > Local:     <input class="Cl_Input" id="Id_Inp_Local"    onchange="G_DBox_InpData.U_Upd_szNmColl(Id_Inp_Local.value,    'Local');"    type="text"></div>
        <div id="Id_Div_Session"  > Session:   <input class="Cl_Input" id="Id_Inp_Session"  onchange="G_DBox_InpData.U_Upd_szNmColl(Id_Inp_Session.value,  'Session');"  type="text"></div>
        <div id="Id_Div_URL"      > URL:       <input class="Cl_Input" id="Id_Inp_URL"      onchange="G_DBox_InpData.U_Upd_szNmColl(Id_Inp_URL.value,      'URL');"      type="text"  list="Id_Li_Inp_URL" placeholder="--- List ---"> 
          <button onclick="Id_Inp_URL.value = ''">clear</button> <button onclick="window.open(Id_Inp_URL.value)">open in a window</button>
          <datalist id="Id_Li_Inp_URL"><!-- $VERSIONING --> 
                      
            <option value="https://capralezioni.altervista.org/2025_26/ols_003/dbase/flash_card.OLS">https://capralezioni.altervista.org/2025_26/ols_003/dbase/flash_card.OLS</option>
            <option value="https://capralezioni.altervista.org/2025_26/ols_003/dbase/Prova_all.OLS">https://capralezioni.altervista.org/2025_26/ols_003/dbase/Prova_all.OLS</option>
            <option value="https://capralezioni.altervista.org/2025_26/ols_003/dbase/italia.OLS">https://capralezioni.altervista.org/2025_26/ols_003/dbase/italia.OLS</option>
            <option value="https://capralezioni.altervista.org/2025_26/ols_003/dbase/dirty.csv">https://capralezioni.altervista.org/2025_26/ols_003/dbase/dirty.csv</option>
            <option value="https://capralezioni.altervista.org/2025_26/ols_003/read.php?szTopic=italia.OLS">https://capralezioni.altervista.org/2025_26/ols_003/read.php?szTopic=italia.OLS</option>

            <option value="https://tuisys.altervista.org/ols/dbase/Prova_all.OLS">https://tuisys.altervista.org/ols/dbase/Prova_all.OLS</option>
            <option value="https://tuisys.altervista.org/ols/dbase/dirty.csv">https://tuisys.altervista.org/ols/dbase/dirty.csv</option>
            <option value="https://tuisys.altervista.org/ols/dbase/sales_rid.OLS">https://tuisys.altervista.org/ols/dbase/sales_rid.OLS</option>
            <option value="https://tuisys.altervista.org/ols/dbase/italia.OLS">https://tuisys.altervista.org/ols/dbase/italia.OLS</option>
            <option value="https://tuisys.altervista.org/ols/dbase/slide_LD24.OLS">https://tuisys.altervista.org/ols/dbase/slide_LD24.OLS</option>
          </datalist>
        </div> <!-- Id_Div_URL -->

        <div id="Id_Div_Var"> Global Variable: 
        <input class="Cl_Input" id="Id_Inp_Var" onchange="G_DBox_InpData.U_Upd_szNmColl(Id_Inp_Var.value, 'Var');" type="text"  list="Id_Li_Inp_Var"  placeholder="--- List ---"> <button onclick="Id_Inp_Var.value = ''">clear</button>       
          <datalist id="Id_Li_Inp_Var">
            <option value="window"         title="Browser's window object (top level of the BOM).">window </option>
            <option value="document"       title="document = window.document object (DOM).">document </option>
            <option value="window.history" title="Browser's history object.">window.history </option>
            <option value="window.screen"  title="Browser's screen object.">window.screen </option>
            <option value="navigator"      title="Browser's navigator object.">navigator </option>
            <option value="G_asaMnEntry"   title="DDJ Menu Entries.">G_asaMnEntry </option>
          </datalist>        
        </div> <!-- Id_Div_Var -->
        
        <div id="Id_Div_Function">
            <label for="Id_Div_Function_iMin">min: </label><input id="Id_Div_Function_iMin"  type="number"> &nbsp;
            <label for="Id_Div_Function_iMax">Max: </label><input id="Id_Div_Function_iMax"  type="number"> &nbsp;
            <label for="Id_Div_Function_iStep">step: </label><input id="Id_Div_Function_iStep" type="number"><br><br>
            <label for="Id_Div_Function_FormulaY">y = (formula): </label><input class="Cl_Input" id="Id_Div_Function_FormulaY" type="text" list="Id_Li_Inp_Fn" placeholder="--- List ---"> <button onclick="Id_Div_Function_FormulaY.value = ''">clear</button>
            <datalist id="Id_Li_Inp_Fn">
              <option value="x**2 + 2*x + 1">x**2 + 2*x + 1</option>
              <option value="sqrt(x)">sqrt(x)</option>
              <option value="sin(PI/x)">sin(PI/x)</option>
              <option value="e**x">e**x</option>
            </datalist> 
        </div> <!-- Id_Div_Function -->
        
        <div id="Id_Div_TextArea"> <button onclick="Id_Div_TextArea_Val.value='';">Clear</button>
            <textarea class="Cl_TextArea" id="Id_Div_TextArea_Val" rows="10"></textarea><br><br>
        </div> <!-- Id_Div_TextArea -->

         <div id="Id_Div_Calendar"><br>
         Init&nbsp; <input id="Id_Init_Year" type="number" min="1900" max="2100" step="1" value="2025"> month <input id="Id_Init_Month" type="number" min="1" max="12" step="1" value="1"> day <input id="Id_Init_Day" type="number" min="1" max="31" step="1" value="1"><br>
         End  <input id="Id_End_Year" type="number" min="1900" max="2100" step="1" value="2025"> month <input id="Id_End_Month" type="number" min="1" max="12" step="1" value="12"> day <input id="Id_End_Day" type="number" min="1" max="31" step="1" value="31"><br>
        </div> <!-- Id_Div_Calendar -->
        <br>
        <span id="Id_Div_Dupli">
            Duplicate the currently selected collection with the 
        </span> <!-- Id_Div_Dupli -->

        <label for="Id_Inp_szNmColl_2">Collection name:</label> <input id="Id_Inp_szNmColl_2" type="text" required> <label for="Id_Inp_szAS_1">AS(1): </label><input id="Id_Inp_szAS_1" type="text" size="3"> 
        <br> 
        <br>
        
        <div id="Id_Div_Kind">
        Kind:
        <select id="Id_JKndTup0" size="1" onchange="G_DBox_InpData.U_Upd_Kind(Id_JKndTup0.value);">
          <option value="0" title="No selection">Null </option>                 <!-- $NOTE: numeric code correspond to C_JKndTup_XXX constants defined in xdb.js -->
          <option value="1" title="Array">Arr </option>
          <option value="2" title="Object">Obj </option>
          <option value="3" title="Array of Records">aRcd </option>
          <option value="4" title="Array of Objects">aObj </option>
          <option value="5" title="Associative Array of Records">asRcd </option>
          <option value="6" title="Associative Array of Objects">asObj </option>
          <option value="10" title="Associative Array of simple type">as_ </option>
          <option value="16" title="OLS' proprietary format.">OLS </option>
          <option value="17" title="Comma Separated Values">CSV </option>
          <option value="18" title="Typed Array">Blob </option>
          <option value="19" title="Fixed Length Records">FLR </option>
          <option value="20" title="XML">XML </option>
          <option value="21" title="DBF">DBF </option>
          <option value="23" title="Analyze Text">Text </option>         
          <option value="24" title="HTML">TOON </option>
        </select>
        </div> <!-- Id_Div_Kind -->
        
        &nbsp;&nbsp; Record layout (aFld):
        <select id="Id_szNm_aFld" size="1" onchange="CL_UsrView0.U_Chk_Layout();">
        </select>

        <br>
        <br>
        <div id="Id_Div_Opt_File">
          <label for="Id_CBox_fTransp">Transpose:</label> <input id="Id_CBox_fTransp" type="checkbox"> &nbsp; &nbsp;
          <label for="Id_CBox_fKrypt">DeKrypt:</label> <input id="Id_CBox_fKrypt" type="checkbox"> &nbsp; &nbsp;
          <label for="Id_CBox_fUnSort">UnSorted:</label> <input id="Id_CBox_fUnSort" type="checkbox">
          <br><br>
        </div> <!-- Id_Div_Opt_File -->        
        <div id="Id_Div_Clone">
          <label for="Id_CBox_fClone">Clone Collection:</label> <input id="Id_CBox_fClone" type="checkbox">
          <br><br>
        </div> <!-- Id_Div_Clone -->
      </div><!-- Id_Div_Param -->
      <span id="Id_Span_fEmbed">
        <label for="Id_CBox_fEmbed">Embed:</label> <input id="Id_CBox_fEmbed" type="checkbox"> &nbsp; &nbsp; 
      </span>
      <span id="Id_Span_fReadOnly">
        <label for="Id_CBox_fReadOnly">Read Only [RO]: </label><input id="Id_CBox_fReadOnly" type="checkbox">&nbsp;&nbsp; 
      </span>
      <span id="Id_Span_fMng_Undef">
        <label for="Id_CBox_fMng_Undef">Manage "undefined fields": </label><input id="Id_CBox_fMng_Undef" type="checkbox">
      </span>
      <span id="Id_Span_fLine1">
      <label for="Id_CBox_fLine1">Field names in the first line:</label><input id="Id_CBox_fLine1" type="checkbox"> &nbsp; &nbsp;
      </span>
      <br><br>     
      <div id="Id_Div_CSV">
      <label for="Id_CBox_fLnNum">Add Line Num: </label><input id="Id_CBox_fLnNum" type="checkbox">&nbsp;&nbsp;
      <label for="Id_CBox_fTag">Add _Tag_: </label><input id="Id_CBox_fTag" type="checkbox">&nbsp;&nbsp;       
      <br><br>
        <label for="Id_CBox_iSkip">Skip </label><input id="Id_CBox_iSkip" min=0 type="number" size=2> lines; &nbsp;&nbsp;
        <label for="Id_CBox_chSep1">chSep1: </label><input id="Id_CBox_chSep1" type="text" size=2>&nbsp;&nbsp;
        <label for="Id_CBox_chSep2">chSep2: </label><input id="Id_CBox_chSep2" type="text" size=2>&nbsp;&nbsp;
        <label for="Id_CBox_fAlgCSV1">AlgCSV1: </label><input id="Id_CBox_fAlgCSV1" type="checkbox">&nbsp;&nbsp;
        <label for="Id_Inp_Enc">Encoding: </label><input id="Id_Inp_Enc" list="Id_Li_Inp_Enc" value="UTF-8" size=15> <button onclick="Id_Inp_Enc.value=''">clear</button>
        <datalist id="Id_Li_Inp_Enc">
          <option value="UTF-8"         title="">UTF-8 </option>
          <option value="windows-1252"  title="">windows-1252 </option>
        </datalist>  
      <br>  
      </div><!-- Id_Div_CSV -->     
      <div id="Id_Div_OLS">  
        <label for="Id_CBox_fAutoExec">AutoExec:</label> <input id="Id_CBox_fAutoExec" type="checkbox">
      <br>  
      </div><!-- Id_Div_OLS -->
    </fieldset>
  </div>`;
  

var G_szTextArea = "";
var G_szURL = "";

/* # ---- Object G_DBox_InpData --------------------------------------------------------
*
* Load data collection from an external File.
*/ 
var G_DBox_InpData = (function(){
  var _InpData = {};
  _InpData.U_Open      = U_Open;      // function U_Open(P_Bag);
  _InpData.U_Close     = U_Close;     // function U_Close(P_Bag);
  _InpData.U_Confirm   = U_Confirm;   // function U_Confirm(P_Bag);
  _InpData.U_ChgSource = U_ChgSource; // function U_ChgSource();
  _InpData.U_New_aFld  = U_New_aFld;  // function U_New_aFld();
  
  _InpData.U_Upd_szNmColl = U_Upd_szNmColl;   // function U_Upd_szNmColl(P_Display0, P_szSource);
  _InpData.U_Upd_Kind  = U_Upd_Kind;  // function U_Upd_Kind();

  _InpData.iMin   = 0;
  _InpData.iMax   = 100;
  _InpData.iStep  = 1;
  _InpData.szFormulaY = "sin(x)";

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_InpData;

/*-----U_Open --------------------------------------------------------
*
* G_DBox_InpData.U_Open();
*/ 
function U_Open(P_Bag)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szNmColl = UsrView0.szNmColl;
  
  if (szNmColl.indexOf("auto_") == 0) {
     szNmColl = szNmColl.substr(5);
  } /* if */
  U_Set_szNmColl0(szNmColl); 
               
  var szHTML_aOpt_aFld     = CL_UsrView0.F_szHTML_aOpt_aFld("", true);
  var szHTML_aOpt_szNmColl = CL_UsrView0.F_szHTML_aOpt_szNmColl();
  var szTmp = "";
  
  G_DDJ._szNmClass = "DDJ";
  G_DDJ.fNew_aFld  = false;
  
  Id_szSource.value = G_DDJ.szSource;
  G_DDJ.jPg = CL_UsrView0.F_jPg_Sel();
  Id_szPanel.value  = G_DDJ.jPg;
  Id_JKndTup0.value = G_DDJ.JKndTup0;
  Id_szNm_aFld.innerHTML = szHTML_aOpt_aFld;
  Id_Inp_szNmColl_1.innerHTML = szHTML_aOpt_szNmColl; 
 
  Id_CBox_fTransp.checked = G_DDJ.fTransp;
  Id_CBox_fKrypt.checked = G_DDJ.fKrypt;
  Id_CBox_fUnSort.checked = G_DDJ.fUnSort;
  Id_CBox_fEmbed.checked = G_DDJ.fEmbed;
  Id_CBox_fLine1.checked = G_DDJ.fszFldNm_1;
  Id_CBox_fMng_Undef.checked = G_DDJ.fMng_Undef;

  Id_Div_Function_iMin.value  = _InpData.iMin;
  Id_Div_Function_iMax.value  = _InpData.iMax;
  Id_Div_Function_iStep.value = _InpData.iStep;
  Id_Div_Function_FormulaY.value = _InpData.szFormulaY;

//  G_DDJ.fReadOnly = (G_DDJ.szSource != "New");                                  /* Collection loaded will be set Read Only by default. */
  Id_CBox_fReadOnly.checked = G_DDJ.fReadOnly;
  Id_CBox_iSkip.value = G_DDJ.iSkip;
  Id_CBox_chSep1.value = G_DDJ.chSep1;
  Id_CBox_chSep2.value = G_DDJ.chSep2;
  Id_CBox_fAlgCSV1.checked = G_DDJ.fAlgCSV1;
  Id_CBox_fAutoExec.checked = G_DDJ.fAutoExec;
  Id_Inp_Enc.value = G_DDJ.szEnc;
  Id_CBox_fLnNum.checked = G_DDJ.fLnNum;
  Id_CBox_fTag.checked = G_DDJ.fTag;
         
  G_DBox_InpData.U_ChgSource(Id_szSource.value); 
} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Bag)
{

} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
* G_DBox_InpData.U_Confirm();
* Load data collection stored in the selected file and allocate the corresponding JS Object.
*/
 
function U_Confirm(P_Bag)
{
  var aColl_Empty = [null, [], {}, [], [], {}, {}];
  var UsrView0;
  var XDB0;

  G_DDJ.szSource  = document.getElementById("Id_szSource").value;               /* Data source. */  
  G_DDJ.jPg = Id_szPanel.value;
  CL_UsrView0.U_Sel_jPg(G_DDJ.jPg);

  G_DDJ.JKndTup0  = + document.getElementById("Id_JKndTup0").value;             /* Kind of the data structure */
  G_DDJ.szSourcePrv = G_DDJ.szSource;
  
  if (G_DDJ.szSource == "Loaded") {
    var szNm0 = document.getElementById("Id_Inp_szNmColl_1").value;             /* Name of Data Collection */
    U_Set_szNmColl0(szNm0);                                             
    G_DDJ.szAS = document.getElementById("Id_Inp_szAS_2").value;                /* Short Alias for the given Collection */
  }
  else {
     var szNm0 = document.getElementById("Id_Inp_szNmColl_2").value;            /* Name of Data Collection */
     if (szNm0 == "") {
        $Error.U_Error(C_jCd_Cur, 1, "No Collection selected.", "", false);
     } /* if */
     U_Set_szNmColl0(szNm0);
     G_DDJ.szAS     = document.getElementById("Id_Inp_szAS_1").value;           /* Short Alias for the given Collection */
  } /* if */

  var jOpt = +document.getElementById("Id_szNm_aFld").value;                    /* Get the Name of the structure describing the table data structure */

  if (jOpt > 0) {
     G_DDJ.szNm_aFld = CL_UsrView0.F_sz_aFld_Mp_jOpt(jOpt -1);
     G_DDJ.aFld      = CL_UsrView0.F_aFld_Mp_jOpt(jOpt -1);
  }
  else {
     G_DDJ.szNm_aFld = "AutoDetect";
     G_DDJ.aFld      = null;
  } /* if */
  
  G_DDJ.iSkip     = Id_CBox_iSkip.value;
  G_DDJ.chSep1    = Id_CBox_chSep1.value;
  G_DDJ.chSep2    = Id_CBox_chSep2.value;
  G_DDJ.fReadOnly = Id_CBox_fReadOnly.checked;
  G_DDJ.fAlgCSV1  = Id_CBox_fAlgCSV1.checked;
  G_DDJ.fAutoExec = Id_CBox_fAutoExec.checked;
  
  G_DDJ.szEnc     = Id_Inp_Enc.value; 
  G_DDJ.fLnNum    = Id_CBox_fLnNum.checked;            
  G_DDJ.fTag      = Id_CBox_fTag.checked;            
  G_DDJ.fEmbed    = Id_CBox_fEmbed.checked;
  G_DDJ.fszFldNm_1 = Id_CBox_fLine1.checked;
  
  G_DDJ.WwFlag0 = $DDJ.F_WwFlag_Mp_DDJ(G_DDJ);
  G_DDJ.WwFlag0 |= C_WwFlag_fDisplay; // 21/01/2026
  
  $InpData.U_Load(G_DDJ);
  $Pers.U_Write_JSON_LocalStorage(true, "G_DDJ", G_DDJ); 
} /* U_Confirm */

/*-----U_ChgSource --------------------------------------------------------
*
* Source has changed.
*/ 
function U_ChgSource(P_JSource)
{   
  Id_Div_Loaded.hidden = true;    
  Id_Div_File.hidden = true;    
  Id_Div_File_DDJ.hidden = true;    
  Id_Div_Local.hidden = true;   
  Id_Div_Session.hidden = true; 
  Id_Div_URL.hidden = true;     
  Id_Div_Var.hidden = true;     
  Id_Div_Function.hidden = true;     
  Id_Div_TextArea.hidden = true;    
  Id_Div_Calendar.hidden = true;  
  Id_Div_Dupli.hidden = true;
  
  Id_Span_fEmbed.hidden = false;
  Id_Span_fReadOnly.hidden = false;
  Id_Span_fMng_Undef.hidden = false;
  Id_Span_fLine1.hidden = true;
  Id_Span_Panel.hidden = true;  
  Id_Div_Opt_File.hidden = true;
  Id_Div_Clone.hidden = true;
  Id_Div_Param.hidden = false;
  Id_Div_Kind.hidden = false;

  Id_Div_CSV.hidden = true;
  Id_Div_OLS.hidden = true;

  switch (P_JSource) {
    case "Loaded" : {
         Id_Div_Loaded.hidden = false;
         Id_Div_Param.hidden = true;
         Id_Span_fEmbed.hidden = true;
          Id_Div_Kind.hidden = true;
         var UsrView0 = CL_UsrView0.F_UsrView_Selected();
         var szNmColl = F_Get_szNmColl();
         if (!szNmColl) {
             szNmColl = UsrView0.szNmColl;
         } /* if */
         document.getElementById("Id_Inp_szNmColl_1").value = szNmColl;
    } break; 
    case "New": {
          Id_Span_fReadOnly.hidden = true;
          Id_CBox_fReadOnly.checked = false;
          Id_Span_fMng_Undef.hidden = true;
          Id_Span_fEmbed.hidden = true;
          Id_Div_Kind.hidden = true;

          var szNmColl = F_Get_szNmColl();
          var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(szNmColl, true);
          var sz_aFld  = UsrView1.XDB0.szNm_aFld;
          var szHTML_aOpt_aFld = CL_UsrView0.F_szHTML_aOpt_aFld(sz_aFld);

          var szHTML_aOpt_aFld = CL_UsrView0.F_szHTML_aOpt_aFld("New_Layout");
          document.getElementById("Id_szNm_aFld").innerHTML = szHTML_aOpt_aFld;
          Id_JKndTup0.value = C_JKndTup_aRcd;        
    } break;
    case "File": {
          Id_Div_File.hidden = false;         
          Id_Div_Opt_File.hidden = false;
          Id_Span_fLine1.hidden = false;
    } break;
    case "File DDJ": {
          Id_Div_File_DDJ.hidden = false;
          Id_Span_fLine1.hidden = false;
          Id_Span_fEmbed.hidden = true;
    } break;
    case "Local": {
          Id_Div_Local.hidden = false;
          Id_Span_fEmbed.hidden = true;
    } break;
    case "Session": {
          Id_Div_Session.hidden = false;
          Id_Span_fEmbed.hidden = true;
    } break;
    case "URL": {
          Id_Div_URL.hidden = false;         
          Id_Div_Opt_File.hidden = false;
          Id_Span_fLine1.hidden = false;
          Id_Inp_URL.value = G_szURL;
    } break;
    case "Var": {       /* Global Variables */
          Id_Div_Var.hidden = false;
          Id_Span_fMng_Undef.hidden = true;
          Id_Span_fEmbed.hidden = true;
          Id_Div_Kind.hidden = true;
          document.getElementById("Id_JKndTup0").value = C_JKndTup_Null;
          var szHTML_aOpt_aFld = CL_UsrView0.F_szHTML_aOpt_aFld("", true);      /* AutoDetect */
          document.getElementById("Id_szNm_aFld").innerHTML = szHTML_aOpt_aFld;
    } break;
    case "TextArea": {
          Id_Div_TextArea.hidden = false;
          Id_Span_fEmbed.hidden = false;
          Id_Span_fLine1.hidden = false;
          Id_Span_fReadOnly.hidden = true;
          Id_Span_fMng_Undef.hidden = true;
          Id_Div_Kind.hidden = true;
          Id_Inp_szNmColl_2.value = "user_entered";        
          document.getElementById("Id_JKndTup0").value = C_JKndTup_aRcd;
          Id_Div_TextArea_Val.value = G_szTextArea;
    } break;
    case "Function": {
          Id_Div_Function.hidden = false;
          Id_Span_fReadOnly.hidden = true;
          Id_Span_fMng_Undef.hidden = true;
          Id_Div_Kind.hidden = true;
          Id_Inp_szNmColl_2.value = "function";
          Id_Span_fEmbed.hidden = true;
         
          document.getElementById("Id_JKndTup0").value = C_JKndTup_aRcd;
          var szHTML_aOpt_aFld = CL_UsrView0.F_szHTML_aOpt_aFld("aFld_Func");
          document.getElementById("Id_szNm_aFld").innerHTML = szHTML_aOpt_aFld; 
    } break;   
    case "Calendar": {
          Id_Div_Calendar.hidden = false;
          Id_Span_fEmbed.hidden = true;
          Id_Span_fLine1.hidden = true;
          Id_Span_fReadOnly.hidden = true;
          Id_Span_fMng_Undef.hidden = true;
          Id_Div_Kind.hidden = true;
          Id_Inp_szNmColl_2.value = "Calendar";        
          document.getElementById("Id_JKndTup0").value = C_JKndTup_aRcd;
    } break;     
    case "Dupli": {
          Id_Div_Dupli.hidden = false;
          Id_Span_fEmbed.hidden = true;
          Id_Span_fLine1.hidden = true;
          Id_Span_fReadOnly.hidden = true;
          Id_Span_fMng_Undef.hidden = true;
          Id_Div_Kind.hidden = true;
          Id_Div_Clone.hidden = false;
          Id_Inp_szNmColl_2.value = "Dupli";        
          document.getElementById("Id_JKndTup0").value = C_JKndTup_aRcd;
    } break;   
    default : {
    } break;
  } /* switch */   
} /* U_ChgSource */

/*-----U_New_aFld --------------------------------------------------------
*
*/ 
function U_New_aFld()
{
  var szHTML_aOpt_aFld = CL_UsrView0.F_szHTML_aOpt_aFld("aFld_aFld");
  document.getElementById("Id_szNm_aFld").innerHTML = szHTML_aOpt_aFld;
  Id_JKndTup0.value = C_JKndTup_aObj;
} /* U_New_aFld */

/*-----U_Upd_Kind --------------------------------------------------------
*
*/ 
function U_Upd_Kind(P_JKndTup)
{
  var szExt = "";
  P_JKndTup = +P_JKndTup;
  
  switch (P_JKndTup) {
    case C_JKndTup_OLS: {
         szExt = "ols";
    } break;
    case C_JKndTup_CSV: {
         szExt = "csv";
    } break;
    case C_JKndTup_FLR: {
         szExt = "flr";
    } break;
    default : {
          Id_Div_OLS.hidden = true;
          Id_Div_CSV.hidden = true;
//          Id_Span_fLine1.hidden = true;
          Id_CBox_fLine1.checked = false; 
    } break;
  } /* switch */
  if ((C_JKndTup_Arr <= P_JKndTup) && (P_JKndTup <= C_JKndTup_asObj)) {
     Id_Span_fEmbed.hidden = false;
  }
  else {
     Id_Span_fEmbed.hidden = true;
     Id_CBox_fEmbed.checked = false;
  } /* if */

  if (szExt == "ols") {
     Id_Div_OLS.hidden = false;
  } /* if */
  if ((szExt == "arcd") || (szExt == "asrcd")) {            
     Id_Span_fLine1.hidden = false;
  } /* if */
  if ((szExt == "csv") || (szExt == "tsv")) {
     Id_Div_CSV.hidden = false;
     Id_Span_fLine1.hidden = false;
  } /* if */
  if (szExt == "flr") {
     Id_Span_fLine1.hidden = false;
     Id_CBox_fLine1.checked = true; 
  } /* if */
  
  if (P_JKndTup == C_JKndTup_Null) {
     /* C_JKndTup NON standard. Check for custom support. */
     if ($Custom.U_UsrDef_Ext) {
        $Custom.U_UsrDef_Ext();
     } /* if */
  } /* if */
} /* U_Upd_Kind */

/*-----U_Upd_szNmColl --------------------------------------------------------
*
* Used in G_szHTML_DBox_InpData HTML code.
* 
* Strip "fakepath" to get filename so that it can be used as data structure name.
* "C:\fakepath\csv.txt" ==> "csv"
*/ 
function U_Upd_szNmColl(P_szStruct, P_szSource)
{
  var szFlNm = P_szStruct;
//  var iDotPos = szFlNm.lastIndexOf(".");
  var szStruct = "?";
  var JKndTup0;
  var szExt = F_szExt_Mp_szFlNm(szFlNm);
  var iPos;

  Id_Div_CSV.hidden = true;
  Id_Div_OLS.hidden = true;
  
          Id_JKndTup0.value = $FileMan.F_JKndTup_Mp_szFlNm(P_szStruct);  // 26/09/2025

  switch (P_szSource) {
    case "Local" : {
       ALERT("LOCAL", 1);
//          Id_CBox_fReadOnly.checked = G_DDJ.fReadOnly;    
    } break;    
    case "File DDJ": {
          if (szFlNm.indexOf("http://") >= 0) {
             $Error.U_Error(C_jCd_Cur, 2, "Was expected a PATH not an URL.", szFlNm, false);
          } /* if */
          Id_Inp_szNmColl_2.value = szFlNm;
          //Id_JKndTup0.value = $FileMan.F_JKndTup_Mp_szFlNm(P_szStruct);
    } break; 
    case "File": {         
          var iSlashPos = szFlNm.lastIndexOf("\\") +1;
          szStruct = szFlNm.substring(iSlashPos);
          Id_Inp_szNmColl_2.value = szStruct;
          //Id_JKndTup0.value = $FileMan.F_JKndTup_Mp_szFlNm(P_szStruct);

          var szNm0 = "S_aFld_" + szStruct.substring(0,szStruct.indexOf("."));  /* Look for a Layout with the same name of the Collection */
          iPos = CL_UsrView0.F_iPos_aOpt_aFld(szNm0);
          
          JKndTup0 = $FileMan.F_JKndTup_Mp_szExt(szExt);          
          U_Upd_Kind(JKndTup0);
          
          if ((szExt != "xml") && (iPos > 0)) {
             Id_szNm_aFld.value = iPos +1;                                      /* Select the Layout with the same name. */
          } /* if */
    } break;
    case "URL" : {
          var iSlashPos = szFlNm.lastIndexOf("/") +1;
          var iDotPos = szFlNm.lastIndexOf(".");
          szStruct =  szFlNm.substring(iSlashPos,iDotPos);
          if (szStruct == "rpc_exec") {
             iPos = szFlNm.indexOf("szNmTab=");
             if (iPos >= 0) {
                iPos += "szNmTab=".length;
                szStruct = szFlNm.substr(iPos);
             } /* if */
             Id_Inp_szNmColl_2.value = szStruct;             
             Id_JKndTup0.value = C_JKndTup_aObj;
             JKndTup0 = C_JKndTup_aObj;
             Id_CBox_fEmbed.checked = true;
             Id_Span_fEmbed.hidden = false;             
             U_Upd_Kind(JKndTup0);
          }
          else {
              var iSlashPos = szFlNm.lastIndexOf("/") +1;
              Id_Inp_szNmColl_2.value = szFlNm.substr(iSlashPos);             
              //JKndTup0 = $FileMan.F_JKndTup_Mp_szFlNm(P_szStruct);
          } /* if */
          U_Upd_Kind(JKndTup0);    
          var szNm0 = "S_aFld_" + szStruct.substring(0,szStruct.indexOf("."));  /* Look for a Layout with the same name of the Collection */
          iPos = CL_UsrView0.F_iPos_aOpt_aFld(szNm0);
          if ((szExt != "xml") && (iPos > 0)) {
             Id_szNm_aFld.value = iPos +1;                                      /* Select the Layout with the same name. */
          } /* if */
    } break;
    default : {
          Id_Inp_szNmColl_2.value = P_szStruct;
          szStruct = P_szStruct;
          Id_CBox_fEmbed.checked = false;
          Id_CBox_fLine1.checked = false;
    } break;
  } /* switch */
  
  Id_Inp_szAS_1.value = szStruct[0].toUpperCase();
} /* U_Upd_szNmColl */

  return(_InpData);
})(); /* # END - G_DBox_InpData Object */

/*----- Module $InpData --------------------------------------------------------
*
*/ 
const $InpData = (function () {
  var _InpData = {};
  _InpData.init            = U_Init_InpData;     // function U_Init_InpData();
  _InpData.U_Load          = U_Load;
  _InpData.U_Reset_Sts     = U_Reset_Sts;        // function U_Reset_Sts();
  _InpData.U_FlMan_Exec    = U_FlMan_Exec;       // function U_FlMan_Exec(P_szURL_Cmd);
  
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_InpData;

/*----- Local Variables ----------------------------------------------*/

/*--------------------------------------------------------------------*/

/*-----U_Reset_Sts() --------------------------------------------------------
*
* Reset flags.
*/ 
function U_Reset_Sts()  
{
  G_DDJ.fDiagnostic = false;
  G_DDJ.fDistinct = false;
  G_DDJ.fTypeColor = false;
  G_DDJ.fRawData = false;
  G_DDJ.fLoadRes = false;
  G_DDJ.fCaseSens = true;
  G_DDJ.fTransp = false;
  G_DDJ.iSmpl_Step = 1;

  $VConfig.U_Set_ValSts("iSmpl_Step", 1);
  $Table.U_Display_Table();
  $DDJ.U_Done();  
} /* U_Reset_Sts() */

/*-----U_FlMan_Exec --------------------------------------------------------
*
*  Procedure that receives commands from FlMan and executes them.
*/ 
function U_FlMan_Exec(P_szURL_Cmd)
{
  var szTgt = "szTopic=";
  var iSizeTgt = szTgt.length;
  G_DDJ.szNmColl = P_szURL_Cmd.substr(P_szURL_Cmd.indexOf(szTgt) +iSizeTgt);
  G_DDJ.szNm_URL = P_szURL_Cmd;
  
  G_DDJ.fszFldNm_1 = false;
  
  G_DDJ.JKndTup0  = $FileMan.F_JKndTup_Mp_szFlNm(P_szURL_Cmd);
  G_DDJ.szNm_aFld = "AutoDetect";
  G_DDJ.aFld      = null;
  
  G_DDJ.fEmbed    = false;      // true;
  $LdFile.U_DownLoad_DDJ(G_DDJ);
} /* U_FlMan_Exec */

/*-----U_Load --------------------------------------------------------
*
* Load recovery point.
*/ 
function U_Load(R_DDJ)
{  
  try {
      U_Load0(R_DDJ);
  } catch (P_Err) {
      $Error.U_Catch(C_jCd_Cur, 3, P_Err);
  } /* try catch */
} /* U_Load */

/*-----U_Load0 --------------------------------------------------------
*
*/ 
function U_Load0(R_DDJ)
{
  var aColl_Empty = [null, [], {}, [], [], {}, {}, [], [], [], {}];             // C_JKndTup_as_   = 10
  var UsrView_Selected0 = CL_UsrView0.F_UsrView_Selected();
  var aFld1 =  UsrView_Selected0.aFld1;
  var UsrView0;
  var XDB0;
  var szNm_aFld
  var szNmColl;
  var szNm0;
  var Coll_Empty0;
  
  if ($DDJ.F_fOverride_RO()) {
     R_DDJ.fReadOnly = false;
  } /* if */
  
  R_DDJ.fTransp    = document.getElementById("Id_CBox_fTransp").checked;        /* Show the table in Transpose way (CR) */          
  R_DDJ.fKrypt     = document.getElementById("Id_CBox_fKrypt").checked;         /* Dekrypt data */          
  R_DDJ.fUnSort    = document.getElementById("Id_CBox_fUnSort").checked;
  R_DDJ.fEmbed     = document.getElementById("Id_CBox_fEmbed").checked;         /* Embed the string in [] or {} before JSON.parse() */
  R_DDJ.fszFldNm_1 = document.getElementById("Id_CBox_fLine1").checked;         /* Field names passed in the first line. */
  R_DDJ.fMng_Undef = document.getElementById("Id_CBox_fMng_Undef").checked;
           
  switch (R_DDJ.szSource) {
    case "New" : {
          var fNew_aFld = (R_DDJ.szNm_aFld == "New_Layout");  /* Is required the creation of a New Layout? */
  
          if (R_DDJ.szNmColl == "") {
             szNm0 = prompt("Please enter a valid name for the new data structure layout:", "New_aFld");
             U_Set_szNmColl0(szNm0); 
          } /* if */
          if (R_DDJ.JKndTup0 == C_JKndTup_Null) {
             $Error.U_Error(C_jCd_Cur, 4, "JKndTup0 is undefined", 0, false);
          } /* if */
          if (fNew_aFld) {
              R_DDJ.fNew_aFld = true;
              Coll_Empty0 = aColl_Empty[R_DDJ.JKndTup0];         
              $DDJ.U_DispColl([R_DDJ.szNmColl + "_aFld", C_JKndTup_aObj, Coll_Empty0, null, "aFld_aFld", "New", C_WwFlag_Null, C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null]]);
              setTimeout($DDJ.U_NewTup_DDJ, 100);                               /* Open automatically a Card in "New" mode. */
          }
          else {
              Coll_Empty0 = aColl_Empty[R_DDJ.JKndTup0];         
              $DDJ.U_DispColl([R_DDJ.szNmColl, R_DDJ.JKndTup0, Coll_Empty0, R_DDJ.aFld, R_DDJ.szNm_aFld, "New", C_WwFlag_Null, C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null]]); 
              setTimeout($DDJ.U_NewTup_DDJ, 100);                               /* Open automatically a Card in "New" mode. */
          } /* if */
    } break;
    case "File": {          
          /* Load Data from an external file. */
          R_DDJ.oFl_Ld  = document.getElementById("Id_Inp_File").files[0];      /* Object describing the structure that should be opened. */
          U_LoadFile(R_DDJ);
    } break;
    case "File DDJ" : {
          var szNmColl = R_DDJ.szNmColl.replaceAll("\\", "/");
          R_DDJ.szNm_URL = $NDU.F_szURL_Mp_Cmd_Res("localhost", "read", szNmColl);
          $LcdLcd.U_Read(szNmColl, null, U_CB_Read_File_DDJ, null, R_DDJ);
    } break;
    case "Loaded" : {
          /* Data structure already loaded in memory. */
          var szNmColl = document.getElementById("Id_Inp_szNmColl_1").value;
          var jKndData = document.getElementById("Id_Inp_jKndData").value;
          U_Set_szNmColl0(szNmColl); 
          let UsrView0 = CL_UsrView0.F_UsrView_Select(szNmColl, (R_DDJ.fReadOnly | C_WwFlag_fSearchCS));

          switch (+jKndData) {
            case 0 : {   /* Show the Collection as a Table. */
                 $Table.U_Display_Table();
            } break;
            case 1: {    /* Show XDB-Collection Layout (XDB0.aFld0) */
                  UsrView0 = CL_UsrView0.F_UsrView_Selected();
                  XDB0 = UsrView0.XDB0;
                  szNm_aFld = XDB0.szNm_aFld;            
                  $DDJ.U_DispColl(["XDB0 " + szNm_aFld, C_JKndTup_aObj, XDB0.aFld0, null, "aFld_aFld", "Layout", (C_WwFlag_fReadOnly | C_WwFlag_fOverWrite | C_WwFlag_fDisplay | C_WwFlag_fLayout), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null, "Layout"]]);
            } break;
            case 2: {    /* Show UsrView-Layout (UsrView0.aFld1) */
/*
* $NOTE: this option offers the possibility to modify the Collection Layout adding/deleting fields.
*/
                  UsrView0 = CL_UsrView0.F_UsrView_Selected();
                  XDB0 = UsrView0.XDB0;
                  szNm_aFld = XDB0.szNm_aFld;
                  for (let i = 0; i < UsrView0.aFld1.length; i++) {
                      UsrView0.aFld1[i].fRecalc = false;
                  } /* for */

                  $MeF.U_Set_UsrView_Lft(UsrView0);
                  /* $NOTE: is required aFld_aFld1. */          
                  $DDJ.U_DispColl(["UsrView0" + szNm_aFld, C_JKndTup_aObj, UsrView0.aFld1, null, "aFld_aFld1", "Layout", (R_DDJ.fReadOnly | C_WwFlag_fOverWrite | C_WwFlag_fDisplay | C_WwFlag_fLayout), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null, "Layout"]]);                  
            } break;
            case 3: {    /* Show Collection XDB0 */
                  UsrView0 = CL_UsrView0.F_UsrView_Selected();
                  XDB0 = UsrView0.XDB0;
                  szNmColl = "XDB0";          
                  $DDJ.U_DispColl(["XDB0", C_JKndTup_Obj, XDB0, null, "aFld_XDB0", "XDB Collection's descriptor", (C_WwFlag_fReadOnly | C_WwFlag_fDisplay | C_WwFlag_fOverWrite), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null, "Obj"]]);
//                  $DDJ.U_DispColl(["XDB0", C_JKndTup_Obj, XDB0, null, "AutoDetect", "XDB Collection's descriptor", (C_WwFlag_fReadOnly | C_WwFlag_fDisplay | C_WwFlag_fOverWrite), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null, "Obj"]]);
            } break;
            case 4: {    /* Show UsrView0 */
                  szNmColl = "UsrView0";         
                  $DDJ.U_DispColl(["UsrView0", C_JKndTup_Obj, UsrView0, null, "aFld_UsrView", "UsrView Collection's descriptor", (C_WwFlag_fReadOnly | C_WwFlag_fDisplay | C_WwFlag_fOverWrite), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null, "Obj"]]);
//                  $DDJ.U_DispColl(["UsrView0", C_JKndTup_Obj, UsrView0, null, "AutoDetect", "UsrView Collection's descriptor", (C_WwFlag_fReadOnly | C_WwFlag_fDisplay | C_WwFlag_fOverWrite), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null, "Obj"]]);
            } break;
            default : {
            } break;
          } /* switch */

    } break;
    case "Local" : {
          /* Load Data from LocalStorage */
          R_DDJ.szNm_Local = Id_Inp_Local.value;
          U_Read_Storage(true, R_DDJ);  
    } break;
    case "Session" : {
          /* Load Data from SessionStorage */
          R_DDJ.szNm_Session = Id_Inp_Session.value;
          U_Read_Storage(false, R_DDJ);  
    } break;
    case "URL" : {
          /* Load Data from Server */
          R_DDJ.szNm_URL = Id_Inp_URL.value;          
          G_szURL = Id_Inp_URL.value;
          R_DDJ.fszFldNm_1  = document.getElementById("Id_CBox_fLine1").checked; /* Field names passed in the first line. */;
          $LdFile.U_DownLoad_DDJ(R_DDJ);
    } break;
    case "Var" : {
          /* Load Data stored in a Global program variable */
          R_DDJ.szNm_Var = Id_Inp_Var.value;
          if (R_DDJ.szNm_Var == "other") {
             R_DDJ.szNm_Var = R_DDJ.szNmColl;
          }
          else {
             R_DDJ.JKndTup0  = C_JKndTup_Obj;
             R_DDJ.aFld      = null;
          } /* if */
          U_Load_Var(R_DDJ);
          CL_UsrView0.F_UsrView_Select(R_DDJ.szNmColl, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
    } break;
    case "Function" : {
          if (R_DDJ.szNmColl == "") {
             szNm0 = prompt("Please enter a valid name for the new data structure layout:", "New_aFld");
             U_Set_szNmColl0(szNm0); 
          } /* if */
          if (R_DDJ.JKndTup0 == C_JKndTup_Null) {
             $Error.U_Error(C_jCd_Cur, 5, "JKndTup0 is undefined", 0, false);
          } /* if */
          Coll_Empty0 = aColl_Empty[R_DDJ.JKndTup0];
                  
          new CL_XDB([R_DDJ.szNmColl, R_DDJ.JKndTup0, Coll_Empty0, R_DDJ.aFld, R_DDJ.szNm_aFld, "Function", C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]);
          UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView(R_DDJ.szNmColl, true);
          $InpData.iMin   = +Id_Div_Function_iMin.value;
          $InpData.iMax   = +Id_Div_Function_iMax.value; 
          $InpData.iStep  = +Id_Div_Function_iStep.value; 
          $InpData.szFormulaY = Id_Div_Function_FormulaY.value;
          $Math_DDJ.F_Coll0_Formula(UsrView0, $InpData.szFormulaY, $InpData.iMin, $InpData.iMax, $InpData.iStep);
          
          UsrView0.aNdx = UsrView0.F_aNdx_Make(UsrView0, -1);
          var XDB0 = UsrView0.XDB0;
          CL_UsrView0.F_UsrView_Select(R_DDJ.szNmColl, (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
    } break;
    case "TextArea" : {
          U_TextArea(R_DDJ);
    } break;
    case "Calendar" : {
          U_Calendar(R_DDJ);
    } break;
    case "Dupli" : {
          U_Dupli(R_DDJ);
    } break;
    default : {
    } break;
  } /* switch */
} /* U_Load0 */

/*-----U_CB_Read_File_DDJ --------------------------------------------------------
*
*/ 
function U_CB_Read_File_DDJ(P_szTxt, R_DDJ)
{
  var iPos404 = P_szTxt.indexOf("404 File not Found");
  if ((0 <= iPos404) && (iPos404 < 10)) {
     $Error.U_Error(C_jCd_Cur, 6, "404 File not Found", R_DDJ.szNmColl, true, false);
     return;
  } /* if */

  $LdFile.U_Make_Coll(R_DDJ, P_szTxt);  
} /* U_CB_Read_File_DDJ */

/*-----U_LoadFile --------------------------------------------------------
*
* Load data from external File.
* 
* $NOTE:
* For security reasons JavaScript file loading requires user's Authorization.
*/ 
function U_LoadFile(R_DDJ)
{
  var WwFlag0 = $DDJ.F_WwFlag_Mp_DDJ(R_DDJ);
  R_DDJ.WwFlag0 = WwFlag0;

  switch (R_DDJ.JKndTup0) {
    case C_JKndTup_Blob: {
           $LdFile.U_RdBlob(R_DDJ, WwFlag0);    /* Use readAsArrayBuffer */
//         $NatLang.U_RdBlob(R_DDJ);
    } break;
    case C_JKndTup_DBF: {
           $LdFile.U_RdDBF(R_DDJ, WwFlag0);     /* Use readAsArrayBuffer */
    } break;
    default : {
          if (R_DDJ.fKrypt) {
             $LdFile.U_RdKrypt(R_DDJ, WwFlag0); /* Use readAsText */
          }
          else {
             $LdFile.U_RdText(R_DDJ, WwFlag0);  /* Use readAsText */
          } /* if */
    } break;
  } /* switch */
} /* U_LoadFile */

/*-----U_Read_Storage --------------------------------------------------------
*
* Read data from localStorage/sessionStorage
*/ 
function U_Read_Storage(P_fLocal, R_DDJ)
{
  var szNm;
  var szTxt;
  var szStorage;
  
  if (P_fLocal) {
     szNm = R_DDJ.szNm_Local;
     szTxt = localStorage.getItem(szNm);
     szStorage = "Local Storage";
  }
  else {
     szNm = R_DDJ.szNm_Session;
     szTxt = sessionStorage.getItem(szNm);
     szStorage = "Session Storage";
  } /* if */
  if (!szTxt) {
     $Error.U_Error(C_jCd_Cur, 7, "Collection unknown", szNm, false);
  } /* if */

  var Coll0 = $LdFile.F_Coll_Mp_JSON(szTxt, R_DDJ.JKndTup0, false, R_DDJ);

  $DDJ.U_DispColl([R_DDJ.szNmColl, R_DDJ.JKndTup0, Coll0, R_DDJ.aFld, R_DDJ.szNm_aFld, szStorage, (C_WwFlag_fReadOnly | C_WwFlag_fOverWrite), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null]]); 
} /* U_Read_Storage */

/*-----U_Load_Var --------------------------------------------------------
*
* Display the contents of the selected global variabale if exists.
*/
function U_Load_Var(R_DDJ)
{
  var szNm = R_DDJ.szNm_Var;
  var Tup0;
  
  try {
       eval("Tup0 = " + szNm + ";");
  } catch (P_Err) {
       $Error.U_Error(C_jCd_Cur, 8, "Unknown global variable: " + szNm, P_Err.message, false);
  } /* try catch */
  
  $DDJ.U_DispColl([szNm, R_DDJ.JKndTup0, Tup0, R_DDJ.aFld, R_DDJ.szNm_aFld, "Global Var", (C_WwFlag_fReadOnly | C_WwFlag_fOverWrite), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null]]);  
} /* U_Load_Var */

/*-----U_TextArea --------------------------------------------------------
*
*/ 
function U_TextArea(R_DDJ)
{

  /* Load Data from TextArea */
  if (R_DDJ.szNmColl == "") {
     var szNm0 = prompt("Please enter a valid name for the new data structure layout:", "New_aFld");
     U_Set_szNmColl0(szNm0); 
  } /* if */
  if (R_DDJ.JKndTup0 == C_JKndTup_Null) {
     $Error.U_Error(C_jCd_Cur, 9, "JKndTup0 is undefined", 0, false);
  } /* if */

  G_szTextArea = Id_Div_TextArea_Val.value;

  var Coll0 = $LdFile.F_Coll_Mp_Text(R_DDJ, G_szTextArea);
  R_DDJ.fszFldNm_1 = document.getElementById("Id_CBox_fLine1").checked;         /* Field names passed in the first line. */
  if (R_DDJ.JKndTup0 == C_JKndTup_Text) {
     R_DDJ.JKndTup0 = C_JKndTup_aRcd;
  } /* if */        
  $DDJ.U_DispColl([R_DDJ.szNmColl, R_DDJ.JKndTup0, Coll0, R_DDJ.aFld, R_DDJ.szNm_aFld, "TextArea", (R_DDJ.WwFlag0 | C_WwFlag_fReadOnly | C_WwFlag_fOverWrite), C_jCd_Cur, [R_DDJ.szNm_URL, C_jPg_0, R_DDJ.szAS, null, null]]); 
} /* U_TextArea */

/*-----U_Calendar --------------------------------------------------------
*
*/ 
function U_Calendar(R_DDJ)
{
  var Init_Year  = Id_Init_Year.value;
  var Init_Month = Id_Init_Month.value;
  var Init_Day   = Id_Init_Day.value;
  var End_Year   = Id_End_Year.value;
  var End_Month  = Id_End_Month.value;
  var End_Day    = Id_End_Day.value;
  
  var Date_Init = $TimeDate.F_Date_Make(Init_Year, Init_Month, Init_Day);
  var Date_End  = $TimeDate.F_Date_Make(End_Year, End_Month, End_Day);
  
  var aRcdDay = $Calendar.F_aRcdDay(Date_Init, Date_End); 
  new CL_XDB(["Calendar_YMD", C_JKndTup_aRcd, aRcdDay,  G_aFld_RcdDay, "aFld_RcdDay", "User's Calendar", (C_WwFlag_fOverWrite | C_WwFlag_fDisplay), C_jCd_Cur, C_Bag_UsrView_Dflt]);
} /* U_Calendar */

/*-----U_Dupli --------------------------------------------------------
*
* Select an alternative Layout and possibly clone the current collection.
*/ 
function U_Dupli(R_DDJ)
{
  debugger;
  var szNm_aFld = R_DDJ.szNm_aFld;
  var fClone = Id_CBox_fClone.checked;

  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var Coll0 = (fClone)? F_Obj_Clone(XDB0.Coll0): XDB0.Coll0;

  new CL_XDB([R_DDJ.szNmColl, XDB0.JKndTup0, XDB0.Coll0, null, szNm_aFld, "Vista Alternativa.", (C_WwFlag_fDisplay | C_WwFlag_fOverWrite), C_jCd_Cur, C_Bag_UsrView_Dflt]);
} /* U_Dupli */

/*-----U_OpenWin --------------------------------------------------------
*
*/ 
function U_OpenWin(P_szURL)
{

} /* U_OpenWin */

/*-----U_Init_InpData --------------------------------------------------------
*
*/ 
function U_Init_InpData()
{
  U_Root0("$InpData", C_jCd_Cur);
  
  G_DDJ = $DDJ.F_DDJ_Default();    // 09/08/2025
} /* U_Init_InpData */

  return(_InpData);
})();  /* InpData */

/*-----U_Set_szNmColl0 --------------------------------------------------------
*
*/ 
function U_Set_szNmColl0(P_szNmColl)
{
  G_DDJ.szNmColl = P_szNmColl;
} /* U_Set_szNmColl0 */

/*-----F_Get_szNmColl --------------------------------------------------------
*
*/ 
function F_Get_szNmColl()
{
  return(G_DDJ.szNmColl);
} /* F_Get_szNmColl */
