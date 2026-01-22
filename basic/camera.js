/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : camera.js
* Function    : Camera management via WebRTC
* FirstEdit   : 03/01/2021
* LastEdit    : 09/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2026
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
*/

"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Camera --------------------------------------------------------
*
*/ 
const $Camera = (function () {
  var _Camera = {};
  _Camera.U_Init          = U_Init_Camera;     // function U_Init_Camera();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur   = C_jCd_Camera;

/*----- Local Variables ----------------------------------------------*/

var S_szHTML_Grab = `<div class="Cl_ContentArea"><br>
      <div class="Cl_Camera"> <video id="Id_Video" height="240" width="320">Video stream not available.</video> <button id="Id_StartButton">Take photo</button> </div>
      <br>
      <canvas id="Id_Canvas" width="320" height="240"> </canvas><br>
      <div class="Cl_Output"> <img id="Id_Photo" alt="The screen capture will appear in this box."> 
      
      </div>
    </div>`;
    
/*--------------------------------------------------------------------*/

  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var S_iWidth = 320;    // We will scale the photo width to this
  var S_iHeight = 0;     // This will be computed based on the input stream

  // |S_fStreaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var S_fStreaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var S_Video  = null;
  var S_Canvas = null;
  var S_Photo  = null;
  var S_StartButton = null;
  
/* # ---- Object S_DBox_Grab ------------------------------------------------------
*
* Grab Image
*/ 
var S_DBox_Grab = (function(){
  var _Cond = {};
  _Cond.U_Open     = U_Open;      // function U_Open(P_Id);
  _Cond.U_Cancel   = U_Close;     // function U_Close(P_Id);
  _Cond.U_Confirm  = U_Confirm;   // function U_Confirm(P_Id);
  
/*-----U_Open --------------------------------------------------------
*
*/ 
function U_Open(P_Id)
{
  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', U_Initialize, false);
  window.addEventListener('message', U_ReceiveMessage, false);
  
  U_Initialize();
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
} /* U_Confirm */

  return(_Cond);
})(); /* # END - S_DBox_Grab Object */

/*-----U_Initialize --------------------------------------------------------
*
* Initialize acquisition process.
*/ 
  function U_Initialize() {
    S_Video  = document.getElementById('Id_Video');
    S_Canvas = document.getElementById('Id_Canvas');
    S_Photo  = document.getElementById('Id_Photo');
    S_StartButton = document.getElementById('Id_StartButton');

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
      S_Video.srcObject = stream;
      S_Video.play();
    })
    .catch(function(P_szErr) {
      console.log("An error occurred: " + P_szErr);
    });

    S_Video.addEventListener('canplay', function(P_Event){
      if (!S_fStreaming) {
        S_iHeight = S_Video.videoHeight / (S_Video.videoWidth/S_iWidth);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(S_iHeight)) {
          S_iHeight = S_iWidth / (4/3);
        }
      
        S_Video.setAttribute('width', S_iWidth);
        S_Video.setAttribute('height', S_iHeight);
        S_Canvas.setAttribute('width', S_iWidth);
        S_Canvas.setAttribute('height', S_iHeight);
        S_fStreaming = true;
      }
    }, false);

    S_StartButton.addEventListener('click', function(P_Event){
      U_TakePicture();
      P_Event.preventDefault();
    }, false);
    
    U_ClearPhoto();
} /* U_Initialize */

/*-----U_ClearPhoto --------------------------------------------------------
*
* Fill the photo with an indication that none has been captured.
*/ 
function U_ClearPhoto()
{ 
    var Ctx0 = S_Canvas.getContext('2d');
    Ctx0.fillStyle = "#AAA";
    Ctx0.fillRect(0, 0, S_Canvas.width, S_Canvas.height);

    var Data0 = S_Canvas.toDataURL('image/png');
    S_Photo.setAttribute('src', Data0);
} /* U_ClearPhoto */

/*-----U_TakePicture --------------------------------------------------------
*
* Capture a photo by fetching the current contents of the video
* and drawing it into a canvas, then converting that to a PNG
* format data URL. By drawing it on an offscreen canvas and then
* drawing that to the screen, we can change its size and/or apply
* other changes before drawing it.
*/ 
  function U_TakePicture() {
    var Ctx0 = S_Canvas.getContext('2d');
    if (S_iWidth && S_iHeight) {
      S_Canvas.width  = S_iWidth;
      S_Canvas.height = S_iHeight;
      Ctx0.drawImage(S_Video, 0, 0, S_iWidth, S_iHeight);
    
      var Data0 = S_Canvas.toDataURL('image/png');
      S_Photo.setAttribute('src', Data0);
    } else {
      U_ClearPhoto();
    }
} /* U_TakePicture */

function U_ReceiveMessage(P_Event) {
  var S_Origin = P_Event.origin;
  alert("FIGLIO: " + P_Event.data + " " + S_Origin);
  U_TakePicture();
//  P_Event.source.postMessage("Ricevuta di Ritorno", S_Origin);
} /* U_ReceiveMessage */

/*-----U_Init_Camera --------------------------------------------------------
*
*/ 
function U_Init_Camera()
{
  _Camera.DBox_Grab = new CL_DBox("Id_Div_DBox0", "$Camera.DBox_Grab", "Grab Image", S_szHTML_Grab, S_DBox_Grab.U_Open, G_DBox_Null.U_Cancel,  S_DBox_Grab.U_Confirm, null, "Camera");
  U_Root0("$Camera", C_jCd_Cur, 2);
 } /* U_Init_Camera */

  U_Root0("$Camera", C_jCd_Cur, 1);
  return(_Camera);
})();  /* Camera */

$Camera.U_Init();
