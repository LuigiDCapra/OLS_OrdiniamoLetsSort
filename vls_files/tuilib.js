/*
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

// ##### Module TUISys ###########################

/* -----------------------------------------------------
*  TUISys.js
*  Author Luigi D. CAPRA
*  01/06/2015
*  27/10/2016 [j102]
*/


/* Constants (Actually only FF supports const!) */

var C_iSizePxl = 4;
var C_iBlack =   0;
var C_iWhite = 255;
var C_Illegal = -123456789;  /* Illegal value */

var G_fDbg = false;
var G_iWdt_Canvas = 0;
var G_iHgt_Canvas = 0;
var G_iWdtDiv2_Canvas = 0;
var G_iHgtDiv2_Canvas = 0;
var G_fRunningAcq = true; //false;
var G_fTutor = false;

var S_fChg_Program = false;
var S_fMoz40 = false;     /* FireFox 40 + */

// ##### PRIVATE Definitions ###########################

var $TUISys = (function(){
  var _TUISys = {};
  _TUISys.Init     = U_Init_Modules;               // function U_Init_Modules();
  _TUISys.Run      = U_Run_TUISys;                 // function U_Run_TUISys(P_aVCode)
  _TUISys.Periodic = U_Periodic_TUISys;            // function U_Periodic_TUISys();  
  _TUISys.Error    = U_Error0_DbgTS;               // function U_Error0_DbgTS(P_iErr, P_szErr, P_szMsg)
  _TUISys.LogLn    = U_LogLn_DbgTS;                // function U_LogLn_DbgTS(P_szMsg);
  _TUISys.Mouse    = U_Mouse_MouseTS;              // function U_Mouse_MouseTS(P_event);
  _TUISys.OnClick  = U_OnClick_MouseTS;            // function U_OnClick_MouseTS(P_event);
  _TUISys.Sound    = U_Sound_SoundTS;              // function U_Sound_SoundTS(P_oSoundPrm);
  _TUISys.ims_Elap = F_ims_Elap_Timer;             // function F_ims_Elap_Timer();
  _TUISys.fChk_imageData = F_fChk_imageData_ImgTS; // function F_fChk_imageData_ImgTS(P_imageData, P_x, P_y, P_fErr);  
  _TUISys.iOff_imageData = F_iOff_imageData_ImgTS; // function F_iOff_imageData_ImgTS(P_imageData, P_x, P_y);  
  _TUISys.iOff_XY  = F_iOff_XY_ImgTS;              // function F_iOff_XY_ImgTS(P_x, P_y, P_iWdt);  
  _TUISys.iSizeRow = F_iSizeRow_ImgTS;             // function F_iSizeRow_ImgTS(P_imageData);
  _TUISys.szRGB_XY = F_szRGBA_Mp_jRgXY_ImgTS;      // function F_szRGBA_Mp_jRgXY_ImgTS(P_jCanvas, P_x, P_y);
  _TUISys.DbgMsg   = U_DbgMsg;                     // function U_DbgMsg()
  _TUISys.Start    = U_Start_VideoTS;              // function U_Start_VideoTS();
  _TUISys.Stop     = U_Stop_VideoTS;               // function U_Stop_VideoTS();
  _TUISys.Grab     = U_Grab_VideoTS;               // function U_Grab_VideoTS(P_ij);
  
/* -----------------------------------------------------
*  CdMdTS.js
*  Author Luigi D. CAPRA
*  01/06/2015
*  17/07/2015
*/

var C_iCd_CdMdTS  = 0;
var C_iCd_SafeTS  = 1;
var C_iCd_DbgTS   = 2;
var C_iCd_Mouse   = 3;
var C_iCd_TimerTS = 4;
var C_iCd_SoundTS = 5;
var C_iCd_VideoTS = 6;
var C_iCd_ImgTS   = 7;
var C_iCd_VIPTS   = 8;
var C_iCd_ScrnCal = 9;
  

function U_Init_CdMdTS()
{
} /* U_Init_CdMdTS */

/* -----------------------------------------------------
*  SafeTS.js
*  Author Luigi D. CAPRA
*  18/06/2015
*  17/07/2015
*/

function U_Init_SafeTS()
{
  if (window != top) {
     top.location.href = location.href;
  } /* if */
} /* U_Init_SafeTS */

/* -----------------------------------------------------
*  dbgts.js
*  Author Luigi D. CAPRA
*  18/06/2015
*  17/07/2015
*/
var S_iCntErr = 0;
var S_iErr_ErrLst  = "";
var S_szErr_ErrLst = "";


function U_Error_DbgTS(P_iCdMd, P_iErr, P_szErr, P_szMsg)
{ 
  U_Error0_DbgTS((P_iCdMd * 100 + P_iErr), P_szErr, P_szMsg);
} /* U_Error_DbgTS */

function U_Error0_DbgTS(P_iErr, P_szErr, P_szMsg)
{ 
  if (typeof P_szMsg === "undefined") {
     alert("ERROR: " + P_iErr + "\n" + P_szErr);
  }
  else {
     alert("ERROR: " + P_iErr + "\n" + P_szErr + " (" + P_szMsg + ")");
  } /* if */

  S_iCntErr++;
  S_iErr_ErrLst  = P_iErr;
  S_szErr_ErrLst = P_szErr;
  S_szErr_ErrLst = P_szMsg;
} /* U_Error0_DbgTS */

function U_DbgMsg()
{
  var szMsgVIP = $VIP.F_szDbgMsg();
  var szMsg0 = "\nTotal number of errors: " + S_iCntErr;
  var szMsg1 =  "\nLast error: " + S_iErr_ErrLst + " " + S_szErr_ErrLst + " " + S_szErr_ErrLst + "\n";
  alert(szMsgVIP + szMsg0 + szMsg1);
} /* U_DbgMsg */

function U_LogLn_DbgTS(P_szMsg)
{
  if (typeof P_szMsg === "undefined") {
     P_szMsg = "";
  } /* if */
	if (G_prelog) {
     G_prelog.textContent += ('\n' + P_szMsg);
  }
	else {
     alert(P_szMsg);
  } /* if */
} /* U_LogLn_DbgTS */

function U_Log(text)
{
  if (typeof P_szMsg === "undefined") {
     P_szMsg = "";
  } /* if */
	if (G_prelog) {
     G_prelog.textContent += (text);
  }
	else {
     alert(text);
  } /* if */
} /* U_Log */

function U_LogArr(P_aArr)
{
  var iLen = P_aArr.length;
  var i;
  for (i = 0; i < iLen; i++) {
      U_Log(P_aArr[i] + ", ");
  } /* for */
  U_LogLn_DbgTS("\n");
} /* U_LogArr */

function U_Init_DbgTS()
{
} /* U_Init_DbgTS */

/* -----------------------------------------------------
* MouseTS
* 
* Author Luigi D. CAPRA
* 
* 18/06/2015
* 21/09/2015
*/
function U_Mouse_MouseTS(P_event)
{
  G_xCur_Mouse = P_event.clientX;
  G_yCur_Mouse = P_event.clientY;
} /* U_Mouse_MouseTS */

function U_OnClick_MouseTS(P_event)
{
  G_xClick_Mouse = P_event.clientX;
  G_yClick_Mouse = P_event.clientY;
} /* U_OnClick_MouseTS */

function U_Init_MouseTS()
{
  document.addEventListener('mousemove', U_Mouse_MouseTS);
} /* U_Init_MouseTS */

/* -----------------------------------------------------
*  TimerTS.js
*  Author Luigi D. CAPRA
*
*  06/06/2015
*  17/07/2015
*/

var S_ims_Ini_Timer = 0;

function U_OpenTab_VLS_Timer()
{
  var Date0 = new Date();
  S_ims_Ini_Timer = Date0.getTime();
} /* U_OpenTab_VLS_Timer */

function F_ims_Elap_Timer()
{
  var Date0 = new Date();
  var ims_Cur = Date0.getTime();
  var ims_Ela = ims_Cur - S_ims_Ini_Timer;
  return(ims_Ela);
} /* F_ims_Elap_Timer */

function U_Init_TimerTS()
{
} /* U_Init_TimerTS */

/* -----------------------------------------------------
*  SoundTS.js
*  Author Luigi D. CAPRA
*  18/06/2015
*  27/10/2016
*/

function U_Sound_SoundTS(P_oSoundPrm)
{
  switch (P_oSoundPrm.szKind) {
    case 'file': {
         U_File_SoundTS(P_oSoundPrm.szFlNm);
    } break;
    case 'oscill': {
         if (!P_oSoundPrm.szWave) {
             P_oSoundPrm.szWave = "sine";   /* valid values are: 'sine', 'square', 'sawtooth', 'triangle', 'custom' */
         } /* if */
         U_Oscill_SoundTS(P_oSoundPrm.iHz_, P_oSoundPrm.ims_, P_oSoundPrm.szWave);
    } break;
    default : {
        return; /* ignore error */
    } break;
  } /* switch */
     
} /* U_Sound_SoundTS */

/* Play audio file */
function U_File_SoundTS(P_szFlNm)
{
  var Audio0 = new Audio(P_szFlNm); // buffers automatically the file contents when created
  Audio0.play();
} /* U_File_SoundTS */

/* Use an oscillator ti generate a fixed frequency */
function U_Oscill_SoundTS(P_iHz_, P_ims_Dur, P_szWave)
{
  function U_Stop() {
    oscillator.stop();
  } /* U_Stop */
  
  if ((16 < P_iHz_) && (P_iHz_ < 20000)) {
     // create web audio api context
     var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
     // create Oscillator node
     var oscillator = audioCtx.createOscillator();
 
     oscillator.type = P_szWave;
     oscillator.frequency.value = P_iHz_; // value in hertz
     oscillator.connect(audioCtx.destination);
     oscillator.start();
     setTimeout(U_Stop, P_ims_Dur)
  } /* if */
} /* U_Oscill_SoundTS */

function U_Init_SoundTS()
{
} /* U_Init_SoundTS */
 
/* ----------------------------------------------------
* ImgTS
* 
* Author Luigi D. CAPRA
* 
* 18/06/2015
* 16/09/2015
*/

function U_Init_ImgTS()
{
} /* U_Init_ImgTS */

function F_fChk_imageData_ImgTS(P_imageData, P_x, P_y, P_fErr)
{
  var fRes = ((0 <= P_x) && (P_x < P_imageData.width) && (0 <= P_y) && (P_y < P_imageData.height));
  if (!fRes) {
     U_Error0_DbgTS(5, "Bitmap Leakage");
  } /* if */
  return(fRes);
} /* F_fChk_imageData_ImgTS */

function F_iOff_imageData_ImgTS(P_imageData, P_x, P_y)
{
  var iOff;
  var iWdt = P_imageData.width;
  F_fChk_imageData_ImgTS(P_imageData, P_x, P_y, true);
  iOff = F_iOff_XY_ImgTS(P_x, P_y, iWdt);
  return(iOff);
} /* F_iOff_imageData_ImgTS */

function F_iOff_XY_ImgTS(P_x, P_y, P_iWdt)
{
  var iOff = (((P_y * P_iWdt) + P_x) * C_iSizePxl);
  return(iOff);
} /* F_iOff_XY_ImgTS */

function F_iSizeRow_ImgTS(P_imageData)
{
  return(P_imageData.width * C_iSizePxl);
} /* F_iSizeRow_ImgTS */

function F_szRGBA_Mp_jRgXY_ImgTS(P_jCanvas, P_x, P_y)
{
  var Canvas0 = G_aCanvas[P_jCanvas];
  var ctx = Canvas0.getContext('2d');
  var Img1 = ctx.getImageData(P_x, P_y, 1, 1);
  var data = Img1.data;
  G_iCoR_Mouse = data[0];  /* RGBA */
  G_iCoG_Mouse = data[1];
  G_iCoB_Mouse = data[2];
  G_iCoA_Mouse = data[3]; 
  var szRGBA = 'C' + P_jCanvas + ' (' + P_x + ', ' + P_y + ') - RGBA: ('  + G_iCoR_Mouse + ',' + G_iCoG_Mouse + ',' + G_iCoB_Mouse + ',' + G_iCoA_Mouse + ')';
  return(szRGBA);
} /* F_szRGBA_Mp_jRgXY_ImgTS */

/*----------------------------------------------------
*  VideoTS.js
*  Author Luigi D. CAPRA
*  18/06/2015
*  24/10/2016
*/

function U_Start_VideoTS()
{
  var jStep = 0;
  var fLoop = true;
  var fRes = true;
  while (fLoop) {
         switch (jStep) {
           case  0: {
                 fRes = !(typeof window === 'undefined'); 
           } break;
           case  1: {
                 fRes = !(typeof navigator === 'undefined');
           } break;
           case  2: { /* Firefox */
                 fLoop = !navigator.mozGetUserMedia; 
                 if (!fLoop) {
                    if (typeof MediaStreamTrack.getSources !== 'undefined') {     /* $NOOS$ */
                        alert("MediaStreamTrack.getSources")
                    } /* if */
                    // S_fMoz40 = true;
                    if (S_fMoz40) {
                       U_VideoAcq_New();
                    } else {
                       navigator.mozGetUserMedia({video:true}, U_VideoAcq_Old, U_VideoErr);
                    } /* if */                    
                 } /* if */
           } break;
           case  3: { /* Opera 12, Windows Edge */
                 fLoop = !navigator.getUserMedia; 
                 if (!fLoop) {
                    navigator.getUserMedia({video:true}, U_VideoAcq_Old, U_VideoErr);
                 } /* if */
           } break;
           case  4: {
                 fLoop = !navigator.oGetUserMedia; 
                 if (!fLoop) {
                    navigator.oGetUserMedia({video:true}, U_VideoAcq_Old, U_VideoErr);
                 } /* if */
           } break;
           case  5: { /* Opera 29 */
                 fLoop = !navigator.webkitGetUserMedia; 
                 if (!fLoop) {
                    navigator.webkitGetUserMedia({video:true}, U_VideoAcq_Old, U_VideoErr);
                 } /* if */
           } break;
           case  6: {
                 fLoop = !navigator.msGetUserMedia; 
                 if (!fLoop) {
                    navigator.msGetUserMedia({video:true, audio:false}, U_VideoAcq_Old, U_VideoErr);
                 } /* if */
           } break;
           case  7: {
                 U_Error0_DbgTS(2, "getUserMedia() not available from your Web browser!");
                 fLoop = false;
           } break;
         } /* switch */
         if (!fRes) {
            U_Error0_DbgTS(3, "Camera Initialization failed");
            fLoop = false;
         } /* if */
         jStep++;
  } /* while */
  if (G_fDbg) {
     alert("GetUserMedia() initialization (" + (jStep -1) + ")");
  } /* if */ 
} /* U_Start_VideoTS */

function U_VideoErr(P_szErr)
{
  U_Error0_DbgTS(1, "No webcam connected or access forbidden.\n Please connect a camera to the PC and authorize the browser to use it.\n\n" + P_szErr);
} /* U_VideoErr */

function U_Stop_VideoTS()
{
  G_fEna_Periodic = false;
  if (G_VideoStream) {
    if (G_VideoStream.stop) G_VideoStream.stop();
    else if (G_VideoStream.msStop) G_VideoStream.msStop();
    G_VideoStream.onended = null;
    G_VideoStream = null;
  } /* if */
  if (G_Video) {
    G_Video.onerror = null;
    G_Video.pause();
    if (G_Video.mozSrcObject) {
       G_Video.mozSrcObject = null;
    }
    else {
       G_Video.src = "";
    } /* if */
  } /* if */
  G_fRunningAcq = false;
} /* U_Stop_VideoTS */

function U_VideoAcq_New()
{
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia;

  var oConstraints = {audio: false, video: { width: 800, height: 600, facingMode: "environment"}, frameRate: {ideal: 10, max: 15}}; 

  oConstraints.video.width  = G_iWdt_Video;
  oConstraints.video.height = G_iHgt_Video;
  oConstraints.video.frameRate = G_iFrmRate_Video;
  oConstraints.video.facingMode = (G_faceUser_Video)? "user": "environment";
  
  navigator.mediaDevices.getUserMedia(oConstraints).then(function(oMediaStream) {
    var video = G_Video; // document.querySelector('video');
    video.srcObject = oMediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
  }).catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end. 

  var szMsg2 = $IPC.szReg_Get("message2");
  if ((szMsg2 != "") && (szMsg2 != null)) {
     alert(szMsg2);
     $IPC.Set_Reg("message2", "");
     G_fTutor = true;
  } /* if */
  G_fRunningAcq = true; 
} /* U_VideoAcq_New */

function U_VideoAcq_Old(stream)
{
  G_VideoStream = stream;
  U_LogLn_DbgTS('Got stream.');
  G_Video.onerror = function () {
    U_Error0_DbgTS(4, "G_Video.onerror");
    if (G_Video) U_Stop();
  } /* function */;
  stream.onended = U_VideoErr;

  if (window.webkitURL) {
     G_Video.src = window.webkitURL.createObjectURL(stream);
  } else if (typeof G_Video.mozSrcObject !== "undefined") {
    /* Mozilla FireFox 18+ */
    G_Video.mozSrcObject = stream;
    G_Video.play();
  } else if (navigator.mozGetUserMedia) {
    /* Mozilla FireFox 16a, 17a */
    G_Video.src = stream;
    G_Video.play();
  } else if (window.URL) {
    G_Video.src = window.URL.createObjectURL(stream);
  } else {
    /* Opera */
    G_Video.src = stream;
  } /* if */

  var szMsg2 = $IPC.szReg_Get("message2");
  if ((szMsg2 != "") && (szMsg2 != null)) {
     alert(szMsg2);
     $IPC.Set_Reg("message2", "");
     G_fTutor = true;
  } /* if */
          
  G_fRunningAcq = true;
} /* U_VideoAcq_Old */

function U_Grab_VideoTS(P_JRg, P_jConv)
{
  $VIP.U_Grab(P_JRg, P_jConv);
} /* U_Grab_VideoTS */

function U_Init_VideoTS()
{

} /* U_Init_VideoTS */

// ---------------------------------------------------- */

/* Check browser for compatibility issues */
function U_Init_Browser()
{
  if (navigator.appCodeName == "Mozilla") {
     var szuserAgent = navigator.userAgent;
     var iPos1 = szuserAgent.lastIndexOf("\/");
     var iPos2 = szuserAgent.lastIndexOf(".");
     var szRel = szuserAgent.substring(iPos1 +1, iPos2);
     S_fMoz40 = +szRel > 39;      // 21/06/2023
  } /* if */
} /* U_Init_Browser */

function U_Init_Modules()
{
  U_Init_CdMdTS();
  U_Init_SafeTS();
  U_Init_DbgTS();
  U_Init_Browser();
  U_Init_MouseTS();
  U_Init_TimerTS();
  U_Init_SoundTS();
  U_Init_VideoTS();
  U_Init_ImgTS();
  
  $VIP.U_Init();
} /* U_Init_Modules */

/* ##### TUISys Functions ################################################ */

/* Execute a VCode routine */
function U_Run_TUISys(P_aVCode)
{
  $VIP.U_Run(P_aVCode);
} /* U_Run_TUISys */

/* Image processing routines coded by hand */

/* Null routine. The present routine does nothing. Please don't change this code! */
var S_aVCode_STOP = [
[0, 0, C_JHALT, 0, 0, 0]
];

/* Live Emulation. The following code impement Live video extension */
var S_aVCode_LiveEmu = [
[0, 0, C_JInitVAR, 0, 0, 110],
[0, 0, C_JGrab, C_JRgLE, C_jAdr_jConv, 0],
[0, 0, C_JMark, C_JRgTmp, C_JRgLE, 0],
[0, 0, C_JHALT, 0, 0, 0]
];

/* As an example of code we have implemented a routine that compares last acquired image with a sample updated periodically to detect changes in the scene */
var S_aVCode_MotionDetect = [
[0, 0, C_JInitVAR, 0, 0, 111],                     /* Init variables setting the routine-identifier (111) */
[0, 0, C_JChange, C_JRg0, C_JRg1, C_JRg2],         /* Compare the two images looking for changes */
[0, 0, C_JMark, C_JRgTmp, C_JRg0, 0],              /* Paint marks on the screen */
[0, 0, C_JScan, C_jAdr_iFlag00, C_JRg0, C_JRg0],   /* Scan the final-image (in register C_JRg0) looking for pixels set. If the image presents clues of motion the flag Flag00 is set, requiring a Beep */
[0, C_jAdr_iFlag00, C_JSound, 0, 0, 0],            /* NOTE: The flag controls the execution of the Beep. If the variable G_iFlag00 = true the code is executed generating a beep otherwise the processor skip the instruction. */
[0, 0, C_JHALT, 0, 0, 0]                           /* Stop image-processing */
];

/*
* For ease of the reader studying the behavior of VLS we have included a sample of user's defined routine in this module.
* The following code simply tests some functions (image grabbing, drawing capability, sound generation, image processing) of the Virtual Image processor (VIP).
* but REALLY it should have been placed in "custom.js" where we suggest to place your own code.
*/
var S_aVCode_User0_Custom = [
[0, 0, C_JInitVAR, 0, 0, 112],                                 /* Init variables setting the routine-identifier (112) */
[0, 0, C_JGrab,  C_JRg7, C_JConv_Gray, C_jAdr_xViewFinder],    /* Grab a RGB image and convert it in Gray levels */
[0, 0, C_JPlot, C_JRg6, C_JRg7, 0],                            /* Test drawing capability */
[0, 0, C_JFaltung, C_JRg5, C_JRg6, 0],                         /* Apply convolution to the previous image to highlight the horizontal components of the image (white line in Rg5) */
[0, 0, C_JHALT, 0, 0, 0]                                       /* Stop image-processing */
];

/*
* Every G_ims_Periodic milliseconds the browser schedules U_Periodic_TUISys().
* The following routine get the code corresponding to the vision routine indexed by G_ijProgram
* do housekeeping, update the screen status and call the read, fetch, execute (RFE) routine to execute the corresponding vision code.
* At the end it returns the control to the calling environment (that is the browser).
*/
function U_Periodic_TUISys()
{
var aaVCode = [S_aVCode_STOP, S_aVCode_MotionDetect, S_aVCode_User0_Custom, S_aVCode_User1_Custom, S_aVCode_User2_Custom];
var aszRtn  = ["Stopped", "Motion detection", "Custom 0", "Custom 1", "Custom 2"];
var iLen_aVCode = aaVCode.length;
var pVCode;
var szTmp;


  if (S_fChg_Program) {
    S_fChg_Program = false;
        if ((G_ijProgram < 0) || (iLen_aVCode <= G_ijProgram)) {
           G_ijProgram = 0;
           U_Error0_DbgTS(6, "Wrong program number"); 
        }  /* if */
    var szNmRtn = aszRtn[G_ijProgram];
    if (G_fRun_TUISys) {
       szTmp = "System <b>" + "RUNNING<b>";
    } else {
       szTmp = "System <b>" + "STOPPED<b>";
    } /* if */

    document.getElementById("Id_Msg_00").innerHTML = szTmp;
  } /* if */
  if (G_fRunningAcq) {  
     if (G_fMark_LiveEmu) {
        $VIP.U_Run(S_aVCode_LiveEmu);
     } /* if */
     if (G_fRun_TUISys) {
        var iTmp0 = G_fRun_TUISys;
        if ((0 <= G_ijProgram) && (G_ijProgram < iLen_aVCode)) {
        var iTmp1 = G_ijProgram;
           pVCode = aaVCode[G_ijProgram];    
           $VIP.U_Run(pVCode);
        }  /* if */
    } /* if */    
  } /* if */
} /* U_Periodic_TUISys */

  return(_TUISys);
})(); /* END - $TUISys module */

/* Event: VCode routine changed (the user runs a different vision-routine) */
function U_fChg_Rtn_TUISys(P_jRtn)
{
  S_fChg_Program = true;
} / U_fChg_Rtn_TUISys */

