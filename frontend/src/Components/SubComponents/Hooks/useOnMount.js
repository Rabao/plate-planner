import {useEffect, useRef } from "react";

export const useOnMount = (fn) => {
    const fnRef = useRef(fn);
    fnRef.current = fn;

    useEffect(
        () => () => {
            fnRef.current();
        },
        []
    ); 
};