import { Footer } from "./footer"

export function Projects() {
  return (
    <main 
      className="flex-1 px-10 md:px-70 xl:px-90 2xl:px-123 overflow-y-auto pt-28 md:pt-16 flex flex-col min-h-screen pb-8"
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
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-serif mb-2 text-[#E0EBFC]">projects</h1>
            <p className="text-[#A5D8FF] mb-4">things i've built & side quests</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-[#A5D8FF] mt-0.5">📹</span>
              <div className="flex-1">
                <a href="https://llm.haydenso.com" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  pocket llm
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">llm inference via webGPU all in your browser</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#A5D8FF] mt-0.5">📠</span>
              <div className="flex-1">
                <a href="https://typewriter.haydenso.com" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  remington
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">typewriter for google docs and microsoft word. stop jumping paragraphs!</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#A5D8FF] mt-0.5">🎮</span>
              <div className="flex-1">
                <a href="https://clauscii.haydenso.com" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  clauscii
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">get claude code-styled ascii for any text</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#A5D8FF] mt-0.5">🧹</span>
              <div className="flex-1">
                <a href="https://github.com/haydenso/broomstick" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  broomstick
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">tui and cli for managing python versions, packages and (virtual) environments</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#A5D8FF] mt-0.5">📟</span>
              <div className="flex-1">
                <a href="huggingface.co/spaces/haydso/onnx-converter-new" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  model to onnx converter (huggingface space)
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">updated streamlit app to convert models and safetensors into onnx for onnx runtime. supports new models.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-[#A5D8FF] mt-0.5">🗺️</span>
              <div className="flex-1">
                <a href="https://cccw.haydenso.com" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  chinese leadership map visualizer
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">interactive map for visualizing chinese leadership. data from HKU's CCCW</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 text-[#A5D8FF]/40 py-4">
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
            <span className="text-xl">✦</span>
          </div>
          
          <p className="text-[#A5D8FF] italic font-serif">other side quests</p>

          <div className="space-y-3 pb-10">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <a href="https://aisafetyhk.org" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  leading research + co-founder for ai policy/safety hong kong
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">aisafetyhk.org</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="flex-1">
                <a href="https://givewise.org.hk" className="font-serif text-[#E0EBFC] underline decoration-dotted decoration-1 underline-offset-2 hover:decoration-solid">
                  built the website + backend payment system at givewise.org.hk
                </a>
                <p className="text-sm text-[#A5D8FF] font-serif">accelerating effective charity giving in asia</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="flex-1">
                <span className="font-serif text-[#E0EBFC]">
                  represented Norway at the International Mathematical Modelling Competition
                </span>
                <p className="text-sm text-[#A5D8FF] font-serif">making simulations go brrrrrrr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto w-full">
        <Footer />
      </div>
    </main>
  )
}
