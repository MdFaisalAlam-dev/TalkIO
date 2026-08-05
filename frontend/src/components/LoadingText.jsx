const text = "TalkIO";

const LoadingText = () => {
  return (
    <>
      <div className="mt-10 text-gray-400 tracking-[0.4em] uppercase text-sm font-medium overflow-hidden">
        <div className="welcome-line">
          Welcome To
        </div>
      </div>

      <div className="loading-title">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="loading-letter"
          >
            {letter}
          </span>
        ))}
      </div>
    </>
  );
};

export default LoadingText;