/* ############################################################################
*
*  Copyright 2015.. 2016 - Luigi D. CAPRA - http://tuisys.com
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*  
*      http://www.apache.org/licenses/LICENSE-2.0
*  
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
*/

// ##### Module Vediamo ###########################

/*
*  vediamo.js
*  Parameters and Functions specific of Vediamo/Let's See (VLS) Rapid Application Development (RAD) environment for artificial vision applications.
*  Author Luigi D. CAPRA
*  10/08/2015
*  27/10/2016 [j102]
*/

/*
* Constants
*/
var C_JRecPrm_szNm = 0;
var C_JRecPrm_jAdr = 1;
var C_JRecPrm_iVal = 2;
var C_JRecPrm_iMin = 3;
var C_JRecPrm_iMax = 4;

var C_JFaltung_iWdtMat = 0;
var C_JFaltung_iHgtMat = 1;
var C_JFaltung_iDivSum = 2;
var C_JFaltung_iBias   = 3;
var C_JFaltung_ai00    = 4;

// var C_iBase_JRg  = 10000000;
// var C_iBase_JAdr = 20000000;

var C_iBase_JAdr = 20000000;
var C_jAdr_ijProgram      = C_iBase_JAdr +   0;     /* $TabR$ */
var C_jAdr_ijProg_Dflt    = C_iBase_JAdr +   1;     /* $TabR$ */
var C_jAdr_ims_Periodic   = C_iBase_JAdr +   2;
var C_jAdr_fPoll_IoT      = C_iBase_JAdr +   3;
var C_jAdr_iWdt_Video     = C_iBase_JAdr +   4;
var C_jAdr_iHgt_Video     = C_iBase_JAdr +   5;
var C_jAdr_iFrmRate_Video = C_iBase_JAdr +   6;
var C_jAdr_faceUser_Video = C_iBase_JAdr +   7;
var C_jAdr_fViewFinder    = C_iBase_JAdr +   8;
var C_jAdr_fROI           = C_iBase_JAdr +   9;
var C_jAdr_xViewFinder    = C_iBase_JAdr +  10;
var C_jAdr_yViewFinder    = C_iBase_JAdr +  11;
var C_jAdr_xLft_ROI       = C_iBase_JAdr +  12;
var C_jAdr_yUp_ROI        = C_iBase_JAdr +  13;
var C_jAdr_iWdt_ROI       = C_iBase_JAdr +  14;
var C_jAdr_iHgt_ROI       = C_iBase_JAdr +  15;
var C_jAdr_fGray_VIP      = C_iBase_JAdr +  16;
var C_jAdr_jConv          = C_iBase_JAdr +  17;
var C_jAdr_ByThrMin       = C_iBase_JAdr +  18;
var C_jAdr_ByThrMax       = C_iBase_JAdr +  19;
var C_jAdr_fExtr          = C_iBase_JAdr +  20;
var C_jAdr_iOff_Extr      = C_iBase_JAdr +  21;
var C_jAdr_iCoR_True      = C_iBase_JAdr +  22;
var C_jAdr_iCoG_True      = C_iBase_JAdr +  23;
var C_jAdr_iCoB_True      = C_iBase_JAdr +  24;
var C_jAdr_iCoA_True      = C_iBase_JAdr +  25;
var C_jAdr_iCoR_False     = C_iBase_JAdr +  26;
var C_jAdr_iCoG_False     = C_iBase_JAdr +  27;
var C_jAdr_iCoB_False     = C_iBase_JAdr +  28;
var C_jAdr_iCoA_False     = C_iBase_JAdr +  29;
var C_jAdr_iCoR_Default   = C_iBase_JAdr +  30;
var C_jAdr_iCoG_Default   = C_iBase_JAdr +  31;
var C_jAdr_iCoB_Default   = C_iBase_JAdr +  32;
var C_jAdr_iCoA_Default   = C_iBase_JAdr +  33;
var C_jAdr_ims_Upd_Change = C_iBase_JAdr +  34;
var C_jAdr_jConv_Change   = C_iBase_JAdr +  35;
var C_jAdr_iThrMin_Change = C_iBase_JAdr +  36;
var C_jAdr_iMax_ScanROI   = C_iBase_JAdr +  37;
var C_jAdr_iWdt_ImgNew    = C_iBase_JAdr +  38;
var C_jAdr_iHgt_ImgNew    = C_iBase_JAdr +  39;
var C_jAdr_xCur_Mouse     = C_iBase_JAdr +  40;
var C_jAdr_yCur_Mouse     = C_iBase_JAdr +  41;
var C_jAdr_xClick_Mouse   = C_iBase_JAdr +  42;
var C_jAdr_yClick_Mouse   = C_iBase_JAdr +  43;
var C_jAdr_iCoR_Mouse     = C_iBase_JAdr +  44;
var C_jAdr_iCoG_Mouse     = C_iBase_JAdr +  45;
var C_jAdr_iCoB_Mouse     = C_iBase_JAdr +  46;
var C_jAdr_iCoA_Mouse     = C_iBase_JAdr +  47;

var C_jAdr_JMat_Faltung   = C_iBase_JAdr +  48;
var C_jAdr_iWdt_Faltung   = C_iBase_JAdr +  49;
var C_jAdr_iHgt_Faltung   = C_iBase_JAdr +  50;
var C_jAdr_iDiv_Faltung   = C_iBase_JAdr +  51;
var C_jAdr_iBias_Faltung  = C_iBase_JAdr +  52;
var C_jAdr_iW00_Faltung   = C_iBase_JAdr +  53;
var C_jAdr_iW01_Faltung   = C_iBase_JAdr +  54;
var C_jAdr_iW02_Faltung   = C_iBase_JAdr +  55;
var C_jAdr_iW10_Faltung   = C_iBase_JAdr +  56;
var C_jAdr_iW11_Faltung   = C_iBase_JAdr +  57;
var C_jAdr_iW12_Faltung   = C_iBase_JAdr +  58;
var C_jAdr_iW20_Faltung   = C_iBase_JAdr +  59;
var C_jAdr_iW21_Faltung   = C_iBase_JAdr +  60;
var C_jAdr_iW22_Faltung   = C_iBase_JAdr +  61;

var C_jAdr_iTmp00         = C_iBase_JAdr +  62;
var C_jAdr_iTmp01         = C_iBase_JAdr +  63;
var C_jAdr_iTmp02         = C_iBase_JAdr +  64;
var C_jAdr_iTmp03         = C_iBase_JAdr +  65;
var C_jAdr_iTmp04         = C_iBase_JAdr +  66;
var C_jAdr_iTmp05         = C_iBase_JAdr +  67;
var C_jAdr_iTmp06         = C_iBase_JAdr +  68;
var C_jAdr_iTmp07         = C_iBase_JAdr +  69;

var C_jAdr_iFlag00        = C_iBase_JAdr +  70;
var C_jAdr_iFlag01        = C_iBase_JAdr +  71;
var C_jAdr_iFlag02        = C_iBase_JAdr +  72;
var C_jAdr_iFlag03        = C_iBase_JAdr +  73;
var C_jAdr_iFlag04        = C_iBase_JAdr +  74;
var C_jAdr_iFlag05        = C_iBase_JAdr +  75;
var C_jAdr_iFlag06        = C_iBase_JAdr +  76;
var C_jAdr_iFlag07        = C_iBase_JAdr +  77;

var C_jAdr_iCustom00      = C_iBase_JAdr +  78;
var C_jAdr_iCustom01      = C_iBase_JAdr +  79;
var C_jAdr_iCustom02      = C_iBase_JAdr +  80;
var C_jAdr_iCustom03      = C_iBase_JAdr +  81;
var C_jAdr_iCustom04      = C_iBase_JAdr +  82;
var C_jAdr_iCustom05      = C_iBase_JAdr +  83;
var C_jAdr_iCustom06      = C_iBase_JAdr +  84;
var C_jAdr_iCustom07      = C_iBase_JAdr +  85;

var C_jAdr_sz00           = C_iBase_JAdr +  86;
var C_jAdr_sz01           = C_iBase_JAdr +  87;
var C_jAdr_sz02           = C_iBase_JAdr +  88;
var C_jAdr_sz03           = C_iBase_JAdr +  89;
var C_jAdr_sz04           = C_iBase_JAdr +  90;
var C_jAdr_sz05           = C_iBase_JAdr +  91;
var C_jAdr_sz06           = C_iBase_JAdr +  92;
var C_jAdr_sz07           = C_iBase_JAdr +  93;

var C_jAdr_JSON00         = C_iBase_JAdr +  94;
var C_jAdr_JSON01         = C_iBase_JAdr +  95;
var C_jAdr_JSON02         = C_iBase_JAdr +  96;
var C_jAdr_JSON03         = C_iBase_JAdr +  97;
var C_jAdr_JSON04         = C_iBase_JAdr +  98;
var C_jAdr_JSON05         = C_iBase_JAdr +  99;
var C_jAdr_JSON06         = C_iBase_JAdr + 100;
var C_jAdr_JSON07         = C_iBase_JAdr + 101;

var C_jAdr_fRun           = C_iBase_JAdr + 102;
var C_jAdr_fMarks         = C_iBase_JAdr + 103;
var C_jAdr_iLast          = C_iBase_JAdr + 104;

var C_iCard_aRecPrm       = 105;   /* $TabR$ */

var G_szDebug = "";

/*
* Parameters
* 
* WARNING:
*   parameters will be initialized temporarily as "null" just to define them.
*   The parameters will be initialized in a second step by the function U_LoadPrm(); with the defauts stored in G_aRcdPrm[];
* NOTE: Initialization values for a given parameter must be set in the corresponding entry in the array G_aRcdPrm[];
*/


var G_ijProgram = null;
var G_ijProg_Dflt = null;
var G_ims_Periodic = null;
var G_fPoll_IoT = null;
var G_iWdt_Video = null;
var G_iHgt_Video = null;
var G_iFrmRate_Video = null;
var G_faceUser_Video = null;
var G_fViewFinder = null;
var G_fROI = null;

var G_xViewFinder = null;
var G_yViewFinder = null;
var G_xLft_ROI = null;
var G_yUp_ROI = null;
var G_iWdt_ROI = null;
var G_iHgt_ROI = null;

var G_fGray_VIP = null;      /* Gray vs. Color output */
var G_JConv = null;
var G_ByThrMin = null;
var G_ByThrMax = null;
var G_fExtr = null;
var G_iOff_Extr = null;      /* Colors' component currently selected (0 Red, 1 Green, 2 Blue, 3 Alpha) */
var G_iCoR_True = null;      /* Colors used to mark pixels that satisfies the conditions of the test */
var G_iCoG_True = null;
var G_iCoB_True = null;
var G_iCoA_True = null;
var G_iCoR_False = null;     /* Colors used to mark pixels that do not satisfies the conditions of the test */
var G_iCoG_False = null;
var G_iCoB_False = null;
var G_iCoA_False = null;
var G_iCoR_Default = null;   /* Colors used for painting */
var G_iCoG_Default = null;
var G_iCoB_Default = null;
var G_iCoA_Default = null;

var G_ims_Upd_Change = null;
var G_JConv_Change = null;
var G_iThrMin_Change = null;
var G_iMax_ScanROI = null;

var G_iWdt_ImgNew = null;
var G_iHgt_ImgNew = null;

var G_xCur_Mouse = null;
var G_yCur_Mouse = null;
var G_xClick_Mouse = null;
var G_yClick_Mouse = null;

var G_iCoR_Mouse = null;  /* RGBA components read at cursor position */
var G_iCoG_Mouse = null;
var G_iCoB_Mouse = null;
var G_iCoA_Mouse = null;

var G_JMat_Faltung = null;
var G_iWdt_Faltung = null;
var G_iHgt_Faltung = null;
var G_iDiv_Faltung = null;
var G_iBias_Faltung = null;
var G_iW00_Faltung = null;
var G_iW01_Faltung = null;
var G_iW02_Faltung = null;
var G_iW10_Faltung = null;
var G_iW11_Faltung = null;
var G_iW12_Faltung = null;
var G_iW20_Faltung = null;
var G_iW21_Faltung = null;
var G_iW22_Faltung = null;

var G_iTmp00 = null;     /* Temporary variables preallocated */
var G_iTmp01 = null;
var G_iTmp02 = null;
var G_iTmp03 = null;
var G_iTmp04 = null;
var G_iTmp05 = null;
var G_iTmp06 = null;
var G_iTmp07 = null;

var G_iFlag00 = null;    /* Flags used to control program execution */
var G_iFlag01 = null;
var G_iFlag02 = null;
var G_iFlag03 = null;
var G_iFlag04 = null;
var G_iFlag05 = null;
var G_iFlag06 = null;
var G_iFlag07 = null;

var G_iCustom00 = null;   /* Variables preallocated for user-defined parameters */
var G_iCustom01 = null;
var G_iCustom02 = null;
var G_iCustom03 = null;
var G_iCustom04 = null;
var G_iCustom05 = null;
var G_iCustom06 = null;
var G_iCustom07 = null;

var G_sz00 = "";
var G_sz01 = "";          /* String registers */
var G_sz02 = "";
var G_sz03 = "";
var G_sz04 = "";
var G_sz05 = "";
var G_sz06 = "";
var G_sz07 = "";

var G_JSON00 = "";        /* JSON registers */
var G_JSON01 = "";
var G_JSON02 = "";
var G_JSON03 = "";
var G_JSON04 = "";
var G_JSON05 = "";
var G_JSON06 = "";
var G_JSON07 = "";

var G_fRun_TUISys = false;
var G_fMark_LiveEmu = false;
var G_iLast = 1234;

var G_iToA_Var = 0;
var G_iTmp = 0; /* Sink variable */

/* Table of the Parameters */
var G_aRcdPrm=[  /* $Tab$ C_jAdr_* */
["G_ijProgram",        100,     0,     0,      4],   /* $Dbg */
["G_ijProg_Dflt",      101,     1,     0,      4],
["G_ims_Periodic",     150,   200,     0,   1000],
["G_fPoll_IoT",        200,     0,     1,      1],
["G_iWdt_Video",       300,   640,   160,   2048],
["G_iHgt_Video",       301,   480,   100,   2048],
["G_iFrmRate_Video",   302,    15,     1,    200],
["G_faceUser_Video",   303,     0,     0,      1],
["G_fViewFinder",      900,     0,     0,      1],
["G_fROI",             901,     0,     0,      1],
["G_xViewFinder",     1000,   320,     0,    639],
["G_yViewFinder",     1001,   240,     0,    479],
["G_xLft_ROI",        1002,   100,     0,    639],
["G_yUp_ROI",         1003,   100,     0,    479],
["G_iWdt_ROI",        1004,   100,     0,    639],
["G_iHgt_ROI",        1005,   123,     0,    479],
["G_fGray_VIP",       1010,     0,     0,      1],
["G_JConv",           1011,     1,     0,     16],
["G_ByThrMin",        1012,   100,     0,    255],
["G_ByThrMax",        1013,   200,     0,    255],
["G_fExtr",           1014,     0,     0,      1],
["G_iOff_Extr",       1015,     0,     0,      3],
["G_iCoR_True",       1020,   255,     0,    255],
["G_iCoG_True",       1021,   255,     0,    255],
["G_iCoB_True",       1022,   255,     0,    255],
["G_iCoA_True",       1023,   255,     0,    255],
["G_iCoR_False",      1024,     0,     0,    255],
["G_iCoG_False",      1025,     0,     0,    255],
["G_iCoB_False",      1026,     0,     0,    255],
["G_iCoA_False",      1027,   255,     0,    255],

["G_iCoR_Default",    1028,    23,     0,    255],
["G_iCoG_Default",    1029,    13,     0,    255],
["G_iCoB_Default",    1030,     3,     0,    255],
["G_iCoA_Default",    1031,   255,     0,    255],

["G_ims_Upd_Change",  1040,  5000,     0,  10000],
["G_JConv_Change",    1041,     1,     0,     16],
["G_iThrMin_Change",  1042,   128,     0,    255],
["G_iMax_ScanROI",    1050,     5,     0,    255],
["G_iWdt_ImgNew",     1060,   600,     1,   2028],
["G_iHgt_ImgNew",     1061,   400,     1,   2048],
["G_xCur_Mouse",      1070,   600,     1,   2028],
["G_yCur_Mouse",      1071,   400,     1,   2048],
["G_xClick_Mouse",    1072,   600,     1,   2028],
["G_yClick_Mouse",    1073,   400,     1,   2048],
["G_iCoR_Mouse",      1074,     0,     0,    255],
["G_iCoG_Mouse",      1075,     0,     0,    255],
["G_iCoB_Mouse",      1076,     0,     0,    255],
["G_iCoA_Mouse",      1077,   255,     0,    255],

["G_JMat_Faltung",    1090,    -1,    -1,      4],
["G_iWdt_Faltung",    1091,     3,     1,      5],
["G_iHgt_Faltung",    1092,     3,     1,      5],
["G_iDiv_Faltung",    1093,     1,  -100,    100],
["G_iBias_Faltung",   1094,     0,  -100,    100],

["G_iW00_Faltung",    1100,     0,  -100,    100],
["G_iW01_Faltung",    1101,     1,  -100,    100],
["G_iW02_Faltung",    1102,     0,  -100,    100],

["G_iW10_Faltung",    1110,     0,  -100,    100],
["G_iW11_Faltung",    1111,     0,  -100,    100],
["G_iW12_Faltung",    1112,     0,  -100,    100],

["G_iW20_Faltung",    1120,     0,  -100,    100],
["G_iW21_Faltung",    1121,    -1,  -100,    100],
["G_iW22_Faltung",    1122,     0,  -100,    100],

["G_iTmp00",        900000,     0, -1000,   1000],
["G_iTmp01",        900001,     0, -1000,   1000],
["G_iTmp02",        900002,     0, -1000,   1000],
["G_iTmp03",        900003,     0, -1000,   1000],
["G_iTmp04",        900004,     0, -1000,   1000],
["G_iTmp05",        900005,     0, -1000,   1000],
["G_iTmp06",        900006,     0, -1000,   1000],
["G_iTmp07",        900007,     0, -1000,   1000],

["G_iFlag00",       909000,     0, -1000,   1000],
["G_iFlag01",       909001,     0, -1000,   1000],
["G_iFlag02",       909002,     0, -1000,   1000],
["G_iFlag03",       909003,     0, -1000,   1000],
["G_iFlag04",       909004,     0, -1000,   1000],
["G_iFlag05",       909005,     0, -1000,   1000],
["G_iFlag06",       909006,     0, -1000,   1000],
["G_iFlag07",       909007,     0, -1000,   1000],

["G_iCustom00",     910000,     0, -1000,   1000],
["G_iCustom01",     910001,     0, -1000,   1000],
["G_iCustom02",     910002,     0, -1000,   1000],
["G_iCustom03",     910003,     0, -1000,   1000],
["G_iCustom04",     910004,     0, -1000,   1000],
["G_iCustom05",     910005,     0, -1000,   1000],
["G_iCustom06",     910006,     0, -1000,   1000],
["G_iCustom07",     910007,     0, -1000,   1000],

["G_sz00",          920000,     ""],
["G_sz01",          920001,     ""],
["G_sz02",          920002,     ""],
["G_sz03",          920003,     ""],
["G_sz04",          920004,     ""],
["G_sz05",          920005,     ""],
["G_sz06",          920006,     ""],
["G_sz07",          920007,     ""],

["G_JSON00",        930000,     ""],
["G_JSON01",        930001,     ""],
["G_JSON02",        930002,     ""],
["G_JSON03",        930003,     ""],
["G_JSON04",        930004,     ""],
["G_JSON05",        930005,     ""],
["G_JSON06",        930006,     ""],
["G_JSON07",        930007,     ""],

["G_fRun_TUISys",   999997,     0,     0,      1],
["G_fMark_LiveEmu", 999998,     0,     0,      1],
["G_iLast",         999999,   100,     0,    255]
];

function U_OpenTab_VLS(P_szSlave, P_szMaster) {
  $IPC.Set_Reg("Master", P_szMaster);
  if ((P_szSlave == "engine.htm") || (P_szSlave == "vlssmart.htm")) {
   //  var szTxtWr = JSON.stringify(G_aRcdPrm);
     var oObj = {"szCMD":"Load", "aRecPrm":G_aRcdPrm};
     $IPC.Set_JSON("engine",oObj);
  } /* if */
  window.open(P_szSlave);
} /* U_OpenTab_VLS1 */

function U_Help() {
  window.open("help.htm");
} /* U_Help */

function U_About()
{
  window.location="#Id_About";
} /* U_About */

function U_License()
{
  window.location="#Id_License";
} /* U_License */

function U_Toggle_Visibility(P_Id, P_fPad) {
/* NOTE: the default values of Elem0.style.display and Elem0.style.visibility is "" */
  var Elem0 = document.getElementById(P_Id);
  
  if (P_fPad) {
     /* Hide the selected element padding the corresponding area */
     var szVis = Elem0.style.visibility;
     if(szVis == 'hidden') {
       szVis = 'visible';
     } else {
       szVis = "hidden";
     } /* if */
     Elem0.style.visibility = szVis;
  }
  else {
     var szDisp = Elem0.style.display;
     if(szDisp == 'none') {
       szDisp = 'block';
     } else {
       szDisp = 'none';
     } /* if */
     Elem0.style.display = szDisp;
  } /* if */
} /* U_Toggle_Visibility */

function U_Show_Visibility (P_Id, P_fPad) {
  var Elem0 = document.getElementById(P_Id);

  if (P_fPad) {
       Elem0.style.visibility = 'visible';
    }
    else {
       Elem0.style.display = 'block';
    } /* if */
} /* U_Show_Visibility */

function U_Hide_Visibility (P_Id, P_fPad) {
  var Elem0 = document.getElementById(P_Id);

  if (P_fPad) {
       Elem0.style.visibility = 'hidden';
    }
    else {
       Elem0.style.display = 'none';
    } /* if */
} /* U_Hide_Visibility */

function U_Sync_szFlNm()
{
	var szFlNm = document.getElementById("Id_In_FlNm1").files[0].name;
	document.getElementById("Id_In_FlNm0").value = szFlNm;
} /* U_Sync_szFlNm */

function U_SaveFile()
{
  function U_DestroyElem(event)
  {
  	document.body.removeChild(event.target);
  } /* U_DestroyElem */                           

  var szTxtWr = JSON.stringify(G_aRcdPrm);
	var Blob0 = new Blob([szTxtWr], {type:'text/plain'});
	var szFlNm = document.getElementById("Id_In_FlNm0").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = szFlNm;
	downloadLink.innerHTML = "Download File";
	if (typeof window.webkitURL !== "undefined")	{
		// Chrome + Opera.
    var aaa= 0;
		downloadLink.href = window.webkitURL.createObjectURL(Blob0);
	}
	else
	{
		// Firefox.
    var aaa= 1;
		downloadLink.href = window.URL.createObjectURL(Blob0);
		downloadLink.onclick = U_DestroyElem;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	} /* if */

	downloadLink.click();
  $IPC.Set_JSON("engine",{"szCMD":"BackUp"});  /* update backup */
} /* U_SaveFile */

function U_LoadFile()
{
	var szFlNmLd = document.getElementById("Id_In_FlNm1").files[0];

	var FileReader0 = new FileReader();
	FileReader0.onload = function(fileLoadedEvent)	{
		var szTxtTmp = fileLoadedEvent.target.result;
		G_aRcdPrm = JSON.parse(szTxtTmp);
		U_LoadPrm(G_aRcdPrm);
    /* Sync Engine with Console */
    $IPC.Set_JSON("engine",{"szCMD":"Load", "aRecPrm":G_aRcdPrm});
	}; /* function */
	FileReader0.readAsText(szFlNmLd, "UTF-8");
} /* U_LoadFile */

function U_LoadPrm(P_aRecPrm)
{
  var iLen = P_aRecPrm.length;
  var RecPrm0;
  var szTmp;
  var iVal;
  var szNm;
  var i;
  
  if (G_szNmTab == "Console") {
      for (i = 0; i < iLen; i++) {
          U_SyncPrm(P_aRecPrm, i);
      } /* for */      
  } /* if */
  if (G_szNmTab == "Engine") {
      U_Halt(false);
      for (i = 0; i < iLen; i++) {
          RecPrm0 = P_aRecPrm[i];
          iVal = RecPrm0[C_JRecPrm_iVal];
          szNm = RecPrm0[C_JRecPrm_szNm];
          switch (typeof iVal) {
            case "number" : {
                 szTmp = szNm + "=" + iVal;
            } break;
            case "string" : {
                 szTmp = szNm + "='" + iVal + "'";
            } break;
            default : {
             $TUISys.Error(123, 1, "xxx");
            } break;    
          } /* switch */

          eval(szTmp);
      } /* for */      
  } /* if */
} /* U_LoadPrm */

function U_SyncPrm(P_aRecPrm, P_jaRecPrm)
{
  var RecPrm0;
  var szTmp;
  var elem0;
  var szId;
  var szPref;
  var iVal;
  var szNm;
  var JAdr;
  var jAdr;
  var ich = 97;  /* 97 = 0x61 = 'a' */
  var fLoop = true;

  RecPrm0 = P_aRecPrm[P_jaRecPrm];
  F_fDefined_szVar(RecPrm0[C_JRecPrm_szNm]);
  iVal = RecPrm0[C_JRecPrm_iVal];
  JAdr = RecPrm0[C_JRecPrm_jAdr];
  szNm = RecPrm0[C_JRecPrm_szNm];  

  switch (typeof iVal) {
    case "number" : {
         szTmp = szNm + "=" + iVal;
    } break;
    case "string" : {
         szTmp = szNm + "='" + iVal + "'";
    } break;
    default : {
     $TUISys.Error(123, 1, "xxx");
    } break;    
  } /* switch */
    
  eval(szTmp);
  szPref = "Id_In" + JAdr + "_";       

  while (fLoop) {
        szId = szPref + String.fromCharCode(ich);
        elem0 = document.getElementById(szId);
        if (elem0 !== null) {
           elem0.value = iVal;
           ich++;
        } else {
           fLoop = false;
        }/* if */   
  } /* while */
} /* U_SyncPrm */

function F_fDefined_szVar(P_szVar)
{
  var szEval = eval("typeof " + P_szVar);

  if (szEval === "undefined") {
      alert(P_szVar + " undefined");
      return(false);
  } /* if */
  return(true);
} /* F_fDefined_szVar */

function F_jaRecPrm_Mp_jAdr(P_jAdr)
{
  return(P_jAdr - C_iBase_JAdr);
} /* F_jaRecPrm_Mp_jAdr */

function U_Set(P_jAdr, P_szVal)
{
  var szNmTab_Dst = (G_szNmTab == "Console")? "engine": "console";
  var iVal = F_iSet2(P_jAdr, P_szVal);
  $IPC.Set_JSON(szNmTab_Dst,{"szCMD":"Sync", "jAdr":P_jAdr, "iVal":P_szVal});
//  return(iVal);
} /* U_Set */

function F_iSet2(P_jAdr, P_szVal)
{
  var iVal  = parseInt(P_szVal, 10);
  var jaRecPrm0 = F_jaRecPrm_Mp_jAdr(P_jAdr);
  if (isNaN(iVal)) {
     G_aRcdPrm[jaRecPrm0][C_JRecPrm_iVal] = P_szVal;
  } else {
     G_aRcdPrm[jaRecPrm0][C_JRecPrm_iVal] = iVal;
  } /* if */
  U_SyncPrm(G_aRcdPrm, jaRecPrm0);
  return(iVal);
} /* F_iSet2 */

function U_Test_Code()
{ /* Stub for code to be tested */
 
} /* U_Test_Code */

function U_Init_Vediamo()
{
 G_iToA_Var = (C_jAdr_iLast + C_iBase_JAdr);
 C_iCard_aRecPrm = G_aRcdPrm.length;
 G_JConv_Change = 1; // C_JConv_Gray;
 /////
//   var Date0 = new Date();
//   var y;
//   var i;
// 
//   U_Test_Code();
// 
//   $TUISys.Init();
//   $VIP.U_Dbg_VIP();   
// 
//   G_aCanvas[0] = document.getElementById('Id_Canvas00');
//   G_aCanvas[1] = document.getElementById('Id_Canvas01');
//   G_aCanvas[2] = document.getElementById('Id_Canvas02');
//   G_aCanvas[3] = document.getElementById('Id_Canvas03');
//   G_aCanvas[4] = document.getElementById('Id_Canvas04');
//   G_aCanvas[5] = document.getElementById('Id_Canvas05');
//   G_aCanvas[6] = document.getElementById('Id_Canvas06');
//   G_aCanvas[7] = document.getElementById('Id_Canvas07');
//   G_aCanvas[8] = document.getElementById('Id_Canvas08_LiveEmu');
//   G_aCanvas[9] = document.getElementById('Id_Canvas09_Tmp');
//   
//   for (i = 0; i < (C_iCard_aCanvas -1); i++) {
//       G_aCanvas[i].onclick = U_OnClick;
//   } /* for */
// 
//   $IPC.Init(U_HandlerCmd);
//     
//   U_Init_Vediamo();
// 
//   U_Toggle_Visibility("Id_DivCanvasLiveEmu", false);
//   U_Toggle_Visibility("Id_DivCanvasTmp", false);
//   G_fRun_TUISys = false;
//   U_fChg_Rtn_TUISys(0);
//  
//   U_LoadPrm(G_aRecPrm);  /* Load ALWAYS defaults */
//   U_LoadPrm_Ext();       /* Load setting used during the last session or parameter Set sent by caller. */
 
//  setInterval(U_Periodic_Engine, G_ims_Periodic);
//   S_elem_mouse = document.getElementById('Id_Mouse');
// 
//   if (G_fPoll_IoT) {
//      $IoT.Init();
//      $IoT.SelDev("192.168.3.176");
//   } /* if */  
//   $IPC.Set_Reg("Master", "");
//   $IPC.Set_JSON("console",{"szCMD":"Sync", "jAdr":321, "iVal":123});   /* Confirm VLS- Engine running */
} /* U_Init_Vediamo */
