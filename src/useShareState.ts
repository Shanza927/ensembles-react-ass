import { useState, useEffect } from 'react';
import { SharedState, Value } from './state';

const useSharedStateSync = (initialValue: Value) => {
    const [localValue, setLocalValue] = useState<Value>(() => {
        if (!SharedState.value.value) {
            SharedState.value = initialValue;
        }
        return { ...SharedState.value };
    });

    const updateSharedState = (newValue: Value) => {
        SharedState.setValue(newValue);
        setLocalValue(newValue);
    };

    useEffect(() => {
        if (localValue.value !== SharedState.value.value) {
            setLocalValue({ ...SharedState.value });
        }
    }, [SharedState.value]);

    return [localValue, updateSharedState] as const;
};

export default useSharedStateSync;
