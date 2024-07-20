// import { useEffect, useState } from "react";
// import { SharedState } from "./state";

// export const useSharedState = () => {
//     const [localState, setLocalState] = useState({ ...SharedState.value });
//     useEffect(() => {
//         if (JSON.stringify(localState) !== JSON.stringify(SharedState.value)) {
//             setLocalState({ ...SharedState.value });
//         }
//     }, [SharedState.value]);


//     return { localState, setLocalState }
// }

import { useEffect, useState } from "react";
import { SharedState, Value } from "./state";
console.log("shared stat at hook", SharedState)
export const useSharedState = () => {
    const [localState, setLocalState] = useState<Value>({ ...SharedState.value });

    useEffect(() => {
        const syncState = () => {
            if (JSON.stringify(localState) !== JSON.stringify(SharedState.value)) {
                setLocalState({ ...SharedState.value });
            }
        };

        syncState();

        const interval = setInterval(syncState, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        SharedState.value = { ...localState };
    }, [localState]);

    return { localState, setLocalState };
};
