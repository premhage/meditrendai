import React from 'react';

const CookiePolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>

            <div className="space-y-8 text-gray-700">
                <section>
                    <p>MediTrend AI uses cookies to improve your user experience and ensure the website functions correctly.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">What are cookies?</h2>
                    <p>Cookies are small text files that are stored on your device when you visit a website. They help the website remember your actions and preferences over a period of time, so you don't have to keep re-entering them whenever you come back.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">How we use cookies</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Necessary Cookies:</strong> These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. Without these cookies, services you have asked for cannot be provided. We do not use these cookies to gather information about you that could be used for marketing or remembering where you have been on the internet.</li>
                        <li><strong>Third-Party Cookies:</strong> We do not use third-party advertising cookies. We may use anonymous analytics cookies to understand how users interact with our site, but currently, no third-party tracking is active.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Managing Cookies</h2>
                    <p>You can control and/or delete cookies as you wish – for details, see <a href="https://aboutcookies.org" className="text-primary hover:underline">aboutcookies.org</a>. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
                </section>

                <p className="mt-8 text-sm text-gray-500">Last updated: February 2026</p>
            </div>
        </div>
    );
};

export default CookiePolicy;
