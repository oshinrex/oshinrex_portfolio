import Image from "next/image";

const TAPE_CLASS =
  "absolute rounded-[1px] shadow-[0_2px_5px_rgba(23,23,23,0.18)] ring-1 ring-black/5 backdrop-blur-[1.5px]";

const TAPE_BG =
  "linear-gradient(115deg, rgba(244,242,235,0.55) 0%, rgba(244,242,235,0.8) 45%, rgba(244,242,235,0.55) 100%)";

export function PhotoFrame() {
  return (
    <div className="relative -rotate-2">
      <span
        className={`${TAPE_CLASS} -left-8 -top-5 h-9 w-28 -rotate-[38deg] sm:-left-10 sm:-top-6 sm:h-10 sm:w-32`}
        style={{ background: TAPE_BG }}
      />
      <span
        className={`${TAPE_CLASS} -right-6 -top-6 h-9 w-28 rotate-[24deg] sm:-right-7 sm:-top-7 sm:h-10 sm:w-32`}
        style={{ background: TAPE_BG }}
      />
      <span
        className={`${TAPE_CLASS} -bottom-5 left-1/2 h-9 w-32 -translate-x-1/2 -rotate-[6deg] sm:-bottom-6 sm:h-10 sm:w-36`}
        style={{ background: TAPE_BG }}
      />

      <div className="relative bg-white px-3 pb-11 pt-3 shadow-[0_35px_70px_-28px_rgba(23,23,23,0.45)] sm:px-3.5 sm:pb-12 sm:pt-3.5">
        <div className="relative aspect-[4/5] w-56 overflow-hidden sm:w-72 md:w-80 lg:w-[22rem]">
          <Image
            src="/professional.png"
            alt="Portrait of Oshin Rex"
            fill
            priority
            sizes="(min-width: 1024px) 352px, (min-width: 768px) 320px, (min-width: 640px) 288px, 224px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
