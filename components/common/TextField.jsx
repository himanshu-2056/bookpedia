const TextField = ({ label, type, name, value, onChange, error, touched }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={name}
        value={value}
        onChange={onChange}
        className="'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'"
      />
      {touched && error && <div className="text-red-500 text-xs">{error}</div>}
    </div>
  );
};

export default TextField;
