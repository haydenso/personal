import { musings } from "@/content/musings"
import { cn } from "@/lib/utils"
import { ResizeHandle } from "./resize-handle"
import { Footer } from "./footer"

interface MusingsListProps {
  selectedMusing: string | null
  onSelectMusing: (slug: string) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

export function MusingsList({ selectedMusing, onSelectMusing, width, isDragging, onMouseDown }: MusingsListProps) {
  return (
    <div
      style={{ width: `${width}px` }}
      className={cn(
        "relative overflow-y-auto shrink-0 border-r border-border",
        selectedMusing && "max-md:hidden",
      )}
    >
      <div className="px-8 md:px-16 pt-28 md:pt-16 pb-0 max-w-3xl flex flex-col justify-between min-h-full">
        <div>
          <h1 className="text-4xl font-serif mb-8">Musings</h1>

          <div className="space-y-8">
          <div>
            <h2 className=" text-xs uppercase tracking-widest text-muted-foreground mb-4">Pinned</h2>
            <ol className="space-y-0">
              {musings
                .filter((musing) => musing.pinned)
                .map((musing, index, filteredMusings) => (
                  <li key={musing.slug} className="text-foreground">
                    <div className="inline-block align-top" style={{ width: "calc(100% - 1.5em)" }}>
                      <button
                        onClick={() => {
                          if (musing.hasNotes) {
                            onSelectMusing(musing.slug)
                          }
                        }}
                        disabled={!musing.hasNotes}
                        className={cn(
                          "w-full text-left space-y-1.5 py-3 transition-colors group",
                          musing.hasNotes && "cursor-pointer",
                          !musing.hasNotes && "cursor-default",
                        )}
                      >
                        <div className="flex items-baseline gap-2">
                          <div className="text-base font-medium text-foreground">{musing.title}</div>
                          {musing.hasNotes && (
                            <span className="text-muted-foreground text-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {musing.author}, {musing.date}
                        </div>
                      </button>
                    </div>
                  </li>
                ))}
            </ol>
          </div>

          <div>
            <h2 className=" text-xs uppercase tracking-widest text-muted-foreground mb-4">By date</h2>
            <ol className="space-y-0">
              {musings
                .filter((musing) => !musing.pinned)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((musing, index, filteredMusings) => (
                  <li key={musing.slug} className="text-foreground">
                    <div className="inline-block align-top">
                      <button
                        onClick={() => {
                          if (musing.hasNotes) {
                            onSelectMusing(musing.slug)
                          }
                        }}
                        disabled={!musing.hasNotes}
                        className={cn(
                          "w-full text-left space-y-1.5 py-3 transition-colors group",
                          musing.hasNotes && "cursor-pointer",
                          !musing.hasNotes && "cursor-default",
                        )}
                      >
                        <div className="flex items-baseline gap-2">
                          <div className={cn("text-base font-medium text-foreground", musing.hasNotes && "group-hover:underline")}>{musing.title}</div>
                          {musing.hasNotes && (
                            <span className="text-muted-foreground text-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {musing.author}, {musing.date}
                        </div>
                      </button>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
        </div>

        <Footer />
      </div>

      {selectedMusing && <ResizeHandle onMouseDown={onMouseDown} isDragging={isDragging} />}
    </div>
  )
}
