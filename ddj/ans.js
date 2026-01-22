/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : ans.js
* Function    : Artificial Neural Systems
* FirstEdit   : 12/04/2025
* LastEdit    : 12/04/2025
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
* 
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/

const C_nCardMax_Class  =  2000;
const C_iCard_apLayer   =     4;
const C_nCard_ajPattern = 10000;

const T_JAns = {
    C_JAns_None  : 0,
    C_JAns_kNN   : 1,
    C_JAns_BP    : 2   
};

/*
* $Note:
* some network model allow to start with a limited number of active output units
* and then increase the number adding new unit when it is necessary.
* The field iNnUsd indicates (for each layer) the number of active units/classes at a given time.
* 
*/
const T_Layer = {
  pMat2T_In:  null,   /* Input for current Layer */
  pMat2T_Out: null,   /* Output of current Layer */
  pMat2T_Wgh: null,   /* iCard_Wgh = iCard_In * iCard_Out */
  iNnUsd: 0           /* Number of units used [0..iCard_Out] */
};

const T_Ans = {
  apLayer:[],    /* C_iCard_apLayer */
  jPatt:0,       /* Patterns counter */
  jEpoch:0,      /* Epochs counter */
  jClassWnr:0,   /* Winner - Classification of the last Pattern. */
  jClassTgt:0,   /* Target - Expected Classification (by the Oracle). */
  ajImage:[],    /* C_nCard_ajPattern. Circular array in which are stored the of the last N Patterns classified. */
  JAns0:0,       /* ANS Algorithm */
};

/*----- Global Variables ---------------------------------------------*/

const $ANS = (function () {
  var _ANS = {};
  _ANS.U_Init          = U_Init_ANS;     // function U_Init_ANS();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_ANS;

/*----- Local Variables ----------------------------------------------*/
/*------------------------------------------------- -------------------*/

/*-----U_Init_ANS --------------------------------------------------------
*
*/ 
function U_Init_ANS()
{
} /* U_Init_ANS */

  return(_ANS);
})();  /* $ANS */
