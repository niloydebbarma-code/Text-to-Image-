import { useState } from 'react';

export default function Home() {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();
            setImageUrl(data.imageUrl);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Text to Image Generator</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
                style={{ width: '300px', padding: '10px' }}
            />
            <button onClick={generateImage} disabled={loading} style={{ padding: '10px 20px', marginLeft: '10px' }}>
                {loading ? 'Generating...' : 'Generate Image'}
            </button>
            {imageUrl && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Generated Image:</h2>
                    <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
}
