import { renderHook, act } from '@testing-library/react-hooks';
import { SharedState } from '../state';
import useSharedStateSync from '../useShareState';

describe('useSharedStateSync', () => {
    beforeEach(() => {
        SharedState.value = { value: 'initial' };
        SharedState.listeners.clear();
    });

    it('should initialize with the initial value', () => {
        const { result } = renderHook(() => useSharedStateSync({ value: 'initial' }));
        expect(result.current[0].value).toBe('initial');
    });

    it('should sync local value with shared value on shared value update', () => {
        const { result } = renderHook(() => useSharedStateSync({ value: 'initial' }));

        act(() => {
            SharedState.setValue({ value: 'new value' });
        });

        expect(result.current[0].value).toBe('new value');
    });

    it('should update shared value when local value is updated', () => {
        const { result } = renderHook(() => useSharedStateSync({ value: 'initial' }));

        act(() => {
            result.current[1]({ value: 'another new value' });
        });

        expect(SharedState.value.value).toBe('another new value');
        expect(result.current[0].value).toBe('another new value');
    });
});
