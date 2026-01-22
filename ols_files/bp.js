/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : backprop.js
* Function    : Back Propagation
* FirstEdit   : 14/01/2008
* LastEdit    : 02/09/2025
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
/*----- Global Variables ---------------------------------------------*/

const $BackProp = (function () {
  var _BackProp = {};
  _BackProp.U_Init          = U_Init_BackProp;     // function U_Init_BackProp();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_BP;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----U_Output_r_BackProp --------------------------------------------------------
*
* Compute net's activation value.
*/ 
function U_Output_BackProp(R_pAns)
{
  var o, h, i;
  var rSum;

  for (h = 0; h < R_pAns.iCard_arHid1; h++) {
      rSum = G_arWeightH1[h][R_pAns.iCard_arIn];
      for (i = 0; i < R_pAns.iCard_arIn; i++) {
          rSum += G_arWeightH1[h][i] * G_arInput[i];
      } /* for */
      G_arActivH1[h] = F_rLogistic_Maths(rSum);
  } /* for */

  for (o = 0; o < R_pAns.iCard_arOut; o++) {
      rSum = G_arWeightO[o][R_pAns.iCard_arHid1];
      for (h = 0; h < R_pAns.iCard_arHid1; h++) {
          rSum += G_arWeightO[o][h] * G_arActivH1[h];
      } /* for */
      G_arActivO[o] = F_rLogistic_Maths(rSum);
  } /* for */
} /* U_Output_r_BackProp */

/*-----U_Learn_BackProp --------------------------------------------------------
*
*/ 
function U_Learn_BackProp(R_pAns, P_JLrn)
{
  switch (P_JLrn) {
    case C_JLrn_Init: {
         U_Learn_Init_BackProp(R_pAns);
    } break;
    case C_JLrn_Patt: {
         F_rErrSum_ANS(R_pAns);
         U_Learn_Patt_BackProp(R_pAns);
    } break;
    default : {  /* C_JLrn_Epoch */
         U_Learn_Epoch_BackProp(R_pAns);
    } break;
  } /* switch */
} /* U_Learn_BackProp */

/*-----U_Learn_Init_BackProp --------------------------------------------------------
*
* Init Learning Vectors.
*/ 
function U_Learn_Init_BackProp(R_pAns)
{
  var rLrn_Ini;
  var iNNPatt = R_pAns.iNNPatt;
  var o, h, i;

  rLrn_Ini = S_rLrnRif   / iNNPatt;
  S_rKappa = S_rKappaRif / iNNPatt;

  for (o = 0; o < R_pAns.iCard_arOut; o++) {
      for (h = 0; h < R_pAns.iCard_arHid1; h++) {
          G_arWeightO_Lrn[o][h] = rLrn_Ini;
      } /* for */
      G_arWeightO_Lrn[o][R_pAns.iCard_arHid1] = rLrn_Ini;
  } /* for */

  for (h = 0; h < R_pAns.iCard_arHid1; h++) {
      for (i = 0; i < R_pAns.iCard_arIn; i++) {
          G_arWeightH1_Lrn[h][i] = rLrn_Ini;
      } /* for */
      G_arWeightH1_Lrn[h][R_pAns.iCard_arIn] = rLrn_Ini;
  } /* for */

  for (h = 0; h < R_pAns.iCard_arHid1; h++) {
      for (i = 0; i < R_pAns.iCard_arIn; i++) {
          G_arWeightH1_Old[h][i] = 0.0;
      } /* for */
      G_arWeightH1_Old[h][R_pAns.iCard_arIn] = 0.0;
  } /* for */

  for (o = 0; o < R_pAns.iCard_arOut; o++) {
      for (h = 0; h < R_pAns.iCard_arHid1; h++) {
          G_arWeightO_Old[o][h] = 0.0;
      } /* for */
      G_arWeightO_Old[o][R_pAns.iCard_arHid1] = 0.0;
  } /* for */

  for (h = 0; h < R_pAns.iCard_arHid1; h++) {
      for (i = 0; i < R_pAns.iCard_arIn; i++) {
          G_arWeightH1[h][i] = F_rSign() * F_rCaos();
      } /* for */
      G_arWeightH1[h][R_pAns.iCard_arIn] = 0.0;
  } /* for */

  for (o = 0; o < R_pAns.iCard_arOut; o++) {
      for (h = 0; h < R_pAns.iCard_arHid1; h++) {
          G_arWeightO[o][h] = F_rSign() * F_rCaos();
      } /* for */
      G_arWeightO[o][R_pAns.iCard_arHid1] = 0.0;
  } /* for */
  U_Reset_Sum_BackProp(R_pAns);
} /* U_Learn_Init_BackProp */

/*-----U_Learn_Patt_BackProp --------------------------------------------------------
*
* Learning procedure called at every Pattern.
*/ 
function U_Learn_Patt_BackProp(R_pAns)
{
  U_ComputeDelta(R_pAns);
  if (R_pAns.JAns0 & C_JAns_fLearn) {
     U_AddWeights_BackProp(R_pAns);
     U_ChangeWeights1(R_pAns);
  } /* if */
} /* U_Learn_Patt_BackProp */

/*-----U_Learn_Epoch_BackProp --------------------------------------------------------
*
* Learning procedure called at every Epoch.
*/ 
function U_Learn_Epoch_BackProp(R_pAns)
{
  if (R_pAns.JAns0 & C_JAns_fLearn) {
     U_ChangeWeights2(R_pAns);
     U_Reset_Sum_BackProp(R_pAns);
  } /* if */
} /* U_Learn_Epoch_BackProp */

/*-----F_rSign --------------------------------------------------------
*
*/ 
function F_rSign()
{
  var iTmp = F_DwRnd_Caos();
  if (iTmp & 1) {
     return(-1);
  }
  else {
     return(+1);
  } /* if */
} /* F_rSign */

/*-----F_rCaos --------------------------------------------------------
*
*/ 
function F_rCaos()
{
  var ar = [0.50, 0.10, 0.05, 0.04, 0.01, 0.03, 0.40, 0.07];
  var iTmp = F_DwRnd_Caos();
  return(ar[iTmp & 7]);
} /* F_rCaos */
      
/*-----U_ComputeDelta --------------------------------------------------------
*
* Every Pattern. Compute errors.
*/ 
function U_ComputeDelta(R_pAns)
{
  var o, h;
  var rSum;
// var rTmp;
  var rAct;
//  var rErr = 0;

//  for (o = 0; o < R_pAns.iCard_arOut; o++) {
//      rTmp  = G_arActivO[o] - G_arTarget[o];
//      rErr += (rTmp * rTmp);
//  } /* for */
//  rErr = sqrt((1.0 / (R_pAns.iCard_arOut + 1)) * rErr);
//
//  if (R_pAns) {
//     R_pAns.rErr = rErr; 
//     R_pAns.rSumErr_Epoch += rErr; 
//  } /* if */

  for (o = 0; o < R_pAns.iCard_arOut; o++) {
      rAct = G_arActivO[o];
      G_arDeltaO[o] = rAct * (1.0 - rAct) * (G_arTarget[o] - rAct);
  } /* for */

  for (h = 0; h < R_pAns.iCard_arHid1; h++) {
      rSum = 0.0;
      for (o = 0; o < R_pAns.iCard_arOut; o++) {
          rSum += (G_arDeltaO[o] * G_arWeightO[o][h]);
      } /* for */
      rAct = G_arActivH1[h];
      G_arDeltaH1[h] = rAct * (1.0 - rAct) * rSum;
  } /* for */
} /* U_ComputeDelta */

/*-----U_AddWeights_BackProp --------------------------------------------------------
*
* Every Pattern. Accumulate changes required.
*/ 
function U_AddWeights_BackProp(R_pAns)
{
  var o, h, i;

  for (o = 0; o < R_pAns.iCard_arOut; o++) {
      for (h = 0; h < R_pAns.iCard_arHid1; h++) {
          G_arWeightO_Sum[o][h] += G_arDeltaO[o] * G_arActivH1[h];
      } /* for */
      G_arWeightO_Sum[o][R_pAns.iCard_arHid1] += G_arDeltaO[o];
  } /* for */

  for (h = 0; h < R_pAns.iCard_arHid1; h++) {
      for (i = 0; i < R_pAns.iCard_arIn; i++) {
          G_arWeightH1_Sum[h][i] += G_arDeltaH1[h] * G_arInput[i];
      } /* for */
      G_arWeightH1_Sum[h][R_pAns.iCard_arIn] += G_arDeltaH1[h];
  } /* for */
} /* U_AddWeights_BackProp */

/*-----U_ChangeWeights1 --------------------------------------------------------
*
* Every Pattern. Do housekeeping.
*/ 
function U_ChangeWeights1(R_pAns)
{
  var o, h, i;

  for (o = 0; o < R_pAns.iCard_arOut; o++) {
      for (h = 0; h < R_pAns.iCard_arHid1 +1; h++) {
        if (G_arWeightO_Sum[o][h] * G_arWeightO_Old[o][h] > S_rZero) {
          G_arWeightO_Lrn[o][h] += S_rKappa;
        } else if (G_arWeightO_Sum[o][h] * G_arWeightO_Old[o][h] < -S_rZero) {
          G_arWeightO_Lrn[o][h] -= (S_rPhi * G_arWeightO_Lrn[o][h]);
        } /* if */;
        G_arWeightO_Old[o][h] = G_arWeightO_Sum[o][h] * (1.0 - S_rTeta) + (S_rTeta * G_arWeightO_Old[o][h]);
      } /* for */
  } /* for */
  for (h = 0; h < R_pAns.iCard_arHid1; h++) {
      for (i = 0; i < R_pAns.iCard_arIn +1; i++) {
        if (G_arWeightH1_Sum[h][i] * G_arWeightH1_Old[h][i] > S_rZero) {
          G_arWeightH1_Lrn[h][i] += S_rKappa;
        } else if (G_arWeightH1_Sum[h][i] * G_arWeightH1_Old[h][i] < -S_rZero) {
          G_arWeightH1_Lrn[h][i] -= (S_rPhi * G_arWeightH1_Lrn[h][i]);
        } /* if */;
        G_arWeightH1_Old[h][i] = G_arWeightH1_Sum[h][i] * (1.0 - S_rTeta) + (S_rTeta * G_arWeightH1_Old[h][i]);
      } /* for */
  } /* for */
} /* U_ChangeWeights1 */

/*-----U_Init_BackProp --------------------------------------------------------
*
*/ 
function U_Init_BackProp()
{
  U_Root0("$BP", C_jCd_Cur, 2);
} /* U_Init_BackProp */

  U_Root0("$BP", C_jCd_Cur, 1);
  return(_BackProp);
})();  /* $BackProp */
