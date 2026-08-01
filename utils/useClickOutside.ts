/**
 * @file useClickOutside
 * 
 * A custom React hook that triggers a callback when a click event occurs outside a specified element.
 * It listens for click events on the document and checks if the click happened outside the provided element's reference.
 * This hook is useful for implementing click outside functionality, such as closing a dropdown or modal when clicking outside of it.
 */
import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

const useClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: Event) => void,
) => {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current;
            if (!el || el.contains((event?.target as Node) || null)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler]);
};

export default useClickOutside;
