interface CloseButtonProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    ariaLabel?: string;
    onClick?: () => void;
}

export default function CloseButton({
    className = "",
    size = "md",
    ariaLabel = "Close",
    onClick,
}: CloseButtonProps) {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10"
    };

      const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

    return (
         <button
      className={`flex ${sizeClasses[size]} items-center justify-center rounded-full bg-gray-50 dark:hover:bg-gray-800 dark:bg-transparent transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300 hover:scale-105 shadow-lg ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <svg
        className={`${iconSizeClasses[size]} text-gray-600 dark:text-white`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    );
}