import React from "react";
import "./styles.css";

const CodeBlock = ({ code }) => {
    return (
        <div className="code-container">
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;