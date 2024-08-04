import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { SharedState, Value } from '../state';
import useSharedStateSync from '../useShareState';

describe('useSharedStateSync Hook', () => {

  beforeEach(() => {
    // Reset shared state before each test
    SharedState.value = { value: '5' };
  });

  it('should initialize with shared state value if not provided', () => {
    const initialValue: Value = { value: '10' };
    
    const { result } = renderHook(() => useSharedStateSync(initialValue));
    
    expect(result.current[0].value).toBe('5');
    expect(SharedState.value.value).toBe('5');
  });

  it('should initialize with initial value if shared state is empty', () => {
    SharedState.value = { value: '' }; // Simulating empty shared state
    const initialValue: Value = { value: '10' };

    const { result } = renderHook(() => useSharedStateSync(initialValue));

    expect(result.current[0].value).toBe('10');
    expect(SharedState.value.value).toBe('10');
  });

  it('should update shared state and local state correctly', () => {
    const initialValue: Value = { value: '10' };

    const { result } = renderHook(() => useSharedStateSync(initialValue));
    
    act(() => {
      result.current[1]({ value: '20' }); // Update shared state and local state
    });

    expect(result.current[0].value).toBe('20');
    expect(SharedState.value.value).toBe('20');
  });

  it('should sync local state with shared state', () => {
    const initialValue: Value = { value: '10' };

    const { result } = renderHook(() => useSharedStateSync(initialValue));

    act(() => {
      SharedState.setValue({ value: '30' }); // Directly update shared state
    });

    expect(result.current[0].value).toBe('5');
  });
});
