module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
            },
            colors: {
                background: 'var(--color-background)',
                foreground: 'var(--color-foreground)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                gray: 'var(--color-gray)',
                action: 'var(--color-action)',
            },
            boxShadow: {
                "custom-secondary": "var(--shadow-custom-secondary)",
                "custom-accent": "var(--shadow-custom-accent)",
            },
        },
    },
    plugins: [],
}