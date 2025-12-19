export const Button = ({
  onClick,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
}) => {
  const handleClick = (e) => {
    onClick(e);
  };

  const colors = {
    primary: '[#ADC533]',
    black: 'black',
    white: 'white',
    transparent: 'transparent',
  };

  const btnVariant = {
    primary: `bg-${colors.primary} text-${colors.black} outline-${colors.primary}`, // Primary
    secondary: `bg-${colors.black} text-${colors.white} outline-${colors.black}`, // Secondary
    outlined: `bg-${colors.transparent} text-${colors.black} outline-${colors.black}`, // Outlined
  };

  const btnSize = {
    sm: 'text-sm px-3 py-2',
    md: 'text-md px-4 py-3',
    lg: 'text-lg px-6 py-4',
  };

  return (
    <button
      className={`w-full uppercase leading-loose tracking-wider font-medium flex justify-center sm:justify-between items-center gap-2 cursor-pointer group outline-2  -outline-offset-2 ${className} ${btnVariant[variant]} ${btnSize[size]} `}
      onClick={handleClick}
    >
      <div
        className={`w-6 group-hover:w-0 h-[1.5px] bg-${variant === 'secondary' ? 'white' : 'black'} transition-all duration-300 ease-in-out`}
      />
      <div id='btn-text'>{children}</div>
      <div
        className={`w-0 group-hover:w-6 h-[1.5px] bg-${variant === 'secondary' ? 'white' : 'black'} transition-all duration-300 ease-in-out`}
      />
    </button>
  );
};
