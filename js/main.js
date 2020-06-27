// Attraverso una chiamata ajax all’Api di boolean avremo a
// disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus: Creare una select con i seguenti generi: pop, rock,
// metal e jazz. In base a cosa scegliamo nella select vedremo i
// corrispondenti cd.
// Endpoint: https://flynn.boolean.careers/exercises/api/array/music

$(document).ready(function() {

  // -------------------- LOGICA -------------------- //
  $.ajax(
    {
      url: 'https://flynn.boolean.careers/exercises/api/array/music',
      method: 'GET',
      success: function(data) {
        var arrayAlbum = data.response;
        generaSelect(arrayAlbum);
        stampAlbum(arrayAlbum);
      },
      error: function() {
        alert('Errore');
      }
    }
  );

  // Quando cambio l'opzione della select dei generi musicali
  //  --> visualizzo solo gli album con classe uguale
  //      al genere musicale selezionato
  //      e nascondo tutti gli altri
  //  --> quando la select è sull'opzione di default 'Tutti'
  //      mostro tutti quanti gli album
  $('.generi-musicali').change(
    function() {
      var genereMusicale = $(this).val();

      if (genereMusicale == 'default') {
        $('.cd').show();
      } else {
        $('.cd').hide();
        $('.cd.' + genereMusicale).show();
      }
    }
  );
  // -------------------- FINE LOGICA -------------------- //

  // -------------------- FUNZIONI -------------------- //

  // Funzione che stampa il template di album musicali con Handlebars
  // gli passo come argomento un array di oggetti album
  function stampAlbum(arrayObjs) {

    var source = $("#cd-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < arrayObjs.length; i++) {

      var singoloAlbum = arrayObjs[i];
      var html = template(singoloAlbum);
      $('.cds-container').append(html);
    }
  }

  // Funzione che genera la select di generi musicali NON RIPETUTI con Handlebars
  // gli passo come argomento un array di oggetti album
  function generaSelect(arrayObjs) {

    var source = $("#generi-template").html();
    var template = Handlebars.compile(source);

    // Creo un array di appoggio per estraplare i generi musicali degli oggetti album.
    // Lo utilizzerò per evitare di inserire
    // generi musicali già presenti nella select html
    var arrayGeneriMusicali = [];

    // ciclo ogni album per leggere la chiave 'genre'
    for (var i = 0; i < arrayObjs.length; i++) {

      var singoloAlbum = arrayObjs[i];
      var singoloGenere = singoloAlbum.genre;

      // controllo che la chiave 'genre' letta nell'oggetto
      // non sia inclusa nell'array di appoggio
      // se vero
      //    --> aggiungo il genere musicale all'array
      //    --> creo un nuovo oggetto che avrà come chiave
      //        il genere aggiungto in precedenza all'array
      //    --> infine do in pasto il nuovo oggetto alla funzione template()
      //        che va a compilare il placeholder nel template html
      //    --> appendo il template compilato nella select html
      // altrimenti non faccio nulla e vado avanti col ciclo for
      if (!(arrayGeneriMusicali.includes(singoloGenere))) {
        arrayGeneriMusicali.push(singoloGenere);

        var singoloGenereObj = {
          genere: singoloGenere
        }
        var html = template(singoloGenereObj);
        $('.generi-musicali').append(html);
      }
    }
  }
  // -------------------- FINE FUNZIONI -------------------- //
});
