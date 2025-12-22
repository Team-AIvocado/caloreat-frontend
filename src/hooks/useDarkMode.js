import { useState, useEffect } from "react";

/**
 * Detects if the 'dark' class is present on the document element.
 * Updates in real-time using MutationObserver.
 * @returns {boolean} isDarkMode
 */
export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        // Initial check
        setIsDarkMode(document.documentElement.classList.contains("dark"));

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    setIsDarkMode(document.documentElement.classList.contains("dark"));
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return isDarkMode;
};
