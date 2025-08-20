import type { FieldError } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

export default function TextInput({ label, error, ...rest }: Props) {
  return (
    <div style={{ marginBottom: 8 }}>
      <label style={{ display: 'block', fontWeight: 600 }}>{label}</label>
      <input {...rest} style={{ padding: 6, width: '100%' }} />
      {error && <div style={{ color: 'crimson', fontSize: 12 }}>{error.message}</div>}
    </div>
  );
}
