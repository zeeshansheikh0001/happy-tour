module.exports = {
    output: 'export',
    
    eslint: {
        ignoreDuringBuilds: true, // ✅ disables ESLint during `next build`
    },
    reactStrictMode: true,
    images: {
        unoptimized: true,
        // domains: ['images.unsplash.com','plus.unsplash.com','inspirationalgeek.wordpress.com','randomuser.me','placehold.co', 'via.placeholder.com', 'unsplash.com'],
    }
};
