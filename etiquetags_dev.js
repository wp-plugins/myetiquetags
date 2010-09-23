// etiquetags v.2.0 alpha 1
// Copyright (c) 2006-2010 Marta Garabatos
// http://www.etiquetags.org 
//
// Copyright (c) 2006 Ricardo lago
// http://www.kruzul.org 
//
// Licensed under the LGPL license
// http://www.gnu.org/copyleft/lesser.html
//
// Based on JS QuickTags version 1.2//
// Copyright (c) 2002-2005 Alex King
// http://www.alexking.org/
//
// Licensed under the LGPL license
// http://www.gnu.org/copyleft/lesser.html
//
// **********************************************************************
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
// **********************************************************************
//
//
// The variable 'edCanvas' must be defined as the <textarea> element you want 
// to be editing in. See the accompanying 'demo.html' page for an example.
//*************
//Etiquetags 1.1
//*************
// Corregido un bug por el que que no se podían insertar imágenes en IExplorer y Opera
// Fixed the bug: "We cannot insert images in IExplorer and Opera" 
//*************
//Etiquetags 1.2
//*************
// Nuevos botones para la inserción de objetos multimedia
// New buttons for multimedia objects insertion
//*************
//Etiquetags 2.0
//*************
// Nueva apariencia (usando JQuery), nuevos botones, nuevas funciones: links, tablas, citas, css ...
// New look (with JQuery effects), new buttons, new funcions: links, tables, blockquotes, css ...
//******************************************************//
//********************** OPTIONS **********************//
//*****************************************************//

var baseurl = et_baseurl; //Your blog URL
var IconDir = et_IconDir; //Icons Directory. 
var objectdir = '/objects/';
var videowidth = '320';
var videoheight = '240';
var imgDir = '/img/';
var etLang = 'en';
var etDeltext = ''; //The default text of the title in <del> tag
var etInstext = '';  //The default text of the title in <ins> tag

//******************GLOBALS*******************//
var etForm; //line 1476 
var etCanvasQuote; //the canvas quotes
var etbut; 
//tables rows and columns 
var etFilTable;
var etColTable;
var etFilInput;
var etAdmode = false; //advanced tables: 1 true
var etSel;
//************** CLASSES(CSS) ********//
//******Create your own frequent classes**********//

var etFreqClasses = new Array();

function etFreqClass(name, title) {

		this.name = name;  //class name
		this.title = title; //class title
}

etFreqClasses.push(
	new etFreqClass(
		'left'
		,'float:left'
	)
);

etFreqClasses.push(
	new etFreqClass(
		'right'
		,'float:right'
	)
);

etFreqClasses.push(
	new etFreqClass(
		'clase03'
		,'the third class'
	)
);

// *************** END OPTIONS *************//
// ************DON'T EDIT BELOW HERE, IF YOU'RE NOT SURE WHAT YOU'RE DOING**********//

//****************************************************//
//***************** BUTTONS **************************//
//****************************************************// 

// ***** CREATING BUTTONS *****//

var etButtons = new Array();

var etOpenTags = new Array();

function etButton(id, display, ico, tagStart, tagEnd, access, onClick, title, open) {
	this.id = id;			// used to name the toolbar button
	this.display = display;		// label on button
	this.ico = ico;			// button icon source
	this.tagStart = tagStart; 	// open tag
	this.tagEnd = tagEnd;		// close tag
	this.access = access;		// accesskey
	this.onClick = onClick; 	//onclick button
	this.title = title;		// button title 
	this.open = open;		// set to -1 if tag does not need to be closed
}

function zeroise(number, threshold) {
	// FIXME: or we could use an implementation of printf in js here
	var str = number.toString();
	if (number < 0) { str = str.substr(1, str.length) }
	while (str.length < threshold) { str = "0" + str }
	if (number < 0) { str = '-' + str }
	return str;
}

// *This is a copy from the Wordpress original quicktags file 

var now = new Date();
var datetime = now.getUTCFullYear() + '-' + 
zeroise(now.getUTCMonth() + 1, 2) + '-' +
zeroise(now.getUTCDate(), 2) + ' T' + 
zeroise(now.getUTCHours(), 2) + ':' + 
zeroise(now.getUTCMinutes(), 2) + ':' + 
zeroise(now.getUTCSeconds() ,2) +
'+00:00';

// *Added. Show date in Spanish format.
var spdate = zeroise(now.getUTCDate(), 2)+ '-' + 
zeroise(now.getUTCMonth() + 1, 2) + '-' +
now.getUTCFullYear();


//* Buttons will appear in the bar at the same order as here.
//* If you delete or comment a button, it will disappear of the bar


//*************** DON'T MOVE THESE *******************//

etButtons.push(
	new etButton(
		'et_h1'
		,'h1'
		,IconDir + 'h1.png' 
		,'<h1>'
		,'</h1>\n\n'
		,'1'
		,'etHideHeadings(); etInsertTag'
		,'heading h1: <h1>'
	)
);

etButtons.push(
	new etButton(
		'et_h2'
		,'h2'
		,IconDir + 'h2.png' 
		,'<h2>'
		,'</h2>\n\n'
		,'2'
		,'etHideHeadings(); etInsertTag'
		,'heading h2: <h2>'
	)
);

etButtons.push(
	new etButton(
		'et_h3'
		,'h3'
		,IconDir + 'h3.png' 
		,'<h3>'
		,'</h3>\n\n'
		,'3'
		,'etHideHeadings(); etInsertTag'
		,'heading h3: <h3>'
	)
);

etButtons.push(
	new etButton(
		'et_h4'
		,'h4'
		,IconDir + 'h4.png' 
		,'<h4>'
		,'</h4>\n'
		,'4'
		,'etHideHeadings(); etInsertTag'
		,'heading h4: <h4>'
	)
);

etButtons.push(
	new etButton(
		'et_h5'
		,'h5'
		,IconDir + 'h5.png' 
		,'<h5>'
		,'</h5>\n'
		,'5'
		,'etHideHeadings(); etInsertTag'
		,'heading h5 <h5>'
	)
);

etButtons.push(
	new etButton(
		'et_h6'
		,'h6'
		,IconDir + 'h6.png' 
		,'<h6>'
		,'</h6>\n'
		,'6'
		,'etHideHeadings(); etInsertTag'
		,'heading h6: <h6>'
	)
);

etButtons.push(
	new etButton(
		'et_qp'
		,'p'
		,IconDir + 'parrafo.png' 
		,'<p>'
		,'</p>\n'
		,'p'
		,'etInsertTag'
		,'paragraph: <p>'
	)
);

etButtons.push(
	new etButton(
		'et_qstrong'
		,'str'
		,IconDir + 'enfasis_mucho.png' 
		,'<strong>'
		,'</strong>'
		,'b'
		,'etInsertTag' 
		,'stronger emphasis: <strong>'
	)
);

etButtons.push(
	new etButton(
		'et_qem'
		,'em'
		,IconDir + 'enfasis.png' 
		,'<em>'
		,'</em>'
		,'i'
		,'etInsertTag'
		,'emphasis: <em>'
	)
);

//********* YOU CAN MOVE BUTTONS FROM HERE *********//

etButtons.push(
	new etButton(
		'et_p'
		,'p'
		,IconDir + 'parrafo.png' 
		,'\n<p>'
		,'</p>\n'
		,'p'
		,'etInsertTag'
		,'paragraph: <p>'
	)
);


etButtons.push(
	new etButton(
		'et_strong'
		,'str'
		,IconDir + 'enfasis_mucho.png' 
		,'<strong>'
		,'</strong>'
		,'b'
		,'etInsertTag' 
		,'stronger emphasis: <strong>'
	)
);

etButtons.push(
	new etButton(
		'et_em'
		,'em'
		,IconDir + 'enfasis.png' 
		,'<em>'
		,'</em>'
		,'i'
		,'etInsertTag'
		,'emphasis: <em>'
	)
);

etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_link'
		,'link'
		,IconDir + 'enlace.png'
		,''
		,'</a>'
		,'a'
		,'etShowWindow(\'et_win_link\')'
		,'link: <a>'
	)
); 

etButtons.push(
	new etButton(
		'et_fast_link'
		,'fast-link'
		,IconDir + 'enlace_rap.png' 
		,''
		,'</a>'
		,'e'
		,'etInsertFastLink'
		,'fast link: <a>'
	)
); 

etButtons.push(
	new etButton(
		'et_img'
		,'img'
		,IconDir + 'imagen.png'
		,''
		,''
		,'m'
		,'etShowWindow(\'et_win_img\')'
		,'image: <img />'
		,-1
	)
); 

etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_ul'
		,'ul'
		,IconDir + 'lista_no_numerada.png' 
		,'<ul>'
		,'</ul>\n'
		,'u'
		,'etSplitText'
		,'unordered list: <ul>'
	)
);

etButtons.push(
	new etButton(
		'et_ol'
		,'ol'
		,IconDir + 'lista_numerada.png' 
		,'<ol>'
		,'</ol>\n'
		,'o'
		,'etSplitText'
		,'ordered list: <ol>'
	)
);

etButtons.push(
	new etButton(
		'et_li'
		,'li'
		,IconDir + 'lista_item.png' 
		,'\t<li>'
		,'</li>\n'
		,'l'
		,'etInsertTag'
		,'list item: <li>'
	)
);

etButtons.push(
	new etButton(
		'et_sep'
		,''
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_pastequote'
		,'pasteb-quote'
		,IconDir + 'pegar_cita_parrafo.png' 
		,'<blockquote>'
		,'</blockquote>'
		,'k'
		,'etShowWindow(\'et_win_quote\')'
		,'copy long quotation: <blockquote>'
	)
); 

etButtons.push(
	new etButton(
		'et_block'
		,'b-quote'
		,IconDir + 'cita_parrafo.png' 
		,'<blockquote ' + 'xml:lang="' + etLang + '">'
		,'</blockquote>'
		,'k'
		,'etInsertTag'
		,'long quotation: <blockquote>'
	)
); 

etButtons.push(
	new etButton(
		'et_q'
		,'q'
		,IconDir + 'cita_linea.png' 
		,'<q ' + 'xml:lang="' + etLang + '">'
		,'</q>'
		,'q'
		,'etInsertTag'
		,'quotation: <q>'	
	)
); 

etButtons.push(
	new etButton(
		'et_cite'
		,'cite'
		,IconDir + 'cita_autor.png' 
		,'<cite>'
		,'</cite>'
		,'t'
		,'etInsertTag'
		,'citation: <cite>'
	)
); 


etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);
etButtons.push(
	new etButton(
		'et_abbr'
		,'abbr'
		,IconDir + 'abreviatura.png' 
		,'<abbr title=" ">'
		,'</abbr>'
		,''
		,'etInsertTag'
		,'abreviation: <abbr>'
	)
); 

etButtons.push(
	new etButton(
		'et_table'
		,'table'
		,IconDir + 'tabla.png' 
		,'<table>\n<tbody>'
		,'</tbody>\n</table>\n'
		,''
		,'etShowWindow(\'et_win_table\')'
		,'table: <table>'
	)
);

etButtons.push(
	new etButton(
		'et_tr'
		,'tr'
		,IconDir + 'fila.png' 
		,'\t<tr>\n'
		,'\n\t</tr>\n'
		,''
		,'etInsertTag'
		,'table row: <tr>'
	)
);

etButtons.push(
	new etButton(
		'et_td'
		,'td'
		,IconDir + 'celda.png' 
		,'\t\t<td>'
		,'</td>\n'
		,''
		,'etInsertTag'
		,'table cell: <td>'
	)
);

etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_css'
		,'css'
		,IconDir + 'css.png' 
		,''
		,''
		,''
		,'etShowWindow(\'et_win_css\')'
		,'div-span'
	)
);

etButtons.push(
	new etButton(
		'et_lang'
		,'lang'
		,IconDir + 'lang.png'
		,'xml:lang="' + etLang +'"'
		,''
		,'l'
		,'etInsertTag'
		,'xml:lang'
		,-1
	)
);

etButtons.push(
	new etButton(
		'et_title'
		,'title'
		,IconDir + 'title.png'
		,'title=" "'
		,''
		,'l'
		,'etInsertTag'
		,'title'
		,-1
	)
);

etButtons.push(
	new etButton(
		'et_comment'
		,'coment'
		,IconDir + 'comment.png'
		,'<!-- '
		,'  -->'
		,''
		,'etInsertTag'
		,'HTML comment'
		,-1
	)
);




etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_close'
		,'close tags'
		,IconDir + 'cerrar_todas.png' 
		,''
		,''
		,'f'
		,'etCloseAllTags()'
		,'close all tags'
	)
);

etButtons.push(
	new etButton(
		'et_prev'
		,'preview'
		,IconDir + 'vista_previa.png' 
		,''
		,''
		,'f'
		,'etPrev'
		,'preview'
	)
);

etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);


var extendedStart = etButtons.length;

// Extra buttons

etButtons.push(
	new etButton(
		'et_pre'
		,'pre'
		,IconDir + 'preformateado.png' 
		,'<pre>'
		,'</pre>'
		,''
		,'etInsertTag'
		,'preformatted text: <pre>'
	)
);


etButtons.push(
	new etButton(
		'et_code'
		,'code'
		,IconDir + 'codigo.png' 
		,'<code>'
		,'</code>'
		,'c'
		,'etInsertTag'
		,'code: <code>'
	)
);



etButtons.push(
	new etButton(
		'et_samp'
		,'pre'
		,IconDir + 'muestra.png' 
		,'<samp>'
		,'</samp>'
		,''
		,'etInsertTag'
		,'sample output from programs: <samp>'
	)
);

etButtons.push(
	new etButton(
		'et_kbd'
		,'kbd'
		,IconDir + 'entrada_teclado.png' 
		,'<kbd>'
		,'</kbd>'
		,''
		,'etInsertTag'
		,'text to be entered by the user: <kbd>'
	)
);

etButtons.push(
	new etButton(
		'et_var'
		,'var'
		,IconDir + 'variable.png' 
		,'<var>'
		,'</var>'
		,''
		,'etInsertTag'
		,'a variable or program argument: <var>'
	)
);
etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_object'
		,'object'
		,IconDir + 'object.png' 
		,'<object>'
		,'\n</object>\n'
		,''
		,'etShowWindow(\'et_win_object\')'
		,'object <object>'
	)
);

etButtons.push(
	new etButton(
		'et_param'
		,'param'
		,IconDir + 'param.png' 
		,'<param>'
		,'</param>'
		,''
		, 'etInsertParam'
		,'object param <param>'
	)
);

etButtons.push(
		new etButton(
		'et_youtube'
		,'youtube'
		,IconDir + 'youtube.png' 
		,''
		,''
		,''
		, 'etInsertYouTube'
		,'insert a video from Youtube'
	)
);

etButtons.push(
	new etButton(
		'et_google'
		,'google'
		,IconDir + 'google.png' 
		,''
		,''
		,''
		, 'etInsertGoogle'
		,'insert a video from Google Video'
	)
);

etButtons.push(
	new etButton(
		'et_goear'
		,'goear'
		,IconDir + 'goear.png' 
		,''
		,''
		,''
		, 'etInsertGoEar'
		,'insert a song from GoEar'
	)
);

etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_del'
		,'del'
		,IconDir + 'borrar.png' 
		,'<del datetime="' + datetime + '" title="' + etDeltext + '">'  
		,'</del>'
		,'d'
		,'etInsertTag'
		,'delete text: <del>'
	)
); // *Modified. Show date in Spanish format.

etButtons.push( 
	new etButton(
		'et_ins'
		,'ins'
		,IconDir + 'insertar_texto.png' 
		,'<ins datetime="' + datetime + '" title="' + etInstext + '">' 
		,'</ins>'
		,'s'
		,'etInsertTag'
		,'insert text: <ins>'
	)
); // *Modified. Show date in Spanish format.


etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_dl'
		,'dl'
		,IconDir + 'lista_definicion.png' 
		,'<dl>\n'
		,'</dl>\n\n'
		,''
		,'etInsertTag'
		,'definition list: <dl>'
	)
);

etButtons.push(
	new etButton(
		'et_dt'
		,'dt'
		,IconDir + 'definicion_termino.png' 
		,'\t<dt>'
		,'</dt>\n'
		,''
		,'etInsertTag'
		,'definition term: <dt>'
	)
);

etButtons.push(
	new etButton(
		'et_dd'
		,'dd'
		,IconDir + 'definicion_texto.png' 
		,'\t<dd>'
		,'</dd>\n'
		,''
		,'etInsertTag'
		,'definition description: <dd>'
	)
);

etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);


etButtons.push(
	new etButton(
		'et_sub'
		,'sub'
		,IconDir + 'subindice.png' 
		,'<sub>'
		,'</sub>'
		,''
		,'etInsertTag'
		,'subscript text: <sub>'
	)
);

etButtons.push(
	new etButton(
		'et_sup'
		,'sup'
		,IconDir + 'superindice.png' 
		,'<sup>'
		,'</sup>'
		,''
		,'etInsertTag'
		,'superscript text: <sup>'
	)
);

etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);


etButtons.push(
	new etButton(
		'et_footnote'
		,'footnote'
		,IconDir + 'nota_pie.png' 
		,''
		,''
		,'f'
		,'etInsertFootnote'
		,'footnote'
	)
);


etButtons.push(
	new etButton(
		'et_addr'
		,'address'
		,IconDir + 'direccion.png' 
		,'<address>'
		,'</address>'
		,''
		,'etInsertTag'
		,'address: <address>'
	)
);

etButtons.push(
	new etButton(
		'et_br'
		,'br'
		,IconDir + 'salto_linea.png' 
		,'<br />'
		,''
		,''
		,'etInsertTag'
		,'line break: <br />'
		,-1
	)
);

etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);


etButtons.push(
   new etButton(
       'et_spellac'
       ,'acronym'
       ,IconDir + 'acro_finder.png'
       ,''
       ,''
       ,''
       ,'etSpellac'
       ,'find acronym'
   )
); 


etButtons.push(
	new etButton(
		'et_spell'
		,'spell'
		,IconDir + 'dicc_rae.png' 
		,''
		,''
		,''
		,'etSpell'
		,'The Free Dictionary'
	)
);

etButtons.push(
	new etButton(
		'et_nobr'
		,'nobr'
		,IconDir + 'no_saltos.png' 
		,'<nobr>'
		,'</nobr>'
		,''
		,'etInsertTag'
		,'without line breaks: <nobr>'
	)
);



etButtons.push(
	new etButton(
		'et_sep'
		,'sep'
		,IconDir + 'separador.png' 
		,''
		,''
		,''
		,''	
		,'divider'
	)
);

etButtons.push(
	new etButton(
		'et_more'
		,'more'
		,IconDir + 'mas.png' 
		,'<!--more-->'
		,''
		,'t'
		,'etInsertTag'
		,'more (continue reading): <!--more--> '
		,-1
	)
);

etButtons.push(
	new etButton(
		'et_next'
		,'page'
		,IconDir + 'pagina.png'
		,'<!--nextpage-->'
		,''
		,'p'
		,'etInsertTag'
		,'next page: <!--nextpage-->'
		,-1
	)
);




//*************************** END BUTTONS *****************//

//**** THE STYLES *****//


function etInsertStyles(){
var etstyles = "\n#et_editor {\
   width: 100%;\
   float: left;\
   margin-left: 20px;\
}\
\n #et_toolbar {\
   margin: 0px;\
   background-color:  #EFF5FB;\
   width: 100%;\
}\
\n#et_editor select {\
   background: #fcfdff;\
   color:#ff9933;\
  	margin: 5px 10px 4px 10px;\
}\
\n.et_button {\
   width: 25px;\
   height: 25px;\
   border: 1px solid #c9dbf4;\
   margin: 1px;\
   padding: 1px;\
   background: transparent;\
}\
\n.et_button_over {\
   background-color: #fff269;\
   width: 25px;\
   height: 25px;\
   border: 1px solid #999999;\
   margin: 1px;\
   padding: 1px;\
}\
\n.et_sep_botton {\
   width: 2px;\
   margin: 0;\
}\
\n.et_button_plegar {\
   width: 22px;\
   border: 1px solid #c9dbf4;\
   margin: 1px;\
   padding: 1px;\
   background: transparent;\
}\
\n#et_headings_list, #et_headings_list ul{\
     margin:0;\
     padding:0;\
     list-style-type:none;\
     list-style-position:outside;\
     position:relative;\
     line-height:1.2em;\
     background-color: #EFF5FB;\
     z-index:15;\
}\
\n#et_headings_list button{\
    display:block;\
    padding:0px;\
    border: 1px solid #c9dbf4;\
    color:#fff;\
    text-decoration:none;\
    background: transparent;\
}\
\n#et_headings_list button:hover{\
   background-color: #fffe81;\
   border: 1px solid #999999;\
}\
\n#et_headings_list li{\
    float:left;\
    position:relative;\
}\
\n#et_headings_list ul {\
    position:absolute;\
    width:27px;\
    top:25px;\
    left:0;\
    display:none;\
}\
\n#et_headings_list li ul button{\
   width:25px;\
   float:left;\
}\
\n#et_headings_list li:hover ul{\
    display:block;\
}\
\n#et_backgroundTransparent{\
	display:none;\
	background:transparent;\
	position:fixed;\
	 /*_position:absolute;*/\
	 height:100%;\
	 width:100%;\
	 top:0;\
	 left:0;\
	z-index:10;\
}\
\n#et_backgroundPopup{\
	display:none;\
	position:fixed;\
	 /*_position:absolute;*/\
	 height:100%;\
	 width:100%;\
	 top:0;\
	 left:0;\
	 background:#000000;\
	 border:1px solid #cecece;\
	 z-index:10;\
}\
\n#et_win_img, #et_win_link, #et_win_quote, #et_win_table, #et_win_adtable, #et_win_css, #et_win_object {\
	display:none;\
	font-size:12px;\
	position: fixed;\
	left:350px;\
	top: 0px;\
	width:500px;\
	background-color: #EFF5FB;\
	border-right: 4px solid;\
	border-bottom: 4px solid;\
	border-left: 1px solid;\
	border-top: 1px solid;\
	border-color: #000;\
	margin-top:35px;\
	padding:5px;\
	z-index:50;\
}\
\n#et_win_adtable{\
	left:50px;\
	top: 0px;\
	width:1000px;\
}\
\n#et_win_quote{\
	top:100px;\
}\
\n#et_tab_nav {\
        width:450px;\
        margin: 0;\
        padding:0;\
	line-height: 1.5em;\
	font-size:12px;\
}\
\n#et_tab_nav li{\
       float:left;\
       list-style:none;\
       margin: 0;\
       padding:0 0 0 10px;\
}\
\n#et_tab_nav li a{\
	text-decoration: none;\
 	display:block;\
 	padding:0 5px 0 5px;\
}\
\n#et_win_img fieldset, #et_win_link fieldset, #et_win_quote fieldset,#et_win_css fieldset{\
	width:460px;\
}\
\n#et_win_link fieldset fieldset{\
	width:440px;\
}\
\n#et_win_img input, #et_win_link input, #et_win_quote input, #et_win_css input, #et_win_img select, #et_win_link select, #et_win_css select{\
	margin: 0 10px 5px 10px;\
	font-size:12px;\
}\
\noption.et_option {\
	padding-left:20px;\
	color:#666;\
}\
\noption.et_option_selected {\
	color:#ff9933;\
	padding-left:0px;\
}\
\n.et_formbutton{\
	margin:20px 10px 5px 0;\
	float:right;\
}\
\n.et_closewindow{\
	width: 25px;\
	height: 25px;\
	border: 1px solid #EFF5FB;\
	margin: 1px;\
	padding: 1px;\
	background: transparent;\
	float:right;\
}\
\n#et_previo {\
   overflow:auto;\
   height:400px;\
}\
\n#et_previo blockquote {\
	font: italic 0.9em arial, helvetica, sans-serif;\
	border-left : 2px solid #999;\
	padding-left : 1em;\
}\
\n#et_previo q {\
   font: italic 0.9em arial, helvetica, sans-serif;\
}\
\n#et_previo cite {\
   font: italic 0.9em arial, helvetica, sans-serif;\
   color: #000;\
}\
\n#et_previo h1 {\
   font: bold 1.1em arial, helvetica, sans-serif;\
   color: #000;\
   margin: 0;\
   padding: 0;\
}\
\n#et_previo h2 {\
   font: bold 1em arial, helvetica, sans-serif;\
   color: #000;\
   margin: 0;\
   padding: 0;\
}\
\n#et_previo h3 {\
   font: bold 0.95em arial, helvetica, sans-serif;\
   color: #000;\
   margin: 0;\
   padding: 0;\
}\
\n#et_previo h4 {\
   font: bold 0.9em arial, helvetica, sans-serif;\
   color: #000;\
   margin: 0;\
   padding: 0;\
}\
\n#et_previo img {\
	margin: 1em;\
	border: 1px solid #ccc;\
	padding: 4px;\
	background: #fff;\
}\
\n#et_previo img.izq {\
	float: left;\
	margin: 1em;\
	border: 1px solid #ccc;\
	padding: 4px;\
	background: #fff;\
}\
\n#et_previo img.der {\
	float: right;\
	margin: 0.5em;\
	border: 1px solid #ccc;\
	padding: 4px;\
	background: #fff;\
}\
\n#et_previo p {\
   font: 0.9em arial, helvetica, sans-serif;\
   color: #000;\
}\
\n#et_previo li {\
   font: 0.9em arial, helvetica, sans-serif;\
   color: #000;\
}\
\n.footnotes {\
     font-size: 0.6em;\
}\
\n#et_tit_previo {\
   margin-left: 510px;\
}";

/****Insert CSS ******/
/*Using Jquery. Useful for Chrome and Safari. The same code for (almost) all browsers */

	var ethead = document.getElementsByTagName('head')[0];
	var etstyle = document.createElement('style');
	etstyle.type = "text/css";  	 	
  	if(!window.ActiveXObject){
   		 jQuery(etstyle).html(etstyles);// if not Internet Explorer
   	}
   	else{
    		etstyle.styleSheet.cssText = etstyles; // if Internet Explorer
   	}
   	
    ethead.appendChild(etstyle);   
}

//****************************************************//
//***************** THE TOOLBAR **********************//
//****************************************************// 

function etShowButton(button, i) {
	if (button.access) {
		var accesskey = ' accesskey = "' + button.access + '"';
	}
	else {
		var accesskey = '';
	}	
	if ((button.onClick == 'etInsertImage') || (button.onClick == 'etInsertFastLink') || (button.onClick == 'etInsertFootnote') || (button.onClick == 'etPrev') || (button.onClick == 'etSpell') || (button.onClick == 'etSpellac') || (button.onClick == 'etInsertParam') || (button.onClick == 'etInsertYouTube') || (button.onClick == 'etInsertGoogle')  || (button.onClick == 'etInsertGoEar') || (button.onClick == 'etInsertFLV') || (button.onClick == 'etInsertAudio')) {
		button.onClick += '(edCanvas);';
	}
	else if (button.onClick == 'etInsertTag' || (button.onClick == 'etHideHeadings(); etInsertTag') || (button.onClick == 'etInsertAbbr') || (button.onClick == 'etInsertLink') || (button.onClick == 'etSplitText') || (button.onClick == 'etInsertObject')) {
		button.onClick += '(edCanvas, ' + i + ');';
 	}
 	
 	//Dividers have onClick=''
 	if (button.onClick == ''){
 	document.write('<img src="' +  button.ico  + '" class="et_sep_button" '  + 'alt="' + button.title + '" />' ); 	
 	}	
 	else {
	document.write('<button type="button" id="' + button.id + '" ' + accesskey + ' class="et_button" onmouseover="if(className==\'et_button\'){className=\'et_button_over\'};" onmouseout="if(className==\'et_button_over\'){className=\'et_button\'};" onclick="' + button.onClick +  '" title="' + button.title + '" >' + '<img src="' +  button.ico  + '" '  + 'alt="' + button.title + '" />'  + '</button>');	
	} 
}

function edToolbar() {
	etInsertStyles();
	document.write('<div id="et_backgroundTransparent"></div><div id="et_toolbar">');		

	/**********Headings***********/
	
	document.write('<ul id="et_headings_list">');
	document.write('<li><button type="button" id="headings" class="et_button"  title="Show/Hide Headings"><img src="' + IconDir + 'hn.png" alt="headings" title="Show/Hide Headings" /></button>');
	
	document.write('<ul>');
	
	for (var i = 0; i < 6; i++) {
		document.write('<li>');
		
		etShowButton(etButtons[i], i);
		document.write('</li>');
	}	
   document.write('</ul></li></ul><span>');
   
   /***end Headings***/
   
	for ( var i = 9; i < extendedStart; i++) {
		etShowButton(etButtons[i], i);
	}
	
	/**********Hidden windows ********/
	etWindowLink();	
	etWindowImg();
	etWindowQuote();
	etWindowTable();
	etWindowAdTable();
	etWindowCss();
	etWindowObject();
	
	/***********Extra bar*************/
	
	if (etShowExtraCookie()) {
		document.write(				
			'<button type="button" id="et_extra_show" class="et_button_plegar"  onclick="etShowExtra();"  title="show more buttons" style="display: none;">'  + '<img src="' + IconDir + 'desplegar.png" alt="show more buttons" />' + '</button>'

			+ '<button type="button" id="et_extra_hide" class="et_button_plegar" onclick="etHideExtra();" title="hide buttons"  >' + '<img src="' + IconDir + 'recoger.png" alt="hide buttons" />' + '</button>'

			+ '</span>'
			+ '<div id="et_extra_buttons">'
			
		);
	}
	else {
		document.write(
			 '<button type="button" id="et_extra_show" class="et_button"  onclick="etShowExtra();"  title="show more buttons" >'  + '<img src="' + IconDir + 'desplegar.png" alt="show more buttons" />' + '</button>'

			+ '<button type="button" id="et_extra_hide" class="et_button"  onclick="etHideExtra();" title="hide buttons" style="display: none;" >' + '<img src="' + IconDir + 'recoger.png" alt="hide buttons" />' + '</button>'

			+ '</span>'
			+ '<div id="et_extra_buttons" style="display: none;">'			
		);
	}

	for (i = extendedStart; i < etButtons.length; i++) {
		etShowButton(etButtons[i], i);
	}	
	document.write('</div>');
	document.write('</div>');
	document.write('<div id="et_previo" style=\'display:none;\'> </div>');	

	etForm=document.getElementById('post');
	//etForm = document.forms[1];
	 //1 for Wordpress,  0 in demo mode	
} 
/***The select for the frecuents links***/

function etShowLinks() {
	var tempStr = '<select onchange="etQuickLink(this.options[this.selectetIndex].value, this);"><option value="-1" class="et_option_selected">(Enlaces frecuentes)</option>';
	for (var i = 0; i < etLinks.length; i++) {
		tempStr += '<option class="et_option" value="' + i + '">' + etLinks[i].display + '</option>';
	}
	tempStr += '</select>';
	document.write(tempStr);
}

//***********Show Windows Forms (hidden) with jquery **********//

//It returns the button index if you know the id 
function etIndexButton(bid){

		var i=0;		
		while ((etButtons[i].id != bid ) & (i < etButtons.length)) {
			i++;
		}		
		return i	;		
}

function etShowWindow(myWindow){	
	//show the window form if there is not an opened tag			
		if (document.selection) {
          edCanvas.focus();
          etSel = document.selection.createRange();
    }
		switch (myWindow) {			
			case  'et_win_link':					
					etbut = 'et_link';
					break;
			case  'et_win_img':					
					etbut = 'et_img';					
					break;
			case  'et_win_quote':					
					etbut = 'et_pastequote';
					break;
			case  'et_win_table':					
					etbut = 'et_table';
					break;
			case  'et_win_adtable':					
					etbut = 'et_table';
					break;		
			case  'et_win_css':					
					etbut = 'et_css';
					break;	
			case  'et_win_object':					
					etbut = 'et_object';
					break;							
			default:
					break;
		}					
		var i = etIndexButton(etbut);		
		if (etCheckOpenTags(i)){				
				etInsertTag(edCanvas,i);		
		}
		else {		
				etToggleWindow(myWindow);		
		}	
}	
function etToggleWindow(myWindow){	
		var isHidden = jQuery('#et_backgroundPopup:hidden').is(':hidden');
		
		if (isHidden){	
				jQuery("#et_backgroundPopup").css({"opacity": "0.7" }); 
				jQuery("#et_headings_list").css({"z-index": "5"});
				jQuery("#et_backgroundPopup").fadeIn("1000");				
		}	
		else {	
			jQuery("#et_backgroundPopup").css({"opacity": "0.7" });   
			jQuery("#et_backgroundPopup").fadeOut("1000");  	
			setTimeout(function(){jQuery("#et_headings_list").css({"z-index" : "15"});}, "1000");			
		}				
		myWindow = '#' + myWindow;				
		jQuery(myWindow).slideToggle("1000");				
}

function etChangeWindow(myWindowone,myWindowtwo){
		myWindowone = '#' + myWindowone;		
		myWindowtwo = '#' + myWindowtwo;		
		jQuery(myWindowone).slideToggle("1000");					
		setTimeout(function(){jQuery(myWindowtwo).slideToggle("1000");}, "500");
}

/****Show the headings list using jquery****/

/***********#et_backgroundTransparent fix the "always on top" textarea bug********/

function etheadings(){
	jQuery("#et_headings_list ul").css({display: "none"}); // Opera Fix
	jQuery("#et_headings_list li").hover(function(){
	jQuery("#et_backgroundTransparent").show();
		jQuery(this).find("ul:first:hidden" ).css({visibility: "visible",display: "none",
		opacity: "0.9"}).slideDown("400");			
		
		},function(){
			jQuery(this).find("ul:first").slideUp("400");	
			jQuery("#et_backgroundTransparent").hide();
		});
}

jQuery(document).ready(function(){					
	etheadings();
	etTabNavegation(1);
	
});

function etHideHeadings(){
		jQuery("#et_headings_list ul").slideUp("400");
		jQuery("#et_backgroundTransparent").hide();
}

/***** End Headings *****/

function etShowExtra() {
	document.getElementById('et_extra_show').style.display = 'none';
	
	document.getElementById('et_extra_hide').style.display = 'inline';

	document.getElementById('et_extra_buttons').style.display = 'block';
	etSetCookie(
		'etiquetags_extra'
		, 'show'
		, new Date("December 31, 2100")
	);
}

function etHideExtra() {
	document.getElementById('et_extra_show').style.display = 'inline';
	document.getElementById('et_extra_buttons').style.display = 'none';	
	document.getElementById('et_extra_hide').style.display = 'none';	
	etSetCookie(
		'etiquetags_extra'
		, 'hide'
		, new Date("December 31, 2100")
	);
}

//****************************************************//
//***************** FUNCTIONS ************************//
//****************************************************// 


function etAddTag(button) {
	if ((etButtons[button].id=='et_link') || (etButtons[button].id=='et_object')){
		etOpenTags.length = etOpenTags.length;	
	}

	if (etButtons[button].tagEnd != '') {	
		etOpenTags[etOpenTags.length] = button;
	}
}

function etRemoveTag(button) {
	for (var i = 0; i < etOpenTags.length; i++) {
		if (etOpenTags[i] == button) {
			etOpenTags.splice(i, 1);
		}
	}
}

function etCheckOpenTags(button) {
	var tag = 0;
	for (var i = 0; i < etOpenTags.length; i++) {
		if (etOpenTags[i] == button) {
			tag++;
		}
	}
	if (tag > 0) {
		return true; // tag found
	}
	else {
		return false; // tag not found
	}
}

function etCloseAllTags() {
	var count = etOpenTags.length;
	for (o = 0; o < count; o++) {			
			etInsertTag(edCanvas, etOpenTags[etOpenTags.length -1]);
	}
}

//Dictionaries

function etSpell(myField) {
	var word = '';
	if (document.selection) {
		myField.focus();
	    var sel = document.selection.createRange();
		if (sel.text.length > 0) {
			word = sel.text;
		}
	}
	else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		if (startPos != endPos) {
			word = myField.value.substring(startPos, endPos);
		}
	}
	if (word == '') {
		word = prompt('Write your word:  ', '');
	}
	if (word != '') {
		window.open('http://www.thefreedictionary.com/' + escape(word)); 		
	}
}

function etSpellac(myField) {
   var word = '';
   if (document.selection) {
       myField.focus();
       var sel = document.selection.createRange();
       if (sel.text.length > 0) {
           word = sel.text;
       }
   }
   else if (myField.selectionStart || myField.selectionStart == '0') {
       var startPos = myField.selectionStart;
       var endPos = myField.selectionEnd;
       if (startPos != endPos) {
           word = myField.value.substring(startPos, endPos);
       }
   }
   if (word == '') {
       word = prompt('Write a text: ', '');
   }
   if (word != '') {
       window.open('http://www.acronymfinder.com/af-query.asp?Acronym=' + escape(word));
   }
}


/**** Preview functions ****/
function etPrev(myField) {
	var text = myField.value;
	var prev = document.getElementById('et_previo');
	prev.innerHTML=text;
	if (prev.style.display == 'none'){
			edCanvas.style.display = 'none';
			prev.style.display = 'block';
	}
	else{
			edCanvas.style.display = 'block';;
			prev.style.display = 'none';
	}
}
/**** Insert Links with forms ****/
/*** Links window has tabs ****/

function etTabNavegation(numtab) {	
	
	switch(numtab){	
		case 1:	
			jQuery("#et_link_atributes").show();		
			jQuery("#et_link_micro").hide();				
			jQuery("#et_link_xfn").hide();			
			jQuery("#et_tab_uno").css({"background-color" : "#2e3e4d", "color" : "#fff"});
			jQuery("#et_tab_dos").css({"background-color" : "transparent", "color" : "#2e3e4d"});
			jQuery("#et_tab_tres").css({"background-color" : "transparent", "color" : "#2e3e4d"});
			jQuery("#et_tab_uno").mouseover(function () {
   					   jQuery(this).css("color","#fff");
  			 			 }).mouseout(function(){
  							jQuery(this).css("color","#fff");
 					   });	
			jQuery("#et_tab_dos,#et_tab_tres").mouseover(function () {
   					   jQuery(this).css("color","#7A7A7A");
  			 			 }).mouseout(function(){
  							jQuery(this).css("color","#2e3e4d");
 					   });
			
			break;    

		case 2:
    		jQuery("#et_link_atributes").hide();
			jQuery("#et_link_micro").show();	
			jQuery("#et_link_xfn").hide();	
			jQuery("#et_tab_uno").css({"background-color" : "transparent", "color" : "#2e3e4d"});
			jQuery("#et_tab_dos").css({"background-color" : "#2e3e4d", "color" : "#fff"});
			jQuery("#et_tab_tres").css({"background-color" : "transparent", "color" : "#2e3e4d"});
			jQuery("#et_tab_dos").mouseover(function () {
   					   jQuery(this).css("color","#fff");
  			 			 }).mouseout(function(){
  							jQuery(this).css("color","#fff");
 					   });	
			jQuery("#et_tab_uno,#et_tab_tres").mouseover(function () {
   					   jQuery(this).css("color","#7A7A7A");
  			 			 }).mouseout(function(){
  							jQuery(this).css("color","#2e3e4d");
 					   });
			break;
			
		case 3:
   		jQuery("#et_link_atributes").hide();
			jQuery("#et_link_micro").hide();	
			jQuery("#et_link_xfn").show();	
			jQuery("#et_tab_uno").css({"background-color" : "transparent", "color" : "#2e3e4d"});
			jQuery("#et_tab_dos").css({"background-color" : "transparent", "color" : "#2e3e4d"});
			jQuery("#et_tab_tres").css({"background-color" : "#2e3e4d", "color" : "#fff"});
			jQuery("#et_tab_tres").mouseover(function () {
   					   jQuery(this).css("color","#fff");
  			 			 }).mouseout(function(){
  							jQuery(this).css("color","#fff");
 					   });	
			jQuery("#et_tab_uno,#et_tab_dos").mouseover(function () {
   					   jQuery(this).css("color","#7A7A7A");
  			 			 }).mouseout(function(){
  							jQuery(this).css("color", "#2e3e4d");
 					   });
			break;

		default :
  			jQuery("#et_link_atributes").show();
			jQuery("#et_link_micro").hide();	
			jQuery("#et_link_xfn").hide();	
			jQuery("#et_tab_uno").css({"background-color" : "#2e3e4d", "color" : "#fff"});
			jQuery("#et_tab_dos").css({"background-color" : "transparent", "color" : "#2e3e4d"});
			jQuery("#et_tab_tres").css({"background-color" : "transparent", "color" : "#2e3e4d"});
			jQuery("#et_tab_uno").mouseover(function () {
   					   jQuery(this).css("color","#fff");
  			 			 }).mouseout(function(){
  							jQuery(this).css("color","#fff");
 					   });			
			jQuery("#et_tab_dos,#et_tab_tres").mouseover(function () {
   					   jQuery(this).css("color","#7A7A7A");
  			 			 }).mouseout(function(){
  							jQuery(this).css("color", "#2e3e4d");
 					   });
			break;			
     
	}			
}

function etWindowLink(){ 
	var windowlink ='<div id="et_win_link">\
	<button type="button" class="et_closewindow" onclick="etShowWindow(\'et_win_link\');etTabNavegation(1);resetLinkForm();"><img src="' + IconDir + 'cerrar_ventana.png" alt="cerrar" title="close window"/></button>';
	windowlink += '<ul id="et_tab_nav">\
	<li><a href="#" id="et_tab_uno" onclick="etTabNavegation(1);">Link attributes</a></li>\
	<li><a href="#" id="et_tab_dos" onclick="etTabNavegation(2);" >Microformats</a></li>\
	<li><a href="#" id="et_tab_tres" onclick="etTabNavegation(3);" >XFN: identity and relationship</a></li>\
	</ul><br />';	
	
	windowlink += '<fieldset id="et_link_atributes">\
	<label for="eturllink">Link URL:\
	<input type="text" style="width: 95%" name="eturllink" id="eturllink" \ value="http://" /></label>';
	windowlink += '<label for="ettitlelink">Title:<input style="width: 95%" type="text" name="ettitlelink" id="ettitlelink" /></label>';
	windowlink += '<label for="langlink">Lang:\
	<input style="width: 30%" type="text" name="etLanglink" id="etLanglink" value="' + etLang + '" /></label>';
	windowlink += '<label for="etidlink">Id:<input style="width: 40%" type="text" name="etidlink" id="etidlink" class="general" /></label>';
	windowlink += '<label for="etclasslink">Class(CSS):<input style="width: 40%" type="text" name="etclasslink" id="etclasslink" /></label></fieldset>';
	
	windowlink += '<fieldset id="et_link_micro">\
	<fieldset>\
	Rev:<select name="etvotelink" id="etvotelink">\
			<option value=" " label="null" class="et_option_selected" selected="selected"> Vote-links </option>\
			<option class="et_option" value="vote-for" label="etvotefor">vote-for</option>\
			<option class="et_option" value="vote-abstain" label="etvoteabstain">vote-abstain</option>\
			<option class="et_option" value="vote-against" label="etvoteagainst">vote-against</option>\
		</select>\
		</fieldset>';
		
	windowlink += '<fieldset>\
		Rel: <input type="text" style="width: 90%" name="etrellink" id="etrellink" value="nofollow"/>\
		</fieldset>';
		
	windowlink += '<fieldset><legend>No-Follow</legend><label for="etrelnofollow"><input class="etrelval" type="checkbox" name="etnofollow" value="nofollow" id="etrelnofollow" checked="checked" /> no-follow</label></fieldset>';	
	
	windowlink += '<fieldset><legend>Content</legend>\
	<label for="ettag"><input class="etrelval" type="radio" name="etrelcontent" value="tag" id="ettag"/>rel-tag</label>\
	<label for="etlicense"><input class="etrelval" type="radio" name="etrelcontent" value="license" id="etlicense" /> rel-license</label>\
	<label for="directory"><input class="etrelval" type="radio" name="etrelcontent" value="directory" id="etdirectory"/> rel-directory</label>\
	<label for="bookmark"><input class="etrelval" type="radio" name="etrelcontent" value="bookmark" id="etbookmark"/> rel-bookmark</label>\
	<label for="content"><input class="etrelval" type="radio" name="etrelcontent" value="" id="etcontent"  checked="checked" /> none</label>\
	</fieldset>\
	</fieldset>';
	
	windowlink += '<fieldset id="et_link_xfn">\
	<fieldset><legend>Identity</legend>\
			<label for="etme">\
			<input class="etrelval" type="checkbox" name="etidentity" value="me" id="etme" />my URL (me)</label>\
			</fieldset>';	

	windowlink += '<fieldset><legend>Physical</legend>\
						<label for="etmet">\
						<input class="etvalinp" type="checkbox" name="etphysical" value="met" id="etmet" />met</label>\
 			</fieldset>';

	windowlink += '<fieldset><legend>Professional</legend>\
			<label for="co-worker">\
			<input class="etvalinp" type="checkbox" name="etprofessional" value="co-worker" id="etco-worker" />co-worker</label>\
			<label for="colleague">\
			<input class="etvalinp" type="checkbox" name="etprofessional" value="colleague" id="etcolleague" />colleague</label>\
		</fieldset>';

	windowlink += '<fieldset><legend>Friendship</legend>\
			<label for="etcontact">\
			<input class="etvalinp" type="radio" name="etfriendship" value="contact" id="etcontact" />contact</label>\
			<label for="etacquaintance">\
			<input class="etvalinp" type="radio" name="etfriendship" value="acquaintance" id="etacquaintance" />acquaintance</label>\
			<label for="etfriend">\
			<input class="etvalinp" type="radio" name="etfriendship" value="friend" id="etfriend" />friend</label>\
			<label for="etfriendship">\
			<input class="etvalinp" type="radio" name="etfriendship" value="" id="etfriendship" checked="checked" />none</label>\
		</fieldset>';

	windowlink += '<fieldset><legend>Geographical</legend>\
						<label for="etco-resident">\
						<input class="etvalinp" type="radio" name="etgeographical" value="co-resident" id="etco-resident"  />co-resident</label>\
						<label for="etneighbor">\
						<input class="etvalinp" type="radio" name="etgeographical" value="neighbor" id="etneighbor"  />neighbor</label>\
						<label for="etgeographical">\
						<input class="etvalinp" type="radio" name="etgeographical" value="" id="etgeographical" checked="checked" />none</label>\
		</fieldset>';

				
	windowlink += '<fieldset><legend>Romantic </legend>\
						<label for="etmuse">\
						<input class="etvalinp" type="checkbox" name="etromantic" value="muse" id="etmuse" />muse</label>\
						<label for="etcrush">\
						<input class="etvalinp" type="checkbox" name="etromantic" value="crush" id="etcrush" />crush</label>\
						<label for="etdate">\
						<input class="etvalinp" type="checkbox" name="etromantic" value="date" id="etdate" />date</label>\
						<label for="etromantic">\
						<input class="etvalinp" type="checkbox" name="etromantic" value="sweetheart" id="etromantic" />sweetheart</label>\
		</fieldset>';

	windowlink += '<fieldset><legend>Family</legend>\
						<label for="etchild">\
						<input class="etvalinp" type="radio" name="etfamily" value="child" id="etchild" />child</label>\
						<label for="etkin">\
						<input class="etvalinp" type="radio" name="etfamily" value="kin" id="etkin" />kin</label>\
						<label for="etparent">\
						<input class="etvalinp" type="radio" name="etfamily" value="parent" id="etparent" />parent</label>\
						<label for="etsibling">\
						<input class="etvalinp" type="radio" name="etfamily" value="sibling" id="etsibling" />sibling</label>\
						<label for="etspouse">\
						<input class="etvalinp" type="radio" name="etfamily" value="spouse" id="etspouse" />spouse</label>\
						<label for="family">\
						<input class="valinp" type="radio" name="etfamily" value="" id="etfamily" checked="checked" />none</label>\
		</fieldset>\
		</fieldset>';
		
	
		
	windowlink += '<script type="text/javascript">//<![CDATA[ var etalang = document.getElementById(\'etLanglink\');etalang.value = etLang;//]]></script>';
	
	windowlink += '<div>\
<p><button class="et_formbutton" name="aceptar" type="button" onclick="etFormLink();etToggleWindow(\'et_win_link\');etTabNavegation(1);resetLinkForm();">accept</button>\
		<button class="et_formbutton" name="cancelar" type="button" onclick="etShowWindow(\'et_win_link\');etTabNavegation(1);resetLinkForm();" >cancel</button></p></div></div>';
	document.write (windowlink);	
}

function etFormLink() {    
		var URL = document.getElementById("eturllink").value;
		var title = 'title="' + document.getElementById("ettitlelink").value + '"';	
		var lang = 'hreflang="' + document.getElementById("etLanglink").value + '"';
		var linkid = 'id="' +  document.getElementById("etidlink").value + '"';
		var linkclass = 'class="' + document.getElementById("etclasslink").value + '"';		
		var rev = 'rev="' + document.getElementById("etvotelink").value + '"';
		var rel = 'rel="' + document.getElementById("etrellink").value + '"'; 
		var i = 1;
		while ((etButtons[i].id != 'et_link') & (i < etButtons.length)) {
			i++;
		}
		etButtons[i].tagStart = '<a href="' + URL + '"';
		if (title != 'title=""') {
  		etButtons[i].tagStart = etButtons[i].tagStart + ' ' + title;
		}
		if (lang != 'hreflang=""') {
		etButtons[i].tagStart = etButtons[i].tagStart + ' ' + lang;
		}
		if (linkid != 'id=""') {
  		etButtons[i].tagStart = etButtons[i].tagStart + ' ' + linkid;
		}
		if (linkclass != 'class=""') {
  		etButtons[i].tagStart = etButtons[i].tagStart + ' ' + linkclass;
		}
		if (rev != 'rev=" "') {
  		etButtons[i].tagStart = etButtons[i].tagStart + ' ' + rev;
		}
		if (rel != 'rel=" "') {
  		etButtons[i].tagStart = etButtons[i].tagStart + ' ' + rel;
		}
		etButtons[i].tagStart = etButtons[i].tagStart + '>';
		etInsertTag(edCanvas,i);			
		if (etCheckOpenTags(i)){
			etOpenTags[etOpenTags.length - 1] = i;
		}
}

function resetLinkForm(){				
	//reset form to default values	
	document.getElementById("eturllink").value = "http://";
	document.getElementById("ettitlelink").value = "";
	document.getElementById("etLanglink").value = etLang;
	document.getElementById("etidlink").value = "";
	document.getElementById("etclasslink").value = "";
	document.getElementById("etvotelink").value = " ";
	document.getElementById("etrellink").value = "nofollow";			
	//Reset radio buttons to default values	
	var radiorel = new Array();
	radiorel = [etForm.etrelcontent,etForm.etfriendship,etForm.etgeographical,etForm.etfamily]; 	
	for (var j=0; j<4; j++){
			for (var i=0; i< radiorel[j].length; i++){	
				radiorel[j][i].checked = false;
				if (radiorel[j][i].defaultChecked){
					radiorel[j][i].checked = true;										
				}		
			}	
	}	
	//Reset checkbox buttons to default values	
	etForm.etnofollow.checked = true;
	etForm.etidentity.checked = false;
	etForm.etphysical.checked = false;	
	var checkrel = new Array();	
	checkrel = [etForm.etprofessional ,etForm.etromantic]; 
	for (var j=0; j<2; j++){
			for (var i=0; i< checkrel[j].length; i++){			
				checkrel[j][i].checked = false;		
			}	
	}	
	upit(); //isMe reset 
} 

function etInsertFastLink(myField) {
	var selec;
	//IE support
	if (document.selection) {
		myField.focus();
		var ranselec = document.selection.createRange();	
		selec = ranselec.text;
	}
	//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == '0') {
		selec =  myField.value.substring(myField.selectionStart,myField.selectionEnd);
	}
	if (selec=='') {
		alert ('Please,  select an URL in the textarea');
	}
	else {
		var myValue = '<a href="' + selec + '" title="' + selec + '">' + selec + '</a>';
		etInsertContent(myField, myValue);
		myField.focus();
	}
}

/********** end links ********/
/********images**********/
/****Show the images div(window) using jquery****/
//a div with a form for the images information
function etWindowImg(){
 
	var listClasses='';
	for (var i=0; i<etFreqClasses.length; i++) {
		listClasses += '<option class="et_option" value="' + etFreqClasses[i].name + '">' + etFreqClasses[i].title +  '</option>';
	}
	var windowimg = '<div id="et_win_img"><button type="button" class="et_closewindow" onclick="etToggleWindow(\'et_win_img\');resetImgForm();" ><img src="' + IconDir + 'cerrar_ventana.png" alt="cerrar" title="close window"/></button>\
	<h2 id="tit_ventana">Image attributes</h2>\
	<fieldset><label for="urlimg">Image URL: <input style="width: 95%" type="text" class="general" id="urlimg" name="urlimg" value="' + imgDir + '"/></label><label  for="altimg">Alternate text:<input style="width: 95%" type="text" class="general" id="altimg" name="altimg" /></label>\
	<label for="longdescimg">Long description:	<input style="width: 95%" type="text" class="general" id="longdescimg" name="longdescimg" /></label>\
	<label for="titleimg">Image title:<input style="width: 95%" type="text" class="general" id="titleimg" name="titleimg" /></label>\
	<label for="idimg">Id (CSS):<input style="width: 95%" type="text" class="general" id="idimg" name="idimg" /></label>\
	<label for="classimg">Class (CSS):<input style="width: 95%" type="text" class="general" id="classimg" name="classimg" /></label>';
	
	windowimg += '<select name="freqclass" id="freqclass" style="width:75%"><option value="-1" class="et_option_selected" selected="selected">(Frequent classes)</option>' + listClasses + '</select></fieldset>';
	
	windowimg += '<div><p><button class="et_formbutton" name="aceptar" type="button" onclick="etFormImg(); etToggleWindow(\'et_win_img\');resetImgForm();">accept</button><button class="et_formbutton" name="cancelar" type="button" onclick="etToggleWindow(\'et_win_img\');resetImgForm();">cancel</button></p></div>\
	</div><div id="et_backgroundPopup"></div>';		
	document.write (windowimg);	
}

function etFormImg() {
  var URL = document.getElementById("urlimg").value;
	var alt = 'alt="' + document.getElementById("altimg").value + '"';
	var title = 'title="' + document.getElementById("titleimg").value + '"';		
	var longdesc = 'longdesc="' + document.getElementById("longdescimg").value + '"';
	var style = 'class="' + document.getElementById("classimg").value;
	var id = 'id="' + document.getElementById("idimg").value + '"';
		
	if ( etForm.freqclass.value != -1 ){		
		//for checking the blank holes
		if (style != 'class="') {		
			style += ' ';		
		}
		style += document.getElementById("freqclass").value;
	}
	
	style += '"';	
	
	var myValue = '<img src="' + URL + '"'; 
	if (id != 'id=""') {
		myValue = myValue  + ' ' + id;  
		}
	if (alt != 'alt=""') {
		myValue = myValue  + ' ' + alt;  
		}
	if (title != 'title=""') {
		 myValue = myValue  + ' ' +  title; 	
		}	
	if (longdesc != 'longdesc=""') {
		 myValue = myValue  + ' ' +  longdesc; 	
		}	
	if (style != 'class=""') {
		 myValue = myValue  + ' ' +  style; 	
		}	
	myValue = myValue + ' ' + '/>'; 
	
	etInsertContent(edCanvas, myValue);
	
}

function resetImgForm(){
	document.getElementById("urlimg").value = imgDir;
	document.getElementById("altimg").value = '';	
	document.getElementById("titleimg").value = '';	
	document.getElementById("longdescimg").value = '';	
	document.getElementById("classimg").value = '';	
	document.getElementById("idimg").value = '';	
	document.getElementById("freqclass").selectetIndex = 0;			
}


//*SPLIT A TEXT FOLLOWING THE LINES. FOR LISTS AND BLOCKQUOTES

function etSplitText(myField, i) {

	var tag;				
		if ((etButtons[i].id == 'et_ul') || (etButtons[i].id == 'et_ol')){
			tag = 'li';
		}
		//else if (etButtons[i].id == 'et_block') {
			//tag = 'p';
		//}

	var selec;
	//IE support
	if (document.selection) {
		myField.focus();
		etSel = document.selection.createRange();	
		selec = etSel.text;
		etbut = 'li'
		var nlinea = '\u000D\u000A'; //salto de linea
	}
	//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == '0') {
		selec =  myField.value.substring(myField.selectionStart,myField.selectionEnd);
		var nlinea = '\u000A'; //salto de linea
	}
	var eSpText = selec.split(nlinea);	
	var myValue = etButtons[i].tagStart;
	for (n=0; n < eSpText.length; n++) {
      		myValue += '\n\t<' + tag + '>' + (eSpText[n]) + '</' + tag + '>\n';
	}
	myValue += etButtons[i].tagEnd;
	etInsertContent(myField, myValue);
	myField.focus();
}

//QUOTES
function etWindowQuote(){
	var windowquote = '<div id="et_win_quote"><button type="button" class="et_closewindow" onclick="etToggleWindow(\'et_win_quote\');resetQuoteForm();" ><img src="' + IconDir + 'cerrar_ventana.png" alt="cerrar" title="close window"/></button>\
	<h2 id="tit_ventana">Long quotations</h2>';		
	windowquote += '<fieldset id="et_quote_text"><legend>Paste your text here</legend>';	
	windowquote += '<span id="et_quote_toolbar">';
	//The button for editing the quotations 	
	for ( var i = 6; i < 9; i++) {	
					windowquote += '<button type="button" id="' + etButtons[i].id + '" class="et_button" onmouseover="if(className==\'et_button\'){className=\'et_button_over\'};" onmouseout="if(className==\'et_button_over\'){className=\'et_button\'};" onclick="etInsertTag(\'etCanvasQuote\',' + i + ' )" title="' + etButtons[i].title + '" >' + '<img src="' +  etButtons[i].ico  + '" '  + 'alt="' + etButtons[i].title + '" />'  + '</button>'; 				
	}	
	windowquote += '</span>';	
	windowquote += '<fieldset>\
	<textarea rows="20" cols="50" name="etquotetext" id="etquotetext"></textarea>\
			</fieldset>';
	windowquote += '<fieldset id="et_quote_params"><p><label for="etLangquote">Lang:\
	<input style="width: 30%" type="text" name="etLangquote" id="etLangquote" value="' + etLang + '" /></label></p>';
	windowquote += '<p><label for="etcitequote">The URI of the source document:\
	<input style="width: 70%" type="text" name="etcitequote" id="etcitequote" value="" /></label></p>\
	</fieldset>';			
	windowquote += '<div><p><button class="et_formbutton" name="aceptar" type="button" onclick="etFormQuote(); etToggleWindow(\'et_win_quote\');resetQuoteForm();">accept</button><button class="et_formbutton" name="cancelar" type="button" onclick="etToggleWindow(\'et_win_quote\');resetQuoteForm();">cancel</button></p></div>\
	</div><div id="et_backgroundPopup"></div>';	
	document.write (windowquote);	
}

function etFormQuote(){
		var etquoteText = document.getElementById('etquotetext').value;		
		var etquoteLang = document.getElementById('etLangquote').value;		
		var etquoteCite = document.getElementById('etcitequote').value;				
		var myValue = '<blockquote';		
		if (etquoteLang != "") {		
				myValue += ' xml:lang="' + etquoteLang + '"';
		}		
		if (etquoteCite != '') {		 
		 		myValue += ' cite="' + etquoteCite + '"';		 
		}
		myValue += '>\n' + etquoteText + '</blockquote>\n'; 		
		etInsertContent(edCanvas, myValue);
}

function resetQuoteForm(){
	document.getElementById('etquotetext').value = '';
	document.getElementById('etLangquote').value = etLang ;	
	document.getElementById('etcitequote').value = '';
}

//TABLES

function etWindowTable(){	
	var windowtable = '<div id="et_win_table"><button type="button" class="et_closewindow" onclick="etToggleWindow(\'et_win_table\');resetFormTable();" ><img src="' + IconDir + 'cerrar_ventana.png" alt="cerrar" title="close window"/></button>\
	<h2 id="tit_ventana">Insert a table</h2>';		
	windowtable += '<fieldset id="et_table"><legend>Define the table parameters</legend>';		
	windowtable += '<p><label for="etsumtable">Table description(summary):\
	<input style="width: 90%" type="text" name="etsumtable" id="etsumtable" /></label></p>';	
	windowtable += '<p><label for="etcaptable">Table caption (caption):\
	<input style="width: 90%" type="text" name="etcaptable" id="etcaptable" /></label></p>';				
	windowtable += '<p><label for="etFilTable">Rows:\
	 <select id="etFilTable" name="etFilTable">\
		<option value="1">1</option>\
		  <option value="2">2</option>\
		  <option value="3">3</option>\
		  <option value="4">4</option>\
		  <option value="5">5</option>\
		  <option value="6">6</option>\
		  <option value="7">7</option>\
		  <option value="8">8</option>\
		  <option value="9">9</option>\
		  <option value="10">10</option>\
		  <option value="11">11</option>\
		  <option value="12">12</option>\
		  <option value="13">13</option>\
		  </select></label></p>'; 	
	windowtable += '<p><label for="etColTable">Columns:\
	 <select id="etColTable" name="etColTable">\
 		<option value="1">1</option>\
		  <option value="2">2</option>\
		  <option value="3">3</option>\
		  <option value="4">4</option>\
		  <option value="5">5</option>\
	 </select></label></p>';	
	windowtable += '<p><label for="etheadtable">Headings:\
	  <select id="etheadtable" name="etheadtable">\
		  <option value="">None</option>\
		  <option value="etheadrow">First row</option>\
		  <option value="etheadcol">First column</option>\
		  <option value="etheadrowcol">Both</option>\
	  </select></label></p>';	
	windowtable += '<p><label for="etfootable">Foot table(yes/no):\
	<input style="width: 20%" type="checkbox" name="etfootable" id="etfootable" value="si" /></label></p>';	
	windowtable += '</fieldset>';	
	windowtable += '<div><p><button class="et_formbutton" name="aceptar" type="button" onclick="etFormTable(); etToggleWindow(\'et_win_table\');resetFormTable();">accept</button><button class="et_formbutton" name="cancelar" type="button" onclick="etToggleWindow(\'et_win_table\');resetFormTable();">cancel</button><button class="et_formbutton" name="avanzado" type="button" onclick=" etAdmode=true; etChangeWindow(\'et_win_table\',\'et_win_adtable\'); et_refresh_adtable();">advanced>></button></p></div>\
	</div><div id="et_backgroundPopup"></div>';		
	document.write (windowtable);	
}	

function etFormTable(){	
		var etsumtable = document.getElementById('etsumtable').value;
		var etcaptable = document.getElementById('etcaptable').value;
		etFilTable = document.getElementById('etFilTable').value;
		etColTable = document.getElementById('etColTable').value;
		var et_ed = new Array();
		var et_edh = new Array();
		var et_edf = new Array();
		//Have we used the advanced mode?
		if (etAdmode){
				for (var i=1; i<= etFilTable; i++){	
					et_ed[i] = new Array();
					for (var j=1; j<= etColTable; j++){							
							et_ed[i][j] =  document.getElementById('ed' + i + j ).value;							
					}
				}
				if (document.getElementById('edh1')){
					for (j=1; j<= etColTable; j++){
							 et_edh[j] = document.getElementById('edh' + j).value;
					}
				}
				if (document.getElementById('edf1')){
					for (j=1; j<= etColTable; j++){							
							 et_edf[j] = document.getElementById('edf' + j).value;					
					}
				}
		}
		else {
				for (var i=1; i<= etFilTable; i++){	
					et_ed[i] = new Array();
					for (var j=1; j<= etColTable; j++){							
							 et_ed[i][j] = '';
					}
				}
				for (j=1; j<= etColTable; j++){
							 et_edh[j] = '';
				}
				for (j=1; j<= etColTable; j++){							
							 et_edf[j] = '';					
				}
		}

		myValue = '\n<table';
		if (etsumtable) {
			myValue += ' summary="' + etsumtable + '"';		
		}		 
		myValue += '>\n';
		if (etcaptable) {		
			myValue += '<caption>' + etcaptable + '</caption>\n';		
		}
		//thead
		if ((document.getElementById('etheadtable').value == 'etheadrow') || (document.getElementById('etheadtable').value == 'etheadrowcol')){				
				myValue +='<thead>\n<tr>\n';							
							for (var j=1; j<= etColTable; j++){							
								myValue += '\t<th scope="col">' + et_edh[j] + '</th>\n';					
							}	
				myValue += '</tr>\n</thead>\n';		
		}		
		//tfoot				
		if (document.getElementById('etfootable').checked){				
				myValue +='<tfoot>\n<tr>\n';							
							for (var j=1; j<= etColTable; j++){							
								myValue += '\t<th scope="col">' + et_edf[j] + '</th>\n';					
							}	
				myValue += '</tr>\n</tfoot>\n';		
		}		
		//tbody
				myValue += '<tbody>\n';

				for (var i=1; i<= etFilTable; i++){	
				   myValue += '<tr>\n';				
				   if ( (document.getElementById('etheadtable').value == 'etheadcol') || (document.getElementById('etheadtable').value == 'etheadrowcol') ){					
							myValue += '\t<th scope="row">' + et_ed[i][1] + '</th>\n';
							for (var j=2; j<= etColTable; j++){					
								myValue += '\t<td>' + et_ed[i][j] + '</td>\n';
							}			
					}
					else {					
						for (var j=1; j<= etColTable; j++ ){    																
							myValue += '\t<td>' + et_ed[i][j] + '</td>\n';
						}					
					}					
					myValue += '</tr>\n';
				} 
				myValue += '</tbody>';	
		myValue += '</table>\n';		
		etInsertContent(edCanvas, myValue);
}

function et_refresh_adtable() {					
				etFilInput =' ';
				etFilTable = document.getElementById('etFilTable').value;
				etColTable = document.getElementById('etColTable').value;
															
								
				//thead				
				if ((document.getElementById('etheadtable').value == 'etheadrow') || (document.getElementById('etheadtable').value == 'etheadrowcol')){								
							etFilInput +='<thead id="etheadtable"><tr>';							
							for (var j=1; j<= etColTable; j++){							
								etFilInput += '<th scope="col"><label for="eth' + j + '">h' + j +'<input type="text" width:"20%" name="et' + j + '" id="eth' + j + '" /></th>';					
							}	
								etFilInput += '</tr></thead>';
					}				
				//tfoot
				if (document.getElementById('etfootable').checked){								
							etFilInput += '<tfoot id="etfoottable"><tr>';							
							for (var j=1; j<= etColTable; j++){							
								etFilInput += '<th scope="col"><label for="etf' + j + '">f' + j +'<input type="text" name="et' + j + '" id="etf' + j + '" /></th>';							
							}	
								etFilInput += '</tr></tfoot>';
					}	
				//tbody
				etFilInput += '<tbody id="etbodytable">';
				for (var i=1; i<= etFilTable; i++){									
					etFilInput += '<tr>';
					if ((document.getElementById('etheadtable').value == 'etheadcol') || (document.getElementById('etheadtable').value == 'etheadrowcol')){
						etFilInput += '<th scope="row"><label for="et' + i + '1">' + i + '1<input type="text" name="et' + i + '1" id="et' + i + '1" /></th>';
						for (var j=2; j<= etColTable; j++){					
							etFilInput += '<td><label for="et' + i + j + '">' + i + j +'<input type="text" name="et' + i + j + '" id="et' + i + j + '" /></td>';
						}
					}
					else {
						for (var j=1; j<= etColTable; j++){					
							etFilInput += '<td><label for="et' + i + j + '">' + i + j +'<input type="text" name="et' + i + j + '" id="et' + i + j + '" /></td>';
						}					
					}
						etFilInput += '</tr>\n';
				} 
				etFilInput += '</tbody>';										
				jQuery("#tab").html( etFilInput );	

		}

function etWindowAdTable(){
			etFilTable = document.getElementById('etFilTable').value;
			etColTable = document.getElementById('etColTable').value;	
			etFilInput =' ';				
			etFilInput += '<tbody id="etbodytable">';
			for (var i=1; i<= etFilTable; i++){									
					etFilInput += '<tr>';
					for (var j=1; j<= etColTable; j++){					
							etFilInput += '<td><label for="et' + i + j + '">' + i + j +'<input type="text" name="et' + i + j + '" id="et' + i + j + '" /></td>';
						}		
					etFilInput += '</tr>\n';
				} 
			etFilInput += '</tbody>';		
		 var windowadtable =  '<div id="et_win_adtable"><button type="button" class="et_closewindow" onclick="etToggleWindow(\'et_win_adtable\');resetFormTable();" ><img src="' + IconDir + 'cerrar_ventana.png" alt="cerrar" title="close window"/></button>\
	<h2 id="tit_ventana">Write your table</h2>';		
		windowadtable += '<table id="tab">' + etFilInput + '</table>';	
		windowadtable += '<div><p><button class="et_formbutton" name="aceptar" type="button" onclick="etFormTable(); etToggleWindow(\'et_win_adtable\');resetFormTable();">accept</button><button class="et_formbutton" name="cancelar" type="button" onclick="etToggleWindow(\'et_win_adtable\');resetFormTable();">cancel</button></p></div>\
	</div>';		
		document.write (windowadtable);	
}

function resetFormTable(){
	document.getElementById('etsumtable').value = '';
	document.getElementById('etcaptable').value = '';
	document.getElementById('etFilTable').value = 1;
	document.getElementById('etColTable').value = 1;	
	document.getElementById('etheadtable').value = '';	
	document.getElementById('etfootable').checked = false;	
	etAdmode = false;		
}
//Insert div and span tags with ID's and classes

function etWindowCss(myField, i){	
	var listClasses='';
	for (var i=0; i<etFreqClasses.length; i++) {
		listClasses += '<option class="et_option" value="' + etFreqClasses[i].name + '">' + etFreqClasses[i].title +  '</option>';
	}
	var windowcss = '<div id="et_win_css"><button type="button" class="et_closewindow" onclick="etToggleWindow(\'et_win_css\');etResetCssForm();" > <img src="' + IconDir + 'cerrar_ventana.png" alt="cerrar" title="close window"/></button>\
	<h2 id="tit_ventana">CSS Tags</h2>\
		<fieldset><legend>Div-Span</legend>\
			<label for="etdivtag">\
			<input type="radio" name="etdivspan" value="div" id="etdivtag" />div</label>\
			<label for="etspantag">\
			<input type="radio" name="etdivspan" value="span" id="etspantag" />span</label>\
			<label for="etnonetag">\
			<input type="radio" name="etdivspan" value="none" id="etnonetag" checked="checked"  />none</label>\
			</fieldset>\
		<fieldset><legend>Id-Class</legend>\
	<label for="etcssid">Id: <input style="width: 95%" type="text" class="general" id="etcssid" name="etcssid" /></label>\
	<label for="etcssclass">Class:	<input style="width: 95%" type="text" class="general" id="etcssclass" name="etcssclass" /></label>\
	<select name="etcssfreqclass" id="etcssfreqclass" style="width:75%">\
	<option value="-1" class="et_option_selected" selected="selected">(Frequent classes)</option>' + listClasses + '</select></fieldset>';
	
	windowcss += '<div><p><button class="et_formbutton" name="aceptar" type="button" onclick="etFormCss(); etToggleWindow(\'et_win_css\');etResetCssForm();">accept</button>\
	<button class="et_formbutton" name="cancelar" type="button" onclick="etToggleWindow(\'et_win_css\');etResetCssForm();">cancel</button>\
	</p></div>\
	</div>\
	<div id="et_backgroundPopup"></div>';		
	document.write (windowcss);	
}

function etFormCss() {
		var etcsstag = 'div';		
		for (var j=0; j<3; j++){		
			if (etForm.etdivspan[j].checked){ etcsstag = etForm.etdivspan[j].value;}		
		}					 
		var etcssid = 'id="' + document.getElementById("etcssid").value + '"';	
		var etcssclass = 'class="' + document.getElementById("etcssclass").value;		
		if ( etForm.etcssfreqclass.value != -1 ){		
		//para controlar los espacios en blanco		
			if (etcssclass != 'class="') {		
				etcssclass += ' ';		
			}
			etcssclass += etForm.etcssfreqclass.value;
		}	
		etcssclass += '"';		
		var i = 1;
		while ((etButtons[i].id != 'et_css') & (i < etButtons.length)) {
			i++;
		}
		if (etcsstag != 'none'){	
			etButtons[i].tagStart = '<' + etcsstag;		
			if (etcssid != 'id=""') {
  					etButtons[i].tagStart = etButtons[i].tagStart + ' ' + etcssid;
			}
			if (etcssclass != 'class=""') {
					etButtons[i].tagStart = etButtons[i].tagStart + ' ' + etcssclass;
			}		
			etButtons[i].tagStart = etButtons[i].tagStart + '>';		
			etButtons[i].tagEnd = '</' + etcsstag + '>';
			etInsertTag(edCanvas,i);					
			if (etCheckOpenTags(i)){
				etOpenTags[etOpenTags.length - 1] = i;
			}
		}				
		else if(etcsstag == 'none'){
			var myValue ="";
			if (etcssid != 'id=""') {
  					myValue = etcssid;
			}
			if (etcssclass != 'class=""') {
					myValue = myValue + ' ' + etcssclass;
			}						
			etInsertContent(edCanvas, myValue);
		}	
}

function etResetCssForm() {			
	//reset form to default values	
	document.getElementById("etcssid").value = "";
	document.getElementById("etcssclass").value = "";		
	//Reset radio buttons to default values	
	var radiorel = new Array();

	radiorel = etForm.etdivspan; 	
		for (var i=0; i< radiorel.length; i++){	
				radiorel[i].checked = false;
				if (radiorel[i].defaultChecked){
					radiorel[i].checked = true;										
				}				
		}	
	document.getElementById("etcssfreqclass").selectetIndex = 0;		
}

//footnotes

function etInsertFootnote(myField) {
	var note = prompt('Type the text for the footnote', '');
	if (!note || note == '') {
		return false;
	}
	var now = new Date;
	var fnId = 'fn' + now.getTime();
	var fnStart = edCanvas.value.indexOf('<ol class="footnotes">');
	if (fnStart != -1) {
		var fnStr1 = edCanvas.value.substring(0, fnStart)
		var fnStr2 = edCanvas.value.substring(fnStart, edCanvas.value.length)
		var count = countInstances(fnStr2, '<li id="') + 1;
	}
	else {
		var count = 1;
	}
	var count = '<sup><a href="#' + fnId + 'n" id="' + fnId + '" class="footnote">' + count + '</a></sup>';
	etInsertContent(edCanvas, count);
	if (fnStart != -1) {
		fnStr1 = edCanvas.value.substring(0, fnStart + count.length)
		fnStr2 = edCanvas.value.substring(fnStart + count.length, edCanvas.value.length)
	}
	else {
		var fnStr1 = edCanvas.value;
		var fnStr2 = "\n\n" + '<ol class="footnotes">' + "\n"
		           + '</ol>' + "\n";
	}
	var footnote = '	<li id="' + fnId + 'n">' + note + ' [<a href="#' + fnId + '">back</a>]</li>' + "\n"
				 + '</ol>';
	edCanvas.value = fnStr1 + fnStr2.replace('</ol>', footnote);
}
function countInstances(string, substr) {
	var count = string.split(substr);
	return count.length - 1;
}

//**** MULTIMEDIA FUNCTIONS ****//

function etWindowObject(){	
	var windowobject = '<div id="et_win_object"><button type="button" class="et_closewindow" onclick="etToggleWindow(\'et_win_object\');etResetCssForm();" > <img src="' + IconDir + 'cerrar_ventana.png" alt="cerrar" title="close window"/></button>\
	<h2 id="tit_ventana">Insert an object</h2>';
	windowobject += '<fieldset id="et-object"><legend>Define the parameters of the object</legend>';
	windowobject +='<p><label for="etdataobject">File address (data):\
<input style="width: 95%" type="text" id="etdataobject" name="etdataobject" value="' + objectdir + '" /></label></p> ';
	windowobject +=	'<p><label for="etcodebase">Base address (codebase):\
	<input style="width: 90%" type="text" id="etcodebase" name="etcodebase" value="' + baseurl + '" /></label></p>';
	windowobject +='<p><label for="ettypeobject">Object type (type):\
	<select id="ettypeobject" name="ettypeobject">\
	<option value="" label="null" class="selected" selected>object-type</option>\
	<option value="application/x-shockwave-flash" label="application/x-shockwave-flash">application/x-shockwave-flash</option>\
	<option value="application/mpeg" label="application/mpeg">application/mpeg</option>\
	<option value="application/x-java-applet" label="application/x-java-applet">application/x-java-applet</option>\
	<option value="application/pdf" label="application/pdf">application/pdf</option>\
	<option value="application/postscript" label="application/postscript">application/postscript</option>\
	<option value="application/x-latex" label="application/x-latex">application/x-latex</option>\
	<option value="text/html" label="text/html">text/html</option>\
	<option value="audio/mpeg" label="audio/mpeg">audio/mpeg</option>\
	<option value="video/mpeg" label="video/mpeg">video/mpeg</option>\
	<option value="video/quicktime" label="video/quicktime">video/quicktime</option>\
	</select></label></p> ';
	windowobject +='<p><label for="etwidthobject">Width:\
	<input style="width: 20%" type="text" id="etwidthobject" name="etwidthobject" value="' + videowidth + '" /></label></p>';
	windowobject +='<p><label for="etheightobject">Height:\
	<input style="width: 20%" type="text" id="etheightobject" name="etheightobject" value="' + videoheight + '"/></label></p>';
	windowobject +='<p><label for="etparamobject">Parameters of the object (param):\
	<table>\
		<tr>\
		<th>Name</th><th>Value</th>\
		</tr>\
		<tr>\
		<td><input type="text" name="paramnameobject" /></td>\
		<td><input type="text" name="paramvalueobject" /></td>\
		</tr>\
		<tr>\
		<td><input type="text" name="paramnameobject" /></td>\
		<td><input type="text" name="paramvalueobject" /></td>\
		</tr>\
		<tr>\
		<td><input type="text" name="paramnameobject" /></td>\
		<td><input type="text" name="paramvalueobject" /></td>\
		</tr>\
		<tr>\
		<td><input type="text" name="paramnameobject" /></td>\
		<td><input type="text" name="paramvalueobject" /></td>\
		</tr>\
		</table>';
	windowobject +='<p><label for="etaltobject">Alternate text:\
<textarea rows="4" cols="50" id="etaltobject" name="etaltobject"> This is a Flash object. You need the flash plugin for watching it: <a href="http://www.adobe.com/software/shockwaveplayer/">http://www.adobe.com/software/shockwaveplayer/</a></textarea></label></p> ';	
	windowobject += '<div><p><button class="et_formbutton" name="aceptar" type="button" onclick="etFormObject(); etToggleWindow(\'et_win_object\');etResetObjectForm();">accept</button>\
	<button class="et_formbutton" name="cancelar" type="button" onclick="etToggleWindow(\'et_win_object\');etResetObjectForm();">cancel</button>\
	</p></div>\
	</div>\
	<div id="et_backgroundPopup"></div>';		
	document.write (windowobject);	
}

function etFormObject() {
	var etcodebase = 'codebase="' + document.getElementById("etcodebase").value + '"';
	var etdataobject = 'data="' + document.getElementById("etdataobject").value + '"';
	var ettypeobject = 'type="' + document.getElementById("ettypeobject").value + '"';		
	var etwidthobject = 'width="' + document.getElementById("etwidthobject").value + '"';
	var etheightobject = 'height="' + document.getElementById("etheightobject").value + '"';
	var etaltobject = document.getElementById("etaltobject").value;
	var paramname = document.getElementsByName('paramnameobject');
	var paramvalue = document.getElementsByName('paramvalueobject');
	var param = new Array;
	
	var myValue = '<object'; 
	if (etcodebase != 'codebase=""') {
		myValue = myValue  + ' ' + etcodebase;  
		}
	if (etdataobject != 'data=""') {
		myValue = myValue  + ' ' + etdataobject;  
		}
	if (ettypeobject != 'type=""') {
		myValue = myValue  + ' ' + ettypeobject;  
		}
	if (etwidthobject != 'width=""') {
		 myValue = myValue  + ' ' +  etwidthobject; 	
		}	
	if (etheightobject != 'height=""') {
		 myValue = myValue  + ' ' +  etheightobject; 	
		}	
	myValue = myValue + '>\n' ;	
	for (n=0; n < 4; n++){
		if (paramname[n].value != ''){
			param[n] = '<param name="' + paramname[n].value + '" value="' + paramvalue[n].value + '" />\n';
			myValue = myValue + param[n];
		}
	}	
	myValue = myValue + etaltobject + '\n</object>\n'; 	
	etInsertContent(edCanvas, myValue);	
}

function etResetObjectForm(){
	document.getElementById('etcodebase').value = baseurl;
	document.getElementById('etdataobject').value = objectdir;
	document.getElementById('ettypeobject').value = '';
	document.getElementById('etwidthobject').value = videowidth;	
	document.getElementById('etheightobject').value = videoheight;	
	for (n=0; n < 4; n++){
		document.getElementsByName('paramnameobject')[n].value = '';
		document.getElementsByName('paramvalueobject')[n].value = '';
	}
	document.getElementById('etaltobject').value ='This is a Flash object. You need the flash plugin for watching it: <a href="http://www.adobe.com/software/shockwaveplayer/">http://www.adobe.com/software/shockwaveplayer/</a>';
}

function etInsertParam(myField) {
	var name = prompt('name');
	var value = prompt('value');
	var myValue = '<param ' ;
	if(name){
		myValue = myValue + 'name="' + name + '" ';
	}
	if (value){
		myValue = myValue + 'value="' + value + '" ';	
	}
	myValue = myValue  + ' />\n';
	etInsertContent(myField, myValue);
}


function etInsertYouTube(myField) {
		var ID = prompt('Type the Id Code' ,'http://www.youtube.com/v/');
		var ALT = prompt('Type an alternate text', 'This is a Youtube video. You need the flash plugin for watching it: <a href="http://www.adobe.com/software/shockwaveplayer/">http://www.adobe.com/software/shockwaveplayer/</a>' );
		var myValue = '<object type="application/x-shockwave-flash" data="' + ID + '" width="425" height="350">';
		myValue += '<param name="movie" value="' + ID + '" />\n';
		myValue += '<param name="wmode" value="transparent" />\n';
		myValue += ALT;
		myValue += '</object>\n';
		etInsertContent(myField, myValue);
	}
	
function etInsertGoogle(myField) {
		var ID =  prompt('Type the Id Code' , 'docId=');
		var ALT = prompt('Type an alternate text' , 'This a GoogleVideo video. You need the flash plugin for watching it: <a href="http://www.adobe.com/software/shockwaveplayer/">http://www.adobe.com/software/shockwaveplayer/</a>');
		var myValue = '<object width="400" height="326" type="application/x-shockwave-flash" data="http://video.google.com/googleplayer.swf?' + ID + '" >';
		myValue += '<param name="movie" value="http://video.google.com/googleplayer.swf?' + ID + '" />\n';
		myValue += '<param name="allowScriptAccess" value="sameDomain" />\n';
		myValue += '<param name="quality" value="best" />\n';
		myValue += '<param name="scale" value="noScale" />\n';
		myValue += '<param name="wmode" value="transparent" />\n';
		myValue += '<param name="salign" value="TL" />\n';
		myValue += '<param name="FlashVars" value="playerMode=embedded" />\n';
		myValue += ALT;
		myValue += '</object>\n';
		etInsertContent(myField, myValue);	
	}
	
	function etInsertGoEar(myField) {
		var ID = prompt('Type the Id Code' ,'file=');
		var ALT = prompt('Type an alternate text' , 'This is a Goear song . You need the flash plugin for watching it: <a href="http://www.adobe.com/software/shockwaveplayer/">http://www.adobe.com/software/shockwaveplayer/</a>');
		var myValue = '<object  type="application/x-shockwave-flash" width="353" height="132" data="http://www.goear.com/files/external.swf?' + ID + '">';
		myValue += '<param name="movie" value="http://www.goear.com/files/external.swf?' + ID + '" />\n';
		myValue += '<param name="quality" value="high" />\n';
		myValue += ALT;
		myValue += '</object>\n';
		etInsertContent(myField, myValue);
	}	
	

// **** INSERTION CODE ****//

function etInsertTag(myField, i) {

	if (myField == 'etCanvasQuote') {	
			myField = document.getElementById('etquotetext');	
	}
	var sel;
	//IE support
	if (document.selection) {       
      myField.focus();			
      if (((etButtons[i].id == 'et_link') || (etButtons[i].id =='et_css')) & ( !etCheckOpenTags(i)) ) {     
              sel = etSel;              
      }
      else {
              sel = document.selection.createRange();           
      }		
		
		if (sel.text.length > 0) {
     	sel.text = etButtons[i].tagStart + sel.text + etButtons[i].tagEnd;   	
      sel.select();      
		}
		else {
			if (!etCheckOpenTags(i) || etButtons[i].tagEnd == '') {
				sel.text = etButtons[i].tagStart;
				etAddTag(i);
			}
			else {
				sel.text = etButtons[i].tagEnd;
				etRemoveTag(i);
			}
		}
		myField.focus();		
	}
	//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var cursorPos = endPos;
		var scrollTop = myField.scrollTop;
		if (startPos != endPos) {
			myField.value = myField.value.substring(0, startPos)
			              + etButtons[i].tagStart
			              + myField.value.substring(startPos, endPos) 
			              + etButtons[i].tagEnd
			              + myField.value.substring(endPos, myField.value.length);
			cursorPos += etButtons[i].tagStart.length + etButtons[i].tagEnd.length;
		}
		else {
			if (!etCheckOpenTags(i) || etButtons[i].tagEnd == '') {
				myField.value = myField.value.substring(0, startPos) 
				              + etButtons[i].tagStart
				              + myField.value.substring(endPos, myField.value.length);
				etAddTag(i);
				cursorPos = startPos + etButtons[i].tagStart.length;
			}
			else {
				myField.value = myField.value.substring(0, startPos) 
				              + etButtons[i].tagEnd
				              + myField.value.substring(endPos, myField.value.length);
				etRemoveTag(i);
				cursorPos = startPos + etButtons[i].tagEnd.length;
			}
		}
		myField.focus();
		myField.selectionStart = cursorPos;
		myField.selectionEnd = cursorPos;
		myField.scrollTop = scrollTop;
	}
	else {
		if (!etCheckOpenTags(i) || etButtons[i].tagEnd == '') {
			myField.value += etButtons[i].tagStart;
			etAddTag(i);
		}
		else {
			myField.value += etButtons[i].tagEnd;
			etRemoveTag(i);
		}
		myField.focus();
	}
}

function etInsertContent(myField, myValue) {
	var sel;
	//MOZILLA/NETSCAPE support
	if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var scrollTop = myField.scrollTop;
		myField.value = myField.value.substring(0, startPos)
		              + myValue 
                    + myField.value.substring(endPos, myField.value.length);
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
		myField.scrollTop = scrollTop;
	} 
		//IE support
	else if (document.selection) {
    myField.focus();    
    if ((etbut=='et_img') || (etbut=='et_pastequote') || (etbut=='et_table') || (etbut=='et_css') || (etbut=='et_object') || (etbut=='li') ) {     
              sel = etSel; 
     }
     else {
              sel = document.selection.createRange();
    }	
		sel.text = myValue;		
		sel.select(); 
		myField.focus();
	}

	else {
		myField.value += myValue;
		myField.focus();
	}
}

//**** COOKIES ***//

function etSetCookie(name, value, expires, path, domain) {
	document.cookie= name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "");
}

function etShowExtraCookie() {
	var cookies = document.cookie.split(';');
	for (var i=0;i < cookies.length; i++) {
		var cookieData = cookies[i];
		
		while (cookieData.charAt(0) ==' ') {
			cookieData = cookieData.substring(1, cookieData.length);
		}
		if (cookieData.indexOf('etiquetags_extra') == 0) {
			if (cookieData.substring(17, cookieData.length) == 'show') {
				return true;
			}
			else {
				return false;
			}
		}
	}
	return false;
}

/***Insert XFN ****/
	function GetElementsWithClassName(elementName, className) {
		   var allElements = document.getElementsByTagName(elementName);
		   var elemColl = new Array();		  
		   for (var i = 0; i < allElements.length; i++) {
		       if (allElements[i].className == className) {
		           elemColl[elemColl.length] = allElements[i];
		       }
		   }
		   return elemColl;
	}
				
	function meChecked() {
		  var undefined;
		  var eMe = document.getElementById('etme');
		  if (eMe == undefined) return false;
		  else return eMe.checked;
	}		
	function upit() {
		   var isMe = meChecked(); //document.getElementById('me').checked;
		   var inputColl = GetElementsWithClassName('input', 'etrelval');
		   var inputCollPerson = GetElementsWithClassName('input', 'etvalinp');
		   var results = document.getElementById('etrellink');
		   var inputs = '', inputsPerson = '' ;		   
		   //Personal Rel
		   for (var i = 0; i < inputCollPerson.length; i++) {
		   	 inputCollPerson[i].disabled = isMe;
		       inputCollPerson[i].parentNode.className = isMe ? 'disabled' : '';
		       	if (!isMe && inputCollPerson[i].checked && inputCollPerson[i].value != '') {
					inputsPerson += inputCollPerson[i].value + ' ';
		         }
		       }
		   inputsPerson = inputsPerson.substr(0,inputsPerson.length - 1);		   
			//Rel		
			for (var i = 0; i < inputColl.length; i++) {
		   	   if (inputColl[i].checked && inputColl[i].value != '') {		   	   			   	   	
		   	   	inputs += inputColl[i].value + ' ' ; 		   	   	
		         }
		    }		   
		   inputs = inputs.substr(0,inputs.length - 1);		   		   
			if ((inputs != '') && (inputsPerson != '') ){ 
					results.value = inputs + ' ' + inputsPerson;		
			} 
			else if (inputs != ''){
				results.value = inputs;		
			}
			else if (inputsPerson != '') {
				results.value = inputsPerson;		
			}
			else {		
				results.value = ' ';		
			}		
	}		
		
	function blurry() {
		   if ((!document.getElementById) || (!document.getElementById('post'))) return;	// Do nothing if not editing posts or comments in WP
		   var aInputs = document.getElementsByTagName('input');		
		   for (var i = 0; i < aInputs.length; i++) {		
		       aInputs[i].onclick = aInputs[i].onkeyup = upit;
		   }
	}
				
	window.onload = blurry; 


