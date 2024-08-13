// Import the necessary libraries
import fetch from 'node-fetch';

// This is the API route that will handle the request to DeepAI
export default async function handler(req, res) {
    // Only handle POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { text } = req.body;

    // Validate input
    if (!text) {
        return res.status(400).json({ message: 'Text input is required' });
    }

    try {
        // Call the DeepAI text-to-image API
        const response = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'Api-Key': 'ce485ce3-2bb5-49ab-9676-b838a12b4fdb',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `text=${encodeURIComponent(text)}`,
        });

        const data = await response.json();

        // Send back the generated image URL
        res.status(200).json({ imageUrl: data.output_url });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}
