import React, { useState } from "react";
import CodeBlock from "../CodeBlock";
import {Link } from "react-router-dom";

import './styles.css';

const SnippetCard = ({id, title, language, code, tags }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [copyStatus, setCopyStatus] = useState("⎘ Copy");

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopyStatus("✓ Copied!");
        setTimeout(() => setCopyStatus("⎘ Copy"), 2000);
    };

    return (
        <div className="snippet-card">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className="language-tag">{language}</span>
            </div>
            <Link to={`/snippets/${id}`} className="snippet-link">
            <CodeBlock code={code} />
            </Link>
            <div className="card-footer">
                <div className="tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
                <div className="actions">
                    <button
                        className={`favorite-btn ${isFavorite ? "active" : ""}`}
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        ♥
                    </button>
                    <button className='copy-btn' onClick={handleCopy}>
                        {copyStatus}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default SnippetCard;
