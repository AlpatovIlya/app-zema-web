import React, {FC} from 'react';

type CustomProps = {
    label?: string;
    error?: string | null | undefined;
    wrapperStyle?: string;
}

type Props = CustomProps & React.InputHTMLAttributes<HTMLInputElement>

const InputField: FC<Props> = ({
  label, error, wrapperStyle, className, ...props}) => {
  return (
    <div className={`${wrapperStyle} `}>
      {label && <label htmlFor={props.id}
        className={`block text-xs 
            text-gray-700 ${error ? 'text-red-400': ''}`}>{label}</label>}
      <input {...props}
        className={`text-green-900 
            outline-none p-2 
            rounded-sm w-full duration-200
            border-2 border-gray-200
            border-solid ${error ? 'border-red-400': ''}`}
        autoComplete="off"/>
      {error && <div className='text-red-400 text-xs'>{error}</div>}
    </div>
  );
};

export default InputField;

