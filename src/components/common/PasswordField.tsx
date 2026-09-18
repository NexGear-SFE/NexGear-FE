import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordFieldProps = {
  label: string;
  id: string;
};

export function PasswordField({ label, id }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-caption text-[var(--text-600)] uppercase tracking-widest mb-1.5 font-semibold"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className="input-gaming w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-600)] hover:text-[var(--text-900)] transition-mechanical flex items-center justify-center p-1"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
