// components/ui/spinner.tsx

const Spinner = ({ size = "6", color = "green" }: { size?: string, color?: string }) => {
  const spinnerSize = size === "large" ? "w-16 h-16" : "w-8 h-8";  // Use custom size (large or default)
  const spinnerColor = color === "green" ? "border-t-green-400" : "border-t-blue-400";  // Set color (green or blue)

  return (
    <div className={`flex justify-center items-center`}>
      <div
        className={`${spinnerSize} animate-spin border-4 border-t-4 ${spinnerColor} border-solid rounded-full`}
      ></div>
    </div>
  );
};

export default Spinner;
