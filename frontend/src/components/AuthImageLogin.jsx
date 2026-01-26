import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AuthImageLogin= () => {
    return (
      <div className="lg:flex items-center justify-center bg-base-200 p-12" style={{  display: "inline-block" }}>
        {/* <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-primary/10 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div> */}

           <DotLottieReact
      src="https://lottie.host/51750a24-c2bc-4c90-a0a0-7b28d273f8b4/2QPTbZ06R1.lottie"
      loop
      autoplay
    
    />
        
      </div>
    );
  };
  
  export default AuthImageLogin