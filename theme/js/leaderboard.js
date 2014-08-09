/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $, wb ) {
"use strict";

var $document = wb.doc,
	isFrench = document.documentElement.lang === "fr",
	display = function() {
		var $leaderboard = $( "#leaderboard" ).empty();

		$( "<table class='wb-tables table table-bordered table-striped' data-wb-tables='{\"order\": [[ 2, \"desc\" ]]'></table>" )
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=892764133",
				headers: 1,
				labels: [
					isFrench ? "GitHub user name" : "Nom d'utilisateur GitHub",
					isFrench ? "Type de contributeur" : "Contributor type",
					"Points"
				],
				resetStatus: true,
				userCallback: function() {
					$leaderboard.find( ".wb-tables" ).trigger( "wb-init.wb-tables" );
					if ( isFrench ) {
						$leaderboard.find( "tbody" ).attr( "lang", "en" );
					}
				}
			})
			.appendTo( $leaderboard );
	};

Modernizr.load({
	load: "site!deps/jquery.sheetrock" + wb.getMode() + ".js",
	complete: function() {
		display();
		//setInterval( display, 300000 );
	}			
});

})( jQuery, wb );
