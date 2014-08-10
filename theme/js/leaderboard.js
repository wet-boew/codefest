/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $ ) {
"use strict";

var isFrench = document.documentElement.lang === "fr",
	$leaderboard = $( "#leaderboard" ),
	table = "<table class='table table-bordered table-striped' data-wb-tables='{\"order\": [[ 2, \"desc\" ]]}'></table>",

	display = function() {
		var $leaderboardTable = $bounties.html( table ).children( "table" );

		$leaderboardTable
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=892764133",
				headers: 1,
				labels: [
					isFrench ? "Nom d'utilisateur GitHub" : "GitHub user name",
					isFrench ? "Type de contributeur" : "Contributor type",
					"Points"
				],
				resetStatus: true,
				userCallback: function() {
					if ( isFrench ) {
						$leaderboardTable.find( "tbody" ).attr( "lang", "en" );
					}
					$leaderboardTable.addClass( "wb-tables" ).trigger( "wb-init.wb-tables" );
				}
			});
	};

display();
//setInterval( display, 300000 );

})( jQuery );
