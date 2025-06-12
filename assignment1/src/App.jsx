import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [lastAction, setLastAction] = useState(null);
  const [typingStartTime, setTypingStartTime] = useState(null);
  const typingTimeoutRef = useRef(null);

  // Handle text changes
  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // If this is the first character after inactivity, set start time
    if (!typingStartTime) {
      setTypingStartTime(new Date());
    }

    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to detect when typing stops
    typingTimeoutRef.current = setTimeout(() => {
      if (typingStartTime) {
        const typingEndTime = new Date();
        setLastAction({
          type: "typing",
          text: newText,
          startTime: typingStartTime,
          endTime: typingEndTime,
          duration: typingEndTime - typingStartTime,
        });
        setTypingStartTime(null);
      }
    }, 1000); // 1 second delay to consider typing stopped
  };

  // Handle paste event
  const handlePaste = (e) => {
    // Get pasted text
    const pastedText = e.clipboardData.getData("text/plain");

    // Set timeout to detect when paste is complete
    setTimeout(() => {
      const pasteEndTime = new Date();
      setLastAction({
        type: "paste",
        text: pastedText,
        endTime: pasteEndTime,
      });
    }, 0);
  };

  useEffect(() => {
    return () => {
      // Clean up timeout on unmount
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h2>Auto-save TextBox</h2>
      <textarea
        value={text}
        onChange={handleChange}
        onPaste={handlePaste}
        rows={10}
        cols={50}
        placeholder="Type or paste text here..."
      />

      {lastAction && (
        <div className="action-info">
          <h3>Last Action:</h3>
          <p>Type: {lastAction.type}</p>
          <p>Text: {lastAction.text}</p>
          {lastAction.type === "typing" && (
            <>
              <p>Started: {lastAction.startTime.toString()}</p>
              <p>Ended: {lastAction.endTime.toString()}</p>
              <p>Duration: {lastAction.duration}ms</p>
            </>
          )}
          {lastAction.type === "paste" && (
            <p>Pasted at: {lastAction.endTime.toString()}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
