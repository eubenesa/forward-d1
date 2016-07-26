function NotesManager() {
  this.notes = [];
}

NotesManager.prototype.addNote = function(note) {
  this.$notes.prepend($('<a href=\'#\'></a>').addClass('note').text(note));
};

NotesManager.prototype.addCurrentNote = function() {
  var currentNote = this.$newNote.val();

  if (currentNote) {
    this.notes.push(currentNote);
    this.addNote(currentNote);
    this.$newNote.val('');
  }
};

NotesManager.prototype.showHelp = function() {
  var self = this;
  self.$help.show();

  document.addEventListener('click', function __handler__(e) {
    document.removeEventListener('click', __handler__, true);
    self.hideHelp();
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }, true);
};

NotesManager.prototype.hideHelp = function() {
  this.$help.hide();
};

NotesManager.prototype.loadData = function(data) {
  this.notes = this.notes.concat(data);
};

NotesManager.prototype.handleOpenHelp = function(e) {
  if (!this.$help.is(':visible')) {
    e.stopPropagation();
    this.showHelp();
  }
};

NotesManager.prototype.handleAddNote = function(e) {
  this.addCurrentNote();
};

NotesManager.prototype.handleEnter = function(e) {
  if (e.which === 13) {
    this.addCurrentNote();
  }
};

NotesManager.prototype.handleDocumentClick = function(e) {
  this.$notes.removeClass('active');
  this.$notes.children('.note').removeClass('highlighted');
};

NotesManager.prototype.handleNoteClick = function(e) {
  e.preventDefault();
  e.stopPropagation();

  this.$notes.addClass('active');
  this.$notes.children('.note').removeClass('highlighted');
  $(e.target).addClass('highlighted');
};

NotesManager.prototype.init = function(opts) {
  // cache references to the DOM elements we need to manage
  this.$notes = $(opts.notes);
  this.$newNote = $(opts.newNote);
  this.$addNote = $(opts.addNote);
  this.$help = $(opts.help);
  this.$openHelp = $(opts.openHelp);

  // build the initial list from the existing `notes` data
  var html = '';
  for (let i = 0; i < this.notes.length; i++) {
    html += `<a href=\'#\' class=\'note\'>${this.notes[i]}</a>`;
  }
  this.$notes.html(html);

  // listen to "help" button
  this.$openHelp.bind('click', this.handleOpenHelp.bind(this));

  // listen to "add" button
  this.$addNote.bind('click', this.handleAddNote.bind(this));

  // listen for <enter> in text box
  this.$newNote.bind('keypress', this.handleEnter.bind(this));

  // listen for clicks outside the notes box
  $(document).bind('click', this.handleDocumentClick.bind(this));

  // listen for clicks on note elements
  this.$notes.on('click', '.note', this.handleNoteClick.bind(this));
};

var myNotes = new NotesManager();

// assume this data came from the database
myNotes.loadData([
  'This is the first note I\'ve taken!',
  'Now is the time for all good men to come to the aid of their country.',
  'The quick brown fox jumped over the moon.'
]);

$(document).ready(function(){
  myNotes.init({
    notes: '#notes',
    newNote: '#note',
    addNote: '#add_note',
    help: '#help',
    openHelp: '#open_help'
  });
});
