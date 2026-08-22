const AuthInput = ({ icon: Icon, rightElement, className = '', ...props }) => {
  return (
    <div className='relative'>
      {Icon && (
        <Icon
          size={17}
          className='pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400'
        />
      )}

      <input
        {...props}
        className={`h-12 w-full rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-(--primary-color-border) focus:ring-4 focus:ring-(--primary-color-soft) ${
          Icon ? 'pl-11' : 'pl-4'
        } ${rightElement ? 'pr-11' : 'pr-4'} ${className}`}
      />

      {rightElement && (
        <div className='absolute top-1/2 right-3.5 -translate-y-1/2'>{rightElement}</div>
      )}
    </div>
  );
};

export default AuthInput;
