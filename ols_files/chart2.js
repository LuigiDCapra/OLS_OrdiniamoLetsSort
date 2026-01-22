/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : chart.js
* Function    : Charts display
* FirstEdit   : 18/11/2023
* LastEdit    : 26/09/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2023
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
* $NOTE: In alternativa si potrebbe usare
* https://developers.google.com/chart/interactive/docs/gallery
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

var GP_jaFld_Label  =  0;
var GP_jaFld_Data1  =  1;
var GP_jaFld_Data2  = -1;  /* -1 Not Used. */
var GP_jaFld_Data3  = -1;
var GP_jaFld_Data4  = -1;
var GP_szType_Chart = "line";
var GP_szType_Stat  = "none";

/*----- Module $Chart --------------------------------------------------------
*
*/ 
const $Chart = (function () {
  var _Chart = {};
  _Chart.U_Init    = U_Init_Chart;     // function U_Init_Chart();
  _Chart.U_Chart   = U_Chart;          // function U_Chart();
  _Chart.U_Display = U_Display;        // function U_Display();
  _Chart.U_Open    = U_Open;           // function U_Open();
  _Chart.U_Confirm = U_Confirm;        // function U_Confirm();
  _Chart.U_SelCol  = U_SelCol;         // function U_SelCol();
  _Chart.U_Reset   = U_Reset;          // function U_Reset();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Chart2;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

var S_szRGB_Up = "red";
var S_szRGB_Dn = "magenta";

/*-----U_SelCol --------------------------------------------------------
*
*/ 
function U_SelCol()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  Id_Inp_Fld1.value = +UsrView0.Key_Fld;
} /* U_SelCol */

/*-----U_Reset --------------------------------------------------------
*
*/ 
function U_Reset()
{
  Id_Inp_Fld1.value  = -1;
  Id_Inp_Fld2.value  = -1;
  Id_Inp_Fld3.value  = -1;
  Id_Inp_Fld4.value  = -1;
  Id_Inp_Lbl.value   =  0;
} /* U_Reset */

/*-----U_Chart --------------------------------------------------------
*
* integrazione chart.js
*/ 
function U_Chart()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iWdt = 900;
  var szHTML = `<div style="width:${iWdt}px; margin-left:10ch;"><br><br>
      data_1: <input id="Id_Inp_Fld1"  type="number" min= 0 max=${UsrView0.aFld1.length -1}><br><br>
      data_2: <input id="Id_Inp_Fld2"  type="number" min=-1 max=${UsrView0.aFld1.length -1}><br><br>
      data_3: <input id="Id_Inp_Fld3"  type="number" min=-1 max=${UsrView0.aFld1.length -1}><br><br>
      data_4: <input id="Id_Inp_Fld4"  type="number" min=-1 max=${UsrView0.aFld1.length -1}><br><br>
      labels: <input id="Id_Inp_Lbl"   type="number" min= 0 max=${UsrView0.aFld1.length -1}><br><br>
      <label for="Id_Inp_Chart">Choose a chart:</label>      
      <select id="Id_Inp_Chart" size="1">
      <option value="line">line</option>
      <option value="bar">bar</option>
      <option value="stacked bar">stacked bar</option>
      <option value="horizontal bar">horizontal bar</option>
      <option value="doughnut">doughnut</option>
      <option value="radar">radar</option>
      <option value="polarArea">polarArea</option>
      <option value="pie">pie</option>
      <option value="scatter">scatter</option>
      <option value="bubble">bubble</option>
      </select><br><br>
  </div>`;

  G_DBox0 = new CL_DBox("Id_Div_DBox0", "G_DBox0", "Grafico", szHTML, $Chart.U_Open, G_DBox_Null.U_Cancel, $Chart.U_Confirm, G_asaMnEntry.Chart, "Chart");  
  G_DBox0.U_Hub(C_JPnl_Open);

  Id_Inp_Fld1.value  = +GP_jaFld_Data1;
  Id_Inp_Fld2.value  = +GP_jaFld_Data2;
  Id_Inp_Fld3.value  = +GP_jaFld_Data3;
  Id_Inp_Fld4.value  = +GP_jaFld_Data4;
  Id_Inp_Lbl.value   = +GP_jaFld_Label;
//   if (Id_Inp_Lbl.value < 0) {
//      Id_Inp_Lbl.value = 0;
//   } /* if */
  
//  Id_Inp_Chart.value = +GP_szType_Chart;;
//  Id_Inp_Stat.value  = +GP_szType_Stat;
} /* U_Chart */

/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open()
{

} /* U_Open */

/*-----U_Confirm --------------------------------------------------------
*
*/ 
function U_Confirm()
{
  GP_jaFld_Data1  = +Id_Inp_Fld1.value;
  GP_jaFld_Data2  = +Id_Inp_Fld2.value;
  GP_jaFld_Data3  = +Id_Inp_Fld3.value;
  GP_jaFld_Data4  = +Id_Inp_Fld4.value;
  GP_jaFld_Label  = +Id_Inp_Lbl.value;
  GP_szType_Chart = Id_Inp_Chart.value;
  
  var iWdt = 900;
  var szHTML = `<div style="width:${iWdt}px; background-color:white; text-align:center; vertical-align:middle; margin: auto;"><div id='Id_Div_Chart'><br><br><br></div></div>`;
  
  G_DBox0 = new CL_DBox("Id_Div_DBox0", "G_DBox0", "Chart", szHTML, $Chart.U_Display, G_DBox_Null.U_Cancel, G_DBox_Null.U_Confirm);  
  G_DBox0.U_Hub(C_JPnl_Open);
} /* U_Confirm */

/*-----U_Display --------------------------------------------------------
*
*/ 
function U_Display()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  var jaFld = UsrView0.jaFld1;
  var aFld1 = UsrView0.aFld1;
  var Fld0 = aFld1[GP_jaFld_Label];
  var Fld1 = aFld1[GP_jaFld_Data1];
  var iWdt = 800;
//  var Arr0 = UsrView0.F_Arr_Mp_Field(UsrView0, GP_jaFld_Data1);
  var aLabels  = UsrView0.F_Arr_Mp_Field(UsrView0, GP_jaFld_Label);;
  var szIndexAxis = 'x';
  var szType_Chart = GP_szType_Chart;
  var Scales0  = null;
  var DataSet0 = [];
   
  switch (GP_szType_Chart) {
    case  "horizontal bar": {
         szIndexAxis = 'y';
         szType_Chart = "bar";
    } break;
    case "doughnut" :
    case "radar" :
    case "polarArea" :
    case "pie" : {
         iWdt = 500;
    } break;
    case "stacked bar" : {
         Scales0 = `
      x: {
          stacked: true
      },
      y: {
          stacked: true
      }`;

         szType_Chart = "bar";
    } break;   
    default : {
    } break;
 } /* switch */

  var szHTML = `<div style="width:${iWdt}px; background-color:white; text-align:center; vertical-align:middle; margin: auto;"><div id="Id_Div_Tit">x</div><br><canvas id="Id_Chart"></canvas></div>`;
  
  Id_Div_Chart.innerHTML = szHTML;
  Id_Div_Tit.innerText = Fld0.szNm;
  
  if (GP_jaFld_Data1 >= 0) {     
     var Fld1 = aFld1[GP_jaFld_Data1];
     if (!Fld1) {
        $Error.U_Error(C_jCd_Cur, 1, "illegal value: data_1", "", false);
     } /* if */
     var Arr1 = UsrView0.F_Arr_Mp_Field(UsrView0, GP_jaFld_Data1);
     let DataSet1 = {
        label: Fld1.szNm,
        data: Arr1,
//         borderColor: "red",
//         fill: false;
        borderWidth: 1
      };
      DataSet0.push(DataSet1);
  } /* if */
  
  if (GP_jaFld_Data2 >= 0) {     
     var Fld2 = aFld1[GP_jaFld_Data2];
     if (!Fld2) {
        $Error.U_Error(C_jCd_Cur, 2, "illegal value: data_2", "", false);
     } /* if */
     var Arr2 = UsrView0.F_Arr_Mp_Field(UsrView0, GP_jaFld_Data2);
     let DataSet2 = {
       label: Fld2.szNm,
       data: Arr2,
       borderWidth: 1
     };
     DataSet0.push(DataSet2);
  } /* if */
  
  if (GP_jaFld_Data3 >= 0) {     
     var Fld3 = aFld1[GP_jaFld_Data3];
     if (!Fld3) {
        $Error.U_Error(C_jCd_Cur, 3, "illegal value: data_3", "", false);
     } /* if */
     var Arr3 = UsrView0.F_Arr_Mp_Field(UsrView0, GP_jaFld_Data3);
     let DataSet3 = {
       label: Fld3.szNm,
       data: Arr3,
       borderWidth: 1
     };
     DataSet0.push(DataSet3);
  } /* if */ 
  
  if (GP_jaFld_Data4 >= 0) {     
     let Fld4 = aFld1[GP_jaFld_Data4];
     if (!Fld4) {
        $Error.U_Error(C_jCd_Cur, 4, "illegal value: data_4", "", false);
     } /* if */
     var Arr4 = UsrView0.F_Arr_Mp_Field(UsrView0, GP_jaFld_Data4);
     let DataSet4 = {
       label: Fld4.szNm,
       data: Arr4,
       borderWidth: 1
     };
     DataSet0.push(DataSet4);
  } /* if */
  
  if (GP_szType_Chart == "scatter") {
     let Mat0 = [];
     for (let i = 0; i < Arr1.length; i++) {
         Mat0[i] = {x: Arr1[i], y: Arr2[i]};
     } /* for */
     let sz0 = Fld1.szNm + " " + Fld2.szNm;
     DataSet1 = {
       label: sz0,
       data: Mat0,
       borderWidth: 1
     };
     DataSet0 = [DataSet1];
  } /* if */  
  if (GP_szType_Chart == "bubble") {
     let Mat0 = [];
     for (let i = 0; i < Arr1.length; i++) {
         Mat0[i] = {x: Arr1[i], y: Arr2[i], r: Arr3[i]};
     } /* for */
     let sz0 = Fld1.szNm + " " + Fld2.szNm + Fld3.szNm;
     DataSet1 = {
       label: sz0,
       data: Mat0,
       borderWidth: 1
     };
     DataSet0 = [DataSet1];
  } /* if */

  const ctx = document.getElementById('Id_Chart');

  new Chart(ctx, {
    type: szType_Chart,
    data: {
      labels: aLabels,
      datasets: DataSet0
    },
    options: {
      scales: Scales0,
      indexAxis: szIndexAxis,
      fill: {
        target: 'origin',
//         above: "red",     // Area will be red above the origin
//         below: "green"    // And blue below the origin
      }
    }
  });
} /* U_Display */

/*-----U_Init_Chart --------------------------------------------------------
*
*/ 
function U_Init_Chart()
{ 
  U_Root0("$Chart", C_jCd_Cur, 2);
} /* U_Init_Chart */

  U_Root0("$Chart", C_jCd_Cur, 1);
  return(_Chart);
})();  /* Chart */

var G_DBox0;
