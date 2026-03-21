import Input from './Input'

function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  rightElement,
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={rightElement ? 'pr-12' : ''}
        />
        {rightElement}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default FormField
