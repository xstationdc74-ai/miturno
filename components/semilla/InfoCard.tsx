export default function InfoCard() {
  return (
    <div className="mt-10 w-full max-w-md">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xl">🌱</div>
          <div className="text-sm text-[#2F4F2F]">
            Somos una empresa de desarrollo con alma patagónica.
          </div>
        </div>

        <div className="text-[#2F4F2F]">›</div>
      </div>
    </div>
  );
}