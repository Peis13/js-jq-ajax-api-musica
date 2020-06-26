// Attraverso una chiamata ajax all’Api di boolean avremo a
// disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus: Creare una select con i seguenti generi: pop, rock,
// metal e jazz. In base a cosa scegliamo nella select vedremo i
// corrispondenti cd.
// Endpoint: https://flynn.boolean.careers/exercises/api/array/music

$(document).ready(function() {

  $.ajax(
    {
      url: 'https://flynn.boolean.careers/exercises/api/array/music',
      method: 'GET',
      success: function(data) {
        var arrayAlbum = data.response;
        generAlbum(arrayAlbum);
      },
      error: function() {
        alert('Errore');
      }
    }
  );

  // Funzione che stampa gli album musicali con Handlebars
  // gli passo come argomento un array di oggetti album
  function generAlbum(arrayObjs) {

    var source = $("#cd-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < arrayObjs.length; i++) {

      var singoloAlbum = arrayObjs[i];
      var html = template(singoloAlbum);
      $('.cds-container').append(html);
    }
  }
});
