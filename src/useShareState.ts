import { useState, useEffect } from 'react';
import { SharedState, Value } from './state';

const useSharedStateSync = (initialValue: Value) => {
    const [localValue, setLocalValue] = useState<Value>(() => {
        if (!SharedState.value.value) {
            SharedState.value = initialValue;
        }
        return { ...SharedState.value };
    });

    useEffect(() => {
        const handleChange = () => setLocalValue({ ...SharedState.value });
        SharedState.subscribe(handleChange);

        return () => {
            SharedState.unsubscribe(handleChange);
        };
    }, []);

    const updateSharedState = (newValue: Value) => {
        SharedState.setValue(newValue);
        setLocalValue(newValue);
    };

    return [localValue, updateSharedState] as const;
};

export default useSharedStateSync;
