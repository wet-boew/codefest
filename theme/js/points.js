/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $ ) {
"use strict";

var table = "<table class='wb-tables table table-bordered table-striped'></table>",
	isFrench = document.documentElement.lang === "fr",
	display = function() {
		var $bounties = $( "#bounties" ).empty(),
			$bonuses = $( "#bonuses" );

		$( table )
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=0",
				headers: 1,
				labels: [
					isFrench ? "Tache" : "Task",
					"Type",
					"Points",
					isFrench ? "Réclamé par" : "Claimed by"
				],
				resetStatus: true,
				userCallback: function() {
					$bounties.find( ".wb-tables" ).trigger( "wb-init.wb-tables" );
					if ( isFrench ) {
						$leaderboard.find( "tbody" ).attr( "lang", "en" );
					}
				}
			})
			.appendTo( $bounties );

		$( table )
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=1113086746",
				header: 1,
				labels: [
					"Task",
					"Points"
				],
				resetStatus: true,
				userCallback: function() {
					$bonuses.find( ".wb-tables" ).trigger( "wb-init.wb-tables" );
				}
			})
			.appendTo( $bonuses );
	};

display();
//setInterval( display, 300000 );

})( jQuery );
