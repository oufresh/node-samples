import React, { useState, useCallback } from "react";
import axios from "axios";

const url = "rest/hello";

export const Call: React.FC = () => {
    const [response, setResponse] = useState("");
    const onClick = useCallback(async () => {
      try {
        setResponse("Calling " + url);
        const resp = await axios.get(url);
        if (resp.status === 200)
          setResponse(resp.data);
        else setResponse("Call error with status: " + resp.status);
      } catch (e) {
        setResponse("Call " + url + ", error!!");
      }
    },[]);
    return <fieldset>
        <legend><strong>Test call api</strong></legend>
        <div style={{ marginBottom: "15px" }}>
            <label style={{ marginRight: "20px" }}>Click to call /rest/hello on app-b</label>
            <button className="App-button" onClick={onClick}>Go</button>
        </div>
        <div style={{ minHeight: "40px" }}>{response}</div>
    </fieldset>
}