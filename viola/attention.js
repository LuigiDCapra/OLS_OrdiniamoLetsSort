/* -------------------------------------------------------------------------
* Project     : 
* Description : 
* Revision    : 0.022
* File        : attention.js
* Function    : Voice Assistant
* FirstEdit   : 01/02/2021
* LastEdit    : 07/12/2022
* Author      : Luigi D. Capra
* Copyright(c): Luigi D. Capra 2006, 2021
* System      : Mozilla FireFox 80+
-------------------------------------------------------------------------
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

/*----- Module $Attention --------------------------------------------------------
*
*/ 
const $Attention = (function () {
  var _Attention = {};
  _Attention.U_Init            = U_Init_Attention;     // function U_Init_Attention();
  _Attention.U_Set_Attention = U_Set_Attention;      // function U_Set_Attention(P_iAttention);
  _Attention.F_iAttention    = F_iAttention;         // function F_iAttention(); 

/*----- Local Constants ----------------------------------------------*/


const C_jCd_Cur = C_jCd_Attention;

/*----- Local Variables ----------------------------------------------*/

/*-----U_Set_Attention --------------------------------------------------------
*
*/ 
function U_Set_Attention(P_iAttention)
{
  G_VCtx_Cur.iAttention = P_iAttention;
} /* U_Set_Attention */

/*-----F_iAttention --------------------------------------------------------
*
*/ 
function F_iAttention()
{
  return(G_VCtx_Cur.iAttention);
} /* F_iAttention */

/*--------------------------------------------------------------------*/

/*-----U_Init_Attention --------------------------------------------------------
*
*/ 
function U_Init_Attention()
{
} /* U_Init_Name */

  return(_Attention);
})();  /* Attention */

