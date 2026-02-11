import React from 'react';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About MediTrend AI</h1>
                <p className="text-xl text-gray-600">Making healthcare accessible and understandable.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1576091160550-2187d8001889?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Medical Analysis"
                        className="rounded-xl shadow-lg w-full h-64 object-cover"
                    />
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>
                        MediTrend AI was born from a simple realization: medical reports are often confusing and intimidating for patients.
                    </p>
                    <p>
                        Our mission is to bridge the gap between complex lab data and patient understanding. We believe everyone deserves to know what their health numbers mean without needing a medical degree.
                    </p>
                    <p>
                        By leveraging advanced AI (like Google Gemini and OCR technology), we translate technical jargon into simple, actionable insights. We empower you to take charge of your health.
                    </p>
                </div>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Developed by Team TechSutra</h2>
                <div className="max-w-2xl mx-auto text-gray-600">
                    <p className="mb-4">
                        We are a passionate team of developers dedicated to building impactful solutions for the Hackathon.
                        Our expertise spans full-stack development, AI integration, and user-centric design.
                    </p>
                    <div className="flex justify-center gap-4 mt-8">
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Full Stack Development</span>
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Artificial Intelligence</span>
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Health Tech</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
