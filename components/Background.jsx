function Background() {
  return (
    <div className="">
      {/* Decorative elements */}
      <div className="absolute top-[70px] left-[60px] w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[80px] left-[90px] w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[200px] right-[30px] w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute top-[200px] right-[60px] w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute top-[600px] right-[400px] w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute top-[430px] left-[50px] w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[30px] right-[50px] w-6 h-6 bg-gradient-to-b from-[#4e5a55] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute top-[230px] left-[5px] w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1B1B2E] rounded-full pointer-events-none"></div>

      {/* Side lines */}

      <div className="absolute top-0 right-5 w-[1px] h-full bg-[#252134] pointer-events-none"></div>
      <div className="absolute top-0 left-5 w-[1px] h-full bg-[#252134] pointer-events-none"></div>
      <div className="absolute top-0 w-full mt-5 h-[1px] bg-[#252134] pointer-events-none"></div>
      <div className="absolute bottom-0 w-full mb-5 h-[1px] bg-[#252134] pointer-events-none"></div>

      {/* Rings */}
      <div className="absolute top-1/2 left-1/2 w-[835px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <div className="absolute top-1/2 left-1/2 w-[580px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[360px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}

export default Background;
