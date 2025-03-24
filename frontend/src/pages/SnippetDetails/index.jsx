import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import CodeBlock from "../../components/CodeBlock";
import { request } from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enums/request.methods";
import "./styles.css";

const SnippetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCode, setEditedCode] = useState("");

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const token = localStorage.getItem("bearer_token");
        const response = await request({
          method: requestMethods.GET,
          route: `/user/get-snippet/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.success) {
            console.log(response.data)
          setSnippet(response.data);
          setEditedCode(response.data.code);
        } else {
          setError(response.message || "Failed to fetch snippet");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await request({
        method: requestMethods.POST,
        route: `/user/snippet/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { 
            title: snippet.title,      
            language: snippet.language, 
            code: editedCode, 
         },
      });
      console.log(response);
      if (response.success) {
        setSnippet(prev => ({ ...prev, code: editedCode }));
        setEditMode(false);
      } else {
        setError(response.message || "Failed to update snippet");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      try {
        const token = localStorage.getItem("bearer_token");
        const response = await request({
          method: requestMethods.DELETE,
          route: `/user/delete-snippet/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.success) {
          navigate("/");
        } else {
          setError(response.message || "Failed to delete snippet");
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="loading-container flex column justify-center align-center"><p>Loading...</p></div>;
  if (error) return <div>Error: {error}</div>;
  if (!snippet) return <div>Snippet not found</div>;

  return (
    <div className="snippet-details-page flex column justify-center align-center">
      <Header />
      <div className="details-container flex column justify-evenly a;ign-center">
        <div className="details-header">
          <h2 className="card-title">{snippet.title}</h2>
          <span className="language-tag">{snippet.language}</span>
        </div>
        <div className="details-content flex column justify-center align-center">
          {editMode ? (
            <textarea
              className="code-editor"
              value={editedCode}
              onChange={(e) => setEditedCode(e.target.value)}
            />
          ) : (
            <CodeBlock code={snippet.code} />
          )}
        </div>
        <div className="details-actions">
          {editMode ? (
            <div className="action-buttons">
              <button className="btn save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="btn cancel-btn" onClick={handleEditToggle}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="action-buttons">
              <button className="btn edit-btn" onClick={handleEditToggle}>
                Edit
              </button>
              <button className="btn delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default SnippetDetails;
