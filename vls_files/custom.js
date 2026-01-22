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

// ##### Module Custom ###########################
/*
*
*  01/09/2015
*  16/10/2016 [j91]
*/
/*
*  custom.js
*  Authors Luigi D. CAPRA, <add here your name>
*  
*  custom.js
*  Authors: <you>
*
*  PLESE NOTE:
*  custom.js consists of a set of stub functions that provide hooks for the integration of users' code.
*  Feel free to replace the code of the following functions with your own code!
*  
*  Please NOTE:
*  the examples code make reference to engine.htm, vlssmart.htm 
*/
var S_aVCode_User0_Custom = [
[0, 0, C_JInitVAR, 0, 0, 112],                                 /* Init variables setting the routine-identifier (112) */
[0, 0, C_JGrab,  C_JRg7, C_JConv_Gray, C_jAdr_xViewFinder],    /* Grab a RGB image and convert it in Gray levels */
[0, 0, C_JPlot, C_JRg6, C_JRg7, 0],                            /* Test drawing capability */
[0, 0, C_JFaltung, C_JRg5, C_JRg6, 0],                         /* Apply convolution to the previous image to highlight the horizontal components of the image (white line in Rg5) */
[0, 0, C_JHALT, 0, 0, 0]                                       /* Stop image-processing */
];

var S_aVCode_User1_Custom = [
[0, 0, C_JInitVAR, 0, 0, 113],                     /* Init variables setting the routine-identifier (113) */
[0, 0, C_JUser1, 0, 0, 0],                         /* Run user-defined funztion 1 */
[0, 0, C_JGrab, C_JRg2, 0, 0],                     /* Grab a RGB image */
[0, 0, C_JConv, C_JRg1, C_JRg2, C_JConv_Dflt],
[0, 0, C_JConv, C_JRg0, C_JRg1, C_JConv_ThrRange], /* Look for pixels P such that min < P < Max */
[0, 0, C_JMark, C_JRgTmp, C_JRg0, 10],             /* Paint marks on the screen */
[0, 0, C_JHALT, 0, 0, 0]                           /* Stop image-processing */
];

var S_aVCode_User2_Custom = [
[0, 0, C_JInitVAR, 0, 0, 114],                     /* Init variables setting the routine-identifier (114) */
[0, 0, C_JGrab, C_JRg7, 0, 0],                     /* Grab a RGB image */
[0, 0, C_JZoom, C_JRg6, C_JRg7, 0],                /* Zoom the selected ROI */
[0, 0, C_JHALT, 0, 0, 0]                           /* Stop image-processing */
];                                                 

/*
* Hook for the routine that could be used to reinitialize cyclically user's defined program variables.
*/
function U_InitVAR_Custom()
{
} /* U_InitVAR_Custom */

/*
* User's defined messages.
*
* U_Msg_Custom instruction offer an easy way to customize the message show.
* P_iVal0, P_iVal1, P_iVal2 should be numerical variables.
* We suggest you use P_iVal0 as an index to select the output element.
* P_iVal1, P_iVal2 could be used directly to specify the values displayed or as an index. 
*/
function U_Msg_Custom(P_iVal0, P_iVal1, P_iVal2)
{
  switch (P_iVal0) {
    case 1: {
         var szTmp = "P_iVal0 == 1 " + P_iVal1 + " " + P_iVal2;
         document.getElementById("Id_Msg_01").innerHTML = szTmp;
    } break;
    default : {
         alert("P_iVal0 != 1 " + P_iVal1 + " " + P_iVal2);
    } break;
  } /* switch */
} /* U_Msg_Custom */

/*
* User's defined input management.
*/ 
function F_iInput_Custom(P_iCur, P_iSrc1, P_iSrc2)
{
  var aszMsg = ["Input0", "Input1", "Input2", "Input3"];
  var szMsg = aszMsg[P_iSrc1 & 3];      /* For instance: iSrc1 could be used to select a message */
  var szDefault = P_iCur;               /* For instance: prompt-default could be set with the current value of the selected parameter (passed in P_iCur) */
  var iRes = prompt(szMsg, szDefault);  
  return(iRes);   /* The calling routine will set the selected parameter with the value returned */
} /* F_iInput_Custom */

/*
* User's synchronization routine.
*/ 
function U_Sync_Custom(P_iVal0, P_iVal1, P_iVal2)
{

} /* U_Sync_Custom */

/*
* Hook for user's defined image processing instruction "User0".
* 
* The following example show the implementation of a single operand instruction,
* that is of a function of the kind:
* y = f(x);
* where y and x are two different images.
*
* Given the indexes of the image-registers containing the two images used as
* source (P_iVal1) and destination (P_iVal0)
* the function U_User0_Custom(P_iVal0, P_iVal1, P_iVal2);
* extracts the red components of the souce-image (addressed by P_iVal1)
* and stores the result in the destination register (addressed by P_iVal0). 
*/
function U_User0_Custom(P_iVal0, P_iVal1, P_iVal2)
{
  var CanvasDst = $VIP.F_pCanvas_Chk(P_iVal0, true);   /* Get image Dst */
  var CanvasSrc = $VIP.F_pCanvas_Chk(P_iVal1, true);   /* Get image Src1 */
  var ctxSrc;
  var ctxDst;
  var imageDataSrc;
  var dataSrc;
  var i, j;

  /* Get a copy of the bitmap corresponding to the source image */
  ctxSrc = CanvasSrc.getContext('2d');
  imageDataSrc = ctxSrc.getImageData(0, 0, CanvasSrc.width, CanvasSrc.height);
  dataSrc = imageDataSrc.data;

  /* Get the context of the image used as destination */
  ctxDst = CanvasDst.getContext('2d');
  CanvasDst.width  = CanvasSrc.width;
  CanvasDst.height = CanvasSrc.height;

  /* Compute the size of the source image */
  var iSize = (4 * CanvasDst.width * CanvasDst.height);  /* Calc the size of the image */

  /* Clear the green and blue components of the copy of the source image ==> highlight the red components of the same image. */
  var pData = imageDataSrc.data;  
  j = 0;
  for (i = 0; i < iSize; i += 4) {
       j = i;
//     pData[j]    = pData[j]; /* Let the red component unchanged */
       pData[j +1] = 0;        /* Clear the green component */
       pData[j +2] = 0;        /* Clear the blue  component */
       pData[j +3] = 255;      /* Set Alpha channel to the max opacity */
  } /* for */

  /* Finally save the results setting the canvas corresponding to the image destination */      
  ctxDst.putImageData(imageDataSrc, 0, 0, 0, 0, CanvasSrc.width, CanvasSrc.height);
} /* U_User0_Custom */

/*
* Hook for user's defined image processing function.
*/
function U_User1_Custom(P_iVal0, P_iVal1, P_iVal2)
{
 if (G_fDbg) {
    alert("user1");
 } /* if */
} /* U_User1_Custom */

/*
* Hook for user's defined image processing function.
*/
function U_User2_Custom(P_iVal0, P_iVal1, P_iVal2)
{
 alert("user2");
} /* U_User2_Custom */

/*
* Hook for user's defined image processing function.
*/
function U_User3_Custom(P_iVal0, P_iVal1, P_iVal2)
{
 alert("user3");
} /* U_User3_Custom */




const $Custom = (function () {
  var _Custom = {};
  _Custom.U_Init          = U_Init_Custom;     // function U_Init_Custom();
  _Custom.U_Test          = U_Test;            // function U_Test();
  _Custom.U_CmdInt        = U_CmdInt;          // function U_CmdInt();

/*----- Local Constants ----------------------------------------------*/
/*----- Local Variables ----------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----U_Test --------------------------------------------------------
*
*/ 
function U_Test()
{
} /* U_Test */

/*-----U_CmdInt --------------------------------------------------------
*
* Command Interpreter
*/ 
function U_CmdInt(P_szMsg)
{
  switch (P_szMsg) {
    case "ciao": {
        ALERT("ciao", 1);
    } break;
    case "upload": {
          $VIP.U_Grab(C_JRg0);
          $Camera.U_UpLoad(C_JRg0);
    } break;
    default : {
    } break;
  } /* switch */
} /* U_CmdInt */

/*-----U_Init_Custom --------------------------------------------------------
*
*/ 
function U_Init_Custom()
{
} /* U_Init_Custom */

  return(_Custom);
})();  /* $Custom */
