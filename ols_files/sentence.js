/* -------------------------------------------------------------------------
* Project     : TUISys' Ordiniamo/Let's Sort
* Description : Data Explorer
* Revision    : 0.021
* File        : sentence.js
* Function    : NLP interpreter.
* FirstEdit   : 10/02/2024
* LastEdit    : 11/01/2026
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
*
* "NON so come fare" an error occurred
* "Non ho capito" la richiesta contiene un errore lessicale, di sintassi oppure concerne un comando sconosciuto.
*/
"use strict";

/*----- Global Variables ---------------------------------------------*/

var G_VCtx_Cur = {};      /* Dialogue Context */

const $Sentence = (function () {
  var _Sentence = {};
  _Sentence.U_Init          = U_Init_Sentence;   // function U_Init_Sentence();
  _Sentence.U_Interpreter   = U_Interpreter;     // function U_Interpreter(P_szMsg, R_BagRef);
  _Sentence.U_Errore        = U_Errore;          // function U_Errore();
  _Sentence.U_Warning       = U_Warning;         // function U_Warning();
  _Sentence.U_Ordina        = U_Ordina;          // function U_Ordina();
  _Sentence.U_Again         = U_Again;           // function U_Again();

/*----- Local Constants ----------------------------------------------*/

const C_jCd_Cur = C_jCd_Sentence;

const C_jaCache_szNm    = 0;
const C_jaCache_pFn     = 1;
const C_jaCache_DwToken = 2;
const C_jaCache_jPos    = 3;

const C_is_Att_Std = 20; /* Attention 20s. */

/*----- Local Variables ----------------------------------------------*/

var S_szMsg_Error   = "Non so come fare!";
var S_szMsg_SyntErr = "Non ho capito.";

var S_pDDJSts = null;

var S_fOthers = false; /* There are a lot of people in the room. */ 
var S_fSec    = false; /* Tell also the seconds. */
var S_fSpeak_szMsg = true;

var S_Win_Calc;
var S_Win_Clock;
var S_Win_Viola;
var S_Win_0;

var S_asObj_Entry = {};  /* S_asObj_Entry: array of TBM menu descriptors. */

S_asFiles
/*
* Context independent commands.
*/
var S_asQuest = {};
var S_asFiles = {};
var S_asDirs  = {};

var xxx_S_asQuest = {
"qual'è": {
  "qual'è il nome della collezione": "CL_UsrView0.F_UsrView_Selected().szNmColl",
  "qual'è il nome della tabella": "CL_UsrView0.F_UsrView_Selected().szNmColl",
  "qual'è il campo selezionato": "F_szNm_Fld_Sel()",
  "qual'è il record selezionato": "F_szNm_szKeyTup()",
  "qual'è il tuo nome": "Violetta",
  "qual'è il valore del campo": "UsrView0.Val_Sel",
  "qual'è il valore della cella": "UsrView0.Val_Sel",
  "qual'è il valore del campo": "UsrView0.Val_Sel",
  "qual'è la riga selezionata": "F_szNm_szKeyTup()",
  "qual'è la colonna selezionata": "UsrView0.iCol_Item_Sel -1",
  "qual'è la versione": "C_szRel_EdtLst",
},

"quali sono gli impegni di oggi" : "U_Impegni(R_VCtx_Cur, P_i)",

"come si chiama": {
  "come si chiama la collezione": "CL_UsrView0.F_UsrView_Selected().szNmColl",
  "come si chiama la tabella": "CL_UsrView0.F_UsrView_Selected().szNmColl",
  "come si chiama il campo selezionato": "F_szNm_Fld_Sel()",
  "come si chiama il record selezionato": "F_szNm_szKeyTup()",
  "come si chiama il tuo programmatore": "'Luigi'"
},

"come stai": "'io sto sempre bene e tu?'",
"come mi chiamo": "$VConfig.F_ValSts_Get('szUser')",
"come ti chiami": "'Violetta'",

"viola":           "U_Remove_1(R_VCtx_Cur, P_i)",
"violetta":        "U_Remove_1(R_VCtx_Cur, P_i)",
"dimmi":           "U_Remove_1(R_VCtx_Cur, P_i)",
"puoi dirmi":      "U_Remove_2(R_VCtx_Cur, P_i)",
"potresti dirmi":  "U_Remove_2(R_VCtx_Cur, P_i)",
"vuoi dirmi":      "U_Remove_2(R_VCtx_Cur, P_i)",
"vorresti dirmi":  "U_Remove_2(R_VCtx_Cur, P_i)",
"voglio sapere":   "U_Remove_2(R_VCtx_Cur, P_i)",
"vorrei sapere":   "U_Remove_2(R_VCtx_Cur, P_i)",
"potresti dirmi":  "U_Remove_2(R_VCtx_Cur, P_i)",


"ciao":            "U_Saluti(R_VCtx_Cur, P_i)",
"salve":           "U_Saluti(R_VCtx_Cur, P_i)",
"buongiorno":      "U_Saluti(R_VCtx_Cur, P_i)",
"buonasera":       "U_Saluti(R_VCtx_Cur, P_i)",
"buonanotte":      "U_Saluti(R_VCtx_Cur, P_i)",
"arrivederci":     "U_Saluti(R_VCtx_Cur, P_i)",
"saluti":          "U_Saluti(R_VCtx_Cur, P_i)",
"grazie":          "U_Grazie(R_VCtx_Cur, P_i)",
"prego":           "U_Prego(R_VCtx_Cur, P_i)",
"presentati":      "U_Presentati(R_VCtx_Cur, P_i)",
"canta":           "U_Canta(R_VCtx_Cur, P_i)",
"stupiscimi":      "U_Stupiscimi(R_VCtx_Cur, P_i)",

"collezione":      "U_Collection(R_VCtx_Cur, P_i)",
"directory":       "U_Directory(R_VCtx_Cur, P_i)",
"cartella":        "U_Directory(R_VCtx_Cur, P_i)",
"archivio":        "U_File(R_VCtx_Cur, P_i)",
"file":            "U_File(R_VCtx_Cur, P_i)",

"mostrati":        "U_Mostrati(R_VCtx_Cur, P_i)",
"nasconditi":      "U_Nasconditi(R_VCtx_Cur, P_i)",
"fammi vedere":    "U_Mostra(R_VCtx_Cur, P_i)",
"mostra":          "U_Mostra(R_VCtx_Cur, P_i)",
"apri":            "U_Mostra(R_VCtx_Cur, P_i)",
"nascondi":        "U_Chiudi(R_VCtx_Cur, P_i)",
"chiudi":          "U_Chiudi(R_VCtx_Cur, P_i)",
"abilita":         "U_Abilita(R_VCtx_Cur, P_i)",
"disabilita":      "U_Disabilita(R_VCtx_Cur, P_i)",

"quanto fa":       "U_QuantoFa(R_VCtx_Cur, P_i)",
"calcola":         "U_Calcola(R_VCtx_Cur, P_i)",
"cerca":           "U_Cerca(R_VCtx_Cur, P_i)",
"seleziona":       "U_Seleziona(R_VCtx_Cur, P_i)",
"ordina":          "U_Ordina(R_VCtx_Cur, P_i)",
"inserisci":       "U_Inserisci(R_VCtx_Cur, P_i)",
"vai":             "U_Vai(R_VCtx_Cur, P_i)",
"riga":            "U_Riga(R_VCtx_Cur, P_i)",
"colonna":         "U_Colonna(R_VCtx_Cur, P_i)",
"leggi il record": "U_Leggi(R_VCtx_Cur, P_i)",
 
"chi":             "U_Chi(R_VCtx_Cur, P_i)",
"cosa":            "U_Cosa(R_VCtx_Cur, P_i)", 
"cos'è":           "U_Cosa(R_VCtx_Cur, P_i)",   
"come":            "U_Come(R_VCtx_Cur, P_i)",  
"com'è":           "U_Come(R_VCtx_Cur, P_i)",
"dove":            "U_Dove(R_VCtx_Cur, P_i)", 
"dov'è":           "U_Dove(R_VCtx_Cur, P_i)", 
"quando":          "U_Quando(R_VCtx_Cur, P_i)", 
"quand'è":         "U_Quando(R_VCtx_Cur, P_i)",

"genera un errore":  "U_Errore()",
"genera un warning": "U_Warning()",

"taci":            "U_Zitta(R_VCtx_Cur, P_i)",
"silenzio":        "U_Zitta(R_VCtx_Cur, P_i)",
"zitta":           "U_Zitta(R_VCtx_Cur, P_i)",

"test":            "U_Prova(R_VCtx_Cur, P_i)",
"prova":           "U_Prova(R_VCtx_Cur, P_i)",
"passo e chiudo":  "$DDJ.U_Close_Window(R_VCtx_Cur, P_i)"
};
 
/*-----U_Domanda --------------------------------------------------------
* $NOTE:
* Command Response will be returned in R_VCtx_Cur.szRes
*/ 
function U_Domanda(R_VCtx_Cur, P_i)
{
  var szMsg = R_VCtx_Cur.szMsg;
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szKey0, pFn, Poly0, aObj0, szKey1, szRes, szCode;

  for (szKey0 in S_asQuest) {
      /* Look for the KBS' keys in the Query (szMsg). */
      if (szMsg.startsWith(szKey0)) {
         Poly0 = S_asQuest[szKey0];
         switch (typeof(Poly0)) {
           case "string" : {
                 R_VCtx_Cur.szKey0 = szKey0;
                 pFn = Poly0;
                 P_i = P_i +1;                        
                 szCode = `szRes = ${pFn}` ;
                 eval(szCode);
                        if (szRes == C_Undefined) {
                           szRes = R_VCtx_Cur.szRes; /* Manage Procedure, that is U_XXX() */
                        } /* if */
                 R_VCtx_Cur.szRes = F_szAnswer(szKey0, szKey1, szRes);
                 return;
           } break;
           case "object" : {
                 /* Look for the Query string in the object. */
                 aObj0 = Poly0;
                 for (szKey1 in aObj0) {
                     if (szMsg.startsWith(szKey1)) {
                        pFn = aObj0[szKey1];                        
                        szCode = `szRes = ${pFn}` ;
                        eval(szCode);
                        R_VCtx_Cur.szRes = F_szAnswer(szKey0, szKey1, szRes);
                        return;
                     } /* if */
                 } /* for */
           } break
           default : {
           } break;
         } /* switch */
         return;
      } /* if */
  } /* for */
} /* U_Domanda */

/*-----F_szAnswer --------------------------------------------------------
*
*/ 
function F_szAnswer(P_szKey0, P_szKey1, P_szRes)
{
  var szRes = P_szRes;
  var iLen0 = P_szKey0.length;

  switch (P_szKey0) {
    case "come si chiama": {
         szRes = P_szKey1.substr(iLen0);
         szRes += " si chiama " + P_szRes;
    } break;
    default : {
    } break;
  } /* switch */
  return(szRes);
} /* F_szAnswer */


/*--------------------------------------------------------------------*/
/*-----U_Again --------------------------------------------------------
*
* $NOTE: Il comando U_Again è ANOMALO poiché viene eseguito materialmente da U_Interpreter().
*/ 
function U_Again()
{

} /* U_Again */

/*-----U_Interpreter --------------------------------------------------------
*
* User's speech entry point.   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
* 
* Execute commands received via $Periodic.U_CB_NL_Cmd();
*/ 
function U_Interpreter(P_szMsg, R_BagRef={})
{
  U_Monitor(false, P_szMsg);

  var szSCtx = $SemCtx.F_szSCtx_Cur();
  var szMsg  = P_szMsg.trim().toLowerCase();
  var szMsg  = szMsg.replace(/\?/g, "");
  var szMsg  = szMsg.replace("violetta", "viola");
//var szMsg  = szMsg.replace("viola", "");
//var szMsg  = szMsg.replace("dimmi", "");
  var szMsg  = szMsg.replace("l'", "l' ");
  var szMsg  = szMsg.replace("puoi dirmi", "");
  var szMsg  = szMsg.replace("potresti dirmi", "");
  var szMsg  = szMsg.replace("sapresti dirmi", "");
  var szMsg  = szMsg.replace("voglio sapere", "");
  var szMsg  = szMsg.replace("vorrei sapere", "");
  var szMsg  = szMsg.replace("apre", "apri");
  var szMsg  = szMsg.replace(" all'", " a ");
  var szMsg  = szMsg.replace("quale è ", "qual'è");
  var aszKey = szMsg.split(" ");
  var szText = "";
  if ((aszKey[0] != "ripeti") && (aszKey[0] != "ancora")) {
     G_VCtx_Cur = {};
     G_VCtx_Cur.szMsg0 = P_szMsg;   /* Original message. */
     G_VCtx_Cur.szMsg  = szMsg;     /* Cleaned message. */  
     G_VCtx_Cur.szSCtx = szSCtx;    /* current Contect. */
     G_VCtx_Cur.aszKey = aszKey;    /* List of the keys. */
  } /* if */

  
  G_VCtx_Cur.BagRef = R_BagRef;
  G_VCtx_Cur.aExec  = [-1, -1, -1];     /* List of the interpreters that could try to execute the command. */
  G_VCtx_Cur.szSentence = "";
  G_VCtx_Cur.szKey0 = "";
  G_VCtx_Cur.szFn   = "";  
  G_VCtx_Cur.szRes  = S_szMsg_SyntErr;  /* "Non ho Capito." - Negative Response */
  G_VCtx_Cur.szImg  = "frown";
  G_VCtx_Cur.szErr  = "";

  if (szMsg == "brkpnt") {
     /* A BRKPNT was reached executing emulation script. */
     ALERT("BRKPNT",1);  
     return;
  } /* if */ 
/*
* Consult knowledge base.
* Result will be returned in G_VCtx_Cur.
*/
  U_Query(G_VCtx_Cur);
   
  $TTS.U_Speak(G_VCtx_Cur.szRes);
  if ($Root.F_fExist("$Kinae") && $Root.F_fExist("$Attention")) {
     $Kinae.U_Espressione(G_VCtx_Cur.szImg);
     $Attention.U_Set_Attention(C_is_Att_Std); 
  } /* if */
} /* U_Interpreter */

/*-----U_Query --------------------------------------------------------
*
* Consult knowledge base.
* Result will be returned in R_VCtx_Cur.
*/ 
function U_Query(R_VCtx_Cur)
{
  var aszKey = R_VCtx_Cur.aszKey;
  R_VCtx_Cur.iLen = aszKey.length; 
  R_VCtx_Cur.ajPosDiz = [];

  /* Assume its a direct command. */
  U_Direct(R_VCtx_Cur);
  if (G_VCtx_Cur.szRes != S_szMsg_SyntErr) {
     $DDJ.U_Log_Command("D");
     return;
  } /* if */
  if (R_VCtx_Cur.aExec[0] != -1) {
     return;
  } /* if */
  /* The command was not found in the direct command list try Domanda. */
  U_Domanda(R_VCtx_Cur, 0);
  if (G_VCtx_Cur.szRes != S_szMsg_SyntErr) {
     $DDJ.U_Log_Command("Q");
  }
  else {
     $DDJ.U_Log_Command("E");
  } /* if */  
} /* U_Query */

/*-----U_Direct --------------------------------------------------------
*
* Try to execute a direct command. Eg. "up", "down", "show", etc.
* Direct commands correspond to ToolBar functions, i.e. they are defined in the selected Semantic Context (SCtx).
* See: mnentry.js
*/ 
function U_Direct(R_VCtx_Cur)
{
  var szKey = R_VCtx_Cur.szMsg;
  var aEntry_SCtx = S_asObj_Entry[R_VCtx_Cur.szSCtx];
  var MnEntry0 = aEntry_SCtx[szKey];
  if (MnEntry0) {
     var pFn = MnEntry0[C_jaMnEntry_pFn];
     G_VCtx_Cur.aExec[0] = 0;
     G_VCtx_Cur.szFn = pFn;
     if (pFn) {
         try {
             var szCmd = `${pFn}(R_VCtx_Cur, 1)`;
             eval(szCmd);
        
             R_VCtx_Cur.szImg = "neutral1";
             R_VCtx_Cur.szRes = "";
             // $DDJ.U_Log_Command("D");
             G_VCtx_Cur.aExec[0] = 1;
         } catch (P_Err) {
             R_VCtx_Cur.szImg = "frown";
             R_VCtx_Cur.szRes = S_szMsg_Error;
             G_VCtx_Cur.aExec[0] = 2;
         } /* try catch */
     } /* if */
  } /* if */
} /* U_Direct */

/*-----F_szNome --------------------------------------------------------
*
*/ 
function F_szNome(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ajPosDiz = R_VCtx_Cur.ajPosDiz;
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "";

  R_VCtx_Cur.fOverride = false;
  if (szKey == "la") {
     szKey = R_VCtx_Cur.aszKey[++P_i];  
     switch (szKey) {
       case "tabella": {
            szRes = UsrView0.szNmColl;
       } break;
       case "colonna": {
             szRes = `colonna: ${UsrView0.iCol_Item_Sel -1}, campo: ${UsrView0.F_szNm_Fld_Sel()}`;
       } break;
       case "riga": {
            szRes = F_szNm_szKeyTup();
       } break;
       case "versione": {
            szRes = C_szRel_EdtLst + "\ndel " + C_szVer_EdtLst; 
       } break;
       case "tua" : {
            szKey = R_VCtx_Cur.aszKey[++P_i]; 
            if (szKey == "versione") {               
               szRes = C_szRel_EdtLst + "\ndel " + C_szVer_EdtLst; 
            } /* if */      
       } break;
       default : {
       } break;
     } /* switch */
  } /* if */
  if (szKey == "il") {
     szKey = R_VCtx_Cur.aszKey[++P_i];  
     switch (szKey) {
       case "campo": {
            szRes = UsrView0.F_szNm_Fld_Sel();
       } break;
       case "record": {
            szRes = F_szNm_szKeyTup();
       } break;
       case "mio" : {
            szKey = R_VCtx_Cur.aszKey[++P_i]; 
            if (szKey == "nome") {
               szRes = "il tuo nome è " + $VConfig.F_ValSts_Get("szUser");
               R_VCtx_Cur.fOverride = true;
            } /* if */
       } break;
       case "tuo" : {
            szKey = R_VCtx_Cur.aszKey[++P_i]; 
            if (szKey == "nome") {
               szRes = "il mio nome è Violetta";
               R_VCtx_Cur.fOverride = true;
            } /* if */
       } break;
       
       default : {
       } break;
     } /* switch */
  } /* if */
  if (szKey == "della") {
     szKey = R_VCtx_Cur.aszKey[++P_i];  
     switch (szKey) {
       case "tabella": {
            szRes = CL_UsrView0.F_UsrView_Selected().szNmColl;
       } break;
       case "colonna": {
             szRes = UsrView0.F_szNm_Fld_Sel();
       } break;
       case "riga": {
            szRes = F_szNm_szKeyTup();
       } break;
       default : {
       } break;
     } /* switch */
  } /* if */
  
  if (szRes == "") {
     R_VCtx_Cur.szErr = "Non lo so!";
  } /* if */
  return(szRes);
} /* F_szNome*/

/*-----F_szNm_szKeyTup --------------------------------------------------------
*
* Returns the name of the record/tuple to which the selected cell belongs.
*/ 
function F_szNm_szKeyTup()
{
   var UsrView0 = this;
   fjRow = $XDB.F_fjRow_Mp_JKndTup(UsrView0.XDB0.JKndTup0);
   
   if (fjRow) {
      szNm = UsrView0.KeyTup;
   }
   else {
      szNm = "+++";
   } /* if */

   var KeyTup = UsrView0.KeyTup;
   var szNm = (KeyTup)? KeyTup: "";
   return(szNm);
} /* F_szNm_szKeyTup */
    
/*-----F_szNm_Fld_Sel --------------------------------------------------------
*
* Return the name of the field that was selected by the operator using the GUI.
*/ 
function F_szNm_Fld_Sel()
{  
   var UsrView0 = this;
   var Fld_Sel = UsrView0.Fld_Sel;
   var szNm = (Fld_Sel)? Fld_Sel.szNm: "";
   return(szNm);      
} /* F_szNm_Fld_Sel */

/*-----F_szValore --------------------------------------------------------
*
*/ 
function F_szValore(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var ajPosDiz = R_VCtx_Cur.ajPosDiz;
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "";

  R_VCtx_Cur.fOverride  = false;
  if (szKey == "della") {
     szKey = R_VCtx_Cur.aszKey[P_i +1];  
     switch (szKey) {
       case "cella": {
            szRes = UsrView0.Val_Sel;
       } break;
       default : {
       } break;
     } /* switch */
  } /* if */
  if (szKey == "del") {
     szKey = R_VCtx_Cur.aszKey[P_i +1];  
     switch (szKey) {
       case "campo": {
            szRes = UsrView0.Val_Sel;
       } break;
       case "record": {
            szRes = UsrView0.Val_Sel;
       } break;
       default : {
       } break;
     } /* switch */
  } /* if */
  
  if (szRes == null) {
     R_VCtx_Cur.szErr = "Non ci sono celle selezionate.";  
  } /* if */
  if (szRes == "") {
     R_VCtx_Cur.szErr = "Non lo so!";
  } /* if */ 

  return("" + szRes);
} /* F_szValore */

/*-----U_Remove_1 --------------------------------------------------------
*
*/ 
function U_Remove_1(R_VCtx_Cur, P_i)
{
  R_VCtx_Cur.aszKey.shift();
  R_VCtx_Cur.szMsg = R_VCtx_Cur.aszKey.join(" ");
  R_VCtx_Cur.iLen = R_VCtx_Cur.iLen -1;
  U_Query(R_VCtx_Cur, 1);
} /* U_Remove_1 */

/*-----U_Remove_2 --------------------------------------------------------
*
*/ 
function U_Remove_2(R_VCtx_Cur, P_i)
{
  R_VCtx_Cur.aszKey.shift();
  R_VCtx_Cur.aszKey.shift();
  R_VCtx_Cur.szMsg = R_VCtx_Cur.aszKey.join(" ");
  R_VCtx_Cur.iLen = R_VCtx_Cur.iLen -2;
  U_Query(R_VCtx_Cur, 1);
} /* U_Remove_2 */

/*-----U_LongSpeech --------------------------------------------------------
*
*/
var S_szLong_Speech = ""; 
function U_LongSpeech(P_szMsg, P_szLang, P_rRate, P_szName, P_fDBox)
{
  U_Monitor(false, P_szMsg);
  S_szLong_Speech = P_szMsg; 
  $TTS.U_Long_speech(P_szMsg, P_szLang, P_rRate, P_szName);
} /* U_LongSpeech */

/*-----F_szStai --------------------------------------------------------
*
*/ 
function F_szStai(R_VCtx_Cur, P_i)
{
  R_VCtx_Cur.szRes = "Io sto sempre bene e tu?";
  R_VCtx_Cur.fOverride = true;
  return("Io sto sempre bene e tu?");
} /* F_szStai */

/*-----U_Ignora --------------------------------------------------------
*
* Ignorate unknown words.
*/ 
function U_Ignora(R_VCtx_Cur, P_i)
{
} /* U_Ignora */
  
/*-----U_Viola --------------------------------------------------------
*
*/ 
function U_Viola(R_VCtx_Cur, P_i)
{
  R_VCtx_Cur.szRes = (R_VCtx_Cur.iLen == 1)? "Ti ascolto!": "";
} /* U_Viola */

/*-----U_Saluti --------------------------------------------------------
*
*/ 
function U_Saluti(R_VCtx_Cur, P_i)
{
  var szMsg = "";
  var szKey;

  R_VCtx_Cur.szImg = "happy2";

  switch (R_VCtx_Cur.iLen) {
    case 1: {
         szMsg = R_VCtx_Cur.aszKey[0];
    } break;
    case 2: {
         /* Es. "ciao viola" */
         if (P_i == 0) {
             szKey = R_VCtx_Cur.aszKey[1];
             szMsg = R_VCtx_Cur.aszKey[0];
             if ((szKey == "viola")|| (szKey == "violetta")) {
                szMsg += " " + $VConfig.F_ValSts_Get("szUser");
             }
             else {
                if (S_fOthers) {           
                   szMsg = ""; // l'utente non sta parlando con Viola
                   R_VCtx_Cur.szImg = "neutral1";
                } /* if */
             } /* if */         
         }
         else { /* P_i == 1 */
             szKey = R_VCtx_Cur.aszKey[0];
             szMsg = R_VCtx_Cur.aszKey[1];
             if ((szKey == "viola")|| (szKey == "violetta")) {
                szMsg += " " + $VConfig.F_ValSts_Get("szUser");
             }
             else {
                if (S_fOthers) {           
                   szMsg = ""; // l'utente non sta parlando con Viola
                   R_VCtx_Cur.szImg = "neutral1";
                } /* if */
             } /* if */   
         } /* if */
    } break;
    default : {
         R_VCtx_Cur.szImg = "neutral1";
    } break;
  } /* switch */
  
  R_VCtx_Cur.szRes = szMsg;
} /* U_Saluti */

/*-----U_Presentati --------------------------------------------------------
*
*/ 
function U_Presentati(R_VCtx_Cur, P_i)
{
  R_VCtx_Cur.szRes = "Buongiorno.\nMi chiamo Violetta, come la mugnaia del carnevale di Ivrea, e sono un assistente vocale canavesano.\nParlatemi e io vi risponderò.\nCosa posso fare per voi?";
  R_VCtx_Cur.szImg = "neutral0";
} /* U_Presentati */

/*-----U_Canta --------------------------------------------------------
*
*/ 
function U_Canta(R_VCtx_Cur, P_i)
{
  R_VCtx_Cur.szRes = "Mi spiace non so cantare; sono stonata!\n";
  R_VCtx_Cur.szImg = "frown";
} /* U_Canta */

/*-----U_Stupiscimi --------------------------------------------------------
*
*/ 
function U_Stupiscimi(R_VCtx_Cur, P_i)
{
  var fRes = false;
  if (!window.fLcdLcd) {   /* $VERSIONING */
     szMsg = $LcdLcd.F_fStupiscimi(R_VCtx_Cur, P_i);
     R_VCtx_Cur.szRes = szMsg;
     if (szMsg != "") {
//         $Viola.U_SpShowListen(szMsg, "", C_jCB_Listen);
//         $Viola.Set_jCB_jStsCmd(C_jCB_Listen, C_jStsCmd_Speaking);     
     }
     else {
     } /* if */
     return;
  } /* if */
  
  var iRnd = $Math_DDJ.F_iRND(0, 10);
  var szMsg;
  switch (iRnd) {
    case 0: {
         szMsg = "Ti stupisco!";
    } break;
    case 1: {
         szMsg = "La permeabilità magnetica del vuoto è pari a 4 pi greco per 10 alla meno 7 cioè 1,25663706144 per 10 alla -6 Henry fratto metro";
    } break;
    case 2: {
         szMsg = "Due medici si incontrano al bar.\n Uno dice all'altro:\n Ho in cura una paziente molto giovane che sta perdendo la memoria.\n Che cosa mi consigli di fare?\n\n\nDi farti pagare in anticipo!!";
    } break;
    case 3: {
         szMsg = "Dottore, dottore! Ho solo 59 secondi di vita, mi aiuti!\n\n Certo! Un minuto e sono da lei!";
    } break;
    case 4: {
         szMsg = "Mamma lumaca prepara sua figlia per andare a scuola e le dice:\n Mi raccomando, fai la bava!";
    } break;
    case 5: {
         szMsg = "Perché quando il cielo è nuvoloso si deve contare solo fino a sette? Perché altrimenti piove a dir... otto!";
    } break;
    case 6: {
         szMsg = "Un turista si ferma in una fattoria per acquistare alcune uova, e chiede al fattore:\n Scusi, ma sono di giornata?\nE il fattore:\n Certo, di notte le mie galline dormono!";
    } break;
    case 7: {
         szMsg = "Sei il migliore!";
    } break;
    case 8: {
         szMsg = "Qual'è il colmo per un paracadutista? Cadere dalle nuvole!";
    } break;
    case 9: {
         szMsg = "Mi stai annoiando!";
    } break;
    default : {
    } break;
  } /* switch */
  
  R_VCtx_Cur.szRes = szMsg;
//  U_LongSpeech(szMsg);
    
//   $Viola.U_SpShowListen(szMsg, "neutral1", C_jCB_Listen);
//   $Viola.Set_jCB_jStsCmd(C_jCB_Listen, C_jStsCmd_Speaking);
  return;
} /* U_Stupiscimi */

/*-----U_Grazie --------------------------------------------------------
*
*/ 
function U_Grazie(R_VCtx_Cur, P_i)
{
  var szImg = "neutral0";
  R_VCtx_Cur.szRes = "Prego."
} /* U_Grazie */

/*-----U_Prego --------------------------------------------------------
*
*/ 
function U_Prego(R_VCtx_Cur, P_i)
{
  R_VCtx_Cur.szRes = "Non c'è di che!";
  var szImg = "neutral0"; 
} /* U_Prego */

/*-----U_V_Status --------------------------------------------------------
*
*/ 
function U_V_Status()
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  var sz_JKndTup = CL_XDB0.F_szJKndTup(XDB0.JKndTup0);
  iRow = UsrView0.iRow_Item_Sel;
  iCol = UsrView0.iCol_Item_Sel;
  if (UsrView0.Val_Sel) {
     szJsType = typeof(P_UsrView.Val_Sel);
  } /* if */

  var szMsg = `Collezione: ${XDB0.szNmColl}.\n Tipo collezione: ${sz_JKndTup}.\n Cella: ${(iRow -1)}, ${(iCol -1)} `;
} /* U_V_Status */

/*-----U_Dove --------------------------------------------------------
*
*/ 
function U_Dove(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel -1;
  var iCol = UsrView0.iCol_Item_Sel -1;
  var szText = (iRow < 0)?  `Il cursore non è posizionato.`: `Il cursore si trova in riga: ${iRow}, colonna: ${iCol}.`;
  R_VCtx_Cur.szRes = szText;
} /* U_Dove */

/*-----U_Quando --------------------------------------------------------
*
*/ 
function U_Quando(R_VCtx_Cur, P_i)
{

} /* U_Quando */

/*-----U_Perche --------------------------------------------------------
*
*/ 
function U_Perche(R_VCtx_Cur, P_i)
{

} /* U_Perche */

/*-----U_Quanto --------------------------------------------------------
*
*/ 
function U_Quanto(R_VCtx_Cur, P_i)
{

} /* U_Quanto */

/*-----U_Cosa --------------------------------------------------------
*
*/ 
function U_Cosa(R_VCtx_Cur, P_i)
{
  $Agenda.U_ToDo();
} /* U_Cosa */

/*-----U_Dimmi --------------------------------------------------------
*
*/ 
function U_Dimmi(R_VCtx_Cur, P_i)
{
  F_szText_Exec(R_VCtx_Cur, P_i +1);
} /* U_Dimmi */

/*-----U_Vorrei --------------------------------------------------------
*
*/ 
function U_Vorrei(R_VCtx_Cur, P_i)
{ 
  R_VCtx_Cur.jaszKey++;
  var szKey = R_VCtx_Cur.aszKey[P_i +1];
  if (szKey == "sapere") {  
     R_VCtx_Cur.jaszKey++;     
     F_szText_Exec(R_VCtx_Cur, P_i +2);
  }
  else {       
     var szText = F_NonHoCapito();
  } /* if */
} /* U_Vorrei */

/*-----F_NonHoCapito --------------------------------------------------------
*
*/ 
function F_NonHoCapito(R_VCtx_Cur)
{
  if (!R_VCtx_Cur) {
     debugger;
  } /* if */
  R_VCtx_Cur.szRes = S_szMsg_SyntErr;
} /* F_NonHoCapito */

/*-----U_Come --------------------------------------------------------
*
*/ 
function U_Come(R_VCtx_Cur, P_i)
{
  var szImg = "neutral1";
  var is_Attention = C_is_Att_Std;
  var ajPosDiz = R_VCtx_Cur.ajPosDiz;
  var iLen = R_VCtx_Cur.iLen;
  var szRes = "";
  var i;
  var szKey = R_VCtx_Cur.aszKey[P_i];
  
  switch (szKey) {
    case "va":
    case "stai": {         
          szRes = "Io sto sempre bene e tu?";
    } break;
    case "mi" : {
         szKey = R_VCtx_Cur.aszKey[P_i +1];
         if (szKey == "chiamo") {
            szRes = $VConfig.F_ValSts_Get("szUser");
         }
         else {
            szRes = F_NonHoCapito();
         } /* if */
    } break;
    case "ti" : {
         szKey = R_VCtx_Cur.aszKey[P_i +1];
         switch (szKey) {
           case "chiami": {
                szRes = "Mi chiamo Violetta, come la mugnaia del carnevale di Ivrea.\n";
           } break;
           case "senti": {         
                szRes = "Io sono in gran forma e tu?";
           } break;
           default : {            
                szRes = F_NonHoCapito();
           } break;
         } /* switch */
    } break;
    case "si" : {
         szKey = R_VCtx_Cur.aszKey[P_i +1];
         switch (szKey) {
           case "chiama": {
                szRes = F_szNome(R_VCtx_Cur, P_i +2);
           } break;
           default : {            
                szRes = F_NonHoCapito();
           } break;
         } /* switch */
    } break;
    default : {       
        szRes = F_NonHoCapito();
    } break;
  } /* switch */
  
  R_VCtx_Cur.szRes = szRes;
} /* U_Come */

/*-----U_Che --------------------------------------------------------
*
*/ 
function U_Che(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szImg = "neutral1";
  var is_Attention = 20;
  var ajPosDiz = R_VCtx_Cur.ajPosDiz;
  var iLen = R_VCtx_Cur.iLen;
  var szRes = "";
  var i;
  var szKey = R_VCtx_Cur.aszKey[P_i +1];
  
  switch (szKey) {
    case "valore" : {
         szKey = R_VCtx_Cur.aszKey[P_i +2];
         if (szKey != "ha") {
            szRes = F_NonHoCapito();
         } /* if */
         szKey = R_VCtx_Cur.aszKey[P_i +3];
         if (szKey == "la") {
             szKey = R_VCtx_Cur.aszKey[P_i +4];
             switch (szKey) {
               case "cella":
               case "casella": {         
                    szRes = F_szValore(R_VCtx_Cur, P_i +5);
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */         
         } /* if */
         if (szKey == "il") {
             szKey = R_VCtx_Cur.aszKey[P_i +4];
             switch (szKey) {
               case "campo": {         
                    szRes = F_szValore(R_VCtx_Cur, P_i +5);
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */         
         } /* if */
    } break;
    case "nome" : {
         szKey = R_VCtx_Cur.aszKey[P_i +2];
         if (szKey != "ha") {
            szRes = F_NonHoCapito();
         } /* if */
         szKey = R_VCtx_Cur.aszKey[P_i +3];
         if (szKey == "la") {
             szKey = R_VCtx_Cur.aszKey[P_i +4];
             switch (szKey) {
               case "colonna" : {
                     szRes = `colonna: ${UsrView0.iCol_Item_Sel -1}, campo: ${UsrView0.F_szNm_Fld_Sel()}`;
               } break;
               case "tabella" : {
                     szRes = UsrView0.szNmColl;
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */
         } /* if */
         if (szKey == "il") {
             szKey = R_VCtx_Cur.aszKey[P_i +4];
             switch (szKey) {
               case "campo": {         
                    szRes = UsrView0.F_szNm_Fld_Sel();
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */         
         } /* if */
    } break;
    case "giorno" : {
         szRes = U_Giorno();
    } break;
    default : {
      szRes = F_NonHoCapito();
    } break;
  } /* switch */
  
  R_VCtx_Cur.szRes = szRes;
} /* U_Che */

/*-----U_Giorno --------------------------------------------------------
*
*/ 
function U_Giorno()
{
  var aszMesi = ["", "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  var aszGiorni = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  var szTmp  = "";
     
     var Date0 = new Date();
     var iYear   = Date0.getFullYear();
     var iMonth  = Date0.getMonth() +1;
     var iMDay   = Date0.getDate();
     var iWDay   = Date0.getDay();

     szTmp += "Oggi è " + aszGiorni[iWDay] + ", " + iMDay + " " + aszMesi[iMonth] + "\n";
     
     var iNum = $TimeDate.F_jYDay_Mp_Date();
     
     szTmp += F_szOrdin_Mp_Num(iNum, "o") + " giorno dell'anno.";

    R_VCtx_Cur.szRes = szTmp;
} /* U_Giorno */

/*-----U_Ora --------------------------------------------------------
*
*/ 
function U_Ora()
{
  var aszMesi = ["", "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  var aszGiorni = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  var szTmp  = "";
     
   var Date0 = new Date();
   var iHour   = Date0.getHours();
   var iMinutes = Date0.getMinutes();
   var iSeconds = Date0.getSeconds();

   szTmp += "Sono le ore " + iHour + " " + iMinutes;
   if (S_fSec) {
      szTmp += " e " + iSeconds + " secondi";
   } /* if */
   szTmp +=  ".\n";

  R_VCtx_Cur.szRes = szTmp;
} /* U_Ora */

/*-----U_Settimana --------------------------------------------------------
*
*/ 
function U_Settimana()
{
  var iNum = $TimeDate.F_jYDay_Mp_Date();
  var jWeek = Math.floor(iNum / 7);
  
  var szTmp = F_szOrdin_Mp_Num(jWeek, "a"); 
  
  R_VCtx_Cur.szRes = szTmp;     
} /* U_Settimana */

/*-----U_Apri --------------------------------------------------------
*
*/ 
function U_Apri(R_VCtx_Cur, P_i)
{
   ALERT("APRI",1);
} /* U_Apri */

/*-----U_Edita --------------------------------------------------------
*
*/ 
function U_Edita(R_VCtx_Cur, P_i)
{
   $DDJ.U_EdtVal_DDJ();
   R_VCtx_Cur.szRes = "Edito";
} /* U_Edita */

/*-----U_Seleziona --------------------------------------------------------
*
* ok! 2024-12-20
*/ 
function U_Seleziona(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "";
  var iRow;
  
  switch (szKey) {
    case "la" : {
         szKey = R_VCtx_Cur.aszKey[++P_i];
         switch (szKey) {
           case "riga": {
                iRow = +R_VCtx_Cur.aszKey[++P_i];
                var iCol = UsrView0.iCol_Item_Sel;             
                $Table.U_ArrowMove(UsrView0, iRow +1, iCol, C_fScroll);
           } break;
           case "colonna": {         
                iCol = +R_VCtx_Cur.aszKey[++P_i];
                var iRow = UsrView0.iRow_Item_Sel;             
                $Table.U_ArrowMove(UsrView0, iRow, iCol +1);
           } break;
           case "cella": {         
                szRes = "non implementato";
           } break;
           case "collezione":
           case "tabella": {
                 U_Mostra(R_VCtx_Cur, P_i -1);
           } break;
           default : {
                szRes = F_NonHoCapito();
           } break;
         } /* switch */
    } break;
    case "le" : {
         szKey = R_VCtx_Cur.aszKey[++P_i];
         switch (szKey) {
           case "righe": 
           case "tuple": {         
                U_Filtro(R_VCtx_Cur, P_i);
           } break;
           default : {
                szRes = F_NonHoCapito();
           } break;
         } /* switch */
    } break;
    case "i" : {
         szKey = R_VCtx_Cur.aszKey[++P_i];
         switch (szKey) {
           case "record": {         
                U_Filtro(R_VCtx_Cur, P_i);
           } break;
           default : {
                szRes = F_NonHoCapito();
           } break;
         } /* switch */
    } break;
    default : {    
        let szNmColl = R_VCtx_Cur.aszKey[P_i]; 
        U_Sel_Coll(R_VCtx_Cur, szNmColl);
    } break;
  } /* switch */
  
  R_VCtx_Cur.szRes = szRes;
} /* U_Seleziona */

/*-----U_Filtro --------------------------------------------------------
*
*/ 
function U_Filtro(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szKey = R_VCtx_Cur.aszKey[P_i];

  switch (szKey) {
    case "tali":  {
         P_i += 2;   // tali che
    } break;
    case "percui": {
         P_i += 1;   // percui
    } break;
    case "soddisfacenti": {
         P_i += 3;   // soddisfacenti la condizione
    } break;
    case "contenenti" : {
    
    } break;
    default : {
       szRes = F_NonHoCapito();
       R_VCtx_Cur.szRes = szRes;
       return;
    } break;
  } /* switch */

} /* U_Filtro */

/*-----U_Select --------------------------------------------------------
*
* Seleziona una tabella già in memoria
* Ok! 2024-12-20
*/ 
function U_Select(R_VCtx_Cur, P_i)
{
  var szSCtx = $SemCtx.F_szSCtx_Cur();
  var aszKey = R_VCtx_Cur.aszKey;
  var szMsg = aszKey[P_i];
  CL_UsrView0.F_UsrView_Select(szMsg, C_WwFlag_fDisplay);
} /* U_Select */

/*-----U_Cerca --------------------------------------------------------
*
* Ok! 2024-12-26
*/ 
function U_Cerca(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Fatto.";
  var szTxt = UsrView0.Val_Sel;

  switch (szKey) {
    case "delle" : {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "informazioni": {
                  var szSearch = `https://www.google.com/search?q=${szTxt}&ie=utf-8&oe=utf-8`;
                  S_Win_0 = $DDJ.F_Window_open(szSearch, "_blank");
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    case "su": {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "google": {
                  var szSearch = `https://www.google.com/search?q=${szTxt}&ie=utf-8&oe=utf-8`;
                  S_Win_0 = $DDJ.F_Window_open(szSearch, "_blank");
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
            case "informazioni": {
                  var szSearch = `https://www.google.com/search?q=${szTxt}&ie=utf-8&oe=utf-8`;
                  S_Win_0 = $DDJ.F_Window_open(szSearch, "_blank");
            } break;
    default : {
         szRes = S_szMsg_SyntErr;
    } break;
  } /* switch */
  R_VCtx_Cur.szRes = szRes;
} /* U_Cerca */
  
/*-----U_Mostra --------------------------------------------------------
*
* Ok! 2024-12-26
*/ 
function U_Mostra(R_VCtx_Cur, P_i)
{
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Fatto.";
  switch (szKey) {
    case "il": {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "record": {
                  $DDJ.U_EdtTup_DDJ();
            } break;
            case "valore": {
                  $DDJ.U_EdtVal_DDJ();
            } break;
            case "menu": {
                  U_Menu(R_VCtx_Cur, ++P_i);
            } break;
            case "disco": {
                  U_Directory(R_VCtx_Cur, ++P_i);
            } break;
            case "file": {
                  U_File(R_VCtx_Cur, ++P_i);
            } break;
            case "diagramma":
            case "grafico": {
                  $Chart.U_Chart();
            } break;
            case "calendario" : {
                  $Calendar.U_Show();
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    case "la": {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "scheda": {
                  $DDJ.U_EdtTup_DDJ();
            } break;
            case "tabella":
            case "collezione": {
                  let szNmColl = R_VCtx_Cur.aszKey[++P_i]; 
                  U_Sel_Coll(R_VCtx_Cur, szNmColl)
            } break;
            case "cartella":
            case "directory": {
                  U_Directory(R_VCtx_Cur, ++P_i);
//                  var szDNS = "";
//                  var szPath = R_VCtx_Cur.aszKey[++P_i];
//                  $FileMan.U_Get_Dir(szDNS, szPath, $FileMan.U_CB_GetDir, false);
            } break;
            case "calcolatrice": {
                  S_Win_Calc = window.open('calcolatrice.htm', '_blank', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=0,left=1000,width=900,height=500');
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    case "le" : {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "informazioni": {
                 $DDJ.U_About();
            } break;
            default : {
            } break;
          } /* switch */
    } break;
    case "l'": 
    case "l": {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "orologio" : {
                  S_Win_Clock = window.open('viola_files/res/orologio.html', '_blank', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=0,left=1500,width=400,height=400');            
            } break;
            case "elenco" : {
                  CL_UsrView0.F_UsrView_Select("DSK", (C_WwFlag_fDisplay | C_WwFlag_fSearchCS));
            } break;
            case "help" : {
                  $DDJ.U_Help();
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    /*
    * L'utente è avaro di parole, risparmia sugli articoli!
    */
            case "record": {
                  $DDJ.U_EdtTup_DDJ();
            } break;
            case "valore": {
                  $DDJ.U_EdtVal_DDJ();
            } break;
            case "menu": {
                  U_Menu(R_VCtx_Cur, ++P_i);
            } break;
            case "directory":
            case "disco": {
                  U_Directory(R_VCtx_Cur, ++P_i);
            } break;
            case "file": {
                  U_File(R_VCtx_Cur, ++P_i);
            } break;
            case "diagramma":
            case "grafico": {
                  $Chart.U_Chart();
            } break;
            case "scheda": {
                  $DDJ.U_EdtTup_DDJ();
            } break;
            case "informazioni":
            case "about" : {
                 $DDJ.U_Get_Info();
            } break;
            case "tabella":
            case "collezione": {
                  let szNmColl = R_VCtx_Cur.aszKey[++P_i]; 
                  U_Sel_Coll(R_VCtx_Cur, szNmColl)
            } break;
            case "calcolatrice": {
                  S_Win_Calc = window.open('calcolatrice.htm', '_blank', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=0,left=1000,width=900,height=500');
            } break;
            case "orologio" : {
                  S_Win_Clock = window.open('viola_files/res/orologio.html', '_blank', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=0,left=1500,width=400,height=400');            
            } break;
            case "calendario" : {
                  $Calendar.U_Show();
            } break;
            case "help" : {
                  $DDJ.U_Help();
            } break;
    default : {
        let szNmColl = R_VCtx_Cur.aszKey[P_i]; 
        U_Sel_Coll(R_VCtx_Cur, szNmColl);
    } break;
  } /* switch */
  R_VCtx_Cur.szRes = szRes;
} /* U_Mostra */

/*-----U_Chiudi --------------------------------------------------------
*
* Chiudi oggetto
* Ok! 2024-12-26
*/ 
function U_Chiudi(R_VCtx_Cur, P_i)
{
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Fatto.";

  switch (szKey) {
    case "il": {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "menu": {
                  R_VCtx_Cur.szRes = "Non implementato!";
                  return;
            } break;
            case "diagramma":
            case "grafico": {
                  U_Clear_Plot();
            } break;
            case "calendario" : {
                  $Calendar.DBox_0.U_Hub(C_JPnl_Cancel);
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    case "la": {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "scheda": {
                  U_Cancel();
            } break;
            case "tabella":
            case "collezione": {
                  U_Sel_Coll(R_VCtx_Cur, "Empty")
            } break;
            case "calcolatrice": {
                 S_Win_Calc.close();
            } break;
            case "finestra" : {
                 S_Win_0.close();
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    case "l'": 
    case "l": {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "orologio" : {                  
                 S_Win_Clock.close();         
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    default : {
          szRes = S_szMsg_SyntErr;
    } break;
  } /* switch */
  R_VCtx_Cur.szRes = szRes;
} /* U_Chiudi */

/*-----U_Cancel --------------------------------------------------------
*
* Chiudi una dialog-box (Direct command)
* Ok! 2024-12-20
*/ 
function U_Cancel()
{
  var szSCtx = $SemCtx.F_szSCtx_Cur();
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0  = UsrView0.XDB0;

  switch (szSCtx) {
    case "Card": {
         $Card.U_Cancel();
    } break;
    case "InpVal": {
         $Value.DBox_InpVal.U_Hub(C_JPnl_Cancel);
    } break;
    case "SetReset": {
         $Value.DBox_SetReset.U_Hub(C_JPnl_Cancel);
    } break;
    case "DDJ_Cfg": {
         $VConfig.DBox_Config.U_Hub(C_JPnl_Cancel);
    } break;
    case "Layout2": {
         G_Layout.DBox0.U_Hub(C_JPnl_Cancel);
    } break;
    case "Error": {
         $Error.DBox_Error.U_Hub(C_JPnl_Cancel);
    } break;
    case "Warning": {
         $Error.DBox_Warn.U_Hub(C_JPnl_Cancel);
    } break;
    case "Stat": {
         $Stat_DDJ.S_DBox_Stat.U_Hub(C_JPnl_Cancel);
    } break;
    case "About": {
          $DDJ.DBox_About.U_Hub(C_JPnl_Cancel);
    } break;
    case "InpData": {
          $DDJ.DBox_InpData.U_Hub(C_JPnl_Cancel);
    } break;
    case "OutData": {
          $DDJ.DBox_OutData.U_Hub(C_JPnl_Cancel);
    } break;
    case "Calendar" : {
          $Calendar.DBox_0.U_Hub(C_JPnl_Cancel);
    } break;
    default : {
         if (document.getElementById("Id_Alert")) {
            $ACP.U_Close_Alert();
         } else if (document.getElementById("Id_Confirm")) {
            $ACP.U_Close_Confirm();
         }
         else {
            ALERT("Cancel " + szSCtx, 1);
         } /* if */
    } break;
  } /* switch */
} /* U_Cancel */

/*-----F_rCalcola --------------------------------------------------------
*
* Ok! 2024-12-20
*/ 
function F_rCalcola(P_sz)
{
  var szPI = "" + Math.PI;
  var szE  = "" + Math.E;
  var szExpr = P_sz.replaceAll("pi greco", szPI);

  szExpr = szExpr.replaceAll("aperta parentesi", "(");
  szExpr = szExpr.replaceAll("chiusa parentesi", ")");
  szExpr = szExpr.replaceAll("più", "+");
  szExpr = szExpr.replaceAll("meno", "-");
  szExpr = szExpr.replaceAll("diviso", "/");
  szExpr = szExpr.replaceAll("per", "*");
  szExpr = szExpr.replaceAll("modulo", "%");
  szExpr = szExpr.replaceAll("and", "&");
  szExpr = szExpr.replaceAll("or", "|");
  szExpr = szExpr.replaceAll("xor", "^");
  szExpr = szExpr.replaceAll("not", "~");
  szExpr = szExpr.replaceAll("elevato", "**");
  szExpr = szExpr.replaceAll("alla seconda", "**2 ");
  szExpr = szExpr.replaceAll("alla terza", "**3 ");
  szExpr = szExpr.replaceAll("alla quarta", "**4 ");
  szExpr = szExpr.replaceAll("radice quadrata di", "**(0.5) ");
  szExpr = szExpr.replaceAll("e", szE);
  var iRes;
  eval("iRes = " + szExpr);
  return(iRes);
} /* F_rCalcola */

/*-----U_Calcola --------------------------------------------------------
*
* Calcola un'espressione
* Ok! 2024-12-20
*/ 
function U_Calcola(R_VCtx_Cur, P_i)
{
  var iLen = "calcola ".length;

  var szExpr = R_VCtx_Cur.szMsg.substr(iLen);
  var iRes = F_rCalcola(szExpr);
  var szRes = szExpr + " fa " + iRes;
  R_VCtx_Cur.szRes = szRes;
} /* U_Calcola */

/*-----U_QuantoFa --------------------------------------------------------
*
* Ok! 2024-12-20
*/ 
function U_QuantoFa(R_VCtx_Cur, P_i)
{
  var iLen = "Quanto fa ".length;

  var szExpr = R_VCtx_Cur.szMsg.substr(iLen);
  var iRes = F_rCalcola(szExpr);
  var szRes = szExpr + " fa " + iRes;
  R_VCtx_Cur.szRes = szRes;
} /* U_QuantoFa */

/*-----U_Sel_Coll --------------------------------------------------------
*
*/ 
function U_Sel_Coll(R_VCtx_Cur, P_szNmColl)
{
  const C_fReadOnly = false;
  const C_fDisplay  = true;
  const C_fCaseSens = false;
  var UsrView0 = CL_UsrView0.F_UsrView_Select(P_szNmColl, (C_WwFlag_fReadOnly | C_WwFlag_fDisplay));
  R_VCtx_Cur.szRes = (UsrView0)? "fatto!": "non trovo " + P_szNmColl;
} /* U_Sel_Coll */

/*-----U_Riga --------------------------------------------------------
*
* Ok! 2024-12-26
*/ 
function U_Riga(R_VCtx_Cur, P_i)
{
  var iRow = +R_VCtx_Cur.aszKey[P_i] +1;                
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iCol = UsrView0.iCol_Item_Sel;

  $Table.U_ArrowMove(UsrView0, iRow, iCol, C_fScroll);
  R_VCtx_Cur.szRes = "Fatto";
} /* U_Riga */

/*-----U_Colonna --------------------------------------------------------
*
* Ok! 2024-12-26
*/ 
function U_Colonna(R_VCtx_Cur, P_i)
{
  var iCol = +R_VCtx_Cur.aszKey[P_i] +1;                
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iRow = UsrView0.iRow_Item_Sel;

  $Table.U_ArrowMove(UsrView0, iRow, iCol);
  R_VCtx_Cur.szRes = "Fatto";
} /* U_Colonna */

/*-----U_Leggi --------------------------------------------------------
*
*/ 
function U_Leggi(R_VCtx_Cur, P_i)
{
  $DDJ.U_Read_Record();
  R_VCtx_Cur.szRes = "";
} /* U_Leggi */

/*-----U_Vai --------------------------------------------------------
*
*/ 
function U_Vai(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  var szSCtx = $SemCtx.F_szSCtx_Cur();
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "";
  var iRow;
  
  if (szSCtx == "Card") {
      switch (szKey) {
        case "alla" : {
             szKey = R_VCtx_Cur.aszKey[P_i +1];
             switch (szKey) {
               case "riga": {
                    szKey = R_VCtx_Cur.aszKey[P_i +2];
                    $Card.U_Goto_Cell(+szKey);
               } break;
               case "cella": {         
                    szRes = "non implementato";
               } break;
               case "fine": {
                    $Card.U_Last_Cell();
               } break;
               case "prima" : {                    
                    szKey = R_VCtx_Cur.aszKey[P_i +2];
                    switch (szKey) {
                      case "riga": {
                            $Card.U_First_Cell();
                      } break;
                      case "scheda": {
                           $ExeCmd.U_First_Tup1();
                      } break;
                      default : {
                           szRes = F_NonHoCapito();
                      } break;
                    } /* switch */
               } break;
               case "ultima" : {
                    szKey = R_VCtx_Cur.aszKey[P_i +2];
                    switch (szKey) {
                      case "riga": {
                            $Card.U_Last_Cell();
                      } break;
                      case "scheda": {
                           $ExeCmd.U_Last_Tup1();
                      } break;
                      default : {
                           szRes = F_NonHoCapito();
                      } break;
                    } /* switch */
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */
        } break;
        case  "al" : {         
             szKey = R_VCtx_Cur.aszKey[P_i +1];
             switch (szKey) {
               case "principio": {
                    $Card.U_First_Cell();
               } break;
               case "fondo": {
                    $Card.U_Last_Cell();
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */
        } break;
        case "all'inizio" : {
              $Card.U_First_Cell();
        } break;
        case "indietro" : {
              $ExeCmd.U_Prev_Tup();
        } break;
        case "su" : {                 
              $Card.U_Prev_Cell();
        } break;
        case "avanti" : {        
              $ExeCmd.U_Next_Tup();
        
        } break;
        case "giù" : {                 
              $Card.U_Next_Cell();    
        } break;
        default : {
             szRes = F_NonHoCapito();
        } break;
      } /* switch */

  }
  else {
      switch (szKey) {
        case "alla" : {
             szKey = R_VCtx_Cur.aszKey[P_i +1];
             switch (szKey) {
               case "riga": {
                    iRow = +R_VCtx_Cur.aszKey[P_i +2];
                    var iCol = UsrView0.iCol_Item_Sel;             
                    $Table.U_ArrowMove(UsrView0, iRow +1, iCol, C_fScroll);
               } break;
               case "colonna": {         
                    iCol = +R_VCtx_Cur.aszKey[P_i +2];
                    var iRow = UsrView0.iRow_Item_Sel;             
                    $Table.U_ArrowMove(UsrView0, iRow, iCol +1);
               } break;
               case "cella": {         
                    szRes = "non implementato";
               } break;
               case "fine": {
                    $ExeCmd.U_KeyPressed("End");
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */
        } break;
        case  "al" : {         
             szKey = R_VCtx_Cur.aszKey[P_i +1];
             switch (szKey) {
               case "principio": {
                    $ExeCmd.U_KeyPressed("Home");
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */
        } break;
        case "all'inizio" : {
              $ExeCmd.U_KeyPressed("Home");
        } break;
        case "a" : {
             szKey = R_VCtx_Cur.aszKey[P_i +1];
             switch (szKey) {
               case "sinistra": {                 
                    $ExeCmd.U_KeyPressed("ArrowLeft");
               } break;
               case "destra": {
                    $ExeCmd.U_KeyPressed("ArrowRight");
               } break;
               default : {
                    szRes = F_NonHoCapito();
               } break;
             } /* switch */          
        } break;
        case "su" : {                 
              $ExeCmd.U_KeyPressed("ArrowUp");
        } break;
        case "giù" : {                 
              $ExeCmd.U_KeyPressed("ArrowDown");    
        } break;
        default : {
             szRes = F_NonHoCapito();
        } break;
      } /* switch */

  } /* if */
    
  R_VCtx_Cur.szRes = szRes;
} /* U_Vai */

/*-----F_szCella --------------------------------------------------------
*
*/ 
function F_szCella(R_VCtx_Cur, P_i)
{                
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szRes = "Cella. Riga: " + (UsrView0.iRow_Item_Sel -1) + " Colonna: " + (UsrView0.iCol_Item_Sel -1); 
  R_VCtx_Cur.szRes = szRes;
} /* F_szCella */

/*-----U_Menu --------------------------------------------------------
*
* Mostra il menu selezionato
* Ok! 2024-12-20
*/ 
function U_Menu(R_VCtx_Cur, P_i)
{
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "";
  var iRow;
  if (szKey == "di") {
     szKey = R_VCtx_Cur.aszKey[++P_i];
  } /* if */
  
  switch (szKey) {
    case "input" : {
         $DDJ.U_InputData();
    } break;
    case "output" : {
         $DDJ.U_SaveAs();
    } break;
    case "configurazione" : {
         $DDJ.U_Config();
    } break;
    default : {
    } break;
  } /* switch */
} /* U_Menu */

/*-----U_Ordina --------------------------------------------------------
*
* Ok! 2024-12-17
*/ 
function U_Ordina(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var iCol = UsrView0.jaFld1;
  var fAsc = UsrView0.fAsc;
  var iPos0 = R_VCtx_Cur.szMsg.indexOf("decrescente");
  var iPos1 = R_VCtx_Cur.szMsg.indexOf("discendente");
  var iPos2 = R_VCtx_Cur.szMsg.indexOf("foneticamente");  // case unsensitive
  var fCaseSens = (iPos2 < 0);
  fAsc = ((iPos0 < 0) && (iPos1 < 0));
  
  $VConfig.U_Set_ValSts("fCaseSens", fCaseSens);

  $Table.U_Sort(UsrView0, iCol +1, fAsc);

  var szAsc = (fAsc)? "crescente": "decrescente";
  var szCaseSens = (fCaseSens)? "": "foneticamente";
  $Table.U_Display_Table(UsrView0);
  R_VCtx_Cur.szRes = "Ho riordinato la collezione in verso " + szAsc + " " + szCaseSens + " in riferimento alla colonna " + iCol;
} /* U_Ordina */

/*-----U_Inserisci --------------------------------------------------------
*
* Inserici un nuovo valore nell'elemento <input> selezionato.
* Ok! 2024-12-20
*/ 
function U_Inserisci(R_VCtx_Cur, P_i)
{
  var szSCtx = $SemCtx.F_szSCtx_Cur();
  var aszKey = R_VCtx_Cur.aszKey;
  var szMsg = aszKey[P_i];
  var i;

  R_VCtx_Cur.szRes = "Fatto";
  for (i = P_i +1; i < aszKey.length; i++) {
      szMsg += " " + aszKey[i];
  } /* for */

  switch (szSCtx) {
    case "Card": {
         $Card.U_Input(szMsg);
    } break;
    case "Standard":
    case "XTG": {
         $Table.U_Input(szMsg);
    } break;
    case "InpVal": {
         Id_xKrW98717_a.value = szMsg;
    } break;
    case "SetReset": {
         Id_xKrW98717_a.value = szMsg;
    } break;
    case "Filter_JS": {
         Id_Inp_Cond0.value = szMsg;
    } break;
    case "Filter_Str": {
         Id_szVal_FilterStr.value = szMsg;
    } break;
    case "Filter_QBE": {
         $Card.U_Input(szMsg);
    } break;
    case "Filter_2": {
         Id_Inp_Cond0.value = szMsg;
    } break;
    default : {
          $Card.U_Input(szMsg);
    } break;
  } /* switch */
} /* U_Inserisci */

/*-----U_File --------------------------------------------------------
*
* Carica il file selezionato
* Ok! 2024-12-20
*/ 
function U_File(R_VCtx_Cur, P_i)
{
  function U_CB_Read_File_DDJ(P_szTxt, R_VCtx_Cur)
  {
    try {        
        var DDJ0 = {};
        DDJ0.JKndTup0  = JKndTup0;
        DDJ0.szNmColl  = szFlNm;
        DDJ0.szNm_aFld = "AutoDetect";
        DDJ0.aFld      = null;
        $LdFile.U_Make_Coll(DDJ0, P_szTxt);    
    } catch (P_Err) {
        $Error.U_Catch(C_jCd_Cur, 1, P_Err);
    } /* try catch */
  } /* U_CB_Read_File_DDJ */

  var iLen ="carica il file ".length;
  var szFlNm = R_VCtx_Cur.szMsg.substr(iLen);
  var JKndTup0 = $FileMan.F_JKndTup_Mp_szFlNm(szFlNm);          
  szFlNm = szFlNm.replaceAll("\\", "/");
  $LcdLcd.U_Read(szFlNm, null, U_CB_Read_File_DDJ, null, R_VCtx_Cur);
  R_VCtx_Cur.szRes = "ho caricato i dati";
} /* U_File */

/*-----U_Salva --------------------------------------------------------
*
* Ok! 2024-12-20
* Salva la tabella in un file.
*/ 
function U_Salva(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var XDB0 = UsrView0.XDB0;
  
  var szFlNm = R_VCtx_Cur.aszKey[4];
  var iDotPos = szFlNm.lastIndexOf(".");          
  var szExt = szFlNm.substring(iDotPos + 1);
  szExt = szExt.toLowerCase();
  var JKndTup0 = $FileMan.F_JKndTup_Mp_szExt(szExt);
 
  $OutData.U_Save("File DDJ", szFlNm, JKndTup0, 0); 
} /* U_Salva */

/*-----U_Impegni --------------------------------------------------------
*
* Ok! 2024-12-20
*/ 
function U_Impegni(R_VCtx_Cur, P_i)
{
  var szRes = "";
  if (typeof($Agenda) != "undefined") {
     $Agenda.U_ToDo();
  }
  else {
     szRes = "Mi spiace non ho l'agenda.";
  } /* if */
  R_VCtx_Cur.szRes = szRes;
} /* U_Impegni */

/*-----U_Santo --------------------------------------------------------
*
*/ 
function U_Santo(R_VCtx_Cur, P_i)
{
  var szRes = $Agenda.F_szSanti(true);
  R_VCtx_Cur.szRes = szRes;
} /* U_Santo */

/*-----U_Abilita --------------------------------------------------------
*
* Ok! 2024-12-26
*/ 
function U_Abilita(R_VCtx_Cur, P_i)
{

  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Abilitato";
  
  switch (szKey) {
    case "la" : {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "diagnostica": {                 
                 $VConfig.U_Set_ValSts("fDiagnostic", true);
                 U_Refresh();
            } break;
            default : {
            } break;
          } /* switch */    
    } break;
    case "le": {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "date": {
                  let szjDate;
                  szKey = R_VCtx_Cur.aszKey[++P_i];
                  switch (szKey) {
                    case "italiane":
                    case "europee": {
                         szjDate = "DDMMYYYY";
                    } break;
                    case "inglesi":
                    case "anglosassoni":
                    case "americane": {
                         szjDate = "MMDDYYYY";
                    } break;                    
                    case "standard":
                    case "giapponesi": {
                         szjDate = "YYYYMMDD";
                    } break;
                    default : {
                         szRes = S_szMsg_SyntErr;
                    } break;
                  } /* switch */
                  $Value.U_Set_szjDate(szjDate);
                  U_Refresh();
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    case "il" : {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "caricamento": {
                  szKey = R_VCtx_Cur.aszKey[++P_i];
                  switch (szKey) {
                    case "delle": {
                          szKey = R_VCtx_Cur.aszKey[++P_i];
                          switch (szKey) {
                            case "risorse": {                 
                                  $VConfig.U_Set_ValSts("fDiagnostic", true);  //
                                  U_Refresh();                            
                            } break;
                            default : {
                                  szRes = S_szMsg_SyntErr;
                            } break;
                          } /* switch */                   
                    } break;
                    default : {
                         szRes = S_szMsg_SyntErr;
                    } break;
                  } /* switch */
            } break;
            case "flag" : {
                  szKey = R_VCtx_Cur.aszKey[++P_i];
                  switch (szKey) {
                    case "fcasesens": {
                          $VConfig.U_Set_ValSts("fCaseSens", true);     //
                    } break;
                    case "diagnostica": {
                          $VConfig.U_Set_ValSts("fDiagnostic", true);     //
                    } break;
                    case "distinti": {
                          $VConfig.U_Set_ValSts("fDistinct", true);
                    } break;
                    case "debug": {
                          $VConfig.U_Set_ValSts("fHalt_Debug", true);
                    } break;
                    case "indefiniti": {
                          U_Set_Fld(CL_UsrView0.F_UsrView_Selected().XDB0, fMng_Undef);
                    } break;
                    case "esempi": {
                          $VConfig.U_Set_ValSts("fLoadExamples", true);
                    } break;
                    case "voce": {
                          $VConfig.U_Set_ValSts("fVoice_Error", true);
                    } break;
                    case "icone": {
                          $VConfig.U_Set_ValSts("fIcons", true);
                    } break;
                    case "ftypecolor": {
                          $VConfig.U_Set_ValSts("fTypeColor", true);
                    } break;
                    default : {
                          szRes = S_szMsg_SyntErr;
                    } break;
                  } /* switch */
                  U_Refresh();                             
            } break;
            case "debug" : {
                  $VConfig.U_Set_ValSts("fHalt_Debug", true);
            } break;
            default : {
                  szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    default : {
    } break;
  } /* switch */
   
  R_VCtx_Cur.szRes = szRes;
} /* U_Abilita */

/*-----U_Disabilita --------------------------------------------------------
*
* Ok! 2024-12-26
*/ 
function U_Disabilita(R_VCtx_Cur, P_i)
{

  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Disabilitato!";
  
  switch (szKey) {
    case "la" : {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "diagnostica": {
                 U_Reset_Fld(S_pDDJSts, "fDiagnostic");
                 U_Refresh();
            } break;
            default : {
            } break;
          } /* switch */    
    } break;
    case "il" : {
          szKey = R_VCtx_Cur.aszKey[++P_i];
          switch (szKey) {
            case "caricamento": {
                  szKey = R_VCtx_Cur.aszKey[++P_i];
                  switch (szKey) {
                    case "delle": {
                          szKey = R_VCtx_Cur.aszKey[++P_i];
                          switch (szKey) {
                            case "risorse": {                                  
                                  U_Reset_Fld(S_pDDJSts, "fLoadExamples");
                                  U_Refresh();
                            } break;
                            default : {
                                 szRes = S_szMsg_SyntErr;
                            } break;
                          } /* switch */                   
                    } break;
                    default : {
                         szRes = S_szMsg_SyntErr;
                    } break;
                  } /* switch */
            } break;
            case "flag" : {
                  szKey = R_VCtx_Cur.aszKey[++P_i];
                  switch (szKey) {
                    case "fcasesens": {
                          $VConfig.U_Set_ValSts("fCaseSens", false);     //
                    } break;
                    case "diagnostica": {
                          U_Reset_Fld(S_pDDJSts, "fDiagnostic");
                    } break;
                    case "distinti": {
                          U_Reset_Fld(S_pDDJSts, "fDistinct");
                    } break;
                    case "debug": {
                          U_Reset_Fld(S_pDDJSts, "fHalt_Debug");
                    } break;
                    case "indefiniti": {
                          U_Reset_Fld(CL_UsrView0.F_UsrView_Selected().XDB0, fMng_Undef);
                    } break;
                    case "esempi": {
                          U_Reset_Fld(S_pDDJSts, "fLoadExamples");
                    } break;
                    case "voce": {
                          U_Reset_Fld(S_pDDJSts, "fVoice_Error");
                    } break;
                    case "icone": {
                          U_Reset_Fld(S_pDDJSts, "fIcons");
                    } break;
                    case "ftypecolor": {
                          $VConfig.U_Set_ValSts("fTypeColor", false);
                    } break;
                    default : {
                         szRes = S_szMsg_SyntErr;
                    } break;
                  } /* switch */
                  U_Refresh();                             
            } break;
            case "debug" : {
                  $VConfig.U_Set_ValSts("fHalt_Debug", false);
            } break;
            default : {
                 szRes = S_szMsg_SyntErr;
            } break;
          } /* switch */
    } break;
    case "" : {
    } break;
    default : {
    } break;
  } /* switch */
   
  R_VCtx_Cur.szRes = szRes;
} /* U_Disabilita */

/*-----F_szFlNm_Get --------------------------------------------------------
*
* Get filename
*/ 
function F_szFlNm_Get(R_VCtx_Cur, P_i, P_JKndTup)
{
  var aszKndTup = ["null", "arr", "obj", "arcd", "aobj", "asRcd", "asobj"];
  var aszKey = R_VCtx_Cur.aszKey;
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szFlNm;
  var szRes;
  var i;
  
  for (i = P_i; i < aszKey.length; i++) {
      if (aszKey[i] == "punto") {
         szFlNm = aszKey[i -1];
         break;
      } /* if */
  } /* for */
  
  szFlNm += "." + aszKndTup[P_JKndTup];
  return(szFlNm);
} /* F_szFlNm_Get */

/*-----U_Mostrati --------------------------------------------------------
*
* Ok! 2024-12-26
*/ 
function U_Mostrati(R_VCtx_Cur, P_i, P_JKndTup)
{
  S_Win_Viola = window.open('viola/viola-mood.htm', '_blank', 'titlebar=no,toolbar=no,scrollbars=no,menubar=no,status=no,location=no,resizable=yes,top=100,left=100,width=270,height=450');
  R_VCtx_Cur.szRes = "Eccomi!";
} /* U_Mostrati */

/*-----U_Nasconditi --------------------------------------------------------
*
* Ok! 2024-12-26
*/ 
function U_Nasconditi(R_VCtx_Cur, P_i, P_JKndTup)
{
  S_Win_Viola.close();
  R_VCtx_Cur.szRes = "";
} /* U_Nasconditi */

/*-----U_Prova --------------------------------------------------------
*
* Insert here code under testing.
*/ 
function U_Prova(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();  
  var szTxt = UsrView0.Val_Sel;
  debugger;
  
  $Wiki.F_aszRes_Wiki(szTxt);
  
  R_VCtx_Cur.szRes = "Fatto";
} /* U_Prova */

/*-----U_Errore --------------------------------------------------------
*
*  Genera un errore allo scopo di testare il meccanismo di segnalazione degli errori.
* Ok! 2024-12-26
*/ 
function U_Errore()
{
  $Error.U_Error(C_jCd_Cur, 1, "Error Reporting Test", "", false);
} /* U_Errore */

/*-----U_Warning --------------------------------------------------------
*
*  Genera un Warning allo scopo di testare il meccanismo di segnalazione degli errori.
* Ok! 2024-12-26
*/ 
function U_Warning()
{
  $Error.U_Warning(C_jCd_Cur, 2, "Warning Reporting Test", "", false);
} /* U_Warning */

/*-----U_Monitor --------------------------------------------------------
*
*/ 
function U_Monitor(P_fUser, P_szMsg)
{
  if ($Root.F_fExist("$Monitor")) { 
     $Monitor.U_Monitor(P_fUser, P_szMsg);
  } /* if */
} /* U_Monitor */

/*-----F_szOrdin_Mp_Num --------------------------------------------------------
*
*/ 
function F_szOrdin_Mp_Num(P_iNum, P_ch)
{
var aszNum = [
"zero",
"uno",
"due",
"tre",
"quattro",
"cinque",
"sei",
"sette",
"otto",
"nove",
"dieci",
"undici",
"dodici",
"tredici",
"quattordici",
"quindici",
"sedici",
"diciassette",
"diciotto",
"diciannove",
"venti",
"ventuno",
"ventidue",
"ventitre",
"ventiquattro",
"venticinque",
"ventisei",
"ventisette",
"ventotto",
"ventinove",
"trenta",
"trentuno",
"trentadue",
"trentatre",
"trentaquattro",
"trentacinque",
"trentasei",
"trentasette",
"trentotto",
"trentanove",
"quarante",
"quarantuno",
"quarantadue",
"quarantatre",
"quarantaquattro",
"quarantacinque",
"quarantasei",
"quarantasette",
"quarantotto",
"quarantanove",
"cinquante",
"cinquantuno",
"cinquantadue",
"cinquantatre",
"cinquantaquattro",
"cinquantacinque",
"cinquantasei",
"cinquantasette",
"cinquantotto",
"cinquantanove",
"sessante",
"sessantuno",
"sessantadue",
"sessantatre",
"sessantaquattro",
"sessantacinque",
"sessantasei",
"sessantasette",
"sessantotto",
"sessantanove",
"settante",
"settantuno",
"settantadue",
"settantatre",
"settantaquattro",
"settantacinque",
"settantasei",
"settantasette",
"settantotto",
"settantanove",
"ottante",
"ottantuno",
"ottantadue",
"ottantatre",
"ottantaquattro",
"ottantacinque",
"ottantasei",
"ottantasette",
"ottantotto",
"ottantanove",
"novante",
"novantuno",
"novantadue",
"novantatre",
"novantaquattro",
"novantacinque",
"novantasei",
"novantasette",
"novantotto",
"novantanove",
"cente",
"centouno",
"centodue",
"centotre",
"centoquattro",
"centocinque",
"centosei",
"centosette",
"centootto",
"centonove",
"centodieci"
];

  var aszOrdin10 = [
"zer",
"prim",
"second",
"terz",
"quart",
"quint",
"sest",
"settim",
"ottav",
"non",
"decim"
];

  var aszOrdin100 = [
"zer",
"unesim",
"duesim",
"tresim",
"quattresim",
"cinquesim",
"seiesim",
"settesim",
"ottesim",
"novesim",
"decim",
"undicesim",
"dodicesim",
"tredicesim",
"quattordicesim",
"quindicesim",
"sedicesim",
"diciassettesim",
"diciottesim",
"diciannovesim",
"ventesim",
"ventunesim",
"ventiduesim",
"ventitreesim",
"ventiquattresim",
"venticinquesim",
"ventiseiesim",
"ventisettesim",
"ventottesim",
"ventinovesim",
"trentesim",
"trentunesim",
"trentaduesim",
"trentatreesim",
"trentaquattresim",
"trentacinquesim",
"trentaseiesim",
"trentasettesim",
"trentottesim",
"trentanovesim",
"quarantesim",
"quarantunesim",
"quarantaduesim",
"quarantatreesim",
"quarantaquattresim",
"quarantacinquesim",
"quarantaseiesim",
"quarantasettesim",
"quarantottesim",
"quarantanovesim",
"cinquantesim",
"cinquantunesim",
"cinquantaduesim",
"cinquantatreesim",
"cinquantaquattresim",
"cinquantacinquesim",
"cinquantaseiesim",
"cinquantasettesim",
"cinquantottesim",
"cinquantanovesim",
"sessantesim",
"sessantunesim",
"sessantaduesim",
"sessantatreesim",
"sessantaquattresim",
"sessantacinquesim",
"sessantaseiesim",
"sessantasettesim",
"sessantottesim",
"sessantanovesim",
"settantesim",
"settantunesim",
"settantaduesim",
"settantatreesim",
"settantaquattresim",
"settantacinquesim",
"settantaseiesim",
"settantasettesim",
"settantottesim",
"settantanovesim",
"ottantesim",
"ottantunesim",
"ottantaduesim",
"ottantatreesim",
"ottantaquattresim",
"ottantacinquesim",
"ottantaseiesim",
"ottantasettesim",
"ottantottesim",
"ottantanovesim",
"novantesim",
"novantunesim",
"novantaduesim",
"novantatreesim",
"novantaquattresim",
"novantacinquesim",
"novantaseiesim",
"novantasettesim",
"novantottesim",
"novantanovesim",
"centesim",
"centounesim",
"centoduesim",
"centotreesim",
"centoquattresim",
"centocinquesim",
"centoseiesim",
"centosettesim",
"centoottesim",
"centonovesim",
"centodecim"
];

var szMsg = "Errore";

  if (P_iNum < 10) {
     szMsg = aszOrdin10[P_iNum];
  }
  else if (P_iNum < 110) {
     szMsg = aszOrdin100[P_iNum];
  }
  else
  if (P_iNum < 1000) {
     var iCent = Math.floor(P_iNum / 100);
     P_iNum = P_iNum % 100;
     szMsg = aszNum[iCent] + "cento";
     szMsg += aszOrdin100[P_iNum];
  }
  else {
  } /* if */
  
  return(szMsg + P_ch);
} /* F_szOrdin_Mp_Num */

/*-----U_Chi --------------------------------------------------------
*
*/ 
function U_Chi(R_VCtx_Cur, P_i)
{
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Non lo so!";

  switch (szKey) {   
    case "era":      
    case "fu":     
    case "è": {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey); 
    } break;    
    default : {
          szRes = S_szMsg_SyntErr;
    } break;
  } /* switch */

  R_VCtx_Cur.szRes = szRes;  
} /* U_Chi */

/*-----U_Cosa --------------------------------------------------------
*
*/ 
function U_Cosa(R_VCtx_Cur, P_i)
{
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Non lo so!";

  switch (szKey) {   
    case "era":      
    case "fu":     
    case "è": {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey); 
    } break;    
    default : {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey);
    } break;
  } /* switch */

  R_VCtx_Cur.szRes = szRes;  
} /* U_Cosa */

/*-----U_Come --------------------------------------------------------
*
*/ 
function U_Come(R_VCtx_Cur, P_i)
{
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Non lo so!";

  switch (szKey) {   
    case "era":      
    case "fu":     
    case "è": {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey); 
    } break;    
    default : {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey);
    } break;
  } /* switch */

  R_VCtx_Cur.szRes = szRes;   
} /* U_Come */

/*-----U_Dove --------------------------------------------------------
*
*/ 
function U_Dove(R_VCtx_Cur, P_i)
{
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Non lo so!";

  switch (szKey) {   
    case "era":      
    case "fu":     
    case "è": {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey); 
    } break;    
    default : {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey);
    } break;
  } /* switch */

  R_VCtx_Cur.szRes = szRes;   
} /* U_Dove */

/*-----U_Quando --------------------------------------------------------
*
*/ 
function U_Quando(R_VCtx_Cur, P_i)
{
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "Non lo so!";

  switch (szKey) {   
    case "era":      
    case "fu":     
    case "è": {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey); 
    } break;    
    default : {
         var aszKey = R_VCtx_Cur.aszKey;
         szKey = "";
         for (let i = P_i +1; i < aszKey.length; i++) {
              szKey += aszKey[i] + " ";
         } /* for */
         $Wiki.F_aszRes_Wiki(szKey);
    } break;
  } /* switch */

  R_VCtx_Cur.szRes = szRes;    
} /* U_Quando */

/*-----U_Zitta --------------------------------------------------------
*
*/ 
function U_Zitta()
{
  $DDJ.U_ShutUp();
  return("");
} /* U_Zitta */

/*-----U_Refresh --------------------------------------------------------
*
*/ 
function U_Refresh()
{
   $DDJ.U_Refresh();
} /* U_Refresh */

/*-----U_Teach_On --------------------------------------------------------
*
*/ 
function U_Teach_On()
{
  ALERT("Teach ON", 1);
} /* U_Teach_On */

/*-----U_Teach_Off --------------------------------------------------------
*
*/ 
function U_Teach_Off()
{
  ALERT("Teach OFF", 1);
} /* U_Teach_Off */

/*-----U_Collection --------------------------------------------------------
*
*/ 
function U_Collection(R_VCtx_Cur, P_i)
{
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "";

  CL_UsrView0.F_UsrView_Select(szKey, (C_WwFlag_fSearchCS | C_WwFlag_fDisplay));
  
  R_VCtx_Cur.szRes = szRes;
  G_VCtx_Cur.BagRef.fRestore = false;
} /* U_Collection */

/*-----U_Directory --------------------------------------------------------
*
*/ 
function U_Directory(R_VCtx_Cur, P_i)      // $LCD $Versioni
{
  var asDflt = S_asDirs;
 
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "";
  
  var szPath = asDflt[szKey.toLowerCase()];
  if (szPath) {
     szKey = szPath;
  } /* if */

  var szPath = szKey.replaceAll("\\", "/");
  $FileMan.U_Open_PATH_2(szPath, "dir");
  
  R_VCtx_Cur.szRes = szRes;
  G_VCtx_Cur.BagRef.fRestore = false;
} /* U_Directory */

/*-----U_File --------------------------------------------------------
*
*/ 
function U_File(R_VCtx_Cur, P_i)      // $LCD $Versioni
{
  var asDflt = S_asFiles; 
  
  var UsrView0 = CL_UsrView0.F_UsrView_Selected();
  var szKey = R_VCtx_Cur.aszKey[P_i];
  var szRes = "";
  
  var szPath = asDflt[szKey];
  if (szPath) {
     szKey = szPath;
  } /* if */

  var szPath = szKey.replaceAll("\\", "/");
  $FileMan.U_Open_PATH_2(szPath, "file");
  
  R_VCtx_Cur.szRes = szRes;
  G_VCtx_Cur.BagRef.fRestore = false;
} /* U_File */

/*-----U_Impegni --------------------------------------------------------
*
*/ 
function U_Impegni(R_VCtx_Cur, P_i)      // $LCD $Versioni
{  
  R_VCtx_Cur.szRes = "Gli ipmegni di oggi sono i seguenti";
} /* U_Impegni */



/*-----U_Init_Sentence --------------------------------------------------------
*
* const C_jaMnEntry_Title = 0;    * HTML's elements 'title'
* const C_jaMnEntry_pFn   = 1;    * Function that will be run when the button is clicked
* const C_jaMnEntry_Cap   = 2;    * Name engraved on button's cap.
* const C_jaMnEntry_Icon  = 3;    * Icon path
* const C_jaMnEntry_Key   = 4;    * Key
* const C_jaMnEntry_Opt   = 5;    * Options
* const C_jaMnEntry_Lst   = 6;    * Options List
* 
* See also U_Init_SemCtx();
*/

/*-----U_Register --------------------------------------------------------
*
*/
var S_iCnt = 0;
function U_Register()
{
  if (S_iCnt == 0) {
     var UsrView0 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("sentence.as_", true);
     if (UsrView0) {
        S_asQuest = UsrView0.XDB0.Coll0;
        S_iCnt++;
     } /* if */
  } /* if */
  if (S_iCnt == 1) {
     var UsrView1 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("files.as_", true);
     if (UsrView1) {
        S_asFiles = UsrView1.XDB0.Coll0;
        S_iCnt++;
     } /* if */
  } /* if */
  if (S_iCnt == 2) {
     var UsrView2 = CL_UsrView0.F_UsrView_Mp_szNm_UsrView("dirs.as_", true);
     if (UsrView2) {
        S_asDirs = UsrView2.XDB0.Coll0;
        S_iCnt++;
     } /* if */
  } /* if */

  if (S_iCnt < 3) {
    setTimeout(U_Register, 1000);
    return;
  } /* if */
} /* U_Register */
 
function U_Init_Sentence()
{
  var pFn0;
  var pFn1;
  var szType;

  G_VCtx_Cur = {};
  G_VCtx_Cur.szMsg0 = "";     /* Original message. */
  G_VCtx_Cur.szMsg  = "";     /* Cleaned message. */  
  G_VCtx_Cur.szSCtx = "";     /* current Contect. */
  G_VCtx_Cur.aszKey = [""];   /* List of the keys. */
/*
* The following cycle expands UI contexts (SCtx) consisting of TBM entries definitions (in G_asaMnEntry array) generating the expanded representation (S_asObj_Entry) required by NLP command interpreter.
*
* G_asaMnEntry:  original list of TBM definitions declared in "mnentry.js".
* aMnEntry[]:    array of TMB descriptors for a context (SCtx).
* MnEntry0:      descriptor corresponding to a "TBM menu entry" that is an Icon.
* 
* S_asObj_Entry: list of TBM definitions Expanded, used by Event handlers and command interpreters.
* asSem:         array of TMB descriptors for a context (SCtx).
* 
*/
  try {
    /* Make S_asObj_Entry */
    /* Iterate through the SCtx Contexts. */
    for (var Key in G_asaMnEntry) {
        var aMnEntry = G_asaMnEntry[Key];
        var iLen = aMnEntry.length;
        var asSem = {};
        for (var i = 0; i < iLen; i++) {
            var MnEntry0 = aMnEntry[i];
            if (!MnEntry0) {
               $Error.U_Error(C_jCd_Cur, 2, "typeof(MnEntry0) == 'undefined'", i, false);
            } /* if */
            var szTitle = MnEntry0[C_jaMnEntry_Title];
            var pFn     = MnEntry0[C_jaMnEntry_pFn];
            var szKey   = MnEntry0[C_jaMnEntry_Key];
            if (szTitle == "") {
               if (pFn == "Insert") {  /* Insert command overriding "duplicate" check. */
                   var asEntry1 = S_asObj_Entry[szKey];
                   var Entry1;
                   var szKey1;
                   for (szKey1 in asEntry1) {
                       Entry1 = asEntry1[szKey1];
                       asSem[szKey1] = Entry1; 
                   } /* for */             
                   continue; 
               } /* if */
            } /* if */
            try {
                eval(`szType = typeof(${pFn})`);  /* Check function existence. */
            } catch (P_Err) {
                /* Function not available */
                szType = "undefined";
            } /* try catch */
            if (szType == "undefined") {
                /* Remove Icon from TBM. */
                MnEntry0[C_jaMnEntry_Key]   = "";
                MnEntry0[C_jaMnEntry_Title] = "";                
                $Error.U_Warning(C_jCd_Cur, 2, "Unknown function.", pFn, false);
                continue;
            } /* if */
            if (szKey == "") {
               /* Skip keyless entries. */            
               continue;
            } /* if */
            
            if (asSem[szKey]) {
               $Error.U_Error(C_jCd_Cur, 3, "Attempt to redefine a MnEntry", Key + "." + szKey, false);          
            }
            else {
               asSem[szKey] = MnEntry0;
            } /* if */
        } /* for */      
        if (S_asObj_Entry[Key]) {
           $Error.U_Error(C_jCd_Cur, 4, "Attempt to redefine a S_asObj_Entry", Key, false);          
        }
        else {
           S_asObj_Entry[Key] = asSem;
        } /* if */  
    } /* for */  
  } catch (P_Err) {
      debugger;
  } /* try catch */
  
  setTimeout(U_Register, 1000);
  U_Root0("$Sentence", C_jCd_Cur, 2);
} /* U_Init_Sentence */

  U_Root0("$Sentence", C_jCd_Cur, 1);
  return(_Sentence);
})();  /* $Sentence */
