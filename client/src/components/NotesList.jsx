import React, { useEffect } from "react";
import { Note } from "./Note";

export const NotesList = ({ notes }) => {
  return (
    <div className="notes">
      {[...notes].length <= 0 && (
        <h2 style={{ color: "white" }}>All Out of Notes</h2>
      )}
      {[...notes].reverse().map((note, ix) => (
        <Note key={ix} note={note} />
      ))}
    </div>
  );
};
