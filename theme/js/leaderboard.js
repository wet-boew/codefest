/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $ ) {
"use strict";

var isFrench = document.documentElement.lang === "fr",
	$leaderboard = $( "#leaderboard" ),
	url = "https://docs.google.com/spreadsheets/d/" + $leaderboard.data( "gss" ),
	sql = "select A," + ( isFrench ?  "C" : "B" ) + ",D order by D desc",
	table = "<table class='table table-bordered table-striped' " +
		"data-wb-tables='{\"order\": [[ 2, \"desc\" ]], " +
		"\"lengthMenu\": [[10, 25, 100, -1], [10, 25, 100, \"" +
		( isFrench ? "Toutes les" : "All" ) + "\"]], \"pageLength\": -1}'></table>",
	labels = [
		isFrench ? "Nom d'utilisateur GitHub" : "GitHub user name",
		isFrench ? "Type de contributeur" : "Contributor type",
		"Points"
	],

	display = function() {
		var $leaderboardTable = $( table );

		$leaderboard.empty().append( $leaderboardTable );

		$leaderboardTable
			.sheetrock({
				url: url,
				sql: sql,
				headers: 1,
				labels: labels,
				resetStatus: true,
				userCallback: function() {
					var $tableBody = $leaderboardTable.children( "tbody" ),
						$firstColumnTd = $tableBody.find( "td:first-child" ),
						len = $firstColumnTd.length,
						td, tdHtml, i;

					// Make user names into links
					for ( i = 0; i !== len; i += 1 ) {
						td = $firstColumnTd[ i ];
						if ( td ) {
							tdHtml = td.innerHTML;
							td.innerHTML = "<a href='https://github.com/" + tdHtml + "'>" + tdHtml + "</a>";
						}	
					}
					$leaderboardTable
						.addClass( "wb-tables" )
						.trigger( "wb-init.wb-tables" );
				}
			});
	};

display();
setInterval( display, 300000 );

})( jQuery );
