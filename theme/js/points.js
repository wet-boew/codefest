/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $, wb ) {
"use strict";

var	isFrench = document.documentElement.lang === "fr",
	bountiesUrl = "https://docs.google.com/spreadsheets/d/",
	bountiesSql = "select " + ( isFrench ?  "B,D" : "A,C" ) + ",E,F order by " + ( isFrench ?  "B" : "A" ),
	bonusesUrl = bountiesUrl,
	bonusesSql = "select " + ( isFrench ?  "B,D" : "A,C" ) + ",E order by " + ( isFrench ?  "B" : "A" ),
	table = "<table class='table table-bordered table-striped' " +
		"data-wb-tables='{\"lengthMenu\": [[10, 25, 100, -1], [10, 25, 100, \"" +
		( isFrench ? "Toutes les" : "All" ) + "\"]], \"pageLength\": -1}'></table>",
	bountiesLabels = [
		isFrench ? "Tache" : "Task",
		"Type",
		"Points",
		isFrench ? "Réclamé par" : "Claimed by"
	],
	bonusesLabels = [
		isFrench ? "Tache" : "Task",
		"Type",
		"Points"
	],
	$bounties, $bonuses,

	display = function() {
		var $bountiesTable = $( table ),
			$bonusesTable = $( table );

		$bounties.empty().append( $bountiesTable );
		$bonuses.empty().append( $bonusesTable );

		$bountiesTable
			.sheetrock({
				url: bountiesUrl,
				sql: bountiesSql,
				labels: bountiesLabels,
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
				url: bonusesUrl,
				sql: bonusesSql,
				labels: bonusesLabels,
				resetStatus: true,
				userCallback: function() {
					$bonusesTable.addClass( "wb-tables" ).trigger( "wb-init.wb-tables" );
				}
			});
	};

wb.doc.on( "wb-ready.wb", function() {
	$bounties = $( "#bounties" );
	bountiesUrl += $bounties.data( "gss" );
	$bonuses = $( "#bonuses" );
	bonusesUrl += $bonuses.data( "gss" );

	display();
	//setInterval( display, 300000 );
});

})( jQuery, wb );
