import React from 'react';

export const MessageBubble = ({ text, isTitle = false, className = "bg-white" }: { text: string; isTitle?: boolean; className?: string }) => (
    <div className={`font-sans text-lg leading-relaxed p-6 rounded-win shadow-fluent border border-gray-200 animate-slide-up max-w-lg mx-auto ${isTitle ? 'text-pastel-blue-500 font-bold' : 'text-brand-dark'} ${className}`}>
        {text}
    </div>
);