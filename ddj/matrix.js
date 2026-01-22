/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : matrix.js
* Function    : Matrix functions.
* FirstEdit   : 11/10/2022
* LastEdit    : 16/01/2025
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2025
* System      : Mozilla FireFox 80+
* License     : https://www.gnu.org/licenses/lgpl-3.0.txt
* -------------------------------------------------------------------------
*
* ### Needs
*     HTML's Elements print.
*     
* ### Requirements
* ### Specifications
* ### Functional Requirements
* ### Non Functional Requirements
*
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/

const C_JGauss_Triang  = 0;
const C_JGauss_LR      = 1;
const C_JGauss_Inverse = 2;
    
/*----- Global Variables ---------------------------------------------*/

/*----- Module $Matrix --------------------------------------------------------
*
*/ 
const $Matrix = (function () {
  var _Matrix = {};
  _Matrix.U_Init          = U_Init_Matrix;     // function U_Init_Matrix();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Matrix;

/*----- Local Variables ----------------------------------------------*/

var S_Mat0 = [
[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
[1, 2, 3]
];

var S_Mat1 = [
[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
[1, 2, 3]
];

var S_MatA = [
[2, 3],
[4, 5],
[6, 7]
];

var S_MatB = [
[1, 2],
[1, 2]
];

var S_Sys0 = [
[2, -1,  1, 3],
[1,  3, -2, 1],
[0,  1,  2, 8]
];

var S_Sys1 = [
[1,  2,  3, 1,  1],
[3, 13, 13, 5,  3],
[1,  5,  3, 1,  7],
[3,  7,  7, 2, 12],
[4,  5,  6, 1, 19]
];

var S_Sys2 = [
[2, -5,  3, 1,  5],
[3, -7,  3,-1, -1],
[5, -9,  6, 2,  7],
[4, -6,  3, 1,  8]
];

/*--------------------------------------------------------------------*/

/*-----F_Mat_TmsScalar --------------------------------------------------------
*
* Multiply a Matrix for a scalar
*/ 
function F_Mat_TmsScalar(P_Mat, P_r)
{
  var iNn_Row = P_Mat.length;
  var iNn_Col = P_Mat[0].length;
  var i, j;
  var Mat0 = [];
  
  for (i = 0; i < iNn_Row; i++) {
      Mat0[i] = [];
      for (j = 0; j < iNn_Col; j++) {
          Mat0[i][j] = P_Mat[i][j] * P_r;
      } /* for */
  } /* for */
  return(Mat0);
} /* F_Mat_TmsScalar */

/*-----F_Mat_Add --------------------------------------------------------
*
* Sum two Matrixes having the same dimensions
*/ 
function F_Mat_Add(P_Mat1, P_Mat2)
{
  var iNn_Row = P_Mat1.length;
  var iNn_Col = P_Mat1[0].length;
  var i, j;
  var Mat0 = [];
  
  for (i = 0; i < iNn_Row; i++) {
      Mat0[i] = [];
      for (j = 0; j < iNn_Col; j++) {
          Mat0[i][j] = P_Mat1[i][j] + P_Mat2[i][j];
      } /* for */
  } /* for */
  return(Mat0);
} /* F_Mat_Add */

/*-----F_Mat_Prod --------------------------------------------------------
*
* Multiply two Matrixes
*/ 
function F_Mat_Prod(P_Mat1, P_Mat2)
{
  var iNn_Row1 = P_Mat1.length;
  var iNn_Col1 = P_Mat1[0].length;
  var iNn_Row2 = P_Mat2.length;
  var iNn_Col2 = P_Mat2[0].length;
  var i, j, k;
  var iSum;
  var Mat0 = [];
  
  if (iNn_Col1 != iNn_Row2) {
     $Error.U_Error(C_jCd_Cur, 1, "iNn_Col1 != iNn_Row2", 0, false);
  } /* if */
  
  for (i = 0; i < iNn_Row1; i++) {
      Mat0[i] = [];
      for (j = 0; j < iNn_Col2; j++) {
          iSum = 0;
          for (k = 0; k < iNn_Col1; k++) {
              let aaa = P_Mat1[i][k];
              let bbb = P_Mat2[k][j];
              iSum += P_Mat1[i][k] * P_Mat2[k][j];
          } /* for */
          Mat0[i][j] = iSum;
      } /* for */
  } /* for */
  return(Mat0);
} /* F_Mat_Prod */

/*-----F_Mat_Transpose --------------------------------------------------------
*
* Transpose the given Matrix
*/ 
function F_Mat_Transpose(P_Mat)
{
  var iNn_Row = P_Mat.length;
  var iNn_Col = P_Mat[0].length;
  var i, j;
  var Mat0 = [];
  for (j = 0; j < iNn_Col; j++) {
      Mat0[j] = [];  
  } /* for */
  for (i = 0; i < iNn_Row; i++) {
      for (j = 0; j < iNn_Col; j++) {
          Mat0[j][i] = P_Mat[i][j]
      } /* for */
  } /* for */
  return(Mat0);
} /* F_Mat_Transpose */

/*-----F_Obj_Clone --------------------------------------------------------
*
*/ 
function F_Obj_Clone(P_Obj)
{
  var sz0  = JSON.stringify(P_Obj);
  var Obj0 = JSON.parse(sz0);
  return(Obj0);
} /* F_Obj_Clone */

/*-----M_rAbs --------------------------------------------------------
*
*/ 
function M_rAbs(P_r)
{
  P_r = (0 <= P_r)? P_r: -P_r;
  return(P_r);
} /* M_rAbs */

/*-----F_Mat_Gauss --------------------------------------------------------
*
* Given a non singular matrix pMat N*(N+1) the present routine do the preprocessing
* required to get the solution of the corresponding linear equations system.
* The are two option:
* 1) using Gauss Elimination algorithm: the matrix is put in triangular form
*    so that is possible solve the system by solving the equation in reverse
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
function F_Mat_Gauss(R_pMat, P_JGauss)
{
  var iNNRow = R_pMat.length;
  var iNNCol = R_pMat[0].length;
  var ppr = R_pMat;
  var prTmp;
  var rCoef;
  var rAbsMax;
  var rAbs;
  var rPivot;
  var pjPivot;
  var iTmp;
  var j_rMax;
  var i, j, k;

//   F_fSquare_pMat_Matrix(R_pMat, TRUE, TRUE);
// 
//   R_pMat->JMat0 |= C_JMat_fReArrang;
//   R_pMat->siCnt = 0;
// 
//   if (R_pMat->JMat0 & C_JMat_fBias) {
//      iNNCol++;
//   } /* if */
//   if (R_pMat->pajPivot == NULL) {
//      R_pMat->pajPivot = (index *)F_pByAlloc_Alloc((sizeof(index) * iNNRow), C_JDealloc_ImgCycle);
// //     R_pMat->pajPivot = ajPivot; // debug
//   } /* if */

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
         iTmp = pjPivot[i];
         pjPivot[i] = pjPivot[j_rMax];
         pjPivot[j_rMax] = iTmp;
         prTmp = ppr[i];
         ppr[i] = ppr[j_rMax];
         ppr[j_rMax] = prTmp;
      } /* if */

      if (P_JGauss & C_JGauss_Inverse) {
/*
* Calculate the inverse of the given matrix using Gauss-Jordan algorithm.
*/
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
      }
      else {
/*
* Gauss algorithm of elimination.
*/
         for (j = i +1; j < iNNRow; j++) {
             rCoef = ppr[j][i] / rPivot;
             ppr[j][i] = (P_JGauss & C_JGauss_LR)? rCoef: 0.0;
             for (k = i +1; k < iNNCol; k++) {
                 ppr[j][k] -= ppr[i][k] * rCoef;
             } /* for */
         } /* for */
      } /* if */
  } /* for */

  return(R_pMat);
} /* F_Mat_Gauss */



/*-----U_Init_Matrix --------------------------------------------------------
*
*/ 
function U_Init_Matrix()
{
  U_Root0("$Matrix", C_jCd_Cur);
  
//   var Mat0 = F_Mat_TmsScalar(S_Mat0, 3);
//   var Mat1 = F_Mat_Add(S_Mat0, S_Mat1);
//   var Mat2 = F_Mat_Prod(S_MatA, S_MatB);
//   var Mat3 = F_Mat_Transpose(S_Mat0);

//   var Mat4 = F_Mat_Gauss(S_Sys2, 2);
//   ALERT("XXX");

} /* U_Init_Matrix */

  return(_Matrix);
})();  /* Matrix */


