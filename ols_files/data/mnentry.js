/* Menu commands */
var G_asaMnEntry = 
{
// $IMPORTANT: blocks name should have prefix "+" so the automatic HELP files generator (U_Generate_Aside()) could automatically skip their insertion. 20/07/2025
// "expand" command expands blocks.
// "insert" command insert NLP commands in SCtx.
                                  
"++ block NLP ++": [
["","$DDJ.U_Prev_DDJ", "", "", "indietro"],
["","$DDJ.U_Prev_DDJ", "", "", "precedente"], 
["","$DDJ.U_Next_DDJ", "", "", "avanti"], 
["","$DDJ.U_Next_DDJ", "", "", "prossima"],   
["","$DDJ.U_EdtVal_DDJ", "", "", "cambia il valore", "opt_auth"],   
["","$DDJ.U_EdtVal_DDJ", "", "", "edita il valore", "opt_auth"],
["","$DDJ.U_EdtTup_DDJ", "", "", "edita il record", "opt_auth"],
["","$DDJ.U_EdtTup_DDJ", "", "", "edita la scheda", "opt_auth"],
["","$ExeCmd.U_Pg_Dn","", "","pagina giù"],
["","$ExeCmd.U_Pg_Up","", "","pagina su"],
["","$ExeCmd.U_Pg_Dn","", "","pagina seguente"],
["","$ExeCmd.U_Pg_Up","", "","pagina precedente"],
["","$ExeCmd.U_Pg_Dn","", "","pagina prima"],
["","$ExeCmd.U_Pg_Up","", "","pagina dopo"],
["","$ExeCmd.U_Row_Dn","", "","giù"],
["","$ExeCmd.U_Row_Dn","", "","scendi"],
["","$ExeCmd.U_Row_Dn","", "","sotto"],
["","$ExeCmd.U_Row_Up","", "","su"],
["","$ExeCmd.U_Row_Up","", "","sali"],
["","$ExeCmd.U_Row_Up","", "","sopra"],
["","$ExeCmd.U_Home","", "","primo"],
["","$ExeCmd.U_Home","", "","inizio"],
["","$ExeCmd.U_Home","", "","principio"],
["","$ExeCmd.U_Home","", "","in cima"], 
["","$ExeCmd.U_End","", "","ultimo"],
["","$ExeCmd.U_End","", "","fondo"],
["","$ExeCmd.U_End","", "","fine"],
["","$ExeCmd.U_Left","", "","sinistra"],
["","$ExeCmd.U_Right","", "","destra"],

["", "$DDJ.U_Help", "Help", "ols_files/ico/help.svg", "help"], 
["", "$DDJ.U_Help", "Help", "ols_files/ico/help.svg", "aiuto"], 
["", "$DDJ.U_About", "About", "ols_files/ico/about.svg", "informazioni"]   
],

"+++ block PrevNext +++":[
["Previous",           "$DDJ.U_Prev_DDJ", "&lt;-", "ols_files/ico/prev.svg", "collezione precedente"], 
["Next",               "$DDJ.U_Next_DDJ", "-&gt;", "ols_files/ico/next.svg", "collezione seguente"]
],

"+++ block LoadSave +++":[
["Select Collection.", "$DDJ.U_InputData", "Select Collection", "ols_files/ico/input.svg", "seleziona la collezione"],
["Reload collection.", "$DDJ.U_Reload", "Reload Collection", "ols_files/ico/reload.svg", "ricarica"], 
["Save All Changes.",  "$DDJ.U_SaveAllChanges", "Save All Changes", "ols_files/ico/save3.svg", "salva tutte le modifiche", "opt_auth"],
["Save As.",           "$DDJ.U_SaveAs", "Save As", "ols_files/ico/save_as.svg", "salva con nome"],
["Refresh view.",      "$DDJ.U_Refresh", "Refresh View", "ols_files/ico/refresh.svg", "rinfresca"],
["Reset",              "$InpData.U_Reset_Sts", "Reset", "ols_files/ico/reset_sts.svg", "reset"]
],

"+++ block Development +++":[    /* $LCD */
["Dashboard",          "$OLS.U_Dashboard", "dashboard", "ols_files/ico/dashboard.svg", "sinottico"],
["Luigi",              "$LcdLcd.U_Home",   "luigi", "ols_files/ico/home2.svg", "luigi"]
],

"+++ block LdSv Layout +++":[
["Save As.",           "$DDJ.U_SaveAs", "Save As", "ols_files/ico/save_as.svg", "salva con nome"],
["Reset",              "$InpData.U_Reset_Sts", "Reset", "ols_files/ico/reset_sts.svg", "reset"],
["Snap shot.",         "$DDJ.U_Snap", "Snap", "ols_files/ico/snap.svg", "fotografa"]
],

"+++ block Edit +++":[
["Data set/reset.",    "$DDJ.U_Data_SetReset", "Data set/reset", "ols_files/ico/setreset.svg", "set reset", "opt_auth"],
["Change value.",      "$DDJ.U_EdtVal_DDJ", "Edit Value", "ols_files/ico/edit_value.svg", "modifica il valore", "opt_auth"],
["Edit Record.",       "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "mostra il record", "opt_auth"],
["",                   "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "apri il record", "opt_auth"],
["",                   "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "edit record", "opt_auth"],
["New Record.",        "$DDJ.U_NewTup_DDJ", "New Record", "ols_files/ico/new_tuple.svg", "nuovo record", "opt_auth"],
["New n Records.",     "$DDJ.U_New_n_Tup", "New n Records", "ols_files/ico/new_n_tuple.svg", "nuovi record", "opt_auth"],
["Delete Record.",     "$DDJ.U_DelTup_DDJ", "Delete Record", "ols_files/ico/delete_tuple.svg", "cancella il record", "opt_auth"]
],

"+++ block Filter +++":[
["Filter JS.",         "$DDJ.U_SetFilterJS", "Filter-JS", "ols_files/ico/filter_js.svg", "filtro javascript"],
["Wizard.",            "$DDJ.U_SetFilter2",  "Filter Wizard", "ols_files/ico/filter_2.svg", "wizard"],  
["Filter Query by Example.", "$DDJ.U_FilterQBE", "Filtro QbE", "ols_files/ico/filter_qbe.svg", "filtro qbe"], 
["Filter String.",     "$DDJ.U_SetFilterStr", "FilterStr", "ols_files/ico/filter_str.svg", "filtro stringa"], 
["Filter Equal.",      "$Filter.U_SetFilterEQ",  "FilterEQ", "ols_files/ico/filter_EQ.svg", "filtro uguale"], 
["Toggle Filter.",     "$DDJ.U_ToggleFilter", "Toggle Filter", "ols_files/ico/toggle_filter.svg", "commuta la selezione"],   
["Invert Filter.",     "$DDJ.U_InvertFilter", "Invert Filter", "ols_files/ico/invert_filter.svg", "inverti la selezione"],    
["Clear selection.",   "$DDJ.U_ClearFilter",  "Clear Filter", "ols_files/ico/clear_filter.svg", "annulla la selezione"],
["Go to line",         "$DDJ.U_GoTo", "GoTo", "ols_files/ico/goto.svg", "vai alla riga"]
],

"+++ block Test +++":[
["Test-1",             "U_Test1", "Test-1", "ols_files/ico/test-1.svg", "test-1"]
],

"+++ block PlaceHolder +++":[     /* $LCD */
["x1",         "$DDJ.U_BrkPnt", "x1", "ols_files/ico/show.svg", "x1"],
["x2",         "$DDJ.U_BrkPnt", "x2", "ols_files/ico/show.svg", "x2"],
["x3",         "$DDJ.U_BrkPnt", "x3", "ols_files/ico/show.svg", "x3"]
],

"+++ block CFG +++":[
["Configure.",         "$DDJ.U_Config", "Config", "ols_files/ico/config.svg", "configura"],
["",                   "$DDJ.U_Config", "Config", "ols_files/ico/config.svg", "configurazione"],
["Help.",              "$DDJ.U_Help", "Help", "ols_files/ico/help.svg", "aiuto"],
["About.",             "$DDJ.U_About", "About", "ols_files/ico/about.svg", "informazioni"]
],

"+++ block Layout +++":[
["Layout",             "$DDJ.U_LayoutColl", "Layout", "ols_files/ico/layout0.svg", "layout"],
["Field Layout",       "$DDJ.U_LayoutFld", "Field Layout", "ols_files/ico/layout.svg", "field layout"],
["Config. UsrView",    "$UsrView.U_Cfg_UV", "Config", "ols_files/ico/cfg_uv.svg", "configura vista utente"],
["Collection URL",     "$DDJ.U_Show_szURL", "Show Collection URL", "ols_files/ico/show_url.svg", "Show Collection URL"],
["Edit Collection",    "$XTG.U_Edit_Coll",   "Edit Collection", "ols_files/ico/edit_coll.svg", "edita collezione"]
],

"+++ block Tools +++":[    /* $LCD */
["JS-Int",             "$OLS.U_JSInt", "JS-Int", "ols_files/ico/js-int.svg", "interprete javascript", "opt_auth"],
["Calculator",         "$OLS.U_Calculator", "Calculator", "ols_files/ico/calculator.svg", "calcolatrice"],
["VLS",                "$OLS.U_VLS", "VLS", "ols_files/ico/vls.svg", "Vediamo/Let's See", ""],
["WE4",                "$OLS.U_WE4", "WE4", "ols_files/ico/we4.svg", "Editor WE4", ""]
],

"+++ block PATH-GO +++":[
["PATH",               "U_Path0", "Path", "ols_files/ico/inbox.svg", "Percorso", "input", ["text"]],
["Submit PATH",        'U_Path', "Submit Path", "ols_files/ico/exe.svg", "imposta", "button", ["GO"]]
],

"+++ rem block PATH-GO +++":[
["PATH",               "U_Null", "Path", "", "Percorso", "input", ["text"]],
["Submit PATH",        'U_Path', "Submit Path", "", "imposta", "button", ["GO"]]
],

"+++ block PATH-SET +++":[
["PATH",               "U_Path0", "Path", "ols_files/ico/inbox.svg", "Percorso", "input", ["text"]],
["Load PATH",          'U_SetPath', "Load Path", "ols_files/ico/exe.svg", "carica", "button", ["SET"]],
["Submit PATH",        'U_Path', "Submit Path", "ols_files/ico/exe.svg", "imposta", "button", ["GO"]]
],

"+++ rem block PATH-SET +++":[
["PATH",               "U_Null", "Path", "", "Percorso", "input", ["text"]],
["Load PATH",          'U_SetPath', "Load Path", "", "carica", "button", ["SET"]],
["Submit PATH",        'U_Path', "Submit Path", "", "imposta", "button", ["GO"]]
],

"+++ block Resources +++":[
["Open Resources",     "$FileMan.U_Show_Res", "Open Resources", "ols_files/ico/show.svg", "mostra risorsa"],
["",                   "$FileMan.U_Show_Res", "Open Resources", "ols_files/ico/show.svg", "apri risorsa"],
["Edit Resources",     "$XTG.U_Edit_Res",     "Edit Resources", "ols_files/ico/edit_res.svg",  "edita risorsa"],
["Edit",               "$XTG.U_Edit_File",    "Edit",           "ols_files/ico/edit_file.svg", "edita"]
],

"+++ block Resources Sinottico +++":[
["Aggiorna",           "$Sinottico.U_Dashboard","Update",         "ols_files/ico/update.svg", "aggiorna"],
["Open Resources",     "$Sinottico.U_Show_Res", "Open Resources", "ols_files/ico/show.svg", "mostra risorsa"],
["",                   "$Sinottico.U_Show_Res", "Open Resources", "ols_files/ico/show.svg", "apri risorsa"],
["Edit Resources",     "$Sinottico.U_Edit_Res", "Edit Resources", "ols_files/ico/edit_res.svg",  "edita risorsa"],
["Edit",               "$Sinottico.U_Edit_File","Edit",           "ols_files/ico/edit_file.svg", "edita"],
   
["Planes View.",       "$DDJ.U_Planes", "Planes View", "ols_files/ico/planes.svg", "piani di memoria"], 
["Span another OLS",   "$OLS.U_Span_OLS2","Span another OLS",     "ols_files/ico/ols2.svg", "esegui ols2"]
],

"+++ block NL command +++":[
["NL command",         "U_Null", "NL commands", "", "comando LN", "input", ["text"]],
["Submit command",     'U_NL_Cmd', "Submit commands", "", "esegui", "button", ["RUN"]]
],
                                               
"PopUp": [
["", "$DDJ.U_Help_PopUp",   "Help PopUp (OLS)","ols_files/ico/help.svg", "aiuto"],     // OLS
["", "$DDJ.U_Read_Record",  "Read aloud Touple's values.","", "leggi"],
["", "$DDJ.U_ShutUp",       "Shut up! Stop reading.","", "silenzio"],

["",  "U_Null",             "----","", ""],
["",  "$ExeCmd.U_Home",     "Home", "ols_files/ico/pg_home.svg", "Inizio pagina"],
["",  "$ExeCmd.U_End",      "End",  "ols_files/ico/pg_end.svg",  "Fine pagina"],
 
["",  "U_Null",             "----","", ""], 
["", "$DDJ.U_GoTo_Prv",     "goto prev", "ols_files/ico/goto_prv.svg", "goto prev"],
["", "$DDJ.U_GoTo_Nxt",     "goto next", "ols_files/ico/goto_nxt.svg", "goto next"],

["",  "U_Null",              "----","", ""],
["", "$FileMan.U_Show_Res", "Open Resources", "ols_files/ico/show.svg", "apri risorse"],
["", "$DDJ.U_SetAnchor",    "Set anchor", "ols_files/ico/anchor.svg", "ancora"],   
["", "U_NL_Cmd_123",        "+++ NL Command +++", "ols_files/ico/exe.svg", "Comando"],    
["", "$Remarks.U_Ins_Rem",  "Remarks", "ols_files/ico/sv_rem.svg", "annota"],
["",  "U_Null",              "----","", ""],
["", "U_Stat_Field",        "Column Statistics.","ols_files/ico/stat.svg", "statistiche campo"],
["", "U_Stat_Record",       "Table  Statistics.","ols_files/ico/stat.svg", "statistiche record"],
["", "U_Toggle_fLoad",      "Toggle Resourcess Loading.","", "commuta fload"],
["", "U_Toggle_fRawData",   "RawData / Formatted data.","",  "commuta frawdata"],
["", "U_Toggle_fDistinct",  "Toggle distinct.",  "", "commuta fdistinct"],
["", "U_Toggle_fDiagnostic","Toggle Diagnostic.","", "commuta diagnostica"],
["", "U_Toggle_fTypeColor", "Toggle Type Color.","", "commuta typecolor"],
["", "$Type.U_Conv_Record", "Update data type.", "", "converti"],
["", "U_Toggle_fCaseSens",  "Toggle Case Sensitive.","", "commuta case sensitive"],
["", "$DDJ.U_Get_Info",     "Get Info.","", "informazioni"],
["", "$DDJ.U_Clear_Plot",   "Clear Plot.","", "cancella disegno"]
],

"PopUp_Layout": [
["", "$DDJ.U_Help_PopUp",   "Help PopUp Layout","ols_files/ico/help.svg", "aiuto"],
["", "$DDJ.U_Read_Record",  "Read aloud Touple's values.","ols_files/ico/read.svg", "leggi"],
["", "$DDJ.U_ShutUp",       "Shut up! Stop reading.","ols_files/ico/shutup.svg", "silenzio"],

["", "$DDJ.U_EdtVal_DDJ",   "Edit Value", "ols_files/ico/edit_value.svg", "modifica il valore", "opt_auth"],
["", "$DDJ.U_EdtTup_DDJ",   "Edit Record", "ols_files/ico/edit_tuple.svg", "edit record", "opt_auth"],
["", "$DDJ.U_NewTup_DDJ",   "New Record", "ols_files/ico/new_tuple.svg", "nuovo record", "opt_auth"],
["", "$DDJ.U_DelTup_DDJ",   "Delete Record", "ols_files/ico/delete_tuple.svg", "cancella il record", "opt_auth"],
["", "$DDJ.U_ClearFilter",  "Clear Filter", "ols_files/ico/clear_filter.svg", "annulla la selezione"],

["", "U_Null",              "----","", ""],      
["", "$DDJ.U_Refresh",      "Refresh View", "ols_files/ico/refresh.svg", "rinfresca"], 
["", "U_Null",              "----","", ""],
["", "U_Stat_Field",        "Column Statistics.","ols_files/ico/stat.svg", "statistiche campo"],
["", "U_Stat_Record",       "Table  Statistics.","ols_files/ico/stat.svg", "statistiche record"],
["", "U_Toggle_fLoad",      "Toggle Resourcess Loading.","", "commuta fLoad"],
["", "U_Toggle_fRawData",   "RawData / Formatted data.","", "commuta fRawData"],
["", "U_Toggle_fDistinct",  "Toggle distinct.","", "commuta fdistinct"],
["", "U_Toggle_fDiagnostic","Toggle Diagnostic.","", "commuta diagnostica"],
["", "U_Toggle_fTypeColor", "Toggle Type Color.","", "commuta typecolor"],
["", "$Type.U_Conv_Record", "Update data type.", "", "converti"],
["", "U_Toggle_fCaseSens",  "Toggle Case Sensitive.","", "commuta case sensitive"],
["", "$DDJ.U_Get_Info",     "Get Info.","", "informazioni"]
],

"+++ block Standard +++":[
["Planes View.",       "$DDJ.U_Planes", "Planes View", "ols_files/ico/planes.svg", "piani di memoria"], 
["Transpose.",         "$DDJ.U_Transpose", "Transpose", "ols_files/ico/transpose.svg", "trasponi"],
["Tags.",              "$DDJ.U_Tag_SetReset", "Tags", "ols_files/ico/tag.svg", "tag", "opt_auth"],    

["Chain collections.", "U_Concat", "Concatenate", "ols_files/ico/concatenate.svg", "concatena"],
["Flank collections side by side.", "U_AddCol", "AddCol", "ols_files/ico/addcol.svg", "affianca"],
["JsonPath",           "U_JsonPath", "JsonPath", "ols_files/ico/jsonpath.svg", "jsonpath"],
["Draw",               "$DDJ.U_PlotData", "Plot", "ols_files/ico/draw.svg", "grafico"],
["Chart",              "$Chart.U_Chart", "Chart", "ols_files/ico/chart.svg", "diagramma"]
],

"Standard":[
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],

["",                   "Expand", "", "", "+++ block Edit +++"],

["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Standard +++"],
["",                   "Expand", "", "", "+++ block CFG +++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"StdImg":[
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
["",                   "Expand", "", "", "+++ block Edit +++"],
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Standard +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 
["Image width",        "$DDJ.U_Set_iWdt",  "Image Width", "", "Larghezza immagini", "select", ["larghezza", 5, 10, 15, 20, 25, 33, 50, 80, 100, 200, 400]],
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Expand", "", "", "+++ block NL command +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"StdCal":[
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
["",                   "Expand", "", "", "+++ block Edit +++"],
["ToDay.",             "$Calendar.U_ToDay0", "To Day", "ols_files/ico/oggi.svg", "oggi"],
["ToDo",               "$Agenda.U_ToDo", "Impegni di Oggi.","ols_files/ico/todo.svg", "cose da fare"],
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Standard +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"],  
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Expand", "", "", "+++ block NL command +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"Layout": [
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LdSv Layout +++"],   
["Move Up.",           "$DDJ.U_Move_Up", "Move Up",   "ols_files/ico/move_up.svg", "sposta in su"],    
["Move Dn.",           "$DDJ.U_Move_Dn", "Move Down", "ols_files/ico/move_dn.svg", "sposta in giù"],    
                   
["",                   "Expand", "", "", "+++ block Edit +++"],
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Expand", "", "", "+++ block NL command +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp_Layout"]       
],

"Obj": [
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
["Change value.",      "$DDJ.U_EdtVal_DDJ", "Edit Value", "ols_files/ico/edit_value.svg", "modifica il valore", "opt_auth"],
["New Record.",        "$DDJ.U_NewTup_DDJ", "New Record", "ols_files/ico/new_tuple.svg", "nuovo record", "opt_auth"],   
["Planes View.",       "$DDJ.U_Planes", "Planes View", "ols_files/ico/planes.svg", "piani di memoria"], 
["Tags.",              "$DDJ.U_Tag_SetReset", "Tags", "ols_files/ico/tag.svg", "tag", "opt_auth"],      
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Expand", "", "", "+++ block NL command +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"XTG":[
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
 
["Shell",              "$XTG.U_Shell", "shell", "ols_files/ico/shell.svg", "shell"],
["Root",               "$FileMan.U_Root", "root", "ols_files/ico/root.svg", "root"], 
["Back",               "$FileMan.U_Back", "back", "ols_files/ico/back.svg", "back"],
["",                   "Expand", "", "", "+++ block Resources +++"],
["",                   "Expand", "", "", "+++ block PATH-GO +++"],

["Copy File.",         "$XTG.U_Copy_File",  "Copy File",   "ols_files/ico/copy_file.svg",   "copia file", ""],
["Paste File.",        "$XTG.U_Paste_File", "Paste File",  "ols_files/ico/paste_file.svg",  "incolla file", ""],
["New File.",          "$XTG.U_New_File",   "New File",    "ols_files/ico/new_file.svg",    "nuovo file", ""],
["Delete File.",       "$XTG.U_Del_File",   "Delete File", "ols_files/ico/delete_file.svg", "cancella il file", "opt_auth"],

["Change value.",      "$DDJ.U_EdtVal_DDJ", "Edit Value",  "ols_files/ico/edit_value.svg", "modifica il valore", "opt_auth"],
["Edit Record.",       "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "mostra il record", "opt_auth"],
["",                   "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "apri il record", "opt_auth"],
["",                   "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "edit record", "opt_auth"],    
["Tags.",              "$DDJ.U_Tag_SetReset", "Tags", "ols_files/ico/tag.svg", "tag", "opt_auth"], 

["",                   "Expand", "", "", "+++ block Filter +++"],
["Show Dir Images",    "$XTG.U_Show_DirImg", "Show Dir Images", "ols_files/ico/show_dirimg.svg", "mostra immagini directory"],
["Slide",              "$XTG.U_Slide", "Slide", "ols_files/ico/slide.svg", "diapositive"],
["Show Images",        "$XTG.U_Show_Img", "Show Images", "ols_files/ico/thumbnails.svg", "mostra immagini"],
["Number of columns ", "$DDJ.U_Set_iNnCol",  "Number of Image's columns", "", "Numero immagini", "select", ["N. colonne", 1,2,3,4,5,6,8,10, 16, 20, 25, 32]],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 
["Image width",        "$DDJ.U_Set_iWdt",  "Image Width", "", "Larghezza immagini", "select", ["larghezza", 5, 10, 15, 20, 25, 33, 50, 80, 100, 200, 400]],

["Rem Scan",           "$XTG.U_Rem_Scan", "Rem Scan", "ols_files/ico/rem_scan.svg", "rem scan"],
["",                   "Expand", "", "", "+++ block CFG +++"],

["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Expand", "", "", "+++ block NL command +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"Collezioni":[
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
["",                   "Expand", "", "", "+++ block Resources +++"],
["",                   "Expand", "", "", "+++ block Edit +++"],    
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block PATH-SET +++"],  
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Expand", "", "", "+++ block NL command +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"Sinottico":[
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
["",                   "Expand", "", "", "+++ block Resources Sinottico +++"],
["",                   "Expand", "", "", "+++ block Edit +++"],    
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block PATH-SET +++"],  
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Expand", "", "", "+++ block NL command +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"Log":[
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["jLvl",               "$DDJ.U_Set_jLvl_Log", "Level", "", "livello", "select", ["Level", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"Collections":[
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
["",                   "Expand", "", "", "+++ block Edit +++"],
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"],  
["",                   "Expand", "", "", "+++ block Standard +++"],
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"++ Card ++": [
["","$Card.U_First_Cell","", "","prima"],
["","$Card.U_First_Cell","", "","inizio"],
["","$Card.U_First_Cell","", "","principio"],
["","$Card.U_First_Cell","", "","in cima"], 

["","$Card.U_Last_Cell","", "","ultimo"],
["","$Card.U_Last_Cell","", "","fondo"],
["","$Card.U_Last_Cell","", "","fine"],

["","$Card.U_Prev_Cell", "", "", "indietro"],
["","$Card.U_Prev_Cell", "", "", "precedente"],
["","$Card.U_Prev_Cell","", "","su"],
["","$Card.U_Prev_Cell","", "","sali"],
["","$Card.U_Prev_Cell","", "","sopra"], 
        
["","$Card.U_Next_Cell", "", "", "avanti"], 
["","$Card.U_Next_Cell", "", "", "prossima"],
["","$Card.U_Next_Cell","", "","giù"],
["","$Card.U_Next_Cell","", "","scendi"],
["","$Card.U_Next_Cell","", "","sotto"],

["","U_Cancel","", "","chiudi la scheda"],
["","U_Cancel","", "","chiudi il record"],
["","U_Cancel","", "","chiudi"],
["","$Card.U_Confirm","", "","conferma"],
["","$Card.U_Confirm","", "","conferma le modifiche"],

["","$Card.U_Input", "", "", "inserisci"]
],

"Card": [
["First Record",      "$ExeCmd.U_First_Tup1",  "First",     "ols_files/ico/first.svg", "inizio"],
["Previous Record",   "$ExeCmd.U_Prev_Tup",    "Prev",      "ols_files/ico/prev.svg", "precedente"],
["Next Record",       "$ExeCmd.U_Next_Tup",    "Next",      "ols_files/ico/next.svg", "seguente"],
["Last Record",       "$ExeCmd.U_Last_Tup1",   "Last",      "ols_files/ico/last.svg", "fine"],
["New Record",        "$Card.U_New_Tup",       "New",       "ols_files/ico/new_tuple.svg", "crea una nuova scheda", "opt_auth"],
["",                  "$Card.U_New_Tup",       "New",       "ols_files/ico/new_tuple.svg", "crea un nuova record", "opt_auth"],
["Save",              "$Card.U_Save_Tup",      "Save",      "ols_files/ico/save2.svg", "salva", "opt_auth"],
["Reload Record",     "$Card.U_ReLoad_Tup",    "ReLoad",    "ols_files/ico/reload_card.svg", "ricarica la scheda"],
["",                  "$Card.U_ReLoad_Tup",    "ReLoad",    "ols_files/ico/reload_card.svg", "ricarica il record"],
["Copy",              "$Card.U_Copy_Tup",      "Copy",      "ols_files/ico/copy.svg", "copia"],
["Paste",             "$Card.U_Paste_Tup",     "Paste",     "ols_files/ico/paste.svg", "incolla", "opt_auth"],
["Clear",             "$Card.U_Clear_Tup",     "Clear",     "ols_files/ico/clear.svg", "cancella"],

["Filter JS.",         "$DDJ.U_SetFilterJS", "Filter-JS", "ols_files/ico/filter_js.svg", "filtro javascript"],
["Wizard.",            "$DDJ.U_SetFilter2", "Filter Wizard", "ols_files/ico/filter_2.svg", "wizard"],  
["Filter Query by Example.", "$DDJ.U_FilterQBE", "Filtro QbE", "ols_files/ico/filter_qbe.svg", "filtro qbe"],
["Toggle Filter.",     "$DDJ.U_ToggleFilter", "Toggle Filter", "ols_files/ico/toggle_filter.svg", "commuta la selezione"],   
["Invert Filter.",     "$DDJ.U_InvertFilter", "Invert Filter", "ols_files/ico/invert_filter.svg", "inverti la selezione"],    
["Clear selection.",   "$DDJ.U_ClearFilter", "Clear Filter", "ols_files/ico/clear_filter.svg", "annulla la selezione"],

["Read Aloud",       "$Card.U_Read_Tup",      "Read Aloud","ols_files/ico/read.svg", "leggi"],
["Shut Up",          "$Card.U_ShutUp",        "Shut Up",   "ols_files/ico/shutup.svg", "zitta"],
["Toggle info",      "$Card.U_ToggleType",    "Type",      "ols_files/ico/toggle_type.svg", "mostra informazioni"],
["Toggle RO",        "$Card.U_ToggleRO",      "Read Only", "ols_files/ico/toggle_ro.svg", "commuta scrittura"],
["Help",             "$DDJ.U_Help",      "Help",   "ols_files/ico/help.svg", "aiuto"],
["Snap shot.",         "$DDJ.U_Snap", "Snap", "ols_files/ico/snap.svg", "fotografa"], 

["",           "Insert", "", "", "++ Card ++"]
],

"++ InpVal ++": [
["","U_Cancel","", "","chiudi la scheda"],
["","U_Cancel","", "","chiudi il record"],
["","U_Cancel","", "","chiudi"],
["","$Card.U_Confirm","", "","conferma"],
["","$Card.U_Confirm","", "","conferma le modifiche"],

["","$Card.U_Input", "", "", "inserisci"]
],

"InpVal": [
["","$Card.U_Input", "", "", "inserisci"],
["Help file",   "$DDJ.U_Help", "Help",  "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ InpVal ++"]
],

"++ SetReset ++": [

["","U_Cancel","", "","chiudi la scheda"],
["","U_Cancel","", "","annulla"],
["","U_Cancel","", "","chiudi"],
["","$Card.U_Confirm","", "","conferma"],
["","$Card.U_Confirm","", "","conferma le modifiche"], // $DEBUG
["","$Card.U_Confirm","", "","esegui"],

["","$Card.U_Input", "", "", "inserisci"]
],

"SetReset": [
["Toggle RO", "$Card.U_ToggleRO", "Read Only", "ols_files/ico/toggle_ro.svg", "commuta scrittura"],
["Help file", "$DDJ.U_Help", "Help", "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"Tags": [
["Toggle RO", "$Card.U_ToggleRO", "Read Only", "ols_files/ico/toggle_ro.svg", "commuta scrittura"],
["Help file", "$DDJ.U_Help","Help",      "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"Filter_QBE": [
["delete",      "$Card.U_Clear_Tup",  "Clear", "ols_files/ico/clear.svg", "cancella"],
["copy",        "$Card.U_Copy_Tup",   "Copy",  "ols_files/ico/copy.svg", "copia"],
["paste",       "$Card.U_Paste_Tup",  "Paste", "ols_files/ico/paste.svg", "incolla"],
["Help file",   "$DDJ.U_Help", "Help",  "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ Card ++"]
],

"Filter_JS": [
["Help file",   "$DDJ.U_Help", "Help",  "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"Filter_2": [
["Help file",   "$DDJ.U_Help", "Help",  "ols_files/ico/help.svg", "aiuto"]
],

"Filter_Str": [
["Help file",   "$DDJ.U_Help", "Help",  "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"Filter_Sem": [
["Help file",   "$DDJ.U_Help", "Help",  "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"Sort": [
["Help file",   "$DDJ.U_Help", "Help",  "ols_files/ico/help.svg", "aiuto"]
],

"Slide": [
["Previous",           "$DDJ.U_Prev_DDJ", "&lt;-", "ols_files/ico/prev.svg", "precedente"], 
["Next",               "$DDJ.U_Next_DDJ", "-&gt;", "ols_files/ico/next.svg", "seguente"],  
["slide",              "$DDJ.U_Slide", "slide", "ols_files/ico/slide.svg", "slide"]
],

"Stat": [
["Build the frequencies table", "$Stat_DDJ.U_Freq",          "Build the frequencies table",  "ols_files/ico/freq.svg", "costruisci la tabella delle frequenze"],
["Save statistics in Clipboard","$Stat_DDJ.U_Stat_Clipboard","Save statistics in Clipboard", "ols_files/ico/stat.svg", "salva le statistiche nella clipboard"],
["Save histogram in Clipboard", "$Stat_DDJ.U_Hist_Clipboard","Save histogram in Clipboard",  "ols_files/ico/histog.svg", "salva l'istogramma nella clipboard"],
["Help file",                   "$DDJ.U_Help",              "Help", "ols_files/ico/help.svg", "aiuto"]
],

"TabStat": [
["",                   "Expand", "", "", "+++ block PrevNext +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"], 
["Transpose.",         "$DDJ.U_Transpose", "Transpose", "ols_files/ico/transpose.svg", "trasponi"],    
["Change value.",      "$DDJ.U_EdtVal_DDJ", "Edit Value", "ols_files/ico/edit_value.svg", "modifica il valore", "opt_auth"],
["Edit Record.",       "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "mostra il record", "opt_auth"],
["",                   "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "apri il record", "opt_auth"],
["",                   "$DDJ.U_EdtTup_DDJ", "Edit Record", "ols_files/ico/edit_tuple.svg", "edit record", "opt_auth"],
["",                   "Expand", "", "", "+++ block Filter +++"],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block Test +++"], 
["Set Min Max.",       "$DDJ.U_Set_MinMax", "Set Min Max", "ols_files/ico/setminmax.svg", "imposta"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"InpData": [
["Snap shot.",         "$DDJ.U_Snap", "Snap", "ols_files/ico/snap.svg", "fotografa"],
["Help file","$DDJ.U_Help","Help", "ols_files/ico/help.svg", "aiuto"]
],

"OutData": [
["Snap shot.",         "$DDJ.U_Snap", "Snap", "ols_files/ico/snap.svg", "fotografa"],
["Help file","$DDJ.U_Help","Help", "ols_files/ico/help.svg", "aiuto"]
],

"Plot": [
["Help file","$DDJ.U_Help","Help", "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"Chart": [
["Select",   "$Chart.U_SelCol", "Select", "ols_files/ico/select.svg", "seleziona"], 
["Reset",    "$Chart.U_Reset", "Reset", "ols_files/ico/reset.svg", "reset"], 
["Help file","$DDJ.U_Help","Help", "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"Concat": [
["Help file","$DDJ.U_Help","Help", "ols_files/ico/help.svg", "aiuto", "opt_auth"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"AddCol": [
["Help file","$DDJ.U_Help","Help", "ols_files/ico/help.svg", "aiuto", "opt_auth"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"DDJ_Cfg": [
["Reset",    "$VConfig.U_Reset", "Reset", "ols_files/ico/reset.svg", "reset"],
["Help file","$DDJ.U_Help", "Help", "ols_files/ico/help.svg", "aiuto"]
],

"JsonPath": [
["Help","$DDJ.U_Help","Help file", "ols_files/ico/help.svg", "aiuto"]
],

"Calendar": [
["Giorno",   "$Calendar.U_UpdDay",   "Giorno",    "", "giorno", "select", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21,22,23,24,25,26,27,28,29,30,31]],
["Mese",     "$Calendar.U_UpdMonth", "Mese",      "", "mese",   "select", ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]],
["Anno",     "$Calendar.U_UpdYear",  "Anno",      "", "anno",   "select", [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]],
["Previous Month.","$Calendar.U_PrevMonth", "Previous Month", "ols_files/ico/indietro_mese.svg", "indietro mese"],
["Next Month.",    "$Calendar.U_NextMonth", "Next Month",     "ols_files/ico/avanti_mese.svg",   "avanti mese"],
["Previous Year.", "$Calendar.U_PrevYear",  "Previous Year",  "ols_files/ico/indietro_anno.svg", "indietro anno"],
["Next Year.",     "$Calendar.U_NextYear",  "Next Year",      "ols_files/ico/avanti_anno.svg",   "avanti anno"],
["ToDay.",         "$Calendar.U_ToDay",     "To Day",         "ols_files/ico/oggi.svg",          "oggi"],

["Campo1",             "$Calendar.U_Field1",   "Campo1",    "", "campo 1", "select", ["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
["Campo2",             "$Calendar.U_Field2",   "Campo2",    "", "campo 2", "select", ["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
["Configure.",         "$DDJ.U_Config", "Config", "ols_files/ico/config.svg", "configura"],
["Help.",              "$DDJ.U_Help", "Help", "ols_files/ico/help.svg", "aiuto"], 
["About.",             "$DDJ.U_About", "About", "ols_files/ico/about.svg", "informazioni"]
],

"++ block Chiudi ++": [
["","U_Cancel","", "","chiudi la scheda"],
["","U_Cancel","", "","chiudi il record"],
["","U_Cancel","", "","chiudi"]
],

"About": [
["", "Insert", "", "", "++ block Chiudi ++"]
],

"Error": [
["", "Insert", "", "", "++ block Chiudi ++"]
],

"Warning": [
["", "Insert", "", "", "++ block Chiudi ++"]
],

"Remarks":[
["",                   "Expand", "", "", "+++ block PrevNext +++"], 
["",                   "Expand", "", "", "+++ block PlaceHolder +++"],
["",                   "Expand", "", "", "+++ block LoadSave +++"],
["",                   "Expand", "", "", "+++ block Development +++"],
["Get Remarks",        "$Remarks.U_GetTup", "Get remarks", "ols_files/ico/show.svg", "vai a nota"],
["Show Images",        "$Remarks.U_Show_Img", "Show Images", "ols_files/ico/thumbnails.svg", "mostra immagini"],
["",                   "Expand", "", "", "+++ block Edit +++"],
["",                   "Expand", "", "", "+++ block Filter +++"],
["SemTree",            "$SemTree.U_SemTree3", "SemTree", "ols_files/ico/semtree.svg", "FiltSemTree 3", ""],
["",                   "Expand", "", "", "+++ block Layout +++"], 
["",                   "Expand", "", "", "+++ block Tools +++"], 

["Planes View.",       "$DDJ.U_Planes", "Planes View", "ols_files/ico/planes.svg", "piani di memoria"], 
["Tags.",              "$DDJ.U_Tag_SetReset", "Tags", "ols_files/ico/tag.svg", "tag", "opt_auth"],    

["Chain collections.", "U_Concat", "Concatenate", "ols_files/ico/concatenate.svg", "concatena"],
["Flank collections side by side.", "U_AddCol", "AddCol", "ols_files/ico/addcol.svg", "affianca"],
["JsonPath",           "U_JsonPath", "JsonPath", "ols_files/ico/jsonpath.svg", "jsonpath"],
["Draw",               "$DDJ.U_PlotData", "Plot", "ols_files/ico/draw.svg", "grafico"],
["Chart",              "$Chart.U_Chart", "Chart", "ols_files/ico/chart.svg", "diagramma"],
["iStep",              "$DDJ.U_Set_iStep", "Sample Step", "", "Passo di campionamento", "select", ["Passo", 1, 2, 3, 4, 5, 8, 10, 16, 20, 32, 50, 64, 100]],

["Sort.",              "$DDJ.U_SetSort", "Sort Wizard", "ols_files/ico/sort.svg", "ordina"],
["",                   "Expand", "", "", "+++ block CFG +++"],
["",                   "Expand", "", "", "+++ block PATH-SET +++"],   
["",                   "Expand", "", "", "+++ block Test +++"],
["",                   "Insert", "", "", "++ block NLP ++"],  
["",                   "Insert", "", "", "PopUp"]       
],

"Rem_Pnl": [
["Help",             "$DDJ.U_Help",      "Help",   "ols_files/ico/help.svg", "aiuto"]
],

"NLP_Pnl": [
["Help",             "$DDJ.U_Help",      "Help",   "ols_files/ico/help.svg", "aiuto"]
],

"GoTo_Pnl": [
["Help",             "$DDJ.U_Help",      "Help",   "ols_files/ico/help.svg", "aiuto"]
],

"Planes_Pnl": [
["Help",             "$DDJ.U_Help",      "Help",   "ols_files/ico/help.svg", "aiuto"]
],

"URL_Pnl": [
["Help",             "$DDJ.U_Help",      "Help",   "ols_files/ico/help.svg", "aiuto"]
],

"CfgUV_Pnl": [
["Help",             "$DDJ.U_Help",      "Help",   "ols_files/ico/help.svg", "aiuto"]
],

"Config_Pnl": [
["Help",             "$DDJ.U_Help",      "Help",   "ols_files/ico/help.svg", "aiuto"]
],

"Filter_JS_Pnl": [
["Help file",   "$DDJ.U_Help", "Help",  "ols_files/ico/help.svg", "aiuto"],
["",                   "Insert", "", "", "++ SetReset ++"]
],

"none": [
]

}; /* G_asaMnEntry */

