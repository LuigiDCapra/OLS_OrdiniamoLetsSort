/*-- ---------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : plot.js
* Function    : Plot data.
* FirstEdit   : 07/12/2019
* LastEdit    : 31/03/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2025
* System      : HTML-5 + CSS3 + JavaScript
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
--------------------------------------------------------------------------
*
*
*/
"use strict";

/* # ---- Object Plot --------------------------------------------------------
*
*/ 
const $Plot = (function(){
  var _Plot = {};
  _Plot.U_Init    = U_Init;        // function U_Init();
  _Plot.U_Plot    = U_Plot;        // function U_Plot(P_JKndTup0, P_aRcd, P_aFld)
    
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Plot;
const C_iNn_PlotMax = 8;

/*----- Local Variables ----------------------------------------------*/

var S_Bag_Plot = {
  iWdt: screen.width,
  iHgt:360, // (screen.height /2),
  fSigned:false,
  fNdx:false,
  xMax:"100",
  yMax:"800",
  iCoef:"1",
  iWdtStroke:"1",
  szClrCond1:"#ffff00",
  szClrCond2:"#808080",   
} /* S_Bag_Plot */

var S_aPlot = [
{
  jY: 0,
  fFill:false,
  szClrStroke:"#ff0000",
  szClrFill:"#ff0000",   
},
{
  jY: 1,
  fFill:false,
  szClrStroke:"#00ff00",
  szClrFill:"#00ff00",  
},
{
  jY: 2,
  fFill:false,
  szClrStroke:"#0000ff",
  szClrFill:"#0000ff",  
},
 {
  jY: 3,
  fFill:false,
  szClrStroke:"#ff8844",
  szClrFill:"#ff8844",  
},
{
  jY: 4,
  fFill:false,
  szClrStroke:"#ffff00",
  szClrFill:"#ffff00",  
},
{
  jY: 5,
  fFill:false,
  szClrStroke:"#ff00ff",
  szClrFill:"#ff00ff",  
},
{
  jY: 6,
  fFill:false,
  szClrStroke:"#00ffff",
  szClrFill:"#00ffff",  
},
{
  jY: 7,
  fFill:false,
  szClrStroke:"#888888",
  szClrFill:"#888888",  
},
{
  jY: 8,
  fFill:false,
  szClrStroke:"#888888",
  szClrFill:"#888888",  
}
];

var S_szChart = "line";

/*--------------------------------------------------------------------*/

/*
*  Plot selection.
*/
var S_szHTML_DBox_Plot = `
Chart Type: <select id="Id_Draw_Type_Sel" size="1" title="Chart Type">
  <option value="line">line</option>
  <option value="bar">bar</option>
  <option value="scattered">scattered</option>
  <option value="area">area</option>
  <!--option value="clear">clear plot</option -->
<!--
  <option value="pie">pie</option>
  <option value="doughnut"> doughnut</option>
  <option value="polarArea"> polarArea</option>
  <option value="bubble"> bubble</option>
--> 
</select>
</fieldset>
<fieldset> <legend>Plot values <span id="Id_Sorted">&nbsp</span></legend><br>
<div id="Id_Div_PnlDraw_0"> Window &nbsp;&nbsp; 
Width:   <input id="Id_Draw_SVG_width"   type="number" min="1", max="1920"  class="Cl_In_6ch">&nbsp;&nbsp;
Height:  <input id="Id_Draw_SVG_height"  type="number" min="1", max="1080"  class="Cl_In_6ch"><br>
<br>ViewPort &nbsp;&nbsp;
xMax:    <input id="Id_Draw_Dwg1_xMax"   type="number" title="iCard" class="Cl_In_6ch">&nbsp;&nbsp;
yMax:    <input id="Id_Draw_Dwg1_yMax"   type="number" title="yMax"  class="Cl_In_6ch">&nbsp;&nbsp;
iCoef:   <input id="Id_Draw_Dwg1_iCoef"  type="number" title="iCoef" class="Cl_In_6ch">&nbsp;&nbsp;<br><br>
fSigned: <input id="Id_Draw_Dwg1_fSigned" type="checkbox">
fGrid:   <input id="Id_Draw_Dwg_fGrid"   type="checkbox">
fTags:   <input id="Id_Draw_Dwg_fTags"   type="checkbox">
fTransp: <input id="Id_Draw_Dwg_fTransp" type="checkbox">
fNdx:    <input id="Id_Draw_Dwg_fNdx"    type="checkbox" onchange="U_Ndx_Change(Id_Draw_Dwg_fNdx.checked)">
Stroke:  <input id="Id_Draw_Dwg_iWdtStroke" type="number" min="0", max="100" step="0.2" class="Cl_In_6ch">
<br><br>
 
0)
<select id="Id_Draw_Dwg0_Sel" size="1" title="Field selected"></select>
<input id="Id_Draw_Dwg0_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg0_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg0_fill"   type="color"  title="Filling color">
<br>
1)
<select id="Id_Draw_Dwg1_Sel" size="1" title="Field selected"></select>
<input id="Id_Draw_Dwg1_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg1_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg1_fill"   type="color"  title="Filling color">
<br>
2)
<select id="Id_Draw_Dwg2_Sel" size="1" title="Field selected"></select>
<input id="Id_Draw_Dwg2_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg2_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg2_fill"   type="color"  title="Filling color">
<br>
3)
<select id="Id_Draw_Dwg3_Sel" size="1" title="Field selected"></select>
<input id="Id_Draw_Dwg3_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg3_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg3_fill"   type="color"  title="Filling color">
<br>
4)
<select id="Id_Draw_Dwg4_Sel" size="1" title="Field selected"></select>

<input id="Id_Draw_Dwg4_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg4_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg4_fill"   type="color"  title="Filling color">
<br>
5)
<select id="Id_Draw_Dwg5_Sel" size="1" title="Field selected"></select>
<input id="Id_Draw_Dwg5_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg5_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg5_fill"   type="color"  title="Filling color">
<br>
6)
<select id="Id_Draw_Dwg6_Sel" size="1" title="Field selected"></select>
<input id="Id_Draw_Dwg6_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg6_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg6_fill"   type="color"  title="Filling color">
<br>
7)
<select id="Id_Draw_Dwg7_Sel" size="1" title="Field selected"></select>
<input id="Id_Draw_Dwg7_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg7_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg7_fill"   type="color"  title="Filling color">
<br>
8)
<select id="Id_Draw_Dwg8_Sel" size="1" title="Field selected"></select>
<input id="Id_Draw_Dwg8_stroke" type="color" title="line color">
<input id="Id_Draw_Dwg8_fFill"  type="checkbox"  title="Flag: Fill">
<input id="Id_Draw_Dwg8_fill"   type="color"  title="Filling color">
<br><br>

Cond1: <input id="Id_Draw_Cond1" type="color"> 
Cond2: <input id="Id_Draw_Cond2" type="color">
</div>
</fieldset>`;

var S_CB_Plot;
var S_iWdt;
var S_iHgt;
var S_iCoef = 1;
var S_iBias = 200;
var S_iNnPlot;

var S_xPrv = 0;                    /* Position of the last pixel plot */
var S_yPrv = 0;

var S_iCnt_SVG = 0;

/* # ---- Object G_DBox_Plot --------------------------------------------------------
*
* Plot the selected column.
*/ 
var G_DBox_Plot = (function(){
  var _oPlot = {};
  _oPlot.U_Open     = U_Open;      // function U_Open(P_Id);
  _oPlot.U_Cancel   = U_Close;     // function U_Close(P_Id);
  _oPlot.U_Confirm  = U_Confirm;   // function U_Confirm(P_Id); 

  var S_xCol_Prv = 0;
  var S_yRow_Prv = 0;

/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Id)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  var iCard0 = XDB0.Coll0.length;
  
  var szHTML_Option = "";
  var szNm;
  var szSelected;
  var szKey = UsrView0.F_szKey_Sort();
  
  S_Bag_Plot.xMax = iCard0;
  
  Id_Draw_Type_Sel.value     = S_szChart;
  Id_Sorted.innerHTML        = (szKey)? "sorted by: <b>" + szKey + "</b>": "unsorted"; 
  
  Id_Draw_SVG_width.value    = S_Bag_Plot.iWdt;
  Id_Draw_SVG_height.value   = S_Bag_Plot.iHgt;
  Id_Draw_Dwg_fGrid.checked  = S_Bag_Plot.fGrid;
  Id_Draw_Dwg_fTags.checked  = S_Bag_Plot.fTags;
  Id_Draw_Dwg_fNdx.checked   = S_Bag_Plot.fNdx;
  Id_Draw_Dwg_iWdtStroke.value = S_Bag_Plot.iWdtStroke;
  
  Id_Draw_Cond1.value        = S_Bag_Plot.szClrCond1;
  Id_Draw_Cond2.value        = S_Bag_Plot.szClrCond2;

  Id_Draw_Dwg1_xMax.value    = S_Bag_Plot.xMax;
  Id_Draw_Dwg1_yMax.value    = S_Bag_Plot.yMax;
  Id_Draw_Dwg1_iCoef.value   = S_Bag_Plot.iCoef;

  Id_Draw_Dwg1_fSigned.checked  = S_Bag_Plot.fSigned;
  
  S_iNnPlot = (aFld.length < C_iNn_PlotMax)? aFld.length: C_iNn_PlotMax; 
  
  for (let j = 0; j < S_iNnPlot; j++) {
      if (S_aPlot[j].jY >= 0) {
         szHTML_Option = F_szHTML_Option_Mp_aObj(aFld, "szNm", aFld[S_aPlot[j].jY].szNm, true, true);
      } /* if */
  } /* for */
  
  for (let j = 0; j < S_iNnPlot; j++) {
       if (S_aPlot[j].jY < 0) {
          break;
       } /* if */
      document.getElementById("Id_Draw_Dwg" + j + "_Sel").innerHTML = szHTML_Option;
      document.getElementById("Id_Draw_Dwg" + j + "_Sel").value = aFld[S_aPlot[j].jY].szNm;
      document.getElementById("Id_Draw_Dwg" + j + "_fFill").checked = S_aPlot[j].fFill;
      document.getElementById("Id_Draw_Dwg" + j + "_fill").value = S_aPlot[j].szClrFill;
      document.getElementById("Id_Draw_Dwg" + j + "_stroke").value = S_aPlot[j].szClrStroke;
  } /* for */

} /* U_Open */

/*-----U_Close --------------------------------------------------------
*
*/ 
function U_Close(P_Id)
{

} /* U_Close */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm(P_Id)
{
  /* # ---- U_MCrs_Cur -----------------------------------------------------
  *
  * Get the position of mouse pointer on the graphic selecting the corresponding record.
  */
  function U_MCrs_Cur(P_Event){
    SVG_pt.x = P_Event.clientX;
    SVG_pt.y = P_Event.clientY;
    var oMCrs = SVG_pt.matrixTransform(Elem_SVG.getScreenCTM().inverse());
    var xCol = oMCrs.x +1;                // +1 ???
    var yRow = S_Bag_Plot.yMax - oMCrs.y;

    var xDelta = xCol - S_xCol_Prv;
    var yDelta = yRow - S_yRow_Prv;
    S_xCol_Prv = xCol;
    S_yRow_Prv = yRow;
    
    Id_State.innerHTML = "Img(" + xCol + ", " + yRow + ") Delta:" + xDelta + ", " + yDelta;     // $BUG è sbagliato fare riferimento a Id_State
    U_ScrollTab(xCol);
  } /* # U_MCrs_Cur */
  
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var aFld = UsrView0.aFld1;
  var Fld0;
  
  S_Bag_Plot.iWdt = Id_Draw_SVG_width.value;
  S_Bag_Plot.iHgt = Id_Draw_SVG_height.value;
  
  S_Bag_Plot.xMax  = Id_Draw_Dwg1_xMax.value;
  S_Bag_Plot.yMax  = Id_Draw_Dwg1_yMax.value;
  S_Bag_Plot.iCoef = Id_Draw_Dwg1_iCoef.value;
  S_Bag_Plot.fSigned = Id_Draw_Dwg1_fSigned.checked;
  S_Bag_Plot.fNdx  = Id_Draw_Dwg_fNdx.checked;  

  S_Bag_Plot.fGrid = Id_Draw_Dwg_fGrid.checked;
  S_Bag_Plot.fTags = Id_Draw_Dwg_fTags.checked;
  S_Bag_Plot.iWdtStroke = Id_Draw_Dwg_iWdtStroke.value;
  
  S_iBias = (S_Bag_Plot.fSigned)? S_Bag_Plot.yMax / 2: 0;
  S_iCoef = S_Bag_Plot.iCoef;
  
  for (let j = 0; j < S_iNnPlot; j++) {
      Fld0 = F_Obj_Mp_Select("Id_Draw_Dwg" + j + "_Sel", aFld, "szNm");
      S_aPlot[j].jY = (Fld0)? Fld0.iPos0: -1;
   
      S_aPlot[j].fFill       = document.getElementById("Id_Draw_Dwg" + j + "_fFill").checked; 
      S_aPlot[j].szClrFill   = document.getElementById("Id_Draw_Dwg" + j + "_fill").value; 
      S_aPlot[j].szClrStroke = document.getElementById("Id_Draw_Dwg" + j + "_stroke").value; 
  } /* for */

  S_Bag_Plot.szClrCond1 = Id_Draw_Cond1.value;
  S_Bag_Plot.szClrCond2 = Id_Draw_Cond2.value;
      
  $Pers.U_Write_JSON_LocalStorage(true, "S_aPlot", S_aPlot);
  
  S_szChart = Id_Draw_Type_Sel.value;
  
  $OPrn.U_Clear_Elem("Id_Div00");
  $Plot.U_Plot(S_szChart);
  
  var Elem_SVG = document.querySelector('svg');
  var SVG_pt = Elem_SVG.createSVGPoint();             /* Create a SVG Point */
  
  Elem_SVG.addEventListener('click', function(P_Event) {
       var loc = U_MCrs_Cur(P_Event);
  }, false);  
} /* U_Confirm */

  return(_oPlot);
})(); /* # END - G_DBox_Plot Object */

/*-----U_Plot --------------------------------------------------------
*
*/ 
function U_Plot(P_szChart)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var Arr0, Arr1, Arr2;
  var iNN = S_iNnPlot;
  var iOff = 0;
  var fNdx = S_Bag_Plot.fNdx;

  $OPrn.U_Ins_Elem("Id_Div00");

  S_CB_Plot = U_CB_Path;  
  S_iWdt = +S_Bag_Plot.xMax;  
  S_iHgt = +S_Bag_Plot.yMax;
  
  for (let i = 1; i < S_iNnPlot; i++) {
      if (S_aPlot[i].jY <= 0) {
         iNN = i;
         break;
      } /* if */
  } /* for */
  /*$NOTA: partiamo da 1 perché si presume la colonna 0 corrisponda alle didascalie */            
  switch (P_szChart) {
    case "area":
    case "line": {
         U_Header_SVG(S_Bag_Plot.xMax, S_Bag_Plot.yMax);
         for (let i = 0; i < iNN; i++) {
             S_aPlot[i].fFill = (P_szChart == "area");
             Arr0 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[i].jY, fNdx);
             U_Polyline_SVG(0,0,"init", S_aPlot[i]);   
             U_Plot_PolyLine(Arr0);
             U_Polyline_SVG(0,0,"end", S_aPlot[i]); 
         } /* for */
         U_Axes();
    } break;
    case "bar": {
         S_Bag_Plot.xMax = screen.width;
         U_Header_SVG(S_Bag_Plot.xMax, S_Bag_Plot.yMax);
         S_iWdt = S_Bag_Plot.xMax;
         
         Arr0 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[1].jY, fNdx);
         var iCard0 = Arr0.length;
         var iWdt_Step = S_iWdt / iCard0;
         var iDeltaOff = iWdt_Step / iNN;
         var iWdt_Col  = iDeltaOff * 0.9;         

         for (let i = 1; i < iNN; i++) {
             Arr0 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[i].jY, fNdx);             
             U_Plot_Histog(Arr0, i * iDeltaOff, iWdt_Step, iWdt_Col, S_aPlot[i].szClrFill);
         } /* for */
         U_Axes();
    } break;
    case "scattered" : {
         S_Bag_Plot.xMax = screen.width;
         U_Header_SVG(S_Bag_Plot.xMax, S_Bag_Plot.yMax);
//          Arr0 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[1].jY, fNdx); 
//          Arr1 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[2].jY, fNdx);
//          Arr2 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[3].jY, fNdx);

         Arr0 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[0].jY, fNdx); 
         Arr1 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[1].jY, fNdx);
         Arr2 = UsrView0.F_Arr_Mp_Field(UsrView0, S_aPlot[2].jY, fNdx);
       
         U_Plot_scattered(Arr0, Arr1, "red");
         
         var ar = $Stat_DDJ.F_arMultiRegr(UsrView0.XDB0.Coll0);

//          var ar = $Stat_DDJ.F_arRegression(Arr0, Arr1, Arr2);
//         
//          var X0 = Arr0[0];         
//          var X1 = Arr0[Arr0.length -1];
//          var A = ar[0];
//          var B = ar[1]; 
//          var Y0 = (B * X0 + A); 
//          var Y1 = (B * X1 + A);
//          
//          U_Line_SVG(X0, F_yConv(Y0), X1, F_yConv(Y1), "blue", 2);
//          
//          var szTmp = `<text x="0" y="15" fill="red">a = ${ar[0]}, b = ${ar[1]}</text>`;
//          
//          $OPrn.U_Prn_Elem(szTmp, false);
//          U_Axes();
    } break;
//     case "clear" : {
//           $DDJ.U_Clear_Plot();
//     } break;
    default : {
    } break;
  } /* switch */

  if (S_Bag_Plot.fGrid) {
      var yStep = S_Bag_Plot.yMax / 16;
      var y = 0;
    
      for (var i = 0; i <= 16; i++) {
          U_Line_SVG(0, y, S_Bag_Plot.xMax, y, "blue", S_Bag_Plot.iWdtStroke);
          y += yStep;
      } /* for */
      
      var xStep = S_Bag_Plot.xMax / 16;
      var x = 0;    
      for (var i = 0; i <= 16; i++) {
          U_Line_SVG(x, 0, x, S_Bag_Plot.yMax, "blue", S_Bag_Plot.iWdtStroke);
          x += xStep;
      } /* for */
  } /* if */
  
  U_End_SVG();
  $OPrn.U_Upd_Elem("Id_Div00", false);
} /* U_Plot */

/*-----F_yConv --------------------------------------------------------
* 
*/ 
function F_yConv(P_y)
{
  var y0 = (S_iCoef * P_y + S_iBias)
  return(S_iHgt - y0);
} /* F_yConv */

/*-----U_Axes --------------------------------------------------------
*
*/ 
function U_Axes()
{
  var szTmp = "";
  if (S_Bag_Plot.fSigned) {
     szTmp += `<path id="Id_SVG_${S_iCnt_SVG++}" style="fill:none` + `; stroke:black; stroke-iWdt:2px" vector-effect="non-scaling-stroke"\nd="\n`;
     szTmp += `M ${S_Bag_Plot.xMax/2} 0\n`;
     szTmp += `V ${S_Bag_Plot.yMax}\n`;
     szTmp += `M 0 ${S_Bag_Plot.yMax/2}\n`;
     szTmp += `H ${S_Bag_Plot.xMax}\n`;
     szTmp += '" />\n';  
  }
  else {
     szTmp += `<path id="Id_SVG_${S_iCnt_SVG++}" style="fill:none` + `; stroke:black; stroke-iWdt:2px" vector-effect="non-scaling-stroke"\nd="\n`;
     szTmp += `M 0 0\n`;
     szTmp += `V ${S_Bag_Plot.yMax}\n`;
     szTmp += `H ${S_Bag_Plot.xMax}\n`;
     szTmp += '" />\n';  
  } /* if */     

  $OPrn.U_Prn_Elem(szTmp, false); 
} /* U_Axes */
 
/*-----U_Plot_PolyLine --------------------------------------------------------
*
* Generate the polyline corresponding to the given array (P_Arr).
*/
function U_Plot_PolyLine(P_Arr) {
  var iCard0 = P_Arr.length;
  var x, y;
  
  for (var j = 0; j < iCard0; j++) {
      x = j;
      y = P_Arr[j];
      U_Polyline_SVG(x, y); 
  } /* for */
} /* U_Plot_PolyLine */

/*-----U_Plot_Histog --------------------------------------------------------
*
* Generate the histogram corresponding to the given array (P_Arr).
*
*/
function U_Plot_Histog(P_Arr, P_iOff, P_iStep, P_iWdt_Col, P_Clr) {
  var iCard0 = P_Arr.length;
  var x, y;

  var szOther = `style="fill:${P_Clr};stroke-width:3;stroke:rgb(0,0,0)"`;
  
  for (var j = 0; j < iCard0; j++) {
      x = (j * P_iStep) + P_iOff;
      y = P_Arr[j];
      U_Hist_SVG(x, y, P_iWdt_Col, y, szOther); 
  } /* for */
} /* U_Plot_Histog */

/*-----U_Plot_scattered --------------------------------------------------------
*
* Generate a scattered diagram for the given array (P_Arr).
*/
function U_Plot_scattered(P_Arr0, P_Arr1, P_Clr) {
  var iCard0 = P_Arr0.length;
  var iStep  = S_iWdt / iCard0;
  var x, y;

  var szOther = `style="fill:${P_Clr};stroke-width:3;stroke:${P_Clr}"`;
  
  for (var j = 0; j < iCard0; j++) {
      x = P_Arr0[j];
      y = P_Arr1[j];
      U_Circle_SVG(x, y * S_iCoef, 2, szOther); 
  } /* for */
} /* U_Plot_scattered */

/*-----U_Header_SVG --------------------------------------------------------
*
*/ 
function U_Header_SVG(P_xMax, P_yMax)
{
  var szTmp="";
  szTmp  = '<svg xmlns="http://www.w3.org/2000/svg"  width="' + S_Bag_Plot.iWdt + '" height="' + S_Bag_Plot.iHgt + '" ';
  szTmp += 'viewBox="' + 0 + ' ' +  0 + ' ' + P_xMax + ' ' + P_yMax + '" preserveAspectRatio="none">\n';
  szTmp += '<rect x="0" y="0" width="' + P_xMax + '" height="' + P_yMax + '" style="fill:ivory; stroke-width: 2;"/>\n';                 
  $OPrn.U_Prn_Elem(szTmp, true);
  S_xPrv = 0;
  S_yPrv = 0;
} /* U_Header_SVG */

/*----- U_Line_SVG --------------------------------------------------------
*  <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-iWdt:2" />
*  `string text`
*/ 
function U_Line_SVG(P_x1, P_y1, P_x2, P_y2, P_Clr, P_rWdt_Stroke)
{
  var szTmp='<line x1="' + P_x1 + '" y1="' + P_y1 + '" x2="' + P_x2 + '" y2="' + P_y2 + '" style="stroke:' + P_Clr + ';stroke-iWdt:' + P_rWdt_Stroke + 'px" vector-effect="non-scaling-stroke" />\n';
//  var szTmp='<line x1="' + P_x1 + '" y1="' + P_y1 + '" x2="' + P_x2 + '" y2="' + P_y2 + '" /> ';    /* use CSS */
  $OPrn.U_Prn_Elem(szTmp, false);  
} /* U_Line_SVG */

/*-----U_End_SVG --------------------------------------------------------
*
*/
function U_End_SVG()
{
  var szTmp = "";
  szTmp += "\n</svg>";
  $OPrn.U_Prn_Elem(szTmp, false);
 // $OPrn.U_Upd_Elem("Id_Div00", false);   
} /* U_End_SVG */ 

/*-----U_ScrollTab --------------------------------------------------------
*
* Select record and scroll table's rows till the selected one.
*/
var S_O_RowPrv = null;
 
function U_ScrollTab(P_iRowNxt)
{
  P_iRowNxt = Math.round(P_iRowNxt);

  var aO_Row = document.querySelectorAll('#Id_TabFix0 tr');
  var O_Row  = aO_Row[P_iRowNxt];
  
  if (S_O_RowPrv !== null) {
    S_O_RowPrv.bgColor = "white";
  } /* if */
  
  O_Row.bgColor = "#00ff00";
  S_O_RowPrv = O_Row;

/* $NOTE: The following code doesn't work on PC Archimede because it requires a more recent browser. */        

  O_Row.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
  });

} /* U_ScrollTab */

/*-----U_Polyline_SVG --------------------------------------------------------
*
* Add a PolyLine node to the drawing.
* https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect
* VERY IMPORTANT: vector-effect="non-scaling-stroke"
*/ 
function U_Polyline_SVG(P_x, P_y, P_szCmd, P_Plot)
{
  var szTmp="";  
  if (P_szCmd) {
      if (P_szCmd == "init") {
         let szClrFill = (P_Plot.fFill)? P_Plot.szClrFill: "none";
         szTmp += `<path id="Id_SVG_${S_iCnt_SVG++}" style="fill:${szClrFill}` + `; stroke:${P_Plot.szClrStroke}; stroke-iWdt:${S_Bag_Plot.iWdtStroke}px" vector-effect="non-scaling-stroke"\nd="\nM ${P_x}, ${P_y}\n`;
         $OPrn.U_Prn_Elem(szTmp, false);
         szTmp="";
         szTmp += "M " + S_CB_Plot(P_x, P_y);
         $OPrn.U_Prn_Elem(szTmp, false);
         S_xPrv = P_x;
         S_yPrv = P_y;
      } /* if */
      if (P_szCmd == "end") {
         if (P_Plot.fFill) {

               szTmp += "L " + S_CB_Plot(S_xPrv, 0);            
               szTmp += "L " + S_CB_Plot(0, 0);            
               szTmp += "L " + S_CB_Plot(S_xPrv, 0);
               szTmp += "Z";            

         } /* if */
         szTmp += '" />\n';              
         $OPrn.U_Prn_Elem(szTmp, false);
      } /* if */
      return;
  } /* if */
  
  szTmp += "L " + S_CB_Plot(P_x, P_y);
  $OPrn.U_Prn_Elem(szTmp, false);
  S_xPrv = P_x;
  S_yPrv = P_y;
} /* U_Polyline_SVG */

/*-----U_CB_Polyline --------------------------------------------------------
*
*/ 
function U_CB_Polyline(P_x, P_y)
{
  var x0 = + P_x;
  var y0 = + P_y;
  var x1 = ((typeof(x0) == "number"))? x0: 0;
  var y1 = ((typeof(y0) == "number"))? S_iHgt - (S_iCoef * y0 + S_iBias): 0;
  return(x1 + "," + y1 + ", ");
} /* U_CB_Polyline */

/*-----U_CB_Path --------------------------------------------------------
*
*/ 
function U_CB_Path(P_x, P_y)
{
  var x0 = + P_x;
  var y0 = + P_y;
  var x1 = ((typeof(x0) == "number"))? x0: 0;
  var y1 = ((typeof(y0) == "number"))? S_iHgt - (S_iCoef * y0 + S_iBias): 0;
  return(x1 + "," + y1 + "\n");
} /* U_CB_Path */

/*-----U_Hist_SVG --------------------------------------------------------
*
* Plot Histogram column.
*/ 
function U_Hist_SVG(P_x, P_y, P_iWdt, P_iHgt, P_szOther)                                                  
{ 
  var szTmp = `<rect x="${P_x}" y="${(S_iHgt - P_iHgt)}" width="${P_iWdt}" height="${P_iHgt}" ${P_szOther} />\n`;
  $OPrn.U_Prn_Elem(szTmp, false);
  S_xPrv = P_x;
  S_yPrv = P_y;
} /* U_Hist_SVG */

/*-----U_Rect_SVG --------------------------------------------------------
* 
*/ 
function U_Rect_SVG(P_x, P_y, P_iWdt, P_iHgt, P_szOther)                                                  
{ 
  var szTmp = `<rect x="${P_x}" y="${(S_iHgt - P_y)}" width="${P_iWdt}" height="${P_iHgt}" ${P_szOther} />\n`;
  $OPrn.U_Prn_Elem(szTmp, false);
  S_xPrv = P_x;
  S_yPrv = P_y;
} /* U_Rect_SVG */

/*----- --------------------------------------------------------
* 
*/ 
function U_Circle_SVG(P_x, P_y, P_r, P_szOther)                                                  
{ 
  var szTmp = `<circle cx="${P_x}" cy="${(S_iHgt - P_y)}" r="${P_r}" ${P_szOther} />\n`;
  $OPrn.U_Prn_Elem(szTmp, false);
  S_xPrv = P_x;
  S_yPrv = P_y;
} /* U_Circle_SVG */

/*-----U_Init --------------------------------------------------------
*
*/ 
function U_Init()
{
  U_Root0("$Plot", C_jCd_Cur);

  _Plot.DBox_Draw = new CL_DBox("Id_Div_DBox0", "$Plot.DBox_Draw", "Plot Data", S_szHTML_DBox_Plot, G_DBox_Plot.U_Open, G_DBox_Plot.U_Cancel, G_DBox_Plot.U_Confirm, G_asaMnEntry.Plot, "Plot"); 
} /* U_Init */

  return(_Plot);
})(); /* # END - $Plot object */

  
/*-----U_Ndx_Change --------------------------------------------------------
*
*/ 
function U_Ndx_Change(P_fChecked)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var xMax;

  if (P_fChecked) {
     xMax = UsrView0.F_aNdx().length; 
  }
  else {
     xMax = UsrView0.XDB0.Coll0.length;
  } /* if */  
  Id_Draw_Dwg1_xMax.value = xMax;
} /* U_Ndx_Change */

