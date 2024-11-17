'use client';
import { useState } from 'react';

interface QuestionProps {
    slug: string;
}

const Question = ({ slug }: QuestionProps) => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);
        setError(null);

        try {
            const res = await fetch('/ai/question-blog-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, question }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response from AI');
            }

            const data = await res.json();
            setResponse(data.answer || 'No response received');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="question-component">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label htmlFor="question" className="text-lg font-semibold">
                    TLDR; 🤔 what do you want to know?
                </label>
                <input
                    type="text"
                    id="question"
                    name="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Your question about this article..."
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Ask'}
                </button>
            </form>

            {response && (
                <div className="mt-4 p-4 border rounded bg-green-50">
                    <p className="font-semibold">AI Response:</p>
                    <p>{response}</p>
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 border rounded bg-red-50 text-red-700">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Question;