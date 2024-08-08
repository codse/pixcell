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
        className="text-sm max-w-sm  mx-auto text-muted-foreground text-center"
      >
        <div className="gap-4 w-full relative flex justify-center items-center">
          <TextExplodeIMessage
            text="Made with ❤️ by hari"
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
        <div className="text-balance">
          We are also building{' '}
          <a
            href="https://animata.design"
            target="_blank"
            className="text-emerald-500 font-bold"
          >
            Animata
          </a>{' '}
          - a free and open source animated/interactive component library for
          React.{' '}
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
