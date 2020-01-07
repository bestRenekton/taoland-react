import { useState, useCallback } from 'react';


// 使用
// let [title, setTitle, titleProps] = useInputValue('jim');
// return <input {...titleProps} />;

export function useInputValue(initialValue) {
    let [value, setValue] = useState(initialValue);
    let onChange = useCallback((event) => {
        setValue(event.currentTarget.value);
    }, []);

    return [value, setValue, { value, onChange }];
}
