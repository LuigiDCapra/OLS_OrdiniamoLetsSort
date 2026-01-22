/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : kinae.js
* Function    : Kinaesthetics management
* FirstEdit   : 03/01/2021
* LastEdit    : 30/09/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2024
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

const $Kinae = (function () {
  var _Kinae = {};
  _Kinae.U_Init            = U_Init_Kinae;      // function U_Init_Kinae();
  _Kinae.U_Hub           = U_Hub_Kinae;       // function U_Hub_Kinae(P_jStsCmd);
  _Kinae.U_Espressione   = U_Espressione;     // function U_Espressione(P_szFlNm);
  _Kinae.U_Espressione2  = U_Espressione2;    // function U_Espressione2(P_iPkg, P_szFlNm);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Kinae;

/*----- Local Variables ----------------------------------------------*/

var S_iMod_Friendly = 5;

/*--------------------------------------------------------------------*/

/*-----U_Bored --------------------------------------------------------
*
* Show how Viola is bored.
*/ 
function U_Bored(P_iTimer)
{
  if (P_iTimer > 62) {     
  }  else if (P_iTimer > 60) {
     U_Expr("bored2");
  }  else if (P_iTimer > 45) {
     U_Expr("bored1");  
  }  else if (P_iTimer > 30) {
     U_Expr("distracted2");
  }  else if (P_iTimer > 15) {
     U_Expr("distracted1");
  }  else if (P_iTimer == -1) {
     U_Expr("neutral1");
  }
  else {
  } /* if */
} /* U_Bored */

/*-----U_Working --------------------------------------------------------
*
* Viola is working.
*/ 
function U_Working(P_iTimer)
{
/*
*  change Viola expressions while she's working or speaking.
*/
  if (window.speechSynthesis.speaking) {
     switch (P_iTimer % S_iMod_Friendly) {
       case 0: {
            U_Expr("neutral0");
       } break;
       case 1: {
            U_Expr("neutral1");
       } break;
       case 2: {
            U_Expr("happy2");
       } break;
       case 3: {
            U_Expr("happy3");
       } break;
       case 4: {
            U_Expr("impertinent1");
       } break;
       case 5: {
            U_Expr("impertinent2");
       } break;
       default : {
            U_Expr("bored2");
       } break;
     } /* switch */
  }
  else {
     if (P_iTimer & 1) {
        U_Expr("neutral0");     
     }
     else {
        U_Expr("neutral1");
     } /* if */
  } /* if */
} /* U_Working */

var  S_Mood = {
"asleep":"addormentata.jpg",
"bored1":"annoiata1.jpg",
"bored2":"annoiata2.jpg",
"careful":"attenta1.jpg",
"bikini":"bikini.jpg",
"distracted1":"distratta1.jpg",
"distracted2":"distratta2.jpg",
"frown":"no1.jpg",
"sad":"no2.jpg",
"neutral0":"viola.jpg",
"neutral1":"viola.jpg",
"happy1":"viola1.jpg",
"happy2":"viola2.jpg",
"happy3":"viola3.jpg",
"impertinent1":"viola4.jpg",
"impertinent2":"viola5.jpg"
}

/*-----U_Espressione--------------------------------------------------------
*
* Set Expression required by an external module.
*/ 
function U_Espressione(P_szMood)
{
  if (P_szMood) {
     U_Expr(P_szMood);
  } /* if */
} /* U_Espressione */

/*-----U_Expr--------------------------------------------------------
*
* Load the picture corresponding to the current (regular) expression.
*/ 
function U_Expr(P_szMood)
{
  var szFlNm = S_Mood[P_szMood];
    
  G_VCtx_Cur.isTS_Kinae = $TimeDate.F_ims_Sec70_Now();
   
  var Elem0 = document.getElementById("Id_Img_00");
  var szFlNm = "viola_files/res/"+ szFlNm;
  if (Elem0.src != szFlNm) {
      $Log.U_Log(C_jCd_Cur, 1, C_jLog_5, 0, szFlNm);
      Elem0.src = szFlNm;
  } /* if */ 
} /* U_Expr */

/*-----U_Espressione2--------------------------------------------------------
*
* Alternative expressions.
*/ 
function U_Espressione2(P_iPkg, P_szFlNm)
{
  G_VCtx_Cur.isTS_Kinae = $Viola.isTS();

  var Elem0 = document.getElementById("Id_Img_00");
  var szFlNm = "file:///K:/_KING/" + P_iPkg + "/" + P_szFlNm;
  
  $Log.U_Log(C_jCd_Cur, 2, 0, szFlNm);
  Id_TA_01.value = szFlNm;
///  Elem0.src = szFlNm;
} /* U_Espressione2 */

/*-----U_Hub_Kinae --------------------------------------------------------
*
*/ 
function U_Hub_Kinae(P_jStsCmd)
{
  var isTS_Cur = $Viola.isTS();
  var iTimer = G_VCtx_Cur.isTS_Min;

  if (isTS_Cur - G_VCtx_Cur.isTS_Kinae < 2) {    /* let externally required expression be viewed for at lest one second */
     return;
  } /* if */
  switch (P_jStsCmd) {
    case C_jStsCmd_Listening: { 
         U_Bored(iTimer)
    } break;
    case C_jStsCmd_Run: {
         U_Working(isTS_Cur);
    } break;
    case C_jStsCmd_Speaking: {
         U_Working(isTS_Cur);
    } break;
    case C_jStsCmd_Sleeping: {
         U_Expr("asleep");
    } break;
    case C_jStsCmd_Completed: {
         U_Expr("neutral0");
    } break;
    case C_jStsCmd_Idle: {
         U_Expr("impertinent2");
    } break;
    case C_jStsCmd_StartList: {
         U_Expr("neutral0");
    } break;
    default : {
    } break;
  } /* switch */
  
} /* U_Hub_Kinae */

/*-----U_Init_Kinae --------------------------------------------------------
*
*/ 
function U_Init_Kinae()
{
  if ($VConfig.F_ValSts_Get("fMood")) {
     U_Expr("neutral1");
     Id_Img_00.style.display = 'block';
  } /* if */
} /* U_Init_Name */

  return(_Kinae);
})();  /* Kinae */

