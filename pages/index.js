import Image from "next/image";

/**
 * Next/Image tests with `sizes`
 * - Cache disabled
 * - Sandbox browser opened in new window
 * - Hard refresh in before each test
 * - Standard image/device size in config: 
 *      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
 */

export default function IndexPage() {
  return (
    <div>
      <Image
        width={1920}
        height={1080}
        layout="responsive"
        src="/testimage.jpg"
        /**
         * No query, just vw
         * ------------------------------
         * 1000px wide browser: 128px wide image. Good. (1000/10=100, round up to 128)
         * 300px wide browser:  64px wide image. Expected (300/2=150, round up to `imageSize`) 256
         * */
        // sizes="10vw"

        /**
         * No query, just px
         * ------------------------------
         * 1000px wide browser:   16px. Good. smallest in `imageSizes`
         * 300px wide browser:    16px. Good. smallest in `imageSizes`
         * */
        // sizes="10px"

        /**
         * Now with media queries. *
         * ------------------------------
         * This is the problematic one.
         * It seems it happens when mixing mx and vw
         * ------------------------------
         * 1000px wide browser:   640px - I expected (10px round up to 16px)
         * 300px wide browser:    640px - same as above
         */
        sizes="(min-width: 960px) 10px, 100vw"

        /**
         * Sticking to one unit
         * -------------------------
         * 1000px wide browser:   16px. Round up from 10px. Good.
         * 300px wide browser:    128px. Round up from 100px. Good.
         */
        // sizes="(min-width: 960px) 10px, 100px"

        /**
         * Same idea, but with `vw`
         * -------------------------
         * 1000px wide browser:  128px. Round up from 10vw=100=128. Good.
         * 300px wide browser: 384px. Round up from 100vw=300=384. Good.
         */
        // sizes="(min-width: 960px) 10vw, 100vw"
      />
    </div>
  );
}
