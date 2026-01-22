/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : stat_ddj.js
* Function    : Statistics.
* FirstEdit   : 11/10/2022
* LastEdit    : 09/01/2026
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2026
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
* Probability Density Function (PDF)
* Cumulative Distribution Function (CDF)
* Inverse Cumulative Distribution Function (ICDF)
* 
* Shaum = Murray R. SPIEGEL "Statistica".
* 
* Cnds = condensed-value (LCD) = value obtained replacing the value Val_ij = Coll0[i][j] with the index k of the repertoire such that S_aHistog[k] == Val_ij.
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/
/*----- Global Variables ---------------------------------------------*/

/*----- Module OPrn --------------------------------------------------------
*
*/

/* # ---- Object Prn --------------------------------------------------------
*
*/ 
const $Stat_DDJ = (function(){
  var _Stat_DDJ = {};
  _Stat_DDJ.U_Init = U_Init; 
  _Stat_DDJ.U_Stat_Field      = U_Stat_Field;             // function U_Stat_Field();
  _Stat_DDJ.U_Stat_Record     = U_Stat_Record;            // function U_Stat_Record();
  _Stat_DDJ.U_Stat_Arr_Freq   = U_Stat_Arr_Freq;          // function U_Stat_Arr_Freq();
  
  _Stat_DDJ.F_Stat_Field      = F_Stat_Field;             // function F_Stat_Field(P_UsrView0, P_jaFld, P_Fld1);
  
  _Stat_DDJ.U_Freq            = U_Freq;                   // function U_Freq();
  _Stat_DDJ.F_Correl          = F_Correl;                 // function F_Correl(P_UsrView0, P_jaFld);
  _Stat_DDJ.F_aClass_Mp_aSmpl = F_aClass_Mp_aSmpl;        // function F_aClass_Mp_aSmpl(P_arSmpl, P_rMin, P_rMax, P_iNn_Class);
  
  _Stat_DDJ.F_arRegression    = F_arRegression;           // function F_arRegression();
  _Stat_DDJ.F_arMultiRegr     = F_arMultiRegr;            // function F_arMultiRegr(P_Mat);

  _Stat_DDJ.F_rPDF_Normal     = F_rPDF_Normal_Stat;       // function F_rPDF_Normal_Stat(P_rX);
  _Stat_DDJ.F_rCDF_Normal     = F_rCDF_Normal_Stat;       // function F_rCDF_Normal_Stat(P_rX);

  _Stat_DDJ.F_rCDF_ERF        = F_rCDF_ERF_Stat;          // function F_rCDF_ERF_Stat(P_rX);
  _Stat_DDJ.F_rNN_Bi          = F_rNN_Bi_Combin;          // function F_rNN_Bi_Combin(P_rN, P_rK);
  _Stat_DDJ.F_nNN_Permutation = F_nNN_Permutation_Combin; // function F_nNN_Permutation_Combin(P_nN);
  _Stat_DDJ.F_nNN_Disposition = F_nNN_Disposition_Combin; // function F_nNN_Disposition_Combin(P_nN, P_nK);
  _Stat_DDJ.F_nNN_Combination = F_nNN_Combination_Combin; // function F_nNN_Combination_Combin(P_nN, P_nK);

  _Stat_DDJ.F_rPDF_HyperGeom  = F_rPDF_HyperGeometric_Stat; // function F_rPDF_HyperGeometric_Stat(P_iA, P_iB, P_iK, P_iN);
  _Stat_DDJ.F_rPDF_Gamma      = F_rPDF_Gamma_Stat;        // function F_rPDF_Gamma_Stat(P_rA, P_rB, P_rC);
  
  _Stat_DDJ.F_rPDF_tStudent   = F_rPDF_tStudent_Stat;     // function F_rPDF_tStudent_Stat(P_rt, P_iN);
  _Stat_DDJ.F_rCDF_tStudent   = F_rCDF_tStudent_Stat;     // function F_rCDF_tStudent_Stat(P_rt, P_iN);
   
  _Stat_DDJ.F_arICDF_Mp_CDF   = F_arICDF_Mp_CDF;          // function F_arICDF_Mp_CDF(P_pF_CDF);
  _Stat_DDJ.F_ai_ACF          = F_ai_ACF;                 // function F_ai_ACF(P_Coll, P_iNn);
  
  _Stat_DDJ.U_Stat_Clipboard  = U_Stat_Clipboard;         // function U_Stat_Clipboard();
  _Stat_DDJ.U_Hist_Clipboard  = U_Hist_Clipboard;         // function U_Hist_Clipboard();
  
  _Stat_DDJ.U_mSoCnds_Mp_Cnds = U_mSoCnds_Mp_Cnds;        // function U_mSoCnds_Mp_Cnds(P_UsrView0);    /* Sorted Correlation */
  _Stat_DDJ.U_mFunDep_Mp_Cnds = U_mFunDep_Mp_Cnds;        // function U_mFunDep_Mp_Cnds(P_UsrView0);    /* Functional Dependency */

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Stat_DDJ;

/*----- Local Variables ----------------------------------------------*/

var S_Stat0 = {};

var S_aRcd_Cnds = [];
var S_aFld_Cnds = [];
var S_aaHist = [];
var S_fCnds = false;     /* Enable Condensed Matrix building */                                                                                                       
var S_aaHistog = [];
var S_aHistog = [];
var S_iNnClass = 10;     /* Number of classes a priori */

/*-----U_Stat_Clipboard --------------------------------------------------------
*
*  Save statistics in the clipboard.
*/ 
function U_Stat_Clipboard()
{
  var szTmp = JSON.stringify(S_Stat0);
  var szRes = szTmp.replaceAll(",", ",\n");
  U_Wr_Clipboard(szRes);
} /* U_Stat_Clipboard */

/*-----U_Hist_Clipboard --------------------------------------------------------
*
* Save histogram in the clipboard.
*/ 
function U_Hist_Clipboard()
{
  var szTmp = JSON.stringify(S_aHistog);
  var szRes = szTmp.replaceAll("],", "],\n");
  U_Wr_Clipboard(szRes);
} /* U_Hist_Clipboard */

/*-----U_Stat_Field --------------------------------------------------------
*
* Given a column calculate the corresponding statistics.
*/ 
function U_Stat_Field()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  var jaFld = UsrView0.jaFld1;
  var Fld1  = UsrView0.aFld1[jaFld] // ++++
   
  S_Stat0 = F_Stat_Field(UsrView0, jaFld, Fld1);
  
  _Stat_DDJ.S_DBox_Stat = new CL_DBox_Obj("Id_Div_DBox0", "$Stat_DDJ.S_DBox_Stat", "Statistics.", S_Stat0, null, null, null, G_asaMnEntry.Stat, "Stat");  
  _Stat_DDJ.S_DBox_Stat.U_Hub(C_JPnl_Open); 
} /* U_Stat_Field */

/*-----U_Stat_Record --------------------------------------------------------
*
*/ 
function U_Stat_Record()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var iCard0 = XDB0.Coll0.length;
  var aFld = UsrView0.aFld1;
  var iCard_aFld1 = UsrView0.aFld1.length;
  var aStat0 = [];
  var WwFlag0 = C_WwFlag_Null; 
  var Fld1;

  S_fCnds = false;
  S_aaHistog = [];
  for (let i = 0; i < iCard0; i++) {
      S_aRcd_Cnds[i] = [];
  } /* for */
  
  if ((iCard_aFld1 == 2) && (aFld[1].szType == "AbsFreq")) {         // ?????
     /* Given a frequency table calculate the corresponding statistics. */
      ALERT("check Fld1", 1);
      aStat0[0] = F_Stat_Field_Freq(UsrView0, 0, Fld1);
      WwFlag0 = C_WwFlag_fTransp;
  }
  else {
     /* Calculate the statistics for the selected columns. */
     for (let i = 0; i < iCard_aFld1; i++) {
         Fld1 = aFld[i];
         aStat0[i] = F_Stat_Field(UsrView0, i, Fld1); 
     } /* for */
  } /* if */
  if (S_fCnds) {
     S_aFld_Cnds = [];
     for (let i = 0; i < aFld.length; i++) {
         S_aFld_Cnds[i] = {"szNm":aFld[i].szNm, "szType":"number", "iLen":8};
     } /* for */ 
   
     new CL_XDB0(["S_aFld_Cnds", C_JKndTup_aObj, S_aFld_Cnds, null, "aFld_aFld", "", (C_WwFlag_fReadOnly | C_WwFlag_fOverWrite), C_jCd_Cur]);
     new CL_XDB([`aaHis_${XDB0.szNmColl}`, C_JKndTup_aRcd, S_aaHistog,  null, "AutoDetect",  "Repertoirs", (C_WwFlag_fOverWrite | C_WwFlag_fTransp), C_jCd_Cur, C_Bag_UsrView_Dflt]);
     new CL_XDB([`Cnds_${XDB0.szNmColl}`, C_JKndTup_aRcd, S_aRcd_Cnds, S_aFld_Cnds, "S_aFld_Cnds", "'Condensed Collection'", C_WwFlag_fOverWrite, C_jCd_Cur, C_Bag_UsrView_Dflt]);
  } /* if */
  S_fCnds = false;
  
  var Bag_UsrView0 = ["", C_jPg_0, '', null, null, "TabStat"];
  var szNmColl_Stat = `Statistics_${XDB0.szNmColl}`;

  new CL_XDB([szNmColl_Stat, C_JKndTup_aObj, aStat0, G_aFld_Stat, "aFld_Stat", "", (WwFlag0 | C_WwFlag_fOverWrite | C_WwFlag_fDisplay), C_jCd_Cur, Bag_UsrView0]);
} /* U_Stat_Record */

/*-----F_Stat_Field --------------------------------------------------------
*
* Compute statistics for the given field.
*/ 
function F_Stat_Field(P_UsrView0, P_jaFld, P_Fld1)
{
  if (P_jaFld < 0) {
     $Error.U_Error(C_jCd_Cur, 1, "No column selected!", "", false);
  } /* if */

  var Arr0 = P_UsrView0.F_Arr_Mp_Field(P_UsrView0, P_jaFld, false); 

//   $DEBUG bignum test
//   Arr0 = [13n, 21n, 39n, 42n, 5n, 68n, 73n, 85n, 97n, 10n];
  var Stat0 = F_Stat_Arr(P_UsrView0, Arr0, P_jaFld, P_Fld1);
  
  return(Stat0);
} /* F_Stat_Field */

/*-----F_Stat_Arr --------------------------------------------------------
*
* Compute statistics for array P_Arr0.
* 
* Ref https://en.wikipedia.org/wiki/Quartile
*/ 
function F_Stat_Arr(P_UsrView0, P_Arr0, P_jaFld, P_Fld1)
{
  function U_ErrMng()
  {
    iCnt_Err++;
    switch (szType_Val) {
       case "undefined": {
             iCnt_Undef++;
       } break;
       case "object" : {
             if (Val == null) {
                iCnt_Null++;
             } /* if */                
      } break;
    } /* switch */  
  } /* U_ErrMng */
  
  var XDB0 = P_UsrView0.XDB0;
  var Arr0 = [];
  var iCard  = P_Arr0.length;
  var iNnRow = Arr0.length;
  var iNnRow_Div2;
  var iNnRow_Div4;
  var iVarCor = 0;
  var iCard_Histog;
  var iSum1 = 0;
  var iSum2 = 0;
  var iSumTmp = 0;
  var iMin = Number.MAX_VALUE;
  var iMax = Number.MIN_VALUE;
  var iMedian;
  var i1Quart;
  var i3Quart;
  var iMean, iVar;
  var iStdDev;
  var iVal;
  var Val;
  var iTmp;
  var iMu;
  var iSkew;
  var iKurt;
  var i1 = 1;     /* $IMPORTANT: Because BigInt. */
  var i2 = 2;
  var i3 = 3;
  var i4 = 4;
  var i, j, k;
  var fCheck = true; /* Check type compatibility. */
  var szType_Val;
  var iWdt;                /* length of the string including leading and trailing spaces */
  var iWdtMin = 1000000;
  var iWdtMax = -1;
  var iLen;                /* length of the string without leading and trailing spaces */
  var iLenMin = 1000000;
  var iLenMax = -1;
  var iCnt_Err = 0;
  var iCnt_NaN = 0;
  var iCnt_Undef = 0;
  var iCnt_Null = 0;      
  var szType_JS = typeof(P_Arr0[0]);

  if (szType_JS == "symbol") {
     return("");
  } /* if */
  if (fCheck) {
     /*
     * Extract the array of the valid values.
     */
     k = 0;
     switch (szType_JS) {
       case "number" : {       
            for (i = 0; i < iCard; i++) {
                Val = P_Arr0[i];
                szType_Val = typeof(Val);
                if (szType_Val == "number") {
                   if (Number.isNaN(Val)) {
                      iCnt_NaN++;
                      iCnt_Err++;
                      continue;
                   } /* if */
                   Arr0[k++] = Val;
                }
                else {
                   U_ErrMng();
                } /* if */
            } /* for */
       } break;
       case "bigint" : {       
            for (i = 0; i < iCard; i++) {
                Val = P_Arr0[i];
                szType_Val = typeof(Val);
                if (szType_Val == "bigint") {
                   Arr0[k++] = Val;
                }
                else {
                   U_ErrMng();
                } /* if */
            } /* for */
       } break;
       case "string" : {       
            for (i = 0; i < iCard; i++) {
                Val = P_Arr0[i];
                szType_Val = typeof(Val);
                if (szType_Val == "string") {
                   Arr0[k++] = Val;
                        iWdt = Val.length;
                        if (iWdt < iWdtMin) {
                           iWdtMin = iWdt;
                        } /* if */
                        if (iWdtMax < iWdt) {
                           iWdtMax = iWdt;
                        } /* if */
                        var szTrimmed = Val.trim();
                        iLen = szTrimmed.length;
                        if (iLen < iLenMin) {
                           iLenMin = iLen;
                        } /* if */
                        if (iLenMax < iLen) {
                           iLenMax = iLen;
                        } /* if */
                }
                else {
                   U_ErrMng();
                } /* if */
            } /* for */
       } break;
       case "boolean" : {       
            for (i = 0; i < iCard; i++) {
                Val = P_Arr0[i];
                szType_Val = typeof(Val);
                if (szType_Val == "boolean") {
                   Arr0[k++] = Val;
                   if (Val) {
                      iSum1++;
                   } /* if */
                }
                else {
                   U_ErrMng();
                } /* if */
            } /* for */
            iNnRow = Arr0.length;
            if (iNnRow > 0) {
               iMean = iSum1 / iNnRow;
            } /* if */
       } break;
       default : {
            Arr0 = P_Arr0;
       } break;
     } /* switch */
  } /* if */

  iNnRow = Arr0.length;
  if (iNnRow == 0) {
     $Error.U_Error(C_jCd_Cur, 2, "Statistics cannot be computed because the Collection doesn't contains valid values!", "", false);
  } /* if */
  /* The collection has at least a valid value. */

  iNnRow_Div2 = iNnRow >> 1;
  iNnRow_Div4 = iNnRow >> 2;
  
  var fNumeric = ((szType_JS == "number") || (szType_JS == "bigint"));
  S_aHistog = [];   /* Reset histogram. */
  
  if (fNumeric) {
     if (szType_JS == "bigint") {
        i1    = 1n;
        i2    = 2n;
        i3    = 3n;
        i4    = 4n;
        iSum1 = 0n;
        iSum2 = 0n;
        iSumTmp = 0n;
        iNnRow = BigInt(iNnRow);
     } /* if */
     
     for (let i = 0; i < iNnRow; i++) {
         iVal = Arr0[i];
         iSum1 += iVal;
         iSum2 += (iVal * iVal);

         iCard_Histog = S_aHistog.length;
         for (j = 0; j < iCard_Histog; j++) {
             if (iVal == S_aHistog[j][0]) {
                /* the value iVal is already present in the array increment frequency */
                S_aHistog[j][1]++;
                U_Cnds(i, P_jaFld, j);
                break;
             } /* if */
         } /* for */
         if (j == iCard_Histog) {
            /* the value iVal is not yet present in the array add it */
            S_aHistog[j] = [iVal, 1];
            U_Cnds(i, P_jaFld, j);
         } /* if */
     } /* for */
     var iAve1 = iSum1 / iNnRow;
     var iAve2 = iSum2 / iNnRow;
     iVar = iAve2 - (iAve1 * iAve1);
     iStdDev = (szType_JS != "bigint")? Math.sqrt(iVar): F_li_Sqrt(iVar);

     if (iNnRow > i1) {
        iVarCor = (iNnRow * iVar) / (iNnRow -i1);
     } /* if */
     iMean = iAve1;
     
     for (let i = 0; i < iNnRow; i++) {
         iTmp = Arr0[i] - iAve1;
         iSumTmp += iTmp;     
     } /* for */
     iMu = Number(iSumTmp) / Number(iStdDev);
     iSkew = iMu**3;
     iKurt = iMu**4;      
  } /* if */

  if (!fNumeric) {
     
     for (let i = 0; i < iNnRow; i++) {
         iVal = Arr0[i];

         iCard_Histog = S_aHistog.length;
         for (j = 0; j < iCard_Histog; j++) {
             if (iVal == S_aHistog[j][0]) {
                /* the value iVal is already present in the array increment frequency */
                S_aHistog[j][1]++;
                U_Cnds(i, P_jaFld, j);
                break;
             } /* if */
         } /* for */
         if (j == iCard_Histog) {
            /* the value iVal is not yet present in the array add it */
            S_aHistog[j] = [iVal, 1];
            U_Cnds(i, P_jaFld, j);
         } /* if */
     } /* for */
  } /* if */
  
  iCard_Histog = S_aHistog.length;
  var jClassMode = S_aHistog[0][0];
  var iFreqMode  = S_aHistog[0][1];
  var fMultiModal = false;

  for (let j = 1; j < iCard_Histog; j++) {
      if (iFreqMode < S_aHistog[j][1]) {
         jClassMode = S_aHistog[j][0];
         iFreqMode  = S_aHistog[j][1];
         fMultiModal = false;      
      }
      else {
         if (iFreqMode == S_aHistog[j][1]) {
            fMultiModal = true;
         } /* if */
      } /* if */
  } /* for */
  
  if (S_fCnds) {
     S_aaHistog[P_jaFld] = S_aHistog;
  } /* if */
  
  iNnRow = Arr0.length;    /* Redefine iNnRow as a Number. */
  if (fNumeric) {
     let pF = (szType_JS == "bigint")? (P_A, P_B) => ( (P_A - P_B)? 1:0): (P_A, P_B) => (P_A - P_B);

     Arr0.sort(pF);
     iMedian = ((iNnRow & 1) == 1)? Arr0[iNnRow_Div2]: (Arr0[iNnRow_Div2] +  Arr0[iNnRow_Div2 -1])/i2;
     i1Quart = ((iNnRow_Div2 & 1) == 1)? Arr0[iNnRow_Div4]: (Arr0[iNnRow_Div4] + Arr0[iNnRow_Div4 -1])/i2;
     i3Quart = ((iNnRow_Div2 & 1) == 1)? Arr0[iNnRow - iNnRow_Div4]: (Arr0[iNnRow - iNnRow_Div4] +  Arr0[iNnRow - iNnRow_Div4 -1])/i2;
  }
  else {
     Arr0.sort();
     iMedian = Arr0[iNnRow_Div2];
     i1Quart = Arr0[iNnRow_Div4];
     i3Quart = Arr0[iNnRow - iNnRow_Div4];
  } /* if */
  iMin = Arr0[0];
  iMax = Arr0[iNnRow -1];
   
var Stat0 = {
"Field Num."   : P_jaFld,
"Field Name"   : P_Fld1.szNm,
"Type"         : P_Fld1.szType,
"Type_JS"      : szType_JS,
"Num. of Data" : iCard,
"Valid Data"   : Arr0.length,
"Sum"          : iSum1,
"Number of Classes" : 1,           /* $NOTE: This parameter could be set by the user! */
"Min"          : iMin,
"Max"          : iMax,
"Average"      : iMean,
"Median"       : iMedian,
"Mode"         : jClassMode,
"MultiModal"   : fMultiModal,
"Frequency of the Mode"  : iFreqMode,
"Number of Distinct values" : S_aHistog.length,
"1-Quart"      : i1Quart,
"3-Quart"      : i3Quart,
   };
  if ((szType_JS == "number") || (szType_JS == "bigint")) {
     Stat0["Mean"]    = iMean;
     Stat0["Variance"] = iVar;
     Stat0["Standard Deviation"] = iStdDev;
     Stat0["Rel. Disp"] = iStdDev / iMean;
     Stat0["Variance Corrected"] = iVarCor;
     Stat0["Standard Deviation Corrected"] =  (szType_JS != "bigint")? Math.sqrt(iVarCor): F_li_Sqrt(iVarCor); // Math.sqrt(iVarCor);
     Stat0["Skew"] = iSkew;
     Stat0["Kurtosis"] = iKurt;
  }
  else {
     Stat0["Mean"]    = "";
     Stat0["Variance"]     = "";
     Stat0["Standard Deviation"]  = "";
     Stat0["Rel. Disp"] = "";
     Stat0["Variance Corrected"]  = "";
     Stat0["Standard Deviation Corrected"] = "";
     Stat0["Skew"]    = "";
     Stat0["Kurtosis"]    = "";
  } /* if */
  if (szType_JS == "string") {
    Stat0["Width Min"] = iWdtMin;    /* strings' width */
    Stat0["Width Max"] = iWdtMax;
    Stat0["Width (Trimmed) Min"] = iLenMin;   /* width of Trimmed strings */
    Stat0["Width (Trimmed) Max"] = iLenMax;
  }
  else {
    Stat0["Width Min"] = "";
    Stat0["Width Max"] = "";
    Stat0["Length Min"] = "";
    Stat0["Length Max"] = "";
  } /* if */

  Stat0["Num. of Errors"] = iCnt_Err;
  Stat0["Num. Undefined"] = iCnt_Undef;
  Stat0["Num. Null"]  = iCnt_Null;
  Stat0["Num. NaN"]   = iCnt_NaN;

  return(Stat0);
} /* F_Stat_Arr */

/*-----F_li_Sqrt --------------------------------------------------------
*
* BigInt square root
* 
* https://stackoverflow.com/questions/53683995/javascript-big-integer-square-root/58863398
* https://stackoverflow.com/questions/53683995/javascript-big-integer-square-root/58863398#58863398
*/ 
function F_li_Sqrt(value) {
    if (value < 0n) {
        throw('square root of negative numbers is not supported');
    }

    if (value < 2n) {
        return(value);
    }

    function newtonIteration(n, x0) {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return(x0);
        }
        return newtonIteration(n, x1);
    }

    return newtonIteration(value, 1n);
} /* F_li_Sqrt */

/*-----U_Cnds --------------------------------------------------------
*
*  Given the value of Coll0[P_i][P_j] compute the corresponding "condensed" value.  
*/ 
function U_Cnds(P_i, P_j, P_k)
{
  if (S_fCnds) {
     try {
     S_aRcd_Cnds[P_i][P_j] = P_k;
     
     } catch (P_Err) {
         ALERT("Cnds",1);
     } /* try catch */
  } /* if */
} /* U_Cnds */

/*-----F_Stat_Field_Freq --------------------------------------------------------
*
* Compute statistcs of grouped values.
* Coll0[P_jaFld]   = center of the class.
* Coll0[P_jaFld+1] = absolute frequency.
*/ 
function F_Stat_Field_Freq(P_UsrView0, P_jaFld)
{
  var XDB0  = P_UsrView0.XDB0;
  
  if (P_jaFld < 0) {
     $Error.U_Error(C_jCd_Cur, 3, "No column selected!", "", false);
  } /* if */
  var aRcd = XDB0.Coll0;

  if (aRcd[0].length <= P_jaFld +1) {
     $Error.U_Error(C_jCd_Cur, 4, "No x freq file", "", false);
  } /* if */
  
  var Arr0      = P_UsrView0.F_Arr_Mp_Field(P_UsrView0, P_jaFld, false);
  var aiAbsFreq = P_UsrView0.F_Arr_Mp_Field(P_UsrView0, P_jaFld +1, false);

  var Stat0 = F_Stat_Arr_Freq(P_UsrView0, Arr0, aiAbsFreq);
  return(Stat0);
} /* F_Stat_Field_Freq */

/*-----U_Stat_Arr_Freq --------------------------------------------------------
*
*/ 
function U_Stat_Arr_Freq()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();

  var Arr0      = UsrView0.F_Arr_Mp_Field(UsrView0, 0, false);
  var aiAbsFreq = UsrView0.F_Arr_Mp_Field(UsrView0, 1, false);

  S_Stat0 = F_Stat_Arr_Freq(UsrView0, Arr0, aiAbsFreq);
  
  $Stat_DDJ.S_DBox_Stat = new CL_DBox_Obj("Id_Div_DBox0", "$Stat_DDJ.S_DBox_Stat", "Statistics.", S_Stat0, null, null, null, G_asaMnEntry.Stat, "Stat");  
  $Stat_DDJ.S_DBox_Stat.U_Hub(C_JPnl_Open); 
} /* U_Stat_Arr_Freq */
  
/*-----F_Stat_Arr_Freq --------------------------------------------------------
*
* Compute statistics of grouped values.
*/ 
function F_Stat_Arr_Freq(P_UsrView0, P_arCent, P_aiAbsFreq)
{
  var XDB0 = P_UsrView0.XDB0;
  var aRcd = XDB0.Coll0;
  var szType_JS = typeof(aRcd[0][0]);  
  var iCard0 = aRcd.length;
  var x;
  var iFreq;
  var iSum1 = 0;
  var iSum2 = 0;
  var iTmp;
  var iN = 0;
  var iMean;
  var iVar;
  var iVarCor;
  var iStdDev;
  var iAmp = aRcd[1][0] - aRcd[0][0];    /* Class span */

  for (let i = 0; i < iCard0; i++) {
//      x     = (aRcd[i][0] + aRcd[i +1][0] -1)/2;
      x      = aRcd[i][0];
      iFreq  = aRcd[i][1];
      iTmp   = x * iFreq;
      iSum1 += iTmp;
      iSum2 += x * iTmp;
      iN += iFreq;
  } /* for */
  
  var iAve1 = iSum1 / iN;
  var iAve2 = iSum2 / iN;
  iVar = iAve2 - (iAve1 * iAve1);
  
  if (iN > 1) {
     iVarCor = iVar - (iAmp**2 / 12);  /* Shepard correction. Shaum p.72 */
  } /* if */
  iMean = iAve1;
  iStdDev = Math.sqrt(iVar);
  
  /* Calculate Moments 1..4 */
  var M = [0, 0, 0, 0, 0];
  var iCum;
  var rKurt;
  var rSkew;
  
  for (let i = 0; i < iCard0; i++) {
      x      = aRcd[i][0];
      iFreq  = aRcd[i][1];

      iTmp = (x - iAve1);
      iCum = iTmp;

      M[1] += iFreq * iCum; iCum *= iTmp;
      M[2] += iFreq * iCum; iCum *= iTmp;
      M[3] += iFreq * iCum; iCum *= iTmp;
      M[4] += iFreq * iCum;
  } /* for */

  M[1] /= iN;  
  M[2] /= iN;  
  M[3] /= iN;  
  M[4] /= iN;
  
  rKurt = M[4]/(iVar**2);
  rSkew = M[3]/(iStdDev**3);
  
var jaFld = 0;    

var Stat0 = {
  "szNm_Fld_KRO"   : P_UsrView0.aFld1[jaFld].szNm,
  "szType_KRO"     : szType_JS,
  "iCard_KRO"      : iN,
  "iSum_KRO"       : iSum1,
   };
  if (szType_JS == "number") {
     Stat0["iAmp_KRO"]     = iAmp;
     Stat0["iMean_KRO"]    = iMean;
     Stat0["iVar_KRO"]     = iVar;
     Stat0["iStdDev_KRO"]  = iStdDev;
     Stat0["Rel. Disp_KRO"] = iStdDev / iMean;
     Stat0["iVarCor_KRO"]  = iVarCor;
     Stat0["iStdDevCor_KRO"] = Math.sqrt(iVarCor);
//     Stat0["m1_KRO"] = M[1];   /* Always zero */
//     Stat0["m2_KRO"] = M[2];   /* Var */
     Stat0["m3_KRO"] = M[3];
     Stat0["m4_KRO"] = M[4];
     Stat0["Skew_KRO"] = rSkew;
     Stat0["Kurtosis_KRO"] = rKurt;
  } /* if */

  return(Stat0);
} /* F_Stat_Arr_Freq */

/*----- F_Correl --------------------------------------------------------
*
* Calculate the correlation between two adjacent columns.
*/ 
function F_Correl(P_UsrView0, P_jaFld)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = P_UsrView0.XDB0;
  var ar0 = UsrView0.F_Arr_Mp_Field(UsrView0, P_jaFld, false);
  var ar1 = UsrView0.F_Arr_Mp_Field(UsrView0, P_jaFld +1, false);
    
  if (P_jaFld < 0) {
     $Error.U_Error(C_jCd_Cur, 5, "No column selected!", "", false);
  } /* if */
  
  var rCorr = F_Correl_2(ar0, ar1);

  return(rCorr);
} /* F_Correl */
  
/*-----U_mSoCnds_Mp_Cnds --------------------------------------------------------
*
* DataBase NORMALIZATION
* Given a Collection in "Condensed" format calculate the corresponding sorted-correlation matrix.
*/ 
function U_mSoCnds_Mp_Cnds(P_UsrView0)
{
  var XDB0  = P_UsrView0.XDB0;
  var Coll0 = XDB0.Coll0;
  
  function F_iLt_Cmp(P_0, P_1) {
    var iRes = 0;    
    if (P_0 < P_1) {
       iRes = -1;
    } /* if */
    if (P_1 < P_0) {
       iRes =  1;
    } /* if */
    return(iRes);
  } /* F_iLt_Cmp */
  
  var iNnFld = Coll0[0].length;             /* Number of fields (columns) */
  var iNnRow = Coll0.length;                /* Number of rows */
  var aNdx;
  var ar0;
  var ar1;
  var i, j, k, i0, i1;
  var mSoCnds = [];
  for (i = 0; i < iNnFld; i++) {             /* Init Matrix */
      mSoCnds[i] = [];
      for (j = 0; j < iNnFld; j++) {
          mSoCnds[i][j] = 0;
      } /* for */
  } /* for */

  for (i0 = 0; i0 < iNnFld; i0++) {
      aNdx = P_UsrView0.F_aNdx_Make(P_UsrView0, i0);

      ar0 = [];
      for (k = 0; k < iNnRow; k++) {
          ar0[k] = Coll0[aNdx[k]][i0];      /* Extract column i0 */
      } /* for */

      for (i1 = i0 +1; i1 < iNnFld; i1++) {
//      for (i1 = 0; i1 < iNnFld; i1++) {
          ar1 = [];
          for (k = 0; k < iNnRow; k++) {
              ar1[k] = Coll0[aNdx[k]][i1];  /* Extract column i1 */
          } /* for */
          var rCorr = F_Correl_2(ar0, ar1);
           mSoCnds[i0][i1] = rCorr;
      } /* for */
  } /* for */

  new CL_XDB([`mSoCnds_${XDB0.szNmColl}`, C_JKndTup_aRcd, mSoCnds, null, "AutoDetect", "'sorted-correlation matrix'", C_WwFlag_fOverWrite,  C_jCd_Cur, C_Bag_UsrView_Dflt]);
  $Table.U_Display_Table();
} /* U_mSoCnds_Mp_Cnds */

/*----- F_Correl_2 --------------------------------------------------------
*
* Calculate the correlation between two arrays of numbers.
*/ 
function F_Correl_2(P_ar0, P_ar1)
{
  if (P_ar0.length != P_ar1.length) {
     $Error.U_Error(C_jCd_Cur, 6, "Different length.", "", false);
  } /* if */
   
  var iCard0 = P_ar0.length;
  var iSumX1 = 0;
  var iSumX2 = 0;
  var iSumY1 = 0;
  var iSumY2 = 0;
  var iSumXY = 0;
  var N = iCard0;

  for (let i = 0; i < iCard0; i++) {
      let X = P_ar0[i];
      let Y = P_ar1[i];
      iSumX1  += X;
      iSumX2  += X * X;
      iSumY1  += Y;
      iSumY2  += Y * Y;
      iSumXY  += X * Y;
  } /* for */
  var rNum = (N * iSumXY - iSumX1 * iSumY1);
  var rDen = (Math.sqrt( (N * iSumX2) - (iSumX1**2) ) * Math.sqrt( (N * iSumY2) - (iSumY1**2) ) );
  
  var rCorr = (rDen != 0)? rNum / rDen: 0;
  return(rCorr);
} /* F_Correl_2 */

/*----- F_zCorrel --------------------------------------------------------
*
* Correlation of the Sample
* Wonnacott p 345 f 14-9
*/ 
function F_zCorrel(P_UsrView0, P_jaFld)
{
  var XDB0  = P_UsrView0.XDB0;
  
  if (P_jaFld < 0) {
     $Error.U_Error(C_jCd_Cur, 7, "No column selected!", "", false);
  } /* if */
  var aRcd = XDB0.Coll0;

  if (aRcd[0].length != 2) {
     $Error.U_Error(C_jCd_Cur, 8, "No x freq file", "", false);
  } /* if */
  
  //var szType_JS = typeof(aRcd[0][0]);  
  var iCard0 = aRcd.length;

  var iSumX = 0;
  var iSumY = 0;
  var iAveX = 0;
  var iAveY = 0;
  var X, Y;
  var N = iCard0;

  for (let i = 0; i < iCard0; i++) {
      X = aRcd[i][0];
      Y = aRcd[i][1];
      iSumX  += X;
      iSumY  += Y;
  } /* for */
  
  iAveX = iSumX / N;
  iAveY = iSumY / N;
  
  var iSumNum = 0;
  var iSumX2 = 0;
  var iSumY2 = 0;
  var iTmpX;
  var iTmpY;
  
  for (let i = 0; i < iCard0; i++) {
      X = aRcd[i][0];
      Y = aRcd[i][1];
      iTmpX = X - iAveX;
      iTmpY = Y - iAveY;
      iSumNum += (iTmpX * iTmpY);
      iSumX2  += (iTmpX * iTmpX);
      iSumY2  += (iTmpY * iTmpY);      
  } /* for */
    
  var rCorr = iSumNum /  Math.sqrt( (iSumX2) * (iSumY2) );

  return(rCorr);
} /* F_Correl */

/*----- F_arRegression --------------------------------------------------------
*
*/ 
function F_arRegression(P_aX, P_aY, P_fAlg=false)
{
  var a0;

  if (P_fAlg) {
     a0 = F_arRegression_W(P_aX, P_aY);
  }
  else {
     a0 = F_arRegression_S(P_aX, P_aY);
  } /* if */
  return(a0);
} /* F_arRegression */

/*-----F_arRegression_W --------------------------------------------------------
*
* Wannacott p. 273
*/ 
function F_arRegression_W(P_aX, P_aY)
{
  var iSumX  = 0;
  var iSumY  = 0;
  var iSumx2 = 0;
  var iSumxY = 0;
  var iN = P_aY.length;
  var X, Y, i;
  var iAveX;
  var iAveY;
  
  for (i = 0; i < iN; i++) {
      X = P_aX[i];
      Y = P_aY[i];
      iSumY += Y;
      iSumX += X;
  } /* for */
  iAveX = iSumX / iN;
  iAveY = iSumY / iN;
  
  for (i = 0; i < iN; i++) {
      let x = P_aX[i] - iAveX;
      Y = P_aY[i];
      iSumxY += x * Y;
      iSumx2 += x * x;
  } /* for */

   var a = iAveY;
   var b = iSumxY / iSumx2;
   
   a = a - (iAveX * b);

  return([a, b]);
} /* F_arRegression_W */

/*----- F_arRegression_S --------------------------------------------------------
*
* Schaum p.220
*/ 
function F_arRegression_S(P_aX, P_aY)
{
  var iSumX  = 0;
  var iSumY  = 0;
  var iSumX2 = 0;
  var iSumXY = 0;
  var iN = P_aY.length;
  var X, Y, i;
  var a, b;
  
  for (i = 0; i < iN; i++) {
      X = P_aX[i];
      Y = P_aY[i];
      iSumY += Y;
      iSumX += X;
      iSumXY += X * Y;
      iSumX2 += X * X;
  } /* for */

  var Mat0 = [
  [iN,    iSumX,  iSumY],
  [iSumX, iSumX2, iSumXY]
  ];
  
  var Mat1 = $Math_DDJ.F_pMat_Gauss_Matrix(Mat0);
  
  a = Mat1[0][2];
  b = Mat1[1][2];

  return([a, b]);
} /* F_arRegression_S */

/*-----F_arRegression --------------------------------------------------------
*
* Parabolic Regression.
* Schaum p.221
*/ 
function cccF_arRegression(P_aX, P_aY)
{
  var iSumX  = 0;
  var iSumY  = 0;
  var iSumX2 = 0;
  var iSumX3 = 0;
  var iSumX4 = 0;
  var iSumXY = 0;
  var iSumX2Y = 0;
  var iN = P_aY.length;
  var X, Y, i;
  var a, b, c;
  
  for (i = 0; i < iN; i++) {
      X = P_aX[i];
      Y = P_aY[i];
      iSumY += Y;
      iSumX += X;
      iSumXY += X * Y;
      TmpX = X * X;
      iSumX2Y += TmpX * Y;
      iSumX2 += TmpX;
      TmpX *= X;
      iSumX3 += TmpX;
      TmpX *= X;
      iSumX4 += TmpX;
  } /* for */

  var Mat0 = [
  [iN,     iSumX,  iSumX2, iSumY],
  [iSumX,  iSumX2, iSumX3, iSumXY],
  [iSumX2, iSumX3, iSumX4, iSumX2Y]
  ];
  
  var Mat1 = $Math_DDJ.F_pMat_Gauss_Matrix(Mat0);
  
  a = Mat1[0][3];
  b = Mat1[1][3];
  c = Mat1[2][3];
  
//   var z = [];
//   
//   for (i = 0; i < 12; i++) {
//       z[i] = a + b*i + c*i*i;
//   } /* for */

  return([a, b, c]);
} /* F_arRegression */

/*-----F_arRegression --------------------------------------------------------
*
* Multiple-Regression.
* Schaum p.271
*/ 
function dddF_arRegression(P_aX, P_aY, P_aZ)
{
  var iSumX  = 0;
  var iSumY  = 0;
  var iSumZ  = 0;
  
  var iSumX2 = 0;
  var iSumY2 = 0;
  var iSumZ2 = 0;
  
  var iSumXY = 0;  
  var iSumXZ = 0;  
  var iSumYZ = 0;

  var iN = P_aY.length;
  var X, Y, Z, i;
  var a, b, c;
  
  for (i = 0; i < iN; i++) {
      X = P_aX[i];
      Y = P_aY[i];
      Z = P_aZ[i];
      
      iSumY += Y;
      iSumX += X;
      iSumZ += Z;
      
      iSumXY += X * Y;
      iSumXZ += X * Z;
      iSumYZ += Y * Z;
      
      iSumX2 += X * X;
      iSumY2 += Y * Y;
      iSumZ2 += Z * Z;
  } /* for */

  var Mat0 = [
  [iN,     iSumY,  iSumZ,  iSumX],
  [iSumY,  iSumY2, iSumYZ, iSumXY],
  [iSumZ,  iSumYZ, iSumZ2, iSumXZ]
  ];
  
  var Mat1 = $Math_DDJ.F_pMat_Gauss_Matrix(Mat0);
  
  a = Mat1[0][3];
  b = Mat1[1][3];
  c = Mat1[2][3];
  
//   var z = [];
//   
//   for (i = 0; i < 12; i++) {
//       z[i] = a + b*i + c*i*i;
//   } /* for */

  return([a, b, c]);
} /* F_arRegression */

/*-----F_arMultiRegr --------------------------------------------------------
*
* Multiple-Regression.
* 11/01/2024 - LCD - mia generalizzazione delle formule dello Shaum.
*/ 
function F_arMultiRegr(P_Mat)
{
  var iNnRow = P_Mat.length;    /* Number of samples */
  var iNnCol = P_Mat[0].length; /* Number of variables/characteristics */
  var Row0;
  var arRes = [];
  var Mat1 = [];
  var Mat2 = [];
  var Mat3;
  var xSav;
  var i, j, k;
  
  for (i = 0; i < iNnCol; i++) {
      Mat2[i] = [];
      for (j = 0; j < iNnCol; j++) {
          Mat2[i][j] = 0;
      } /* for */
      Mat2[i][iNnCol] = 0;      
  } /* for */
  
  for (k = 0; k < iNnRow; k++) {
      Row0 = P_Mat[k];
      xSav = Row0[0];
      Row0[0] = 1;
      for (i = 0; i < iNnCol; i++) {
          Mat1[i] = [];
          for (j = 0; j < iNnCol; j++) {
              Mat1[i][j] = Row0[i] * Row0[j];
          } /* for */
          Mat1[i][iNnCol] = xSav * Row0[i];      
      } /* for */

      /* Accumulate. */ 
      for (i = 0; i < iNnCol; i++) {
          for (j = 0; j < iNnCol; j++) {
              Mat2[i][j] += Mat1[i][j];
          } /* for */
          Mat2[i][iNnCol] += Mat1[i][iNnCol];      
      } /* for */

      Row0[0] = xSav;      
  } /* for */
  Mat1[0][0] = iNnCol;
  
  Mat3 = $Math_DDJ.F_pMat_Gauss_Matrix(Mat2);
  
  var iCard0 = Mat3.length;
  for (i = 0; i < iCard0; i++) {
      arRes[i] = Mat3[i][iCard0];
  } /* for */

  return(arRes);
} /* F_arMultiRegr */

/*-----F_rPDF_Normal_Stat --------------------------------------------------------
*
* PDF of the Normal distribution (N(0,1)).  (Abramowitz, Stegun, 26.2.1 p. 931)
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
* Cumulative Distribution Function (CDF) of the Normal distribution (N(0,1)) (Abramowitz, Stegun, 26.2.17 p. 932)
* That is Pr(x < P_rX), -infinity < x < +infinity.
*/ 
function F_rCDF_Normal_Stat(P_rX)
{
  var rRes;
  if (P_rX == 0) {
     return(0.5);
  } /* if */
  var x = (P_rX < 0)? -P_rX: P_rX;
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

  rRes = (P_rX < 0)? 1 - rRes: rRes;
  return(rRes);
} /* F_rCDF_Normal_Stat */

/*-----F_rCDF_ERF_Stat --------------------------------------------------------
*
* CDF of the Error Function (ERF) (Abramowitz, Stegun, 7.1.26 p.299)
*/ 
function F_rCDF_ERF_Stat(P_rX)
{
  if (P_rX < 0) {
     $Error.U_Error(C_jCd_Cur, 9, "ERF is defined for 0 <= x < +infinity.", "", false);
  } /* if */
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

/*-----F_arICDF_Mp_CDF --------------------------------------------------------
*
* Calculate the inverse CDF (used for RND generators)
*/ 
function F_arICDF_Mp_CDF(P_pF_CDF)
{
  var aTup0 = [];
  var arICDF = [];
  var i, j, k1, x, y, iDe, Tmp;
  
  iDe = 0.001;
  j = 0;
  for (i = 0; i < 1000; i++) {
      aTup0[i] = [0, 0];
  } /* for */
  for (x = 0; x >= -5; x -= iDe) {
      y = P_pF_CDF(x);
      Tmp = [x, y];
      aTup0[5000 - j] = Tmp;
      j++;
  } /* for */
  j = 0;
  for (x = 0; x <= 5; x += iDe) {
      y = P_pF_CDF(x);
      Tmp = [x, y];
      aTup0[5000 + j] = Tmp;
      j++;
  } /* for */
  j = 0;
  arICDF[j++] = [0, 0];
  k1 = iDe;
  for (i = 0; i < 10000; i++) {
       Tmp = aTup0[i];
       if (k1 < Tmp[1]) {
          arICDF[j++] = Tmp;
          k1 += iDe;
       } /* if */
  } /* for */

  return(arICDF);
} /* F_arICDF_Mp_CDF */

/*-----F_nNN_Permutation_Combin --------------------------------------------------------
*
* Pn = D(n,n) = n!
*/ 
function F_nNN_Permutation_Combin(P_nN)
{
  return($Math_DDJ.F_rFact(P_nN));
} /* F_nNN_Permutation_Combin */

/*-----F_nNN_Disposition_Combin --------------------------------------------------------
*
* D(n,k) = n! / (n - k)!
*/ 
function F_nNN_Disposition_Combin(P_nN, P_nK)
{
  var iN_Fact = $Math_DDJ.F_rFact(P_nN);
  var iN_Mns_K_Fact = $Math_DDJ.F_rFact(P_nN - P_nK);
  var iRes = iN_Fact / iN_Mns_K_Fact;
  return(iRes);
} /* F_nNN_Disposition_Combin */

/*-----F_rNN_Bi_Combin --------------------------------------------------------
*
* Compute Binomial coefficient C(n, k) = D(n, k) / Pk = n! / k!(n - k)!
*/ 
function F_rNN_Bi_Combin(P_rN, P_rK)
{
  var rN_Fact = F_rFact_Combin(P_rN);
  var rK_Fact = F_rFact_Combin(P_rK);
  var rN_Mns_K_Fact = F_rFact_Combin(P_rN - P_rK);
  var rRes = rN_Fact / (rK_Fact * rN_Mns_K_Fact);
  return(rRes);
} /* F_rNN_Bi_Combin */

/*-----F_nNN_Combination_Combin --------------------------------------------------------
*
* Compute Binomial coefficient C(n, k) = D(n, k) / Pk = n! / k!(n - k)!
*/ 
function F_nNN_Combination_Combin(P_nN, P_nK)
{
  return(F_rNN_Bi_Combin(P_nN, P_nK));
} /* F_nNN_Combination_Combin */

/*-----F_rPDF_Gamma_Stat --------------------------------------------------------
* Cariolaro, Pierobon, p. 132bis
* Stoka puts P_rB = 1.0
* P_rK = Alpha, P_rB = Beta = 1 / Theta
*/ 
function F_rPDF_Gamma_Stat(P_x, P_rA, P_rB)
{
  var r0 = Math.pow(P_rA, P_rB);
  var r1 = Math.pow(P_x, (P_rB -1.0));
  var r2 = Math.exp(- P_rA * P_x);
  var r3 = $Math_DDJ.F_rGamma(P_rB);
  var rRes = (r0 * r1 * r2) / r3;
  return(rRes);
} /* F_rPDF_Gamma_Stat */

/*-----F_rPDF_tStudent_Stat --------------------------------------------------------
* PDF
* Stoka P. 8.10
*/ 
function F_rPDF_tStudent_Stat(P_rt, P_iN)
{
  var r0  = (P_iN +1) / 2.0;
  var r1  = (P_iN / 2.0);
  var r2  = (1.0 + (P_rt * P_rt) / P_iN);
  var r3  = Math.pow(r2, -r0);
  var r4  = Math.sqrt(P_iN * C_rPiGreek);
  var rG0 = $Math_DDJ.F_rGamma(r0);
  var rG1 = $Math_DDJ.F_rGamma(r1);
  var rRes = (rG0 * r3) / (r4 * rG1);
  return(rRes);
} /* F_rPDF_tStudent_Stat */

/*-----F_rIncBeta_Stat --------------------------------------------------------
*
* Incomplete Beta Function (Abramowitz, Stegun, 26.5.7 p. 944)
*/ 
function F_rIncBeta_Stat(P_rX, P_iA, P_iB)
{
  var  iTmp = (P_iA + P_iB -1);
  var r0 = pow((1.0 - P_rX), iTmp);
  var r1 = (P_rX / (1.0 - P_rX));
  var r2 = 1.0;
  var rSum = 0.0;
  var rRes;
  var  iC;
  var i;

  for (i = 0; i < P_iA; i++) {
      iC = F_nNN_Combination_Combin(iTmp, i);
      rSum = iC * r2;
      r2  *= r1;
  } /* for */
  rRes = r0 * rSum;
  return(rRes);
} /* F_rIncBeta_Stat */

/*-----F_rCDF_tStudent_Stat --------------------------------------------------------
* CDF
* 
* 2025-01-30 A-S 26.7.1
*/ 
function F_rCDF_tStudent_Stat(P_rt, P_iN)
{

//   var r1 = (P_iN + 1.0) / 2.0;
//   var r3 = -P_rt / P_iN;
//   var rH = F_rPDF_HyperGeometric_Stat(0.5, r1, 0.3/2.0, r3);
//   var rG = $Math_DDJ.F_rGamma(P_iN / 2.0);
//   var r4 = Math.sqrt(P_iN * C_rPiGreek);
//   var rRes = rH / (r4 * rG);

var r0 = Math.sqrt((P_rt * P_rt) + P_iN);
var rX = (P_rt + r0) / (2.0 * r0);
var r2 = P_iN / 2.0;
var rRes = F_rIncBeta_Stat(rX, r2, r2);

  return(rRes);
} /* F_rCDF_tStudent_Stat */

/*-----F_rPDF_HyperGeometric_Stat --------------------------------------------------------
*
* PDF (Abramowitz, Stegun, 26.1.21 p. 929)
*/ 
function F_rPDF_HyperGeometric_Stat(P_iA, P_iB, P_iK, P_iN)
{
  var iCak  = F_nNN_Combination_Combin(P_iA, P_iK);
  var iCbnk = F_nNN_Combination_Combin(P_iB, (P_iN -P_iK));
  var iCabn = F_nNN_Combination_Combin((P_iA + P_iB), P_iN);
  var rRes = (iCak * iCbnk) / iCabn;
  return(rRes);
} /* F_rPDF_HyperGeometric_Stat */

/*-----F_ai_ACF --------------------------------------------------------
*
* AutoCorrelation Function (Lynn p. 85)
*/ 
function F_ai_ACF(P_Coll, P_iNn, P_iOpt)
{
  var ai = [];
  ai[0] = 0;
  for (let i = 0; i < P_iNn; i++) {
      ai[i] = F_i_ACF_pArr2T_Stat(P_Coll, P_Coll.lenght, i, 0, P_iOpt);
  } /* for */
  return(ai);
} /* F_ai_ACF */

/*-----F_i_ACF_pArr2T_Stat --------------------------------------------------------
*
*/
var S_iAve0 = 0; 
function F_i_ACF_pArr2T_Stat(P_pArr2T, P_iN, P_iT, P_iBias=0, P_iOpt=0)
{
  var paRec = P_pArr2T;
  var iCard_aRec = P_pArr2T.length;
  var iAmp = P_iT;
  var iSum = 0;
  var pi0 = P_iBias;
  var pi1 = P_iBias + iAmp;
  var iLen = iCard_aRec - iAmp -1;
  var iTmp;
  var i;
  
  switch (P_iOpt) {
    case 1: {  /* alternative ACF-1 */
         for (i = 0; i < iLen; i++) { 
             iTmp  = paRec[pi0++] - paRec[pi1++];
             iSum += M_Abs(iTmp);
         } /* for */
    } break;
    case 2: {  /* alternative ACF-2 */
         if (P_iT == 0) {
            for (i = 0; i < iLen; i++) {
                iSum += paRec[pi0++];
            } /* for */
            S_iAve0 = iSum / iLen;
         }
         else {
            for (i = 0; i < iLen; i++) {
                iSum += (paRec[pi0++] - S_iAve0) * (paRec[pi1++] - S_iAve0);
            } /* for */
         } /* if */
    } break;
    default : {  /* ACF */
         for (i = 0; i < iLen; i++) {
             iSum += paRec[pi0++] * paRec[pi1++];
         } /* for */
    } break;
  } /* switch */

  var iACF = iSum / iLen;
  return(iACF);
} /* F_i_ACF_pArr2T_Stat */

/*-----U_Freq --------------------------------------------------------
*
* Build the frequencies table.
* $ASSUME: we assume U_Freq(); will be called after U_Stat_Field(); then S_Stat0 contains valid values.
*/ 
function U_Freq()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;
  var jaFld = UsrView0.jaFld1;
  $Stat_DDJ.S_DBox_Stat.U_Hub(C_JPnl_Confirm);

  var iMin  = S_Stat0["Min"];
  var iMax  = S_Stat0["Max"];
  var iNnClass = S_Stat0["Number of Classes"];
  if (iNnClass < 1) {
     iNnClass = 10;
  } /* if */

  var aSmpl = UsrView0.F_Arr_Mp_Field(UsrView0, jaFld, false);
  var aClass = $Stat_DDJ.F_aClass_Mp_aSmpl(aSmpl, iMin, iMax, iNnClass);
    
  new CL_XDB(["Freq", C_JKndTup_aRcd, aClass, null, "aFld_aAbsFreq",  "", C_WwFlag_fDisplay,  C_jCd_Cur, C_Bag_UsrView_Dflt]);
} /* U_Freq */

/*-----F_aClass_Mp_aSmpl --------------------------------------------------------
*
* Classify the samples generating the table of the absolute frequencies.
*/ 
function F_aClass_Mp_aSmpl(P_arSmpl, P_rMin, P_rMax, P_iNn_Class)
{
  var iCard0 = P_arSmpl.length;
  var aClass = []; 
  if (typeof(P_rMax) != "number") {
     $Error.U_Error(C_jCd_Cur, 10, "Was experted a numeric field.", "", false);
  } /* if */
  var rAmp = (P_rMax - P_rMin) / P_iNn_Class;
  var i, j, r0, rC;
  
  rC = P_rMin + (rAmp/2);
  for (i = 0; i <= P_iNn_Class; i++) {      /* Because Max-value management we need temporarily P_iNn_Class +1 classes. */
      aClass[i] = [rC, 0];
      rC += rAmp;
  } /* for */
  for (i = 0; i < iCard0; i++) {
      r0 = +P_arSmpl[i];
      if ((P_rMin <= r0) && (r0 <= P_rMax)) {     
         j = Math.floor((r0 - P_rMin) / rAmp);
         aClass[j][1]++;
      }
      else {
         /* Ignore values out of range. */
      } /* if */
  } /* for */
  
   aClass[P_iNn_Class -1][1] += aClass[P_iNn_Class][1];     /* Max-values should belong to class aClass[P_iNn_Class]. */
   aClass.pop();                            /* Remove the last element of the array. */
  return(aClass);
} /* F_aClass_Mp_aSmpl */
  
/*-----U_mFunDep_Mp_Cnds --------------------------------------------------------
*
* DataBase NORMALIZATION
* Functional dependency.
*/ 
function U_mFunDep_Mp_Cnds(P_UsrView0)
{
  var XDB0  = P_UsrView0.XDB0;
  var Coll0 = XDB0.Coll0;
  
  function F_iLt_Cmp(P_0, P_1) {
    var iRes = 0;    
    if (P_0 < P_1) {
       iRes = -1;
    } /* if */
    if (P_1 < P_0) {
       iRes =  1;
    } /* if */
    return(iRes);
  } /* F_iLt_Cmp */
  
  var iNnFld = Coll0[0].length;             /* Number of fields (columns) */
  var iNnRow = Coll0.length;                /* Number of rows */
  var aNdx;
  var ar0;
  var ar1;
  var i, j, k, i0, i1;
  var mFunDep = [];
  for (i = 0; i < iNnFld; i++) {            /* Init Matrix */
      mFunDep[i] = [];
      for (j = 0; j < iNnFld; j++) {
          mFunDep[i][j] = " ";
      } /* for */
  } /* for */

  for (i0 = 0; i0 < iNnFld; i0++) {
      aNdx = P_UsrView0.F_aNdx_Make(P_UsrView0, i0);   /* Sort table using Field i0 as a key. */

      ar0 = [];
      for (k = 0; k < iNnRow; k++) {
          ar0[k] = Coll0[aNdx[k]][i0];      /* Extract column i0 */
      } /* for */

//      for (i1 = i0 +1; i1 < iNnFld; i1++) {
      for (i1 = 0; i1 < iNnFld; i1++) {
          if (i0 == i1) {
             mFunDep[i0][i1] = "X";
             continue;
          } /* if */
          ar1 = [];
          for (k = 0; k < iNnRow; k++) {
              ar1[k] = Coll0[aNdx[k]][i1];  /* Extract column i1 */
          } /* for */
          var szFunDep = F_fFunDep(ar0, ar1);
          if (szFunDep == "Dep") {
             szFunDep = "" + i0 + "->" + i1;
          } /* if */
          mFunDep[i0][i1] = szFunDep;
      } /* for */
  } /* for */

  new CL_XDB([`mFunDep_${XDB0.szNmColl}`, C_JKndTup_aRcd, mFunDep, null, "AutoDetect", "'Functionally Dependence matrix'", C_WwFlag_fOverWrite,  C_jCd_Cur, C_Bag_UsrView_Dflt]);
  $Table.U_Display_Table();
} /* U_mFunDep_Mp_Cnds */

/*-----F_fFunDep --------------------------------------------------------
*
* Check Functionally Dependence.
*/ 
function F_fFunDep(P_ar0, P_ar1)
{
  var iCard = P_ar0.length;
  var i0_Prv = P_ar0[0];
  var i1_Prv = P_ar1[0];
  var iCntChg_i0 = 0;
  var iCntChg_i1 = 0;
  var i0_Cur;
  var i1_Cur;
  var i;
  
  for (i = 1; i < iCard; i++) {
      i0_Cur = P_ar0[i];
      i1_Cur = P_ar1[i];
      if ((i0_Cur == i0_Prv)) {
         if ((i1_Cur != i1_Prv)) {
            return(".");
         } /* if */      
      }
      else {
         iCntChg_i0++;
         if ((i1_Cur != i1_Prv)) {
            iCntChg_i1++;
         } /* if */
         i0_Prv = P_ar0[i];
         i1_Prv = P_ar1[i];
      } /* if */
  } /* for */
  if (iCntChg_i0 == (iCard -1)) {
     /* Values i0 are all distinct. Fld0 is a Key. */
     return("k");
  } /* if */
  if (iCntChg_i1 == 0) {
     /* The Fld1.value is a constant. */
     return("c");
  } /* if */
  /* Fld0 Functionally Determinate Fld1. */
  return("Dep");
} /* F_fFunDep */

/*-----U_Init --------------------------------------------------------
*
*/ 
function U_Init()
{
  U_Root0("$Stat_DDJ", C_jCd_Cur);
} /* U_Init */

  return(_Stat_DDJ);
})(); /* # END - G_Stat_DDJ object */

