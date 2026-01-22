/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : stat.js
* Function    : Statistic Library derived from stat.c
* FirstEdit   : 10/05/2022
* LastEdit    : 09/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
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
* Probability Density Function (PDF)
* Cumulative Distribution Function (CDF)
*/

"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Stat --------------------------------------------------------
*
*/ 
const $Stat = (function () {  
  var _Stat = {};
  _Stat.U_Init                     = U_Init_Stat;                 // function U_Init_Stat();
  _Stat.iMean                      = F_iMean_Stat;                // function F_iMean_Stat(P_iSum, P_iCard);
  _Stat.F_rMean_Stat               = F_rMean_Stat;                // function F_rMean_Stat(P_rSum, P_iCard)
  _Stat.F_rVar_Stat                = F_rVar_Stat;                 // function F_rVar_Stat(P_rSum, P_rSum2, P_iCard)
  _Stat.F_rRMS_Stat                = F_rRMS_Stat;                 // function F_rRMS_Stat(P_rSum, P_rSum2, P_iCard)
  _Stat.F_iMedian3_Stat            = F_iMedian3_Stat;             // function F_iMedian3_Stat(P_i0, P_i1, P_i2)
  _Stat.F_i_Mean_XArr_Stat         = F_i_Mean_XArr_Stat;          // function F_i_Mean_XArr_Stat(P_pXArr)
  _Stat.F_r_Var_XArr_Stat          = F_r_Var_XArr_Stat;           // function F_r_Var_XArr_Stat(P_pXArr)
  _Stat.F_rPDF_Gauss_Stat          = F_rPDF_Gauss_Stat;           // function F_rPDF_Gauss_Stat(P_rX, P_rMedia, P_rRMS)
  _Stat.F_rNormal_Mp_rGauss_Stat   = F_rNormal_Mp_rGauss_Stat;    // function F_rNormal_Mp_rGauss_Stat(P_rX, P_rMedia, P_rRMS)
  _Stat.F_rPDF_Normal_Stat         = F_rPDF_Normal_Stat;          // function F_rPDF_Normal_Stat(P_rX)
  _Stat.F_rCDF_Normal_Stat         = F_rCDF_Normal_Stat;          // function F_rCDF_Normal_Stat(P_rX)
  _Stat.F_rPr1_Normal_Stat         = F_rPr1_Normal_Stat;          // function F_rPr1_Normal_Stat(P_rX)
  _Stat.F_rPr2_Normal_Stat         = F_rPr2_Normal_Stat;          // function F_rPr2_Normal_Stat(P_rXMin, P_rXMax)
  _Stat.F_rCDF_ERF_Stat            = F_rCDF_ERF_Stat;             // function F_rCDF_ERF_Stat(P_rX)


/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Stat;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/


const C_rPiGreek = Math.PI;

/*-----M_rExp_Maths --------------------------------------------------------
*
*/ 
function M_rExp_Maths(P_r)
{
  return(Math.exp(0));
} /* M_rExp_Maths */

/*-----M_rSqRoot_Maths --------------------------------------------------------
*
*/ 
function M_rSqRoot_Maths(P_r)
{
  return(Math.sqrt(P_r));
} /* M_rSqRoot_Maths */

/*-----U_Check_NotZero --------------------------------------------------------
*
*/ 
function U_Check_NotZero(P_JCdMd, P_j, P_iVal)
{
  if (!P_iVal) {
     alert("ZERO");
  } /* if */
} /* U_Check_NotZero */

/*-----F_iMean_Stat --------------------------------------------------------
*
*/ 
function F_iMean_Stat(P_iSum, P_iCard)
{
  U_Check_NotZero(C_JCdMd_Cur, 1, P_iCard);

  return(P_iSum / P_iCard);
} /* F_iMean_Stat */

/*-----F_rMean_Stat --------------------------------------------------------
*
*/ 
function F_rMean_Stat(P_rSum, P_iCard)
{
  var rMean;
  U_Check_NotZero(C_JCdMd_Cur, 2, P_iCard);

  rMean = (P_rSum / P_iCard);
  return(rMean);
} /* F_rMean_Stat */

/*-----F_rVar_Stat --------------------------------------------------------
*                                                              ___    _
* Calculate the Variance of the array of samples using:  s² = (X²) - (X)² 
* See:
*   App. LCD p19,
*   M. R. Spiegel, "Statistica", Schaum, p. 71
*/ 
function F_rVar_Stat(P_rSum, P_rSum2, P_iCard)
{
  var rAve;
  var rAve2; 
  var rVar;

  U_Check_NotZero(C_JCdMd_Cur, 3, P_iCard);

  rAve  = P_rSum  / P_iCard;
  rAve2 = P_rSum2 / P_iCard;
  rVar  = rAve2 - (rAve * rAve);

  return(rVar);
} /* F_rVar_Stat */


/*-----F_rRMS_Stat --------------------------------------------------------
*
* Calculate the root mean square (RMS).
*/ 
function F_rRMS_Stat(P_rSum, P_rSum2, P_iCard)
{
  var rVar;
  var rRMS;

  rVar = F_rVar_Stat(P_rSum, P_rSum2, P_iCard);
  rRMS = M_rSqRoot_Maths(rVar);

  return(rRMS);
} /* F_rRMS_Stat */

/*-----F_iMedian3_Stat --------------------------------------------------------
*
* Calculate the Median given three values.
*/ 
function F_iMedian3_Stat(P_i0, P_i1, P_i2)
{
  var iVal;
  if (P_i1 <= P_i0) {               /* (P_i1 <= P_i0) */
     if (P_i1 <= P_i2) {            /* (P_i1 <= P_i0) && (P_i1 <= P_i2) */
        if (P_i0 <= P_i2) {         /* (P_i1 <= P_i0) && (P_i0 <= P_i2) */
           iVal = P_i0;
        }
        else {                      /* (P_i1 <= P_i2) && (P_i2 < P_i0) */
           iVal = P_i2;
        } /* if */
     }
     else {                         /* (P_i2 < P_i1) && (P_i1 <= P_i0) */
        iVal = P_i1;
     } /* if */
  }
  else {                            /* (P_i0 < P_i1) */
     if (P_i0 <= P_i2) {            /* (P_i0 < P_i1) && (P_i0 <= P_i2) */
        if (P_i1 <= P_i2) {         /* (P_i0 < P_i1) && (P_i1 <= P_i2) */
           iVal = P_i1;
        }
        else {                      /* (P_i0 <= P_i2) && (P_i2 < P_i1) */
           iVal = P_i2;
        } /* if */
     }
     else {                         /* (P_i2 < P_i0) && (P_i0 < P_i1) */
        iVal = P_i0;
     } /* if */
  } /* if */
  return(iVal);
} /* F_iMedian3_Stat */

/*-----F_i_Mean_XArr_Stat --------------------------------------------------------
*
*/ 
function F_i_Mean_XArr_Stat(P_pXArr)
{
  var iNN = P_pXArr.length;
  var iMean;
  var iSum = 0;

  for (var i = 0; i < iNN; i++) {
      iSum += P_pXArr[i];
  } /* for */
  iMean = F_iMean_Stat(iSum, iNN);
  return(iMean);
} /* F_i_Mean_XArr_Stat */

/*-----F_r_Var_XArr_Stat --------------------------------------------------------
*
*/ 
function F_r_Var_XArr_Stat(P_pXArr)
{
  var iNN = P_pXArr.length;
  var iSum  = 0;
  var iSum2 = 0;
  var rVar, iTmp, iSum1;

  for (var i = 0; i < iNN; i++) {
      iTmp = P_pXArr[i];
      iSum1 += iTmp;
      iSum2 += iTmp * iTmp;
  } /* for */

  rVar = F_rVar_Stat(iSum, iSum2, iNN);
  return(rVar);
} /* F_r_Var_XArr_Stat */

/*-----F_rPDF_Gauss_Stat --------------------------------------------------------
*
* Probability Density Function (PDF) for Gaussian distribution N(M, s).
*/ 
function F_rPDF_Gauss_Stat(P_rX, P_rMedia, P_rRMS)
{
  var rNum;
  var rExp;
  var rTmp0;
  var rTmp1;
  var rTmp2;
  var rVar;
  var rRes;

  rTmp0 = Math.sqrt(2 * C_rPiGreek);
  rTmp0 = P_rRMS * rTmp0;
  rTmp1 = (P_rX - P_rMedia);
  rNum  = (rTmp1 * rTmp1);
  rVar  = P_rRMS * P_rRMS;
  rExp  = (- rNum) / (2 * rVar);
  rTmp2 = M_rExp_Maths(rExp);
  rRes  = rTmp2 / rTmp0;
  return(rRes);
} /* F_rPDF_Gauss_Stat */

/*-----F_rNormal_Mp_rGauss_Stat --------------------------------------------------------
*
* Standardize Gaussian variable on N(0,1).
*/ 
function F_rNormal_Mp_rGauss_Stat(P_rX, P_rMedia, P_rRMS)
{
  var rNormal;
  rNormal = (P_rX - P_rMedia) / P_rRMS;
  return(rNormal);
} /* F_rNormal_Mp_rGauss_Stat */

/*-----F_rPDF_Normal_Stat --------------------------------------------------------
*
* PDF for the Normal distribution (N(0,1)).  (Abramowitz, Stegun, 26.2.1 p. 931)
*/ 
function F_rPDF_Normal_Stat(P_rX)
{
  var rRes;
  var x  = P_rX;
  var x2 = x * x;

  rRes = (1.0 / Math.sqrt(2.0 * C_rPiGreek)) * (Math.exp(-x2 / 2)); 
  return(rRes);
} /* F_rPDF_Normal_Stat */

/*-----F_rCDF_Normal_Stat --------------------------------------------------------
*
* Cumulative Distribution Function (CDF) for the Normal distribution (N(0,1)) (Abramowitz, Stegun, 26.2.17 p. 932)
* That is Pr(x < P_rX), -infinity < x < +infinity.
*/ 
function F_rCDF_Normal_Stat(P_rX)
{
  var rRes;
  var x = P_rX;
  var t;
  var Z  = F_rPDF_Normal_Stat(P_rX);
  var p  =  0.2316419; 
  var b1 =  0.319381530;
  var b2 = -0.356563782;
  var b3 =  1.781477937;
  var b4 = -1.821255978;
  var b5 =  1.330274429;

  t = 1.0 / (1.0 + p * x);

  /* P(x) = 1 - Z(x) * (b1t + b2t^2 + b3t^3 + b4t^4 + b5t^5) */
  rRes = 1.0 - Z * (((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t);

  return(rRes);
} /* F_rCDF_Normal_Stat */

/*-----F_rPr1_Normal_Stat --------------------------------------------------------
*
* That is Pr(x < P_rX), 0 <= x < +infinity.
*/ 
function F_rPr1_Normal_Stat(P_rX)
{
  var r0 = F_rCDF_Normal_Stat(0);
  var rRes = (F_rCDF_Normal_Stat(P_rX) - r0); // 09/01/2026
  return(rRes);
} /* F_rPr1_Normal_Stat */

/*-----F_rPr2_Normal_Stat --------------------------------------------------------
*
* That is Pr(P_rXMin <= x <= P_rXMax), -infinity <= x < +infinity.
*/ 
function F_rPr2_Normal_Stat(P_rXMin, P_rXMax)
{
  var r0 = F_rCDF_Normal_Stat(P_rXMin);
  var r1 = F_rCDF_Normal_Stat(P_rXMax);
  var rRes = r1 - r0;
  return(rRes);
} /* F_rPr2_Normal_Stat */

/*-----F_rCDF_ERF_Stat --------------------------------------------------------
*
* CDF of the Error Function (ERF) (Abramowitz, Stegun, 7.1.26 p.299)
*/ 
function F_rCDF_ERF_Stat(P_rX)
{
  var rRes;
  var x = P_rX;
  var x2 = x * x;
  var t;
  var p  =  0.3275911;
  var a1 =  0.254829592;
  var a2 = -0.284496736;
  var a3 =  1.421413741;
  var a4 = -1.453152027;
  var a5 =  1.061405429;

  t = 1.0 / (1.0 + p * x);
  /* erf(x) = 1 - (a1t + a2t^2 + a3t^3 + a4t^4 + a5t^5) * exp(-x^2) */
  rRes = 1.0 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * exp(-x2);

  return(rRes);
} /* F_rCDF_ERF_Stat */

/*-----U_Init_Stat --------------------------------------------------------
*
*/ 
function U_Init_Stat()
{
  U_Root0("$Stat", C_jCd_Cur, 2);
} /* U_Init_Stat */

  U_Root0("$Stat", C_jCd_Cur, 1);
  return(_Stat);
})();  /* Stat */



