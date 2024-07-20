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

export const useSharedState = (initialValue: Value) => {
    const [localState, setLocalState] = useState<Value>(initialValue);

    // Sync shared state to local state
    // useEffect(() => {
    //     SharedState.value = value;
    // setLocalValue(value);
    //     setLocalState({ ...SharedState.value });
    // }, []);

    // Sync local state to shared state
    useEffect(() => {
        SharedState.value = { ...localState };
    }, [localState]);

    return { localState, setLocalState };
};



