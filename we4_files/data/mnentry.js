/* Menu commands */
var G_asaMnEntry = 
{

"Sources": [
["Graphics",      "U_Wysiwyg",    "HTML Text",   "we4_files/ico/wysiwyg.svg",   "grafica"],
["Ext",           'U_SetExt',     "App",         "", "applicazione", "select",  ["txt", "html", "c", "h", "js"]],  
["New File.",     "U_New_File",   "New File",    "we4_files/ico/new_file.svg",  "nuovo file", ""],
["Lorem Ipsum",   "U_Lorem",      "Lorem Ipsum", "we4_files/ico/lorem.svg",     "lorem", ""],

["File Name",     'U_Ld_File',    "File Name",    "", "szFlNm", "input", ["file"]],
["Load File",     'U_Ld_File',    "Load File",   "we4_files/ico/load_file.svg", "carica il file"],
["Reload File.",  "U_Reload",     "Reload File", "we4_files/ico/reload.svg",    "ricarica"],
["Save",          "U_Sv_Back",    "Save",        "we4_files/ico/save3.svg",     "salva", "opt_auth"],
["Save File",     'U_Sv_File',    "Save File",   "we4_files/ico/save_as.svg",   "salva il file"],
 
["Spell Check","U_SpellCheck", "spell check", "we4_files/ico/spell.svg",  "controllo lessicale"],

["Test-1",        "U_Test1", "test-1", "we4_files/ico/test-1.svg", "test-1"],

["Help",     'U_Help',     "Help",     "we4_files/ico/help.svg",      "aiuto"],
["Configure","U_Config",   "Config",   "we4_files/ico/config.svg",    "configura"],
["About",    'U_About',    "About",    "we4_files/ico/about.svg",     "about"],
["License",  'U_License',  "Licenza",  "we4_files/ico/licence.svg",   "licenza"]
],

"Wysiwyg": [
["Sources",       "U_Sources",    "Text sources","we4_files/ico/sources.svg",   "testo"],
["Ext",           'U_SetExt',     "App",         "", "applicazione", "select",  ["txt", "html", "c", "h", "js"]],  
["New File.",     "U_New_File",   "New File",    "we4_files/ico/new_file.svg",  "nuovo file", ""],
["Lorem Ipsum",   "U_Lorem",      "Lorem Ipsum", "we4_files/ico/lorem.svg",     "lorem", ""],

["File Name",     'U_Ld_File',    "File Name",    "", "szFlNm", "input", ["file"]],
["Load File",     'U_Ld_File',    "Load File",   "we4_files/ico/load_file.svg", "carica il file"],
["Reload File.",  "U_Reload",     "Reload File", "we4_files/ico/reload.svg",    "ricarica"],
["Save",          "U_Sv_Back",    "Save",        "we4_files/ico/save3.svg",     "salva", "opt_auth"],
["Save File",     'U_Sv_File',    "Save File",   "we4_files/ico/save_as.svg",   "salva il file"],

["bold",       "U_Bold",       "bold",     "we4_files/ico/bold.gif",      "grassetto"],
["italics",    "U_Italic",     "italics",  "we4_files/ico/italics.gif",   "corsivo"], 
["underline",  "U_Underline",  "underline","we4_files/ico/underline.gif", "sottolineato"],
["strike",     "U_Strike",     "strike",   "we4_files/ico/strike.gif",    "sbarrato"], 
["superscript","U_SuperScript","superscript","we4_files/ico/sup.gif",     "apici"], 
["subscript",  "U_SubScript",  "subscript","we4_files/ico/sub.gif",       "pedici"],

["Tag",        'U_SetTag',     "Tag",      "", "pippo", "select",  [
"-- Tag --", "a", "abbr", "acronym", "address", "applet", "article", "aside", "audio", "b", "big", "blockquote", "canvas", "caption", "center", "cite", "code", "del", "details", "dfn", "div", "em", "embed", 
"fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "i", "iframe", "img", "ins", "kbd", "label", "legend", "mark", "menu", "nav", 
"object", "ol", "output", "p", "pre", "q", "ruby", "s", "samp", "section", "small", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "tfoot", "thead", "time", "tt", "u", "ul", "var", "video"
]],
 
["left",       "U_Left",       "left",     "we4_files/ico/left.gif",      "sinistra"], 
["center",     "U_Center",     "center",   "we4_files/ico/center.gif",    "centrato"], 
["right",      "U_Right",      "right",    "we4_files/ico/right.gif",     "destra"], 
["justify",    "U_Justify",    "justify",  "we4_files/ico/justify.gif",   "giustificato"], 
["indent",     "U_Indent",     "indent",   "we4_files/ico/indent.gif",    "indenta"], 
["outdent",    "U_Outdent",    "outdent",  "we4_files/ico/outdent.gif",   "indietro"], 
["ol",         "U_Ordered",    "ol",       "we4_files/ico/ol.gif",        "ol"],  
["ul",         "U_Unordered",  "ul",       "we4_files/ico/ul.gif",        "ul"],  
["Spell Check","U_SpellCheck", "spell check", "we4_files/ico/spell.svg",  "controllo lessicale"],


["Font",       'U_Font',     "Font",         "", "font", "select",  ["-- Font --", "Arial", "Verdana", "Times", "Courier", "Digital-7 Mono"]],
["Template",   'U_Template', "Template",     "", "template", "select", ["-- Template --", "div", "button", "input", "table"]],
 
["remove format",  "U_RemFormat", "remove format",  "we4_files/ico/rformat.gif",   "cancella formattazione"],  
["ld_image",   "U_Ld_Image",      "ld_image",       "we4_files/ico/Ld_Image.gif",  "immagine"],    
["Insert EOL", "U_Insert_EOL",    "Insert EOL",     "we4_files/ico/eol.svg",  "Insert EOL"],

["Link Name",   'U_Null', "Link Name",     "", "Link_Name", "input", ["text"]],  
["link",       "U_CreateLink",    "link",           "we4_files/ico/link.gif",      "collega"], 
["unlink",     "U_Prev_DDJ",      "unlink",         "we4_files/ico/unlink.gif",    "scollega"], 

["JSON Conversion",     "U_JSON_Mp_Text", "JSON Conversion", "we4_files/ico/json.svg", "conversione in JSON"],
["Test-1",     "U_Test1", "test-1", "we4_files/ico/test-1.svg", "test-1"],
 
["Help",     'U_Help',     "Help",     "we4_files/ico/help.svg",      "aiuto"],
["Configure","U_Config",   "Config",   "we4_files/ico/config.svg",    "configura"],
["About",    'U_About',    "About",    "we4_files/ico/about.svg",     "about"],
["License",  'U_License',  "Licenza",  "we4_files/ico/licence.svg",   "licenza"]
],

"Cfg": [
["Reset",    "$VConfig.U_Reset", "Reset", "we4_files/ico/reset.svg", "reset"],
["Help file","U_Help", "Help", "we4_files/ico/help.svg", "aiuto"]
],

"none": [
]

}; /* G_asaMnEntry */

