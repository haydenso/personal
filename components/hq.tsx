"use client"

import Image from "next/image"
import { useState } from "react"

export function HQ() {
  const [isExpanded, setIsExpanded] = useState(false)
  const linkClass = "text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:decoration-solid"
  const linkMutedClass = "text-[#A5D8FF] underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:decoration-solid hover:opacity-100 opacity-80"

  return (
    <main
      className="flex-1 px-10 md:px-70 xl:px-90 2xl:px-123 overflow-y-auto pt-15 md:pt-16 xl-pt-12 flex flex-col min-h-screen pb-8"
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
        {/* Hero Image - mobile and desktop variants */}
        <div className="mb-6 md:mb-6 xl:mb-7">
          <div className="block md:hidden">
            <Image
              src="/hq-mobile.jpeg"
              alt="HQ"
              width={640}
              height={456}
              priority
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          <div className="hidden md:block">
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
        </div>

        {/* Content */}
        <div className="space-y-3 font-serif text-sm md:text-base">
          <div>
            <div className="flex justify-between gap-2">
              <div>
                <h1 className="text-lg md:text-xl font-serif font-bold mb-1">hey, i'm hayden!</h1>
                <p>
                  &gt; i <em>flâneur</em>, {" "}
                  <a href="/musings" className={linkClass}>blog</a>
                  &nbsp;and {" "}
                  <a href="/projects" className={linkClass}>clawd code</a>
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

          <div>
            <p className="pb-1 text-xs md:text-sm font-bold">in my 20 years, i've:</p>
            <ul className="space-y-1 ml-4 list-disc text-xs md:text-sm pb-1 leading-tight">
              <li>sold guns in the arctic and led janitorial operations</li>
              <li>dabbled in applied ai, energy private equity, consulting, ml research and gov/policy</li>
            </ul>
          </div>

          <div className="space-y-4">
            {/* Selected Projects - Full Width */}
            <div className="space-y-1 text-xs md:text-sm">
              <p className="text-xs tracking-[0.1em] text-[#EBEFF4]/70">selected projects</p>
              <div className="grid grid-cols-1 gap-1 w-full">
                <a href="https://llm.haydenso.com" className={`inline-flex items-center ${linkClass}`}>
                  <Image
                    src="/windows.png"
                    alt=""
                    width={16}
                    height={16}
                    sizes="16px"
                    priority
                    quality={70}
                    className="h-4 w-4 object-contain mr-2 flex-shrink-0"
                    aria-hidden
                  />
                  <span>llm with webgpu</span>
                </a>

                <a href="https://writer.haydenso.com" className={`inline-flex items-center ${linkClass}`}>
                  <Image
                    src="/type.PNG"
                    alt=""
                    width={16}
                    height={16}
                    sizes="16px"
                    priority
                    quality={70}
                    className="h-4 w-4 object-contain mr-2 flex-shrink-0 rounded-sm"
                    aria-hidden
                  />
                  <span>typewriter!!!</span>
                </a>

                <a href="https://browser.haydenso.com" className={`inline-flex items-center ${linkClass}`}>
                  <Image
                    src="/go.png"
                    alt=""
                    width={16}
                    height={16}
                    sizes="16px"
                    priority
                    quality={70}
                    className="h-4 w-4 object-contain mr-2 flex-shrink-0"
                    aria-hidden
                  />
                  <span>markdown browser</span>
                </a>

                <a href="/projects" className={`inline-flex items-center ${linkClass}`}>(see all &#8618;)</a>
              </div>
            </div>

            {/* Writings and Shower Thoughts */}
            <div className="space-y-4 text-xs md:text-sm">
              {/* Writings - 2 column grid on md+ */}
              <div>
                <p className="text-xs tracking-[0.1em] text-[#EBEFF4]/70 mb-1">writings</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <a href="/musings" className={`inline-flex items-center ${linkClass}`}>
                    <Image
                      src="/notes.png"
                      alt=""
                      width={16}
                      height={16}
                      sizes="16px"
                      priority
                      quality={70}
                      className="h-4 w-4 object-cover mr-2 flex-shrink-0"
                      aria-hidden
                    />
                    <span>peek my notes</span>
                  </a>
                  <a href="/blogs" className={`inline-flex items-center ${linkClass}`}>
                    <Image
                      src="/substack.png"
                      alt=""
                      width={16}
                      height={16}
                      sizes="16px"
                      priority
                      quality={70}
                      className="h-4 w-4 object-cover mr-2 flex-shrink-0"
                      aria-hidden
                    />
                    <span>essays</span>
                  </a>
                  <a href="/rcn" className={`inline-flex items-center ${linkClass}`}>
                    <Image
                      src="/terminal.png"
                      alt=""
                      width={16}
                      height={16}
                      sizes="16px"
                      priority
                      quality={70}
                      className="h-4 w-4 object-cover mr-2"
                      aria-hidden
                    />
                    <span>engineering memos</span>
                  </a>
                </div>
              </div>

              {/* Shower Thoughts - horizontal row on md+ */}
              <div className="pb-2">
                <p className="text-xs tracking-[0.1em] text-[#EBEFF4]/70 mb-1">my shower thoughts</p>
                <div className="flex flex-col md:flex-row md:gap-6 gap-1">
                  <a href="/projects" className={`block ${linkClass}`}>(1) reinforcement learning &amp; agents</a>
                  <a href="/projects" className={`block ${linkClass}`}>(2) politics of ai</a>
                  <a href="/projects" className={`block ${linkClass}`}>(3) accelerating scientific discovery</a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs md:text-sm">
            {/* Desktop: always show full text */}
            <div className="hidden md:block">
              im probably listening to {" "}
              <a href="/bookshelf" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>laufey</a>
              &nbsp;or reading {" "}
              <a href="https://www.goodreads.com/user/show/186578130-hayden-so" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>sherlock</a>
              , rabbitholing niche chinese politics and engineering blogs, pondering the human condition or strategizing {" "}
              <a href="https://haydenso.com/blogs/rollup-rl" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>rollups and growth</a>
              . i like oat milk {" "}
              <a href="musings/life/coffee" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>flat whites</a>
              , paul graham, kill tony, all-in, long runs, retrofuturism and vagueposting (read the {" "}
              <a href="/evolution" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>evolution of my interests</a>)
            </div>
            
            {/* Mobile: truncated with expand button */}
            <div className="md:hidden">
              <span>
                im probably listening to {" "}
                <a href="/bookshelf" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>laufey</a>
                &nbsp;or reading {" "}
                <a href="https://www.goodreads.com/user/show/186578130-hayden-so" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>sherlock</a>, rabbitholing niche&nbsp;
              </span>
              {!isExpanded && (
                <button 
                  onClick={() => setIsExpanded(true)} 
                  className={`${linkMutedClass} ml-1`}
                  aria-label="Show more"
                >
                  ...show more
                </button>
              )}
              {isExpanded && (
                <>
                  <span>
                    chinese politics and engineering blogs, pondering the human condition or strategizing {" "}
                    <a href="https://haydenso.com/blogs/rollup-rl" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>rollups and growth</a>
                    . i like oat milk {" "}
                    <a href="musings/life/coffee" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>flat whites</a>
                    , paul graham, kill tony, all-in, long runs, retrofuturism and vagueposting (read the {" "}
                    <a href="/evolution" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>evolution of my interests</a>)&nbsp;
                  </span>
                  <button 
                    onClick={() => setIsExpanded(false)} 
                    className={`${linkMutedClass}`}
                    aria-label="Show less"
                  >
                  ... (click to hide)
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 mb-15" >
            <span className="text-muted-foreground" style={{ color: '#A5D8FF' }}>contacts!</span>
            <a href="https://www.linkedin.com/in/haydenso/" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>linkedin</a>
            <a href="https://github.com/haydenso" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>github</a>
            <a href="https://x.com/haydsso" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>twitter</a>
            <a href="mailto:haydenso.hk@gmail.com" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>email</a>
            <a href="https://scholar.google.com/citations?user=B1qjlbQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className={linkMutedClass}>scholar</a>
          </div>

        </div>
      </div>
    </main>
  )
}
