const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const verifyAuth = require('../middleware/verifyAuth');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', verifyAuth, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { photo_urls, format, raw_content, color_theme, title, place, trip_date, companions } = req.body;

        if (!photo_urls || photo_urls.length < 4 || photo_urls.length > 50) {
            return res.status(400).json({ error: 'Please provide between 4 and 50 photos' });
        }

        const prompt = `
You are creating a ${format} page layout for a travel diary app.
Trip details: Place: ${place || 'unspecified'}, Date: ${trip_date || 'unspecified'}, Companions: ${companions || 'unspecified'}.
The user wrote this about their trip: "${raw_content}"

Return ONLY valid JSON (no markdown, no backticks) in this exact shape:
{
  "pages": [
    { "type": "cover", "title": "a short catchy trip title" },
    { "type": "text", "content": "a polished, engaging paragraph based on what the user wrote" },
    { "type": "photo_caption", "caption": "a short caption for their photo" }
  ]
}
`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        let aiText = result.response.text();
        aiText = aiText.replace(/```json|```/g, '').trim();
        const aiPages = JSON.parse(aiText);

        const { data, error } = await supabase
            .from('collections')
            .insert([{
                user_id,
                photo_urls,
                format,
                raw_content,
                color_theme,
                place,
                trip_date,
                companions,
                title: title || aiPages.pages[0]?.title || 'My Trip',
                ai_pages: aiPages.pages
            }])
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/', verifyAuth, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { data, error } = await supabase
            .from('collections')
            .select('*')
            .eq('user_id', user_id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', verifyAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('collections')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        if (data.user_id !== req.user.id) {
            return res.status(403).json({ error: 'You do not have access to this collection' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;