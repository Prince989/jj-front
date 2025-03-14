import React from 'react';

interface Base64ImageProps {
    base64Data: string;
    altText?: string;
}

const Base64Image: React.FC<Base64ImageProps> = ({ base64Data, altText = 'Base64 Image' }) => {
    // Check if base64Data includes the prefix, if not add it
    const base64Image = base64Data.startsWith('data:image/') ? base64Data : `data:image/png;base64,${base64Data}`;

    return (
        <img src={base64Image} alt={altText} style={{ maxWidth: '100%', height: 'auto' }} />
    );
};

export default Base64Image;