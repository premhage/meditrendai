/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Docmed Blue Palette
                primary: {
                    DEFAULT: '#0EA5E9', // Bright Medical Blue
                    dark: '#0284C7',    // Hover
                    light: '#E0F2FE',   // Backgrounds
                    extraLight: '#F0F9FF', // Subtle BGs
                },
                // Status Colors
                success: {
                    DEFAULT: '#10B981',
                    light: '#D1FAE5',
                },
                warning: {
                    DEFAULT: '#EF4444',
                    light: '#FEE2E2',
                },
                alert: {
                    DEFAULT: '#F59E0B',
                    light: '#FEF3C7',
                },
                // Typography / Neutrals
                text: {
                    dark: '#1F2937',
                    medium: '#6B7280',
                    light: '#9CA3AF',
                },
                bg: {
                    white: '#FFFFFF',
                    gray: '#F9FAFB',
                }
            },
            boxShadow: {
                'medical': '0 4px 20px rgba(0, 0, 0, 0.08)',
                'medical-hover': '0 8px 30px rgba(14, 165, 233, 0.15)',
            }
        },
    },
    plugins: [],
}
