const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <svg className="h-12 w-12 animate-spin " viewBox="0 0 100 100">
          <circle
            fill="none"
            strokeWidth="10"
            className="stroke-secondary opacity-40"
            cx="50"
            cy="50"
            r="40"
          />
          <circle
            fill="none"
            strokeWidth="10"
            className="stroke-primary"
            strokeDasharray="250"
            strokeDashoffset="150"
            cx="50"
            cy="50"
            r="40"
          />
        </svg>
        <p className="mt-4 text-primary font-semibold">Cargando tabla...</p>
      </div>
    </div>
  );
};

export default Loader;
