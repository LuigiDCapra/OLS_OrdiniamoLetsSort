/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : vip.js
* Function    : Virtual Image Processor
* FirstEdit   : 01/06/2015
* LastEdit    : 08/09/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
* The present module supports pattern classification;
* given the premise it could be also used for images processing observing that: images are a kind of Patterns.
* - We call Epoch the sessions of machine learning terminating with Network's weights modification.
* During each epoch one or more patterns could be presented to the network for classification,
* at the same time could be collected of statistics, typically Errors, for ANS training.
* At the end of each epochs the Network's weights will be corrected to compensate the errors accumulated during the epochs. 
* The epochs management policies depends from the kind of ANS architecture,
* whether error compensation occurs after every pattern presentation then njPatt == njEpoch.
*
* NOTE: we call Cardinality the number of element of an Array or a Matrix 
* to distinguish it from the Size that is the memory occupation of the entity.
* For instance
* given a rectangular image Img0 consisting of 800 * 600 pixels
* iCard_Img0 = iWdt_Img0 * iHgt_Img0 = 800 * 600 = 480000 pixels
*
* Dealing with 24bits RGB pixels we have:
* iSize_Img0 = iCard_Img * iSize_RGB = 480000 * 3 = 1440000 Bytes.
*/

"use strict";

/* Public Const */

//var C_iBase_JRg  = 10000000;
//var C_iBase_JAdr = 20000000;

/*
* Remark:
* IPE Image Processing Engine
* every IPE's instruction (VCode) consists of a sequence of six numbers
* that could be retrieved using the following index constants.
*/
var C_JVCode_Label  = 0;
var C_JVCode_Flag   = 1;
var C_JVCode_Istru  = 2;
var C_JVCode_RgDst  = 3;                                       
var C_JVCode_RgSrc1 = 4;
var C_JVCode_RgSrc2 = 5;

var C_JNOP     =  0;   /* No Operation */
var C_JHALT    =  1;   /* Stop image processing */
var C_JInitErr =  2;   /* Reset Error flags */
var C_JInitVAR =  3;   /* Initialize Program Variables */
var C_JCALL    =  4;   /* Call subroutine */
var C_JRET     =  5;   /* Subroutine return */
var C_JJMP     =  6;   /* Unconditional Jump */
var C_JJEQ     =  7;   /* Jump if Equal */
var C_JJNE     =  8;   /* Jump if NOT Equal */
var C_JJLT     =  9;   /* Jump if Less Than */
var C_JJGT     = 10;   /* Jump if Greater Than */
var C_JJMulti  = 11;   /* Multiple Jump */
var C_JResvd0  = 12;
var C_JResvd1  = 13;
var C_JMOV     = 14;   /* Copy the selected image in another register */
var C_JNOT     = 15;
var C_JOR      = 16
var C_JAND     = 17;
var C_JXOR     = 18;
var C_JSHL     = 19;
var C_JSHR     = 20;
var C_JADD     = 21;
var C_JSUB     = 22;
var C_JMUL     = 23;
var C_JDIV     = 24;
var C_JMOD     = 25;
var C_JResvd3  = 26;
var C_JSound   = 27;    /* Play a sound */
var C_JMsg     = 28;    /* Show a Message on the screen */
var C_JInput   = 29;    /* Get Input */
var C_JSync    = 30;    /* Sync with external device and/or applicatios */
var C_JPick    = 31;    /* Pick (read) the color of the selected pixel */
var C_JPlot    = 32;    /* Plot a drawing on the selected canvas (work in progress) */
var C_JMark    = 33;    /* Show marks on the current image */
var C_JGrab    = 34;    /* Grab Image */
var C_JConv    = 35;    /* Pixels conversion */
var C_JZoom    = 36;    /* ROI zoom */
var C_JChange  = 37;    /* Compare two images looking for changes */
var C_JScan    = 38;    /* Scan the final-image looking for pixel set */
var C_JFaltung = 39;    /* Convolution of the current image with a matrix */
var C_JRdPort  = 40;    /* Read  remote device port (IoT) */
var C_JWrPort  = 41;    /* Write remote device port (IoT) */
var C_JUser0   = 42;
var C_JUser1   = 43;
var C_JUser2   = 44;
var C_JUser2   = 45;
var C_JDEBUG   = 46;    /* Signal that the program reached the breakpoint openeing an alert box */
                        /* C_JDEBUG   = 46; - $TabR$ */

var C_iBase_JRg  = 10000000;

var C_JRg0   = C_iBase_JRg + 0;  /* Id_Canvas00 */
var C_JRg1   = C_iBase_JRg + 1;  /* Id_Canvas01 */
var C_JRg2   = C_iBase_JRg + 2;  /* Id_Canvas02 */
var C_JRg3   = C_iBase_JRg + 3;  /* Id_Canvas03 */
var C_JRg4   = C_iBase_JRg + 4;  /* Id_Canvas04 */
var C_JRg5   = C_iBase_JRg + 5;  /* Id_Canvas05 */
var C_JRg6   = C_iBase_JRg + 6;  /* Id_Canvas06 */
var C_JRg7   = C_iBase_JRg + 7;  /* Id_Canvas07 */
var C_JRg8   = C_iBase_JRg + 8;  /* Id_Canvas07 eliminare */
var C_JRg9   = C_iBase_JRg + 9;  /* Id_Canvas07 eliminare */
var C_JRgLE  = C_iBase_JRg + 8;  /* Id_Canvas08_LiveEmu */
var C_JRgTmp = C_iBase_JRg + 9;  /* Id_Canvas09_Tmp - Temporary Canvas used to prevent that images created as intermediate steps of complex image-processing appear on the screen */

var C_JRgToA =  C_JRgTmp +1;
var C_iCard_aRg = (C_JRgToA - C_iBase_JRg); 

var C_JConv_Dflt    = -1;
var C_JConv_Copy    =  0;        /* Copy image */
var C_JConv_Gray    =  1;        /* Gray levels */
var C_JConv_InvGray =  2;        /* Inverted Gray levels (negative) */
var C_JConv_InvRGB  =  3;        /* Inverted RGB (RGB negative) */
var C_JConv_ExtrR   =  4;        /* Get Red component */
var C_JConv_ExtrG   =  5;        /* Get Green */
var C_JConv_ExtrB   =  6;        /* Get Blue */
var C_JConv_ExtrA   =  7;        /* Get A component */
var C_JConv_ExtrH   =  8;        /* Get Hue */
var C_JConv_ExtrS   =  9;        /* Get Saturation */
var C_JConv_ExtrV   = 10;        /* Get Value */
var C_JConv_HSV     = 11;        /* RGB to HSV conversion */
var C_JConv_ExtrH2  = 12;        /* Get Hue */
var C_JConv_ExtrL   = 13;        /* Get Lightnes */
var C_JConv_ExtrS2  = 14;        /* Get Saturation */
var C_JConv_HSL     = 15;        /* RGB to HSL conversion */
var C_JConv_ThrLT   = 16;        /* Threshold min < P */
var C_JConv_ThrGT   = 17;        /* Threshold P < Max */
var C_JConv_ThrRange = 18;       /* Threshold min < P < Max */
var C_JConv_Clear   = 19;        /* Clear image (Set image with background color) $TabR$ */

/* Public Variables */
                                                    
const $VIP = (function(){
  var _VIP = {};
 _VIP.U_Init   = U_Init_VIP;         // function U_Init_VIP();
 _VIP.U_Run    = U_Run;              // function U_Run(P_aVCode);
 _VIP.U_Grab   = U_Grab;             // function U_Grab(P_JRg, P_jConv);
 _VIP.U_Conv   = U_Conv;             // function U_Conv(P_JRg_Dst, P_JRg_Src1, P_JConv);
 _VIP.U_Change = U_Change;           // function U_Change(P_JRg_Dst, P_JRg_Src1, P_JRg_Src2);
 _VIP.F_pCanvas_Chk = F_pCanvas_Chk; // function F_pCanvas_Chk(P_JRg, P_fErr);
 _VIP.F_szDbgMsg = F_szDbgMsg_VIP;   // function F_szDbgMsg_VIP()

 _VIP.U_Dbg_VIP = U_Dbg_VIP;         // function U_Dbg_VIP();
 
/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_VIP;

const C_iCard_aiStk     =  16;

/* Variables */

var S_paVCode;                             /* Ptr to the code of the Program currently selected*/
var S_aiStk  = new Array(C_iCard_aiStk);   /* Stack */

var S_jIP_RFE = 0;                         /* Instruction Pointer */
var S_jStk = C_iCard_aiStk;                /* Stack Pointer */

var S_VCodeCur;                            /* VCode corresponding to current instruction */
var S_pF_RFE;
var S_jIstruCur = 0;
var S_iDst_RFE  = 0;
var S_iSrc1_RFE = 0;
var S_iSrc2_RFE = 0;

var S_fLoop_RFE = true;                    /* flag: Program Running */

var S_aFnInstru_Img = [   /* $Tab$ instructions decoding */
/* 00 */ U_NOP,
/* 01 */ U_HALT,
/* 02 */ U_InitErr,
/* 03 */ U_InitVAR,
/* 04 */ U_CALL,
/* 05 */ U_RET,
/* 06 */ U_JMP,
/* 07 */ U_JEQ,
/* 08 */ U_JNE,
/* 09 */ U_JLT,
/* 10 */ U_JGT,
/* 11 */ U_JMulti,
/* 12 */ U_Resvd,
/* 13 */ U_Resvd,
/* 14 */ U_MOV,
/* 15 */ U_NOT,
/* 16 */ U_OR,
/* 17 */ U_AND,
/* 18 */ U_XOR,
/* 19 */ U_SHL,
/* 20 */ U_SHR,
/* 21 */ U_ADD,
/* 22 */ U_SUB,
/* 23 */ U_MUL,
/* 24 */ U_DIV,
/* 25 */ U_MOD,

/* 26 */ U_Resvd,
/* 27 */ U_Resvd,
/* 28 */ U_Msg,
/* 29 */ U_Input,
/* 30 */ U_Sync,
/* 31 */ U_Resvd,
/* 32 */ U_Plot,
/* 33 */ U_Mark,
/* 34 */ U_Grab_VIP,
/* 35 */ U_Conv_VIP,
/* 36 */ U_Zoom,
/* 37 */ U_Change_VIP,
/* 38 */ U_Resvd,
/* 39 */ U_Faltung,
/* 40 */ U_RdPort,
/* 41 */ U_WrPort,
/* 42 */ U_User0,
/* 43 */ U_User1,
/* 44 */ U_User2,
/* 45 */ U_User3,
/* 46 */ U_DEBUG  
];

var S_aFnInstru_Ari = [   /* $Tab$ arithmetical operations */
/* 00 */ U_NOP,
/* 01 */ U_HALT,
/* 02 */ U_InitErr,
/* 03 */ U_InitVAR,
/* 04 */ U_CALL,
/* 05 */ U_RET,
/* 06 */ U_JMP,
/* 07 */ U_JEQ,
/* 08 */ U_JNE,
/* 09 */ U_JLT,
/* 10 */ U_JGT,
/* 11 */ U_JMulti,
/* 12 */ U_Resvd,
/* 13 */ U_Resvd,
/* 14 */ F_iMOV,
/* 15 */ F_iNOT,
/* 16 */ F_iOR,
/* 17 */ F_iAND,
/* 18 */ F_iXOR,
/* 19 */ F_iSHL,
/* 20 */ F_iSHR,
/* 21 */ F_iADD,
/* 22 */ F_iSUB,
/* 23 */ F_iMUL,
/* 24 */ F_iDIV,
/* 25 */ F_iMOD,

/* 26 */ U_Resvd,
/* 27 */ U_Sound,
/* 28 */ U_Msg,
/* 29 */ U_Input,
/* 30 */ U_Sync,
/* 31 */ U_iCoPick,
/* 32 */ U_Resvd,
/* 33 */ U_Resvd,
/* 34 */ U_Resvd,
/* 35 */ U_Resvd,
/* 36 */ U_Resvd,
/* 37 */ U_Resvd,
/* 38 */ U_iScan_VIP,
/* 39 */ U_Resvd,
/* 40 */ U_Resvd,
/* 41 */ U_Resvd,
/* 42 */ U_Resvd,
/* 48 */ U_Resvd,
/* 44 */ U_Resvd,
/* 45 */ U_Resvd,
/* 46 */ U_DEBUG  
];

var S_aFnInstru_Img_2 = [  /* $Tab$ diadic operations on images */
/* 00 */ U_DEBUG,
/* 01 */ U_DEBUG,
/* 02 */ U_DEBUG,
/* 03 */ U_DEBUG,
/* 04 */ U_DEBUG,
/* 05 */ U_DEBUG,
/* 06 */ U_DEBUG,
/* 07 */ U_DEBUG,
/* 08 */ U_DEBUG,
/* 09 */ U_DEBUG,
/* 10 */ U_DEBUG,
/* 11 */ U_DEBUG,
/* 12 */ U_DEBUG,
/* 13 */ U_DEBUG,
/* 14 */ U_DEBUG,
/* 15 */ U_DEBUG,
/* 16 */ U_OR,
/* 17 */ U_AND,
/* 18 */ U_XOR,
/* 19 */ U_SHL,
/* 20 */ U_SHR,
/* 21 */ U_ADD,
/* 22 */ U_SUB,
/* 23 */ U_MUL,
/* 24 */ U_DIV,
/* 25 */ U_MOD,

/* 26 */ U_DEBUG,
/* 27 */ U_DEBUG,
/* 28 */ U_DEBUG,
/* 29 */ U_DEBUG,
/* 30 */ U_DEBUG,
/* 31 */ U_DEBUG,
/* 32 */ U_DEBUG,
/* 33 */ U_DEBUG,
/* 34 */ U_DEBUG,
/* 35 */ U_DEBUG,
/* 36 */ U_DEBUG,
/* 37 */ U_DEBUG,
/* 38 */ U_DEBUG,
/* 39 */ U_DEBUG,
/* 40 */ U_DEBUG,
/* 41 */ U_DEBUG,
/* 42 */ U_DEBUG,
/* 48 */ U_DEBUG,
/* 44 */ U_DEBUG,
/* 45 */ U_DEBUG,
/* 46 */ U_DEBUG 
];

/* G_aConv */
var S_apFConv = [
/*  0 */ U_Copy,
/*  1 */ U_Gray,
/*  2 */ U_InvGray,
/*  3 */ U_InvRGB,
/*  4 */ U_Extr,  /* R */
/*  5 */ U_Extr,  /* G */
/*  6 */ U_Extr,  /* B */
/*  7 */ U_ExtrA,
/*  8 */ U_Extr,  /* H */
/*  9 */ U_Extr,  /* S */
/* 10 */ U_Extr,  /* V */
/* 11 */ U_HSV,
/* 12 */ U_Extr,  /* H */
/* 13 */ U_Extr,  /* L */
/* 14 */ U_Extr,  /* S */
/* 15 */ U_HSL,
/* 16 */ U_ThrLT,
/* 17 */ U_ThrGT,
/* 18 */ U_ThrRange,
/* 19 */ U_Clear
];            

const C_iCard_aFnInstru = S_aFnInstru_Img.length;  /* $Tab$ C_iCard_aFnInstru =  C_JDEBUG +1; */
const C_iCard_apFConv   = S_apFConv.length;        /* $Tab$ C_iCard_apFConv   =  C_JConv_Clear +1; */  

/* ----- Diagnostic Routines ------------------------------------------------ */

/*-----U_Dbg0_VIP() --------------------------------------------------------
*
* $Debug - Automatic monitoring of the VIP 
*/
function U_Dbg0_VIP() {
  var ims_Cur = S_ims_Init;
  S_ims_Init  = $TUISys.ims_Elap();

  U_Dbg_VIP();

  if (S_fDbg_VIP) {
     var iErr = 0;
     S_ims_Elap = S_ims_End - S_ims_Init;
  
     if (S_ims_Elap > G_ims_Periodic) {
        alert("DEBUG\nThe time required for computation (" + S_ims_Elap + ") exceeds cycle time (" + G_ims_Periodic + ".");
        iErr = 1;
     } /* if */
     S_ims_Init = ims_Cur;
     if (S_fRunning_RFE) {
        alert("DEBUG\nPrevious cycle has not been completed\nLine: " + S_jIP_RFE + " Instruction " + S_jIstruCur);
        iErr = 2;
     } /* if */
     if (iErr > 0) {
        var fRepeat = confirm("Wold you like to repeat the last instruction for Debug purposes?" );
        if (!fRepeat) {
           S_jIP_Dbg = 0; /* Restart the cycle from the beginning */
        } /* if */ 
    } /* if */
  } /* if */
} /* U_Dbg0_VIP */

/*-----U_Dbg1_VIP --------------------------------------------------------
*
*/ 
function U_Dbg1_VIP() {
  S_ims_End = $TUISys.ims_Elap();
} /* U_Dbg1_VIP */

/*-----F_szDbgMsg_VIP --------------------------------------------------------
*
*/ 
function F_szDbgMsg_VIP()
{
  var szMsg0 = "\nNumber of VIP errors:" + S_iCntErr;
  var szMsg1 = "";
  if (S_iCntErr > 0) {
     szMsg1 = "\nVIP ErrNum: " + S_iNum_ErrLst + " " + S_szErr_ErrLst + "\n";
  } /* if */
  S_ims_Elap = S_ims_End - S_ims_Init;
  var szMsg2 = "\nDuration of the last cycle: " + S_ims_Elap + " allowed: " + G_ims_Periodic;
  var szMsg3 = "\nLast ScanROI result: " + S_iCnt_ScanROI;
  var szAll  = szMsg0 + szMsg1 + szMsg2 + szMsg3 + "\n";

  S_iCntErr = 0;
  S_iNum_ErrLst  = "";
  S_szErr_ErrLst = "";
  return(szAll);
} /* F_szDbgMsg_VIP */

/* -------------------------------------------------------------------------- */

var S_iCard_aVCode = 0;   /* Length of the program currently selected */
var S_fSync_PrmGet = false;
var S_fSync_PrmSet = true;
var S_fDbg_VIP = true;
var S_jIP_Dbg = 0;
var S_fRunning_RFE = false;
var S_ims_Init = 0;
var S_ims_End = 0;
var S_ims_Elap = 0;
var S_iCntErr = 0;
var S_iNum_ErrLst  = "";
var S_szErr_ErrLst = "";

/*-----U_RFE_Cycle_VIP --------------------------------------------------------
*
* The image processor engine (IPE) implements the read, fetch, execute (RFE) cycle operating on image registers (IRg).
*/
function U_RFE_Cycle_VIP(P_jIP_Start)
{
  var pF;
  var jIstruCur=0;
  var iOp0;
  var iOp1;
  var iOp2;
  var iRes;
  var iFlag;

  S_fDbg_VIP = G_fDbg;
  S_jIP_Dbg  = P_jIP_Start;
  U_Dbg0_VIP();
  S_jIP_RFE = S_jIP_Dbg;

  S_fLoop_RFE = true;
  S_fRunning_RFE = true;
  while (S_fLoop_RFE) {
        if ((S_jIP_RFE < 0) || (S_iCard_aVCode <= S_jIP_RFE)) {
           U_Error_VIP(1, "RFE-1");
           return;
        } /* if */
        S_VCodeCur  = S_paVCode[S_jIP_RFE];
        iFlag = S_VCodeCur[C_JVCode_Flag];
        
        try {       
            if ((iFlag == 0) || (F_iPrmGet_VIP(iFlag) == true) ) {
               S_jIstruCur = S_VCodeCur[C_JVCode_Istru];
               jIstruCur   = S_jIstruCur; /* $Debug */
               if ((S_jIstruCur < 0) || (C_iCard_aFnInstru <= S_jIstruCur)) {
                  U_Error_VIP(2, "RFE-2");
                  return;
               } /* if */
               S_iDst_RFE  = S_VCodeCur[C_JVCode_RgDst];
               S_iSrc1_RFE = S_VCodeCur[C_JVCode_RgSrc1];
               S_iSrc2_RFE = S_VCodeCur[C_JVCode_RgSrc2];
              
               if (S_iDst_RFE < C_JRg0) {
                  /* Generic function */
                  S_pF_RFE = S_aFnInstru_Ari[S_jIstruCur];
                  S_pF_RFE();
               } else if (S_iDst_RFE < C_iBase_JAdr) {
                  /* Image processing instructions */
                  S_pF_RFE = S_aFnInstru_Img[S_jIstruCur];
          
                  if (S_jIstruCur < C_JMOV) {
                     U_Error_VIP(3, "RFE-3");
                     return;
                  } else if (S_jIstruCur <= C_JMOD) {         
                     U_Scan3(S_iDst_RFE, S_iSrc1_RFE, S_iSrc2_RFE, S_pF_RFE, true);
                  } else {
                     S_pF_RFE();
                  } /* if */
               } else {
                  /* Branch and Arithmetic-Logical instructions */
                  S_pF_RFE = S_aFnInstru_Ari[S_jIstruCur];
                     iOp0 = F_iPrmGet_VIP(S_iDst_RFE);
                     iOp1 = F_iPrmGet_VIP(S_iSrc1_RFE);
                     iOp2 = F_iPrmGet_VIP(S_iSrc2_RFE);
                 
                  if ((C_JJEQ <= S_jIstruCur) && (S_jIstruCur < C_JJMulti)) {
                     S_pF_RFE(iOp0, iOp1, S_iSrc2_RFE);
                  } else if (S_jIstruCur <= C_JMOD) {
                     iRes = S_pF_RFE(iOp1, iOp2);
                     U_PrmSet_VIP(S_iDst_RFE, iRes);
                  } else {
                     S_pF_RFE();
                  } /* if */          
               } /* if */
            } /* if */
        } catch (P_szErr) {
        } /* Try */        
        S_jIP_RFE++;
  } /* while */
  U_Dbg1_VIP();

  S_fRunning_RFE = false;
} /* U_RFE_Cycle_VIP */

/*-----F_iPrmGet_VIP --------------------------------------------------------
* 
* Get parameter value from the array G_aRcdPrm[]
* NOTE:
* because HTML associates a different variable to each input control, we may have many different variables (or element id) linked to the same parameter.
* Ideally all the variable linked to a parameter should have the same value, but occasionally is possible the one of the variable be out of sync.
* To avoid misunderstanding we assume that the official value of the parameter is the one stored in the corresponding cell of the array G_aRcdPrm[]. 
*/
function F_iPrmGet_VIP(P_iNum)
{
  var RecPrm0;
  var iVal = 0;
  var szTmp;
  
  if ((-32768 <= P_iNum) && (P_iNum <= 32767)) {
     return(P_iNum);
  } /* if */
  if ((C_JRg0 <= P_iNum) && (P_iNum < C_JRgToA)) {
     return(C_Illegal);
  } /* if */
  if ((C_iBase_JAdr <= P_iNum) && (P_iNum < G_iToA_Var)) {
     var ijAdr = (P_iNum - C_iBase_JAdr);
     RecPrm0 = G_aRcdPrm[ijAdr];
     iVal = RecPrm0[C_JRecPrm_iVal];
     if (S_fSync_PrmGet) {
        szTmp = RecPrm0[C_JRecPrm_szNm] + "=" + P_iNum;
        eval(szTmp);
     } /* if */
     return(iVal);
  } else {
     U_Error_VIP(4, "F_iPrmGet_VIP");
  } /* if */
  return(iVal);
} /* F_iPrmGet_VIP */

/*-----U_PrmSet_VIP --------------------------------------------------------
*
*  Set parameter value and store it in the array G_aRcdPrm[]
*/ 
function U_PrmSet_VIP(P_ijAdr, P_iVal)
{
  var RecPrm0;
  var iVal = 0;
  var szTmp;
  
  if ((C_iBase_JAdr <= P_ijAdr) && (P_ijAdr < G_iToA_Var)) {
     var ijAdr = (P_ijAdr - C_iBase_JAdr);
     RecPrm0 = G_aRcdPrm[ijAdr];
     RecPrm0[C_JRecPrm_iVal] = P_iVal;
     if (S_fSync_PrmSet) {
        szTmp = RecPrm0[C_JRecPrm_szNm] + "=" + P_iVal;
        eval(szTmp);
     } /* if */
  } else {
     U_Error_VIP(5, "U_PrmSet_VIP");
  } /* if */
} /* U_PrmSet_VIP */

/*-----U_Run --------------------------------------------------------
*
*/ 
function U_Run(P_aVCode)
{
  S_paVCode = S_aVCode_User2_Custom;
  S_iCard_aVCode = S_paVCode.length;
  U_RFE_Cycle_VIP(0);  
} /* U_Run */
  
/*-----F_iNum_Ope_Get --------------------------------------------------------
*
*/ 
function F_iNum_Ope_Get(P_jOpe)
{
  var iVal = S_VCodeCur[P_jOpe];
  return(iVal);  
} /* F_iNum_Ope_Get */

/*-----F_pCanvas_Chk --------------------------------------------------------
*
*/ 
function F_pCanvas_Chk(P_JRg, P_fErr)
{
  var pCanvas = null;
  var j = 0;
  if ((C_JRg0 <= P_JRg) && (P_JRg < C_JRgToA)) {
     j = (P_JRg - C_JRg0);
     pCanvas = G_aCanvas[j];
  }
  else {
     if (P_fErr) {
        U_Error_VIP(6, "P_JRg");
     } /* if */
  } /* if */
  return(pCanvas);
} /* F_pCanvas_Chk */

/*-----U_NOP --------------------------------------------------------
*
* No Operation
*/ 
function U_NOP()
{
} /* U_NOP */

/*-----U_HALT --------------------------------------------------------
*
* Stop image processing
*/ 
function U_HALT()
{ 
  S_fLoop_RFE = false;
} /* U_HALT */

/*-----U_InitErr --------------------------------------------------------
*
* Reset Error flags
*/
function U_InitErr()
{
} /* U_InitErr */

/*-----U_InitVAR --------------------------------------------------------
*
* Initialize Program Variables 
*/
function U_InitVAR()
{
  U_InitVAR_Custom();
} /* U_InitVAR */

/*-----U_CALL --------------------------------------------------------
*
* Call subroutine 
*/
function U_CALL()
{
  if (0 < S_jStk) {
       S_aiStk[--S_jStk] = S_jIP_RFE; 
  }
  else {
      U_Error_VIP(7, "stack overflow"); 
      S_fLoop_RFE = false;
  } /* if */
  S_jIP_RFE = F_iNum_Ope_Get(C_JVCode_RgDst) -1;
} /* U_CALL */

/*-----U_RET --------------------------------------------------------
*
* Subroutine return 
*/
function U_RET()
{
  if (S_jStk < C_iCard_aiStk) {
       S_jIP_RFE = S_aiStk[S_jStk++]; -1; 
  }
  else {
      /* stack underflow */
      S_fLoop_RFE = false;
  } /* if */
} /* U_RET */

/*-----U_JMP --------------------------------------------------------
*
* Unconditional Jump 
*/
function U_JMP()
{
  S_jIP_RFE = F_iNum_Ope_Get(C_JVCode_RgDst) -1;  
} /* U_JMP */

/*-----U_JEQ --------------------------------------------------------
*
* Jump if Equal 
*/
function U_JEQ(P_iOp0, P_iOp1, P_iOp2)
{  
  if (P_iOp0 == P_iOp1) {
     S_jIP_RFE = P_iOp2 -1;
  } /* if */ 
} /* U_JEQ */

/*-----U_JNE --------------------------------------------------------
*
* Jump if NOT Equal 
*/
function U_JNE(P_iOp0, P_iOp1, P_iOp2)
{  
  if (P_iOp0 != P_iOp1) {
     S_jIP_RFE = P_iOp2 -1;
  } /* if */ 
} /* U_JNE */

/*-----U_JLT --------------------------------------------------------
*
* Jump if Less Than 
*/
function U_JLT(P_iOp0, P_iOp1, P_iOp2)
{  
  if (P_iOp0 <= P_iOp1) {
     S_jIP_RFE = P_iOp2 -1;
  } /* if */ 
} /* U_JLT */

/*-----U_JGT --------------------------------------------------------
*
* Jump if Greater Than 
*/
function U_JGT(P_iOp0, P_iOp1, P_iOp2)
{  
  if (P_iOp0 >= P_iOp1) {
     S_jIP_RFE = P_iOp2 -1;
  } /* if */ 
} /* U_JGT */

/*-----U_JMulti --------------------------------------------------------
*
* Multiple Jump 
*/
function U_JMulti(P_iOp0, P_iOp1, P_iOp2)
{
  var iVal    = P_iOp0;  
  var iNnCase = P_iOp1;

  if ((0 <= iVal) && (iVal < iNNCase)) {
     S_jIP_RFE += iVal -1;
  }
  else {
     S_jIP_RFE += iNnCase -1;
  } /* if */ 
} /* U_JMulti */

/*-----U_Msg --------------------------------------------------------
*
* Show a Message on the screen 
*/
function U_Msg()
{
  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iSrc2 = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  U_Msg_Custom(iDst, iSrc1, iSrc2);
} /* U_Msg */

/*-----U_Input --------------------------------------------------------
*
* Get Input 
*/
function U_Input()
{
  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);    /* Current value of the selected parameter */
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iSrc2 = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  var iRes = F_iInput_Custom(iDst, iSrc1, iSrc2);
  U_PrmSet_VIP(S_iDst_RFE, iRes);
} /* U_Input */

/*-----U_Sync --------------------------------------------------------
*
* Sync with external device and/or applications 
*/
function U_Sync()
{
  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iSrc2 = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  U_Sync_Custom(iDst, iSrc1, iSrc2);
} /* U_Sync */

/*-----U_Grab_VIP --------------------------------------------------------
*
*/
function U_Grab_VIP()
{
  var iVal = F_iPrmGet_VIP(S_iSrc1_RFE);
  U_Grab(S_iDst_RFE, iVal);
} /* U_Grab_VIP */

/* Grab Image */

/*-----U_Grab --------------------------------------------------------
*
* $NOTE vedi $Camera.U_TakePhoto() 
*/
function U_Grab(P_JRg, P_jConv=0)
{
  var jRg = (P_jConv == 0)? P_JRg: C_JRgTmp; 
  var CanvasDst = F_pCanvas_Chk(jRg, true);
  var ctx;
      
  CanvasDst.width  = Id_Video.videoWidth;
  CanvasDst.height = Id_Video.videoHeight;
  ctx = CanvasDst.getContext('2d');
  ctx.drawImage(Id_Video, 0, 0);
  
  if (P_jConv != 0) {  
     U_Conv(P_JRg, C_JRgTmp, P_jConv);
  } /* if */
} /* U_Grab */

function U_Cross(P_ctx, P_x, P_y)
{
  P_ctx.strokeStyle = "#ff0000";
  P_ctx.moveTo(P_x, 0);
  P_ctx.lineTo(P_x, G_iHgt_Canvas -1);
  P_ctx.moveTo(0, P_y);
  P_ctx.lineTo(G_iWdt_Canvas -1, P_y);
  P_ctx.stroke();
} /* U_Cross */

function U_Rect(P_ctx, P_x, P_y, P_iWdt, P_iHgt, P_szRGB)
{
  P_ctx.fillStyle = P_szRGB;
  P_ctx.strokeStyle = P_szRGB;
  P_ctx.fillRect(P_x, P_y, P_iWdt, P_iHgt);
} /* U_Rect */

function U_Polygon(P_ctx, P_xC, P_yC, P_iR, P_rCoefR1, P_iNnVtx, P_szRGB)
{
  var x0, y0, x1, y1, i;
  var iNnStep = (2 * P_iNnVtx);
  var rAlpha  = Math.PI / P_iNnVtx;
  var rInc    = rAlpha;
  var rR0 = P_iR;
  var rR1 = P_iR * P_rCoefR1;
  var rR;
  P_ctx.fillStyle = P_szRGB;
  P_ctx.strokeStyle = P_szRGB;

  P_ctx.beginPath();
  x0 = rR0 * Math.cos(rAlpha);
  y0 = rR0 * Math.sin(rAlpha);
  P_ctx.moveTo(x0 + P_xC, y0 + P_yC);
  x1 = x0;
  y1 = y0;
  
  for (i = 1; i < iNnStep; i++) {
      rAlpha += rInc;
      rR = (i & 1)? rR1: rR0;
      x1 = rR * Math.cos(rAlpha);
      y1 = rR * Math.sin(rAlpha);
      P_ctx.lineTo(x1 + P_xC, y1 + P_yC);
  } /* for */
  P_ctx.closePath();
  P_ctx.fill();
  P_ctx.stroke();
      
//  P_ctx.lineTo(P_xC, P_yC);
 // P_ctx.stroke();
//  P_ctx.moveTo(P_xC, P_yC);
} /* U_Polygon */

/* Show marks on the current image */
function U_Mark()
{ 
  function U_DrawROI(P_ctx, P_x0, P_y0, P_x1, P_y1)
  {
    P_ctx.strokeStyle = "#00ff00";
    P_ctx.moveTo(P_x0, P_y0);
    P_ctx.lineTo(P_x1, P_y0);
    P_ctx.lineTo(P_x1, P_y1);
    P_ctx.lineTo(P_x0, P_y1);
    P_ctx.lineTo(P_x0, P_y0);
    P_ctx.stroke();
  } /* U_DrawROI */

  /* ----- */
  
  var CanvasSrc = F_pCanvas_Chk(S_iSrc1_RFE, true);
  var CanvasDst = F_pCanvas_Chk(S_iDst_RFE, true);

  ctxSrc = CanvasSrc.getContext('2d');
  ctxDst = CanvasDst.getContext('2d');
//  ctx.drawImage(Id_Video, 0, 0);  
  CanvasDst.width  = CanvasSrc.width;
	CanvasDst.height = CanvasSrc.height;
   
  G_iWdt_Canvas = CanvasDst.width;
  G_iHgt_Canvas = CanvasDst.height;
  G_iWdtDiv2_Canvas = G_iWdt_Canvas / 2;
  G_iHgtDiv2_Canvas = G_iHgt_Canvas / 2;
  
  // alert("Mark " + G_iWdt_Canvas + " " + G_iHgt_Canvas);  

  if (G_fViewFinder) {
     if (G_xViewFinder < 0) {G_xViewFinder = G_iWdtDiv2_Canvas};
     if (G_yViewFinder < 0) {G_yViewFinder = G_iHgtDiv2_Canvas};
     U_Cross(ctxSrc, G_xViewFinder, G_yViewFinder);
  } /* if */
  if (G_fROI) {
    U_DrawROI(ctxSrc, G_xLft_ROI, G_yUp_ROI, G_xLft_ROI + G_iWdt_ROI, G_yUp_ROI + G_iHgt_ROI);
  } /* if */
} /* U_Mark */

/* Copy the selected image in another register */
function U_MOV()
{
  var CanvasDst = F_pCanvas_Chk(S_iDst_RFE, true);
  var CanvasSrc = F_pCanvas_Chk(S_iSrc1_RFE, true);
  var ctxSrc;
  var ctxDst;
  var imageDataSrc;
  var dataSrc;

  ctxSrc = CanvasSrc.getContext('2d');
  imageDataSrc = ctxSrc.getImageData(0, 0, CanvasSrc.width, CanvasSrc.height);
  dataSrc = imageDataSrc.data;
  ctxDst = CanvasDst.getContext('2d');
  CanvasDst.width  = CanvasSrc.width;
  CanvasDst.height = CanvasSrc.height;
    
  ctxDst.putImageData(imageDataSrc, 0, 0, 0, 0, CanvasSrc.width, CanvasSrc.height);
} /* U_MOV */

/* --------------------------------- */

function U_Copy(P_dataSrc, P_i)
{
} /* U_Copy */

function U_Gray(P_dataSrc, P_i)
{
  var iTmp;
  var i = P_i;
  iTmp  = P_dataSrc[i];
  iTmp += P_dataSrc[i + 1];
  iTmp += P_dataSrc[i + 2];
  iTmp /= 3;
  P_dataSrc[i]     = iTmp;
  P_dataSrc[i + 1] = iTmp;
  P_dataSrc[i + 2] = iTmp;   
  P_dataSrc[i + 3] = 255;
} /* U_Gray */

function U_InvRGB(P_dataSrc, P_i)
{
  var i = P_i;
  P_dataSrc[i++] = 255 - P_dataSrc[i];
  P_dataSrc[i++] = 255 - P_dataSrc[i];
  P_dataSrc[i++] = 255 - P_dataSrc[i];
  P_dataSrc[i]   = 255;
} /* U_InvRGB */

function U_InvGray(P_dataSrc, P_i)
{
  var iTmp;
  var i = P_i;
  iTmp  = P_dataSrc[i++];
  iTmp += P_dataSrc[i++];
  iTmp += P_dataSrc[i];
  iTmp = 255 - (iTmp/3);
  i = P_i;
  P_dataSrc[i++] = iTmp;
  P_dataSrc[i++] = iTmp;
  P_dataSrc[i++] = iTmp;   
  P_dataSrc[i]   = 255;
} /* U_InvGray */

function U_Extr(P_dataSrc, P_i)
{
  var j = P_i + G_iOff_Extr;
  var iCmp = P_dataSrc[j];
  var i = P_i;

  if (G_fGray_VIP) {
      P_dataSrc[i++] = 0;
      P_dataSrc[i++] = 0;
      P_dataSrc[i++] = 0;   
      P_dataSrc[i]   = 255;   
      P_dataSrc[j]   = iCmp; 
  } else {
      P_dataSrc[i++] = iCmp;
      P_dataSrc[i++] = iCmp;
      P_dataSrc[i++] = iCmp;   
      P_dataSrc[i]   = 255;
  } /* if */  
} /* U_Extr */

function U_ExtrA(P_dataSrc, P_i)
{
  var iTmp = P_dataSrc[P_i + 3];
  var i = P_i;
  
  P_dataSrc[i++] = iTmp;
  P_dataSrc[i++] = iTmp;
  P_dataSrc[i++] = iTmp;   
  P_dataSrc[i]   = 255;   
} /* U_ExtrA */

function M_Min3(P_0, P_1, P_2)
{
 return((P_0 < P_1)? ((P_0 < P_2)? P_0: P_2) : ((P_1 < P_2)? P_1: P_2));
} /* M_Min3 */

function M_Max3(P_0, P_1, P_2)
{
 return((P_0 > P_1)? ((P_0 > P_2)? P_0: P_2) : ((P_1 > P_2)? P_1: P_2));
} /* M_Max3 */

function U_HSV(P_dataSrc, P_i)
{
  var i = P_i;
  var iR = P_dataSrc[i++];
  var iG = P_dataSrc[i++];
  var iB = P_dataSrc[i];
  var iMax, iMin, iDiv, iAdd, iDif;
  var iRD, iGD, iBD;
  var iH, iS, iV;
  
  iMin = M_Min3(iR, iG, iB);
  iMax = M_Max3(iR, iG, iB);
  iDif = iMax - iMin;
  iAdd = (iMax + iMin);
  if (iDif > 0) {
     iRD = (iMax - iR);
     iGD = (iMax - iG);
     iBD = (iMax - iB);
     
     if (iMax == iR) {
        iH = (85 * (iBD - iGD)) / iDif;
     }
     else if (iMax == iG) {
        iH = ((85 * (iRD - iBD)) / iDif) + 85;
     }
     else {
        iH = (((85 * (iGD - iRD)) / iDif)) + 170;
     } /* if */

     iV = iMax;
     iS = (iDif << 8) / iMax;
  }
  else {
     iH = 0;
     iS = 0;
     iV = iMax;
  } /* if */

  i = P_i;
  P_dataSrc[i++] = iH;
  P_dataSrc[i++] = iS;
  P_dataSrc[i++] = iV;
  P_dataSrc[i]   = 255;
  
  if (G_fExtr) {
     U_Extr(P_dataSrc, P_i);
  } /* if */
} /* U_HSV */

function U_HSL(P_dataSrc, P_i)
{
  var i = P_i;
  var iR = P_dataSrc[i++];
  var iG = P_dataSrc[i++];
  var iB = P_dataSrc[i];
  var iMax, iMin, iDiv, iAdd, iDif;
  var iRD, iGD, iBD;
  var iH, iS, iL;
  
  iMin = M_Min3(iR, iG, iB);
  iMax = M_Max3(iR, iG, iB);
  iDif = iMax - iMin;
  iAdd = (iMax + iMin);
  if (iDif > 0) {
     iRD = (iMax - iR);
     iGD = (iMax - iG);
     iBD = (iMax - iB);
     
     if (iMax == iR) {
        iH = (85 * (iBD - iGD)) / iDif;
     }
     else if (iMax == iG) {
        iH = ((85 * (iRD - iBD)) / iDif) + 85;
     }
     else {
        iH = ((85 * (iGD - iRD)) / iDif) + 170;
     } /* if */

     iL = iAdd / 2;
     iS = (iL <= 128)? (iDif << 8) / iAdd: (iDif << 8) / (511 - iAdd);
     if (iS > 255) {
        iS = 255;
     } /* if */
     if (iS < 0) {
        iS = 0;
     } /* if */
  }
  else {
     iH = 0;
     iL = iAdd / 2;
     iS = 0;
  } /* if */
                
  i = P_i;
  P_dataSrc[i++] = iH;
  P_dataSrc[i++] = iS;
  P_dataSrc[i++] = iL;
  P_dataSrc[i]   = 255;

  if (G_fExtr) {
     U_Extr(P_dataSrc, P_i);
  } /* if */
} /* U_HSL */

function U_Clear(P_dataSrc, P_i)
{
  var i = P_i;
  
  if (G_fGray_VIP) {
      P_dataSrc[i] = G_iCoR_Default;
      /* Other PSC don't care */
  } else {
      P_dataSrc[i++] = G_iCoR_Default;
      P_dataSrc[i++] = G_iCoG_Default;
      P_dataSrc[i++] = G_iCoB_Default;   
      P_dataSrc[i]   = G_iCoA_Default;
  } /* if */  
} /* U_Clear */

function U_ThrLT(P_dataSrc, P_iJ)
{
  var i     = P_iJ;
  var ByTmp = P_dataSrc[P_iJ + G_iOff_Extr];      /* WARNING: we sum (P_iJ + G_iOff_Extr) for efficiency  assuming that only one of the two values can be NOT zero! */
  var fLT = (ByTmp < G_ByThrMax);

  if (G_fGray_VIP) {
      P_dataSrc[i] = (fLT)? G_iCoR_True: G_iCoR_False;
      /* Other PSC don't care */
  } else {
      if (fLT) {
         P_dataSrc[i++] = G_iCoR_True;
         P_dataSrc[i++] = G_iCoG_True;
         P_dataSrc[i++] = G_iCoB_True;   
         P_dataSrc[i]   = G_iCoA_True;
      }
      else  {
         P_dataSrc[i++] = G_iCoR_False;
         P_dataSrc[i++] = G_iCoG_False;
         P_dataSrc[i++] = G_iCoB_False;   
         P_dataSrc[i]   = G_iCoA_False;
      } /* if */
  } /* if */  
} /* U_ThrLT */

function U_ThrGT(P_dataSrc, P_iJ)
{
  var i     = P_iJ;
  var ByTmp = P_dataSrc[P_iJ + G_iOff_Extr];      /* WARNING: we sum (P_iJ + G_iOff_Extr) for efficiency  assuming that only one of the two values can be NOT zero! */
  var fGT = (G_ByThrMin < ByTmp);
  
  if (G_fGray_VIP) {
      P_dataSrc[i] = (fGT)? G_iCoR_True: G_iCoR_False;
      /* Other PSC don't care */
  } else {
      if (fGT) {
         P_dataSrc[i++] = G_iCoR_True;
         P_dataSrc[i++] = G_iCoG_True;
         P_dataSrc[i++] = G_iCoB_True;   
         P_dataSrc[i]   = G_iCoA_True;
      }
      else  {
         P_dataSrc[i++] = G_iCoR_False;
         P_dataSrc[i++] = G_iCoG_False;
         P_dataSrc[i++] = G_iCoB_False;   
         P_dataSrc[i]   = G_iCoA_False;
      } /* if */
  } /* if */   
} /* U_ThrGT */

function U_ThrRange(P_dataSrc, P_iJ)
{
  var i     = P_iJ;
  var ByTmp = P_dataSrc[P_iJ + G_iOff_Extr];      /* WARNING: we sum (P_iJ + G_iOff_Extr) for efficiency  assuming that only one of the two values can be NOT zero! */
  var fRange = ((G_ByThrMin < ByTmp) && (ByTmp < G_ByThrMax));
    
  if (G_fGray_VIP) {
      P_dataSrc[i] = (fRange)? G_iCoR_True: G_iCoR_False;
      /* Other PSC don't care */
  } else {
      if (fRange) {
         P_dataSrc[i++] = G_iCoR_True;
         P_dataSrc[i++] = G_iCoG_True;
         P_dataSrc[i++] = G_iCoB_True;   
         P_dataSrc[i]   = G_iCoA_True;
      }
      else  {
         P_dataSrc[i++] = G_iCoR_False;
         P_dataSrc[i++] = G_iCoG_False;
         P_dataSrc[i++] = G_iCoB_False;   
         P_dataSrc[i]   = G_iCoA_False;
      } /* if */
  } /* if */  
} /* U_ThrRange */

/* --------------------------------- */

function U_Conv_VIP()
{
  var JConv = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  U_Conv(S_iDst_RFE, S_iSrc1_RFE, JConv);
} /* U_Conv_VIP */

/* Pixels conversion */
function U_Conv(P_JRg_Dst, P_JRg_Src1, P_JConv)
{
  var CanvasDst = F_pCanvas_Chk(P_JRg_Dst, true);
  var CanvasSrc = F_pCanvas_Chk(P_JRg_Src1, true);
  var JConv = P_JConv;
  var pF;
  var ctxSrc;
  var ctxDst;
  var imageDataSrc;
  var dataSrc;
  var i;

  if (JConv < 0) {
     JConv = G_JConv;
  } /* if */
  if (JConv < C_iCard_apFConv) {
     pF = S_apFConv[JConv];
  }
  else {
     U_Error_VIP(8, "JConv");
     return;
  } /* if */
  if (pF == U_Extr) {
    if ((8 <= JConv) && (JConv <= 10)) {
       G_fExtr = true;
       pF = U_HSV;
    } /* if */
    if ((12 <= JConv) && (JConv <= 14)) {
       G_fExtr = true;
       pF = U_HSL;
    } /* if */
    G_iOff_Extr = JConv & 0x03;
  } /* if */
   
  ctxSrc = CanvasSrc.getContext('2d');
  imageDataSrc = ctxSrc.getImageData(0, 0, CanvasSrc.width, CanvasSrc.height);
  dataSrc = imageDataSrc.data;
  ctxDst = CanvasDst.getContext('2d');
  CanvasDst.width  = CanvasSrc.width;
  CanvasDst.height = CanvasSrc.height;
  
  for (i = 0; i < dataSrc.length; i += C_iSizePxl) {
      pF(dataSrc, i);
  } /* for */
    
  ctxDst.putImageData(imageDataSrc, 0, 0, 0, 0, CanvasDst.width, CanvasDst.height);
  G_fExtr = false;
} /* U_Conv */


function F_iMOV(P_iSrc1, P_iSrc2) {return(P_iSrc1)} /* xx */
function F_iNOT(P_iSrc1, P_iSrc2) {return(~P_iSrc1)} /* xx */
function F_iOR(P_iSrc1, P_iSrc2)  {return(P_iSrc1 | P_iSrc2)} /* xx */
function F_iAND(P_iSrc1, P_iSrc2) {return(P_iSrc1 & P_iSrc2)} /* xx */
function F_iXOR(P_iSrc1, P_iSrc2) {return(P_iSrc1 ^ P_iSrc2)} /* xx */
function F_iSHL(P_iSrc1, P_iSrc2) {return(P_iSrc1 << P_iSrc2)} /* xx */
function F_iSHR(P_iSrc1, P_iSrc2) {return(P_iSrc1 >> P_iSrc2)} /* xx */

function F_iShift(P_iSrc1, P_iSrc2) {
  var iRes;
  if (P_iSrc2 > 0) {
     iRes = P_iSrc1 << P_iSrc2;
  } else {
     iRes = P_iSrc1 >> P_iSrc2;
  } /* if */
  return(iRes);
} /* F_iShift */

function F_iADD(P_iSrc1, P_iSrc2) {return(P_iSrc1 + P_iSrc2)} /* xx */
function F_iSUB(P_iSrc1, P_iSrc2) {return(P_iSrc1 - P_iSrc2)} /* xx */
function F_iMUL(P_iSrc1, P_iSrc2) {return(P_iSrc1 * P_iSrc2)} /* xx */

function F_iDIV(P_iSrc1, P_iSrc2) {
  var iRes = 0;
  if (P_iSrc2 != 0) {
     iRes = P_iSrc1 / P_iSrc2;
  } else {
    U_Error_VIP(9, "Division by zero");
  } /* if */
  return(iRes);
} /* F_iDIV */

function F_iMOD(P_iSrc1, P_iSrc2) {
  var iRes = 0;
  if (P_iSrc2 != 0) {
     iRes = P_iSrc1 % P_iSrc2;
  } else {
    U_Error_VIP(10, "Division by zero");
  } /* if */
  return(iRes);
} /* F_iMOD */

function U_NOT(P_dataDst, P_dataSrc1, P_iTmp, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = ~P_dataSrc1[k];
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = ~P_dataSrc1[k];
        P_dataDst[j++] = iVal;         
        iVal = ~P_dataSrc1[k];
        P_dataDst[j++] = iVal;         
        iVal = ~P_dataSrc1[k];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_NOT */

function U_OR(P_dataDst, P_dataSrc1, P_dataSrc2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] | P_dataSrc2[k];
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] | P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] | P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] | P_dataSrc2[j];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_OR */

function U_AND(P_dataDst, P_dataSrc1, P_dataSrc2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] & P_dataSrc2[k];
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] & P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] & P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] & P_dataSrc2[j];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_AND */

function U_XOR(P_dataDst, P_dataSrc1, P_dataSrc2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] ^ P_dataSrc2[k];
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] ^ P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] ^ P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] ^ P_dataSrc2[j];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_XOR */

function U_SHL(P_dataDst, P_dataSrc1, P_iShf, P_iSize)
{
  /* NOT defined! */
} /* U_SHL */

function U_SHR(P_dataDst, P_dataSrc1, P_iShf, P_iSize)
{
  /* NOT defined! */
} /* U_SHR */

function U_ADD(P_dataDst, P_dataSrc1, P_dataSrc2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] + P_dataSrc2[k];
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] + P_dataSrc2[j];
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] + P_dataSrc2[j];
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] + P_dataSrc2[j];
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_ADD */

function U_SUB(P_dataDst, P_dataSrc1, P_dataSrc2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] - P_dataSrc2[k];
        if (iVal < 0) {
           iVal = 0;
        } /* if */
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] - P_dataSrc2[j];
        if (iVal < 0) {
           iVal = 0;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] - P_dataSrc2[j];
        if (iVal < 0) {
           iVal = 0;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] - P_dataSrc2[j];
        if (iVal < 0) {
           iVal = 0;
        } /* if */
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_SUB */

function U_MUL(P_dataDst, P_dataSrc1, P_dataSrc2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] * P_dataSrc2[k];
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] * P_dataSrc2[j];
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] * P_dataSrc2[j];
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] * P_dataSrc2[j];
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_MUL */

/*
* WARNING: programmer may assure that divisors are NOT zero!
*/
function U_DIV(P_dataDst, P_dataSrc1, P_dataSrc2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] / P_dataSrc2[k];
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] / P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] / P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] / P_dataSrc2[j];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_DIV */

/*
* WARNING: programmer may assure that divisors are NOT zero!
*/
function U_MOD(P_dataDst, P_dataSrc1, P_dataSrc2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] % P_dataSrc2[k];
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] % P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] % P_dataSrc2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] % P_dataSrc2[j];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_MOD */

function U_OR_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] | P_iOpe2;
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] | P_iOpe2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] | P_iOpe2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] | P_iOpe2[j];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_OR_2 */

function U_AND_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] & P_iOpe2;
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] & P_iOpe2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] & P_iOpe2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] & P_iOpe2[j];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_AND_2 */

function U_Shift_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;
  var iShf = P_iOpe2;

  if (P_iOpe2 > 0) {
     if (G_fGray_VIP) {
        for (i = 0; i < P_iSize; i += C_iSizePxl) {
           k = (i + G_iOff_Extr);
           j = i;
           iVal = P_dataSrc1[k] << iShf;
           P_dataDst[j] = iVal; j++;  
           P_dataDst[j] = iVal; j++;
           P_dataDst[j] = iVal; j++;
           P_dataDst[j] = 255;
        } /* for */
     } else {
       for (i = 0; i < P_iSize; i += C_iSizePxl) {
           j = i;
           iVal = P_dataSrc1[k] << iShf;
           P_dataDst[j++] = iVal;         
           iVal = P_dataSrc1[k] << iShf;
           P_dataDst[j++] = iVal;         
           iVal = P_dataSrc1[k] << iShf;
           P_dataDst[j++] = iVal;
           P_dataDst[j] = 255;  
       } /* for */
    } /* if */
  } else {
      iShf = -P_iOpe2;
      if (G_fGray_VIP) {
       for (i = 0; i < P_iSize; i += C_iSizePxl) {
          k = (i + G_iOff_Extr);
          j = i;
          iVal = P_dataSrc1[k] >> iShf;
          P_dataDst[j] = iVal; j++;  
          P_dataDst[j] = iVal; j++;
          P_dataDst[j] = iVal; j++;
          P_dataDst[j] = 255;
       } /* for */
    } else {
      for (i = 0; i < P_iSize; i += C_iSizePxl) {
          j = i;
          iVal = P_dataSrc1[k] >> iShf;
          P_dataDst[j++] = iVal;         
          iVal = P_dataSrc1[k] >> iShf;
          P_dataDst[j++] = iVal;         
          iVal = P_dataSrc1[k] >> iShf;
          P_dataDst[j++] = iVal;
          P_dataDst[j] = 255;  
      } /* for */
    } /* if */
  } /* if */
} /* U_Shift_2 */

function U_XOR_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] ^ P_iOpe2;
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] ^ P_iOpe2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] ^ P_iOpe2[j];
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] ^ P_iOpe2[j];
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_XOR_2 */

function U_ADD_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] + P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] + P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] + P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] + P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_ADD_2 */

function U_SUB_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] - P_iOpe2;
        if (iVal < 0) {
           iVal = 0;
        } /* if */
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[j] - P_iOpe2[j];
        if (iVal < 0) {
           iVal = 0;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] - P_iOpe2[j];
        if (iVal < 0) {
           iVal = 0;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[j] - P_iOpe2[j];
        if (iVal < 0) {
           iVal = 0;
        } /* if */
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_SUB_2 */

function U_MUL_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] * P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[k] * P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[k] * P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[k] * P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_MUL_2 */

function U_DIV_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (P_iOpe2 === 0) {
     U_Error_VIP(11, "Division by zero");
     return;
  } /* if */ 
  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] / P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[k] / P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[k] / P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[k] / P_iOpe2;
        if (255 < iVal) {
           iVal = 255;
        } /* if */
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_DIV_2 */

function U_MOD_2(P_dataDst, P_dataSrc1, P_iOpe2, P_iSize)
{
  var i, j, k;
  var iVal;

  if (P_iOpe2 === 0) {
     U_Error_VIP(12, "Division by zero");
     return;
  } /* if */ 
  if (G_fGray_VIP) {
     for (i = 0; i < P_iSize; i += C_iSizePxl) {
        k = (i + G_iOff_Extr);
        j = i;
        iVal = P_dataSrc1[k] % P_iOpe2;
        P_dataDst[j] = iVal; j++;  
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = iVal; j++;
        P_dataDst[j] = 255;
     } /* for */
  } else {
    for (i = 0; i < P_iSize; i += C_iSizePxl) {
        j = i;
        iVal = P_dataSrc1[k] % P_iOpe2;
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[k] % P_iOpe2;
        P_dataDst[j++] = iVal;         
        iVal = P_dataSrc1[k] % P_iOpe2;
        P_dataDst[j++] = iVal;
        P_dataDst[j] = 255;  
    } /* for */
  } /* if */
} /* U_MOD_2 */

function U_Scan3(P_ijDst, P_ijSrc1, P_ijSrc2, P_pF, P_fdata)
{
  var iTmp;
  var CanvasDst;
  var CanvasSrc1;
  var CanvasSrc2;
  var ctxDst;
  var ctxSrc1;
  var ctxSrc2;
  var imageDataDst;
  var imageDataSrc1;
  var imageDataSrc2;
  var dataDst;
  var dataSrc1;
  var dataSrc2;
  var iSize;

  CanvasDst  = F_pCanvas_Chk(P_ijDst,  true);
  CanvasSrc1 = F_pCanvas_Chk(P_ijSrc1, true); 
  CanvasSrc2 = F_pCanvas_Chk(P_ijSrc2, false);

  ctxDst = CanvasDst.getContext('2d');
  
  if (CanvasSrc1 != null) {
     if ((CanvasSrc1.width <= 0) || (CanvasSrc1.height <= 0))  {
         alert("U_Scan3(Src1); " + P_ijSrc1 + " - " + CanvasSrc1.width + " " + CanvasSrc1.height);
       return;
     } /* if */
     ctxSrc1 = CanvasSrc1.getContext('2d');
     imageDataSrc1 = ctxSrc1.getImageData(0, 0, CanvasSrc1.width, CanvasSrc1.height);
     dataSrc1 = imageDataSrc1.data;    

     imageDataDst = ctxDst.createImageData(CanvasSrc1.width, CanvasSrc1.height);
  } /* if */

  dataDst = imageDataDst.data;
  CanvasDst.width  = imageDataDst.width;
	CanvasDst.height = imageDataDst.height;
  iSize = dataSrc1.length;

  if (CanvasSrc2 !== null) {
     if ((CanvasSrc2.width <= 0) || (CanvasSrc2.height <= 0))  {
         alert("U_Scan3(Src2); " + P_ijSrc2 + " - " + CanvasSrc2.width + " " + CanvasSrc2.height);
       return;
     } /* if */
     ctxSrc2 = CanvasSrc2.getContext('2d');
     imageDataSrc2 = ctxSrc2.getImageData(0, 0, CanvasSrc2.width, CanvasSrc2.height);
     dataSrc2 = imageDataSrc2.data;    
     if (P_fdata) {
        P_pF(dataDst, dataSrc1, dataSrc2, iSize);
     } else {
        P_pF(imageDataDst, imageDataSrc1, imageDataSrc2);
     } /* if */
  } else {
     P_pF = S_aFnInstru_Img_2[S_jIstruCur];
     P_pF(dataDst, dataSrc1, P_ijSrc2, iSize);
  } /* if */

  ctxDst.putImageData(imageDataDst, 0, 0, 0, 0, imageDataDst.width, imageDataDst.height);
} /* U_Scan3 */

function U_Change_VIP()
{
  U_Change(S_iDst_RFE, S_iSrc1_RFE, S_iSrc2_RFE);
} /* U_Change_VIP */

var S_ims_Change = -100000;

function U_Change(P_JRg_Dst, P_JRg_Src1, P_JRg_Src2)
{
  var ims_Cur = $TUISys.ims_Elap();
  
  if ((ims_Cur - S_ims_Change) > G_ims_Upd_Change) {
     U_Grab(P_JRg_Src2, G_JConv_Change);
     S_ims_Change = ims_Cur;
  } else {
    U_Grab(P_JRg_Src1, G_JConv_Change);
    U_Scan3(C_JRg7, P_JRg_Src1, P_JRg_Src2, U_SUB, true);      // Rg7 $Debug
    var ByThrMin_Sav = G_ByThrMin;
    G_ByThrMin = G_iThrMin_Change;
    U_Conv(P_JRg_Dst, C_JRg7, C_JConv_ThrGT);                  // Rg7 $Debug
    G_ByThrMin = ByThrMin_Sav;
  } /* if */
} /* U_Change */

function F_iOff_Mp_XY(P_imageData, P_x, P_y)
{
 var iWdt = P_imageData.width;
 var iHgt = P_imageData.height;
 var iOff = ((P_y * iWdt) + P_x) * C_iSizePxl;
 return(iOff); 
} /* F_iOff_Mp_XY */

function F_iSizeRow(P_imageData)
{
 var iSizeRow = P_imageData.width * C_iSizePxl;
 return(iSizeRow); 
} /* F_iOff_Mp_XY */

var S_iCnt_ScanROI = 0;

function U_ScanROI(P_imageDataDst, P_imageDataSrc1, P_imageDataSrc2)
{
 var data0 = P_imageDataSrc1.data;
 var iOff = F_iOff_Mp_XY(P_imageDataSrc1, G_xLft_ROI, G_yUp_ROI);
 var iSizeRow = F_iSizeRow(P_imageDataSrc1);
 var yToA = G_yUp_ROI  + G_iHgt_ROI;
 var xToA = G_xLft_ROI + G_iWdt_ROI;
 var y, x;
 var j;
 var P0;

 S_iCnt_ScanROI = 0; 
 for (y = G_yUp_ROI; y < yToA; y++) {
     j = iOff;
     for (x = G_xLft_ROI; x < xToA; x++) {
          P0 = data0[j];
          if (G_iCoR_True <= P0) {
             S_iCnt_ScanROI++;
          } /* if */
          j += C_iSizePxl; 
     } /* for */
     iOff += iSizeRow;
 } /* for */
} /* U_ScanROI */
                     
/*
* WARNING: U_iCoPick gets the color of the selected pixel
* returning the corresponding RGBA components as values of the parameters:
* G_iCoR_Mouse, G_iCoG_Mouse, G_iCoB_Mouse, G_iCoA_Mouse. 
*/
function U_iCoPick()
{
  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iSrc2 = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  $TUISys._TUISys.szRGB_XY(iDst, iSrc1, iSrc2);
} /* U_iCoPick */
                       
/* -------------------------------------------------------------------------- */

/* ROI zoom */
function U_Zoom()
{
  var CanvasDst = F_pCanvas_Chk(S_iDst_RFE, true);
  var CanvasSrc = F_pCanvas_Chk(S_iSrc1_RFE, true);
  var ctxSrc;
  var ctxDst;
  var imageDataSrc;
  var dataSrc;
  var xDst = 0;
  var yDst = 0;
  var iWdtDst = 480;
  var iHgtDst = 480;
  var fSmoothing = true;

  ctxSrc = CanvasSrc.getContext('2d');
  ctxDst = CanvasDst.getContext('2d');

  CanvasDst.width  = CanvasSrc.width;
  CanvasDst.height = CanvasSrc.height;
  ctxDst = CanvasDst.getContext('2d');

    ctxDst.imageSmoothingEnabled = fSmoothing;
    ctxDst.mozImageSmoothingEnabled = fSmoothing;
    ctxDst.webkitImageSmoothingEnabled = fSmoothing;
    ctxDst.msImageSmoothingEnabled = fSmoothing;
    
  ctxDst.drawImage(CanvasSrc, G_xLft_ROI, G_yUp_ROI, G_iWdt_ROI, G_iHgt_ROI, xDst, yDst, iWdtDst, iHgtDst);
} /* U_Zoom */

/* Convolution of the current image with a matrix */
function U_Faltung()
{
var G_aiCoef_Faltung   = [3, 3, 1, 0,  0, 0, 0, 0, 1, 0,  0,  0,  0, 321];

var S_jSrc_RowPrv = 0;
var S_jSrc_RowNxt = 0;
var o0, o1, o2, o3, o4, o5, o6, o7, o8;
var iDiv, iBias;

var G_aaiCoef_Faltung_Std = [
  [3, 3, 1, 0,  1, 0, -1, 1, 0, -1,  1,  0, -1, 100],
  [3, 3, 1, 0,  1, 1,  1, 0, 0,  0, -1, -1, -1, 101],
  [3, 3, 1, 0,  1, 1,  1, 1, 1,  1,  1,  1,  1, 102]
];

function U_Init_Faltung(P_iSizeRowSrc)
{
  if ((0 <= G_JMat_Faltung) && (G_JMat_Faltung < 3)) {
      G_aiCoef_Faltung[0]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][0];
      G_aiCoef_Faltung[1]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][1];
      G_aiCoef_Faltung[2]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][2];
      G_aiCoef_Faltung[3]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][3];
      G_aiCoef_Faltung[4]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][4];
      G_aiCoef_Faltung[5]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][5];
      G_aiCoef_Faltung[6]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][6];
      G_aiCoef_Faltung[7]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][7];
      G_aiCoef_Faltung[8]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][8];
      G_aiCoef_Faltung[9]  = G_aaiCoef_Faltung_Std[G_JMat_Faltung][9];
      G_aiCoef_Faltung[10] = G_aaiCoef_Faltung_Std[G_JMat_Faltung][10];
      G_aiCoef_Faltung[11] = G_aaiCoef_Faltung_Std[G_JMat_Faltung][11];
      G_aiCoef_Faltung[12] = G_aaiCoef_Faltung_Std[G_JMat_Faltung][12];
      G_aiCoef_Faltung[13] = G_aaiCoef_Faltung_Std[G_JMat_Faltung][13];
  } else {
      G_aiCoef_Faltung[0]  = G_iWdt_Faltung;
      G_aiCoef_Faltung[1]  = G_iHgt_Faltung;
      G_aiCoef_Faltung[2]  = G_iDiv_Faltung;
      G_aiCoef_Faltung[3]  = G_iBias_Faltung;
      G_aiCoef_Faltung[4]  = G_iW00_Faltung;
      G_aiCoef_Faltung[5]  = G_iW01_Faltung;
      G_aiCoef_Faltung[6]  = G_iW02_Faltung;
      G_aiCoef_Faltung[7]  = G_iW10_Faltung;
      G_aiCoef_Faltung[8]  = G_iW11_Faltung;
      G_aiCoef_Faltung[9]  = G_iW12_Faltung;
      G_aiCoef_Faltung[10] = G_iW20_Faltung;
      G_aiCoef_Faltung[11] = G_iW21_Faltung;
      G_aiCoef_Faltung[12] = G_iW22_Faltung;
      G_aiCoef_Faltung[13] = 1000;
  } /* if */

  iDiv  = G_aiCoef_Faltung[2];
  if (iDiv == 0) {
     //U_Error_VIP(13, "Division by zero");
     if (G_JMat_Faltung < 0) {
        iDiv = 1;   /* Mask the error allowing the interactive editing of G_iDiv_Faltung parameter */
        U_Sound();
     } else {
        alert("Division by zero");
     } /* if */ 
  } /* if */
  iBias = G_aiCoef_Faltung[3];      

  o0 = -P_iSizeRowSrc - C_iSizePxl;
  o1 = -P_iSizeRowSrc;
  o2 = -P_iSizeRowSrc + C_iSizePxl;
  
  o3 = 0 - C_iSizePxl;
  o4 = 0;
  o5 = 0 + C_iSizePxl;
  
  o6 = P_iSizeRowSrc - C_iSizePxl;
  o7 = P_iSizeRowSrc;
  o8 = P_iSizeRowSrc + C_iSizePxl;

  var iTmp = 0;
} /* U_Init_Faltung */


  function F_iFalt1(P_dataDst, P_dataSrc, P_jSrc, P_fInit)
  {
    var iSum = 0;
    var iRes = 0;
    
    if (P_fInit) {
      iRes = 0; /* $Dbg eliminare */
    } else {
      if ((P_jSrc & 3) == 3) {
         return(255);
      }/* if */
      
      iSum  = G_aiCoef_Faltung[4]  * P_dataSrc[P_jSrc + o0];
      iSum += G_aiCoef_Faltung[5]  * P_dataSrc[P_jSrc + o1];
      iSum += G_aiCoef_Faltung[6]  * P_dataSrc[P_jSrc + o2];
      iSum += G_aiCoef_Faltung[7]  * P_dataSrc[P_jSrc + o3];
      iSum += G_aiCoef_Faltung[8]  * P_dataSrc[P_jSrc + o4];
      iSum += G_aiCoef_Faltung[9]  * P_dataSrc[P_jSrc + o5];
      iSum += G_aiCoef_Faltung[10] * P_dataSrc[P_jSrc + o6];
      iSum += G_aiCoef_Faltung[11] * P_dataSrc[P_jSrc + o7];
      iSum += G_aiCoef_Faltung[12] * P_dataSrc[P_jSrc + o8];

      iRes = (iSum / iDiv) + iBias;
       if (255 < iRes) {
          iRes == 255;
       } else if (iRes < 0) {
          iRes == 0;
       } /* if */
    } /* if */
    return(iRes);
  } /* F_iFalt1 */

  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);

  var CanvasDst = $VIP.F_pCanvas_Chk(iDst, true);
  var CanvasSrc = $VIP.F_pCanvas_Chk(iSrc1, true);
  var ctxSrc;
  var ctxDst;
  var imageDataSrc;
  var dataSrc;
  var imageDataTmp;
  var dataTmp;
  var i, j;

  ctxSrc = CanvasSrc.getContext('2d');
  imageDataSrc = ctxSrc.getImageData(0, 0, CanvasSrc.width, CanvasSrc.height);
  dataSrc = imageDataSrc.data;
  imageDataTmp = ctxSrc.getImageData(0, 0, CanvasSrc.width, CanvasSrc.height);
  dataTmp = imageDataTmp.data;

  ctxDst = CanvasDst.getContext('2d');
  CanvasDst.width  = CanvasSrc.width;
  CanvasDst.height = CanvasSrc.height;
  
  var iSizeRowSrc = $TUISys.iSizeRow(imageDataSrc);

  U_Init_Faltung(iSizeRowSrc);

  var iWdtMat = G_aiCoef_Faltung[C_JFaltung_iWdtMat];
  var iHgtMat = G_aiCoef_Faltung[C_JFaltung_iHgtMat];
  var iWdt = imageDataSrc.width;
  var iHgt = imageDataSrc.height;  
  var xIni = C_iSizePxl * (iWdtMat >> 1);
  var xToA = (C_iSizePxl * iWdt) - xIni;
  var yIni = iHgtMat >> 1;
  var yToA = iHgt - yIni;
  var x, y;
  var pDataSrc = imageDataSrc.data;
  var pDataTmp = imageDataTmp.data;  
  var P_pF_i = F_iFalt1;
    
  i = iSizeRowSrc * yIni;
  for (y = yIni; y < yToA; y++) {
      j = i + xIni;
      P_pF_i(imageDataTmp, imageDataSrc, j, true);
      for (x = xIni; x < xToA; x++) {
          pDataTmp[j] = P_pF_i(pDataTmp, pDataSrc, j, false);
          j += 1;
      } /* for */
      i += iSizeRowSrc;
  } /* for */
      
  ctxDst.putImageData(imageDataTmp, 0, 0, 0, 0, CanvasSrc.width, CanvasSrc.height);
//  ctxDst.putImageData(imageDataSrc, 0, 0, 0, 0, CanvasSrc.width, CanvasSrc.height);
} /* U_Faltung */

/* Plot a drawing on the selected Canvas (work in progress) */
function U_Plot()
{
  /* Paint a Pixel */
  function U_WrDot_Plot(P_data, P_x, P_y, P_iR, P_iG, P_iB,P_iA) {
    var iOff = ((G_iWdt_ImgNew * P_y) + P_x) * C_iSizePxl;
  
    P_data[iOff]    = P_iR;
    P_data[iOff +1] = P_iG;
    P_data[iOff +2] = P_iB;
    P_data[iOff +3] = 255;
  } /* U_WrDot_Plot */

  var iDst = F_iNum_Ope_Get(C_JVCode_RgDst);
  var CanvasDst = $VIP.F_pCanvas_Chk(iDst, true);
  var ctxDst;
  var i, j;
  var iCard_ImgNew = G_iWdt_ImgNew * G_iHgt_ImgNew;  
  CanvasDst.width  = G_iWdt_ImgNew;
 	CanvasDst.height = G_iHgt_ImgNew;
  ctxDst = CanvasDst.getContext('2d');
  var imageDataTmp = ctxDst.createImageData(G_iWdt_ImgNew, G_iHgt_ImgNew);
  var dataTmp = imageDataTmp.data;

  for (i = 0; i < iCard_ImgNew; i++) {
       j = i * C_iSizePxl;
       dataTmp[j]    = ((j % 50) === 0)? 121: G_iCoR_Default;
       dataTmp[j +1] = G_iCoG_Default;
       dataTmp[j +2] = G_iCoB_Default;
       dataTmp[j +3] = G_iCoA_Default;
  } /* for */
  j = C_iSizePxl * G_iWdt_ImgNew * G_iCustom00;   // $Debug +++++++++++++++
  for (i = 0; i < G_iWdt_ImgNew; i++) {
      U_WrDot_Plot(dataTmp, i, G_iCustom00 +i, 123, G_iCoG_Default, G_iCoB_Default, G_iCoA_Default);
      dataTmp[j]    = 128;
      dataTmp[j +1] = G_iCoG_Default;;
      dataTmp[j +2] = G_iCoB_Default;
      dataTmp[j +3] = G_iCoA_Default;
      j += C_iSizePxl;
  } /* for */    
  ctxDst.putImageData(imageDataTmp, 0, 0, 0, 0, imageDataTmp.width, imageDataTmp.height);
} /* U_Plot */

/* Play a sound */
function U_Sound() {
 var oSoundPrm = {"szKind":"file", "szFlNm":"res/beep.mp3"};
 $TUISys.Sound(oSoundPrm);
} /* U_Sound */

/* Read remote device port (IoT) */
function U_RdPort() {
//  var JGPIO0 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iTmp = $TUISys.RdPort();
//  U_PrmSet_VIP(S_iDst_RFE, iTmp);  // ???
} /* U_RdPort */

/* Write remote device port (IoT) */
function U_WrPort() {
//  var JGPIO0 = 4;
//  var iVal = true;
 $TUISys.WrPort();
} /* U_WrPort */

/* Hooks for user's defined instructions (extensions) */
function U_User0()
{
  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iSrc2 = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  U_User0_Custom(iDst, iSrc1, iSrc2);
} /* U_User0 */
                       
function U_User1()
{
  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iSrc2 = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  U_User1_Custom(iDst, iSrc1, iSrc2);
} /* U_User1 */
                       
function U_User2()
{
  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iSrc2 = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  U_User2_Custom(iDst, iSrc1, iSrc2);
} /* U_User2 */
                       
function U_User3()
{
  var iDst  = F_iNum_Ope_Get(C_JVCode_RgDst);
  var iSrc1 = F_iNum_Ope_Get(C_JVCode_RgSrc1);
  var iSrc2 = F_iNum_Ope_Get(C_JVCode_RgSrc2);
  U_User3_Custom(iDst, iSrc1, iSrc2);
} /* U_User3 */

function U_Resvd() {
  U_Error_VIP(14, "Attempt to execute an Instruction not yet implemented");
} /* U_Resvd */

function U_iScan_VIP()
{
  var fRes;
  S_iCnt_ScanROI = 0;
  U_Scan3(C_JRgTmp, S_iSrc1_RFE, S_iSrc2_RFE, U_ScanROI, false);
  if (S_iCnt_ScanROI > G_iMax_ScanROI) {
     var iTmp = true;
  } /* if */
  fRes = (S_iCnt_ScanROI > G_iMax_ScanROI);
  U_PrmSet_VIP(S_iDst_RFE, fRes);
} /* U_iScan_VIP */

function U_DEBUG()
{
  alert("debug");
} /* U_DEBUG */

/*-----U_Dbg_VIP --------------------------------------------------------
*
* Watch Point.
* Get unexpected variables changes.
*/  
function U_Dbg_VIP()
{
//  var szType = typeof G_iW21_Faltung;
//  if ((szType === "undefined") || (szType === "object")) {
//      return;
//  } /* if */
} /* U_Dbg_VIP */

function U_Error_VIP(P_iNum, P_szErr)
{
//   if (G_fDbg) {
//      // $TUISys.Error(P_iNum, P_szErr, "");
//      throw(P_iNum + " " + P_szErr);
//      // S_iCntErr++;
//   } /* if */
           
  $Error.U_Error(C_jCd_Cur, P_iNum, P_szErr, "", false);
  S_iNum_ErrLst  = P_iNum;
  S_szErr_ErrLst = P_szErr;
} /* U_Error_VIP */

function U_Init_VIP()
{
  U_Dbg_VIP();
} /* U_Init_VIP */

/* ##### */
  return(_VIP);
})(); /* END - $VIP */

