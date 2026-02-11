import React from 'react';
import { Upload, Cpu, FileText, Activity } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <Upload className="w-8 h-8 text-primary" />,
            title: "1. Upload Your Report",
            description: "Simply upload a PDF or photo of your medical lab report. We support most standard formats."
        },
        {
            icon: <Cpu className="w-8 h-8 text-primary" />,
            title: "2. AI Analysis",
            description: "Our advanced AI scans the document, identifying key health metrics and comparing them against standard reference ranges."
        },
        {
            icon: <FileText className="w-8 h-8 text-primary" />,
            title: "3. Get Explanations",
            description: "Receive a clear, plain-English explanation of your results. No more confusing medical jargon."
        },
        {
            icon: <Activity className="w-8 h-8 text-primary" />,
            title: "4. Track Trends",
            description: "Upload multiple reports over time to see how your health metrics are changing with our interactive charts."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">How MediTrend AI Works</h1>
                <p className="text-xl text-gray-600">From complex lab data to clear health insights in seconds.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {steps.map((step, index) => (
                    <div key={index} className="flex gap-6 items-start">
                        <div className="flex-shrink-0 p-4 bg-blue-50 rounded-xl">
                            {step.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to understand your health?</h3>
                <a href="/" className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
                    Analyze My Report Now
                </a>
            </div>
        </div>
    );
};

export default HowItWorks;
