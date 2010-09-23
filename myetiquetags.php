<?php
/*
Plugin Name: myetiquetags
Plugin Script: myetiquetags.php
Plugin URI: http://www.etiquetags.org/
Description: This plugin helps you to use etiquetags editor in your Wordpress Blog.
Version: 1.0
License: GPL
Author: etiquetags
Author URI: http://www.etiquetags.org/

=== CHANGES ===
- v1.0 - first version
*/


/*  Copyright 2010  etiquetags (email : mgarab@gmail.com)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
Online: http://www.gnu.org/licenses/gpl.txt
*/


function etiquetags_editor(){
		wp_deregister_script( 'quicktags' );
		echo '<script language="javascript" type="text/javascript" >
			var et_baseurl = "' .  get_option('siteurl')  . '"; //Your blog URL
			var et_IconDir = "' .  get_option('siteurl')  . '/wp-content/plugins/myetiquetags/iconos/";  //Icons Directory. </script>' ;
		echo '<script language="javascript" type="text/javascript" src="' . get_option('siteurl') . '/wp-content/plugins/myetiquetags/etiquetags.js"></script>';
}

add_action('admin_head', 'etiquetags_editor');
?>
