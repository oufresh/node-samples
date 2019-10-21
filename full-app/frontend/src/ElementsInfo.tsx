import React, { useState, useEffect } from "react";

export const ElementsInfo: React.FC<{}> = () => {
    const [elements, setElements] = useState<Array<any> | null>(null);
    useEffect(() => {
        fetch("api/elements").then(r => r.json()).then(els => setElements(els)).catch(e => {
            console.error(e);
            setElements([]);
        })
    }, []);
    return <div>
        <p>{"Elements:" + (elements === null ? "... loading" : elements.length)}</p>
    </div>
}