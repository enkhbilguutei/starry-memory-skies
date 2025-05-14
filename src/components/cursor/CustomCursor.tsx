import { useEffect, useState } from "react";

/**
 * CustomCursor component that creates a smaller custom cursor
 * by using a DOM element that follows the mouse
 */
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create cursor elements
    const cursorContainer = document.createElement("div");
    cursorContainer.className = "custom-cursor-container";

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";

    cursorContainer.appendChild(cursor);
    document.body.appendChild(cursorContainer);

    // Function to update cursor position
    const updateCursorPosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Position the cursor at the exact mouse position
      // The CSS transform: translate(-50%, -50%) will center it
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;

      setPosition({ x, y });
      setIsVisible(true);
    };

    // Function to check if element is interactive
    const isInteractive = (element: Element | null): boolean => {
      if (!element) return false;

      const interactiveElements = [
        "A",
        "BUTTON",
        "INPUT",
        "SELECT",
        "TEXTAREA",
      ];

      const interactiveAttributes = ["role"];

      const interactiveClasses = ["interactive"];

      // Check tag name
      if (interactiveElements.includes(element.tagName)) return true;

      // Check attributes
      for (const attr of interactiveAttributes) {
        if (
          element.hasAttribute(attr) &&
          element.getAttribute(attr) === "button"
        )
          return true;
      }

      // Check classes
      for (const cls of interactiveClasses) {
        if (element.classList.contains(cls)) return true;
      }

      // Check parent elements (up to 3 levels)
      if (element.parentElement && element !== document.body) {
        return isInteractive(element.parentElement);
      }

      return false;
    };

    // Function to check if cursor is over an interactive element
    const checkInteractiveElements = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const isElementInteractive = isInteractive(element);

      if (isElementInteractive) {
        cursor.classList.add("pointer");
        setIsPointer(true);
      } else {
        cursor.classList.remove("pointer");
        setIsPointer(false);
      }
    };

    // Mouse movement event listener
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e);
      checkInteractiveElements(e);
    };

    // Mouse leave event listener
    const handleMouseLeave = () => {
      setIsVisible(false);
      cursor.style.opacity = "0";
    };

    // Mouse enter event listener
    const handleMouseEnter = () => {
      setIsVisible(true);
      cursor.style.opacity = "1";
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add class to body to hide default cursor
    document.body.classList.add("custom-cursor-active");

    // Clean up
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeChild(cursorContainer);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default CustomCursor;
