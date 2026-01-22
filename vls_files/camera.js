/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : camera.js
* Function    : Camera management via WebRTC
* 
* FirstEdit   : 03/01/2021
* LastEdit    : 08/09/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* -------------------------------------------------------------------------
*
* ### Needs
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

var G_aCanvas = [];

/*----- Module $Camera --------------------------------------------------------
*
*/ 
const $Camera = (function () {
  var _Camera = {};
  _Camera.U_Init        = U_Init_Camera;     // function U_Init_Camera();
  _Camera.U_TakePhoto   = U_TakePhoto;       // function U_TakePhoto();
  _Camera.U_UpLoad      = U_UpLoad;          // function U_UpLoad(P_JRg);
  _Camera.U_StartSeq    = U_StartSeq;        // U_StartSeq();
  _Camera.U_SetCfg      = U_SetCfg;          // U_SetCfg();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur   = C_jCd_Camera;
const C_szNmAgent = "Camera";

/*----- Local Variables ----------------------------------------------*/

var S_iCnt = 10;
var S_ims_Periodic = 10000;

/*--------------------------------------------------------------------*/

  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var S_iWidth = 800;    // We will scale the photo width to this
  var S_iHeight = 0;     // This will be computed based on the input stream

  // |S_fStreaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var S_fStreaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var S_Video  = null;
  var S_Canvas = null;
  var S_StartButton = null;
  
  var S_szFormat = "image/png";
  var S_rComp    = 0.1;
  
/*-----U_ClearPhoto --------------------------------------------------------
*
* Fill the photo with an indication that none has been captured.
*/ 
function U_ClearPhoto()
{ 
    var Ctx0 = S_Canvas.getContext('2d');
    Ctx0.fillStyle = "#AAA";
    Ctx0.fillRect(0, 0, S_Canvas.width, S_Canvas.height);

    var Data0 = S_Canvas.toDataURL(S_szFormat, S_rComp);
} /* U_ClearPhoto */

/*-----U_TakePhoto --------------------------------------------------------
*
* Capture a photo by fetching the current contents of the video
* and drawing it into a canvas, then converting that to a PNG
* format data URL. By drawing it on an offscreen canvas and then
* drawing that to the screen, we can change its size and/or apply
* other changes before drawing it.
*/ 
  function U_TakePhoto() {
  
  Id_Monitor.innerText = "Take."; 
    var Ctx0 = S_Canvas.getContext('2d');
    if (S_iWidth && S_iHeight) {
      S_Canvas.width  = S_iWidth;
      S_Canvas.height = S_iHeight;
      Ctx0.drawImage(S_Video, 0, 0, S_iWidth, S_iHeight);
    
      var Data0 = S_Canvas.toDataURL(S_szFormat, S_rComp);
    } else {
      U_ClearPhoto();
    }
} /* U_TakePhoto */

/*-----U_UpLoad --------------------------------------------------------
*
*/ 
function U_UpLoad(P_JRg)
{
  Id_Monitor.innerText = "UpLoad."; 
  U_UpLoad1(P_JRg);
} /* U_UpLoad */

/*-----U_UpLoad1 --------------------------------------------------------
*
* https://www.dynamsoft.com/codepool/upload-html-canvas-data-to-php-server.html
*/ 
function U_UpLoad1(P_JRg=C_JRg0)
{
  var j;
  if ((C_JRg0 <= P_JRg) && (P_JRg <= C_JRg9)){
     j = P_JRg -C_JRg0;
  }
  else {
    $Error.U_Error(C_jCd_Cur, 1, "Illegal register.", P_JRg, false);
  } /* if */
  
  S_Canvas = G_aCanvas[j];                             // Max???
  var dataURL = S_Canvas.toDataURL(S_szFormat, S_rComp);
  document.getElementById('Id_Hidden_Data').value = dataURL;
  var fd = new FormData(document.forms["Nm_Form1"]);
  var szURL = $VConfig.F_ValSts_Get("szURL_Srv");
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', szURL, true);

  xhr.upload.onprogress = function(e) {
  	if (e.lengthComputable) {
  		var percentComplete = (e.loaded / e.total) * 100;
  		Id_Monitor.innerText = percentComplete + '% uploaded';
  	}
  };
  
  xhr.onload = function() {
     Id_Monitor.innerText = "Loading Completed.";
  };
  xhr.send(fd);
  Id_Monitor.innerText = "Loading Start.";
} /* U_UpLoad1 */

/*-----U_ReceiveMessage --------------------------------------------------------
*
*/ 
function U_ReceiveMessage(P_Event) {
  var S_Origin = P_Event.origin;
  alert("FIGLIO: " + P_Event.data + " " + S_Origin);
  U_TakePhoto();
  P_Event.source.postMessage("Ricevuta di Ritorno", S_Origin);
} /* U_ReceiveMessage */

/*-----U_Sequence --------------------------------------------------------
*
*/
function U_Sequence()
{
  if (S_iCnt > 0) {
     S_iCnt--;
     U_TakePhoto();
     U_UpLoad1();
  } /* if */
} /* U_Sequence */

/*-----U_StartSeq --------------------------------------------------------
*
*/ 
function U_StartSeq()
{
   S_iCnt = $VConfig.F_ValSts_Get("iNn_Photo");
   S_ims_Periodic = $VConfig.F_ValSts_Get("is_Delay") * 1000;
   U_Sequence();
   setInterval(U_Sequence, S_ims_Periodic);
} /* U_StartSeq */

/*-----U_SetCfg --------------------------------------------------------
*
*/ 
function U_SetCfg()
{
  S_szFormat = "image/" + $VConfig.F_ValSts_Get("szFormat");  
  Id_Hidden_Format.value = S_szFormat;
  S_rComp    = $VConfig.F_ValSts_Get("rComp");
} /* U_SetCfg */

/*-----U_Initialize --------------------------------------------------------
*
* Initialize acquisition process.
*/ 
function U_Initialize() {
  S_Video  = document.getElementById('Id_Video');
  S_Canvas = document.getElementById('Id_Canvas00');
//  S_Photo  = document.getElementById('Id_Photo');
  S_StartButton = document.getElementById('Id_StartButton');
  S_iWidth = $VConfig.F_ValSts_Get("iWdt");
  S_iHeight = $VConfig.F_ValSts_Get("iHgt");

  U_SetCfg();

  var iIdealFR = $VConfig.F_ValSts_Get("iIdealFR");
  var iMaxFR   = $VConfig.F_ValSts_Get("iMaxFR");

  var oConstraints = {audio: false, video: {width: S_iWidth, height: S_iHeight, facingMode: "environment"}, frameRate: {ideal: iIdealFR, max: iMaxFR}}; 

  navigator.mediaDevices.getUserMedia(oConstraints)
  .then(function(P_Stream) {
    S_Video.srcObject = P_Stream;
    S_Video.play();
  })
  .catch(function(P_szErr) {
    $Error.U_Error(C_jCd_Cur, 1, "Camera error occurred.", P_szErr, false);
  });

  S_Video.addEventListener('canplay', function(P_Event){
    if (!S_fStreaming) {
      S_iHeight = S_Video.videoHeight / (S_Video.videoWidth/S_iWidth);

      S_Video.setAttribute('width', S_iWidth);
      S_Video.setAttribute('height', S_iHeight);
      S_Canvas.setAttribute('width', S_iWidth);
      S_Canvas.setAttribute('height', S_iHeight);
      S_fStreaming = true;
    }
  }, false);

  S_StartButton.addEventListener('click', function(P_Event){
    U_TakePhoto();
    P_Event.preventDefault();
  }, false);
  
  U_ClearPhoto();
} /* U_Initialize */

function U_Periodic_Engine()
{
//  S_elem_mouse.textContent = S_szRGBA_Mouse;  /* Update mouse position and pixel color */
  $TUISys.Periodic();
} /* U_Periodic_Engine */

/*-----U_Init_Camera --------------------------------------------------------
*
*/ 
function U_Init_Camera()
{
  var S_iWidth = $VConfig.F_ValSts_Get("iWdt");    // We will scale the photo width to this
  var S_iHeight = 0;                               // This will be computed based on the input stream

  G_aCanvas[0] = document.getElementById('Id_Canvas00');
  G_aCanvas[1] = document.getElementById('Id_Canvas01');
  G_aCanvas[2] = document.getElementById('Id_Canvas02');
  G_aCanvas[3] = document.getElementById('Id_Canvas03');
  G_aCanvas[4] = document.getElementById('Id_Canvas04');
  G_aCanvas[5] = document.getElementById('Id_Canvas05');
  G_aCanvas[6] = document.getElementById('Id_Canvas06');
  G_aCanvas[7] = document.getElementById('Id_Canvas07');
  G_aCanvas[8] = document.getElementById('Id_Canvas08');
  G_aCanvas[9] = document.getElementById('Id_Canvas09');

  Id_Monitor.innerText = "INIT-2";
  
  U_Initialize();
  
  setInterval(U_Periodic_Engine, G_ims_Periodic);
} /* U_Init_Camera */

  return(_Camera);
})();  /* Camera */



