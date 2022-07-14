import React, { useEffect } from "react";
import { Note } from "./Note";

export const NotesList = ({ notes }) => {
  return (
    <div className="notes">
      {[...notes].reverse().map((note, ix) => (
        <Note key={ix} note={note} />
      ))}
    </div>
  );
};
