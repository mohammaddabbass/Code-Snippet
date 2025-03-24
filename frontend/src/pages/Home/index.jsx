import React, { useEffect, useState } from 'react';
import './styles.css';
import SnippetCard from '../../components/SnippetCard';
import Header from '../../components/Header';
import { request } from '../../utils/remote/axios';
import { requestMethods } from '../../utils/enums/request.methods';

const Home = () => {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const token = localStorage.getItem('bearer_token');
                const response = await request({
                    method: requestMethods.GET,
                    route: '/user/get-snippets',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(response)

                if (response.success) {
                    setSnippets(response.data.data);
                } else {
                    setError(response.message || 'Failed to fetch snippets');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, []);

    if (loading) {
        return <div className="loading-container flex column justify-center align-center"><p>Loading...</p></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='home-page'>
            <Header/>
            <div className="cards-container flex justify-center align-center">
                {snippets.map(snippet => (
                    <SnippetCard
                        key={snippet.id}
                        id={snippet.id}
                        title={snippet.title}
                        language={snippet.language}
                        code={snippet.code}
                        tags={snippet.tags.map(tag => tag.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;