import {
    chromium,
  } from "playwright";
  
  import fs from "node:fs/promises";
  import path from "node:path";
  
  const TARGET_URL =
    "https://marychen.framer.website/about页面";
  
  const OUTPUT_DIR =
    path.resolve(
      "framer-shader-audit"
    );
  
  const SCRIPT_DIR =
    path.join(
      OUTPUT_DIR,
      "scripts"
    );
  
  const SEARCH_TERMS = [
    "data-paper-shaders",
    "MeshGradient",
    "meshGradient",
    "mesh-gradient",
    "paper-design",
    "paper-shaders",
    "distortion",
    "swirl",
    "grainMixer",
    "grainOverlay",
    "colorBack",
    "colors",
  ];
  
  function safeName(
    value
  ) {
    return value
      .replace(
        /^https?:\/\//,
        ""
      )
      .replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      )
      .slice(
        -180
      );
  }
  
  async function main() {
    await fs.mkdir(
      SCRIPT_DIR,
      {
        recursive: true,
      }
    );
  
    const browser =
      await chromium.launch({
        headless: true,
      });
  
    const context =
      await browser.newContext({
        viewport: {
          width: 1440,
          height: 1000,
        },
  
        deviceScaleFactor: 1,
  
        colorScheme: "dark",
      });
  
    const page =
      await context.newPage();
  
    const capturedScripts = [];
  
    page.on(
      "response",
      async (
        response
      ) => {
        try {
          const url =
            response.url();
  
          const headers =
            response.headers();
  
          const contentType =
            headers[
              "content-type"
            ] || "";
  
          const isJavaScript =
            url.includes(
              "framerusercontent.com/sites/"
            ) &&
            (
              url.includes(
                ".mjs"
              ) ||
              url.includes(
                ".js"
              ) ||
              contentType.includes(
                "javascript"
              )
            );
  
          if (!isJavaScript) {
            return;
          }
  
          const text =
            await response.text();
  
          const fileName =
            safeName(url);
  
          const filePath =
            path.join(
              SCRIPT_DIR,
              fileName
            );
  
          await fs.writeFile(
            filePath,
            text,
            "utf8"
          );
  
          capturedScripts.push({
            url,
            fileName,
            length:
              text.length,
          });
  
          console.log(
            `Captured ${fileName}`
          );
        } catch {
          // Ignore inaccessible responses.
        }
      }
    );
  
    console.log(
      "Opening Framer About page..."
    );
  
    await page.goto(
      TARGET_URL,
      {
        waitUntil:
          "domcontentloaded",
  
        timeout:
          90000,
      }
    );
  
    await page.waitForTimeout(
      8000
    );
  
    try {
      await page.evaluate(
        async () => {
          await document.fonts.ready;
        }
      );
    } catch {
      //
    }
  
    /*
     * Record the live canvas.
     */
  
    const canvasInfo =
      await page.evaluate(
        () => {
          const canvas =
            document.querySelector(
              'canvas[data-paper-shaders="true"]'
            );
  
          if (!canvas) {
            return null;
          }
  
          const rect =
            canvas
              .getBoundingClientRect();
  
          const style =
            getComputedStyle(
              canvas
            );
  
          return {
            width:
              canvas.width,
  
            height:
              canvas.height,
  
            rect: {
              x:
                rect.x,
  
              y:
                rect.y,
  
              width:
                rect.width,
  
              height:
                rect.height,
            },
  
            style: {
              width:
                style.width,
  
              height:
                style.height,
  
              opacity:
                style.opacity,
  
              transform:
                style.transform,
  
              filter:
                style.filter,
            },
          };
        }
      );
  
    await fs.writeFile(
      path.join(
        OUTPUT_DIR,
        "canvas.json"
      ),
      JSON.stringify(
        canvasInfo,
        null,
        2
      ),
      "utf8"
    );
  
    /*
     * Capture several real animation frames.
     */
  
    const canvas =
      page.locator(
        'canvas[data-paper-shaders="true"]'
      );
  
    if (
      await canvas.count()
    ) {
      for (
        let frame = 1;
        frame <= 6;
        frame++
      ) {
        await canvas.screenshot({
          path:
            path.join(
              OUTPUT_DIR,
              `frame-${frame}.png`
            ),
        });
  
        await page.waitForTimeout(
          1000
        );
      }
    }
  
    /*
     * Search every downloaded Framer bundle
     * for shader clues / parameters.
     */
  
    const matches = [];
  
    const files =
      await fs.readdir(
        SCRIPT_DIR
      );
  
    for (
      const file
      of files
    ) {
      const fullPath =
        path.join(
          SCRIPT_DIR,
          file
        );
  
      const source =
        await fs.readFile(
          fullPath,
          "utf8"
        );
  
      for (
        const term
        of SEARCH_TERMS
      ) {
        let start = 0;
  
        while (true) {
          const index =
            source.indexOf(
              term,
              start
            );
  
          if (
            index === -1
          ) {
            break;
          }
  
          const snippetStart =
            Math.max(
              0,
              index - 2500
            );
  
          const snippetEnd =
            Math.min(
              source.length,
              index + 5000
            );
  
          matches.push({
            file,
            term,
            index,
  
            snippet:
              source.slice(
                snippetStart,
                snippetEnd
              ),
          });
  
          start =
            index +
            term.length;
  
          /*
           * Prevent huge duplicate dumps.
           */
  
          if (
            matches.length >
            500
          ) {
            break;
          }
        }
      }
    }
  
    await fs.writeFile(
      path.join(
        OUTPUT_DIR,
        "shader-matches.json"
      ),
      JSON.stringify(
        matches,
        null,
        2
      ),
      "utf8"
    );
  
    await fs.writeFile(
      path.join(
        OUTPUT_DIR,
        "scripts.json"
      ),
      JSON.stringify(
        capturedScripts,
        null,
        2
      ),
      "utf8"
    );
  
    /*
     * Save the page source again
     * in case shader props are serialized there.
     */
  
    await fs.writeFile(
      path.join(
        OUTPUT_DIR,
        "rendered.html"
      ),
      await page.content(),
      "utf8"
    );
  
    await context.close();
    await browser.close();
  
    console.log(
      "\n=============================="
    );
  
    console.log(
      "ABOUT SHADER AUDIT COMPLETE"
    );
  
    console.log(
      "=============================="
    );
  
    console.log(
      OUTPUT_DIR
    );
  }
  
  main().catch(
    (
      error
    ) => {
      console.error(
        error
      );
  
      process.exit(1);
    }
  );