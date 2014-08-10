/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $, wb ) {
"use strict";

var table = "<table class='table table-bordered table-striped'></table>",
	isFrench = document.documentElement.lang === "fr",
	$bounties, $bonuses,

	display = function() {
		var $bountiesTable = $bounties.html( table ).children( "table" ),
			$bonusesTable = $bonuses.html( table ).children( "table" );

		$bountiesTable
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
					if ( isFrench ) {
						$bountiesTable.children( "tbody" ).attr( "lang", "en" );
					}
					$bountiesTable.addClass( "wb-tables" ).trigger( "wb-init.wb-tables" );
				}
			});

		$( table )
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=1113086746",
				header: 1,
				labels: [
					isFrench ? "Tache" : "Task",
					"Points"
				],
				resetStatus: true,
				userCallback: function() {
					if ( isFrench ) {
						$bonusesTable.children( "tbody" ).attr( "lang", "en" );
					}
					$bonusesTable.addClass( "wb-tables" ).trigger( "wb-init.wb-tables" );
				}
			});
	};

wb.doc.on( "wb-ready.wb", "#points-tabs", function() {
	$bounties = $( "#bounties" );
	$bonuses = $( "#bonuses" );

	display();
	//setInterval( display, 300000 );
});

})( jQuery, wb );
