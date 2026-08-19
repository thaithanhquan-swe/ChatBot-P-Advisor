const AuthField = ({ label, children }) => {
  return (
    <div>
      <label className='mb-1.5 block text-[13.5px] font-medium text-gray-700'>{label}</label>
      {children}
    </div>
  );
};

export default AuthField;
