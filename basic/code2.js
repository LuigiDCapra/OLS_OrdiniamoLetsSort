/* -------------------------------------------------------------------------
* Project     : CL-Eidos Violetta ex Anna ex NIC
* Description : Violetta Voice Assistant
* Revision    : 0.021
* File        : code2.js
* Function    : Global Costants Definitions.
* FirstEdit   : 01/02/2022
* LastEdit    : 20/01/2026
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
*/
"use strict";

/*----- Global Constants ---------------------------------------------*/

const C_jCd_Code        =  0;   /* Module codes - This file. */
const C_jCd_Root        =  1;   /* Objects Root */
const C_jCd_Lcd20       =  2;
const C_jCd_Log         =  3;   /* Log file */
const C_jCd_VDebug      =  4;   /* */
const C_jCd_Error       =  5;   /* Error management */
const C_jCd_DBox        =  6;   /* Dialogue Box */
const C_jCd_Pers        =  7;   /* Persistence management */
const C_jCd_IPCF        =  8;   /* Inter Process Communication Facilities. */
const C_jCd_OPrn        =  9;   /* */
const C_jCd_Menu        = 10;   /* */
const C_jCd_MRMenu      = 11;   /* */
const C_jCd_BackUp      = 12;   /* */
const C_jCd_Nation      = 13;   /* */
const C_jCd_Help        = 14;   /* Help */
const C_jCd_STT         = 15;   /* Speach to Text - Voice comprehension. */
const C_jCd_TTS         = 16;   /* Text to Speach. */
const C_jCd_VConfig     = 17;   /* Configuration. */
const C_jCd_Attention   = 18;   // ???
const C_jCd_Cmds        = 19;   /* Commands Executer. */
const C_jCd_Kinae       = 20;   /* Kinetic and Mood */
const C_jCd_NDU         = 21;   /* Network Disk Units */
const C_jCd_Monitor     = 22;   /* */
const C_jCd_Wiki        = 23;   /* */
const C_jCd_Type        = 24;   /* */
const C_jCd_TimeDate    = 25;   /* */
const C_jCd_RPC_Exec    = 26;   /* */
const C_jCd_Sort        = 27;   /* */
const C_jCd_Aggreg      = 28;   /* */
const C_jCd_Periodic    = 29;   /* */
const C_jCd_Style       = 30;   /* */
const C_jCd_Panel       = 31;   /* */
const C_jCd_TabPrm      = 32;   /* */

const C_jCd_Prova       = 38;   /* */

const C_jCd_Combin      = 40;   /* */
const C_jCd_Stat        = 41;   /* */

const C_jCd_Position    = 51;   /* */
const C_jCd_Tele        = 52;   /* Telecomando */
const C_jCd_Mail        = 53;   /* */

const C_jCd_HTML        = 100;
const C_jCd_CLDAP       = 103;   /* */
const C_jCd_Calc        = 104;   /* */
const C_jCd_Camera      = 105;   /* */
const C_jCd_Voce        = 106;   /* */
const C_jCd_Diz         = 107;   /* */

const C_jCd_DDJ         = 110;   /* */
const C_jCd_History     = 111;   /* */
const C_jCd_Plot        = 112;   /* */
const C_jCd_Stat_DDJ    = 113;   /* */
const C_jCd_Math_DDJ    = 114;   /* */
const C_jCd_Matrix      = 115;   /* */
const C_jCd_XSVG        = 116;   /* */

const C_jCd_XDB         = 200;   /* */
const C_jCd_UsrView     = 201;   /* */
const C_jCd_AutoDetect  = 202;   /* */
const C_jCd_Card        = 203;   /* */
const C_jCd_Table       = 204;   /* */
const C_jCd_Value       = 205;   /* */
const C_jCd_Object      = 206;   /* */
const C_jCd_Filter      = 207;   /* */
const C_jCd_MeF         = 208;   /* */
const C_jCd_Calendar    = 209;   /* */

const C_jCd_ExeCmd      = 220;   /* */
const C_jCd_FormInt     = 221;   /* */
const C_jCd_InpData     = 222;   /* */
const C_jCd_OutData     = 223;   /* */
const C_jCd_LdFile      = 224;   /* */
const C_jCd_FileMan     = 225;   /* */
const C_jCd_DSaft       = 226;   /* */

const C_jCd_VoiceInt    = 311;   /* */
const C_jCd_NatLang     = 312;   /* */
const C_jCd_Logos       = 313;   /* */
const C_jCd_Tag         = 314;   /* */
const C_jCd_SemCtx      = 315;   /* */
const C_jCd_Sentence    = 316;   /* */
const C_jCd_Remarks     = 317;   /* */

const C_jCd_Arr         = 421;   /* */ 
const C_jCd_Obj         = 422;   /* */
const C_jCd_aRcd        = 423;   /* */ 
const C_jCd_aObj        = 424;   /* */ 
const C_jCd_asRcd       = 425;   /* */ 
const C_jCd_asObj       = 426;   /* */ 
const C_jCd_as_         = 427;   /* */

const C_jCd_Custom      = 500;
const C_jCd_LcdLcd      = 501;
const C_jCd_XTG         = 502;

const C_jCd_Agenda      = 600;   /* */
const C_jCd_Auto        = 601;   /* */
const C_jCd_SemTree     = 602;   /* */
const C_jCd_PrnHTML     = 603;   /* */

const C_jCd_VIP         = 620;   /* */

const C_jCd_KBASE       = 700;   /* */
const C_jCd_ANS         = 750;   /* */
const C_jCd_BP          = 751;   /* */
const C_jCd_KNN         = 752;   /* */
const C_jCd_FinTech     = 753;   /* */

const C_jCd_Chart2      = 800;   /* */
const C_jCd_JSonPath    = 801;   /* */
 
const C_jCd_Viola       = 900;   /* */
const C_jCd_OLS         = 901;   /* */
const C_jCd_VLS         = 902;   /* */
const C_jCd_WE4         = 903;   /* */

const C_jCd_Sinottico   = 950;   /* */
 
const C_jCd_Release     = 998;   /* */ 
const C_jCd_Test        = 999;   /* */ 

const C_iIllegal_Value  = -1;

const C_szDate_EdtLst = "Januart 20th, 2026";
const C_szVer_EdtLst  = "Seq. 1.360 \n 20/01/2026\n";
const C_szRel_EdtLst  = "Release 1.0 - 1360";
const C_szCopyright   = "Copyright(c): Luigi D. CAPRA, 2020..2026";

const C_jaMnEntry_Title = 0;    /* HTML's elements 'title' */
const C_jaMnEntry_pFn   = 1;    /* Function that will be run when the button is clicked */
const C_jaMnEntry_Cap   = 2;    /* Name engraved on button's cap. */
const C_jaMnEntry_Icon  = 3;    /* Icon path */
const C_jaMnEntry_Key   = 4;    /* Key */
const C_jaMnEntry_Opt   = 5;    /* Options */
const C_jaMnEntry_Lst   = 6;    /* Options List */

const C_as_jCd =
{
"Code":  0,
"Root":  1,
"Lcd20":  2,
"Log":  3,
"VDebug":  4,
"Error":  5,
"DBox":  6,
"Pers":  7,
"IPCF":  8,
"OPrn":  9,
"Menu": 10,
"MRMenu": 11,
"BackUp": 12,
"Nation": 13,
"Help": 14,
"STT": 15,
"TTS": 16,
"VConfig": 17,
"Attention": 18,
"Cmds": 19,
"Kinae": 20,
"NDU": 21,
"Monitor": 22,
"Wiki": 23,
"Type": 24,
"TimeDate": 25,
"RPC_Exec": 26,
"Sort": 27,
"Aggreg": 28,
"Periodic": 29,
"Style": 30,
"Panel": 31,
"TabPrm": 32,

"Prova": 38,

"Combin": 40,
"Stat": 41,

"Position": 51,
"Tele": 52,
"Mail": 53,

"HTML": 100,
"CLDAP": 103,
"Calc": 104,
"Camera": 105,
"Voce": 106,
"Diz": 107,

"DDJ": 110,
"History": 111,
"Plot": 112,
"Stat_DDJ": 113,
"Math_DDJ": 114,
"Matrix": 115,
"XSVG": 116,

"XDB": 200,
"UsrView": 201,
"AutoDetect": 202,
"Card": 203,
"Table": 204,
"Value": 205,
"Object": 206,
"Filter": 207,
"MeF": 208,
"Calendar": 209,

"ExeCmd": 220,
"FormInt": 221,
"InpData": 222,
"OutData": 223,
"LdFile": 224,
"FileMan": 225,
"DSaft": 226,

"VoiceInt": 311,
"NatLang": 312,
"Logos": 313,
"Tag": 314,
"SemCtx": 315,
"Sentence": 316,
"Remarks": 317,

"Arr": 421,
"Obj": 422,
"aRcd": 423,
"aObj": 424,
"asRcd": 425,
"asObj": 426,
"as_": 427,

"Custom": 500,
"LcdLcd": 501,
"XTG": 502,

"Agenda": 600,
"Auto": 601,
"SemTree": 602,
"PrnHTML": 603,

"VIP": 620,

"KBASE": 700,
"ANS": 750,
"BP": 751,
"KNN": 752,
"FinTech": 753,

"Chart2": 800,
"JSonPath": 801,
 
"Viola": 900,
"OLS": 901,
"VLS": 902,
"WE4": 903,

"Sinottico": 950,
 
"Release": 998,
"Test": 999
};