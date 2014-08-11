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
		var $bountiesTable = $( table ),
			$bonusesTable = $( table );

		$bounties.empty().append( $bountiesTable );
		$bonuses.empty().append( $bonusesTable );

		$bountiesTable
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=0",
				sql: "select " + ( isFrench ?  "B,D" : "A,C" ) + ",E,F order by " + ( isFrench ?  "B" : "A" ),
				labels: [
					isFrench ? "Tache" : "Task",
					"Type",
					"Points",
					isFrench ? "Réclamé par" : "Claimed by"
				],
				resetStatus: true,
				userCallback: function() {
					var $lastColumnTd = $bountiesTable.children( "tbody" ).find( "td:last-child" ),
						len = $lastColumnTd.length,
						td, tdHtml, i;

					// Make user names into links
					for ( i = 0; i !== len; i += 1 ) {
						td = $lastColumnTd[ i ];
						if ( td ) {
							tdHtml = td.innerHTML;
							td.innerHTML = "<a href='https://github.com/" + tdHtml + "'>" + tdHtml + "</a>";
						}
					}
					$bountiesTable
						.addClass( "wb-tables" )
						.trigger( "wb-init.wb-tables" );
				}
			});

		$bonusesTable
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=1113086746",
				sql: "select " + ( isFrench ?  "B,D" : "A,C" ) + ",E order by " + ( isFrench ?  "B" : "A" ),
				labels: [
					isFrench ? "Tache" : "Task",
					"Points"
				],
				resetStatus: true,
				userCallback: function() {
					$bonusesTable.addClass( "wb-tables" ).trigger( "wb-init.wb-tables" );
				}
			});
	};

wb.doc.on( "wb-ready.wb", function() {
	$bounties = $( "#bounties" );
	$bonuses = $( "#bonuses" );

	display();
	//setInterval( display, 300000 );
});

})( jQuery, wb );
