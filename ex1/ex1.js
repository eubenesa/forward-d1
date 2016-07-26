var NotesManager = (function() {
  var notes = [];

  function addNote(note) {
    $('#notes').prepend(
      $('<a href=\'#\'></a>')
      .addClass('note')
      .text(note)
    );
  }

  function addCurrentNote() {
    var currentNote = $('#note').val();

    if (currentNote) {
      notes.push(currentNote);
      addNote(currentNote);
      $('#note').val('');
    }
  }

  function showHelp() {
    $('#help').show();

    document.addEventListener('click', function __handler__(e) {
      document.removeEventListener('click', __handler__, true);
      hideHelp();

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }, true);
  }

  function hideHelp() {
    $('#help').hide();
  }

  function loadNotes(data) {
    notes = notes.concat(data);
  }

  function init() {
    var $notes = $('#notes');

    // build the list from the "database"
    var html = '';
    for (let i = 0; i < notes.length; i++) {
      html += `<a href=\'#\' class=\'note\'>${notes[i]}</a>`;
    }
    $notes.html(html);

    // listen to "help" button
    $('#open_help').bind('click', function(e) {
      if (!$('#help').is(':visible')) {
        showHelp();
      }
    });

    // listen to "add" button
    $('#add_note').bind('click', function(e) {
      addCurrentNote();
    });

    // listen for <enter> in text box
    $('#note').bind('keypress', function(e) {
      if (e.which === 13) {
        addCurrentNote();
      }
    });

    // listen for clicks outside the notes box
    $(document).bind('click', function(e) {
      $notes.removeClass('active');
      $notes.children('.note').removeClass('highlighted');
    });

    // listen for clicks on note elements
    $notes.on('click', '.note', function(e) {
      $notes.addClass('active');
      $notes.children('.note').removeClass('highlighted');
      $(e.target).addClass('highlighted');

      e.preventDefault();
      e.stopPropagation();
    });
  }

  var publicAPI = {
    init: init,
    loadNotes: loadNotes
  };

  return publicAPI;
})();

NotesManager.loadNotes([
  'This is the first note I\'ve taken!',
  'Now is the time for all good men to come to the aid of their country.',
  'The quick brown fox jumped over the moon.'
]);

$(document).ready(function() {
  NotesManager.init();
});
