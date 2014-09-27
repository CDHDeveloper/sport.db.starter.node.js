
console.log( "hello from sportdb.js" );

var sqlite3 = require('sqlite3');
sqlite3.verbose();

// fix/todo: add read_only mode
var db      = new sqlite3.Database('./football.db');


var sportdb = {};

sportdb.fetchTeamsByEvent = function( event, callback )  {

 var query =
  "SELECT" +
  "  t.[key], " +
  "  t.title, " +
  "  t.code   " +
  "FROM teams t " +
  "  INNER JOIN events_teams et ON et.team_id = t.id " +
  "  INNER JOIN events e ON e.id = et.event_id " +
  "WHERE e.[key] = ?";

  db.all( query, event.key,
           function(err, rows) {
        console.log( "all-complete" );
    if(err !== null) {
      console.log( "error:" + err );
    }
    else
    {
      callback( rows );
    }
   });
};



sportdb.fetchEvents = function( callback )  {

  var query =
   "SELECT" +
   "   e.[key]                    AS key, " +
   "   l.title || ' ' || s.title  AS name " +
   "FROM events e " +
   "     INNER JOIN seasons s ON s.id = e.season_id " +
   "     INNER JOIN leagues l ON l.id = e.league_id";

  db.all( query,
           function(err, rows) {
        console.log( "all-complete" );
    if(err !== null) {
      console.log( "error:" + err );
    }
    else
    {
      callback( rows );
    }
   });
};

// todo/fix: close db - possible? when? how?
// db.close();


module.exports = sportdb;
