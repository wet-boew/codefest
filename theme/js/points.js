/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
(function( $, wb ) {
"use strict";

var	isFrench = document.documentElement.lang === "fr",
	$elm = $( "#bounties, #bonuses" ),
	isBounties = $elm.attr( "id" ) === "bounties",
	url = "https://docs.google.com/spreadsheets/d/" + $elm.data( "gss" ),
	sql = "select " + ( isFrench ?  "B,D" : "A,C" ) + ",E" +
		( isBounties ? ",F" : "" ) + " order by " +
		( isFrench ?  "B" : "A" ),
	table = "<table class='table table-bordered table-striped' " +
		"data-wb-tables='{\"lengthMenu\": [[10, 25, 100, -1], [10, 25, 100, \"" +
		( isFrench ? "Toutes les" : "All" ) + "\"]], \"pageLength\": -1}'></table>",
	labels = [
		isFrench ? "Tache" : "Task",
		"Type",
		"Points"
	],
	extraBountiesLabel = isFrench ? "Réclamé par" : "Claimed by",

	display = function() {
		var $table = $( table );

		$elm.empty().append( $table );

		$table
			.sheetrock({
				url: url,
				sql: sql,
				labels: labels,
				resetStatus: true,
				userCallback: function() {
					if ( isBounties ) {
						var $lastColumnTd = $table.children( "tbody" ).find( "td:last-child" ),
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
					}

					$table
						.addClass( "wb-tables" )
						.trigger( "wb-init.wb-tables" );
				}
			});
	};

if ( isBounties ) {
	labels.push( extraBountiesLabel );
}

display();
//setInterval( display, 300000 );

})( jQuery, wb );
