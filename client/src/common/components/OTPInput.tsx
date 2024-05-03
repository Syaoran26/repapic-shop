import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  FocusEvent,
  KeyboardEvent,
  memo,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FormHelperText, OutlinedInput } from '@mui/material';

interface OTPInputProps {
  onChange?: (value: string) => void;
}

const OTPInput: FC<OTPInputProps> = ({ onChange }) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState<string>('');

  useLayoutEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const sendResult = () => {
    const res = inputsRef.current.map((input) => input.value).join('');
    onChange?.(res);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const nextElementSibling = event.target.parentElement?.nextElementSibling?.firstChild as HTMLInputElement;

    setError('');
    inputsRef.current.forEach((el) => {
      if (!el.value) {
        setError('Mã xác nhận phải gồm 6 chữ số');
        return;
      }
    });

    if (value.length > 1) {
      event.target.value = value.charAt(0);
      nextElementSibling?.focus();
    } else {
      if (value.match('[0-9]{1}')) {
        nextElementSibling?.focus();
      } else {
        event.target.value = '';
      }
    }
    sendResult();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    const target = event.target as HTMLInputElement;
    const previousElementSibling = target.parentElement?.previousElementSibling?.firstChild as HTMLInputElement;
    if (key === 'Backspace') {
      target.value = '';
      previousElementSibling?.focus();
      event.preventDefault();
    }
    sendResult();
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData('Text');
    if (pastedValue.match('[0-9]{6}')) {
      for (let i = 0; i < pastedValue.length; i++) {
        inputsRef.current[i].value = pastedValue.charAt(i);
      }
      setError('');
    }
    sendResult();
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-3">
        {Array.from(Array(6).keys()).map((i) => (
          <OutlinedInput
            error={!!error}
            color="default"
            key={i}
            placeholder="-"
            type="tel"
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center' },
            }}
            inputRef={(el) => {
              inputsRef.current[i] = el;
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onInput={handleChange}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error && (
        <FormHelperText className="px-4" error={!!error}>
          {error}
        </FormHelperText>
      )}
    </>
  );
};

export default memo(OTPInput);
