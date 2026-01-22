/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : combin.js derived from combin.c
* Function    : Combinatorial Calculus.
* FirstEdit   : 10/05/2022
* LastEdit    : 10/05/2022
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2022
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

/*----- Module $Combin --------------------------------------------------------
*
*/ 
const $Combin = (function () {
  var _Combin = {};
  _Combin.U_Init               = U_Init_Combin;                // function U_Init_Combin();
  _Combin.F_rFact            = F_rFact_Combin;               // function F_rFact_Combin(P_nN);
  _Combin.F_nNN_Permutation  = F_nNN_Permutation_Combin;     // function F_nNN_Permutation_Combin(P_nN);
  _Combin.F_nNN_Disposition  = F_nNN_Disposition_Combin;     // function F_nNN_Disposition_Combin(P_nN, P_nK);
  _Combin.F_nNN_Bi           = F_nNN_Bi_Combin;              // function F_nNN_Bi_Combin(P_nN, P_nK);
  _Combin.F_rNN_Bi           = F_rNN_Bi_Combin;              // function F_rNN_Bi_Combin(P_rN, P_rK);
  _Combin.F_nNN_Combination  = F_nNN_Combination_Combin;     // function F_nNN_Combination_Combin(P_nN, P_nK);
  _Combin.F_nDist_Dw_Hamming = F_nDist_Dw_Hamming_Combin;    // function F_nDist_Dw_Hamming_Combin(P_Dw0, P_Dw1);

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Combin;

const S_aQwFact = [
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

/*----- Local Variables ----------------------------------------------*/
/*--------------------------------------------------------------------*/

/*-----F_rFact_Combin --------------------------------------------------------
*
*/ 
function F_rFact_Combin(P_nN)
{
  var iCard_aQwFact = S_aQwFact.length;
  var rRes;
  var i;
  
  iCard_aQwFact = 4;

  if (P_nN < iCard_aQwFact) {
     rRes = S_aQwFact[P_nN];
  }
  else {
     rRes = S_aQwFact[(iCard_aQwFact -1)];
     i = (iCard_aQwFact);
     while (i <= P_nN) {
           rRes *= i;
           S_aQwFact[i] = rRes;
           i++;
     } /* while */
  } /* if */
  return(rRes);
} /* F_rFact_Combin */

/*-----F_nFact_Combin --------------------------------------------------------
*
*/ 
function F_nFact_Combin(P_nN)
{
  var iCard_aQwFact = S_aQwFact.length;
  var rRes;
  var i;
  
  iCard_aQwFact = 4;

  if (P_nN < iCard_aQwFact) {
     rRes = S_aQwFact[P_nN];
  }
  else {
     rRes = S_aQwFact[(iCard_aQwFact -1)];
     i = (iCard_aQwFact);
     while (i <= P_nN) {
           rRes *= i;
           S_aQwFact[i] = rRes;
           i++;
     } /* while */
  } /* if */
  return(rRes);
} /* F_nFact_Combin */

/*-----F_nNN_Permutation_Combin --------------------------------------------------------
*
* Pn = D(n,n) = n!
*/ 
function F_nNN_Permutation_Combin(P_nN)
{
  return(F_nFact_Combin(P_nN));
} /* F_nNN_Permutation_Combin */

/*-----F_nNN_Disposition_Combin --------------------------------------------------------
*
* D(n,k) = n! / (n - k)!
*/ 
function F_nNN_Disposition_Combin(P_nN, P_nK)
{
  var iN_Fact = F_nFact_Combin(P_nN);
  var iN_Mns_K_Fact = F_nFact_Combin(P_nN - P_nK);
  var iRes = iN_Fact / iN_Mns_K_Fact;
  return(iRes);
} /* F_nNN_Disposition_Combin */

/*-----F_nNN_Bi_Combin --------------------------------------------------------
*
* Compute Binomial coefficient C(n, k) = D(n, k) / Pk = n! / k!(n - k)!
*/ 
function F_nNN_Bi_Combin(P_nN, P_nK)
{
  var iN_Fact = F_nFact_Combin(P_nN);
  var iK_Fact = F_nFact_Combin(P_nK);
  var iN_Mns_K_Fact = F_nFact_Combin(P_nN - P_nK);
  var iRes = iN_Fact / (iK_Fact * iN_Mns_K_Fact);
  return(iRes);
} /* F_nNN_Bi_Combin */

/*-----F_rNN_Bi_Combin --------------------------------------------------------
*
* Compute Binomial coefficient C(n, k) = D(n, k) / Pk = n! / k!(n - k)!
*/ 
function F_rNN_Bi_Combin(P_rN, P_rK)
{
  var rN_Fact = F_rFact_Combin(P_rN);
  var rK_Fact = F_rFact_Combin(P_rK);
  var rN_Mns_K_Fact = F_nFact_Combin(P_rN - P_rK);
  var rRes = rN_Fact / (rK_Fact * rN_Mns_K_Fact);
  return(rRes);
} /* F_rNN_Bi_Combin */

/*-----F_nNN_Combination_Combin --------------------------------------------------------
*
* Compute Binomial coefficient C(n, k) = D(n, k) / Pk = n! / k!(n - k)!
*/ 
function F_nNN_Combination_Combin(P_nN, P_nK)
{
  return(F_nNN_Bi_Combin(P_nN, P_nK));
} /* F_nNN_Combination_Combin */

/*-----F_nDist_Dw_Hamming_Combin --------------------------------------------------------
*
*/ 
function F_nDist_Dw_Hamming_Combin(P_Dw0, P_Dw1)
{
  const C_iNNBit_DWord = 64;
  var DwTmp0 = P_Dw0;
  var DwTmp1 = P_Dw1;
  var iCnt = 0;
  var i;
  for (i = 0; i < C_iNNBit_DWord; i++) {
      if ((DwTmp0 & 1) ^ (DwTmp1 & 1)) {
         iCnt++;
      } /* if */
      DwTmp0 >>= 1;
      DwTmp1 >>= 1;
  } /* for */
  return(iCnt);
} /* F_nDist_Dw_Hamming_Combin */

/*-----F_nOrdPerm_Combin --------------------------------------------------------
*
* Given an array P_pArr1T->paElem representing the indexes of a permutation
* of n = P_pArr1T->iCard_aElem of type integer,
* calculate the number of inversions referred to the sequence 0,1,2,3,...
*/ 
// function F_nOrdPerm_Combin(struct Arr1T *P_pArr1T)
// {
//   int *pi = (int *)P_pArr1T->paElem;
//   int  iCard = P_pArr1T->iCard_aElem;
//   int  iCnt = 0;
//   int  iLft;
//   int  i, j;
// 
//   for (i = 0; i < iCard -1; i++) {
//       iLft = pi[i];
//       for (j = i +1; j < iCard; j++) {
//           if (iLft > pi[j]) {
//              iCnt++;
//           } /* if */
//       } /* for */
//   } /* for */
//   return(iCnt);
// } /* F_nOrdPerm_Combin */

/*-----U_Init_Combin --------------------------------------------------------
*
*/ 
function U_Init_Combin()
{
//   var szTxt = "";
//   var i, j;
//   for (i = 1; i < 8; i++) {
//       for (j = 0; j <= i; j++) {
//           szTxt += F_rNN_Bi_Combin(i, j) + " ";
//       } /* for */
//       szTxt += "\n";
//   } /* for */
//   Id_Lbl0.innerText = szTxt;

  U_Root0("$Combin", C_jCd_Cur, 2);
} /* U_Init_Combin */

  U_Root0("$Combin", C_jCd_Cur, 1);
  return(_Combin);
})();  /* Combin */

