import React from 'react';

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 2026</p>

            <div className="space-y-8 text-gray-700">
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">1. Data Storage</h2>
                    <p>MediTrend AI prioritizes your privacy. We <strong>do not store</strong> user-uploaded medical files permanently on our servers. Files are processed in memory and are deleted immediately after analysis.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">2. Processing of Medical Data</h2>
                    <p>When you upload a report, it is temporarily processed by our OCR and NLP engines to extract text. We use secure channels to transmit this data for AI analysis. The extracted data is only used to generate the report shown to you.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">3. Third-Party AI APIs</h2>
                    <p>We utilize trusted third-party AI providers (Google Gemini) to generate plain-English explanations. Data sent to these providers is anonymized where possible and is subject to their strict data usage policies.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">4. Security</h2>
                    <p>We implement strict file validation (signature checking) to prevent malicious uploads. All data transmission occurs over encrypted HTTPS connections.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">5. Cookies</h2>
                    <p>We use essential cookies only to maintain user session state. No tracking or advertising cookies are used.</p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
