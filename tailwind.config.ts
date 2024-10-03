import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        screens: {
            tiny: '350px',
            phone: '400px',
            mobile: '450px',
            tablet: '600px',
            lablet: '700px',
            taptop: '800px',
            laptop: '1000px',
            desktop: '1200px',
            monitor: '1400px',
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'spin-cw': 'spin-cw 0.2s linear infinite',
            },
            colors: {
                background: '#001E44',
                'background-light': '#00295E',
                'background-lighter': '#00377D',
                'background-lightest': '#0048A4',

                secondary: '#FFD500',
                'secondary-hover': '#FFE563',
                'secondary-light': '#FFF6C7',
            },
            maxWidth: {
                'max-content': '1280px',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
