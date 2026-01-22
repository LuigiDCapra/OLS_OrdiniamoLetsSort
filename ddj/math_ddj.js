/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : math_ddj.js
* Function    : Mathematics functions.
* FirstEdit   : 15/12/2019
* LastEdit    : 26/05/2024
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2017, 2024
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     Manage data loading.
* 
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
* Derived from MATHS.C
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/

//const e       = Math.E;
const C_rPiGreek = Math.PI;

/*----- Global Variables ---------------------------------------------*/

/*----- Module $Math_DDJ --------------------------------------------------------
*
*/ 
const $Math_DDJ = (function () {
  var _Math_DDJ = {};
  _Math_DDJ.U_Init          = U_Init;               // function U_Init();
  _Math_DDJ.F_rPolynonial   = F_rPolynonial_Maths;  // function F_rPolynonial_Maths(P_aPolynm, P_rX);
  _Math_DDJ.F_rFact         = F_rFact;              // function F_rFact(P_nN);
  _Math_DDJ.F_rGamma        = F_rGamma_Maths;       // function F_rGamma_Maths(P_rZ);
  _Math_DDJ.F_rBeta         = F_rBeta_Maths;        // function F_rBeta_Maths(P_rX, P_rY);

  _Math_DDJ.F_Coll0_Formula = F_Coll0_Formula;      // function F_Coll0_Formula(P_szFormula, P_xMin, P_xMax, P_xStep);
  _Math_DDJ.F_rRND          = F_rRND;               // function F_rRND(P_rMin, P_rMax);
  _Math_DDJ.F_iRND          = F_iRND;               // function F_iRND(P_iMin, P_iMax);
  _Math_DDJ.F_pMat_Gauss_Matrix = F_pMat_Gauss_Matrix; // function F_pMat_Gauss_Matrix(R_pMat, P_JGauss);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Math_DDJ;

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----F_Coll0_Formula --------------------------------------------------------
*
* Evaluate the given mathematical formula.
*/ 
function F_Coll0_Formula(P_UsrView0, P_szFormula, P_xMin, P_xMax, P_xStep)
{
const e       = Math.E;
const PI      = Math.PI;
const abs     = (x) => Math.abs(x);
const acos    = (x) => Math.acos(x);
const acosh   = (x) => Math.acosh(x);
const asin    = (x) => Math.asin(x);
const asinh   = (x) => Math.asinh(x);
const atan    = (x) => Math.atan(x);
const atan2   = (x) => Math.atan2(x);
const atanh   = (x) => Math.atanh(x);
const cbrt    = (x) => Math.cbrt(x);
const ceil    = (x) => Math.ceil(x);
const clz32   = (x) => Math.clz32(x);
const cos     = (x) => Math.cos(x);
const cosh    = (x) => Math.cosh(x);
const exp     = (x) => Math.exp(x);
const expm1   = (x) => Math.expm1(x);
const floor   = (x) => Math.floor(x);
const fround  = (x) => Math.fround(x);
const hypot   = (x) => Math.hypot(x);
const imul    = (x) => Math.imul(x);
const log     = (x) => Math.log(x);
const log10   = (x) => Math.log10(x);
const log1p   = (x) => Math.log1p(x);
const log2    = (x) => Math.log2(x);
const pow     = (x, y) => Math.pow(x, y);
const random  = (x) => Math.random(x);
const rnd     = (xMin, xMax) => $Math_DDJ.F_rRND(xMin, xMax);
const round   = (x) => Math.round(x);
const sign    = (x) => Math.sign(x);
const sin     = (x) => Math.sin(x);
const sinh    = (x) => Math.sinh(x);
const sqrt    = (x) => Math.sqrt(x);
const tan     = (x) => Math.tan(x);
const tanh    = (x) => Math.tanh(x);
const trunc   = (x) => Math.trunc(x);
const fact    = (x) => $Math_DDJ.F_rFact(x);

function F_Dbg($, i)
{
  var Tmp0 = PI;
  var Tmp1 = Tmp0 + "";
  debugger;
  return(Tmp0);
} /* F_Dbg */

  var iNn    = (P_xMax - P_xMin) / P_xStep;
  var Coll0  = P_UsrView0.XDB0.Coll0;
  var x = P_xMin;
  var y = 0;
  var pF;
           
  var szCode = "pF = (x) => (" + P_szFormula + ")";
  eval(szCode);
  
//  pF = F_Dbg;
  
  for (let i = 0; i <= iNn; i++) {
      y = pF(x);
      Coll0[i] = [x,y];
      x += P_xStep;
  } /* for */
  return(Coll0);
} /* F_Coll0_Formula */

const M_rAbs = (P_0) => (P_0 < 0)? -P_0: P_0;

/*-----F_pMat_Gauss_Matrix --------------------------------------------------------
*
* Given a non singular matrix pMat N*(N+1) the present routine do the preprocessing
* required to get the solution of the corresponding linear equations system.
* The are two option:
* 1) using Gauss Elimination algorithm: the matrix is put in triangular form
*    so that is possible solve the system by solving the equations in reverse
*    order one at a time;
* 2) get the Inverse Matrix using Gauss-Jordan algorithm and then simply
*    multiply it for the note terms vector.
*
* NOTE:
*  if Gauss elimination algorithm then must be: iNNCol = iNNRow +1
*  if Gauss-Jordan algorithm than should be: iNNCol = iNNRow, but also iNNCol = iNNRow +1, it's Ok!
*
* P_JGauss = C_JGauss_Triang : get matrix in triangular format
* P_JGauss = C_JGauss_LR     : get matrix in L + R format (A = L*R)
*/
 
const C_JGauss_Jordan  = 0;
const C_JGauss_Triang  = 1;
const C_JGauss_LR      = 2;
const C_JGauss_Inverse = 3;
     
function F_pMat_Gauss_Matrix(R_pMat, P_JGauss=C_JGauss_Jordan)
{
  var Row0 = R_pMat[0];
  var iNNRow = R_pMat.length;
  var iNNCol = Row0.length;
  var ppr = R_pMat;
  var prTmp;
  var rCoef;
  var rAbsMax;
  var rAbs;
  var rPivot;
  var pjPivot;
  var iIni;
  var iTmp;
  var iCnt = 0;
  var j_rMax;
  var i, j, k;

//  ALERT("fff",4);
  if (iNNCol != iNNRow +1) {
     $Error.U_Error(C_jCd_Cur, 1, "Row0.length != R_pMat.length +1", Row0.length, false);
  } /* if */
  
//  pjPivot = R_pMat->pajPivot;
  pjPivot = [];
  for (i = 0; i < iNNRow; i++) {
      pjPivot[i] = i;    
  } /* for */
//  pjPivot = R_pMat->pajPivot;
  
  for (i = 0; i < iNNRow; i++) {
      rAbsMax = 0;
      j_rMax  = 0;
/*
* Look for the Pivot.
*/
      for (j = i; j < iNNRow; j++) {
          rAbs = M_rAbs(ppr[j][i]);
          if (rAbsMax < rAbs) {
             rAbsMax = rAbs;
             j_rMax = j;
          } /* if */
      } /* for */
/*
* Get the Pivot again because the sign.
*/
      rPivot = ppr[j_rMax][i];
/*
* Swap pointers to rows.
*/
      if (j_rMax != i) {
//         R_pMat->siCnt++;
         iCnt++;
         iTmp = pjPivot[i];
         pjPivot[i] = pjPivot[j_rMax];
         pjPivot[j_rMax] = iTmp;
         prTmp = ppr[i];
         ppr[i] = ppr[j_rMax];
         ppr[j_rMax] = prTmp;
      } /* if */
      
      P_JGauss = 0;

      switch (P_JGauss) {
        case C_JGauss_Jordan: {
             iIni = i + 1;
             for (j = 0; j < iNNRow; j++) {
                 if (j != i) {
                    rCoef = ppr[j][i] / rPivot;
                    ppr[j][i] = 0.0;
                    for (k = i +1; k < iNNCol; k++) {
                        ppr[j][k] -= ppr[i][k] * rCoef;
                    } /* for */
                 } /* if */
             } /* for */   
        } break;
        case C_JGauss_Triang: {
             for (j = i +1; j < iNNRow; j++) {
                 rCoef = ppr[j][i] / rPivot;
                 ppr[j][i] = 0.0;
                 for (k = i +1; k < iNNCol; k++) {
                     ppr[j][k] -= ppr[i][k] * rCoef;
                 } /* for */
             } /* for */  
        } break;
        case C_JGauss_LR: {
             for (j = i +1; j < iNNRow; j++) {
                 rCoef = ppr[j][i] / rPivot;
                 ppr[j][i] = rCoef;
                 for (k = i +1; k < iNNCol; k++) {
                     ppr[j][k] -= ppr[i][k] * rCoef;
                 } /* for */
             } /* for */  
        } break;
        case C_JGauss_Inverse: {
             for (j = 0; j < iNNRow; j++) {
                 if (j != i) {
                    rCoef = ppr[j][i] / rPivot;
                    for (k = 0; k < iNNRow; k++) {
                        if (k != i) {
                           ppr[j][k] -= ppr[i][k] * rCoef;
                        }
                        else {
                           ppr[j][k] = rCoef;
                        } /* if */
                    } /* for */
                 } /* if */
             } /* for */
             for (k = 0; k < iNNRow; k++) {
                 ppr[i][k] = -ppr[i][k] / rPivot;
             } /* for */
             ppr[i][i] = 1.0 / rPivot;
        } break;
        default : {
        } break;
      } /* switch */
  } /* for */
  if (P_JGauss == C_JGauss_Jordan) {
     var jB = iNNCol -1;
     for (i = iNNRow -1; i >= 0; i--) {
         ppr[i][jB] /= ppr[i][i];
         ppr[i][i] = 1;
     } /* for */  
  } /* if */
  return(R_pMat);
} /* F_pMat_Gauss_Matrix */

/*-----F_rRND --------------------------------------------------------
*
*/ 
function F_rRND(P_rMin, P_rMax) {
  P_rMin = P_rMin;
  P_rMax = P_rMax;
  return (Math.random() * (P_rMax - P_rMin) + P_rMin);
} /* F_rRND */

/*-----F_iRND --------------------------------------------------------
*
*/ 
function F_iRND(P_rMin, P_rMax) {
  P_rMin = Math.ceil(P_rMin);
  P_rMax = Math.floor(P_rMax);
  return (Math.floor(Math.random() * (P_rMax - P_rMin) + P_rMin));
} /* F_iRND */

/*-----F_rPolynonial_Maths --------------------------------------------------------
*
* Compute the values of the given Polynome.
* P_aPolynm = [4, 5, 2, 1] = x^3 + 2x^2 + 5x + 4 degree of the polynome 3.
* $Math_DDJ.F_rPolynonial([4, 5, 2, 1], 5);
*/
function F_rPolynonial_Maths(P_aPolynm, P_rX)
{
  var iDegPoly = P_aPolynm.length -1;
  var i = iDegPoly;
  var rRes = P_aPolynm[i];

  for (i = iDegPoly -1; i >= 0; i--) {
      rRes = (rRes * P_rX) + P_aPolynm[i];
  } /* for */

  return(rRes);
} /* F_rPolynonial_Maths */

var S_aQwFact = [
1,
1,
2,
6,
24,
120,
720,
5040,
40320,
362880,
3628800,
39916800,
479001600,
6227020800,
87178291200,
1307674368000,
20922789888000,
355687428096000,
6402373705728000,
121645100408832000,
2432902008176640000
];

/*-----F_rFact --------------------------------------------------------
*
*/ 
function F_rFact(P_nN)
{
  var iCard_aQwFact = S_aQwFact.length;
  var rRes;
  var  i;

  if (P_nN < iCard_aQwFact) {
     rRes = S_aQwFact[P_nN];
  }
  else {
     rRes = S_aQwFact[(iCard_aQwFact -1)];
     i = (iCard_aQwFact);
     while (i <= P_nN) {
           rRes *= i;
           i++;
     } /* while */
  } /* if */
  return(rRes);
} /* F_rFact */

/*-----F_rGamma_Maths --------------------------------------------------------
*
* Gamma Function (Abramowitz, Stegun, 6.1.36 p. 257)
* For any Natural number n, Gamma(n +1) = n! (Ferrero, Rossati, p. 291, f, 16 p.292, f.17.
*/
function F_rGamma_Maths(P_rZ)
{
  Polynm_Gamma = [1.0, -0.577191652, 0.988205891, -0.897056937, 0.918206857, -0.756704078, 0.482199394, -0.193527818, 0.035868343];    /* G(1 +x), 0 <= x <= 1 */
  var rGamma_XPls1;
  var rRes = 1.0;
  var rTmp;

  if (P_rZ > 1.0) {
     rTmp = P_rZ - 1.0;
     while (rTmp > 1.0) {
           rRes *= rTmp;
           rTmp -= 1.0;
     } /* while */
     rGamma_XPls1 = F_rPolynonial_Maths(Polynm_Gamma, rTmp);
     rRes *= rGamma_XPls1;
  }
  else {
     rTmp = P_rZ;
     while (rTmp < 1.0) {
           rRes *= rTmp;
           rTmp += 1.0;
     } /* while */
     rGamma_XPls1 = F_rPolynonial_Maths(Polynm_Gamma, (rTmp -1.0));
     rRes = rGamma_XPls1 / rRes;
  } /* if */
  return(rRes);
} /* F_rGamma_Maths */

/*-----F_rBeta_Maths --------------------------------------------------------
*
* Beta Function (Abramowitz, Stegun, 6.2.2 p. 258)
* (Ferrero, Rossati, p.297, f.21.
*/
function F_rBeta_Maths(P_rX, P_rY)
{
  var r0 = F_rGamma_Maths(P_rX);
  var r1 = F_rGamma_Maths(P_rY);
  var r2 = F_rGamma_Maths(P_rX + P_rY);
  var rBeta = (r0 * r1) / r2;
  return(rBeta);
} /* F_rBeta_Maths */

/*-----U_Init --------------------------------------------------------
*
*/ 
function U_Init()
{
  U_Root0("$Math_DDJ", C_jCd_Cur);
} /* U_Init */

  return(_Math_DDJ);
})();  /* Math_DDJ */
