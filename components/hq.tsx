export function HQ() {
  const linkClass = "text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:decoration-solid"
  const linkMutedClass = "text-[#A5D8FF] underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:decoration-solid hover:opacity-100 opacity-80"

  return (
    <main
      className="flex-1 px-10 md:px-45 overflow-y-auto pt-28 md:pt-16 flex flex-col min-h-screen pb-8"
      style={{
        backgroundImage: "linear-gradient(rgba(8, 110, 184, 10), rgba(8, 110, 184, 0.65)), url('/blueprint.jpg')",
        backgroundRepeat: 'no-repeat, repeat',
        backgroundSize: 'auto, 420px',
        backgroundPosition: 'center, top left',
        color: '#EBEFF4'
      }}
    >
      <div className="max-w-2xl mx-auto w-full">
        {/* Hero Image */}
        <div className="mb-12">
          <img
            src="/hq.jpeg"
            alt="HQ"
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="space-y-4 font-serif">
          <div>
            <div className="flex justify-between gap-2">
              <div>
                <h1 className="text-xl font-serif font-bold mb-1">hey, i'm hayden!</h1>
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
              <img src="/face/logo.png" alt="logo" className="w-13 h-13 rounded-md object-cover" />
            </div>
          </div>

          <div className="space-y-4" style={{ color: '#EBEFF4' }}>
            <div className="mt-2 grid grid-cols-2 gap-6 text-sm pb-4">
              <div className="space-y-1">
                <p className="text-xs tracking-[0.2em] text-[#E0EBFC]/70">writings</p>
                <a href="/musings" className={`inline-flex items-center gap-2 ${linkClass}`}>
                  <span>peek my notes app</span>
                  <img src="/notes.webp" alt="" className="h-4 w-4 object-contain" aria-hidden="true" />
                </a>
                <a href="/blogs" className={`block ${linkClass}`}>long-form essays</a>
                <a href="/rcn" className={`block ${linkClass}`}>reflecting on high school</a>
              </div>
              <div className="space-y-1">
                <p className="text-xs  tracking-[0.2em] text-[#E0EBFC]/70">selected projects</p>
                <a href="/github" className={`block ${linkClass}`}>people searcher</a>
                <a href="/github" className={`block ${linkClass}`}>rl environments</a>
                <a href="/blogs/ikea" className={`block ${linkClass}`}>automations</a>
              </div>
            </div>

            <div className="text-sm pb-3">
              <p className="font-bold">current shower thoughts: (1) RL, data and adoption, (2) politics of ai, (3) accelerating scientific discovery</p>
            </div>

            <div>
              <p className="pb-2 text-sm font-bold ">my first 20 years, i've:</p>
              <ul className="space-y-2 ml-6 list-disc text-sm pb-3">
                    <li>sold guns in the arctic and led janitorial operations</li>
                <li>dabbled in applied ai, private equity, consulting, academia and gov</li>
                <li>from/live in hong kong (hkust), did high school in norway (uwc!)</li>
              </ul>
            </div>

            <div className="text-sm">
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
              , rabbitholing niche chinese politics, devouring engineering blogs, pondering the human condition or strategizing {""} 
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
              , paul graham, all-in, long runs, retrofuturism and vagueposting (read the {""}
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
