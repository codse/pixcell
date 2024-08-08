import TextExplodeIMessage from '@/components/animata/text/text-explode-imessage';
import { Separator } from '@/components/ui/separator';
import { m, LazyMotion } from 'framer-motion';
const loadFeatures = () => import('./features').then((res) => res.default);

export default function Footer() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="text-sm flex flex-col gap-4 max-w-sm border-t my-4 py-4  mx-auto text-muted-foreground text-center"
      >
        <div className="gap-4 w-full relative flex justify-center items-center">
          <TextExplodeIMessage
            text="Made with AI [🤖] by hari"
            mode="hover"
            className="inline-flex text-sm text-muted-foreground"
          />
          <Separator orientation="vertical" className="h-4 inline-flex" />
          <a
            href="https://x.com/harimanok_"
            target="_blank"
            className="inline-block my-4 hover:underline hover:decoration-wavy"
          >
            Follow me on 𝕏
          </a>
        </div>
        <a
          href="https://github.com/codse/pixcell"
          target="_blank"
          className="text-blue-400 font-bold mb-4 pb-4 border-b border-muted-foreground/10"
        >
          View source code
        </a>
        <div>
          Thanks to everyone from Reddit who encouraged me to publish this.
          Special thanks to{' '}
          <a
            href="https://instagram.com/psndshdraws"
            className="text-blue-400 font-bold"
            target="_blank"
          >
            Sandesh Pun
          </a>{' '}
          for providing early feedback.
        </div>
        <div className="text-balance">
          We are also building{' '}
          <a
            href="https://animata.design"
            target="_blank"
            className="text-blue-400 font-bold"
          >
            Animata
          </a>{' '}
          - a free and open source library of animated/interactive components
          for React.{' '}
          <a
            href="https://github.com/codse/animata"
            target="_blank"
            className="text-blue-400 font-bold"
          >
            Star us on GitHub
          </a>
        </div>
      </m.div>
    </LazyMotion>
  );
}
