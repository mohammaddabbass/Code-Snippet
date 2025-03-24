import React, { useState } from "react";
import CodeBlock from "../CodeBlock";
import './styles.css';

const SnippetCard = ({ title, language, code, tags }) => {
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

            <CodeBlock code={code} />

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

// Fake Snippet Data
const fakeSnippets = [
    {
        title: "Fibonacci Sequence",
        language: "Python",
        code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b`,
        tags: ["algorithm", "math"]
    },
    {
        title: "Hello World",
        language: "JavaScript",
        code: `function hello() {
    console.log("Hello, World!");
}`,
        tags: ["beginner", "console"]
    },
    {
        title: "Sorting Algorithm",
        language: "C++",
        code: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1])
                swap(arr[j], arr[j+1]);
}`,
        tags: ["sorting", "algorithm", "C++"]
    }
];

const SnippetList = () => {
    return (
        <div>
            {fakeSnippets.map((snippet, index) => (
                <SnippetCard 
                    key={index}
                    title={snippet.title}
                    language={snippet.language}
                    code={snippet.code}
                    tags={snippet.tags}
                />
            ))}
        </div>
    );
};

export default SnippetList;
