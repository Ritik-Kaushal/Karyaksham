import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalPortal({ children }) {
    const [isPortalMounted, setPortalMounted] = useState(false);

    useEffect(() => {
        setPortalMounted(true);

        // Clean up the portal when the component is unmounted
        return () => {
            setPortalMounted(false);
        };
    }, []);
    
    return (
        isPortalMounted && createPortal(children, document.getElementById("modal-div"))
    )
}
