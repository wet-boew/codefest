/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $ ) {
"use strict";

var isFrench = document.documentElement.lang === "fr",
	$updates = $( "#updates" ),
	table = "<table class='table table-bordered table-striped' data-wb-tables='{\"order\": [[ 0, \"asc\" ], [ 1, \"asc\" ]]}'></table>",

	display = function() {
		var $updatesTable = $( table );

		$updates.empty().append( $updatesTable );

		$updatesTable
			.sheetrock({
				url: "https://docs.google.com/spreadsheets/d/1IuFFuJQ3GUunynj4sw-8DfgHzsy_5Cn9a3-P3mCCuAI/gid=1067524417",
				sql: "select A,B," + ( isFrench ?  "D,F" : "C,E" ) + " order by A,B desc",
				headers: 1,
				labels: [
					"Date",
					isFrench ? "Heure" : "Time",
					"Type",
					isFrench ? "Nouvelles" : "Updates"
				],
				resetStatus: true,
				userCallback: function() {
					var $tableBody = $updatesTable.children( "tbody" ),
						$firstColumnTd = $tableBody.find( "td:first-child" ),
						len = $firstColumnTd.length,
						td, i;

					// Fix formatting of the date
					for ( i = 0; i !== len; i += 1 ) {
						td = $firstColumnTd[ i ];
						if ( td ) {
							td.innerHTML = ( new Date( td.innerHTML ) ).toISOString().substring( 0, 10 );
						}
					}
					$updatesTable
						.addClass( "wb-tables" )
						.trigger( "wb-init.wb-tables" );
				}
			});
	};

display();
//setInterval( display, 300000 );

})( jQuery );
