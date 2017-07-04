var webservice = 'http://10.135.13.1:5432/places';
// var webservice = 'http://10.135.13.3:5432/places';

document.addEventListener('deviceready', function() {
        console.log( 'APP gestartet und läuft!' );

        // Darstellung Orte
        var loadPlaces = function() {
          $.ajax({
            url:webservice,
            type:'GET',
            success:function(d) {
              $( '#places' ).empty();
              for (var i in d.places ) {
                console.log( d.places[i] );
                if ( d.places[i].name ) {
                  $( '<div>' )
                    .attr( 'data-id', i )
                    .appendTo( '#places' )
                    .html( d.places[i].name + '( '+d.places[i].lat +'/'+d.places[i].lng +' )')
                    .append(
                      $( '<button class="delPlace">Löschen</button>' )
                    )
                }
              }

              if ( $( '#places > div').length == 0 ) {
                  $( '<em>derzeit keine Orte eingetragen</em>' )
                    .appendTo( '#places' );                  
              }

            }
          });
        }

        $( document ).ready(function() {
          $( 'input[type=text]' ).val('');
          loadPlaces();
        });

        $( document ).on( 'click', '#bottom a', function() {
          $( '.aktiv' ).removeClass( 'aktiv' );
          $( this ).addClass( 'aktiv' );
          $( '.page' ).hide();
          $( $(this).attr('href') ).show();
        });

        $( document ).on( 'click', '#save', function() {
          var newPlace = {
            name:$( '#placename').val(),
            lat:$( '#placelat').val(),
            lng:$( '#placelng').val()
          }
          $.ajax({
            url:webservice,
            type:'POST',
            data:newPlace,
            success:function(d) {
              alert( 'Gespeichert.' );
              $( 'input' ).val('');
              loadPlaces();
            },
            error:function() {
              alert( 'Da ging was schief...');
            }
          });
        });

        $( document ).on( 'click', '.delPlace', function() {
          var id = $(this).parent().attr('data-id');
          $.ajax({
            url: webservice+'/'+id,
            type:'DELETE',
            success:function(d) {
              alert( 'Gelöscht.' );
              loadPlaces();
            },
            error:function() {
              alert( 'Da ging was schief...');
            }
          });
        });






}, false);
