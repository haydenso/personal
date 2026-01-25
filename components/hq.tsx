import Image from "next/image"

export function HQ() {
  const linkClass = "text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:decoration-solid"
  const linkMutedClass = "text-[#A5D8FF] underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:decoration-solid hover:opacity-100 opacity-80"

  return (
    <main
      className="flex-1 px-10 md:px-70 xl:px-90 overflow-y-auto pt-15 md:pt-16 xl-pt-12 flex flex-col min-h-screen pb-8"
      style={{
        backgroundColor: '#086EB8',
        backgroundImage: "linear-gradient(rgba(8, 110, 184, 0.9), rgba(8, 110, 184, 0.65)), image-set(url('/blueprint.jpg') type('image/jpeg'))",
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 320px',
        backgroundPosition: 'center, top left',
        color: '#EBEFF4'
      }}
    >
      <div className="max-w-2xl mx-auto w-full">
        {/* Hero Image */}
        <div className="mb-6 md:mb-6 xl:mb-7">
          <Image
            src="/hq.jpeg"
            alt="HQ"
            width={919}
            height={656}
            priority
            sizes="(max-width: 768px) 100vw, 640px"
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="space-y-3 font-serif text-sm md:text-base">
          <div>
            <div className="flex justify-between gap-2">
              <div>
                <h1 className="text-lg md:text-xl font-serif font-bold mb-1">hey, i'm hayden!</h1>
                <p>
                  &gt; i flâneur, {" "}
                  <a
                    href="/musings"
                    className={linkClass}
                  >
                    blog
                  </a>
                  &nbsp;and{" "}
                  <a
                    href="/projects"
                    className={linkClass}
                  >
                    clawd code
                  </a>
                </p>
              </div>
              <Image
                src="/face/logo.png"
                alt="logo"
                width={48}
                height={48}
                sizes="(max-width: 768px) 48px, 56px"
                priority
                quality={70}
                className="w-12 h-12 md:w-13 md:h-13 xl:h-12 xl:w-12 rounded-md object-cover"
              />
            </div>
          </div>


            <div className="text-xs md:text-sm pb-2">
              <p className="font-bold">current shower thoughts: (1) reinforcement learning &amp; agents, (2) politics of ai, (3) accelerating scientific discovery</p>
            </div>

          <div className="space-y-4">
            <div className="md:mt-2 grid grid-cols-2 gap-6 text-xs md:text-sm pb-3 ml:pb-2 xl:pb-2">
              <div className="space-y-1">
                <p className="text-xs tracking-[0.1em] text-[#EBEFF4]/70">writings</p>
                <a href="/musings" className={`block ${linkClass}`}>
                  <Image
                    src="/notes.webp"
                    alt=""
                    width={16}
                    height={16}
                    sizes="16px"
                    priority
                    quality={70}
                    className="inline-block h-4 w-4 object-contain align-middle mr-2"
                    aria-hidden
                  />
                  <span>peek my notes app</span>
                </a>
                <a href="/blogs" className={`block ${linkClass}`}>long-form essays</a>
                <a href="/rcn" className={`block ${linkClass}`}>reflecting on high school</a>
              </div>
              <div className="space-y-1">
                <p className="text-xs  tracking-[0.1em] text-[#EBEFF4]/70">selected projects</p>
                <a href="/github" className={`block ${linkClass}`}>people searcher</a>
                <a href="/github" className={`block ${linkClass}`}>rl environments</a>
                <a href="/blogs/ikea" className={`block ${linkClass}`}>automations</a>
              </div>
            </div>

            <div>
              <p className="pb-1 text-xs md:text-sm font-bold">in my 20 years, i've:</p>
              <ul className="space-y-1 ml-4 list-disc text-xs md:text-sm pb-1 leading-tight">
                <li>sold guns in the arctic and led janitorial operations</li>
                <li>dabbled in applied ai, private equity, consulting, academia and gov/policy</li>
                <li>based + from hong kong (hkust), did high school in norway (uwc!)</li>
              </ul>
            </div>

            <div className="text-xs md:text-sm">
              im probably listening to {" "}
              <a
                href="/bookshelf"
                target="_blank"
                rel="noopener noreferrer"
                className={linkMutedClass}
              >
                laufey
              </a>
              &nbsp;or reading {" "}
              <a
                href="https://www.goodreads.com/user/show/186578130-hayden-so"
                target="_blank"
                rel="noopener noreferrer"
                className={linkMutedClass}
              >
                sherlock
              </a>
              , rabbitholing niche chinese politics or engineering blogs, pondering the human condition or strategizing {""} 
                            <a
                href="https://haydenso.com/blogs/rollup-rl"
                target="_blank"
                rel="noopener noreferrer"
                className={linkMutedClass}
              >
                rollups and growth
              </a>
              . i like oat milk {" "}
              <a
                href="musings/life/coffee"
                target="_blank"
                rel="noopener noreferrer"
                className={linkMutedClass}
              >
                flat whites
              </a>
              , paul graham, kill tony, all-in, long runs, retrofuturism and vagueposting (read the {""}
                            <a
                href="/evolution"
                target="_blank"
                rel="noopener noreferrer"
                className={linkMutedClass}
              >
                evolution of my interests
              </a>)
            </div>

          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 mb-15" >
            <span className="text-muted-foreground" style={{ color: '#A5D8FF' }}>contacts!</span>
            <a
              href="https://www.linkedin.com/in/haydenso/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkMutedClass}>
              linkedin
            </a>
            <a
              href="https://github.com/haydenso"
              target="_blank"
              rel="noopener noreferrer"
              className={linkMutedClass}>
              github
            </a>
            <a
              href="https://x.com/haydsso"
              target="_blank"
              rel="noopener noreferrer"
              className={linkMutedClass}>
              twitter
            </a>
            <a
              href="mailto:haydenso.hk@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={linkMutedClass}>
              email</a>
            <a
              href="https://scholar.google.com/citations?user=B1qjlbQAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className={linkMutedClass}>
              scholar
            </a>
          </div>

        </div>
      </div>
    </main>
  )
}
